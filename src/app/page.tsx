"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VitalLine } from "@/components/ui/VitalLine";
import { GlassTile } from "@/components/ui/GlassTile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SynergyComparison } from "@/components/ui/SynergyComparison";
import dynamic from "next/dynamic";

const ParticleHero = dynamic(() => import("@/components/ui/ParticleHero").then((mod) => mod.ParticleHero), {
  ssr: false,
});
const NodeGraph = dynamic(() => import("@/components/ui/NodeGraph").then((mod) => mod.NodeGraph), {
  ssr: false,
});
import { TextScramble } from "@/components/ui/TextScramble";
import { useReducedMotion } from "@/lib/useReducedMotion";
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

// ── Animated statistic bar (22% vs 2%) ─────────────────────────────────
function StatBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="space-y-4 my-8">
      {/* 22% bar */}
      <div className="space-y-2">
        <div className="flex justify-between font-mono text-[11px] tracking-[0.15em] text-[#8FA39A] uppercase">
          <span>Africa&rsquo;s Global Disease Burden</span>
          <span className="text-[#2BE0B0] font-bold">22%</span>
        </div>
        <div className="h-2 bg-[#0D1815] rounded-full overflow-hidden border border-[rgba(43,224,176,0.1)]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1A9972] to-[#2BE0B0] rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: "22%" } : {}}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* 2% bar */}
      <div className="flex-1 space-y-2 w-full">
        <div className="font-mono text-[11px] tracking-[0.15em] text-[#8FA39A] uppercase">
          Infrastructure
        </div>
        <div className="h-2 bg-[#0D1815] rounded-full overflow-hidden border border-[rgba(43,224,176,0.1)]">
          <motion.div
            className="h-full bg-[#E3A83B] rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: "2%" } : {}}
            transition={{ duration: 1.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="font-mono font-bold text-4xl text-[#E3A83B]">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            2%
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// ── Studio Model (pinned scroll) ────────────────────────────────────────
const PILLARS = [
  {
    num: "01",
    title: "Strategic Guidance",
    body: "Business models, go-to-market plans, pricing strategy, and regulatory pathways custom-built for African healthcare markets.",
  },
  {
    num: "02",
    title: "Operational Support",
    body: "Hands-on execution — hiring top talent, legal setup, and finance infrastructure — so founders focus on product and patient impact.",
  },
  {
    num: "03",
    title: "Capital & Networks",
    body: "Seed funding paired with warm introductions across our venture capital, hospital, and philanthropic partner network.",
  },
];

function StudioModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".pillar-card");

    // Stagger cards on scroll
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay: i * 0.15,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      className="py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]"
    >
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
          {/* Sticky label column */}
          <div className="md:sticky md:top-32 space-y-6">
            <p className="label-mono">The Studio Model</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F2F6F4] leading-[1.15]">
              We don&rsquo;t advise.
              <br />
              <span className="text-[#2BE0B0]">We build inside.</span>
            </h2>
            <p className="text-sm text-[#8FA39A] leading-[1.8] max-w-xs">
              Embedded operational and clinical expertise from inception through continental scale.
            </p>
          </div>

          {/* Pillar cards */}
          <div className="space-y-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="pillar-card rounded-2xl border border-[rgba(43,224,176,0.08)] bg-[#0D1815] p-8 group hover:border-[rgba(43,224,176,0.25)] transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-[11px] tracking-widest text-[#2BE0B0] shrink-0 mt-1">
                    {pillar.num}
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-display font-semibold text-lg text-[#F2F6F4] group-hover:text-[#2BE0B0] transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#8FA39A] leading-[1.8]">{pillar.body}</p>
                  </div>
                </div>
                {/* Teal accent bar */}
                <div className="mt-6 h-px bg-gradient-to-r from-[#2BE0B0] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
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
          {/* R3F particles (lazy, desktop-only) */}
          <ParticleHero />

          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#060B09_100%)] pointer-events-none" />

          <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-16">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="label-mono mb-10"
            >
              Africa&rsquo;s Digital Health Venture Studio
            </motion.p>

            {/* H1 with word stagger */}
            <h1 className="font-display font-bold text-[clamp(2.3rem,8vw,7.5rem)] leading-[1.02] tracking-tight text-[#F2F6F4] max-w-5xl">
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
            <div className="mt-12 pt-10 border-t border-[rgba(43,224,176,0.08)] flex flex-col md:flex-row md:items-end gap-10 md:gap-24">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="max-w-md text-base text-[#8FA39A] leading-[1.7]"
              >
                We co-found, fund, and operate healthtech startups from first insight to market
                scale — pairing African clinical expertise with global venture-building discipline.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:ml-auto shrink-0"
              >
                <div
                  onMouseEnter={() => setHeroResonance(true)}
                  onMouseLeave={() => setHeroResonance(false)}
                >
                  <MagneticButton>
                    <Link
                      href="/founders#apply"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase cursor-none hover:shadow-[0_0_30px_rgba(227,168,59,0.5)] transition-all duration-300"
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
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[rgba(43,224,176,0.25)] text-[#8FA39A] font-mono text-xs tracking-[0.1em] uppercase cursor-none hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
                    >
                      Partner With Us
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PERSPECTIVE (22% / 2%) ────────────────────────────────────── */}
        <section className="py-40 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div>
                <p className="label-mono">Our Perspective</p>
              </div>
              <div className="space-y-8">
                <p className="font-display text-2xl md:text-3xl font-semibold text-[#F2F6F4] leading-[1.4]">
                  Africa carries{" "}
                  <span className="text-[#2BE0B0]">22% of the world&rsquo;s disease burden</span>{" "}
                  but has access to less than{" "}
                  <span className="text-[#E3A83B]">2% of global healthcare infrastructure.</span>
                </p>

                <StatBar />

                <p className="text-[#8FA39A] text-base leading-[1.8] max-w-xl">
                  We believe the fastest path to closing that gap is through purpose-built
                  digital health companies — ventures designed from day one around the realities
                  of African clinical environments, distribution channels, and patient behaviour.
                </p>
                <p className="text-[#8FA39A] text-base leading-[1.8] max-w-xl">
                  Synerge Health does not invest from the sidelines. We co-found alongside
                  exceptional builders, embedding deep operational and clinical expertise into
                  every company from inception through continental scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STUDIO MODEL ─────────────────────────────────────────────── */}
        <StudioModel />

        {/* ── SYNERGY EFFECT & COMPARISON (1 + 1 = 3) ───────────────────── */}
        <SynergyComparison />

        {/* ── FOCUS AREAS (node graph) ──────────────────────────────────── */}
        <section className="py-40 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div className="space-y-4">
                <p className="label-mono">Focus Areas</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-[#F2F6F4] leading-[1.1]">
                  Sub-sectors
                  <br />
                  <span className="text-[#2BE0B0]">we back.</span>
                </h2>
                <p className="text-sm text-[#8FA39A] leading-[1.8] max-w-xs">
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
        <section className="py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-8 md:px-16">
            <p className="label-mono mb-16">By the numbers</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: "$1M", label: "Initial Venture Fund", sub: "Committed capital" },
                { value: "3×", label: "Target 5-Year ROI", sub: "Investment return goal" },
                { value: "100%", label: "HealthTech Focus", sub: "Pure-play digital health" },
              ].map((stat, i) => (
                <GlassTile key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
        <section className="py-40 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)] text-center">
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

            <h2 className="font-display font-bold text-4xl md:text-6xl text-[#F2F6F4] leading-[1.06] max-w-3xl mx-auto mb-16">
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
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase cursor-none hover:shadow-[0_0_40px_rgba(227,168,59,0.5)] transition-all duration-300"
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
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(43,224,176,0.25)] text-[#8FA39A] font-mono text-xs tracking-[0.1em] uppercase cursor-none hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
                  >
                    Investor Information
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
