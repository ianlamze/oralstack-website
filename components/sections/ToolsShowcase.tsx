import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  CalendarCheck,
  Calculator,
  Clock,
  FileCheck,
  FileSignature,
  FlaskConical,
  LayoutGrid,
  type LucideIcon,
  MessageSquare,
  Package,
  ReceiptCent,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Section from "@/components/primitives/Section";

type ToolCard = {
  href: string;
  title: string;
  blurb: string;
  Icon: LucideIcon;
};

type Band = {
  id: string;
  heading: string;
  blurb: string;
  accent: string; // CSS color expression for the band marker
  tools: ToolCard[];
};

// Source-of-truth blurbs match the long-form versions on /tools but are
// trimmed to a single line for homepage density. Update both if you change
// the framing of a tool.
const BANDS: Band[] = [
  {
    id: "front-desk",
    heading: "For the front desk",
    blurb: "Patients book themselves in. Slots fill themselves. The clinic phone goes quiet.",
    accent: "color-mix(in oklch, var(--color-sea), var(--color-ink) 25%)",
    tools: [
      {
        href: "/tools/online-booking",
        title: "Online booking",
        blurb: "Patients pick from real chair availability — no double-bookings.",
        Icon: CalendarCheck,
      },
      {
        href: "/tools/waitlist-auto-fill",
        title: "Waitlist auto-fill",
        blurb: "Patient cancels at 11:00 — see the slot fill itself.",
        Icon: Users,
      },
      {
        href: "/tools/patient-communications",
        title: "Patient communications",
        blurb: "WhatsApp threads, templated replies, audit-logged on send.",
        Icon: MessageSquare,
      },
      {
        href: "/tools/eligibility-estimate",
        title: "Eligibility & estimate",
        blurb: "CHAS + insurance + procedures — patient portion live.",
        Icon: ReceiptText,
      },
    ],
  },
  {
    id: "clinical",
    heading: "For the clinical team",
    blurb: "Charting, planning, presenting, tracking — every step ties back to the patient.",
    accent: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 25%)",
    tools: [
      {
        href: "/tools/treatment-plan-builder",
        title: "Treatment plan builder",
        blurb: "Click teeth, add procedures, see the bill before treatment.",
        Icon: Stethoscope,
      },
      {
        href: "/tools/plan-presentation",
        title: "Plan presentation & e-sign",
        blurb: "Patient toggles phases, signs on the iPad — clinic notified.",
        Icon: FileSignature,
      },
      {
        href: "/tools/perio-chart",
        title: "Periodontal chart",
        blurb: "Click any site to record probing depth.",
        Icon: Activity,
      },
      {
        href: "/tools/medical-alerts",
        title: "Patient medical alerts",
        blurb: "Allergies, meds, conditions — surfaced where it matters.",
        Icon: ShieldAlert,
      },
      {
        href: "/tools/lab-orders",
        title: "Lab order tracking",
        blurb: "Crowns and bridges from sent to seated — slip-aware.",
        Icon: FlaskConical,
      },
      {
        href: "/tools/sterilization",
        title: "Sterilisation traceability",
        blurb: "Cycle to tray to patient — recall list ready in seconds.",
        Icon: ShieldCheck,
      },
    ],
  },
  {
    id: "back-office",
    heading: "Billing, claims & back office",
    blurb: "What the bookkeeper, the practice manager, and the auditor each need — settled.",
    accent: "color-mix(in oklch, var(--color-tide-deep), var(--color-ink) 10%)",
    tools: [
      {
        href: "/tools/end-of-day-reconciliation",
        title: "End-of-day reconciliation",
        blurb: "Variance flagged → matched → ledger pushed to Xero.",
        Icon: ReceiptCent,
      },
      {
        href: "/tools/insurance-claims",
        title: "Insurance claims & MediSave",
        blurb: "Procedure done → claim auto-packaged → status flows back.",
        Icon: FileCheck,
      },
      {
        href: "/tools/inventory",
        title: "Inventory & consumables",
        blurb: "Auto-deduct on procedure; reorder before stock runs out.",
        Icon: Package,
      },
      {
        href: "/tools/provider-productivity",
        title: "Provider productivity",
        blurb: "Associate production, commission, hygienist recall credit.",
        Icon: BadgeDollarSign,
      },
    ],
  },
  {
    id: "owner",
    heading: "For the owner",
    blurb: "Morning view, strategic view, ROI math — the same data, different lenses.",
    accent: "color-mix(in oklch, var(--color-violet), var(--color-ink) 25%)",
    tools: [
      {
        href: "/tools/daily-huddle",
        title: "Daily huddle dashboard",
        blurb: "Schedule, recall, AR, production — at a glance.",
        Icon: LayoutGrid,
      },
      {
        href: "/tools/management-report",
        title: "Management report",
        blurb: "KPIs over time, AR aging, provider × procedure heatmap.",
        Icon: BarChart3,
      },
      {
        href: "/tools/no-show-calculator",
        title: "No-show revenue calculator",
        blurb: "Model the revenue your clinic loses to no-shows.",
        Icon: Calculator,
      },
      {
        href: "/tools/day-in-the-life",
        title: "Day in the life",
        blurb: "Walk through a typical clinic day, station by station.",
        Icon: Clock,
      },
      {
        href: "/tools/reviews-referrals",
        title: "Reviews & referrals",
        blurb: "Visit ends → review request fires → referrer credited.",
        Icon: Star,
      },
    ],
  },
];

const TOTAL_TOOLS = BANDS.reduce((sum, b) => sum + b.tools.length, 0);

export default function ToolsShowcase() {
  return (
    <Section className="py-20 md:py-24">
      <div className="grid gap-3 mb-10 max-w-[760px]">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Try before you talk
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {numberWord(TOTAL_TOOLS)} interactive tools, every role on your team.
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
          Drag the schedule, sign the plan, mark the spore-test, settle the commission — every
          persona on the clinic has something to play with before a demo call. Each one runs live in
          your browser.
        </p>
      </div>

      <div className="grid gap-12 md:gap-14">
        {BANDS.map((band) => (
          <section key={band.id} aria-labelledby={`band-${band.id}`}>
            <header className="mb-4 flex items-baseline gap-3 flex-wrap">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full shrink-0 translate-y-[-2px]"
                style={{ backgroundColor: band.accent }}
              />
              <h3
                id={`band-${band.id}`}
                className="text-base md:text-lg font-semibold tracking-tight text-[var(--color-text)]"
              >
                {band.heading}
              </h3>
              <p className="text-[13px] text-[var(--color-text-muted)] leading-snug max-w-[60ch]">
                {band.blurb}
              </p>
            </header>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {band.tools.map(({ href, title, blurb, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="card-hover group block h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5"
                  >
                    <span className="flex size-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)] mb-3">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h4 className="text-base font-semibold tracking-tight text-[var(--color-text)] leading-snug">
                      {title}
                    </h4>
                    <p className="mt-1.5 text-sm text-[var(--color-text-muted)] leading-snug">
                      {blurb}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-tide-deep)] card-arrow">
                      Try the demo <ArrowRight className="size-3" aria-hidden />
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="/tools"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
        >
          See all {TOTAL_TOOLS} tools <ArrowRight className="size-3" aria-hidden />
        </a>
      </div>
    </Section>
  );
}

function numberWord(n: number): string {
  const words: Record<number, string> = {
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
  };
  return words[n] ?? `${n}`;
}
