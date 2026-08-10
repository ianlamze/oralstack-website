import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "The patient journey",
  description:
    "How Oralstack supports the clinic day — preparation, reception, chairside care, checkout, and patient follow-up in one guided setup.",
  alternates: { canonical: "/journey" },
};

const stages = [
  {
    step: "01",
    title: "Prepare the day",
    body: "My Day, Command, Requests, and the Daily huddle bring appointments, chair gaps, and follow-up work into one staff workspace.",
  },
  {
    step: "02",
    title: "Receive the patient",
    body: "Reception moves patients from intake review and arrival through the queue, chair hand-off, and checkout without losing the day view.",
  },
  {
    step: "03",
    title: "Work from one patient folder",
    body: "Clinical charting, full-mouth perio, notes, plans, prescriptions, clinical media, letters, diagnoses, and audit history sit beside visits and billing context.",
  },
  {
    step: "04",
    title: "Review and close checkout",
    body: "Staff review billable lines and payer portions, record payment, issue receipts, and manage the checkout queue inside the clinic's configured record boundary.",
  },
  {
    step: "05",
    title: "Keep the patient connected",
    body: "The intake portal, patient portal, staff-approved find-a-time requests, and first-party secure messaging keep the next action visible to both sides.",
  },
];

export default function JourneyPage() {
  return (
    <main>
      <PageHeader eyebrow="Clinic journey" title="One view of the clinic day." />

      <Section className="pb-12">
        <p className="max-w-[60ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack brings reception, chairside care, checkout, patient access, and management into
          one browser-based clinic system. A guided standalone pilot is the default path; clinics
          can keep Plato connected through separately reviewed paths when needed.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ol className="grid gap-4 lg:grid-cols-5">
          {stages.map((stage) => (
            <li
              key={stage.step}
              className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 shadow-[var(--shadow-1)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold tabular-nums text-[var(--color-tide-deep)]">
                  {stage.step}
                </span>
                <CheckCircle2 className="size-4 text-[var(--color-success)]" aria-hidden />
              </div>
              <h2 className="mt-6 text-lg font-semibold tracking-tight text-[var(--color-text)]">
                {stage.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/workflows"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
          >
            See every product area <ArrowRight className="size-4" aria-hidden />
          </a>
          <p className="max-w-[48ch] text-xs leading-relaxed text-[var(--color-text-soft)]">
            Public self-booking, automated messaging, DICOM/device integrations, and AI-assisted
            clinical workflows are controlled rollouts—not presented here as generally available.
          </p>
        </div>
      </Section>
    </main>
  );
}
