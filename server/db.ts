import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { calculateSupportProfile, buildSupportPlan, recommendedFocusMinutes } from './supportEngine.ts';
import { hashPassword } from './auth.ts';

export interface HebatDb { [key: string]: any }

const DATA_DIR = path.resolve(process.cwd(), 'server/data');
const DATA_FILE = path.join(DATA_DIR, 'hebat-db.json');

const nowIso = () => new Date().toISOString();
const makeId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
const makeInviteCode = () => crypto.randomBytes(4).toString('hex').toUpperCase();

function seedDb(): HebatDb {
  const now = new Date();
  const iso = (daysAgo: number, hour = 9) => {
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
  };

  const demoPassword = 'Demo123!';
  const studentPass = hashPassword(demoPassword);
  const parentPass = hashPassword(demoPassword);
  const teacherPass = hashPassword(demoPassword);
  const professionalPass = hashPassword(demoPassword);

  const users = [
    { id:'user-leo', email:'student@hebat.demo', name:'Leo Pratama', role:'child', passwordSalt:studentPass.salt, passwordHash:studentPass.hash, createdAt:iso(30), profileComplete:true },
    { id:'user-maya', email:'parent@hebat.demo', name:'Maya Pratama', role:'parent', passwordSalt:parentPass.salt, passwordHash:parentPass.hash, createdAt:iso(30), profileComplete:true },
    { id:'user-ratna', email:'teacher@hebat.demo', name:'Ibu Ratna', role:'teacher', passwordSalt:teacherPass.salt, passwordHash:teacherPass.hash, createdAt:iso(30), profileComplete:true },
    { id:'user-sarah', email:'professional@hebat.demo', name:'Dr. Sarah Jenkins', role:'professional', passwordSalt:professionalPass.salt, passwordHash:professionalPass.hash, createdAt:iso(30), profileComplete:true },
  ];

  return {
    version: 4,
    users,
    sessions: [],
    userChildLinks: [
      { id:'link-leo-self', userId:'user-leo', childId:'leo-1', relationship:'self', createdAt:iso(30) },
      { id:'link-leo-parent', userId:'user-maya', childId:'leo-1', relationship:'parent', createdAt:iso(30) },
      { id:'link-leo-teacher', userId:'user-ratna', childId:'leo-1', relationship:'teacher', createdAt:iso(30) },
      { id:'link-leo-pro', userId:'user-sarah', childId:'leo-1', relationship:'professional', createdAt:iso(12) },
    ],
    children: [{
      id: 'leo-1', name: 'Leo Pratama', age: 9, grade: 'Grade 4', school: 'SD Nusantara Bangsa', avatar: '🦁', inviteCode:'LEO2026A',
      strengths: ['Visual creativity', 'Empathy with peers', 'Hands-on problem solving'], createdAt:iso(30)
    }],
    observations: [
      { id:'obs-1', childId:'leo-1', actorUserId:'user-ratna', authorRole:'teacher', authorName:'Ibu Ratna', createdAt:iso(0,10), attention:'some', taskCompletion:'partial', promptLevel:'one_two', transition:'prompt', note:'Completed reading after the worksheet was split into three steps.' },
      { id:'obs-2', childId:'leo-1', actorUserId:'user-maya', authorRole:'parent', authorName:'Maya Pratama', createdAt:iso(1,19), attention:'some', taskCompletion:'partial', promptLevel:'one_two', transition:'smooth', note:'Homework was easier after using the visual three-step routine.' },
      { id:'obs-3', childId:'leo-1', actorUserId:'user-ratna', authorRole:'teacher', authorName:'Ibu Ratna', createdAt:iso(2,11), attention:'some', taskCompletion:'not_completed', promptLevel:'frequent', transition:'prompt', note:'Long math worksheet needed repeated redirection.' },
      { id:'obs-4', childId:'leo-1', actorUserId:'user-ratna', authorRole:'teacher', authorName:'Ibu Ratna', createdAt:iso(4,9), attention:'some', taskCompletion:'completed', promptLevel:'one_two', transition:'smooth', note:'Short task card worked well.' },
    ],
    focusSessions: [
      { id:'focus-1', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(1,17), assignedMinutes:7, completedMinutes:7, completed:true },
      { id:'focus-2', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(2,17), assignedMinutes:7, completedMinutes:7, completed:true },
      { id:'focus-3', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(3,17), assignedMinutes:6, completedMinutes:6, completed:true },
      { id:'focus-4', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(5,17), assignedMinutes:7, completedMinutes:5, completed:false },
    ],
    routineSessions: [
      { id:'routine-1', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(0,18), routineId:'homework', completedSteps:2, totalSteps:3 },
      { id:'routine-2', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(1,18), routineId:'homework', completedSteps:3, totalSteps:3 },
      { id:'routine-3', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(2,18), routineId:'homework', completedSteps:3, totalSteps:3 },
      { id:'routine-4', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(3,18), routineId:'homework', completedSteps:2, totalSteps:3 },
      { id:'routine-5', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(4,18), routineId:'homework', completedSteps:3, totalSteps:3 },
    ],
    moodCheckins: [{ id:'mood-1', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(0,8), mood:'okay' }],
    screenings: [],
    rewardTransactions: [
      { id:'r-1', childId:'leo-1', actorUserId:'system', createdAt:iso(8), amount:200, reason:'Welcome Stars' },
      { id:'r-2', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(3), amount:60, reason:'Learning missions' },
      { id:'r-3', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(2), amount:40, reason:'Focus Sprints' },
      { id:'r-4', childId:'leo-1', actorUserId:'user-leo', createdAt:iso(1), amount:35, reason:'Routine completion' },
    ],
    messages: [
      { id:'msg-1', childId:'leo-1', actorUserId:'user-ratna', createdAt:iso(0,11), fromRole:'teacher', fromName:'Ibu Ratna', toRole:'parent', text:'Leo responded well when the math worksheet was split into three visible steps.' },
      { id:'msg-2', childId:'leo-1', actorUserId:'user-maya', createdAt:iso(1,20), fromRole:'parent', fromName:'Maya Pratama', toRole:'teacher', text:'We used the same three-step routine at home and homework went more smoothly.' }
    ],
    referrals: [{ id:'ref-1', childId:'leo-1', actorUserId:'user-maya', createdAt:iso(10), status:'monitoring', consent:true, reason:'Persistent attention and task-completion support needs across school and home.', professionalName:'Dr. Sarah Jenkins', professionalNote:'Continue coordinated support for two more weeks before deciding whether an in-person review is needed.' }],
    masteryTracks: [
      { id:'track-focus-leo', childId:'leo-1', key:'focus', label:'Focus', stage:3, maxStage:5, progress:62 },
      { id:'track-task-leo', childId:'leo-1', key:'task', label:'Task Completion', stage:3, maxStage:5, progress:70 },
      { id:'track-memory-leo', childId:'leo-1', key:'memory', label:'Working Memory', stage:2, maxStage:5, progress:45 },
      { id:'track-routine-leo', childId:'leo-1', key:'routine', label:'Routine', stage:4, maxStage:5, progress:78 },
      { id:'track-reading-leo', childId:'leo-1', key:'reading', label:'Reading', stage:4, maxStage:5, progress:82 },
      { id:'track-math-leo', childId:'leo-1', key:'math', label:'Mathematics', stage:3, maxStage:5, progress:65 },
    ],
    missionCompletions: [{ id:'mc-warmup', childId:'leo-1', missionId:'mission-warmup', completedAt:iso(2), actorUserId:'user-leo' }],
    redeemedRewards: [],
    events: [],
    auditLogs: [],
  };
}

