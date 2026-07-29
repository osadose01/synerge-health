"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowUpRight, X, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  date: string;
  author: string;
  role: string;
  category: string;
  readTime: string;
  snippet: string;
  quote: string;
  paragraphs: string[];
  takeaways: string[];
}

const ARTICLES: Article[] = [
  {
    slug: "leapfrogging-legacy-infrastructure",
    title: "Leapfrogging Legacy Infrastructure: Why African Healthtech is Built Different",
    date: "July 20, 2026",
    author: "Ed Osadolor",
    role: "Chief Executive Officer & Studio Founder",
    category: "Venture Thesis",
    readTime: "5 min read",
    snippet:
      "Sub-Saharan Africa carries 24% of global disease burden. Here is how mobile-first clinical platforms are leapfrogging brick-and-mortar hospitals.",
    quote:
      "When you lack legacy hospital systems built in the 1980s, you don't build faster electronic health records—you build decentralized, patient-centered care networks from day one.",
    paragraphs: [
      "While Western digital health ecosystems spend billions attempting to integrate fragmented, legacy electronic medical record (EMR) architectures, African healthtech founders operate on a fundamentally different canvas. In Sub-Saharan Africa, where healthcare infrastructure represents less than 2% of global clinical assets despite carrying over 22% of the world's disease burden, digital platforms do not merely supplement hospitals—they often serve as the primary point of care.",
      "This structural reality forces a discipline of simplicity and accessibility. Asynchronous clinical consultations delivered over lightweight web interfaces and messaging protocols consistently achieve 10x lower patient acquisition costs compared to traditional clinic walk-ins. By designing around intermittent data connectivity and mobile money payment rails, these ventures remove the friction that traditionally excludes rural and peri-urban populations.",
      "At Synerge Health, our co-founding model centers on this leapfrog advantage. We pair African clinicians who understand local patient behaviors with venture-building operators to construct platforms that scale regionally without waiting for brick-and-mortar hospital expansion."
    ],
    takeaways: [
      "Mobile-first clinical interfaces bypass legacy hospital bottlenecks entirely.",
      "Asynchronous triage over low-bandwidth channels reduces patient acquisition costs by up to 90%.",
      "Studio co-founding embeds regulatory and distribution expertise into the architecture from inception."
    ]
  },
  {
    slug: "unit-economics-in-digital-pharmacy",
    title: "Unit Economics in Digital Pharmacy: Lessons from 100+ Distribution Pilots",
    date: "June 14, 2026",
    author: "Sama Edi",
    role: "Chief Financial Officer",
    category: "Operations",
    readTime: "7 min read",
    snippet:
      "Distribution in fragmented African pharmaceutical markets requires localized supply-chain tech rather than Western e-commerce blueprints.",
    quote:
      "Profitability in African pharmaceutical distribution is won or lost in the last mile of working capital and cold-chain integrity.",
    paragraphs: [
      "Over 70% of medicines dispensed across Sub-Saharan Africa reach patients through independent community pharmacies and patent medicine vendors (PMVs). Yet these critical frontline distributors face chronic stockouts, predatory wholesale markup tiers, and the constant threat of counterfeit drug infiltration. Attempting to solve this with conventional Western e-commerce delivery models quickly collapses under unit economics.",
      "Through more than 100 studio distribution pilots, we have identified that sustainable pharmacy tech requires two integrated pillars: predictive inventory replenishment and embedded working capital financing. When a community pharmacy can order verified formulary stock with 24-hour fulfillment and automated 14-day credit terms, stockouts drop by 65% while pharmacy gross margins expand.",
      "Our financial modeling across portfolio ventures demonstrates that combining B2B supply-chain software with quality-verified procurement turns inventory four times faster than legacy wholesalers, establishing a defensible, cash-flow-positive distribution footprint."
    ],
    takeaways: [
      "Independent community pharmacies and PMVs control 70%+ of medicine dispensing.",
      "Embedded working capital financing is essential to eliminate stockouts and counterfeit risks.",
      "Tech-enabled B2B procurement accelerates inventory turns 4x over traditional wholesalers."
    ]
  },
  {
    slug: "ai-in-african-clinical-diagnostics",
    title: "AI in African Clinical Diagnostics: Regulatory Pathways & Data Privacy",
    date: "May 28, 2026",
    author: "Chen Zui",
    role: "Head of Clinical AI & Regulatory",
    category: "Technology & AI",
    readTime: "6 min read",
    snippet:
      "Navigating regional data protection frameworks (NDPR, POPIA) while deploying medical imaging models in rural clinics.",
    quote:
      "Diagnostic algorithms are only as ethical and accurate as the populations they are trained on—data sovereignty is foundational to clinical trust.",
    paragraphs: [
      "Sub-Saharan Africa faces a severe shortage of diagnostic imaging specialists, averaging fewer than 0.5 radiologists per 100,000 people in major markets. Edge-deployed artificial intelligence models capable of interpreting X-ray, ultrasound, and retinal scans represent a transformative opportunity to democratize early diagnosis in rural and underserved clinics.",
      "However, importing algorithmic models trained exclusively on North American or European patient datasets introduces significant diagnostic bias. Furthermore, deploying clinical AI across African jurisdictions requires rigorous compliance with evolving regional data protection laws, including Nigeria's NDPR, South Africa's POPIA, and Kenya's Data Protection Act.",
      "Synerge Health works directly with healthtech founders to establish on-continent data localization pipelines and edge-inferencing protocols. By ensuring that patient data never leaves the regulatory jurisdiction while training models on diverse African clinical cohorts, our ventures achieve both superior diagnostic precision and regulatory acceleration."
    ],
    takeaways: [
      "Edge-deployed AI models bridge the acute shortage of radiologists in rural healthcare settings.",
      "Training algorithms on local clinical datasets eliminates Western demographic bias.",
      "On-continent data sovereignty pipelines accelerate regulatory approvals under NDPR and POPIA."
    ]
  },
  {
    slug: "scaling-hospital-integrated-fintech",
    title: "Scaling Hospital-Integrated Financing: Unlocking Patient Access Across 15+ Markets",
    date: "May 10, 2026",
    author: "Dr. Amaechi Ndem",
    role: "Head of Venture Strategy & Health Economics",
    category: "Venture Building",
    readTime: "5 min read",
    snippet:
      "How embedded point-of-care micro-financing rails eliminate out-of-pocket medical insolvency across African hospital networks.",
    quote:
      "Over 80% of African healthcare expenses are paid cash out-of-pocket at the point of care—financial rails are fundamentally clinical care rails.",
    paragraphs: [
      "Across Sub-Saharan Africa, over 80% of personal health expenditures are paid entirely out-of-pocket at the moment of emergency or hospital admission. When unexpected medical crises strike, families are forced into catastrophic out-of-pocket payments or deferred treatment.",
      "By embedding point-of-care micro-financing and employer-backed digital health insurance directly into hospital admission workflows, Synerge Health ventures turn unpredictable emergency expenses into manageable, automated repayment structures.",
      "Our hospital-integrated financial infrastructure yields a 40% reduction in patient admission delays while increasing hospital bill collection rates by over 90%, proving that health economics and clinical access scale hand in hand."
    ],
    takeaways: [
      "Out-of-pocket cash payments account for 80%+ of healthcare expenditures across Sub-Saharan Africa.",
      "Point-of-care embedded financing reduces hospital admission delays by over 40%.",
      "Automated bill settlement improves hospital revenue collection rates above 90%."
    ]
  }
];

