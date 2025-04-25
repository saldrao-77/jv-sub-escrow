"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { signOut, getUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function UserProfile() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-4">
        <p className="text-sm text-white/60">Not signed in</p>
        <Button onClick={() => router.push("/login")} variant="outline" size="sm" className="mt-2">
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 bg-zinc-900 rounded-lg">
      <div className="flex items-center gap-4">
        {user.user_metadata?.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url || "/placeholder.svg"}
            alt={user.user_metadata?.name || "User"}
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold">{(user.user_metadata?.name || user.email || "U").charAt(0)}</span>
          </div>
        )}

        <div>
          <p className="font-medium">{user.user_metadata?.name || "User"}</p>
          <p className="text-sm text-white/60">{user.email}</p>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={handleSignOut} variant="outline" size="sm">
          Sign Out
        </Button>
      </div>
    </div>
  )
}
