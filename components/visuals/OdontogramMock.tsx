type Condition = "caries" | "filling" | "crown" | "watch";

const conditionStyles: Record<
  Condition,
  { bg: string; border: string; dot: string; label: string }
> = {
  caries: {
    bg: "color-mix(in oklch, var(--color-sunset), white 65%)",
    border: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)",
    dot: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)",
    label: "Caries",
  },
  filling: {
    bg: "color-mix(in oklch, var(--color-sea), white 65%)",
    border: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
    dot: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
    label: "Filling",
  },
  crown: {
    bg: "color-mix(in oklch, var(--color-violet), white 78%)",
    border: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
    dot: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
    label: "Crown",
  },
  watch: {
    bg: "transparent",
    border: "var(--color-border-strong)",
    dot: "var(--color-text-soft)",
    label: "Watch",
  },
};

const upperRight = [18, 17, 16, 15, 14, 13, 12, 11];
const lowerRight = [48, 47, 46, 45, 44, 43, 42, 41];

const teethConditions: Record<number, Condition> = {
  16: "caries",
  23: "crown",
  46: "filling",
  47: "filling",
};

function Tooth({ num }: { num: number }) {
  const cond = teethConditions[num];
  const s = cond ? conditionStyles[cond] : null;
  return (
    <div className="grid gap-1">
      <div className="text-[9px] text-[var(--color-text-soft)] tabular-nums text-center leading-none">
        {num}
      </div>
      <div
        className="h-7 w-6 rounded-md border bg-white transition-colors"
        style={
          s
            ? { backgroundColor: s.bg, borderColor: s.border }
            : { borderColor: "var(--color-border)" }
        }
      />
    </div>
  );
}

export default function OdontogramMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack patient chart: tooth-led odontogram showing caries, fillings, and crowns across upper and lower arches."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[520px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Patient chart</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Lim Wei Jian · #1042
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-4 sm:gap-5 items-start">
        <div className="grid gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] mb-1.5">
              Upper right
            </p>
            <div className="flex gap-1">
              {upperRight.map((n) => (
                <Tooth key={n} num={n} />
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] my-1" />

          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] mb-1.5">
              Lower right
            </p>
            <div className="flex gap-1">
              {lowerRight.map((n) => (
                <Tooth key={n} num={n} />
              ))}
            </div>
          </div>

          <p className="text-[9px] text-[var(--color-text-soft)] tracking-[0.04em] mt-2">
            FDI numbering · 5 surfaces (M/D/B/L/O)
          </p>
        </div>

        <aside className="border-l border-[var(--color-border)] pl-4 grid gap-3 min-w-[140px]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
              Selected
            </p>
            <p className="text-sm font-semibold text-[var(--color-text)] mt-1">
              Tooth 16
            </p>
            <p className="text-[10px] text-[var(--color-text-soft)]">
              Maxillary first molar
            </p>
          </div>

          <ul className="grid gap-2">
            {(
              [
                { cond: "caries" as const, surface: "(O)", note: "Active" },
                { cond: "watch" as const, surface: "(M)", note: "Watch" },
              ]
            ).map((c, i) => {
              const s = conditionStyles[c.cond];
              return (
                <li key={i} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: s.dot }}
                  />
                  <div className="grid gap-0.5">
                    <p className="text-[11px] font-medium text-[var(--color-text)] leading-tight">
                      {s.label} {c.surface}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-soft)] leading-tight">
                      {c.note}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
