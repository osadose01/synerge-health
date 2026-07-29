"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VitalLine } from "@/components/ui/VitalLine";
import { GlassTile } from "@/components/ui/GlassTile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";
import dynamic from "next/dynamic";

const NodeGraph = dynamic(() => import("@/components/ui/NodeGraph").then((mod) => mod.NodeGraph), {
  ssr: false,
});
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Stagger word reveal ─────────────────────────────────────────────────
function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden"
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ── The Synerge Model ─────────────────────────────────────────────────

// ── Studio Model Icons (Tactile Hand-Crafted SVGs) ─────────────────────
function ClipboardStrategyIcon({ isHovered }: { isHovered: boolean }) {
  const stroke = isHovered ? "#2BE0B0" : "#C2D1CB";
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
      {/* Clipboard Frame */}
      <rect x="4" y="5" width="16" height="17" rx="2" stroke={stroke} strokeWidth="1.8" />
      {/* Top Clip */}
      <path d="M9 5V3.5C9 3.22386 9.22386 3 9.5 3H14.5C14.7761 3 15 3.22386 15 3.5V5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      {/* Gears inside clipboard top right */}
      <path d="M15.5 9.5M15.5 8.5C16.0523 8.5 16.5 8.94772 16.5 9.5C16.5 10.0523 16.0523 10.5 15.5 10.5C14.9477 10.5 14.5 10.0523 14.5 9.5C14.5 8.94772 14.9477 8.5 15.5 8.5Z" stroke={stroke} strokeWidth="1.5" />
      <path d="M15.5 7.5V8.5M15.5 10.5V11.5M13.5 9.5H14.5M16.5 9.5H17.5" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      {/* Checklist items */}
      <path d="M8 10L9.5 11.5L12 9" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 15L9.5 16.5L12 14" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13.5" y1="11" x2="17" y2="11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.5" y1="16" x2="17" y2="16" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function OperationalEngineIcon({ isHovered }: { isHovered: boolean }) {
  const stroke = isHovered ? "#2BE0B0" : "#C2D1CB";
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
      {/* Center Gear */}
      <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="1.8" />
      <path d="M12 7V8.5M12 15.5V17M7 12H8.5M15.5 12H17M8.46 8.46L9.52 9.52M14.48 14.48L15.54 15.54M8.46 15.54L9.52 14.48M14.48 9.52L15.54 8.46" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      {/* Revolving Cycle Arrows */}
      <path d="M5.5 12C5.5 8.41015 8.41015 5.5 12 5.5C14.5 5.5 16.68 6.9 17.75 8.9" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 9H18V6" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 12C18.5 15.5899 15.5899 18.5 12 18.5C9.5 18.5 7.32 17.1 6.25 15.1" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 15H6V18" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NetworkEcosystemIcon({ isHovered }: { isHovered: boolean }) {
  const stroke = isHovered ? "#2BE0B0" : "#C2D1CB";
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300">
      {/* Jar / Container Outline */}
      <path d="M7 4H17M8 4V2.5C8 2.22386 8.22386 2 8.5 2H15.5C15.7761 2 16 2.22386 16 2.5V4M6.5 7C5.67157 7 5 7.67157 5 8.5V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V8.5C19 7.67157 18.3284 7 17.5 7H6.5Z" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      {/* People inside container */}
      {/* Person Top Left */}
      <circle cx="9" cy="11.5" r="1.3" stroke={stroke} strokeWidth="1.2" />
      <path d="M7.5 15C7.5 14 8.2 13.5 9 13.5C9.8 13.5 10.5 14 10.5 15" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      {/* Person Top Right */}
      <circle cx="15" cy="11.5" r="1.3" stroke={stroke} strokeWidth="1.2" />
      <path d="M13.5 15C13.5 14 14.2 13.5 15 13.5C15.8 13.5 16.5 14 16.5 15" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      {/* Person Bottom Center */}
      <circle cx="12" cy="16.5" r="1.3" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.4" />
      <path d="M10.2 20C10.2 18.8 11 18.2 12 18.2C13 18.2 13.8 18.8 13.8 20" stroke={isHovered ? "#2BE0B0" : "#E3A83B"} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ── Studio Model (pinned scroll) ────────────────────────────────────────
const PILLARS = [
  {
    num: "01",
    title: "Strategic Guidance",
    subtitle: "Clinical-to-Market Blueprint",
    body: "Business models, go-to-market plans, pricing strategy, and regulatory pathways custom-built for African healthcare markets.",
    output: "Feeds clinical strategy into execution engine ->",
    icon: ClipboardStrategyIcon,
  },
  {
    num: "02",
    title: "Operational Support",
    subtitle: "Embedded Venture Builders",
    body: "Hands-on execution — hiring top talent, legal setup, and finance infrastructure — so founders focus on product and patient impact.",
    output: "Deploys operational rails to unlock capital ->",
    icon: OperationalEngineIcon,
  },
  {
    num: "03",
    title: "Capital & Networks",
    subtitle: "Seed Funding & Scale",
    body: "Seed funding paired with warm introductions across our venture capital, hospital, and philanthropic partner network.",
    output: "Completes growth loop with continental scale.",
    icon: NetworkEcosystemIcon,
  },
];

function StudioModel() {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <section className="py-36 bg-[#060B09] border-t border-white/[0.08] relative overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <p className="label-mono">The Synerge Model</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8FAFC] leading-[1.08]">
            We don&rsquo;t advise. <br className="hidden sm:inline" />
            <span className="text-[#2BE0B0]">We build inside.</span>
          </h2>
        </div>

        {/* 3-Pillar Interlocking Pipeline (01 -> 02 -> 03) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 relative">
          {PILLARS.map((pillar, i) => {
            const isHovered = activePillar === i;
            const isConnected = activePillar !== null && i >= activePillar;
            const IconComponent = pillar.icon;

            return (
              <div key={pillar.num} className="relative flex flex-col">
                {/* Pillar Card Box */}
                <div
                  onMouseEnter={() => setActivePillar(i)}
                  onMouseLeave={() => setActivePillar(null)}
                  className={`h-full rounded-2xl border p-8 transition-all duration-500 relative overflow-hidden bg-[#0D1815] flex flex-col justify-between group ${
                    isHovered
                      ? "border-[#2BE0B0] shadow-[0_0_30px_rgba(43,224,176,0.15)]"
                      : isConnected
                      ? "border-white/[0.25]"
                      : "border-white/[0.08] hover:border-white/[0.2]"
                  }`}
                >
                  <div>
                    {/* Top indicator bar */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded transition-colors duration-300 ${
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

                    {/* Tactile Icon Container Badge */}
                    <div
                      className={`w-13 h-13 rounded-xl border flex items-center justify-center p-3 mb-6 transition-all duration-300 ${
                        isHovered
                          ? "bg-[#2BE0B0]/10 border-[#2BE0B0] shadow-[0_0_20px_rgba(43,224,176,0.2)] scale-105"
                          : "bg-[#060B09]/80 border-white/10"
                      }`}
                    >
                      <IconComponent isHovered={isHovered} />
                    </div>

                    <div className="space-y-3 mb-6">
                      <h3 className="font-display font-semibold text-xl text-[#F8FAFC]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#C2D1CB] leading-[1.8]">{pillar.body}</p>
                    </div>
                  </div>

                  {/* Conduit output footer */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <span className="font-mono text-[10px] tracking-wider text-[#E3A83B]">
                      {pillar.output}
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
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 rounded-full bg-[#060B09] border border-white/[0.18] text-[#2BE0B0] shadow-md">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Main page ───────────────────────────────────────────────────────────
export default function Home() {
  const [heroResonance, setHeroResonance] = useState(false);
  const [closingResonance, setClosingResonance] = useState(false);

  return (
    <>
      <Header />

      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-32 pt-32 overflow-hidden"
        >
          {/* Subtle institutional ambient gradient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#1A9972]/15 via-[#2BE0B0]/5 to-transparent blur-[120px] pointer-events-none" />

          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#060B09_100%)] pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-16">
            {/* H1 with word stagger */}
            <h1 className="font-display font-bold text-[clamp(2.3rem,8vw,7.5rem)] leading-[1.02] tracking-tight text-[#F8FAFC] max-w-5xl">
              <WordReveal text="Building Africa's" delay={0.2} />
              <br />
              <WordReveal
                text="next generation"
                delay={0.5}
                className="text-[#2BE0B0]"
              />
              <br />
              <WordReveal text="of digital health." delay={0.8} />
            </h1>

            {/* ECG vital line — hero mode with co-active resonance */}
            <div className="mt-10 max-w-2xl">
              <VitalLine mode="ecg" delay={1.2} activeResonance={heroResonance} />
            </div>

            {/* Sub + CTAs */}
            <div className="mt-12 pt-10 border-t border-white/[0.12] flex flex-col md:flex-row md:items-end gap-10 md:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0"
              >
                <div
                  onMouseEnter={() => setHeroResonance(true)}
                  onMouseLeave={() => setHeroResonance(false)}
                >
                  <MagneticButton>
                    <Link
                      href="/founders#apply"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase hover:shadow-[0_0_30px_rgba(227,168,59,0.5)] transition-all duration-300"
                    >
                      <TextScramble text="APPLY AS A FOUNDER" />
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </MagneticButton>
                </div>

                <div
                  onMouseEnter={() => setHeroResonance(true)}
                  onMouseLeave={() => setHeroResonance(false)}
                >
                  <MagneticButton>
                    <Link
                      href="/investors"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/[0.18] text-[#C2D1CB] font-mono text-xs tracking-[0.1em] uppercase hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
                    >
                      INVEST WITH US
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PERSPECTIVE (22% / 2%) ────────────────────────────────────── */}
        <section className="py-40 bg-[#0D1815] border-t border-white/[0.08]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div>
                <p className="label-mono">Our Perspective</p>
              </div>
              <div className="space-y-8">
                <p className="font-display text-2xl md:text-3xl font-semibold text-[#F8FAFC] leading-[1.4]">
                  In African healthcare,{" "}
                  <span className="text-[#E3A83B]">isolated apps die.</span>{" "}
                  <br className="hidden sm:inline" />
                  <span className="text-[#2BE0B0]">Interrelated systems scale.</span>
                </p>

                <p className="text-[#C2D1CB] text-base leading-[1.8] max-w-xl">
                  The gap in African healthcare isn&rsquo;t a lack of brilliant clinical talent. The gap is the lethal friction of building alone in a highly fragmented market. Standalone products cannot survive without institutional distribution.
                </p>
                
                <p className="text-[#C2D1CB] text-base leading-[1.8] max-w-xl">
                  Synerge Health absorbs that friction through a dual approach. First, we co-found in the trenches with visionary operators. Second, we build an interrelated ecosystem where every venture powers the next—creating the structural synergy needed to reach continental scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STUDIO MODEL ─────────────────────────────────────────────── */}
        <StudioModel />

        {/* ── FOCUS AREAS (node graph) ──────────────────────────────────── */}
        <section className="py-40 bg-[#0D1815] border-t border-white/[0.08]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div className="space-y-4">
                <p className="label-mono">Focus Areas</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-[#F8FAFC] leading-[1.1]">
                  Sub-sectors
                  <br />
                  <span className="text-[#2BE0B0]">we back.</span>
                </h2>
              </div>

              <div className="flex flex-col items-center">
                {/* Node graph (handles desktop SVG vs mobile grid internally) */}
                <div className="w-full flex justify-center">
                  <NodeGraph />
                </div>

                {/* Network vital line below graph on desktop */}
                <div className="hidden md:block w-full mt-12 max-w-2xl opacity-30">
                  <VitalLine mode="network" delay={0.3} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── METRICS ──────────────────────────────────────────────────── */}
        <section className="py-40 bg-[#060B09] border-t border-white/[0.08]">
          <div className="container mx-auto px-8 md:px-16">
            <p className="label-mono mb-16">By the numbers</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  value: "$1M",
                  label: "Initial Seed Capital",
                  sub: "Committed venture fund",
                  badge: "FUNDING",
                  color: "#2BE0B0",
                },
                {
                  value: "3–6 Mo",
                  label: "Pre-Built Clinical Rails",
                  sub: "Accelerated market launch",
                  badge: "VELOCITY",
                  color: "#E3A83B",
                },
                {
                  value: "100%",
                  label: "HealthTech Pure-Play",
                  sub: "Dedicated Sub-Saharan studio",
                  badge: "SPECIALIZATION",
                  color: "#7FCBF2",
                },
              ].map((stat, i) => (
                <GlassTile key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
        <section className="py-40 bg-[#0D1815] border-t border-white/[0.08] text-center">
          <div className="container mx-auto px-8 md:px-16">
            <p className="label-mono mb-8">Start a conversation</p>

            {/* Closing ECG → "You" node with co-active resonance */}
            <div className="mb-12 max-w-lg mx-auto relative">
              <VitalLine mode="ecg" delay={0.2} activeResonance={closingResonance} />
              {/* The "You" terminal node */}
              <div className="flex justify-end mt-2">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 2.8 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2BE0B0] shadow-[0_0_8px_#2BE0B0]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#2BE0B0]">YOU</span>
                </motion.div>
              </div>
            </div>

            <h2 className="font-display font-bold text-4xl md:text-6xl text-[#F8FAFC] leading-[1.06] max-w-3xl mx-auto mb-16">
              Ready to build Africa&rsquo;s future of healthcare?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div
                onMouseEnter={() => setClosingResonance(true)}
                onMouseLeave={() => setClosingResonance(false)}
              >
                <MagneticButton>
                  <Link
                    href="/founders#apply"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase hover:shadow-[0_0_40px_rgba(227,168,59,0.5)] transition-all duration-300"
                  >
                    <TextScramble text="APPLY AS A FOUNDER" />
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
              </div>

              <div
                onMouseEnter={() => setClosingResonance(true)}
                onMouseLeave={() => setClosingResonance(false)}
              >
                <MagneticButton>
                  <Link
                    href="/investors"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.18] text-[#C2D1CB] font-mono text-xs tracking-[0.1em] uppercase hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
                  >
                    INVEST WITH US
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
