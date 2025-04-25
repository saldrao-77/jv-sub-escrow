import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client for server-side operations
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || ""
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  return createClient(supabaseUrl, supabaseKey)
}

// Singleton pattern for client-side Supabase client
let clientSupabaseInstance: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseInstance) return clientSupabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  clientSupabaseInstance = createClient(supabaseUrl, supabaseKey)
  return clientSupabaseInstance
}
