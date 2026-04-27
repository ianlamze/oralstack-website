type Slot = { day: string; date: string; start: string; end: string; chair: string };

const slots: Slot[] = [
  { day: "Tue", date: "28 Apr", start: "10:00", end: "11:00", chair: "Chair 2" },
  { day: "Wed", date: "29 Apr", start: "14:00", end: "15:00", chair: "Chair 1" },
  { day: "Thu", date: "30 Apr", start: "09:00", end: "10:00", chair: "Chair 3" },
];

const filters = ["Endo", "60 min", "Dr Pereira"] as const;

export default function OnlineBookingMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack patient booking page: filter pills for procedure, duration, and provider, followed by the next three available slots."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[420px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Online booking · DFI Synergy</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          New patient
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          What you need
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <span
              key={f}
              className="text-[11px] font-medium rounded-md border bg-[var(--color-canvas-tinted)] text-[var(--color-text)] border-[var(--color-border-strong)] px-2.5 py-1.5"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Next available
        </p>
        <ul className="mt-2 grid divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {slots.map((s, i) => (
            <li
              key={`${s.date}-${s.start}`}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-2.5"
            >
              <span className="text-[11px] font-mono text-[var(--color-text-soft)] tabular-nums w-[64px]">
                {s.day} {s.date}
              </span>
              <span
                className={`text-sm tabular-nums ${
                  i === 0
                    ? "font-semibold text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {s.start} — {s.end}
              </span>
              <span className="text-[11px] text-[var(--color-text-soft)]">{s.chair}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
          Slots filtered to your procedure & provider
        </p>
        <button
          type="button"
          tabIndex={-1}
          className="text-[11px] font-medium rounded-md border bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)] px-2.5 py-1.5"
        >
          Confirm slot
        </button>
      </div>
    </div>
  );
}
