import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bug,
  DatabaseBackup,
  FileLock2,
  Globe,
  Layers,
  Mail,
  Network,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Security & compliance",
  description:
    "How Oralstack approaches data security, tenant isolation, hosting, access control, backups, legal documents, and the compliance roadmap. Honest about what's in place and what's still on the way.",
  alternates: { canonical: "/security" },
};

type CardItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
};

const whereDataLives: CardItem[] = [
  {
    icon: Globe,
    title: "Region hosting · Singapore",
    body: "Production runs in Google Cloud's asia-southeast1 region (Singapore). Patient data does not leave the region without explicit consent. The marketing site is on Cloudflare Pages with the same APAC-first edge profile.",
  },
  {
    icon: Layers,
    title: "Tenant isolation · row-level",
    body: "Every clinic record is tagged with a tenant ID at the database row level. Postgres Row-Level Security policies enforce isolation in the database, not just the application — a missing tenant filter in code cannot cross clinics.",
  },
  {
    icon: FileLock2,
    title: "Encryption · in transit and at rest",
    body: "TLS 1.3 in transit; AES-256 at rest for database, backups, and uploaded imaging. Sensor-bridge integration uses the OS-level secure channel; no patient data is written to local disk.",
  },
];

const accessControl: CardItem[] = [
  {
    icon: ShieldCheck,
    title: "Multi-factor authentication",
    body: "MFA is required for all user accounts, with TOTP support out of the box. Recovery flows route through a verified channel — never the email address that lost MFA in the first place.",
  },
  {
    icon: Network,
    title: "Role-based access · least privilege",
    body: "Roles are defined per clinic — front desk, hygienist, clinician, owner. The role determines which routes the user can reach and which audit-log entries they can read. SSO via Google Workspace and Microsoft 365 is in production; SingPass is in beta.",
  },
  {
    icon: ScrollText,
    title: "Audit log · append-only",
    body: "Reads and writes against patient data are written to an append-only audit log: who, what, when, from where. The log is queryable by clinic admins. Engineers cannot disable the audit log; entries are retained for 7 years unless a clinic explicitly requests purge.",
  },
];

const reliability: CardItem[] = [
  {
    icon: DatabaseBackup,
    title: "Backups · daily, integrity-verified",
    body: "Daily encrypted backups with point-in-time recovery. Restore RPO target: 15 minutes. RTO target: 1 hour. Integrity-verified restore drills run on a fixed cadence — not just backups taken, backups tested.",
  },
  {
    icon: Activity,
    title: "Status & uptime",
    body: (
      <>
        Live platform status, target uptime, scheduled maintenance, and the incident-response
        posture live on the{" "}
        <a href="/status" className="text-[var(--color-tide-deep)] underline underline-offset-4">
          status page
        </a>
        . Customer admins are notified by email when an incident affects a service their clinic
        depends on.
      </>
    ),
  },
  {
    icon: Bug,
    title: "Vulnerability disclosure",
    body: (
      <>
        Report a vulnerability to{" "}
        <a
          href="mailto:security@oralstack.com"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          security@oralstack.com
        </a>
        . We acknowledge within 2 working days and confirm a fix or mitigation timeline within 7.
      </>
    ),
  },
];

type ComplianceItem = {
  status: "live" | "available" | "roadmap";
  title: string;
  body: string;
};

const complianceItems: ComplianceItem[] = [
  {
    status: "live",
    title: "Singapore PDPA",
    body: "The data model is designed against Singapore PDPA from day one — clinics remain the data controller; Oralstack acts as data intermediary. Tenant-isolated, region-hosted, consent-tracked.",
  },
  {
    status: "live",
    title: "HIPAA Privacy & Security Rule alignment",
    body: "The platform is built against HIPAA Privacy/Security Rule requirements (administrative, physical, and technical safeguards). Not yet HIPAA-attested by a third party — that is on the 2026 roadmap.",
  },
  {
    status: "available",
    title: "Business Associate Agreement (BAA)",
    body: "A BAA is available for clinics that require one. Contact hello@oralstack.com to request the current draft for legal review before pilot signing.",
  },
  {
    status: "available",
    title: "Data Processing Agreement (DPA)",
    body: "A DPA is available for clinics with PDPA, GDPR, or other data-protection-regulation obligations. Includes the controller/processor role model, subprocessor list, and SCC reference where applicable.",
  },
  {
    status: "roadmap",
    title: "SOC 2 Type II",
    body: "Targeted for second half of 2026. We're tracking the controls today, with a third-party auditor selection in Q3.",
  },
  {
    status: "roadmap",
    title: "HIPAA third-party attestation",
    body: "Targeted alongside the SOC 2 audit — a single audit window covering both frameworks where the controls overlap.",
  },
];

