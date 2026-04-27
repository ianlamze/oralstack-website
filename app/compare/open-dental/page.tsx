import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import MarkBullet from "@/components/sections/MarkBullet";

export const metadata: Metadata = {
  title: "Oralstack vs Open Dental",
  description:
    "An honest, side-by-side comparison of Oralstack and Open Dental — license, hosting, UX, customisation, imaging, APAC compliance, and where each is the right call.",
  alternates: { canonical: "/compare/open-dental" },
};

type Row = { capability: string; them: string; us: string };

const rows: Row[] = [
  {
    capability: "License & cost",
    them: "Free open-source license. Paid support tiers, plus IT and hosting costs you cover.",
    us: "Flat $200 / clinic / month during pilot. Includes hosting, three months of onboarding, and a named contact.",
  },
  {
    capability: "Hosting",
    them: "Self-hosted on your own server, or hosted with a third-party Open Dental partner.",
    us: "Managed SaaS, region-hosted in Singapore (asia-southeast1) on Google Cloud. Tenant-isolated by default.",
  },
  {
    capability: "UX",
    them: "Mature and feature-rich, with a Windows-leaning interface and dense menu structure built up over two decades.",
    us: "Web-native, opinionated workflows. Designed for the front-desk drag-and-drop pace, not for menu hunting.",
  },
  {
    capability: "Customisation",
    them: "Highly customisable. Custom reports, queries, and workflows are possible with SQL and DIY effort.",
    us: "Opinionated workflows aligned to six job-to-be-done flows. Less malleable, faster to land on.",
  },
  {
    capability: "US insurance billing",
    them: "Strong. Claims, EOB import, X12 837/835, well-suited to US practices.",
    us: "Out of scope. Built around APAC fee-for-service and Singapore insurance models, not US payer rails.",
  },
  {
    capability: "APAC compliance",
    them: "No specific Singapore PDPA stance. Compliance is the operator's responsibility.",
    us: "PDPA-aware by design. Data residency in Singapore, tenant isolation via Postgres row-level security, audit logs by default.",
  },
  {
    capability: "Imaging",
    them: "Sensor bridge plugins per vendor. Quality and stability vary by integration.",
    us: "DICOM viewer in the patient chart. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick.",
  },
  {
    capability: "Updates",
    them: "Manual upgrades. You schedule downtime, run the upgrade, verify on your environment.",
    us: "Continuous deployment. All clinics on one version every week.",
  },
  {
    capability: "Multi-clinic",
    them: "Possible with multi-database setup; requires careful planning and DBA familiarity.",
    us: "Tenant-isolated SaaS. Multi-clinic consolidation in one login, no DB ops.",
  },
  {
    capability: "Setup time",
    them: "Hours to days of IT work to install, configure, and train staff.",
    us: "30-minute demo, pilot proposal in two working days, three weeks to live.",
  },
  {
    capability: "Community & support",
    them: "Large, active, US-skewed forum and developer community. Self-serve learning.",
    us: "Direct access to the engineering team. APAC-skewed, smaller but hands-on.",
  },
];

export default function CompareOpenDentalPage() {
  return (
    <main>
      <PageHeader eyebrow="Compare" title="Oralstack vs Open Dental." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Open Dental is mature, feature-complete, and free to license — a
          legitimate option for clinics with IT capacity and a US-style
          insurance workflow. Oralstack is a managed SaaS designed for APAC
          dental practices that want fast onboarding, region-hosted data, and
          opinionated workflows rather than a configuration project. Here&apos;s
          what differs, line by line.
        </p>
      </Section>

      <Section className="pb-16">
        <AnimateInView>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]">
            <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] md:gap-6 px-6 py-4 bg-[var(--color-canvas-tinted)] border-b border-[var(--color-border)]">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Capability
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Open Dental
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
                Oralstack
              </p>
            </div>

            <ul className="divide-y divide-[var(--color-border)]">
              {rows.map(({ capability, them, us }) => (
                <li
                  key={capability}
                  className="grid gap-3 px-6 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] md:gap-6"
                >
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    {capability}
                  </p>
                  <div className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] md:hidden">
                      Open Dental
                    </span>
                    {them}
                  </div>
                  <div className="text-sm leading-relaxed text-[var(--color-text)] md:rounded-[var(--radius-md)] md:bg-[var(--color-canvas-tinted)] md:px-4 md:py-3 md:-my-1">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-tide-deep)] md:hidden">
                      Oralstack
                    </span>
                    {us}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimateInView>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="Why we built differently · 1"
            title="Managed SaaS beats self-hosted for most clinics."
            body="Open Dental's freedom to self-host is real. So is the IT load: you provision the server, schedule upgrades, run backups, manage Windows updates, monitor uptime. For most APAC dental practices, that is a job nobody on the team wants. Oralstack runs the infrastructure so the clinic runs the clinic — region-hosted in Singapore, tenant-isolated, with continuous deployment so you don't schedule downtime to upgrade."
          />
          <Reason
            eyebrow="Why we built differently · 2"
            title="Opinionated workflows beat configuration projects."
            body="Open Dental is configurable to almost any practice. That power is also its cost: getting from install to fluent use takes weeks of staff time. Oralstack ships with six opinionated workflows — front desk, billing, charting, imaging, recall, operations — built around the jobs busy clinics actually run. Less malleable, faster to land on, and easier to keep consistent across multi-location operators."
          />
          <Reason
            eyebrow="Why we built differently · 3"
            title="APAC compliance is built in, not configured in."
            body="Open Dental was built around the US dental market — strong on X12 claims, EOB imports, US-payer rails. We built Oralstack around Singapore and APAC dental practices: data residency in asia-southeast1, tenant isolation via Postgres row-level security, audit logs by default, and a tax model that fits Singapore GST. PDPA isn't a feature flag; it's the model."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Where Open Dental is the right call
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[32ch]">
            We&apos;re not the right answer for every clinic.
          </h2>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              If you have IT capacity (or a partner) and want to avoid monthly
              software fees, Open Dental&apos;s license model is hard to beat.
            </Bullet>
            <Bullet>
              If your clinic operates on US-payer rails — X12 claims, EOB
              imports, ANSI 837/835 — Open Dental is built around that. We are
              not.
            </Bullet>
            <Bullet>
              If you want highly customisable software you can extend with SQL,
              custom reports, and your own workflows, Open Dental gives you
              that. Oralstack is intentionally opinionated.
            </Bullet>
            <Bullet>
              If self-hosting is a sovereignty requirement (defence,
              government), self-hosted Open Dental fits a constraint that
              managed SaaS does not.
            </Bullet>
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl md:text-3xl font-semibold tracking-tight">
              See it on your clinic&apos;s data.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              A 30-minute walkthrough on a sample dataset that matches your
              size. We&apos;ll show what changes day-one and what the
              three-week onboarding looks like.{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
              >
                Read the security posture →
              </a>
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
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-[1.15] max-w-[34ch]">
        {title}
      </h3>
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
