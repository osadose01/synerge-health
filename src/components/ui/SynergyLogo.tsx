import React from "react";

interface SynergyLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function SynergyLogo({
  size = "md",
  showWordmark = true,
  className = "",
  wordmarkClassName = "",
}: SynergyLogoProps) {
  // Dimension mapping
  const pxSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 28
      : size === "md"
      ? 38
      : size === "lg"
      ? 56
      : 80;

  // Stroke width responsive tuning for high legibility
  const strokeWidth =
    pxSize <= 28 ? 13 : pxSize <= 44 ? 9 : pxSize <= 60 ? 7.5 : 6;

  const coreRadius = pxSize <= 28 ? 14 : pxSize <= 44 ? 11 : 10;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={pxSize}
        height={pxSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Synerge Health Orbital Logo"
      >
        <defs>
          <linearGradient id="synerge-r1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5FF5CC" />
            <stop offset="100%" stopColor="#12664D" />
          </linearGradient>
          <linearGradient id="synerge-r2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7FCBF2" />
            <stop offset="100%" stopColor="#1B5C7A" />
          </linearGradient>
          <linearGradient id="synerge-r3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2C877" />
            <stop offset="100%" stopColor="#8A5A16" />
          </linearGradient>
          <linearGradient id="synerge-r4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A9E4F5" />
            <stop offset="100%" stopColor="#2E6E86" />
          </linearGradient>
          <radialGradient id="synerge-core">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#2BE0B0" />
            <stop offset="100%" stopColor="#0E4B43" />
          </radialGradient>
          <filter id="synerge-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <g transform="translate(100,100)" strokeLinecap="round">
          {/* 4 Orbital Ellipses representing Founder, Studio, Capital, Market */}
          <ellipse
            rx="72"
            ry="40"
            transform="rotate(15)"
            stroke="url(#synerge-r1)"
            strokeWidth={strokeWidth}
            filter="url(#synerge-soft)"
          />
          <ellipse
            rx="72"
            ry="40"
            transform="rotate(60)"
            stroke="url(#synerge-r2)"
            strokeWidth={strokeWidth}
            filter="url(#synerge-soft)"
          />
          <ellipse
            rx="72"
            ry="40"
            transform="rotate(105)"
            stroke="url(#synerge-r3)"
            strokeWidth={strokeWidth}
            filter="url(#synerge-soft)"
          />
          <ellipse
            rx="72"
            ry="40"
            transform="rotate(150)"
            stroke="url(#synerge-r4)"
            strokeWidth={strokeWidth}
            filter="url(#synerge-soft)"
          />
          {/* Glowing Patient Outcome Core */}
          <circle r={coreRadius} fill="url(#synerge-core)" />
        </g>
      </svg>

      {showWordmark && (
        <div className={`flex items-center ${wordmarkClassName}`}>
          <span className="font-display font-bold tracking-tight text-[#F8FAFC] leading-none text-base sm:text-lg">
            SYNERGE <span className="text-[#2BE0B0]">HEALTH</span>
          </span>
        </div>
      )}
    </div>
  );
}
