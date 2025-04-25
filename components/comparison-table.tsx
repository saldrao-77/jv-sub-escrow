import { Check, X } from "lucide-react"

export function ComparisonTable() {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-heading">
          WHY TRADE CONTRACTORS CHOOSE JOBVAULT
        </h2>
        <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
          See how JobVault's escrow system protects you from financial loss
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left bg-transparent"></th>
                <th className="p-4 text-center bg-zinc-900 rounded-t-lg border-b border-zinc-800">
                  <div className="font-bold text-xl mb-2">Without JobVault</div>
                  <div className="text-white/60 text-sm">The risky way</div>
                </th>
                <th className="p-4 text-center bg-blue-900/20 rounded-t-lg border-b border-blue-800/30">
                  <div className="font-bold text-xl mb-2">With JobVault Escrow</div>
                  <div className="text-blue-400 text-sm">The protected way</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-zinc-800 font-medium">Cancelled Jobs</td>
                <td className="p-4 text-center border-b border-zinc-800 bg-zinc-900">
                  <div className="flex justify-center">
                    <X className="text-red-400 h-6 w-6" />
                  </div>
                  <div className="text-white/60 text-sm mt-1">You lose money on materials purchased</div>
                </td>
                <td className="p-4 text-center border-b border-blue-800/30 bg-blue-900/20">
                  <div className="flex justify-center">
                    <Check className="text-green-400 h-6 w-6" />
                  </div>
                  <div className="text-white/80 text-sm mt-1">You keep the money for materials already purchased</div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-800 font-medium">Customer Trust</td>
                <td className="p-4 text-center border-b border-zinc-800 bg-zinc-900">
                  <div className="flex justify-center">
                    <X className="text-red-400 h-6 w-6" />
                  </div>
                  <div className="text-white/60 text-sm mt-1">Customers refuse to pay deposits</div>
                </td>
                <td className="p-4 text-center border-b border-blue-800/30 bg-blue-900/20">
                  <div className="flex justify-center">
                    <Check className="text-green-400 h-6 w-6" />
                  </div>
                  <div className="text-white/80 text-sm mt-1">Customers feel secure with neutral escrow</div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-800 font-medium">Specialty Materials</td>
                <td className="p-4 text-center border-b border-zinc-800 bg-zinc-900">
                  <div className="flex justify-center">
                    <X className="text-red-400 h-6 w-6" />
                  </div>
                  <div className="text-white/60 text-sm mt-1">Stuck with non-returnable items if job cancels</div>
                </td>
                <td className="p-4 text-center border-b border-blue-800/30 bg-blue-900/20">
                  <div className="flex justify-center">
                    <Check className="text-green-400 h-6 w-6" />
                  </div>
                  <div className="text-white/80 text-sm mt-1">Protected financially even with custom orders</div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-800 font-medium">Cash Flow</td>
                <td className="p-4 text-center border-b border-zinc-800 bg-zinc-900">
                  <div className="flex justify-center">
                    <X className="text-red-400 h-6 w-6" />
                  </div>
                  <div className="text-white/60 text-sm mt-1">Spending your own money upfront</div>
                </td>
                <td className="p-4 text-center border-b border-blue-800/30 bg-blue-900/20">
                  <div className="flex justify-center">
                    <Check className="text-green-400 h-6 w-6" />
                  </div>
                  <div className="text-white/80 text-sm mt-1">Using customer funds from day one</div>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-zinc-800 font-medium">Lost Jobs</td>
                <td className="p-4 text-center border-b border-zinc-800 bg-zinc-900">
                  <div className="flex justify-center">
                    <X className="text-red-400 h-6 w-6" />
                  </div>
                  <div className="text-white/60 text-sm mt-1">Customers walk away due to trust issues</div>
                </td>
                <td className="p-4 text-center border-b border-blue-800/30 bg-blue-900/20">
                  <div className="flex justify-center">
                    <Check className="text-green-400 h-6 w-6" />
                  </div>
                  <div className="text-white/80 text-sm mt-1">Win more jobs with secure payment system</div>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Business Growth</td>
                <td className="p-4 text-center bg-zinc-900 rounded-b-lg">
                  <div className="flex justify-center">
                    <X className="text-red-400 h-6 w-6" />
                  </div>
                  <div className="text-white/60 text-sm mt-1">Limited by your personal financial risk</div>
                </td>
                <td className="p-4 text-center bg-blue-900/20 rounded-b-lg">
                  <div className="flex justify-center">
                    <Check className="text-green-400 h-6 w-6" />
                  </div>
                  <div className="text-white/80 text-sm mt-1">Take on multiple jobs without financial risk</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
