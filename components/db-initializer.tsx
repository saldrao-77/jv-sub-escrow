"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function DbInitializer() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [projectUrl, setProjectUrl] = useState<string | null>(null)

  useEffect(() => {
    const initDb = async () => {
      try {
        // Log the Supabase URL (but not the key for security)
        console.log("Connecting to Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

        // Try a simple query to test connection
        const { data, error } = await supabase.from("form_submissions").select("count").limit(1)

        if (error) {
          console.error("Supabase connection error:", error)
          setError(`Supabase connection error: ${error.message}`)
          return
        }

        console.log("Supabase connection successful")
        setProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || null)

        // Initialize the database
        const response = await fetch("/api/setup-db")
        const setupData = await response.json()

        if (setupData.success) {
          console.log("Database initialized successfully")
          setInitialized(true)
        } else {
          console.error("Database initialization failed:", setupData.message)
          setError(setupData.message)
        }
      } catch (err: any) {
        console.error("Error initializing database:", err)
        setError(`Failed to initialize database: ${err.message}`)
      }
    }

    initDb()
  }, [])

  // This component doesn't render anything visible
  return null
}
