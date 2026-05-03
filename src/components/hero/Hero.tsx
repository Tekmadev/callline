"use client";

import { motion } from "framer-motion";
import { copy } from "@/content/copy";
import { EASE_CINEMA, CAL_BOOKING_URL } from "@/lib/constants";
import { CallButton } from "@/components/ui/CallButton";
import { SecondaryLink } from "@/components/ui/SecondaryLink";
import { PhoneMock } from "@/components/three/PhoneMock";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden flex items-center"
      aria-label="Hero"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pt-32 md:pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="relative z-10 col-span-1 lg:col-span-7">
          <h1
            className="font-display text-ink leading-[0.93] tracking-[-0.035em]"
            style={{ fontSize: "clamp(56px, 9vw, 144px)" }}
          >
            <Line delay={0.0}>{copy.hero.line1}</Line>
            <Line delay={0.2}>
              {copy.hero.line2Pre}
              <em
                className="italic"
                style={{
                  color: "var(--color-ember)",
                  fontVariationSettings: "'SOFT' 50, 'WONK' 1",
                }}
              >
                {copy.hero.line2Italic}
              </em>
              {copy.hero.line2Post}
            </Line>
            <Line delay={0.4}>{copy.hero.line3}</Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1.05, ease: EASE_CINEMA }}
            className="mt-8 md:mt-10 max-w-[52ch] text-[17px] md:text-[19px] leading-[1.55] text-ink/70"
          >
            {copy.hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.65, duration: 1, ease: EASE_CINEMA }}
            className="mt-10 md:mt-12 flex flex-col gap-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
              <CallButton
                source="hero_primary"
                label={copy.hero.primaryCta.label}
                variant="ember"
              />
              <SecondaryLink
                href={CAL_BOOKING_URL}
                label={copy.hero.secondaryCta.label}
                source="hero_secondary"
              />
            </div>
            <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-ink/55 max-w-[42ch]">
              {copy.hero.primaryCta.hint}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 1.6, ease: EASE_CINEMA }}
          className="relative col-span-1 lg:col-span-5 h-[460px] sm:h-[540px] md:h-[600px] lg:h-[680px] -mr-6 md:-mr-10 lg:mr-[-4vw]"
        >
          <PhoneMock
            mode="hero"
            ariaLabel="Stylized phone resting at an angle, Callline live on the line"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="line-mask">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.4, ease: EASE_CINEMA, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

