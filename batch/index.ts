import 'dotenv/config';
import { supabase } from '../src/lib/supabase/setup.ts';

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

// 前日のユーザーデータを削除
const { error } = await supabase.from('users').delete().lt('created_at', startOfToday.toUTCString());

if (error) {
  console.error(error);
}
