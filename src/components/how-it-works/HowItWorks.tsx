"use client";

import { motion } from "framer-motion";
import { copy } from "@/content/copy";
import { EASE_CINEMA } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section
      aria-label="How it works"
      className="relative py-32 md:py-44 bg-bone"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA }}
          className="font-display italic text-ink leading-[0.97] tracking-[-0.03em] max-w-[16ch]"
          style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
        >
          {copy.howItWorks.heading}
        </motion.h2>

        <div className="mt-20 md:mt-28 flex flex-col gap-16 md:gap-24">
          {copy.howItWorks.steps.map((step, i) => (
            <Step key={i} index={i} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  step,
}: {
  index: number;
  step: (typeof copy.howItWorks.steps)[number];
}) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-t border-ink/15 pt-10 md:pt-14"
    >
      <div className="md:col-span-3 font-mono text-[11px] tracking-[0.18em] uppercase text-ink/50">
        {step.kicker}
      </div>
      <div className="md:col-span-9">
        <h3
          className="font-display tracking-[-0.025em] text-ink leading-[1.02]"
          style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}
        >
          {index === 1 ? (
            <>
              <em
                className="italic"
                style={{
                  fontVariationSettings: "'SOFT' 50, 'WONK' 1",
                }}
              >
                It checks
              </em>{" "}
              your <UnderlineAccent>calendar</UnderlineAccent> in real time.
            </>
          ) : (
            step.title
          )}
        </h3>
        <p className="mt-5 max-w-[60ch] text-[18px] md:text-[20px] leading-[1.55] tracking-[-0.01em] text-ink/75">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

function UnderlineAccent({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 -bottom-0.5 h-[6px] md:h-[8px]"
        style={{
          background: "var(--color-ember)",
          opacity: 0.85,
          transform: "skewX(-6deg)",
          borderRadius: 1,
        }}
      />
    </span>
  );
}
