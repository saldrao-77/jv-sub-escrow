import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">ABOUT US</h1>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 font-heading">Why We Started This</h2>
          <div className="text-white/80 space-y-4">
            <p>
              We started this company because we've seen what happens when subcontractors don't have financial
              protection.{" "}
              <strong>
                You buy materials for jobs that get cancelled, and customers refuse to pay deposits because of trust
                issues.
              </strong>{" "}
              And the result?{" "}
              <strong>You lose thousands of dollars, waste materials, and miss out on other paying jobs.</strong>
            </p>
            <p>
              Our mission is to give specialty trade contractors the kind of financial protection big companies take for
              granted — <strong>secure, transparent escrow accounts</strong> that guarantee you get paid upfront without
              the risk. We're building modern fintech products for{" "}
              <strong>electricians, plumbers, carpenters, and other skilled trades</strong> — not Silicon Valley tech
              bros.
            </p>
            <p>
              This isn't just software. It's how you finally{" "}
              <strong>
                stop losing money on cancelled jobs, eliminate payment disputes, and get back to doing what you do
                best—your trade.
              </strong>
            </p>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-zinc-800 rounded-lg p-8 mb-12 border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6 font-heading text-center">Stanford University-Backed</h2>
            <p className="text-white/80 text-center mb-8">
              JobVault is proud to be a Stanford University-backed team with a research grant focused on helping impact
              small businesses across America. Our work is supported by leading institutions committed to innovation and
              economic empowerment.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="relative w-64 h-20 bg-white rounded-lg p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stanford-logo-660x330-oskcPUjr8YDqtNrsbMaptirPoGxtlT.png"
                  alt="Stanford University"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-64 h-20 bg-white rounded-lg p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/60ed115079e5542de90cd94c_D_School-Logo1-1024x597-0ltj1BVIAfBB8B80WXFHXimiwPjffP.png"
                  alt="Hasso Plattner Institute of Design at Stanford"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JFP_7956Sal%20Rao%20%281%29.jpg-WhorsoSy03GfWeOsMakGKLPnicT5Uf.jpeg"
                alt="Sal Rao, Founder & CEO"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: "50% 35%" }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 font-heading">Meet the Founder</h2>
            <h3 className="text-xl font-bold mb-4">Sal Rao, Founder & CEO</h3>
            <div className="text-white/80 space-y-4">
              <p>
                Sal started this company to bring <strong>smart, intuitive financial tools</strong> to the people who
                need them most: specialty trade contractors trying to grow without losing money on cancelled jobs.
              </p>
              <p>
                Before founding JobVault, Sal was <strong>Head of Commerce at GlossGenius</strong>, where she built and
                scaled a comprehensive payments infrastructure processing over <strong>$2 billion annually</strong>. She
                pioneered innovative financial products including micro-loans, specialized bank accounts, and secure
                payment systems that transformed how small businesses manage cash flow. Her work in developing
                AI-powered fraud detection systems protected thousands of businesses from financial risk.
              </p>
              <p>
                Prior to that, Sal advised <strong>Fortune 500 companies at McKinsey & Company</strong>, where she
                focused on real estate, technology, and asset management. She previously{" "}
                <strong>worked at the White House and Senate</strong>.
              </p>
              <p>
                Her passion for serving small businesses comes from personal experience — watching family members build
                small businesses from the ground up, and spending her career bringing order to messy, manual problems.
                Today, she's on a mission to bring{" "}
                <strong>modern fintech into the hands of people who need it most</strong>. The ones doing the real work.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-lg text-center h-full">
              <h3 className="text-xl font-bold mb-4 font-heading">Trust</h3>
              <p className="text-white/70">
                We believe in creating trust between you and your customers. Our escrow system ensures both parties can
                work together with confidence, knowing you'll get paid for materials even if the job gets cancelled.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg text-center h-full">
              <h3 className="text-xl font-bold mb-4 font-heading">Protection</h3>
              <p className="text-white/70">
                We're committed to protecting your finances from the risk of cancelled jobs and non-payment, ensuring
                you never have to spend your own money on materials without the security of knowing you'll be
                compensated.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg text-center h-full">
              <h3 className="text-xl font-bold mb-4 font-heading">Innovation</h3>
              <p className="text-white/70">
                We're constantly pushing the boundaries of what's possible in trade contractor finance, leveraging
                technology to solve the age-old problem of payment security with elegant, practical solutions that work
                for real tradespeople.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
