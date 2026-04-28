import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import PerioChart from "@/components/tools/PerioChart";

export const metadata: Metadata = {
  title: "Periodontal chart",
  description:
    "Live demo: a periodontal chart hygienists actually fill out. Click any site to record probing depth (1-8 mm), toggle BoP per tooth, watch the snapshot card flag sites needing attention.",
  alternates: { canonical: "/tools/perio-chart" },
};

export default function PerioChartPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Hygienist" title="Periodontal chart." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Perio is the hygienist&apos;s daily workflow — probing depth recorded per site, bleeding
          on probe per tooth, sites &gt;4mm flagged for follow-up. Most legacy PMSs treat it as a
          spreadsheet; Oralstack runs it inline next to the chart, with WhatsApp recall templated
          off the findings. Click any site to record a depth.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <PerioChart />
      </Section>
    </main>
  );
}
