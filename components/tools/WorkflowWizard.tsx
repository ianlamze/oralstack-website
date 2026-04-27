"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Section from "@/components/primitives/Section";
import { track } from "@/lib/analytics";

type Pain = {
  id: string;
  question: string;
  resultLead: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

const pains: Pain[] = [
  {
    id: "schedule",
    question: "Reschedules eat the morning",
    resultLead: "Drag-to-reschedule replaces the open-edit-save loop.",
    body: "A 3-second drag from 10:00 to 14:00 commits timezone-correct on reload. Provider columns render dynamically as you add chairs. The schedule mock on the homepage is the live behaviour — try it.",
    primaryHref: "/workflows#scheduling",
    primaryLabel: "See the scheduling workflow →",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Demo%3A%20scheduling%20workflow&body=We%27re%20losing%20time%20on%20rescheduling.%20Can%20we%20see%20the%20schedule%20on%20our%20own%20data%3F",
    secondaryLabel: "Book a scheduling-focused demo",
  },
  {
    id: "billing",
    question: "Bills reconcile at end-of-day",
    resultLead: "Discharge-flow billing closes the loop while the patient is still at the chair.",
    body: "Treatment lines pull from the chart automatically; insurance and patient portion stay structurally separate. DFI Synergy moved their same-day-billing rate from 60% → 85% in four weeks.",
    primaryHref: "/workflows#billing",
    primaryLabel: "See the billing workflow →",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Demo%3A%20discharge-flow%20billing&body=We%27re%20stuck%20on%20end-of-day%20reconciliation.%20Show%20us%20how%20discharge-flow%20billing%20works.",
    secondaryLabel: "Book a billing-focused demo",
  },
  {
    id: "charting",
    question: "Notes scattered across tabs",
    resultLead: "Tooth-led charting with surface-specific notes (M/D/B/L/O).",
    body: "FDI numbering, per-procedure templates editable per visit, treatment plans that write back to billing automatically. One canonical view of the patient.",
    primaryHref: "/workflows#charting",
    primaryLabel: "See the charting workflow →",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Demo%3A%20charting&body=Show%20us%20the%20tooth-led%20charting%20on%20a%20representative%20patient.",
    secondaryLabel: "Book a charting-focused demo",
  },
  {
    id: "recall",
    question: "Recall list slips through the cracks",
    resultLead: "Recall candidates surface 3 weeks before due, sorted by recall age.",
    body: "WhatsApp Business API templated messaging, audit-logged. The recall queue on the case study page is the live behaviour — sortable, click to send.",
    primaryHref: "/workflows#recall",
    primaryLabel: "See the recall workflow →",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Demo%3A%20recall%20+%20WhatsApp&body=Recall%20outreach%20is%20manual%20today.%20How%20does%20yours%20compare%3F",
    secondaryLabel: "Book a recall-focused demo",
  },
  {
    id: "imaging",
    question: "Imaging trapped in vendor desktop apps",
    resultLead: "DICOM viewer inside the patient chart, sensor-bridge across vendors.",
    body: "Carestream, Dexis, Sopro, Schick — equal-footing integration, no per-brand desktop app. v13 cohort opens for imaging this quarter.",
    primaryHref: "/workflows#imaging",
    primaryLabel: "See the imaging workflow →",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Demo%3A%20DICOM%20in%20chart&body=Our%20imaging%20lives%20in%20a%20separate%20desktop%20app.%20Show%20us%20DICOM%20in%20the%20chart.",
    secondaryLabel: "Book an imaging-focused demo",
  },
  {
    id: "multi-clinic",
    question: "Multiple locations, no single view",
    resultLead: "Tenant-isolated SaaS, all locations under one login.",
    body: "Row-level data separation per clinic. Multi-clinic owners see consolidated revenue and schedule across locations at flat $200/clinic/month.",
    primaryHref: "/for-multi-clinic",
    primaryLabel: "See the multi-clinic page →",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Demo%3A%20multi-clinic%20rollout&body=We%20run%20%5BN%5D%20locations.%20Show%20us%20the%20multi-clinic%20rollout.",
    secondaryLabel: "Book a multi-clinic walkthrough",
  },
];

export default function WorkflowWizard() {
  const [picked, setPicked] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const result = picked ? pains.find((p) => p.id === picked) : null;

  return (
    <Section className="py-20 md:py-24">
      <div className="grid gap-3 mb-8 max-w-[760px]">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Find your starting point
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          What hurts most right now?
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
          Pick the one that costs your front desk the most time this week. We&apos;ll point at the
          workflow that fixes it and a demo scoped to that conversation.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-[1080px]">
        {pains.map((p) => {
          const isPicked = picked === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPicked(p.id);
                track("wizard_pain_picked", { pain: p.id });
              }}
              aria-pressed={isPicked}
              className={`flex items-center justify-between gap-3 text-left rounded-[var(--radius-lg)] border px-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                isPicked
                  ? "border-[var(--color-ink)] bg-[var(--color-canvas-tinted)]"
                  : "card-hover border-[var(--color-border)] bg-white"
              }`}
            >
              <span className="text-[14px] font-semibold text-[var(--color-text)] leading-snug">
                {p.question}
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-[15px] leading-none text-[var(--color-tide-deep)] ${
                  isPicked ? "" : "card-arrow"
                }`}
              >
                {isPicked ? "✓" : "→"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid mt-6 max-w-[1080px]">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key={result.id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-8"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                Suggested next step
              </p>
              <p className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-[var(--color-text)] max-w-[60ch]">
                {result.resultLead}
              </p>
              <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
                {result.body}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={result.primaryHref}
                  className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
                >
                  {result.primaryLabel}
                </a>
                <a
                  href={result.secondaryHref}
                  className="text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
                >
                  {result.secondaryLabel} →
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Section>
  );
}
