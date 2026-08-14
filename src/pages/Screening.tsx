import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Info, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import type { Page } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

interface ScreeningProps { step: Page; setPage:(p:Page)=>void }

export default function Screening({step,setPage}:ScreeningProps){
  const {language}=useLanguage();
  const {saveScreening}=useHebatData();
  const isId=language==='id';
  const {user}=useAuth();
  const role=(user?.role||'parent') as 'parent'|'teacher'|'child'|'professional';
  const isTeacher=role==='teacher';
  const [agreed,setAgreed]=useState(false);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<number[]>([]);
  const [selected,setSelected]=useState<number|null>(null);
  const [submitted,setSubmitted]=useState(false);

  const questions=useMemo(()=> isTeacher ? [
    [isId?'Seberapa sering siswa kesulitan mempertahankan perhatian pada tugas kelas?':'How often does the student have difficulty sustaining attention during classroom tasks?',isId?'Pertimbangkan tugas yang sesuai usia dan kondisi kelas biasa.':'Consider age-appropriate tasks in a typical classroom setting.'],
    [isId?'Seberapa sering siswa membutuhkan instruksi diulang atau dipecah menjadi langkah lebih kecil?':'How often does the student need instructions repeated or broken into smaller steps?',isId?'Catat kebutuhan prompting, bukan kemampuan akademik.':'Focus on prompting needs, not academic ability.'],
    [isId?'Seberapa sering siswa meninggalkan tugas sebelum selesai?':'How often does the student leave a task before it is finished?',isId?'Bedakan dari tugas yang memang terlalu sulit atau tidak dipahami.':'Distinguish this from tasks that are too difficult or not understood.'],
    [isId?'Seberapa sering transisi antaraktivitas membutuhkan prompt tambahan?':'How often do transitions between activities require additional prompts?',isId?'Contoh: pergantian pelajaran, mulai tugas, atau merapikan bahan.':'For example: changing subjects, starting work, or packing materials.'],
    [isId?'Seberapa sering siswa menjawab atau bertindak sebelum instruksi selesai?':'How often does the student respond or act before instructions are finished?',isId?'Gunakan observasi perilaku yang terlihat.':'Use directly observable classroom behaviour.'],
    [isId?'Seberapa sering gerakan atau kegelisahan mengganggu penyelesaian tugas?':'How often does movement or restlessness interfere with task completion?',isId?'Jangan menilai kebutuhan bergerak sebagai masalah jika tidak mengganggu fungsi.':'Do not treat movement as a problem unless it interferes with functioning.'],
  ] : [
    [isId?'Seberapa sering anak kesulitan menyelesaikan aktivitas yang membutuhkan perhatian berkelanjutan?':'How often does the child have difficulty finishing activities that need sustained attention?',isId?'Pikirkan PR, permainan terstruktur, atau rutinitas rumah.':'Think about homework, structured play, or home routines.'],
    [isId?'Seberapa sering anak membutuhkan instruksi diulang atau dipisah menjadi langkah kecil?':'How often does the child need instructions repeated or split into smaller steps?',isId?'Fokus pada pola sehari-hari, bukan satu kejadian.':'Focus on everyday patterns, not a single event.'],
    [isId?'Seberapa sering anak beralih dari satu aktivitas sebelum aktivitas sebelumnya selesai?':'How often does the child switch activities before finishing the previous one?',isId?'Pertimbangkan apakah pola ini mengganggu rutinitas.':'Consider whether the pattern interferes with routines.'],
    [isId?'Seberapa sering menunggu giliran atau menahan respons terasa sulit?':'How often is waiting for a turn or holding back a response difficult?',isId?'Gunakan contoh di rumah atau aktivitas sosial.':'Use examples from home or social activities.'],
    [isId?'Seberapa sering rutinitas rumah membutuhkan pengingat berulang?':'How often do home routines require repeated reminders?',isId?'Contoh: bersiap sekolah, PR, atau rutinitas malam.':'For example: getting ready, homework, or bedtime routines.'],
  ],[isTeacher,isId]);

  const options=[
    {v:1,label:isId?'Jarang':'Rarely'},
    {v:2,label:isId?'Kadang':'Sometimes'},
    {v:3,label:isId?'Sering':'Often'},
    {v:4,label:isId?'Sangat sering':'Very often'},
  ];
  const total=answers.reduce((a,b)=>a+b,0);
  const max=questions.length*4;
  const ratio=max?total/max:0;
  const result=ratio>=.72?{level:'High',label:isId?'Perlu dukungan lebih tinggi':'Higher support need',desc:isId?'Pola terlihat cukup konsisten. Lanjutkan koordinasi sekolah-rumah dan pertimbangkan review profesional bila kebutuhan menetap.':'Patterns appear consistently. Continue coordinated support and consider professional review if needs persist.'}:ratio>=.48?{level:'Moderate',label:isId?'Perlu dukungan sedang':'Moderate support need',desc:isId?'Beberapa pola perlu dipantau dan didukung secara terstruktur.':'Several patterns may benefit from structured support and monitoring.'}:{level:'Low',label:isId?'Kebutuhan dukungan rendah saat ini':'Lower support need at this time',desc:isId?'Lanjutkan observasi rutin tanpa membuat kesimpulan diagnosis.':'Continue ordinary monitoring without drawing a diagnostic conclusion.'};

  const backDashboard:Page=isTeacher?'teacher-dashboard':'parent-dashboard';

  if(step==='screening-intro') return <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-xl card-pillowy !p-8 md:!p-10 text-center">
      <div className="w-16 h-16 rounded-3xl bg-primary-container border-2 border-primary/30 text-primary flex items-center justify-center mx-auto"><ClipboardCheck className="w-8 h-8"/></div>
      <div className="text-[10px] font-black uppercase tracking-[.18em] text-primary mt-6">{isTeacher?'Teacher Screening Workflow':'Parent Screening Workflow'}</div>
      <h1 className="text-3xl font-black mt-2">{isId?'Skrining Risiko & Kebutuhan Dukungan':'Risk & Support Screening'}</h1>
      <p className="text-base font-bold text-neutral-500 mt-3 leading-relaxed">{isId?'Skrining membantu mengidentifikasi pola yang perlu didukung. Hasilnya bukan diagnosis ADHD.':'Screening helps identify patterns that may need support. The result is not an ADHD diagnosis.'}</p>
      {isTeacher&&<div className="mt-5 rounded-2xl bg-secondary-container/20 border border-secondary/20 p-4 text-left"><div className="text-[10px] uppercase tracking-wider font-black text-secondary-dark">ACTRS integration note</div><p className="text-xs font-bold text-neutral-600 mt-1 leading-relaxed">{isId?'Prototype ini menunjukkan alur digital terstruktur. Form ACTRS tervalidasi harus dimuat sesuai lisensi, scoring resmi, dan governance klinis yang berlaku.':'This prototype demonstrates the structured digital workflow. A validated ACTRS form should be loaded with the appropriate licensing, official scoring, and clinical governance.'}</p></div>}
      <label className={cn('mt-6 flex items-start gap-3 rounded-2xl border-2 p-4 text-left cursor-pointer',agreed?'border-primary bg-primary-container/20':'border-surface-variant')}><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="mt-1 w-5 h-5"/><div><div className="text-sm font-black">{isId?'Saya memahami batas penggunaan':'I understand the boundaries'}</div><p className="text-xs font-bold text-neutral-500 mt-1">{isId?'Data digunakan untuk dukungan dan tindak lanjut, bukan diagnosis otomatis.':'The data is used for support and follow-up, not automated diagnosis.'}</p></div></label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6"><button onClick={()=>setPage(backDashboard)} className="btn-outline text-xs">{isId?'Kembali':'Back'}</button><button disabled={!agreed} onClick={()=>{setAnswers([]);setIndex(0);setSelected(null);setSubmitted(false);setPage('screening-quiz')}} className="btn-primary sm:col-span-2 text-sm disabled:opacity-40">{isId?'Mulai Skrining':'Start Screening'}<ArrowRight className="w-4 h-4"/></button></div>
    </div>
  </div>;

  if(step==='screening-quiz'){
    const q=questions[index];
    const next=async()=>{
      if(selected===null)return;
      const nextAnswers=[...answers];nextAnswers[index]=selected;setAnswers(nextAnswers);
      if(index<questions.length-1){setIndex(index+1);setSelected(nextAnswers[index+1]??null)}else{
        const totalScore=nextAnswers.reduce((a,b)=>a+b,0);
        const ratio=totalScore/(questions.length*4);
        const category=ratio>=.72?'High':ratio>=.48?'Moderate':'Low';
        await saveScreening({respondentRole:isTeacher?'teacher':'parent',instrument:isTeacher?'teacher-support-screening-prototype':'parent-support-screening',answers:nextAnswers,totalScore,category,nonDiagnostic:true});
        setSubmitted(true);setPage('screening-results');
      }
    };
    return <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 min-h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between"><button onClick={()=>{if(index===0)setPage('screening-intro');else{setIndex(index-1);setSelected(answers[index-1]??null)}}} className="btn-outline !px-3 !py-2 text-xs"><ArrowLeft className="w-4 h-4"/>{isId?'Kembali':'Back'}</button><span className="text-xs font-black uppercase tracking-wider text-neutral-400">{index+1} / {questions.length}</span></div>
      <div className="h-3 bg-neutral-100 rounded-full overflow-hidden mt-6"><motion.div animate={{width:`${(index+1)/questions.length*100}%`}} className="h-full bg-primary rounded-full"/></div>
      <div className="flex-1 flex flex-col justify-center py-10"><div className="text-[10px] font-black uppercase tracking-widest text-primary text-center">{isId?'Observasi terstruktur':'Structured observation'}</div><h1 className="text-2xl md:text-3xl font-black text-center mt-3 leading-tight">{q[0]}</h1><p className="text-sm font-bold text-neutral-500 text-center mt-3 max-w-lg mx-auto">{q[1]}</p>
        <div className="grid grid-cols-2 gap-3 mt-8">{options.map(o=><button key={o.v} onClick={()=>setSelected(o.v)} className={cn('rounded-2xl border-2 border-b-4 p-4 min-h-20 text-sm font-black transition-all cursor-pointer',selected===o.v?'bg-primary text-white border-primary-dark':'bg-white border-surface-variant text-neutral-600 hover:bg-neutral-50')}><div className="text-[10px] opacity-70 mb-1">{o.v}</div>{o.label}</button>)}</div>
      </div>
      <button disabled={selected===null} onClick={next} className="btn-primary w-full text-sm disabled:opacity-40">{index===questions.length-1?(isId?'Simpan Hasil':'Save Result'):(isId?'Berikutnya':'Next')}<ArrowRight className="w-4 h-4"/></button>
    </div>
  }

  return <div className="max-w-xl mx-auto px-4 py-8 md:py-12 space-y-6">
    <button onClick={()=>setPage(backDashboard)} className="btn-outline !px-3 !py-2 text-xs"><ArrowLeft className="w-4 h-4"/>{isId?'Dashboard':'Dashboard'}</button>
    <section className="card-pillowy text-center !p-8 border-primary/30">
      <div className="w-16 h-16 rounded-3xl bg-primary-container text-primary flex items-center justify-center mx-auto"><ShieldCheck className="w-8 h-8"/></div><div className="text-[10px] font-black uppercase tracking-widest text-primary mt-5">{isId?'Hasil non-diagnostik':'Non-diagnostic Result'}</div><h1 className="text-3xl font-black mt-2">{result.label}</h1><p className="text-base font-bold text-neutral-600 mt-3 leading-relaxed">{result.desc}</p>
      <div className="mt-6 rounded-2xl bg-neutral-50 border border-surface-variant p-4 text-left flex items-start gap-3"><Info className="w-5 h-5 text-secondary-dark shrink-0 mt-0.5"/><p className="text-sm font-bold text-neutral-600">{isId?'HEBAT tidak menampilkan “ADHD score” atau probabilitas diagnosis. Hasil hanya menjadi salah satu sinyal untuk Support Plan.':'HEBAT does not display an “ADHD score” or diagnostic probability. This result is only one signal used in the Support Plan.'}</p></div>
      <button onClick={()=>setPage('support-plan')} className="btn-primary w-full mt-6 text-sm"><CheckCircle2 className="w-5 h-5"/>{isId?'Lihat Support Plan':'View Support Plan'}</button>
    </section>
  </div>
}