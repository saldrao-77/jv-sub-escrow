import { UserProfile } from "@/components/user-profile"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

async function getSession() {
  const cookieStore = cookies()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  const { data } = await supabase.auth.getSession()
  return data.session
}

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-heading">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <UserProfile />
          </div>

          <div className="md:col-span-2 bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Welcome to Your Dashboard</h2>
            <p className="text-white/70 mb-4">
              You've successfully signed in with GitHub. This is your personal dashboard where you can manage your
              account and settings.
            </p>

            {/* Add dashboard content here */}
          </div>
        </div>
      </div>
    </main>
  )
}
