"use client";

// Legacy-reality counterpart to ScheduleMock — depicts the paper-diary
// booking flow Oralstack replaces. Pure CSS, brand tokens only. Used in
// the journey page as the "before" pane on the Booking stage.
//
// Design intent: the diary is hand-corrected, the phone-tag list is long,
// and the day is half-empty even though the front desk has been on the
// phone all morning.

type DiaryEntry = {
  time: string;
  status: "booked" | "tentative" | "callback" | "rebooked" | "open";
  patient?: string;
  note?: string;
};

const diary: DiaryEntry[] = [
  { time: "09:00", status: "booked", patient: "Lim Wei Jian", note: "polish & scale" },
  {
    time: "09:30",
    status: "rebooked",
    patient: "Devi Krishnan",
    note: "moved from Tue · ✗ then ✓",
  },
  { time: "10:00", status: "open" },
  {
    time: "10:30",
    status: "tentative",
    patient: "Aaron Teo?",
    note: "waiting on insurance confirm",
  },
  { time: "11:00", status: "callback", patient: "Mei Lin Tan", note: "voicemail · try 14:00" },
  { time: "11:30", status: "open" },
];

const phoneTag = [
  { name: "Mrs Wong · #1098", attempts: 2, note: "asked Tuesday — slot taken before callback" },
  { name: "Hafiz Yusof · #1112", attempts: 3, note: "WhatsApp on staff phone — no reply yet" },
  { name: "New patient · walk-in form", attempts: 1, note: "left number, no source captured" },
];

const statusStyles: Record<DiaryEntry["status"], string> = {
  booked: "bg-[color-mix(in_oklch,var(--color-sea),white_82%)] text-[var(--color-text)]",
  tentative:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_82%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] italic",
  callback:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_88%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] italic",
  rebooked: "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)] line-through",
  open: "bg-white text-[var(--color-text-soft)] italic",
};

const statusLabels: Record<DiaryEntry["status"], string> = {
  booked: "BKD",
  tentative: "TBC",
  callback: "C/B",
  rebooked: "MOV",
  open: "—",
};

export default function BeforeBookingMock() {
  return (
    <div
      role="img"
      aria-label="Before-Oralstack booking: a hand-corrected paper diary with one tentative slot, one rescheduled slot, and two empty slots; a phone-tag list of three patients waiting on callback; and a footer showing 38 minutes on the phone for only 4 bookings confirmed."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_30%)] p-4 sm:p-5 md:p-6 max-w-[560px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Booking · paper diary</span>
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
          Mon · chair 1
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-white p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Diary · 9 — 12 noon
        </p>
        <ul className="mt-2 grid divide-y divide-[var(--color-border)]">
          {diary.map((row, i) => (
            <li
              key={`${row.time}-${i}`}
              className={`grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-3 py-2 text-[12px] ${statusStyles[row.status]} px-2 rounded-[2px]`}
            >
              <span className="font-mono tabular-nums text-[11px] text-[var(--color-text-soft)]">
                {row.time}
              </span>
              <span className="font-mono text-[9px] tabular-nums tracking-[0.08em] text-[var(--color-text-soft)] uppercase">
                {statusLabels[row.status]}
              </span>
              <span className="grid gap-0.5 min-w-0">
                {row.patient ? (
                  <>
                    <span className="text-[12px] truncate">{row.patient}</span>
                    {row.note && (
                      <span className="text-[10px] not-italic text-[var(--color-text-muted)] truncate">
                        {row.note}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-[11px] text-[var(--color-text-soft)]">empty slot</span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 pt-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-soft)] italic">
          Pencil corrections · double-booking risk on busy days
        </p>
      </div>

      <div className="mt-4 grid gap-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Phone tag · waiting on callback
        </p>
        {phoneTag.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_88%)] px-3 py-2"
          >
            <div className="grid gap-0.5 min-w-0">
              <span className="text-[12px] font-medium text-[var(--color-text)] truncate">
                {p.name}
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)] italic truncate">
                {p.note}
              </span>
            </div>
            <span className="text-[10px] tabular-nums text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold uppercase tracking-[0.1em] whitespace-nowrap">
              {p.attempts}× tried
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>Front desk · this morning</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">
            15 calls · 4 booked
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Awaiting callback</span>
          <span className="tabular-nums">6 patients</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Front-desk phone time</span>
          <span className="tabular-nums">~38 min</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] italic">
        Slot search is manual · WhatsApp confirmations on staff personal phone · no audit trail when
        staff turn over
      </p>
    </div>
  );
}
