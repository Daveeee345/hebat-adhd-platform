import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi, type AuthUser, type LinkedChild } from './hebatApi';

type AuthContextValue = {
  user: AuthUser | null;
  linkedChildren: LinkedChild[];
  loading: boolean;
  error: string | null;
  login: (email:string,password:string)=>Promise<void>;
  register: (payload:any)=>Promise<void>;
  createDemo: (payload:any)=>Promise<void>;
  logout: ()=>Promise<void>;
  refreshMe: ()=>Promise<void>;
  createChild: (payload:any)=>Promise<void>;
  linkChild: (code:string)=>Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}:{children:ReactNode}) {
  const [user,setUser] = useState<AuthUser|null>(null);
  const [linkedChildren,setLinkedChildren] = useState<LinkedChild[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState<string|null>(null);

  const apply = useCallback((result:any)=>{
    setUser(result.user || null);
    setLinkedChildren(result.linkedChildren || []);
  },[]);

  const refreshMe = useCallback(async()=>{
    try { setError(null); apply(await authApi.me()); }
    catch { setUser(null); setLinkedChildren([]); }
    finally { setLoading(false); }
  },[apply]);

  useEffect(()=>{ refreshMe(); },[refreshMe]);

  const value = useMemo<AuthContextValue>(()=>({
    user, linkedChildren, loading, error,
    login: async(email,password)=>{ setError(null); const result=await authApi.login(email,password); apply(result); },
    register: async(payload)=>{ setError(null); const result=await authApi.register(payload); apply(result); },
    createDemo: async(payload)=>{ setError(null); const result=await authApi.demo(payload); apply(result); },
    logout: async()=>{ try{await authApi.logout();}finally{setUser(null);setLinkedChildren([]);} },
    refreshMe,
    createChild: async(payload)=>{ const result=await authApi.createChild(payload); setLinkedChildren(result.linkedChildren||[]); },
    linkChild: async(code)=>{ const result=await authApi.linkChild(code); setLinkedChildren(result.linkedChildren||[]); },
  }),[user,linkedChildren,loading,error,apply,refreshMe]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
