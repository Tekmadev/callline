"use client";

import { motion } from "framer-motion";
import { copy } from "@/content/copy";
import { EASE_CINEMA } from "@/lib/constants";
import { CallButton } from "@/components/ui/CallButton";

export function LiveDemoCta() {
  return (
    <section
      id="live-cta"
      aria-label="Call our AI live"
      className="relative overflow-hidden"
      style={{ background: "var(--color-forest)" }}
    >
      {/* Subtle grain via inline SVG noise */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.95  0 0 0 0 0.95  0 0 0 0.45 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10 py-32 md:py-44 text-bone">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA }}
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-bone/55"
        >
          Live · The actual product
        </motion.div>

        <motion.h2
          initial={{ y: 26, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: EASE_CINEMA, delay: 0.1 }}
          className="mt-6 font-display italic leading-[0.97] tracking-[-0.035em] max-w-[14ch]"
          style={{ fontSize: "clamp(48px, 9vw, 144px)" }}
        >
          {copy.liveCta.heading}
        </motion.h2>

        <motion.p
          initial={{ y: 22, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.25 }}
          className="mt-10 max-w-[58ch] text-[18px] md:text-[20px] leading-[1.55] text-bone/75 tracking-[-0.01em]"
        >
          {copy.liveCta.body}
        </motion.p>

        <motion.div
          initial={{ y: 22, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.4 }}
          className="mt-12 flex flex-col gap-5"
        >
          <CallButton
            source="live_cta"
            variant="ember"
            label={copy.liveCta.button}
          />
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-bone/55">
            {copy.liveCta.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
