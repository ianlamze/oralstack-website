import type { Metadata } from "next";
import { ArrowRight, Calculator, ClipboardCheck, GitCompare, Clock } from "lucide-react";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive tools for clinic owners weighing Oralstack — migration readiness check, no-show revenue calculator, side-by-side PMS comparison, and a day-in-the-life walkthrough.",
  alternates: { canonical: "/tools" },
};

type Tool = {
  href: string;
  title: string;
  blurb: string;
  body: string;
  Icon: typeof Calculator;
  takes: string;
};

const TOOLS: Tool[] = [
  {
    href: "/tools/migration-readiness",
    title: "Migration readiness check",
    blurb: "Estimate the cutover from your current PMS in four questions.",
    body: "Pick your PMS, sketch your clinic profile, tell us what data needs to come across, and see a defensible week-range estimate plus a tailored migration plan in your inbox.",
    Icon: ClipboardCheck,
    takes: "~ 90 seconds",
  },
  {
    href: "/tools/no-show-calculator",
    title: "No-show revenue calculator",
    blurb: "Model the revenue your clinic loses to no-shows today.",
    body: "Slide your chair count, no-show rate, and average appointment value. The calculator returns annual lost revenue and a modeled recovery range for clinics that adopt confirmed messaging and same-day rebook.",
    Icon: Calculator,
    takes: "~ 30 seconds",
  },
  {
    href: "/tools/compare-pms",
    title: "PMS comparison picker",
    blurb: "Stack up to three practice management systems side-by-side.",
    body: "Choose Plato, Open Dental, Dentrix, Eaglesoft, or Carestream — capabilities render as parallel columns next to Oralstack, with a link to the full long-form comparison for each.",
    Icon: GitCompare,
    takes: "~ 60 seconds",
  },
  {
    href: "/tools/day-in-the-life",
    title: "Day in the life",
    blurb: "Walk through a typical clinic day, station by station.",
    body: "Six moments from 08:30 to 17:45 — open the schedule, take a walk-in, bill at the chair, pull up DICOM, fire recall, close the day. Each stop shows the legacy-PMS cost and what changes with Oralstack.",
    Icon: Clock,
    takes: "~ 3 minutes",
  },
];

export default function ToolsIndexPage() {
  return (
    <main>
      <PageHeader eyebrow="Tools" title="Try the math before you book." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Four interactive tools for clinic owners and office managers weighing Oralstack. Each one
          runs in your browser, takes under three minutes, and gives you a number or a plan you can
          take to a partner before you talk to us.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ul className="grid gap-4 md:gap-5">
          {TOOLS.map(({ href, title, blurb, body, Icon, takes }) => (
            <li key={href}>
              <a
                href={href}
                className="card-hover group block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:gap-7">
                  <span className="flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="grid gap-2">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                      {title}
                    </h2>
                    <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                      {blurb}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {body}
                    </p>
                  </div>
                  <div className="grid gap-2 md:text-right">
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                      {takes}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-tide-deep)] md:justify-end card-arrow">
                      Open <ArrowRight className="size-3" aria-hidden />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
