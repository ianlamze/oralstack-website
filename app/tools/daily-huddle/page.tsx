import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import DailyHuddle from "@/components/tools/DailyHuddle";

export const metadata: Metadata = {
  title: "Daily huddle dashboard",
  description:
    "Live demo: the clinic owner's morning-coffee view — today's schedule with gaps, top recall opportunities, AR red-flags, production goal vs actual, hygiene re-care rate. One pane the owner reads while the front desk gets ready.",
  alternates: { canonical: "/tools/daily-huddle" },
};

export default function DailyHuddlePage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Owner" title="Daily huddle dashboard." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          The clinic owner&apos;s morning view. Today&apos;s schedule with gaps highlighted, recall
          opportunities ranked by overdue age, AR red-flags over 30 days, production today vs. goal,
          hygiene re-care rate. Same data the front desk and clinical team see — different pane,
          owner-shaped.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <DailyHuddle />
      </Section>
    </main>
  );
}
