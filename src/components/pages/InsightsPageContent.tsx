"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowUpRight, Search, X } from "lucide-react";
import { ARTICLES } from "@/data/articles";

export function InsightsPageContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(
    () => ["All", ...new Set(ARTICLES.map((article) => article.category))],
    [],
  );

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesQuery =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.snippet.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Synerge Insights"
        title="Insights on healthtech and venture building."
        description="Short perspectives from the Synerge Health team on healthcare, technology, and venture building."
      />

      <section className="py-16 md:py-24 bg-[#060B09] border-t border-white/[0.08]">
        <div className="container mx-auto px-6 sm:px-8 md:px-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles by category">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-[#2BE0B0] text-[#060B09] font-bold shadow-[0_0_20px_rgba(43,224,176,0.3)]"
                        : "bg-[#0D1815] text-[#8FA39A] border border-white/[0.08] hover:border-[#2BE0B0]/40 hover:text-[#F8FAFC]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search aria-hidden="true" className="w-4 h-4 text-[#8FA39A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <label htmlFor="insights-search" className="sr-only">Search articles</label>
              <input
                id="insights-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full bg-[#0D1815] border border-white/[0.1] rounded-full pl-10 pr-10 py-2 text-xs text-[#F8FAFC] focus:border-[#2BE0B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5FF5CC] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA39A] hover:text-[#F8FAFC]"
                >
                  <X aria-hidden="true" className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"} found.
          </p>
          <div className="w-full">
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="label-mono">No matching articles found</p>
                <p className="text-xs text-[#8FA39A]">Try adjusting your search or selecting “All” categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.08]">
                {filteredArticles.map((article) => (
                  <article key={article.slug} className="border-r border-b border-white/[0.08]">
                    <a
                      href={`/insights/${article.slug}/`}
                      className="group flex h-full flex-col justify-between min-h-[280px] p-7 bg-[#0D1815] hover:bg-[#13231F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2BE0B0] transition-colors relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A5B8B0] group-hover:text-[#2BE0B0] transition-colors">
                          {article.category}
                        </span>
                        <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-[#8FA39A] group-hover:text-[#2BE0B0] transition-colors" />
                      </div>

                      <div className="space-y-3 my-6">
                        <h2 className="font-display font-semibold text-base sm:text-lg text-[#F2F6F4] group-hover:text-[#2BE0B0] transition-colors leading-[1.35]">
                          {article.title}
                        </h2>
                        <p className="text-xs text-[#8FA39A] leading-relaxed">{article.snippet}</p>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06] text-xs text-[#8FA39A]">
                        <time>{article.date}</time>
                        <span className="font-mono text-[10px]">{article.readTime}</span>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
