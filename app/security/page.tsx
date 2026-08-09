import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bug,
  ChevronDown,
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
    title: "Documented deployment · Singapore",
    body: "The latest repository deployment record places the application and primary data services in Google Cloud's Singapore region. Deployment-specific processors and outbound data paths are reconfirmed during procurement.",
  },
  {
    icon: Layers,
    title: "Tenant isolation · database-enforced",
    body: "Postgres Row-Level Security, a non-owner application role, and request-scoped clinic binding enforce tenant boundaries in the database. Isolation tests cover missing scope and cross-clinic access.",
  },
  {
    icon: FileLock2,
    title: "Encryption · layered controls",
    body: "Transport encryption and cloud-managed encryption at rest cover the deployed data services. Selected high-risk fields also use application-layer AES-256-GCM. We do not claim that every field is application-encrypted.",
  },
];

const accessControl: CardItem[] = [
  {
    icon: ShieldCheck,
    title: "Multi-factor authentication · supported",
    body: "TOTP enrolment, encrypted secret storage, and sign-in gates are implemented. The latest recorded production state does not enforce MFA for every staff account.",
  },
  {
    icon: Network,
    title: "Role and clinic-scoped access",
    body: "Active organization membership, bounded organization roles, and exact clinic access protect multi-clinic routes. Google and Microsoft SSO, SCIM, and granular custom-permission enforcement are not enabled in the latest recorded configuration.",
  },
  {
    icon: ScrollText,
    title: "Audit integrity · tamper-evident",
    body: "Audited actions are linked with an HMAC chain so integrity checks can detect alteration. The latest recorded production evidence also marks audit verification and immutable backup controls as active.",
  },
];

const reliability: CardItem[] = [
  {
    icon: DatabaseBackup,
    title: "Backups · recorded controls",
    body: "The latest production-state record marks immutable backup storage and audit-integrity verification as active. Recovery objectives, restore cadence, and deployment-specific evidence are confirmed during procurement.",
  },
  {
    icon: Activity,
    title: "Status & uptime",
    body: (
      <>
        The{" "}
        <a href="/status" className="text-[var(--color-tide-deep)] underline underline-offset-4">
          status page
        </a>{" "}
        publishes a dated capability snapshot and its evidence boundary. It is not presented as a
        live telemetry or uptime monitor.
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
        . Include a concise reproduction and a safe contact method. Response timing depends on
        severity and will be confirmed when the report is triaged.
      </>
    ),
  },
];

type ComplianceItem = {
  status: "implemented" | "in-progress" | "not-held";
  title: string;
  body: string;
};

const complianceItems: ComplianceItem[] = [
  {
    status: "implemented",
    title: "Security controls in the deployed stack",
    body: "Tenant RLS, audit-integrity checks, origin controls, managed encryption, and selected-field application encryption are evidenced in the latest recorded platform snapshot. These controls are not a certification.",
  },
  {
    status: "in-progress",
    title: "Singapore PDPA and CE-HIMS readiness",
    body: "The product is being developed to support Singapore privacy and health-system obligations. Formal CE-HIMS readiness work still has material open items, so Oralstack does not claim CE-HIMS certification or blanket PDPA compliance.",
  },
  {
    status: "in-progress",
    title: "External vulnerability assessment",
    body: "Internal security rehearsals and automated checks exist. A formal, accepted independent vulnerability assessment and penetration test is not yet evidenced as complete.",
  },
  {
    status: "not-held",
    title: "CE-HIMS certification",
    body: "Not currently held. Repository readiness materials record a no-go for certification submission until the remaining technical, operational, and evidence gaps are closed.",
  },
  {
    status: "not-held",
    title: "SOC 2, ISO 27001, and HIPAA attestation",
    body: "No SOC 2 report, ISO 27001 certification, or independent HIPAA attestation is claimed on this page.",
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
    label: "Product agreement",
    detail: "Request the current pilot or production terms for legal review.",
    href: "/contact/?intent=security&source=security&request=product-agreement#request",
  },
  {
    label: "Data processing terms",
    detail:
      "Confirm the current controller/intermediary terms and deployment scope during procurement.",
    href: "/contact/?intent=security&source=security&request=data-processing-terms#request",
  },
  {
    label: "Security evidence pack",
    detail: "Request the current control summary, open-gap register, and evidence review boundary.",
    href: "/contact/?intent=security&source=security&request=evidence-pack#request",
  },
  {
    label: "Deployment-specific subprocessor information",
    detail: "Request the current list for the services and optional providers in your deployment.",
    href: "/contact/?intent=security&source=security&request=subprocessor-information#request",
  },
];

const securitySections = [
  { href: "#data", label: "Data" },
  { href: "#access", label: "Access" },
  { href: "#reliability", label: "Recovery" },
  { href: "#compliance", label: "Compliance" },
  { href: "#documents", label: "Documents" },
];

const trustAtAGlance = [
  { term: "Evidence reviewed", detail: "Through 6 August 2026" },
  { term: "Deployment record", detail: "Singapore region" },
  { term: "Tenant boundary", detail: "Postgres RLS evidenced" },
  { term: "Attestations", detail: "CE-HIMS, SOC 2 and ISO 27001 not held" },
];

