"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import type { FeatureRef, JourneyStage } from "@/content/journey";
import { track } from "@/lib/analytics";
import BeforeAfterSplit from "./BeforeAfterSplit";
import MetricTicker from "./MetricTicker";

export type StagePanelProps = {
  stage: JourneyStage;
  totalStages: number;
  /**
   * Fully-built before/after demo. Supplied for stages with their own visual
   * mocks (e.g. Discharge: BeforeDischargeMock + CheckoutMock). Stages
   * without a built demo fall back to bullet panes derived from the stage
   * `before` / `after` arrays.
   */
  builtDemo?: { before: ReactNode; after: ReactNode };
};

function BulletPane({ items, tone }: { items: string[]; tone: "before" | "after" }) {
  const dotClass =
    tone === "before"
      ? "bg-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
      : "bg-[var(--color-tide-deep)]";
  const containerClass =
    tone === "before"
      ? "border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_88%)]"
      : "border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sea),white_88%)]";
  return (
    <ul className={`grid gap-2.5 rounded-[var(--radius-md)] border ${containerClass} p-4 sm:p-5`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-[var(--color-text)] leading-snug">
          <span
            aria-hidden
            className={`mt-2 inline-block h-1 w-1 rounded-full shrink-0 ${dotClass}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturePill({ feature }: { feature: FeatureRef }) {
  const kindLabel: Record<FeatureRef["kind"], string> = {
    workflow: "Workflow",
    tool: "Tool",
    article: "Article",
    visual: "Visual",
  };
  const inner = (
    <>
      <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
        {kindLabel[feature.kind]}
      </span>
      <span className="text-[12px] font-medium text-[var(--color-text)]">{feature.label}</span>
    </>
  );
  if (feature.href) {
    return (
      <a
        href={feature.href}
        className="inline-flex flex-col gap-0.5 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-3 py-1.5 hover:border-[var(--color-ink)] hover:text-[var(--color-text)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
      >
        {inner}
      </a>
    );
  }
  return (
    <span className="inline-flex flex-col gap-0.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-3 py-1.5">
      {inner}
    </span>
  );
}

export default function StagePanel({ stage, totalStages, builtDemo }: StagePanelProps) {
  const liveFeatures = stage.features.filter((f) => f.status === "live");

  return (
    <section
      role="tabpanel"
      id={`stage-panel-${stage.id}`}
      aria-labelledby={`stage-tab-${stage.id}`}
      className="grid gap-8 lg:gap-10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="grid gap-8 lg:gap-10"
        >
          <header className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10 items-start">
            <div className="grid gap-3 max-w-[44ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                Stage {String(stage.index).padStart(2, "0")} of {totalStages} · {stage.name}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-[34px] font-semibold tracking-tight leading-[1.15]">
                {stage.ownerQuestion}
              </h2>
              <div className="grid gap-2 mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                <p>
                  <span className="font-medium text-[var(--color-text)]">Patient:</span>{" "}
                  {stage.patientLens}
                </p>
                <p>
                  <span className="font-medium text-[var(--color-text)]">Clinic:</span>{" "}
                  {stage.clinicLens}
                </p>
              </div>
            </div>
            <MetricTicker metric={stage.anchorMetric} stageId={stage.id} />
          </header>

          <BeforeAfterSplit
            before={
              builtDemo ? builtDemo.before : <BulletPane items={stage.before} tone="before" />
            }
            after={builtDemo ? builtDemo.after : <BulletPane items={stage.after} tone="after" />}
          />

          {!builtDemo && (
            <p className="text-[11px] text-[var(--color-text-soft)] italic tracking-[0.04em] -mt-4">
              Interactive demo for this stage is in progress. Stages marked &ldquo;Live&rdquo; in
              the timeline above have the fully wired before/after.
            </p>
          )}

          {liveFeatures.length > 0 && (
            <div className="grid gap-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)] font-medium">
                Where this lives in Oralstack
              </p>
              <div className="flex flex-wrap gap-2">
                {liveFeatures.map((f) => (
                  <FeaturePill key={f.id} feature={f} />
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-6 py-7 sm:px-8 sm:py-9 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
            <div className="grid gap-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-tide-deep)] font-semibold">
                Demo · focused on {stage.name.toLowerCase()}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight max-w-[28ch] leading-[1.2]">
                {stage.cta.headline}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
                {stage.cta.body}
              </p>
            </div>
            <div className="md:justify-self-end">
              <a
                href={`/book-a-demo?stage=${stage.id}`}
                onClick={() => track("journey_stage_cta_click", { stage: stage.id })}
                className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
              >
                <span>{stage.cta.buttonLabel}</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
