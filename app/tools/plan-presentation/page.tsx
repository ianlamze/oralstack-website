import type { Metadata } from "next";
import PlanPresentation from "@/components/tools/PlanPresentation";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Treatment plan presentation",
  description:
    "Live demo: the chair-side tablet view of a treatment plan. Patients toggle phases, see insurance coverage and patient portion live, sign on screen — and the clinic gets the audit-logged accepted plan in the chart.",
  alternates: { canonical: "/tools/plan-presentation" },
};

export default function PlanPresentationPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Patient experience" title="Plan presentation & e-sign." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Case acceptance is where dental revenue is decided. Most clinics present plans on a paper
          printout or a static PDF; the patient can&apos;t see what insurance covers, can&apos;t opt
          in or out of phases, and has to come back to sign. Oralstack runs the plan on the
          chair-side tablet — toggle phases, see patient portion live, sign on screen, audit chain
          in the chart.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <PlanPresentation />
      </Section>
    </main>
  );
}
