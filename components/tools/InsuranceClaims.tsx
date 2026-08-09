"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowRight, Check, RotateCcw } from "lucide-react";
import { initialClaims } from "@/content/insurance-claims/data";
import type { Claim, ClaimStatus } from "@/content/insurance-claims/types";
import { track } from "@/lib/analytics";

type Filter = "all" | ClaimStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "drafted", label: "Drafted" },
  { id: "submitted", label: "Submitted" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "paid", label: "Paid" },
];

const DEMO_DRAFT_ID = "cl1";

function fmtSgd(n: number) {
  return `SGD ${n.toLocaleString("en-SG")}`;
}

function statusLabel(s: ClaimStatus) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function InsuranceClaims() {
  const [claims, setClaims] = useState<Claim[]>(initialClaims);
  const [selectedId, setSelectedId] = useState<string | null>(DEMO_DRAFT_ID);
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(
    () => (filter === "all" ? claims : claims.filter((c) => c.status === filter)),
    [claims, filter],
  );
  const selected = useMemo(
    () => claims.find((c) => c.id === selectedId) ?? null,
    [claims, selectedId],
  );

  const totals = useMemo(() => {
    const awaitingDecision = claims
      .filter((c) => c.status === "submitted")
      .reduce((sum, c) => sum + c.amountSgd, 0);
    const awaitingPayment = claims
      .filter((c) => c.status === "approved")
      .reduce((sum, c) => sum + (c.amountApprovedSgd ?? c.amountSgd), 0);
    const needsAttention = claims
      .filter((c) => c.status === "rejected")
      .reduce((sum, c) => sum + c.amountSgd, 0);
    return { awaitingDecision, awaitingPayment, needsAttention };
  }, [claims]);

  function selectClaim(id: string) {
    setSelectedId(id);
    track("claim_opened", { claim_id: id });
  }

  function submitClaim(id: string) {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "submitted", submittedAgo: "just now", autoDrafted: false }
          : c,
      ),
    );
    track("claim_submitted", { claim_id: id });
  }

  function resubmitClaim(id: string) {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "submitted",
              submittedAgo: "just now",
              rejectionReason: undefined,
              rejectionFixHint: undefined,
            }
          : c,
      ),
    );
    track("claim_resubmitted", { claim_id: id });
  }

  function reset() {
    setClaims(initialClaims);
    setSelectedId(DEMO_DRAFT_ID);
    setFilter("all");
    track("claim_reset");
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Claims · MediSave · CHAS · IPP</span>
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
          Sample Dental Clinic · Singapore
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3 mb-5">
        <Stat label="Awaiting decision" value={fmtSgd(totals.awaitingDecision)} tone="neutral" />
        <Stat label="Awaiting payment" value={fmtSgd(totals.awaitingPayment)} tone="positive" />
        <Stat
          label="Needs attention"
          value={fmtSgd(totals.needsAttention)}
          tone={totals.needsAttention > 0 ? "warning" : "neutral"}
        />
      </ul>

      <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-1.5 mb-3">
        {FILTERS.map((f) => {
          const isActive = filter === f.id;
          const count =
            f.id === "all" ? claims.length : claims.filter((c) => c.status === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                  : "border-[var(--color-border-strong)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
              }`}
            >
              {f.label}{" "}
              <span
                className={`tabular-nums ${
                  isActive ? "opacity-80" : "text-[var(--color-text-soft)]"
                }`}
              >
                · {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <ul className="divide-y divide-[var(--color-border)] bg-white max-h-[480px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {filtered.map((c) => {
              const isActive = c.id === selectedId;
              return (
                <motion.li
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    type="button"
                    onClick={() => selectClaim(c.id)}
                    aria-pressed={isActive}
                    className={`w-full text-left px-4 py-3 grid gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-tide-deep)] ${
                      isActive
                        ? "bg-[var(--color-canvas-tinted)] border-l-2 border-l-[var(--color-ink)]"
                        : "border-l-2 border-l-transparent hover:bg-[var(--color-canvas-tinted)]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[13px] font-semibold text-[var(--color-text)] truncate">
                        {c.patientName}
                      </span>
                      <span className="text-[11px] tabular-nums font-semibold text-[var(--color-text)] whitespace-nowrap">
                        {fmtSgd(
                          c.status === "paid" ? (c.amountApprovedSgd ?? c.amountSgd) : c.amountSgd,
                        )}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] text-[var(--color-text-muted)] truncate">
                        {c.procedure}
                      </span>
                      <StatusPill status={c.status} />
                    </div>
                    <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums truncate">
                      {c.schemeLabel} · {c.procedureCode}
                      {c.autoDrafted && (
                        <span className="ml-1.5 inline-flex items-center text-[8px] uppercase tracking-[0.08em] rounded-full border border-[var(--color-border)] bg-white px-1.5 py-0.5 text-[var(--color-text-soft)]">
                          auto-drafted
                        </span>
                      )}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-[11px] text-[var(--color-text-soft)]">
              No claims in this view.
            </li>
          )}
        </ul>

        <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 grid gap-3 content-start min-h-[320px]">
          {selected ? (
            <>
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
                  Claim detail
                </p>
                <p className="mt-1 text-[14px] font-semibold text-[var(--color-text)]">
                  {selected.patientName}
                </p>
                <p className="text-[12px] text-[var(--color-text-muted)]">{selected.procedure}</p>
              </div>

              <dl className="grid gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
                <DetailRow label="Scheme" value={selected.schemeLabel} />
                <DetailRow label="Code" value={selected.procedureCode} />
                <DetailRow label="Claim" value={fmtSgd(selected.amountSgd)} />
                {selected.amountApprovedSgd !== undefined && (
                  <DetailRow
                    label={selected.status === "paid" ? "Paid" : "Approved"}
                    value={fmtSgd(selected.amountApprovedSgd)}
                    emphasis
                  />
                )}
                {selected.submittedAgo && (
                  <DetailRow label="Submitted" value={selected.submittedAgo} />
                )}
              </dl>

              {selected.status === "rejected" && selected.rejectionReason && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-[var(--radius-md)] border border-[oklch(0.62_0.18_25/0.4)] bg-[oklch(0.62_0.18_25/0.06)] p-3 grid gap-2"
                >
                  <p className="text-[11px] text-[var(--color-text)] leading-snug">
                    <span className="inline-flex items-center gap-1 font-semibold text-[oklch(0.45_0.18_25)]">
                      <AlertTriangle className="h-3 w-3" aria-hidden /> Rejected.
                    </span>{" "}
                    {selected.rejectionReason}
                  </p>
                  {selected.rejectionFixHint && (
                    <p className="text-[11px] text-[var(--color-text-muted)] leading-snug">
                      {selected.rejectionFixHint}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => resubmitClaim(selected.id)}
                    className="inline-flex items-center gap-1.5 self-start rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[var(--color-text)] hover:border-[var(--color-ink)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden />
                    Refresh from SingPass & resubmit
                  </button>
                </motion.div>
              )}

              {selected.status === "drafted" && (
                <button
                  type="button"
                  onClick={() => submitClaim(selected.id)}
                  className="inline-flex items-center justify-center gap-1.5 self-start rounded-[var(--radius-md)] bg-[var(--color-ink)] px-3 py-2 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  Submit to {selected.schemeLabel.split(" ")[0]}{" "}
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </button>
              )}

              {selected.status === "submitted" && (
                <p className="text-[11px] text-[var(--color-text-muted)] leading-snug">
                  Awaiting decision. Most claims clear in 24–72 hours; we&apos;ll notify the front
                  desk when the status changes.
                </p>
              )}

              {selected.status === "approved" && (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-tide-deep)]">
                  <Check className="h-3 w-3" aria-hidden /> Approved · awaiting payment from scheme.
                </p>
              )}

              {selected.status === "paid" && (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-tide-deep)]">
                  <Check className="h-3 w-3" aria-hidden /> Paid. Reconciled in end-of-day.
                </p>
              )}
            </>
          ) : (
            <p className="text-[12px] text-[var(--color-text-muted)]">
              Click a claim to see scheme detail and actions.
            </p>
          )}
        </aside>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
          Procedure completed → claim auto-packaged → submitted in one click → status flows back.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Reset queue
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your claims queue → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Singapore claims first — MediSave, CHAS, IPP. Primary US payers next on the integrations
          roadmap.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "neutral" | "positive" | "warning";
}) {
  const toneClass =
    tone === "positive"
      ? "text-[var(--color-tide-deep)]"
      : tone === "warning"
        ? "text-[oklch(0.55_0.18_25)]"
        : "text-[var(--color-text)]";
  return (
    <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 grid gap-1">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
        {label}
      </p>
      <p className={`text-[18px] font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </li>
  );
}

function DetailRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-2 items-baseline">
      <dt className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
        {label}
      </dt>
      <dd
        className={`text-[12px] tabular-nums ${
          emphasis ? "font-semibold text-[var(--color-tide-deep)]" : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function StatusPill({ status }: { status: ClaimStatus }) {
  const map: Record<ClaimStatus, { bg: string; fg: string; border: string }> = {
    drafted: {
      bg: "bg-[var(--color-canvas-tinted)]",
      fg: "text-[var(--color-text-muted)]",
      border: "border-[var(--color-border)]",
    },
    submitted: {
      bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
      fg: "text-[var(--color-tide-deep)]",
      border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
    },
    approved: {
      bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_82%)]",
      fg: "text-[var(--color-tide-deep)]",
      border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
    },
    rejected: {
      bg: "bg-[oklch(0.62_0.18_25/0.08)]",
      fg: "text-[oklch(0.45_0.18_25)]",
      border: "border-[oklch(0.62_0.18_25/0.4)]",
    },
    paid: {
      bg: "bg-[var(--color-ink)]",
      fg: "text-[var(--color-canvas)]",
      border: "border-[var(--color-ink)]",
    },
  };
  const t = map[status];
  return (
    <span
      className={`inline-flex items-center text-[9px] uppercase tracking-[0.08em] rounded-full border px-1.5 py-0.5 whitespace-nowrap ${t.bg} ${t.fg} ${t.border}`}
    >
      {statusLabel(status)}
    </span>
  );
}
