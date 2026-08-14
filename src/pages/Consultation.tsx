import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ClipboardList, LockKeyhole, MessageCircle, ShieldCheck, Stethoscope } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { useAuth } from '../lib/AuthContext';

export default function Consultation(){
  const {language}=useLanguage();
  const {data,loading,requestReferral,updateReferral}=useHebatData();
  const [requesting,setRequesting]=useState(false);
  const [consent,setConsent]=useState(false);
  const isId=language==='id';
  const {user}=useAuth();
  const currentRole=user?.role||'parent';
  const backPage=currentRole==='teacher'?'teacher-dashboard':currentRole==='professional'?'professional-dashboard':'parent-dashboard';
  if(loading||!data) return <div className="max-w-3xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-80"/></div>;
  const current=data.referrals[0];
  const latestRequested=current && ['requested','reviewed'].includes(current.status);
  return <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-7">
    <button onClick={()=>window.dispatchEvent(new CustomEvent('change-page',{detail:backPage}))} className="btn-outline !px-3 !py-2 text-xs"><ArrowLeft className="w-4 h-4"/>{isId?'Kembali':'Back'}</button>
    <header><p className="text-xs font-black uppercase tracking-widest text-primary">{isId?'Rujukan Profesional':'Professional Referral'}</p><h1 className="text-3xl font-black mt-1">{isId?'Tinjauan lebih lanjut ketika dibutuhkan':'Further review when needed'}</h1><p className="text-base font-bold text-neutral-500 mt-2">{isId?'HEBAT merangkum pola dukungan yang sudah diamati tanpa membuat diagnosis.':'HEBAT summarises existing support patterns without making a diagnosis.'}</p></header>

    <section className="card-pillowy border-primary/30 bg-primary-container/10">
      <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0"><ShieldCheck className="w-6 h-6"/></div><div><div className="text-[10px] font-black uppercase tracking-widest text-primary">{isId?'Ringkasan untuk profesional':'Professional Summary'}</div><h2 className="text-xl font-black mt-1">{data.child.name}</h2><p className="text-sm font-bold text-neutral-600 mt-2 leading-relaxed">{data.supportPlan.summary}</p></div></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5"><Box label={isId?'Observasi':'Observations'} value={String(data.weeklyMetrics.observationsThisWeek)}/><Box label={isId?'Fokus berhasil':'Successful focus'} value={`${data.weeklyMetrics.focusMinutes}m`}/><Box label={isId?'Rutinitas':'Routine'} value={`${data.weeklyMetrics.routineCompletion}%`}/></div>
    </section>

    <section className="card-pillowy">
      <div className="flex items-center gap-3"><ClipboardList className="w-5 h-5 text-secondary"/><h2 className="text-xl font-black">{isId?'Yang sudah dicoba':'What has already been tried'}</h2></div>
      <div className="space-y-3 mt-4">{[...data.supportPlan.teacher.slice(0,2),...data.supportPlan.parent.slice(0,2)].map((x:string)=><div key={x} className="flex items-start gap-3 rounded-2xl border border-surface-variant bg-neutral-50 p-3"><CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5"/><span className="text-sm font-bold text-neutral-600">{x}</span></div>)}</div>
    </section>

    <section className="card-pillowy">
      <div className="flex items-start gap-4"><div className="w-11 h-11 rounded-2xl bg-secondary-container text-secondary-dark flex items-center justify-center shrink-0"><LockKeyhole className="w-5 h-5"/></div><div className="flex-1"><div className="text-[10px] font-black uppercase tracking-widest text-secondary-dark">{isId?'Persetujuan & privasi':'Consent & Privacy'}</div><h3 className="text-lg font-black mt-1">{isId?'Data dibagikan hanya untuk rujukan yang disetujui':'Data is shared only for an approved referral'}</h3><p className="text-sm font-bold text-neutral-500 mt-1 leading-relaxed">{isId?'Profesional hanya menerima ringkasan yang relevan setelah persetujuan orang tua.':'The professional receives only relevant records after guardian consent.'}</p>
      {currentRole==='parent'&&!current?.consent&&<label className="mt-4 flex items-start gap-3 rounded-2xl border-2 border-surface-variant bg-white p-4 cursor-pointer"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 w-5 h-5"/><div><div className="text-sm font-black">{isId?'Saya menyetujui berbagi ringkasan rujukan':'I consent to share the referral summary'}</div><p className="text-xs font-bold text-neutral-400 mt-1">{isId?'Persetujuan dapat dicatat dan dicabut dalam sistem.':'Consent is recorded and can later be revoked in the system.'}</p></div></label>}
      {currentRole==='parent'&&current&&!current.consent&&<button disabled={!consent||requesting} onClick={async()=>{setRequesting(true);try{await updateReferral(current.id,{consent:true,status:current.status||'requested'});setConsent(false)}finally{setRequesting(false)}}} className="btn-secondary mt-4 text-xs disabled:opacity-50">{isId?'Setujui Berbagi Data':'Approve Data Sharing'}</button>}
      {currentRole==='parent'&&current?.consent&&<button disabled={requesting} onClick={async()=>{setRequesting(true);try{await updateReferral(current.id,{consent:false,status:'monitoring'})}finally{setRequesting(false)}}} className="btn-outline mt-4 text-xs">{isId?'Cabut Persetujuan':'Revoke Consent'}</button>}
      </div></div>
    </section>

    {latestRequested ? <section className="card-pillowy border-tertiary/30 bg-tertiary-container/10"><div className="flex items-start gap-4"><Stethoscope className="w-6 h-6 text-tertiary-dark shrink-0"/><div><div className="text-[10px] font-black uppercase tracking-widest text-tertiary-dark">{isId?'Status':'Status'}</div><h3 className="text-xl font-black mt-1 capitalize">{current.status}</h3><p className="text-sm font-bold text-neutral-600 mt-2">{current.professionalName || 'Qualified professional'}{current.professionalNote?`: ${current.professionalNote}`:''}</p></div></div></section> : <button disabled={requesting || (currentRole==='parent'&&!consent)} onClick={async()=>{setRequesting(true);try{await requestReferral({consent:currentRole==='parent'?consent:false,reason:'Persistent support needs across school and home after coordinated strategies were attempted.'});setConsent(false)}finally{setRequesting(false)}}} className="btn-primary w-full text-sm disabled:opacity-50"><MessageCircle className="w-5 h-5"/>{requesting?(isId?'Mengirim...':'Requesting...'):(isId?'Minta Tinjauan Profesional':'Request Professional Review')}</button>}

    <p className="text-xs font-bold text-neutral-400 text-center leading-relaxed">{isId?'HEBAT adalah alat dukungan dan koordinasi non-diagnostik.':'HEBAT is a non-diagnostic support and coordination tool.'}</p>
  </div>
}
function Box({label,value}:{label:string;value:string}){return <div className="rounded-2xl border-2 border-surface-variant bg-white p-4"><div className="text-xl font-black">{value}</div><div className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mt-1">{label}</div></div>}