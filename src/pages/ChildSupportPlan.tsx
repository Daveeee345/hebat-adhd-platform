import { ArrowLeft, CalendarDays, CheckCircle2, CircleHelp, Clock3, HeartHandshake, Home, School, ShieldCheck, Sparkles, Stethoscope, UserRound } from 'lucide-react';
import type { Page } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function ChildSupportPlan({ currentRole, setPage }:{ currentRole:'parent'|'child'|'teacher'|'professional'; setPage:(p:Page)=>void }){
  const { language }=useLanguage();
  const { data,loading,error }=useHebatData();
  const isId=language==='id';
  const back:Page=currentRole==='parent'?'parent-dashboard':currentRole==='teacher'?'teacher-dashboard':currentRole==='professional'?'professional-dashboard':'child-dashboard';
  if(loading) return <div className="max-w-5xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-72"/></div>;
  if(error||!data) return <div className="max-w-5xl mx-auto px-5 py-10"><div className="card-pillowy"><h2 className="font-black text-xl">Unable to load Support Plan</h2><p className="text-sm font-bold text-neutral-500 mt-2">{error}</p></div></div>;

  const priority=data.supportProfile.domains.find(d=>d.key===data.supportProfile.priorityKey);
  const roleActions=currentRole==='teacher'?data.supportPlan.teacher:currentRole==='parent'?data.supportPlan.parent:data.supportPlan.student;
  const roleLabel=currentRole==='teacher'?(isId?'Aksi Guru':'Teacher Actions'):currentRole==='parent'?(isId?'Aksi Orang Tua':'Parent Actions'):currentRole==='professional'?(isId?'Dukungan yang Sedang Berjalan':'Current Interventions'):(isId?'Misi Siswa':'Student Actions');

  return <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-7">
    <button onClick={()=>setPage(back)} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-500 hover:text-primary cursor-pointer"><ArrowLeft className="w-4 h-4"/>{isId?'Kembali':'Back'}</button>

    <header className="card-pillowy !p-0 overflow-hidden border-primary/30">
      <div className="bg-primary px-6 md:px-8 py-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><div className="text-[10px] font-black uppercase tracking-[.18em] opacity-80">HEBAT Support Plan • v{data.supportPlan.version}</div><h1 className="text-3xl font-black mt-1">{data.child.name}</h1><p className="text-sm font-bold opacity-90 mt-1">{isId?'Satu rencana bersama untuk rumah, sekolah, dan aktivitas belajar.':'One shared plan across home, school, and learning.'}</p></div>
        <div className="bg-white/15 border border-white/30 rounded-2xl px-4 py-3 min-w-40"><div className="text-[10px] font-black uppercase opacity-80">{isId?'Review berikutnya':'Next review'}</div><div className="text-lg font-black mt-1">{data.supportPlan.reviewInDays} {isId?'hari':'days'}</div></div>
      </div>
      <div className="p-6 md:p-8"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-primary-container text-primary flex items-center justify-center shrink-0"><ShieldCheck className="w-6 h-6"/></div><div><div className="text-[10px] uppercase font-black tracking-widest text-neutral-400">{isId?'Prioritas minggu ini':'This Week\'s Priority'}</div><h2 className="text-2xl font-black mt-1">{data.supportProfile.dataStatus==='baseline_needed'?(isId?'Membangun Baseline':'Building Baseline'):priority?.label}</h2><p className="text-base font-bold text-neutral-600 mt-2 leading-relaxed">{data.supportPlan.summary}</p></div></div></div>
    </header>

    <section className="card-pillowy">
      <div className="flex items-center justify-between gap-4"><div><div className="text-[10px] uppercase font-black tracking-widest text-neutral-400">{isId?'Profil Dukungan':'Support Profile'}</div><h2 className="text-xl font-black mt-1">{isId?'Kebutuhan saat ini':'Current Needs'}</h2></div><CircleHelp className="w-5 h-5 text-neutral-300"/></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">{data.supportProfile.domains.map((d:any)=><div key={d.key} className={cn('rounded-2xl border-2 p-4',d.key===data.supportProfile.priorityKey?'border-primary/40 bg-primary-container/15':'border-surface-variant bg-white')}><div className="flex items-center justify-between gap-2"><div className="font-black text-sm">{d.label}</div><span className={cn('px-2.5 py-1 rounded-full text-[10px] uppercase font-black',d.need==='High'?'bg-amber-100 text-amber-800':d.need==='Moderate'?'bg-secondary-container text-secondary-dark':'bg-tertiary-container text-tertiary-dark')}>{d.need}</span></div><div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden mt-3"><div className={cn('h-full rounded-full',d.need==='High'?'bg-amber-400':d.need==='Moderate'?'bg-secondary':'bg-tertiary')} style={{width:`${d.score}%`}}/></div></div>)}</div>
      <p className="text-xs font-bold text-neutral-400 mt-4">{isId?'Skor internal hanya membantu memprioritaskan dukungan pendidikan. Ini bukan probabilitas atau diagnosis ADHD.':'Internal scores only help prioritise educational support. They are not an ADHD probability or diagnosis.'}</p>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <ActionColumn icon={<UserRound className="w-5 h-5"/>} title={isId?'Siswa':'Student'} items={data.supportPlan.student} active={currentRole==='child'}/>
      <ActionColumn icon={<School className="w-5 h-5"/>} title={isId?'Sekolah':'School'} items={data.supportPlan.teacher} active={currentRole==='teacher'}/>
      <ActionColumn icon={<Home className="w-5 h-5"/>} title={isId?'Rumah':'Home'} items={data.supportPlan.parent} active={currentRole==='parent'}/>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card-pillowy border-secondary/20 bg-secondary-container/10">
        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center"><Sparkles className="w-5 h-5"/></div><div><div className="text-[10px] font-black uppercase tracking-widest text-secondary-dark">{roleLabel}</div><h3 className="text-xl font-black mt-0.5">{isId?'Yang perlu dilakukan sekarang':'What to do now'}</h3></div></div>
        <div className="space-y-3 mt-5">{roleActions.map((x:string,i:number)=><div key={x} className="flex items-start gap-3 bg-white border border-surface-variant rounded-2xl p-4"><div className="w-7 h-7 rounded-lg bg-secondary-container text-secondary-dark flex items-center justify-center text-xs font-black shrink-0">{i+1}</div><span className="text-sm font-black leading-relaxed">{x}</span></div>)}</div>
      </div>
      <div className="card-pillowy">
        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center"><CircleHelp className="w-5 h-5"/></div><div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Mengapa strategi ini':'Why these strategies'}</div><h3 className="text-xl font-black mt-0.5">{isId?'Penjelasan yang bisa diaudit':'Explainable Logic'}</h3></div></div>
        <div className="space-y-3 mt-5">{data.supportPlan.reasons.map((x:string)=><div key={x} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-tertiary mt-0.5 shrink-0"/><span className="text-sm font-bold text-neutral-600 leading-relaxed">{x}</span></div>)}</div>
      </div>
    </section>

    <section className="card-pillowy">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5"><div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Monitoring':'Monitoring'}</div><h3 className="text-xl font-black mt-1">{isId?'Apa yang akan ditinjau minggu depan':'What HEBAT will review next week'}</h3></div><div className="flex gap-2"><span className="px-3 py-2 rounded-xl bg-neutral-100 text-xs font-black flex items-center gap-1.5"><Clock3 className="w-4 h-4"/>{data.supportPlan.focusMinutes}m focus</span><span className="px-3 py-2 rounded-xl bg-neutral-100 text-xs font-black flex items-center gap-1.5"><CalendarDays className="w-4 h-4"/>{data.weeklyMetrics.routineCompletion}% routine</span></div></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5"><MiniMetric value={`${data.weeklyMetrics.taskCompletion}%`} label={isId?'Penyelesaian tugas':'Task completion'}/><MiniMetric value={`${data.weeklyMetrics.focusMinutes} min`} label={isId?'Fokus berhasil':'Successful focus'}/><MiniMetric value={`${data.weeklyMetrics.routineCompletion}%`} label={isId?'Rutinitas':'Routine completion'}/></div>
    </section>

    {currentRole==='professional'&&<section className="card-pillowy border-tertiary/30 bg-tertiary-container/10 flex items-start gap-4"><div className="w-11 h-11 rounded-2xl bg-tertiary text-white flex items-center justify-center shrink-0"><Stethoscope className="w-5 h-5"/></div><div><div className="text-[10px] font-black uppercase tracking-widest text-tertiary-dark">{isId?'Batas klinis':'Clinical Boundary'}</div><h3 className="text-lg font-black mt-1">{isId?'HEBAT mendukung koordinasi, bukan diagnosis':'HEBAT supports coordination, not diagnosis'}</h3><p className="text-sm font-bold text-neutral-600 mt-1 leading-relaxed">{isId?'Keputusan diagnosis dan penanganan klinis dilakukan di luar HEBAT oleh profesional yang berwenang.':'Diagnostic and clinical treatment decisions remain outside HEBAT and with qualified professionals.'}</p></div></section>}
  </div>
}

function ActionColumn({icon,title,items,active}:{icon:any;title:string;items:string[];active:boolean}){return <div className={cn('card-pillowy !p-5',active&&'border-primary/40 bg-primary-container/10')}><div className="flex items-center gap-2.5"><div className={cn('w-9 h-9 rounded-xl flex items-center justify-center',active?'bg-primary text-white':'bg-neutral-100 text-neutral-600')}>{icon}</div><h3 className="text-lg font-black">{title}</h3></div><div className="space-y-3 mt-4">{items.map((x,i)=><div key={x} className="flex items-start gap-2.5"><div className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i+1}</div><p className="text-sm font-bold text-neutral-600 leading-relaxed">{x}</p></div>)}</div></div>}
function MiniMetric({value,label}:{value:string;label:string}){return <div className="rounded-2xl border-2 border-surface-variant p-4 bg-white"><div className="text-2xl font-black">{value}</div><div className="text-xs font-black text-neutral-500 mt-1">{label}</div></div>}