function migrate(db: HebatDb): HebatDb {
  db.version = 4;
  db.users ||= [];
  db.sessions ||= [];
  db.userChildLinks ||= [];
  db.events ||= [];
  db.auditLogs ||= [];
  db.missionCompletions ||= [];
  db.redeemedRewards ||= [];
  db.masteryTracks ||= [];

  if (Array.isArray(db.completedMissionIds) && !db.missionCompletions.length) {
    db.missionCompletions = db.completedMissionIds.map((missionId:string) => ({ id:makeId('mc'), childId:'leo-1', missionId, completedAt:nowIso(), actorUserId:'system' }));
  }
  delete db.completedMissionIds;
  delete db.supportProfile;
  delete db.supportPlan;
  delete db.weeklyMetrics;
  delete db.todayMissions;

  for (const track of db.masteryTracks) track.childId ||= 'leo-1';
  for (const item of db.redeemedRewards) item.childId ||= 'leo-1';
  for (const child of db.children || []) child.inviteCode ||= makeInviteCode();

  // If an old database is reused, create the demo auth layer without resetting user history.
  if (!db.users.length) {
    const password = 'Demo123!';
    const demoUsers = [
      ['user-leo','student@hebat.demo','Leo Pratama','child'],
      ['user-maya','parent@hebat.demo','Maya Pratama','parent'],
      ['user-ratna','teacher@hebat.demo','Ibu Ratna','teacher'],
      ['user-sarah','professional@hebat.demo','Dr. Sarah Jenkins','professional'],
    ];
    db.users = demoUsers.map(([id,email,name,role]) => { const p=hashPassword(password); return {id,email,name,role,passwordSalt:p.salt,passwordHash:p.hash,createdAt:nowIso(),profileComplete:true}; });
  }
  if (!db.userChildLinks.length && (db.children || []).length) {
    db.userChildLinks = [
      {id:'link-leo-self',userId:'user-leo',childId:'leo-1',relationship:'self',createdAt:nowIso()},
      {id:'link-leo-parent',userId:'user-maya',childId:'leo-1',relationship:'parent',createdAt:nowIso()},
      {id:'link-leo-teacher',userId:'user-ratna',childId:'leo-1',relationship:'teacher',createdAt:nowIso()},
      {id:'link-leo-pro',userId:'user-sarah',childId:'leo-1',relationship:'professional',createdAt:nowIso()},
    ];
  }
  return db;
}

