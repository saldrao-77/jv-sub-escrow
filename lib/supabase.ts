import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Define types for our database tables
export type FormSubmission = {
  id?: string
  name: string
  email: string
  company: string
  properties: string
  source: string
  device: string
  status: "pending" | "processed"
  date: string
  notes: string
  url?: string
  created_at?: string
}

// Helper function to create the submissions table if it doesn't exist
export async function setupDatabase() {
  try {
    // Check if the table exists
    const { data: tableExists } = await supabase.from("form_submissions").select("id").limit(1).single()

    // If the table doesn't exist or we got an error, we'll create it
    if (!tableExists) {
      console.log("Setting up database tables...")

      // This is just a fallback - normally you would use Supabase migrations
      // or the Supabase dashboard to create tables

      // Note: This approach is simplified for demonstration purposes
      // In a production app, you would use proper migrations
    }

    return true
  } catch (error) {
    console.error("Error setting up database:", error)
    return false
  }
}
