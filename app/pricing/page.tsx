import { PricingSection } from "@/components/pricing-section"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare } from "lucide-react"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-20">
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">PRICING PLANS</h1>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-8">
          JobVault offers flexible pricing options to fit the needs of specialty trade contracting businesses of all
          sizes. Choose the plan that works best for you.
        </p>

        {/* Call and Text buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a href="tel:2625018982" className="inline-flex">
            <Button variant="outline" className="bg-white/10 border-0 hover:bg-white/20 rounded-full px-6 gap-2">
              <Phone className="h-4 w-4 text-blue-400" />
              Call Us
            </Button>
          </a>
          <a href="sms:2625018982" className="inline-flex">
            <Button variant="outline" className="bg-white/10 border-0 hover:bg-white/20 rounded-full px-6 gap-2">
              <MessageSquare className="h-4 w-4 text-blue-400" />
              Text Us
            </Button>
          </a>
        </div>
      </div>

      <PricingSection showHeader={false} />
    </main>
  )
}
