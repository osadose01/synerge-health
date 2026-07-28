import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Studio Services — Synerge Health",
  description:
    "Explore Synerge Health's 3 core service pillars: Strategic Guidance, Operational Support, and Venture Funding.",
};

const SERVICES = [
  {
    id: "strategy",
    num: "01",
    title: "Strategic Guidance",
    summary:
      "Tailored business models and clinical pathways built for the real constraints of African healthcare markets.",
    details: [
      "Market opportunity validation & sizing",
      "Regulatory pathway mapping & compliance",
      "Unit economics & pricing architecture",
      "Clinical workflow integration strategies",
    ],
  },
  {
    id: "operations",
    num: "02",
    title: "Operational Support",
    summary:
      "Embedded operating partners who execute hiring, tech architecture, legal, and finance — so founders can focus on product and patients.",
    details: [
      "Technical architecture & HIPAA/NDPR security",
      "Executive recruitment & talent pipeline",
      "Legal entity structuring & IP protection",
      "Financial planning & accounting infrastructure",
    ],
  },
  {
    id: "funding",
    num: "03",
    title: "Venture Funding",
    summary:
      "Institutional seed capital paired with warm introductions to international syndicates and DFI networks.",
    details: [
      "Initial seed & pre-seed capital cheques",
      "Follow-on syndicate introductions",
      "Data room preparation & pitch coaching",
      "Cap table & investor relations management",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Studio Services"
          title="End-to-end support for venture success."
          description="We provide founders with the capital, domain expertise, and operational muscle needed to build resilient healthcare companies from ground zero."
        />

        {/* Services list */}
        <section className="bg-[#060B09]">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`py-24 md:py-32 border-t border-[rgba(43,224,176,0.06)] scroll-mt-32 ${
                i % 2 === 1 ? "bg-[#0D1815]" : "bg-[#060B09]"
              }`}
            >
              <div className="container mx-auto px-8 md:px-16">
                <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
                  <p className="label-mono">{service.num}</p>
                  <div>
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F2F6F4] leading-[1.1] mb-8">
                      {service.title}
                    </h2>
                    <p className="text-base text-[#8FA39A] leading-[1.8] max-w-lg mb-12">
                      {service.summary}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                      {service.details.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <div className="w-1 h-1 rounded-full bg-[#2BE0B0] mt-2 shrink-0" />
                          <span className="text-sm text-[#C8D8D2]">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/founders#apply"
                      className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-[#2BE0B0] hover:text-[#F2F6F4] transition-colors cursor-none"
                    >
                      Apply for this support
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
