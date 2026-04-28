"use client";

import { useMemo, useState } from "react";
import { Eraser, MousePointer2, RotateCcw, RotateCw } from "lucide-react";
import {
  CONDITION_COLORS,
  CONDITION_GROUPS,
  CONDITION_LABELS,
  type ChartFilter,
  type ChartTool,
  type ConditionStatus,
} from "@/content/charting/types";

interface ConditionPaletteProps {
  activeTool: ChartTool;
  activeStatus: ConditionStatus;
  activeFilter: ChartFilter;
  onToolChange: (tool: ChartTool) => void;
  onStatusChange: (status: ConditionStatus) => void;
  onFilterChange: (filter: ChartFilter) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const STATUS_PILL_STYLE: Record<ConditionStatus, string> = {
  active: "bg-[var(--color-tide)] text-white",
  planned: "bg-[var(--color-sunset)] text-[var(--color-ink-deep)]",
  completed:
    "bg-[var(--color-canvas-tinted)] text-[var(--color-text)] border border-[var(--color-border)]",
};

const FILTER_PILL_ACTIVE = "bg-[var(--color-ink)] text-white";
const PILL_INACTIVE =
  "bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]";

export default function ConditionPalette({
  activeTool,
  activeStatus,
  activeFilter,
  onToolChange,
  onStatusChange,
  onFilterChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: ConditionPaletteProps) {
  const [query, setQuery] = useState("");

  const visibleGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return CONDITION_GROUPS;
    return CONDITION_GROUPS.map((group) => ({
      ...group,
      conditions: group.conditions.filter((code) =>
        CONDITION_LABELS[code].toLowerCase().includes(normalized),
      ),
    })).filter((group) => group.conditions.length > 0);
  }, [query]);

  return (
    <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="grid gap-3">
        <label className="block">
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Search chart items
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search caries, crown, root canal..."
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-tide-deep)]"
          />
        </label>

        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Tools
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onToolChange(null)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTool === null ? "bg-[var(--color-ink)] text-white" : PILL_INACTIVE
              }`}
            >
              <MousePointer2 className="h-3 w-3" />
              Select
            </button>
            <button
              type="button"
              onClick={() => onToolChange("clear")}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTool === "clear" ? "bg-[var(--color-ink-deep)] text-white" : PILL_INACTIVE
              }`}
            >
              <Eraser className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Chart as
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["active", "planned", "completed"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onStatusChange(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  activeStatus === s ? STATUS_PILL_STYLE[s] : PILL_INACTIVE
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            View
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["all", "active", "planned", "completed"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange(filter)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  activeFilter === filter ? FILTER_PILL_ACTIVE : PILL_INACTIVE
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {(onUndo || onRedo) && (
          <div className="flex flex-wrap gap-2">
            {onUndo && (
              <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="h-3 w-3" />
                Undo
              </button>
            )}
            {onRedo && (
              <button
                type="button"
                onClick={onRedo}
                disabled={!canRedo}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCw className="h-3 w-3" />
                Redo
              </button>
            )}
          </div>
        )}
      </aside>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
        <div className="grid gap-4">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.conditions.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onToolChange(code)}
                    title={CONDITION_LABELS[code]}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTool === code
                        ? "border-transparent text-white"
                        : "border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
                    }`}
                    style={
                      activeTool === code ? { backgroundColor: CONDITION_COLORS[code] } : undefined
                    }
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: CONDITION_COLORS[code] }}
                    />
                    <span>{CONDITION_LABELS[code]}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {visibleGroups.length === 0 && (
            <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-4 py-6 text-sm text-[var(--color-text-muted)]">
              No chart item matched that search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
