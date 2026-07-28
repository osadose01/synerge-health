"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Only show on pointer:fine devices (not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setIsVisible(true);

    let raf: number;
    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const target = e.target as Element;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role=button], [tabindex]"
      );
      setIsPointer(!!interactive);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      if (ringRef.current) {
        rx = lerp(rx, mx, 0.12);
        ry = lerp(ry, my, 0.12);
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{ width: 8, height: 8 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          animate={{
            scale: isPointer ? 0 : 1,
            backgroundColor: isPointer ? "#2BE0B0" : "#F2F6F4",
          }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden lg:block"
        style={{ width: 40, height: 40 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border"
          animate={{
            scale: isPointer ? 1.8 : 1,
            borderColor: isPointer
              ? "rgba(43,224,176,0.6)"
              : "rgba(242,246,244,0.25)",
            backgroundColor: isPointer
              ? "rgba(43,224,176,0.08)"
              : "transparent",
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </>
  );
}
