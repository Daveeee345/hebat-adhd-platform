import { useEffect, useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, Clock3, Home, Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function RoutineBuilder({ role }:{ role:'child'|'parent' }){
  const {language}=useLanguage();
  const {data,loading,saveRoutine}=useHebatData();
  const isId=language==='id';
  const [done,setDone]=useState<boolean[]>([false,false,false]);
  const [saved,setSaved]=useState(false);
  const steps=role==='child' ? [
    {title:isId?'Siapkan satu tugas':'Prepare one task',desc:isId?'Ambil hanya buku dan alat yang dibutuhkan.':'Keep only the book and tools you need.'},
    {title:isId?'Kerjakan satu langkah':'Do one small step',desc:isId?'Ikuti satu instruksi yang terlihat.':'Follow one visible instruction.'},
    {title:isId?'Simpan & beri tanda selesai':'Put away & check off',desc:isId?'Rapikan bahan setelah misi selesai.':'Put materials away when the mission is done.'},
  ] : [
    {title:isId?'Siapkan lingkungan':'Prepare the space',desc:isId?'Kurangi distraksi dan siapkan satu tugas.':'Reduce distractions and prepare one task.'},
    {title:isId?'Berikan satu instruksi':'Give one instruction',desc:isId?'Tunggu anak menyelesaikan langkah sebelum instruksi berikutnya.':'Wait for completion before giving the next instruction.'},
    {title:isId?'Puji secara langsung':'Praise completion',desc:isId?'Berikan pujian deskriptif setelah langkah selesai.':'Use descriptive praise after the step is completed.'},
  ];
  const completed=done.filter(Boolean).length;

  useEffect(()=>{setSaved(false)},[done]);
  if(loading||!data) return <div className="max-w-2xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-80"/></div>;

  return <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 space-y-6">
    <button onClick={()=>window.dispatchEvent(new CustomEvent('change-page',{detail:role==='child'?'child-dashboard':'parent-dashboard'}))} className="btn-outline !px-3 !py-2 text-xs"><ArrowLeft className="w-4 h-4"/>{isId?'Kembali':'Back'}</button>
    <header><p className="text-xs font-black uppercase tracking-widest text-primary">{role==='child'?(isId?'Rutinitas':'Routine'):(isId?'Home Plan':'Home Plan')}</p><h1 className="text-3xl font-black mt-1">{isId?'Rutinitas PR 3 Langkah':'3-Step Homework Routine'}</h1><p className="text-base font-bold text-neutral-500 mt-2">{isId?'Satu langkah terlihat pada satu waktu.':'One visible step at a time.'}</p></header>

    <section className="card-pillowy border-primary/30">
      <div className="flex items-center justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Kemajuan':'Progress'}</div><div className="text-xl font-black mt-1">{completed} / 3 {isId?'langkah':'steps'}</div></div><div className="w-12 h-12 rounded-2xl bg-primary-container text-primary flex items-center justify-center"><Home className="w-6 h-6"/></div></div>
      <div className="h-3 bg-neutral-100 border border-neutral-200 rounded-full overflow-hidden mt-4"><div className="h-full bg-primary rounded-full transition-all" style={{width:`${completed/3*100}%`}}/></div>
    </section>

    <section className="space-y-3">{steps.map((step,i)=><button key={step.title} onClick={()=>setDone(prev=>prev.map((v,idx)=>idx===i?!v:v))} className={cn('w-full card-pillowy !p-5 text-left flex items-start gap-4 cursor-pointer',done[i]&&'bg-tertiary-container/20 border-tertiary/30')}><div className={cn('w-11 h-11 rounded-2xl border-2 flex items-center justify-center shrink-0 font-black',done[i]?'bg-tertiary text-white border-tertiary-dark':'bg-white border-surface-variant text-neutral-400')}>{done[i]?<Check className="w-6 h-6"/>:i+1}</div><div className="flex-1"><h2 className="text-lg font-black">{step.title}</h2><p className="text-sm font-bold text-neutral-500 mt-1 leading-relaxed">{step.desc}</p></div></button>)}</section>

    <button disabled={completed===0||saved} onClick={async()=>{await saveRoutine({completedSteps:completed,totalSteps:3});setSaved(true)}} className="btn-primary w-full text-sm disabled:opacity-50">{saved?<><CheckCircle2 className="w-5 h-5"/>{isId?'Tersimpan':'Saved'}</>:<>{isId?'Simpan Progres':'Save Progress'}{completed===3&&<><Star className="w-4 h-4 fill-current"/>+15</>}</>}</button>

    <div className="card-pillowy !p-5 bg-secondary-container/20 border-secondary/20"><div className="flex items-start gap-3"><Clock3 className="w-5 h-5 text-secondary-dark shrink-0 mt-0.5"/><div><h3 className="font-black text-base">{isId?'Konsistensi lebih penting daripada kecepatan':'Consistency matters more than speed'}</h3><p className="text-sm font-bold text-neutral-500 mt-1">{isId?'HEBAT menilai penyelesaian rutinitas sebagai pola dukungan, bukan sebagai skor ADHD.':'HEBAT uses routine completion as a support signal, never as an ADHD score.'}</p></div></div></div>
  </div>
}
