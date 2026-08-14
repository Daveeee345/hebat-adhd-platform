import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Gift, Star, Trophy } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';
import { cn } from '../lib/utils';

export default function Rewards(){
  const {language}=useLanguage();
  const {data,loading,redeemReward}=useHebatData();
  const [busy,setBusy]=useState<string|null>(null);
  const isId=language==='id';
  if(loading||!data) return <div className="max-w-3xl mx-auto px-5 py-10"><div className="card-pillowy animate-pulse h-80"/></div>;
  const items=[
    {id:'badge-focus',name:isId?'Badge Focus Builder':'Focus Builder Badge',cost:80,icon:'🏅',desc:isId?'Badge digital untuk merayakan konsistensi fokus.':'A digital badge celebrating consistent focus.'},
    {id:'theme-sky',name:isId?'Tema Langit':'Sky Theme',cost:120,icon:'☁️',desc:isId?'Tema tampilan lembut untuk halaman siswa.':'A calm display theme for the student view.'},
    {id:'avatar-space',name:isId?'Avatar Astronaut':'Astronaut Avatar',cost:150,icon:'🚀',desc:isId?'Avatar digital untuk profil HEBAT.':'A digital avatar for the HEBAT profile.'},
    {id:'choice-card',name:isId?'Kartu Pilihan Aktivitas':'Activity Choice Card',cost:200,icon:'🎟️',desc:isId?'Pilih satu aktivitas ekstra dari pustaka.':'Choose one extra activity from the library.'},
  ];
  const redeemed=new Set((data.redeemedRewards||[]).map((x:any)=>x.id));
  return <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-7">
    <button onClick={()=>window.dispatchEvent(new CustomEvent('change-page',{detail:'child-dashboard'}))} className="btn-outline !px-3 !py-2 text-xs"><ArrowLeft className="w-4 h-4"/>{isId?'Kembali':'Back'}</button>
    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-widest text-primary">{isId?'Bintang':'Rewards'}</p><h1 className="text-3xl font-black mt-1">{isId?'Toko Bintang':'Star Shop'}</h1><p className="text-base font-bold text-neutral-500 mt-2">{isId?'Bintang adalah hadiah untuk usaha, bukan ukuran kemampuan.':'Stars reward effort; they do not measure ability.'}</p></div><div className="bg-primary-container/30 border-2 border-primary/30 rounded-2xl px-5 py-3"><div className="text-[10px] font-black uppercase tracking-wider text-amber-700">{isId?'Saldo':'Balance'}</div><div className="text-2xl font-black text-primary flex items-center gap-1.5"><Star className="w-5 h-5 fill-current"/>{data.rewardBalance}</div></div></header>

    <section className="card-pillowy border-primary/30 bg-primary-container/10">
      <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0"><Trophy className="w-6 h-6"/></div><div><h2 className="text-xl font-black">{isId?'Teruskan dari tempat terakhir':'Keep going from where you left off'}</h2><p className="text-sm font-bold text-neutral-600 mt-1 leading-relaxed">{isId?'Tidak ada streak yang hilang. HEBAT menyambut kembali kapan pun kamu siap.':'There is no lost streak. HEBAT welcomes you back whenever you are ready.'}</p></div></div>
    </section>

    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">{items.map(item=>{
      const got=redeemed.has(item.id); const enough=data.rewardBalance>=item.cost;
      return <div key={item.id} className="card-pillowy !p-5 flex flex-col"><div className="w-14 h-14 rounded-2xl bg-neutral-50 border-2 border-surface-variant flex items-center justify-center text-3xl">{item.icon}</div><h3 className="text-lg font-black mt-4">{item.name}</h3><p className="text-sm font-bold text-neutral-500 mt-2 leading-relaxed flex-1">{item.desc}</p><div className="mt-5 flex items-center justify-between gap-3"><span className="font-black text-primary flex items-center gap-1"><Star className="w-4 h-4 fill-current"/>{item.cost}</span><button disabled={got||!enough||busy===item.id} onClick={async()=>{setBusy(item.id);try{await redeemReward(item)}finally{setBusy(null)}}} className={cn('px-4 py-2.5 rounded-xl border-2 border-b-4 text-xs font-black uppercase tracking-wider transition-all',got?'bg-tertiary-container border-tertiary/40 text-tertiary-dark':'bg-primary border-primary-dark text-white cursor-pointer disabled:opacity-40')} >{got?(isId?'Dimiliki':'Owned'):enough?(isId?'Tukar':'Redeem'):(isId?'Bintang kurang':'Need more')}</button></div></div>
    })}</section>

    <section className="card-pillowy">
      <div className="flex items-center gap-3"><Gift className="w-5 h-5 text-secondary"/><h2 className="text-lg font-black">{isId?'Bintang didapat dari':'Stars come from'}</h2></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">{[(isId?'Misi belajar':'Learning missions'),(isId?'Focus Sprint':'Focus Sprints'),(isId?'Rutinitas selesai':'Routine completion')].map(x=><div key={x} className="rounded-2xl border border-surface-variant bg-neutral-50 p-3 text-sm font-black flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-tertiary"/>{x}</div>)}</div>
    </section>
  </div>
}
