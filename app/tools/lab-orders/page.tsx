import type { Metadata } from "next";
import LabOrderTracker from "@/components/tools/LabOrderTracker";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Lab order tracking",
  description:
    "Live demo: every crown, bridge, veneer, and aligner case from sent to seated in one board. When the lab slips, the patient seat appointment is auto-rescheduled and confirmed on WhatsApp — before anyone calls.",
  alternates: { canonical: "/tools/lab-orders" },
};

export default function LabOrdersPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Clinical" title="Lab order tracking." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Most clinics track lab cases on a whiteboard or in WhatsApp with the lab tech. When the
          lab slips a crown, the seat appointment goes ahead anyway — and the patient sits in the
          chair while the front desk scrambles. Oralstack keeps every case from sent to seated, and
          the moment a lab confirms a delay, the patient seat appointment is auto-rescheduled.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <LabOrderTracker />
      </Section>
    </main>
  );
}
