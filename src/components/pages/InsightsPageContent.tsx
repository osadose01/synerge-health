"use client";

import { useState, useEffect, useMemo } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowUpRight, X, BookOpen, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ARTICLES, type Article } from "@/data/articles";

export function InsightsPageContent() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    ARTICLES.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCat = activeCategory === "All" || article.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q) ||
        article.snippet.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArticle(null);
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
    <main className="flex-1">
      <PageHero
        eyebrow="Synerge Insights"
        title="Market intelligence & clinical field notes."
        description="Market intelligence, clinical field notes, and venture building research from the Synerge Health team."
      />

      <section className="py-16 md:py-24 bg-[#060B09] border-t border-white/[0.08]">
        <div className="container mx-auto px-6 sm:px-8 md:px-16">
          
          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/[0.08]">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-[#2BE0B0] text-[#060B09] font-bold shadow-[0_0_20px_rgba(43,224,176,0.3)]"
                        : "bg-[#0D1815] text-[#8FA39A] border border-white/[0.08] hover:border-[#2BE0B0]/40 hover:text-[#F8FAFC]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Instant Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#8FA39A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search research & thesis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0D1815] border border-white/[0.1] rounded-full pl-10 pr-4 py-2 text-xs text-[#F8FAFC] placeholder-[#647A70] focus:outline-none focus:border-[#2BE0B0] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA39A] hover:text-[#F8FAFC]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Grid of Articles */}
          <div className="w-full">
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="label-mono">No matching dispatches found</p>
                <p className="text-xs text-[#8FA39A]">Try adjusting your search query or selecting &quot;All&quot; categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.08]">
                {filteredArticles.map((article) => (
                  <article
                    key={article.slug}
                    onClick={() => setSelectedArticle(article)}
                    className="group border-r border-b border-white/[0.08] p-7 flex flex-col justify-between min-h-[240px] bg-[#0D1815] hover:bg-[#13231F] transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A5B8B0] group-hover:text-[#2BE0B0] transition-colors">
                        {article.category}
                      </span>
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#2BE0B0] group-hover:bg-[#2BE0B0]/10 transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#8FA39A] group-hover:text-[#2BE0B0] transition-colors" />
                      </div>
                    </div>

                    <h3 className="font-display font-semibold text-base sm:text-lg text-[#F2F6F4] group-hover:text-[#2BE0B0] transition-colors leading-[1.35] my-4">
                      {article.title}
                    </h3>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs text-[#8FA39A]">
                      <span>{article.author}</span>
                      <span className="font-mono text-[10px]">{article.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Detail Modal Island */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0A120F] border border-[#2BE0B0]/30 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(43,224,176,0.15)] z-10 space-y-8"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#2BE0B0]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#2BE0B0]">
                    {selectedArticle.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full border border-white/10 hover:border-[#2BE0B0] text-[#C2D1CB] hover:text-[#2BE0B0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#F8FAFC]">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-xs font-mono text-[#8FA39A]">
                  <span>By {selectedArticle.author} ({selectedArticle.role})</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime} read</span>
                </div>
              </div>

              <div className="text-sm sm:text-base text-[#C2D1CB] leading-[1.9] space-y-6 pt-4 border-t border-white/[0.08]">
                <p className="italic text-[#E3A83B] border-l-2 border-[#E3A83B] pl-4 py-1">
                  &ldquo;{selectedArticle.quote}&rdquo;
                </p>
                {selectedArticle.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                {selectedArticle.takeaways && selectedArticle.takeaways.length > 0 && (
                  <div className="p-6 rounded-xl bg-[#0D1815] border border-[rgba(43,224,176,0.15)] space-y-3 mt-6">
                    <p className="font-mono text-xs text-[#2BE0B0] font-semibold uppercase tracking-wider">
                      Key Takeaways
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#8FA39A]">
                      {selectedArticle.takeaways.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#2BE0B0] mt-0.5">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
