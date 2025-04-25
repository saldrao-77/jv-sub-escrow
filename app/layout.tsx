import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Script from "next/script"
import { DbInitializer } from "@/components/db-initializer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Update the metadata for better link previews
export const metadata: Metadata = {
  title: "JobVault for Contractors",
  description:
    "Stop waiting on customer deposits or fronting your own cash for materials. JobVault's escrow system secures your funds upfront.",
  metadataBase: new URL("https://jobvault-contractors.vercel.app"),
  openGraph: {
    title: "JobVault for Contractors",
    description: "Stop waiting on customer deposits or fronting your own cash for materials.",
    url: "https://jobvault-contractors.vercel.app",
    siteName: "JobVault",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobvault-og-image-dark-bg-Yd9Yd9Yd9Yd9.png",
        width: 1200,
        height: 630,
        alt: "JobVault Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobVault for Contractors",
    description: "Stop waiting on customer deposits or fronting your own cash for materials.",
    creator: "@jobvault",
    site: "@jobvault",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobvault-og-image-dark-bg-Yd9Yd9Yd9Yd9.png"],
  },
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%2021%2C%202025%2C%2001_41_55%20AM-vUEmElw2JXrOEV5wS5XowYO7L2KoJn.png",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%2021%2C%202025%2C%2001_41_55%20AM-vUEmElw2JXrOEV5wS5XowYO7L2KoJn.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Keep existing favicon */}
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Apr%2021%2C%202025%2C%2001_41_55%20AM-vUEmElw2JXrOEV5wS5XowYO7L2KoJn.png"
          type="image/png"
        />

        {/* Force meta tags for better link previews */}
        <meta property="og:title" content="JobVault for Contractors" />
        <meta
          property="og:description"
          content="Stop waiting on customer deposits or fronting your own cash for materials."
        />
        <meta
          property="og:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobvault-og-image-dark-bg-Yd9Yd9Yd9Yd9.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://jobvault-contractors.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="JobVault" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JobVault | Get paid upfront for every job" />
        <meta
          name="twitter:description"
          content="Stop waiting on customer deposits or fronting your own cash for materials."
        />
        <meta
          name="twitter:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobvault-og-image-dark-bg-Yd9Yd9Yd9Yd9.png"
        />

        {/* WhatsApp specific meta tags */}
        <meta
          property="og:image:secure_url"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobvault-og-image-dark-bg-Yd9Yd9Yd9Yd9.png"
        />
        <meta property="og:image:type" content="image/png" />

        {/* Add cache-busting query parameter to force refresh of preview */}
        <meta
          property="og:image:url"
          content={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jobvault-og-image-dark-bg-Yd9Yd9Yd9Yd9.png?v=${Date.now()}`}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
        <DbInitializer />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>

        {/* Debug script to help troubleshoot */}
        <Script id="debug-script" strategy="afterInteractive">
          {`
            console.log("🔍 Debug info:");
            console.log("- User Agent:", navigator.userAgent);
            console.log("- Is Mobile:", /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
            console.log("- localStorage available:", typeof localStorage !== 'undefined');
            
            // Test localStorage
            try {
              localStorage.setItem('test', 'test');
              localStorage.removeItem('test');
              console.log("✅ localStorage is working");
            } catch (e) {
              console.error("❌ localStorage error:", e);
            }
            
            // Log existing submissions
            try {
              const submissions = localStorage.getItem('formSubmissions');
              console.log("📋 Stored submissions:", submissions ? JSON.parse(submissions).length : 0);
            } catch (e) {
              console.error("❌ Error reading submissions:", e);
            }
          `}
        </Script>
        <Script id="link-preview-debug" strategy="afterInteractive">
          {`
            // Debug link preview meta tags
            console.log("🔗 Checking link preview meta tags...");
            
            // Log all meta tags
            const metaTags = document.querySelectorAll('meta');
            console.log('🔍 Meta tags found:', metaTags.length);
            
            const ogTags = {};
            const twitterTags = {};
            
            metaTags.forEach(tag => {
              const property = tag.getAttribute('property');
              const name = tag.getAttribute('name');
              const content = tag.getAttribute('content');
              
              if (property?.startsWith('og:') && content) {
                ogTags[property] = content;
              }
              
              if (name?.startsWith('twitter:') && content) {
                twitterTags[name] = content;
              }
            });
            
            console.log('📊 OpenGraph tags:', ogTags);
            console.log('🐦 Twitter tags:', twitterTags);
            
            // Check for common issues
            if (!ogTags['og:title']) console.warn('⚠️ Missing og:title');
            if (!ogTags['og:description']) console.warn('⚠️ Missing og:description');
            if (!ogTags['og:image']) console.warn('⚠️ Missing og:image');
          `}
        </Script>
      </body>
    </html>
  )
}
