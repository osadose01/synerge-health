"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

interface GlassTileProps {
  value: string;
  label: string;
  sub: string;
  index?: number;
}

function CountUp({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  // Extract numeric prefix and suffix
  const match = target.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  const prefix = match?.[1] ?? "";
  const num = parseFloat(match?.[2] ?? "0");
  const suffix = match?.[3] ?? "";
  const isNonNumeric = !match;

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView && !isNonNumeric) {
      spring.set(num);
    }
  }, [inView, num, spring, isNonNumeric]);

  useEffect(() => {
    if (isNonNumeric) return;
    const unsubscribe = spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + (Number.isInteger(num) ? Math.round(v) : v.toFixed(1)) + suffix;
      }
    });
    return unsubscribe;
  }, [spring, prefix, suffix, num, isNonNumeric]);

  if (isNonNumeric) return <span ref={ref}>{target}</span>;

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

export function GlassTile({ value, label, sub, index = 0 }: GlassTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1815] p-8 scanline-sweep"
    >
      {/* Teal corner accent */}
      <div className="absolute top-0 left-0 w-16 h-0.5 bg-gradient-to-r from-[#2BE0B0] to-transparent" />
      <div className="absolute top-0 left-0 w-0.5 h-16 bg-gradient-to-b from-[#2BE0B0] to-transparent" />

      {/* Value */}
      <div className="font-mono font-bold text-5xl md:text-6xl text-[#2BE0B0] mb-4 tracking-tight">
        <CountUp target={value} />
      </div>

      {/* Label */}
      <div className="font-display font-semibold text-base text-[#F8FAFC] mb-1">
        {label}
      </div>

      {/* Sub */}
      <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A5B8B0]">
        {sub}
      </div>
    </motion.div>
  );
}
