"use client";

import {
  CONDITION_COLORS,
  CONDITION_SHORT_LABELS,
  WHOLE_TOOTH_CONDITIONS,
  conditionDisplaysAsWholeTooth,
  formatSurfaceCode,
  type ChartTool,
  type Surface,
  type ToothCondition,
} from "@/content/charting/types";
import {
  getHorizontalSurfaceKeys,
  getVerticalSurfaceKeys,
} from "@/content/charting/tooth-surface-layout";

interface ToothProps {
  tooth: number;
  conditions: ToothCondition[];
  selected: boolean;
  activeTool: ChartTool;
  size?: number;
  onToothClick: (tooth: number) => void;
  onSurfaceClick: (tooth: number, surface: Surface) => void;
}

function getSurfaceColor(
  conditions: ToothCondition[],
  surface: Surface,
): { fill: string; opacity: number; dashed: boolean } | null {
  for (const c of [...conditions].reverse()) {
    const isWhole = conditionDisplaysAsWholeTooth(c);
    if (isWhole || c.surfaces?.includes(surface)) {
      return {
        fill: CONDITION_COLORS[c.condition],
        opacity: c.status === "completed" ? 0.4 : 1,
        dashed: c.status === "planned",
      };
    }
  }
  return null;
}

function getWholeToothConditions(conditions: ToothCondition[]): ToothCondition[] {
  const latest = new Map<string, ToothCondition>();
  for (const c of conditions) {
    if (!conditionDisplaysAsWholeTooth(c)) continue;
    const existing = latest.get(c.condition);
    if (!existing || existing.date < c.date) latest.set(c.condition, c);
  }
  return [...latest.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export default function Tooth({
  tooth,
  conditions,
  selected,
  activeTool,
  size = 44,
  onToothClick,
  onSurfaceClick,
}: ToothProps) {
  const pad = Math.max(2, Math.round(size * 0.045));
  const inner = size - pad * 2;
  const third = inner / 3;
  const isUpper = tooth >= 11 && tooth <= 28;
  const horizontalKeys = getHorizontalSurfaceKeys(tooth);
  const verticalKeys = getVerticalSurfaceKeys(tooth);
  const wholeToothConditions = getWholeToothConditions(conditions);
  const dominantWhole = wholeToothConditions[0];
  const outer = dominantWhole
    ? {
        color: CONDITION_COLORS[dominantWhole.condition],
        opacity: dominantWhole.status === "completed" ? 0.45 : 1,
        dashed: dominantWhole.status === "planned",
      }
    : null;
  const badges = wholeToothConditions.slice(0, 4);

  const left = pad;
  const top = pad;
  const right = size - pad;
  const bottom = size - pad;
  const innerLeft = pad + third;
  const innerTop = pad + third;
  const innerRight = pad + third * 2;
  const innerBottom = pad + third * 2;

  const surfaces: Array<{ key: Surface; points: string; labelX: number; labelY: number }> = [
    {
      key: verticalKeys.top,
      points: `${left},${top} ${right},${top} ${innerRight},${innerTop} ${innerLeft},${innerTop}`,
      labelX: size / 2,
      labelY: top + third * 0.62,
    },
    {
      key: horizontalKeys.left,
      points: `${left},${top} ${innerLeft},${innerTop} ${innerLeft},${innerBottom} ${left},${bottom}`,
      labelX: left + third * 0.58,
      labelY: size / 2 + 1,
    },
    {
      key: "O",
      points: `${innerLeft},${innerTop} ${innerRight},${innerTop} ${innerRight},${innerBottom} ${innerLeft},${innerBottom}`,
      labelX: size / 2,
      labelY: size / 2 + 1,
    },
    {
      key: horizontalKeys.right,
      points: `${right},${top} ${right},${bottom} ${innerRight},${innerBottom} ${innerRight},${innerTop}`,
      labelX: right - third * 0.58,
      labelY: size / 2 + 1,
    },
    {
      key: verticalKeys.bottom,
      points: `${left},${bottom} ${innerLeft},${innerBottom} ${innerRight},${innerBottom} ${right},${bottom}`,
      labelX: size / 2,
      labelY: bottom - third * 0.38,
    },
  ];

  const handleSurface = (surface: Surface) => {
    if (activeTool && activeTool !== "clear" && WHOLE_TOOTH_CONDITIONS.includes(activeTool)) {
      onToothClick(tooth);
    } else if (activeTool) {
      onSurfaceClick(tooth, surface);
    } else {
      onToothClick(tooth);
    }
  };

  const showMissingX = wholeToothConditions.some((c) => c.condition === "missing");
  const showExtractedX = wholeToothConditions.some((c) => c.condition === "extracted");
  const showImplant = wholeToothConditions.some((c) => c.condition === "implant");
  const showRct = wholeToothConditions.some((c) => c.condition === "root_canal");
  const showPostCore = wholeToothConditions.some((c) => c.condition === "post_core");
  const showExtractionPlanned = wholeToothConditions.some(
    (c) => c.condition === "extraction_planned",
  );

  return (
    <div className="flex flex-col items-center gap-0.5">
      {isUpper && (
        <span className="text-[10px] font-medium text-[var(--color-text-soft)] tabular-nums leading-none">
          {tooth}
        </span>
      )}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`Tooth ${tooth}${selected ? ", selected" : ""}`}
        className={`transition-all rounded-sm ${
          selected
            ? "ring-2 ring-[var(--color-tide-deep)]"
            : "hover:ring-1 hover:ring-[var(--color-border-strong)]"
        }`}
      >
        <rect
          x={pad}
          y={pad}
          width={inner}
          height={inner}
          fill="var(--color-chart-surface)"
          stroke={
            selected
              ? "var(--color-tide-deep)"
              : (outer?.color ?? "var(--color-chart-surface-line)")
          }
          strokeWidth={selected || outer ? 1.6 : 1}
          strokeDasharray={outer?.dashed ? "3,2" : undefined}
          strokeOpacity={outer?.opacity ?? 1}
          rx={2}
        />

        {surfaces.map(({ key, points }) => {
          const color = getSurfaceColor(conditions, key);
          return (
            // biome-ignore lint/a11y/noStaticElementInteractions: SVG polygon click region; parent SVG carries aria-label and is keyboard-actionable via the wrapping button surface.
            <polygon
              key={key}
              points={points}
              fill={color ? color.fill : "transparent"}
              fillOpacity={color ? color.opacity : 0}
              stroke={color?.dashed ? color.fill : "var(--color-chart-surface-line)"}
              strokeWidth={0.8}
              strokeDasharray={color?.dashed ? "2,1" : undefined}
              className="cursor-pointer hover:brightness-90 transition-[filter]"
              onClick={(e) => {
                e.stopPropagation();
                handleSurface(key);
              }}
            />
          );
        })}

        {surfaces.map(({ key, labelX, labelY }) => {
          const label = formatSurfaceCode(key, tooth);
          const color = getSurfaceColor(conditions, key);
          return (
            <text
              key={`label-${key}`}
              x={labelX}
              y={labelY + 3}
              textAnchor="middle"
              fontSize={Math.max(7, size / 6)}
              fill={color ? "#fff" : "var(--color-chart-label-soft)"}
              className="pointer-events-none select-none"
            >
              {label}
            </text>
          );
        })}

        {showMissingX && (
          <>
            <line
              x1={pad + 4}
              y1={pad + 4}
              x2={size - pad - 4}
              y2={size - pad - 4}
              stroke={CONDITION_COLORS.missing}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={size - pad - 4}
              y1={pad + 4}
              x2={pad + 4}
              y2={size - pad - 4}
              stroke={CONDITION_COLORS.missing}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </>
        )}

        {showExtractedX && (
          <>
            <line
              x1={pad + 6}
              y1={pad + 6}
              x2={size - pad - 6}
              y2={size - pad - 6}
              stroke={CONDITION_COLORS.extracted}
              strokeWidth={2.3}
              strokeLinecap="round"
            />
            <line
              x1={size - pad - 6}
              y1={pad + 6}
              x2={pad + 6}
              y2={size - pad - 6}
              stroke={CONDITION_COLORS.extracted}
              strokeWidth={2.3}
              strokeLinecap="round"
            />
          </>
        )}

        {showImplant && (
          <>
            <line
              x1={size / 2}
              y1={pad + 9}
              x2={size / 2}
              y2={size - pad - 10}
              stroke={CONDITION_COLORS.implant}
              strokeWidth={2.2}
              strokeLinecap="round"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={third * 0.42}
              fill="none"
              stroke={CONDITION_COLORS.implant}
              strokeWidth={1.6}
            />
          </>
        )}

        {showRct && (
          <line
            x1={size / 2}
            y1={pad + 8}
            x2={size / 2}
            y2={size - pad - 8}
            stroke={CONDITION_COLORS.root_canal}
            strokeWidth={2}
            strokeLinecap="round"
          />
        )}

        {showPostCore && (
          <>
            <line
              x1={size / 2}
              y1={pad + 10}
              x2={size / 2}
              y2={size - pad - 11}
              stroke={CONDITION_COLORS.post_core}
              strokeWidth={2.6}
              strokeLinecap="round"
            />
            <line
              x1={size / 2 - 6}
              y1={size / 2 - 2}
              x2={size / 2 + 6}
              y2={size / 2 - 2}
              stroke={CONDITION_COLORS.post_core}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
          </>
        )}

        {showExtractionPlanned && (
          <rect
            x={pad + 3}
            y={pad + 3}
            width={inner - 6}
            height={inner - 6}
            fill="none"
            stroke={CONDITION_COLORS.extraction_planned}
            strokeWidth={1.8}
            strokeDasharray="3,2"
            rx={2}
          />
        )}
      </svg>
      {badges.length > 0 && (
        <div className="mt-1 flex max-w-[64px] flex-wrap justify-center gap-1">
          {badges.map((c) => (
            <span
              key={c.id}
              className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-wide"
              style={{
                backgroundColor:
                  c.status === "planned" ? "transparent" : CONDITION_COLORS[c.condition],
                border: `1px ${c.status === "planned" ? "dashed" : "solid"} ${CONDITION_COLORS[c.condition]}`,
                color: c.status === "planned" ? CONDITION_COLORS[c.condition] : "#fff",
                opacity: c.status === "completed" ? 0.55 : 1,
              }}
            >
              {CONDITION_SHORT_LABELS[c.condition]}
            </span>
          ))}
        </div>
      )}
      {!isUpper && (
        <span className="text-[10px] font-medium text-[var(--color-text-soft)] tabular-nums leading-none">
          {tooth}
        </span>
      )}
    </div>
  );
}
