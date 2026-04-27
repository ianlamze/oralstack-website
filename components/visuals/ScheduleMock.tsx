type Tone = "sea" | "violet" | "sunset";

type Appointment = {
  chair: 0 | 1 | 2;
  start: number;
  len: number;
  label: string;
  tone: Tone;
  /**
   * Visually emphasises this appointment with a tide-coloured ring and a
   * stronger shadow. Used to draw the eye to the appointment that
   * demonstrates the "drag in three seconds" reschedule claim.
   */
  accent?: boolean;
};

const appointments: Appointment[] = [
  { chair: 1, start: 9, len: 3, label: "Implant review · Dr Lim", tone: "violet" },
  { chair: 2, start: 10, len: 2, label: "Hygiene · M. Devi", tone: "sea" },
  { chair: 0, start: 11, len: 3, label: "Crown prep · J. Ong", tone: "sunset", accent: true },
  { chair: 1, start: 13, len: 2, label: "New patient · K. Lee", tone: "sea" },
];

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
const chairs = ["Chair 1", "Chair 2", "Chair 3"];

const toneStyles: Record<Tone, { bg: string; border: string }> = {
  sea: {
    bg: "color-mix(in oklch, var(--color-sea), white 70%)",
    border: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
  },
  violet: {
    bg: "color-mix(in oklch, var(--color-violet), white 82%)",
    border: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
  },
  sunset: {
    bg: "color-mix(in oklch, var(--color-sunset), white 70%)",
    border: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 30%)",
  },
};

export default function ScheduleMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack schedule view: three chairs across a typical clinic day with four booked appointments — implant review, hygiene, crown prep (highlighted as just-rescheduled), and a new-patient slot."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[560px] mx-auto md:mx-0 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Schedule · Mon 27 Apr</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          DFI Synergy · Singapore
        </span>
      </div>

      <div className="mt-4 sm:mt-5 grid gap-x-1.5 sm:gap-x-2 grid-cols-[34px_repeat(3,minmax(0,1fr))] sm:grid-cols-[40px_repeat(3,minmax(0,1fr))] md:grid-cols-[44px_repeat(3,minmax(0,1fr))] grid-rows-[auto_repeat(9,32px)] sm:grid-rows-[auto_repeat(9,36px)] md:grid-rows-[auto_repeat(9,38px)]">
        <div />
        {chairs.map((c) => (
          <div
            key={c}
            className="text-[10px] sm:text-[11px] font-medium text-[var(--color-text-muted)] pb-2 text-center"
          >
            {c}
          </div>
        ))}

        {hours.map((h, i) => (
          <div
            key={`hour-${h}`}
            className="text-[9px] sm:text-[10px] text-[var(--color-text-soft)] tabular-nums pt-1"
            style={{ gridColumn: 1, gridRow: i + 2 }}
          >
            {String(h).padStart(2, "0")}:00
          </div>
        ))}

        {[0, 1, 2].flatMap((c) =>
          hours.map((_, i) => (
            <div
              key={`grid-${c}-${i}`}
              className="border-t"
              style={{
                gridColumn: c + 2,
                gridRow: i + 2,
                borderColor: "color-mix(in oklch, var(--color-line), white 30%)",
              }}
            />
          )),
        )}

        {appointments.map((a, idx) => {
          const t = toneStyles[a.tone];
          return (
            <div
              key={idx}
              className={`relative rounded-md border px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium leading-tight text-[var(--color-ink)] m-0.5 overflow-hidden ${
                a.accent
                  ? "ring-2 ring-[var(--color-tide)] ring-offset-1 ring-offset-white shadow-[0_4px_14px_-4px_rgba(20,30,60,0.28)]"
                  : ""
              }`}
              style={{
                gridColumn: a.chair + 2,
                gridRow: `${a.start - 8 + 2} / span ${a.len}`,
                backgroundColor: t.bg,
                borderColor: t.border,
              }}
            >
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] tabular-nums text-[var(--color-text-muted)]">
                {String(a.start).padStart(2, "0")}:00
                {a.accent && (
                  <span className="ml-auto text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--color-tide-deep)]">
                    Just moved
                  </span>
                )}
              </div>
              <div className="truncate sm:whitespace-normal">{a.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-5 flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--color-text-soft)] gap-3">
        <span>3 chairs · 4 booked · drag to reschedule</span>
        <span className="font-medium text-[var(--color-text-muted)] whitespace-nowrap">
          View day →
        </span>
      </div>
    </div>
  );
}
