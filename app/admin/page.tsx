import { redirect } from "next/navigation"

// Simple admin authentication check
const isAuthenticated = () => {
  // In a real app, this would check session/cookies
  // For now, we'll redirect everyone since this should not be accessible
  return false
}

export default function AdminPage() {
  // Redirect to home if not authenticated
  if (!isAuthenticated()) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>The full admin dashboard will be available after deployment.</p>
      </div>
    </div>
  )
}
