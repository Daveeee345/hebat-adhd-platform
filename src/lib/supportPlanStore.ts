/** @deprecated Legacy localStorage prototype store. HEBAT 2.0 runtime uses HebatDataContext + server API. */
import { useState, useEffect } from 'react';

export interface SupportGoal {
  id: string;
  category: 'focus' | 'behavior' | 'social' | 'academic' | 'sensory' | 'routine';
  title: string;
  titleId: string;
  targetMetric: string;
  targetMetricId: string;
  progressPercent: number;
  status: 'in_progress' | 'achieved' | 'needs_attention';
  homeStrategy: string;
  homeStrategyId: string;
  schoolStrategy: string;
  schoolStrategyId: string;
}

export interface Accommodation {
  id: string;
  category: 'classroom' | 'testing' | 'sensory' | 'routine';
  title: string;
  titleId: string;
  description: string;
  descriptionId: string;
  active: boolean;
  implementedBy: 'teacher' | 'parent' | 'both';
}

export interface HomeSchoolNote {
  id: string;
  date: string;
  authorRole: 'parent' | 'teacher' | 'professional';
  authorName: string;
  note: string;
  moodTag: 'focused' | 'energetic' | 'frustrated' | 'calm' | 'needs_break';
  behaviorBadges: string[];
  acknowledged: boolean;
}

export interface ACTeRSRating {
  id: string;
  date: string;
  evaluator: string;
  inattentionScore: number; // 0 - 30
  hyperactivityScore: number; // 0 - 25
  socialSkillsScore: number; // 0 - 35
  oppositionalScore: number; // 0 - 30
  summaryNote: string;
}

export interface ClinicalRecommendation {
  id: string;
  date: string;
  professionalName: string;
  professionalTitle: string;
  recommendation: string;
  recommendationId: string;
  focusArea: 'executive_function' | 'emotional_regulation' | 'sensory_diet' | 'classroom_pacing';
  status: 'active' | 'under_review' | 'implemented';
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  school: string;
  avatar: string;
  strengths: string[];
  strengthsId: string[];
  primaryChallenges: string[];
  primaryChallengesId: string[];
  screeningScore: number; // Non-diagnostic percentage
  screeningCompleted: boolean;
  screeningDate?: string;
  supportPlan: {
    id: string;
    version: string;
    lastUpdated: string;
    updatedBy: string;
    goals: SupportGoal[];
    accommodations: Accommodation[];
    clinicalRecommendations: ClinicalRecommendation[];
    homeRoutinesSummary: string;
    homeRoutinesSummaryId: string;
    positiveReinforcements: string[];
    positiveReinforcementsId: string[];
  };
  actrsHistory: ACTeRSRating[];
  dailyNotes: HomeSchoolNote[];
}

