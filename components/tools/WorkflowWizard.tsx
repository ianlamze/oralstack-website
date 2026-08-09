"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
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
    id: "run-the-day",
    question: "Queues and calendars split the clinic day",
    resultLead: "Run appointments, requests and chair gaps from one daily workspace.",
    body: "My day, Command, Appointments, Inbox, Requests and Huddle give the team a shared operating view. Appointment changes still follow the clinic's Plato workflow.",
    primaryHref: "/workflows#run-the-day",
    primaryLabel: "See run the day",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Walkthrough%3A%20run%20the%20clinic%20day&body=Show%20us%20how%20appointments%2C%20requests%2C%20huddle%20and%20chair%20work%20fit%20together%20with%20Plato.",
    secondaryLabel: "Book a run-the-day walkthrough",
  },
  {
    id: "patient-care",
    question: "Patient context is scattered",
    resultLead: "Open the patient folder from reception or chairside.",
    body: "Review case notes, the tooth chart, treatment plans and perio work together. Imported casenote findings remain drafts until a clinician reviews them.",
    primaryHref: "/workflows#patient-care",
    primaryLabel: "See patient care",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Walkthrough%3A%20patient%20care&body=Show%20us%20the%20patient%20folder%2C%20chairside%20charting%2C%20treatment%20plans%20and%20perio%20review.",
    secondaryLabel: "Book a patient-care walkthrough",
  },
  {
    id: "checkout-money",
    question: "Checkout handoffs stall at the desk",
    resultLead: "Stage checkout, estimates, receipts and follow-up in one reviewed flow.",
    body: "Plato remains the official ledger. Oralstack organizes billing tasks and queues reviewed invoice writebacks without silently posting claims or payments.",
    primaryHref: "/workflows#checkout-money",
    primaryLabel: "See checkout & money",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Walkthrough%3A%20checkout%20and%20money&body=Show%20us%20checkout%2C%20billing%20follow-up%20and%20reviewed%20Plato%20writebacks.",
    secondaryLabel: "Book a checkout walkthrough",
  },
  {
    id: "patient-access",
    question: "Patient requests arrive through different channels",
    resultLead: "Bring intake, portal requests, and secure messages into staff review.",
    body: "The intake portal, patient portal, first-party messaging, and find-a-time requests keep staff in control. A requested time is not an automatic Plato booking.",
    primaryHref: "/workflows#patient-access",
    primaryLabel: "See patient access",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Walkthrough%3A%20patient%20access&body=Show%20us%20how%20booking%2C%20intake%20and%20portal%20requests%20are%20triaged%20by%20staff.",
    secondaryLabel: "Book a patient-access walkthrough",
  },
  {
    id: "clinic-operations",
    question: "Stock, lab and staff work live in separate trackers",
    resultLead: "Bring clinic operations into the same workspace.",
    body: "Managers can review inventory, estimated material usage, lab invoices, suppliers, staff time, payroll preparation and commissions.",
    primaryHref: "/workflows#clinic-operations",
    primaryLabel: "See clinic operations",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Walkthrough%3A%20clinic%20operations&body=Show%20us%20inventory%2C%20lab%2C%20supplier%20and%20staff%20operations.",
    secondaryLabel: "Book an operations walkthrough",
  },
  {
    id: "insights",
    question: "Managers assemble the daily picture by hand",
    resultLead: "Use Huddle, Insights and reports as one operating view.",
    body: "See chair gaps, production, collection, receivables and provider performance from available clinic data. Derived measures stay labelled when Plato data is incomplete.",
    primaryHref: "/workflows#insights",
    primaryLabel: "See clinic insights",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Walkthrough%3A%20clinic%20insights&body=Show%20us%20the%20daily%20huddle%2C%20reports%20and%20provider%20performance%20views.",
    secondaryLabel: "Book an insights walkthrough",
  },
  {
    id: "organization-security",
    question: "Access and sync health are hard to audit",
    resultLead: "Manage people, roles, settings, sync and audit together.",
    body: "Role-aware controls show who can act, which clinic is active, and what is waiting for reviewed writeback.",
    primaryHref: "/workflows#organization-security",
    primaryLabel: "See organization & security",
    secondaryHref:
      "mailto:hello@oralstack.com?subject=Walkthrough%3A%20organization%20and%20security&body=Show%20us%20roles%2C%20clinic%20access%2C%20settings%2C%20sync%20health%20and%20audit%20history.",
    secondaryLabel: "Book a security walkthrough",
  },
];

export default function WorkflowWizard() {
  const [picked, setPicked] = useState<string | null>(null);
  const result = picked ? pains.find((p) => p.id === picked) : null;

  return (
    <Section className="border-y border-[var(--color-line)] bg-[var(--color-surface-raised)] py-20 md:py-24">
      <div className="grid gap-3 mb-8 max-w-[760px]">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Choose a product area
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Where should Oralstack meet your team first?
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
          Pick the clinic job creating the most handoffs. We&apos;ll show the current workspace, the
          Plato boundary and the rollout path for your clinic.
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
                  ? "border-[var(--color-tide)] bg-[var(--color-canvas-tinted)] shadow-[var(--shadow-1)]"
                  : "card-hover border-[var(--color-border)] bg-[var(--color-surface-raised)]"
              }`}
            >
              <span className="text-[14px] font-semibold text-[var(--color-text)] leading-snug">
                {p.question}
              </span>
              <span
                className={`shrink-0 text-[var(--color-tide-deep)] ${isPicked ? "" : "card-arrow"}`}
              >
                {isPicked ? (
                  <Check className="size-4" aria-hidden />
                ) : (
                  <ArrowRight className="size-4" aria-hidden />
                )}
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-tide)] bg-[var(--color-surface-raised)] p-6 shadow-[var(--shadow-2)] md:p-8"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                Suggested product area
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
                  <ArrowRight className="ml-2 size-4" aria-hidden />
                </a>
                <a
                  href={result.secondaryHref}
                  className="text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
                >
                  {result.secondaryLabel}
                  <ArrowRight className="ml-1 inline size-3.5" aria-hidden />
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Section>
  );
}
