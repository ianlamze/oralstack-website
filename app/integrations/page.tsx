import type { Metadata } from "next";
import {
  Aperture,
  ArrowRightLeft,
  Camera,
  CreditCard,
  FileSpreadsheet,
  KeyRound,
  MessageSquare,
} from "lucide-react";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import StatusBadge from "@/components/sections/StatusBadge";
import {
  integrationCategories,
  type IntegrationIcon,
} from "@/content/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Imaging sensors, patient communication, payments, identity, accounting, and migration — what oralstack connects with today and what's on the roadmap.",
  alternates: { canonical: "/integrations" },
};

const iconMap: Record<IntegrationIcon, React.ComponentType<{ className?: string }>> = {
  Camera,
  Aperture,
  MessageSquare,
  CreditCard,
  KeyRound,
  FileSpreadsheet,
  ArrowRightLeft,
};

export default function IntegrationsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Integrations"
        title="oralstack works with the tools your clinic already runs."
      />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Direct integrations live today, in beta, and on the near-term
          roadmap. Availability can vary by region and deployment — confirm
          specifics for your clinic during a demo.
        </p>
      </Section>

      <Section className="pb-12">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[var(--color-text-muted)] border-y border-[var(--color-border)] py-4">
          <LegendDot status="Live" /> Live in production
          <LegendDot status="Beta" /> Beta — available on request
          <LegendDot status="Roadmap" /> Roadmap — committed, not shipped
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-16 md:gap-20">
          {integrationCategories.map((cat) => {
            const Icon = iconMap[cat.icon];
            return (
              <section
                key={cat.title}
                className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16"
              >
                <header className="grid gap-4 lg:sticky lg:top-10">
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {cat.title}
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[44ch]">
                    {cat.description}
                  </p>
                </header>

                <ul className="grid gap-3">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-5 py-4"
                    >
                      <div className="grid gap-1 min-w-0">
                        <p className="font-medium text-[var(--color-text)]">
                          {item.name}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <StatusBadge status={item.status} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              Need an integration that&apos;s not listed?
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              Tell us what your clinic already runs. We prioritise integrations
              by pilot demand — clinics that ask for it first usually get it
              first.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:hello@oralstack.com?subject=oralstack%20integration%20request"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-accent-deep)] transition-colors"
            >
              Request an integration →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function LegendDot({ status }: { status: "Live" | "Beta" | "Roadmap" }) {
  const cls =
    status === "Live"
      ? "bg-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)]"
      : status === "Beta"
        ? "bg-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)]"
        : "bg-[var(--color-border-strong)]";
  return (
    <span aria-hidden className={`inline-block h-2 w-2 rounded-full ${cls}`} />
  );
}
