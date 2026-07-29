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

// ── Studio Model (pinned scroll) ────────────────────────────────────────
const PILLARS = [
  {
    num: "01",
    title: "Strategic Guidance",
    subtitle: "Clinical-to-Market Blueprint",
    body: "Business models, go-to-market plans, pricing strategy, and regulatory pathways custom-built for African healthcare markets.",
    output: "Feeds clinical strategy into execution engine ->",
  },
  {
    num: "02",
    title: "Operational Support",
    subtitle: "Embedded Venture Builders",
    body: "Hands-on execution — hiring top talent, legal setup, and finance infrastructure — so founders focus on product and patient impact.",
    output: "Deploys operational rails to unlock capital ->",
  },
  {
    num: "03",
    title: "Capital & Networks",
    subtitle: "Seed Funding & Scale",
    body: "Seed funding paired with warm introductions across our venture capital, hospital, and philanthropic partner network.",
    output: "Completes growth loop with continental scale.",
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
          <p className="text-base text-[#C2D1CB] leading-[1.8] max-w-2xl">
            An interlocking venture creation engine — combining clinical strategy, embedded operational execution, and seed capital from inception to continental scale.
          </p>
        </div>

        {/* 3-Pillar Interlocking Pipeline (01 -> 02 -> 03) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 relative">
          {PILLARS.map((pillar, i) => {
            const isHovered = activePillar === i;
            const isConnected = activePillar !== null && i >= activePillar;

            return (
              <div key={pillar.num} className="relative flex flex-col">
                {/* Pillar Card Box */}
                <div
                  onMouseEnter={() => setActivePillar(i)}
                  onMouseLeave={() => setActivePillar(null)}
                  className={`h-full rounded-2xl border p-8 transition-all duration-500 relative overflow-hidden bg-[#0D1815] flex flex-col justify-between ${
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
                    <h3 className="font-display font-semibold text-xl text-[#F8FAFC]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#C2D1CB] leading-[1.8]">{pillar.body}</p>
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
          className="relative min-h-screen flex flex-col justify-center pb-24 md:pb-32 pt-36 overflow-hidden"
        >
          {/* Subtle institutional ambient gradient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#1A9972]/15 via-[#2BE0B0]/5 to-transparent blur-[120px] pointer-events-none" />

          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#060B09_100%)] pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
              
              {/* Left Column (Headline & CTAs) */}
              <div className="lg:col-span-7 space-y-8">
                {/* Status beacon badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#2BE0B0]/30 bg-[#2BE0B0]/5 backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2BE0B0] animate-pulse shadow-[0_0_8px_#2BE0B0]" />
                  <span className="font-mono text-xs tracking-widest text-[#2BE0B0] uppercase font-semibold">
                    AFRICA HEALTH VENTURE STUDIO
                  </span>
                </motion.div>

                {/* H1 with word stagger */}
                <h1 className="font-display font-bold text-[clamp(2.3rem,5.5vw,5.5rem)] leading-[1.04] tracking-tight text-[#F8FAFC]">
                  <WordReveal text="Building Africa's" delay={0.2} />
                  <br />
                  <WordReveal
                    text="next generation"
                    delay={0.4}
                    className="text-[#2BE0B0]"
                  />
                  <br />
                  <WordReveal text="of digital health." delay={0.6} />
                </h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="max-w-xl text-base sm:text-lg text-[#C2D1CB] leading-[1.7]"
                >
                  We co-found, fund, and operate healthtech startups from first insight to market
                  scale — pairing African clinical expertise with global venture-building discipline.
                </motion.p>

                {/* Vital ECG line animation */}
                <div className="pt-2 max-w-xl">
                  <VitalLine mode="ecg" delay={1.0} activeResonance={heroResonance} />
                </div>

                {/* Dual Persona Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0"
                >
                  <div
                    onMouseEnter={() => setHeroResonance(true)}
                    onMouseLeave={() => setHeroResonance(false)}
                  >
                    <MagneticButton>
                      <Link
                        href="/founders#apply"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase hover:shadow-[0_0_35px_rgba(227,168,59,0.5)] transition-all duration-300"
                      >
                        <TextScramble text="APPLY AS A FOUNDER" />
                        <ArrowUpRight className="w-4 h-4" />
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
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.18] text-[#C2D1CB] font-mono text-xs tracking-[0.1em] uppercase hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
                      >
                        INVEST WITH US
                      </Link>
                    </MagneticButton>
                  </div>
                </motion.div>
              </div>

              {/* Right Column — Venture Studio Command HUD Card (0 WebGL Lag, Pure Vector) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="rounded-3xl border border-white/[0.12] bg-[#0A120F] p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between">
                  {/* Subtle inner ambient glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#2BE0B0]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header info */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8 relative z-10">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.2em] text-[#2BE0B0] uppercase font-bold">
                        STUDIO COMMAND HUD
                      </p>
                      <p className="font-display font-semibold text-base text-[#F8FAFC] mt-0.5">
                        Operational Venture Engine
                      </p>
                    </div>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[#C2D1CB]">
                      2026 INTAKE
                    </span>
                  </div>

                  {/* Center Vector Orbital Radar Visual (0 WebGL lag) */}
                  <div className="w-full aspect-square max-w-[220px] mx-auto flex items-center justify-center relative my-2">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                      <defs>
                        <linearGradient id="hud-orb1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#5FF5CC" />
                          <stop offset="100%" stopColor="#12664D" />
                        </linearGradient>
                        <linearGradient id="hud-orb2" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#7FCBF2" />
                          <stop offset="100%" stopColor="#1B5C7A" />
                        </linearGradient>
                        <linearGradient id="hud-orb3" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#F2C877" />
                          <stop offset="100%" stopColor="#8A5A16" />
                        </linearGradient>
                        <radialGradient id="hud-core">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="60%" stopColor="#2BE0B0" />
                          <stop offset="100%" stopColor="#0E4B43" />
                        </radialGradient>
                      </defs>
                      <g transform="translate(100,100)" strokeLinecap="round">
                        <ellipse rx="75" ry="42" transform="rotate(20)" stroke="url(#hud-orb1)" strokeWidth="5" />
                        <ellipse rx="75" ry="42" transform="rotate(80)" stroke="url(#hud-orb2)" strokeWidth="5" />
                        <ellipse rx="75" ry="42" transform="rotate(140)" stroke="url(#hud-orb3)" strokeWidth="5" />
                        <circle r="14" fill="url(#hud-core)" />
                      </g>
                    </svg>
                  </div>

                  {/* Micro-Metrics Grid (2x2) */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.08] relative z-10">
                    <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#060B09]">
                      <p className="font-mono font-bold text-xl text-[#2BE0B0]">$1M</p>
                      <p className="font-mono text-[10px] tracking-wider text-[#C2D1CB] uppercase mt-0.5">
                        Seed Capital Fund
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#060B09]">
                      <p className="font-mono font-bold text-xl text-[#E3A83B]">3–6 Mo</p>
                      <p className="font-mono text-[10px] tracking-wider text-[#C2D1CB] uppercase mt-0.5">
                        Clinical Rails
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#060B09]">
                      <p className="font-mono font-bold text-xl text-[#7FCBF2]">8</p>
                      <p className="font-mono text-[10px] tracking-wider text-[#C2D1CB] uppercase mt-0.5">
                        Backable Verticals
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#060B09]">
                      <p className="font-mono font-bold text-xl text-[#2BE0B0]">100%</p>
                      <p className="font-mono text-[10px] tracking-wider text-[#C2D1CB] uppercase mt-0.5">
                        HealthTech Focus
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── PERSPECTIVE (Macro Opportunity Engine) ─────────────────────── */}
        <section className="py-36 bg-[#0D1815] border-t border-white/[0.08] relative overflow-hidden">
          <div className="container mx-auto px-6 sm:px-8 md:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column (Headline & Copy) */}
              <div className="lg:col-span-7 space-y-6">
                <p className="label-mono">Our Perspective</p>
                
                <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#F8FAFC] leading-[1.08]">
                  The 20% infrastructure gap is Africa&rsquo;s <br className="hidden sm:inline" />
                  <span className="text-[#2BE0B0]">greatest digital health opportunity.</span>
                </h2>

                <p className="text-[#C2D1CB] text-base sm:text-lg leading-[1.75] max-w-2xl">
                  We believe the fastest path to closing this deficit is through purpose-built digital health companies — ventures designed from day one around the clinical realities, distribution channels, and health policy frameworks of Sub-Saharan Africa.
                </p>

                <p className="text-[#C2D1CB] text-base leading-[1.75] max-w-2xl">
                  Synerge Health does not invest from the sidelines. We co-found alongside exceptional builders, embedding operational, engineering, and clinical expertise into every venture from first insight to continental scale.
                </p>
              </div>

              {/* Right Column (Dual Metric Opportunity Cards) */}
              <div className="lg:col-span-5 space-y-4">
                {/* 22% Disease Burden Card */}
                <div className="rounded-2xl border border-white/[0.1] bg-[#060B09] p-6 relative overflow-hidden group hover:border-[#2BE0B0]/40 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-3xl sm:text-4xl font-bold text-[#2BE0B0]">22%</p>
                      <p className="font-display font-semibold text-base text-[#F8FAFC] mt-1">
                        Global Disease Burden
                      </p>
                    </div>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#2BE0B0]/10 text-[#2BE0B0] border border-[#2BE0B0]/20 font-bold uppercase">
                      DEMAND
                    </span>
                  </div>
                  <p className="text-xs text-[#C2D1CB] mt-3 leading-relaxed">
                    Sub-Saharan Africa carries nearly a quarter of global healthcare needs.
                  </p>
                </div>

                {/* 2% Infrastructure Card */}
                <div className="rounded-2xl border border-white/[0.1] bg-[#060B09] p-6 relative overflow-hidden group hover:border-[#E3A83B]/40 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-3xl sm:text-4xl font-bold text-[#E3A83B]">&lt;2%</p>
                      <p className="font-display font-semibold text-base text-[#F8FAFC] mt-1">
                        Global Healthcare Infrastructure
                      </p>
                    </div>
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#E3A83B]/10 text-[#E3A83B] border border-[#E3A83B]/20 font-bold uppercase">
                      SUPPLY DEFICIT
                    </span>
                  </div>
                  <p className="text-xs text-[#C2D1CB] mt-3 leading-relaxed">
                    Severe shortage of physical hospital beds, legacy hardware, and specialists.
                  </p>
                </div>

                {/* Leapfrog Thesis Banner */}
                <div className="rounded-2xl border border-[#2BE0B0]/30 bg-[#2BE0B0]/5 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#2BE0B0] shadow-[0_0_8px_#2BE0B0]" />
                    <span className="font-mono text-xs text-[#F8FAFC] font-semibold tracking-wide">
                      THE LEAPFROG THESIS
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#2BE0B0] font-bold tracking-widest uppercase">
                    STUDIO OPPORTUNITY
                  </span>
                </div>
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
                <p className="text-sm text-[#C2D1CB] leading-[1.8] max-w-xs">
                  Eight verticals where clinical need and technology convergence create the highest-impact opportunities.
                </p>
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
