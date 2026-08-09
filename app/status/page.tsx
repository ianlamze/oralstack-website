import type { Metadata } from "next";
import { CheckCircle2, Circle, Clock, RotateCcw } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Status",
  description:
    "A dated Oralstack capability snapshot that separates available, clinic-configured, pilot, and not-enabled product paths.",
  alternates: { canonical: "/status" },
};

type CapabilityStatus = "available" | "configured" | "configured-pilot" | "not-enabled";

type Capability = {
  name: string;
  detail: string;
  status: CapabilityStatus;
};

const capabilities: Capability[] = [
  {
    name: "Plato-connected workflow path",
    detail:
      "Plato remains authoritative while Oralstack uses reviewed, status-visible paths for connected clinic records and supported appointment updates. Each clinic still requires a readiness review.",
    status: "configured",
  },
  {
    name: "Core application API and tenant database",
    detail:
      "Tenant RLS, a non-owner database role, and request-scoped clinic binding are evidenced.",
    status: "available",
  },
  {
    name: "Organization console and multi-clinic access",
    detail: "Organization RBAC, membership administration, and exact clinic access are evidenced.",
    status: "available",
  },
  {
    name: "Clinic insights and group rollups",
    detail: "Data-backed dashboards are available; inferred metrics are identified in the product.",
    status: "available",
  },
  {
    name: "Meta WhatsApp shared inbox",
    detail:
      "Requires clinic-owned Meta credentials, configuration, and a readiness review; automation is off.",
    status: "configured-pilot",
  },
  {
    name: "External AI provider workflows",
    detail:
      "Provider-backed transcription, note drafts, and perio assistance are not enabled in the latest snapshot.",
    status: "not-enabled",
  },
  {
    name: "Generic DICOMweb ingest and viewer",
    detail:
      "Built behind dark-launch controls; base, ingest, and calibrated-measurement flags are off.",
    status: "not-enabled",
  },
  {
    name: "SmartCMS, CHAS, and MediSave electronic submission",
    detail:
      "Local claim workflow exists, but the outbound government submission gateway is not connected.",
    status: "not-enabled",
  },
  {
    name: "Direct Xero posting",
    detail:
      "No direct OAuth or posting connection; reviewed finance CSV handoff is the supported path.",
    status: "not-enabled",
  },
  {
    name: "Google or Microsoft SSO and SCIM",
    detail: "External staff identity federation and SCIM provisioning are not enabled.",
    status: "not-enabled",
  },
];

