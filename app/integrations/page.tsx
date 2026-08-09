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
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import {
  integrationCategories,
  type IntegrationAvailability,
  type IntegrationIcon,
} from "@/content/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "A capability-by-capability account of what Oralstack offers now, what requires a configured pilot, and what is not enabled.",
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
      <PageHeader eyebrow="Integrations" title="Clear boundaries for every connection." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          This is a capability register, not a logo wall. It separates generally available workflows
          from clinic-configured pilots and surfaces that are currently unavailable.
          Deployment-specific readiness is confirmed before a pilot starts.
        </p>
      </Section>

      <Section className="pb-12">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[var(--color-text-muted)] border-y border-[var(--color-border)] py-4">
          <LegendDot status="Available" /> Available
          <LegendDot status="Configured pilot" /> Configured pilot
          <LegendDot status="Not enabled" /> Not enabled
        </div>
        <p className="mt-3 max-w-[76ch] text-xs leading-relaxed text-[var(--color-text-soft)]">
          “Configured pilot” means the code path exists but still requires clinic credentials,
          deployment configuration, and a readiness review. It does not mean general availability.
        </p>
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
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{cat.title}</h2>
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
                        <p className="font-medium text-[var(--color-text)]">{item.name}</p>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <IntegrationStatusPill status={item.status} />
                    </li>
                  ))}
                </ul>
                {cat.title === "Imaging exchange" && (
                  <p className="text-sm mt-3">
                    <a
                      href="/status"
                      className="text-[var(--color-tide-deep)] font-medium underline underline-offset-4"
                    >
                      See the current imaging rollout status →
                    </a>
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              Need a connection that is not available?
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              Tell us the system, data direction, and workflow you need. We will distinguish a
              supported export, a configurable pilot, and new engineering work before proposing a
              rollout.
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

function LegendDot({ status }: { status: IntegrationAvailability }) {
  const cls =
    status === "Available"
      ? "bg-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)]"
      : status === "Configured pilot"
        ? "bg-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)]"
        : "bg-[var(--color-border-strong)]";
  return <span aria-hidden className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function IntegrationStatusPill({ status }: { status: IntegrationAvailability }) {
  const styles: Record<IntegrationAvailability, string> = {
    Available:
      "bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)]",
    "Configured pilot":
      "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] border-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)]",
    "Not enabled":
      "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)] border-[var(--color-border-strong)]",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}
