import { motion } from 'motion/react';
import { Globe, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { translations, type Language } from '../lib/translations';

interface LanguageSelectionProps {
  onSelect: (lang: Language) => void;
}

export default function LanguageSelection({ onSelect }: LanguageSelectionProps) {
  const [selected, setSelected] = useState<Language>('id');

  const t = translations[selected];

  return (
    <div className="min-h-screen flex flex-col bg-background p-6 overflow-x-hidden justify-center items-center">
      <header className="max-w-2xl mx-auto w-full pb-10 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 6 }}
          className="w-20 h-20 bg-primary-container rounded-[28px] flex items-center justify-center text-primary-dark mx-auto mb-6 border-2 border-primary/20 shadow-sm"
        >
          <Globe className="w-10 h-10 animate-spin-slow" />
        </motion.div>
        
        <h1 className="text-4xl font-black text-on-surface tracking-tighter leading-tight">
          {t.langSelectTitle}
        </h1>
        <p className="text-on-surface-variant font-bold text-sm uppercase tracking-wider">
          {t.langSelectSub}
        </p>
      </header>

      <main className="max-w-md mx-auto w-full grid grid-cols-1 gap-5">
        {[
          { id: 'id' as const, label: 'Bahasa Indonesia', native: 'Indonesia', flag: '🇮🇩' },
          { id: 'en' as const, label: 'English', native: 'United Kingdom / US', flag: '🇬🇧' }
        ].map((langOption) => {
          const isSelected = selected === langOption.id;
          return (
            <motion.button
              key={langOption.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(langOption.id)}
              className={cn(
                "p-6 rounded-[32px] border-2 border-b-6 transition-all text-left flex items-center justify-between cursor-pointer",
                isSelected
                  ? "bg-white border-primary border-b-primary-dark shadow-ambient"
                  : "bg-white border-surface-variant text-on-surface-variant hover:bg-neutral-50"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl filter drop-shadow-sm">{langOption.flag}</span>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-on-surface">
                    {langOption.label}
                  </h3>
                  <p className="text-xs font-bold text-on-surface-variant/60">
                    {langOption.native}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </motion.button>
          );
        })}
      </main>

      <div className="max-w-md mx-auto w-full pt-12">
        <button
          onClick={() => onSelect(selected)}
          className="w-full py-4 rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all uppercase tracking-wide border-b-4 cursor-pointer bg-primary text-white border-primary-dark active:translate-y-[2px] active:border-b-2"
        >
          {t.langSelectBtn}
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
