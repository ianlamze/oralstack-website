import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import ManagementReport from "@/components/tools/ManagementReport";

export const metadata: Metadata = {
  title: "Management report",
  description:
    "Live demo: the clinic owner's strategic view — production, collection ratio, new patients, hygiene re-care rate over the period, with category breakdown, AR aging, provider scorecard, and provider × procedure heatmap. Switch period to watch the numbers update.",
  alternates: { canonical: "/tools/management-report" },
};

export default function ManagementReportPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Owner" title="Management report." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          The owner&apos;s strategic view — production, collection ratio, new patients, hygiene
          re-care rate over the period, with category breakdown, AR aging, provider scorecard, and a
          provider × procedure heatmap that surfaces specialisation gaps. Switch period to watch
          every number update.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ManagementReport />
      </Section>
    </main>
  );
}
