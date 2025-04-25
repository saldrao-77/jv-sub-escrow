"use client"

import { useEffect } from "react"

export default function FormDebug() {
  useEffect(() => {
    // Run form submission debugging
    const runDebug = async () => {
      try {
        const { debugFormSubmission } = await import("@/lib/form-debug")
        debugFormSubmission()
      } catch (error) {
        console.error("Error running form debug:", error)
      }
    }

    runDebug()
  }, [])

  return null
}
