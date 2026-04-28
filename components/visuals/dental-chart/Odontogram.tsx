"use client";

import Tooth from "./Tooth";
import {
  LOWER_LEFT,
  LOWER_RIGHT,
  UPPER_LEFT,
  UPPER_RIGHT,
  type ChartTool,
  type Surface,
  type ToothCondition,
} from "@/content/charting/types";

interface OdontogramProps {
  teeth: Record<number, ToothCondition[]>;
  selectedTooth: number | null;
  activeTool: ChartTool;
  toothSize?: number;
  showFraming?: boolean;
  onToothClick: (tooth: number) => void;
  onSurfaceClick: (tooth: number, surface: Surface) => void;
}

function Row({
  numbers,
  teeth,
  selectedTooth,
  activeTool,
  toothSize,
  onToothClick,
  onSurfaceClick,
}: {
  numbers: number[];
  teeth: Record<number, ToothCondition[]>;
  selectedTooth: number | null;
  activeTool: ChartTool;
  toothSize: number;
  onToothClick: (tooth: number) => void;
  onSurfaceClick: (tooth: number, surface: Surface) => void;
}) {
  return (
    <div className="flex gap-1">
      {numbers.map((t) => (
        <Tooth
          key={t}
          tooth={t}
          conditions={teeth[t] ?? []}
          selected={selectedTooth === t}
          activeTool={activeTool}
          size={toothSize}
          onToothClick={onToothClick}
          onSurfaceClick={onSurfaceClick}
        />
      ))}
    </div>
  );
}

export default function Odontogram({
  teeth,
  selectedTooth,
  activeTool,
  toothSize = 44,
  showFraming = true,
  onToothClick,
  onSurfaceClick,
}: OdontogramProps) {
  const shared = { teeth, selectedTooth, activeTool, toothSize, onToothClick, onSurfaceClick };

  const body = (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end gap-3">
        <Row numbers={UPPER_RIGHT} {...shared} />
        <div className="mb-3 h-px w-2 bg-[var(--color-border)]" />
        <Row numbers={UPPER_LEFT} {...shared} />
      </div>

      <div className="flex w-full items-center gap-2 px-4">
        <div className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-[10px] font-medium tracking-wider text-[var(--color-text-soft)]">
          R
        </span>
        <div className="h-px w-4 bg-[var(--color-border)]" />
        <span className="text-[10px] font-medium tracking-wider text-[var(--color-text-soft)]">
          L
        </span>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="flex items-start gap-3">
        <Row numbers={LOWER_RIGHT} {...shared} />
        <div className="mt-3 h-px w-2 bg-[var(--color-border)]" />
        <Row numbers={LOWER_LEFT} {...shared} />
      </div>
    </div>
  );

  if (!showFraming) {
    return (
      <div className="min-w-0 overflow-x-auto">
        <div className="w-max">{body}</div>
      </div>
    );
  }

  return (
    <div className="min-w-0 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-4 py-5 overflow-hidden">
      <div className="mb-4 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[var(--color-text-soft)]">
        <span>Maxillary</span>
        <span>FDI</span>
      </div>
      <div className="overflow-x-auto">
        <div className="w-max">{body}</div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[var(--color-text-soft)]">
        <span>Mandibular</span>
        <span>Click to chart</span>
      </div>
    </div>
  );
}
