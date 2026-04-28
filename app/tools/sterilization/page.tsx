import type { Metadata } from "next";
import SterilizationTracking from "@/components/tools/SterilizationTracking";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Sterilisation traceability",
  description:
    "Live demo: every autoclave cycle linked to the trays it sterilised, every tray linked to the patient it was used on. When a spore test fails, the recall list is one click away — names and WhatsApp drafts ready to send.",
  alternates: { canonical: "/tools/sterilization" },
};

export default function SterilizationPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Compliance" title="Sterilisation traceability." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          MOH-grade clinics need to prove every instrument was sterilised before it touched a
          patient — and recall every patient whose instruments came from a failed load. Oralstack
          links autoclave cycles to trays to procedures, so the audit chain is automatic and the
          recall list is one click away.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <SterilizationTracking />
      </Section>
    </main>
  );
}
