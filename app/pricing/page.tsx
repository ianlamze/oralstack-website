import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import MarkBullet from "@/components/ui/MarkBullet";
import MagneticButton from "@/components/primitives/MagneticButton";
import RoiCalculator from "@/components/tools/RoiCalculator";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pilot pricing for Oralstack — flat $200 per clinic per month, with three months of hands-on onboarding included.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main>
      <PageHeader eyebrow="Pricing" title="Pilot pricing." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          One flat price. Three months of hands-on onboarding included. No per-seat charges, no
          per-feature gating, no setup fees while we&apos;re in pilot.
        </p>
      </Section>

      <Section className="pb-16">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-8 md:p-12 max-w-[820px]">
          <div className="grid gap-10 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:gap-14 md:items-start">
            <div className="grid gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                Pilot
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
                  All workflows in the current build — scheduling, billing, charting, recall, plus
                  imaging on the v13 cohort.
                </Bullet>
                <Bullet>
                  Three months of hands-on onboarding for the front desk and clinical team.
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
              href="mailto:hello@oralstack.com?subject=Oralstack%20pilot"
              variant="primary"
              withArrow
            >
              Start a pilot
            </MagneticButton>
            <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
              Group / multi-clinic pricing on request. No long-term contract.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pb-16">
        <RoiCalculator />
      </Section>

      <Section className="pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-10 max-w-[820px]">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-8 grid gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              What we ask
            </p>
            <ul className="grid gap-2.5 text-[var(--color-text-muted)] text-sm leading-relaxed">
              <Bullet>
                30 minutes a week from a front-desk lead and a clinician for the first six weeks.
              </Bullet>
              <Bullet>Permission to be named in a case study — like DFI Synergy.</Bullet>
              <Bullet>Honest feedback. We change the product around what doesn&apos;t work.</Bullet>
              <Bullet>A real workflow to anchor against — not a sandbox.</Bullet>
            </ul>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-7 md:p-8 grid gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Out of scope (today)
            </p>
            <ul className="grid gap-2.5 text-[var(--color-text-muted)] text-sm leading-relaxed">
              <Bullet>Self-serve sign-up — every pilot starts with a 30-minute call.</Bullet>
              <Bullet>Per-seat or per-feature gating — pricing stays flat in pilot.</Bullet>
              <Bullet>
                Custom integrations beyond what&apos;s on the integrations page — talk to us.
              </Bullet>
              <Bullet>Multi-region deployments outside APAC — talk to us.</Bullet>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              Talk to us about a pilot.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              Tell us how your front desk runs today, what your current PMS is, and what would
              change first if Oralstack landed in the clinic next week. We reply with a proposal
              within two working days.
            </p>
          </div>
          <div className="md:justify-self-end">
            <MagneticButton
              href="mailto:hello@oralstack.com?subject=Oralstack%20pilot"
              variant="primary"
              withArrow
            >
              Talk to us
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
