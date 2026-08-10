import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ChevronDown, History, Settings2 } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import { currentChangelog, historicalChangelog, type ChangelogEntry } from "@/content/changelog";
import { productCapabilities } from "@/content/product-capabilities";

export const metadata: Metadata = {
  title: "Product updates",
  description:
    "A dated Oralstack release record that separates public product changes, current source evidence, clinic setup, and historical prototypes.",
  alternates: { canonical: "/changelog" },
};

const typeStyles: Record<ChangelogEntry["type"], string> = {
  Feature:
    "bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_60%)]",
  Fix: "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_48%)]",
  Architecture:
    "bg-[color-mix(in_oklch,var(--color-violet),white_85%)] text-[color-mix(in_oklch,var(--color-violet),var(--color-ink)_52%)]",
  Pilot:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_48%)]",
  Branch: "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
  Compliance:
    "bg-[color-mix(in_oklch,var(--color-violet),white_85%)] text-[color-mix(in_oklch,var(--color-violet),var(--color-ink)_52%)]",
  Sweep: "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
};

const statusStyles: Record<ChangelogEntry["status"], string> = {
  public:
    "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_90%)] text-[var(--color-tide-deep)]",
  "source-reviewed":
    "border-[color-mix(in_oklch,var(--color-violet),var(--color-ink)_18%)] bg-[color-mix(in_oklch,var(--color-violet),white_92%)] text-[color-mix(in_oklch,var(--color-violet),var(--color-ink)_58%)]",
  historical:
    "border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
};

const statusLabels: Record<ChangelogEntry["status"], string> = {
  public: "Public now",
  "source-reviewed": "Source reviewed",
  historical: "Historical archive",
};

const guidedCapabilities = productCapabilities.filter(
  (capability) => capability.availability === "available",
);
const configuredCapabilities = productCapabilities.filter(
  (capability) => capability.availability === "configured",
);

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+08:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Singapore",
  });
}