export default function SecurityPage() {
  return (
    <main>
      <PageHeader eyebrow="Trust" title="Security & compliance." />

      <Section className="pb-12">
        <p className="max-w-[68ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack handles dental clinic records, so its security claims need evidence and clear
          boundaries. This summary reflects repository evidence reviewed through 6 August 2026; the
          latest recorded production-flag snapshot is dated 20 July 2026. Deployment details must be
          reconfirmed during procurement.
        </p>
      </Section>

      <Section className="pb-12">
        <div
          data-testid="security-trust-actions"
          className="grid max-w-[920px] gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-8"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
                Start a review
              </p>
              <h2 className="mt-2 max-w-[28ch] text-2xl font-semibold tracking-tight md:text-3xl">
                Get the current evidence boundary for your clinic review.
              </h2>
              <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
                Tell us whether you need a questionnaire, controls walkthrough, agreement, data
                processing terms, subprocessor detail, or a current deployment check. The response
                will separate implemented controls from open work.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/contact/?intent=security&source=security&request=security-questionnaire#request"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
                >
                  Request security review <ArrowRight className="size-4" aria-hidden />
                </a>
                <a
                  href="/status"
                  className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-ink)]"
                >
                  View capability snapshot
                </a>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-2">
              {trustAtAGlance.map((item) => (
                <div
                  key={item.term}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4"
                >
                  <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                    {item.term}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug text-[var(--color-text)]">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <nav
            aria-label="Security page sections"
            className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-border)] pt-4"
          >
            <span className="w-full text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)] sm:w-auto">
              On this page
            </span>
            {securitySections.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--color-tide-deep)] underline decoration-[var(--color-border-strong)] underline-offset-4"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Section>

      <Section className="pb-12">
        <SectionGroup
          id="data"
          eyebrow="Where data lives"
          heading="Documented deployment, database-enforced tenant scope, layered encryption."
          items={whereDataLives}
        />
      </Section>

      <Section className="pb-12">
        <SectionGroup
          id="access"
          eyebrow="How access is controlled"
          heading="MFA support, scoped access, and tamper-evident audit integrity."
          items={accessControl}
        />
      </Section>

      <Section className="pb-12">
        <SectionGroup
          id="reliability"
          eyebrow="Backups, recovery, and incidents"
          heading="Recorded backup controls, a dated status snapshot, and a disclosure channel."
          items={reliability}
        />
      </Section>

      <Section className="pb-16">
        <ResponsiveSection
          id="compliance"
          eyebrow="Compliance posture"
          heading="Implemented controls are separate from readiness work and certifications not held."
          disclosureLabel="Review compliance evidence"
        >
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
          <p className="text-xs text-[var(--color-text-muted)] tracking-[0.04em]">
            “Implemented” describes evidenced product controls, not legal compliance, certification,
            or an independent attestation.
          </p>
        </ResponsiveSection>
      </Section>

      <Section className="pb-16">
        <ResponsiveSection
          id="documents"
          eyebrow="Legal documents"
          heading="Contracts, processing agreements, and the subprocessor list."
          disclosureLabel="Review documents and request paths"
        >
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
          <p className="text-xs text-[var(--color-text-muted)] tracking-[0.04em]">
            The marketing-site Privacy and Terms cover oralstack.com only. Product customers sign
            the current commercial and data-processing terms agreed for their deployment.
          </p>
        </ResponsiveSection>
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
              Procurement teams can request the current evidence boundary, open-gap register, a
              security questionnaire, and a controls walkthrough. We will distinguish implemented
              controls from planned work in the response.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/contact/?intent=security&source=security&request=security-questionnaire#request"
              className="inline-flex items-center gap-1 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Request security review <ArrowRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function SectionGroup({
  id,
  eyebrow,
  heading,
  items,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  items: CardItem[];
}) {
  return (
    <ResponsiveSection
      id={id}
      eyebrow={eyebrow}
      heading={heading}
      disclosureLabel={`Review ${eyebrow.toLowerCase()}`}
      defaultOpen={id === "data"}
    >
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
    </ResponsiveSection>
  );
}

function ResponsiveSection({
  id,
  eyebrow,
  heading,
  disclosureLabel,
  defaultOpen = false,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  disclosureLabel: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 grid max-w-[920px] gap-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        {eyebrow}
      </p>
      <h2 className="max-w-[40ch] text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h2>
      <details
        open={defaultOpen}
        className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4 md:hidden"
      >
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-4">
          {disclosureLabel}
          <ChevronDown
            className="size-4 shrink-0 transition-transform group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="mt-4">{children}</div>
      </details>
      <div className="hidden md:block">{children}</div>
    </section>
  );
}

function ComplianceStatusPill({ status }: { status: ComplianceItem["status"] }) {
  const map: Record<
    ComplianceItem["status"],
    { label: string; bg: string; fg: string; border: string; Icon: typeof BadgeCheck }
  > = {
    implemented: {
      label: "Implemented",
      bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
      fg: "text-[var(--color-tide-deep)]",
      border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
      Icon: BadgeCheck,
    },
    "in-progress": {
      label: "In progress",
      bg: "bg-white",
      fg: "text-[var(--color-text)]",
      border: "border-[var(--color-border-strong)]",
      Icon: BadgeCheck,
    },
    "not-held": {
      label: "Not held",
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
