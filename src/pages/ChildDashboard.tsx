import { useMemo, useState } from 'react';
import { BookOpen, Brain, Check, ChevronRight, Clock3, ShieldCheck, Star, Timer, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import type { Page } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function ChildDashboard({ setPage }:{ setPage:(p:Page)=>void }) {
  const { language } = useLanguage();
  const { data, loading, error, saveMood } = useHebatData();
  const [savingMood,setSavingMood]=useState(false);
  const isId=language==='id';

  const completed=useMemo(()=>data?.todayMissions.filter(m=>m.status==='completed').length||0,[data]);
  const total=data?.todayMissions.length||3;
  const next=data?.todayMissions.find(m=>m.status!=='completed');
  const priority=data?.supportProfile.domains.find(d=>d.key===data.supportProfile.priorityKey);

  const openMission=(mission:any)=>{
    if(mission.type==='focus') return setPage('focus-timer');
    if(mission.type==='routine') return setPage('routine-builder');
    if(mission.moduleId){
      localStorage.setItem('child_active_module_jump',String(mission.moduleId));
      localStorage.setItem('hebat_active_mission_id',mission.id);
      setPage('learn-modules');
    }
  };

  const moodOptions=[
    {id:'good',emoji:'🙂',label:isId?'Baik':'Good'},
    {id:'okay',emoji:'😐',label:isId?'Biasa':'Okay'},
    {id:'tired',emoji:'😴',label:isId?'Lelah':'Tired'},
    {id:'energetic',emoji:'⚡',label:isId?'Berenergi':'Energetic'},
  ];

  if(loading) return <div className="max-w-3xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-56"/></div>;
  if(error||!data) return <div className="max-w-3xl mx-auto px-5 py-10"><div className="card-pillowy"><h2 className="text-xl font-black">HEBAT could not load</h2><p className="text-sm font-bold text-neutral-500 mt-2">{error}</p></div></div>;

  return <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-7">
    <header className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-primary">{isId?'Hari ini':'Today'}</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface mt-1">{isId?'Hai':'Hi'}, {data.child.name.split(' ')[0]} 👋</h1>
        <p className="text-base font-bold text-neutral-500 mt-2">{isId?'Satu langkah kecil pada satu waktu.':'One small step at a time.'}</p>
      </div>
      <button onClick={()=>setPage('rewards')} className="shrink-0 bg-amber-50 border-2 border-primary/30 rounded-2xl px-4 py-3 flex items-center gap-2 cursor-pointer">
        <Star className="w-5 h-5 fill-current text-primary"/>
        <div className="text-left"><div className="text-[10px] uppercase font-black text-amber-700">{isId?'Bintang':'Stars'}</div><div className="text-lg leading-none font-black text-primary">{data.rewardBalance}</div></div>
      </button>
    </header>

    <section className="card-pillowy !p-0 overflow-hidden border-primary/40">
      <div className="bg-primary px-6 py-5 text-white flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[.18em] opacity-80">{isId?'Rencana Hari Ini':'Today\'s Plan'}</div>
          <h2 className="text-2xl font-black mt-1">{completed} / {total} {isId?'selesai':'completed'}</h2>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center"><Trophy className="w-7 h-7"/></div>
      </div>
      <div className="p-6 space-y-4">
        {next ? <div className="border-2 border-primary/30 bg-primary-container/20 rounded-3xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-primary/30 flex items-center justify-center shrink-0 text-primary">
              {next.type==='focus'?<Timer className="w-6 h-6"/>:next.moduleId===4?<Brain className="w-6 h-6"/>:<BookOpen className="w-6 h-6"/>}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-primary">{isId?'Berikutnya':'Next'}</div>
              <h3 className="text-xl font-black text-on-surface mt-1">{next.title}</h3>
              <p className="text-base font-bold text-neutral-600 mt-1">{next.subtitle}</p>
              <div className="flex items-center gap-4 mt-3 text-sm font-black text-neutral-500"><span className="flex items-center gap-1.5"><Clock3 className="w-4 h-4"/>{next.duration} min</span><span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-primary fill-current"/>+{next.stars}</span></div>
            </div>
          </div>
          <button onClick={()=>openMission(next)} className="btn-primary w-full mt-5 text-sm !py-3.5">{isId?'Mulai Misi':'Start Mission'} <ChevronRight className="w-4 h-4"/></button>
        </div> : <div className="bg-tertiary-container/30 border-2 border-tertiary/30 rounded-3xl p-6 text-center"><Check className="w-9 h-9 text-tertiary mx-auto"/><h3 className="font-black text-xl mt-2">{isId?'Semua misi selesai!':'All missions complete!'}</h3><p className="font-bold text-neutral-500 mt-1">{isId?'Istirahat dulu. Besok kita lanjut lagi.':'Take a break. We will continue tomorrow.'}</p></div>}

        <div className="space-y-2">
          {data.todayMissions.map((m:any)=><button key={m.id} disabled={m.status==='completed'} onClick={()=>openMission(m)} className={cn('w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all',m.status==='completed'?'bg-neutral-50 border-neutral-200 text-neutral-400':'bg-white border-surface-variant hover:border-primary/40 cursor-pointer')}>
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0',m.status==='completed'?'bg-tertiary-container text-tertiary-dark':'bg-primary-container text-primary')}>{m.status==='completed'?<Check className="w-5 h-5"/>:m.type==='focus'?<Timer className="w-5 h-5"/>:m.moduleId===4?<Brain className="w-5 h-5"/>:<BookOpen className="w-5 h-5"/>}</div>
            <div className="flex-1 min-w-0"><div className="text-base font-black">{m.title}</div><div className="text-sm font-bold opacity-70">{m.duration} min</div></div>
            {m.status!=='completed'&&<ChevronRight className="w-5 h-5 text-neutral-300"/>}
          </button>)}
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="card-pillowy">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-secondary-container text-secondary-dark flex items-center justify-center shrink-0"><ShieldCheck className="w-5 h-5"/></div>
          <div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Fokus Dukungan':'Support Focus'}</div><h3 className="text-lg font-black mt-1">{data.supportProfile.dataStatus==='baseline_needed'?(isId?'Membangun baseline':'Building your baseline'):priority?.label}</h3><p className="text-sm font-bold text-neutral-500 mt-2 leading-relaxed">{data.supportProfile.dataStatus==='baseline_needed'?(isId?'HEBAT akan mempelajari pola dari aktivitasmu secara bertahap. Mulai dari misi pendek dan jelas.':'HEBAT will learn from your activity over time. Start with short, clear missions.'):(isId?'HEBAT membuat misi hari ini lebih pendek dan jelas agar lebih mudah diselesaikan.':'HEBAT keeps today\'s missions short and clear so they are easier to finish.')}</p></div>
        </div>
      </div>

      <div className="card-pillowy">
        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Bagaimana perasaanmu?':'How are you feeling?'}</div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {moodOptions.map(m=><button key={m.id} disabled={savingMood} onClick={async()=>{setSavingMood(true);try{await saveMood(m.id)}finally{setSavingMood(false)}}} className="rounded-2xl border-2 border-surface-variant p-2.5 bg-white hover:bg-primary-container/20 hover:border-primary/30 transition-all cursor-pointer"><div className="text-2xl">{m.emoji}</div><div className="text-[10px] font-black mt-1 text-neutral-600">{m.label}</div></button>)}
        </div>
        <p className="text-xs font-bold text-neutral-400 mt-3">{isId?'Satu tap saja. Orang tua dapat melihat check-in ini.':'One tap only. Your parent can see this check-in.'}</p>
      </div>
    </section>

    <section className="card-pillowy">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div><div className="text-[10px] font-black uppercase tracking-widest text-primary">{isId?'Perjalanan Kemampuan':'Mastery Journey'}</div><h3 className="text-xl font-black mt-1">{isId?'Kemajuanmu':'Your Progress'}</h3></div>
        <button onClick={()=>setPage('learn-modules')} className="btn-outline !py-2 !px-4 text-xs">{isId?'Lihat Aktivitas':'Activity Library'}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.masteryTracks.slice(0,4).map((track:any)=><div key={track.key} className="rounded-2xl border-2 border-surface-variant p-4">
          <div className="flex items-center justify-between"><span className="font-black text-base">{track.label}</span><span className="text-xs font-black text-primary">Stage {track.stage}/{track.maxStage}</span></div>
          <div className="mt-3 h-3 bg-neutral-100 border border-neutral-200 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${track.progress}%`}} className="h-full bg-primary rounded-full"/></div>
        </div>)}
      </div>
      <p className="text-xs font-bold text-neutral-400 mt-4">{isId?'Stage menunjukkan penguasaan kemampuan; Bintang hanya untuk hadiah dan motivasi.':'Stages show skill mastery; Stars are only for rewards and encouragement.'}</p>
    </section>
  </div>;
}
