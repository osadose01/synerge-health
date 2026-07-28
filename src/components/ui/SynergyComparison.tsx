"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

const STUDIO_PILLARS = [
  {
    num: "01",
    title: "Strategic Guidance",
    subtitle: "Clinical-to-Market Blueprint",
    body: "Business models, go-to-market plans, pricing strategy, and regulatory pathways custom-built for African healthcare markets.",
    synergyOutput: "Feeds validated clinical strategy into execution engine ->",
  },
  {
    num: "02",
    title: "Operational Support",
    subtitle: "Embedded Venture Builders",
    body: "Hands-on execution — hiring top talent, legal setup, and finance infrastructure — so founders focus on product and patient impact.",
    synergyOutput: "Deploys operational rails to unlock institutional capital ->",
  },
  {
    num: "03",
    title: "Capital & Networks",
    subtitle: "Seed Funding & Distribution",
    body: "Seed funding paired with warm introductions across our venture capital, hospital, and philanthropic partner network.",
    synergyOutput: "Completes the growth loop with continental distribution.",
  },
];

const COMPARISON_ROWS = [
  {
    metric: "Time to Market Validation",
    solo: "14–18 Months of trial and error",
    studio: "3–6 Months with pre-built clinical rails",
  },
  {
    metric: "Regulatory & Compliance",
    solo: "Isolated legal navigation across fragmented markets",
    studio: "Shared regulatory compliance & African health policy access",
  },
  {
    metric: "Team & Execution",
    solo: "High burn rate hiring GTM & admin infrastructure from scratch",
    studio: "Embedded engineering, GTM, and operational co-founders",
  },
  {
    metric: "Hospital & Payer Access",
    solo: "Cold outreach to hospitals, insurers, and clinical trial sites",
    studio: "Warm introductions across our hospital & philanthropic network",
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
            Why an interlocking studio model <br className="hidden sm:inline" />
            <span className="text-[#2BE0B0]">outperforms solo founding.</span>
          </h2>
          <p className="text-base text-[#C2D1CB] leading-[1.8] max-w-2xl">
            In African healthcare, isolated startups struggle against structural friction. By interlocking strategy, operational execution, and capital, Synerge Health creates an institutional velocity multiplier.
          </p>
        </div>

        {/* ── 1. INTERLOCKING STUDIO PIPELINE (01 → 02 → 03) ────────────── */}
        <div className="mb-28">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-[#F8FAFC]">
              The Studio Co-Founding Model
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

        {/* ── 2. COMPARISON MATRIX (SOLO vs STUDIO) ─────────── */}
        <div className="rounded-3xl border border-white/[0.12] bg-[#060B09] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Header bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/[0.12] bg-[#0D1613]">
            <div className="md:col-span-4 p-6 md:p-8 flex items-center">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#F8FAFC] font-bold">
                Strategic Evaluation
              </span>
            </div>
            <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/[0.08] flex items-center">
              <span className="font-mono text-xs tracking-wider uppercase text-[#A5B8B0]">
                Solo HealthTech Founder
              </span>
            </div>
            <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/[0.08] bg-white/[0.03] flex items-center">
              <span className="font-mono text-xs tracking-wider uppercase text-[#2BE0B0] font-bold">
                Synerge Studio Co-Building
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
                  <XCircle className="w-4 h-4 text-[#A5B8B0] shrink-0 mt-0.5 opacity-70" />
                  <span className="text-sm text-[#C2D1CB] leading-relaxed">
                    {row.solo}
                  </span>
                </div>

                {/* Synerge Studio column */}
                <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-white/[0.08] bg-white/[0.02] flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#2BE0B0] shrink-0 mt-0.5" />
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
