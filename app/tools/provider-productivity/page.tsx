import type { Metadata } from "next";
import ProviderProductivity from "@/components/tools/ProviderProductivity";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Provider productivity & commissions",
  description:
    "Live demo: associate production, hygienist re-care credit, owner vs. associate split, commission lines that trace back to the rule. Built for the multi-clinic owner who needs to see who's earning what — and pay the right number on the first try.",
  alternates: { canonical: "/tools/provider-productivity" },
};

export default function ProviderProductivityPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Multi-clinic" title="Provider productivity & commissions." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          The management report tells the owner how the clinic is doing. This tells the owner how
          each provider is doing. Production by associate, commission lines that trace back to the
          rule, owner vs. associate split, hygienist re-care credit when a recall reminder turns
          into a procedure. The numbers an associate disputes on payday are the numbers this view
          settles.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ProviderProductivity />
      </Section>
    </main>
  );
}
