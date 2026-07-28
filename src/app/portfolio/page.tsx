import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
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
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Current Status</p>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-16">
                  Cohort One —
                  <br />
                  <span className="text-emerald-600">Applications Open.</span>
                </h2>

                <div className="grid sm:grid-cols-3 gap-0 border border-slate-200 rounded-2xl overflow-hidden">
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
                      className={`p-8 space-y-4 ${i < 2 ? "border-r border-slate-200" : ""}`}
                    >
                      <p className="label-mono text-[10px]">{card.label}</p>
                      <h3 className="font-heading font-semibold text-base text-slate-900">{card.title}</h3>
                      <p className="text-sm text-slate-500 leading-[1.75]">{card.body}</p>
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
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
        <section className="py-40 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16 text-center">
            <p className="label-mono mb-8">Apply now</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.08] max-w-2xl mx-auto mb-12">
              Ready to build the next African healthtech company?
            </h2>
            <Link
              href="/founders#apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              Apply to Cohort One
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
