import { useState } from 'react';
import { ArrowRight, CheckCircle2, ClipboardList, FileText, ShieldCheck, Stethoscope, TriangleAlert } from 'lucide-react';
import type { Page } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function ProfessionalDashboard({ setPage }:{ setPage:(p:Page)=>void }){
  const { language }=useLanguage();
  const { data,loading,error,updateReferral }=useHebatData();
  const [note,setNote]=useState('');
  const [saving,setSaving]=useState(false);
  const isId=language==='id';
  if(loading) return <div className="max-w-5xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-64"/></div>;
  if(error||!data) return <div className="max-w-5xl mx-auto px-5 py-10"><div className="card-pillowy"><h2 className="font-black text-xl">Unable to load referral workspace</h2><p className="text-sm font-bold text-neutral-500 mt-2">{error}</p></div></div>;

  const referral=data.referrals[0];
  const priority=data.supportProfile.domains.find(d=>d.key===data.supportProfile.priorityKey);
  return <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-7">
    <header><p className="text-xs font-black uppercase tracking-widest text-primary">{isId?'Tinjauan Profesional':'Professional Review'}</p><h1 className="text-3xl md:text-4xl font-black mt-1 tracking-tight">{isId?'Referral Workspace':'Referral Workspace'}</h1><p className="text-base font-bold text-neutral-500 mt-2">{isId?'Ringkasan observasi sekolah-rumah sebelum keputusan klinis di luar HEBAT.':'A concise school-home summary to support professional review outside HEBAT.'}</p></header>

    <section className="card-pillowy !p-0 overflow-hidden">
      <div className="px-6 py-5 bg-secondary-container/30 border-b border-secondary/20 flex items-center justify-between gap-4"><div><div className="text-[10px] font-black uppercase tracking-widest text-secondary-dark">{isId?'Kasus aktif':'Active Case'}</div><h2 className="text-xl font-black mt-1">{data.child.name}</h2><p className="text-sm font-bold text-neutral-500 mt-1">{data.child.age} {isId?'tahun':'years'} • {data.child.grade} • {data.child.school}</p></div><div className="w-12 h-12 rounded-2xl bg-white border-2 border-secondary/20 text-secondary-dark flex items-center justify-center"><Stethoscope className="w-6 h-6"/></div></div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Summary label={isId?'Status referral':'Referral status'} value={referral?.status || 'monitoring'} icon={<FileText className="w-5 h-5"/>}/>
        <Summary label={isId?'Prioritas dukungan':'Support priority'} value={`${priority?.label} — ${priority?.need}`} icon={<ShieldCheck className="w-5 h-5"/>}/>
        <Summary label={isId?'Observasi terbaru':'Recent observations'} value={`${data.weeklyMetrics.observationsThisWeek}`} icon={<ClipboardList className="w-5 h-5"/>}/>
      </div>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="card-pillowy">
        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Alasan referral':'Referral Rationale'}</div><h3 className="text-xl font-black mt-1">{isId?'Pola yang tetap muncul':'Persistent Pattern'}</h3><p className="text-sm font-bold text-neutral-600 mt-3 leading-relaxed">{referral?.reason}</p>
        <div className="mt-5 space-y-3">{data.supportPlan.reasons.map((r:string)=><div key={r} className="flex items-start gap-3 rounded-2xl bg-neutral-50 border border-surface-variant p-3"><TriangleAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0"/><span className="text-sm font-bold text-neutral-600">{r}</span></div>)}</div>
      </section>

      <section className="card-pillowy">
        <div className="text-[10px] font-black uppercase tracking-widest text-tertiary-dark">{isId?'Strategi yang sudah dicoba':'Strategies Already Tried'}</div><h3 className="text-xl font-black mt-1">{isId?'Dukungan lintas konteks':'Cross-context Support'}</h3>
        <div className="space-y-3 mt-5">{[...data.supportPlan.teacher.slice(0,2),...data.supportPlan.parent.slice(0,2)].map((x:string)=><div key={x} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-tertiary mt-0.5 shrink-0"/><span className="text-sm font-bold text-neutral-600">{x}</span></div>)}</div>
        <button onClick={()=>setPage('support-plan')} className="btn-outline w-full mt-5 text-xs">{isId?'Lihat Rencana Dukungan':'View Support Plan'} <ArrowRight className="w-4 h-4"/></button>
      </section>
    </div>

    <section className="card-pillowy">
      <div className="text-[10px] font-black uppercase tracking-widest text-primary">{isId?'Ringkasan longitudinal':'Longitudinal Summary'}</div><h3 className="text-xl font-black mt-1">{isId?'Respons terhadap dukungan':'Response to Support'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5"><Progress label={isId?'Fokus berhasil':'Successful focus'} value={`${data.weeklyMetrics.focusMinutes} min`} note={data.weeklyMetrics.focusTrend}/><Progress label={isId?'Penyelesaian tugas':'Task completion'} value={`${data.weeklyMetrics.taskCompletion}%`} note={isId?'minggu ini':'this week'}/><Progress label={isId?'Rutinitas rumah':'Home routine'} value={`${data.weeklyMetrics.routineCompletion}%`} note={isId?'langkah selesai':'steps completed'}/></div>
      <div className="mt-5 rounded-2xl border border-surface-variant bg-neutral-50 p-4"><div className="text-[10px] font-black uppercase text-neutral-400">{isId?'Catatan profesional terakhir':'Latest professional note'}</div><p className="text-sm font-bold text-neutral-600 mt-2 leading-relaxed">{referral?.professionalNote || (isId?'Belum ada catatan profesional.':'No professional note yet.')}</p></div>
    </section>

    <section className="card-pillowy">
      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{isId?'Tinjauan profesional':'Professional Review'}</div><h3 className="text-xl font-black mt-1">{isId?'Tambahkan catatan tindak lanjut':'Add Follow-up Note'}</h3><p className="text-sm font-bold text-neutral-500 mt-1">{isId?'Catatan ini tidak mengubah HEBAT menjadi alat diagnosis.':'This note does not turn HEBAT into a diagnostic tool.'}</p>
      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder={isId?'Masukkan rekomendasi tindak lanjut...':'Enter follow-up recommendation...'} className="w-full mt-4 min-h-28 border-2 border-surface-variant rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-primary"/>
      <div className="flex flex-col sm:flex-row gap-3 mt-4"><button disabled={!note.trim()||saving} onClick={async()=>{setSaving(true);try{await updateReferral(referral.id,{status:'reviewed',professionalNote:note.trim()});setNote('')}finally{setSaving(false)}}} className="btn-primary text-sm disabled:opacity-50">{isId?'Simpan Tinjauan':'Save Review'}</button><button onClick={()=>setPage('consultation')} className="btn-outline text-xs">{isId?'Buka Kolaborasi':'Open Collaboration'}</button></div>
    </section>
  </div>
}

function Summary({label,value,icon}:{label:string;value:string;icon:any}){return <div className="rounded-2xl border-2 border-surface-variant p-4"><div className="w-9 h-9 rounded-xl bg-secondary-container text-secondary-dark flex items-center justify-center">{icon}</div><div className="text-[10px] uppercase tracking-wider font-black text-neutral-400 mt-3">{label}</div><div className="text-lg font-black mt-1 capitalize">{value}</div></div>}
function Progress({label,value,note}:{label:string;value:string;note:string}){return <div className="rounded-2xl border-2 border-surface-variant p-4 bg-white"><div className="text-2xl font-black">{value}</div><div className="text-sm font-black mt-1">{label}</div><div className="text-xs font-bold text-neutral-400 mt-1">{note}</div></div>}
