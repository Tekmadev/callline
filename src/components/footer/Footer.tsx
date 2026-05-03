"use client";

import { motion } from "framer-motion";
import { copy } from "@/content/copy";
import {
  CONTACT_EMAIL,
  EASE_CINEMA,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_TEL,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative bg-bone border-t border-ink/15 pt-16 md:pt-24 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ y: 22, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10"
        >
          {/* Wordmark column */}
          <div className="md:col-span-6">
            <div
              className="font-display tracking-[-0.04em] text-ink leading-[0.92]"
              style={{ fontSize: "clamp(80px, 12vw, 200px)" }}
            >
              {copy.footer.wordmark}
            </div>
            <div className="mt-6 font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55">
              {copy.footer.legal}
            </div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.16em] uppercase text-ink/40">
              {copy.footer.year}
            </div>
          </div>

          {/* Middle */}
          <div className="md:col-span-3 md:pt-6">
            <p className="text-[16px] leading-[1.5] tracking-[-0.01em] text-ink/75 max-w-[28ch]">
              {copy.footer.location}
            </p>
          </div>

          {/* Right */}
          <div className="md:col-span-3 md:pt-6 flex flex-col gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[16px] tracking-[-0.01em] text-ink/85 hover:text-ink transition-colors"
            >
              {copy.footer.contactEmail}
            </a>
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              className="text-[16px] tracking-[-0.01em] text-ink/85 hover:text-ink transition-colors"
            >
              {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </motion.div>

        <div className="mt-20 md:mt-32 border-t border-ink/15 pt-6 flex flex-col md:flex-row md:justify-between gap-3 font-mono text-[10px] tracking-[0.16em] uppercase text-ink/35">
          <span>{copy.footer.credit}</span>
          <span>Made with care, not gradients.</span>
        </div>
      </div>
    </footer>
  );
}
