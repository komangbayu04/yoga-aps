import { create } from 'zustand';

interface BadgeItem {
  id: string;
  emoji: string;
  label: string;
  earned: boolean;
}

interface ActiveProgram {
  id: string;
  title: string;
  currentDay: number;
  totalDays: number;
}

interface ProgressStore {
  streak: number;
  totalMinutes: number;
  totalSessions: number;
  todayCompleted: boolean;
  activeProgram: ActiveProgram | null;
  badges: BadgeItem[];
  sessionDays: string[];
  addSession: (durationMin: number) => void;
  incrementStreak: () => void;
  setActiveProgram: (program: ActiveProgram | null) => void;
}

const defaultBadges: BadgeItem[] = [
  { id: 'streak_3', emoji: '🔥', label: 'Streak 3 Hari', earned: true },
  { id: 'streak_7', emoji: '🔥', label: 'Streak 7 Hari', earned: false },
  { id: 'streak_30', emoji: '🔥', label: 'Streak 30 Hari', earned: false },
  { id: 'min_60', emoji: '⏱', label: '60 Menit', earned: true },
  { id: 'min_300', emoji: '⏱', label: '300 Menit', earned: false },
  { id: 'program_first', emoji: '✅', label: 'Program Pertama', earned: false },
  { id: 'program_3', emoji: '✅', label: '3 Program', earned: false },
  { id: 'session_10', emoji: '💪', label: '10 Sesi', earned: false },
];

export const useProgressStore = create<ProgressStore>((set, get) => ({
  streak: 5,
  totalMinutes: 120,
  totalSessions: 12,
  todayCompleted: false,
  activeProgram: {
    id: 'prog_1',
    title: 'Bebaskan Punggungmu',
    currentDay: 3,
    totalDays: 7,
  },
  badges: defaultBadges,
  sessionDays: [],
  addSession: (durationMin) => {
    const today = new Date().toISOString().split('T')[0];
    const { sessionDays } = get();
    set({
      totalMinutes: get().totalMinutes + durationMin,
      totalSessions: get().totalSessions + 1,
      todayCompleted: true,
      sessionDays: sessionDays.includes(today) ? sessionDays : [...sessionDays, today],
    });
  },
  incrementStreak: () => set((s) => ({ streak: s.streak + 1 })),
  setActiveProgram: (program) => set({ activeProgram: program }),
}));
