"use client";

import { motion } from "framer-motion";
import { copy } from "@/content/copy";
import { EASE_CINEMA } from "@/lib/constants";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  return (
    <section
      aria-label="Pricing"
      className="relative bg-bone py-32 md:py-40"
      id="pricing"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.p
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: EASE_CINEMA }}
          className="font-display italic text-[20px] md:text-[24px] tracking-[-0.01em] text-ink/70"
        >
          {copy.pricing.intro}
        </motion.p>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {copy.pricing.plans.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              highlighted={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
