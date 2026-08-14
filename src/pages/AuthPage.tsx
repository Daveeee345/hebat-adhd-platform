import { useState, type FormEvent, type ReactNode } from 'react';
import { Eye, EyeOff, Globe, LockKeyhole, Mail, ShieldCheck, Smile, UserRound } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';
import { cn } from '../lib/utils';

const demos = [
  {role:'Student',email:'student@hebat.demo'},
  {role:'Parent',email:'parent@hebat.demo'},
  {role:'Teacher',email:'teacher@hebat.demo'},
  {role:'Professional',email:'professional@hebat.demo'},
];

export default function AuthPage(){
  const {login,register} = useAuth();
  const {language,setLanguage} = useLanguage();
  const isId = language==='id';
  const [mode,setMode] = useState<'login'|'register'>('login');
  const [showPassword,setShowPassword] = useState(false);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [form,setForm] = useState({name:'',email:'',password:'',role:'child',childName:'',age:'9',grade:'Grade 4',school:''});

  async function submit(e:FormEvent){
    e.preventDefault(); setBusy(true); setError('');
    try{
      if(mode==='login') await login(form.email,form.password);
      else await register({
        name:form.name,email:form.email,password:form.password,role:form.role,
        child: form.role==='child' ? {age:Number(form.age),grade:form.grade,school:form.school} : form.childName.trim() ? {name:form.childName,age:Number(form.age),grade:form.grade,school:form.school} : undefined
      });
    }catch(e:any){setError(e.message||'Unable to continue.');}
    finally{setBusy(false);}
  }

  async function demo(email:string){
    setBusy(true);setError('');setForm(f=>({...f,email,password:'Demo123!'}));
    try{await login(email,'Demo123!');}catch(e:any){setError(e.message||'Unable to sign in.');}finally{setBusy(false);}
  }

  return <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
    <div className="w-full max-w-5xl grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
      <section className="hidden lg:flex flex-col justify-between rounded-[32px] bg-primary text-white p-9 border-b-8 border-primary-dark min-h-[650px]">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/25 flex items-center justify-center"><Smile className="w-8 h-8"/></div>
          <h1 className="text-5xl font-black tracking-tight mt-7">HEBAT</h1>
          <p className="text-xl font-extrabold mt-3 leading-snug max-w-sm">{isId?'Satu akun, satu riwayat dukungan yang terus berkembang.':'One account, one support history that grows with the child.'}</p>
        </div>
        <div className="space-y-4">
          {[isId?'Progress tersimpan berdasarkan akun':'Progress saved to each account',isId?'Guru, orang tua, siswa, dan profesional terhubung':'Student, parent, teacher, and professional stay connected',isId?'Data tidak lagi bergantung pada browser yang sama':'History no longer depends on the same browser'].map(x=><div key={x} className="flex gap-3 items-start font-bold"><ShieldCheck className="w-5 h-5 mt-0.5 shrink-0"/><span>{x}</span></div>)}
        </div>
      </section>

      <section className="bg-white rounded-[32px] border-2 border-surface-variant shadow-ambient-lg p-5 sm:p-8 md:p-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:hidden"><div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center border-b-4 border-primary-dark"><Smile className="w-6 h-6"/></div><div className="text-2xl font-black text-primary">HEBAT</div></div>
          <div className="hidden lg:block"><div className="text-[11px] uppercase tracking-[0.2em] font-black text-neutral-400">HEBAT Account</div><div className="text-3xl font-black mt-1">{mode==='login'?(isId?'Selamat datang kembali':'Welcome back'):(isId?'Buat akun HEBAT':'Create your HEBAT account')}</div></div>
          <button onClick={()=>setLanguage(isId?'en':'id')} className="btn-outline !py-2 !px-3 text-xs"><Globe className="w-4 h-4"/>{language.toUpperCase()}</button>
        </div>
        <div className="lg:hidden mt-5"><h1 className="text-3xl font-black">{mode==='login'?(isId?'Selamat datang kembali':'Welcome back'):(isId?'Buat akun HEBAT':'Create your HEBAT account')}</h1></div>

        <div className="grid grid-cols-2 bg-neutral-100 p-1.5 rounded-2xl mt-7">
          <button onClick={()=>{setMode('login');setError('')}} className={cn('py-3 rounded-xl font-black text-sm cursor-pointer',mode==='login'?'bg-white border-2 border-surface-variant shadow-sm':'text-neutral-500')}>{isId?'Masuk':'Sign in'}</button>
          <button onClick={()=>{setMode('register');setError('')}} className={cn('py-3 rounded-xl font-black text-sm cursor-pointer',mode==='register'?'bg-white border-2 border-surface-variant shadow-sm':'text-neutral-500')}>{isId?'Daftar':'Create account'}</button>
        </div>

        <form onSubmit={submit} className="space-y-4 mt-6">
          {mode==='register' && <Field icon={<UserRound/>} label={isId?'Nama akun':'Your name'}><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={isId?'Nama lengkap':'Full name'} className="auth-input" required/></Field>}
          <Field icon={<Mail/>} label="Email"><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="name@example.com" className="auth-input" required/></Field>
          <Field icon={<LockKeyhole/>} label={isId?'Kata sandi':'Password'}>
            <div className="relative"><input type={showPassword?'text':'password'} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder={mode==='register'?(isId?'Minimal 8 karakter + angka':'At least 8 characters + a number'):'••••••••'} className="auth-input !pr-12" required/><button type="button" onClick={()=>setShowPassword(v=>!v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer">{showPassword?<EyeOff className="w-5 h-5"/>:<Eye className="w-5 h-5"/>}</button></div>
          </Field>

          {mode==='register' && <>
            <div><label className="auth-label">{isId?'Jenis akun':'Account role'}</label><div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">{[['child',isId?'Siswa':'Student'],['parent',isId?'Orang Tua':'Parent'],['teacher',isId?'Guru':'Teacher'],['professional',isId?'Profesional':'Professional']].map(([v,l])=><button type="button" key={v} onClick={()=>setForm({...form,role:v})} className={cn('rounded-xl border-2 px-3 py-3 text-xs font-black cursor-pointer',form.role===v?'bg-primary text-white border-primary-dark':'bg-white border-surface-variant text-neutral-600')}>{l}</button>)}</div></div>
            {form.role!=='child' && form.role!=='professional' && <Field icon={<UserRound/>} label={isId?'Profil anak pertama (opsional)':'First child profile (optional)'}><input value={form.childName} onChange={e=>setForm({...form,childName:e.target.value})} placeholder={form.role==='parent'?(isId?'Nama anak':'Child name'):form.role==='teacher'?(isId?'Nama siswa pertama':'First student name'):(isId?'Nama kasus demo':'Demo case name')} className="auth-input"/></Field>}
            {form.role==='professional' && <div className="rounded-2xl bg-secondary-container/20 border border-secondary/20 p-4 text-sm font-bold text-neutral-600">{isId?'Akun profesional terhubung ke kasus melalui kode profil yang sudah memiliki persetujuan rujukan.':'Professional accounts connect to cases through a child code that already has referral consent.'}</div>}
            {(form.role==='child'||(form.role!=='professional'&&form.childName.trim())) && <div className="grid sm:grid-cols-3 gap-3"><input type="number" min="4" max="17" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} className="auth-input" placeholder="Age"/><input value={form.grade} onChange={e=>setForm({...form,grade:e.target.value})} className="auth-input" placeholder="Grade 4"/><input value={form.school} onChange={e=>setForm({...form,school:e.target.value})} className="auth-input" placeholder={isId?'Sekolah':'School'}/></div>}
          </>}

          {error && <div className="rounded-2xl bg-error-container text-on-error-container border-2 border-error/20 p-4 text-sm font-extrabold">{error}</div>}
          <button disabled={busy} className="btn-primary w-full !py-4 text-sm disabled:opacity-60">{busy?(isId?'Memproses...':'Please wait...'):mode==='login'?(isId?'Masuk ke HEBAT':'Sign in to HEBAT'):(isId?'Buat akun':'Create account')}</button>
        </form>

        {mode==='login' && <div className="mt-7 pt-6 border-t-2 border-surface-variant/70"><div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">{isId?'Akun demo cepat':'Quick demo accounts'}</div><p className="text-xs font-bold text-neutral-500 mt-1">{isId?'Semua menggunakan password Demo123!':'All demo accounts use password Demo123!'}</p><div className="grid grid-cols-2 gap-2 mt-3">{demos.map(d=><button key={d.email} disabled={busy} onClick={()=>demo(d.email)} className="btn-outline !py-2.5 !px-3 text-[11px] normal-case tracking-normal">{d.role}</button>)}</div></div>}
      </section>
    </div>
  </div>;
}

function Field({icon,label,children}:{icon:ReactNode;label:string;children:ReactNode}){return <div><label className="auth-label flex items-center gap-2"><span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span>{label}</label><div className="mt-2">{children}</div></div>}
