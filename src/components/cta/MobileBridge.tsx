"use client";

import { motion } from "framer-motion";
import { EASE_CINEMA, PHONE_NUMBER_DISPLAY } from "@/lib/constants";
import { CallButton } from "@/components/ui/CallButton";

/**
 * Mobile-only narrative bridge between the hero phone and the wow phone.
 * On desktop the two phones never meet (hero phone is right column,
 * wow phone is in the next pinned section), so this is hidden via lg:hidden.
 *
 * Acts as a breather, a story beat, and a low-friction CTA.
 */
export function MobileBridge() {
  return (
    <section
      aria-label="Try the AI right now"
      className="lg:hidden relative bg-bone border-y border-ink/15"
    >
      <div className="mx-auto max-w-[640px] px-6 py-16 flex flex-col gap-6">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE_CINEMA }}
          className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55"
        >
          And then
        </motion.div>

        <motion.h2
          initial={{ y: 22, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.1 }}
          className="font-display italic text-ink leading-[0.95] tracking-[-0.025em]"
          style={{ fontSize: "clamp(44px, 13vw, 72px)" }}
        >
          a real call comes in.
        </motion.h2>

        <motion.p
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.2 }}
          className="text-[16px] leading-[1.5] tracking-[-0.005em] text-ink/70 max-w-[44ch]"
        >
          The AI you’re about to watch is on the line right now. Dial it from
          your phone and pretend to be a homeowner with a leak. It will qualify
          you and book you in under 60 seconds.
        </motion.p>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.32 }}
          className="mt-2"
        >
          <CallButton
            source="mobile_bridge"
            variant="ember"
            label={`Call ${PHONE_NUMBER_DISPLAY} →`}
          />
        </motion.div>
      </div>
    </section>
  );
}
