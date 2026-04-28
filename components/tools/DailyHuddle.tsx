"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  arRedFlags,
  productionToday,
  recallOpportunities,
  todaySchedule,
} from "@/content/huddle/data";
import { track } from "@/lib/analytics";

type PaneId = "schedule" | "recall" | "ar" | "production";

const PANE_ORDER: PaneId[] = ["schedule", "recall", "ar", "production"];

function format(n: number) {
  return `S$${n.toLocaleString("en-SG", { maximumFractionDigits: 0 })}`;
}

export default function DailyHuddle() {
  const [highlighted, setHighlighted] = useState<PaneId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
  }

  function focusPane(id: PaneId) {
    markInteracted();
    setHighlighted((cur) => (cur === id ? null : id));
    track("huddle_pane_focused", { pane: id });
  }

  const stats = useMemo(() => {
    const totalSlots = todaySchedule.length;
    const booked = todaySchedule.filter((s) => s.filled).length;
    const gaps = totalSlots - booked;
    const productionPct = Math.round((productionToday.current / productionToday.goal) * 100);
    const totalAR = arRedFlags.reduce((sum, r) => sum + r.amount, 0);
    return { totalSlots, booked, gaps, productionPct, totalAR };
  }, []);

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;
    PANE_ORDER.forEach((pane, i) => {
      const on = setTimeout(
        () => {
          if (hasInteractedRef.current) return;
          setHighlighted(pane);
        },
        700 + i * 700,
      );
      const off = setTimeout(
        () => {
          if (hasInteractedRef.current) return;
          if (i === PANE_ORDER.length - 1) return; // leave the last one highlighted briefly
          setHighlighted(null);
        },
        700 + i * 700 + 500,
      );
      demoTimersRef.current.push(on, off);
    });

    const finalClear = setTimeout(() => setHighlighted(null), 700 + PANE_ORDER.length * 700 + 1000);
    demoTimersRef.current.push(finalClear);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting) return;
        if (hasDemoedRef.current || hasInteractedRef.current) return;
        hasDemoedRef.current = true;
        obs.disconnect();
        runDemo();
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduceMotion, runDemo]);

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
          <span>Daily huddle · 8:30 AM</span>
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
          DFI Synergy · today
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <Pane
          id="schedule"
          highlighted={highlighted === "schedule"}
          onFocus={focusPane}
          eyebrow="Today's schedule"
          metric={`${stats.booked}/${stats.totalSlots}`}
          metricLabel="booked"
          subline={`${stats.gaps} gap${stats.gaps === 1 ? "" : "s"} · 3 chairs · 09:00–15:00`}
          reduceMotion={!!reduceMotion}
        >
          <div className="grid grid-cols-6 gap-0.5 mt-2">
            {todaySchedule.map((s) => (
              <span
                key={`${s.time}-${s.chair}`}
                aria-hidden
                title={`${s.time} · Chair ${s.chair} · ${s.filled ? s.label : "open"}`}
                className="h-3 rounded-sm"
                style={{
                  backgroundColor: s.filled
                    ? "color-mix(in oklch, var(--color-sea), white 65%)"
                    : "color-mix(in oklch, var(--color-sunset-deep), white 75%)",
                  border: `1px solid ${s.filled ? "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)" : "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 30%)"}`,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </Pane>

        <Pane
          id="recall"
          highlighted={highlighted === "recall"}
          onFocus={focusPane}
          eyebrow="Recall opportunities"
          metric={`${recallOpportunities.length}`}
          metricLabel="due now"
          subline="Sites surface 3 weeks before due · WhatsApp templated"
          reduceMotion={!!reduceMotion}
        >
          <ul className="grid divide-y divide-[var(--color-border)] mt-2 text-[11px]">
            {recallOpportunities.map((r) => (
              <li
                key={r.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 py-1.5 items-baseline"
              >
                <span className="truncate text-[var(--color-text)]">
                  {r.name}{" "}
                  <span className="text-[var(--color-text-soft)] text-[10px]">· {r.procedure}</span>
                </span>
                <span className="tabular-nums text-[var(--color-text-muted)]">
                  {r.overdueWeeks}w over
                </span>
              </li>
            ))}
          </ul>
        </Pane>

        <Pane
          id="ar"
          highlighted={highlighted === "ar"}
          onFocus={focusPane}
          eyebrow="AR red-flags"
          metric={format(stats.totalAR)}
          metricLabel="outstanding"
          subline={`${arRedFlags.length} invoice${arRedFlags.length === 1 ? "" : "s"} · 30+ days`}
          reduceMotion={!!reduceMotion}
        >
          <ul className="grid divide-y divide-[var(--color-border)] mt-2 text-[11px]">
            {arRedFlags.map((r) => (
              <li
                key={r.invoice}
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2 py-1.5 items-baseline"
              >
                <span className="truncate text-[var(--color-text)]">{r.name}</span>
                <span className="tabular-nums text-[var(--color-text-soft)] text-[10px]">
                  {r.daysOutstanding}d
                </span>
                <span className="tabular-nums font-medium text-[var(--color-text-muted)]">
                  {format(r.amount)}
                </span>
              </li>
            ))}
          </ul>
        </Pane>

        <Pane
          id="production"
          highlighted={highlighted === "production"}
          onFocus={focusPane}
          eyebrow="Production today"
          metric={format(productionToday.current)}
          metricLabel={`of ${format(productionToday.goal)} goal`}
          subline={`Hygiene re-care rate · ${Math.round(productionToday.hygieneRecareRate * 100)}%`}
          reduceMotion={!!reduceMotion}
        >
          <div className="mt-3 grid gap-1.5">
            <div className="h-2 rounded-full bg-[var(--color-canvas-tinted)] overflow-hidden">
              <motion.div
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${stats.productionPct}%` }}
                transition={{ duration: 0.6 }}
                className="h-full"
                style={{
                  backgroundColor:
                    stats.productionPct >= 80
                      ? "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)"
                      : "color-mix(in oklch, var(--color-sunset), var(--color-ink) 30%)",
                }}
              />
            </div>
            <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">
              {stats.productionPct}% of day ·{" "}
              {format(productionToday.goal - productionToday.current)} to go
            </p>
          </div>
        </Pane>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          onClick={() => track("huddle_cta_click", {})}
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          Wire this up for your clinic → book a demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Owners get this on their phone every morning — pulled from the same data the front desk
          and clinical team see.
        </p>
      </div>
    </div>
  );
}

function Pane({
  id,
  eyebrow,
  metric,
  metricLabel,
  subline,
  highlighted,
  onFocus,
  reduceMotion,
  children,
}: {
  id: PaneId;
  eyebrow: string;
  metric: string;
  metricLabel: string;
  subline: string;
  highlighted: boolean;
  onFocus: (id: PaneId) => void;
  reduceMotion: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onFocus(id)}
      aria-pressed={highlighted}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: highlighted ? 1.015 : 1,
              boxShadow: highlighted
                ? "0 18px 40px -16px rgba(20,30,60,0.22)"
                : "0 0 0 0 rgba(0,0,0,0)",
            }
      }
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className={`text-left rounded-[var(--radius-lg)] border p-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
        highlighted
          ? "border-[var(--color-ink)] bg-white"
          : "border-[var(--color-border)] bg-[var(--color-canvas-tinted)] hover:border-[var(--color-border-strong)]"
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
        {eyebrow}
      </p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
          {metric}
        </span>
        <span className="text-[11px] text-[var(--color-text-muted)]">{metricLabel}</span>
      </p>
      <p className="mt-1 text-[11px] text-[var(--color-text-soft)] leading-relaxed">{subline}</p>
      {children}
    </motion.button>
  );
}
