import { PricingSection } from "@/components/pricing-section"
import { ContactButtons } from "@/components/contact-buttons"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-20">
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">PRICING PLANS</h1>
        <p className="text-center text-white/70 max-w-2xl mx-auto">
          JobVault offers flexible pricing options to fit the needs of specialty trade contracting businesses of all
          sizes. Choose the plan that works best for you.
        </p>
        {/* Add Contact Buttons */}
        <div className="flex justify-center mt-6">
          <ContactButtons />
        </div>
      </div>

      <PricingSection showHeader={false} />
    </main>
  )
}
