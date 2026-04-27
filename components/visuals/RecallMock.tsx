"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Status = "Overdue" | "Contacted" | "Booked";

type Row = {
  id: string;
  name: string;
  monthsOverdue: number;
  lastVisit: string;
  lastVisitOrder: number;
  lastTreatment: string;
  status: Status;
};

const initialRows: Row[] = [
  {
    id: "r1",
    name: "Lim Wei Jian",
    monthsOverdue: 6,
    lastVisit: "31 Oct",
    lastVisitOrder: 0,
    lastTreatment: "Polish & scale",
    status: "Overdue",
  },
  {
    id: "r2",
    name: "Devi Krishnan",
    monthsOverdue: 4,
    lastVisit: "14 Nov",
    lastVisitOrder: 1,
    lastTreatment: "Hygiene visit",
    status: "Contacted",
  },
  {
    id: "r3",
    name: "Aaron Teo",
    monthsOverdue: 3,
    lastVisit: "2 Dec",
    lastVisitOrder: 3,
    lastTreatment: "Recall hygiene",
    status: "Booked",
  },
  {
    id: "r4",
    name: "Mei Lin Tan",
    monthsOverdue: 5,
    lastVisit: "1 Dec",
    lastVisitOrder: 2,
    lastTreatment: "Polish & scale",
    status: "Overdue",
  },
  {
    id: "r5",
    name: "Hafiz Yusof",
    monthsOverdue: 4,
    lastVisit: "20 Dec",
    lastVisitOrder: 4,
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

const statusOrder: Record<Status, number> = { Overdue: 0, Contacted: 1, Booked: 2 };

type SortKey = "name" | "overdue" | "status";

const totalDue = 12;

export default function RecallMock() {
  const [rows, setRows] = useState(initialRows);
  const [sentCount, setSentCount] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("overdue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const reduceMotion = useReducedMotion();

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "overdue") cmp = a.monthsOverdue - b.monthsOverdue;
      else cmp = statusOrder[a.status] - statusOrder[b.status];
      return cmp === 0 ? a.lastVisitOrder - b.lastVisitOrder : cmp * dir;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function sendRecall(id: string) {
    const target = rows.find((r) => r.id === id);
    if (!target || target.status !== "Overdue") return;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Contacted" as const } : r)));
    setSentCount((n) => n + 1);
  }

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null;
    return (
      <span aria-hidden className="ml-1 text-[var(--color-text-muted)]">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const headerBtn =
    "inline-flex items-center text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] rounded";

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[560px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Recall queue</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          {totalDue} patients due
        </span>
      </div>

      <div className="mt-5 grid">
        <div className="grid grid-cols-[minmax(0,1.5fr)_auto_auto_auto] gap-2 sm:gap-3 pb-2 border-b border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => toggleSort("name")}
            className={`${headerBtn} text-left`}
          >
            Patient
            {sortIndicator("name")}
          </button>
          <button
            type="button"
            onClick={() => toggleSort("overdue")}
            className={`${headerBtn} justify-end`}
          >
            Overdue
            {sortIndicator("overdue")}
          </button>
          <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Last visit
          </span>
          <button
            type="button"
            onClick={() => toggleSort("status")}
            className={`${headerBtn} justify-end`}
          >
            Status
            {sortIndicator("status")}
          </button>
        </div>

        <ul className="grid divide-y divide-[var(--color-border)]">
          {sorted.map((r) => {
            const isOverdue = r.status === "Overdue";
            const rowInner = (
              <>
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
                <motion.span
                  layout={!reduceMotion}
                  className={`inline-flex items-center text-[10px] font-medium uppercase tracking-[0.12em] rounded-full border px-2 py-0.5 whitespace-nowrap justify-self-end transition-colors ${statusStyles[r.status]}`}
                >
                  {r.status}
                </motion.span>
              </>
            );
            const rowClass =
              "grid grid-cols-[minmax(0,1.5fr)_auto_auto_auto] gap-2 sm:gap-3 items-center py-2.5 text-left w-full";
            return (
              <motion.li
                key={r.id}
                layout={!reduceMotion}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { layout: { type: "spring", stiffness: 420, damping: 36 } }
                }
              >
                {isOverdue ? (
                  <button
                    type="button"
                    onClick={() => sendRecall(r.id)}
                    aria-label={`${r.name}, ${r.monthsOverdue} months overdue, last visit ${r.lastVisit}. Send recall message.`}
                    className={`${rowClass} cursor-pointer hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] rounded`}
                  >
                    {rowInner}
                  </button>
                ) : (
                  <div className={rowClass}>{rowInner}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3 gap-3 min-h-[18px]">
        <span aria-live="polite" className="grid">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={sentCount}
              initial={reduceMotion ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {sentCount === 0
                ? "WhatsApp templates · audit-logged · click row to send"
                : `${sentCount} templated message${sentCount === 1 ? "" : "s"} queued · audit-logged`}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="font-medium text-[var(--color-text-muted)] whitespace-nowrap">
          Send recall →
        </span>
      </div>
    </div>
  );
}
