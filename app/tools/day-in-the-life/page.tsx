import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import DayInTheLifeScenario from "@/components/tools/DayInTheLifeScenario";

export const metadata: Metadata = {
  title: "Day in the life",
  description:
    "Walk through a typical day at a Singapore dental clinic — six moments from 08:30 to 17:45, each showing the legacy-PMS cost and what changes with Oralstack.",
  alternates: { canonical: "/tools/day-in-the-life" },
};

export default function DayInTheLifePage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Walkthrough" title="A day at the clinic, with Oralstack." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Six moments across one clinic day — front desk, chair, owner. Click any time on the strip
          below or auto-play. Each stop shows the workflow on a typical legacy PMS and what changes
          with Oralstack.
        </p>
      </Section>

      <Section className="pb-12">
        <DayInTheLifeScenario />
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl md:text-3xl font-semibold tracking-tight">
              See it on your clinic&apos;s data.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              The walkthrough above runs on sample data. A 30-minute demo runs on a dataset that
              mirrors your actual setup — chairs, providers, and the workflows your front desk runs
              all day.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/book-a-demo"
              className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              <span>Book a 30-min walkthrough</span>
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