const DEFAULT_CHILDREN: ChildProfile[] = [
  {
    id: 'leo-1',
    name: 'Leo Pratama',
    age: 8,
    grade: 'Grade 3 (Kelas 3)',
    school: 'SD Nusantara Bangsa',
    avatar: '🦁',
    strengths: [
      'High visual-spatial creativity and pattern recognition',
      'Enthusiastic and empathetic peer interactions',
      'Exceptional building and spatial Lego skills'
    ],
    strengthsId: [
      'Kreativitas visual-spasial tinggi dan mengenali pola',
      'Interaksi teman sebaya yang antusias dan berempati',
      'Keahlian merakit Lego dan pemikiran spasial yang luar biasa'
    ],
    primaryChallenges: [
      'Difficulty sustaining focus during unbroken >15min lectures',
      'Impulsive blurt-outs during class question rounds',
      'Sensory restlessness during seated seatwork'
    ],
    primaryChallengesId: [
      'Kesulitan mempertahankan fokus selama ceramah >15 menit tanpa jeda',
      'Respons impulsif/menjawab sebelum ditunjuk saat sesi tanya jawab',
      'Keresahan motorik/sensorik saat duduk diam mengerjakan tugas'
    ],
    screeningScore: 75,
    screeningCompleted: true,
    screeningDate: '2025-02-10',
    supportPlan: {
      id: 'csp-leo-2025',
      version: '2.1',
      lastUpdated: 'Today at 09:30 AM',
      updatedBy: 'Dr. Sarah Jenkins (Psychologist) & Ibu Ratna (Teacher)',
      goals: [
        {
          id: 'goal-1',
          category: 'focus',
          title: 'Sustained 15-Minute Focus Block in Math',
          titleId: 'Fokus Berkelanjutan 15 Menit pada Sesi Matematika',
          targetMetric: '3 out of 4 daily math tasks completed without redirection',
          targetMetricId: '3 dari 4 tugas matematika harian selesai tanpa perlu diingatkan berulang',
          progressPercent: 70,
          status: 'in_progress',
          homeStrategy: 'Use visual tactile timer with 3-minute stretch breaks between modules',
          homeStrategyId: 'Gunakan pengatur waktu visual taktil dengan jeda peregangan 3 menit antar modul',
          schoolStrategy: 'Provide chunked math worksheets (3 problems per card instead of 10-page sheet)',
          schoolStrategyId: 'Berikan lembar kerja matematika bertahap (3 soal per kartu alih-alih 1 lembar panjang)'
        },
        {
          id: 'goal-2',
          category: 'behavior',
          title: 'Hand-Raising Self-Regulation before Speaking',
          titleId: 'Regulasi Diri Mengangkat Tangan Sebelum Berbicara',
          targetMetric: 'Raise hand & wait for teacher cue 4 out of 5 group discussions',
          targetMetricId: 'Angkat tangan & tunggu giliran guru 4 dari 5 diskusi kelompok',
          progressPercent: 85,
          status: 'achieved',
          homeStrategy: 'Praise waiting turns in dinner conversation using descriptive tokens',
          homeStrategyId: 'Puji saat menunggu giliran bicara di meja makan dengan token deskriptif',
          schoolStrategy: 'Place visual "Pause & Raise Hand" card on front desk corner',
          schoolStrategyId: 'Pasang kartu visual "Jeda & Angkat Tangan" di sudut meja depan'
        },
        {
          id: 'goal-3',
          category: 'sensory',
          title: 'Adaptive Sensory Discharge during Transitions',
          titleId: 'Pelepasan Energi Sensorik Adaptif saat Transisi Pelajaran',
          targetMetric: 'Use sensory fidget band or take 2-min walking errand without classroom disruption',
          targetMetricId: 'Gunakan sensory band atau tugas jalan kaki 2 menit tanpa mengganggu kelas',
          progressPercent: 60,
          status: 'in_progress',
          homeStrategy: '10-minute active play session right after school arrival before homework',
          homeStrategyId: 'Sesi bermain aktif 10 menit sesampainya di rumah sebelum mulai PR',
          schoolStrategy: 'Assign helper role to distribute books between periods to channel movement',
          schoolStrategyId: 'Beri peran membantu membagikan buku antar sesi untuk menyalurkan energi gerak'
        }
      ],
      accommodations: [
        {
          id: 'acc-1',
          category: 'classroom',
          title: 'Preferential Front-Row Seating',
          titleId: 'Tempat Duduk Baris Depan Strategis',
          description: 'Seat Leo in front center away from high-traffic doorways and window glare',
          descriptionId: 'Dudukkan Leo di baris depan tengah, jauh dari pintu lalu lalang dan silau jendela',
          active: true,
          implementedBy: 'teacher'
        },
        {
          id: 'acc-2',
          category: 'testing',
          title: 'Extended Time (1.5x) with Visual Timers',
          titleId: 'Waktu Tambahan (1.5x) dengan Pengatur Waktu Visual',
          description: 'Provide extra 10-15 minutes for written tests with silent visual countdown bar',
          descriptionId: 'Berikan waktu tambahan 10-15 menit untuk ujian tulis dengan bar visual tanpa dering',
          active: true,
          implementedBy: 'teacher'
        },
        {
          id: 'acc-3',
          category: 'sensory',
          title: 'Tactile Fidget & Movement Token Allowed',
          titleId: 'Izin Menggunakan Alat Sensorik Fidget & Kartu Gerak',
          description: 'Permit silent silicone fidget ring and 1 "Water/Stretch Pass" per period',
          descriptionId: 'Izinkan cincin fidget silikon senyap dan 1 kartu "Izin Minum/Peregangan" per sesi',
          active: true,
          implementedBy: 'both'
        },
        {
          id: 'acc-4',
          category: 'routine',
          title: 'Daily PMT 10-Minute Parent-Child Play Protocol',
          titleId: 'Protokol Bermain Bersama Orang Tua-Anak PMT 10 Menit',
          description: 'Daily child-led play with descriptive praise and zero critical commands',
          descriptionId: 'Bermain harian yang dipimpin anak dengan pujian deskriptif tanpa instruksi mengkritik',
          active: true,
          implementedBy: 'parent'
        }
      ],
      clinicalRecommendations: [
        {
          id: 'rec-1',
          date: '2025-02-12',
          professionalName: 'Dr. Sarah Jenkins, MD',
          professionalTitle: 'Pediatric Psychiatrist & ADHD Specialist',
          recommendation: 'Incorporate positive behavioral momentum: start study sessions with 2 easy mastery questions before difficult novel problems.',
          recommendationId: 'Terapkan momentum perilaku positif: mulai sesi belajar dengan 2 soal mudah yang dikuasai sebelum soal baru yang menantang.',
          focusArea: 'executive_function',
          status: 'implemented'
        },
        {
          id: 'rec-2',
          date: '2025-02-14',
          professionalName: 'Dr. Marcus Chen, PhD',
          professionalTitle: 'Clinical Child Psychologist',
          recommendation: 'Maintain home-school daily note synchronization to ensure consistency in reinforcement tokens.',
          recommendationId: 'Pertahankan sinkronisasi catatan harian rumah-sekolah agar pemberian token penguatan tetap konsisten.',
          focusArea: 'classroom_pacing',
          status: 'active'
        }
      ],
      homeRoutinesSummary: 'Morning 7:00 AM visual schedule -> School 8:00 AM -> 10-min post-school PMT Play -> 15-min chunked homework with Bloom Points -> 8:30 PM wind-down.',
      homeRoutinesSummaryId: 'Rutinitas Pagi 07.00 WIB jadwal visual -> Sekolah 08.00 WIB -> Bermain PMT 10 menit pasca sekolah -> PR bertahap 15 menit dengan Bloom Point -> Istirahat 20.30 WIB.',
      positiveReinforcements: [
        'Bloom Points for completed 15-min focus sessions',
        'Friday choice: Favorite park visit or special building kit time',
        'Immediate verbal descriptive praise ("I noticed how you persisted!")'
      ],
      positiveReinforcementsId: [
        'Bloom Point untuk setiap sesi fokus 15 menit yang selesai',
        'Pilihan akhir pekan: Kunjungan taman favorit atau waktu merakit khusus',
        'Pujian deskriptif langsung ("Ayah/Ibu melihat bagaimana kamu terus mencoba!")'
      ]
    },
    actrsHistory: [
      {
        id: 'actrs-1',
        date: '2025-02-14',
        evaluator: 'Ibu Ratna (Class Teacher)',
        inattentionScore: 16,
        hyperactivityScore: 14,
        socialSkillsScore: 28,
        oppositionalScore: 6,
        summaryNote: 'Leo showed improved task completion during morning reading block. Needed 1 movement break before math.'
      },
      {
        id: 'actrs-2',
        date: '2025-01-20',
        evaluator: 'Ibu Ratna (Class Teacher)',
        inattentionScore: 22,
        hyperactivityScore: 19,
        socialSkillsScore: 24,
        oppositionalScore: 9,
        summaryNote: 'Baseline assessment prior to Support Plan accommodations implementation.'
      }
    ],
    dailyNotes: [
      {
        id: 'note-1',
        date: 'Today, 02:15 PM',
        authorRole: 'teacher',
        authorName: 'Ibu Ratna (Teacher)',
        note: 'Leo did fantastic with the visual math cards today! He raised his hand 3 times and stayed engaged throughout science group work.',
        moodTag: 'focused',
        behaviorBadges: ['✨ Great Hand Raising', '🎯 Visual Math Completed', '🤝 Helpful Teammate'],
        acknowledged: true
      },
      {
        id: 'note-2',
        date: 'Today, 07:45 AM',
        authorRole: 'parent',
        authorName: 'Bunda Sarah (Parent)',
        note: 'Leo had a peaceful morning routine and completed his 10-minute breakfast without rushing. He brought his silicone fidget ring in his bag.',
        moodTag: 'calm',
        behaviorBadges: ['☀️ Smooth Morning', '🎒 Bag Packed Independently'],
        acknowledged: true
      },
      {
        id: 'note-3',
        date: 'Yesterday, 03:00 PM',
        authorRole: 'teacher',
        authorName: 'Ibu Ratna (Teacher)',
        note: 'High energy during afternoon recess transition. We used the 2-minute helper errand and he settled down smoothly for drawing time.',
        moodTag: 'energetic',
        behaviorBadges: ['⚡ High Energy Channeled', '🎨 Creative Art'],
        acknowledged: true
      }
    ]
  },
  {
    id: 'maya-2',
    name: 'Maya Dewi',
    age: 6,
    grade: 'Grade 1 (Kelas 1)',
    school: 'SD Cendekia Harapan',
    avatar: '🦊',
    strengths: [
      'Exceptional verbal storytelling and imagination',
      'Deep curiosity and eagerness to explore nature'
    ],
    strengthsId: [
      'Imajinasi dan kemampuan bercerita verbal yang luar biasa',
      'Rasa ingin tahu mendalam dan gemar menjelajah alam'
    ],
    primaryChallenges: [
      'Sensory distraction from background noises',
      'Difficulty transitioning between free play and structured tasks'
    ],
    primaryChallengesId: [
      'Distraksi sensorik dari suara bising di latar belakang',
      'Kesulitan transisi antara bermain bebas ke tugas terstruktur'
    ],
    screeningScore: 50,
    screeningCompleted: true,
    screeningDate: '2025-02-05',
    supportPlan: {
      id: 'csp-maya-2025',
      version: '1.0',
      lastUpdated: 'Yesterday at 04:00 PM',
      updatedBy: 'Ibu Wati (Counselor)',
      goals: [
        {
          id: 'maya-g1',
          category: 'routine',
          title: 'Smooth 3-Minute Activity Transition',
          titleId: 'Transisi Aktivitas 3 Menit yang Mulus',
          targetMetric: 'Clean up toys upon audio chime without emotional resistance',
          targetMetricId: 'Merapikan mainan setelah mendengar nada lonceng tanpa penolakan emosional',
          progressPercent: 75,
          status: 'in_progress',
          homeStrategy: 'Use 2-minute song warning before switching activities',
          homeStrategyId: 'Gunakan lagu peringatan 2 menit sebelum berganti aktivitas',
          schoolStrategy: 'Give 3-minute visual hourglass cue before line-up',
          schoolStrategyId: 'Beri isyarat jam pasir 3 menit sebelum baris-berbaris'
        }
      ],
      accommodations: [
        {
          id: 'maya-acc-1',
          category: 'sensory',
          title: 'Noise-Dampening Earbuds for Reading Corner',
          titleId: 'Earbud Peredam Bising untuk Sudut Membaca',
          description: 'Provide soft sound-dampening earmuffs during independent reading',
          descriptionId: 'Sediakan pelindung telinga peredam bising saat sesi membaca mandiri',
          active: true,
          implementedBy: 'both'
        }
      ],
      clinicalRecommendations: [],
      homeRoutinesSummary: 'Song-based morning routine -> Short structured play intervals.',
      homeRoutinesSummaryId: 'Rutinitas pagi berbasis lagu -> Interval bermain terstruktur singkat.',
      positiveReinforcements: ['Star stamps on Maya’s animal chart'],
      positiveReinforcementsId: ['Stempel bintang di grafik binatang Maya']
    },
    actrsHistory: [],
    dailyNotes: []
  }
];

