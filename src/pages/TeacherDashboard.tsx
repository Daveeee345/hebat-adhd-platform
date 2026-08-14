import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, ClipboardCheck, MessageCircle, Search, ShieldCheck, Sparkles, TrendingUp, TriangleAlert, UserRoundCheck } from 'lucide-react';
import type { Page } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function TeacherDashboard({ setPage }:{ setPage:(p:Page)=>void }) {
  const { language }=useLanguage();
  const { data,loading,error,addObservation,sendMessage,setSelectedChildId }=useHebatData();
  const isId=language==='id';
  const [showObservation,setShowObservation]=useState(false);
  const [saving,setSaving]=useState(false);
  const [form,setForm]=useState({attention:'some',taskCompletion:'partial',promptLevel:'one_two',transition:'prompt',note:''});
  const [message,setMessage]=useState('');
  const [search,setSearch]=useState('');

  const priority=data?.supportProfile.domains.find(d=>d.key===data.supportProfile.priorityKey);
  const latestParent=useMemo(()=>data?.observations.find(o=>o.authorRole==='parent'),[data]);

  if(loading) return <div className="max-w-6xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-64"/></div>;
  if(error||!data) return <div className="max-w-6xl mx-auto px-5 py-10"><div className="card-pillowy"><h2 className="font-black text-xl">Unable to load classroom</h2><p className="text-sm font-bold text-neutral-500 mt-2">{error}</p></div></div>;

  const submit=async()=>{
    setSaving(true);
    try{
      await addObservation(form);
      setShowObservation(false); setForm({attention:'some',taskCompletion:'partial',promptLevel:'one_two',transition:'prompt',note:''});
    }finally{setSaving(false)}
  };

  return <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-7">
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div><p className="text-xs font-black uppercase tracking-widest text-primary">{isId?'Kelas':'Classroom'}</p><h1 className="text-3xl md:text-4xl font-black tracking-tight mt-1">Class 4A</h1><p className="text-base font-bold text-neutral-500 mt-2">{isId?'Lihat siapa yang membutuhkan dukungan, lalu catat observasi singkat.':'See who needs support, then record a quick observation.'}</p></div>
      <button onClick={()=>setShowObservation(v=>!v)} className="btn-primary text-sm"><ClipboardCheck className="w-4 h-4"/>{isId?'Observasi Cepat':'Quick Observation'}</button>
    </header>

    {showObservation&&<section className="card-pillowy border-primary/40 bg-primary-container/10">
      <div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-widest text-primary">{isId?'10 detik':'10-second check-in'}</div><h2 className="text-xl font-black mt-1">{data.child.name}</h2><p className="text-sm font-bold text-neutral-500 mt-1">{isId?'Catat apa yang terlihat. ACTRS tetap dilakukan terpisah sebagai screening berkala.':'Record what you observed. ACTRS remains a separate periodic screening.'}</p></div><button onClick={()=>setShowObservation(false)} className="text-xs font-black text-neutral-500 cursor-pointer">{isId?'Tutup':'Close'}</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <Choice title={isId?'Perhatian':'Attention'} value={form.attention} onChange={v=>setForm({...form,attention:v})} options={[['good',isId?'Baik':'Good'],['some',isId?'Sedikit sulit':'Some difficulty'],['significant',isId?'Cukup sulit':'Significant difficulty']]}/>
        <Choice title={isId?'Penyelesaian tugas':'Task Completion'} value={form.taskCompletion} onChange={v=>setForm({...form,taskCompletion:v})} options={[['completed',isId?'Selesai':'Completed'],['partial',isId?'Sebagian':'Partial'],['not_completed',isId?'Belum selesai':'Not completed']]}/>
        <Choice title={isId?'Prompt yang dibutuhkan':'Prompting'} value={form.promptLevel} onChange={v=>setForm({...form,promptLevel:v})} options={[['none',isId?'Tidak ada':'None'],['one_two','1–2 prompts'],['frequent',isId?'Sering':'Frequent']]}/>
        <Choice title={isId?'Transisi':'Transition'} value={form.transition} onChange={v=>setForm({...form,transition:v})} options={[['smooth',isId?'Lancar':'Smooth'],['prompt',isId?'Perlu prompt':'Needed prompt'],['difficult',isId?'Sulit':'Difficult']]}/>
      </div>
      <textarea value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder={isId?'Catatan singkat (opsional)...':'Short note (optional)...'} className="w-full mt-5 border-2 border-surface-variant bg-white rounded-2xl px-4 py-3 min-h-24 text-sm font-bold outline-none focus:border-primary"/>
      <div className="flex flex-col sm:flex-row gap-3 mt-5"><button disabled={saving} onClick={submit} className="btn-primary text-sm sm:w-auto">{saving?(isId?'Menyimpan...':'Saving...'):(isId?'Simpan Observasi':'Save Observation')}</button><button onClick={()=>setPage('screening-intro')} className="btn-outline text-xs sm:w-auto">{isId?'Buka ACTRS Berkala':'Open Periodic ACTRS'}</button></div>
    </section>}

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 card-pillowy">
        <div className="flex items-center justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Profil siswa terhubung':'Linked Student Profiles'}</div><h2 className="text-xl font-black mt-1">{isId?'Kelas saya':'My Classroom'}</h2></div><div className="relative hidden sm:block"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={isId?'Cari siswa...':'Search students...'} className="border-2 border-surface-variant rounded-xl py-2 pl-9 pr-3 text-xs font-bold outline-none"/></div></div>
        <div className="space-y-3 mt-5">
          {data.linkedChildren.filter((c:any)=>c.name.toLowerCase().includes(search.toLowerCase())).map((c:any)=>{
            const active=c.id===data.selectedChildId;
            const detail=active?(data.supportProfile.dataStatus==='baseline_needed'?(isId?'Membangun baseline dukungan':'Building support baseline'):`${priority?.label} — ${priority?.need} support`):(isId?'Pilih untuk membuka riwayat siswa':'Select to open this student history');
            const status=active&&priority?.need==='High'?'attention':active&&priority?.need==='Moderate'?'good':'stable';
            return <StudentRow key={c.id} name={c.name} detail={detail} status={status as any} onClick={()=>{if(active)setPage('support-plan');else setSelectedChildId(c.id)}}/>
          })}
        </div>
      </div>

      <div className="card-pillowy border-primary/30 bg-primary-container/10">
        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center"><Sparkles className="w-5 h-5"/></div>
        <div className="text-[10px] font-black uppercase tracking-widest text-primary mt-4">{isId?'Strategi hari ini':'Today\'s Strategy'}</div>
        <h3 className="text-xl font-black mt-1">{isId?'Pecah tugas menjadi 3 langkah':'Chunk the task into 3 steps'}</h3>
        <p className="text-sm font-bold text-neutral-600 mt-2 leading-relaxed">{data.supportPlan.teacher[0]}</p>
        <div className="mt-4 bg-white rounded-2xl border-2 border-surface-variant p-4"><div className="text-[10px] font-black uppercase text-neutral-400">{isId?'Kenapa':'Why'}</div><p className="text-sm font-bold text-neutral-600 mt-1">{data.supportPlan.reasons[0]}</p></div>
        <button onClick={()=>setPage('support-plan')} className="btn-outline w-full mt-4 text-xs">{isId?'Buka Rencana Lengkap':'Open Full Plan'} <ChevronRight className="w-4 h-4"/></button>
      </div>
    </section>

    <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <Metric value={`${data.weeklyMetrics.taskCompletion}%`} title={isId?`Penyelesaian tugas ${data.child.name}`:`${data.child.name} task completion`} icon={<TrendingUp className="w-5 h-5"/>}/>
      <Metric value={`${data.weeklyMetrics.focusMinutes}m`} title={isId?'Fokus berhasil':'Successful focus'} icon={<CheckCircle2 className="w-5 h-5"/>}/>
      <Metric value={String(data.weeklyMetrics.observationsThisWeek)} title={isId?'Observasi terbaru':'Recent observations'} icon={<ClipboardCheck className="w-5 h-5"/>}/>
      <Metric value={`${data.weeklyMetrics.routineCompletion}%`} title={isId?'Rutinitas rumah':'Home routine'} icon={<UserRoundCheck className="w-5 h-5"/>}/>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card-pillowy">
        <div className="flex items-center justify-between"><div><div className="text-[10px] font-black uppercase tracking-widest text-secondary-dark">{isId?'Rumah → Sekolah':'Home → School'}</div><h3 className="text-xl font-black mt-1">{isId?'Update dari orang tua':'Parent Update'}</h3></div><MessageCircle className="w-5 h-5 text-secondary"/></div>
        <div className="mt-4 bg-secondary-container/20 border border-secondary/20 rounded-2xl p-4"><p className="text-sm font-bold text-neutral-700 leading-relaxed">{latestParent?.note || data.messages.find((m:any)=>m.fromRole==='parent')?.text || (isId?'Belum ada update dari orang tua untuk profil ini.':'No parent update has been recorded for this profile yet.')}</p></div>
        <div className="flex gap-2 mt-4"><input value={message} onChange={e=>setMessage(e.target.value)} placeholder={isId?'Balas orang tua...':'Reply to parent...'} className="flex-1 min-w-0 border-2 border-surface-variant rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary"/><button disabled={!message.trim()} onClick={async()=>{await sendMessage({toRole:'parent',text:message.trim()});setMessage('')}} className="btn-secondary !px-4 text-xs disabled:opacity-50">{isId?'Kirim':'Send'}</button></div>
      </div>

      <div className="card-pillowy">
        <div className="flex items-center justify-between"><div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Catatan sistem':'Support Profile'}</div><h3 className="text-xl font-black mt-1">{isId?'Prioritas dukungan saat ini':'Current Support Priorities'}</h3></div><ShieldCheck className="w-5 h-5 text-primary"/></div>
        <div className="space-y-3 mt-4">{data.supportProfile.domains.slice(0,4).map((d:any)=><div key={d.key} className="flex items-center justify-between gap-4 rounded-2xl border border-surface-variant p-3.5"><span className="font-black text-sm">{d.label}</span><span className={cn('text-xs font-black px-2.5 py-1 rounded-full',d.need==='High'?'bg-amber-100 text-amber-800':d.need==='Moderate'?'bg-secondary-container text-secondary-dark':'bg-tertiary-container text-tertiary-dark')}>{d.need}</span></div>)}</div>
        <p className="text-xs font-bold text-neutral-400 mt-4">{isId?'Profil ini memprioritaskan dukungan pendidikan dan bukan diagnosis ADHD.':'This profile prioritises educational support and is not an ADHD diagnosis.'}</p>
      </div>
    </section>
  </div>;
}

