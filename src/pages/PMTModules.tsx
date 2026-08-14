import { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, HeartHandshake, MessageCircle, PlayCircle, Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

export default function PMTModules(){
  const {language}=useLanguage();
  const {data,loading}=useHebatData();
  const isId=language==='id';
  const {user}=useAuth();
  const currentRole=user?.role||'parent';
  const backPage=currentRole==='teacher'?'teacher-dashboard':'parent-dashboard';
  const [step,setStep]=useState(0);
  const [practiced,setPracticed]=useState(false);
  if(loading||!data) return <div className="max-w-3xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-80"/></div>;

  const lessons=[
    {title:isId?'Berikan satu instruksi':'Give one instruction',example:isId?'“Tolong letakkan buku di meja.”':'“Please put the book on the desk.”',why:isId?'Instruksi pendek mengurangi beban mengingat beberapa langkah sekaligus.':'Short instructions reduce the need to hold several steps in mind.'},
    {title:isId?'Tunggu beberapa detik':'Wait a few seconds',example:isId?'Jangan langsung menambahkan instruksi baru.':'Do not immediately add another instruction.',why:isId?'Waktu tunggu memberi ruang untuk memproses dan mulai bertindak.':'A short pause gives time to process and start.'},
    {title:isId?'Puji secara spesifik':'Use specific praise',example:isId?'“Terima kasih, bukunya sudah di meja.”':'“Thank you, the book is on the desk.”',why:isId?'Pujian deskriptif memperjelas perilaku yang ingin diperkuat.':'Descriptive praise makes the desired behavior clear.'},
  ];

  return <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-7">
    <button onClick={()=>window.dispatchEvent(new CustomEvent('change-page',{detail:backPage}))} className="btn-outline !px-3 !py-2 text-xs"><ArrowLeft className="w-4 h-4"/>{isId?'Kembali':'Back'}</button>
    <header><p className="text-xs font-black uppercase tracking-widest text-tertiary-dark">Parent Coach</p><h1 className="text-3xl font-black mt-1">{isId?'Keterampilan minggu ini: Instruksi Jelas':'This Week: Clear Instructions'}</h1><p className="text-base font-bold text-neutral-500 mt-2">{isId?`Latihan singkat yang sesuai dengan prioritas dukungan ${data.child.name} saat ini.`:`A short practice matched to ${data.child.name}\'s current support priority.`}</p></header>

    <section className="card-pillowy border-tertiary/30 bg-tertiary-container/10"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-tertiary text-white flex items-center justify-center shrink-0"><HeartHandshake className="w-6 h-6"/></div><div><div className="text-[10px] font-black uppercase tracking-widest text-tertiary-dark">{isId?'Kenapa sekarang':'Why now'}</div><h2 className="text-xl font-black mt-1">{data.supportPlan.priorityDomain.replaceAll('_',' ')}</h2><p className="text-sm font-bold text-neutral-600 mt-2 leading-relaxed">{data.supportPlan.summary}</p></div></div></section>

    <section className="card-pillowy">
      <div className="flex items-center justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Latihan 3 langkah':'3-step practice'}</div><h2 className="text-xl font-black mt-1">{lessons[step].title}</h2></div><div className="text-xs font-black text-primary">{step+1} / 3</div></div>
      <div className="h-3 bg-neutral-100 rounded-full overflow-hidden mt-4"><div className="h-full bg-tertiary rounded-full transition-all" style={{width:`${(step+1)/3*100}%`}}/></div>
      <div className="mt-6 rounded-2xl border-2 border-surface-variant bg-neutral-50 p-5"><div className="text-[10px] font-black uppercase tracking-wider text-neutral-400">{isId?'Contoh':'Example'}</div><p className="text-lg font-black mt-2">{lessons[step].example}</p></div>
      <div className="mt-3 rounded-2xl border border-tertiary/30 bg-tertiary-container/20 p-4"><div className="text-[10px] font-black uppercase tracking-wider text-tertiary-dark">{isId?'Mengapa ini membantu':'Why it helps'}</div><p className="text-sm font-bold text-neutral-600 mt-1 leading-relaxed">{lessons[step].why}</p></div>
      <div className="grid grid-cols-2 gap-3 mt-5"><button disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))} className="btn-outline text-xs disabled:opacity-40">{isId?'Sebelumnya':'Previous'}</button><button onClick={()=>step<2?setStep(s=>s+1):setPracticed(true)} className="btn-tertiary text-xs">{step<2?(isId?'Berikutnya':'Next'):(isId?'Sudah Dipraktikkan':'Mark Practiced')} <ChevronRight className="w-4 h-4"/></button></div>
    </section>

    {practiced&&<section className="card-pillowy border-primary/30 bg-primary-container/10 text-center"><div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto"><Check className="w-7 h-7"/></div><h3 className="text-xl font-black mt-4">{isId?'Bagus. Cukup satu strategi dulu.':'Great. One strategy is enough for now.'}</h3><p className="text-sm font-bold text-neutral-600 mt-2">{isId?'Coba strategi yang sama beberapa kali sebelum mengganti pendekatan.':'Try the same strategy several times before changing the approach.'}</p></section>}

    <section className="card-pillowy !p-5"><div className="flex items-start gap-3"><MessageCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0"/><div><h3 className="font-black text-base">{isId?'Bukan course library':'Not another course library'}</h3><p className="text-sm font-bold text-neutral-500 mt-1">{isId?'Parent Coach hanya menampilkan keterampilan yang relevan dengan Support Plan saat ini.':'Parent Coach surfaces only the skill relevant to the current Support Plan.'}</p></div></div></section>
  </div>
}
