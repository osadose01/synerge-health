import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { InvestorForm } from "@/components/forms/InvestorForm";

export const metadata = {
  title: "Investors & Partners — Synerge Health",
  description: "Invest alongside Synerge Health in high-growth African digital health startups.",
};

const THESIS_ITEMS = [
  {
    title: "Pre-Cleared Compliance",
    desc: "We navigate complex multi-country regulatory pathways—pre-clearing approvals with national health ministries, pharmacy boards, and data protection frameworks (NDPR/POPIA) before seed capital is deployed.",
  },
  {
    title: "Interrelated Ecosystem",
    desc: "Standalone health apps stall at national borders. Our ventures plug directly into established African hospital networks, insurance pools, and informal pharmacy supply chains across regional trade blocs.",
  },
  {
    title: "Out-of-Pocket Realities",
    desc: "Built from day one for out-of-pocket cash payments, mobile money rails, and intermittent bandwidth—guaranteeing cash-flow positivity without relying on Western SaaS assumptions.",
  },
  {
    title: "In-The-Trenches Execution",
    desc: "We pair African clinicians with battle-tested venture builders inside the studio, retaining active operational oversight to protect capital efficiency, patient safety, and scale.",
  },
];

const STATS = [
  { value: "$1M", label: "Initial Venture Fund" },
  { value: "3×", label: "Target 5-Year ROI" },
  { value: "100%", label: "HealthTech Focus" },
];

export default function InvestorsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Investors & Partners"
          description="We partner with institutional VCs, DFIs, family offices, and healthcare corporates to syndicate capital into studio-built ventures."
        />

        {/* Investment thesis */}
        <section className="py-28 md:py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-6 sm:px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24 items-start">
              <p className="label-mono">Why Invest</p>
              <div>
                <div className="grid sm:grid-cols-2 gap-0 border border-[rgba(43,224,176,0.12)] rounded-2xl overflow-hidden bg-[#0D1815]">
                  {THESIS_ITEMS.map((item, i) => (
                    <div
                      key={item.title}
                      className={`p-8 space-y-3 ${
                        i % 2 === 0 ? "border-r border-[rgba(43,224,176,0.12)]" : ""
                      } ${i < 2 ? "border-b border-[rgba(43,224,176,0.12)]" : ""}`}
                    >
                      <h3 className="font-display font-semibold text-base text-[#F2F6F4]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#8FA39A] leading-[1.75]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-24 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-6 sm:px-8 md:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 text-[#F2F6F4]">
              {STATS.map((stat) => (
                <div key={stat.value} className="space-y-2">
                  <div className="font-display font-bold text-5xl md:text-6xl text-[#2BE0B0]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-[#C2D1CB]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section className="py-28 md:py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-6 sm:px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24 items-start">
              <p className="label-mono">Partner With Us</p>
              <div>
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
