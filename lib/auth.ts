import { createClient } from "@supabase/supabase-js"
import type { Provider } from "@supabase/supabase-js"

// Create a single supabase client for auth
export const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// Function to sign in with a provider (GitHub in this case)
export const signInWithProvider = async (provider: Provider) => {
  const { data, error } = await supabaseAuth.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw error
  }

  return data
}

// Function to sign out
export const signOut = async () => {
  const { error } = await supabaseAuth.auth.signOut()
  if (error) {
    throw error
  }
}

// Get the current session
export const getSession = async () => {
  const { data, error } = await supabaseAuth.auth.getSession()
  if (error) {
    throw error
  }
  return data.session
}

// Get the current user
export const getUser = async () => {
  const { data, error } = await supabaseAuth.auth.getUser()
  if (error) {
    throw error
  }
  return data.user
}
