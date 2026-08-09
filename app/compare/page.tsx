import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import CompareBuilder from "@/components/tools/CompareBuilder";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "Evaluate Oralstack's current Plato-connected scope against the requirements of your clinic.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <main>
      <PageHeader eyebrow="Evaluate" title="Start with the product boundary." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack is currently a Plato-connected operating and clinical workflow layer—not a
          standalone PMS replacement. Use this table to compare the current Oralstack scope with
          your requirements, then verify every other vendor&apos;s current product and commercial
          terms directly.
        </p>
      </Section>

      <Section className="pb-16 md:pb-20">
        <div className="grid gap-3 mb-6 max-w-[760px]">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Compare builder
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Pick what matters. We&apos;ll show the current boundary.
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
            Tick the capabilities you care about and the vendors you&apos;re weighing. Oralstack
            cells describe the current app; vendor cells intentionally point you back to current
            vendor documentation instead of repeating stale comparison claims.
          </p>
        </div>
        <CompareBuilder />
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="max-w-[820px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-text-soft)]">
            Before procurement
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Ask for a dated, written scope.
          </h2>
          <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
            Confirm which Oralstack modules and clinic connections are enabled, which actions are
            reviewed before Plato writeback, and which pilots are excluded. Public booking,
            automated messaging, DICOM/device integrations, external AI, and integrated claims or
            payments should not be assumed from a prototype or an older comparison page.
          </p>
          <a
            href="/workflows"
            className="mt-5 inline-flex text-sm font-semibold text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            Review the current product scope →
          </a>
        </div>
      </Section>
    </main>
  );
}
