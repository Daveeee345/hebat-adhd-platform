import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { hebatApi, type HebatSnapshot } from './hebatApi';
import { useAuth } from './AuthContext';

interface HebatDataValue {
  data: HebatSnapshot | null;
  loading: boolean;
  error: string | null;
  selectedChildId: string | null;
  setSelectedChildId: (id:string)=>void;
  refresh: () => Promise<void>;
  addObservation: (payload:any) => Promise<void>;
  saveFocus: (payload:any) => Promise<void>;
  saveRoutine: (payload:any) => Promise<void>;
  saveScreening: (payload:any) => Promise<void>;
  saveMood: (mood:string) => Promise<void>;
  completeMission: (missionId:string) => Promise<void>;
  redeemReward: (reward:any) => Promise<void>;
  sendMessage: (payload:any) => Promise<void>;
  requestReferral: (payload:any) => Promise<void>;
  updateReferral: (id:string,payload:any) => Promise<void>;
}

const Ctx = createContext<HebatDataValue | null>(null);

export function HebatDataProvider({ children }:{ children:ReactNode }) {
  const { user, linkedChildren } = useAuth();
  const [data,setData] = useState<HebatSnapshot|null>(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string|null>(null);
  const [selectedChildId,setSelectedChildIdState] = useState<string|null>(null);

  useEffect(()=>{
    if(!user){ setSelectedChildIdState(null); setData(null); return; }
    const stillLinked = linkedChildren.some(c=>c.id===selectedChildId);
    if(!stillLinked) setSelectedChildIdState(linkedChildren[0]?.id || null);
  },[user?.id,linkedChildren,selectedChildId]);

  const refresh = useCallback(async()=>{
    if(!user || !selectedChildId){ setData(null); setLoading(false); return; }
    setLoading(true);
    try { setError(null); setData(await hebatApi.bootstrap(selectedChildId)); }
    catch(e:any){ setError(e.message || 'Unable to load HEBAT data'); }
    finally { setLoading(false); }
  },[user,selectedChildId]);

  useEffect(()=>{ refresh(); },[refresh]);

  const wrap = useCallback(async(fn:()=>Promise<HebatSnapshot>)=>{
    try { setError(null); setData(await fn()); }
    catch(e:any){ setError(e.message || 'Something went wrong'); throw e; }
  },[]);

  const setSelectedChildId = useCallback((id:string)=>{
    if(linkedChildren.some(c=>c.id===id)) setSelectedChildIdState(id);
  },[linkedChildren]);

  const value = useMemo<HebatDataValue>(()=>({
    data,loading,error,selectedChildId,setSelectedChildId,refresh,
    addObservation:p=>wrap(()=>hebatApi.addObservation(p,selectedChildId||undefined)),
    saveFocus:p=>wrap(()=>hebatApi.saveFocus(p,selectedChildId||undefined)),
    saveRoutine:p=>wrap(()=>hebatApi.saveRoutine(p,selectedChildId||undefined)),
    saveScreening:p=>wrap(()=>hebatApi.saveScreening(p,selectedChildId||undefined)),
    saveMood:m=>wrap(()=>hebatApi.saveMood(m,selectedChildId||undefined)),
    completeMission:id=>wrap(()=>hebatApi.completeMission(id,selectedChildId||undefined)),
    redeemReward:r=>wrap(()=>hebatApi.redeemReward(r,selectedChildId||undefined)),
    sendMessage:p=>wrap(()=>hebatApi.sendMessage(p,selectedChildId||undefined)),
    requestReferral:p=>wrap(()=>hebatApi.requestReferral(p,selectedChildId||undefined)),
    updateReferral:(id,p)=>wrap(()=>hebatApi.updateReferral(id,p,selectedChildId||undefined)),
  }),[data,loading,error,selectedChildId,setSelectedChildId,refresh,wrap]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHebatData(){
  const ctx = useContext(Ctx);
  if(!ctx) throw new Error('useHebatData must be used inside HebatDataProvider');
  return ctx;
}
