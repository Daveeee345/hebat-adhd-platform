import { useState, useEffect } from 'react';
import { Play, Star, BookOpen, PenTool, Calculator, Brain, ListChecks, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import Activity from './Activity';
import { useLanguage } from '../lib/LanguageContext';
import { useHebatData } from '../lib/HebatDataContext';

export default function LearnModules() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { language } = useLanguage();
  const { completeMission } = useHebatData();

  const modules = [
    {
        id: 1,
        title: language === 'id' ? "📖 Membaca & Pemahaman Bacaan" : "📖 Reading & Reading Comprehension",
        desc: language === 'id' 
          ? "Latihan membaca santai & fokus. Cerita pendek dengan gambar lucu, latihan menemukan ide pokok, dan menempel sticky note digital!"
          : "Relaxed & focused reading exercise. Short stories with cute illustrations, finding main ideas, and pasting digital sticky notes!",
        icon: BookOpen,
        borderColor: "border-secondary",
        bgColor: "bg-secondary-container/20",
        textColor: "text-secondary",
        level: language === 'id' ? "Tingkat Dasar - Menengah" : "Beginner - Intermediate Level",
        pts: 100,
    },
    {
        id: 2,
        title: language === 'id' ? "✍️ Menulis & Ekspresi Tertulis" : "✍️ Writing & Written Expression",
        desc: language === 'id'
          ? "Rangkai kalimat sederhana & mind map kreatif! Diktekan ide melalui suara karakter lucu seperti 🦖 Dino atau 🤖 Robot."
          : "Draft simple sentences & creative mind maps! Dictate ideas using funny character voices like 🦖 Dino or 🤖 Robot.",
        icon: PenTool,
        borderColor: "border-primary", // mapped to primary orange!
        bgColor: "bg-primary-container/20",
        textColor: "text-primary",
        level: language === 'id' ? "Tingkat Menengah" : "Intermediate Level",
        pts: 120,
    },
    {
        id: 3,
        title: language === 'id' ? "➗ Matematika & Logika" : "➗ Mathematics & Logic",
        desc: language === 'id'
          ? "Belajar perkalian & berhitung dengan bantuan visual seru! Mainkan puzzle angka, kalkulator berbintang, dan game logika seru."
          : "Learn multiplication & counting with fun visual aid! Play number puzzles, star-filled calculators, and exciting logic games.",
        icon: Calculator,
        borderColor: "border-primary",
        bgColor: "bg-primary-container/20",
        textColor: "text-primary",
        level: language === 'id' ? "Tingkat Dasar" : "Beginner Level",
        pts: 80,
    },
    {
        id: 4,
        title: language === 'id' ? "🧠 Fungsi Eksekutif & Fokus" : "🧠 Executive Function & Focus",
        desc: language === 'id'
          ? "Latih ingatan, kendali diri, dan fokus berkelanjutan lewat permainan interaktif, Freeze Dance, serta istirahat otak 3-menit."
          : "Train memory, self-control, and sustained focus through interactive games, Freeze Dance, and 3-minute brain breaks.",
        icon: Brain,
        borderColor: "border-purple-400",
        bgColor: "bg-purple-100/30",
        textColor: "text-purple-600",
        level: language === 'id' ? "Tingkat Semua Umur" : "All Ages Level",
        pts: 150,
    }
  ];

  useEffect(() => {
    const jumpId = localStorage.getItem('child_active_module_jump');
    if (jumpId) {
      setActiveModule(parseInt(jumpId));
      localStorage.removeItem('child_active_module_jump');
    }
  }, []);

  const handleCompleteActivity = (pointsEarned: number) => {
    // Preserve legacy activity completion locally, while Stars and today's plan
    // are persisted by the HEBAT backend.
    localStorage.setItem(`module_completed_${activeModule}`, 'true');
    const activeMissionId = localStorage.getItem('hebat_active_mission_id');
    if (activeMissionId) {
      void completeMission(activeMissionId);
      localStorage.removeItem('hebat_active_mission_id');
    }
    setActiveModule(null);
  };

  if (activeModule !== null) {
      return (
        <Activity 
          moduleId={activeModule} 
          onComplete={handleCompleteActivity} 
          onCancel={() => setActiveModule(null)} 
        />
      );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8 text-left">
      <header className="bg-white p-6 rounded-3xl border-2 border-surface-variant shadow-ambient">
        <h1 className="text-3xl font-black text-on-surface mb-2">
          {language === 'id' ? "Pusat Petualangan Belajar" : "Learning Adventure Center"}
        </h1>
        <p className="text-sm text-neutral-500 font-extrabold uppercase tracking-wide">
          {language === 'id' 
            ? "Pilih satu misi belajarmu hari ini untuk melatih otakmu yang luar biasa!" 
            : "Choose one learning mission today to train your amazing brain!"}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => {
            const isCompleted = localStorage.getItem(`module_completed_${m.id}`) === 'true';
            return (
              <div 
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={cn(
                  "card-pillowy flex flex-col justify-between cursor-pointer border-2 hover:translate-y-[-4px] active:translate-y-[1px] transition-all duration-200",
                  m.borderColor,
                  m.bgColor
                )}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-12 h-12 rounded-xl bg-white border-2 flex items-center justify-center shadow-sm", m.borderColor, m.textColor)}>
                      <m.icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      <span className="bg-white border border-surface-variant px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-700 flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-current text-accent" /> {m.pts} Stars
                      </span>
                      <span className="bg-white border border-surface-variant px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-neutral-500 shadow-sm">
                        {m.level}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-on-surface">{m.title}</h3>
                      {isCompleted && (
                        <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                          {language === 'id' ? "SELESAI ✓" : "COMPLETED ✓"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 font-bold leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-variant/40 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                    {isCompleted 
                      ? (language === 'id' ? "Ulangi petualangan?" : "Repeat adventure?") 
                      : (language === 'id' ? "Siap bermain?" : "Ready to play?")}
                  </span>
                  <button className="btn-primary py-2 px-4 rounded-xl text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <span>{isCompleted ? (language === 'id' ? "Main Lagi" : "Play Again") : (language === 'id' ? "Mulai" : "Start")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
        })}
      </div>

      <div className="bg-white p-6 rounded-3xl border-2 border-surface-variant shadow-ambient flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🏆</div>
          <div className="text-left">
            <h4 className="font-black text-on-surface text-base">
              {language === 'id' ? "Ingin Tukar Hadiah Keren?" : "Want to Exchange Cool Rewards?"}
            </h4>
            <p className="text-xs text-neutral-500 font-bold">
              {language === 'id' 
                ? "Gunakan poin Stars yang terkumpul untuk mengklaim mainan digital di Toko Hadiah!" 
                : "Use your accumulated Stars points to claim digital toys in the Rewards Store!"}
            </p>
          </div>
        </div>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('change-page', { detail: 'rewards' }))}
          className="btn-tertiary px-6 py-2.5 text-xs uppercase tracking-wider whitespace-nowrap self-stretch sm:self-auto"
        >
          {language === 'id' ? "Buka Toko Hadiah" : "Open Rewards Store"}
        </button>
      </div>
    </div>
  );
}
