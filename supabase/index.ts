import type { Database } from "@/supabase/schema";

export type Todo = Database['public']['Tables']['todo']['Row'];
