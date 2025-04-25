"use client"

import { useState } from "react"
import { Shield, CreditCard, Receipt, BarChart, DollarSign } from "lucide-react"

const features = [
  {
    id: "escrow",
    icon: <Shield className="h-8 w-8" />,
    emoji: "🔒",
    title: "Never Lose Money on Cancelled Jobs",
    description:
      "Stop buying materials with your own money for jobs that might get cancelled. JobVault secures funds in escrow at the start, so you're protected even if the customer changes their mind.",
  },
  {
    id: "verification",
    icon: <CreditCard className="h-8 w-8" />,
    emoji: "✅",
    title: "Build Trust with Customers",
    description:
      "Customers hesitant to pay deposits? Our escrow system builds instant trust. They feel secure knowing their money is protected, and you get the funds you need to start the job.",
  },
  {
    id: "protection",
    icon: <Receipt className="h-8 w-8" />,
    emoji: "🛡️",
    title: "Protection for Specialty Materials",
    description:
      "No more getting stuck with custom or specialty materials when a job falls through. With funds secured upfront, you can order exactly what you need without financial risk.",
  },
  {
    id: "tracking",
    icon: <BarChart className="h-8 w-8" />,
    emoji: "📊",
    title: "Take On More Jobs Safely",
    description:
      "With payment guaranteed for each job, you can confidently take on multiple projects simultaneously without worrying about cash flow or risking your own money on materials.",
  },
  {
    id: "trust",
    icon: <DollarSign className="h-8 w-8" />,
    emoji: "🤝",
    title: "Stop Losing Jobs",
    description:
      "Many customers are hesitant to pay deposits directly to contractors they don't know. JobVault eliminates this barrier, helping you win more jobs with a secure payment system that builds instant trust.",
  },
]

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-heading">
          STOP LOSING MONEY ON CANCELLED JOBS
        </h2>
        <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
          JobVault's escrow system guarantees you get paid for materials, even when customers cancel.
        </p>

        <div className="grid md:grid-cols-1 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 rounded-lg cursor-pointer feature-card bg-zinc-900 hover:bg-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{feature.emoji}</span>
                <h3 className="text-xl font-bold font-heading">{feature.title}</h3>
              </div>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
