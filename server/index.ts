import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import {
  createChildForUser,
  linkedChildrenForUser,
  linkUserToChildByCode,
  loadDb,
  publicSnapshot,
  saveDb,
  userCanAccessChild,
} from './db.ts';
import {
  clearSessionCookie,
  getSessionToken,
  hashPassword,
  hashToken,
  newSessionToken,
  normalizeEmail,
  publicUser,
  sessionExpiryIso,
  setSessionCookie,
  validatePassword,
  verifyPassword,
} from './auth.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const app = express();
const port = Number(process.env.PORT || 3000);
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

const id = (prefix:string) => `${prefix}-${crypto.randomUUID()}`;
const nowIso = () => new Date().toISOString();

type AuthRequest = Request & { user?: any; childId?: string };

function cleanExpiredSessions(db:any) {
  const now = Date.now();
  db.sessions = (db.sessions || []).filter((s:any)=>new Date(s.expiresAt).getTime() > now);
}

function authenticate(req:AuthRequest,res:Response,next:NextFunction) {
  const token = getSessionToken(req);
  if (!token) return res.status(401).json({ error:'Please sign in to continue.' });
  const db = loadDb();
  cleanExpiredSessions(db);
  const tokenHash = hashToken(token);
  const session = (db.sessions || []).find((s:any)=>s.tokenHash===tokenHash);
  if (!session) {
    clearSessionCookie(res);
    saveDb(db);
    return res.status(401).json({ error:'Your session has expired. Please sign in again.' });
  }
  const user = (db.users || []).find((u:any)=>u.id===session.userId);
  if (!user) return res.status(401).json({ error:'Account not found.' });
  session.lastSeenAt = nowIso();
  saveDb(db);
  req.user = user;
  next();
}

function resolveChild(req:AuthRequest,res:Response,next:NextFunction) {
  const db = loadDb();
  const linked = linkedChildrenForUser(db, req.user.id);
  if (!linked.length) return res.status(409).json({ error:'NO_LINKED_CHILD', message:'This account does not have a linked child profile yet.' });
  const requested = String(req.query.childId || req.body?.childId || req.params?.childId || linked[0].id);
  if (!userCanAccessChild(db, req.user.id, requested)) return res.status(403).json({ error:'You do not have access to this child profile.' });
  req.childId = requested;
  next();
}

function audit(db:any,user:any,action:string,childId?:string,metadata:any={}) {
  db.auditLogs ||= [];
  db.auditLogs.unshift({id:id('audit'),userId:user.id,childId,action,metadata,createdAt:nowIso()});
  db.auditLogs = db.auditLogs.slice(0,1000);
}

function addEvent(db:any,user:any,childId:string,type:string,metadata:any={}) {
  db.events ||= [];
  db.events.unshift({id:id('event'),userId:user.id,childId,type,metadata,createdAt:nowIso()});
  db.events = db.events.slice(0,3000);
}

app.get('/api/health', (_req,res)=>res.json({ ok:true, service:'HEBAT Account API', version:'4.0' }));

// ---------------- AUTH ----------------
app.post('/api/auth/register', (req,res)=>{
  const db = loadDb();
  const email = normalizeEmail(req.body.email);
  const name = String(req.body.name || '').trim();
  const role = String(req.body.role || 'child');
  const password = String(req.body.password || '');
  if (!name) return res.status(400).json({error:'Name is required.'});
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({error:'Enter a valid email address.'});
  if (!['child','parent','teacher','professional'].includes(role)) return res.status(400).json({error:'Select a valid account role.'});
  const passwordError = validatePassword(password);
  if (passwordError) return res.status(400).json({error:passwordError});
  if ((db.users || []).some((u:any)=>normalizeEmail(u.email)===email)) return res.status(409).json({error:'An account with this email already exists.'});

  const pass = hashPassword(password);
  const user = {id:id('user'),email,name,role,passwordSalt:pass.salt,passwordHash:pass.hash,createdAt:nowIso(),profileComplete:true,screeningCompleted:role==='professional'};
  db.users.push(user);

  // For a child account, the account itself becomes the child profile. Other roles can optionally create a first workspace child.
  const childInput = req.body.child || null;
  if (role === 'child') createChildForUser(db,user,{name,age:childInput?.age,grade:childInput?.grade,school:childInput?.school});
  else if (childInput?.name && ['parent','teacher'].includes(role)) createChildForUser(db,user,childInput);

  const session = newSessionToken();
  db.sessions.push({id:id('session'),userId:user.id,tokenHash:session.tokenHash,createdAt:nowIso(),lastSeenAt:nowIso(),expiresAt:sessionExpiryIso()});
  audit(db,user,'ACCOUNT_REGISTERED');
  saveDb(db);
  setSessionCookie(res,session.token);
  res.status(201).json({user:publicUser(user),linkedChildren:linkedChildrenForUser(db,user.id)});
});

