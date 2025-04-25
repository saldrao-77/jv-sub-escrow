import { HeroSection } from "@/components/hero-section"
import { StepsSection } from "@/components/steps-section"
import { FeaturesSection } from "@/components/features-section"
import { CarouselSection } from "@/components/carousel-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { ComparisonTable } from "@/components/comparison-table"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroSection />
      <StepsSection />
      <FeaturesSection />
      <ComparisonTable />
      <CarouselSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </main>
  )
}
