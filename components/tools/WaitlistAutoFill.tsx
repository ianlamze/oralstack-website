"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { candidates, initialAppointments } from "@/content/waitlist/data";
import type { Candidate } from "@/content/waitlist/types";
import { track } from "@/lib/analytics";

type Tone = "sea" | "violet" | "sunset";

const hours = [9, 10, 11, 12, 13, 14, 15];
const chairs = ["Chair 1", "Chair 2", "Chair 3"];

const toneStyles: Record<Tone, { bg: string; border: string }> = {
  sea: {
    bg: "color-mix(in oklch, var(--color-sea), white 70%)",
    border: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
  },
  violet: {
    bg: "color-mix(in oklch, var(--color-violet), white 82%)",
    border: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
  },
  sunset: {
    bg: "color-mix(in oklch, var(--color-sunset), white 70%)",
    border: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 30%)",
  },
};

const cancelledStyle = {
  bg: "color-mix(in oklch, var(--color-sunset-deep), white 88%)",
  border: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)",
  text: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 35%)",
};

const filledStyle = {
  bg: "color-mix(in oklch, var(--color-sea), white 60%)",
  border: "color-mix(in oklch, var(--color-sea), var(--color-ink) 25%)",
};

type StageId = "booked" | "cancelled" | "filling" | "filled";

const TARGET_ID = "a3"; // Demo patient 102 · Hygiene · Chair 3 · 11:00

