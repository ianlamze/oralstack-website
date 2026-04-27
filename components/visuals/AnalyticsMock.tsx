const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

const utilisation: number[][] = [
  [78, 82, 65, 88, 72, 45, 0, 80, 85, 70, 90, 75, 50, 0],
  [70, 88, 92, 70, 80, 60, 0, 75, 90, 88, 78, 85, 55, 0],
  [85, 75, 80, 92, 88, 50, 0, 88, 82, 75, 80, 92, 60, 0],
];

const chairs = ["Chair 1", "Chair 2", "Chair 3"];

function bucketStyle(util: number): { bg: string; border?: string } {
  if (util === 0) {
    return {
      bg: "transparent",
      border: "var(--color-border)",
    };
  }
  if (util < 30) {
    return {
      bg: "color-mix(in oklch, var(--color-sea), white 88%)",
    };
  }
  if (util < 60) {
    return {
      bg: "color-mix(in oklch, var(--color-sea), white 65%)",
    };
  }
  if (util < 85) {
    return {
      bg: "color-mix(in oklch, var(--color-sea), white 35%)",
    };
  }
  return {
    bg: "color-mix(in oklch, var(--color-sea), var(--color-ink) 25%)",
  };
}

const week1Avg = Math.round(
  utilisation
    .flatMap((row) => row.slice(0, 7).filter((v) => v > 0))
    .reduce((a, b, _i, arr) => a + b / arr.length, 0),
);
const week2Avg = Math.round(
  utilisation
    .flatMap((row) => row.slice(7).filter((v) => v > 0))
    .reduce((a, b, _i, arr) => a + b / arr.length, 0),
);
const delta = week2Avg - week1Avg;

export default function AnalyticsMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack analytics: chair utilisation heatmap across three chairs and fourteen days, with a weekly average of 81 percent (up 5 points from the prior week)."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[540px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Chair utilisation · 14 days</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right tabular-nums">
          Apr 14 – 27
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[64px_repeat(14,minmax(0,1fr))] gap-x-1 gap-y-1.5 items-center">
        <div />
        {Array.from({ length: 14 }).map((_, i) => {
          const isWeek2 = i >= 7;
          return (
            <div
              key={`d-${i}`}
              className={`text-[9px] text-center tabular-nums ${
                isWeek2 ? "text-[var(--color-text-soft)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              {dayLabels[i % 7]}
            </div>
          );
        })}

        {utilisation.map((row, ri) => (
          <>
            <div
              key={`label-${ri}`}
              className="text-[10px] font-medium text-[var(--color-text-muted)] truncate pr-2"
            >
              {chairs[ri]}
            </div>
            {row.map((v, ci) => {
              const s = bucketStyle(v);
              return (
                <div
                  key={`c-${ri}-${ci}`}
                  className="aspect-square rounded-[3px] border"
                  title={v === 0 ? "Closed" : `${v}%`}
                  style={{
                    backgroundColor: s.bg,
                    borderColor: s.border ?? "transparent",
                  }}
                />
              );
            })}
          </>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
        <div className="flex items-center gap-1.5">
          <span>0%</span>
          <div className="flex items-center gap-0.5" aria-hidden>
            {[88, 65, 35, 25].map((m) => (
              <span
                key={m}
                className="block h-2.5 w-3 rounded-[2px]"
                style={{
                  backgroundColor: `color-mix(in oklch, var(--color-sea), ${m === 25 ? "var(--color-ink) 25%" : `white ${m}%`})`,
                }}
              />
            ))}
          </div>
          <span>100%</span>
        </div>
        <span>Closed Sundays · clinic-local timezone</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-4">
        <Stat label="Week 1 avg" value={`${week1Avg}%`} />
        <Stat label="Week 2 avg" value={`${week2Avg}%`} delta={delta} />
        <Stat label="Open chair-hours" value="62 / 76" />
      </div>
    </div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta?: number }) {
  const deltaSign = delta && delta > 0 ? "↑" : delta && delta < 0 ? "↓" : "";
  const deltaColor =
    delta && delta > 0
      ? "color-mix(in oklch, var(--color-sea), var(--color-ink) 35%)"
      : delta && delta < 0
        ? "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)"
        : "var(--color-text-soft)";
  return (
    <div className="grid gap-0.5">
      <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
        {label}
      </p>
      <p className="text-base font-semibold text-[var(--color-text)] tabular-nums flex items-baseline gap-1">
        {value}
        {delta !== undefined && (
          <span className="text-[10px] font-medium" style={{ color: deltaColor }}>
            {deltaSign} {Math.abs(delta)}%
          </span>
        )}
      </p>
    </div>
  );
}
