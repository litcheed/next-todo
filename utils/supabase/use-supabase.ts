import { createClient, SupabaseClient  } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function useSupabase() {
  if (!supabase) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
  }
  return { supabase };
}
