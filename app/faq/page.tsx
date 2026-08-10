import { ArrowRight, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Clinic Evaluation FAQ",
  description:
    "Evaluate Oralstack by clinic decision: guided standalone setup, switching, pilot pricing, security, records, and optional connections.",
  alternates: { canonical: "/faq" },
};

type QA = { id: string; q: string; a: React.ReactNode };
type Group = {
  id: string;
  title: string;
  decision: string;
  description: string;
  evidence: string;
  items: QA[];
};

const inlineLinkClass =
  "font-medium text-[var(--color-tide-deep)] underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]";

const groups: Group[] = [
  {
    id: "commercial-fit",
    title: "Pilot & commercial fit",
    decision: "Understand price, terms, and who you work with",
    description: "For owners deciding whether a guided pilot is commercially sensible.",
    evidence: "Pilot terms",
    items: [
      {
        id: "faq-cost",
        q: "What does Oralstack cost?",
        a: (
          <>
            <p>
              $200 per clinic per month, flat, during pilot. SGD or USD is invoiced at parity for
              now. Three months of hands-on onboarding is included. There are no per-seat charges,
              per-feature gates, or standard clinic-setup fees. Legacy-record migration, bespoke
              imports, and optional connections are scoped separately before kickoff.
            </p>
            <p>
              Multi-clinic pricing scales per clinic; group terms are reviewed after the pilot is
              established.{" "}
              <a href="/pricing" className={inlineLinkClass}>
                Review full pricing
              </a>
              .
            </p>
          </>
        ),
      },
      {
        id: "faq-contract",
        q: "Is there a contract or minimum term?",
        a: (
          <p>
            There is no long-term contract during pilot; invoices are monthly. Cancellation and
            data-handover terms are confirmed in each pilot agreement, including which records and
            formats are in scope.
          </p>
        ),
      },
      {
        id: "faq-after-pilot",
        q: "What happens after the pilot period?",
        a: (
          <p>
            Pilot pricing is locked at $200 per clinic per month for the first 12 months from
            kickoff. After that, we will share any general-availability pricing with at least 90
            days&apos; notice; the clinic can stay or leave.
          </p>
        ),
      },
      {
        id: "faq-team",
        q: "How big is the team?",
        a: (
          <p>
            Oralstack is a small, engineering-led team. The clinic works directly with us through
            the guided pilot: we map the clinic day, coordinate configuration and review, train the
            agreed roles, and support the documented scope. The clinic owns its operating decisions
            and go-live approval; responsibilities and support channels are recorded in the pilot
            plan.{" "}
            <a href="/about" className={inlineLinkClass}>
              See how we work
            </a>
            .
          </p>
        ),
      },
      {
        id: "faq-location",
        q: "Where are you based?",
        a: (
          <p>
            Singapore, with an APAC-first operating context. Product decisions start with the
            front-desk, clinical, billing, and data-handling realities of dental clinics in this
            region.
          </p>
        ),
      },
    ],
  },
  {
    id: "setup-records",
    title: "Setup, records & training",
    decision: "Choose how the clinic starts and what moves",
    description: "For practice teams mapping configuration, records, training, and continuity.",
    evidence: "Guided setup",
    items: [
      {
        id: "faq-setup-time",
        q: "How long does clinic setup take?",
        a: (
          <p>
            The timeline depends on how the clinic starts. A new clinic, a paper-led team, a record
            move, and a Plato-connected clinic require different configuration, data review, and
            training. We scope the sequence after an initial audit rather than promising a fixed
            rollout window.{" "}
            <a href="/switching" className={inlineLinkClass}>
              Compare starting paths
            </a>
            .
          </p>
        ),
      },
      {
        id: "faq-record-move",
        q: "Will Oralstack move every patient record?",
        a: (
          <p>
            Not by default. A standalone pilot defines which patient, schedule, clinical, billing,
            and audit records Oralstack will own and which data will be imported. Bulk record moves
            and paper-record conversion are scoped separately and require human review. In a
            Plato-connected clinic, Plato remains authoritative for the reviewed connector paths
            named in the agreement.
          </p>
        ),
      },
      {
        id: "faq-plato-unavailable",
        q: "What happens if Plato is unavailable in a connected clinic?",
        a: (
          <p>
            Plato remains authoritative for the connected record paths. Oralstack does not swap in
            rich demo records when a production read fails, and a locally staged fallback is never
            described as a delivered writeback. Plato-backed reschedules remain staff-reviewed and
            are applied in Plato before they are resolved in Oralstack.
          </p>
        ),
      },
      {
        id: "faq-training",
        q: "Who handles training?",
        a: (
          <p>
            We do, directly. Training follows the roles and workflows the clinic plans to use, from
            reception and chairside care to checkout and manager review. The schedule and support
            window are agreed during pilot planning.
          </p>
        ),
      },
      {
        id: "faq-why-oralstack",
        q: "Why not use Plato or Open Dental?",
        a: (
          <p>
            Both are reasonable for the right clinic. Oralstack can be configured as the
            clinic&apos;s primary system through a guided pilot, or work through an optional
            reviewed Plato connection. The right path depends on the records to retain, workflows to
            move, and tolerance for a staged rollout.{" "}
            <a href="/switching" className={inlineLinkClass}>
              Compare starting paths
            </a>
            .
          </p>
        ),
      },
    ],
  },
  {
    id: "clinical-connections",
    title: "Clinical workflows & connections",
    decision: "Check clinical, messaging, export, and API boundaries",
    description: "For clinical and operations teams verifying what is available or controlled.",
    evidence: "Availability bounded",
    items: [
      {
        id: "faq-dicom",
        q: "Are DICOM and sensor capture live?",
        a: (
          <p>
            Not as generally available features. Current patient care supports clinical-media
            upload, note linking, annotations, and archiving. DICOM viewing, device ingest,
            measurements, and the X-ray bridge remain controlled rollouts, so we do not advertise
            specific sensor-vendor support.{" "}
            <a href="/integrations" className={inlineLinkClass}>
              Review connection status
            </a>
            .
          </p>
        ),
      },
      {
        id: "faq-whatsapp",
        q: "What about WhatsApp and recall messaging?",
        a: (
          <p>
            Clinics with an approved Meta connection can use the staff inbox for manual two-way
            conversations. Recall settings, campaigns, audiences, and touch queues are available for
            staff review. Automated reminders, live recall dispatch, WhatsApp Flows, birthday
            messages, and SMS remain outside current live claims.
          </p>
        ),
      },
      {
        id: "faq-export",
        q: "Can I export my data?",
        a: (
          <p>
            Export availability depends on the workflow; examples include periodontal exports,
            operational reports, and receipt records. Broader data-handover scope, format, timing,
            and operational availability are confirmed in the clinic agreement. We do not advertise
            one-click export for every record in the product.
          </p>
        ),
      },
      {
        id: "faq-api",
        q: "Do you have an API?",
        a: (
          <p>
            Not a public API. Optional Plato connection work uses reviewed connector paths. HitPay,
            SmartCMS, NEHR, DICOM and sensor ingest, teleconsultation, and automated external
            messaging remain controlled or disabled—not public live integrations.
          </p>
        ),
      },
    ],
  },
  {
    id: "security-continuity",
    title: "Security, continuity & exit",
    decision: "Review hosting, controls, audit, and data handover",
    description: "For IT, procurement, and clinic leaders assessing operational trust.",
    evidence: "Dated evidence",
    items: [
      {
        id: "faq-hosting",
        q: "Where is my data hosted?",
        a: (
          <p>
            Core production services are configured in the Singapore region (asia-southeast1) on
            Google Cloud. Clinic-specific connectors and external subprocessors are reviewed as part
            of setup rather than implied by the core hosting statement.{" "}
            <a href="/security" className={inlineLinkClass}>
              Review the security posture
            </a>
            .
          </p>
        ),
      },
      {
        id: "faq-pdpa",
        q: "How does Oralstack support PDPA obligations?",
        a: (
          <p>
            Product controls include Singapore-region hosting, tenant scoping with PostgreSQL
            row-level security, encryption requirements, origin checks, and chained audit evidence.
            For clinic-instructed processing, the clinic is generally the organisation/controller
            and Oralstack acts as data intermediary to the extent stated in the applicable
            data-processing terms; roles can differ by data flow. These controls support evaluation;
            they are not a blanket legal certification.
          </p>
        ),
      },
      {
        id: "faq-hipaa",
        q: "Are you HIPAA-aware?",
        a: (
          <p>
            We account for relevant access, audit, encryption, and incident controls, but Oralstack
            is not a US-jurisdiction product and does not claim HIPAA certification or attestation.
            Clinics handling US-jurisdiction patient data should evaluate whether the documented
            controls fit their specific legal requirements.
          </p>
        ),
      },
      {
        id: "faq-audit-logs",
        q: "Can I see audit logs?",
        a: (
          <p>
            Supported clinical and operations workflows create tenant-scoped audit and access
            records for review.{" "}
            <a href="/security" className={inlineLinkClass}>
              See the security and audit evidence
            </a>
            .
          </p>
        ),
      },
      {
        id: "faq-exit",
        q: "What if Oralstack goes out of business?",
        a: (
          <p>
            Each pilot agreement defines a data-handover plan for Oralstack-owned records, including
            scope, format, and timing. Plato remains the primary record for agreed paths in
            connected clinics. We do not promise that every successor system can ingest every
            Oralstack field without mapping work.
          </p>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Clinic evaluation FAQ"
        title="Answers for the clinic decision in front of you."
        lastUpdated="10 August 2026"
      />

      <Section className="pb-16 md:pb-20">
        <div data-testid="faq-evaluation-journey" className="grid max-w-[1050px] gap-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
            <div>
              <p className="max-w-[62ch] text-lg leading-relaxed text-[var(--color-text-muted)]">
                Start with the decision your clinic needs to make. Oralstack is evaluated standalone
                first; setup, record ownership, enabled modules, and any optional connection are
                confirmed before a guided pilot begins.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-testid="faq-hero-actions">
                <a
                  href="/book-a-demo/?source=faq&start=exploring"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  Book a clinic walkthrough
                  <ArrowRight aria-hidden="true" size={16} />
                </a>
                <a
                  href="/contact/?intent=question&source=faq#request"
                  className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  Ask a clinic-specific question
                </a>
              </div>
            </div>

            <dl className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 sm:grid-cols-3 lg:grid-cols-1">
              <StatusFact label="Evaluation path" value="Standalone first" />
              <StatusFact label="Rollout" value="Guided pilot" />
              <StatusFact label="Plato" value="Optional connection" />
            </dl>
          </div>

          <aside
            data-testid="faq-start-here"
            aria-labelledby="faq-start-here-heading"
            className="grid gap-5 rounded-[var(--radius-xl)] border border-[var(--color-tide)]/30 bg-[var(--color-canvas-tinted)] p-6 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:p-8"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
                Start here
              </p>
              <h2
                id="faq-start-here-heading"
                className="mt-3 text-xl font-semibold tracking-tight text-[var(--color-text)] md:text-2xl"
              >
                Can Oralstack run without Plato?
              </h2>
            </div>
            <div className="grid gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              <p>
                Yes, through a clinic-configured guided pilot with the agreed native modules
                enabled. This is not a self-serve or generally available one-click replacement. We
                confirm provisioning, record ownership, import needs, training, exports, and current
                deployment readiness before kickoff.
              </p>
              <p>
                A clinic that wants to keep Plato can use a separately reviewed connected path.{" "}
                <a href="/switching" className={inlineLinkClass}>
                  Compare the four starting paths
                </a>
                .
              </p>
            </div>
          </aside>

          <nav aria-labelledby="faq-decision-heading">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Four clinic decisions
            </p>
            <h2
              id="faq-decision-heading"
              className="mt-3 scroll-mt-28 text-2xl font-semibold tracking-tight"
            >
              Go straight to the evidence you need.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((group, index) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="group flex min-h-[170px] flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 transition-colors hover:border-[var(--color-tide)] hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  <span className="text-xs tabular-nums text-[var(--color-text-muted)]">
                    0{index + 1}
                  </span>
                  <span className="mt-4 font-semibold leading-snug text-[var(--color-text)]">
                    {group.decision}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {group.description}
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-[var(--color-tide-deep)]">
                    Review answers
                    <ArrowRight
                      aria-hidden="true"
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              ))}
            </div>
          </nav>

          <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
            Website scope reviewed <time dateTime="2026-08-10">10 August 2026</time>. This is not a
            live deployment feed; clinic availability is reconfirmed before kickoff.
          </p>
        </div>
      </Section>

      <Section className="pb-20 md:pb-28" aria-label="Frequently asked questions">
        <div className="grid max-w-[900px] gap-14 md:gap-16">
          {groups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="scroll-mt-28"
              aria-labelledby={`${group.id}-heading`}
            >
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {group.evidence}
                  </p>
                  <h2
                    id={`${group.id}-heading`}
                    className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text)] md:text-3xl"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {group.description}
                  </p>
                </div>
                <a
                  href="#faq-decision-heading"
                  className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  Back to decisions
                </a>
              </div>

              <div className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <details
                    key={item.id}
                    id={item.id}
                    className="group scroll-mt-28 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white"
                  >
                    <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius-lg)] px-5 py-4 text-left font-semibold tracking-tight text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-tide-deep)] md:px-6 [&::-webkit-details-marker]:hidden">
                      <span>{item.q}</span>
                      <ChevronDown
                        aria-hidden="true"
                        size={18}
                        className="shrink-0 text-[var(--color-tide-deep)] transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="grid gap-3 border-t border-[var(--color-border)] px-5 py-5 text-sm leading-relaxed text-[var(--color-text-muted)] md:px-6">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid max-w-[1000px] gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-7 py-10 md:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)] md:items-center md:px-12 md:py-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              Still evaluating?
            </p>
            <h2 className="mt-3 max-w-[28ch] text-2xl font-semibold tracking-tight md:text-3xl">
              Put the clinic&apos;s real starting point on the table.
            </h2>
            <p className="mt-4 max-w-[58ch] leading-relaxed text-[var(--color-text-muted)]">
              We&apos;ll separate what Oralstack can run natively, what needs clinic setup, what can
              move, and what remains an optional or controlled connection.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-stretch">
            <a
              href="/book-a-demo/?source=faq&start=exploring"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Book a clinic walkthrough
            </a>
            <a
              href="/contact/?intent=question&source=faq#request"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              Ask a clinic-specific question
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
