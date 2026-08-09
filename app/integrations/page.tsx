import type { Metadata } from "next";
import {
  Aperture,
  ArrowRight,
  ArrowRightLeft,
  Camera,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Database,
  FileSpreadsheet,
  KeyRound,
  MessageSquare,
} from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import {
  integrationCategories,
  type IntegrationAvailability,
  type IntegrationCategory,
  type IntegrationIcon,
  platoConnection,
} from "@/content/integrations";

export const metadata: Metadata = {
  title: "Plato connection and integrations",
  description:
    "See how Oralstack works around Plato, what stays authoritative, which changes back to Plato require review, and how other clinic connections are currently enabled.",
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
      <PageHeader eyebrow="Plato & integrations" title="Run the clinic day around Plato." />

      <Section className="pb-14 md:pb-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-start lg:gap-14">
          <div>
            <p className="max-w-[58ch] text-lg leading-relaxed text-[var(--color-text-muted)]">
              Oralstack works as a clinic-operations layer around Plato. Plato remains the system of
              record; Oralstack gives staff one place to coordinate the reception, chairside,
              checkout, and manager handoffs around that record.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#plato"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
              >
                See how the connection works
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="/contact/?intent=migration&source=integrations#request"
                className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
              >
                Request a connection assessment
              </a>
            </div>
          </div>

          <aside
            aria-labelledby="connection-summary-heading"
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-1)]"
          >
            <h2
              id="connection-summary-heading"
              className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]"
            >
              Connection summary
            </h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <SummaryRow label="System of record" value="Plato" />
              <SummaryRow label="Oralstack role" value="Clinic workflow and operations" />
              <SummaryRow label="Changes back to Plato" value="Reviewed and status-visible" />
              <SummaryRow label="Clinic setup" value="Required before rollout" />
            </dl>
          </aside>
        </div>
      </Section>

      <Section id="plato" className="scroll-mt-28 pb-16 md:pb-20">
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_12%)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-2)]">
          <div className="border-b border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_94%)] px-6 py-5 md:flex md:items-center md:justify-between md:gap-6 md:px-10">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-tide-deep)] shadow-[var(--shadow-1)]"
                aria-hidden
              >
                <Database className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                  Core clinic connection
                </p>
                <p className="mt-0.5 font-semibold text-[var(--color-text)]">Plato clinic API</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-0 md:justify-end">
              <IntegrationStatusPill status={platoConnection.status} />
              <span className="text-xs text-[var(--color-text-soft)]">
                Evidence dated 20 Jul 2026
              </span>
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
                How ownership works
              </p>
              <h2 className="max-w-[28ch] text-2xl font-semibold tracking-tight md:text-3xl">
                {platoConnection.title}
              </h2>
              <p className="max-w-[70ch] leading-relaxed text-[var(--color-text-muted)]">
                {platoConnection.description}
              </p>
              <a
                href="/contact/?intent=migration&source=integrations#request"
                className="mt-1 inline-flex min-h-[44px] w-fit items-center gap-2 text-sm font-semibold text-[var(--color-tide-deep)] underline decoration-[var(--color-border-strong)] underline-offset-4"
              >
                Request a connection assessment
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>

            <ol className="mt-8 grid gap-4 lg:grid-cols-3">
              {platoConnection.stages.map((stage, index) => (
                <li
                  key={stage.eyebrow}
                  className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 md:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
                      {stage.eyebrow}
                    </span>
                    <span className="text-xs tabular-nums text-[var(--color-text-soft)]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--color-text)]">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-6 rounded-[var(--radius-lg)] bg-[var(--color-ink)] p-6 text-[var(--color-canvas)] md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-sea)]">
                  Before a clinic goes live
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {platoConnection.guarantees.map((guarantee) => (
                    <li key={guarantee} className="flex items-start gap-2 text-sm leading-relaxed">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[var(--color-sea)]"
                        aria-hidden
                      />
                      <span>{guarantee}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-[color-mix(in_srgb,var(--color-canvas)_68%,transparent)]">
                  {platoConnection.snapshot}. This is product evidence, not a claim that every
                  clinic connector is ready without review.
                </p>
              </div>
              <a
                href="/contact/?intent=migration&source=integrations#request"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-canvas)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sea)]"
              >
                Request a connection assessment
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-8">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Other connections
            </p>
            <h2 className="mt-3 max-w-[28ch] text-2xl font-semibold tracking-tight md:text-3xl">
              Review every external capability by rollout state.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
              Open a category for the exact boundary. “Configured pilot” means credentials,
              deployment setup, and readiness review are still required; it does not mean general
              availability.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-text-muted)]">
            <LegendItem status="Available" />
            <LegendItem status="Configured pilot" />
            <LegendItem status="Not enabled" />
          </div>
        </div>
      </Section>

      <Section className="pb-16 md:pb-20">
        <div className="grid items-start gap-3 md:grid-cols-2">
          {integrationCategories.map((category) => (
            <IntegrationDisclosure key={category.title} category={category} />
          ))}
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-12 md:py-12">
          <div>
            <h2 className="max-w-[28ch] text-2xl font-semibold tracking-tight md:text-3xl">
              Bring the system and workflow you need to connect.
            </h2>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-[var(--color-text-muted)]">
              We will separate a clinic-configured Plato-backed path, a supported export, a
              configured pilot, and new engineering work before proposing a rollout.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:justify-self-end">
            <a
              href="/contact/?intent=migration&source=integrations#request"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
            >
              Request a connection assessment
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="/contact/?intent=question&source=integrations#request"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas)]"
            >
              Ask about another connection
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
      <dt className="text-[var(--color-text-soft)]">{label}</dt>
      <dd className="font-medium text-[var(--color-text)]">{value}</dd>
    </div>
  );
}

