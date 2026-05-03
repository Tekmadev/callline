"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { copy } from "@/content/copy";
import { EASE_CINEMA } from "@/lib/constants";

export type Phase = 0 | 1 | 2 | 3 | 4;

const phaseFromProgress = (v: number): Phase => {
  if (v < 0.18) return 0;
  if (v < 0.38) return 1;
  if (v < 0.58) return 2;
  if (v < 0.78) return 3;
  return 4;
};

export function PhoneScreens({
  scrollProgress,
  phase,
  variant = "hero",
}: {
  scrollProgress?: MotionValue<number>;
  phase?: Phase;
  /**
   * "hero" → idle phase shows the bright Callline lock screen (AI is ready).
   * "scrolly" → idle phase shows a quiet sleeping phone (moment before the call).
   */
  variant?: "hero" | "scrolly";
}) {
  // Lazy initial state: read scrollProgress once, no setState in effect.
  const [scrollPhase, setScrollPhase] = useState<Phase>(() => {
    if (phase !== undefined) return phase;
    if (scrollProgress) return phaseFromProgress(scrollProgress.get());
    return 0;
  });

  useEffect(() => {
    if (phase !== undefined || !scrollProgress) return;
    const unsub = scrollProgress.on("change", (v) => {
      setScrollPhase(phaseFromProgress(v));
    });
    return () => unsub();
  }, [phase, scrollProgress]);

  const activePhase: Phase = phase !== undefined ? phase : scrollPhase;
  const isSleeping = activePhase === 0 && variant === "scrolly";

  return (
    <div className="relative w-full h-full font-sans">
      {/* Status bar — hidden when sleeping so the screen reads as "off" */}
      {!isSleeping && (
        <div className="absolute top-0 left-0 right-0 z-20 px-7 pt-5 flex items-center justify-between text-white/55 font-mono text-[12px]">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span>•••</span>
            <span className="inline-block w-6 h-3 border border-white/40 rounded-[3px] relative">
              <span className="absolute inset-0.5 right-1 bg-white/55 rounded-[1px]" />
            </span>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {activePhase === 0 && variant === "hero" && <IdleScreen key="idle" />}
        {activePhase === 0 && variant === "scrolly" && (
          <SleepingScreen key="sleeping" />
        )}
        {activePhase === 1 && <MissedCallScreen key="call" />}
        {activePhase === 2 && <TranscriptScreen key="transcript" />}
        {activePhase === 3 && <CalendarScreen key="calendar" />}
        {activePhase === 4 && <StackScreen key="stack" />}
      </AnimatePresence>

      {/* Bottom indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30" />
    </div>
  );
}

function ScreenWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.55, ease: EASE_CINEMA }}
      className="absolute inset-0 px-6 pt-16 pb-10 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function SleepingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE_CINEMA }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* The phone is "asleep" — screen reads as off, faint time peeking through */}
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        className="font-display italic text-white/30 leading-none tracking-[-0.02em]"
        style={{ fontSize: 48 }}
      >
        2:47
      </motion.div>
      <div className="mt-3 font-mono text-[9px] tracking-[0.24em] uppercase text-white/20">
        Tuesday
      </div>
      {/* Tiny ember heartbeat — the AI is alive, just standing by */}
      <motion.span
        className="mt-16 block w-1 h-1 rounded-full bg-[var(--color-ember)]"
        animate={{ opacity: [0.25, 0.7, 0.25], scale: [1, 1.4, 1] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  );
}

function IdleScreen() {
  return (
    <ScreenWrap>
      <div className="flex-1 flex flex-col items-center justify-center text-white/85">
        {/* Soft ember halo behind the wordmark so the screen feels alive */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.35, scale: 0.94 }}
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [0.94, 1.02, 0.94] }}
          transition={{
            duration: 4.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            width: 240,
            height: 240,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,91,31,0.18) 0%, rgba(255,91,31,0.05) 45%, rgba(255,91,31,0) 70%)",
            top: "32%",
            filter: "blur(2px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0.85 }}
          animate={{ opacity: [0.78, 1, 0.78] }}
          transition={{
            duration: 4.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative font-display italic text-[42px] leading-none tracking-[-0.02em]"
        >
          Callline
        </motion.div>
        <div className="relative mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 flex items-center gap-2">
          <span className="relative inline-flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[var(--color-ember)]" />
            <motion.span
              className="absolute inset-0 rounded-full bg-[var(--color-ember)]"
              animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{
                duration: 2.4,
                ease: "easeOut",
                repeat: Infinity,
              }}
            />
          </span>
          On the line
        </div>
        <div className="relative mt-12 font-mono text-[10px] tracking-[0.16em] uppercase text-white/35">
          Tuesday · 2:47 PM
        </div>
      </div>
    </ScreenWrap>
  );
}

function MissedCallScreen() {
  const data = copy.wow.phases[1].screen as Extract<
    (typeof copy.wow.phases)[number]["screen"],
    { kind: "missed-call" }
  >;
  return (
    <ScreenWrap>
      <div className="flex items-center gap-2 text-[var(--color-ember)] font-mono text-[10px] tracking-[0.2em] uppercase mb-4">
        <span className="relative inline-flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full bg-[var(--color-ember)]" />
          <motion.span
            className="absolute inset-0 rounded-full bg-[var(--color-ember)]"
            animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity }}
          />
        </span>
        {data.tag}
      </div>

      <motion.div
        layout
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_CINEMA }}
        className="rounded-[18px] bg-white/[0.07] backdrop-blur-sm border border-white/10 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-[var(--color-ember)]/90 flex items-center justify-center">
            <span className="font-display italic text-white text-[16px] leading-none">
              S
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-white text-[14px] tracking-[-0.01em] leading-tight truncate">
              {data.name}
            </div>
            <div className="text-white/45 text-[10px] mt-0.5 font-mono tracking-[0.04em] truncate">
              {data.subtitle}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: EASE_CINEMA }}
          className="mt-3 pt-3 border-t border-white/10 text-white/70 text-[11px] leading-snug"
        >
          “Their water heater is leaking. They need someone tonight.”
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6, ease: EASE_CINEMA }}
        className="mt-auto"
      >
        <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[var(--color-ember)] text-white text-[11px] font-mono tracking-[0.14em] uppercase">
          Callline picks up
          <span aria-hidden="true">→</span>
        </div>
      </motion.div>
    </ScreenWrap>
  );
}

