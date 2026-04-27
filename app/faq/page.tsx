import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions evaluators ask about Oralstack — pricing, contracts, migration, hosting, security, integrations, and what happens if we go out of business.",
  alternates: { canonical: "/faq" },
};

type QA = { q: string; a: React.ReactNode };
type Group = { title: string; items: QA[] };

const groups: Group[] = [
  {
    title: "Pricing & contracts",
    items: [
      {
        q: "What does Oralstack cost?",
        a: (
          <>
            <p>
              $200 per clinic per month, flat, during pilot. SGD or USD invoiced
              at parity for now. Three months of hands-on onboarding included.
              No per-seat charges, no per-feature gating, no setup fees.
            </p>
            <p>
              Multi-clinic groups: pricing scales linearly per clinic. Group
              discounts on request once pilot is established.{" "}
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
            No long-term contract during pilot. We invoice monthly. You can
            cancel any time and we hand back a full export of your data within
            five working days.
          </p>
        ),
      },
      {
        q: "What happens after the pilot period?",
        a: (
          <p>
            Pilot pricing is locked at $200/clinic/month for the first 12
            months from kickoff. After that we&apos;ll tell you what GA
            pricing looks like with at least 60 days&apos; notice; you can
            stay or leave.
          </p>
        ),
      },
    ],
  },
  {
    title: "Migration & onboarding",
    items: [
      {
        q: "How long does migration take?",
        a: (
          <p>
            Three weeks from kickoff to live, in the model we run. Week 1 is
            audit and prep; week 2 is cutover; week 3 stabilises.{" "}
            <a
              href="/articles/plato-to-cloud-migration"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              Read the playbook →
            </a>{" "}
            Clinics that try to keep their old system running in parallel
            consistently take 6–8 weeks instead.
          </p>
        ),
      },
      {
        q: "Will I lose patient data?",
        a: (
          <p>
            No. We migrate patient records, appointment history (12 months
            minimum), treatment records, and outstanding A/R balances
            field-for-field. Most fields map 1:1 from legacy PMS schemas; the
            ones that don&apos;t get reviewed in the week-1 audit. The only
            data we don&apos;t carry across is data the clinic explicitly opts
            out of (typically very old recall lists).
          </p>
        ),
      },
      {
        q: "Do you support a fallback during cutover?",
        a: (
          <p>
            We deliberately don&apos;t recommend running both systems in
            parallel — it&apos;s the single biggest cause of stuck migrations.
            We do keep your old PMS read-only for historical lookups for as
            long as you want, but the source of truth flips to Oralstack at
            the cutover date.
          </p>
        ),
      },
      {
        q: "Who handles training?",
        a: (
          <p>
            We do, directly. A 30-minute walkthrough on day one, then real
            shift coverage with someone available on chat for questions for the
            first week. Front desk staff learn by doing — multi-day classroom
            training, in our experience, doesn&apos;t stick.
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
            Singapore region (asia-southeast1) on Google Cloud. Your patient
            records do not leave the Singapore region without explicit
            cross-border consent.{" "}
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
        q: "Are you PDPA-compliant?",
        a: (
          <p>
            Yes. PDPA-compliance is built into the data model — region-hosted,
            tenant-isolated via Postgres row-level security, audit logs by
            default with full access traceability, encryption in transit and
            at rest. We are not the data controller; the clinic remains the
            controller and we operate as the data intermediary.
          </p>
        ),
      },
      {
        q: "Are you HIPAA-aware?",
        a: (
          <p>
            We design with HIPAA principles in mind (access control, audit
            logging, encryption, breach notification readiness) but we are not
            a US-jurisdiction product. Clinics with US-jurisdiction patient
            data should evaluate whether our model fits their specific HIPAA
            requirements. We&apos;ll happily walk through the mapping.
          </p>
        ),
      },
      {
        q: "Can I see audit logs?",
        a: (
          <p>
            Yes. Every read and write is logged with user, clinic, resource,
            and timestamp. The log is queryable per-clinic.{" "}
            <a
              href="/articles/dental-audit-logs"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              What auditors actually look for →
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
        q: "Which sensors and imaging hardware do you support?",
        a: (
          <p>
            DICOM viewer in the patient chart, with sensor-bridge integration
            across Carestream, Dexis, Sopro, and Schick. We don&apos;t sell
            hardware — bring your existing sensors.{" "}
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
        q: "What about WhatsApp recall messaging?",
        a: (
          <p>
            We use the WhatsApp Business API with Singapore-region routing for
            templated recall and confirmation messages. Two-way conversations
            are audit-logged with delivery and read receipts.
          </p>
        ),
      },
      {
        q: "Can I export my data?",
        a: (
          <p>
            Anytime. CSV and JSON exports are first-class — patient records,
            appointment history, billing history, recall lists, audit logs.
            We&apos;ll never charge for an export.
          </p>
        ),
      },
      {
        q: "Do you have an API?",
        a: (
          <p>
            Not publicly yet. We integrate where it makes sense
            (sensor-bridge, WhatsApp Business, payment processors). A
            documented public API is on the roadmap once integration patterns
            stabilise across the pilot cohort.
          </p>
        ),
      },
    ],
  },
  {
    title: "About Oralstack",
    items: [
      {
        q: "How big is the team?",
        a: (
          <p>
            Small and engineering-led. The person who writes the schedule code
            is the person on the demo call and the person on the support
            channel when something breaks.{" "}
            <a
              href="/about"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              About →
            </a>
          </p>
        ),
      },
      {
        q: "Where are you based?",
        a: (
          <p>
            Singapore. APAC-first. Our cornerstone customer is also in
            Singapore (DFI Synergy, a 3-chair general + hygiene practice).
          </p>
        ),
      },
      {
        q: "What if Oralstack goes out of business?",
        a: (
          <p>
            A reasonable thing to ask of any early-stage SaaS. Two practical
            answers: (1) you can export your full dataset (CSV/JSON) at any
            time — there&apos;s no lock-in, (2) we work with clinics on a
            data-handover plan as part of every pilot agreement, including a
            field-mapping document so a successor PMS can ingest your
            Oralstack data without a re-keying project.
          </p>
        ),
      },
      {
        q: "Why not use Plato or Open Dental?",
        a: (
          <p>
            Both are reasonable for the right clinic.{" "}
            <a
              href="/compare/plato"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              vs Plato →
            </a>
            {"  "}
            <a
              href="/compare/open-dental"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              vs Open Dental →
            </a>
            {"  "}
            <a
              href="/compare"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              All comparisons →
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
          Questions clinic owners, office managers, and operators raise during
          evaluation. If your question isn&apos;t here, email{" "}
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
