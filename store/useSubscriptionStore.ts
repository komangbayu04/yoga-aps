import { create } from 'zustand';

type Plan = 'free' | 'premium_monthly' | 'premium_yearly';
type PaywallTrigger = 'class_lock' | 'program_lock' | 'reminder_limit' | 'download' | 'session_7';

interface SubscriptionStore {
  plan: Plan;
  trialEndsAt: string | null;
  paywallVisible: boolean;
  paywallTrigger: PaywallTrigger | null;
  showPaywall: (trigger: PaywallTrigger) => void;
  hidePaywall: () => void;
  setPlan: (plan: Plan) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  plan: 'free',
  trialEndsAt: null,
  paywallVisible: false,
  paywallTrigger: null,
  showPaywall: (trigger) => set({ paywallVisible: true, paywallTrigger: trigger }),
  hidePaywall: () => set({ paywallVisible: false, paywallTrigger: null }),
  setPlan: (plan) => set({ plan }),
}));
