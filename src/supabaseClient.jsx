// Supabase 클라이언트를 가져옵니다.
import { createClient } from '@supabase/supabase-js'; 

// Supabase URL과 키를 환경 변수에서 가져옵니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY; 

// Supabase 클라이언트를 초기화하여 내보냅니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 