export default function StatusPage() {
  return (
    <main>
      <PageHeader eyebrow="Status" title="Published capability snapshot." />

      <Section className="pb-10">
        <div
          data-testid="status-trust-actions"
          className="grid gap-3 rounded-[var(--radius-xl)] border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)] p-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:p-8"
        >
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-white text-[var(--color-tide-deep)]"
            aria-hidden
          >
            <CheckCircle2 className="size-5" />
          </span>
          <div>
            <p className="text-xl font-semibold tracking-tight text-[var(--color-text)] md:text-2xl">
              Evidence reviewed, not live-monitored
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Source reviewed through 6 August 2026 · production-flag snapshot recorded 20 July
              2026.
            </p>
          </div>
          <div className="grid gap-2 md:justify-items-end md:justify-self-end md:max-w-[32ch] md:text-right">
            <p className="text-xs tracking-[0.04em] text-[var(--color-text-muted)]">
              This page has no automated uptime feed. Request current evidence before a rollout or
              procurement decision.
            </p>
            <a
              href="/contact/?intent=security&source=status&request=deployment-status#request"
              className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              Request current confirmation →
            </a>
          </div>
        </div>
      </Section>

      <Section className="pb-12">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Capability evidence
        </p>
        <ul className="grid max-w-[920px] gap-2">
          {capabilities.map((capability) => (
            <li
              key={capability.name}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
            >
              <StatusDot status={capability.status} />
              <div className="grid min-w-0 gap-0.5">
                <p className="text-sm font-semibold text-[var(--color-text)]">{capability.name}</p>
                <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {capability.detail}
                </p>
              </div>
              <StatusPill status={capability.status} />
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pb-16">
        <div className="grid max-w-[920px] gap-8 md:grid-cols-2">
          <Block
            heading="Available"
            body="The surface is implemented and its required base controls are evidenced in the dated repository and production-state snapshot. This label does not assert current uptime for a particular deployment."
          />
          <Block
            heading="Available with clinic setup"
            body="The product path is implemented, but a clinic-specific connector, configuration, or scope review is required before staff can use it."
          />
          <Block
            heading="Configured pilot"
            body="The code path exists, but a clinic still needs external credentials, deployment configuration, and a readiness review. It is not represented as generally enabled."
          />
          <Block
            heading="Not enabled"
            body="The capability is unavailable in the latest recorded production configuration. Source code, tests, or a local workflow may exist without a live external connection."
          />
          <Block
            heading="Source of truth"
            body="Repository tests and the checked-in production-state record support this page. Because the flag snapshot is dated, current deployment state must be verified directly before a rollout decision."
          />
        </div>
      </Section>

      <Section className="pb-12">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Incident history
        </p>
        <div className="grid max-w-[920px] gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] p-6 md:p-8">
          <p className="inline-flex items-center gap-2 text-sm text-[var(--color-text)]">
            <Clock className="size-4 text-[var(--color-text-soft)]" aria-hidden />
            No live incident history is asserted from this page.
          </p>
          <p className="max-w-[68ch] text-xs leading-relaxed text-[var(--color-text-muted)]">
            Without an automated telemetry and incident feed, a static marketing page cannot prove
            current availability or the absence of an incident. Customer-specific incident records
            and notices are handled through the agreed support channel.
          </p>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid max-w-[920px] gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-8 py-10 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:px-12 md:py-12">
          <span
            aria-hidden
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]"
          >
            <RotateCcw className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Need a current deployment check?
            </h2>
            <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
              Ask for live confirmation before relying on this dated snapshot for procurement,
              rollout, or incident decisions. We will identify which evidence is current and which
              controls still require configuration.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/contact/?intent=security&source=status&request=deployment-status#request"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-ink)]"
            >
              Request confirmation →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}

function StatusDot({ status }: { status: CapabilityStatus }) {
  const tones: Record<CapabilityStatus, string> = {
    available: "bg-[var(--color-tide-deep)]",
    configured: "bg-[var(--color-sea)]",
    "configured-pilot": "bg-[oklch(0.78_0.13_75)]",
    "not-enabled": "bg-[var(--color-text-soft)]",
  };
  const tone = tones[status];
  return (
    <span aria-hidden className="inline-flex h-3 w-3 items-center justify-center">
      <Circle className={`h-3 w-3 rounded-full ${tone}`} fill="currentColor" />
    </span>
  );
}

function StatusPill({ status }: { status: CapabilityStatus }) {
  const map: Record<CapabilityStatus, { label: string; bg: string; fg: string; border: string }> = {
    available: {
      label: "Available",
      bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
      fg: "text-[var(--color-tide-deep)]",
      border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
    },
    configured: {
      label: "Available with clinic setup",
      bg: "bg-[color-mix(in_oklch,var(--color-sea),white_82%)]",
      fg: "text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_60%)]",
      border: "border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_24%)]",
    },
    "configured-pilot": {
      label: "Configured pilot",
      bg: "bg-[oklch(0.95_0.06_75)]",
      fg: "text-[oklch(0.45_0.13_75)]",
      border: "border-[oklch(0.78_0.13_75/0.5)]",
    },
    "not-enabled": {
      label: "Not enabled",
      bg: "bg-[var(--color-canvas-tinted)]",
      fg: "text-[var(--color-text-muted)]",
      border: "border-[var(--color-border)]",
    },
  };
  const tone = map[status];
  return (
    <span
      className={`col-start-2 inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] sm:col-start-auto ${tone.bg} ${tone.fg} ${tone.border}`}
    >
      {tone.label}
    </span>
  );
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="grid gap-2">
      <h2 className="text-base font-semibold tracking-tight text-[var(--color-text)]">{heading}</h2>
      <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{body}</p>
    </div>
  );
}
