import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import Reason from "@/components/ui/Reason";
import Bullet from "@/components/ui/Bullet";
import AnimateInView from "@/components/motion/AnimateInView";

export const metadata: Metadata = {
  title: "For clinic groups",
  description:
    "Oralstack for multi-location dental groups — authorized organization access, clinic switching, group insights, and tenant-scoped workflows around connected clinic systems.",
  alternates: { canonical: "/for-multi-clinic" },
};

export default function ForMultiClinicPage() {
  return (
    <main>
      <PageHeader
        eyebrow="For clinic groups"
        title="One operating view across authorized clinics."
        variant="display"
      />

      <Section className="pb-16">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          For dental groups that need authorized clinic access, group-level signals, and a shared
          operating workspace around connected clinic systems. Oralstack lets staff move between
          permitted clinics while each request remains scoped to an active clinic.
        </p>
        <div data-testid="audience-hero-actions" className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="/contact/?intent=pilot#request"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
          >
            Request a pilot proposal →
          </a>
          <a
            href="/book-a-demo"
            className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
          >
            Request a 30-min walkthrough
          </a>
        </div>
        <p className="mt-5 text-sm text-[var(--color-text-muted)]">
          Running one independently managed clinic?{" "}
          <a
            href="/for-solo-clinics"
            className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            See the one-clinic path →
          </a>
        </p>
      </Section>

      <Section className="pb-20">
        <AnimateInView>
          <div className="grid gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-9 max-w-[820px]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Built for the people consolidating across clinics
            </p>
            <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
              Practice managers, owners, operations leads, and authorized group staff can review how
              clinic access, switching, rollups, and workflow scope should work across their
              locations. Connections, enabled modules, and rollout sequence are agreed clinic by
              clinic before a pilot starts.
            </p>
          </div>
        </AnimateInView>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="What multi-clinic ops actually need · 1"
            title="Clinic-scoped access, enforced in the data layer."
            body="Oralstack uses PostgreSQL row-level security to enforce tenant scope and only surfaces clinics an organization user is authorized to reach. Organization staff and access management support onboarding, offboarding, and clinic switching without treating every location as an unrelated login."
          />
          <Reason
            eyebrow="What multi-clinic ops actually need · 2"
            title="One organization view without flattening clinic boundaries."
            body="Authorized staff can switch between permitted clinics and review group health or today-KPI rollups, then return to clinic-level work. Organization membership, active-clinic binding, and row-level tenant controls keep each request inside its allowed scope."
          />
          <Reason
            eyebrow="What multi-clinic ops actually need · 3"
            title="Operations analytics that surface where operators look."
            body="Authorized managers can review group health and today-KPI rollups, then move into clinic-level booked and collected trends, outstanding payer amounts, daily-close work, and today-only provider and chair utilisation. Estimated or inferred measures stay labeled as such."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            What it costs
          </p>
          <div className="grid gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] p-7 md:p-9">
            <div className="grid gap-2 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:gap-10 md:items-baseline">
              <p className="text-4xl md:text-5xl font-semibold tracking-tight tabular-nums leading-none">
                $200<span className="text-2xl text-[var(--color-text-soft)]"> × clinics</span>
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[40ch]">
                Pilot pricing applies per clinic. Rollout sequence, clinic connections, enabled
                modules, controlled rollouts, and any group pricing are recorded in the proposal and
                MSA.
              </p>
            </div>
            <p className="mt-3 text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
              Talk to us about a group pilot.{" "}
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
            Questions multi-location operators ask first
          </p>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Tenant isolation:</span>{" "}
              Postgres row-level security and request-scoped clinic binding enforce tenant scope;
              the workspace only surfaces clinics the organization user is authorized to reach.{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Security posture →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Audit evidence:</span> audited
              actions are linked with an HMAC chain so integrity checks can detect alteration.
              Deployment-specific evidence is confirmed during procurement.{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Security and audit posture →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Rollout:</span> clinic
              connections, access scope, and enabled modules are planned location by location. We do
              not present a fixed full-PMS migration timeline as a product feature.{" "}
              <a
                href="/workflows"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Current product scope →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Reporting:</span> booked and
              collected trends, outstanding payer amounts, daily-close views, provider performance,
              today-only utilisation, and CSV where exposed.{" "}
              <a
                href="/workflows#insights"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Operations workflow →
              </a>
            </Bullet>
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl md:text-3xl font-semibold tracking-tight">
              Scope a clinic-group pilot.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              Tell us how your locations are organized, what clinic systems are connected, and which
              workflow should improve first. The clinic sequence, access scope, connections, and
              enabled modules are agreed in writing for the pilot.
            </p>
            <p className="mt-4 text-sm">
              <a
                href="/book-a-demo"
                className="text-[var(--color-tide-deep)] font-medium underline underline-offset-4"
              >
                Or book a 30-minute demo first →
              </a>
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/contact/?intent=pilot#request"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Request pilot proposal →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
