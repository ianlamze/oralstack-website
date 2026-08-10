import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import MarkBullet from "@/components/ui/MarkBullet";
import MagneticButton from "@/components/primitives/MagneticButton";
import ClinicFitChooser from "@/components/sections/ClinicFitChooser";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Guided standalone pilot pricing for Oralstack — flat $200 per clinic per month, with three months of hands-on onboarding included.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main>
      <PageHeader eyebrow="Pricing" title="Guided pilot pricing." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          One flat price for the configured core clinic pilot. Three months of hands-on onboarding
          included. Data migration, bespoke imports, and optional connections are scoped before
          kickoff rather than hidden inside the subscription.
        </p>
        <a
          href="/switching"
          className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          Compare the clinic starting paths →
        </a>
      </Section>

      <Section className="pb-16">
        <ClinicFitChooser />
      </Section>

      <Section className="pb-16">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-8 md:p-12 max-w-[820px]">
          <div className="grid gap-10 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:gap-14 md:items-start">
            <div className="grid gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                Guided clinic pilot
              </p>
              <p className="text-5xl md:text-6xl font-semibold tracking-tight tabular-nums text-[var(--color-text)] leading-none">
                $200
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                per clinic <span className="text-[var(--color-text-soft)]">·</span> per month
              </p>
              <p className="text-xs text-[var(--color-text-soft)] mt-1 tracking-[0.04em]">
                SGD or USD invoiced at parity for now
              </p>
            </div>

            <div className="grid gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Includes
              </p>
              <ul className="grid gap-2.5 text-[var(--color-text-muted)] leading-relaxed">
                <Bullet>
                  The configured core scope across appointments, reception, patient folders,
                  checkout, patient access, clinic operations, and insights.
                </Bullet>
                <Bullet>
                  Three months of hands-on onboarding for the front desk and clinical team.
                </Bullet>
                <Bullet>
                  Standard clinic setup for roles, providers, chairs, and enabled native modules.
                </Bullet>
                <Bullet>Unlimited users, chairs, and providers within the clinic.</Bullet>
                <Bullet>
                  Region-hosted in Singapore (asia-southeast1), tenant-isolated, audit-logged.
                </Bullet>
                <Bullet>A named contact at Oralstack — usually an engineer.</Bullet>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/contact/?intent=pilot&source=pricing#request"
              variant="primary"
              withArrow
            >
              Request a pilot proposal
            </MagneticButton>
            <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
              Guided standalone pilot · no self-serve activation · no long-term contract.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-10 max-w-[820px]">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-8 grid gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              What the core price covers
            </p>
            <ul className="grid gap-2.5 text-[var(--color-text-muted)] text-sm leading-relaxed">
              <Bullet>Guided setup of the agreed native clinic workflows.</Bullet>
              <Bullet>Unlimited users, chairs, and providers inside one clinic.</Bullet>
              <Bullet>Training for the front desk, clinical team, and clinic manager.</Bullet>
              <Bullet>A documented record boundary, rollout plan, and support window.</Bullet>
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-7 md:p-8 grid gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Scoped separately before kickoff
            </p>
            <ul className="grid gap-2.5 text-[var(--color-text-muted)] text-sm leading-relaxed">
              <Bullet>
                Bulk legacy-record migration, data cleaning, and custom import mapping.
              </Bullet>
              <Bullet>Plato or another bespoke connector and its reviewed write paths.</Bullet>
              <Bullet>
                Public self-booking, automated messaging, DICOM/device ingest, external AI,
                integrated claims, and payment processing unless explicitly scoped in writing.
              </Bullet>
              <Bullet>Multi-region deployments outside APAC and group-wide rollout work.</Bullet>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="pb-16">
        <div className="grid gap-6 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            After the pilot
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[36ch]">
            Pilot pricing is locked for 12 months. Here&apos;s what happens after that.
          </h2>
          <ul className="grid gap-2.5 text-[var(--color-text-muted)] leading-relaxed text-sm md:text-base">
            <Bullet>
              Pilot pricing ($200 / clinic / month) is contractually locked for 12 months from pilot
              start, regardless of when GA pricing is announced.
            </Bullet>
            <Bullet>
              When GA pricing is announced, pilot clinics get 90 days&apos; notice and the option to
              renew at a documented pilot-loyalty rate. We commit, in writing in the MSA, that
              renewal pricing won&apos;t exceed the GA list price for the same clinic shape.
            </Bullet>
            <Bullet>
              No silent feature gating. The MSA records exactly which modules, clinic connections,
              record-move work, and controlled rollouts are included in the pilot.
            </Bullet>
            <Bullet>
              Custom quotes (groups, DSOs, multi-region clinics) are written in the pilot MSA up
              front — no surprise renegotiation at renewal.
            </Bullet>
          </ul>
        </div>
      </Section>

      <Section className="pb-16">
        <div className="max-w-[820px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 md:p-8 grid gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Your data, on the way out
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            The MSA records the offboarding and export package for your pilot deployment.
            Operational reports support CSV where exposed in the app; broader patient, clinical,
            billing, and audit exports are confirmed in writing rather than assumed from a demo.
          </p>
          <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
            Spelled out in the MSA · request a draft through{" "}
            <a
              href="/contact/?intent=security&source=pricing&request=product-agreement#request"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              the security review form
            </a>
            .
          </p>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              Request a scoped pilot proposal.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              Tell us whether you&apos;re starting fresh, moving from paper or another clinic
              system, or keeping Plato connected. We use that answer to scope record ownership,
              enabled modules, import work, optional connections, and the first workflow.
              Procurement teams: the{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                security & compliance hub
              </a>{" "}
              summarises current security evidence and the request path for available procurement
              materials.
            </p>
          </div>
          <div className="md:justify-self-end">
            <MagneticButton
              href="/contact/?intent=pilot&source=pricing#request"
              variant="primary"
              withArrow
            >
              Request a pilot proposal
            </MagneticButton>
          </div>
        </div>
      </Section>
    </main>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <MarkBullet size={12} className="mt-1.5 opacity-90" />
      <span>{children}</span>
    </li>
  );
}
