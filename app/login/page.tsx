import { GitHubAuthButton } from "@/components/github-auth-button"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 font-heading">Sign In</h1>

          <div className="bg-zinc-900 rounded-lg p-8">
            <div className="space-y-4">
              <GitHubAuthButton />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-zinc-900 px-2 text-zinc-400">Or continue with</span>
                </div>
              </div>

              {/* You can add other auth methods here */}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