const legalDocs = [
  {
    label: "Marketing-site privacy notice",
    detail: "Cookie policy, marketing analytics, contact-form data — covers oralstack.com only.",
    href: "/privacy",
  },
  {
    label: "Marketing-site terms",
    detail: "Terms of use for the public marketing site.",
    href: "/terms",
  },
  {
    label: "Master Service Agreement (product)",
    detail: "Pilot and production customer contract. Sent on request.",
    href: "mailto:hello@oralstack.com?subject=Oralstack%20MSA%20request",
    external: true,
  },
  {
    label: "Data Processing Agreement",
    detail: "Controller / processor role model, subprocessors, SCCs. Sent on request.",
    href: "mailto:hello@oralstack.com?subject=Oralstack%20DPA%20request",
    external: true,
  },
  {
    label: "Business Associate Agreement",
    detail: "For clinics requiring HIPAA-aligned safeguards.",
    href: "mailto:hello@oralstack.com?subject=Oralstack%20BAA%20request",
    external: true,
  },
  {
    label: "Subprocessor list",
    detail:
      "Google Cloud (Singapore region · primary infra), Cloudflare (CDN, marketing site), Resend (transactional email), Twilio (SMS fallback), WhatsApp Business via Meta. Updated alongside the DPA.",
    href: "mailto:hello@oralstack.com?subject=Subprocessor%20list%20request",
    external: true,
  },
];

export default function SecurityPage() {
  return (
    <main>
      <PageHeader eyebrow="Trust" title="Security & compliance." />

      <Section className="pb-12">
        <p className="max-w-[68ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack handles dental clinic records. Security is part of how the product is built —
          not a checkbox at the end. This page describes our current posture honestly. Where we are
          working toward a control rather than already meeting it, we say so. Reviewed quarterly;
          last reviewed 28 April 2026.
        </p>
      </Section>

      <Section className="pb-12">
        <SectionGroup
          eyebrow="Where data lives"
          heading="Region-hosted, tenant-isolated, encrypted end-to-end."
          items={whereDataLives}
        />
      </Section>

      <Section className="pb-12">
        <SectionGroup
          eyebrow="How access is controlled"
          heading="MFA, role-based access, an audit log engineers cannot disable."
          items={accessControl}
        />
      </Section>

      <Section className="pb-12">
        <SectionGroup
          eyebrow="Backups, recovery, and incidents"
          heading="Daily backups, tested restores, public status, vulnerability disclosure."
          items={reliability}
        />
      </Section>

      <Section className="pb-16">
        <div className="grid gap-6 max-w-[920px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Compliance posture
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[40ch]">
            What's in place today, what's available on request, what's on the roadmap.
          </h2>
          <ul className="grid gap-3">
            {complianceItems.map((c) => (
              <li
                key={c.title}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 md:p-6"
              >
                <ComplianceStatusPill status={c.status} />
                <div className="grid gap-1">
                  <p className="text-sm font-semibold text-[var(--color-text)]">{c.title}</p>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
            We don't claim certifications we haven't earned. The roadmap items above are tracked
            transparently and updated on this page.
          </p>
        </div>
      </Section>

      <Section className="pb-16">
        <div className="grid gap-6 max-w-[920px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Legal documents
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[40ch]">
            Contracts, processing agreements, and the subprocessor list.
          </h2>
          <ul className="grid gap-2">
            {legalDocs.map((d) => (
              <li key={d.label}>
                <a
                  href={d.href}
                  className="group grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4 items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-5 py-4 hover:border-[var(--color-ink)] transition-colors"
                >
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center h-9 w-9 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]"
                  >
                    <ScrollText className="size-4" />
                  </span>
                  <span className="grid gap-0.5">
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {d.label}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] leading-snug">
                      {d.detail}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 text-[var(--color-text-soft)] group-hover:text-[var(--color-ink)] transition-colors"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
            The marketing-site Privacy and Terms cover oralstack.com only. Product customers sign
            the MSA and any required BAA / DPA before pilot start.
          </p>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-10 md:px-12 md:py-14 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center max-w-[920px]">
          <span
            aria-hidden
            className="inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-md)] bg-white text-[var(--color-text-muted)]"
          >
            <Mail className="size-6" />
          </span>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Security questionnaire or controls walkthrough?
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
              Procurement teams can request a completed security questionnaire (CAIQ-Lite or your
              own template) and a 30-minute controls walkthrough with the engineer who runs the
              infrastructure. Two working days for a first response.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:security@oralstack.com?subject=Security%20questionnaire%20request"
              className="inline-flex items-center gap-1 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              security@oralstack.com <ArrowRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function SectionGroup({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: CardItem[];
}) {
  return (
    <div className="grid gap-6 max-w-[920px]">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[40ch]">{heading}</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6"
            >
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                <Icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ComplianceStatusPill({ status }: { status: ComplianceItem["status"] }) {
  const map: Record<
    ComplianceItem["status"],
    { label: string; bg: string; fg: string; border: string; Icon: typeof BadgeCheck }
  > = {
    live: {
      label: "Live",
      bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
      fg: "text-[var(--color-tide-deep)]",
      border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
      Icon: BadgeCheck,
    },
    available: {
      label: "Available",
      bg: "bg-white",
      fg: "text-[var(--color-text)]",
      border: "border-[var(--color-border-strong)]",
      Icon: BadgeCheck,
    },
    roadmap: {
      label: "Roadmap",
      bg: "bg-[oklch(0.95_0.06_75)]",
      fg: "text-[oklch(0.45_0.13_75)]",
      border: "border-[oklch(0.78_0.13_75/0.5)]",
      Icon: BadgeCheck,
    },
  };
  const t = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 self-start text-[10px] uppercase tracking-[0.1em] font-semibold rounded-full border px-2 py-0.5 whitespace-nowrap ${t.bg} ${t.fg} ${t.border}`}
    >
      <t.Icon className="size-2.5" aria-hidden />
      {t.label}
    </span>
  );
}
