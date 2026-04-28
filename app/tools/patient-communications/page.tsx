import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import PatientCommunicationCenter from "@/components/tools/PatientCommunicationCenter";

export const metadata: Metadata = {
  title: "Patient communication center",
  description:
    "Live demo: WhatsApp threads aggregated, templated replies one click away, every send audit-logged. Confirmations, reschedules, recall, post-op care — all in the same pane the front desk works from.",
  alternates: { canonical: "/tools/patient-communications" },
};

export default function PatientCommunicationCenterPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Front desk" title="Patient communication center." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Most clinics run patient comms across personal phones, a generic WhatsApp account, and
          memory. Oralstack aggregates threads, templates the common replies (confirm, reschedule,
          recall, post-op), and audit-logs every send — all in the same pane the front desk works
          from. Click ⟶ to insert a template.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <PatientCommunicationCenter />
      </Section>
    </main>
  );
}
