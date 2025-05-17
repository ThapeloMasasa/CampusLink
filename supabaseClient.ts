import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mwvbsiccyhijubzaglxz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dmJzaWNjeWhpanViemFnbHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNjI3ODcsImV4cCI6MjA2MjgzODc4N30.X7xo4_uguJ7ZDJmi9FLRwm8RFIkhdbLInnR00T53oxI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})