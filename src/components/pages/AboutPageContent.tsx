import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

const VALUES = [
  {
    title: "Work alongside founders",
    num: "01",
    desc: "Where a venture and agreed scope are a fit, we collaborate with founders on product, operations, and company building.",
  },
  {
    title: "Design for adoption",
    num: "02",
    desc: "We examine how a product fits real care workflows and identify its partnership, distribution, and operational requirements.",
  },
  {
    title: "Understand local context",
    num: "03",
    desc: "We consider connectivity, payment practices, clinical workflows, and applicable requirements in the markets a venture serves.",
  },
  {
    title: "Navigate complexity",
    num: "04",
    desc: "We help founders identify operational and regulatory questions early and connect them with relevant expertise.",
  },
];

export function AboutPageContent() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="About Synerge Health"
        title="Building healthcare ventures for African markets."
        description="Synerge Health is a venture studio working with founders to build healthtech and develop products and operating plans suited to each market."
      />

      <section className="py-32 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
        <div className="container mx-auto px-8 md:px-16">
          <h2 className="sr-only">Our mission and vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                body: "To help founders build healthtech around the needs of patients, care teams, and the markets they serve.",
              },
              {
                title: "Our Vision",
                body: "Healthcare services that are more accessible, better connected, and designed around the needs of patients and care teams.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="relative rounded-2xl border border-[rgba(43,224,176,0.1)] bg-[#060B09] p-8 space-y-4"
              >
                <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#2BE0B0] to-transparent" />
                <h3 className="font-display font-bold text-xl text-[#2BE0B0]">{item.title}</h3>
                <p className="text-sm text-[#8FA39A] leading-[1.8]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
        <div className="container mx-auto px-8 md:px-16">
          <p className="label-mono mb-4">Our Methodology</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-[#F2F6F4] mb-16 max-w-2xl leading-[1.1]">
            How we work with founders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <article
                key={value.num}
                className="p-8 rounded-2xl border border-[rgba(43,224,176,0.1)] bg-[#0D1815] flex flex-col justify-between space-y-8 group hover:border-[#2BE0B0]/40 transition-colors"
              >
                <span className="font-mono text-xs text-[#2BE0B0] font-semibold">{value.num}</span>
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-lg text-[#F8FAFC] group-hover:text-[#2BE0B0] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-xs text-[#8FA39A] leading-[1.8]">{value.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)] text-center">
        <div className="container mx-auto px-8 md:px-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-[#F8FAFC] mb-8">
            Partner with Synerge Health
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/founders#apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase hover:shadow-[0_0_40px_rgba(227,168,59,0.5)] transition-all duration-300"
            >
              APPLY AS A FOUNDER <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/investors"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.18] text-[#C2D1CB] font-mono text-xs tracking-[0.1em] uppercase hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
            >
              INVESTOR ENQUIRIES
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
