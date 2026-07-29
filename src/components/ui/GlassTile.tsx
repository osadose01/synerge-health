"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

interface GlassTileProps {
  value: string;
  label: string;
  sub: string;
  badge?: string;
  color?: string;
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

export function GlassTile({
  value,
  label,
  sub,
  badge,
  color = "#2BE0B0",
  index = 0,
}: GlassTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1815] p-8 scanline-sweep group hover:border-white/[0.2] transition-all duration-300"
    >
      {/* Dynamic corner accent */}
      <div
        className="absolute top-0 left-0 w-16 h-0.5"
        style={{
          background: `linear-gradient(to right, ${color}, transparent)`,
        }}
      />
      <div
        className="absolute top-0 left-0 w-0.5 h-16"
        style={{
          background: `linear-gradient(to bottom, ${color}, transparent)`,
        }}
      />

      {/* Top Badge */}
      {badge && (
        <div className="flex justify-end mb-4">
          <span
            className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded border"
            style={{
              color: color,
              borderColor: `${color}40`,
              backgroundColor: `${color}10`,
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Value */}
      <div
        className="font-mono font-bold text-5xl md:text-6xl mb-4 tracking-tight"
        style={{ color: color }}
      >
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
