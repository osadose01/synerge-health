"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FOCUS_AREAS = [
  {
    id: "telemedicine",
    label: "Telemedicine",
    desc: "Remote clinical consultations and asynchronous care delivery across fragmented geographies.",
    angle: 0,
  },
  {
    id: "ai-diagnostics",
    label: "AI Diagnostics",
    desc: "Machine-learning models trained on African patient populations to close diagnostic accuracy gaps.",
    angle: 45,
  },
  {
    id: "digital-tx",
    label: "Digital Therapeutics",
    desc: "Evidence-based software interventions for chronic disease management and behavioural health.",
    angle: 90,
  },
  {
    id: "hospital-sw",
    label: "Hospital Software",
    desc: "EMR, scheduling, and billing platforms built for under-resourced hospital environments.",
    angle: 135,
  },
  {
    id: "remote-mon",
    label: "Remote Monitoring",
    desc: "IoT-enabled vital sign and adherence tracking for patients outside clinical settings.",
    angle: 180,
  },
  {
    id: "digital-rx",
    label: "Digital Pharmacy",
    desc: "Last-mile medicine delivery and formulary management for dispersed pharmacies.",
    angle: 225,
  },
  {
    id: "health-fin",
    label: "Health Fintech",
    desc: "Micro-insurance, BNPL health financing, and claims automation for the uninsured.",
    angle: 270,
  },
  {
    id: "supply-chain",
    label: "Supply Chain",
    desc: "Track-and-trace, cold-chain integrity, and demand forecasting for medical commodities.",
    angle: 315,
  },
];

const ORBIT_R = 160; // orbit radius in px

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export function NodeGraph() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = FOCUS_AREAS.find((n) => n.id === active);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* ── Orbit SVG & Hover Overlay (Desktop & Laptop only) ────────── */}
      <div className="hidden md:flex flex-col items-center w-full">
        <div className="relative" style={{ width: 400, height: 400 }}>
          <svg
            viewBox="-200 -200 400 400"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {/* Orbit ring */}
            <circle
              cx={0} cy={0} r={ORBIT_R}
              fill="none"
              stroke="rgba(43,224,176,0.08)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* Edges from each node to center */}
            {FOCUS_AREAS.map((node) => {
              const { x, y } = polarToXY(node.angle, ORBIT_R);
              return (
                <line
                  key={node.id + "-edge"}
                  x1={0} y1={0} x2={x} y2={y}
                  stroke={active === node.id ? "#2BE0B0" : "rgba(43,224,176,0.12)"}
                  strokeWidth={active === node.id ? 1.2 : 0.6}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Center node */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-[rgba(43,224,176,0.3)] bg-[#0D1815]">
              <div className="w-3 h-3 rounded-full bg-[#2BE0B0] shadow-[0_0_12px_#2BE0B0]" />
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#2BE0B0]"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Orbit nodes */}
          {FOCUS_AREAS.map((node) => {
            const { x, y } = polarToXY(node.angle, ORBIT_R);
            const isActive = active === node.id;

            return (
              <button
                key={node.id}
                className="absolute flex flex-col items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2BE0B0] rounded-full"
                style={{
                  left: `calc(50% + ${x}px - 20px)`,
                  top: `calc(50% + ${y}px - 20px)`,
                  cursor: "none",
                }}
                onClick={() => setActive(isActive ? null : node.id)}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                aria-label={node.label}
              >
                {/* Node dot */}
                <motion.div
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-[8px] font-mono text-center leading-tight"
                  animate={{
                    borderColor: isActive
                      ? "#2BE0B0"
                      : "rgba(43,224,176,0.2)",
                    backgroundColor: isActive
                      ? "rgba(43,224,176,0.12)"
                      : "#0D1815",
                    boxShadow: isActive
                      ? "0 0 16px rgba(43,224,176,0.4)"
                      : "none",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#8FA39A] leading-none px-0.5" style={{ fontSize: 7 }}>
                    {node.label.split(" ").map((w) => w[0]).join("")}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* ── Node label overlay ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="mt-8 max-w-xs w-full mx-auto rounded-2xl border border-[rgba(43,224,176,0.2)] bg-[#0D1815] p-5 text-center"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2BE0B0] mb-2">
                {activeNode.label}
              </div>
              <p className="text-sm text-[#8FA39A] leading-relaxed">
                {activeNode.desc}
              </p>
            </motion.div>
          )}
          {!activeNode && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 font-mono text-[11px] tracking-[0.15em] uppercase text-[#4A6358]"
            >
              hover a node to explore
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile card grid (shown < md) ──────────────────────────────── */}
      <div className="mt-8 md:hidden w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FOCUS_AREAS.map((node) => (
          <div
            key={node.id}
            className="rounded-xl border border-[rgba(43,224,176,0.15)] bg-[#0D1815] p-5 space-y-2 hover:border-[rgba(43,224,176,0.3)] transition-colors"
          >
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#2BE0B0]">
              {node.label}
            </div>
            <p className="text-xs text-[#8FA39A] leading-[1.7]">{node.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
