import { createServerSupabaseClient } from "@/lib/supabase"

export default async function AdminPage() {
  // Fetch submissions from Supabase
  const supabase = createServerSupabaseClient()
  const { data: submissions } = await supabase
    .from("jv_sub_e")
    .select("*")
    .order("created_at", { ascending: false })
    .catch(() => ({ data: [] }))

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {submissions && submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full bg-zinc-900 rounded-lg overflow-hidden">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Properties</th>
                  <th className="px-4 py-3 text-left">Source</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={index} className="border-t border-zinc-800">
                    <td className="px-4 py-3">{submission.name || "-"}</td>
                    <td className="px-4 py-3">{submission.email || "-"}</td>
                    <td className="px-4 py-3">{submission.company || "-"}</td>
                    <td className="px-4 py-3">{submission.properties || "-"}</td>
                    <td className="px-4 py-3">{submission.source || "-"}</td>
                    <td className="px-4 py-3">{new Date(submission.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-900 rounded-lg">
            <p>No submissions found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
