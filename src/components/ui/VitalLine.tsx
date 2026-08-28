"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface VitalLineProps {
  /** "ecg" = single horizontal ECG trace; "network" = branching node graph */
  mode?: "ecg" | "network";
  className?: string;
  delay?: number;
  color?: string;
  /** When true, increases glow resonance and shifts accent color to gold on hover */
  activeResonance?: boolean;
}

// Pre-computed ECG path (normalised to 1000×80 viewBox)
const ECG_PATH =
  "M0 40 L80 40 L100 40 L120 40 L140 10 L160 70 L180 5 L200 75 L220 40 L260 40 L1000 40";

// Eight focus-area nodes in an abstract orbit
const NODES = [
  { id: "telemedicine",    label: "Telemedicine",       x: 500, y: 60  },
  { id: "ai-diagnostics",  label: "AI Diagnostics",     x: 720, y: 140 },
  { id: "digital-tx",      label: "Digital Therapeutics",x: 760, y: 320 },
  { id: "hospital-sw",     label: "Hospital Software",  x: 600, y: 430 },
  { id: "remote-mon",      label: "Remote Monitoring",  x: 380, y: 430 },
  { id: "digital-rx",      label: "Digital Pharmacy",   x: 220, y: 320 },
  { id: "health-fin",      label: "Health Fintech",     x: 260, y: 140 },
  { id: "supply-chain",    label: "Supply Chain",       x: 500, y: 240 },
];

// Edges connecting the outer ring (0–6) → center (7)
const EDGES: [number, number][] = [
  [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
];

export function VitalLine({
  mode = "ecg",
  className = "",
  delay = 0,
  color = "#2BE0B0",
  activeResonance = false,
}: VitalLineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  const activeColor = activeResonance ? "#E3A83B" : color;

  if (mode === "ecg") {
    return (
      <svg
        ref={ref}
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        className={`w-full overflow-visible transition-all duration-500 ${className}`}
        aria-hidden="true"
      >
        <motion.path
          d={ECG_PATH}
          fill="none"
          stroke={activeColor}
          strokeWidth={activeResonance ? "2.2" : "1.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2, delay: 0 },
          }}
        />
        {/* Glow duplicate */}
        <motion.path
          d={ECG_PATH}
          fill="none"
          stroke={activeColor}
          strokeWidth={activeResonance ? "8" : "4"}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={activeResonance ? 0.55 : 0.18}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{
            pathLength: { duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] },
          }}
        />
      </svg>
    );
  }

  // Network mode
  return (
    <svg
      ref={ref}
      viewBox="0 0 980 490"
      className={`w-full overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* Edges */}
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke={activeColor}
          strokeWidth="0.8"
          strokeOpacity={0.3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: delay + i * 0.06, ease: "easeOut" }}
        />
      ))}

      {/* Nodes */}
      {NODES.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.6 + i * 0.08 }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          {/* Outer glow ring */}
          <circle cx={node.x} cy={node.y} r={18} fill={activeColor} fillOpacity={0.06} />
          {/* Node dot */}
          <circle cx={node.x} cy={node.y} r={5} fill={activeColor} />
          {/* Label */}
          <text
            x={node.x}
            y={node.y + 26}
            textAnchor="middle"
            fill="#8FA39A"
            fontSize="10"
            fontFamily="var(--font-jetbrains, monospace)"
            letterSpacing="0.05em"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
