import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import PmsComparisonPicker from "@/components/tools/PmsComparisonPicker";

export const metadata: Metadata = {
  title: "PMS comparison picker",
  description:
    "Compare Oralstack against Plato, Open Dental, Dentrix, Eaglesoft, and Carestream — pick up to three competing PMS systems and see the capability table side-by-side.",
  alternates: { canonical: "/tools/compare-pms" },
};

export default function ComparePmsPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Compare" title="PMS comparison picker." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Pick up to three practice management systems and see how Oralstack lines up across the
          capabilities clinics ask about most. Each row links back to the full long-form comparison,
          including where the other vendor is the right call.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <PmsComparisonPicker />
      </Section>
    </main>
  );
}
