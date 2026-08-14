import { useState, useEffect } from 'react';
import { 
  X, Check, Star, Play, Pause, ChevronRight, ChevronLeft, StickyNote, Volume2, 
  Mic, Calculator, HelpCircle, Sparkles, Smile, Flame, PlayCircle, Redo, LayoutGrid,
  BookOpen, PenTool, Lightbulb, Compass, Award, Trophy, ArrowRight, CheckCircle2, RefreshCw, Brain,
  Crown, Lock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { translateMathSubmodule, translateExecutiveSubmodule } from '../data/curriculumTranslations';
import { 
  readingSubmodules, 
  writingSubmodules, 
  mathSubmodules,
  executiveSubmodules,
  ReadingSubmodule, 
  ReadingActivity, 
  WritingSubmodule, 
  WritingActivity,
  MathSubmodule,
  MathActivity,
  ExecutiveSubmodule,
  ExecutiveActivity
} from '../data/curriculumData';

interface ActivityProps {
  moduleId: number;
  onComplete: (pointsEarned: number) => void;
  onCancel: () => void;
}

export default function Activity({ moduleId, onComplete, onCancel }: ActivityProps) {
  const { language } = useLanguage();
  const [points, setPoints] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  
  // Navigation State inside module
  // 'selection' | 'submodule-overview' | 'activity-play'
  const [flowState, setFlowState] = useState<'selection' | 'activity-play'>('selection');
  
  // Active states for Reading, Writing, Math & Executive
  const [activeReadingSub, setActiveReadingSub] = useState<ReadingSubmodule>(readingSubmodules[0]);
  const [activeWritingSub, setActiveWritingSub] = useState<WritingSubmodule>(writingSubmodules[0]);
  const [activeMathSub, setActiveMathSub] = useState<MathSubmodule>(mathSubmodules[0]);
  const [activeExecSub, setActiveExecSub] = useState<ExecutiveSubmodule>(executiveSubmodules[0]);
  
  const [activeReadingActIdx, setActiveReadingActIdx] = useState<number>(0);
  const [activeWritingActIdx, setActiveWritingActIdx] = useState<number>(0);
  const [activeMathActIdx, setActiveMathActIdx] = useState<number>(0);
  const [activeExecActIdx, setActiveExecActIdx] = useState<number>(0);

  // Adventure Path helpers
  const offsets = [
    '-translate-x-12 sm:-translate-x-16',
    'translate-x-0',
    'translate-x-12 sm:translate-x-16',
    'translate-x-0',
    '-translate-x-12 sm:-translate-x-16',
    'translate-x-0'
  ];

  const getSubmoduleStatus = (subId: string, idx: number, submodulesList: any[]) => {
    const isDone = localStorage.getItem('submodule_completed_' + subId) === 'true';
    if (isDone) return 'completed';
    if (idx === 0) return 'active';
    const prevSub = submodulesList[idx - 1];
    const prevDone = localStorage.getItem('submodule_completed_' + prevSub.id) === 'true';
    if (prevDone) return 'active';
    return 'locked';
  };

  const [selectedMathAnswer, setSelectedMathAnswer] = useState<string | null>(null);
  const [selectedExecAnswer, setSelectedExecAnswer] = useState<string | null>(null);
  const [hasScoredMathAnswer, setHasScoredMathAnswer] = useState(false);
  const [hasScoredExecAnswer, setHasScoredExecAnswer] = useState(false);

  // ----------------------------------------------------
  // READ STATE & INTERACTION
  // ----------------------------------------------------
  const [stickyNoteText, setStickyNoteText] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [selectedReadingAnswer, setSelectedReadingAnswer] = useState<string | null>(null);
  const [isReadingSpeechPlaying, setIsReadingSpeechPlaying] = useState(false);
  const [hasScoredReadingAnswer, setHasScoredReadingAnswer] = useState(false);

  // ----------------------------------------------------
  // WRITE STATE & INTERACTION
  // ----------------------------------------------------
  const [activeVoiceCharacter, setActiveVoiceCharacter] = useState<'dino' | 'robot' | 'fairy'>('dino');
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const [isMockRecording, setIsMockRecording] = useState(false);
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [customEssayText, setCustomEssayText] = useState("");

  // ----------------------------------------------------
  // MATH & CALCULATOR STATE
  // ----------------------------------------------------
  const [mathAnswer, setMathAnswer] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(true);
  const [calcDisplay, setCalcDisplay] = useState("");
  const [calcDots, setCalcDots] = useState<number[]>([]);
  const [activeMathTab, setActiveMathTab] = useState<'puzzle' | 'calculator' | 'khan'>('puzzle');

  // Math Puzzle Details
  const mathProblems = [
    {
      num1: 3,
      num2: 4,
      question: "Sparky meets 3 magical boxes. Each box has 4 glowing keys inside. How many total keys are there?",
      options: [8, 12, 16, 20],
      correctAnswer: 12
    },
    {
      num1: 5,
      num2: 2,
      question: "Benny sees 5 beavers. Each beaver brings 2 thick logs. How many logs did they pile up?",
      options: [7, 10, 12, 15],
      correctAnswer: 10
    }
  ];
  const [activeMathProblemIdx, setActiveMathProblemIdx] = useState(0);

  // ----------------------------------------------------
  // EXECUTIVE FOCUS & IMPULSE TRAINER STATE
  // ----------------------------------------------------
  const [activeFocusTab, setActiveFocusTab] = useState<'dance' | 'break' | 'breath'>('dance');
  
  // Freeze Dance
  const [freezeDanceState, setFreezeDanceState] = useState<'idle' | 'dancing' | 'frozen' | 'failed' | 'success'>('idle');
  const [danceTimeLeft, setDanceTimeLeft] = useState(12);
  const [danceTimerActive, setDanceTimerActive] = useState(false);

  // Brain Break Timer
  const [breakMinutes, setBreakMinutes] = useState(3);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [breakTimerActive, setBreakTimerActive] = useState(false);
  const [breakSoundLoop, setBreakSoundLoop] = useState<'none' | 'rain' | 'forest' | 'waves'>('none');

  // Deep Breath
  const [breathingStep, setBreathingStep] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathingSecondsLeft, setBreathingSecondsLeft] = useState(4);
  const [completedBreathingCycles, setCompletedBreathingCycles] = useState(0);

  const [showSavedToast, setShowSavedToast] = useState(false);

  // Load initial score/points
  useEffect(() => {
    const stored = localStorage.getItem('bloomPoints');
    if (stored) {
      setPoints(parseInt(stored));
    }
  }, []);

  useEffect(() => {
    if (showSavedToast) {
      const timer = setTimeout(() => {
        setShowSavedToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSavedToast]);

  const addRewardPoints = (amt: number) => {
    setSessionPoints(prev => prev + amt);
    const newTotal = points + amt;
    setPoints(newTotal);
    localStorage.setItem('bloomPoints', String(newTotal));
    // Broadcast storage event to sync with Parent Dashboard instantly
    window.dispatchEvent(new Event('storage'));
  };

  // Helper: Sticky note
  const handleSaveSticky = () => {
    if (stickyNoteText.trim()) {
      setSavedNotes([...savedNotes, stickyNoteText.trim()]);
      setStickyNoteText("");
      addRewardPoints(15);
    }
  };

  const handlePlayReadingSpeech = (text: string) => {
    if (isReadingSpeechPlaying) return;
    setIsReadingSpeechPlaying(true);
    
    // Simulate Speech API or fallback timer
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slow for ADHD compliance
      utterance.onend = () => setIsReadingSpeechPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsReadingSpeechPlaying(false), 4000);
    }
    addRewardPoints(5);
  };

  // Helper: Character Simulated Speech-to-text
  const simulatedTranscripts = {
    dino: "RAWR! I think Sparky found the glowing flower near the purple creek!",
    robot: "BEEP-BOOP! INITIATING MOONFLOWER SCAN. COORDINATES LOCKED IN WHISPER WOODS.",
    fairy: "Sparkle dust! The beautiful flower opens only when we take three slow deep breaths."
  };

  const handleStartMockRecord = () => {
    setIsMockRecording(true);
    setTimeout(() => {
      setIsMockRecording(false);
      const transcript = simulatedTranscripts[activeVoiceCharacter];
      setSpokenTranscript(transcript);
      setCustomEssayText(prev => prev ? prev + " " + transcript : transcript);
      addRewardPoints(30);
    }, 2200);
  };

  // Calculator logic
  const handleCalcClick = (val: string) => {
    if (val === 'C') {
      setCalcDisplay("");
      setCalcDots([]);
    } else if (val === '=') {
      try {
        // Safe evaluation pattern
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.]/g, '');
        const res = Function(`"use strict"; return (${sanitized})`)();
        setCalcDisplay(String(res));
        if (typeof res === 'number' && res > 0 && res <= 45) {
          setCalcDots(Array.from({ length: Math.floor(res) }, (_, i) => i + 1));
        } else {
          setCalcDots([]);
        }
        addRewardPoints(5);
      } catch {
        setCalcDisplay("Error");
        setCalcDots([]);
      }
    } else {
      if (calcDisplay === "Error") {
        setCalcDisplay(val);
      } else {
        setCalcDisplay(prev => prev + val);
      }
    }
  };

  // FREEZE DANCE LOOP
  useEffect(() => {
    let interval: any;
    if (danceTimerActive && danceTimeLeft > 0) {
      interval = setInterval(() => {
        setDanceTimeLeft(t => {
          if (t <= 1) {
            setDanceTimerActive(false);
            setFreezeDanceState('success');
            addRewardPoints(50);
            return 0;
          }
          // ADHD Impulse Control: Randomly switch state during countdown
          if (t === 9 || t === 4) {
            setFreezeDanceState('frozen');
          } else if (t === 7 || t === 2) {
            setFreezeDanceState('dancing');
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [danceTimerActive, danceTimeLeft]);

  // BRAIN BREAK COUNTDOWN
  useEffect(() => {
    let interval: any;
    if (breakTimerActive) {
      interval = setInterval(() => {
        if (breakSeconds > 0) {
          setBreakSeconds(s => s - 1);
        } else if (breakMinutes > 0) {
          setBreakMinutes(m => m - 1);
          setBreakSeconds(59);
        } else {
          setBreakTimerActive(false);
          addRewardPoints(40);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breakTimerActive, breakMinutes, breakSeconds]);

  // DEEP BREATH LOOP
  useEffect(() => {
    let interval: any;
    if (breathingStep !== 'idle') {
      interval = setInterval(() => {
        setBreathingSecondsLeft(s => {
          if (s <= 1) {
            if (breathingStep === 'inhale') {
              setBreathingStep('hold');
              return 4;
            } else if (breathingStep === 'hold') {
              setBreathingStep('exhale');
              return 4;
            } else {
              setBreathingStep('inhale');
              setCompletedBreathingCycles(c => {
                const nextC = c + 1;
                addRewardPoints(15);
                return nextC;
              });
              return 4;
            }
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingStep]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col min-h-[calc(100vh-120px)] bg-background text-on-surface">
      
      {/* Top Header Panel */}
      <header className="flex items-center justify-between mb-8 bg-white p-5 rounded-[32px] border-2 border-surface-variant">
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-primary-container border border-primary/20 text-on-primary flex items-center justify-center font-bold">
            {moduleId === 1 && <BookOpen className="w-6 h-6 text-primary" />}
            {moduleId === 2 && <PenTool className="w-6 h-6 text-rose-500" />}
            {moduleId === 3 && <Calculator className="w-6 h-6 text-emerald-600" />}
            {moduleId === 4 && <Brain className="w-6 h-6 text-purple-600" />}
          </div>
          <div>
            <h1 className="text-xl font-black text-on-surface leading-tight">
              {moduleId === 1 && (language === 'id' ? "Membaca & Pemahaman Bacaan" : "Reading & Reading Comprehension")}
              {moduleId === 2 && (language === 'id' ? "Menulis & Ekspresi Tertulis" : "Writing & Written Expression")}
              {moduleId === 3 && (language === 'id' ? "Matematika & Logika" : "Mathematics & Logic")}
              {moduleId === 4 && (language === 'id' ? "Fungsi Eksekutif & Fokus" : "Executive Function & Focus")}
            </h1>
            <p className="text-xs font-black text-on-surface-variant uppercase tracking-wider">
              {flowState === 'selection' ? "Select Activity Submodule" : "Active Practice Quest"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-amber-100/40 border-2 border-amber-400 px-4 py-1.5 rounded-2xl flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <div className="text-left">
              <span className="text-[9px] font-black uppercase text-amber-800 leading-none block">Total Points</span>
              <span className="text-sm font-black text-amber-950">{points}</span>
            </div>
          </div>

          <div className="bg-emerald-100/40 border-2 border-emerald-400 px-4 py-1.5 rounded-2xl flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600 fill-emerald-100" />
            <div className="text-left">
              <span className="text-[9px] font-black uppercase text-emerald-800 leading-none block">Earned Now</span>
              <span className="text-sm font-black text-emerald-950">+{sessionPoints} Stars</span>
            </div>
          </div>

          <button 
            onClick={onCancel}
            className="p-2 bg-white border-2 border-surface-variant rounded-full text-on-surface-variant cursor-pointer hover:bg-neutral-50 active:translate-y-[1px]"
          >
            <X className="w-5 h-5 font-bold" />
          </button>
        </div>
      </header>

      {/* Main Interactive Work Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* ==========================================
              FLOW STATE 1: SELECTION MENU (READ/WRITE MODULES)
              ========================================== */}
          {flowState === 'selection' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* READING MODULES SUBMODULE SELECTOR */}
              {moduleId === 1 && (
                <div className="space-y-8 flex flex-col items-center">
                  <div className="p-6 bg-white rounded-3xl border-2 border-surface-variant text-center max-w-xl w-full shadow-sm">
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-1">Adventure Path</span>
                    <h2 className="text-3xl font-black text-blue-900">
                      {language === 'id' ? "Peta Belajar Seru" : "Fun Learning Map"}
                    </h2>
                    <p className="text-xs text-neutral-400 font-extrabold mt-1.5 leading-relaxed">
                      {language === 'id' 
                        ? "Lompati setiap lingkaran bintang untuk meraih mahkota juara!" 
                        : "Jump over each star circle to win the champion crown!"}
                    </p>
                  </div>

                  {/* Adventure Trail Map */}
                  <div className="relative w-full max-w-md mx-auto flex flex-col items-center gap-16 py-10">
                    {/* Vertical Winding dashed line */}
                    <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-4 border-l-4 border-dashed border-amber-300" />

                    {readingSubmodules.map((sub, i) => {
                      const status = getSubmoduleStatus(sub.id, i, readingSubmodules);
                      const isCompleted = status === 'completed';
                      const isActive = status === 'active';
                      const isLocked = status === 'locked';
                      const offset = offsets[i % offsets.length];
                      const emoji = ['📖', '🔍', '🕵️', '🧱', '📜'][i % 5];

                      return (
                        <div 
                          key={sub.id} 
                          className={cn(
                             "relative flex flex-col items-center transition-transform", 
                             offset
                          )}
                        >
                          {/* Active Hover Badge */}
                          {isActive && (
                            <motion.div 
                              animate={{ y: [0, -6, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="absolute -top-10 bg-primary text-white border-2 border-primary-dark font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-xl shadow-md z-10 whitespace-nowrap"
                            >
                              {language === 'id' ? "Mulai! 👇" : "Start! 👇"}
                            </motion.div>
                          )}

                          {/* Level Button */}
                          <button
                            disabled={isLocked}
                            onClick={() => {
                              if (isLocked) return;
                              setActiveReadingSub(sub);
                              setActiveReadingActIdx(0);
                              setSelectedReadingAnswer(null);
                              setHasScoredReadingAnswer(false);
                              setSavedNotes([]);
                              setFlowState('activity-play');
                            }}
                            className={cn(
                              "w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-b-6 transition-all relative z-10 cursor-pointer active:translate-y-[4px] active:border-b-2",
                              isCompleted && "bg-amber-400 border-amber-500 text-white shadow-sm hover:brightness-105",
                              isActive && "bg-primary border-primary-dark text-white ring-4 ring-primary-container/60 hover:scale-105",
                              isLocked && "bg-neutral-200 border-neutral-300 text-neutral-400 opacity-80 cursor-not-allowed"
                            )}
                          >
                            {isCompleted ? (
                              <Crown className="w-7 h-7 text-white fill-current animate-bounce" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-neutral-400" />
                            ) : (
                              <span className="font-bold">{emoji}</span>
                            )}
                          </button>

                          {/* Floating Points */}
                          {!isCompleted && !isLocked && (
                            <span className="absolute -bottom-6 bg-white border border-surface-variant px-1.5 py-0.5 rounded-lg text-[8px] font-black text-amber-700 uppercase tracking-wider shadow-sm z-10">
                              +100 Stars
                            </span>
                          )}

                          {/* Level Label under the node */}
                          <span className="mt-7 text-xs font-black text-on-surface tracking-tight bg-white px-3 py-1.5 rounded-2xl border border-neutral-200 shadow-sm max-w-[220px] text-center z-10">
                            {sub.title}
                          </span>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* WRITING MODULES SUBMODULE SELECTOR */}
              {moduleId === 2 && (
                <div className="space-y-8 flex flex-col items-center">
                  <div className="p-6 bg-white rounded-3xl border-2 border-surface-variant text-center max-w-xl w-full shadow-sm">
                    <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block mb-1">Adventure Path</span>
                    <h2 className="text-3xl font-black text-rose-950">
                      {language === 'id' ? "Peta Belajar Seru" : "Fun Learning Map"}
                    </h2>
                    <p className="text-xs text-neutral-400 font-extrabold mt-1.5 leading-relaxed">
                      {language === 'id' 
                        ? "Lompati setiap lingkaran bintang untuk meraih mahkota juara!" 
                        : "Jump over each star circle to win the champion crown!"}
                    </p>
                  </div>

                  {/* Adventure Trail Map */}
                  <div className="relative w-full max-w-md mx-auto flex flex-col items-center gap-16 py-10">
                    {/* Vertical Winding dashed line */}
                    <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-4 border-l-4 border-dashed border-amber-300" />

                    {writingSubmodules.map((sub, i) => {
                      const status = getSubmoduleStatus(sub.id, i, writingSubmodules);
                      const isCompleted = status === 'completed';
                      const isActive = status === 'active';
                      const isLocked = status === 'locked';
                      const offset = offsets[i % offsets.length];
                      const emoji = ['✍️', '📝', '🏰', '🧠', '✏️'][i % 5];

                      return (
                        <div 
                          key={sub.id} 
                          className={cn(
                            "relative flex flex-col items-center transition-transform", 
                            offset
                          )}
                        >
                          {/* Active Hover Badge */}
                          {isActive && (
                            <motion.div 
                              animate={{ y: [0, -6, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="absolute -top-10 bg-rose-500 text-white border-2 border-rose-600 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-xl shadow-md z-10 whitespace-nowrap"
                            >
                              {language === 'id' ? "Mulai! 👇" : "Start! 👇"}
                            </motion.div>
                          )}

                          {/* Level Button */}
                          <button
                            disabled={isLocked}
                            onClick={() => {
                              if (isLocked) return;
                              setActiveWritingSub(sub);
                              setActiveWritingActIdx(0);
                              setSpokenTranscript("");
                              setSentenceWords([]);
                              setCustomEssayText(sub.activities[0].startingText || "");
                              setFlowState('activity-play');
                            }}
                            className={cn(
                              "w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-b-6 transition-all relative z-10 cursor-pointer active:translate-y-[4px] active:border-b-2",
                              isCompleted && "bg-amber-400 border-amber-500 text-white shadow-sm hover:brightness-105",
                              isActive && "bg-rose-500 border-rose-600 text-white ring-4 ring-rose-100/60 hover:scale-105",
                              isLocked && "bg-neutral-200 border-neutral-300 text-neutral-400 opacity-80 cursor-not-allowed"
                            )}
                          >
                            {isCompleted ? (
                              <Crown className="w-7 h-7 text-white fill-current animate-bounce" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-neutral-400" />
                            ) : (
                              <span className="font-bold">{emoji}</span>
                            )}
                          </button>

                          {/* Floating Points */}
                          {!isCompleted && !isLocked && (
                            <span className="absolute -bottom-6 bg-white border border-surface-variant px-1.5 py-0.5 rounded-lg text-[8px] font-black text-amber-700 uppercase tracking-wider shadow-sm z-10">
                              +120 Stars
                            </span>
                          )}

                          {/* Level Label under the node */}
                          <span className="mt-7 text-xs font-black text-on-surface tracking-tight bg-white px-3 py-1.5 rounded-2xl border border-neutral-200 shadow-sm max-w-[220px] text-center z-10">
                            {sub.title}
                          </span>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MATHEMATICS MODULES SUBMODULE SELECTOR */}
              {moduleId === 3 && (
                <div className="space-y-8 flex flex-col items-center">
                  <div className="p-6 bg-white rounded-3xl border-2 border-surface-variant text-center max-w-xl w-full shadow-sm">
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest block mb-1">Adventure Path</span>
                    <h2 className="text-3xl font-black text-emerald-900">
                      {language === 'id' ? "Peta Belajar Seru" : "Fun Learning Map"}
                    </h2>
                    <p className="text-xs text-neutral-400 font-extrabold mt-1.5 leading-relaxed">
                      {language === 'id' 
                        ? "Lompati setiap lingkaran bintang untuk meraih mahkota juara!" 
                        : "Jump over each star circle to win the champion crown!"}
                    </p>
                  </div>

                  {/* Adventure Trail Map */}
                  <div className="relative w-full max-w-md mx-auto flex flex-col items-center gap-16 py-10">
                    {/* Vertical Winding dashed line */}
                    <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-4 border-l-4 border-dashed border-amber-300" />

                    {mathSubmodules.map((origSub, i) => {
                      const sub = translateMathSubmodule(origSub, language);
                      const status = getSubmoduleStatus(sub.id, i, mathSubmodules);
                      const isCompleted = status === 'completed';
                      const isActive = status === 'active';
                      const isLocked = status === 'locked';
                      const offset = offsets[i % offsets.length];
                      const emoji = ['🧸', '🧩', '🍎', '⭐', '🧭', '🎓'][i % 6];

                      return (
                        <div 
                          key={sub.id} 
                          className={cn(
                            "relative flex flex-col items-center transition-transform", 
                            offset
                          )}
                        >
                          {/* Active Hover Badge */}
                          {isActive && (
                            <motion.div 
                              animate={{ y: [0, -6, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="absolute -top-10 bg-emerald-500 text-white border-2 border-emerald-600 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-xl shadow-md z-10 whitespace-nowrap"
                            >
                              {language === 'id' ? "Mulai! 👇" : "Start! 👇"}
                            </motion.div>
                          )}

                          {/* Level Button */}
                          <button
                            disabled={isLocked}
                            onClick={() => {
                              if (isLocked) return;
                              setActiveMathSub(origSub);
                              setActiveMathActIdx(0);
                              setSelectedMathAnswer(null);
                              setHasScoredMathAnswer(false);
                              setFlowState('activity-play');
                            }}
                            className={cn(
                              "w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-b-6 transition-all relative z-10 cursor-pointer active:translate-y-[4px] active:border-b-2",
                              isCompleted && "bg-amber-400 border-amber-500 text-white shadow-sm hover:brightness-105",
                              isActive && "bg-emerald-500 border-emerald-600 text-white ring-4 ring-emerald-100/60 hover:scale-105",
                              isLocked && "bg-neutral-200 border-neutral-300 text-neutral-400 opacity-80 cursor-not-allowed"
                            )}
                          >
                            {isCompleted ? (
                              <Crown className="w-7 h-7 text-white fill-current animate-bounce" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-neutral-400" />
                            ) : (
                              <span className="font-bold">{emoji}</span>
                            )}
                          </button>

                          {/* Floating Points */}
                          {!isCompleted && !isLocked && (
                            <span className="absolute -bottom-6 bg-white border border-surface-variant px-1.5 py-0.5 rounded-lg text-[8px] font-black text-amber-700 uppercase tracking-wider shadow-sm z-10">
                              +80 Stars
                            </span>
                          )}

                          {/* Level Label under the node */}
                          <span className="mt-7 text-xs font-black text-on-surface tracking-tight bg-white px-3 py-1.5 rounded-2xl border border-neutral-200 shadow-sm max-w-[220px] text-center z-10">
                            {sub.title}
                          </span>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* EXECUTIVE COGNITIVE MODULES SUBMODULE SELECTOR */}
              {moduleId === 4 && (
                <div className="space-y-8 flex flex-col items-center">
                  <div className="p-6 bg-white rounded-3xl border-2 border-surface-variant text-center max-w-xl w-full shadow-sm">
                    <span className="text-[10px] font-black uppercase text-purple-600 tracking-widest block mb-1">Adventure Path</span>
                    <h2 className="text-3xl font-black text-purple-900">
                      {language === 'id' ? "Peta Belajar Seru" : "Fun Learning Map"}
                    </h2>
                    <p className="text-xs text-neutral-400 font-extrabold mt-1.5 leading-relaxed">
                      {language === 'id' 
                        ? "Lompati setiap lingkaran bintang untuk meraih mahkota juara!" 
                        : "Jump over each star circle to win the champion crown!"}
                    </p>
                  </div>

                  {/* Adventure Trail Map */}
                  <div className="relative w-full max-w-md mx-auto flex flex-col items-center gap-16 py-10">
                    {/* Vertical Winding dashed line */}
                    <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-4 border-l-4 border-dashed border-amber-300" />

                    {executiveSubmodules.map((origSub, i) => {
                      const sub = translateExecutiveSubmodule(origSub, language);
                      const status = getSubmoduleStatus(sub.id, i, executiveSubmodules);
                      const isCompleted = status === 'completed';
                      const isActive = status === 'active';
                      const isLocked = status === 'locked';
                      const offset = offsets[i % offsets.length];
                      const emoji = ['🛑', '🧠', '⚡'][i % 3];

                      return (
                        <div 
                          key={sub.id} 
                          className={cn(
                            "relative flex flex-col items-center transition-transform", 
                            offset
                          )}
                        >
                          {/* Active Hover Badge */}
                          {isActive && (
                            <motion.div 
                              animate={{ y: [0, -6, 0] }}
                              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                              className="absolute -top-10 bg-purple-600 text-white border-2 border-purple-700 font-black text-[9px] uppercase tracking-wider px-3 py-1 rounded-xl shadow-md z-10 whitespace-nowrap"
                            >
                              {language === 'id' ? "Mulai! 👇" : "Start! 👇"}
                            </motion.div>
                          )}

                          {/* Level Button */}
                          <button
                            disabled={isLocked}
                            onClick={() => {
                              if (isLocked) return;
                              setActiveExecSub(origSub);
                              setActiveExecActIdx(0);
                              setSelectedExecAnswer(null);
                              setHasScoredExecAnswer(false);
                              setFlowState('activity-play');
                            }}
                            className={cn(
                              "w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-b-6 transition-all relative z-10 cursor-pointer active:translate-y-[4px] active:border-b-2",
                              isCompleted && "bg-amber-400 border-amber-500 text-white shadow-sm hover:brightness-105",
                              isActive && "bg-purple-600 border-purple-700 text-white ring-4 ring-purple-100/60 hover:scale-105",
                              isLocked && "bg-neutral-200 border-neutral-300 text-neutral-400 opacity-80 cursor-not-allowed"
                            )}
                          >
                            {isCompleted ? (
                              <Crown className="w-7 h-7 text-white fill-current animate-bounce" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-neutral-400" />
                            ) : (
                              <span className="font-bold">{emoji}</span>
                            )}
                          </button>

                          {/* Floating Points */}
                          {!isCompleted && !isLocked && (
                            <span className="absolute -bottom-6 bg-white border border-surface-variant px-1.5 py-0.5 rounded-lg text-[8px] font-black text-amber-700 uppercase tracking-wider shadow-sm z-10">
                              +150 Stars
                            </span>
                          )}

                          {/* Level Label under the node */}
                          <span className="mt-7 text-xs font-black text-on-surface tracking-tight bg-white px-3 py-1.5 rounded-2xl border border-neutral-200 shadow-sm max-w-[220px] text-center z-10">
                            {sub.title}
                          </span>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ARCHIVED STATIC TABS WRAPPER */}
              {moduleId === 4 && false && (
                <div className="hidden">
                  {/* Focus Tab 1: Freeze Dance Game */}
                  {activeFocusTab === 'dance' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Active Game Board */}
                      <div className="md:col-span-7 bg-white card-pillowy p-8 flex flex-col justify-between space-y-6">
                        <div>
                          <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase px-3.5 py-1 rounded-full">
                            Impulse Trainer Game
                          </span>
                          <h2 className="text-2xl font-black text-purple-950 mt-3 mb-2">Live Freeze Dance Challenge</h2>
                          <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
                            Hit start, wiggle and dance when the board flashes green. The moment the board flashes blue and yells 'FREEZE', hold absolutely, 100% still!
                          </p>
                        </div>

                        {/* Visual Stage screen */}
                        <div className={cn(
                          "rounded-[36px] p-8 border-4 text-center min-h-[220px] flex flex-col items-center justify-center transition-all duration-700 relative overflow-hidden",
                          freezeDanceState === 'idle' ? "bg-slate-50 border-slate-200" :
                          freezeDanceState === 'dancing' ? "bg-emerald-50 border-emerald-400" :
                          freezeDanceState === 'frozen' ? "bg-blue-100 border-blue-400 ring-4 ring-blue-200 animate-pulse" :
                          freezeDanceState === 'success' ? "bg-purple-50 border-purple-400" : "bg-rose-50 border-rose-300"
                        )}>
                          
                          {freezeDanceState === 'idle' && (
                            <div className="space-y-4">
                              <span className="text-5xl animate-bounce block">🎵</span>
                              <h4 className="font-extrabold text-lg text-slate-800">Ready to test your focus?</h4>
                              <p className="text-xs text-on-surface-variant font-bold max-w-sm mx-auto">
                                Press start below to ignite. Let's practice self-control and body calmness!
                              </p>
                            </div>
                          )}

                          {freezeDanceState === 'dancing' && (
                            <motion.div 
                              animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
                              transition={{ repeat: Infinity, duration: 0.6 }}
                              className="space-y-3"
                            >
                              <span className="text-6s md:text-5xl block">🕺💃</span>
                              <h3 className="text-3xl font-black text-emerald-800">DANCE & SHAKE!</h3>
                              <p className="text-xs text-emerald-700/80 font-black uppercase tracking-wider">Keep moving! Be ready to halt immediately!</p>
                              {danceTimeLeft > 0 && <span className="font-mono font-black text-3xl block text-emerald-900 mt-2">{danceTimeLeft}s</span>}
                            </motion.div>
                          )}

                          {freezeDanceState === 'frozen' && (
                            <div className="space-y-4">
                              <span className="text-6s md:text-5xl block animate-pulse">🥶❄️</span>
                              <h3 className="text-3xl font-black text-blue-800">FREEZE! STOP WIGGLING!</h3>
                              <p className="text-xs text-blue-900 font-bold max-w-xs mx-auto">Did you freeze completely like an ice sculpture?</p>
                              
                              <div className="flex gap-2 justify-center pt-2">
                                <button 
                                  onClick={() => setFreezeDanceState('dancing')}
                                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700"
                                >
                                  Yes, I halted!
                                </button>
                                <button 
                                  onClick={() => setFreezeDanceState('failed')}
                                  className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600"
                                >
                                  Ah, I moved
                                </button>
                              </div>
                            </div>
                          )}

                          {freezeDanceState === 'success' && (
                            <div className="space-y-4">
                              <span className="text-5xl block">🏆⭐</span>
                              <h3 className="text-3xl font-black text-purple-800">STAGE SUCCESS!</h3>
                              <p className="text-xs text-purple-900 font-bold">+50 Focus points loaded into your compass storage.</p>
                              <button 
                                onClick={() => setFreezeDanceState('idle')}
                                className="bg-purple-600 text-white font-black text-xs uppercase px-5 py-2 rounded-xl mt-2"
                              >
                                Play Again
                              </button>
                            </div>
                          )}

                          {freezeDanceState === 'failed' && (
                            <div className="space-y-4">
                              <span className="text-4xl block">🧘</span>
                              <h3 className="text-2xl font-black text-rose-800">No Worries!</h3>
                              <p className="text-xs text-rose-700 font-bold max-w-xs mx-auto">Self-correction is a stellar focus superpower. Take a slow quiet breath and try once more.</p>
                              <button 
                                onClick={() => setFreezeDanceState('idle')}
                                className="bg-rose-600 text-white font-black text-xs uppercase px-5 py-2 rounded-xl mt-2 select-none"
                              >
                                Retry
                              </button>
                            </div>
                          )}

                        </div>

                        {/* Play/Control actions */}
                        <button 
                          disabled={danceTimerActive || freezeDanceState === 'success'}
                          onClick={() => {
                            setFreezeDanceState('dancing');
                            setDanceTimeLeft(12);
                            setDanceTimerActive(true);
                          }}
                          className={cn(
                            "w-full py-4.5 rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2",
                            danceTimerActive ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white shadow-ambient-primary"
                          )}
                        >
                          <PlayCircle className="w-5 h-5" />
                          {danceTimerActive ? "Tracking Body Calm..." : "Start Freeze Dance Track"}
                        </button>
                      </div>

                      {/* Right: Companion Sidebar info */}
                      <div className="md:col-span-5 bg-purple-950 text-white rounded-[40px] p-8 flex flex-col justify-between">
                        <div>
                          <Flame className="w-12 h-12 text-purple-300 mb-6" />
                          <h3 className="text-2xl font-black tracking-tight leading-tight mb-4">Impulse Control Instruction</h3>
                          <p className="text-purple-100 text-sm leading-relaxed font-semibold">
                            ADHD kids thrive with immediate gamified triggers. The Freeze Dance game develops inhibitory control inside the frontal cortex. By responding instantly to audio-visual 'freeze' signs, body boundaries are practiced and strengthened.
                          </p>
                        </div>
                        <div className="bg-black/20 p-5 rounded-3xl border border-purple-800 text-purple-300 text-xs font-semibold">
                          🌟 Gamification Advantage: Reward stamps will double during consecutive freezes! Keep it up!
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Focus Tab 2: Brain Break Timer */}
                  {activeFocusTab === 'break' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Interactive Countdown Clock */}
                      <div className="md:col-span-7 bg-white card-pillowy p-8 flex flex-col justify-between text-center space-y-6">
                        <div>
                          <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase px-3.5 py-1 rounded-full">
                            Brain Break Timer
                          </span>
                          <h2 className="text-xl font-black text-on-surface mt-3">Reset Cognitive Energy</h2>
                          <p className="text-xs text-on-surface-variant font-medium mt-1">Disconnect from screens or homework for a quick, calming break.</p>
                        </div>

                        {/* Clock Interface */}
                        <div className="p-8 bg-purple-50 rounded-full w-56 h-56 mx-auto flex flex-col items-center justify-center border-4 border-purple-200 shadow-sm shrink-0">
                          <span className="text-4xl font-black text-purple-900 font-mono tracking-tight">
                            {String(breakMinutes).padStart(2, '0')}:{String(breakSeconds).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] font-black uppercase text-purple-600 mt-1 tracking-widest">
                            {breakTimerActive ? "REST TIME" : "PAUSED"}
                          </span>
                        </div>

                        {/* Sound Loops selection */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block text-left ml-2">Calming Ambient Tracks:</span>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { label: "Quiet", value: "none", emo: "🔕" },
                              { label: "Soft Rain", value: "rain", emo: "🌧️" },
                              { label: "Autumn Woods", value: "forest", emo: "🌲" },
                              { label: "Waves", value: "waves", emo: "🌊" }
                            ].map(track => (
                              <button
                                key={track.value}
                                onClick={() => setBreakSoundLoop(track.value as any)}
                                className={cn(
                                  "py-3 rounded-2xl font-black text-[11px] uppercase border transition-all flex flex-col items-center gap-1.5",
                                  breakSoundLoop === track.value ? "bg-purple-600 text-white border-purple-700 shadow-sm" : "bg-slate-50 border-slate-200/60 text-slate-700"
                                )}
                              >
                                <span>{track.emo}</span> {track.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setBreakTimerActive(!breakTimerActive)}
                            className="flex-1 bg-purple-600 text-white py-4 rounded-2xl font-black text-xs uppercase"
                          >
                            {breakTimerActive ? "Pause Break" : "Start Warm Timer"}
                          </button>
                          <button
                            onClick={() => {
                              setBreakTimerActive(false);
                              setBreakMinutes(3);
                              setBreakSeconds(0);
                            }}
                            className="bg-slate-100 text-slate-700 p-4 rounded-2xl hover:bg-slate-200 transition-colors"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Right: Visual helper info */}
                      <div className="md:col-span-5 bg-purple-950 text-white rounded-[40px] p-8 flex flex-col justify-between">
                        <div>
                          <Lightbulb className="w-12 h-12 text-purple-300 mb-6" />
                          <h3 className="text-2xl font-black tracking-tight leading-tight mb-4">Therapeutic Breaks</h3>
                          <p className="text-purple-100 text-sm leading-relaxed font-semibold">
                            Children with ADHD experience faster cognitive saturation. Proactive 3-minute breaks with brown noise elements or rain sound blocks resets executive stamina, preventing meltdowns or deep distraction cycles.
                          </p>
                        </div>
                        <div className="bg-black/20 p-5 rounded-3xl border border-purple-800 text-purple-300 text-xs font-semibold">
                          🌟 Relax Strategy: Close your eyes, take water sips, and stretch until the soft chime plays!
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Focus Tab 3: Deep Breathing Train */}
                  {activeFocusTab === 'breath' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Live lungs graphic & cycle trackers */}
                      <div className="md:col-span-7 bg-white card-pillowy p-8 flex flex-col justify-between text-center space-y-6">
                        <div>
                          <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase px-3.5 py-1 rounded-full">
                            3-Min Focus Breather
                          </span>
                          <h2 className="text-xl font-black text-on-surface mt-3">Reset Emotional Energy</h2>
                          <p className="text-xs text-on-surface-variant font-medium mt-1">Calm your body system. Sync your breath to the beautiful growing node.</p>
                        </div>

                        {/* Interactive breathing graphic */}
                        <div className="py-6 flex flex-col items-center justify-center relative min-h-[200px]">
                          <motion.div 
                            animate={{
                              scale: breathingStep === 'inhale' ? 1.6 : breathingStep === 'exhale' ? 0.9 : 1.25
                            }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                            className={cn(
                              "w-28 h-28 rounded-full flex flex-col items-center justify-center text-white font-black text-sm shadow-md transition-colors duration-1000",
                              breathingStep === 'idle' ? "bg-slate-300 text-slate-700" :
                              breathingStep === 'inhale' ? "bg-orange-500 shadow-orange-300/50" :
                              breathingStep === 'hold' ? "bg-sky-500 shadow-sky-300/50" : "bg-emerald-500 shadow-emerald-300/50"
                            )}
                          >
                            {breathingStep === 'idle' ? (
                              <Smile className="w-10 h-10" />
                            ) : (
                              <>
                                <span className="text-[10px] tracking-widest uppercase opacity-80 leading-none">{breathingStep}</span>
                                <span className="text-2xl mt-1 font-mono">{breathingSecondsLeft}s</span>
                              </>
                            )}
                          </motion.div>
                        </div>

                        {/* Cycles Tracker */}
                        <div className="bg-purple-50 p-4 rounded-2xl flex justify-between items-center text-left">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-black text-purple-800 uppercase tracking-widest block leading-none">Completed Cycles</span>
                            <span className="text-sm font-bold text-slate-800">Earn +15 Stars per cycle completed</span>
                          </div>
                          <span className="bg-purple-100 px-4 py-2 rounded-xl text-lg font-black text-purple-900 border border-purple-200">
                            {completedBreathingCycles}
                          </span>
                        </div>

                        {/* Action controllers */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setBreathingStep('inhale');
                              setBreathingSecondsLeft(4);
                            }}
                            className="flex-1 bg-purple-600 text-white py-4 rounded-2xl font-black text-xs uppercase"
                          >
                            Start Focus Breath
                          </button>
                          {breathingStep !== 'idle' && (
                            <button
                              onClick={() => {
                                setBreathingStep('idle');
                              }}
                              className="bg-slate-100 text-on-surface hover:bg-slate-200 px-6 rounded-2xl font-black text-xs uppercase"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Lungs tip companion */}
                      <div className="md:col-span-5 bg-purple-950 text-white rounded-[40px] p-8 flex flex-col justify-between">
                        <div>
                          <Trophy className="w-12 h-12 text-purple-300 mb-6" />
                          <h3 className="text-2xl font-black tracking-tight leading-tight mb-4">Focus Breath Power</h3>
                          <p className="text-purple-100 text-sm leading-relaxed font-semibold">
                            Deep diaphragmatic breathing activates the parasympathetic system. This triggers a signal that is transmitted to the brain, lowering anxiety and immediately centering visual-auditory attention buffers.
                          </p>
                        </div>
                        <div className="bg-black/20 p-5 rounded-3xl border border-purple-800 text-purple-300 text-xs font-semibold">
                          🌟 Expert Secret: Slow, long breaths help you complete complex quizzes with perfect focus stamps!
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </motion.div>
          )}

          {/* ==========================================
              FLOW STATE 2: ACTIVE PLAYING GAME (READ/WRITE DETAILED ACTIVITIES)
              ========================================== */}
          {flowState === 'activity-play' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left"
            >
              
              {/* Back to selection banner */}
              <button
                onClick={() => setFlowState('selection')}
                className="group flex items-center gap-2 text-on-surface-variant hover:text-primary font-black text-xs uppercase tracking-widest transition-colors mb-4"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                Return to Submodules selection
              </button>

              {/* DYNAMIC: PLAYING A READING COMPREHENSION ADVENTURE */}
              {moduleId === 1 && (
                <div className="space-y-8">
                  
                  {/* Progress Indicator */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 bg-white px-6 rounded-3xl border border-surface-variant/10 shadow-sm">
                    <div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                        {activeReadingSub.title} Path
                      </span>
                      <h4 className="text-lg font-black text-slate-800 mt-1">
                        Activity {activeReadingActIdx + 1} of 10: {activeReadingSub.activities[activeReadingActIdx].title}
                      </h4>
                    </div>

                    {/* Progress track dots */}
                    <div className="flex flex-wrap gap-2">
                      {activeReadingSub.activities.map((act, idx) => (
                        <button
                          key={act.id}
                          onClick={() => {
                            setActiveReadingActIdx(idx);
                            setSelectedReadingAnswer(null);
                            setHasScoredReadingAnswer(false);
                            setSavedNotes([]);
                          }}
                          className={cn(
                            "w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all",
                            activeReadingActIdx === idx ? "bg-primary text-white ring-4 ring-primary-container/20" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                          )}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Work grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Piece of Story and interaction */}
                    <div className="md:col-span-8 bg-white card-pillowy p-8 flex flex-col justify-between space-y-6">
                      
                      <div className="flex justify-between items-start gap-4 pb-4 border-b border-surface-variant/10">
                        <div className="flex gap-4 items-center">
                          <span className="text-5xl bg-blue-50 p-3.5 rounded-2xl animate-bounce shrink-0 block">
                            {activeReadingSub.activities[activeReadingActIdx].image}
                          </span>
                          <div>
                            <span className="text-[10px] font-black uppercase text-[#F97316] tracking-widest leading-none block mb-1">Interactive Storypiece</span>
                            <h3 className="text-xl font-black text-on-surface">
                              {activeReadingSub.activities[activeReadingActIdx].title}
                            </h3>
                          </div>
                        </div>

                        <button
                          onClick={() => handlePlayReadingSpeech(activeReadingSub.activities[activeReadingActIdx].text)}
                          className={cn(
                            "px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all border-b-4",
                            isReadingSpeechPlaying
                              ? "bg-purple-600 text-white border-purple-800 animate-pulse"
                              : "bg-surface-container hover:bg-surface-container-high border-surface-variant text-slate-700"
                          )}
                        >
                          <Volume2 className="w-4 h-4" />
                          {isReadingSpeechPlaying ? "Reading..." : "Read Aloud"}
                        </button>
                      </div>

                      {/* Text content layout */}
                      <p className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed p-6 bg-slate-50/50 rounded-3xl border border-surface-variant/5">
                        {activeReadingSub.activities[activeReadingActIdx].text}
                      </p>

                      {/* Questions choice block */}
                      <div className="pt-6 border-t border-surface-variant/20 space-y-4">
                        <h4 className="text-md font-black text-on-surface">
                          ❓ {activeReadingSub.activities[activeReadingActIdx].question}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeReadingSub.activities[activeReadingActIdx].options.map(opt => {
                            const isCorrect = opt === activeReadingSub.activities[activeReadingActIdx].correctAnswer;
                            const isSelected = selectedReadingAnswer === opt;
                            return (
                              <button
                                key={opt}
                                disabled={hasScoredReadingAnswer}
                                onClick={() => {
                                  setSelectedReadingAnswer(opt);
                                  if (isCorrect) {
                                    setHasScoredReadingAnswer(true);
                                    addRewardPoints(30);
                                  } else {
                                    addRewardPoints(5);
                                  }
                                }}
                                className={cn(
                                  "p-5 rounded-3xl font-black text-xs uppercase tracking-wide text-left border-2 transition-all hover:scale-[1.01] flex justify-between items-center",
                                  isSelected 
                                    ? (isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-red-50 border-red-400 text-red-800")
                                    : "bg-white border-surface-variant/10 hover:border-surface-variant/30 text-on-surface"
                                )}
                              >
                                <span>{opt}</span>
                                {isSelected && (isCorrect ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-red-500" />)}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Nav paths */}
                      <div className="flex justify-between items-center pt-8 border-t border-surface-variant/10">
                        <button
                          disabled={activeReadingActIdx === 0}
                          onClick={() => {
                            setActiveReadingActIdx(prev => Math.max(0, prev - 1));
                            setSelectedReadingAnswer(null);
                            setHasScoredReadingAnswer(false);
                          }}
                          className="px-6 py-3 bg-surface-container hover:bg-surface-container-high rounded-full font-black text-xs uppercase text-slate-800 disabled:opacity-40"
                        >
                          Previous
                        </button>

                        {activeReadingActIdx === 9 ? (
                          <button
                            disabled={selectedReadingAnswer !== activeReadingSub.activities[activeReadingActIdx].correctAnswer}
                            onClick={() => {
                              localStorage.setItem(`submodule_completed_${activeReadingSub.id}`, 'true');
                              addRewardPoints(100);
                              window.dispatchEvent(new Event('storage'));
                              setFlowState('selection');
                            }}
                            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-1.5 disabled:opacity-40"
                          >
                            <Trophy className="w-4 h-4 fill-current text-white" />
                            {language === 'id' ? "Selesai Misi! 🎉" : "Mission Completed! 🎉"}
                          </button>
                        ) : (
                          <button
                            disabled={selectedReadingAnswer !== activeReadingSub.activities[activeReadingActIdx].correctAnswer}
                            onClick={() => {
                              setActiveReadingActIdx(prev => Math.min(9, prev + 1));
                              setSelectedReadingAnswer(null);
                              setHasScoredReadingAnswer(false);
                            }}
                            className="px-8 py-3.5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest disabled:opacity-40"
                          >
                            Next Activity
                          </button>
                        )}
                      </div>

                    </div>

                    {/* Right: Playful Digital Sticky Notes */}
                    <div className="md:col-span-4 bg-[#FEF08A] rounded-[36px] p-6 shadow-ambient flex flex-col gap-4 relative">
                      <div className="flex items-center gap-2 text-[#CA8A04] mb-2">
                        <StickyNote className="w-6 h-6 fill-current" />
                        <h4 className="font-black text-sm uppercase tracking-wider">Digital Sticky Notes</h4>
                      </div>

                      <p className="text-[11px] font-semibold text-[#854D0E] leading-relaxed">
                        Hold or extract critical keywords. Jot them down on your yellow sticker board to win +15 Focus points!
                      </p>

                      <textarea
                        value={stickyNoteText}
                        onChange={e => setStickyNoteText(e.target.value)}
                        placeholder="e.g. Sparky, Wood, flower, colorful, bright..."
                        className="w-full h-32 bg-yellow-50/50 rounded-2xl p-4 border-2 border-dashed border-[#EAB308]/40 outline-none text-[#713F12] font-semibold text-sm placeholder:text-[#CA8A04]/40 resize-none focus:border-[#EAB308]"
                      />

                      <button 
                        onClick={handleSaveSticky}
                        className="w-full bg-[#EAB308] text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-[#CA8A04] active:scale-95 transition-transform"
                      >
                        Stick Note (+15 Stars)
                      </button>

                      <div className="pt-4 border-t border-[#EAB308]/20 space-y-2 text-left">
                        <span className="text-[10px] font-black text-[#854D0E] uppercase tracking-wider">Your Sticky Highlights:</span>
                        {savedNotes.length === 0 ? (
                          <p className="text-[11px] font-bold italic text-[#854D0E]/50 uppercase">No tags pinned yet.</p>
                        ) : (
                          <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
                            {savedNotes.map((note, idx) => (
                              <span key={idx} className="bg-white/80 text-[#854D0E] font-bold text-[10px] px-3 py-1 rounded-full border border-[#EAB308]/20">
                                📌 {note}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* DYNAMIC: PLAYING A WRITING STUDIO ADVENTURE */}
              {moduleId === 2 && (
                <div className="space-y-8 text-left">
                  
                  {/* Progress Indicator */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 bg-white px-6 rounded-3xl border border-surface-variant/10 shadow-sm">
                    <div>
                      <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">
                        {activeWritingSub.title} Path
                      </span>
                      <h4 className="text-lg font-black text-slate-800 mt-1">
                        Activity {activeWritingActIdx + 1} of 10: {activeWritingSub.activities[activeWritingActIdx].title}
                      </h4>
                    </div>

                    {/* Progress track dots */}
                    <div className="flex flex-wrap gap-2">
                      {activeWritingSub.activities.map((act, idx) => (
                        <button
                          key={act.id}
                          onClick={() => {
                            setActiveWritingActIdx(idx);
                            setSpokenTranscript("");
                            setSentenceWords([]);
                            setCustomEssayText(act.startingText || "");
                          }}
                          className={cn(
                            "w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all",
                            activeWritingActIdx === idx ? "bg-rose-500 text-white ring-4 ring-rose-300" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                          )}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Work grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Panel: Voice Avatar & Speech Trigger */}
                    <div className="md:col-span-5 bg-white card-pillowy p-6 flex flex-col justify-between space-y-6 text-left">
                      <div>
                        <h4 className="font-black text-xs uppercase tracking-wider text-rose-500 mb-4">Choose Voice Ally Character</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {(['dino', 'robot', 'fairy'] as const).map(ch => (
                            <button
                              key={ch}
                              onClick={() => setActiveVoiceCharacter(ch)}
                              className={cn(
                                "p-3 rounded-2xl font-black text-[10px] uppercase border transition-all flex flex-col items-center gap-2",
                                activeVoiceCharacter === ch 
                                  ? "bg-rose-100 text-rose-800 border-rose-400 shadow-sm font-bold" 
                                  : "bg-surface-container text-on-surface-variant border-surface-variant/20"
                              )}
                            >
                              <span className="text-3xl">
                                {ch === 'dino' ? "🦖" : ch === 'robot' ? "🤖" : "🧚"}
                              </span>
                              {ch}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mock Mic Input */}
                      <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-rose-100 text-center space-y-4">
                        <span className="text-[10px] font-black text-rose-800 uppercase tracking-widest block">Character Dictation Machine</span>
                        <button
                          disabled={isMockRecording}
                          onClick={handleStartMockRecord}
                          className={cn(
                            "mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer",
                            isMockRecording 
                              ? "bg-red-500 text-white animate-ping"
                              : "bg-rose-500 hover:bg-rose-600 text-white"
                          )}
                        >
                          <Mic className="w-8 h-8" />
                        </button>
                        <p className="text-[11px] font-bold text-on-surface-variant leading-relaxed uppercase">
                          {isMockRecording ? "I am capturing your creative voice..." : "Click to mock-dictate your custom thoughts."}
                        </p>
                      </div>

                      {/* Output speech box */}
                      <AnimatePresence>
                        {spokenTranscript && (
                          <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center"
                          >
                            <span className="text-[10px] font-black uppercase text-rose-800 tracking-wider">
                              Spoken Transcript:
                            </span>
                            <p className="text-sm italic font-bold text-[#E11D48] mt-1">
                              "{spokenTranscript}"
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Panel: Word Bubble Connect & Text Editor */}
                    <div className="md:col-span-7 bg-white card-pillowy p-8 flex flex-col justify-between space-y-6">
                      
                      <div className="space-y-4">
                        <header className="flex justify-between items-center pb-3 border-b border-surface-variant/10">
                          <div className="flex gap-4 items-center">
                            <span className="text-4xl bg-rose-50 p-2.5 rounded-2xl animate-bounce shrink-0 block">
                              {activeWritingSub.activities[activeWritingActIdx].image}
                            </span>
                            <div>
                              <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest leading-none block">Builder Tool</span>
                              <h3 className="text-lg font-black text-slate-800">
                                {activeWritingSub.activities[activeWritingActIdx].prompt}
                              </h3>
                            </div>
                          </div>
                        </header>

                        {/* Interactive Word bubble pool */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest block">Interactive word bubbles (Tap to import):</span>
                          
                          <div className="p-4 bg-slate-50 rounded-3xl border border-surface-variant/10 flex flex-wrap gap-2 items-center justify-center min-h-[100px]">
                            {activeWritingSub.activities[activeWritingActIdx].helperWords.map((word, wIdx) => {
                              const isAdded = sentenceWords.includes(word);
                              return (
                                <button
                                  key={wIdx}
                                  onClick={() => {
                                    if (isAdded) {
                                      setSentenceWords(prev => prev.filter(w => w !== word));
                                    } else {
                                      setSentenceWords(prev => [...prev, word]);
                                      setCustomEssayText(prev => prev ? prev + " " + word : word);
                                      addRewardPoints(5);
                                    }
                                  }}
                                  className={cn(
                                    "px-4 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm",
                                    isAdded
                                      ? "bg-rose-500 text-white border-rose-600 scale-95"
                                      : "bg-white hover:bg-rose-50 border-rose-100 text-rose-800 hover:scale-[1.03]"
                                  )}
                                >
                                  {word}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Text box Area */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest ml-1">Write your complete composition here:</label>
                          <textarea
                            value={customEssayText}
                            onChange={e => setCustomEssayText(e.target.value)}
                            placeholder="Develop or edit your story sentences..."
                            className="w-full h-36 bg-surface border-2 border-surface-variant/20 p-4 rounded-3xl focus:border-rose-400 outline-none text-on-surface font-semibold text-sm leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Complete quest & Action triggers */}
                      <div className="flex gap-4 pt-4 border-t-2 border-dashed border-neutral-100">
                        <button
                          onClick={() => {
                            addRewardPoints(45);
                            setShowSavedToast(true);
                          }}
                          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-b-4 border-rose-700 cursor-pointer active:translate-y-[1px] active:border-b-2"
                        >
                          Complete and Save Story (+45 Stars)
                        </button>
                        
                        <div className="flex gap-2">
                          <button
                            disabled={activeWritingActIdx === 0}
                            onClick={() => {
                              setActiveWritingActIdx(prev => Math.max(0, prev - 1));
                              setSpokenTranscript("");
                              setSentenceWords([]);
                              setCustomEssayText(activeWritingSub.activities[activeWritingActIdx - 1].startingText || "");
                            }}
                            className="px-4 bg-white border-2 border-b-4 border-surface-variant text-slate-800 rounded-2xl font-black text-xs uppercase cursor-pointer disabled:opacity-40"
                          >
                            Prev
                          </button>
                          {activeWritingActIdx === 9 ? (
                            <button
                              onClick={() => {
                                localStorage.setItem(`submodule_completed_${activeWritingSub.id}`, 'true');
                                addRewardPoints(120);
                                window.dispatchEvent(new Event('storage'));
                                setFlowState('selection');
                              }}
                              className="px-5 bg-emerald-500 text-white border-2 border-b-4 border-emerald-700 rounded-2xl font-black text-xs uppercase cursor-pointer flex items-center gap-1 animate-bounce"
                            >
                              <Trophy className="w-3.5 h-3.5 fill-current text-white" />
                              {language === 'id' ? "Selesai Misi! 🎉" : "Mission Completed! 🎉"}
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setActiveWritingActIdx(prev => Math.min(9, prev + 1));
                                setSpokenTranscript("");
                                setSentenceWords([]);
                                setCustomEssayText(activeWritingSub.activities[activeWritingActIdx + 1].startingText || "");
                              }}
                              className="px-4 bg-rose-500 text-white border-2 border-b-4 border-rose-700 rounded-2xl font-black text-xs uppercase cursor-pointer disabled:opacity-40"
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* DYNAMIC: PLAYING A MATHEMATICS QUEST ADVENTURE */}
              {moduleId === 3 && (() => {
                const currentMathSub = translateMathSubmodule(activeMathSub, language);
                return (
                  <div className="space-y-8">
                    
                    {/* Progress Indicator */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 bg-white px-6 rounded-3xl border border-surface-variant/10 shadow-sm">
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                          {currentMathSub.title} Path
                        </span>
                        <h4 className="text-lg font-black text-slate-800 mt-1">
                          Quest {activeMathActIdx + 1} of 10: {currentMathSub.activities[activeMathActIdx].title}
                        </h4>
                      </div>

                      {/* Progress track dots */}
                      <div className="flex flex-wrap gap-2">
                        {currentMathSub.activities.map((act, idx) => (
                          <button
                            key={act.id}
                            onClick={() => {
                              setActiveMathActIdx(idx);
                              setSelectedMathAnswer(null);
                              setHasScoredMathAnswer(false);
                            }}
                            className={cn(
                              "w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all",
                              activeMathActIdx === idx ? "bg-emerald-600 text-white ring-4 ring-emerald-100" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                            )}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Main Work Layout */}
                    <div className="max-w-3xl mx-auto w-full">
                      
                      {/* Problem Statement & Multiple Choices */}
                      <div className="bg-white card-pillowy p-8 flex flex-col justify-between space-y-6">
                        
                        <div className="flex justify-between items-start gap-4 pb-4 border-b border-surface-variant/10">
                          <div className="flex gap-4 items-center">
                            <span className="text-5xl bg-emerald-50 p-3.5 rounded-2xl animate-bounce shrink-0 block">
                              {currentMathSub.activities[activeMathActIdx].image || "🔢"}
                            </span>
                            <div>
                              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest leading-none block mb-1">Quest Challenge</span>
                              <h3 className="text-xl font-black text-on-surface">
                                {currentMathSub.activities[activeMathActIdx].title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Problem text */}
                        <p className="text-lg md:text-xl font-black text-slate-800 leading-relaxed p-6 bg-slate-50/50 rounded-3xl border border-surface-variant/5">
                          {currentMathSub.activities[activeMathActIdx].question}
                        </p>

                        {/* Display pattern or skip-counting path if present */}
                        {currentMathSub.activities[activeMathActIdx].pattern && (
                          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-center gap-3">
                            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider shrink-0">Pattern:</span>
                            <span className="font-mono text-base font-black text-emerald-900 bg-white px-4 py-1.5 rounded-xl shadow-sm border border-emerald-100">
                              {currentMathSub.activities[activeMathActIdx].pattern}
                            </span>
                          </div>
                        )}

                        {/* Solutions list */}
                        <div className="pt-4 space-y-4">
                          <h4 className="text-sm font-black text-on-surface uppercase tracking-wider text-left">
                            Choose the correct answer:
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {currentMathSub.activities[activeMathActIdx].options.map(opt => {
                              const isCorrect = opt === currentMathSub.activities[activeMathActIdx].correctAnswer;
                              const isSelected = selectedMathAnswer === opt;
                              return (
                                <button
                                  key={opt}
                                  disabled={hasScoredMathAnswer}
                                  onClick={() => {
                                    setSelectedMathAnswer(opt);
                                    if (isCorrect) {
                                      setHasScoredMathAnswer(true);
                                      addRewardPoints(30);
                                    } else {
                                      addRewardPoints(5);
                                    }
                                  }}
                                  className={cn(
                                    "p-5 rounded-3xl font-black text-base border-4 transition-all hover:scale-[1.01] flex flex-col items-center justify-center gap-2",
                                    isSelected 
                                      ? (isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-red-50 border-red-400 text-red-800")
                                      : "bg-white border-surface-variant/10 hover:border-surface-variant/30 text-on-surface"
                                  )}
                                >
                                  <span className="text-lg">{opt}</span>
                                  {isSelected && (isCorrect ? (
                                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">✓ Correct!</span>
                                  ) : (
                                    <span className="text-xs text-red-500 font-bold flex items-center gap-1">✗ Try again</span>
                                  ))}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Navigation controls */}
                        <div className="flex justify-between items-center pt-8 border-t border-surface-variant/10">
                          <button
                            disabled={activeMathActIdx === 0}
                            onClick={() => {
                              setActiveMathActIdx(prev => Math.max(0, prev - 1));
                              setSelectedMathAnswer(null);
                              setHasScoredMathAnswer(false);
                            }}
                            className="px-6 py-3 bg-surface-container hover:bg-surface-container-high rounded-full font-black text-xs uppercase text-slate-800 disabled:opacity-40"
                          >
                            Previous
                          </button>

                          {activeMathActIdx === 9 ? (
                            <button
                              disabled={selectedMathAnswer !== currentMathSub.activities[activeMathActIdx].correctAnswer}
                              onClick={() => {
                                localStorage.setItem(`submodule_completed_${currentMathSub.id}`, 'true');
                                addRewardPoints(80);
                                window.dispatchEvent(new Event('storage'));
                                setFlowState('selection');
                              }}
                              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-1.5 disabled:opacity-40"
                            >
                              <Trophy className="w-4 h-4 fill-current text-white" />
                              {language === 'id' ? "Selesai Misi! 🎉" : "Mission Completed! 🎉"}
                            </button>
                          ) : (
                            <button
                              disabled={selectedMathAnswer !== currentMathSub.activities[activeMathActIdx].correctAnswer}
                              onClick={() => {
                                setActiveMathActIdx(prev => Math.min(9, prev + 1));
                                setSelectedMathAnswer(null);
                                setHasScoredMathAnswer(false);
                              }}
                              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-black text-xs uppercase tracking-widest disabled:opacity-40 shadow-sm"
                            >
                              Next Quest
                            </button>
                          )}
                        </div>

                      </div>

                    </div>

                  </div>
                );
              })()}

              {/* DYNAMIC: PLAYING AN EXECUTIVE FUNCTION QUEST */}
              {moduleId === 4 && (() => {
                const currentExecSub = translateExecutiveSubmodule(activeExecSub, language);
                return (
                  <div className="space-y-8">
                    
                    {/* Progress Indicator */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 bg-white px-6 rounded-3xl border border-surface-variant/10 shadow-sm">
                      <div>
                        <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
                          {currentExecSub.title} Path
                        </span>
                        <h4 className="text-lg font-black text-slate-800 mt-1">
                          Quest {activeExecActIdx + 1} of 10: {currentExecSub.activities[activeExecActIdx].title}
                        </h4>
                      </div>

                      {/* Progress track dots */}
                      <div className="flex flex-wrap gap-2">
                        {currentExecSub.activities.map((act, idx) => (
                          <button
                            key={act.id}
                            onClick={() => {
                              setActiveExecActIdx(idx);
                              setSelectedExecAnswer(null);
                              setHasScoredExecAnswer(false);
                            }}
                            className={cn(
                              "w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all",
                              activeExecActIdx === idx ? "bg-purple-600 text-white ring-4 ring-purple-100" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                            )}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Main Work Layout */}
                    <div className="max-w-3xl mx-auto w-full">
                      
                      {/* Problem Statement & Multiple Choices */}
                      <div className="bg-white card-pillowy p-8 flex flex-col justify-between space-y-6">
                        
                        <div className="flex justify-between items-start gap-4 pb-4 border-b border-surface-variant/10">
                          <div className="flex gap-4 items-center">
                            <span className="text-5xl bg-purple-50 p-3.5 rounded-2xl animate-bounce shrink-0 block">
                              {currentExecSub.activities[activeExecActIdx].image || "🧠"}
                            </span>
                            <div>
                              <span className="text-[10px] font-black uppercase text-purple-600 tracking-widest leading-none block mb-1">
                                {language === 'id' ? "Fokus Challenge" : "Focus Challenge"}
                              </span>
                              <h3 className="text-xl font-black text-on-surface">
                                {currentExecSub.activities[activeExecActIdx].title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Problem text */}
                        <p className="text-lg md:text-xl font-black text-slate-800 leading-relaxed p-6 bg-slate-50/50 rounded-3xl border border-surface-variant/5">
                          {currentExecSub.activities[activeExecActIdx].question}
                        </p>

                        {/* Solutions list */}
                        <div className="pt-4 space-y-4">
                          <h4 className="text-sm font-black text-on-surface uppercase tracking-wider text-left">
                            {language === 'id' ? "Pilih tindakan konsentrasi terbaik:" : "Choose the best concentration action:"}
                          </h4>

                          <div className="grid grid-cols-1 gap-3">
                            {currentExecSub.activities[activeExecActIdx].options.map(opt => {
                              const isCorrect = opt === currentExecSub.activities[activeExecActIdx].correctAnswer;
                              const isSelected = selectedExecAnswer === opt;
                              return (
                                <button
                                  key={opt}
                                  disabled={hasScoredExecAnswer}
                                  onClick={() => {
                                    setSelectedExecAnswer(opt);
                                    if (isCorrect) {
                                      setHasScoredExecAnswer(true);
                                      addRewardPoints(30);
                                    } else {
                                      addRewardPoints(5);
                                    }
                                  }}
                                  className={cn(
                                    "p-5 rounded-3xl font-black text-sm border-2 transition-all hover:scale-[1.01] flex justify-between items-center text-left",
                                    isSelected 
                                      ? (isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-red-50 border-red-400 text-red-800")
                                      : "bg-white border-surface-variant/10 hover:border-surface-variant/30 text-on-surface"
                                  )}
                                >
                                  <span>{opt}</span>
                                  {isSelected && (isCorrect ? (
                                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 shrink-0 ml-2">
                                      {language === 'id' ? "✓ Benar!" : "✓ Correct!"}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-red-500 font-bold flex items-center gap-1 shrink-0 ml-2">
                                      {language === 'id' ? "✗ Coba lagi" : "✗ Try again"}
                                    </span>
                                  ))}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Navigation controls */}
                        <div className="flex justify-between items-center pt-8 border-t border-surface-variant/10">
                          <button
                            disabled={activeExecActIdx === 0}
                            onClick={() => {
                              setActiveExecActIdx(prev => Math.max(0, prev - 1));
                              setSelectedExecAnswer(null);
                              setHasScoredExecAnswer(false);
                            }}
                            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full font-black text-xs uppercase text-slate-800 disabled:opacity-40"
                          >
                            {language === 'id' ? "Sebelumnya" : "Previous"}
                          </button>

                          {activeExecActIdx === 9 ? (
                            <button
                              disabled={selectedExecAnswer !== currentExecSub.activities[activeExecActIdx].correctAnswer}
                              onClick={() => {
                                localStorage.setItem(`submodule_completed_${currentExecSub.id}`, 'true');
                                addRewardPoints(150);
                                window.dispatchEvent(new Event('storage'));
                                setFlowState('selection');
                              }}
                              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-1.5 disabled:opacity-40"
                            >
                              <Trophy className="w-4 h-4 fill-current text-white" />
                              {language === 'id' ? "Selesai Misi! 🎉" : "Mission Completed! 🎉"}
                            </button>
                          ) : (
                            <button
                              disabled={selectedExecAnswer !== currentExecSub.activities[activeExecActIdx].correctAnswer}
                              onClick={() => {
                                setActiveExecActIdx(prev => Math.min(9, prev + 1));
                                setSelectedExecAnswer(null);
                                setHasScoredExecAnswer(false);
                              }}
                              className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-black text-xs uppercase tracking-widest disabled:opacity-40 shadow-sm"
                            >
                              {language === 'id' ? "Misi Berikutnya" : "Next Mission"}
                            </button>
                          )}
                        </div>

                      </div>

                    </div>

                  </div>
                );
              })()}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Beautiful Animated Toast Notification */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#10B981] border-2 border-b-6 border-[#047857] text-white font-black text-xs uppercase tracking-wider px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 z-50 min-w-[280px] justify-center"
          >
            <Check className="w-5 h-5" />
            Story Completed & Saved! (+45 Stars)
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
