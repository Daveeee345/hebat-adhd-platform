import { useEffect, useMemo, useState } from 'react';
import type { Page } from './types';
import Layout from './components/Layout';
import ChildDashboard from './pages/ChildDashboard';
import ParentDashboard from './pages/ParentDashboard';
import FocusTimer from './pages/FocusTimer';
import LearnModules from './pages/LearnModules';
import MoodCheck from './pages/MoodCheck';
import Rewards from './pages/Rewards';
import Screening from './pages/Screening';
import Consultation from './pages/Consultation';
import TeacherDashboard from './pages/TeacherDashboard';
import RoutineBuilder from './pages/RoutineBuilder';
import PMTModules from './pages/PMTModules';
import ChildSupportPlan from './pages/ChildSupportPlan';
import ProfessionalDashboard from './pages/ProfessionalDashboard';
import AuthPage from './pages/AuthPage';
import NoLinkedChild from './pages/NoLinkedChild';
import AccountHistory from './pages/AccountHistory';
import { useAuth } from './lib/AuthContext';

const dashboardFor = (role:'parent'|'child'|'teacher'|'professional'):Page => role==='parent'?'parent-dashboard':role==='teacher'?'teacher-dashboard':role==='professional'?'professional-dashboard':'child-dashboard';

export default function App() {
  const {user,linkedChildren,loading:authLoading} = useAuth();
  const role = (user?.role || 'child') as 'parent'|'child'|'teacher'|'professional';
  const defaultPage = useMemo(()=>dashboardFor(role),[role]);
  const [currentPage,setCurrentPage] = useState<Page>('child-dashboard');

  useEffect(()=>{
    if(!user) return;
    const key=`hebat_page_${user.id}`;
    const saved=sessionStorage.getItem(key) as Page | null;
    setCurrentPage(saved || dashboardFor(user.role));
  },[user?.id]);

  useEffect(()=>{
    if(user) sessionStorage.setItem(`hebat_page_${user.id}`,currentPage);
  },[currentPage,user?.id]);

  useEffect(()=>{
    const handler=(e:Event)=>{ const page=(e as CustomEvent).detail as Page; if(page) setCurrentPage(page); };
    window.addEventListener('change-page',handler);
    return ()=>window.removeEventListener('change-page',handler);
  },[]);

  if(authLoading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 rounded-3xl bg-primary text-white border-b-4 border-primary-dark flex items-center justify-center mx-auto text-2xl font-black">H</div><div className="text-2xl font-black text-primary mt-4">HEBAT</div><div className="text-sm font-bold text-neutral-400 mt-1">Loading your workspace…</div></div></div>;
  if(!user) return <AuthPage/>;
  if(!linkedChildren.length) return <NoLinkedChild/>;

  const renderPage=()=>{
    switch(currentPage){
      case 'child-dashboard': return <ChildDashboard setPage={setCurrentPage}/>;
      case 'parent-dashboard': return <ParentDashboard setPage={setCurrentPage}/>;
      case 'teacher-dashboard': return <TeacherDashboard setPage={setCurrentPage}/>;
      case 'professional-dashboard': return <ProfessionalDashboard setPage={setCurrentPage}/>;
      case 'support-plan': return <ChildSupportPlan currentRole={role} setPage={setCurrentPage}/>;
      case 'focus-timer': return <FocusTimer/>;
      case 'learn-modules': return <LearnModules/>;
      case 'mood-check': return <MoodCheck/>;
      case 'rewards': return <Rewards/>;
      case 'routine-builder': return <RoutineBuilder role={role==='child'?'child':'parent'}/>;
      case 'pmt-modules': return <PMTModules/>;
      case 'screening-intro': case 'screening-quiz': case 'screening-results': return <Screening step={currentPage} setPage={setCurrentPage}/>;
      case 'consultation': return <Consultation/>;
      case 'account-history': return <AccountHistory/>;
      default:return role==='parent'?<ParentDashboard setPage={setCurrentPage}/>:role==='teacher'?<TeacherDashboard setPage={setCurrentPage}/>:role==='professional'?<ProfessionalDashboard setPage={setCurrentPage}/>:<ChildDashboard setPage={setCurrentPage}/>;
    }
  };

  return <Layout currentPage={currentPage} setPage={setCurrentPage} role={role}>{renderPage()}</Layout>;
}
