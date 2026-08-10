"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Layers3 } from "lucide-react";
import Section from "@/components/primitives/Section";
import { capabilityAvailabilityLabels, productCapabilities } from "@/content/product-capabilities";
import { track } from "@/lib/analytics";

type Pain = {
  id: string;
  question: string;
  resultLead: string;
  body: string;
};

const pains: Pain[] = [
  {
    id: "run-the-day",
    question: "Queues and calendars split the clinic day",
    resultLead: "Run appointments, requests and chair gaps from one daily workspace.",
    body: "My day, Command, Appointments, Inbox, Requests and Huddle give the team a shared operating view. Schedule paths are enabled only after guided clinic setup; Plato is an optional connection.",
  },
  {
    id: "patient-care",
    question: "Patient context is scattered",
    resultLead: "Open the patient folder from reception or chairside.",
    body: "Review case notes, the tooth chart, treatment plans and perio work together. Imported casenote findings remain drafts until a clinician reviews them.",
  },
  {
    id: "checkout-money",
    question: "Checkout handoffs stall at the desk",
    resultLead: "Stage checkout, estimates, receipts and follow-up in one reviewed flow.",
    body: "Oralstack keeps billing tasks, payer portions, manual payment records and receipt work together. Direct payment processing and electronic claims are not enabled.",
  },
  {
    id: "patient-access",
    question: "Patient requests arrive through different channels",
    resultLead: "Bring intake, portal requests, and secure messages into staff review.",
    body: "The intake portal, patient portal, first-party messaging, and find-a-time requests keep staff in control. A requested time is not an automatic booking.",
  },
  {
    id: "clinic-operations",
    question: "Stock, lab and staff work live in separate trackers",
    resultLead: "Bring clinic operations into the same workspace.",
    body: "Managers can review inventory, estimated material usage, lab invoices, suppliers, staff time, payroll preparation and commissions.",
  },
  {
    id: "insights",
    question: "Managers assemble the daily picture by hand",
    resultLead: "Use Huddle, Insights and reports as one operating view.",
    body: "See chair gaps, production, collection, receivables and provider performance from available clinic data. Derived measures stay labelled when the underlying record is incomplete.",
  },
  {
    id: "organization-security",
    question: "Access and sync health are hard to audit",
    resultLead: "Manage people, roles, settings, sync and audit together.",
    body: "Role-aware controls show who can act, which clinic is active, and whether a record is native to Oralstack or waiting on a configured connection.",
  },
];

export default function WorkflowWizard() {
  const [picked, setPicked] = useState(pains[0].id);
  const result = pains.find((p) => p.id === picked) ?? pains[0];
  const capability =
    productCapabilities.find((item) => item.slug === result.id) ?? productCapabilities[0];
  const pickedIndex = Math.max(
    0,
    pains.findIndex((pain) => pain.id === picked),
  );

  function pickPain(id: string) {
    setPicked(id);
    track("wizard_pain_picked", { pain: id });
  }

  return (
    <Section
      id="workflow-explorer"
      className="border-y border-[var(--color-line)] bg-[var(--color-surface-raised)] py-20 md:py-24"
    >
      <div className="grid max-w-[760px] gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Explore the clinic workspace
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Start with the handoff creating the most friction.
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
          Choose one clinic job. We&apos;ll keep the current app scope, record ownership, rollout
          state, and a focused walkthrough path together.
        </p>
      </div>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.6fr)] lg:gap-8">
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-4 shadow-[var(--shadow-1)] lg:hidden"
          data-testid="workflow-explorer-chooser"
        >
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="workflow-explorer-select"
              className="text-xs font-semibold text-[var(--color-text)]"
            >
              Choose a clinic workflow
            </label>
            <span
              className="shrink-0 text-xs font-medium tabular-nums text-[var(--color-tide-deep)]"
              aria-live="polite"
            >
              {pickedIndex + 1} of {pains.length}
            </span>
          </div>
          <div className="relative mt-2">
            <select
              id="workflow-explorer-select"
              value={picked}
              onChange={(event) => pickPain(event.target.value)}
              className="min-h-[48px] w-full appearance-none rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] py-3 pl-4 pr-11 text-sm font-semibold text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2"
            >
              {pains.map((pain, index) => {
                const optionCapability =
                  productCapabilities.find((item) => item.slug === pain.id) ??
                  productCapabilities[index];
                return (
                  <option key={pain.id} value={pain.id}>
                    {String(index + 1).padStart(2, "0")} ·{" "}
                    {optionCapability.eyebrow.replace(" and ", " & ")}
                  </option>
                );
              })}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-tide-deep)]"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {result.question}
          </p>
        </div>

        <fieldset className="hidden border-0 lg:grid lg:gap-2">
          <legend className="sr-only">Clinic workflow areas</legend>
          {pains.map((pain, index) => {
            const isPicked = picked === pain.id;
            return (
              <button
                key={pain.id}
                type="button"
                onClick={() => pickPain(pain.id)}
                aria-pressed={isPicked}
                aria-controls="workflow-recommendation"
                className={`flex min-h-[58px] w-full items-center justify-between gap-3 rounded-[var(--radius-lg)] border px-4 py-3 text-left transition-[border-color,background-color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                  isPicked
                    ? "border-[var(--color-tide)] bg-[var(--color-canvas-tinted)] shadow-[var(--shadow-1)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface-raised)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span className="pt-0.5 text-[10px] font-semibold tabular-nums text-[var(--color-text-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-semibold leading-snug text-[var(--color-text)]">
                    {pain.question}
                  </span>
                </span>
                <span className="shrink-0 text-[var(--color-tide-deep)]">
                  {isPicked ? (
                    <Check className="size-4" aria-hidden />
                  ) : (
                    <ArrowRight className="size-4" aria-hidden />
                  )}
                </span>
              </button>
            );
          })}
        </fieldset>

        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={result.id}
              id="workflow-recommendation"
              aria-live="polite"
              aria-atomic="true"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-tide)] bg-[var(--color-canvas)] p-6 shadow-[var(--shadow-2)] md:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                  Recommended starting point
                </p>
                <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-tide-deep)]">
                  {capabilityAvailabilityLabels[capability.availability]}
                </span>
              </div>
              <p className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-[var(--color-text)] max-w-[60ch]">
                {result.resultLead}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`/book-a-demo?focus=${result.id}`}
                  className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
                >
                  Request a focused walkthrough
                  <ArrowRight className="ml-2 size-4" aria-hidden />
                </a>
                <a
                  href={`/workflows#${result.id}`}
                  className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]"
                >
                  See current scope
                </a>
              </div>

              <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
                {result.body}
              </p>

              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {capability.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature.title}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4"
                  >
                    <p className="text-xs font-semibold leading-snug text-[var(--color-text)]">
                      {feature.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-muted)]">
                      {feature.description}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3 rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                <Layers3
                  className="mt-0.5 size-4 shrink-0 text-[var(--color-tide-deep)]"
                  aria-hidden
                />
                <p>
                  <span className="font-medium text-[var(--color-text)]">Keeps together: </span>
                  {capability.keepsTogether}.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-8 text-sm text-[var(--color-text-muted)]">
        Need the full map?{" "}
        <a
          href={`/workflows#${result.id}`}
          className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
        >
          Compare all seven workflows →
        </a>
      </p>
    </Section>
  );
}
