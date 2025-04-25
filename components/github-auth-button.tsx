"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signInWithProvider } from "@/lib/auth"

export function GitHubAuthButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signInWithProvider("github")
    } catch (error) {
      console.error("Error signing in with GitHub:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSignIn} disabled={isLoading} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Connecting...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          <span>Continue with GitHub</span>
        </div>
      )}
    </Button>
  )
}
