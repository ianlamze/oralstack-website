"use client";

import { motion, useReducedMotion } from "motion/react";
import type { JourneyStage } from "@/content/journey";
import { track } from "@/lib/analytics";

export type JourneyTimelineProps = {
  stages: JourneyStage[];
  activeStageId: string;
  /** Stage ids that have a fully-built demo (not just stub bullets). */
  builtStageIds: string[];
  onStageChange: (stageId: string) => void;
};

export default function JourneyTimeline({
  stages,
  activeStageId,
  builtStageIds,
  onStageChange,
}: JourneyTimelineProps) {
  const reduceMotion = useReducedMotion();
  const built = new Set(builtStageIds);
  const builtNames = stages.filter((s) => built.has(s.id)).map((s) => s.name);
  const builtSummary =
    builtNames.length === 0
      ? null
      : builtNames.length === 1
        ? `${builtNames[0]} is fully built`
        : builtNames.length === 2
          ? `${builtNames[0]} and ${builtNames[1]} are fully built`
          : `${builtNames.slice(0, -1).join(", ")}, and ${builtNames[builtNames.length - 1]} are fully built`;

  return (
    <div role="tablist" aria-label="Patient journey stages" className="grid gap-2 lg:gap-3">
      <ol className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-px-4">
        {stages.map((stage) => {
          const isActive = stage.id === activeStageId;
          const isBuilt = built.has(stage.id);
          return (
            <li key={stage.id} className="snap-start shrink-0">
              <motion.button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`stage-panel-${stage.id}`}
                id={`stage-tab-${stage.id}`}
                onClick={() => {
                  onStageChange(stage.id);
                  track("journey_stage_selected", { stage: stage.id });
                }}
                whileHover={reduceMotion || isActive ? undefined : { y: -1 }}
                className={`relative grid gap-1 rounded-[var(--radius-md)] border px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] min-w-[148px] sm:min-w-[160px] ${
                  isActive
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                    : "border-[var(--color-border-strong)] bg-white text-[var(--color-text)] hover:border-[var(--color-ink)]"
                }`}
              >
                <span
                  className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] ${
                    isActive
                      ? "text-[color-mix(in_oklch,var(--color-canvas),var(--color-ink)_30%)]"
                      : "text-[var(--color-text-soft)]"
                  }`}
                >
                  <span className="font-mono tabular-nums">
                    {String(stage.index).padStart(2, "0")}
                  </span>
                  {isBuilt ? (
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] tracking-[0.1em] font-medium ${
                        isActive
                          ? "text-[color-mix(in_oklch,var(--color-sea),white_30%)]"
                          : "text-[var(--color-tide-deep)]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`inline-block h-1 w-1 rounded-full ${
                          isActive
                            ? "bg-[color-mix(in_oklch,var(--color-sea),white_30%)]"
                            : "bg-[var(--color-tide-deep)]"
                        }`}
                      />
                      Live
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center text-[9px] tracking-[0.1em] ${
                        isActive
                          ? "text-[color-mix(in_oklch,var(--color-canvas),var(--color-ink)_45%)]"
                          : "text-[var(--color-text-soft)]"
                      }`}
                    >
                      Preview
                    </span>
                  )}
                </span>
                <span
                  className={`text-sm font-semibold tracking-tight ${
                    isActive ? "text-[var(--color-canvas)]" : "text-[var(--color-text)]"
                  }`}
                >
                  {stage.name}
                </span>
              </motion.button>
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] text-[var(--color-text-soft)] tracking-[0.04em]">
        {builtStageIds.length === stages.length
          ? "Click any stage. Every stage has a fully wired before/after demo — scrub through the linear journey from discovery to recall."
          : `Click any stage.${builtSummary ? ` ${builtSummary}; ` : " "}the others show before/after copy and metrics while the interactive demos are in progress.`}
      </p>
    </div>
  );
}
