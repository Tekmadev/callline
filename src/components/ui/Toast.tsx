"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE_CINEMA } from "@/lib/constants";

export function Toast({
  show,
  message,
}: {
  show: boolean;
  message: string;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_CINEMA }}
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-4"
        >
          <div className="font-mono text-[11px] tracking-[0.08em] uppercase bg-ink text-bone px-4 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
            {message}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
