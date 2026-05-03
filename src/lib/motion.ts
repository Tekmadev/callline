import type { Transition, Variants } from "framer-motion";
import { EASE_CINEMA } from "./constants";

export const cinemaEase = EASE_CINEMA;

export const lineMaskVariants: Variants = {
  hidden: { y: "115%" },
  visible: (i: number = 0) => ({
    y: "0%",
    transition: {
      duration: 1.4,
      delay: i * 0.16,
      ease: EASE_CINEMA,
    } as Transition,
  }),
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.05,
      delay: 0.5 + i * 0.1,
      ease: EASE_CINEMA,
    } as Transition,
  }),
};

export const softFadeVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_CINEMA } as Transition,
  },
};
