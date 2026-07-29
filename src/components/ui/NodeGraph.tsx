"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FocusArea {
  id: string;
  label: string;
  desc: string;
  angle: number;
  partners: string[];
  synergyLabel: string;
  synergyDesc: string;
}

const FOCUS_AREAS: FocusArea[] = [
  {
    id: "telemedicine",
    label: "Telemedicine",
    desc: "Remote clinical consultations and asynchronous care delivery across fragmented geographies.",
    angle: 0,
    partners: ["digital-rx", "health-fin"],
    synergyLabel: "SYNERGY LOOP: Consult → Financing → Doorstep Fulfillment",
    synergyDesc: "Direct API integration between telehealth clinicians, e-pharmacy logistics, and embedded patient credit.",
  },
  {
    id: "ai-diagnostics",
    label: "AI Diagnostics",
    desc: "Machine-learning models trained on African patient populations to close diagnostic accuracy gaps.",
    angle: 45,
    partners: ["remote-mon", "hospital-sw"],
    synergyLabel: "SYNERGY LOOP: Predictive Diagnostics → Continuous Monitoring → EMR",
    synergyDesc: "AI screening models sync real-time vital alerts directly into under-resourced hospital EHR workflows.",
  },
  {
    id: "digital-tx",
    label: "Digital Therapeutics",
    desc: "Evidence-based software interventions for chronic disease management and behavioural health.",
    angle: 90,
    partners: ["remote-mon", "health-fin"],
    synergyLabel: "SYNERGY LOOP: Behavioral Rx → IoT Adherence → InsurTech Rewards",
    synergyDesc: "Digital therapy adherence triggers premium discounts on micro-insurance and automated care coaching.",
  },
  {
    id: "hospital-sw",
    label: "Hospital Software",
    desc: "EMR, scheduling, and billing platforms built for under-resourced hospital environments.",
    angle: 135,
    partners: ["ai-diagnostics", "supply-chain", "health-fin"],
    synergyLabel: "SYNERGY LOOP: Operating System → Smart Inventory → Claims Revenue",
    synergyDesc: "Hospital ERP automates drug replenishment with cold-chain suppliers while reconciling insurance claims.",
  },
  {
    id: "remote-mon",
    label: "Remote Monitoring",
    desc: "IoT-enabled vital sign and adherence tracking for patients outside clinical settings.",
    angle: 180,
    partners: ["ai-diagnostics", "telemedicine"],
    synergyLabel: "SYNERGY LOOP: Remote Vitals → Automated Triage → Doctor Dispatch",
    synergyDesc: "Connected sensors escalate patient anomalies to on-call telemedicine teams before acute hospitalization.",
  },
  {
    id: "digital-rx",
    label: "Digital Pharmacy",
    desc: "Last-mile medicine delivery and formulary management for dispersed pharmacies.",
    angle: 225,
    partners: ["telemedicine", "supply-chain"],
    synergyLabel: "SYNERGY LOOP: E-Prescription → Cold-Chain Verification → Last-Mile",
    synergyDesc: "Prescriptions route automatically to verified distributors with tamper-proof track-and-trace audit trails.",
  },
  {
    id: "health-fin",
    label: "Health Fintech",
    desc: "Micro-insurance, BNPL health financing, and claims automation for the uninsured.",
    angle: 270,
    partners: ["hospital-sw", "telemedicine"],
    synergyLabel: "SYNERGY LOOP: BNPL Healthcare → Instant Claims → Care Access",
    synergyDesc: "Embedded health wallets finance out-of-pocket procedures with direct settlement to clinics and virtual doctors.",
  },
  {
    id: "supply-chain",
    label: "Supply Chain",
    desc: "Track-and-trace, cold-chain integrity, and demand forecasting for medical commodities.",
    angle: 315,
    partners: ["hospital-sw", "digital-rx"],
    synergyLabel: "SYNERGY LOOP: Demand Forecasting → Authentic Inventory → Pharmacy",
    synergyDesc: "Predictive procurement eliminates drug stockouts across hospitals and retail pharmacy networks.",
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
              const isActive = active === node.id;
              const isPartner = activeNode?.partners.includes(node.id);
              return (
                <line
                  key={node.id + "-edge"}
                  x1={0} y1={0} x2={x} y2={y}
                  stroke={isActive || isPartner ? "#2BE0B0" : "rgba(43,224,176,0.12)"}
                  strokeWidth={isActive ? 1.4 : isPartner ? 1 : 0.6}
                  strokeOpacity={isActive || isPartner ? 0.9 : 0.5}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* SYNERGY CHORDS: Cross-sector connections when a node is hovered */}
            {activeNode &&
              activeNode.partners.map((partnerId) => {
                const partnerNode = FOCUS_AREAS.find((n) => n.id === partnerId);
                if (!partnerNode) return null;
                const source = polarToXY(activeNode.angle, ORBIT_R);
                const target = polarToXY(partnerNode.angle, ORBIT_R);

                return (
                  <g key={`${activeNode.id}-${partnerId}-synergy`}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#E3A83B"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      strokeOpacity="0.8"
                      className="animate-pulse transition-all duration-500"
                    />
                    {/* Glowing joint dot on the partner */}
                    <circle
                      cx={target.x}
                      cy={target.y}
                      r="4"
                      fill="#E3A83B"
                      className="animate-ping"
                    />
                  </g>
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
            const isPartner = activeNode?.partners.includes(node.id);

            return (
              <button
                key={node.id}
                className="absolute flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-105"
                style={{
                  left: `calc(50% + ${x}px - 50px)`,
                  top: `calc(50% + ${y}px - 14px)`,
                  width: 100,
                  height: 28,
                }}
                onClick={() => setActive(isActive ? null : node.id)}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                aria-label={node.label}
              >
                {/* Full-text Pill Badge */}
                <motion.div
                  className="px-3 py-1 rounded-full border text-[10px] font-mono font-semibold tracking-wider whitespace-nowrap shadow-sm transition-all duration-300"
                  style={{
                    borderColor: isActive
                      ? "#2BE0B0"
                      : isPartner
                      ? "#E3A83B"
                      : "rgba(255,255,255,0.15)",
                    backgroundColor: isActive
                      ? "rgba(43,224,176,0.2)"
                      : isPartner
                      ? "rgba(227,168,59,0.18)"
                      : "#0A120F",
                    color: isActive
                      ? "#2BE0B0"
                      : isPartner
                      ? "#E3A83B"
                      : "#F8FAFC",
                    boxShadow: isActive
                      ? "0 0 16px rgba(43,224,176,0.4)"
                      : isPartner
                      ? "0 0 16px rgba(227,168,59,0.3)"
                      : "none",
                  }}
                >
                  {node.label}
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* ── Node label overlay with Synergy Loop breakdown ─────────── */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="mt-8 max-w-md w-full mx-auto rounded-2xl border border-white/[0.15] bg-[#0D1815] p-6 text-left shadow-[0_10px_30px_rgba(6,11,9,0.5)]"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#2BE0B0] font-bold">
                  {activeNode.label}
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded bg-white/[0.06] text-[#2BE0B0]">
                  Active Node
                </span>
              </div>
              <p className="text-sm text-[#F8FAFC] leading-relaxed mb-4">
                {activeNode.desc}
              </p>

              {/* Cross-sector synergy box */}
              <div className="pt-4 border-t border-white/[0.1] space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E3A83B]" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#E3A83B] font-bold">
                    {activeNode.synergyLabel}
                  </span>
                </div>
                <p className="text-xs text-[#C2D1CB] leading-[1.7]">
                  {activeNode.synergyDesc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-[#647A70] font-mono mr-1">Synergy Partners:</span>
                  {activeNode.partners.map((pId) => {
                    const pNode = FOCUS_AREAS.find((n) => n.id === pId);
                    return (
                      <button
                        key={pId}
                        onClick={() => setActive(pId)}
                        className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-[rgba(227,168,59,0.12)] text-[#E3A83B] border border-[rgba(227,168,59,0.3)] hover:bg-[#E3A83B] hover:text-[#060B09] transition-colors"
                      >
                        {pNode?.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile Horizontal Snap Carousel (shown < md) ───────────────── */}
      <div className="mt-6 md:hidden w-full space-y-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-2 px-1 -mx-1">
          {FOCUS_AREAS.map((node) => (
            <div
              key={node.id}
              className="snap-center shrink-0 w-[86vw] max-w-[340px] rounded-2xl border border-[rgba(43,224,176,0.2)] bg-[#0D1815] p-6 space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#2BE0B0] font-bold">
                    {node.label}
                  </span>
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[#2BE0B0]/10 text-[#2BE0B0]">
                    Focus Area
                  </span>
                </div>
                <p className="text-xs text-[#F2F6F4] leading-[1.7]">{node.desc}</p>
              </div>

              {/* Mobile Synergy Loop badge */}
              <div className="pt-4 border-t border-[rgba(43,224,176,0.12)] space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E3A83B]" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#E3A83B] font-bold">
                    {node.synergyLabel}
                  </span>
                </div>
                <p className="text-[11px] text-[#8FA39A] leading-[1.6]">
                  {node.synergyDesc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe hint */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="font-mono text-[10px] tracking-widest text-[#8FA39A] uppercase">
            ← Swipe to explore sectors →
          </span>
        </div>
      </div>
    </div>
  );
}
