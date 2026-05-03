"use client";

import { track } from "@vercel/analytics";

export type CallineEvent =
  | "call_button_clicked"
  | "cal_link_clicked"
  | "pricing_card_clicked";

export function trackEvent(
  name: CallineEvent,
  props?: Record<string, string | number | boolean | null>
) {
  try {
    track(name, props ?? {});
  } catch {
    /* noop */
  }
}
