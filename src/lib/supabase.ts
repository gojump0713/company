import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// .env 에 값이 있을 때만 클라이언트 생성 (없으면 null — 폼은 안내 메시지로 폴백)
export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const hasSupabase = Boolean(supabase)
