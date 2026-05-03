"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { PhoneScreens } from "@/components/wow/PhoneScreens";
import { EASE_CINEMA } from "@/lib/constants";

/**
 * 2D phone mockup with CSS perspective for a 3D feel. Replaces the R3F
 * scene because the Html overlay scaling fights with the 3D slab and the
 * editorial direction reads better in pure CSS anyway.
 */
export function PhoneMock({
  mode = "hero",
  scrollProgress,
  ariaLabel,
}: {
  mode?: "hero" | "scrolly";
  scrollProgress?: MotionValue<number>;
  ariaLabel?: string;
}) {
  if (mode === "scrolly" && scrollProgress) {
    return (
      <ScrollyPhone
        scrollProgress={scrollProgress}
        ariaLabel={ariaLabel}
      />
    );
  }
  return <HeroPhone ariaLabel={ariaLabel} />;
}

function HeroPhone({ ariaLabel }: { ariaLabel?: string }) {
  const reduced = useReducedMotion();
  return (
    <div
      role="img"
      aria-label={ariaLabel ?? "Callline phone, on the line"}
      className="relative h-full w-full flex items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        initial={{ rotateY: -22, rotateX: 8, rotateZ: 4 }}
        animate={
          reduced
            ? { rotateY: -18, rotateX: 6, rotateZ: 3, y: 0 }
            : {
                rotateY: [-18, -14, -18],
                rotateX: [6, 8, 6],
                rotateZ: [3, 4.5, 3],
                y: [-8, 8, -8],
              }
        }
        transition={
          reduced
            ? { duration: 1.2, ease: EASE_CINEMA }
            : { duration: 9, ease: "easeInOut", repeat: Infinity }
        }
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <PhoneSlab variant="hero" />
      </motion.div>
    </div>
  );
}

function ScrollyPhone({
  scrollProgress,
  ariaLabel,
}: {
  scrollProgress: MotionValue<number>;
  ariaLabel?: string;
}) {
  const reduced = useReducedMotion();

  const rotY = useTransform(scrollProgress, (p) => {
    if (reduced) return 0;
    if (p < 0.2) return -18 * (1 - p / 0.2);
    if (p < 0.85) return 0;
    return -12 * ((p - 0.85) / 0.15);
  });
  const rotX = useTransform(scrollProgress, (p) => {
    if (reduced) return 0;
    if (p < 0.2) return 5 * (1 - p / 0.2);
    if (p < 0.85) return 0;
    return -6 * ((p - 0.85) / 0.15);
  });
  const rotZ = useTransform(scrollProgress, (p) => {
    if (reduced) return 0;
    if (p < 0.2) return 2 * (1 - p / 0.2);
    if (p < 0.85) return 0;
    return -3 * ((p - 0.85) / 0.15);
  });
  const scale = useTransform(scrollProgress, (p) => {
    if (p < 0.2) return 1;
    if (p < 0.85) return 1.04;
    return 1.04 - 0.06 * ((p - 0.85) / 0.15);
  });

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? "Callline turning a missed call into a booked job"}
      className="relative h-full w-full flex items-center justify-center"
      style={{ perspective: "1600px" }}
    >
      <motion.div
        style={{
          rotateY: rotY,
          rotateX: rotX,
          rotateZ: rotZ,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <PhoneSlab scrollProgress={scrollProgress} variant="scrolly" />
      </motion.div>
    </div>
  );
}

function PhoneSlab({
  scrollProgress,
  variant = "hero",
}: {
  scrollProgress?: MotionValue<number>;
  variant?: "hero" | "scrolly";
}) {
  return (
    <div
      className="relative w-[200px] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px]"
      style={{
        aspectRatio: "9 / 19",
        maxHeight: "82vh",
      }}
    >
      {/* Outer body — brushed dark metal gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[42px]"
        style={{
          background:
            "linear-gradient(135deg, #2c2c2a 0%, #1a1a18 45%, #0e0e0c 100%)",
          boxShadow: [
            "0 80px 140px -50px rgba(14,14,12,0.55)",
            "0 30px 60px -20px rgba(14,14,12,0.35)",
            "inset 0 0 0 1px rgba(255,255,255,0.06)",
            "inset 0 1px 0 rgba(255,255,255,0.12)",
          ].join(", "),
        }}
      />

      {/* Subtle highlight sweep across the body */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[42px] pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 62%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Side button (right) */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          right: -2,
          top: "26%",
          width: 3,
          height: "10%",
          borderRadius: 2,
          background: "linear-gradient(180deg, #3a3a36 0%, #1a1a18 100%)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
        }}
      />

      {/* Volume buttons (left) */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: -2,
          top: "30%",
          width: 3,
          height: "8%",
          borderRadius: 2,
          background: "linear-gradient(180deg, #3a3a36 0%, #1a1a18 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: -2,
          top: "42%",
          width: 3,
          height: "8%",
          borderRadius: 2,
          background: "linear-gradient(180deg, #3a3a36 0%, #1a1a18 100%)",
        }}
      />

      {/* Inner bezel / glass surround */}
      <div
        className="absolute rounded-[34px] overflow-hidden"
        style={{
          inset: 8,
          background: "#0a0a09",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.5) inset",
        }}
      >
        {/* The screen itself: existing PhoneScreens component */}
        <PhoneScreens scrollProgress={scrollProgress} variant={variant} />

        {/* Subtle screen reflection sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.04) 100%)",
          }}
        />
      </div>
    </div>
  );
}
