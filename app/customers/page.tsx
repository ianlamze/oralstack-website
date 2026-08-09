import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import CustomerCard from "@/components/page/CustomerCard";
import { customers } from "@/content/customers";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Named historical evidence from DFI Synergy's April 2026 Oralstack front-desk pilot in Singapore, with scope and methodology qualifiers.",
  alternates: { canonical: "/customers" },
};

export default function CustomersPage() {
  return (
    <main>
      <PageHeader eyebrow="Customers" title="One named pilot, documented in detail." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack&apos;s public customer evidence currently comes from DFI Synergy&apos;s named
          April 2026 front-desk pilot in Singapore. The results below describe that clinic,
          measurement window, and configured pilot scope — not a broader customer roster or a
          general performance promise.
        </p>
      </Section>

      <Section data-testid="customer-evidence-index" className="pb-24 md:pb-32">
        <div className="grid gap-6">
          {customers.map((c) => (
            <CustomerCard key={c.id} customer={c} />
          ))}
        </div>
      </Section>
    </main>
  );
}
