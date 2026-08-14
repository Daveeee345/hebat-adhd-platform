import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';

interface OnboardingProps {
  step: number;
  onNext: () => void;
  onBack: () => void;
}

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3JbIz5ZUAkH5uLYKsLf5dU2nzKyLvsWwodHI2obrLvWzT9pVVQGMrAjCZnzF7ZcYGx2_x9AQW4s_5NLJqgOiCO8IHPV9KPIAW4v6oWlvbtC6IbOav1kKN4XZQPjLArCjQ1YPhilvOAPdTz4HR9B-GOzkg_wj1RyKcMtqd7gOiDToVK_CLoyWh4YHSzpagbazjZnQOq0jj2mwL-XCF6fnMfPStbNE5EP9JmISAO85zprb4JdR6RAaHblSrEorNdqLhG5bfAXoQT7U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBNq-7EcJuB-x9yxPEC27Oj8ZdyGOK0-EJOzgPNUhfyzZSbJnjgwPjA675XD6prFN1Wk_n7siFY4SClxTpYliIYBg6wCByB6P1CbLRUOfnAEwfnUagifilKQuunzo-oYe2DjzsVQeSWSNlfL9Yrokj_Gl0namDlcWyQuyCtiD1TsWdDdegpKT1XdrofLjdpkAumLpnh6QP5sfIzYPIgDULZs6kkdpf-WtYdr8aiNqm8xAvoQYl18zuFsoZSENnjBURXubl_EohT1Dg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB4CRIEU6H-N4NjOwLK1-L-Xbjq2Hg4QNvKce5pBVRHYZHq7zbymspgRK-8PLEK443IQr3XZah3l9_T9IxSt_ddVGe-tfvydTz3kP8VJr1NBfB4TSys3AMcpR7wppjoerbuYneCXoT8hxsZtDsrGt97G4EQ48CIXueK7l2Z_CjSJ8HBWQG9qzNfGLl_FG2KL3soDphL9uch_SIS1_1y7n__m8FGYt9eRt-qE4V5nyg2Ot_NW6HtjDItNAqIikwPdvBeubbG8it__hg"
];

export default function Onboarding({ step, onNext, onBack }: OnboardingProps) {
  const { t } = useLanguage();

  const onboardingItem = t.onboarding[step - 1];
  const currentImage = images[step - 1];

  return (
    <div className="min-h-screen flex flex-col bg-background p-6 max-w-md mx-auto relative overflow-hidden">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="p-2 bg-white border-2 border-surface-variant rounded-full text-on-surface-variant cursor-pointer hover:bg-neutral-50">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2 mx-auto">
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                s === step ? "w-8 bg-primary" : "w-2.5 bg-surface-variant"
              )} 
            />
          ))}
        </div>
        <button onClick={onNext} className="text-on-surface-variant font-black uppercase tracking-wider text-xs cursor-pointer hover:text-primary">
          {t.skip}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col items-center text-center"
        >
          {/* Hero Illustration */}
          <div className="relative w-full aspect-square max-w-[280px] mb-8 flex items-center justify-center">
             <div className="absolute inset-0 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />
             <div className="w-full h-full rounded-[40px] overflow-hidden bg-white shadow-sm border-4 border-surface-variant">
                <img 
                  src={currentImage} 
                  alt={onboardingItem.title}
                  className="w-full h-full object-cover mix-blend-multiply opacity-95 animate-fade-in"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>

          <h2 className="text-2xl font-black text-on-surface mb-3 leading-tight">
            {onboardingItem.title}
          </h2>
          <p className="text-sm font-bold text-on-surface-variant leading-relaxed mb-8">
            {onboardingItem.description}
          </p>

          {step === 2 && (
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                {[
                  { label: t.onboarding[1].stats?.[0]?.label || "Focus Games", sub: t.onboarding[1].stats?.[0]?.sub || "Train your attention", icon: "🎮" },
                  { label: t.onboarding[1].stats?.[1]?.label || "Reward Badges", sub: t.onboarding[1].stats?.[1]?.sub || "Celebrate wins", icon: "🏆" }
                ].map((stat, i) => (
                    <div key={i} className="card-pillowy p-4 bg-white border-2 border-surface-variant flex flex-col items-center text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <h4 className="font-black text-on-surface text-sm">{stat.label}</h4>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{stat.sub}</p>
                    </div>
                ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="pt-4">
        <button
          onClick={onNext}
          className="w-full btn-primary py-4 text-base uppercase tracking-wider flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>{step === 3 ? t.getStarted : t.nextStep}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
