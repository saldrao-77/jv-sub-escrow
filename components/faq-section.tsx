"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">How does JobVault's escrow system work?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                JobVault provides a secure escrow account where your customers can deposit funds for materials based on
                your quote. Instead of waiting for a deposit directly, you send a quote with an escrow link. Once
                funded, you can access the money through direct transfer or a JobVault card. This gives you immediate
                cash flow while giving your customer peace of mind that funds will be used for their project.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">How quickly can I get started?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Most contractors are up and running within 24 hours. You can create your account, set up your first
                escrow request, and start receiving funds immediately. Our onboarding team will guide you through the
                setup process, including configuring your payment preferences and receipt tracking options.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">
                Do customers see my material costs and markup?
              </AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                No. You maintain complete control over your pricing and markup. Customers only see the total amount you
                quote for materials. You set your prices upfront in your quote, and JobVault simply secures those funds
                in escrow. Your business model and margins remain private, just as they would with traditional payment
                methods.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">How does receipt tracking work?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                After making a purchase, simply snap a photo of the receipt and text it to our system or upload it
                through the app. Our system automatically matches receipts to transactions, creating a clean digital
                record. This eliminates the need to keep paper receipts and provides documentation if questions arise
                later. The receipt details remain private to you—customers only see that a verified purchase was made.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">Is there a mobile app available?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Yes, JobVault offers mobile apps for both iOS and Android devices. You can send quotes with escrow
                links, manage funds, track expenses, and submit receipts directly through the app. The mobile experience
                is designed for contractors on the go, allowing you to manage your cash flow from the job site or supply
                store.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
