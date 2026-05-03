"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import {
  EASE_CINEMA,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_TEL,
} from "@/lib/constants";
import { Toast } from "./Toast";

type Variant = "ember" | "bone";

export function CallButton({
  variant = "ember",
  label,
  source,
  className = "",
}: {
  variant?: Variant;
  label?: string;
  source: string;
  className?: string;
}) {
  const [toast, setToast] = useState<string | null>(null);

  const isMobile = useCallback(() => {
    if (typeof window === "undefined") return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
  }, []);

  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      trackEvent("call_button_clicked", { source });
      if (isMobile()) {
        return; // let the tel: link handle it
      }
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(PHONE_NUMBER_DISPLAY);
        setToast(`Number copied. ${PHONE_NUMBER_DISPLAY}`);
      } catch {
        setToast(`Call ${PHONE_NUMBER_DISPLAY}`);
      }
      window.setTimeout(() => setToast(null), 3000);
    },
    [isMobile, source]
  );

  const palette =
    variant === "ember"
      ? "bg-[var(--color-ember)] text-bone hover:bg-[#ff6a33]"
      : "bg-bone text-ink hover:bg-white";

  return (
    <>
      <motion.a
        href={`tel:${PHONE_NUMBER_TEL}`}
        onClick={onClick}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0, scale: 0.99 }}
        transition={{ duration: 0.4, ease: EASE_CINEMA }}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 md:px-9 md:py-5 text-[15px] md:text-[17px] font-medium tracking-[-0.01em] shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_30px_-12px_rgba(255,91,31,0.55)] transition-colors duration-300 ${palette} ${className}`}
        data-source={source}
        aria-label={`Call Callline at ${PHONE_NUMBER_DISPLAY}`}
      >
        {label ?? `Call our AI now → ${PHONE_NUMBER_DISPLAY}`}
      </motion.a>
      <Toast show={!!toast} message={toast ?? ""} />
    </>
  );
}
