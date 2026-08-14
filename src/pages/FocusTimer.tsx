import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Pause, Play, RefreshCw, Star, Timer, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function FocusTimer(){
  const { language }=useLanguage();
  const { data,loading,saveFocus }=useHebatData();
  const isId=language==='id';
  const assigned=data?.supportPlan?.focusMinutes || 7;
  const [seconds,setSeconds]=useState(assigned*60);
  const [active,setActive]=useState(false);
  const [finished,setFinished]=useState(false);
  const [saving,setSaving]=useState(false);

  useEffect(()=>{ if(!active||seconds<=0) return; const t=setInterval(()=>setSeconds(s=>s-1),1000); return()=>clearInterval(t); },[active,seconds]);
  useEffect(()=>{
    if(seconds===0&&active){
      setActive(false);
      setFinished(true);
      void saveFocus({assignedMinutes:assigned,completedMinutes:assigned,completed:true}).catch(() => {});
    }
  },[seconds,active,assigned,saveFocus]);
  useEffect(()=>{ if(!active&&!finished) setSeconds(assigned*60); },[assigned]);

  const progress=useMemo(()=>Math.max(0,Math.min(100,((assigned*60-seconds)/(assigned*60))*100)),[seconds,assigned]);
  const mins=Math.floor(seconds/60), secs=seconds%60;

  const finish=async(completed:boolean)=>{
    setSaving(true);
    try{
      await saveFocus({assignedMinutes:assigned,completedMinutes:completed?assigned:Math.max(0,Math.round((assigned*60-seconds)/60)),completed});
      if(completed) setFinished(true);
    }finally{setSaving(false)}
  };

  if(loading) return <div className="max-w-xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-96"/></div>;

  if(finished) return <div className="max-w-xl mx-auto px-4 py-8 md:py-14">
    <div className="card-pillowy text-center border-primary/40 bg-primary-container/10 !p-8 md:!p-10">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-primary text-white border-b-6 border-primary-dark flex items-center justify-center"><CheckCircle2 className="w-10 h-10"/></div>
      <h1 className="text-3xl font-black mt-6">{isId?'Kerja bagus!':'Nice work!'}</h1>
      <p className="text-base font-bold text-neutral-600 mt-2">{isId?`Kamu bertahan bersama satu tugas selama ${assigned} menit.`:`You stayed with one task for ${assigned} minutes.`}</p>
      <div className="inline-flex items-center gap-2 mt-5 bg-white border-2 border-primary/30 rounded-2xl px-4 py-3 text-primary font-black"><Star className="w-5 h-5 fill-current"/>+20 {isId?'Bintang':'Stars'}</div>
      <div className="mt-7 rounded-2xl border-2 border-secondary/20 bg-secondary-container/30 p-5 text-left"><div className="text-[10px] font-black uppercase tracking-widest text-secondary-dark">{isId?'Berikutnya':'Next'}</div><h2 className="text-lg font-black mt-1">{isId?'Istirahat gerak 2 menit':'2-minute movement break'}</h2><p className="text-sm font-bold text-neutral-600 mt-2">{isId?'Berdiri, regangkan tangan, lalu tarik napas perlahan tiga kali.':'Stand up, stretch your arms, then take three slow breaths.'}</p></div>
      <button onClick={()=>window.dispatchEvent(new CustomEvent('change-page',{detail:'child-dashboard'}))} className="btn-primary w-full mt-6 text-sm">{isId?'Kembali ke Hari Ini':'Back to Today'}</button>
    </div>
  </div>;

  return <div className="max-w-xl mx-auto px-4 py-6 md:py-10 space-y-6">
    <div className="flex items-center justify-between gap-4"><button onClick={()=>window.dispatchEvent(new CustomEvent('change-page',{detail:'child-dashboard'}))} className="btn-outline !px-3 !py-2 text-xs"><ArrowLeft className="w-4 h-4"/>{isId?'Kembali':'Back'}</button><div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider"><Zap className="w-4 h-4 fill-current"/>{isId?'Adaptive Focus Sprint':'Adaptive Focus Sprint'}</div></div>

    <section className="card-pillowy !p-8 md:!p-10 text-center border-primary/30 relative overflow-hidden">
      <div className="text-[10px] uppercase font-black tracking-[.18em] text-neutral-400">{isId?'Misi saat ini':'Current Mission'}</div>
      <h1 className="text-2xl font-black mt-2">{isId?'Tetap bersama satu tugas':'Stay with one task'}</h1>
      <p className="text-sm font-bold text-neutral-500 mt-2">{isId?`HEBAT menyarankan ${assigned} menit berdasarkan sesi terakhir.`:`HEBAT recommends ${assigned} minutes based on recent successful sessions.`}</p>

      <div className="relative w-72 h-72 max-w-full mx-auto mt-8 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90"><circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f1" strokeWidth="5"/><circle cx="50" cy="50" r="45" fill="none" stroke="#ff9600" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${progress*2.827} 282.7`}/></svg>
        <motion.div animate={active?{scale:[1,1.015,1]}:{}} transition={{duration:2,repeat:Infinity}} className="w-56 h-56 rounded-full bg-white border-4 border-primary/10 flex flex-col items-center justify-center shadow-ambient">
          <Timer className="w-8 h-8 text-primary mb-3"/><div className="text-6xl font-black tracking-tighter tabular-nums">{String(mins).padStart(2,'0')}:<span className="text-neutral-300">{String(secs).padStart(2,'0')}</span></div><div className="mt-3 text-[10px] font-black uppercase tracking-widest text-neutral-400">{active?(isId?'Sedang fokus':'Focusing'):(isId?'Siap mulai':'Ready')}</div>
        </motion.div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button onClick={()=>setActive(v=>!v)} className="btn-primary text-sm">{active?<><Pause className="w-5 h-5"/>{isId?'Jeda':'Pause'}</>:<><Play className="w-5 h-5 fill-current"/>{isId?'Mulai':'Start'}</>}</button>
        <button onClick={()=>{setActive(false);setSeconds(assigned*60)}} className="btn-outline text-sm"><RefreshCw className="w-5 h-5"/>{isId?'Ulang':'Reset'}</button>
      </div>
      <button disabled={saving} onClick={async()=>{setActive(false);setSeconds(0);await finish(true)}} className="mt-3 w-full py-3 text-xs font-black uppercase tracking-wider text-tertiary-dark bg-tertiary-container/30 border-2 border-tertiary/30 rounded-2xl cursor-pointer disabled:opacity-50">{isId?'Tandai selesai untuk demo':'Mark completed for demo'}</button>
    </section>

    <section className="card-pillowy !p-5"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary-dark flex items-center justify-center shrink-0"><Zap className="w-5 h-5"/></div><div><h2 className="font-black text-base">{isId?'Mengapa durasinya pendek?':'Why is the timer short?'}</h2><p className="text-sm font-bold text-neutral-500 mt-1 leading-relaxed">{isId?'Durasi bertambah perlahan hanya setelah beberapa sesi berhasil. Stage kemampuan dan Bintang tetap dipisahkan.':'Duration grows gradually only after repeated successful sessions. Mastery stages and Stars remain separate.'}</p></div></div></section>
  </div>
}
