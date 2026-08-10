import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import MarkBullet from "@/components/ui/MarkBullet";

export const metadata: Metadata = {
  title: "Switching to Oralstack",
  description:
    "Plan a guided Oralstack rollout for a new dental clinic, a move from paper or another PMS, or an optional connection to Plato.",
  alternates: { canonical: "/switching" },
};

const startingPaths = [
  {
    id: "start-new",
    eyebrow: "Start fresh",
    title: "Set up a new clinic in Oralstack.",
    body: "Configure the clinic, providers, chairs, working hours, payment modes, staff access, and the first patient workflow without depending on another PMS.",
    points: [
      "Confirm clinic identity, patient numbering, roles, and operating hours.",
      "Validate the first appointment, patient record, clinical note, and checkout path.",
      "Train the front desk and clinical team against the configured clinic—not a generic sandbox.",
    ],
    href: "/contact/?intent=migration&source=switching&start=new-clinic#request",
    cta: "Plan a new-clinic setup",
  },
  {
    id: "move-records",
    eyebrow: "Move from paper",
    title: "Review what should become a digital record.",
    body: "Start with paper or spreadsheets. We inspect the source, agree the supported scope, test a sample, and document what remains in the clinic archive.",
    points: [
      "Inventory patient, appointment, clinical, billing, document, and audit sources.",
      "Map supported fields and exceptions before a full import is considered.",
      "Keep validation, rollback, archive, and offboarding decisions visible in the rollout plan.",
    ],
    href: "/contact/?intent=migration&source=switching&start=paper-spreadsheets#request",
    cta: "Assess paper and spreadsheets",
  },
  {
    id: "move-system",
    eyebrow: "Move from another system",
    title: "Map the supported records before cutover.",
    body: "Review the existing practice system, the exports it can produce, and the records staff need on day one before a migration scope is agreed.",
    points: [
      "Inspect representative exports before promising a migration timeline.",
      "Test field mapping, exceptions, totals, attachments, and staff validation.",
      "Define source retention, rollback, and the record that becomes authoritative after cutover.",
    ],
    href: "/contact/?intent=migration&source=switching&start=existing-pms#request",
    cta: "Assess the current system",
  },
  {
    id: "keep-connection",
    eyebrow: "Keep a connection",
    title: "Use Oralstack with Plato where that fits.",
    body: "A clinic can keep Plato authoritative for connected records while Oralstack runs the clinic workflow around it. Connector readiness and every supported write path are reviewed before rollout.",
    points: [
      "Confirm the clinic connector, available records, provider setup, and permissions.",
      "Separate native Oralstack records from Plato-backed reads and reviewed changes.",
      "Treat an unavailable connector or local fallback as visible—not as a completed writeback.",
    ],
    href: "/integrations/#plato",
    cta: "Review the Plato connection",
  },
] as const;

const readinessChecks = [
  {
    title: "Patient identity",
    body: "Who creates the patient number, how duplicates are handled, and which record is authoritative after rollout.",
  },
  {
    title: "Schedule and clinic setup",
    body: "Providers, locations, chairs, hours, appointment states, and the exact booking and rescheduling path.",
  },
  {
    title: "Clinical and billing scope",
    body: "What the team records in Oralstack, how checkout is reviewed, and which payer, claim, payment, or refund actions stay external.",
  },
  {
    title: "Continuity and exit",
    body: "Backups, recovery expectations, supported exports, retained source records, offboarding, and the rollback decision.",
  },
] as const;

export default function SwitchingPage() {
  return (
    <main>
      <PageHeader eyebrow="Switching to Oralstack" title="Choose how your clinic starts." />

      <Section className="pb-14 md:pb-18">
        <div className="grid max-w-[820px] gap-6">
          <p className="max-w-[62ch] text-lg leading-relaxed text-[var(--color-text-muted)]">
            Oralstack is designed to run as the clinic&apos;s primary system. Standalone rollout is
            currently guided: we confirm native capability, clinic setup, record ownership, and any
            data move before a pilot begins. Plato is optional—not a prerequisite.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#starting-path-heading"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Choose a starting path →
            </a>
            <a
              href="/book-a-demo/?start=exploring&source=switching"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Book a clinic walkthrough
            </a>
          </div>
          <dl className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 sm:grid-cols-3">
            <StatusFact label="Rollout" value="Guided pilot" />
            <StatusFact label="Standalone use" value="Clinic setup required" />
            <StatusFact label="Plato" value="Optional connection" />
          </dl>
        </div>
      </Section>

      <Section className="pb-20 md:pb-28" aria-labelledby="starting-path-heading">
        <div className="max-w-[1100px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Four starting paths
          </p>
          <h2
            id="starting-path-heading"
            className="mt-3 max-w-[34ch] scroll-mt-28 text-2xl font-semibold tracking-tight md:text-3xl"
          >
            Start with the clinic you have—not a generic migration promise.
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {startingPaths.map((path, index) => (
              <article
                key={path.eyebrow}
                id={path.id}
                className="flex min-w-0 scroll-mt-28 flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-7 md:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
                    {path.eyebrow}
                  </p>
                  <span className="text-sm tabular-nums text-[var(--color-text-muted)]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-text)]">
                  {path.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {path.body}
                </p>
                <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {path.points.map((point) => (
                    <Bullet key={point}>{point}</Bullet>
                  ))}
                </ul>
                <a
                  href={path.href}
                  className="mt-8 inline-flex min-h-[44px] items-center self-start rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  {path.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pb-20 md:pb-28" aria-labelledby="readiness-heading">
        <div className="grid max-w-[1000px] gap-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:p-10 lg:p-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Before cutover
            </p>
            <h2
              id="readiness-heading"
              className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Prove the clinic path before naming a go-live date.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Native product code can exist before a capability is enabled for a clinic. The rollout
              plan records what is available, what needs setup, and what remains a controlled pilot.
            </p>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {readinessChecks.map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5"
              >
                <dt className="font-medium text-[var(--color-text)]">{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid max-w-[1000px] gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Guided rollout
            </p>
            <h2 className="mt-3 max-w-[30ch] text-2xl font-semibold tracking-tight md:text-3xl">
              Map the first clinic workflow with Oralstack.
            </h2>
            <p className="mt-4 max-w-[58ch] leading-relaxed text-[var(--color-text-muted)]">
              Tell us how the clinic works today, which records need to move, and which dental job
              should run first. We&apos;ll separate native setup, migration work, optional
              connections, and anything outside the current scope.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/contact/?intent=migration&source=switching&start=exploring#request"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Plan the clinic rollout →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function StatusFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">{value}</dd>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <MarkBullet size={11} className="mt-1.5 shrink-0 opacity-90" />
      <span>{children}</span>
    </li>
  );
}