// Every click creates an isolated account and child workspace; no shared demo history.
app.post('/api/auth/demo', (req,res)=>{
  const db=loadDb();
  const role=String(req.body.role||'child');
  if(!['child','parent','teacher'].includes(role)) return res.status(400).json({error:'Select Student, Parent, or Teacher.'});
  const suffix=crypto.randomBytes(6).toString('hex');
  const name=String(req.body.name||({child:'Demo Student',parent:'Demo Parent',teacher:'Demo Teacher'} as any)[role]).trim();
  const pass=hashPassword(crypto.randomBytes(18).toString('hex'));
  const user={id:id('demo-user'),email:`${role}-${suffix}@prototype.hebat.demo`,name,role,passwordSalt:pass.salt,passwordHash:pass.hash,createdAt:nowIso(),profileComplete:true,screeningCompleted:false,demo:true};
  db.users.push(user);
  const childInput=req.body.child||{};
  createChildForUser(db,user,{name:role==='child'?name:String(childInput.name||'Demo Child'),age:childInput.age||9,grade:childInput.grade||'Grade 4',school:childInput.school||''});
  const session=newSessionToken();
  db.sessions.push({id:id('session'),userId:user.id,tokenHash:session.tokenHash,createdAt:nowIso(),lastSeenAt:nowIso(),expiresAt:sessionExpiryIso()});
  audit(db,user,'ISOLATED_DEMO_CREATED'); saveDb(db); setSessionCookie(res,session.token);
  res.status(201).json({user:publicUser(user),linkedChildren:linkedChildrenForUser(db,user.id)});
});

app.post('/api/auth/login', (req,res)=>{
  const db = loadDb();
  cleanExpiredSessions(db);
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');
  const user = (db.users || []).find((u:any)=>normalizeEmail(u.email)===email);
  if (!user || !verifyPassword(password,user.passwordSalt,user.passwordHash)) return res.status(401).json({error:'Email or password is incorrect.'});
  const session = newSessionToken();
  db.sessions.push({id:id('session'),userId:user.id,tokenHash:session.tokenHash,createdAt:nowIso(),lastSeenAt:nowIso(),expiresAt:sessionExpiryIso()});
  audit(db,user,'SIGNED_IN');
  saveDb(db);
  setSessionCookie(res,session.token);
  res.json({user:publicUser(user),linkedChildren:linkedChildrenForUser(db,user.id)});
});

app.post('/api/auth/logout', authenticate, (req:AuthRequest,res)=>{
  const db = loadDb();
  const token = getSessionToken(req);
  if (token) db.sessions = (db.sessions || []).filter((s:any)=>s.tokenHash!==hashToken(token));
  audit(db,req.user,'SIGNED_OUT');
  saveDb(db);
  clearSessionCookie(res);
  res.json({ok:true});
});

app.get('/api/auth/me', authenticate, (req:AuthRequest,res)=>{
  const db = loadDb();
  res.json({user:publicUser(req.user),linkedChildren:linkedChildrenForUser(db,req.user.id)});
});

// ------------- ACCOUNT / LINKING -------------
app.post('/api/account/children', authenticate, (req:AuthRequest,res)=>{
  if (req.user.role === 'professional') return res.status(403).json({error:'Professional accounts can only access consented referral cases.'});
  const db = loadDb();
  if (req.user.role === 'child' && linkedChildrenForUser(db,req.user.id).length) return res.status(403).json({error:'Student accounts can only own their own child profile.'});
  const child = createChildForUser(db,req.user,req.body || {});
  audit(db,req.user,'CHILD_PROFILE_CREATED',child.id,{relationship:req.user.role});
  saveDb(db);
  res.status(201).json({child,linkedChildren:linkedChildrenForUser(db,req.user.id)});
});

app.post('/api/account/link-child', authenticate, (req:AuthRequest,res)=>{
  if (req.user.role === 'child') return res.status(403).json({error:'Student accounts cannot link another child profile.'});
  const db = loadDb();
  const child = linkUserToChildByCode(db,req.user,String(req.body.code || ''));
  if (!child) return res.status(404).json({error:'Child code not found.'});
  audit(db,req.user,'CHILD_PROFILE_LINKED',child.id);
  saveDb(db);
  res.json({child,linkedChildren:linkedChildrenForUser(db,req.user.id)});
});

app.get('/api/account/history', authenticate, (req:AuthRequest,res)=>{
  const db = loadDb();
  const ownEvents = (db.events || []).filter((e:any)=>e.userId===req.user.id).sort((a:any,b:any)=>String(b.createdAt).localeCompare(String(a.createdAt))).slice(0,100);
  const ownAudit = (db.auditLogs || []).filter((e:any)=>e.userId===req.user.id).sort((a:any,b:any)=>String(b.createdAt).localeCompare(String(a.createdAt))).slice(0,100);
  res.json({events:ownEvents,audit:ownAudit});
});

