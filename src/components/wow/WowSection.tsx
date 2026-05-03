"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { copy } from "@/content/copy";
import { EASE_CINEMA } from "@/lib/constants";
import { PhoneMock } from "@/components/three/PhoneMock";

const PHASES = copy.wow.phases;

export function WowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      aria-label="How Callline turns a missed call into a booking"
      className="relative"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 max-w-[1400px] mx-auto px-6 md:px-10 items-center">
          {/* Side text */}
          <div className="relative col-span-1 lg:col-span-5 xl:col-span-5 z-10 order-2 lg:order-1">
            <SideText scrollYProgress={scrollYProgress} />
          </div>

          {/* Phone scene */}
          <div className="relative col-span-1 lg:col-span-7 xl:col-span-7 h-[60svh] lg:h-[80vh] order-1 lg:order-2">
            <PhoneMock
              mode="scrolly"
              scrollProgress={scrollYProgress}
              ariaLabel="A phone showing a missed call becoming a booked job"
            />
          </div>
        </div>

        <ProgressRail scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

function SideText({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  return (
    <div className="relative h-[44vh] lg:h-[60vh] flex items-center">
      <div className="relative w-full">
        {PHASES.map((p, i) => (
          <PhraseLayer
            key={i}
            scrollYProgress={scrollYProgress}
            index={i}
            text={p.sideText}
            kicker={`Phase 0${i + 1} · of 0${PHASES.length}`}
          />
        ))}
      </div>
    </div>
  );
}

function PhraseLayer({
  scrollYProgress,
  index,
  text,
  kicker,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  text: string;
  kicker: string;
}) {
  const total = PHASES.length;
  const start = index / total;
  const end = (index + 1) / total;
  const fadeBuffer = 0.05;
  const opacity = useTransform(scrollYProgress, (p) => {
    const sFadeStart = Math.max(0, start - 0.02);
    const sFull = start + fadeBuffer;
    const eFull = end - fadeBuffer;
    const eFadeEnd = Math.min(1, end + 0.02);
    if (p <= sFadeStart) return 0;
    if (p < sFull) {
      return (p - sFadeStart) / Math.max(0.0001, sFull - sFadeStart);
    }
    if (p <= eFull) return 1;
    if (p < eFadeEnd) {
      return 1 - (p - eFull) / Math.max(0.0001, eFadeEnd - eFull);
    }
    return 0;
  });
  const y = useTransform(scrollYProgress, (p) => {
    if (p <= start) return 24;
    if (p >= end) return -24;
    return 24 - ((p - start) / (end - start)) * 48;
  });

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/45 mb-5">
        {kicker}
      </div>
      <p
        className="font-display tracking-[-0.025em] text-ink leading-[1.02]"
        style={{ fontSize: "clamp(34px, 4.6vw, 64px)" }}
      >
        {text}
      </p>
    </motion.div>
  );
}

function ProgressRail({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 h-[40vh] w-px bg-ink/15"
    >
      <motion.div
        style={{ height, transition: `transform 0.4s ${EASE_CINEMA}` }}
        className="block w-px bg-ink"
      />
    </div>
  );
}
