import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Lock, User, GraduationCap, Brain, Timer, ChevronDown, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';

interface ProfileSetupProps {
  role: 'parent' | 'child' | 'teacher' | 'professional';
  onComplete: () => void;
  onBackToRoleSelection: () => void;
}

const animalAvatars = [
  "/src/assets/images/avatar_lion_1784323124401.jpg",
  "/src/assets/images/avatar_panda_1784323143529.jpg",
  "/src/assets/images/avatar_owl_1784323157847.jpg",
  "/src/assets/images/avatar_fox_1784323169575.jpg"
];

export default function ProfileSetup({ role, onComplete, onBackToRoleSelection }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const isChildFlow = role === 'child' || role === 'parent';
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    specialty: '',
    schoolName: '',
    challenges: [] as string[],
    attentionSpan: null as number | null,
    avatar: animalAvatars[0]
  });
  const [showErrors, setShowErrors] = useState(false);

  const steps = isChildFlow ? [
    { title: t.profileSetupSteps.basics, icon: User },
    { title: t.profileSetupSteps.profile, icon: Brain },
    { title: t.profileSetupSteps.identify, icon: GraduationCap }
  ] : [
    { title: t.profileSetupSteps.basics, icon: User },
    { title: t.profileSetupSteps.detail, icon: Lock }
  ];

  const isStepValid = (step: number) => {
    if (!isChildFlow) {
        if (step === 1) return formData.name.trim() !== '';
        if (step === 2) return role === 'teacher' ? formData.schoolName.trim() !== '' : formData.specialty.trim() !== '';
        return false;
    }
    if (step === 1) return formData.name.trim() !== '' && formData.age !== '' && formData.age !== 'Select age' && formData.age !== 'Pilih usia' && formData.grade !== '' && formData.grade !== 'Select grade' && formData.grade !== 'Pilih kelas';
    if (step === 2) return formData.attentionSpan !== null;
    if (step === 3) return formData.avatar !== '';
    return false;
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      if (currentStep < (isChildFlow ? 3 : 2)) {
        setCurrentStep(s => s + 1);
        setShowErrors(false);
      } else {
        // Save the profile info to localStorage
        localStorage.setItem('user_profile_name', formData.name);
        localStorage.setItem('user_profile_avatar', formData.avatar);
        onComplete();
      }
    } else {
      setShowErrors(true);
    }
  };

  const toggleChallenge = (c: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(c) 
        ? prev.challenges.filter(item => item !== c)
        : [...prev.challenges, c]
    }));
  };

  const challengesList = language === 'id' 
    ? ['Mengikuti Langkah', 'Tetap Fokus', 'Kesadaran Waktu', 'Mengelola Frustrasi', 'Memulai Tugas']
    : ['Following Steps', 'Staying Focused', 'Time Awareness', 'Managing Frustration', 'Starting Tasks'];

  const attentionEnergyList = [
    { l: t.attentionSpans[0].l, s: t.attentionSpans[0].s, i: Brain, c: 'bg-orange-50' },
    { l: t.attentionSpans[1].l, s: t.attentionSpans[1].s, i: Timer, c: 'bg-blue-50' },
    { l: t.attentionSpans[2].l, s: t.attentionSpans[2].s, i: GraduationCap, c: 'bg-purple-50' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      {/* Progress Header */}
      <div className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md pt-8 pb-4 px-6 border-b border-surface-variant/10">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-1.5">
                {steps.map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all",
                            currentStep > i + 1 ? "bg-primary text-white" : 
                            currentStep === i + 1 ? "bg-primary-container text-primary ring-2 ring-primary/20" : 
                            "bg-surface-container text-on-surface-variant/40"
                        )}>
                            {currentStep > i + 1 ? "✓" : i + 1}
                        </div>
                    </div>
                ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                {steps[currentStep - 1].title} · {currentStep} {language === 'id' ? 'dari' : 'of'} {isChildFlow ? 3 : 2}
            </span>
          </div>
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: "33%" }}
                animate={{ width: `${(currentStep / (isChildFlow ? 3 : 2)) * 100}%` }}
                className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] rounded-full"
            />
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="text-center space-y-4">
                 <h1 className="text-4xl font-black text-on-surface tracking-tight leading-tight">
                   {t.profileSetupTitle}
                 </h1>
                 <p className="text-on-surface-variant font-medium">
                    {role === 'parent' 
                      ? (language === 'id' ? "Beri tahu kami tentang anak Anda untuk memulai." : "Tell us about your child to get started.") 
                      : (language === 'id' ? "Beri tahu kami dasar-dasar untuk memulai." : "Tell us the basics to get started.")
                    }
                 </p>
              </header>

              <section className={cn(
                "card-pillowy border-none bg-white p-8 transition-all",
                showErrors && !isStepValid(1) ? "ring-2 ring-error/50" : "shadow-ambient"
              )}>
                 <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2">
                            {role === 'parent' 
                              ? (language === 'id' ? "Nama Anak" : "Child's Name") 
                              : t.profileSetupFields.nameLabel
                            }
                        </label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                            placeholder={role === 'child' || role === 'parent' ? (language === 'id' ? "misal Leo" : "e.g. Leo") : t.profileSetupFields.namePlaceholder} 
                            className={cn(
                                "w-full bg-surface border-2 rounded-[24px] p-5 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/30 font-bold text-lg",
                                showErrors && formData.name === '' ? "border-error/30" : "border-surface-variant/10"
                            )}
                        />
                    </div>

                    {isChildFlow && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2">
                                  {language === 'id' ? "Usia" : "Age"}
                                </label>
                                <div className="relative">
                                    <select 
                                        value={formData.age}
                                        onChange={e => setFormData(p => ({...p, age: e.target.value}))}
                                        className={cn(
                                            "w-full bg-surface border-2 rounded-[24px] p-5 appearance-none outline-none font-bold text-on-surface transition-all",
                                            showErrors && (formData.age === '' || formData.age === 'Select age' || formData.age === 'Pilih usia') ? "border-error/30" : "border-surface-variant/10"
                                        )}
                                    >
                                        <option>{t.profileSetupFields.agePlaceholder}</option>
                                        {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(a => (
                                          <option key={a} value={a}>
                                            {a} {language === 'id' ? 'tahun' : 'years old'}
                                          </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2">
                                  {language === 'id' ? "Kelas" : "Grade"}
                                </label>
                                <div className="relative">
                                    <select 
                                        value={formData.grade}
                                        onChange={e => setFormData(p => ({...p, grade: e.target.value}))}
                                        className={cn(
                                            "w-full bg-surface border-2 rounded-[24px] p-5 appearance-none outline-none font-bold text-on-surface transition-all",
                                            showErrors && (formData.grade === '' || formData.grade === 'Select grade' || formData.grade === 'Pilih kelas') ? "border-error/30" : "border-surface-variant/10"
                                        )}
                                    >
                                        <option>{t.profileSetupFields.gradePlaceholder}</option>
                                        {['K', '1', '2', '3', '4', '5', '6+'].map(g => (
                                          <option key={g} value={g}>
                                            {language === 'id' ? `Kelas ${g}` : `Grade ${g}`}
                                          </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    )}
                 </div>
              </section>
            </motion.div>
          )}

          {currentStep === 2 && !isChildFlow && (
            <motion.div
              key="step-2-pro"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="text-center space-y-4">
                 <h1 className="text-4xl font-black text-on-surface tracking-tight leading-tight">
                   {role === 'teacher' ? (language === 'id' ? "Detail Guru" : "Educator Details") : (language === 'id' ? "Detail Spesialis" : "Specialist Details")}
                 </h1>
                 <p className="text-on-surface-variant font-medium">
                   {language === 'id' ? "Verifikasi kredensial Anda untuk mengakses perangkat." : "Verify your credentials to access the toolkit."}
                 </p>
              </header>

              <section className={cn(
                "card-pillowy border-none bg-white p-8 shadow-ambient transition-all",
                showErrors && !isStepValid(2) ? "ring-2 ring-error/50" : ""
              )}>
                 {role === 'teacher' ? (
                     <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2">
                            {t.profileSetupFields.schoolLabel}
                          </label>
                          <input 
                              type="text" 
                              value={formData.schoolName}
                              onChange={e => setFormData(p => ({...p, schoolName: e.target.value}))}
                              placeholder={t.profileSetupFields.schoolPlaceholder} 
                              className="w-full bg-surface border-2 border-surface-variant/10 rounded-[24px] p-5 focus:border-primary outline-none transition-all font-bold text-lg"
                          />
                     </div>
                 ) : (
                     <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-2">
                            {t.profileSetupFields.specialtyLabel}
                          </label>
                          <input 
                              type="text" 
                              value={formData.specialty}
                              onChange={e => setFormData(p => ({...p, specialty: e.target.value}))}
                              placeholder={t.profileSetupFields.specialtyPlaceholder} 
                              className="w-full bg-surface border-2 border-surface-variant/10 rounded-[24px] p-5 focus:border-primary outline-none transition-all font-bold text-lg"
                          />
                     </div>
                 )}
              </section>
            </motion.div>
          )}

          {currentStep === 2 && isChildFlow && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="text-center space-y-4">
                 <h1 className="text-4xl font-black text-on-surface tracking-tight leading-tight">
                   {language === 'id' ? "Gaya Belajar" : "Learning Styles"}
                 </h1>
                 <p className="text-on-surface-variant font-medium">
                   {language === 'id' ? `Bagaimana ${formData.name || 'anak Anda'} belajar paling baik?` : `How does ${formData.name || 'your child'} learn best?`}
                 </p>
              </header>

              <section className="space-y-10">
                <div className="space-y-6">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant text-center block">
                      {language === 'id' ? "Tantangan Pagi Hari" : "Morning Challenges"}
                    </label>
                    <div className="flex flex-wrap justify-center gap-3">
                        {challengesList.map(c => (
                            <motion.button 
                                key={c}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleChallenge(c)}
                                className={cn(
                                    "px-6 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all border-b-4",
                                    formData.challenges.includes(c)
                                        ? "bg-primary text-white border-primary-container shadow-lg translate-y-[-2px]"
                                        : "bg-white border-surface-variant/10 text-on-surface-variant"
                                )}
                            >
                                {c}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant text-center block">
                      {t.profileSetupFields.attentionLabel}
                    </label>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center opacity-70">
                      {t.profileSetupFields.attentionSub}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {attentionEnergyList.map((item, idx) => (
                             <motion.div 
                               key={idx}
                               whileHover={{ y: -4 }}
                               onClick={() => setFormData(p => ({...p, attentionSpan: idx}))}
                               className={cn(
                                   "p-6 rounded-[32px] border-2 transition-all cursor-pointer flex flex-col items-center gap-4 text-center group",
                                   formData.attentionSpan === idx ? "border-primary bg-white shadow-ambient-primary" : "border-surface-variant/10 bg-white/50"
                               )}
                             >
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                                    formData.attentionSpan === idx ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant"
                                )}>
                                    <item.i className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-on-surface uppercase">{item.l}</p>
                                    <p className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase">{item.s}</p>
                                </div>
                             </motion.div>
                        ))}
                    </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <header className="text-center space-y-4">
                 <h1 className="text-4xl font-black text-on-surface tracking-tight leading-tight">
                   {t.chooseAllyTitle}
                 </h1>
                 <p className="text-on-surface-variant font-medium">
                   {language === 'id' 
                     ? `Pilih binatang pendamping yang akan menemani ${formData.name || 'Anda'} dalam perjalanan ini.` 
                     : `Pick an animal companion that will accompany ${formData.name || 'you'} on this quest.`
                   }
                 </p>
              </header>

              <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                 {animalAvatars.map((img, i) => (
                    <motion.button 
                        key={i}
                        whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData(p => ({...p, avatar: img}))}
                        className={cn(
                            "aspect-square rounded-[32px] overflow-hidden border-4 transition-all relative group shadow-sm bg-white",
                            formData.avatar === img ? "border-primary shadow-ambient-primary scale-105" : "border-surface-variant opacity-70 hover:opacity-100"
                        )}
                    >
                        <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        {formData.avatar === img && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white rounded-full p-2 shadow-md">
                                    <ArrowRight className="w-6 h-6 text-primary" />
                                </motion.div>
                            </div>
                        )}
                    </motion.button>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 flex flex-col items-center gap-6">
            <button 
                onClick={handleNext}
                className={cn(
                  "w-full h-16 rounded-full font-black text-xl flex items-center justify-center gap-4 transition-all btn-tactile shadow-ambient-primary overflow-hidden group",
                  isStepValid(currentStep) 
                    ? "bg-primary text-white active:scale-95 cursor-pointer" 
                    : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed grayscale"
                )}
            >
                <span className="relative z-10">
                  {currentStep === (isChildFlow ? 3 : 2) ? t.completeQuest : t.continueJourney}
                </span>
                <ArrowRight className="w-7 h-7 relative z-10 transition-transform group-hover:translate-x-2" />
                {!isStepValid(currentStep) && showErrors && (
                    <motion.div 
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        className="absolute inset-0 bg-error/10 flex items-center justify-center"
                    />
                )}
            </button>
            
            {currentStep > 1 ? (
                <button 
                    onClick={() => setCurrentStep(s => s - 1)}
                    className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4" /> {t.goBack}
                </button>
            ) : (
                <button 
                    onClick={onBackToRoleSelection}
                    className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4" /> {language === 'id' ? "Ubah Peran" : "Change Role"}
                </button>
            )}

            {!isStepValid(currentStep) && showErrors && (
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-black text-error uppercase tracking-widest text-center"
                >
                    {language === 'id' ? "Silakan lengkapi langkah ini untuk melanjutkan!" : "Please fill out this step to continue!"}
                </motion.p>
            )}
        </div>
      </main>
    </div>
  );
}
