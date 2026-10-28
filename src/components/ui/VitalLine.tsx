import { HEALTHTECH_FOCUS_AREAS } from "@/data/healthtechFocusAreas";

interface VitalLineProps {
  mode?: "ecg" | "network";
  className?: string;
  color?: string;
}

const ECG_PATH =
  "M0 40 L80 40 L100 40 L120 40 L140 10 L160 70 L180 5 L200 75 L220 40 L260 40 L1000 40";

const NETWORK_NODE_IDS = [
  "telemedicine",
  "clinical-ai",
  "specialized-care",
  "health-insurtech",
  "medical-logistics",
  "pharma-supply",
  "diagnostics-analytics",
  "emr-interoperability",
];
const NODE_POSITIONS: Record<string, [number, number]> = {
  telemedicine: [500, 60],
  "clinical-ai": [720, 140],
  "specialized-care": [760, 320],
  "health-insurtech": [600, 430],
  "medical-logistics": [380, 430],
  "pharma-supply": [220, 320],
  "diagnostics-analytics": [260, 140],
  "emr-interoperability": [500, 240],
};
const NODES = NETWORK_NODE_IDS.map((id) => {
  const area = HEALTHTECH_FOCUS_AREAS.find((item) => item.id === id);
  if (!area) throw new Error(`Missing healthtech focus area: ${id}`);
  const [x, y] = NODE_POSITIONS[id];
  return { id, label: area.graphLabel, x, y };
});

const EDGES: [number, number][] = [
  [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
];

export function VitalLine({
  mode = "ecg",
  className = "",
  color = "#2BE0B0",
}: VitalLineProps) {
  if (mode === "ecg") {
    return (
      <svg
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        className={`w-full overflow-visible ${className}`}
        aria-hidden="true"
      >
        <path d={ECG_PATH} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.16" />
        <path d={ECG_PATH} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 980 490"
      className={`w-full overflow-visible ${className}`}
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={`edge-${i}`}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
      ))}
      {NODES.map((node) => (
        <g
          key={node.id}
        >
          <circle cx={node.x} cy={node.y} r={18} fill={color} fillOpacity={0.06} />
          <circle cx={node.x} cy={node.y} r={5} fill={color} />
          <text
            x={node.x}
            y={node.y + 26}
            textAnchor="middle"
            fill="#8FA39A"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.05em"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
