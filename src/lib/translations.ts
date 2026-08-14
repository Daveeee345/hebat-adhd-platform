export type Language = 'en' | 'id';

export const translations = {
  en: {
    // Language Selection Screen
    langSelectTitle: "Choose Your Language",
    langSelectSub: "Select your preferred language to start your HEBAT journey",
    langSelectBtn: "Continue",

    // Common / Global
    nextStep: "Next Step",
    getStarted: "Get Started",
    goBack: "Go Back",
    continueJourney: "Continue Journey",
    completeQuest: "Complete Quest",
    skip: "Skip",
    beginJourney: "Begin Journey",
    cancel: "Cancel",
    save: "Save",
    finish: "Finish",
    points: "Points",
    xp: "XP",

    // Onboarding Screen
    onboarding: [
      {
        title: "Understand Your Child’s Learning Needs",
        description: "HEBAT helps identify attention and learning challenges early."
      },
      {
        title: "Learn Through Fun Activities",
        description: "Unlock your potential with gamified modules designed to build focus and reward your daily progress.",
        stats: [
          { label: "Focus Games", sub: "Train your attention" },
          { label: "Reward Badges", sub: "Celebrate wins" }
        ]
      },
      {
        title: "Support from Home and School",
        description: "Connect your child's progress across environments. Share insights and celebrate wins together on a unified dashboard."
      }
    ],

    // Role Selection Screen
    roleSelectTitle: "Who are you?",
    roleSelectSub: "CHOOSE YOUR ROLE TO PERSONALISE THE EXPERIENCE",
    roles: {
      child: {
        title: "I am a Student",
        description: "I want to build focus and earn cool rewards!"
      },
      parent: {
        title: "I am a Parent",
        description: "I want to support my child and see their progress."
      },
      teacher: {
        title: "I am a Teacher",
        description: "I want to manage my classroom and help students thrive."
      },
      professional: {
        title: "I am a Specialist / Professional",
        description: "I provide clinical observation, advice, and support plan adjustments."
      }
    },

    // Profile Setup Screen
    profileSetupTitle: "Tell us about yourself!",
    profileSetupSub: "Let's set up your profile to customize your experience.",
    profileSetupSteps: {
      basics: "Basics",
      profile: "Profile",
      identify: "Identify",
      detail: "Detail"
    },
    profileSetupFields: {
      nameLabel: "Your Name",
      namePlaceholder: "Enter your name...",
      ageLabel: "Your Age",
      agePlaceholder: "Select age",
      gradeLabel: "Your Grade / Class",
      gradePlaceholder: "Select grade",
      specialtyLabel: "Specialization / Expertise",
      specialtyPlaceholder: "e.g., Special Education, Pediatric Psychology",
      schoolLabel: "School Name",
      schoolPlaceholder: "Enter school name...",
      attentionLabel: "Attention Level",
      attentionSub: "Select how long you can easily focus"
    },
    attentionSpans: [
      { l: "Quick Focus", s: "5-10 Minutes" },
      { l: "Steady Focus", s: "10-20 Minutes" },
      { l: "Hyper Focus", s: "20-30+ Minutes" }
    ],
    chooseAllyTitle: "Choose Your Ally!",
    chooseAllySub: "Pick an animal companion that will accompany you on this quest.",

    // Dashboard - Shared
    nav: {
      dashboard: "Dashboard",
      supportPlan: "Support Plan",
      focus: "Focus Timer",
      routine: "Routines",
      learn: "Learn",
      pmt: "PMT Modules",
      rewards: "Rewards",
      screening: "ADHD Screening",
      consultation: "Consultation",
      professional: "Clinical Portal",
      profile: "Profile"
    },

    // Child Dashboard
    childDashTitle: "My Space Journey",
    childDashSub: "Accompanied by your brave ally!",
    childDashStreak: "Daily Streak",
    childDashReady: "Ready for today's focus mission?",
    childDashActiveQuest: "Active Focus Quests",
    childDashCompleted: "Completed",
    childDashProgress: "Progress",
    quests: {
      spaceQuest: {
        title: "Astronaut Focus Adventure",
        sub: "Space exploration training",
        desc: "Strengthen focus and impulse control through space simulator challenges.",
        action: "Launch Ship"
      },
      mathQuest: {
        title: "ADHD Visual Math Quest",
        sub: "Spatial & multi-sensory Math",
        desc: "Solve logic, patterns, and visual fractions using tactile color triggers.",
        action: "Enter Cave"
      },
      routineQuest: {
        title: "Self-Regulation Mission",
        sub: "Daily habit loop builder",
        desc: "Form core focusing habits and train task prioritization with active feedback.",
        action: "Build Power"
      }
    },
    completedQuestsText: "You have completed all active missions for today! Great job! 🚀",

    // Parent Dashboard
    parentDashTitle: "Parent Insights",
    parentDashSub: "Track development, set routines, and manage training",
    parentDashProgressTitle: "Attention Progress Track",
    parentDashQuickStats: "Quick Indicators",
    parentDashRoutineActive: "Active Routine Loops",
    parentDashAddRoutine: "Configure New Routine",
    parentDashActiveCheck: "Active",
    parentDashCompletedCheck: "Completed Today",
    parentDashScreeningStatus: "ADHD Screening Status",
    parentDashScreeningAction: "Take Screening Test",
    parentDashScreeningResult: "View Screening Results",
    parentDashScreeningPending: "Not Taken Yet",
    parentDashScreeningHigh: "High Indicators (Recommended Support)",
    parentDashScreeningMild: "Mild Indicators (Periodic Tracking)",
    parentDashScreeningLow: "Low/No ADHD Indicators",
    parentDashConsultationTitle: "Expert Consultation",
    parentDashConsultationAction: "Book Consultation",
    parentDashLearnTitle: "Behavior Management Modules",
    parentDashLearnAction: "Start Learning",

    // Teacher Dashboard
    teacherDashTitle: "Teacher Classroom Center",
    teacherDashSub: "Observe and support focus progress across students",
    teacherDashClassroomStats: "Classroom Status Summary",
    teacherDashStudentList: "Student Focus Profiles",
    teacherDashSearchPlaceholder: "Search students by name...",
    teacherDashAttentionLevel: "Focus Index",
    teacherDashObservationAlert: "Pending Screening Review",
    teacherDashObservationDone: "Reviewed",
    teacherDashObservationRecommended: "Action Plan Configured",
    teacherDashConsultation: "Refer to Professional",

    // Routine Builder
    routineTitle: "Daily Focus Routines",
    routineSub: "Establish calming morning and evening habits to reduce sensory overwhelm",
    routineCreateTitle: "Create Active Habit Loop",
    routineName: "Routine Name",
    routinePlaceholder: "e.g., Morning Calming Ritual",
    routineTime: "Trigger Time",
    routineType: "Routine Category",
    routineTypes: {
      morning: "Morning Transition",
      evening: "Evening Wind-down",
      study: "Study Intermission",
      custom: "Custom Routine"
    },
    routineSteps: "Interactive Steps",
    routineAddStep: "Add Custom Step",
    routineStepPlaceholder: "e.g., Deep belly breathing for 1 minute",
    routineSuccess: "Routine created successfully!",
    routineActiveHeader: "Your Calming Loops",

    // Screening Test
    screeningTitle: "Clinical ADHD Screening",
    screeningSub: "Evidence-based Vanderbilt assessment scale proxy for parent and teacher reporting",
    screeningIntroHeader: "Understand ADHD Tendencies",
    screeningIntroP1: "This screening is an interactive tool adapted from professional clinical guidelines to identify focus, hyperactivity, and executive function indicators.",
    screeningIntroP2: "It takes about 3-5 minutes and results in actionable insight reports that can be directly shared with pediatricians or school counselors.",
    screeningStartBtn: "Begin Assessment",
    screeningQuestionLabel: "Question",
    screeningNever: "Never",
    screeningSometimes: "Sometimes",
    screeningOften: "Often",
    screeningVeryOften: "Very Often",
    screeningResultsTitle: "Screening Assessment Report",
    screeningSeverityHigh: "High ADHD Tendencies Present",
    screeningSeverityMild: "Mild/Moderate Focal Challenges",
    screeningSeverityLow: "Standard Focus Indicators",
    screeningResultsDescHigh: "The report indicates frequent symptoms of inattention and/or hyperactivity that match standard pediatric screening baselines. We strongly advise sharing these results with an ADHD professional.",
    screeningResultsDescMild: "The report shows occasional focus hurdles. Gamified self-regulation structures and organized routines are highly recommended.",
    screeningResultsDescLow: "Focal indicators are within standard expectations. Keep utilizing routine pacing for baseline cognitive wellness.",
    screeningBackBtn: "Back to Insights",

    // PMT Modules (Parent Management Training)
    pmtTitle: "Parent Management Training",
    pmtSub: "Clinically-proven strategies to manage impulse patterns and promote cooperation",
    pmtLockMessage: "Unlock advanced strategies by completing basic parent training!",
    pmtStartAction: "Launch Module",
    pmtCompleted: "Completed 🎉",

    // Focus Timer
    focusTitle: "Hyperfocus Station",
    focusSub: "Calm visual anchors designed to support ADHD minds through focused work sprints",
    focusStart: "Start Focus",
    focusPause: "Pause Sprint",
    focusReset: "Reset Pacing",
    focusSettings: "Timer Settings",
    focusWorkDuration: "Work Sprint (Min)",
    focusBreakDuration: "Break Time (Min)",
    focusVisualTheme: "Visual Environment Theme",
    focusThemes: {
      ocean: "Deep Ocean Flow 🌊",
      space: "Cosmic Nebula 🌌",
      forest: "Zen Forest Rain 🌲"
    },

    // Mood Check
    moodTitle: "How are we feeling right now?",
    moodSub: "Log your sensory state to unlock matching calming pacing sessions!",
    moodSave: "Log Mood & Unlock Pacing",
    moodSavedSuccess: "Mood logged! Here is your custom focus calibration recommendation.",

    // Learn Modules
    learnTitle: "Interactive Focus Missions",
    learnSub: "Gamified learning designed for neurodivergent minds to train attention span",
    learnStartMission: "Enter Mission",
    learnMissionComplete: "Completed!",

    // Consultation
    consultTitle: "Connect with Pediatric ADHD Experts",
    consultSub: "Direct telemedicine booking and messaging with licensed specialists and psychologists",
    consultBookBtn: "Schedule Live Session",
    consultActiveChat: "Direct Support Chat",
    consultPlaceholder: "Type your message to our clinical support team...",

    // Rewards Page
    rewardsTitle: "My Space Trophy Room",
    rewardsSub: "Celebrate milestones achieved through constant dedication!",
    rewardsHeader: "My Earned Badges",
    rewardsPointsTitle: "Available Focus Tokens",
    rewardsMilestones: "Milestones Log"
  },
  id: {
    // Language Selection Screen
    langSelectTitle: "Pilih Bahasa Anda",
    langSelectSub: "Pilih bahasa pilihan Anda untuk memulai perjalanan HEBAT Anda",
    langSelectBtn: "Lanjutkan",

    // Common / Global
    nextStep: "Langkah Berikutnya",
    getStarted: "Mulai Sekarang",
    goBack: "Kembali",
    continueJourney: "Lanjutkan Perjalanan",
    completeQuest: "Selesaikan Misi",
    skip: "Lewati",
    beginJourney: "Mulai Perjalanan",
    cancel: "Batal",
    save: "Simpan",
    finish: "Selesai",
    points: "Poin",
    xp: "XP",

    // Onboarding Screen
    onboarding: [
      {
        title: "Pahami Kebutuhan Belajar Anak Anda",
        description: "HEBAT membantu mengidentifikasi tantangan perhatian dan belajar sejak dini."
      },
      {
        title: "Belajar Melalui Aktivitas Menyenangkan",
        description: "Buka potensi Anda dengan modul gamifikasi yang dirancang untuk melatih fokus dan menghargai kemajuan harian Anda.",
        stats: [
          { label: "Game Fokus", sub: "Latih perhatian Anda" },
          { label: "Lencana Penghargaan", sub: "Rayakan kemenangan" }
        ]
      },
      {
        title: "Dukungan dari Rumah dan Sekolah",
        description: "Hubungkan kemajuan anak Anda di berbagai lingkungan. Bagikan wawasan dan rayakan kemenangan bersama di dasbor terpadu."
      }
    ],

    // Role Selection Screen
    roleSelectTitle: "Siapa Anda?",
    roleSelectSub: "PILIH PERAN ANDA UNTUK PERSONALISASI PENGALAMAN",
    roles: {
      child: {
        title: "Saya Siswa",
        description: "Saya ingin meningkatkan fokus dan mendapatkan hadiah keren!"
      },
      parent: {
        title: "Saya Orang Tua",
        description: "Saya ingin mendukung anak saya dan melihat kemajuan mereka."
      },
      teacher: {
        title: "Saya Guru",
        description: "Saya ingin mengelola kelas saya dan membantu siswa berkembang."
      },
      professional: {
        title: "Saya Profesional / Tenaga Ahli",
        description: "Saya memberikan observasi klinis, saran, dan penyesuaian rencana dukungan."
      }
    },

    // Profile Setup Screen
    profileSetupTitle: "Ceritakan tentang diri Anda!",
    profileSetupSub: "Ayo atur profil Anda untuk menyesuaikan pengalaman belajar Anda.",
    profileSetupSteps: {
      basics: "Dasar",
      profile: "Profil",
      identify: "Identifikasi",
      detail: "Detail"
    },
    profileSetupFields: {
      nameLabel: "Nama Anda",
      namePlaceholder: "Masukkan nama Anda...",
      ageLabel: "Usia Anda",
      agePlaceholder: "Pilih usia",
      gradeLabel: "Kelas Anda",
      gradePlaceholder: "Pilih kelas",
      specialtyLabel: "Spesialisasi / Keahlian",
      specialtyPlaceholder: "misal, Pendidikan Khusus, Psikologi Anak",
      schoolLabel: "Nama Sekolah",
      schoolPlaceholder: "Masukkan nama sekolah...",
      attentionLabel: "Tingkat Fokus",
      attentionSub: "Pilih berapa lama Anda dapat fokus dengan mudah"
    },
    attentionSpans: [
      { l: "Fokus Singkat", s: "5-10 Menit" },
      { l: "Fokus Stabil", s: "10-20 Menit" },
      { l: "Fokus Super", s: "20-30+ Menit" }
    ],
    chooseAllyTitle: "Pilih Sekutu Anda!",
    chooseAllySub: "Pilih pendamping binatang yang akan menemani Anda dalam misi ini.",

    // Dashboard - Shared
    nav: {
      dashboard: "Dasbor",
      supportPlan: "Rencana Dukungan",
      focus: "Pengatur Waktu",
      routine: "Rutinitas",
      learn: "Belajar",
      pmt: "Modul PMT",
      rewards: "Hadiah",
      screening: "Skrining ADHD",
      consultation: "Konsultasi",
      professional: "Portal Klinis",
      profile: "Profil"
    },

    // Child Dashboard
    childDashTitle: "Petualangan Luar Angkasaku",
    childDashSub: "Ditemani oleh sekutu beranimu!",
    childDashStreak: "Kombinasi Harian",
    childDashReady: "Siap untuk misi fokus hari ini?",
    childDashActiveQuest: "Misi Fokus Aktif",
    childDashCompleted: "Selesai",
    childDashProgress: "Kemajuan",
    quests: {
      spaceQuest: {
        title: "Petualangan Fokus Astronaut",
        sub: "Latihan eksplorasi luar angkasa",
        desc: "Perkuat fokus dan kontrol impuls melalui tantangan simulator luar angkasa.",
        action: "Luncurkan Kapal"
      },
      mathQuest: {
        title: "Misi Matematika Visual ADHD",
        sub: "Matematika Spasial & Multi-Sensori",
        desc: "Selesaikan logika, pola, dan pecahan visual menggunakan pemicu warna taktil.",
        action: "Masuk Gua"
      },
      routineQuest: {
        title: "Misi Regulasi Diri",
        sub: "Pembangun kebiasaan harian",
        desc: "Bentuk kebiasaan fokus inti dan latih prioritas tugas dengan umpan balik aktif.",
        action: "Bangun Energi"
      }
    },
    completedQuestsText: "Kamu telah menyelesaikan semua misi aktif untuk hari ini! Luar biasa! 🚀",

    // Parent Dashboard
    parentDashTitle: "Wawasan Orang Tua",
    parentDashSub: "Pantau perkembangan, atur rutinitas, dan kelola pelatihan",
    parentDashProgressTitle: "Jalur Kemajuan Perhatian",
    parentDashQuickStats: "Indikator Cepat",
    parentDashRoutineActive: "Rutinitas Kebiasaan Aktif",
    parentDashAddRoutine: "Konfigurasi Rutinitas Baru",
    parentDashActiveCheck: "Aktif",
    parentDashCompletedCheck: "Selesai Hari Ini",
    parentDashScreeningStatus: "Status Skrining ADHD",
    parentDashScreeningAction: "Ikuti Tes Skrining",
    parentDashScreeningResult: "Lihat Hasil Skrining",
    parentDashScreeningPending: "Belum Diikuti",
    parentDashScreeningHigh: "Indikator Tinggi (Disarankan Dukungan)",
    parentDashScreeningMild: "Indikator Ringan (Pemantauan Berkala)",
    parentDashScreeningLow: "Indikator Rendah / Normal",
    parentDashConsultationTitle: "Konsultasi Ahli",
    parentDashConsultationAction: "Jadwalkan Konsultasi",
    parentDashLearnTitle: "Modul Manajemen Perilaku",
    parentDashLearnAction: "Mulai Belajar",

    // Teacher Dashboard
    teacherDashTitle: "Pusat Kelas Guru",
    teacherDashSub: "Amati dan dukung kemajuan fokus siswa di kelas Anda",
    teacherDashClassroomStats: "Ringkasan Status Kelas",
    teacherDashStudentList: "Profil Fokus Siswa",
    teacherDashSearchPlaceholder: "Cari siswa berdasarkan nama...",
    teacherDashAttentionLevel: "Indeks Fokus",
    teacherDashObservationAlert: "Menunggu Ulasan Skrining",
    teacherDashObservationDone: "Sudah Diulas",
    teacherDashObservationRecommended: "Rencana Aksi Dikonfigurasi",
    teacherDashConsultation: "Rujuk ke Profesional",

    // Routine Builder
    routineTitle: "Rutinitas Fokus Harian",
    routineSub: "Tetapkan kebiasaan pagi dan malam yang menenangkan untuk mengurangi kewalahan sensorik",
    routineCreateTitle: "Buat Lingkaran Kebiasaan Aktif",
    routineName: "Nama Rutinitas",
    routinePlaceholder: "misal, Ritual Penenang Pagi Hari",
    routineTime: "Waktu Pemicu",
    routineType: "Kategori Rutinitas",
    routineTypes: {
      morning: "Transisi Pagi",
      evening: "Penenang Malam",
      study: "Jeda Belajar",
      custom: "Rutinitas Kustom"
    },
    routineSteps: "Langkah-Langkah Interaktif",
    routineAddStep: "Tambah Langkah Kustom",
    routineStepPlaceholder: "misal, Tarik napas dalam-dalam selama 1 menit",
    routineSuccess: "Rutinitas berhasil dibuat!",
    routineActiveHeader: "Kebiasaan Menenangkan Anda",

    // Screening Test
    screeningTitle: "Skrining Klinis ADHD",
    screeningSub: "Skala Penilaian Vanderbilt berbasis bukti untuk laporan orang tua dan guru",
    screeningIntroHeader: "Pahami Kecenderungan ADHD",
    screeningIntroP1: "Skrining ini adalah alat interaktif yang diadaptasi dari panduan klinis profesional untuk mengidentifikasi indikator fokus, hiperaktivitas, dan fungsi eksekutif.",
    screeningIntroP2: "Dibutuhkan sekitar 3-5 menit dan menghasilkan laporan wawasan yang dapat ditindaklanjuti dan dibagikan langsung dengan dokter anak atau konselor sekolah.",
    screeningStartBtn: "Mulai Penilaian",
    screeningQuestionLabel: "Pertanyaan",
    screeningNever: "Tidak Pernah",
    screeningSometimes: "Kadang-kadang",
    screeningOften: "Sering",
    screeningVeryOften: "Sangat Sering",
    screeningResultsTitle: "Laporan Penilaian Skrining",
    screeningSeverityHigh: "Terdapat Kecenderungan ADHD Tinggi",
    screeningSeverityMild: "Tantangan Fokus Ringan / Sedang",
    screeningSeverityLow: "Indikator Fokus Standar / Normal",
    screeningResultsDescHigh: "Laporan ini menunjukkan gejala ketidakperhatian dan/atau hiperaktivitas yang sering terjadi, cocok dengan garis dasar skrining pediatrik standar. Kami sangat menyarankan untuk berkonsultasi dengan profesional ADHD.",
    screeningResultsDescMild: "Laporan menunjukkan hambatan fokus sesekali. Struktur regulasi diri yang digamifikasi dan rutinitas teratur sangat direkomendasikan.",
    screeningResultsDescLow: "Indikator fokus berada dalam batas normal. Tetap gunakan rutinitas harian untuk menjaga kesehatan kognitif dasar.",
    screeningBackBtn: "Kembali ke Wawasan",

    // PMT Modules (Parent Management Training)
    pmtTitle: "Pelatihan Manajemen Orang Tua",
    pmtSub: "Strategi terbukti secara klinis untuk mengelola pola impuls dan meningkatkan kerja sama",
    pmtLockMessage: "Buka strategi lanjutan dengan menyelesaikan pelatihan dasar orang tua!",
    pmtStartAction: "Mulai Modul",
    pmtCompleted: "Selesai 🎉",

    // Focus Timer
    focusTitle: "Stasiun Hiperfokus",
    focusSub: "Jangkar visual yang menenangkan yang dirancang untuk mendukung pikiran ADHD selama sesi kerja fokus",
    focusStart: "Mulai Fokus",
    focusPause: "Jeda Sesi",
    focusReset: "Atur Ulang Sesi",
    focusSettings: "Pengaturan Timer",
    focusWorkDuration: "Durasi Kerja (Menit)",
    focusBreakDuration: "Waktu Istirahat (Menit)",
    focusVisualTheme: "Tema Lingkungan Visual",
    focusThemes: {
      ocean: "Aliran Samudra Dalam 🌊",
      space: "Nebula Kosmik 🌌",
      forest: "Hujan Hutan Zen 🌲"
    },

    // Mood Check
    moodTitle: "Bagaimana perasaan kita saat ini?",
    moodSub: "Catat keadaan sensorik Anda untuk membuka sesi latihan penenang yang cocok!",
    moodSave: "Catat Mood & Mulai Latihan",
    moodSavedSuccess: "Mood berhasil dicatat! Berikut adalah rekomendasi kalibrasi fokus kustom Anda.",

    // Learn Modules
    learnTitle: "Misi Fokus Interaktif",
    learnSub: "Pembelajaran tergamifikasi yang dirancang untuk pikiran neurodivergen untuk melatih rentang perhatian",
    learnStartMission: "Mulai Misi",
    learnMissionComplete: "Selesai!",

    // Consultation
    consultTitle: "Hubungi Pakar ADHD Anak",
    consultSub: "Pemesanan konsultasi telemedicine langsung dan obrolan dengan spesialis dan psikolog berlisensi",
    consultBookBtn: "Jadwalkan Sesi Langsung",
    consultActiveChat: "Obrolan Dukungan Langsung",
    consultPlaceholder: "Ketik pesan Anda ke tim dukungan klinis kami...",

    // Rewards Page
    rewardsTitle: "Ruang Trofi Luar Angkasaku",
    rewardsSub: "Rayakan pencapaian luar biasa yang diraih melalui dedikasi terus-menerus!",
    rewardsHeader: "Lencana yang Saya Dapatkan",
    rewardsPointsTitle: "Token Fokus Tersedia",
    rewardsMilestones: "Log Pencapaian"
  }
};
