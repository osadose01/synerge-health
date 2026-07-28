import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "About Us — Synerge Health",
  description: "Learn about Synerge Health's mission, values, and leadership team building African healthtech.",
};

const TEAM_MEMBERS = [
  {
    initials: "EO",
    name: "Ed Osadolor",
    role: "Chief Executive Officer",
    bio: "Clinician and digital health leader with executive background across health tech startups and clinical operations.",
  },
  {
    initials: "EU",
    name: "Ezi Ud",
    role: "Chief Operating Officer",
    bio: "Operational strategist specializing in healthcare supply chain, pharmacy networks, and scale execution.",
  },
  {
    initials: "CZ",
    name: "Chen Zui",
    role: "Chief Technology Officer",
    bio: "Engineering leader with deep background in scalable cloud systems, AI data platforms, and clinical integrations.",
  },
  {
    initials: "SE",
    name: "Sama Edi",
    role: "Chief Financial Officer",
    bio: "Corporate finance executive experienced in venture structuring, cross-border capital, and portfolio governance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="About Synerge Health"
          title="We build the companies that will define African healthcare."
          description="A venture studio catalysing innovation in healthcare — giving founders the resources, expertise, and capital they need to succeed from first insight to continental scale."
        />

        {/* Mission & Vision */}
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Our Beliefs</p>
              <div className="grid sm:grid-cols-2 gap-16">
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-slate-900">Mission</h3>
                  <p className="text-slate-500 text-sm leading-[1.8]">
                    We are committed to catalysing innovation in healthcare by providing startups with the resources and expertise they need to succeed — turning clinical insight and entrepreneurial ambition into sustainable companies that save lives.
                  </p>
                </div>
                <div className="space-y-5">
                  <h3 className="font-display font-bold text-xl text-slate-900">Vision</h3>
                  <p className="text-slate-500 text-sm leading-[1.8]">
                    A thriving ecosystem of healthcare entrepreneurs equipped to tackle the continent&rsquo;s most pressing clinical challenges and improve patient outcomes across Sub-Saharan Africa and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-40 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Core Values</p>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-16">
                  What we hold
                  <br />
                  ourselves to.
                </h2>

                <div className="grid sm:grid-cols-2 gap-0 border border-slate-200 rounded-2xl overflow-hidden">
                  {[
                    {
                      title: "Patient First",
                      desc: "Every company we build is judged by whether it measurably improves patient care and access.",
                    },
                    {
                      title: "Founder Led",
                      desc: "We build alongside founders as operating partners, not passive capital sitting on the sidelines.",
                    },
                    {
                      title: "Rigorous & Honest",
                      desc: "We validate unit economics before we build, and we say so plainly when the numbers don't work.",
                    },
                    {
                      title: "Built For Africa",
                      desc: "Every business model starts from local infrastructure, regulatory, and payment realities.",
                    },
                  ].map((value, i) => (
                    <div
                      key={value.title}
                      className={`p-8 space-y-3 ${i % 2 === 0 ? "border-r border-slate-200" : ""} ${i < 2 ? "border-b border-slate-200" : ""}`}
                    >
                      <h3 className="font-heading font-semibold text-base text-slate-900">
                        {value.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-[1.75]">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-40 bg-white border-t border-slate-100">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Leadership</p>
              <div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 leading-[1.1] mb-16">
                  The team behind
                  <br />
                  the studio.
                </h2>

                <div className="grid sm:grid-cols-2 gap-0 border border-slate-200 rounded-2xl overflow-hidden">
                  {TEAM_MEMBERS.map((member, i) => (
                    <div
                      key={member.name}
                      className={`p-8 space-y-4 ${i % 2 === 0 ? "border-r border-slate-200" : ""} ${i < 2 ? "border-b border-slate-200" : ""}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center font-display font-bold text-sm text-emerald-700">
                        {member.initials}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-base text-slate-900">
                          {member.name}
                        </h3>
                        <p className="text-xs text-emerald-600 mt-0.5 font-mono tracking-wide">{member.role}</p>
                      </div>
                      <p className="text-sm text-slate-500 leading-[1.75]">{member.bio}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <Link
                    href="/founders#apply"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
                  >
                    Join the Studio as a Founder
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