export function loadDb(): HebatDb {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    const db = seedDb();
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
    return db;
  }
  try {
    const db = migrate(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
    return db;
  } catch {
    const db = seedDb();
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
    return db;
  }
}

export function saveDb(db: HebatDb) {
  const next = migrate(db);
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2));
  return next;
}

export function createChildForUser(db: HebatDb, user: any, input: any) {
  const child = {
    id: makeId('child'),
    name: String(input.name || (user.role === 'child' ? user.name : 'My Child')).trim(),
    age: Number(input.age || 9),
    grade: String(input.grade || 'Grade 4'),
    school: String(input.school || 'HEBAT Partner School'),
    avatar: String(input.avatar || '🦁'),
    inviteCode: makeInviteCode(),
    strengths: Array.isArray(input.strengths) ? input.strengths : [],
    createdAt: nowIso(),
  };
  db.children.push(child);
  db.userChildLinks.push({ id:makeId('link'), userId:user.id, childId:child.id, relationship:user.role === 'child' ? 'self' : user.role, createdAt:nowIso() });
  db.masteryTracks.push(
    { id:makeId('track'), childId:child.id, key:'focus', label:'Focus', stage:1, maxStage:5, progress:0 },
    { id:makeId('track'), childId:child.id, key:'task', label:'Task Completion', stage:1, maxStage:5, progress:0 },
    { id:makeId('track'), childId:child.id, key:'memory', label:'Working Memory', stage:1, maxStage:5, progress:0 },
    { id:makeId('track'), childId:child.id, key:'routine', label:'Routine', stage:1, maxStage:5, progress:0 },
    { id:makeId('track'), childId:child.id, key:'reading', label:'Reading', stage:1, maxStage:5, progress:0 },
    { id:makeId('track'), childId:child.id, key:'math', label:'Mathematics', stage:1, maxStage:5, progress:0 },
  );
  db.rewardTransactions.push({ id:makeId('reward'), childId:child.id, actorUserId:'system', createdAt:nowIso(), amount:100, reason:'Welcome Stars' });
  return child;
}

export function linkedChildrenForUser(db: HebatDb, userId: string) {
  const ids = new Set((db.userChildLinks || []).filter((l:any)=>l.userId===userId).map((l:any)=>l.childId));
  const user = (db.users || []).find((u:any)=>u.id===userId);
  return (db.children || []).filter((c:any)=>{
    if (!ids.has(c.id)) return false;
    if (user?.role === 'professional') return (db.referrals || []).some((r:any)=>r.childId===c.id && r.consent===true && ['requested','monitoring','reviewed'].includes(r.status));
    return true;
  });
}

export function userCanAccessChild(db: HebatDb, userId: string, childId: string) {
  const linked = (db.userChildLinks || []).some((l:any)=>l.userId===userId && l.childId===childId);
  if (!linked) return false;
  const user = (db.users || []).find((u:any)=>u.id===userId);
  if (user?.role === 'professional') {
    return (db.referrals || []).some((r:any)=>r.childId===childId && r.consent===true && ['requested','monitoring','reviewed'].includes(r.status));
  }
  return true;
}

export function linkUserToChildByCode(db: HebatDb, user: any, code: string) {
  const normalized = String(code || '').trim().toUpperCase();
  const child = (db.children || []).find((c:any)=>String(c.inviteCode).toUpperCase()===normalized);
  if (!child) return null;
  if (user.role === 'professional') {
    const permittedReferral = (db.referrals || []).some((r:any)=>r.childId===child.id && r.consent===true && ['requested','monitoring','reviewed'].includes(r.status));
    if (!permittedReferral) return null;
  }
  if (!userCanAccessChild(db,user.id,child.id)) {
    db.userChildLinks.push({ id:makeId('link'), userId:user.id, childId:child.id, relationship:user.role, createdAt:nowIso() });
  }
  return child;
}

