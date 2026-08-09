import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import Reason from "@/components/ui/Reason";
import Bullet from "@/components/ui/Bullet";
import AnimateInView from "@/components/motion/AnimateInView";

export const metadata: Metadata = {
  title: "For solo & small dental clinics",
  description:
    "Oralstack for solo practitioners and small dental clinics — a Plato-connected workspace for the clinic day, patient care, reviewed checkout, and operations.",
  alternates: { canonical: "/for-solo-clinics" },
};

export default function ForSoloClinicsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="For solo & small clinics"
        title="A calmer operating layer for a small clinic."
        variant="display"
      />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          For one to three chairs, one to four providers, and a team that moves between the
          schedule, reception, chairside care, and checkout. Oralstack brings those Plato-connected
          workflows into one browser-based staff workspace.
        </p>
      </Section>

      <Section className="pb-20">
        <AnimateInView>
          <div className="grid gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-9 max-w-[820px]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Built for the people who run a small clinic
            </p>
            <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
              Two people typically decide on a PMS at a small clinic: the office manager (who lives
              in it daily and decides whether it&apos;s workable) and the dentist-owner (who signs
              the cheque and decides whether the migration is worth the disruption). Oralstack is
              designed to be a yes for both.
            </p>
          </div>
        </AnimateInView>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="What changes day-one"
            title="The clinic day becomes one visible flow."
            body="My Day, Appointments, Inbox, Requests, Daily huddle, Reception, Queue, and Checkout share the same shell. Staff can see what needs review, who is ready for the chair, and who is waiting at checkout without treating every step as a separate tool."
          />
          <Reason
            eyebrow="What changes month-one"
            title="Patient, money, and operations context stay together."
            body="The patient folder links clinical work with visits, billing, subsidy, membership, and audit context. Reviewed checkout, receivables, inventory, finance, and operational reports give the owner a consistent place to follow the work."
          />
          <Reason
            eyebrow="What stays familiar"
            title="Plato remains the connected boundary."
            body="Oralstack extends the existing clinic workflow through reviewed connections and writebacks. It does not ask a current Plato clinic to assume that native patient identity, scheduling, invoicing, or payer rails have already been replaced."
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
              No long-term contract. Cancel any time during pilot.{" "}
              <a
                href="/pricing"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Full pricing →
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
              region, tenant-isolated, audit-logged.{" "}
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
              <span className="font-medium text-[var(--color-text)]">Worked example:</span> DFI
              Synergy, a 3-chair Singapore clinic, moved its front desk onto Oralstack in three
              days.{" "}
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
              Book a demo with the engineer who built the schedule.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              30 minutes. Sample dataset matched to a 1–4 chair clinic. We follow up with a pilot
              proposal within two working days.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/book-a-demo"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Book a demo →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
