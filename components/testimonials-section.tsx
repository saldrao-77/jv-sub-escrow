"use client"

import { useState, useEffect } from "react"

const testimonials = [
  {
    quote:
      "Before JobVault, I'd lose jobs because homeowners were hesitant to give deposits. Now I send a quote with an escrow link, and they fund it immediately. I get the materials money upfront, they feel secure, and I've increased my business by 30% this year.",
    author: "Michael T.",
    title: "Electrical Contractor",
  },
  {
    quote:
      "I was tired of floating $5,000 in materials for jobs while waiting on customer payments. With JobVault's escrow system, I get access to funds before I start the job, and customers love the transparency. It's transformed my cash flow completely.",
    author: "David R.",
    title: "Plumbing Contractor",
  },
  {
    quote:
      "I've lost thousands of dollars buying materials upfront only to have customers cancel on me. Without collecting proper deposits, I was stuck with specialty items I couldn't return. JobVault solved this instantly—now I get paid through escrow before I buy a single item, and I can finally take on multiple jobs without the financial risk.",
    author: "Jennifer P.",
    title: "Residential Remodeler",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 6000) // Change testimonial every 6 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">WHAT OUR USERS SAY</h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="bg-zinc-900 p-8 rounded-lg text-center">
                  <div className="mb-8 flex justify-center">
                    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0L0 16V32H16V16H8L16 0H12Z" fill="#3B82F6" />
                      <path d="M36 0L24 16V32H40V16H32L40 0H36Z" fill="#3B82F6" />
                    </svg>
                  </div>
                  <p className="mb-6 text-white/80 text-lg">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-white/60">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? "bg-blue-500" : "bg-zinc-700"}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
