"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { saveFormSubmission, submitToZapier } from "@/lib/utils"

export function CtaSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [properties, setProperties] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  // Check if device is mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      setIsMobile(mobile)
      console.log("CTA Section - Device detection:", mobile ? "Mobile" : "Desktop")
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Create the submission data
    const data = {
      name,
      email,
      company,
      properties,
      source: "homepage",
      url: window.location.href,
      submittedAt: new Date().toISOString(),
    }

    try {
      // First save to Supabase with explicit device type
      const deviceType = isMobile ? "mobile" : "desktop"
      console.log(`CTA Section - Submitting as ${deviceType} device`)

      const savedLocally = await saveFormSubmission(data, deviceType)
      console.log("Supabase save result:", savedLocally)

      // Then submit to Zapier with the same device type
      const zapierData = {
        ...data,
        device: deviceType,
      }

      try {
        await submitToZapier(zapierData)
      } catch (zapierError) {
        console.error("Zapier submission error:", zapierError)
        // Continue even if Zapier fails
      }

      // If save worked, consider it a success
      if (savedLocally) {
        router.push("/calendar?submitted=true")
      } else {
        throw new Error("Failed to save submission")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setError("There was a problem submitting the form. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6759.jpg-SpQSP3chN3zMd0Ch3bMC6Mxt06cfBw.jpeg"
              alt="Messy receipts and paperwork"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-heading">CASH FLOW WITHOUT THE CHAOS</h2>
            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-100 px-4 py-3 rounded mb-4">{error}</div>
            )}
            {/* Debug info - will show on the form */}
            <div className="text-xs text-white/50 mb-4">Device detected: {isMobile ? "Mobile" : "Desktop"}</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="cta-name" className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <Input
                  id="cta-name"
                  placeholder="John Smith"
                  className="bg-zinc-800 border-zinc-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="cta-email" className="block text-sm font-medium mb-1">
                  Email Address *
                </label>
                <Input
                  id="cta-email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-zinc-800 border-zinc-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="cta-company" className="block text-sm font-medium mb-1">
                  Company Name *
                </label>
                <Input
                  id="cta-company"
                  placeholder="Your Contracting Business"
                  className="bg-zinc-800 border-zinc-700"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="cta-properties" className="block text-sm font-medium mb-1">
                  How many jobs do you typically manage per month? *
                </label>
                <select
                  id="cta-properties"
                  className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                  value={properties}
                  onChange={(e) => setProperties(e.target.value)}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="1-5">1-5 jobs</option>
                  <option value="6-15">6-15 jobs</option>
                  <option value="16-30">16-30 jobs</option>
                  <option value="30+">30+ jobs</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Start Getting Paid Upfront Today"}
              </Button>

              <p className="text-center text-white/60 text-sm mt-2">We'll reach out to you shortly after submission.</p>

              <div className="text-center mt-4">
                <p className="text-white/60 text-sm">Or</p>
                <Link
                  href="/calendar"
                  className="text-blue-400 hover:text-blue-300 inline-block mt-2 bg-transparent border border-blue-400 rounded-md px-4 py-2 text-sm transition-colors hover:bg-blue-400/10"
                >
                  Book a demo with our team now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
