import type { Metadata } from "next";
import {
  BadgeCheck,
  Bug,
  DatabaseBackup,
  Globe,
  Layers,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Security",
  description: "How Oralstack approaches data security and tenant isolation for dental clinics.",
  alternates: { canonical: "/security" },
};

type SecurityItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
};

const items: SecurityItem[] = [
  {
    icon: Layers,
    title: "Tenant isolation",
    body: "Every clinic record is tagged with a tenant ID at the database row level. Postgres Row-Level Security policies enforce isolation in the database, not just the application — a missing tenant filter in code cannot cross clinics.",
  },
  {
    icon: ScrollText,
    title: "Audit log by default",
    body: "Reads and writes against patient data are written to an append-only audit log: who, what, when, from where. The log is queryable by clinic admins.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-factor authentication",
    body: "MFA is required for all user accounts, with TOTP support out of the box. Recovery flows route through a verified channel.",
  },
  {
    icon: Globe,
    title: "Region hosting",
    body: "Production is hosted in Singapore (asia-southeast1) on Google Cloud. Patient data does not leave the region without explicit consent.",
  },
  {
    icon: BadgeCheck,
    title: "Compliance posture",
    body: "The data model is designed with Singapore PDPA and HIPAA Privacy/Security Rule requirements in mind. We are not yet HIPAA-certified or SOC 2-attested; both are on the 2026 roadmap. A Business Associate Agreement is available for clinics that require one.",
  },
  {
    icon: DatabaseBackup,
    title: "Backups and recovery",
    body: "Daily encrypted backups, point-in-time recovery, and integrity-verified restore drills run on a fixed cadence.",
  },
];

export default function SecurityPage() {
  return (
    <main>
      <PageHeader eyebrow="Trust" title="Security" />

      <Section className="pb-12">
        <p className="max-w-[68ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack handles dental clinic records. Security is part of how the product is built —
          not a checkbox at the end. This page describes our current posture honestly. Where we are
          working toward a control rather than already meeting it, we say so.
        </p>
      </Section>

      <Section className="pb-20 md:pb-24">
        <ul className="grid gap-6 md:grid-cols-2 max-w-[920px]">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-7 md:p-8"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                  <Icon className="size-5" />
                </div>
                <div className="grid gap-2">
                  <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-10 md:px-12 md:py-14 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
          <div className="inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-md)] bg-white text-[var(--color-text-muted)]">
            <Bug className="size-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Reporting a vulnerability
            </h2>
            <p className="mt-2 text-[var(--color-text-muted)] leading-relaxed">
              We acknowledge within 2 working days and confirm a fix or mitigation timeline within
              7.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:security@oralstack.com"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-accent-deep)] transition-colors"
            >
              security@oralstack.com →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
