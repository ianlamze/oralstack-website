"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import ConditionPalette from "./ConditionPalette";
import Odontogram from "./Odontogram";
import { buildChartConditionsFromText } from "@/content/charting/parser";
import {
  CONDITION_COLORS,
  CONDITION_LABELS,
  CONDITION_SHORT_LABELS,
  TOOTH_NAMES,
  WHOLE_TOOTH_CONDITIONS,
  type ChartFilter,
  type ChartTool,
  type ConditionCode,
  type ConditionStatus,
  type Surface,
  type ToothCondition,
} from "@/content/charting/types";

export interface DentalChartProps {
  initialTeeth?: Record<number, ToothCondition[]>;
  showPalette?: boolean;
  showChatBox?: boolean;
  showSelectedDetail?: boolean;
  showFraming?: boolean;
  toothSize?: number;
  caption?: string;
  patientLabel?: string;
  className?: string;
}

const HISTORY_LIMIT = 10;
let conditionIdCounter = 0;
function newConditionId(prefix: string) {
  conditionIdCounter += 1;
  return `${prefix}-${conditionIdCounter}`;
}

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function applyConditionToTooth(
  teeth: Record<number, ToothCondition[]>,
  tooth: number,
  condition: ConditionCode,
  status: ConditionStatus,
  surfaces: Surface[] | undefined,
): Record<number, ToothCondition[]> {
  const existing = teeth[tooth] ?? [];
  const isWhole = WHOLE_TOOTH_CONDITIONS.includes(condition);
  const next: ToothCondition = {
    id: newConditionId(`${tooth}-${condition}`),
    condition,
    surfaces: isWhole ? undefined : surfaces,
    date: todayDate(),
    status,
  };
  // Toggle off if exact match already present.
  const matchIndex = existing.findIndex((c) => {
    if (c.condition !== condition) return false;
    if (c.status !== status) return false;
    if (isWhole) return true;
    const a = [...(c.surfaces ?? [])].sort().join("");
    const b = [...(surfaces ?? [])].sort().join("");
    return a === b;
  });
  if (matchIndex >= 0) {
    return { ...teeth, [tooth]: existing.filter((_, i) => i !== matchIndex) };
  }
  return { ...teeth, [tooth]: [...existing, next] };
}

function clearSurface(
  teeth: Record<number, ToothCondition[]>,
  tooth: number,
  surface: Surface,
): Record<number, ToothCondition[]> {
  const existing = teeth[tooth] ?? [];
  const next: ToothCondition[] = [];
  for (const c of existing) {
    if (c.surfaces?.includes(surface)) {
      const remaining = c.surfaces.filter((s) => s !== surface);
      if (remaining.length > 0) next.push({ ...c, surfaces: remaining });
      continue;
    }
    if (!c.surfaces) continue; // whole-tooth condition removed too
    next.push(c);
  }
  return { ...teeth, [tooth]: next };
}

function clearTooth(
  teeth: Record<number, ToothCondition[]>,
  tooth: number,
): Record<number, ToothCondition[]> {
  return { ...teeth, [tooth]: [] };
}

function filterTeethByStatus(
  teeth: Record<number, ToothCondition[]>,
  filter: ChartFilter,
): Record<number, ToothCondition[]> {
  if (filter === "all") return teeth;
  const result: Record<number, ToothCondition[]> = {};
  for (const [k, v] of Object.entries(teeth)) {
    result[Number(k)] = v.filter((c) => c.status === filter);
  }
  return result;
}

