import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import WaitlistAutoFill from "@/components/tools/WaitlistAutoFill";

export const metadata: Metadata = {
  title: "Waitlist auto-fill",
  description:
    "Live demo: a patient cancels, Oralstack ranks the waitlist by procedure fit, slot length, distance, and recall age, sends a templated WhatsApp confirmation — and the slot doesn't lose revenue.",
  alternates: { canonical: "/tools/waitlist-auto-fill" },
};

export default function WaitlistAutoFillPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Front desk" title="Waitlist auto-fill." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          When a patient cancels, the front desk has minutes — not hours — to fill the slot before
          it&apos;s lost revenue. Oralstack ranks the waitlist on procedure fit, slot length,
          distance, and recall age, then sends a templated WhatsApp confirmation in one click. Click{" "}
          <span aria-hidden>×</span> on Mei Lin Tan&apos;s 11:00 hygiene slot to see it.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <WaitlistAutoFill />
      </Section>
    </main>
  );
}
