import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-end pb-24 md:pb-32 pt-32 overflow-hidden bg-white">
          {/* Very subtle mesh gradient — barely-there, purely atmospheric */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-emerald-50/70 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-slate-50 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 container mx-auto px-8 md:px-16">
            {/* Eyebrow */}
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-10">
              Africa&rsquo;s Digital Health Venture Studio
            </p>

            {/* Statement Headline */}
            <h1 className="font-display font-bold text-[clamp(3rem,8vw,7.5rem)] leading-[1.02] tracking-tight text-slate-900 max-w-5xl">
              Building{" "}
              <span className="font-serif italic font-normal text-emerald-600">
                Africa&rsquo;s next
              </span>
              <br />
              generation of
              <br />
              digital health.
            </h1>

            {/* Divider + subline + CTA row */}
            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-end gap-10 md:gap-24">
              <p className="max-w-md text-base text-slate-500 leading-[1.7]">
                We co-found, fund, and operate healthtech startups from first insight to market
                scale — pairing African clinical expertise with global venture-building discipline.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 md:ml-auto shrink-0">
                <Link
                  href="/founders#apply"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  Apply as a Founder
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 text-sm font-medium hover:border-slate-400 transition-colors"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── THESIS ───────────────────────────────────────────────────────── */}
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Our Perspective
                </p>
              </div>
              <div className="space-y-6">
                <p className="font-display text-2xl md:text-3xl font-semibold text-slate-900 leading-[1.4]">
                  Africa carries 22% of the world&rsquo;s disease burden but has access to less
                  than 2% of global healthcare infrastructure.
                </p>
                <p className="text-slate-500 text-base leading-[1.8] max-w-xl">
                  We believe the fastest path to closing that gap is through purpose-built
                  digital health companies — ventures designed from day one around the realities
                  of African clinical environments, distribution channels, and patient behaviour.
                </p>
                <p className="text-slate-500 text-base leading-[1.8] max-w-xl">
                  Synerge Health does not invest from the sidelines. We co-found alongside
                  exceptional builders, embedding deep operational and clinical expertise into
                  every company from inception through continental scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODEL ────────────────────────────────────────────────────────── */}
        <section className="py-40 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  The Studio Model
                </p>
              </div>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-16">
                  We don&rsquo;t advise.
                  <br />
                  We build inside.
                </h2>

                {/* Three pillars — text-only, no icons */}
                <div className="grid md:grid-cols-3 gap-10 divide-x-0 md:divide-x divide-slate-200">
                  {[
                    {
                      num: "01",
                      title: "Strategic Guidance",
                      body: "Business models, go-to-market plans, pricing strategy, and regulatory pathways custom-built for African healthcare markets.",
                    },
                    {
                      num: "02",
                      title: "Operational Support",
                      body: "Hands-on execution — hiring top talent, legal setup, and finance infrastructure — so founders focus on product and patient impact.",
                    },
                    {
                      num: "03",
                      title: "Capital & Networks",
                      body: "Seed funding paired with warm introductions across our venture capital, hospital, and philanthropic partner network.",
                    },
                  ].map((pillar) => (
                    <div key={pillar.num} className="md:pl-10 first:pl-0 space-y-4">
                      <span className="font-mono text-[11px] text-slate-300 tracking-widest">
                        {pillar.num}
                      </span>
                      <h3 className="font-heading font-semibold text-base text-slate-900">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-[1.75]">{pillar.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTORS ──────────────────────────────────────────────────────── */}
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Focus Areas
                </p>
              </div>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-16">
                  Sub-sectors
                  <br />
                  we back.
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-slate-200 rounded-2xl overflow-hidden">
                  {[
                    "Telemedicine",
                    "AI Diagnostics",
                    "Digital Therapeutics",
                    "Hospital Software",
                    "Remote Monitoring",
                    "Digital Pharmacy",
                    "Health Fintech",
                    "Supply Chain",
                  ].map((sector, i) => (
                    <Link
                      key={sector}
                      href="/services"
                      className={`group p-6 border-slate-200 hover:bg-slate-50 transition-colors ${
                        i % 4 !== 3 ? "border-r" : ""
                      } ${i < 4 ? "border-b" : ""}`}
                    >
                      <span className="block text-sm font-medium text-slate-700 group-hover:text-emerald-600 transition-colors leading-snug">
                        {sector}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 mt-3 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NUMBERS ──────────────────────────────────────────────────────── */}
        <section className="py-40 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 text-white">
              {[
                { value: "$1M", label: "Initial Venture Fund", sub: "Committed capital" },
                { value: "3×", label: "Target 5-Year ROI", sub: "Investment return goal" },
                { value: "100%", label: "HealthTech Focus", sub: "Pure-play digital health" },
              ].map((stat) => (
                <div key={stat.value} className="space-y-3">
                  <div className="font-display font-bold text-5xl md:text-6xl text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-slate-300">{stat.label}</div>
                  <div className="text-xs text-slate-500 font-mono tracking-wide">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-8">
              Start a conversation
            </p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-slate-900 leading-[1.06] max-w-3xl mx-auto mb-16">
              Ready to build Africa&rsquo;s future of healthcare?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/founders#apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                Apply as a Founder
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/investors"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-200 text-slate-700 text-sm font-medium hover:border-slate-400 transition-colors"
              >
                Investor Information
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