export default function ChangelogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Product updates"
        title="Product changes, with rollout state attached."
        lastUpdated="10 August 2026"
      />

      <Section className="pb-10">
        <div className="grid max-w-3xl gap-6">
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
            Public notes for clinic-facing changes that affect the front desk, patient record,
            checkout, or rollout. Each entry separates what is visible today, what is verified in
            source, and what still needs clinic setup.
          </p>
          <div data-testid="changelog-hero-actions" className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/book-a-demo/?source=changelog"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Book a clinic walkthrough
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="/status"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Review capability status
            </a>
          </div>
          <nav
            aria-label="Product update sections"
            className="grid grid-cols-3 gap-2 border-t border-[var(--color-border)] pt-5"
          >
            <a
              href="#current"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] bg-white px-3 text-sm font-medium text-[var(--color-text)] shadow-[var(--shadow-1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Current
            </a>
            <a
              href="#clinic-setup"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 text-sm font-medium text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Setup
            </a>
            <a
              href="#history"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 text-sm font-medium text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Archive
            </a>
          </nav>
        </div>
      </Section>

      <Section id="current" className="scroll-mt-28 pb-20 md:pb-28">
        <div className="grid gap-10">
          <article
            data-testid="changelog-release-record"
            className="grid gap-7 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_94%)] p-6 shadow-[var(--shadow-1)] md:p-9"
          >
            <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start">
              <span
                aria-hidden
                className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-tide-deep)] shadow-[var(--shadow-1)]"
              >
                <CheckCircle2 className="size-5" />
              </span>
              <div className="grid gap-2">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <span className="font-medium uppercase tracking-[0.14em] text-[var(--color-tide-deep)]">
                    Current public release
                  </span>
                  <time dateTime="2026-08-10" className="tabular-nums">
                    10 Aug 2026
                  </time>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl">
                  Standalone-first setup and an accountable clinic rollout.
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                  The public product journey now starts with how the clinic will run Oralstack. It
                  keeps optional connections, record ownership, security evidence, and setup work
                  visible before a walkthrough or pilot proposal.
                </p>
              </div>
              <span className="inline-flex w-fit rounded-full border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-tide-deep)]">
                Public now
              </span>
            </div>

            <dl className="grid gap-3 md:grid-cols-3">
              <ReleaseFact
                term="Starting paths"
                detail="New clinic, paper or spreadsheets, existing system, or optional connection."
              />
              <ReleaseFact
                term="Clinic workflows"
                detail="Reception, patient care, checkout, operations, insights, and access control."
              />
              <ReleaseFact
                term="Evidence boundary"
                detail="Guided-pilot, clinic-setup, and source-reviewed labels remain explicit."
              />
            </dl>

            <div className="flex flex-col gap-3 border-t border-[color-mix(in_oklch,var(--color-tide-deep),white_72%)] pt-5 sm:flex-row">
              <a
                href="/switching"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
              >
                Review the four setup paths
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="/workflows"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--color-text)] underline decoration-[var(--color-border-strong)] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] sm:ml-auto"
              >
                See all seven clinic workflows
              </a>
            </div>
          </article>

          <div className="grid gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              Current release notes
            </p>
            <h2 className="text-3xl leading-tight text-[var(--color-text)] md:text-4xl">
              Changes a clinic can evaluate now.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
              Website changes are labelled public. Application changes are labelled source reviewed
              when the public page cannot prove a live clinic deployment.
            </p>
          </div>

          <ol data-testid="current-release-notes" className="grid max-w-4xl gap-3">
            {currentChangelog.map((entry) => (
              <li key={entry.id}>
                <CurrentReleaseCard entry={entry} />
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section
        id="clinic-setup"
        className="scroll-mt-28 border-y border-[var(--color-border)] bg-white py-20 md:py-28"
      >
        <div className="grid gap-10">
          <div className="grid max-w-3xl gap-3">
            <div className="flex items-center gap-3 text-[var(--color-tide-deep)]">
              <Settings2 className="size-5" aria-hidden />
              <p className="text-xs font-medium uppercase tracking-[0.16em]">Clinic setup</p>
            </div>
            <h2 className="text-3xl leading-tight text-[var(--color-text)] md:text-4xl">
              The current workflow boundary, in one place.
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
              These seven groups reuse the same rollout labels as the main product guide. This is a
              release-scope summary, not a live uptime claim.
            </p>
          </div>

          <div
            data-testid="changelog-capability-status"
            className="grid gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[var(--shadow-1)] md:grid-cols-2 md:p-8"
          >
            <CapabilityGroup
              label="Guided pilot"
              capabilities={guidedCapabilities.map((capability) => capability.eyebrow)}
              className="border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_94%)]"
            />
            <CapabilityGroup
              label="Configured in clinic setup"
              capabilities={configuredCapabilities.map((capability) => capability.eyebrow)}
              className="border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_24%)] bg-[color-mix(in_oklch,var(--color-sea),white_90%)]"
            />
            <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5 md:col-span-2 md:flex-row">
              <a
                href="/workflows"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
              >
                Review every workflow boundary
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="/status"
                className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-text)] underline decoration-[var(--color-border-strong)] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] md:ml-auto"
              >
                Check the dated capability evidence
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="history" className="scroll-mt-28 py-20 md:py-28">
        <details
          data-testid="changelog-history"
          className="group max-w-4xl rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-1)]"
        >
          <summary className="grid min-h-16 cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-[var(--radius-xl)] px-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] md:px-7 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]"
            >
              <History className="size-5" />
            </span>
            <span className="grid gap-1">
              <span className="text-lg font-semibold text-[var(--color-text)]">
                Historical prototype archive
              </span>
              <span className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {historicalChangelog.length} notes from March and April 2026. Closed by default so
                archived experiments do not read as current product availability.
              </span>
            </span>
            <ChevronDown
              className="size-5 text-[var(--color-text-muted)] group-open:rotate-180"
              aria-hidden
            />
          </summary>

          <div className="border-t border-[var(--color-border)] px-5 py-7 md:px-8 md:py-9">
            <ul className="grid gap-8 border-l border-[var(--color-border)] pl-5 md:pl-7">
              {historicalChangelog.map((entry) => (
                <li key={entry.id} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[calc(1.25rem+0.25rem)] top-2 size-2 rounded-full bg-[var(--color-text-muted)] md:-left-[calc(1.75rem+0.25rem)]"
                  />
                  <div className="grid gap-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <time
                        dateTime={entry.date}
                        className="tabular-nums tracking-[0.04em] text-[var(--color-text-muted)]"
                      >
                        {formatDate(entry.date)}
                      </time>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${typeStyles[entry.type]}`}
                      >
                        {entry.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text)] md:text-xl">
                      {entry.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {entry.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </Section>
    </main>
  );
}

function ReleaseFact({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-tide-deep),white_72%)] bg-white p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-tide-deep)]">
        {term}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{detail}</dd>
    </div>
  );
}

function CurrentReleaseCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <details className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-1)]">
      <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[var(--radius-lg)] px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] md:px-6 [&::-webkit-details-marker]:hidden">
        <span className="grid min-w-0 gap-2">
          <span className="flex flex-wrap items-center gap-2">
            <time
              dateTime={entry.date}
              className="text-xs tabular-nums text-[var(--color-text-muted)]"
            >
              {formatDate(entry.date)}
            </time>
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${statusStyles[entry.status]}`}
            >
              {statusLabels[entry.status]}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{entry.surface}</span>
          </span>
          <span className="text-lg font-semibold leading-snug tracking-tight text-[var(--color-text)] md:text-xl">
            {entry.title}
          </span>
        </span>
        <ChevronDown
          className="size-5 shrink-0 text-[var(--color-text-muted)] group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="grid gap-4 border-t border-[var(--color-border)] px-5 py-5 md:px-6">
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{entry.body}</p>
        <div className="rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            Evidence boundary
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text)]">{entry.boundary}</p>
        </div>
        {entry.href && entry.linkLabel && (
          <a
            href={entry.href}
            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
          >
            {entry.linkLabel}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </details>
  );
}

function CapabilityGroup({
  label,
  capabilities,
  className,
}: {
  label: string;
  capabilities: string[];
  className: string;
}) {
  return (
    <div className={`rounded-[var(--radius-lg)] border p-5 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-[var(--color-text)]">{label}</h3>
        <span className="text-xs font-medium tabular-nums text-[var(--color-text-muted)]">
          {capabilities.length} workflow groups
        </span>
      </div>
      <ul className="mt-4 grid gap-2 text-sm text-[var(--color-text-muted)] sm:grid-cols-2">
        {capabilities.map((capability) => (
          <li key={capability} className="flex items-start gap-2">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0 text-[var(--color-tide-deep)]"
              aria-hidden
            />
            <span>{capability}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
