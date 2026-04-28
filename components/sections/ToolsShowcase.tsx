import {
  Activity,
  ArrowRight,
  BarChart3,
  Calculator,
  Clock,
  LayoutGrid,
  ReceiptText,
  Stethoscope,
  Users,
} from "lucide-react";
import Section from "@/components/primitives/Section";

type Persona = "front-desk" | "clinical" | "hygienist" | "owner" | "all";

type ToolCard = {
  href: string;
  title: string;
  blurb: string;
  Icon: typeof Calculator;
  persona: Persona;
};

// Source-of-truth blurbs match the long-form versions on /tools but are
// trimmed to a single line for homepage density. Update both if you change
// the framing of a tool.
const TOOLS: ToolCard[] = [
  {
    href: "/tools/treatment-plan-builder",
    title: "Treatment plan builder",
    blurb: "Click teeth, add procedures, see the bill before treatment.",
    Icon: Stethoscope,
    persona: "clinical",
  },
  {
    href: "/tools/perio-chart",
    title: "Periodontal chart",
    blurb: "Click any site to record probing depth — flag what needs attention.",
    Icon: Activity,
    persona: "hygienist",
  },
  {
    href: "/tools/waitlist-auto-fill",
    title: "Waitlist auto-fill",
    blurb: "Patient cancels at 11:00 — see the slot fill itself.",
    Icon: Users,
    persona: "front-desk",
  },
  {
    href: "/tools/eligibility-estimate",
    title: "Eligibility & estimate",
    blurb: "Pick CHAS tier + insurance — see the patient's portion before treatment.",
    Icon: ReceiptText,
    persona: "front-desk",
  },
  {
    href: "/tools/daily-huddle",
    title: "Daily huddle dashboard",
    blurb: "The owner's morning view — schedule, recall, AR, production at a glance.",
    Icon: LayoutGrid,
    persona: "owner",
  },
  {
    href: "/tools/management-report",
    title: "Management report",
    blurb: "Strategic view — KPIs over time, category breakdown, provider heatmap.",
    Icon: BarChart3,
    persona: "owner",
  },
  {
    href: "/tools/no-show-calculator",
    title: "No-show revenue calculator",
    blurb: "Model the revenue your clinic loses to no-shows today.",
    Icon: Calculator,
    persona: "owner",
  },
  {
    href: "/tools/day-in-the-life",
    title: "Day in the life",
    blurb: "Walk through a typical clinic day, station by station.",
    Icon: Clock,
    persona: "all",
  },
];

const personaLabel: Record<Persona, string> = {
  "front-desk": "Front desk",
  clinical: "Clinical",
  hygienist: "Hygienist",
  owner: "Owner",
  all: "All",
};

const personaDot: Record<Persona, string> = {
  "front-desk": "color-mix(in oklch, var(--color-sea), var(--color-ink) 25%)",
  clinical: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 25%)",
  hygienist: "color-mix(in oklch, var(--color-violet), var(--color-ink) 25%)",
  owner: "color-mix(in oklch, var(--color-tide-deep), var(--color-ink) 10%)",
  all: "var(--color-text-soft)",
};

export default function ToolsShowcase() {
  return (
    <Section className="py-20 md:py-24">
      <div className="grid gap-3 mb-8 max-w-[760px]">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Try before you talk
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Eight interactive tools, no signup.
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
          Every persona on your team has something to play with before a demo call. Each tool runs
          live in your browser — drag, click, fill the slot, chart the tooth, drill the pane.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map(({ href, title, blurb, Icon, persona }) => (
          <li key={href}>
            <a
              href={href}
              className="card-hover group block h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: personaDot[persona] }}
                />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                  {personaLabel[persona]}
                </span>
              </div>
              <span className="flex size-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)] mb-3">
                <Icon className="size-4" aria-hidden />
              </span>
              <h3 className="text-base font-semibold tracking-tight text-[var(--color-text)] leading-snug">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-muted)] leading-snug">{blurb}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-tide-deep)] card-arrow">
                Try the demo <ArrowRight className="size-3" aria-hidden />
              </p>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <a
          href="/tools"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
        >
          See all tools <ArrowRight className="size-3" aria-hidden />
        </a>
      </div>
    </Section>
  );
}
