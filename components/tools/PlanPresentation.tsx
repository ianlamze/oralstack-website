"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, PenLine, RotateCcw } from "lucide-react";
import { conversion, initialPhases, planContext } from "@/content/plan-presentation/data";
import type { PlanPhase, PlanPriority } from "@/content/plan-presentation/types";
import { track } from "@/lib/analytics";

type PhaseState = PlanPhase & { accepted: boolean };

const PRIORITY_LABEL: Record<PlanPriority, string> = {
  urgent: "Urgent",
  health: "Health-restoring",
  cosmetic: "Optional",
};

function fmtSgd(n: number) {
  return `SGD ${n.toLocaleString("en-SG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function buildInitial(): PhaseState[] {
  return initialPhases.map((p) => ({ ...p, accepted: p.acceptedByDefault }));
}

export default function PlanPresentation() {
  const [phases, setPhases] = useState<PhaseState[]>(() => buildInitial());
  const [signed, setSigned] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const reduceMotion = useReducedMotion();

  const totals = useMemo(() => {
    const acceptedPhases = phases.filter((p) => p.accepted);
    const procedures = acceptedPhases.flatMap((p) => p.procedures);
    const subtotal = procedures.reduce((sum, p) => sum + p.unitPriceSgd * p.qty, 0);
    const insurance = procedures.reduce((sum, p) => sum + p.insuranceSgd, 0);
    return { subtotal, insurance, patient: subtotal - insurance };
  }, [phases]);

  const anyAccepted = phases.some((p) => p.accepted);

  function togglePhase(id: string) {
    setPhases((prev) => prev.map((p) => (p.id === id ? { ...p, accepted: !p.accepted } : p)));
    track("plan_phase_toggled", { phase_id: id });
  }

  function sign() {
    setSigned(true);
    track("plan_signed");
  }

  function clearSignature() {
    setSigned(false);
  }

  function acceptPlan() {
    if (!signed || !anyAccepted) return;
    setAccepted(true);
    track("plan_accepted", {
      phases_accepted: phases.filter((p) => p.accepted).length,
      patient_portion: totals.patient,
    });
  }

  function reset() {
    setPhases(buildInitial());
    setSigned(false);
    setAccepted(false);
    track("plan_reset");
  }

  const acceptedToday = conversion.acceptedToday + (accepted ? 1 : 0);

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Plan presentation · iPad at the chair</span>
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
          DFI Synergy · Dr Wong
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3 mb-5">
        <Stat label="Plans presented · this week" value={`${conversion.presentedThisWeek}`} />
        <Stat label="Accepted today" value={`${acceptedToday}`} tone="positive" />
        <Stat
          label="Acceptance rate · 90 days"
          value={`${conversion.acceptanceRate90d}%`}
          tone="positive"
        />
      </ul>

      <div className="relative rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 sm:p-6 md:p-7">
        <div className="mx-auto max-w-[680px] grid gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
              Treatment plan · {planContext.presentedAt}
            </p>
            <p className="mt-2 text-[20px] sm:text-[22px] font-semibold tracking-tight text-[var(--color-text)]">
              {planContext.greeting}
            </p>
            <p className="mt-1.5 text-[12px] text-[var(--color-text-muted)]">
              Presented by {planContext.presentedBy} · coverage estimated against{" "}
              {planContext.insuranceLabel}
            </p>
          </div>

          <ul className="grid gap-3">
            {phases.map((p) => (
              <PhaseCard key={p.id} phase={p} onToggle={() => togglePhase(p.id)} />
            ))}
          </ul>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4 grid gap-2">
            <SummaryRow label="Subtotal" value={fmtSgd(totals.subtotal)} />
            <SummaryRow
              label={`Estimated coverage · ${planContext.insuranceLabel.split(" · ")[0]}`}
              value={`− ${fmtSgd(totals.insurance)}`}
              tone="positive"
            />
            <div className="border-t border-[var(--color-border)] pt-2 mt-1">
              <SummaryRow label="Your portion" value={fmtSgd(totals.patient)} emphasis />
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4 grid gap-2">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[var(--color-text-soft)]">
                Sign here
              </p>
              {signed && (
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-[10px] text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={signed ? clearSignature : sign}
              aria-label={signed ? "Clear signature" : "Sign here"}
              className={`relative grid place-items-center min-h-[88px] rounded-[var(--radius-md)] border-2 border-dashed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                signed
                  ? "border-[var(--color-tide-deep)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)]"
                  : "border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] hover:border-[var(--color-ink)]"
              }`}
            >
              {signed ? (
                <SignatureMark name={planContext.patientName} />
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
                  <PenLine className="h-3.5 w-3.5" aria-hidden /> Tap to sign
                </span>
              )}
            </button>
            <p className="text-[10px] text-[var(--color-text-soft)]">
              By signing, you acknowledge the phases checked above and the estimated portion. Final
              coverage confirmed by the scheme on submission.
            </p>
          </div>

          <button
            type="button"
            onClick={acceptPlan}
            disabled={!signed || !anyAccepted || accepted}
            className="inline-flex items-center justify-center min-h-[48px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
          >
            Accept plan · {fmtSgd(totals.patient)}
          </button>
        </div>

        <AnimatePresence>
          {accepted && (
            <motion.div
              key="accepted-overlay"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 grid place-items-center rounded-[var(--radius-lg)] bg-[oklch(0.99_0.005_240/0.92)] backdrop-blur-sm p-5"
            >
              <motion.div
                initial={reduceMotion ? false : { y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.22 }}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 max-w-[440px] w-full text-center grid gap-3"
              >
                <span className="justify-self-center grid place-items-center h-10 w-10 rounded-full bg-[color-mix(in_oklch,var(--color-tide-deep),white_82%)] text-[var(--color-tide-deep)]">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-[16px] font-semibold text-[var(--color-text)]">Plan accepted.</p>
                <p className="text-[12px] text-[var(--color-text-muted)] leading-relaxed">
                  Signed copy emailed to {planContext.patientName.split(" ")[0]} · audit entry
                  written to the chart · phases queued in the schedule.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="justify-self-center inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-3 py-1.5 text-[11px] font-medium text-[var(--color-text)] hover:border-[var(--color-ink)] transition-colors"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden /> Run again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
          Phase toggle → portion updates live → patient signs → clinic notified → chart audited.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Reset
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your iPad → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Built from the same treatment plan the clinician assembles — no second source of truth.
          Coverage estimate uses the eligibility tool already in the chart.
        </p>
      </div>
    </div>
  );
}

function PhaseCard({ phase, onToggle }: { phase: PhaseState; onToggle: () => void }) {
  const subtotal = phase.procedures.reduce((sum, p) => sum + p.unitPriceSgd * p.qty, 0);
  const insurance = phase.procedures.reduce((sum, p) => sum + p.insuranceSgd, 0);
  const patient = subtotal - insurance;

  return (
    <li
      className={`rounded-[var(--radius-md)] border bg-white p-4 transition-colors ${
        phase.accepted ? "border-[var(--color-ink)]" : "border-[var(--color-border)] opacity-70"
      }`}
    >
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={phase.accepted}
          onChange={onToggle}
          className="mt-1 h-4 w-4 rounded border-[var(--color-border-strong)] text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
        />
        <span className="grid gap-2 flex-1 min-w-0">
          <span className="flex items-baseline justify-between gap-3 flex-wrap">
            <span className="grid gap-0.5">
              <span className="inline-flex items-center gap-2">
                <span className="text-[14px] font-semibold text-[var(--color-text)]">
                  {phase.name}
                </span>
                <PriorityPill priority={phase.priority} />
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                {phase.description}
              </span>
            </span>
          </span>

          <ul className="grid gap-1 text-[12px]">
            {phase.procedures.map((p) => (
              <li
                key={`${phase.id}-${p.code}`}
                className="grid grid-cols-[1fr_auto] gap-3 items-baseline border-b border-[var(--color-border)] last:border-b-0 pb-1.5 last:pb-0"
              >
                <span className="grid gap-0.5 min-w-0">
                  <span className="text-[var(--color-text)] truncate">
                    {p.label}
                    {p.toothLabel && (
                      <span className="text-[var(--color-text-muted)]"> · {p.toothLabel}</span>
                    )}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
                    {p.code} · {p.qty}× {fmtSgd(p.unitPriceSgd)}
                  </span>
                </span>
                <span className="text-right tabular-nums">
                  <span className="block text-[var(--color-text)] font-semibold">
                    {fmtSgd(p.unitPriceSgd * p.qty)}
                  </span>
                  {p.insuranceSgd > 0 && (
                    <span className="block text-[10px] text-[var(--color-tide-deep)]">
                      − {fmtSgd(p.insuranceSgd)} covered
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <span className="grid grid-cols-[1fr_auto] gap-3 items-baseline pt-1 border-t border-[var(--color-border)]">
            <span className="text-[11px] text-[var(--color-text-muted)]">Phase portion</span>
            <span className="text-[13px] font-semibold tabular-nums text-[var(--color-text)]">
              {fmtSgd(patient)}
            </span>
          </span>
        </span>
      </label>
    </li>
  );
}

function PriorityPill({ priority }: { priority: PlanPriority }) {
  const tone =
    priority === "urgent"
      ? {
          bg: "bg-[oklch(0.62_0.18_25/0.08)]",
          fg: "text-[oklch(0.45_0.18_25)]",
          border: "border-[oklch(0.62_0.18_25/0.4)]",
        }
      : priority === "health"
        ? {
            bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
            fg: "text-[var(--color-tide-deep)]",
            border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
          }
        : {
            bg: "bg-[var(--color-canvas-tinted)]",
            fg: "text-[var(--color-text-muted)]",
            border: "border-[var(--color-border)]",
          };
  return (
    <span
      className={`inline-flex items-center text-[9px] uppercase tracking-[0.08em] rounded-full border px-1.5 py-0.5 whitespace-nowrap ${tone.bg} ${tone.fg} ${tone.border}`}
    >
      {PRIORITY_LABEL[priority]}
    </span>
  );
}

function SummaryRow({
  label,
  value,
  tone,
  emphasis,
}: {
  label: string;
  value: string;
  tone?: "positive";
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span
        className={`text-[12px] ${
          emphasis ? "font-semibold text-[var(--color-text)]" : "text-[var(--color-text-muted)]"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-[14px] tabular-nums ${
          emphasis
            ? "font-semibold text-[var(--color-text)]"
            : tone === "positive"
              ? "text-[var(--color-tide-deep)]"
              : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function SignatureMark({ name }: { name: string }) {
  // Simple stylised signature glyph — purely decorative. Real product uses
  // a touch / pointer canvas; this mock just communicates "signed".
  return (
    <div className="grid place-items-center gap-1.5 px-4 py-1.5">
      <svg
        viewBox="0 0 240 56"
        role="img"
        aria-label="Signature"
        className="h-9 w-auto text-[var(--color-tide-deep)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Signature</title>
        <path d="M8 38 C 24 14, 36 6, 50 24 S 70 50, 92 30 T 132 28 S 170 16, 196 32 S 220 22, 232 30" />
        <path d="M186 12 L 200 8" opacity="0.6" />
      </svg>
      <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">{name} · just now</p>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "positive" }) {
  return (
    <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 grid gap-1">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
        {label}
      </p>
      <p
        className={`text-[18px] font-semibold tabular-nums ${
          tone === "positive" ? "text-[var(--color-tide-deep)]" : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </p>
    </li>
  );
}
