"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

// Add these state variables and effects
// const searchParams = useSearchParams() // REMOVE THIS
// const [isFromHero, setIsFromHero] = useState(false) // REMOVE THIS

export default function GetStartedPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [properties, setProperties] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [isFromHero, setIsFromHero] = useState(false) // ADD THIS

  useEffect(() => {
    // Check if coming from hero form
    const fromHero = searchParams.get("from") === "hero"
    setIsFromHero(fromHero)

    // Pre-fill email if provided in URL
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  // Simplified form submission handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Get client IP address
      let ipData = { ip: "" }
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json")
        ipData = await ipResponse.json()
      } catch (ipError) {
        console.error("Error getting IP:", ipError)
      }

      // Get UTM parameters
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get("utm_source") || ""
      const utmMedium = urlParams.get("utm_medium") || ""
      const utmCampaign = urlParams.get("utm_campaign") || ""

      // Get hero submission data if available
      let heroData = null
      try {
        const heroSubmissionStr = sessionStorage.getItem("heroSubmission")
        if (heroSubmissionStr) {
          heroData = JSON.parse(heroSubmissionStr)
        }
      } catch (e) {
        console.error("Error parsing hero submission:", e)
      }

      // Create the submission data
      const formData = {
        name,
        email,
        company,
        properties,
        source: "get-started",
        submittedAt: new Date().toISOString(),
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        ip: ipData.ip,
        utmSource,
        utmMedium,
        utmCampaign,
        isFromHero: isFromHero || !!heroData,
        heroSubmissionTime: heroData?.timestamp ? new Date(heroData.timestamp).toISOString() : null,
      }

      // Send to our API route
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      // Store submission in sessionStorage to check on calendar page
      sessionStorage.setItem(
        "lastSubmission",
        JSON.stringify({
          ...formData,
          timestamp: Date.now(),
        }),
      )

      // Clear hero submission data after successful get-started submission
      sessionStorage.removeItem("heroSubmission")

      // Redirect to the calendar page with the submitted parameter
      router.push("/calendar?submitted=true")
    } catch (error) {
      console.error("Error processing submission:", error)
      setError("There was a problem submitting the form. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">GET STARTED WITH JOBVAULT</h1>
        <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
          Fill out the form below to get started with JobVault and start receiving upfront payments for your jobs.
        </p>

        <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-lg">
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-100 px-4 py-3 rounded mb-4">{error}</div>
          )}
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <Input
                id="name"
                placeholder="John Smith"
                className="bg-zinc-800 border-zinc-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-zinc-800 border-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company Name *
              </label>
              <Input
                id="company"
                placeholder="Your Contracting Business"
                className="bg-zinc-800 border-zinc-700"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="properties" className="block text-sm font-medium mb-1">
                How many jobs do you typically manage per month? *
              </label>
              <select
                id="properties"
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
              {isSubmitting ? "Submitting..." : "Start Getting Paid Today"}
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
    </main>
  )
}