export default function InsightsPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedArticle(null);
      }
    };
    if (selectedArticle) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedArticle]);

  return (
    <>
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Synerge Insights"
        />

        <section className="py-20 md:py-32 bg-[#060B09] border-t border-white/[0.08]">
          <div className="container mx-auto px-6 sm:px-8 md:px-16">
            <div className="w-full">
              {/* 4-Column Bordered Newsroom Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.08]">
                {ARTICLES.map((article) => (
                  <article
                    key={article.slug}
                    onClick={() => setSelectedArticle(article)}
                    className="group border-r border-b border-white/[0.08] p-7 flex flex-col justify-between min-h-[230px] bg-[#0D1815] hover:bg-[#13231F] transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    {/* Top Row: Category Tag + Circular Arrow Button */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A5B8B0] group-hover:text-[#2BE0B0] transition-colors">
                        {article.category}
                      </span>
                      
                      {/* Circular Arrow Button Badge */}
                      <div className="w-9 h-9 rounded-full border border-[rgba(43,224,176,0.2)] bg-[#060B09] flex items-center justify-center text-[#8FA39A] group-hover:border-[#2BE0B0] group-hover:text-[#2BE0B0] group-hover:scale-105 transition-all shrink-0">
                        <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Bottom: Article Headline */}
                    <div className="mt-8 space-y-2">
                      <h3 className="font-display font-semibold text-base sm:text-lg text-[#F8FAFC] group-hover:text-[#2BE0B0] transition-colors leading-[1.35] line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="font-mono text-[11px] text-[#8FA39A] pt-1">
                        {article.date}
                      </p>
                    </div>

                    {/* Hover subtle glow beam */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2BE0B0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Interactive Full Post Reader Modal ──────────────────────────────── */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 bg-[#060B09]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0D1815] border border-[rgba(43,224,176,0.2)] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] text-left space-y-8"
            >
              {/* Modal sticky top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(43,224,176,0.1)]">
                <div className="flex items-center gap-2 text-[#2BE0B0] font-mono text-xs tracking-widest uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>{selectedArticle.category}</span>
                  <span className="text-[#8FA39A]">·</span>
                  <span className="text-[#8FA39A]">{selectedArticle.readTime}</span>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  aria-label="Close article reader"
                  className="w-9 h-9 rounded-full border border-[rgba(43,224,176,0.2)] bg-[#060B09] flex items-center justify-center text-[#8FA39A] hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Author */}
              <div className="space-y-4">
                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#F2F6F4] leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#8FA39A]">
                  <span className="font-semibold text-[#F2F6F4]">{selectedArticle.author}</span>
                  <span>·</span>
                  <span>{selectedArticle.role}</span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                </div>
              </div>

              {/* Quote highlight box */}
              <div className="border-l-2 border-[#2BE0B0] bg-[#060B09] p-5 sm:p-6 rounded-r-2xl">
                <p className="font-serif italic text-base sm:text-lg text-[#F2F6F4] leading-relaxed">
                  &ldquo;{selectedArticle.quote}&rdquo;
                </p>
              </div>

              {/* Article body paragraphs */}
              <div className="space-y-6 text-sm sm:text-base text-[#8FA39A] leading-[1.8]">
                {selectedArticle.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Key takeaways box */}
              <div className="bg-[#060B09] border border-[rgba(43,224,176,0.15)] rounded-2xl p-6 space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#2BE0B0]">
                  Key Clinical & Venture Takeaways
                </h4>
                <ul className="space-y-2.5">
                  {selectedArticle.takeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F2F6F4]">
                      <span className="text-[#2BE0B0] font-mono shrink-0">0{idx + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 border-t border-[rgba(43,224,176,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-mono text-xs text-[#8FA39A]">
                  Interested in co-founding a venture in this vertical?
                </p>
                <Link
                  href="/founders#apply"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(227,168,59,0.4)] transition-all"
                >
                  Apply As A Founder
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
