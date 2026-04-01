import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Fail loudly in development if env vars are missing.
// In production a missing key means auth is broken — better to know early.
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn(
    '[Promptly] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set.\n' +
    'Copy .env.example → .env and fill in your Supabase credentials.\n' +
    'Auth features will not work until this is configured.'
  )
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key'
)
