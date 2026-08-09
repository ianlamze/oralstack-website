"use client";

import { motion } from "motion/react";
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
      {/*
        Layout switches at sm breakpoint:
        - Mobile (default): vertical stack, full-width row chips so all 7
          stages are visible without horizontal swipe. Each chip is a
          horizontal row: number · status · name · arrow.
        - sm+: horizontal scrollable strip with snap, fixed-min-width chips
          (the original layout).
      */}
      <ol className="grid gap-1.5 sm:flex sm:gap-2 sm:overflow-x-auto sm:pb-2 sm:-mx-4 sm:px-4 lg:mx-0 lg:px-0 sm:snap-x sm:snap-mandatory sm:scroll-px-4">
        {stages.map((stage) => {
          const isActive = stage.id === activeStageId;
          const isBuilt = built.has(stage.id);
          return (
            <li key={stage.id} className="sm:snap-start sm:shrink-0">
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
                whileHover={isActive ? undefined : { y: -1 }}
                className={`relative w-full sm:w-auto rounded-[var(--radius-md)] border px-3 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] sm:min-w-[148px] md:min-w-[160px] ${
                  isActive
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                    : "border-[var(--color-border-strong)] bg-white text-[var(--color-text)] hover:border-[var(--color-ink)]"
                }`}
              >
                {/* Mobile layout: horizontal row */}
                <span className="flex sm:hidden items-center gap-3">
                  <span
                    className={`font-mono tabular-nums text-[11px] tracking-[0.1em] ${
                      isActive
                        ? "text-[color-mix(in_oklch,var(--color-canvas),var(--color-ink)_30%)]"
                        : "text-[var(--color-text-soft)]"
                    }`}
                  >
                    {String(stage.index).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      isBuilt
                        ? isActive
                          ? "bg-[color-mix(in_oklch,var(--color-sea),white_30%)]"
                          : "bg-[var(--color-tide-deep)]"
                        : isActive
                          ? "bg-[color-mix(in_oklch,var(--color-canvas),var(--color-ink)_45%)]"
                          : "bg-[var(--color-text-soft)]"
                    }`}
                  />
                  <span
                    className={`flex-1 text-sm font-semibold tracking-tight ${
                      isActive ? "text-[var(--color-canvas)]" : "text-[var(--color-text)]"
                    }`}
                  >
                    {stage.name}
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-[0.14em] font-medium ${
                      isBuilt
                        ? isActive
                          ? "text-[color-mix(in_oklch,var(--color-sea),white_30%)]"
                          : "text-[var(--color-tide-deep)]"
                        : isActive
                          ? "text-[color-mix(in_oklch,var(--color-canvas),var(--color-ink)_45%)]"
                          : "text-[var(--color-text-soft)]"
                    }`}
                  >
                    {isBuilt ? "Live" : "Preview"}
                  </span>
                  {isActive && (
                    <span aria-hidden className="text-[var(--color-canvas)] text-sm leading-none">
                      →
                    </span>
                  )}
                </span>

                {/* sm+ layout: 2-row stack (number+pill on top, name on bottom) */}
                <span className="hidden sm:grid gap-1">
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
                </span>
              </motion.button>
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] text-[var(--color-text-soft)] tracking-[0.04em]">
        {builtStageIds.length === stages.length
          ? "Tap any stage. Every stage has a fully wired before/after demo — scrub through the linear journey from discovery to recall."
          : `Tap any stage.${builtSummary ? ` ${builtSummary}; ` : " "}the others show before/after copy and metrics while the interactive demos are in progress.`}
      </p>
    </div>
  );
}
