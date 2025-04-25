export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-heading">Dashboard</h1>

        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent"></div>
        </div>
      </div>
    </main>
  )
}
