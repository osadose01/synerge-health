"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";
import { useReducedMotion } from "@/lib/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dynamic from "next/dynamic";

const SynergyOrbital3D = dynamic(
  () => import("@/components/ui/SynergyOrbital3D").then((mod) => mod.SynergyOrbital3D),
  { ssr: false }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── PageHero (about-specific) ────────────────────────────────────────────
function AboutHero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative pt-40 pb-24 border-b border-white/[0.08] overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#2BE0B0] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="label-mono"
            >
              About Synerge Health
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(2.3rem,5vw,5.5rem)] leading-[1.05] tracking-tight text-[#F8FAFC]"
            >
              We build the companies that will{" "}
              <span className="text-[#2BE0B0]">define African healthcare.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-xl text-base text-[#C2D1CB] leading-[1.75]"
            >
              A venture studio catalysing innovation in healthcare — giving founders the resources,
              operational build support, and capital they need to scale from first insight to continental impact.
            </motion.p>
          </div>

          {/* Interactive 3D Armillary Sphere Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-6"
          >
            <SynergyOrbital3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Parallax glass panels (Mission / Vision) ────────────────────────────
function GlassPanel({
  title,
  body,
  index = 0,
}: {
  title: string;
  body: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientY - cy) / rect.height) * 8; // rotateX
    const y = ((e.clientX - cx) / rect.width) * -8; // rotateY
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.3s ease",
      }}
      className="relative rounded-2xl border border-[rgba(43,224,176,0.1)] bg-[#0D1815] p-8 space-y-4 group hover:border-[rgba(43,224,176,0.25)] transition-colors duration-500"
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#2BE0B0] to-transparent" />
      <div className="absolute top-0 left-0 w-0.5 h-12 bg-gradient-to-b from-[#2BE0B0] to-transparent" />

      <h3 className="font-display font-bold text-xl text-[#2BE0B0]">{title}</h3>
      <p className="text-sm text-[#8FA39A] leading-[1.8]">{body}</p>
    </motion.div>
  );
}

// ── Horizontal scroll-pinned Core Values ───────────────────────────────
const VALUES = [
  {
    title: "Patient First",
    num: "01",
    desc: "Every company we build is judged by whether it measurably improves patient care and access.",
  },
  {
    title: "Founder Led",
    num: "02",
    desc: "We build alongside founders as operating partners, not passive capital sitting on the sidelines.",
  },
  {
    title: "Rigorous & Honest",
    num: "03",
    desc: "We validate unit economics before we build, and we say so plainly when the numbers don't work.",
  },
  {
    title: "Built For Africa",
    num: "04",
    desc: "Every business model starts from local infrastructure, regulatory, and payment realities.",
  },
];

function CoreValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (
      prefersReduced ||
      !sectionRef.current ||
      !trackRef.current ||
      (typeof window !== "undefined" && window.innerWidth < 1024)
    )
      return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth - track.offsetWidth;

    gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth * 1.2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [prefersReduced]);

  if (prefersReduced) {
    // Static 2×2 grid fallback
    return (
      <section className="py-20 md:py-40 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
        <div className="container mx-auto px-6 sm:px-8 md:px-16">
          <p className="label-mono mb-16">Core Values</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v, i) => (
              <GlassPanel key={v.title} title={`${v.num} — ${v.title}`} body={v.desc} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Mobile & Tablet vertical card grid (< lg) */}
      <section className="lg:hidden py-20 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
        <div className="container mx-auto px-6 sm:px-8">
          <p className="label-mono mb-12">Core Values</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="relative rounded-2xl border border-[rgba(43,224,176,0.1)] bg-[#111F1A] p-6 space-y-4"
              >
                <div className="absolute top-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#2BE0B0] to-transparent" />
                <span className="font-mono text-[11px] tracking-widest text-[#2BE0B0]">
                  {value.num}
                </span>
                <h3 className="font-display font-bold text-xl text-[#F2F6F4]">{value.title}</h3>
                <p className="text-sm text-[#8FA39A] leading-[1.8]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop horizontal GSAP slider (>= lg) */}
      <div
        ref={sectionRef}
        className="hidden lg:block relative overflow-hidden bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]"
        style={{ height: "100vh" }}
      >
        <div className="h-full flex flex-col justify-center">
          <div className="container mx-auto px-8 md:px-16 mb-12">
            <p className="label-mono">Core Values</p>
          </div>
          <div
            ref={trackRef}
            className="flex gap-6 px-8 md:px-16"
            style={{ width: "max-content" }}
          >
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="relative w-80 shrink-0 rounded-2xl border border-[rgba(43,224,176,0.1)] bg-[#111F1A] p-8 space-y-4"
              >
                <div className="absolute top-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#2BE0B0] to-transparent" />
                <span className="font-mono text-[11px] tracking-widest text-[#2BE0B0]">
                  {value.num}
                </span>
                <h3 className="font-display font-bold text-xl text-[#F2F6F4]">{value.title}</h3>
                <p className="text-sm text-[#8FA39A] leading-[1.8]">{value.desc}</p>
              </motion.div>
            ))}
            {/* Spacer */}
            <div className="w-16 shrink-0" />
          </div>
        </div>
      </div>
    </>
  );
}

