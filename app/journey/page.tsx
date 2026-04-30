import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import JourneyExplorer from "@/components/journey/JourneyExplorer";
import CompoundEffect from "@/components/journey/CompoundEffect";

export const metadata: Metadata = {
  title: "The patient journey",
  description:
    "Seven stages of the patient lifecycle, from discovery to recall — and what changes at each stage when a Singapore dental clinic runs on Oralstack. Designed for clinic owners and practice managers evaluating PMS options.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Patient journey"
        title="From the moment they hear about you to the moment they're due back."
      />

      <Section className="pb-12">
        <p className="max-w-[60ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Most PMS demos walk you through features by department — scheduling, charting, billing,
          imaging. Useful for the people who use those modules; less useful for the clinic owner
          deciding whether to buy. This page maps Oralstack to the patient lifecycle instead, so the
          question stops being &ldquo;does it have feature X?&rdquo; and starts being{" "}
          <em>&ldquo;does the clinic measurably get better at every stage of a visit?&rdquo;</em>
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <JourneyExplorer />
      </Section>

      <Section className="pb-24 md:pb-32">
        <CompoundEffect />
      </Section>
    </main>
  );
}