export default function DentalChart({
  initialTeeth = {},
  showPalette = true,
  showChatBox = true,
  showSelectedDetail = true,
  showFraming = true,
  toothSize = 44,
  caption,
  patientLabel,
  className,
}: DentalChartProps) {
  const [teeth, setTeeth] = useState<Record<number, ToothCondition[]>>(initialTeeth);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [activeTool, setActiveTool] = useState<ChartTool>(null);
  const [activeStatus, setActiveStatus] = useState<ConditionStatus>("active");
  const [activeFilter, setActiveFilter] = useState<ChartFilter>("all");
  const [liveText, setLiveText] = useState("");
  const historyRef = useRef<Record<number, ToothCondition[]>[]>([]);
  const liveTextRef = useRef<HTMLTextAreaElement | null>(null);

  const pushHistory = useCallback((snapshot: Record<number, ToothCondition[]>) => {
    historyRef.current = [...historyRef.current, snapshot].slice(-HISTORY_LIMIT);
  }, []);

  const popHistory = useCallback((): Record<number, ToothCondition[]> | null => {
    if (historyRef.current.length === 0) return null;
    const last = historyRef.current[historyRef.current.length - 1] ?? null;
    historyRef.current = historyRef.current.slice(0, -1);
    return last;
  }, []);

  const onToothClick = useCallback(
    (tooth: number) => {
      if (activeTool === null) {
        setSelectedTooth(tooth);
        return;
      }
      if (activeTool === "clear") {
        pushHistory(teeth);
        setTeeth((prev) => clearTooth(prev, tooth));
        return;
      }
      pushHistory(teeth);
      setTeeth((prev) => applyConditionToTooth(prev, tooth, activeTool, activeStatus, undefined));
    },
    [activeTool, activeStatus, teeth, pushHistory],
  );

  const onSurfaceClick = useCallback(
    (tooth: number, surface: Surface) => {
      if (activeTool === null) {
        setSelectedTooth(tooth);
        return;
      }
      if (activeTool === "clear") {
        pushHistory(teeth);
        setTeeth((prev) => clearSurface(prev, tooth, surface));
        return;
      }
      if (WHOLE_TOOTH_CONDITIONS.includes(activeTool)) {
        pushHistory(teeth);
        setTeeth((prev) => applyConditionToTooth(prev, tooth, activeTool, activeStatus, undefined));
        return;
      }
      pushHistory(teeth);
      setTeeth((prev) => applyConditionToTooth(prev, tooth, activeTool, activeStatus, [surface]));
    },
    [activeTool, activeStatus, teeth, pushHistory],
  );

  const applyChat = useCallback(() => {
    const trimmed = liveText.trim().toLowerCase();
    if (trimmed === "undo") {
      const prev = popHistory();
      if (prev) setTeeth(prev);
      setLiveText("");
      return;
    }
    const built = buildChartConditionsFromText({
      content: liveText,
      noteId: `chat-${Date.now()}`,
      status: activeStatus,
    });
    if (built.length === 0) return;
    pushHistory(teeth);
    setTeeth((prev) => {
      const next: Record<number, ToothCondition[]> = { ...prev };
      for (const entry of built) {
        const list = next[entry.tooth] ?? [];
        next[entry.tooth] = [...list, entry.condition];
      }
      return next;
    });
    setLiveText("");
  }, [liveText, activeStatus, teeth, pushHistory, popHistory]);

  const handleUndo = useCallback(() => {
    const prev = popHistory();
    if (prev) setTeeth(prev);
  }, [popHistory]);

  // Keyboard: "/" focuses chat textarea.
  useEffect(() => {
    if (!showChatBox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const el = document.activeElement as HTMLElement | null;
      const isTyping =
        el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (isTyping) return;
      e.preventDefault();
      liveTextRef.current?.focus();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showChatBox]);

  const filteredTeeth = useMemo(
    () => filterTeethByStatus(teeth, activeFilter),
    [teeth, activeFilter],
  );

  const selectedFindings = selectedTooth !== null ? (teeth[selectedTooth] ?? []) : [];

  return (
    <div className={`grid gap-4 min-w-0 ${className ?? ""}`}>
      {(caption || patientLabel) && (
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 min-w-0">
          {caption && (
            <span className="flex items-center gap-1.5 min-w-0 shrink-0">
              <span>{caption}</span>
              <span aria-hidden className="text-[var(--color-text-soft)]">
                ·
              </span>
              <span className="inline-flex items-center gap-1 text-[var(--color-tide-deep)] font-semibold whitespace-nowrap">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-tide-deep)]"
                />
                Live demo
              </span>
            </span>
          )}
          {patientLabel && (
            <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right truncate min-w-0">
              {patientLabel}
            </span>
          )}
        </div>
      )}

      {showPalette && (
        <ConditionPalette
          activeTool={activeTool}
          activeStatus={activeStatus}
          activeFilter={activeFilter}
          onToolChange={setActiveTool}
          onStatusChange={setActiveStatus}
          onFilterChange={setActiveFilter}
          onUndo={handleUndo}
          canUndo={historyRef.current.length > 0}
        />
      )}

      <div
        className={`grid gap-4 min-w-0 ${
          showChatBox ? "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start" : ""
        }`}
      >
        <div className="grid gap-3 min-w-0">
          <Odontogram
            teeth={filteredTeeth}
            selectedTooth={selectedTooth}
            activeTool={activeTool}
            toothSize={toothSize}
            showFraming={showFraming}
            onToothClick={onToothClick}
            onSurfaceClick={onSurfaceClick}
          />
          {showSelectedDetail && selectedTooth !== null && (
            <SelectedDetail
              tooth={selectedTooth}
              findings={selectedFindings}
              onClose={() => setSelectedTooth(null)}
            />
          )}
        </div>

        {showChatBox && (
          <ChatBox ref={liveTextRef} value={liveText} onChange={setLiveText} onApply={applyChat} />
        )}
      </div>
    </div>
  );
}

function SelectedDetail({
  tooth,
  findings,
  onClose,
}: {
  tooth: number;
  findings: ToothCondition[];
  onClose: () => void;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Selected
          </p>
          <p className="text-sm font-semibold text-[var(--color-text)] tabular-nums mt-0.5">
            Tooth {tooth}
          </p>
          <p className="text-[11px] text-[var(--color-text-soft)]">{TOOTH_NAMES[tooth] ?? "—"}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition-colors"
        >
          Clear selection
        </button>
      </div>
      <ul className="grid gap-1.5 mt-2">
        {findings.length === 0 ? (
          <li className="text-[11px] text-[var(--color-text-soft)] italic">
            No findings yet — pick a condition and click a surface to chart.
          </li>
        ) : (
          findings.map((c) => (
            <li key={c.id} className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: CONDITION_COLORS[c.condition] }}
              />
              <span className="text-[11px] font-medium text-[var(--color-text)]">
                {CONDITION_LABELS[c.condition]}
                {c.surfaces && c.surfaces.length > 0 && (
                  <span className="text-[var(--color-text-soft)] font-normal">
                    {" "}
                    · {c.surfaces.join("")}
                  </span>
                )}
              </span>
              <span className="ml-auto text-[10px] text-[var(--color-text-soft)] uppercase tracking-wide">
                {CONDITION_SHORT_LABELS[c.condition]} · {c.status}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
