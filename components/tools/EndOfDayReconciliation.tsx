"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { summarize, transactions as initialTransactions } from "@/content/eod-reconciliation/data";
import type { Transaction } from "@/content/eod-reconciliation/types";
import { track } from "@/lib/analytics";

type Stage = "unreconciled" | "investigating" | "resolved" | "syncing" | "synced";

const TARGET_TX_ID = "t9";

function formatSGD(n: number) {
  return `S$${n.toLocaleString("en-SG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatSGDShort(n: number) {
  return `S$${n.toLocaleString("en-SG", { maximumFractionDigits: 0 })}`;
}

export default function EndOfDayReconciliation() {
  const [stage, setStage] = useState<Stage>("unreconciled");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [postDemoNudge, setPostDemoNudge] = useState(false);
  const [showAllTx, setShowAllTx] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  const summary = useMemo(() => summarize(transactions), [transactions]);
  const variance = summary.collected - summary.expected;

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
    setPostDemoNudge(false);
  }

  function investigate() {
    markInteracted();
    if (stage !== "unreconciled") return;
    setStage("investigating");
    setShowAllTx(true);
    track("eod_investigate_clicked", {});
  }

  function resolveMismatch() {
    markInteracted();
    if (stage !== "investigating") return;
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === TARGET_TX_ID
          ? { ...t, invoice: "INV-0431", patientName: "Walk-in · S. Tan (matched)" }
          : t,
      ),
    );
    setStage("resolved");
    track("eod_mismatch_resolved", { tx_id: TARGET_TX_ID });
  }

  function syncToXero() {
    markInteracted();
    if (stage !== "resolved" && stage !== "synced") return;
    setStage("syncing");
    track("eod_xero_sync_clicked", { tx_count: transactions.length });
    const t = setTimeout(() => setStage("synced"), 1400);
    demoTimersRef.current.push(t);
  }

  function reset() {
    markInteracted();
    setStage("unreconciled");
    setTransactions(initialTransactions);
    setShowAllTx(false);
    track("eod_reset", {});
  }

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;

    const investigate = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setStage("investigating");
      setShowAllTx(true);
    }, 800);

    const resolve = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === TARGET_TX_ID
            ? { ...t, invoice: "INV-0431", patientName: "Walk-in · S. Tan (matched)" }
            : t,
        ),
      );
      setStage("resolved");
    }, 800 + 1500);

    const sync = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setStage("syncing");
      },
      800 + 1500 + 1100,
    );

    const synced = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setStage("synced");
      },
      800 + 1500 + 1100 + 1300,
    );

    const nudgeOn = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setPostDemoNudge(true);
      },
      800 + 1500 + 1100 + 1300 + 700,
    );

    const nudgeOff = setTimeout(
      () => setPostDemoNudge(false),
      800 + 1500 + 1100 + 1300 + 700 + 3500,
    );

    demoTimersRef.current = [investigate, resolve, sync, synced, nudgeOn, nudgeOff];
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting) return;
        if (hasDemoedRef.current || hasInteractedRef.current) return;
        hasDemoedRef.current = true;
        obs.disconnect();
        runDemo();
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduceMotion, runDemo]);

  useEffect(() => {
    return () => {
      for (const t of demoTimersRef.current) clearTimeout(t);
      demoTimersRef.current = [];
    };
  }, []);

  const reconciled = variance === 0;
  const visibleTx = showAllTx ? transactions : transactions.slice(0, 4);

  return (
    <div
      ref={containerRef}
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>End-of-day · 17:05</span>
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
          DFI Synergy · today
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8 items-start">
        <div className="grid gap-4">
          {/* Status banner */}
          <AnimatePresence mode="wait" initial={false}>
            {!reconciled ? (
              <motion.div
                key="warn"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-md border-2 p-4 grid gap-2"
                style={{
                  borderColor:
                    "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)",
                  backgroundColor: "color-mix(in oklch, var(--color-sunset), white 80%)",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]">
                  ⚠ {formatSGD(Math.abs(variance))} unaccounted
                </p>
                <p className="text-sm text-[var(--color-text)] leading-snug">
                  {summary.byMode.length} payment modes total{" "}
                  <span className="font-semibold">{formatSGD(summary.collected)}</span> · only{" "}
                  <span className="font-semibold">{formatSGD(summary.expected)}</span> matches an
                  invoice. The variance points at one transaction.
                </p>
                {stage === "unreconciled" && (
                  <button
                    type="button"
                    onClick={investigate}
                    className="justify-self-start mt-1 inline-flex items-center min-h-[36px] rounded-md bg-[var(--color-ink)] px-3 py-1.5 text-[11px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
                  >
                    Investigate variance →
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="ok"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-md border-2 p-4 grid gap-2"
                style={{
                  borderColor: "color-mix(in oklch, var(--color-sea), var(--color-ink) 25%)",
                  backgroundColor: "color-mix(in oklch, var(--color-sea), white 78%)",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]">
                  ✓ Reconciled · {formatSGD(summary.collected)} matched
                </p>
                <p className="text-sm text-[var(--color-text)] leading-snug">
                  {transactions.length} transactions · {summary.invoicesIssued} invoices · GST
                  collected {formatSGD(summary.gst)}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {summary.byMode.map((m) => (
              <div
                key={m.mode}
                className="rounded-md border border-[var(--color-border)] bg-white p-3 grid gap-0.5"
              >
                <p className="text-[9px] uppercase tracking-[0.12em] text-[var(--color-text-soft)] font-medium">
                  {m.mode}
                </p>
                <p className="text-base font-semibold tabular-nums text-[var(--color-text)]">
                  {formatSGDShort(m.collected)}
                </p>
                <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
                  {m.count} txns
                </p>
              </div>
            ))}
          </div>

          {/* Transaction list */}
          <div className="rounded-md border border-[var(--color-border)] bg-white">
            <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-[var(--color-border)]">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
                Transactions · {transactions.length}
              </p>
              <button
                type="button"
                onClick={() => {
                  markInteracted();
                  setShowAllTx((v) => !v);
                }}
                className="text-[10px] font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
              >
                {showAllTx ? "Show fewer" : `Show all ${transactions.length}`}
              </button>
            </div>
            <ul className="grid divide-y divide-[var(--color-border)] text-[11px] max-h-[280px] overflow-y-auto">
              {visibleTx.map((t) => {
                const isTarget = t.id === TARGET_TX_ID;
                const isFlagged = isTarget && t.invoice === null;
                const isResolved = isTarget && t.invoice !== null;
                return (
                  <motion.li
                    key={t.id}
                    layout={!reduceMotion}
                    animate={
                      reduceMotion || !isFlagged
                        ? undefined
                        : {
                            backgroundColor: [
                              "rgba(0,0,0,0)",
                              "color-mix(in oklch, var(--color-sunset), white 80%)",
                              "rgba(0,0,0,0)",
                            ],
                          }
                    }
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-2 px-3 py-2"
                  >
                    <span className="text-[10px] tabular-nums text-[var(--color-text-soft)]">
                      {t.time}
                    </span>
                    <span className="truncate text-[var(--color-text)] flex items-center gap-2">
                      {t.patientName}
                      {isFlagged && (
                        <span className="inline-flex text-[9px] uppercase tracking-[0.08em] font-semibold rounded-full border border-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_30%)] bg-[color-mix(in_oklch,var(--color-sunset),white_75%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] px-1.5 py-0.5">
                          No invoice
                        </span>
                      )}
                      {isResolved && (
                        <span className="inline-flex text-[9px] uppercase tracking-[0.08em] font-semibold rounded-full border border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)] bg-[color-mix(in_oklch,var(--color-sea),white_75%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] px-1.5 py-0.5">
                          ✓ Matched
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-soft)] font-medium">
                      {t.mode}
                    </span>
                    <span className="tabular-nums font-medium text-[var(--color-text)]">
                      {formatSGD(t.amount)}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <p className="text-[10px] tracking-[0.04em] mt-1 min-h-[14px]">
            <AnimatePresence mode="wait" initial={false}>
              {postDemoNudge ? (
                <motion.span
                  key="nudge"
                  initial={reduceMotion ? false : { opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1 font-semibold text-[var(--color-tide-deep)]"
                >
                  <span aria-hidden>↺</span>
                  Now you try — click reset, then walk the steps yourself
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-[var(--color-text-soft)]"
                >
                  Find variance · resolve mismatch · sync to Xero · all in one pane
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>

        {/* Right column: action card that morphs by stage */}
        <aside className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
            Reconciliation steps
          </p>
          <ol className="grid gap-2 text-[12px]">
            <Step
              n={1}
              label="Variance flagged"
              done
              active={stage === "unreconciled"}
              detail={`${formatSGD(Math.abs(variance))} unaccounted across ${summary.byMode.length} modes`}
            />
            <Step
              n={2}
              label="Mismatch identified"
              done={stage !== "unreconciled"}
              active={stage === "investigating"}
              detail={
                stage === "unreconciled"
                  ? "Click investigate to surface the unmatched line"
                  : "PayNow 14:32 · S$50 · no invoice on file"
              }
            />
            <Step
              n={3}
              label="Linked to invoice"
              done={stage === "resolved" || stage === "syncing" || stage === "synced"}
              active={stage === "resolved"}
              detail={
                stage === "investigating" ? (
                  <button
                    type="button"
                    onClick={resolveMismatch}
                    className="text-[var(--color-tide-deep)] font-medium underline underline-offset-4 hover:decoration-2"
                  >
                    Match to walk-in INV-0431 →
                  </button>
                ) : stage === "resolved" || stage === "syncing" || stage === "synced" ? (
                  "INV-0431 created · matched to walk-in S. Tan"
                ) : (
                  "Pending"
                )
              }
            />
            <Step
              n={4}
              label="Synced to Xero"
              done={stage === "synced"}
              active={stage === "syncing"}
              detail={
                stage === "syncing" ? (
                  <span className="inline-flex items-center gap-1.5">
                    <motion.span
                      aria-hidden
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block h-3 w-3 rounded-full border-2 border-[var(--color-tide-deep)] border-t-transparent"
                    />
                    Syncing {transactions.length} transactions…
                  </span>
                ) : stage === "synced" ? (
                  "Last synced · just now · ledger reconciled"
                ) : stage === "resolved" ? (
                  <button
                    type="button"
                    onClick={syncToXero}
                    className="text-[var(--color-tide-deep)] font-medium underline underline-offset-4 hover:decoration-2"
                  >
                    Push {transactions.length} txns to Xero →
                  </button>
                ) : (
                  "Pending"
                )
              }
            />
          </ol>

          {(stage === "synced" || stage === "resolved") && (
            <button
              type="button"
              onClick={reset}
              className="justify-self-start text-[11px] font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
            >
              ↺ Reset and replay
            </button>
          )}

          <a
            href="/book-a-demo"
            className="inline-flex items-center justify-center min-h-[40px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2.5 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
          >
            Run on your real ledger → demo
          </a>
        </aside>
      </div>
    </div>
  );
}

function Step({
  n,
  label,
  detail,
  done,
  active,
}: {
  n: number;
  label: string;
  detail?: React.ReactNode;
  done?: boolean;
  active?: boolean;
}) {
  const dotBg = done
    ? "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)"
    : active
      ? "var(--color-ink)"
      : "color-mix(in oklch, var(--color-border-strong), white 30%)";
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-start">
      <span
        aria-hidden
        className="grid place-items-center h-5 w-5 rounded-full text-[10px] font-semibold text-white tabular-nums"
        style={{ backgroundColor: dotBg }}
      >
        {done ? "✓" : n}
      </span>
      <div className="grid gap-0.5">
        <span className="text-[12px] font-semibold text-[var(--color-text)]">{label}</span>
        {detail && (
          <span className="text-[11px] text-[var(--color-text-muted)] leading-snug">{detail}</span>
        )}
      </div>
    </li>
  );
}
