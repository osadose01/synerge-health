import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Portfolio & Cohorts — Synerge Health",
  description: "Explore Synerge Health's founding portfolio and cohort status.",
};

export default function PortfolioPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Portfolio & Cohorts"
          title="Building our inaugural cohort."
          description="Synerge Health is currently selecting and co-founding its launch portfolio of digital health ventures across Sub-Saharan Africa."
        />

        {/* Cohort Status */}
        <section className="py-20 md:py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-6 sm:px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-24 items-start">
              <p className="label-mono">Current Status</p>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-[#F2F6F4] leading-[1.1] mb-16">
                  Cohort One —
                  <br />
                  <span className="text-[#2BE0B0]">Applications Open.</span>
                </h2>

                <div className="grid sm:grid-cols-3 gap-0 border border-[rgba(43,224,176,0.12)] rounded-2xl overflow-hidden bg-[#0D1815]">
                  {[
                    {
                      label: "Cohort 01 — Open",
                      title: "Applications Active",
                      body: "We are accepting applications from solo founders and early-stage teams. Selected teams undergo a 6-week validation sprint with studio capital.",
                      href: "/founders#apply",
                      cta: "Apply to Cohort One",
                    },
                    {
                      label: "In-House Incubations",
                      title: "Studio-Built Ventures",
                      body: "Key ventures originate directly inside the studio, paired with domain experts in pharmacy logistics and AI diagnostic tooling.",
                      href: "/about",
                      cta: "Our Co-Founding Approach",
                    },
                    {
                      label: "Investor Updates",
                      title: "Quarterly Pipeline",
                      body: "Portfolio announcements, clinical validation metrics, and commercial milestones are shared first with our investor network.",
                      href: "/investors",
                      cta: "Investor Access",
                    },
                  ].map((card, i) => (
                    <div
                      key={card.title}
                      className={`p-6 sm:p-8 space-y-4 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-[rgba(43,224,176,0.12)]" : ""}`}
                    >
                      <p className="label-mono text-[10px]">{card.label}</p>
                      <h3 className="font-display font-semibold text-base text-[#F2F6F4]">{card.title}</h3>
                      <p className="text-sm text-[#8FA39A] leading-[1.75]">{card.body}</p>
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#2BE0B0] hover:text-[#F2F6F4] transition-colors cursor-none"
                      >
                        {card.cta}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-40 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-6 sm:px-8 md:px-16 text-center">
            <p className="label-mono mb-8">Apply now</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[#F2F6F4] leading-[1.08] max-w-2xl mx-auto mb-12">
              Ready to build the next African healthtech company?
            </h2>
            <MagneticButton className="inline-block">
              <Link
                href="/founders#apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase cursor-none hover:shadow-[0_0_30px_rgba(227,168,59,0.5)] transition-all duration-300"
              >
                <TextScramble text="APPLY TO COHORT ONE" />
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