function Choice({title,value,onChange,options}:{title:string;value:string;onChange:(v:any)=>void;options:[string,string][]}){
  return <div><div className="text-sm font-black mb-2">{title}</div><div className="grid grid-cols-3 gap-2">{options.map(([id,label])=><button key={id} onClick={()=>onChange(id)} className={cn('rounded-xl border-2 px-2 py-3 text-xs font-black transition-all cursor-pointer',value===id?'bg-primary text-white border-primary-dark':'bg-white border-surface-variant text-neutral-600 hover:bg-neutral-50')}>{label}</button>)}</div></div>
}
function StudentRow({name,detail,status,onClick}:{name:string;detail:string;status:'attention'|'good'|'stable';onClick?:()=>void}){
  return <button onClick={onClick} className={cn('w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left',onClick?'cursor-pointer hover:border-primary/40':'cursor-default',status==='attention'?'bg-amber-50/50 border-amber-200':'bg-white border-surface-variant')}><div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0',status==='attention'?'bg-amber-100 text-amber-700':status==='good'?'bg-tertiary-container text-tertiary-dark':'bg-neutral-100 text-neutral-500')}>{status==='attention'?<TriangleAlert className="w-5 h-5"/>:<CheckCircle2 className="w-5 h-5"/>}</div><div className="flex-1 min-w-0"><div className="text-base font-black">{name}</div><div className="text-sm font-bold text-neutral-500 mt-0.5">{detail}</div></div>{onClick&&<ArrowRight className="w-5 h-5 text-neutral-300"/>}</button>
}
function Metric({value,title,icon}:{value:string;title:string;icon:any}){return <div className="card-pillowy !p-5"><div className="w-9 h-9 rounded-xl bg-primary-container text-primary flex items-center justify-center">{icon}</div><div className="text-2xl font-black mt-3">{value}</div><div className="text-xs font-black text-neutral-500 mt-1 leading-relaxed">{title}</div></div>}
