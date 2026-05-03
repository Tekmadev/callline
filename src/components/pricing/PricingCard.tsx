"use client";

import { motion } from "framer-motion";
import { CAL_BOOKING_URL, EASE_CINEMA } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Plan = {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  recurring: string;
  body: string;
  cta: string;
  plan: string;
};

export function PricingCard({
  plan,
  index,
  highlighted = false,
}: {
  plan: Plan;
  index: number;
  highlighted?: boolean;
}) {
  const href = `${CAL_BOOKING_URL}?plan=${encodeURIComponent(plan.plan)}`;

  return (
    <motion.article
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        duration: 1,
        ease: EASE_CINEMA,
        delay: index * 0.12,
      }}
      whileHover={{ y: -4 }}
      className={`relative flex flex-col rounded-[18px] p-8 md:p-10 border transition-colors ${
        highlighted
          ? "bg-ink text-bone border-ink"
          : "bg-bone text-ink border-ink/15"
      }`}
    >
      <div
        className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
          highlighted ? "text-bone/55" : "text-ink/50"
        }`}
      >
        Plan 0{index + 1}
      </div>
      <h3
        className="mt-4 font-display tracking-[-0.025em] leading-[1.05]"
        style={{ fontSize: "clamp(28px, 3vw, 38px)" }}
      >
        {plan.name}
      </h3>

      <div className="mt-6 flex items-baseline gap-3">
        <div
          className="font-display tracking-[-0.04em] leading-none"
          style={{ fontSize: "clamp(56px, 7vw, 96px)" }}
        >
          {plan.price}
        </div>
        <div
          className={`font-mono text-[11px] tracking-[0.14em] uppercase ${
            highlighted ? "text-bone/55" : "text-ink/55"
          }`}
        >
          {plan.priceSuffix}
        </div>
      </div>
      <div
        className={`mt-1 text-[14px] tracking-[-0.01em] ${
          highlighted ? "text-bone/70" : "text-ink/65"
        }`}
      >
        {plan.recurring}
      </div>

      <p
        className={`mt-6 max-w-[42ch] text-[16px] leading-[1.5] tracking-[-0.005em] ${
          highlighted ? "text-bone/75" : "text-ink/75"
        }`}
      >
        {plan.body}
      </p>

      <div className="mt-auto pt-10">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("pricing_card_clicked", { plan: plan.plan })
          }
          className={`group inline-flex items-center gap-2 text-[15px] tracking-[-0.01em] ${
            highlighted ? "text-bone" : "text-ink"
          }`}
        >
          <span className="relative">
            {plan.cta.replace(" →", "")}
            <span
              aria-hidden="true"
              className={`absolute left-0 -bottom-0.5 h-px transition-[width] duration-500 ease-cinema w-full group-hover:w-0 ${
                highlighted ? "bg-bone/60" : "bg-ink/60"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            />
          </span>
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </motion.article>
  );
}
