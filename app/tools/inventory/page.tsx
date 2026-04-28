import type { Metadata } from "next";
import Inventory from "@/components/tools/Inventory";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Inventory & consumables",
  description:
    "Live demo: par levels per chair, auto-deduct on procedure completion, reorder when stock drops below par. Composite, anesthetic, gloves, burs — every consumable tied to the procedure that used it.",
  alternates: { canonical: "/tools/inventory" },
};

export default function InventoryPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Operations" title="Inventory & consumables." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Composite, anesthetic, gloves, burs — the spend that hides because nobody notices it.
          Oralstack hooks into the procedure write-back you already have: every completed procedure
          auto-deducts its consumables, and the moment stock drops below par, a draft reorder is
          queued for the practice manager to approve.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <Inventory />
      </Section>
    </main>
  );
}
