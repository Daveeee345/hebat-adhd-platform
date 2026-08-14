export type NeedLevel = 'Low' | 'Moderate' | 'High';
export type AccountRole = 'child' | 'parent' | 'teacher' | 'professional';
export interface AuthUser { id:string; name:string; email:string; role:AccountRole; profileComplete?:boolean }
export interface LinkedChild { id:string; name:string; age:number; grade:string; school:string; avatar?:string; inviteCode?:string }

export interface HebatSnapshot {
  account: AuthUser;
  linkedChildren: LinkedChild[];
  selectedChildId: string;
  child: any;
  supportProfile: { domains: Array<{ key:string; label:string; score:number; need:NeedLevel }>; priorityKey:string; updatedAt:string; dataStatus?:string };
  supportPlan: any;
  todayMissions: Array<any>;
  weeklyMetrics: any;
  observations: Array<any>;
  focusSessions: Array<any>;
  routineSessions: Array<any>;
  moodCheckins: Array<any>;
  rewardBalance: number;
  rewardTransactions: Array<any>;
  messages: Array<any>;
  referrals: Array<any>;
  masteryTracks: Array<any>;
  redeemedRewards: Array<any>;
  screenings: Array<any>;
  eventHistory: Array<any>;
}

async function request<T>(url:string, init?:RequestInit):Promise<T> {
  const res = await fetch(url, {
    credentials:'same-origin',
    headers:{ 'Content-Type':'application/json', ...(init?.headers||{}) },
    ...init
  });
  const body = await res.json().catch(()=>({}));
  if (!res.ok) {
    const error:any = new Error(body.message || body.error || `Request failed: ${res.status}`);
    error.code = body.error;
    error.status = res.status;
    throw error;
  }
  return body;
}

export const authApi = {
  me: () => request<{user:AuthUser;linkedChildren:LinkedChild[]}>('/api/auth/me'),
  login: (email:string,password:string) => request<{user:AuthUser;linkedChildren:LinkedChild[]}>('/api/auth/login',{method:'POST',body:JSON.stringify({email,password})}),
  register: (payload:any) => request<{user:AuthUser;linkedChildren:LinkedChild[]}>('/api/auth/register',{method:'POST',body:JSON.stringify(payload)}),
  logout: () => request<{ok:boolean}>('/api/auth/logout',{method:'POST'}),
  createChild: (payload:any) => request<{child:LinkedChild;linkedChildren:LinkedChild[]}>('/api/account/children',{method:'POST',body:JSON.stringify(payload)}),
  linkChild: (code:string) => request<{child:LinkedChild;linkedChildren:LinkedChild[]}>('/api/account/link-child',{method:'POST',body:JSON.stringify({code})}),
  history: () => request<{events:any[];audit:any[]}>('/api/account/history'),
};

const withChild = (childId:string|undefined,payload:any={}) => ({...payload, ...(childId?{childId}:{})});

export const hebatApi = {
  bootstrap: (childId?:string) => request<HebatSnapshot>(`/api/bootstrap${childId?`?childId=${encodeURIComponent(childId)}`:''}`),
  addObservation: (payload:any,childId?:string) => request<HebatSnapshot>('/api/observations',{ method:'POST', body:JSON.stringify(withChild(childId,payload)) }),
  saveFocus: (payload:any,childId?:string) => request<HebatSnapshot>('/api/focus-sessions',{ method:'POST', body:JSON.stringify(withChild(childId,payload)) }),
  saveRoutine: (payload:any,childId?:string) => request<HebatSnapshot>('/api/routine-sessions',{ method:'POST', body:JSON.stringify(withChild(childId,payload)) }),
  saveScreening: (payload:any,childId?:string) => request<HebatSnapshot>('/api/screenings',{ method:'POST', body:JSON.stringify(withChild(childId,payload)) }),
  saveMood: (mood:string,childId?:string) => request<HebatSnapshot>('/api/mood',{ method:'POST', body:JSON.stringify(withChild(childId,{mood})) }),
  completeMission: (missionId:string,childId?:string) => request<HebatSnapshot>(`/api/missions/${missionId}/complete`,{ method:'POST', body:JSON.stringify(withChild(childId)) }),
  redeemReward: (reward:any,childId?:string) => request<HebatSnapshot>('/api/rewards/redeem',{ method:'POST', body:JSON.stringify(withChild(childId,reward)) }),
  sendMessage: (payload:any,childId?:string) => request<HebatSnapshot>('/api/messages',{ method:'POST', body:JSON.stringify(withChild(childId,payload)) }),
  requestReferral: (payload:any,childId?:string) => request<HebatSnapshot>('/api/referrals',{ method:'POST', body:JSON.stringify(withChild(childId,payload)) }),
  updateReferral: (referralId:string,payload:any,childId?:string) => request<HebatSnapshot>(`/api/referrals/${referralId}`,{ method:'PATCH', body:JSON.stringify(withChild(childId,payload)) }),
};
