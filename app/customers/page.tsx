import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import CustomerCard from "@/components/page/CustomerCard";
import { customers } from "@/content/customers";

export const metadata: Metadata = {
  title: "Customers",
  description: "Early dental clinic pilots running on Oralstack across Singapore and APAC.",
  alternates: { canonical: "/customers" },
};

export default function CustomersPage() {
  return (
    <main>
      <PageHeader eyebrow="Customers" title="Early pilots across APAC." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          We&apos;re working with a small group of dental clinics in Singapore — and selectively
          expanding across APAC. Each pilot is hands-on, named, and reviewed weekly with the
          founding team.
        </p>
      </Section>

      <Section className="pb-20 md:pb-24">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((c) => (
            <li key={c.id}>
              <CustomerCard customer={c} />
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Why so few?
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight max-w-[26ch]">
              We&apos;re early. Pilots are deliberate.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              We pick clinics where we can be hands-on for the first three months — named,
              in-region, with a real workflow we can shape the product around. Case studies (like
              DFI Synergy&apos;s) help us land the next pilot.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:hello@oralstack.com?subject=oralstack%20pilot"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-accent-deep)] transition-colors"
            >
              Talk to us about a pilot →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
