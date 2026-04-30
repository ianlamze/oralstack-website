import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import JourneyExplorer from "@/components/journey/JourneyExplorer";
import Button from "@/components/primitives/Button";

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
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              See the journey running on a sample clinic.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              A 30-minute demo walks every stage from a real Singapore practice — booking through
              recall — on a sample dataset that mirrors a typical 3-chair clinic.
            </p>
          </div>
          <div className="md:justify-self-end">
            <Button href="/book-a-demo" variant="primary" withArrow>
              Book a demo
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
