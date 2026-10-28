"use client";

import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/data/articles";
import { VitalLine } from "@/components/ui/VitalLine";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";
import { NodeGraph } from "@/components/ui/NodeGraph";

// ── Studio Model Featured Graphic Headers (Large Hand-Crafted Vectors) ──
function ClipboardStrategyGraphic({ isHovered }: { isHovered: boolean }) {
  const stroke = isHovered ? "#2BE0B0" : "#E2ECE8";
  const accent = isHovered ? "#2BE0B0" : "#E3A83B";
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300">
      <rect x="4" y="4" width="16" height="18" rx="2" stroke={stroke} strokeWidth="1.6" />
      <path d="M8.5 4V2.5C8.5 2.22386 8.72386 2 9 2H15C15.2761 2 15.5 2.22386 15.5 2.5V4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="15" cy="8.5" r="1.2" stroke={accent} strokeWidth="1.4" />
      <path d="M15 6.5V7.2M15 9.8V10.5M13 8.5H13.7M16.3 8.5H17" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7.5 9L9 10.5L11.5 8" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 14L9 15.5L11.5 13" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="9.8" x2="17.5" y2="9.8" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="14.8" x2="17.5" y2="14.8" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="7.5" y1="18.8" x2="16.5" y2="18.8" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 2" strokeLinecap="round" />
    </svg>
  );
}

