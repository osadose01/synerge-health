"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useConnectionSpeed } from "@/lib/useConnectionSpeed";

// Lazy-load R3F to avoid it blocking first paint
const R3FCanvas = lazy(() =>
  import("./ParticleHeroCanvas").then((m) => ({ default: m.ParticleHeroCanvas }))
);

export function ParticleHero() {
  const prefersReduced = useReducedMotion();
  const connection = useConnectionSpeed();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only load R3F on desktop + fast connection + no reduced motion
    const isMobile = window.innerWidth < 768;
    if (!prefersReduced && !isMobile && connection !== "slow") {
      setMounted(true);
    }
  }, [prefersReduced, connection]);

  if (!mounted) {
    // Static CSS fallback — atmospheric blobs
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] rounded-full bg-[#2BE0B0] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] rounded-full bg-[#3FA9E0] opacity-[0.03] blur-[100px]" />
        <div className="absolute top-0 left-0 w-[30vw] h-[30vh] rounded-full bg-[#2BE0B0] opacity-[0.02] blur-[80px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Suspense fallback={null}>
        <R3FCanvas />
      </Suspense>
    </div>
  );
}
