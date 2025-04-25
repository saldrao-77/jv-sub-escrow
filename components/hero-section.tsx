"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, CheckCircle, Clock, Phone, MessageSquare } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { storeHeroSubmission, getDeviceType, submitFormData } from "@/lib/form-utils"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Detect mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitting(true)

      try {
        // Prepare form data
        const formData = {
          email,
          source: "hero",
          submittedAt: new Date().toISOString(),
          deviceType: getDeviceType(),
        }

        // Store submission in session storage
        storeHeroSubmission(formData)

        // Submit to API endpoint
        await submitFormData(formData)

        // Redirect to get-started page with email prefilled
        router.push(`/get-started?email=${encodeURIComponent(email)}&from=hero`)
      } catch (error) {
        console.error("Error:", error)
        // Still redirect even if submission fails
        router.push(`/get-started?email=${encodeURIComponent(email)}&from=hero`)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16">
      {/* Background - conditional rendering based on device */}
      {!isMobile ? (
        // Desktop background with image
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/PM.webp"
            alt="Subcontractor"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
      ) : (
        // Mobile background - solid color only
        <div className="absolute inset-0 z-0 bg-black"></div>
      )}

      <div className="container relative z-10 mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto font-heading tracking-tight">
          Get paid upfront for every job
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Stop waiting on customer deposits to start jobs or fronting your own cash for materials. JobVault's escrow
          system secures your funds upfront, gives you controlled access to buy materials, and builds customer trust—all
          while protecting your cash flow.
        </p>

        <div className="max-w-md mx-auto mb-8">
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="bg-white text-black hover:bg-white/90 whitespace-nowrap font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Get started today"}
            </Button>
          </form>
        </div>

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

        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            SOC2 compliant
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-400" />
            100% payment protection
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-400" />
            Get paid 10x faster
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </section>
  )
}