function TranscriptScreen() {
  const data = copy.wow.phases[2].screen as Extract<
    (typeof copy.wow.phases)[number]["screen"],
    { kind: "transcript" }
  >;
  return (
    <ScreenWrap>
      <div className="text-white/55 font-mono text-[10px] tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-ember)] animate-pulse" />
        Live · 0.4s answer
      </div>
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        {data.bubbles.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + i * 0.35,
              duration: 0.65,
              ease: EASE_CINEMA,
            }}
            className={`max-w-[86%] ${
              b.who === "callline" ? "self-start" : "self-end"
            }`}
          >
            <div
              className={`text-[10px] mb-1 font-mono tracking-[0.12em] uppercase ${
                b.who === "callline"
                  ? "text-[var(--color-ember)]"
                  : "text-white/45"
              }`}
            >
              {b.who === "callline" ? "Callline" : "Sarah"}
            </div>
            <div
              className={`rounded-[16px] px-4 py-3 text-[12px] leading-snug ${
                b.who === "callline"
                  ? "bg-white text-ink"
                  : "bg-white/10 text-white/90 border border-white/10"
              }`}
            >
              {b.text}
            </div>
          </motion.div>
        ))}
      </div>
    </ScreenWrap>
  );
}

function CalendarScreen() {
  const data = copy.wow.phases[3].screen as Extract<
    (typeof copy.wow.phases)[number]["screen"],
    { kind: "calendar" }
  >;
  return (
    <ScreenWrap>
      <div className="text-white/55 font-mono text-[10px] tracking-[0.2em] uppercase mb-4">
        Calendar
      </div>
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_CINEMA }}
        className="rounded-[18px] bg-white text-ink p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Status badge sits on top — never collides with the name */}
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-[var(--color-ember)] font-mono">
          <span className="inline-block w-1 h-1 rounded-full bg-[var(--color-ember)]" />
          {data.status}
        </div>

        <div
          className="mt-2 font-display italic leading-[1.05] tracking-[-0.02em] truncate"
          style={{ fontSize: 22 }}
          title={data.name}
        >
          {data.name}
        </div>
        <div className="text-ink/65 text-[11px] mt-0.5 truncate">
          {data.job}
        </div>

        {/* Stacked label / value rows so values never get squeezed */}
        <div className="mt-4 pt-3 border-t border-ink/10 space-y-2.5">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
              When
            </div>
            <div className="text-[13px] tracking-[-0.01em] mt-0.5">
              {data.when}
            </div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
              SMS sent
            </div>
            <div className="text-[13px] tracking-[-0.01em] mt-0.5 text-ink/80">
              ✓ Confirmation to Sarah
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: EASE_CINEMA }}
        className="mt-4 text-white/55 text-[10px] font-mono"
      >
        Total time on call: 47 seconds.
      </motion.div>
    </ScreenWrap>
  );
}

function StackScreen() {
  const data = copy.wow.phases[4].screen as Extract<
    (typeof copy.wow.phases)[number]["screen"],
    { kind: "stack" }
  >;
  return (
    <ScreenWrap>
      <div className="text-white/55 font-mono text-[10px] tracking-[0.2em] uppercase mb-4 flex items-center justify-between">
        <span>Today’s bookings</span>
        <span className="text-[var(--color-ember)]">3 new</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {data.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + i * 0.12,
              duration: 0.55,
              ease: EASE_CINEMA,
            }}
            className="rounded-[12px] bg-white/[0.06] border border-white/10 p-3"
          >
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-white text-[13px] tracking-[-0.01em] leading-tight truncate">
                  {item.name}
                </div>
                <div className="text-white/55 text-[10px] mt-0.5 truncate">
                  {item.job}
                </div>
              </div>
              <div className="shrink-0 text-white/70 text-[10px] font-mono whitespace-nowrap pt-0.5">
                {item.when}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScreenWrap>
  );
}