// ── Leadership tilt cards ───────────────────────────────────────────────
const TEAM = [
  {
    initials: "EO",
    name: "Ed Osadolor",
    role: "Chief Executive Officer",
    bio: "Clinician and digital health leader with executive background across health tech startups and clinical operations.",
  },
  {
    initials: "EU",
    name: "Ezi Ud",
    role: "Chief Operating Officer",
    bio: "Operational strategist specialising in healthcare supply chain, pharmacy networks, and scale execution.",
  },
  {
    initials: "CZ",
    name: "Chen Zui",
    role: "Chief Technology Officer",
    bio: "Engineering leader with deep background in scalable cloud systems, AI data platforms, and clinical integrations.",
  },
  {
    initials: "SE",
    name: "Sama Edi",
    role: "Chief Financial Officer",
    bio: "Corporate finance executive experienced in venture structuring, cross-border capital, and portfolio governance.",
  },
];

function LeaderCard({ member, index }: { member: (typeof TEAM)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = ref.current!.getBoundingClientRect();
    const x = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 6;
    const y = ((e.clientX - rect.left - rect.width / 2) / rect.width) * -6;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease",
      }}
      className="relative rounded-2xl border border-[rgba(43,224,176,0.1)] bg-[#0D1815] p-8 space-y-4 hover:border-[rgba(43,224,176,0.3)] transition-colors duration-500"
    >
      {/* Avatar */}
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border border-[rgba(43,224,176,0.3)] bg-[#111F1A] flex items-center justify-center font-display font-bold text-sm text-[#2BE0B0]">
          {member.initials}
        </div>
        {/* Teal pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#2BE0B0]"
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
        />
      </div>

      <div>
        <h3 className="font-display font-semibold text-base text-[#F2F6F4]">{member.name}</h3>
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#2BE0B0] mt-0.5">
          {member.role}
        </p>
      </div>

      <p className="text-sm text-[#8FA39A] leading-[1.75]">{member.bio}</p>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-10 h-0.5 bg-gradient-to-l from-[#2BE0B0] to-transparent" />
    </motion.div>
  );
}

// ── Page export ─────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <AboutHero />

        {/* Mission & Vision — glass panels */}
        <section className="py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <p className="label-mono">Our Beliefs</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <GlassPanel
                  title="Mission"
                  body="We are committed to catalysing innovation in healthcare by providing startups with the resources and expertise they need to succeed — turning clinical insight and entrepreneurial ambition into sustainable companies that save lives."
                  index={0}
                />
                <GlassPanel
                  title="Vision"
                  body="A thriving ecosystem of healthcare entrepreneurs equipped to tackle the continent's most pressing clinical challenges and improve patient outcomes across Sub-Saharan Africa and beyond."
                  index={1}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values — horizontal scroll-pinned */}
        <CoreValues />

        {/* Leadership */}
        <section className="py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-24 items-start">
              <div className="space-y-4">
                <p className="label-mono">Leadership</p>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-[#F2F6F4] leading-[1.1]">
                  The team behind
                  <br />
                  <span className="text-[#2BE0B0]">the studio.</span>
                </h2>
              </div>
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  {TEAM.map((member, i) => (
                    <LeaderCard key={member.name} member={member} index={i} />
                  ))}
                </div>

                <div className="mt-4">
                  <MagneticButton>
                    <Link
                      href="/founders#apply"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase cursor-none hover:shadow-[0_0_30px_rgba(227,168,59,0.4)] transition-all duration-300"
                    >
                      <TextScramble text="JOIN THE STUDIO" />
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
