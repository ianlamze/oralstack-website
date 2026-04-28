import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import EndOfDayReconciliation from "@/components/tools/EndOfDayReconciliation";

export const metadata: Metadata = {
  title: "End-of-day reconciliation",
  description:
    "Live demo: today's takings reconciled, mismatches flagged, ledger pushed to Xero in one pane. PayNow / Card / Cash / Bank rolled up by mode, transaction-by-transaction audit, GST collected.",
  alternates: { canonical: "/tools/end-of-day-reconciliation" },
};

export default function EndOfDayReconciliationPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Owner + bookkeeper" title="End-of-day reconciliation." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Most legacy dental PMSs leave end-of-day for the bookkeeper to chase down on Tuesday.
          Oralstack rolls up payments by mode, flags any variance to the cent, lets the front desk
          resolve in one click, then pushes the day&apos;s ledger to Xero — auditable, before anyone
          goes home.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <EndOfDayReconciliation />
      </Section>
    </main>
  );
}
