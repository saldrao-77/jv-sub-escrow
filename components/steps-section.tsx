"use client"

import { CreditCard, Receipt, Shield, BarChart } from "lucide-react"

export function StepsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">HOW IT WORKS</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="bg-zinc-900 p-8 rounded-lg text-center relative">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">Send a quote with escrow</h3>
            <p className="text-white/70">
              Create a materials quote and send it with a secure escrow payment link. Your customer funds the escrow
              account upfront, giving you guaranteed payment protection before you spend a dime on materials.
            </p>
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div className="lg:hidden mt-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg text-center relative">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">Get funds released instantly</h3>
            <p className="text-white/70">
              Once the customer funds the escrow, you can access the money immediately to buy materials. Even if the
              customer cancels later, you keep the funds for materials you've already purchased.
            </p>
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div className="lg:hidden mt-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg text-center relative">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">Buy materials with confidence</h3>
            <p className="text-white/70">
              Purchase materials knowing you're already paid, even for specialty or custom items. Easily submit receipts
              via text and we auto-track your expenses in a centralized dashboard for reporting and tax time.
            </p>
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div className="lg:hidden mt-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">Grow your business safely</h3>
            <p className="text-white/70">
              With payment protection in place, you can take on more jobs simultaneously without risking your own money.
              Complete jobs faster, build customer trust, and grow your business with guaranteed cash flow.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
