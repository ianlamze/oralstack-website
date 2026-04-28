import type { Metadata } from "next";
import { CheckCircle2, Circle, Clock, RotateCcw } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Status",
  description:
    "Current platform status, target uptime, maintenance window policy, and incident response posture for Oralstack — region-hosted in Singapore, on Cloudflare Pages and Google Cloud.",
  alternates: { canonical: "/status" },
};

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

type Service = {
  name: string;
  detail: string;
  status: ServiceStatus;
};

const services: Service[] = [
  {
    name: "Marketing site",
    detail: "oralstack.com · Cloudflare Pages",
    status: "operational",
  },
  {
    name: "Application API",
    detail: "Singapore (asia-southeast1) · Google Cloud",
    status: "operational",
  },
  {
    name: "Database & audit log",
    detail: "Postgres + tenant RLS · Singapore",
    status: "operational",
  },
  {
    name: "Email delivery",
    detail: "Resend · transactional + recall",
    status: "operational",
  },
  {
    name: "WhatsApp Business API",
    detail: "Singapore-routed · templated messages",
    status: "operational",
  },
  {
    name: "Sensor bridge",
    detail: "Carestream · Dexis · Sopro · Schick",
    status: "operational",
  },
];

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");
  const updatedAt = "28 Apr 2026 · checked manually";

  return (
    <main>
      <PageHeader eyebrow="Status" title="Platform status." />

      <Section className="pb-10">
        <div
          className={`rounded-[var(--radius-xl)] border p-6 md:p-8 grid gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center ${
            allOperational
              ? "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)]"
              : "border-[oklch(0.62_0.18_25/0.4)] bg-[oklch(0.62_0.18_25/0.06)]"
          }`}
        >
          <span
            className={`inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-md)] ${
              allOperational
                ? "bg-white text-[var(--color-tide-deep)]"
                : "bg-white text-[oklch(0.45_0.18_25)]"
            }`}
            aria-hidden
          >
            <CheckCircle2 className="size-5" />
          </span>
          <div>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              {allOperational ? "All systems operational" : "Degraded service"}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">Last checked {updatedAt}.</p>
          </div>
          <p className="md:justify-self-end text-xs text-[var(--color-text-muted)] tracking-[0.04em]">
            Reports update on incident · email{" "}
            <a
              href="mailto:status@oralstack.com"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              status@oralstack.com
            </a>{" "}
            for live confirmation.
          </p>
        </div>
      </Section>

      <Section className="pb-12">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)] mb-4">
          Services
        </p>
        <ul className="grid gap-2 max-w-[820px]">
          {services.map((s) => (
            <li
              key={s.name}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4 items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3"
            >
              <StatusDot status={s.status} />
              <div className="grid gap-0.5 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text)]">{s.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] truncate">{s.detail}</p>
              </div>
              <StatusPill status={s.status} />
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pb-16">
        <div className="grid gap-8 md:grid-cols-2 max-w-[820px]">
          <Block
            heading="Target uptime"
            body="Our target is 99.9% monthly uptime across the application API and database, measured from successful health-check responses every 60 seconds. Pre-production today; the first paid clinic goes live on the v13 cohort, and from that date this page logs every incident."
          />
          <Block
            heading="Scheduled maintenance"
            body="Maintenance windows are announced at least 48 hours in advance via email to the named clinic contact. Routine deploys (multiple per day) ship continuously and never require downtime — the static site rolls forward atomically; the API is rolled with zero-downtime deploys."
          />
          <Block
            heading="Backup & recovery"
            body="Daily encrypted backups with point-in-time recovery. Restore RPO target: 15 minutes. RTO target: 1 hour. We run integrity-verified restore drills on a fixed cadence — see the backup section on the security page."
          />
          <Block
            heading="Incident response"
            body="The on-call engineer is paged on health-check failure, error-rate spikes, or a sustained latency regression. Acknowledgment within 15 minutes for severity-1 incidents during operating hours; within 60 minutes outside them. Customer-affecting incidents are reported here within an hour and post-mortems published within seven days."
          />
        </div>
      </Section>

      <Section className="pb-12">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)] mb-4">
          Recent history
        </p>
        <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] p-6 md:p-8 max-w-[820px] grid gap-2">
          <p className="text-sm text-[var(--color-text)] inline-flex items-center gap-2">
            <Clock className="size-4 text-[var(--color-text-soft)]" aria-hidden />
            No customer-affecting incidents to report.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
            Pre-revenue today; this log starts from the first paid clinic going live on the v13
            cohort. Each incident, once logged, gets a timeline (detected → mitigated → resolved)
            and a post-mortem link.
          </p>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-8 py-10 md:px-12 md:py-12 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center max-w-[920px]">
          <span
            aria-hidden
            className="inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]"
          >
            <RotateCcw className="size-5" />
          </span>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Subscribing to status updates
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
              Customer admins are notified by email and (optionally) WhatsApp Business when an
              incident is opened on a service their clinic depends on. Email{" "}
              <a
                href="mailto:status@oralstack.com"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                status@oralstack.com
              </a>{" "}
              to enrol another address or to ask for the post-mortem template.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/security"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-ink)] transition-colors"
            >
              Security posture →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function StatusDot({ status }: { status: ServiceStatus }) {
  const tone =
    status === "operational"
      ? "bg-[var(--color-tide-deep)]"
      : status === "degraded"
        ? "bg-[oklch(0.78_0.13_75)]"
        : status === "outage"
          ? "bg-[oklch(0.62_0.18_25)]"
          : "bg-[var(--color-text-soft)]";
  return (
    <span aria-hidden className="inline-flex h-3 w-3 items-center justify-center">
      <Circle className={`h-3 w-3 ${tone} rounded-full`} fill="currentColor" />
    </span>
  );
}

function StatusPill({ status }: { status: ServiceStatus }) {
  const map: Record<ServiceStatus, { label: string; bg: string; fg: string; border: string }> = {
    operational: {
      label: "Operational",
      bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
      fg: "text-[var(--color-tide-deep)]",
      border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
    },
    degraded: {
      label: "Degraded",
      bg: "bg-[oklch(0.95_0.06_75)]",
      fg: "text-[oklch(0.45_0.13_75)]",
      border: "border-[oklch(0.78_0.13_75/0.5)]",
    },
    outage: {
      label: "Outage",
      bg: "bg-[oklch(0.62_0.18_25/0.08)]",
      fg: "text-[oklch(0.45_0.18_25)]",
      border: "border-[oklch(0.62_0.18_25/0.4)]",
    },
    maintenance: {
      label: "Maintenance",
      bg: "bg-[var(--color-canvas-tinted)]",
      fg: "text-[var(--color-text-muted)]",
      border: "border-[var(--color-border)]",
    },
  };
  const t = map[status];
  return (
    <span
      className={`inline-flex items-center text-[10px] uppercase tracking-[0.1em] font-semibold rounded-full border px-2 py-0.5 whitespace-nowrap ${t.bg} ${t.fg} ${t.border}`}
    >
      {t.label}
    </span>
  );
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="grid gap-2">
      <h2 className="text-base font-semibold tracking-tight text-[var(--color-text)]">{heading}</h2>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{body}</p>
    </div>
  );
}
