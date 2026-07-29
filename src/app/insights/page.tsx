"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowUpRight, X, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { ARTICLES, type Article } from "@/data/articles";

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
          description="Market intelligence, clinical field notes, and venture building research from the Synerge Health team."
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
