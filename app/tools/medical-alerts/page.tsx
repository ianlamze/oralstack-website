import type { Metadata } from "next";
import MedicalAlerts from "@/components/tools/MedicalAlerts";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Patient medical alerts",
  description:
    "Live demo: penicillin allergy + amoxicillin pre-med = blocked. Warfarin + extraction = warned with the last INR. Allergies, medications, and conditions surfaced where the front desk and clinician actually look — chair-side, on the procedure card.",
  alternates: { canonical: "/tools/medical-alerts" },
};

export default function MedicalAlertsPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Clinical safety" title="Patient medical alerts." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Allergies, medications, and conditions matter most at the moment of treatment — and
          that&apos;s exactly where most PMSs hide them, three tabs deep. Oralstack surfaces medical
          alerts on the patient row, on the procedure card, and on the prescription pad. Pre-meds
          that conflict with allergies don&apos;t make it past booking; warfarin gets the last INR
          pulled in beside the extraction.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <MedicalAlerts />
      </Section>
    </main>
  );
}
