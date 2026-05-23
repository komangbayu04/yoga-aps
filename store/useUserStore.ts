import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  jobType: 'kantor' | 'wfh' | 'hybrid';
  complaints: string[];
  goals: string[];
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  complaints: string[];
  goals: string[];
  setUser: (user: User) => void;
  setComplaints: (complaints: string[]) => void;
  setGoals: (goals: string[]) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isPremium: false,
  complaints: [],
  goals: [],
  setUser: (user) => set({ user, isAuthenticated: true }),
  setComplaints: (complaints) => set({ complaints }),
  setGoals: (goals) => set({ goals }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
