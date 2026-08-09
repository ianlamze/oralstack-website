import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about how oralstack works with Plato, clinic setup, security controls, integrations, and current product availability.",
  alternates: { canonical: "/faq" },
};

type QA = { q: string; a: React.ReactNode };
type Group = { title: string; items: QA[] };

const groups: Group[] = [
  {
    title: "Pricing & contracts",
    items: [
      {
        q: "What does oralstack cost?",
        a: (
          <>
            <p>
              $200 per clinic per month, flat, during pilot. SGD or USD invoiced at parity for now.
              Three months of hands-on onboarding included. No per-seat charges, no per-feature
              gating, no setup fees.
            </p>
            <p>
              Multi-clinic groups: pricing scales linearly per clinic. Group discounts on request
              once pilot is established.{" "}
              <a
                href="/pricing"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Full pricing →
              </a>
            </p>
          </>
        ),
      },
      {
        q: "Is there a contract or minimum term?",
        a: (
          <p>
            No long-term contract during pilot. We invoice monthly. Cancellation and data-handover
            terms are confirmed in each pilot agreement, including which records and formats are in
            scope.
          </p>
        ),
      },
      {
        q: "What happens after the pilot period?",
        a: (
          <p>
            Pilot pricing is locked at $200/clinic/month for the first 12 months from kickoff. After
            that we&apos;ll tell you what GA pricing looks like with at least 60 days&apos; notice;
            you can stay or leave.
          </p>
        ),
      },
    ],
  },
  {
    title: "Migration & onboarding",
    items: [
      {
        q: "How long does clinic setup take?",
        a: (
          <p>
            The timeline depends on Plato connector readiness, clinic configuration, data review,
            and training. We scope it after an initial audit rather than promising a fixed rollout
            window.{" "}
            <a
              href="/integrations#plato"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              See how the Plato connection works →
            </a>
          </p>
        ),
      },
      {
        q: "Will oralstack replace or copy every patient record?",
        a: (
          <p>
            No. For API-connected clinics, Plato remains the source of truth for patient identity,
            schedule writes, and invoice writeback. oralstack reads mirrored records and writes
            through reviewed paths. Any record migration is scoped separately and requires human
            review; paper-record migration is not a current live feature.
          </p>
        ),
      },
      {
        q: "What happens if the Plato connection is unavailable?",
        a: (
          <p>
            Plato remains the source of truth for an API-connected clinic. oralstack does not swap
            in rich demo records when a production read fails, and a locally staged fallback is
            never described as a delivered writeback. For Plato-backed reschedules, staff review a
            proposal, apply the change in Plato, and then resolve it in oralstack.
          </p>
        ),
      },
      {
        q: "Who handles training?",
        a: (
          <p>
            We do, directly. Training follows the roles and workflows the clinic plans to use, from
            reception and chairside care to checkout and manager review. The schedule and support
            window are agreed during pilot planning.
          </p>
        ),
      },
    ],
  },
  {
    title: "Security & compliance",
    items: [
      {
        q: "Where is my data hosted?",
        a: (
          <p>
            Core production services are configured in the Singapore region (asia-southeast1) on
            Google Cloud. Any clinic-specific connector or external subprocessor is reviewed as part
            of setup rather than implied by the core hosting statement.{" "}
            <a
              href="/security"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              Security posture →
            </a>
          </p>
        ),
      },
      {
        q: "How does oralstack support PDPA obligations?",
        a: (
          <p>
            Product controls include Singapore-region hosting, tenant scoping with Postgres
            row-level security, encryption requirements, origin checks, and chained audit evidence.
            The clinic remains the data controller and oralstack operates as the data intermediary.
            These controls support a clinic&apos;s evaluation; they are not a blanket legal
            certification.
          </p>
        ),
      },
      {
        q: "Are you HIPAA-aware?",
        a: (
          <p>
            We design with HIPAA principles in mind (access control, audit logging, encryption,
            breach notification readiness) but we are not a US-jurisdiction product. Clinics with
            US-jurisdiction patient data should evaluate whether our model fits their specific HIPAA
            requirements. We&apos;ll happily walk through the mapping.
          </p>
        ),
      },
      {
        q: "Can I see audit logs?",
        a: (
          <p>
            Supported clinical and operations workflows create tenant-scoped audit and access
            records for review.{" "}
            <a
              href="/security"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              See the security and audit posture →
            </a>
          </p>
        ),
      },
    ],
  },
  {
    title: "Integrations & technical",
    items: [
      {
        q: "Are DICOM and sensor capture live?",
        a: (
          <p>
            Not as a generally available feature. Current patient care supports clinical media
            upload, note linking, annotations, and archiving. DICOM viewing, device ingest,
            measurements, and the X-ray bridge remain controlled rollouts, so we do not advertise
            specific sensor-vendor support.{" "}
            <a
              href="/integrations"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              Full integrations →
            </a>
          </p>
        ),
      },
      {
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
        q: "Can I export my data?",
        a: (
          <p>
            Export availability depends on the workflow: examples include periodontal exports,
            operational reports, and receipt records. Broader data-handover scope, format, and
            timing are confirmed in the clinic agreement. We do not currently advertise one-click
            CSV or JSON export for every record in the product.
          </p>
        ),
      },
      {
        q: "Do you have an API?",
        a: (
          <p>
            Not publicly. Current integration work centres on reviewed Plato connector paths.
            HitPay, SmartCMS, NEHR, DICOM and sensor ingest, teleconsultation, and automated
            external messaging remain controlled or disabled, not public live integrations.
          </p>
        ),
      },
    ],
  },
  {
    title: "About oralstack",
    items: [
      {
        q: "How big is the team?",
        a: (
          <p>
            Small and engineering-led. The person who writes the schedule code is the person on the
            demo call and the person on the support channel when something breaks.{" "}
            <a href="/about" className="text-[var(--color-tide-deep)] underline underline-offset-4">
              About →
            </a>
          </p>
        ),
      },
      {
        q: "Where are you based?",
        a: (
          <p>
            Singapore. APAC-first. Product decisions start with the front-desk, clinical, billing,
            and data-handling realities of dental clinics in this region.
          </p>
        ),
      },
      {
        q: "What if oralstack goes out of business?",
        a: (
          <p>
            A reasonable thing to ask of any early-stage software company. Each pilot agreement
            defines a data-handover plan for oralstack-owned records, including scope, format, and
            timing. Plato remains the primary record for connected clinics. We do not promise that
            every successor system can ingest every oralstack field without mapping work.
          </p>
        ),
      },
      {
        q: "Why not use Plato or Open Dental?",
        a: (
          <p>
            Both are reasonable for the right clinic. oralstack currently works with Plato as a
            workflow and clinical operations layer rather than presenting itself as a replacement
            source of truth.{" "}
            <a
              href="/workflows"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              See the current product boundary →
            </a>
          </p>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main>
      <PageHeader eyebrow="FAQ" title="Common questions, qualified answers." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Questions clinic owners, office managers, and operators raise during evaluation. If your
          question isn&apos;t here, email{" "}
          <a
            href="mailto:hello@oralstack.com"
            className="text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            hello@oralstack.com
          </a>{" "}
          — we reply within one working day.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-14 md:gap-16 max-w-[820px]">
          {groups.map((group) => (
            <section key={group.title} className="grid gap-6">
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                {group.title}
              </h2>
              <ul className="grid gap-5">
                {group.items.map((item) => (
                  <li
                    key={item.q}
                    className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 md:p-7"
                  >
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-[var(--color-text)]">
                      {item.q}
                    </h3>
                    <div className="grid gap-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {item.a}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}
