import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import MigrationReadinessWizard from "@/components/tools/MigrationReadinessWizard";

export const metadata: Metadata = {
  title: "Migration readiness check",
  description:
    "Estimate the cutover from your current PMS to Oralstack — pick your system, clinic profile, and data scope, and get a defensible week-range plus a tailored migration plan.",
  alternates: { canonical: "/tools/migration-readiness" },
};

export default function MigrationReadinessPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Migration" title="Migration readiness check." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Four short questions on your current PMS, clinic footprint, and data scope. We&apos;ll
          return an honest week-range and the cutover plan tailored to your setup. No sales call
          required to see the number.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="max-w-[820px]">
          <MigrationReadinessWizard />
        </div>
      </Section>
    </main>
  );
}
