import Link from "next/link"
import Image from "next/image"
import { Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="mb-6">
              <Link href="/">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%2B2024-02-06%2Bat%2B9.10.01%E2%80%AFPM_prev_ui-u8gmYbsyJFmS3MgH5m6ulUfzoQgiqp.png"
                  alt="JobVault"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <p className="text-sm text-white/60 mb-4">
              Get paid upfront for every job. Start protecting your cash flow today.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/60 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/60 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Contractors</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/get-started" className="text-white/60 hover:text-white">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-white/60 hover:text-white">
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/60 hover:text-white">
                <Phone className="h-4 w-4" />
                <a href="tel:+12625018982">(262) 501-8982</a>
              </li>
              <li className="flex items-center gap-2 text-white/60 hover:text-white">
                <Mail className="h-4 w-4" />
                <a href="mailto:team@jobvault.co">team@jobvault.co</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} JobVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