export function childComputedState(db: HebatDb, childId: string) {
  const child = db.children.find((c:any)=>c.id===childId);
  const observations = (db.observations || []).filter((x:any) => x.childId === childId).sort((a:any,b:any)=>b.createdAt.localeCompare(a.createdAt));
  const focusSessions = (db.focusSessions || []).filter((x:any) => x.childId === childId).sort((a:any,b:any)=>b.createdAt.localeCompare(a.createdAt));
  const routines = (db.routineSessions || []).filter((x:any) => x.childId === childId).sort((a:any,b:any)=>b.createdAt.localeCompare(a.createdAt));
  const screenings=(db.screenings||[]).filter((x:any)=>x.childId===childId).sort((a:any,b:any)=>String(b.completedAt||b.createdAt).localeCompare(String(a.completedAt||a.createdAt)));
  const supportProfile = calculateSupportProfile(observations, focusSessions, routines, screenings[0]?.supportProfile);
  const attentionHigh=supportProfile.domains.find((d:any)=>d.key==='attention')?.need==='High';
  const focusMinutes = attentionHigh ? 5 : recommendedFocusMinutes(focusSessions);
  const supportPlan = buildSupportPlan(supportProfile, focusMinutes, childId, child?.name || 'the child');

  const routineRate = routines.slice(0,5).length ? routines.slice(0,5).reduce((a:number,r:any)=>a + (r.totalSteps ? r.completedSteps/r.totalSteps : 0),0)/routines.slice(0,5).length : 0;
  const completedFocus = focusSessions.filter((s:any)=>s.completed).slice(0,6);
  const avgFocus = completedFocus.length ? completedFocus.reduce((a:number,s:any)=>a+s.completedMinutes,0)/completedFocus.length : focusMinutes;
  const recentObs = observations.slice(0,6);
  const completedTask = recentObs.filter((o:any)=>o.taskCompletion==='completed').length;
  const partialTask = recentObs.filter((o:any)=>o.taskCompletion==='partial').length;
  const weeklyMetrics = {
    focusMinutes: Math.round(avgFocus * 10) / 10,
    focusTrend: completedFocus.length > 1 ? `${completedFocus[0].completedMinutes >= completedFocus[completedFocus.length-1].completedMinutes ? '+' : ''}${Math.round((completedFocus[0].completedMinutes-completedFocus[completedFocus.length-1].completedMinutes)*10)/10} min` : 'Baseline',
    routineCompletion: Math.round(routineRate * 100),
    taskCompletion: recentObs.length ? Math.round(((completedTask + partialTask * .5)/recentObs.length)*100) : 0,
    observationsThisWeek: recentObs.length,
    updatedAt: nowIso()
  };

  const completedIds = new Set((db.missionCompletions || []).filter((x:any)=>x.childId===childId).map((x:any)=>x.missionId));
  const baseMissions = [
    { id:'mission-reading', type:'learning', moduleId:1, title:'Reading Mission', subtitle:'Find the Main Idea', duration:7, stars:25, status: completedIds.has('mission-reading') ? 'completed' : 'ready' },
    { id:'mission-focus', type:'focus', title:'Focus Sprint', subtitle:'Stay with one task', duration:focusMinutes, stars:20, status: completedIds.has('mission-focus') ? 'completed' : 'ready' },
    { id:'mission-memory', type:'learning', moduleId:4, title:'Memory Mission', subtitle:'Remember and follow small steps', duration:5, stars:25, status: completedIds.has('mission-memory') ? 'completed' : 'ready' },
  ];
  const routinePriority=supportProfile.domains.find((d:any)=>d.key==='routine')?.need==='High';
  const todayMissions=routinePriority ? [{id:'mission-routine',type:'routine',title:'Routine Builder',subtitle:'One step at a time',duration:4,stars:15,status:'ready'},...baseMissions.slice(0,2)] : baseMissions;
  return { observations, focusSessions, routines, supportProfile, supportPlan, weeklyMetrics, todayMissions };
}

