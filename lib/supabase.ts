// Stub: replace with real Supabase client using env vars
// EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
export const supabase = {
  from: (_table: string) => ({
    select: async () => ({ data: [], error: null }),
    insert: async (_data: unknown) => ({ data: null, error: null }),
    update: async (_data: unknown) => ({ data: null, error: null }),
  }),
  auth: {
    signInWithOAuth: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
};
