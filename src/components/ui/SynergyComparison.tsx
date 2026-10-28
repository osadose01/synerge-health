"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const STUDIO_PILLARS = [
  {
    num: "01",
    title: "Venture exploration",
    subtitle: "Problem & market context",
    body: "Explore customer needs, care workflows, market assumptions, and relevant regulatory questions.",
    synergyOutput: "Understand the problem and context →",
  },
  {
    num: "02",
    title: "Product & operations",
    subtitle: "Company building",
    body: "Collaborate on product development, team needs, and operating plans.",
    synergyOutput: "Build and test an appropriate approach →",
  },
  {
    num: "03",
    title: "Partnerships & capital",
    subtitle: "Routes to market",
    body: "Develop partnership plans and prepare financing materials for investor conversations.",
    synergyOutput: "Plan next steps",
  },
];

export function SynergyComparison() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <section className="py-36 bg-[#0A120F] border-t border-white/[0.08] relative overflow-hidden">
      <div className="container mx-auto px-8 sm:px-12 md:px-16 relative z-10">
        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8FAFC] leading-[1.08]">
            The studio brings <br className="hidden sm:inline" />
            <span className="text-[#2BE0B0]">complementary support.</span>
          </h2>
          <p className="text-base text-[#C2D1CB] leading-[1.8] max-w-2xl">
            Synerge partners with founders on strategy, product development, and execution. Each engagement has a scope agreed with the founding team.
          </p>
        </div>

        {/* ── 1. INTERLOCKING STUDIO PIPELINE (01 → 02 → 03) ────────────── */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-[#F8FAFC]">
              Studio support areas
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 relative">
            {STUDIO_PILLARS.map((pillar, i) => {
              const isHovered = activePillar === i;
              const isConnected = activePillar !== null && i >= activePillar;

              return (
                <div key={pillar.num} className="relative flex flex-col">
                  {/* Card box */}
                  <div
                    onMouseEnter={() => setActivePillar(i)}
                    onMouseLeave={() => setActivePillar(null)}
                    className={`h-full rounded-2xl border p-8 transition-all duration-500 relative overflow-hidden bg-[#060B09] flex flex-col justify-between ${
                      isHovered
                        ? "border-[#2BE0B0] shadow-[0_0_30px_rgba(43,224,176,0.15)]"
                        : isConnected
                        ? "border-white/[0.25]"
                        : "border-white/[0.08] hover:border-white/[0.2]"
                    }`}
                  >
                    {/* Top indicator bar */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded ${
                          isHovered
                            ? "bg-[#2BE0B0] text-[#060B09]"
                            : "bg-white/[0.06] text-[#2BE0B0]"
                        }`}
                      >
                        {pillar.num}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider uppercase text-[#A5B8B0]">
                        {pillar.subtitle}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-display font-semibold text-xl text-[#F8FAFC]">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-[#C2D1CB] leading-[1.8]">{pillar.body}</p>
                    </div>

                    {/* Synergy conduit output footer */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-wider text-[#E3A83B]">
                        {pillar.synergyOutput}
                      </span>
                    </div>

                    {/* Hover pulse beam */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2BE0B0] via-[#E3A83B] to-[#2BE0B0] transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>

                  {/* Interlocking Arrow Conduit between cards on Desktop */}
                  {i < 2 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 rounded-full bg-[#0D1815] border border-white/[0.18] text-[#2BE0B0] shadow-md">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