// ---------------- CHILD DATA ----------------
app.get('/api/bootstrap', authenticate, resolveChild, (req:AuthRequest,res)=>{
  const db = loadDb();
  res.json(publicSnapshot(db,req.user,req.childId!));
});

app.post('/api/observations', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (!['parent','teacher','professional'].includes(req.user.role)) return res.status(403).json({error:'This account cannot add observations.'});
  const db = loadDb();
  db.observations.unshift({
    id:id('obs'), childId:req.childId, actorUserId:req.user.id, authorRole:req.user.role, authorName:req.user.name, createdAt:nowIso(),
    attention:req.body.attention, taskCompletion:req.body.taskCompletion, promptLevel:req.body.promptLevel, transition:req.body.transition, note:String(req.body.note || '').slice(0,1000)
  });
  addEvent(db,req.user,req.childId!,'OBSERVATION_ADDED'); audit(db,req.user,'OBSERVATION_ADDED',req.childId);
  const next = saveDb(db);
  res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/focus-sessions', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (req.user.role !== 'child' && req.user.role !== 'parent') return res.status(403).json({error:'This account cannot record a Focus Sprint.'});
  const db = loadDb();
  const completed = Boolean(req.body.completed);
  db.focusSessions.unshift({ id:id('focus'), childId:req.childId, actorUserId:req.user.id, createdAt:nowIso(), assignedMinutes:Number(req.body.assignedMinutes||7), completedMinutes:Number(req.body.completedMinutes||0), completed });
  if (completed) db.rewardTransactions.unshift({ id:id('reward'), childId:req.childId, actorUserId:req.user.id, createdAt:nowIso(), amount:20, reason:'Focus Sprint completed' });
  if (completed && !(db.missionCompletions || []).some((m:any)=>m.childId===req.childId && m.missionId==='mission-focus')) db.missionCompletions.push({id:id('mc'),childId:req.childId,missionId:'mission-focus',completedAt:nowIso(),actorUserId:req.user.id});
  addEvent(db,req.user,req.childId!,completed?'FOCUS_COMPLETED':'FOCUS_ENDED',{completedMinutes:Number(req.body.completedMinutes||0)});
  const next = saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/routine-sessions', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (!['child','parent'].includes(req.user.role)) return res.status(403).json({error:'This account cannot record a home routine.'});
  const db = loadDb();
  const totalSteps = Math.max(1,Number(req.body.totalSteps || 3)); const completedSteps = Math.max(0,Number(req.body.completedSteps || 0));
  db.routineSessions.unshift({ id:id('routine'), childId:req.childId, actorUserId:req.user.id, createdAt:nowIso(), routineId:String(req.body.routineId||'homework'), completedSteps, totalSteps });
  if (completedSteps >= totalSteps) db.rewardTransactions.unshift({ id:id('reward'), childId:req.childId, actorUserId:req.user.id, createdAt:nowIso(), amount:15, reason:'Routine completed' });
  addEvent(db,req.user,req.childId!,'ROUTINE_RECORDED',{completedSteps,totalSteps});
  const next = saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/screenings', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (!['child','parent','teacher'].includes(req.user.role)) return res.status(403).json({error:'This account cannot save a check-in.'});
  const db = loadDb(); db.screenings ||= [];
  const completedAt=nowIso();
  db.screenings.unshift({ id:id('screen'), childId:req.childId, userId:req.user.id, actorUserId:req.user.id, respondentRole:req.user.role, respondentName:req.user.name, startedAt:req.body.startedAt||completedAt, completedAt, createdAt:completedAt, profileVersion:'support-profile-1.0', ...req.body });
  const storedUser=db.users.find((u:any)=>u.id===req.user.id); if(storedUser) storedUser.screeningCompleted=true;
  if(req.user.role==='child') db.rewardTransactions.unshift({id:id('reward'),childId:req.childId,actorUserId:req.user.id,createdAt:completedAt,amount:20,reason:'Support Profile check-in completed'});
  addEvent(db,req.user,req.childId!,'SCREENING_SAVED'); audit(db,req.user,'SCREENING_SAVED',req.childId);
  const next=saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/mood', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (req.user.role !== 'child') return res.status(403).json({error:'Mood check-in belongs to the student account.'});
  const db=loadDb(); db.moodCheckins.unshift({id:id('mood'),childId:req.childId,actorUserId:req.user.id,createdAt:nowIso(),mood:String(req.body.mood||'okay')});
  addEvent(db,req.user,req.childId!,'MOOD_CHECKIN',{mood:req.body.mood}); const next=saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/missions/:missionId/complete', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (req.user.role !== 'child') return res.status(403).json({error:'Missions can only be completed from the student account.'});
  const db=loadDb(); const missionId=req.params.missionId;
  if (!(db.missionCompletions || []).some((m:any)=>m.childId===req.childId && m.missionId===missionId)) {
    const snapshot=publicSnapshot(db,req.user,req.childId!); const mission=snapshot.todayMissions.find((m:any)=>m.id===missionId);
    db.missionCompletions.push({id:id('mc'),childId:req.childId,missionId,completedAt:nowIso(),actorUserId:req.user.id});
    db.rewardTransactions.unshift({id:id('reward'),childId:req.childId,actorUserId:req.user.id,createdAt:nowIso(),amount:Number(mission?.stars||20),reason:`${mission?.title||'Mission'} completed`});
    addEvent(db,req.user,req.childId!,'MISSION_COMPLETED',{missionId});
  }
  const next=saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/rewards/redeem', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (req.user.role !== 'child') return res.status(403).json({error:'Rewards can only be redeemed from the student account.'});
  const db=loadDb(); const balance=(db.rewardTransactions||[]).filter((r:any)=>r.childId===req.childId).reduce((s:number,r:any)=>s+Number(r.amount||0),0); const cost=Number(req.body.cost||0);
  if(cost<=0||balance<cost) return res.status(400).json({error:'Not enough Stars'});
  db.rewardTransactions.unshift({id:id('reward'),childId:req.childId,actorUserId:req.user.id,createdAt:nowIso(),amount:-cost,reason:`Redeemed ${req.body.name||'reward'}`});
  db.redeemedRewards.push({id:id('redeem'),childId:req.childId,rewardId:req.body.id,name:req.body.name,cost,redeemedAt:nowIso(),actorUserId:req.user.id});
  addEvent(db,req.user,req.childId!,'REWARD_REDEEMED',{name:req.body.name,cost}); const next=saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/messages', authenticate, resolveChild, (req:AuthRequest,res)=>{
  const db=loadDb();
  db.messages.unshift({id:id('msg'),childId:req.childId,actorUserId:req.user.id,createdAt:nowIso(),fromRole:req.user.role,fromName:req.user.name,toRole:String(req.body.toRole||''),text:String(req.body.text||'').slice(0,2000)});
  addEvent(db,req.user,req.childId!,'MESSAGE_SENT',{toRole:req.body.toRole}); const next=saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.post('/api/referrals', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (!['parent','teacher'].includes(req.user.role)) return res.status(403).json({error:'Only parent or teacher accounts can start a referral request.'});
  const db=loadDb(); db.referrals.unshift({id:id('ref'),childId:req.childId,actorUserId:req.user.id,createdAt:nowIso(),status:'requested',consent:req.user.role==='parent' ? Boolean(req.body.consent) : false,reason:String(req.body.reason||'Persistent support needs require further review.'),...req.body});
  addEvent(db,req.user,req.childId!,'REFERRAL_CREATED'); audit(db,req.user,'REFERRAL_CREATED',req.childId); const next=saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

app.patch('/api/referrals/:referralId', authenticate, resolveChild, (req:AuthRequest,res)=>{
  if (!['parent','professional'].includes(req.user.role)) return res.status(403).json({error:'This account cannot update the referral.'});
  const db=loadDb(); const ref=(db.referrals||[]).find((r:any)=>r.id===req.params.referralId && r.childId===req.childId); if(!ref) return res.status(404).json({error:'Referral not found'});
  const allowed = req.user.role==='professional' ? ['status','professionalNote'] : ['consent','status'];
  for (const key of allowed) if (key in req.body) ref[key]=req.body[key];
  if (req.user.role==='professional') ref.professionalName=req.user.name;
  ref.updatedAt=nowIso(); ref.updatedBy=req.user.id;
  addEvent(db,req.user,req.childId!,'REFERRAL_UPDATED',{status:ref.status}); audit(db,req.user,'REFERRAL_UPDATED',req.childId); const next=saveDb(db); res.json(publicSnapshot(next,req.user,req.childId!));
});

async function start() {
  const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');
  if (isProduction) {
    const dist = path.join(root, 'dist');
    app.use(express.static(dist));
    app.get('*', (_req,res)=>res.sendFile(path.join(dist,'index.html')));
  } else {
    const vite = await createViteServer({ root, server:{ middlewareMode:true }, appType:'spa' });
    app.use(vite.middlewares);
  }
  app.listen(port, '0.0.0.0', ()=>console.log(`HEBAT 2.0 Account Backend running at http://localhost:${port}`));
}

start();
