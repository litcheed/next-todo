import { SupabaseClient } from '@supabase/supabase-js';

export class TodoRepository {

  constructor(private readonly client: SupabaseClient) {}

  async fetchTodo() {
    let query = this.client.from('todo').select('*');

    const { data, error } = await query;
    if (error) throw error;
    if (!data || data.length === 0) {
      return [];
    }
    return data;
  }
}