function IntegrationDisclosure({ category }: { category: IntegrationCategory }) {
  const Icon = iconMap[category.icon];
  const available = category.items.filter((item) => item.status === "Available").length;
  const configured = category.items.filter((item) => item.status === "Configured pilot").length;
  const unavailable = category.items.filter((item) => item.status === "Not enabled").length;

  return (
    <details className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white open:shadow-[var(--shadow-1)]">
      <summary className="flex min-h-[72px] cursor-pointer list-none items-center gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-tide-deep)] [&::-webkit-details-marker]:hidden">
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)]"
          aria-hidden
        >
          <Icon className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-[var(--color-text)]">{category.title}</span>
          <span className="mt-1 block text-xs text-[var(--color-text-soft)]">
            {availabilitySummary(available, configured, unavailable)}
          </span>
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-[var(--color-text-soft)] transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="border-t border-[var(--color-border)] px-5 pb-5 pt-4">
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
          {category.description}
        </p>
        <ul className="mt-4 grid gap-3">
          {category.items.map((item) => (
            <li
              key={item.name}
              className="grid gap-3 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">{item.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {item.description}
                </p>
              </div>
              <IntegrationStatusPill status={item.status} />
            </li>
          ))}
        </ul>
        {category.title === "Imaging exchange" && (
          <a
            href="/status"
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            See the current imaging rollout status →
          </a>
        )}
      </div>
    </details>
  );
}

function availabilitySummary(available: number, configured: number, unavailable: number) {
  const parts = [
    available > 0 ? `${available} available` : "",
    configured > 0 ? `${configured} configured pilot` : "",
    unavailable > 0 ? `${unavailable} not enabled` : "",
  ].filter(Boolean);
  return parts.join(" · ");
}

function LegendDot({ status }: { status: IntegrationAvailability }) {
  const tones: Record<IntegrationAvailability, string> = {
    Available: "bg-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)]",
    "Available with clinic setup": "bg-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)]",
    "Configured pilot": "bg-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)]",
    "Not enabled": "bg-[var(--color-border-strong)]",
  };
  const cls = tones[status];
  return <span aria-hidden className={`inline-block size-2 rounded-full ${cls}`} />;
}

function LegendItem({ status }: { status: IntegrationAvailability }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <LegendDot status={status} />
      {status}
    </span>
  );
}

function IntegrationStatusPill({
  status,
  label = status,
}: {
  status: IntegrationAvailability;
  label?: string;
}) {
  const styles: Record<IntegrationAvailability, string> = {
    Available:
      "border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)] bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]",
    "Available with clinic setup":
      "border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)] bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]",
    "Configured pilot":
      "border-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)] bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]",
    "Not enabled":
      "border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
  };

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${styles[status]}`}
    >
      {label}
    </span>
  );
}
