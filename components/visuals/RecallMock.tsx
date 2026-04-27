type Status = "Overdue" | "Contacted" | "Booked";

type Row = {
  name: string;
  monthsOverdue: number;
  lastVisit: string;
  lastTreatment: string;
  status: Status;
};

const rows: Row[] = [
  {
    name: "Lim Wei Jian",
    monthsOverdue: 6,
    lastVisit: "31 Oct",
    lastTreatment: "Polish & scale",
    status: "Overdue",
  },
  {
    name: "Devi Krishnan",
    monthsOverdue: 4,
    lastVisit: "14 Nov",
    lastTreatment: "Hygiene visit",
    status: "Contacted",
  },
  {
    name: "Aaron Teo",
    monthsOverdue: 3,
    lastVisit: "2 Dec",
    lastTreatment: "Recall hygiene",
    status: "Booked",
  },
  {
    name: "Mei Lin Tan",
    monthsOverdue: 5,
    lastVisit: "1 Dec",
    lastTreatment: "Polish & scale",
    status: "Overdue",
  },
  {
    name: "Hafiz Yusof",
    monthsOverdue: 4,
    lastVisit: "20 Dec",
    lastTreatment: "Hygiene visit",
    status: "Overdue",
  },
];

const statusStyles: Record<Status, string> = {
  Overdue:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] border-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)]",
  Contacted:
    "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)] border-[var(--color-border-strong)]",
  Booked:
    "bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)]",
};

const totalDue = 12;

export default function RecallMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack recall queue: a table of patients due for hygiene with last visit date, months overdue, last treatment, and outreach status."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[560px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Recall queue</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          {totalDue} patients due
        </span>
      </div>

      <div className="mt-5 grid">
        <div className="grid grid-cols-[minmax(0,1.5fr)_auto_auto_auto] gap-2 sm:gap-3 text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] pb-2 border-b border-[var(--color-border)]">
          <span>Patient</span>
          <span className="text-right">Overdue</span>
          <span className="hidden sm:inline-block">Last visit</span>
          <span className="text-right">Status</span>
        </div>

        <ul className="grid divide-y divide-[var(--color-border)]">
          {rows.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[minmax(0,1.5fr)_auto_auto_auto] gap-2 sm:gap-3 items-center py-2.5"
            >
              <div className="grid gap-0.5 min-w-0">
                <span className="text-sm font-medium text-[var(--color-text)] truncate">
                  {r.name}
                </span>
                <span className="text-[10px] text-[var(--color-text-soft)] truncate">
                  {r.lastTreatment}
                </span>
              </div>
              <span className="text-xs font-medium text-[var(--color-text-muted)] tabular-nums text-right">
                {r.monthsOverdue}mo
              </span>
              <span className="hidden sm:inline-block text-xs text-[var(--color-text-soft)] tabular-nums">
                {r.lastVisit}
              </span>
              <span
                className={`inline-flex items-center text-[10px] font-medium uppercase tracking-[0.12em] rounded-full border px-2 py-0.5 whitespace-nowrap justify-self-end ${statusStyles[r.status]}`}
              >
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3 gap-3">
        <span>WhatsApp templates · audit-logged</span>
        <span className="font-medium text-[var(--color-text-muted)] whitespace-nowrap">
          Send recall →
        </span>
      </div>
    </div>
  );
}
