import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Insights & Industry Analysis — Synerge Health",
  description: "Perspectives on African healthtech, clinical business models, and regulatory updates.",
};

const ARTICLES = [
  {
    title: "Leapfrogging Legacy Infrastructure: Why African Healthtech is Built Different",
    date: "July 20, 2026",
    author: "Ed Osadolor",
    category: "Venture Thesis",
    readTime: "5 min read",
    snippet:
      "Sub-Saharan Africa carries 24% of global disease burden. Here is how mobile-first clinical platforms are leapfrogging brick-and-mortar hospitals.",
  },
  {
    title: "Unit Economics in Digital Pharmacy: Lessons from 100+ Distribution Pilots",
    date: "June 14, 2026",
    author: "Sama Edi",
    category: "Operations",
    readTime: "7 min read",
    snippet:
      "Distribution in fragmented African pharmaceutical markets requires localized supply-chain tech rather than Western e-commerce blueprints.",
  },
  {
    title: "AI in African Clinical Diagnostics: Regulatory Pathways & Data Privacy",
    date: "May 28, 2026",
    author: "Chen Zui",
    category: "Technology & AI",
    readTime: "6 min read",
    snippet:
      "Navigating regional data protection frameworks (NDPR, POPIA) while deploying medical imaging models in rural clinics.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Studio Insights"
          title="Healthtech perspectives & market intelligence."
          description="Analysis, operational blueprints, and market insights curated by the Synerge Health studio team."
        />

        <section className="py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Latest Articles</p>
              <div className="space-y-0 border border-[rgba(43,224,176,0.12)] rounded-2xl overflow-hidden divide-y divide-[rgba(43,224,176,0.08)] bg-[#0D1815]">
                {ARTICLES.map((article) => (
                  <article
                    key={article.title}
                    className="group p-8 flex flex-col sm:flex-row gap-6 items-start hover:bg-[rgba(43,224,176,0.03)] transition-colors cursor-none"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#2BE0B0]">
                          {article.category}
                        </span>
                        <span className="text-[#8FA39A]">·</span>
                        <span className="text-[11px] font-mono text-[#8FA39A]">{article.readTime}</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-[#F2F6F4] leading-snug group-hover:text-[#2BE0B0] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#8FA39A] leading-[1.75]">{article.snippet}</p>
                      <div className="flex items-center gap-4 pt-1">
                        <span className="text-xs text-[#8FA39A]">{article.author}</span>
                        <span className="text-[#8FA39A]">·</span>
                        <span className="text-xs text-[#8FA39A]">{article.date}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#8FA39A] group-hover:text-[#2BE0B0] transition-colors shrink-0 mt-1" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

