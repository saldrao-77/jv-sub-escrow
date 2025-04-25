"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [projectRef, setProjectRef] = useState("")

  const testConnection = async () => {
    setStatus("loading")
    setMessage("Testing connection...")

    try {
      // First check if we have the environment variables
      const response = await fetch("/api/check-supabase")
      const envData = await response.json()

      if (!envData.isConfigured) {
        setStatus("error")
        setMessage("Supabase environment variables are not configured correctly")
        return
      }

      // Try to make a simple query to verify connection
      const { data, error } = await supabase.from("form_submissions").select("count").limit(1)

      if (error) {
        throw error
      }

      // Try to get project info
      const { data: projectData } = await supabase.rpc("get_project_ref")
      if (projectData) {
        setProjectRef(projectData)
      }

      setStatus("success")
      setMessage(`Successfully connected to Supabase! Found ${data?.length || 0} submissions.`)
    } catch (error: any) {
      console.error("Connection test failed:", error)
      setStatus("error")
      setMessage(`Connection failed: ${error.message || "Unknown error"}`)
    }
  }

  return (
    <div className="p-4 bg-zinc-900 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Supabase Connection Test</h3>

      <div className="mb-4">
        <Button
          onClick={testConnection}
          disabled={status === "loading"}
          variant={status === "error" ? "destructive" : "default"}
        >
          {status === "loading" ? "Testing..." : "Test Connection"}
        </Button>
      </div>

      {status !== "idle" && (
        <div
          className={`p-3 rounded ${
            status === "loading"
              ? "bg-blue-900/20 text-blue-400"
              : status === "success"
                ? "bg-green-900/20 text-green-400"
                : "bg-red-900/20 text-red-400"
          }`}
        >
          <p>{message}</p>
          {projectRef && <p className="mt-2">Project Reference: {projectRef}</p>}
        </div>
      )}

      <div className="mt-4 text-sm text-white/60">
        <p>This component tests if your application can connect to Supabase.</p>
        <p className="mt-1">If the connection fails, check your environment variables and Supabase project settings.</p>
      </div>
    </div>
  )
}
