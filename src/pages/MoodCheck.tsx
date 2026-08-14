import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const moods = [
    { label: 'Happy', emoji: '😊', color: 'text-yellow-500', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChgxdNcCLelPxrU8rnYHk0zlOi7XZtddXTOkFsdGL-tQxg8yqBjaqwHYtD1F07jgP8IxgXPgLy6UrVzHxlPZzzV8Xpjj9YsOL5M-MlCX1wFx5GEz9PRLGR98-S-qkqm_vpb6i6KKs-jX46qibwKYfcUJg4XSOskNc73dTbPQe_fBI_GIqD9mxA1MtqY6TebbUJTLzymltkW-cSq-k_8OyuYf-iQTL4tqqKZ2nnrqsYl5F7llLsXGmGAbv5lIX1PMT8riIwGp-kOZY" },
    { label: 'Calm', emoji: '😌', color: 'text-blue-400', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVPWYEukfzDuakdTQ2APXQ0BQ1p68L4y7GMrAQ0Jja7xw9ltKVouV2N3DOhkx8GLD8Sz-Z6BH2XuOVvXpcP8pZFcuD26z_EXN4HUB7DwX7Q0yxEsKq8HKVnEgKj1FBTlo0mp_f1J19I59qBWM9UepvN4cW2afAvJuMYKC05-ENMGVQFmX_EdZPTK2KrrLmF13peonqbVTLuqpuNZ28KlR8r86SYNyIn8j4KWIpnYsiFqOYY7hHPvr1G61QheXqPRhQ2kwgNJFvEDA" },
    { label: 'Confused', emoji: '🤔', color: 'text-purple-400', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbBT4P9pyjJlSWZd8L0aIUJcs4CHGfxa0EhzykhyzIOkKXczxdelzBdctRl2B6zjtHfB4h_0jSVQIbC2UK-ztHBVTm9ypkJGo_f6Js6UtUMwzlxyQiGrmDc_Bt1fV38VU9dGszPyttv3WJ02vm9JUqSuw6BPshFUdEbKkDpGO2GJs0GIXPO81g5IbjW6SrQsuwc1dYt7_KJ6bJMVY7Ae2F-ct6HWAGlcHlEcn_7lU1DcTmcvJUgl3z0WBB_rNilfbz0R0Fs58HPBs" },
    { label: 'Tired', emoji: '😴', color: 'text-gray-400', image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6wdTaC2nWYxWRWUAJdRLkAfF531UI6d2_qO1PxV30hTI3sobaaKLIf2fJ6eoG6Tz5pfYIIPuompV9rkUZ0WiXxAl5711zsJDIhUJFDx_c9nSAubeqK3kqlVT_W0-Jwm4ne6TpwsLfMJv9QbbGoAwlWzZnJMwPd5jU3iyV8F1ibFg7YM4rVyUHCgWeyd9MnzzoV6ljscubZ-aKZj3isaZKuc82_L6GZBT1spF1LOJsqYk5PhouVMClc__Ae_gbqt_0SkxU8uwk-NI" }
];

const factors = ['School Work', 'Playing', 'Friends', 'Family', 'Resting', 'Other'];

export default function MoodCheck() {
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [selectedFactors, setSelectedFactors] = useState(['Playing']);
  const [showSparkles, setShowSparkles] = useState(false);

  const toggleFactor = (f: string) => {
    setSelectedFactors(prev => 
        prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  };

  const handleMoodSelect = (mood: string) => {
      setSelectedMood(mood);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
  };

  const currentMoodObj = moods.find(m => m.label === selectedMood);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      <section className="text-center space-y-8">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-3"
        >
            <h2 className="text-4xl font-black text-on-surface tracking-tighter">How's the heart today?</h2>
            <p className="text-on-surface-variant font-bold text-lg italic">Tap the face that feels like you.</p>
        </motion.div>
        
        {/* Mood Interactive Orbit */}
        <div className="flex flex-col items-center gap-12 pt-8">
            <div className="relative w-64 h-64 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedMood}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        className="relative z-20 w-48 h-48"
                    >
                         <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                         <img 
                            src={currentMoodObj?.image} 
                            alt={selectedMood} 
                            className="w-full h-full object-cover rounded-full border-8 border-white shadow-ambient relative z-10"
                         />
                         {showSparkles && (
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-[-40px] z-20 flex items-center justify-center pointer-events-none"
                             >
                                 <Sparkles className="w-full h-full text-primary scale-[2]" />
                             </motion.div>
                         )}
                    </motion.div>
                </AnimatePresence>

                {/* Satellite Moods */}
                {moods.map((m, i) => {
                    const angle = (i * 360) / moods.length;
                    return (
                        <motion.button
                            key={m.label}
                            onClick={() => handleMoodSelect(m.label)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "absolute w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl transition-all border-2",
                                selectedMood === m.label ? "border-primary scale-110 z-30" : "border-transparent opacity-60 hover:opacity-100"
                            )}
                            animate={{
                                x: Math.cos((angle * Math.PI) / 180) * 140,
                                y: Math.sin((angle * Math.PI) / 180) * 140,
                            }}
                        >
                            {m.emoji}
                        </motion.button>
                    )
                })}
            </div>
            <motion.div 
                key={selectedMood}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h3 className="text-2xl font-black text-on-surface uppercase tracking-widest">{selectedMood}</h3>
                <div className="w-12 h-1 bg-primary mx-auto mt-2 rounded-full" />
            </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.section 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="card-pillowy space-y-8 bg-surface-container-lowest border-none shadow-ambient"
        >
            <div className="space-y-2">
                <h3 className="text-xl font-black text-on-surface uppercase tracking-tight">The Story Today</h3>
                <p className="text-sm font-bold text-on-surface-variant italic">What's making waves in your world?</p>
            </div>

            <div className="flex flex-wrap gap-2">
                {factors.map(f => (
                    <motion.button
                        key={f}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFactor(f)}
                        className={cn(
                            "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                            selectedFactors.includes(f) 
                                ? "bg-primary text-white border-primary shadow-lg translate-y-[-2px]" 
                                : "bg-white text-on-surface-variant border-surface-variant/20 grayscale-[20%]"
                        )}
                    >
                        {f}
                    </motion.button>
                ))}
            </div>
        </motion.section>

        <motion.section 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="card-pillowy space-y-6 bg-surface-container-lowest border-none shadow-ambient"
        >
            <div className="space-y-2">
                <label className="text-xs font-black text-on-surface uppercase tracking-[0.2em] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Write a micro-journal
                </label>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase">Keep it simple, keep it you.</p>
            </div>
            <textarea 
                placeholder="Today was..."
                className="w-full h-32 bg-surface/30 border-2 border-surface-variant/20 rounded-[24px] p-6 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40 italic font-medium"
            />
        </motion.section>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="flex justify-center pt-8"
      >
        <button className="bg-primary text-white px-16 py-6 rounded-full font-black text-xl btn-tactile shadow-ambient-primary flex items-center gap-4 hover:scale-105 active:scale-95 transition-all">
            <Save className="w-7 h-7" />
            Check-In Complete!
        </button>
      </motion.div>
    </div>
  );
}
