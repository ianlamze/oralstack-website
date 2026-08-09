"use client";

// Legacy-reality counterpart to CheckoutMock — depicts the paper-and-spreadsheet
// discharge flow Oralstack replaces. Pure CSS, no images. Used in the journey
// page as the "before" pane against CheckoutMock on the "after" side.
//
// Design intent: feel slightly stale, slightly frictional. Hand-corrected
// invoice line, sticky-note follow-up, end-of-day reconciliation footer.

type ManualLine = { code: string; name: string; price: string; flag?: "missing" | "verify" };

const invoiceLines: ManualLine[] = [
  { code: "DCC107", name: "Filling, composite (16-O)", price: "180.00" },
  { code: "DCC301", name: "Polish & scale", price: "120.00" },
  { code: "—", name: "?? scaling (re-check chart)", price: "—", flag: "verify" },
  { code: "DCC212", name: "Hygiene assessment", price: "80.00" },
  { code: "—", name: "Fluoride app — was this charged?", price: "—", flag: "missing" },
];

const followUps = [
  {
    name: "Demo patient 103 · DEMO-1067",
    note: "Walked out · bill not ready · call Mon 09:00",
    amount: "S$245",
  },
  {
    name: "Demo patient 104 · DEMO-1042",
    note: "GST line missing · patient queried · re-issue",
    amount: "S$96",
  },
];

export default function BeforeDischargeMock() {
  return (
    <div
      role="img"
      aria-label="Before-Oralstack discharge: a hand-corrected paper invoice with two missing lines, a sticky-note follow-up list of patients who left without paying, and an end-of-day reconciliation footer showing 47 minutes of office-manager time still to spend."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_30%)] p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Discharge · paper invoice</span>
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
          17:42 · end of day
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-white p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Demo patient 102 · DEMO-1054
        </p>
        <ul className="mt-2 grid divide-y divide-[var(--color-border)]">
          {invoiceLines.map((it, i) => {
            const isFlagged = it.flag !== undefined;
            return (
              <li
                key={`${it.code}-${i}`}
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-2 font-mono text-[12px] ${
                  isFlagged ? "text-[var(--color-text-soft)] italic" : "text-[var(--color-text)]"
                }`}
              >
                <span
                  className={`text-[10px] tabular-nums ${
                    isFlagged
                      ? "text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
                      : "text-[var(--color-text-soft)]"
                  }`}
                >
                  {it.code}
                </span>
                <span className="truncate">{it.name}</span>
                <span className="tabular-nums">{it.price}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 pt-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-soft)] italic">
          Re-keyed from chart · GST not yet added · waiting on the dentist
        </p>
      </div>

      <div className="mt-4 grid gap-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Follow-up call list (paper)
        </p>
        {followUps.map((f) => (
          <div
            key={f.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_88%)] px-3 py-2"
          >
            <div className="grid gap-0.5 min-w-0">
              <span className="text-[12px] font-medium text-[var(--color-text)] truncate">
                {f.name}
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)] italic truncate">
                {f.note}
              </span>
            </div>
            <span className="text-[12px] font-semibold tabular-nums text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]">
              {f.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>End-of-day reconciliation</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">
            12 visits · 8 invoiced · 4 chasing
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Outstanding</span>
          <span className="tabular-nums">S$680</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Office-manager reconcile time</span>
          <span className="tabular-nums">~47 min</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] italic">
        Patients leave before the bill is ready · double entry between chart and invoice · audit
        trail lives in a notebook
      </p>
    </div>
  );
}
