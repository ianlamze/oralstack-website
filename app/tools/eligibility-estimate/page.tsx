import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import EligibilityEstimate from "@/components/tools/EligibilityEstimate";

export const metadata: Metadata = {
  title: "Eligibility & estimate",
  description:
    "Live demo: pick a patient's CHAS tier, insurance plan, and procedures — see CHAS subsidy, IPP claim, MediSave deduction, GST, and final patient portion in one view. The 'no surprise bill' demo for the front desk.",
  alternates: { canonical: "/tools/eligibility-estimate" },
};

export default function EligibilityEstimatePage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Front desk" title="Eligibility & estimate." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Pick a patient&apos;s CHAS tier, insurance plan, and the procedures lined up — see the
          subsidy, claim, MediSave deduction, and final patient portion before treatment, not after.
          The killer demo for the &quot;no surprise bill&quot; pain.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <EligibilityEstimate />
      </Section>
    </main>
  );
}
