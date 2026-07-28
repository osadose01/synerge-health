import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { InvestorForm } from "@/components/forms/InvestorForm";

export const metadata = {
  title: "Investors & Partners — Synerge Health",
  description: "Invest alongside Synerge Health in high-growth African digital health startups.",
};

export default function InvestorsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Investor Hub"
          title="Backing the future of African digital health."
          description="We partner with institutional VCs, DFIs, family offices, and healthcare corporates to syndicate capital into studio-built ventures."
        />

        {/* Investment thesis */}
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Why Invest</p>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-16">
                  The case for
                  <br />
                  African healthtech.
                </h2>

                <div className="grid sm:grid-cols-2 gap-0 border border-slate-200 rounded-2xl overflow-hidden">
                  {[
                    {
                      title: "De-Risked Deal Flow",
                      desc: "Every portfolio company undergoes 6 weeks of clinical & unit economics validation before seed investment is deployed.",
                    },
                    {
                      title: "High ROI Potential",
                      desc: "Targeting 3× 5-year studio returns by building scalable, asset-light healthtech platforms for underserved markets.",
                    },
                    {
                      title: "Untapped Market",
                      desc: "Sub-Saharan Africa holds 24% of global disease burden but receives under 2% of digital health capital deployed globally.",
                    },
                    {
                      title: "Hands-on Governance",
                      desc: "Studio team retains operational oversight & board seats to ensure capital efficiency and milestone accountability.",
                    },
                  ].map((item, i) => (
                    <div
                      key={item.title}
                      className={`p-8 space-y-3 ${i % 2 === 0 ? "border-r border-slate-200" : ""} ${i < 2 ? "border-b border-slate-200" : ""}`}
                    >
                      <h3 className="font-heading font-semibold text-base text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-[1.75]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-40 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 text-white">
              {[
                { value: "$1M", label: "Initial Venture Fund", sub: "Committed capital" },
                { value: "3×", label: "Target 5-Year ROI", sub: "Investment return goal" },
                { value: "100%", label: "HealthTech Focus", sub: "Pure-play digital health" },
              ].map((stat) => (
                <div key={stat.value} className="space-y-3">
                  <div className="font-display font-bold text-5xl md:text-6xl text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-300">{stat.label}</div>
                  <div className="text-xs text-slate-500 font-mono tracking-wide">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Partner With Us</p>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-4">
                  Request access to
                  <br />
                  our deal flow.
                </h2>
                <p className="text-slate-500 text-base leading-[1.75] mb-12 max-w-lg">
                  Request deal flow, cohort updates, or discuss LP / co-investment opportunities with our investment committee.
                </p>
                <InvestorForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
