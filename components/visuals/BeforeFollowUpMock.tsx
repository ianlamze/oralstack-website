"use client";

// Legacy-reality counterpart for the Follow-up & recall stage. Pure
// CSS, brand tokens only. The "after" pane on the journey page reuses
// the existing RecallMock — no new "after" component needed.
//
// Design intent: a stale spreadsheet recall list that nobody updates,
// outreach sent from staff personal phones with no audit trail, and a
// large lapsed-patient counter that captures the silent revenue leak.

type RecallRow = {
  patient: string;
  due: string;
  lastContacted: string;
  status: "stale" | "lapsed" | "open";
};

const recallRows: RecallRow[] = [
  {
    patient: "Lim Wei Jian · #1042",
    due: "3 months ago",
    lastContacted: "6 months ago",
    status: "stale",
  },
  {
    patient: "Mrs Wong · #1098",
    due: "5 months ago",
    lastContacted: "never",
    status: "stale",
  },
  {
    patient: "Mei Lin Tan · #1042",
    due: "due this week",
    lastContacted: "—",
    status: "open",
  },
  {
    patient: "Old patient (?) · 2022",
    due: "2 years ago",
    lastContacted: "lost in turnover",
    status: "lapsed",
  },
];

const statusStyles: Record<RecallRow["status"], string> = {
  stale:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_88%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] italic",
  lapsed:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_82%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] italic",
  open: "bg-white text-[var(--color-text)]",
};

export default function BeforeFollowUpMock() {
  return (
    <div
      role="img"
      aria-label="Before-Oralstack follow-up: a stale recall spreadsheet with patients due months ago and unclear contact dates, an outreach note showing messages sent from staff personal WhatsApp, a counter of 47 patients lapsed at least 18 months, and a footer showing 41 percent recall coverage and 4 hours weekly on outreach."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_30%)] p-4 sm:p-5 md:p-6 max-w-[560px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Recall · spreadsheet + personal WhatsApp</span>
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
          recall.xlsx · last edited 2 mo ago
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-white p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Recall list (sheet)
        </p>
        <div className="mt-2 grid grid-cols-[minmax(0,1.2fr)_auto_auto] gap-2 sm:gap-3 pb-1.5 border-b border-[var(--color-border)]">
          <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Patient
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] text-right">
            Due
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] text-right">
            Last contact
          </span>
        </div>
        <ul className="grid divide-y divide-[var(--color-border)]">
          {recallRows.map((r) => (
            <li
              key={r.patient}
              className={`grid grid-cols-[minmax(0,1.2fr)_auto_auto] gap-2 sm:gap-3 items-center py-2 px-2 -mx-2 rounded-[2px] ${statusStyles[r.status]}`}
            >
              <span className="text-[12px] font-medium not-italic text-[var(--color-text)] truncate">
                {r.patient}
              </span>
              <span className="text-[11px] tabular-nums text-right">{r.due}</span>
              <span className="text-[11px] tabular-nums text-right truncate">
                {r.lastContacted}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 pt-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-soft)] italic">
          Sheet diverges from reality · staff turnover loses the running notes
        </p>
      </div>

      <div className="mt-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_88%)] px-3 py-2.5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-start">
          <span aria-hidden className="text-[14px] leading-none text-[var(--color-text-muted)]">
            ✎
          </span>
          <div className="grid gap-0.5 min-w-0">
            <span className="text-[12px] font-medium text-[var(--color-text)]">
              Outreach · staff personal WhatsApp
            </span>
            <span className="text-[11px] text-[var(--color-text-muted)] italic">
              Messages from Sara&apos;s phone · no read receipts visible to clinic · history lost
              when she leaves
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>Recall coverage rate</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">~41%</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Lapsed (≥18 months no contact)</span>
          <span className="tabular-nums text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
            47 patients
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Staff time on outreach</span>
          <span className="tabular-nums">~4 h / week</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] italic">
        Stale spreadsheet · personal phones · lapsed patients are pure revenue leak
      </p>
    </div>
  );
}
