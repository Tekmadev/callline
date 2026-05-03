"use client";

import { motion } from "framer-motion";
import { EASE_CINEMA } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function SecondaryLink({
  href,
  label,
  source,
  className = "",
  external = true,
}: {
  href: string;
  label: string;
  source: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover="hover"
      onClick={() => trackEvent("cal_link_clicked", { source })}
      className={`group inline-flex items-center gap-2 text-[15px] md:text-[16px] font-sans tracking-[-0.01em] text-ink/80 hover:text-ink transition-colors ${className}`}
    >
      <span className="relative">
        {label}
        <motion.span
          className="absolute left-0 -bottom-0.5 h-px bg-ink/60"
          initial={{ width: "100%" }}
          variants={{ hover: { width: 0 } }}
          transition={{ duration: 0.4, ease: EASE_CINEMA }}
        />
      </span>
      <motion.span
        className="inline-block"
        variants={{ hover: { x: 4 } }}
        transition={{ duration: 0.4, ease: EASE_CINEMA }}
      >
        →
      </motion.span>
    </motion.a>
  );
}
