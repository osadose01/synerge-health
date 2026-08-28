"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextScramble } from "@/components/ui/TextScramble";
import { useReducedMotion } from "@/lib/useReducedMotion";

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
    const x = ((e.clientY - cy) / rect.height) * 8;
    const y = ((e.clientX - cx) / rect.width) * -8;
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
      <div className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#2BE0B0] to-transparent" />
      <div className="absolute top-0 left-0 w-0.5 h-12 bg-gradient-to-b from-[#2BE0B0] to-transparent" />

      <h3 className="font-display font-bold text-xl text-[#2BE0B0]">{title}</h3>
      <p className="text-sm text-[#8FA39A] leading-[1.8]">{body}</p>
    </motion.div>
  );
}

const VALUES = [
  {
    title: "We Build Inside",
    num: "01",
    desc: "We do not write passive checks from the sidelines. We embed engineering, clinical, and regulatory operators into the trenches alongside founders.",
  },
  {
    title: "Interrelated Systems",
    num: "02",
    desc: "Standalone products die without distribution. We build ventures that plug directly into cross-sector synergy loops across hospital and pharma networks.",
  },
  {
    title: "African Clinical Reality",
    num: "03",
    desc: "We don't adapt foreign SaaS models. We engineer native architectures built for low bandwidth, out-of-pocket payments, and local regulatory rails.",
  },
  {
    title: "Absorb Lethal Friction",
    num: "04",
    desc: "By providing pre-cleared regulatory pathways and institutional networks, we absorb operational friction so founders focus on product and patients.",
  },
];

function CoreValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="py-40 bg-[#060B09] border-t border-[rgba(43,224,176,0.06)]">
      <div className="container mx-auto px-8 md:px-16">
        <p className="label-mono mb-4">Our Methodology</p>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-[#F2F6F4] mb-16 max-w-2xl leading-[1.1]">
          How we architect systemic impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, i) => (
            <motion.div
              key={val.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="p-8 rounded-2xl border border-[rgba(43,224,176,0.1)] bg-[#0D1815] flex flex-col justify-between space-y-8 group hover:border-[#2BE0B0]/40 transition-colors"
            >
              <span className="font-mono text-xs text-[#2BE0B0] font-semibold">{val.num}</span>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-lg text-[#F8FAFC] group-hover:text-[#2BE0B0] transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs text-[#8FA39A] leading-[1.8]">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPageContent() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="About Synerge Health"
        title="We engineer healthcare infrastructure for Africa."
        description="Synerge Health is a specialized venture studio co-founding high-growth digital health companies. We provide the capital, engineering, and regulatory rails to scale systemic solutions."
      />

      <section className="py-32 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)]">
        <div className="container mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-2 gap-8">
            <GlassPanel
              index={0}
              title="Our Mission"
              body="To accelerate Africa's healthcare transformation by building, funding, and interconnectedly scaling technology ventures that bridge critical clinical delivery gaps."
            />
            <GlassPanel
              index={1}
              title="Our Vision"
              body="A continent where clinical workflows, diagnostics, and therapeutics operate on shared, interoperable digital rails—reducing patient mortality and democratizing care access."
            />
          </div>
        </div>
      </section>

      <CoreValues />

      {/* CTA */}
      <section className="py-32 bg-[#0D1815] border-t border-[rgba(43,224,176,0.06)] text-center">
        <div className="container mx-auto px-8 md:px-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-[#F8FAFC] mb-8">
            Partner with Synerge Health
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <a
                href="/founders#apply"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E3A83B] text-[#060B09] font-mono font-bold text-xs tracking-[0.1em] uppercase hover:shadow-[0_0_40px_rgba(227,168,59,0.5)] transition-all duration-300"
              >
                <TextScramble text="APPLY AS A FOUNDER" />
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/investors"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.18] text-[#C2D1CB] font-mono text-xs tracking-[0.1em] uppercase hover:border-[#2BE0B0] hover:text-[#2BE0B0] transition-all duration-300"
              >
                INVEST WITH US
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
