"use client";

import { Circle } from "lucide-react";

const COMPARISON_ROWS = [
  {
    metric: "Problem validation",
    solo: "Founder-led customer and market discovery",
    studio: "Collaboration on research and testing",
  },
  {
    metric: "Regulatory & Compliance",
    solo: "Identify and engage relevant specialists",
    studio: "Map questions and coordinate appropriate expertise",
  },
  {
    metric: "Team & Execution",
    solo: "Build capabilities independently or with chosen partners",
    studio: "Support with product and company-building needs",
  },
  {
    metric: "Hospital & Payer Access",
    solo: "Develop relationships with relevant providers and partners",
    studio: "Hospital and payer partnership planning",
  },
];

export function FounderComparisonMatrix() {
  return (
    <section className="py-36 bg-[#060B09] border-t border-white/[0.08] relative overflow-hidden">
      <div className="container mx-auto px-8 sm:px-12 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="label-mono mb-4">Ways to build</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
            Studio partnership areas
          </h2>
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-3xl border border-white/[0.12] bg-[#060B09] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Header bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/[0.12] bg-[#0D1613]">
            <div className="md:col-span-4 p-6 md:p-8 flex items-center">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#F8FAFC] font-bold">
                Area
              </span>
            </div>
            <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/[0.08] flex items-center">
              <span className="font-mono text-xs tracking-wider uppercase text-[#A5B8B0]">
                Independent founder-led
              </span>
            </div>
            <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/[0.08] bg-white/[0.03] flex items-center">
              <span className="font-mono text-xs tracking-wider uppercase text-[#2BE0B0] font-bold">
                Studio collaboration
              </span>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="divide-y divide-white/[0.08]">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.metric}
                className="grid grid-cols-1 md:grid-cols-12 hover:bg-white/[0.02] transition-colors"
              >
                {/* Metric name */}
                <div className="md:col-span-4 p-6 md:p-8 flex items-center">
                  <span className="font-display font-semibold text-sm sm:text-base text-[#F8FAFC]">
                    {row.metric}
                  </span>
                </div>

                {/* Solo Founder column */}
                <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/[0.08] flex items-start gap-3">
                  <Circle aria-hidden="true" className="w-3 h-3 text-[#A5B8B0] shrink-0 mt-1 opacity-70" />
                  <span className="text-sm text-[#C2D1CB] leading-relaxed">
                    {row.solo}
                  </span>
                </div>

                {/* Synerge Studio column */}
                <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/[0.08] bg-white/[0.02] flex items-start gap-3">
                  <Circle aria-hidden="true" className="w-3 h-3 text-[#2BE0B0] shrink-0 mt-1" />
                  <span className="text-sm text-[#F8FAFC] font-medium leading-relaxed">
                    {row.studio}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
