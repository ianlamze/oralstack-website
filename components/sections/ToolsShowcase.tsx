import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  CalendarClock,
  ClipboardList,
  FileText,
  FolderOpen,
  Inbox,
  Landmark,
  PackageSearch,
  Receipt,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/primitives/Section";

type ModuleCard = {
  href: string;
  title: string;
  blurb: string;
  Icon: LucideIcon;
};

type ModuleBand = {
  id: string;
  heading: string;
  blurb: string;
  modules: ModuleCard[];
};

const moduleBands: ModuleBand[] = [
  {
    id: "clinic-day",
    heading: "Run the clinic day",
    blurb: "The same operational surfaces staff see in the current app.",
    modules: [
      {
        href: "/tools#run-the-day",
        title: "My Day & Command",
        blurb: "Personal queue, clinic status, risks, and next actions.",
        Icon: CalendarClock,
      },
      {
        href: "/tools#run-the-day",
        title: "Appointments",
        blurb: "Plato-connected staff booking, availability, and schedule work.",
        Icon: ClipboardList,
      },
      {
        href: "/tools#run-the-day",
        title: "Inbox & Requests",
        blurb: "Patient messages, admin tasks, and treatment follow-up.",
        Icon: Inbox,
      },
      {
        href: "/tools#run-the-day",
        title: "Reception to checkout",
        blurb: "Arrival, queue, chair hand-off, payment recording, and receipt.",
        Icon: Receipt,
      },
    ],
  },
  {
    id: "patient-care",
    heading: "Work with the patient",
    blurb: "One folder for the clinical record and the visit context around it.",
    modules: [
      {
        href: "/tools#patient-care",
        title: "Patient folder",
        blurb: "Timeline, visits, billing, subsidy, membership, and admin.",
        Icon: FolderOpen,
      },
      {
        href: "/tools#patient-care",
        title: "Chart, perio & notes",
        blurb: "FDI charting, full-mouth perio sessions, and signed notes.",
        Icon: Stethoscope,
      },
      {
        href: "/tools#patient-care",
        title: "Plans, Rx & letters",
        blurb: "Staff-side treatment planning, prescriptions, and correspondence.",
        Icon: FileText,
      },
      {
        href: "/tools#patient-access",
        title: "Patient access",
        blurb: "Intake, portal, find-a-time requests, and secure messages.",
        Icon: UserRoundCheck,
      },
    ],
  },
  {
    id: "operations",
    heading: "Manage clinic operations",
    blurb: "Purpose-built workspaces for the practice manager and back office.",
    modules: [
      {
        href: "/tools#checkout-money",
        title: "Money & receivables",
        blurb: "Billing, deposits, claims tracking, and AR follow-up worklists.",
        Icon: Receipt,
      },
      {
        href: "/tools#clinic-operations",
        title: "Finance & labs",
        blurb: "Lab suppliers, invoices, cases, contracts, and payroll runs.",
        Icon: Landmark,
      },
      {
        href: "/tools#clinic-operations",
        title: "Inventory",
        blurb: "Stock, receiving, reorders, recipes, and estimated usage.",
        Icon: Boxes,
      },
      {
        href: "/tools#clinic-operations",
        title: "Staff ops",
        blurb: "Time, corrections, timesheets, commissions, and payroll export.",
        Icon: Users,
      },
    ],
  },
  {
    id: "management",
    heading: "See and govern the group",
    blurb: "Manager visibility with clinic scope and access controls attached.",
    modules: [
      {
        href: "/tools#insights",
        title: "Insights & reports",
        blurb: "KPIs, daily close, receivables, provider views, and CSV export.",
        Icon: BarChart3,
      },
      {
        href: "/tools#organization-security",
        title: "Organization",
        blurb: "Staff access, authorized clinic switching, and group rollups.",
        Icon: Building2,
      },
      {
        href: "/tools#organization-security",
        title: "Sync & audit",
        blurb: "Connection health, reviewed writebacks, and action history.",
        Icon: ShieldCheck,
      },
      {
        href: "/tools#clinic-operations",
        title: "Inventory usage",
        blurb: "Estimated material consumption from completed procedures.",
        Icon: PackageSearch,
      },
    ],
  },
];

export default function ToolsShowcase() {
  return (
    <Section className="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] py-20 md:py-24">
      <div className="mb-10 grid max-w-[760px] gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Inside the app
        </p>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          The modules your team can actually open.
        </h2>
        <p className="max-w-[64ch] leading-relaxed text-[var(--color-text-muted)]">
          This inventory follows Oralstack v2&apos;s real navigation. It deliberately excludes
          dark-launched integrations and interactive marketing concepts from the shipped feature
          count.
        </p>
      </div>

      <div className="grid gap-12 md:gap-14">
        {moduleBands.map((band) => (
          <section key={band.id} aria-labelledby={`module-band-${band.id}`}>
            <header className="mb-4 flex flex-wrap items-baseline gap-3">
              <h3
                id={`module-band-${band.id}`}
                className="text-base font-semibold tracking-tight text-[var(--color-text)] md:text-lg"
              >
                {band.heading}
              </h3>
              <p className="max-w-[60ch] text-[13px] leading-snug text-[var(--color-text-muted)]">
                {band.blurb}
              </p>
            </header>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {band.modules.map(({ href, title, blurb, Icon }) => (
                <li key={`${href}-${title}`}>
                  <a
                    href={href}
                    className="card-hover group block h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 shadow-[var(--shadow-1)]"
                  >
                    <span className="mb-3 flex size-9 items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-tide)_28%,transparent)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)]">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h4 className="text-base font-semibold leading-snug tracking-tight text-[var(--color-text)]">
                      {title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-snug text-[var(--color-text-muted)]">
                      {blurb}
                    </p>
                    <p className="card-arrow mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-tide-deep)]">
                      See current scope <ArrowRight className="size-3" aria-hidden />
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="/tools"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
        >
          Open the complete feature guide <ArrowRight className="size-3" aria-hidden />
        </a>
        <p className="text-xs text-[var(--color-text-soft)]">
          Availability can depend on clinic connection and role permissions.
        </p>
      </div>
    </Section>
  );
}
