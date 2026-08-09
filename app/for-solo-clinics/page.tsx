import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import Reason from "@/components/ui/Reason";
import Bullet from "@/components/ui/Bullet";
import AnimateInView from "@/components/motion/AnimateInView";

export const metadata: Metadata = {
  title: "For one dental clinic",
  description:
    "Oralstack for independently run dental clinics — a Plato-connected workspace for the clinic day, patient care, reviewed checkout, and operations.",
  alternates: { canonical: "/for-solo-clinics" },
};

export default function ForSoloClinicsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="For one clinic"
        title="One calm workspace for the clinic day."
        variant="display"
      />

      <Section className="pb-16">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          For independently run clinics and small teams moving between the schedule, reception,
          chairside care, and checkout. Oralstack brings those Plato-connected workflows into one
          browser-based staff workspace while Plato remains the system of record.
        </p>
        <div data-testid="audience-hero-actions" className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="/contact/?intent=pilot&source=solo-clinic#request"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
          >
            Request a pilot proposal →
          </a>
          <a
            href="/book-a-demo/?source=solo-clinic"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
          >
            Request a 30-min walkthrough
          </a>
        </div>
        <p className="mt-5 text-sm text-[var(--color-text-muted)]">
          Running more than one clinic?{" "}
          <a
            href="/for-multi-clinic"
            className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            See the clinic-group path →
          </a>
        </p>
      </Section>

      <Section className="pb-20">
        <AnimateInView>
          <div className="grid gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-9 max-w-[820px]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Built for the people who run the clinic day
            </p>
            <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
              Practice managers, owners, dentists, and front-desk leads can evaluate the same
              questions: what staff can see, what stays in Plato, and which workflow should improve
              first. The connection, roles, enabled modules, and rollout plan are scoped for each
              clinic before a pilot starts.
            </p>
          </div>
        </AnimateInView>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="Run the day"
            title="The clinic day becomes one visible flow."
            body="My Day, Appointments, Inbox, Requests, Daily huddle, Reception, Queue, and Checkout share the same shell. Staff can see what needs review, who is ready for the chair, and who is waiting at checkout without treating every step as a separate tool."
          />
          <Reason
            eyebrow="Keep context together"
            title="Patient, money, and operations context stay together."
            body="The patient folder links clinical work with visits, billing context, subsidy details, membership, and audit history. Reviewed checkout, receivables, inventory, finance, and clinic insights stay within the configured scope recorded for the clinic."
          />
          <Reason
            eyebrow="Keep the system of record"
            title="Plato remains the connected boundary."
            body="Oralstack reads and extends the existing Plato record through reviewed, status-visible paths. Patient identity, Plato schedule writes, and invoice writeback stay inside those reviewed paths; a local fallback is never described as a delivered writeback."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            What it costs
          </p>
          <div className="grid gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] p-7 md:p-9">
            <div className="grid gap-2 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:gap-10 md:items-baseline">
              <p className="text-4xl md:text-5xl font-semibold tracking-tight tabular-nums leading-none">
                $200
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[40ch]">
                Per clinic, per month, flat. SGD or USD invoiced at parity. No per-seat charges, no
                per-feature gating, three months of hands-on onboarding included.
              </p>
            </div>
            <p className="mt-3 text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
              Pilot scope, clinic connections, enabled modules, and controlled rollouts are recorded
              in the MSA.{" "}
              <a
                href="/pricing"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Full pricing and boundaries →
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            What clinics like yours ask first
          </p>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Onboarding:</span> the Plato
              connection, clinic scope, roles, and rollout plan are confirmed for each pilot. This
              page does not promise a full PMS or paper-record migration.{" "}
              <a
                href="/workflows"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Current product scope →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Hosting:</span> Singapore
              region, tenant-isolated, with audited actions and security evidence.{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Security posture →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Clinical media:</span> staff
              can upload and annotate photos, radiographs, scans, and documents. DICOM/device ingest
              is a controlled rollout, not generally enabled.{" "}
              <a
                href="/workflows#patient-care"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Patient-care workflow →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Worked example:</span> the
              named April 2026 DFI Synergy pilot moved its front-desk scope onto Oralstack in three
              days. This is a historical result from that clinic, not a general timeline.{" "}
              <a
                href="/customers/dfi-synergy"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Read the case study →
              </a>
            </Bullet>
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl md:text-3xl font-semibold tracking-tight">
              Scope the first workflow for your clinic.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              Share your current clinic system and the workflow that should improve first.
              We&apos;ll use that context to scope the connection, access, and enabled modules for
              review.
            </p>
            <p className="mt-4 text-sm">
              <a
                href="/book-a-demo/?source=solo-clinic"
                className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Or request a 30-minute walkthrough first →
              </a>
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/contact/?intent=pilot&source=solo-clinic#request"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Request a pilot proposal →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
