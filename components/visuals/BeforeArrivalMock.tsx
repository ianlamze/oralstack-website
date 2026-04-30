"use client";

// Legacy-reality counterpart for the Arrival & huddle stage. Pure CSS,
// brand tokens only.
//
// Design intent: medical alerts written on sticky notes attached to a
// paper chart, eligibility verified at the desk while the patient waits,
// morning huddle on a whiteboard that gets erased.

const stickyNotes = [
  { line: "WARFARIN", note: "premed needed!" },
  { line: "Penicillin allergy", note: "double-checked Mon" },
  { line: "Recent BP issue?", note: "ask before LA" },
];

export default function BeforeArrivalMock() {
  return (
    <div
      role="img"
      aria-label="Before-Oralstack arrival: medical alerts written on sticky notes attached to a paper chart, the front desk verifying eligibility while the patient waits 12 minutes, a whiteboard huddle that gets erased, and a footer showing arrival-to-chair averaging 13 minutes with one missed alert last week."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_30%)] p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Arrival · paper chart + sticky notes</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
            />
            Before Oralstack
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          09:28 · waiting
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-white p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Paper chart · Mei Lin Tan · #1042
        </p>
        <ul className="mt-2 grid gap-1.5">
          {stickyNotes.map((s) => (
            <li
              key={s.line}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 items-start rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_82%)] px-2.5 py-1.5"
            >
              <span aria-hidden className="text-[10px] leading-none text-[var(--color-text-muted)]">
                ✎
              </span>
              <div className="grid gap-0 min-w-0">
                <span className="text-[12px] font-semibold uppercase text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] tracking-wide">
                  {s.line}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] italic">{s.note}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 pt-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-soft)] italic">
          Stickies fall off · alerts missed when chart goes to a different chair
        </p>
      </div>

      <div className="mt-3 grid gap-2">
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-3 py-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="grid gap-0.5 min-w-0">
            <span className="text-[12px] font-medium text-[var(--color-text)] truncate">
              Front desk · verifying CHAS tier
            </span>
            <span className="text-[11px] text-[var(--color-text-muted)] italic truncate">
              On hold with HSA · patient seated, waiting
            </span>
          </div>
          <span className="text-[10px] tabular-nums text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold whitespace-nowrap">
            12 min
          </span>
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_92%)] px-3 py-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="grid gap-0.5 min-w-0">
            <span className="text-[12px] font-medium text-[var(--color-text)]">
              Morning huddle · whiteboard
            </span>
            <span className="text-[11px] text-[var(--color-text-muted)] italic">
              Half-erased from yesterday · Dr Lim was off · today&apos;s chairs not assigned
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>Arrival → chair</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">~13 min avg</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Patients waiting on eligibility</span>
          <span className="tabular-nums">2 today</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Missed alerts (Q1)</span>
          <span className="tabular-nums">3 incidents · 1 last week</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] italic">
        Sticky-note allergies · whiteboard huddles · eligibility hold-ups felt at the chair
      </p>
    </div>
  );
}
