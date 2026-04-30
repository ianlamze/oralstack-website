"use client";

// Legacy-reality counterpart for the Pre-visit stage. Pure CSS, brand
// tokens only.
//
// Design intent: paper PDFs nobody returns, manual eligibility checks
// that hold up arrivals, day-before reminders sent from staff personal
// phones with no audit trail.

const intakeQueue = [
  { name: "Lim Wei Jian · #1042", status: "returned", note: "complete · arrived" },
  {
    name: "Devi Krishnan · #1054",
    status: "pending",
    note: "PDF emailed Mon · no reply · arriving in 25 min",
  },
  {
    name: "Aaron Teo · #1067",
    status: "pending",
    note: "form printed but not filled · paper at desk",
  },
  {
    name: "Mei Lin Tan · #1042",
    status: "pending",
    note: "needs to call HSA to verify CHAS tier",
  },
];

const statusStyles: Record<"returned" | "pending", string> = {
  returned: "bg-[color-mix(in_oklch,var(--color-sea),white_82%)] text-[var(--color-text)]",
  pending:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_88%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] italic",
};

export default function BeforePreVisitMock() {
  return (
    <div
      role="img"
      aria-label="Before-Oralstack pre-visit: an intake queue showing only one of four patients with their PDF form returned, the others pending or stuck on manual CHAS verification, plus a footer with 4 of 12 patients arriving form-complete and 25 minutes of pre-visit admin per patient."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_30%)] p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Pre-visit · PDF + manual checks</span>
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
          Tomorrow · 09:00
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-white p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Intake queue · tomorrow&apos;s patients
        </p>
        <ul className="mt-2 grid divide-y divide-[var(--color-border)]">
          {intakeQueue.map((p) => (
            <li
              key={p.name}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 py-2 px-2 rounded-[2px] ${statusStyles[p.status as "returned" | "pending"]}`}
            >
              <div className="grid gap-0.5 min-w-0">
                <span className="text-[12px] font-medium not-italic text-[var(--color-text)] truncate">
                  {p.name}
                </span>
                <span className="text-[10px] truncate">{p.note}</span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-[var(--color-text-soft)] whitespace-nowrap">
                {p.status === "returned" ? "✓" : "PENDING"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 pt-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-soft)] italic">
          Eligibility checked manually on arrival · holds up the chair
        </p>
      </div>

      <div className="mt-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_88%)] px-3 py-2.5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-start">
          <span aria-hidden className="text-[14px] leading-none text-[var(--color-text-muted)]">
            ✎
          </span>
          <div className="grid gap-0.5">
            <span className="text-[12px] font-medium text-[var(--color-text)]">
              Day-before reminders
            </span>
            <span className="text-[11px] text-[var(--color-text-muted)] italic">
              Sent from practice manager&apos;s WhatsApp · no audit trail · lost on staff turnover
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>Tomorrow&apos;s patients form-complete</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">4 of 12</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Awaiting eligibility resolution</span>
          <span className="tabular-nums">5 patients</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Pre-visit admin per patient</span>
          <span className="tabular-nums">~25 min</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] italic">
        PDF emailed · printed at desk · re-keyed into the chart · eligibility checked twice
      </p>
    </div>
  );
}
