import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Oralstack is a dental clinic operating system offered through a guided standalone pilot, with clinic-specific setup and separately reviewed optional connections.",
  alternates: { canonical: "/about" },
};

const engagementSteps = [
  {
    number: "01",
    title: "Map the clinic day",
    task: "Choose the first job to improve across reception, patient care, checkout, or clinic operations.",
    clinic: "Share the current handoffs, the roles involved, and where staff lose time or context.",
    oralstack:
      "Match the agreed clinic job to current Oralstack workflows and define what the pilot needs to prove.",
  },
  {
    number: "02",
    title: "Configure and review the record boundary",
    task: "Agree which records Oralstack will own, what staff can access, and what data needs setup or import.",
    clinic:
      "Confirm record ownership, permitted roles, source data, and whether an existing system must remain connected.",
    oralstack:
      "Configure the guided clinic setup and document enabled modules, access, imports, and rollout limits. Optional connections are scoped separately.",
  },
  {
    number: "03",
    title: "Train, review, and support",
    task: "Prepare the agreed roles, test real clinic scenarios, and review the pilot before broader use.",
    clinic:
      "Nominate clinic leads, validate the configured workflow, and decide whether the reviewed scope is ready for staff.",
    oralstack:
      "Train the agreed roles, review issues and evidence with the clinic, and support the pilot through the agreed channel.",
  },
];

const evidenceLinks = [
  {
    eyebrow: "Product",
    title: "See the clinic workflows",
    body: "Review current reception, patient-care, checkout, operations, and organization paths.",
    href: "/workflows",
    action: "See the workflows →",
  },
  {
    eyebrow: "Setup",
    title: "Choose how your clinic starts",
    body: "Start fresh, move records, or assess an optional connection before the pilot is scoped.",
    href: "/switching",
    action: "Plan the setup path →",
  },
  {
    eyebrow: "Trust",
    title: "Review the security boundary",
    body: "See dated evidence, deployment boundaries, open work, and the procurement path.",
    href: "/security",
    action: "Review security →",
  },
  {
    eyebrow: "Readiness",
    title: "Check capability status",
    body: "Separate available, clinic-configured, guided-pilot, and not-enabled product paths.",
    href: "/status",
    action: "View capability status →",
  },
];

const primaryActionClass =
  "inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]";

const secondaryActionClass =
  "inline-flex min-h-11 items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-canvas)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About Oralstack"
        title="Built around what dental clinics actually run."
        variant="display"
      />

      <Section className="pb-16 md:pb-20">
        <p className="max-w-3xl text-lg leading-relaxed text-[var(--color-text-muted)]">
          Oralstack brings reception, patient records, chairside care, checkout, and clinic
          operations into one clinic system. It is APAC-first; the latest documented deployment
          places core production services in Singapore. Standalone use is offered with
          clinic-specific setup through a guided pilot; optional connections are reviewed
          separately.
        </p>
        <div
          data-testid="about-top-actions"
          className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a href="/book-a-demo/?source=about" className={primaryActionClass}>
            Book a clinic walkthrough →
          </a>
          <a href="/contact/?intent=pilot&source=about#request" className={secondaryActionClass}>
            Request a pilot proposal
          </a>
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div
          data-testid="about-engagement-model"
          className="max-w-5xl rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-10"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
            How a clinic engages
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            Three reviewed steps from clinic day to pilot.
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-text-muted)]">
            The clinic owns its operating decisions and go-live approval. Oralstack maps,
            configures, and supports the agreed pilot scope. Each step makes that split visible.
          </p>

          <ol className="mt-8 grid gap-3">
            {engagementSteps.map((step, index) => (
              <li key={step.number}>
                <details
                  open={index === 0}
                  className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas)]"
                >
                  <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] [&::-webkit-details-marker]:hidden md:gap-6 md:p-6">
                    <span
                      className="flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] text-sm font-semibold tabular-nums text-[var(--color-tide-deep)]"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <span className="grid gap-2">
                      <h3 className="text-xl font-semibold tracking-tight text-[var(--color-text)] md:text-2xl">
                        {step.title}
                      </h3>
                      <span className="max-w-3xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {step.task}
                      </span>
                    </span>
                    <ChevronDown
                      className="mt-3 size-5 text-[var(--color-tide-deep)] group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <dl className="grid gap-4 border-t border-[var(--color-border)] px-5 py-5 sm:grid-cols-2 sm:gap-6 md:ml-16 md:px-6 md:py-6">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text)]">
                        Clinic responsibility
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {step.clinic}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text)]">
                        Oralstack responsibility
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        {step.oralstack}
                      </dd>
                    </div>
                  </dl>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
            Review the evidence
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            Product scope, security, and readiness stay inspectable.
          </h2>
          <nav aria-label="Oralstack product evidence" className="mt-7">
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {evidenceLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex h-full min-h-11 flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] md:p-6"
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-tide-deep)]">
                      {item.eyebrow}
                    </span>
                    <span className="mt-3 text-lg font-semibold tracking-tight text-[var(--color-text)]">
                      {item.title}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {item.body}
                    </span>
                    <span className="mt-5 text-sm font-medium text-[var(--color-tide-deep)]">
                      {item.action}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid max-w-5xl gap-7 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-6 py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-12 md:py-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
              Guided pilot
            </p>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">
              Map the first workflow for your clinic.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--color-text-muted)]">
              Share how your clinic works today. We&apos;ll use the walkthrough to identify the
              record ownership, roles, setup work, and evidence the pilot should review.
            </p>
          </div>
          <div className="grid gap-3 md:justify-self-end">
            <a href="/book-a-demo/?source=about" className={primaryActionClass}>
              Book a clinic walkthrough →
            </a>
            <a href="/contact/?intent=pilot&source=about#request" className={secondaryActionClass}>
              Request a pilot proposal
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
