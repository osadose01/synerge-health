import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { FounderComparisonMatrix } from "@/components/ui/FounderComparisonMatrix";

export const metadata = {
  title: "Founder Studio Programme — Synerge Health",
  description: "Bring your healthtech insight. Synerge Health provides capital, operators, and regulatory support to build your company.",
};

const FAQS = [
  {
    q: "How much equity does Synerge Health take?",
    a: "Equity terms are negotiated per company based on stage, seed capital injected, and studio operator involvement. Terms are transparently agreed before any term sheet is signed.",
  },
  {
    q: "Do I need a co-founder or an existing MVP?",
    a: "No. We accept solo founders and pre-product applicants. What matters most is a validated clinical or market insight and your ability to execute.",
  },
  {
    q: "Where do founders need to be based?",
    a: "We prioritize founders building for Sub-Saharan African markets. You do not need to relocate, but active in-market presence during pilot launch is expected.",
  },
  {
    q: "How long does the application process take?",
    a: "Our selection committee reviews applications on a 2-week rolling window. Successful applicants are invited to a 30-minute founder interview.",
  },
];

export default function FoundersPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Founder Programme"
          description="The Synerge Health founder programme pairs early-stage healthtech innovators with studio capital, embedded operators, and an extensive healthcare network."
        />

        {/* Programme Journey */}
        <section className="py-28 md:py-40 bg-[#060B09] border-t border-white/[0.08]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24 items-start">
              <p className="label-mono">Programme Journey</p>
              <div>
                <div className="space-y-0 border border-white/[0.12] rounded-2xl overflow-hidden bg-[#0D1815]">
                  {[
                    { step: "01", phase: "Intake", desc: "Problem deep-dive & founder alignment. We spend time understanding your insight, market, and motivation before anything else." },
                    { step: "02", phase: "Validation", desc: "Unit economics & customer discovery. Six weeks of structured experimentation to stress-test assumptions." },
                    { step: "03", phase: "Term Sheet", desc: "Seed investment & equity finalised. Transparent terms, agreed together, no surprises." },
                    { step: "04", phase: "Build", desc: "MVP development with studio engineers embedded alongside your team." },
                    { step: "05", phase: "Launch", desc: "First provider pilots & go-to-market. We open our hospital and clinic network for your first commercial pilots." },
                    { step: "06", phase: "Scale", desc: "Follow-on funding & regional growth. We help you raise the next round and expand beyond your first market." },
                  ].map((item, i) => (
                    <div
                      key={item.step}
                      className={`flex gap-8 p-8 ${i < 5 ? "border-b border-white/[0.08]" : ""}`}
                    >
                      <span className="font-mono text-[11px] tracking-widest text-[#2BE0B0] pt-0.5 shrink-0">
                        {item.step}
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-display font-semibold text-base text-[#F8FAFC]">{item.phase}</h3>
                        <p className="text-sm text-[#C2D1CB] leading-[1.75]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Evaluation Matrix (Solo vs Studio) */}
        <FounderComparisonMatrix />

        {/* FAQs */}
        <section className="py-28 md:py-40 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24 items-start">
              <p className="label-mono">FAQs</p>
              <div>
                <div className="border border-[rgba(43,224,176,0.12)] rounded-2xl overflow-hidden bg-[#060B09]">
                  {FAQS.map((faq, idx) => (
                    <AccordionItem key={faq.q} question={faq.q} answer={faq.a} defaultOpen={idx === 0} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-28 md:py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)] scroll-mt-24">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24 items-start">
              <p className="label-mono">Apply</p>
              <div>
                <ApplyForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
