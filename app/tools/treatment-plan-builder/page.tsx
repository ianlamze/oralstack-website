import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import TreatmentPlanBuilder from "@/components/tools/TreatmentPlanBuilder";

export const metadata: Metadata = {
  title: "Treatment plan builder",
  description:
    "Click teeth, add procedures, see a sequenced plan with insurance estimate and patient portion — the spine of every dental treatment conversation, demoable on real prices.",
  alternates: { canonical: "/tools/treatment-plan-builder" },
};

export default function TreatmentPlanBuilderPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Clinical" title="Treatment plan builder." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Click any tooth on the chart to add a procedure. The plan card on the right groups by
          phase, splits insurance from patient portion, and totals up live. The full version sits in
          the chart inside Oralstack — present-to-patient happens at the chair, not after.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <TreatmentPlanBuilder />
      </Section>
    </main>
  );
}
