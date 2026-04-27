import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import NoShowCalculator from "@/components/tools/NoShowCalculator";

export const metadata: Metadata = {
  title: "No-show revenue calculator",
  description:
    "Model the revenue your dental clinic loses to no-shows each month and year, plus a modeled recovery range with confirmed messaging and same-day rebook.",
  alternates: { canonical: "/tools/no-show-calculator" },
};

export default function NoShowCalculatorPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Revenue" title="No-show revenue calculator." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Slide the inputs to match your clinic. The right column updates live with what you&apos;re
          losing to no-shows today, and a modeled recovery range with Oralstack&apos;s
          confirmed-messaging and same-day-rebook workflow.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <NoShowCalculator />
      </Section>
    </main>
  );
}
