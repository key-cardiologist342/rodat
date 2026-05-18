import { createClient } from '@supabase/supabase-js'
 
const SUPABASE_URL = 'https://nhymxskzrrzaddenapcf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeW14c2t6cnJ6YWRkZW5hcGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTMzMzYsImV4cCI6MjA5NDQyOTMzNn0.A2l1_dMPoFA56ltkgz1KXQ8Xv_FvsSIJE4L0b8SCElY'
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storageKey: 'rodat-auth',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  }
})
