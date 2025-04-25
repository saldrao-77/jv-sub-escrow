import { SupabaseConnectionTest } from "@/components/supabase-connection-test"

export default function DebugPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-heading">Supabase Debug</h1>

        <div className="grid gap-8">
          <SupabaseConnectionTest />

          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Environment Variables</h3>
            <p className="text-sm text-white/60">
              For security reasons, we can't display the full environment variables here. Visit the{" "}
              <a href="/api/check-supabase" className="text-blue-400 hover:underline">
                API endpoint
              </a>{" "}
              to check if they're configured.
            </p>
          </div>

          <div className="p-4 bg-zinc-900 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Supabase Project Setup</h3>
            <p className="mb-2">To verify you're using the correct Supabase project:</p>
            <ol className="list-decimal list-inside space-y-2 text-white/80">
              <li>
                Go to your{" "}
                <a
                  href="https://app.supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Supabase dashboard
                </a>
              </li>
              <li>Select your project</li>
              <li>Go to Project Settings → API</li>
              <li>Compare the "Project URL" with the NEXT_PUBLIC_SUPABASE_URL in your environment</li>
              <li>Check that the anon/public key matches your NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  )
}
