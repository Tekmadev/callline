"use client";

import { motion } from "framer-motion";
import { EASE_CINEMA } from "@/lib/constants";

/**
 * Static SVG fallback that ships before the 3D scene loads, and stands in
 * when prefers-reduced-motion is on. Stylized phone slab, not an iPhone.
 */
export function PhonePoster({
  className = "",
  tilt = -12,
}: {
  className?: string;
  tilt?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE_CINEMA }}
      className={`relative h-full w-full flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 720"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: `rotate(${tilt}deg)`,
          maxWidth: "min(100%, 360px)",
        }}
      >
        <defs>
          <linearGradient id="phone-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1a18" />
            <stop offset="55%" stopColor="#2a2a28" />
            <stop offset="100%" stopColor="#0e0e0c" />
          </linearGradient>
          <linearGradient id="screen-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1c1a" />
            <stop offset="100%" stopColor="#0a0a09" />
          </linearGradient>
          <radialGradient id="screen-glow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(255,91,31,0.15)" />
            <stop offset="100%" stopColor="rgba(255,91,31,0)" />
          </radialGradient>
        </defs>

        {/* Soft ground shadow */}
        <ellipse cx="180" cy="700" rx="150" ry="14" fill="rgba(0,0,0,0.16)" />

        {/* Phone body */}
        <rect
          x="20"
          y="20"
          width="320"
          height="680"
          rx="48"
          fill="url(#phone-body)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        {/* Side button */}
        <rect x="340" y="200" width="3" height="60" rx="1.5" fill="#0a0a09" />

        {/* Inner bezel */}
        <rect
          x="32"
          y="32"
          width="296"
          height="656"
          rx="40"
          fill="url(#screen-fade)"
        />

        {/* Embered glow */}
        <rect
          x="32"
          y="32"
          width="296"
          height="656"
          rx="40"
          fill="url(#screen-glow)"
        />

        {/* Status row */}
        <text
          x="64"
          y="80"
          fill="rgba(255,255,255,0.55)"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="13"
        >
          9:41
        </text>
        <circle cx="296" cy="74" r="3" fill="rgba(255,255,255,0.55)" />
        <rect
          x="270"
          y="68"
          width="22"
          height="12"
          rx="3"
          stroke="rgba(255,255,255,0.4)"
          fill="none"
        />

        {/* Single subtle wordmark */}
        <text
          x="180"
          y="370"
          textAnchor="middle"
          fill="rgba(244,239,230,0.85)"
          fontFamily="serif"
          fontStyle="italic"
          fontSize="34"
          letterSpacing="-0.5"
        >
          Callline
        </text>
        <text
          x="180"
          y="396"
          textAnchor="middle"
          fill="rgba(244,239,230,0.4)"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="10"
          letterSpacing="2"
        >
          ON THE LINE
        </text>

        {/* Bottom indicator */}
        <rect
          x="140"
          y="664"
          width="80"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.35)"
        />
      </svg>
    </motion.div>
  );
}
