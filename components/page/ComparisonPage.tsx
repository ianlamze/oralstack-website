import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import type { Comparison } from "@/content/comparisons/types";

type ComparisonPageProps = {
  data: Comparison;
};

const currentBoundary = [
  "Oralstack currently extends Plato through reviewed clinic workflows; it is not positioned as a standalone PMS replacement.",
  "Appointments, reception, patient folders, clinical work, reviewed checkout, patient access, clinic operations, insights, and organization controls make up the current product story.",
  "Public self-booking, automated messaging, DICOM/device integrations, external AI, and integrated claims or payments must not be inferred from an older prototype or comparison.",
];

export default function ComparisonPage({ data }: ComparisonPageProps) {
  return (
    <main>
      <PageHeader eyebrow="Archived comparison" title={data.pageTitle} />

      <Section className="pb-12">
        <p className="max-w-[64ch] text-lg leading-relaxed text-[var(--color-text-muted)]">
          This older vendor comparison has been retired. Oralstack&apos;s current product role and
          rollout boundaries changed after it was written, so its historical feature-by-feature
          claims are no longer shown as procurement guidance.
        </p>
        {data.lastReviewed && (
          <p className="mt-4 text-[11px] uppercase tracking-[0.06em] text-[var(--color-text-soft)]">
            Archived source last reviewed {data.lastReviewed} · verify {data.competitor} directly
            with the vendor
          </p>
        )}
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="max-w-[880px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-text-soft)]">
            Current Oralstack boundary
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Evaluate the workflow layer first.
          </h2>
          <ul className="mt-6 grid gap-3">
            {currentBoundary.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base"
              >
                <span
                  aria-hidden
                  className="mt-2.5 size-1 shrink-0 rounded-full bg-[var(--color-tide-deep)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl font-semibold tracking-tight md:text-3xl">
              Start from today&apos;s product scope.
            </h2>
            <p className="mt-4 max-w-[58ch] leading-relaxed text-[var(--color-text-muted)]">
              Review the current modules, setup-dependent capabilities, and controlled rollouts
              before comparing commercial proposals.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-self-end">
            <a
              href="/workflows"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
            >
              Current product scope →
            </a>
            <a
              href="/book-a-demo"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
            >
              Book a walkthrough
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
