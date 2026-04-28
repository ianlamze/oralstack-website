"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertTriangle, ArrowRight, Check, MessageCircle, RotateCcw } from "lucide-react";
import { initialOrders, stages } from "@/content/lab-orders/data";
import type { LabOrder, LabStage } from "@/content/lab-orders/types";
import { track } from "@/lib/analytics";

const NEXT_STAGE: Record<LabStage, LabStage | null> = {
  sent: "at-lab",
  "at-lab": "ready",
  ready: "seated",
  seated: null,
};

const NEXT_VERB: Record<LabStage, string> = {
  sent: "Mark received at lab",
  "at-lab": "Mark ready to seat",
  ready: "Mark seated",
  seated: "—",
};

const DEMO_SLIPPED_ID = "lo3";

export default function LabOrderTracker() {
  const [orders, setOrders] = useState<LabOrder[]>(initialOrders);
  const [selectedId, setSelectedId] = useState<string | null>(DEMO_SLIPPED_ID);
  const reduceMotion = useReducedMotion();

  const selected = useMemo(
    () => orders.find((o) => o.id === selectedId) ?? null,
    [orders, selectedId],
  );

  function selectOrder(id: string) {
    setSelectedId(id);
    track("lab_order_opened", { order_id: id });
  }

  function advanceStage(id: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = NEXT_STAGE[o.stage];
        if (!next) return o;
        track("lab_order_advanced", { order_id: id, to: next });
        return { ...o, stage: next };
      }),
    );
  }

  function rescheduleSlipped(id: string) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        if (!o.suggestedReschedule) return o;
        track("lab_order_reschedule_clicked", { order_id: id });
        return { ...o, seatAppt: o.suggestedReschedule, slipped: false };
      }),
    );
  }

  function reset() {
    setOrders(initialOrders);
    setSelectedId(DEMO_SLIPPED_ID);
    track("lab_order_reset");
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Lab cases · sent to seated</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--color-tide-deep)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-tide-deep)]"
            />
            Live demo
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          DFI Synergy · 6 active cases
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto bg-[var(--color-canvas-tinted)]">
          <ul className="grid min-w-[820px] grid-cols-4 divide-x divide-[var(--color-border)]">
            {stages.map((s) => {
              const cards = orders.filter((o) => o.stage === s.id);
              return (
                <li key={s.id} className="grid content-start gap-0">
                  <div className="px-3 py-2.5 border-b border-[var(--color-border)] bg-white grid gap-0.5">
                    <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text)]">
                      {s.label}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-soft)]">
                      {cards.length} · {s.hint}
                    </p>
                  </div>
                  <ul className="grid gap-2 p-2.5 min-h-[280px]">
                    <AnimatePresence initial={false}>
                      {cards.map((o) => {
                        const isActive = o.id === selectedId;
                        return (
                          <motion.li
                            key={o.id}
                            layout={!reduceMotion}
                            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                          >
                            <button
                              type="button"
                              onClick={() => selectOrder(o.id)}
                              aria-pressed={isActive}
                              className={`w-full text-left rounded-[var(--radius-md)] border bg-white px-3 py-2.5 grid gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                                isActive
                                  ? "border-[var(--color-ink)] shadow-[0_0_0_1px_var(--color-ink)_inset]"
                                  : o.slipped
                                    ? "border-[oklch(0.62_0.18_25)]"
                                    : "border-[var(--color-border-strong)] hover:border-[var(--color-ink)]"
                              }`}
                            >
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="text-[12px] font-semibold text-[var(--color-text)] truncate">
                                  {o.patientName}
                                </span>
                                {o.slipped && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-[0.08em] font-semibold text-[oklch(0.55_0.18_25)] whitespace-nowrap">
                                    <AlertTriangle className="h-2.5 w-2.5" aria-hidden />
                                    Slipped
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[var(--color-text-muted)] truncate">
                                {o.toothLabel}
                              </p>
                              <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
                                {o.labName} · sent {o.sentDate}
                              </p>
                            </button>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                    {cards.length === 0 && (
                      <li className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] px-3 py-4 text-center text-[10px] text-[var(--color-text-soft)]">
                        Empty
                      </li>
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-white p-5 grid gap-3 content-start min-h-[320px]">
          {selected ? (
            <>
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
                  Case detail
                </p>
                <p className="mt-1 text-[14px] font-semibold text-[var(--color-text)]">
                  {selected.patientName}
                </p>
                <p className="text-[12px] text-[var(--color-text-muted)]">{selected.toothLabel}</p>
              </div>

              <dl className="grid gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-3">
                <DetailRow label="Lab" value={selected.labName} />
                <DetailRow label="Sent" value={selected.sentDate} />
                <DetailRow label="Expected" value={selected.expectedReady} />
                <DetailRow label="Seat appt" value={selected.seatAppt} />
              </dl>

              <Timeline stage={selected.stage} />

              {selected.slipped && selected.suggestedReschedule && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-[var(--radius-md)] border border-[oklch(0.62_0.18_25/0.4)] bg-[oklch(0.62_0.18_25/0.06)] p-3 grid gap-2"
                >
                  <p className="text-[11px] text-[var(--color-text)] leading-snug">
                    <span className="font-semibold text-[oklch(0.45_0.18_25)]">
                      Lab confirmed delay.
                    </span>{" "}
                    Current seat appt is at risk. Suggest{" "}
                    <span className="font-semibold">{selected.suggestedReschedule}</span> — same
                    provider, next open slot after the new ready date.
                  </p>
                  <button
                    type="button"
                    onClick={() => rescheduleSlipped(selected.id)}
                    className="inline-flex items-center gap-1.5 self-start rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[var(--color-text)] hover:border-[var(--color-ink)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                  >
                    <MessageCircle className="h-3 w-3" aria-hidden />
                    Reschedule & notify on WhatsApp
                  </button>
                </motion.div>
              )}

              {!selected.slipped && selected.stage !== "seated" && (
                <button
                  type="button"
                  onClick={() => advanceStage(selected.id)}
                  className="inline-flex items-center justify-center gap-1.5 self-start rounded-[var(--radius-md)] bg-[var(--color-ink)] px-3 py-2 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  {NEXT_VERB[selected.stage]} <ArrowRight className="h-3 w-3" aria-hidden />
                </button>
              )}

              {selected.stage === "seated" && (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-tide-deep)]">
                  <Check className="h-3 w-3" aria-hidden /> Done. Visit closed in chart.
                </p>
              )}
            </>
          ) : (
            <p className="text-[12px] text-[var(--color-text-muted)]">
              Click a case to open its timeline and actions.
            </p>
          )}
        </aside>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
          Lab confirms delay → seat appt at risk → next open slot proposed → patient notified on
          WhatsApp.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Reset board
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your lab cases → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Cases live in the patient chart. Lab notifications and seat-appt holds share one source —
          when the lab slips, the schedule slips with it.
        </p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-2 items-baseline">
      <dt className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
        {label}
      </dt>
      <dd className="text-[12px] text-[var(--color-text)] tabular-nums">{value}</dd>
    </div>
  );
}

function Timeline({ stage }: { stage: LabStage }) {
  const order: LabStage[] = ["sent", "at-lab", "ready", "seated"];
  const reachedIdx = order.indexOf(stage);
  return (
    <ol className="grid gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
      {order.map((s, i) => {
        const meta = stagesLookup[s];
        const state = i < reachedIdx ? "done" : i === reachedIdx ? "current" : "upcoming";
        return (
          <li key={s} className="grid grid-cols-[16px_1fr] gap-2 items-baseline">
            <span
              aria-hidden
              className={`mt-1 h-2 w-2 rounded-full ${
                state === "done"
                  ? "bg-[var(--color-tide-deep)]"
                  : state === "current"
                    ? "bg-[var(--color-ink)] ring-2 ring-[color-mix(in_oklch,var(--color-ink),white_70%)]"
                    : "bg-[var(--color-border-strong)]"
              }`}
            />
            <span
              className={`text-[11px] ${
                state === "upcoming" ? "text-[var(--color-text-soft)]" : "text-[var(--color-text)]"
              } ${state === "current" ? "font-semibold" : ""}`}
            >
              {meta.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const stagesLookup = {
  sent: { label: "Sent to lab" },
  "at-lab": { label: "At the lab" },
  ready: { label: "Ready to seat" },
  seated: { label: "Seated" },
} as const;