function OperationalEngineGraphic({ isHovered }: { isHovered: boolean }) {
  const stroke = isHovered ? "#2BE0B0" : "#E2ECE8";
  const accent = isHovered ? "#2BE0B0" : "#E3A83B";
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300">
      <circle cx="12" cy="12" r="3.2" stroke={stroke} strokeWidth="1.8" />
      <path d="M12 6.5V8M12 16V17.5M6.5 12H8M16 12H17.5M8.11 8.11L9.17 9.17M14.83 14.83L15.89 15.89M8.11 15.89L9.17 14.83M14.83 9.17L15.89 8.11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.8 12C4.8 8.02386 8.02386 4.8 12 4.8C14.8 4.8 17.2 6.36 18.3 8.6" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M15.5 8.6H18.5V5.6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.2 12C19.2 15.9761 15.9761 19.2 12 19.2C9.2 19.2 6.8 17.64 5.7 15.4" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 15.4H5.5V18.4" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NetworkEcosystemGraphic({ isHovered }: { isHovered: boolean }) {
  const stroke = isHovered ? "#2BE0B0" : "#E2ECE8";
  const accent = isHovered ? "#2BE0B0" : "#E3A83B";
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300">
      <path d="M6.5 4H17.5M8 4V2.3C8 2.13431 8.13431 2 8.3 2H15.7C15.8657 2 16 2.13431 16 2.3V4M6 7.5C5.17157 7.5 4.5 8.17157 4.5 9V20.5C4.5 21.3284 5.17157 22 6 22H18C18.8284 22 19.5 21.3284 19.5 20.5V9C19.5 8.17157 18.8284 7.5 18 7.5H6Z" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="3" x2="15" y2="3" stroke={stroke} strokeWidth="1.2" />
      <circle cx="8.5" cy="11.5" r="1.4" stroke={stroke} strokeWidth="1.4" />
      <path d="M6.8 15C6.8 13.9 7.6 13.3 8.5 13.3C9.4 13.3 10.2 13.9 10.2 15" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="15.5" cy="11.5" r="1.4" stroke={stroke} strokeWidth="1.4" />
      <path d="M13.8 15C13.8 13.9 14.6 13.3 15.5 13.3C16.4 13.3 17.2 13.9 17.2 15" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1.5" stroke={accent} strokeWidth="1.6" />
      <path d="M10 20.2C10 18.9 10.9 18.2 12 18.2C13.1 18.2 14 18.9 14 20.2" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const PILLARS = [
  {
    num: "01",
    title: "Strategic Guidance",
    body: "Explore customer needs, clinical workflows, market assumptions, and relevant regulatory questions.",
    icon: ClipboardStrategyGraphic,
  },
  {
    num: "02",
    title: "Operational Support",
    body: "Collaborate on product development, team needs, and operating plans.",
    icon: OperationalEngineGraphic,
  },
  {
    num: "03",
    title: "Capital & Networks",
    body: "Develop partnership plans and prepare financing materials for investor conversations.",
    icon: NetworkEcosystemGraphic,
  },
];

export function HomePageContent() {
  return (
    <main className="flex-1">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-32 pt-32 overflow-hidden">
        {/* Subtle institutional ambient gradient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[500px] bg-gradient-to-b from-[#1A9972]/15 via-[#2BE0B0]/5 to-transparent blur-[48px] sm:blur-[120px] pointer-events-none" />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#060B09_100%)] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            <div className="lg:col-span-7 w-full flex items-center pr-2">
              <VitalLine mode="ecg" />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-start">
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.08] tracking-tight text-[#F8FAFC]">
                Building Africa&rsquo;s <br />
                <span className="text-[#2BE0B0]">next generation</span> <br />
                of healthtech.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#C2D1CB]">
                Synerge Health is a healthtech venture studio. We work with founders to explore healthcare needs, develop products, and build companies for African markets.
              </p>
            </div>
          </div>

          <div className="pt-10 border-t border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div
            >
              <MagneticButton>
                <a
                  href="/founders#apply"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase hover:shadow-[0_0_35px_rgba(227,168,59,0.5)] transition-all duration-300"
                >
                  <TextScramble text="APPLY AS A FOUNDER" />
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticButton>
            </div>

            <div
            >
              <MagneticButton>
                <a
                  href="/investors"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.18] text-[#C2D1CB] font-mono text-xs tracking-[0.1em] uppercase hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
                >
                  INVESTOR ENQUIRIES
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDIO APPROACH ───────────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-[#0D1815] border-t border-white/[0.08]">
        <div className="container mx-auto px-6 sm:px-8 md:px-16">
          <div className="space-y-8">
            <p className="label-mono">Our approach</p>

            <div className="w-full rounded-3xl border border-[#2BE0B0]/30 bg-[#0A120F] overflow-hidden shadow-[0_0_60px_rgba(43,224,176,0.12)] relative group">
              <div className="px-6 py-4 bg-[#060B09] border-b border-white/[0.1] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C2D1CB]">
                  SYNERGE HEALTH // OUR APPROACH
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#2BE0B0] uppercase font-bold">
                    STUDIO THESIS
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-12 md:p-16 space-y-10 relative">
                <div className="absolute inset-0 bg-[radial-gradient(#2BE0B0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F8FAFC] leading-[1.25] tracking-tight relative z-10">
                  Healthcare technology works best when <span className="text-[#E3A83B]">designed for its context.</span>
                  <br />
                  <span className="text-[#2BE0B0]">Build with care systems in mind.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#C2D1CB] text-base leading-[1.8] relative z-10 pt-4 border-t border-white/[0.08]">
                  <p>
                    Healthcare markets and clinical settings differ. Product teams need to understand local workflows, infrastructure, regulation, and how patients and providers will use a service.
                  </p>
                  <p>
                    Synerge Health works with founders to understand local care systems and develop products and operating plans for their markets. We scope each collaboration with the founding team.
                  </p>
                </div>

                <div className="pt-4 relative z-10">
                  <VitalLine mode="ecg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDIO MODEL ─────────────────────────────────────────────── */}
      <section className="py-36 bg-[#060B09] border-t border-white/[0.08] relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 relative z-10">
          <div className="max-w-3xl mb-12">
            <p className="label-mono mb-4">The Synerge Model</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F8FAFC]">
              Studio collaboration areas
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
            {PILLARS.map((pillar) => {
              const isHovered = false;
              const IconGraphic = pillar.icon;

              return (
                <div key={pillar.title} className="relative flex flex-col">
                  <div
                    className={`h-full rounded-2xl border p-8 transition-all duration-500 relative overflow-hidden bg-[#0D1815] flex flex-col justify-between group ${isHovered
                        ? "border-[#2BE0B0] shadow-[0_0_35px_rgba(43,224,176,0.18)]"
                        : "border-white/[0.08] hover:border-white/[0.2]"
                      }`}
                  >
                    <div className="space-y-6">
                      <div
                        className={`w-full h-36 rounded-xl border flex items-center justify-center relative overflow-hidden transition-all duration-500 ${isHovered
                            ? "bg-gradient-to-b from-[#2BE0B0]/15 to-[#060B09] border-[#2BE0B0]/40 shadow-[0_0_25px_rgba(43,224,176,0.12)]"
                            : "bg-[#060B09]/90 border-white/10"
                          }`}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(#2BE0B0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.07]" />
                        <div className={`transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}>
                          <IconGraphic isHovered={isHovered} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-display font-semibold text-2xl text-[#F8FAFC]">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-[#C2D1CB] leading-[1.8]">{pillar.body}</p>
                      </div>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2BE0B0] via-[#E3A83B] to-[#2BE0B0] transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOCUS AREAS (node graph) ──────────────────────────────────── */}
      <section className="py-40 bg-[#0D1815] border-t border-white/[0.08]">
        <div className="container mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-24 items-start">
            <div>
              <p className="label-mono">Focus Areas</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#8FA39A]">
                Our eight areas span care delivery, health-system infrastructure, and clinical intelligence.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full flex justify-center">
                <NodeGraph />
              </div>

              <div className="hidden md:block w-full mt-12 max-w-2xl opacity-30">
                <VitalLine mode="network" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE BUILD ─────────────────────────────────────────────── */}
      <section className="py-40 bg-[#060B09] border-t border-white/[0.08]">
        <div className="container mx-auto px-8 md:px-16">
          <h2 className="label-mono mb-16">How we build</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Clinical context",
                description: "Start with the healthcare workflow, the people delivering care, and the constraints they face.",
              },
              {
                title: "Embedded execution",
                description: "Work alongside founders on product, operations, and the practical steps required to test a venture.",
              },
              {
                title: "Regional relevance",
                description: "Build for local clinical, regulatory, payment, and infrastructure realities from the outset.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="p-8 rounded-2xl border border-[rgba(43,224,176,0.12)] bg-[#0D1815] space-y-4"
              >
                <h3 className="font-display font-semibold text-xl text-[#F8FAFC]">{item.title}</h3>
                <p className="text-sm text-[#C2D1CB] leading-[1.8]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYNERGE INSIGHTS ─────────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-[#060B09] border-t border-white/[0.08]">
        <div className="container mx-auto px-6 sm:px-8 md:px-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <h2 className="label-mono">Synerge Insights</h2>
            <a
              href="/insights"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#2BE0B0] hover:text-[#5FF5CC] transition-colors uppercase tracking-wider"
            >
              View All Insights <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.08]">
            {ARTICLES.map((article) => (
              <a
                key={article.slug}
                href={`/insights/${article.slug}/`}
                className="group flex flex-col justify-between p-8 border-r border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors relative min-h-[360px]"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#2BE0B0] font-semibold">
                      {article.category}
                    </span>
                    <span className="font-mono text-[11px] text-[#8FA39A]">{article.readTime}</span>
                  </div>
                  <time className="block text-xs text-[#8FA39A]">{article.date}</time>

                  <h3 className="font-display font-semibold text-lg text-[#F2F6F4] group-hover:text-[#2BE0B0] transition-colors leading-[1.35]">
                    {article.title}
                  </h3>
                </div>

                <div className="pt-8 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                  <p className="text-[11px] text-[#8FA39A]">{article.role}</p>

                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#2BE0B0] group-hover:bg-[#2BE0B0]/10 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#8FA39A] group-hover:text-[#2BE0B0] transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
      <section className="py-40 bg-[#0D1815] border-t border-white/[0.08] text-center">
        <div className="container mx-auto px-8 md:px-16">
          <p className="label-mono mb-8">Start a conversation</p>

          <div className="mb-12 max-w-lg mx-auto relative">
            <VitalLine mode="ecg" />
            <div className="flex justify-end mt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2BE0B0] shadow-[0_0_8px_#2BE0B0]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#2BE0B0]">YOU</span>
              </div>
            </div>
          </div>

          <h2 className="font-display font-bold text-4xl md:text-6xl text-[#F8FAFC] leading-[1.06] max-w-3xl mx-auto mb-16">
            Exploring a healthcare venture?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div
            >
              <MagneticButton>
                <a
                  href="/founders#apply"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase hover:shadow-[0_0_40px_rgba(227,168,59,0.5)] transition-all duration-300"
                >
                  <TextScramble text="APPLY AS A FOUNDER" />
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticButton>
            </div>

            <div
            >
              <MagneticButton>
                <a
                  href="/investors"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.18] text-[#C2D1CB] font-mono text-xs tracking-[0.1em] uppercase hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
                >
                  INVESTOR ENQUIRIES
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
