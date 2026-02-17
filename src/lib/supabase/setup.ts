import { createClient } from '@supabase/supabase-js';
import type { Database } from './database';

export const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY!
);
