import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "JobVault | Get paid upfront for every job",
  description: "Stop waiting on customer deposits or fronting your own cash for materials.",
  openGraph: {
    title: "JobVault | Get paid upfront for every job",
    description: "Stop waiting on customer deposits or fronting your own cash for materials.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobvault-og-image-dark-bg-Yd9Yd9Yd9Yd9.png",
        width: 1200,
        height: 630,
        alt: "JobVault",
      },
    ],
  },
}

export default function WhatsAppPage() {
  // Redirect to homepage
  redirect("/")

  // This component will never render because of the redirect
  return null
}
