import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Clock3, MessageCircle, ShieldCheck, Sparkles, Star, TrendingUp, TriangleAlert } from 'lucide-react';
import type { Page } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function ParentDashboard({ setPage }:{ setPage:(p:Page)=>void }) {
  const { language } = useLanguage();
  const { data, loading, error, sendMessage } = useHebatData();
  const [message,setMessage]=useState('');
  const [sending,setSending]=useState(false);
  const isId=language==='id';

  const latestTeacher=useMemo(()=>data?.observations.find(o=>o.authorRole==='teacher'),[data]);
  const latestMood=data?.moodCheckins?.[0]?.mood;
  const priority=data?.supportProfile.domains.find(d=>d.key===data.supportProfile.priorityKey);
  const hasHistory=Boolean(data?.observations?.length || data?.focusSessions?.length || data?.routineSessions?.length || data?.moodCheckins?.length);

  if(loading) return <div className="max-w-5xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-64"/></div>;
  if(error||!data) return <div className="max-w-5xl mx-auto px-5 py-10"><div className="card-pillowy"><h2 className="font-black text-xl">Unable to load parent dashboard</h2><p className="text-sm font-bold text-neutral-500 mt-2">{error}</p></div></div>;

  return <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-7">
    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div><p className="text-xs font-black uppercase tracking-widest text-primary">{isId?'Hari ini':'Today'}</p><h1 className="text-3xl md:text-4xl font-black tracking-tight mt-1">{data.child.name}</h1><p className="text-base font-bold text-neutral-500 mt-2">{isId?'Apa yang terjadi hari ini, dan apa yang bisa dilakukan di rumah.':'What happened today, and what to do at home next.'}</p></div>
      <button onClick={()=>setPage('support-plan')} className="btn-outline !py-2.5 !px-4 text-xs"><ShieldCheck className="w-4 h-4"/>{isId?'Buka Rencana Dukungan':'View Support Plan'}</button>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <section className="lg:col-span-3 card-pillowy !p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-surface-variant/60 flex items-center justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-widest text-secondary-dark">{isId?'Hari ini di sekolah':'Today at School'}</div><h2 className="text-xl font-black mt-1">{isId?'Ringkasan singkat':'Quick Summary'}</h2></div><div className="w-11 h-11 rounded-2xl bg-secondary-container text-secondary-dark flex items-center justify-center"><CheckCircle2 className="w-5 h-5"/></div></div>
        <div className="p-6 space-y-4">
          {!hasHistory ? <div className="rounded-2xl bg-neutral-50 border-2 border-surface-variant p-5"><div className="text-[10px] font-black uppercase tracking-widest text-primary">{isId?'Mulai baseline':'Start the baseline'}</div><h3 className="font-black text-lg mt-1">{isId?'Belum ada riwayat untuk akun ini':'No support history for this account yet'}</h3><p className="text-sm font-bold text-neutral-500 mt-2 leading-relaxed">{isId?'Setelah aktivitas siswa, observasi guru, atau rutinitas rumah tersimpan, ringkasan hari ini akan menyesuaikan otomatis.':'Once student activities, teacher observations, or home routines are recorded, this summary will adapt automatically.'}</p></div> : <>
            <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-xl bg-tertiary-container text-tertiary-dark flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4"/></div><div><p className="font-black text-base">{isId?'Riwayat dukungan aktif':'Support history is active'}</p><p className="text-sm font-bold text-neutral-500 mt-1">{latestTeacher?.note || (isId?'Aktivitas terbaru sudah tercatat pada profil anak.':'Recent activity is now stored in this child profile.')}</p></div></div>
            <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-xl bg-primary-container text-primary flex items-center justify-center shrink-0"><Clock3 className="w-4 h-4"/></div><div><p className="font-black text-base">{isId?'Fokus rata-rata':'Average focus'}: {data.weeklyMetrics.focusMinutes} min</p><p className="text-sm font-bold text-neutral-500 mt-1">{data.focusSessions.length>1?(isId?'Dihitung dari sesi fokus tersimpan.':'Calculated from saved Focus Sprint history.'):(isId?'Baseline awal dari sesi yang tersedia.':'Early baseline from available sessions.')}</p></div></div>
            <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0"><TriangleAlert className="w-4 h-4"/></div><div><p className="font-black text-base">{data.supportProfile.dataStatus==='baseline_needed'?(isId?'Belum cukup data':'Not enough data yet'):(isId?'Prioritas dukungan':'Support priority')}: {data.supportProfile.dataStatus==='baseline_needed'?'—':priority?.label}</p><p className="text-sm font-bold text-neutral-500 mt-1">{latestTeacher?.note || (isId?'Tambahkan observasi sekolah untuk memperkuat personalisasi.':'Add school observations to strengthen personalisation.')}</p></div></div>
          </>}
          {latestMood&&<div className="rounded-2xl bg-neutral-50 border border-surface-variant p-4 text-sm font-bold text-neutral-600">{isId?'Check-in perasaan terakhir':'Latest mood check-in'}: <span className="font-black text-on-surface capitalize">{latestMood}</span></div>}
        </div>
      </section>

      <section className="lg:col-span-2 card-pillowy border-primary/30 bg-primary-container/10">
        <div className="text-[10px] font-black uppercase tracking-widest text-primary">{isId?'Untuk malam ini':'For Tonight'}</div>
        <h2 className="text-xl font-black mt-2">{isId?'Rutinitas PR 3 Langkah':'3-Step Homework Routine'}</h2>
        <p className="text-sm font-bold text-neutral-600 mt-2 leading-relaxed">{data.supportPlan.parent[0]}</p>
        <div className="mt-5 space-y-2">
          {[isId?'Siapkan satu tugas':'Prepare one task',isId?'Berikan satu instruksi':'Give one instruction',isId?'Puji setelah selesai':'Praise after completion'].map((x,i)=><div key={x} className="bg-white border-2 border-surface-variant rounded-2xl p-3 flex items-center gap-3"><div className="w-7 h-7 rounded-lg bg-primary text-white font-black text-xs flex items-center justify-center">{i+1}</div><span className="font-black text-sm">{x}</span></div>)}
        </div>
        <button onClick={()=>setPage('routine-builder')} className="btn-primary w-full mt-5 text-sm">{isId?'Mulai Home Plan':'Start Home Plan'} <ChevronRight className="w-4 h-4"/></button>
      </section>
    </div>

    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Metric title={isId?'Penyelesaian tugas':'Task completion'} value={`${data.weeklyMetrics.taskCompletion}%`} note={isId?'minggu ini':'this week'} icon={<TrendingUp className="w-5 h-5"/>}/>
      <Metric title={isId?'Rutinitas rumah':'Home routine'} value={`${data.weeklyMetrics.routineCompletion}%`} note={isId?'langkah selesai':'steps completed'} icon={<CheckCircle2 className="w-5 h-5"/>}/>
      <Metric title={isId?'Catatan sekolah':'School observations'} value={String(data.weeklyMetrics.observationsThisWeek)} note={isId?'catatan terbaru':'recent records'} icon={<MessageCircle className="w-5 h-5"/>}/>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card-pillowy">
        <div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-black uppercase tracking-widest text-tertiary-dark">Parent Coach</div><h3 className="text-xl font-black mt-1">{isId?'Keterampilan minggu ini: Instruksi Jelas':'This Week: Clear Instructions'}</h3></div><Sparkles className="w-5 h-5 text-tertiary"/></div>
        <div className="mt-5 rounded-2xl bg-neutral-50 border border-surface-variant p-4"><div className="text-[10px] font-black uppercase tracking-wider text-neutral-400">{isId?'Daripada':'Instead of'}</div><p className="text-sm font-bold text-neutral-500 mt-1 line-through">“{isId?'Rapikan meja lalu mulai PR.':'Clean your desk and start your homework.'}”</p></div>
        <div className="mt-3 rounded-2xl bg-tertiary-container/30 border border-tertiary/30 p-4"><div className="text-[10px] font-black uppercase tracking-wider text-tertiary-dark">{isId?'Coba':'Try'}</div><p className="text-base font-black mt-1">“{isId?'Tolong letakkan bukunya di meja.':'Please put the book on the desk.'}”</p><p className="text-xs font-bold text-neutral-500 mt-2">{isId?'Tunggu → Puji → Berikan langkah berikutnya.':'Wait → Praise → Give the next step.'}</p></div>
        <button onClick={()=>setPage('pmt-modules')} className="btn-outline w-full mt-4 text-xs">{isId?'Buka Parent Coach':'Open Parent Coach'}</button>
      </div>

      <div className="card-pillowy">
        <div className="flex items-center justify-between"><div><div className="text-[10px] font-black uppercase tracking-widest text-secondary-dark">{isId?'Koordinasi sekolah-rumah':'Home-School Coordination'}</div><h3 className="text-xl font-black mt-1">{isId?'Pesan terbaru':'Latest Messages'}</h3></div><MessageCircle className="w-5 h-5 text-secondary"/></div>
        <div className="space-y-3 mt-5 max-h-48 overflow-y-auto pr-1">
          {data.messages.slice(0,3).map((m:any)=><div key={m.id} className={cn('rounded-2xl p-3 border',m.fromRole==='teacher'?'bg-secondary-container/20 border-secondary/20':'bg-neutral-50 border-surface-variant')}><div className="text-[10px] font-black uppercase tracking-wider text-neutral-400">{m.fromName}</div><p className="text-sm font-bold text-neutral-700 mt-1 leading-relaxed">{m.text}</p></div>)}
        </div>
        <div className="mt-4 flex gap-2"><input value={message} onChange={e=>setMessage(e.target.value)} placeholder={isId?'Kirim catatan singkat ke guru...':'Send a short note to the teacher...'} className="flex-1 min-w-0 bg-white border-2 border-surface-variant rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-secondary"/><button disabled={!message.trim()||sending} onClick={async()=>{setSending(true);try{await sendMessage({toRole:'teacher',text:message.trim()});setMessage('')}finally{setSending(false)}}} className="btn-secondary !px-4 !py-2 text-xs disabled:opacity-50">{isId?'Kirim':'Send'}</button></div>
      </div>
    </section>

    <section className="card-pillowy flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div><div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Jalur tindak lanjut':'Follow-up Pathway'}</div><h3 className="text-lg font-black mt-1">{data.referrals[0]?.status==='requested'?(isId?'Tinjauan profesional diminta':'Professional review requested'):(isId?'Pemantauan terkoordinasi':'Coordinated monitoring')}</h3><p className="text-sm font-bold text-neutral-500 mt-1">{isId?'HEBAT tidak mendiagnosis. Data dapat dirangkum untuk profesional bila diperlukan.':'HEBAT does not diagnose. Existing records can be summarised for a professional when needed.'}</p></div>
      <button onClick={()=>setPage('consultation')} className="btn-outline shrink-0 text-xs">{isId?'Lihat Rujukan':'View Referral'} <ArrowRight className="w-4 h-4"/></button>
    </section>
  </div>;
}

function Metric({title,value,note,icon}:{title:string;value:string;note:string;icon:any}){
  return <div className="card-pillowy !p-5"><div className="w-9 h-9 rounded-xl bg-primary-container text-primary flex items-center justify-center">{icon}</div><div className="text-2xl font-black mt-3">{value}</div><div className="text-sm font-black mt-1">{title}</div><div className="text-xs font-bold text-neutral-400 mt-1">{note}</div></div>
}
