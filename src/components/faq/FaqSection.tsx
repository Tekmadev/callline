"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { copy } from "@/content/copy";
import { EASE_CINEMA } from "@/lib/constants";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-label="Frequently asked questions"
      className="relative bg-bone py-32 md:py-40"
      id="faq"
    >
      <div className="mx-auto max-w-[960px] px-6 md:px-10">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA }}
          className="font-display italic text-ink leading-[0.97] tracking-[-0.025em]"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          {copy.faq.heading}
        </motion.h2>

        <div className="mt-12 md:mt-16 border-t border-ink/15">
          {copy.faq.items.map((item, i) => (
            <FaqItem
              key={i}
              index={i}
              q={item.q}
              a={item.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  index,
  q,
  a,
  isOpen,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        ease: EASE_CINEMA,
        delay: index * 0.04,
      }}
      className="border-b border-ink/15"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        className="w-full text-left flex items-baseline justify-between gap-6 py-7 md:py-8 group"
      >
        <h3
          className="font-display italic tracking-[-0.015em] text-ink leading-[1.15]"
          style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
        >
          {q}
        </h3>
        <span
          aria-hidden="true"
          className={`shrink-0 mt-1.5 text-ink/50 font-mono text-[13px] tracking-[0.06em] uppercase transition-transform duration-500 ease-cinema ${
            isOpen ? "rotate-45" : ""
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`faq-panel-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_CINEMA }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-8 max-w-[68ch] text-[17px] md:text-[18px] leading-[1.55] tracking-[-0.005em] text-ink/75">
              {a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
