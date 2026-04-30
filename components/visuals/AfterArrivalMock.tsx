"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// "After Oralstack" pane for the Arrival & huddle stage. Shows the
// arrival check-in card, medical alerts surfaced to chairside, and the
// chair-ready countdown.

type Severity = "high" | "medium" | "low";

const alerts: Array<{ label: string; detail: string; severity: Severity }> = [
  { label: "Warfarin", detail: "anticoagulant · re-check INR before extraction", severity: "high" },
  { label: "Premed required", detail: "amoxicillin 2g 1h pre-procedure", severity: "high" },
  { label: "Penicillin allergy", detail: "documented 2024 · use clindamycin", severity: "medium" },
  { label: "Recent BP", detail: "SBP 145 last visit · re-check at chair", severity: "low" },
];

const severityStyles: Record<Severity, string> = {
  high: "border-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)] bg-[color-mix(in_oklch,var(--color-sunset),white_82%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]",
  medium:
    "border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] text-[var(--color-text)]",
  low: "border-[var(--color-border)] bg-white text-[var(--color-text-muted)]",
};

const severityLabel: Record<Severity, string> = {
  high: "high",
  medium: "med",
  low: "low",
};

export default function AfterArrivalMock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hasDemoedRef = useRef(false);
  const [shown, setShown] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        hasDemoedRef.current = true;
        observer.disconnect();
        setTimeout(() => setShown(true), 500);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="After-Oralstack arrival: a check-in card showing the patient arrived at 09:28 with eligibility resolved, four medical alerts surfaced to the chairside view (two high-severity, one medium, one low), and a chair-ready countdown showing under 5 minutes from arrival to chair."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Arrival · check-in card</span>
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
          Mei Lin Tan · #1042
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_28%)] bg-[color-mix(in_oklch,var(--color-sea),white_82%)] px-3 py-2.5">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_45%)] text-[var(--color-canvas)] text-[12px] font-bold">
          ✓
        </span>
        <div className="grid gap-0.5 min-w-0">
          <span className="text-[12px] font-semibold text-[var(--color-text)]">
            Arrived · 09:28
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)] truncate">
            CHAS Blue resolved · intake complete · Dr Lim · chair 2
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.12em] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] font-semibold">
          Chair ready
        </span>
      </div>

      <div className="mt-5 grid gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Medical alerts · surfaced to chair
          </p>
          <span className="text-[10px] uppercase tracking-[0.12em] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
            2 high
          </span>
        </div>
        <ul className="grid gap-1.5">
          {alerts.map((a, i) => (
            <motion.li
              key={a.label}
              initial={reduceMotion ? false : { opacity: 0, y: 3 }}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.22, delay: shown ? i * 0.08 : 0 }}
              className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-2 ${severityStyles[a.severity]}`}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-current shrink-0"
              />
              <div className="grid gap-0.5 min-w-0">
                <span className="text-[12px] font-medium truncate">{a.label}</span>
                <span className="text-[11px] not-italic opacity-80 truncate">{a.detail}</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.14em] font-semibold whitespace-nowrap">
                {severityLabel[a.severity]}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>Arrival → chair</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">under 5 min</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Daily huddle dashboard</span>
          <span>open to all staff · synced</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Missed alerts this month</span>
          <span className="tabular-nums">0</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
        Eligibility pre-resolved · alerts surface chairside · audit-logged at first chairside view
      </p>
    </div>
  );
}
