import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import MarkBullet from "@/components/sections/MarkBullet";
import AnimateInView from "@/components/sections/AnimateInView";

export const metadata: Metadata = {
  title: "For multi-clinic & DSO",
  description:
    "Oralstack for multi-location dental groups and DSOs — tenant-isolated SaaS, single-login multi-clinic consolidation, version consistency, and operations-grade analytics.",
  alternates: { canonical: "/for-multi-clinic" },
};

export default function ForMultiClinicPage() {
  return (
    <main>
      <PageHeader
        eyebrow="For multi-clinic & DSO"
        title="One PMS, every clinic, one version."
      />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          For groups operating two to twenty clinics under one organisation —
          where the office manager runs the chair and the COO runs the
          spreadsheet that consolidates everything. Oralstack&apos;s tenant
          model is built for this from day one, not bolted on after a single-clinic
          install became popular.
        </p>
      </Section>

      <Section className="pb-20">
        <AnimateInView>
          <div className="grid gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-9 max-w-[820px]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Built for the people consolidating across clinics
            </p>
            <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
              The buyer for a multi-location group is rarely the front desk —
              it&apos;s a VP of Ops, a COO, or a Director of Clinical
              Operations. They live in dashboards and consolidated reports.
              Their question isn&apos;t &ldquo;does this work for one clinic&rdquo; —
              it&apos;s &ldquo;does this give me one consistent view across
              all of them?&rdquo;
            </p>
          </div>
        </AnimateInView>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="What multi-clinic ops actually need · 1"
            title="Tenant isolation, not multi-database juggling."
            body="Most legacy PMS were built for one clinic and adapted to multi-clinic later — typically by running a separate database per clinic, with reconciliation reports that pull from each one. Oralstack uses Postgres row-level security to enforce per-clinic data separation in a single database, with one login that surfaces every clinic the operator has access to. No DBAs, no consolidation pipelines, no reporting drift."
          />
          <Reason
            eyebrow="What multi-clinic ops actually need · 2"
            title="One version across every clinic."
            body="Version drift is the silent killer of multi-clinic operations. Clinic A is on PMS version 14.3.1; clinic B is still on 13.8 because the upgrade got deferred. Reports don't reconcile. Front-desk staff who rotate between clinics learn two slightly different products. Oralstack deploys continuously: every clinic in the group is on the same version every week."
          />
          <Reason
            eyebrow="What multi-clinic ops actually need · 3"
            title="Operations analytics that surface where operators look."
            body="Chair utilisation across all locations, by chair and day. Revenue per chair by clinic, week-over-week, with delta callouts. Recall coverage rate per location. No-show rate trended in clinic-local timezones. Daily snapshot in the dashboard, weekly digest in the inbox — built for the COO who wants the punch list, not the spreadsheet pull."
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
                Pilot pricing scales linearly per clinic. No tier upcharges for
                multi-clinic features. Multi-location and group discounts on
                request once the pilot proves out.
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
              Postgres row-level security enforces per-clinic data separation
              at the database layer, not the application layer.{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Security posture →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Audit logs:</span>{" "}
              every read and write is logged with user, clinic, and resource.
              Queryable per-clinic for PDPC, IRAS, or internal audits.{" "}
              <a
                href="/articles/dental-audit-logs"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                What auditors look for →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Migration:</span>{" "}
              we run group migrations clinic-by-clinic, on a three-week cadence
              per location, no fallback diary kept in parallel.{" "}
              <a
                href="/articles/plato-to-cloud-migration"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                The migration playbook →
              </a>
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Reporting:</span>{" "}
              chair utilisation heatmap, revenue per chair, recall coverage,
              no-show trend — all timezone-correct per clinic.{" "}
              <a
                href="/workflows#operations"
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
              Talk to us about a group pilot.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              30 minutes with a real engineer, on a multi-clinic sample
              dataset. We follow up with a tailored proposal — usually a
              two-clinic pilot first, then group rollout — within two working
              days.
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

function Reason({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-[1.15] max-w-[34ch]">
        {title}
      </h2>
      <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
        {body}
      </p>
    </div>
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
