"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare } from "lucide-react"

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="text-center text-white/70 mb-8 max-w-2xl mx-auto">
          Everything you need to know about JobVault's escrow system and how it can transform your payment process and
          cash flow.
        </p>

        {/* Call and Text buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
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

            <AccordionItem value="item-6" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">
                Can I set spending limits and restrictions?
              </AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Yes, JobVault gives you control over spending. You can set specific spending limits for each card based
                on your material quotes. You can also restrict cards to specific vendors or merchant categories,
                ensuring funds are only used for approved materials. This flexibility allows you to manage your cash
                flow effectively while maintaining transparency with your customers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">How are the escrow accounts managed?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                JobVault's escrow accounts are fully managed through our secure platform. Your customers fund the
                account via ACH or credit card, and you maintain complete control over how you access those funds. All
                transactions are tracked and reconciled in real-time, giving you complete visibility into your escrow
                funds at all times. You can create multiple escrow accounts for different jobs or customers as needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">
                Can I integrate with my accounting software?
              </AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Yes, JobVault integrates with popular accounting software like QuickBooks and Xero, allowing for
                automatic syncing of financial data and simplified bookkeeping for all your escrow transactions and
                material purchases. Our system automatically categorizes and organizes transactions by job, customer,
                and vendor, making it easy to track expenses and maximize tax deductions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">What kind of support do you offer?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                We provide comprehensive support through multiple channels. All customers have access to email support
                with guaranteed response times based on your plan tier. Premium plans include dedicated account managers
                and priority phone support. Our knowledge base contains detailed guides, video tutorials, and best
                practices to help you get the most out of JobVault's escrow system.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">Can I try JobVault before committing?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Yes, we offer a 14-day free trial that includes all features of our Professional plan. During the trial,
                you can set up your escrow account, send payment links to customers, and test the receipt tracking
                functionality. Our onboarding team will guide you through the setup process and answer any questions you
                have. There's no obligation to continue after the trial, and no credit card is required to start.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  )
}
