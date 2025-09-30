import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface RSVPResponse {
  id?: number
  attendance: string
  name: string
  menu: string
  companions: string
  comments: string
  created_at?: string
}