const STORAGE_KEY = 'hebat_children_data';
const SELECTED_CHILD_KEY = 'hebat_selected_child_id';

export function getStoredChildren(): ChildProfile[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse stored children:', e);
  }
  return DEFAULT_CHILDREN;
}

export function saveChildren(children: ChildProfile[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(children));
    window.dispatchEvent(new CustomEvent('hebat_store_updated'));
  } catch (e) {
    console.error('Failed to save children:', e);
  }
}

export function useSupportPlanStore() {
  const [children, setChildren] = useState<ChildProfile[]>(() => getStoredChildren());
  const [selectedChildId, setSelectedChildIdState] = useState<string>(() => {
    return localStorage.getItem(SELECTED_CHILD_KEY) || 'leo-1';
  });

  useEffect(() => {
    const handleUpdate = () => {
      setChildren(getStoredChildren());
    };
    window.addEventListener('hebat_store_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('hebat_store_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const setSelectedChildId = (id: string) => {
    setSelectedChildIdState(id);
    localStorage.setItem(SELECTED_CHILD_KEY, id);
  };

  const selectedChild = children.find(c => c.id === selectedChildId) || children[0] || DEFAULT_CHILDREN[0];

  // Helper updates
  const addDailyNote = (note: Omit<HomeSchoolNote, 'id' | 'date' | 'acknowledged'>) => {
    const newNote: HomeSchoolNote = {
      ...note,
      id: 'note-' + Date.now(),
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      acknowledged: false
    };

    const updated = children.map(c => {
      if (c.id === selectedChildId) {
        return {
          ...c,
          dailyNotes: [newNote, ...c.dailyNotes]
        };
      }
      return c;
    });

    setChildren(updated);
    saveChildren(updated);
  };

  const toggleAccommodation = (accId: string) => {
    const updated = children.map(c => {
      if (c.id === selectedChildId) {
        return {
          ...c,
          supportPlan: {
            ...c.supportPlan,
            lastUpdated: 'Just now',
            accommodations: c.supportPlan.accommodations.map(a => 
              a.id === accId ? { ...a, active: !a.active } : a
            )
          }
        };
      }
      return c;
    });
    setChildren(updated);
    saveChildren(updated);
  };

  const updateGoalProgress = (goalId: string, progress: number, status?: SupportGoal['status']) => {
    const updated = children.map(c => {
      if (c.id === selectedChildId) {
        return {
          ...c,
          supportPlan: {
            ...c.supportPlan,
            lastUpdated: 'Just now',
            goals: c.supportPlan.goals.map(g => {
              if (g.id === goalId) {
                const newStatus = status || (progress >= 100 ? 'achieved' : progress < 40 ? 'needs_attention' : 'in_progress');
                return { ...g, progressPercent: progress, status: newStatus };
              }
              return g;
            })
          }
        };
      }
      return c;
    });
    setChildren(updated);
    saveChildren(updated);
  };

  const addClinicalRecommendation = (rec: Omit<ClinicalRecommendation, 'id' | 'date'>) => {
    const newRec: ClinicalRecommendation = {
      ...rec,
      id: 'rec-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    const updated = children.map(c => {
      if (c.id === selectedChildId) {
        return {
          ...c,
          supportPlan: {
            ...c.supportPlan,
            lastUpdated: 'Just now by ' + rec.professionalName,
            clinicalRecommendations: [newRec, ...c.supportPlan.clinicalRecommendations]
          }
        };
      }
      return c;
    });
    setChildren(updated);
    saveChildren(updated);
  };

  const addACTeRSRating = (rating: Omit<ACTeRSRating, 'id' | 'date'>) => {
    const newRating: ACTeRSRating = {
      ...rating,
      id: 'actrs-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    const updated = children.map(c => {
      if (c.id === selectedChildId) {
        return {
          ...c,
          actrsHistory: [newRating, ...c.actrsHistory]
        };
      }
      return c;
    });
    setChildren(updated);
    saveChildren(updated);
  };

  const updateScreeningScore = (score: number) => {
    const updated = children.map(c => {
      if (c.id === selectedChildId) {
        return {
          ...c,
          screeningScore: score,
          screeningCompleted: true,
          screeningDate: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    setChildren(updated);
    saveChildren(updated);
  };

  return {
    children,
    selectedChild,
    selectedChildId,
    setSelectedChildId,
    addDailyNote,
    toggleAccommodation,
    updateGoalProgress,
    addClinicalRecommendation,
    addACTeRSRating,
    updateScreeningScore
  };
}