function eventHistoryForChild(db: HebatDb, childId:string) {
  const items:any[] = [];
  const actor = (userId:string|undefined) => {
    const user = (db.users || []).find((u:any)=>u.id===userId);
    return user ? { actorName:user.name, actorRole:user.role } : { actorName:userId==='system'?'HEBAT System':'Unknown', actorRole:userId==='system'?'system':'unknown' };
  };
  for (const x of db.observations || []) if(x.childId===childId) items.push({id:x.id,type:'observation',title:`${x.authorRole === 'teacher' ? 'Teacher' : x.authorRole === 'parent' ? 'Parent' : 'Support'} observation`,detail:x.note || 'Observation recorded',createdAt:x.createdAt,actorUserId:x.actorUserId,...actor(x.actorUserId)});
  for (const x of db.focusSessions || []) if(x.childId===childId) items.push({id:x.id,type:'focus',title:'Focus Sprint',detail:`${x.completedMinutes}/${x.assignedMinutes} min${x.completed ? ' completed' : ''}`,createdAt:x.createdAt,actorUserId:x.actorUserId,...actor(x.actorUserId)});
  for (const x of db.routineSessions || []) if(x.childId===childId) items.push({id:x.id,type:'routine',title:'Routine',detail:`${x.completedSteps}/${x.totalSteps} steps`,createdAt:x.createdAt,actorUserId:x.actorUserId,...actor(x.actorUserId)});
  for (const x of db.moodCheckins || []) if(x.childId===childId) items.push({id:x.id,type:'mood',title:'Mood check-in',detail:String(x.mood || 'check-in'),createdAt:x.createdAt,actorUserId:x.actorUserId,...actor(x.actorUserId)});
  for (const x of db.screenings || []) if(x.childId===childId) items.push({id:x.id,type:'screening',title:'Screening saved',detail:x.resultCategory || x.category || 'Screening record',createdAt:x.createdAt,actorUserId:x.actorUserId,...actor(x.actorUserId)});
  for (const x of db.missionCompletions || []) if(x.childId===childId) items.push({id:x.id,type:'mission',title:'Mission completed',detail:x.missionId,createdAt:x.completedAt,actorUserId:x.actorUserId,...actor(x.actorUserId)});
  for (const x of db.messages || []) if(x.childId===childId) items.push({id:x.id,type:'message',title:'Home-school message',detail:String(x.text || '').slice(0,180),createdAt:x.createdAt,actorUserId:x.actorUserId,...actor(x.actorUserId)});
  for (const x of db.referrals || []) if(x.childId===childId) items.push({id:x.id,type:'referral',title:'Referral update',detail:x.status || 'Referral',createdAt:x.updatedAt || x.createdAt,actorUserId:x.updatedBy || x.actorUserId,...actor(x.updatedBy || x.actorUserId)});
  return items.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))).slice(0,80);
}

export function publicSnapshot(db: HebatDb, user: any, childId: string) {
  const child = db.children.find((c:any)=>c.id===childId);
  if (!child) throw new Error('Child not found');
  const computed = childComputedState(db, child.id);
  const rewards = (db.rewardTransactions || []).filter((r:any)=>r.childId===child.id);
  const linkedChildren = linkedChildrenForUser(db,user.id).map((c:any)=>({id:c.id,name:c.name,age:c.age,grade:c.grade,school:c.school,avatar:c.avatar,inviteCode:c.inviteCode}));
  return {
    account: { id:user.id, name:user.name, email:user.email, role:user.role, profileComplete:user.profileComplete, screeningCompleted:user.screeningCompleted, demo:user.demo },
    linkedChildren,
    selectedChildId: child.id,
    child,
    supportProfile: computed.supportProfile,
    supportPlan: computed.supportPlan,
    todayMissions: computed.todayMissions,
    weeklyMetrics: computed.weeklyMetrics,
    observations: computed.observations,
    focusSessions: computed.focusSessions,
    routineSessions: computed.routines,
    moodCheckins: (db.moodCheckins || []).filter((m:any)=>m.childId===child.id).sort((a:any,b:any)=>b.createdAt.localeCompare(a.createdAt)),
    rewardBalance: rewards.reduce((sum:number,r:any)=>sum+Number(r.amount||0),0),
    rewardTransactions: rewards.sort((a:any,b:any)=>b.createdAt.localeCompare(a.createdAt)),
    messages: (db.messages || []).filter((m:any)=>m.childId===child.id).sort((a:any,b:any)=>b.createdAt.localeCompare(a.createdAt)),
    referrals: (db.referrals || []).filter((r:any)=>r.childId===child.id).sort((a:any,b:any)=>String(b.createdAt).localeCompare(String(a.createdAt))),
    masteryTracks: (db.masteryTracks || []).filter((m:any)=>m.childId===child.id),
    redeemedRewards: (db.redeemedRewards || []).filter((r:any)=>r.childId===child.id),
    screenings: (db.screenings || []).filter((s:any)=>s.childId===child.id).sort((a:any,b:any)=>String(b.createdAt).localeCompare(String(a.createdAt))),
    eventHistory: eventHistoryForChild(db, child.id),
  };
}