export default function WaitlistAutoFill() {
  const [stage, setStage] = useState<StageId>("booked");
  const [filledBy, setFilledBy] = useState<Candidate | null>(null);
  const [postDemoNudge, setPostDemoNudge] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const target = useMemo(() => initialAppointments.find((a) => a.id === TARGET_ID), []);

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
    setPostDemoNudge(false);
  }

  function cancelAppointment() {
    markInteracted();
    if (stage !== "booked") return;
    setStage("cancelled");
    track("waitlist_cancel_simulated", { appt_id: TARGET_ID });
  }

  function openWaitlist() {
    markInteracted();
    if (stage !== "cancelled") return;
    setStage("filling");
    track("waitlist_autofill_opened", { candidate_count: candidates.length });
  }

  function pickCandidate(c: Candidate) {
    markInteracted();
    setStage("filled");
    setFilledBy(c);
    track("waitlist_candidate_picked", {
      candidate_id: c.id,
      match_score: c.matchScore,
      waiting_days: c.waitingDays,
    });
  }

  function resetDemo() {
    markInteracted();
    setStage("booked");
    setFilledBy(null);
    track("waitlist_reset", {});
  }

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;

    const cancel = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setStage("cancelled");
    }, 800);

    const open = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setStage("filling");
    }, 800 + 1100);

    const pick = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setFilledBy(candidates[0]);
        setStage("filled");
      },
      800 + 1100 + 1400,
    );

    const nudgeOn = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setPostDemoNudge(true);
      },
      800 + 1100 + 1400 + 700,
    );

    const nudgeOff = setTimeout(
      () => {
        setPostDemoNudge(false);
      },
      800 + 1100 + 1400 + 700 + 3500,
    );

    demoTimersRef.current = [cancel, open, pick, nudgeOn, nudgeOff];
  }, []);

  useEffect(() => {
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasDemoedRef.current || hasInteractedRef.current) return;
        hasDemoedRef.current = true;
        observer.disconnect();
        runDemo();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [runDemo]);

  useEffect(() => {
    return () => {
      for (const t of demoTimersRef.current) clearTimeout(t);
      demoTimersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Schedule · today</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--color-tide-deep)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-tide-deep)]"
            />
            Live demo
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Sample Dental Clinic · Singapore
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8 items-start">
        {/* Schedule grid */}
        <div className="grid gap-3">
          <div className="grid gap-x-1.5 sm:gap-x-2 grid-cols-[34px_repeat(3,minmax(0,1fr))] sm:grid-cols-[40px_repeat(3,minmax(0,1fr))] md:grid-cols-[44px_repeat(3,minmax(0,1fr))] grid-rows-[auto_repeat(7,38px)] sm:grid-rows-[auto_repeat(7,42px)] relative">
            <div />
            {chairs.map((c) => (
              <div
                key={c}
                className="text-[10px] sm:text-[11px] font-medium text-[var(--color-text-muted)] pb-2 text-center"
              >
                {c}
              </div>
            ))}

            {hours.map((h, i) => (
              <div
                key={`hour-${h}`}
                className="text-[9px] sm:text-[10px] text-[var(--color-text-soft)] tabular-nums pt-1"
                style={{ gridColumn: 1, gridRow: i + 2 }}
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}

            {[0, 1, 2].flatMap((c) =>
              hours.map((h, i) => (
                <div
                  key={`grid-${c}-${h}`}
                  className="border-t"
                  style={{
                    gridColumn: c + 2,
                    gridRow: i + 2,
                    borderColor: "color-mix(in oklch, var(--color-line), white 30%)",
                  }}
                />
              )),
            )}

            {initialAppointments.map((a) => {
              const isTarget = a.id === TARGET_ID;
              const isCancelled = isTarget && (stage === "cancelled" || stage === "filling");
              const isFilled = isTarget && stage === "filled";
              const tone = toneStyles[a.tone];
              const displayName = isFilled && filledBy ? filledBy.name : a.patientName;
              const displayProc = isFilled && filledBy ? a.procedure : a.procedure;

              const style = isCancelled
                ? {
                    backgroundColor: cancelledStyle.bg,
                    borderColor: cancelledStyle.border,
                    borderStyle: "dashed" as const,
                  }
                : isFilled
                  ? { backgroundColor: filledStyle.bg, borderColor: filledStyle.border }
                  : { backgroundColor: tone.bg, borderColor: tone.border };

              return (
                <motion.div
                  key={a.id}
                  layout
                  transition={{ layout: { type: "spring", stiffness: 480, damping: 36 } }}
                  className="rounded-md border px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium leading-tight m-0.5 overflow-hidden relative"
                  style={{
                    gridColumn: a.chair + 2,
                    gridRow: `${a.start - hours[0] + 2} / span ${a.len}`,
                    color: isCancelled ? cancelledStyle.text : "var(--color-ink)",
                    ...style,
                  }}
                >
                  <div className="text-[9px] sm:text-[10px] tabular-nums opacity-80 flex items-center justify-between gap-1">
                    <span>{String(a.start).padStart(2, "0")}:00</span>
                    {isCancelled ? (
                      <span className="font-semibold uppercase tracking-[0.08em] text-[8px] sm:text-[9px]">
                        Cancelled
                      </span>
                    ) : isFilled ? (
                      <span className="font-semibold uppercase tracking-[0.08em] text-[8px] sm:text-[9px] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]">
                        Filled
                      </span>
                    ) : null}
                  </div>
                  <div className="truncate sm:whitespace-normal">
                    {isCancelled ? (
                      <span className="line-through opacity-70">
                        {displayProc} · {displayName}
                      </span>
                    ) : (
                      <>
                        {displayProc} · {displayName}
                      </>
                    )}
                  </div>
                  {isTarget && stage === "booked" && (
                    <button
                      type="button"
                      onClick={cancelAppointment}
                      aria-label="Simulate cancellation of this appointment"
                      className="absolute top-0.5 right-0.5 text-[10px] leading-none px-1 rounded text-[var(--color-text-soft)] hover:text-[var(--color-sunset-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)]"
                      title="Simulate cancellation"
                    >
                      ✕
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          <p className="text-[10px] tracking-[0.04em] mt-1 min-h-[14px]">
            <AnimatePresence mode="wait" initial={false}>
              {postDemoNudge ? (
                <motion.span
                  key="nudge"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1 font-semibold text-[var(--color-tide-deep)]"
                >
                  <span aria-hidden>↺</span>
                  Now you try — click ↺ to reset, then × on Demo patient 102
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-[var(--color-text-soft)]"
                >
                  3 chairs · {initialAppointments.length} booked · click × on any slot to simulate a
                  cancel
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>

        {/* Right column: action panel that morphs by stage */}
        <aside className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 min-h-[260px]">
          <AnimatePresence mode="wait" initial={false}>
            {stage === "booked" && (
              <motion.div
                key="booked"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="grid gap-2"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
                  Waitlist · 12 patients
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  When a patient cancels, the front desk has minutes — not hours — to fill the slot
                  before it&apos;s lost revenue. Click <span aria-hidden>×</span> on{" "}
                  {target ? (
                    <span className="font-medium text-[var(--color-text)]">
                      {target.patientName}&apos;s {target.procedure.toLowerCase()}
                    </span>
                  ) : (
                    "any appointment"
                  )}{" "}
                  at {target ? `${String(target.start).padStart(2, "0")}:00` : "11:00"} to see what
                  Oralstack does next.
                </p>
              </motion.div>
            )}

            {stage === "cancelled" && (
              <motion.div
                key="cancelled"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="grid gap-3"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
                  Slot cancelled · S$140 at risk
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {target?.patientName} just cancelled their {target?.procedure.toLowerCase()}. The
                  waitlist already knows who&apos;s the best match — auto-ranked by procedure fit,
                  slot length, distance, and recall age.
                </p>
                <button
                  type="button"
                  onClick={openWaitlist}
                  className="justify-self-start inline-flex items-center min-h-[40px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2.5 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
                >
                  Auto-fill from waitlist →
                </button>
              </motion.div>
            )}

            {stage === "filling" && (
              <motion.div
                key="filling"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="grid gap-2"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
                  Top {candidates.length} candidates
                </p>
                <ul className="grid gap-2">
                  {candidates.map((c, i) => (
                    <motion.li
                      key={c.id}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.16, delay: i * 0.05 }}
                    >
                      <button
                        type="button"
                        onClick={() => pickCandidate(c)}
                        className="w-full text-left grid gap-1.5 rounded-md border border-[var(--color-border)] bg-white p-3 hover:border-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] transition-colors"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[13px] font-semibold text-[var(--color-text)]">
                            {c.name}
                          </span>
                          <span className="text-[10px] tabular-nums font-semibold text-[var(--color-tide-deep)]">
                            {Math.round(c.matchScore * 100)}% match
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-[var(--color-canvas-tinted)] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${c.matchScore * 100}%` }}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                            className="h-full bg-[var(--color-tide-deep)]"
                          />
                        </div>
                        <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
                          Waiting {c.waitingDays} days · for {c.procedureWanted}
                        </p>
                        <ul className="flex flex-wrap gap-1">
                          {c.reasons.map((r) => (
                            <li
                              key={r}
                              className="inline-flex items-center text-[9px] uppercase tracking-[0.06em] rounded-full border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 text-[var(--color-text-muted)]"
                            >
                              ✓ {r}
                            </li>
                          ))}
                        </ul>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {stage === "filled" && filledBy && (
              <motion.div
                key="filled"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                className="grid gap-2"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] font-semibold">
                  ✓ Slot filled · WhatsApp sent
                </p>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {filledBy.name} confirmed for{" "}
                  {target ? `${String(target.start).padStart(2, "0")}:00` : "11:00"}
                </p>
                <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">
                  Waitlist position cleared. Confirmation sent via WhatsApp Business API,
                  audit-logged. Revenue at risk from cancel: <strong>S$0</strong>.
                </p>
                <button
                  type="button"
                  onClick={resetDemo}
                  className="justify-self-start text-[11px] font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
                >
                  ↺ Reset and try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>

      <div className="mt-6 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your waitlist → book a demo
        </a>
      </div>
    </div>
  );
}
