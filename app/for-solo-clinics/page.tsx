import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import Reason from "@/components/ui/Reason";
import Bullet from "@/components/ui/Bullet";
import AnimateInView from "@/components/motion/AnimateInView";

export const metadata: Metadata = {
  title: "For solo & small dental clinics",
  description:
    "Oralstack for solo practitioners and small dental clinics — drag-driven schedule, discharge-flow billing, recall that fires on its own, on a flat $200 per clinic per month.",
  alternates: { canonical: "/for-solo-clinics" },
};

export default function ForSoloClinicsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="For solo & small clinics"
        title="The clinic OS that runs in a browser tab."
        variant="display"
      />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          For one to three chairs, one to four providers, and a front desk that owns the schedule,
          the calls, and the bills. Oralstack replaces the paper diary, the WhatsApp confirmations,
          and the end-of-day billing spreadsheet — without a server in the back room.
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
            title="Three workflows the front desk feels immediately."
            body="A drag-driven schedule that responds in three seconds. Treatment lines that pull from the chart at discharge so the bill is ready before the patient stands up. Recall candidates that surface three weeks before due, sorted by recall age, with WhatsApp templates ready to send. None of this requires a separate window, login, or desktop app."
          />
          <Reason
            eyebrow="What changes month-one"
            title="The metrics owners actually look at start moving."
            body="Same-day billing rate typically rises from ~60% to ~85% inside the first month. No-show rate trends down because recall fires on time and confirmations are templated. The owner's weekly digest lands in the inbox without anyone running an end-of-month report."
          />
          <Reason
            eyebrow="What stays familiar"
            title="FDI numbering, surface notation, the way you already chart."
            body="Charting stays close to muscle memory — FDI tooth numbering, surface notes (M/D/B/L/O), procedure codes. We don't change the clinical model, just the speed at which you move through it. Front-desk staff are productive on Oralstack inside a week."
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
              <span className="font-medium text-[var(--color-text)]">Migration:</span> front desk
              live in three days, full migration in three weeks, no fallback diary kept in parallel.{" "}
              <a
                href="/articles/plato-to-cloud-migration"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                The playbook →
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
              <span className="font-medium text-[var(--color-text)]">Imaging:</span> DICOM viewer in
              chart, sensor-bridge across Carestream, Dexis, Sopro, Schick.{" "}
              <a
                href="/workflows#imaging"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Imaging workflow →
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
