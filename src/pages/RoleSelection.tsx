import { motion } from 'motion/react';
import { User, Users, GraduationCap, School, ArrowRight, Smile, Heart, Star, Zap, Stethoscope } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

interface RoleSelectionProps {
  onSelect: (role: 'parent' | 'child' | 'teacher' | 'professional') => void;
}

export default function RoleSelection({ onSelect }: RoleSelectionProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<'parent' | 'child' | 'teacher' | 'professional' | null>(null);

  const roles = [
    {
      id: 'child' as const,
      title: t.roles.child.title,
      description: t.roles.child.description,
      icon: Smile,
      color: 'bg-primary',
      lightColor: 'bg-primary/10',
      accent: Heart
    },
    {
      id: 'parent' as const,
      title: t.roles.parent.title,
      description: t.roles.parent.description,
      icon: Users,
      color: 'bg-secondary',
      lightColor: 'bg-secondary/10',
      accent: Star
    },
    {
      id: 'teacher' as const,
      title: t.roles.teacher.title,
      description: t.roles.teacher.description,
      icon: School,
      color: 'bg-tertiary',
      lightColor: 'bg-tertiary/10',
      accent: GraduationCap
    },
    {
      id: 'professional' as const,
      title: t.roles.professional.title,
      description: t.roles.professional.description,
      icon: Stethoscope,
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      accent: Zap
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background p-6 overflow-x-hidden">
      <header className="max-w-3xl mx-auto w-full pt-10 pb-12 text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 bg-primary-container rounded-[24px] flex items-center justify-center text-primary-dark mx-auto mb-4 rotate-6 border-2 border-primary/20 shadow-sm"
        >
            <Smile className="w-8 h-8 fill-current" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-black text-on-surface tracking-tight leading-tight">
          {t.roleSelectTitle}
        </h1>
        <p className="text-on-surface-variant font-black text-xs uppercase tracking-wider">
          {t.roleSelectSub}
        </p>
      </header>

      <main className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {roles.map((role, i) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(role.id)}
            className={cn(
              "p-6 rounded-[32px] border-2 border-b-6 transition-all text-left group relative overflow-hidden flex flex-col justify-between min-h-[260px] cursor-pointer",
              selected === role.id 
                ? "bg-white border-primary border-b-primary-dark shadow-md" 
                : "bg-white border-surface-variant text-on-surface-variant hover:bg-neutral-50"
            )}
          >
            <div>
              <div className={cn(
                  "w-14 h-14 rounded-[20px] flex items-center justify-center transition-all border-2 mb-5",
                  selected === role.id ? role.color + " text-white border-primary-dark shadow-sm" : role.lightColor + " text-on-surface-variant border-surface-variant/20 group-hover:bg-white"
              )}>
                <role.icon className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                  <h3 className="text-xl font-black tracking-tight text-on-surface">
                      {role.title}
                  </h3>
                  <p className="text-xs font-bold text-on-surface-variant/75 leading-relaxed">
                      {role.description}
                  </p>
              </div>
            </div>

            {selected === role.id && (
                <motion.div 
                    layoutId="role-check"
                    className="absolute top-6 right-6 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white shadow-sm"
                >
                    <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
            )}

            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <role.accent className="w-24 h-24" />
            </div>
          </motion.button>
        ))}
      </main>

      <div className="max-w-md mx-auto w-full pt-12 pb-10">
        <button
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          className={cn(
            "w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all uppercase tracking-wide border-b-4 cursor-pointer",
            selected 
                ? "bg-primary text-white border-primary-dark active:translate-y-[2px] active:border-b-2" 
                : "bg-white border-2 border-surface-variant text-on-surface-variant/30 cursor-not-allowed grayscale"
          )}
        >
          {t.beginJourney}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

