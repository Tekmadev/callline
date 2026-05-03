"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { copy } from "@/content/copy";
import { EASE_CINEMA } from "@/lib/constants";

export function TopBar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .querySelector("#live-cta")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE_CINEMA, delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-40"
    >
      <div
        className={`transition-all duration-500 ease-cinema ${
          solid
            ? "bg-[rgba(244,239,230,0.85)] backdrop-blur-[12px] border-b border-ink/10"
            : "bg-transparent"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[18px] tracking-[-0.02em] text-ink flex items-center gap-2.5 leading-none"
            aria-label="Callline home"
          >
            <span className="relative inline-flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[var(--color-ember)]" />
              <span className="absolute inset-0 rounded-full bg-[var(--color-ember)] animate-ping opacity-60" />
            </span>
            <span className="-mt-0.5">{copy.brand.name}</span>
          </Link>

          <a
            href="#live-cta"
            onClick={onBookClick}
            className="text-[14px] md:text-[15px] font-sans tracking-[-0.01em] text-ink/80 hover:text-ink transition-colors"
          >
            {copy.topbar.bookCta}
            <span className="ml-1.5">→</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
