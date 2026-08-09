"use client";

import { motion } from "motion/react";
import type { StageMetric } from "@/content/journey";

export type MetricTickerProps = {
  metric: StageMetric;
  /**
   * Stage id — used as a React key so the ticker re-animates when the user
   * switches stages.
   */
  stageId: string;
};

export default function MetricTicker({ metric, stageId }: MetricTickerProps) {
  return (
    <div
      key={stageId}
      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4 sm:p-5"
    >
      <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)] font-medium">
        Anchor metric
      </p>
      <p className="mt-1 text-base font-semibold text-[var(--color-text)]">{metric.label}</p>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-3 sm:gap-4">
        <div className="grid gap-1 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Industry baseline
          </span>
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base sm:text-lg font-semibold text-[var(--color-text-muted)] tabular-nums"
          >
            {metric.industryBaseline}
          </motion.span>
        </div>
        <span
          aria-hidden
          className="text-[var(--color-text-soft)] text-lg sm:text-xl pb-1.5 select-none"
        >
          →
        </span>
        <div className="grid gap-1 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-tide-deep)] font-medium">
            With Oralstack
          </span>
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.18,
              type: "spring",
              stiffness: 240,
              damping: 22,
            }}
            className="text-base sm:text-lg font-semibold text-[var(--color-text)] tabular-nums"
          >
            {metric.oralstackTarget}
          </motion.span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] italic leading-snug">
        Source: {metric.sourceNote}
      </p>
    </div>
  );
}
