"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type ChartMatch = {
  id: string;
  tooth: number;
  surfaces: string;
  condition: string;
  conditionToken: string;
  status: "completed" | "active" | "planned";
  source: string;
};

type BillingMatch = {
  id: string;
  code: string;
  name: string;
  scope: string;
  toothBadge?: string;
};

const noteLines = [
  "SAP done",
  "Fluoride done",
  "Etch · bond · sectional matrix",
  "46MOD filling A3 CR",
  "47MO filling A3 CR done",
];

const chartMatches: ChartMatch[] = [
  {
    id: "c1",
    tooth: 46,
    surfaces: "MOD",
    condition: "Filling (Composite)",
    conditionToken: "var(--color-chart-filling-composite)",
    status: "completed",
    source: "46MOD filling A3 CR",
  },
  {
    id: "c2",
    tooth: 47,
    surfaces: "MO",
    condition: "Filling (Composite)",
    conditionToken: "var(--color-chart-filling-composite)",
    status: "completed",
    source: "47MO filling A3 CR done",
  },
];

const billingMatches: BillingMatch[] = [
  { id: "b1", code: "SVC009", name: "Exam and consultation", scope: "Consultation" },
  { id: "b2", code: "SVC093", name: "Scaling and polishing", scope: "Scaling and polishing" },
  { id: "b3", code: "SVC087", name: "Fluoride application", scope: "Topical fluoride" },
  {
    id: "b4",
    code: "SVC121",
    name: "Tooth-coloured filling (complex)",
    scope: "Filling",
    toothBadge: "#46 MOD",
  },
  {
    id: "b5",
    code: "SVC121",
    name: "Tooth-coloured filling (complex)",
    scope: "Filling",
    toothBadge: "#47 MO",
  },
];

type Stage = "empty" | "typed" | "matched";

export default function CaseNoteParseMock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hasDemoedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [stage, setStage] = useState<Stage>(reduceMotion ? "matched" : "empty");

  const runDemo = useCallback(() => {
    const t1 = setTimeout(() => setStage("typed"), 700);
    const t2 = setTimeout(() => setStage("matched"), 700 + 900);
    demoTimersRef.current = [t1, t2];
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasDemoedRef.current) return;
        hasDemoedRef.current = true;
        observer.disconnect();
        runDemo();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, runDemo]);

  useEffect(() => {
    return () => {
      for (const t of demoTimersRef.current) clearTimeout(t);
      demoTimersRef.current = [];
    };
  }, []);

  const showText = stage !== "empty";
  const showMatches = stage === "matched";

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="A dentist's case note typed in plain prose, parsed into two chart entries (tooth 46 MOD and tooth 47 MO composite fillings) and five billing line items, with the patient billing tier inferred as Private."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[560px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>New case note</span>
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
          Devi Krishnan · #1054
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] p-3 min-h-[112px]">
        <ul className="grid gap-1 text-sm text-[var(--color-text)] font-mono leading-snug">
          {noteLines.map((line, i) => (
            <motion.li
              key={line}
              initial={reduceMotion ? false : { opacity: 0, y: 2 }}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 2 }}
              transition={{ duration: 0.18, delay: showText ? i * 0.08 : 0 }}
              className="whitespace-pre-wrap"
            >
              {line}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Chart matches</h3>
          <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={showMatches ? "matched-c" : "pending-c"}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {showMatches ? `${chartMatches.length} matches` : "parsing…"}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <p className="text-[11px] text-[var(--color-text-soft)]">
          Shade the odontogram on save · status inferred from “done” marker
        </p>
        <ul className="grid gap-1.5 mt-1">
          {chartMatches.map((m, i) => (
            <motion.li
              key={m.id}
              initial={reduceMotion ? false : { opacity: 0, y: 3 }}
              animate={showMatches ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.2, delay: showMatches ? i * 0.08 : 0 }}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-2.5 py-2"
            >
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: m.conditionToken }}
                />
                <span className="font-mono text-[11px] tabular-nums text-[var(--color-text)] font-semibold">
                  #{m.tooth}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-[var(--color-text-muted)]">
                  {m.surfaces}
                </span>
              </span>
              <span className="text-[12px] text-[var(--color-text)] truncate">{m.condition}</span>
              <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.1em] rounded-full border border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_28%)] bg-[color-mix(in_oklch,var(--color-sea),white_72%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] px-1.5 py-0.5 whitespace-nowrap">
                {m.status}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-2 border-t border-[var(--color-border)] pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-semibold text-[var(--color-text)]">Billing matches</h3>
          <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={showMatches ? "matched-b" : "pending-b"}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {showMatches ? `${billingMatches.length} matches` : "parsing…"}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <p className="text-[11px] text-[var(--color-text-soft)]">
          Inferred tier: <span className="font-medium text-[var(--color-text-muted)]">Private</span>{" "}
          · CHAS / Pioneer / Merdeka rates substitute when patient is eligible
        </p>
        <ul className="grid gap-1.5 mt-1">
          {billingMatches.map((m, i) => (
            <motion.li
              key={m.id}
              initial={reduceMotion ? false : { opacity: 0, y: 3 }}
              animate={showMatches ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.2, delay: showMatches ? 0.15 + i * 0.07 : 0 }}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-2.5 py-2"
            >
              <span className="font-mono text-[10px] tabular-nums text-[var(--color-text-soft)]">
                {m.code}
              </span>
              <span className="text-[12px] text-[var(--color-text)] truncate">{m.name}</span>
              <span className="inline-flex items-center text-[10px] font-medium rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)] px-1.5 py-0.5 whitespace-nowrap">
                {m.toothBadge ?? m.scope}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3">
        Dentist confirms before save · audit-logged · chart and bill update from the same prose
      </p>
    </div>
  );
}
