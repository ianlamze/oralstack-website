import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CalendarClock,
  Receipt,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Product feature guide",
  description:
    "A current guide to the Oralstack app: clinic-day workflows, patient care, checkout, patient access, operations, insights, and organization controls.",
  alternates: { canonical: "/workflows" },
  robots: { index: false, follow: true },
};

type FeatureGroup = {
  id: string;
  title: string;
  blurb: string;
  features: string[];
  Icon: LucideIcon;
};

const featureGroups: FeatureGroup[] = [
  {
    id: "run-the-day",
    title: "Run the day",
    blurb: "Shared staff surfaces for the schedule, reception queue, hand-offs, and checkout.",
    features: [
      "My Day and Command workspaces",
      "Plato-connected appointments and staff booking",
      "Inbox, Requests, and Daily huddle",
      "Reception and Chairside modes",
      "Check-in, queue, seat, and checkout hand-offs",
    ],
    Icon: CalendarClock,
  },
  {
    id: "patient-care",
    title: "Patient care",
    blurb: "A unified patient folder for clinical work and the surrounding visit context.",
    features: [
      "Patient directory and recent-patient access",
      "Timeline, visits, billing, subsidy, membership, and admin views",
      "Chart, full-mouth perio, notes, and treatment plans",
      "Prescriptions, letters, and diagnoses",
      "Clinical media uploads, annotations, note links, and audit history",
    ],
    Icon: Stethoscope,
  },
  {
    id: "checkout-money",
    title: "Checkout & money",
    blurb: "Reviewed billing work that keeps the patient hand-off and Plato boundary visible.",
    features: [
      "Checkout queue and editable draft lines",
      "Catalogue and manual billable items",
      "CHAS tier and estimated payer portions",
      "Manual payment recording and receipts",
      "Billing, deposits, claims, and AR follow-up worklists",
    ],
    Icon: Receipt,
  },
  {
    id: "patient-access",
    title: "Patient access",
    blurb: "First-party patient surfaces with staff review where the schedule is affected.",
    features: [
      "Mobile intake and registration portal",
      "Patient portal for visit and account context",
      "Staff-approved find-a-time requests",
      "First-party secure patient messaging",
      "Singpass MyInfo intake where configured",
    ],
    Icon: UserRoundCheck,
  },
  {
    id: "clinic-operations",
    title: "Clinic operations",
    blurb: "The back-office modules managers use after the patient leaves the chair.",
    features: [
      "Finance workspace for lab suppliers, invoices, and cases",
      "Inventory stock, receiving, reorder requests, and estimated usage",
      "Staff time, corrections, timesheets, and payroll preparation",
      "Provider contracts, commissions, and payroll exports",
      "Engagement workspace and approved snippets",
    ],
    Icon: Boxes,
  },
  {
    id: "insights",
    title: "Insights",
    blurb: "Manager-facing views built from operational data, with estimates labeled as estimates.",
    features: [
      "Daily-huddle and clinic KPI views",
      "Booked and collected trends",
      "Receivables and daily-close reporting",
      "Today-only chair and provider utilization",
      "Provider performance and CSV export",
    ],
    Icon: BarChart3,
  },
  {
    id: "organization-security",
    title: "Organization & security",
    blurb: "Access, clinic scope, and traceability for teams operating more than one location.",
    features: [
      "Organization staff and access management",
      "Authorized clinic switching and group rollups",
      "Staff invites and self-serve password reset",
      "Role-based access and tenant isolation",
      "Sync health, audit trails, and Singapore-region hosting",
    ],
    Icon: Building2,
  },
];

const controlledRollouts = [
  "Public self-booking, instant confirmation, deposits, and waitlist auto-fill",
  "Automated WhatsApp/SMS reminders, campaigns, and live-send workers",
  "DICOM/DICOMweb ingest, device bridges, and calibrated measurements",
  "Integrated payment processing, refunds, self-checkout, and SmartCMS submission",
  "External AI scribe, autonomous charting, and generated clinical documents",
  "Patient treatment-plan sharing, acceptance, and visit summaries",
];

export default function ProductFeatureGuidePage() {
  return (
    <main>
      <PageHeader eyebrow="Product guide" title="What is in Oralstack today." />

      <Section className="pb-12">
        <p className="max-w-[64ch] text-lg leading-relaxed text-[var(--color-text-muted)]">
          Oralstack is a Plato-connected operations and clinical workflow layer. This guide follows
          the modules staff can open in the current app and keeps controlled rollouts separate from
          generally available workflows.
        </p>
      </Section>

      <Section className="pb-20 md:pb-28">
        <ul className="grid gap-5 md:grid-cols-2">
          {featureGroups.map(({ id, title, blurb, features, Icon }) => (
            <li
              key={id}
              id={id}
              className="scroll-mt-24 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 shadow-[var(--shadow-1)] md:p-8"
            >
              <div className="flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)]">
                <Icon className="size-5" aria-hidden />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-text)] md:text-2xl">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{blurb}</p>
              <ul className="mt-5 grid gap-2.5">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-[var(--color-tide-deep)]"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`/workflows#${id}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-tide-deep)]"
              >
                See the workflow <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:grid-cols-[auto_minmax(0,1fr)] md:p-10">
          <span className="flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] text-[var(--color-tide-deep)] shadow-[var(--shadow-1)]">
            <ShieldCheck className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-text-soft)]">
              Controlled rollouts
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Built or prototyped does not mean enabled.
            </h2>
            <p className="mt-3 max-w-[66ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
              The following areas have code, adapters, or interactive concepts, but are not
              presented as generally available in the current production scope.
            </p>
            <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
              {controlledRollouts.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-[var(--color-text-soft)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
