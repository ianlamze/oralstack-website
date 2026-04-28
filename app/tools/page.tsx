import type { Metadata } from "next";
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
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive tools for clinic owners weighing Oralstack — a no-show revenue calculator and a day-in-the-life walkthrough. Plus links to scoped widgets for migration timing, ROI, and PMS comparison.",
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
    href: "/tools/no-show-calculator",
    title: "No-show revenue calculator",
    blurb: "Model the revenue your clinic loses to no-shows today.",
    body: "Slide your chair count, no-show rate, and average appointment value. The calculator returns annual lost revenue and a modeled recovery range for clinics that adopt confirmed messaging and same-day rebook.",
    Icon: Calculator,
    takes: "~ 30 seconds",
  },
  {
    href: "/tools/day-in-the-life",
    title: "Day in the life",
    blurb: "Walk through a typical clinic day, station by station.",
    body: "Six moments from 08:30 to 17:45 — open the schedule, take a walk-in, bill at the chair, pull up DICOM, fire recall, close the day. Each stop shows the legacy-PMS cost and what changes with Oralstack.",
    Icon: Clock,
    takes: "~ 3 minutes",
  },
  {
    href: "/tools/treatment-plan-builder",
    title: "Treatment plan builder",
    blurb: "Click teeth, add procedures, see the bill before treatment.",
    body: "The spine of every dental treatment conversation. Pick from twelve common procedures across preventive, restorative, endo, surgical, and prosthetic. The plan card auto-phases by clinical priority and splits insurance from patient portion live, so you can present to the patient at the chair — not after.",
    Icon: Stethoscope,
    takes: "~ 1 minute",
  },
  {
    href: "/tools/waitlist-auto-fill",
    title: "Waitlist auto-fill",
    blurb: "Patient cancels at 11:00 — see the slot fill itself.",
    body: "When a cancel hits, the front desk has minutes — not hours — to fill the slot. Oralstack ranks the waitlist by procedure fit, slot length, distance, and recall age, then drafts a WhatsApp confirmation. Click ✕ on the 11:00 hygiene slot to walk through it.",
    Icon: Users,
    takes: "~ 30 seconds",
  },
  {
    href: "/tools/perio-chart",
    title: "Periodontal chart",
    blurb: "Click any site to record probing depth — flag what needs attention.",
    body: "Perio is the hygienist's daily workflow — depths per site, BoP per tooth, sites >4mm queued for follow-up. Most legacy PMSs treat it as a spreadsheet; Oralstack runs it inline next to the chart with WhatsApp recall templated off the findings.",
    Icon: Activity,
    takes: "~ 1 minute",
  },
  {
    href: "/tools/eligibility-estimate",
    title: "Eligibility & estimate",
    blurb: "Pick CHAS tier + insurance + procedures — see patient portion before treatment.",
    body: "The front desk's killer demo. CHAS subsidy by tier, IPP claim by plan, MediSave deduction for surgical procedures, GST, final number — all live as you toggle inputs. Solves the 'no surprise bill' patient experience pain at the chair.",
    Icon: ReceiptText,
    takes: "~ 1 minute",
  },
  {
    href: "/tools/daily-huddle",
    title: "Daily huddle dashboard",
    blurb: "The owner's morning-coffee view — schedule, recall, AR, production at a glance.",
    body: "Today's schedule with gaps marked, top recall opportunities, AR over 30 days, production goal vs. actual, hygiene re-care rate. Same data the front desk and clinical team see — different shape, owner-sized.",
    Icon: LayoutGrid,
    takes: "~ 30 seconds",
  },
  {
    href: "/tools/management-report",
    title: "Management report",
    blurb: "Strategic view — KPIs over time, category breakdown, AR aging, provider heatmap.",
    body: "The owner's strategic counterpart to the daily huddle: production / collection ratio / new patients / hygiene re-care over the period (7d / 30d / 90d / YTD), with sparklines, category-stacked production, AR aging bands, provider scorecard, and a provider × procedure heatmap that surfaces specialisation gaps.",
    Icon: BarChart3,
    takes: "~ 1 minute",
  },
];

const ELSEWHERE: { href: string; label: string; body: string }[] = [
  {
    href: "/pricing",
    label: "ROI on /pricing",
    body: "What does $200/clinic/month earn back? Calibrated to DFI Synergy's 60→85% same-day-billing lift.",
  },
  {
    href: "/compare",
    label: "Compare builder on /compare",
    body: "Pick the capabilities that matter to your clinic and the systems you're weighing — get a tailored side-by-side.",
  },
  {
    href: "/articles/plato-to-cloud-migration",
    label: "Migration estimator on the Plato → cloud article",
    body: "Pick your current system, chair count, and years of records. Get a sized cutover plan tied to the published three-week playbook.",
  },
];

export default function ToolsIndexPage() {
  return (
    <main>
      <PageHeader eyebrow="Tools" title="Try the math before you book." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Two interactive tools that don&apos;t fit naturally on another page. Each runs in your
          browser and gives you a number you can take to a partner before you talk to us.
        </p>
      </Section>

      <Section className="pb-16">
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

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Looking for migration timing, ROI, or a side-by-side?
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
            Three more interactive widgets live on the pages they belong to, where they have full
            context next to the rest of the argument.
          </p>
          <ul className="grid gap-3">
            {ELSEWHERE.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="group flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4 hover:border-[var(--color-text-soft)] transition-colors"
                >
                  <ArrowRight
                    className="mt-1 size-3.5 shrink-0 text-[var(--color-tide-deep)] card-arrow"
                    aria-hidden
                  />
                  <span className="grid gap-1">
                    <span className="text-sm font-medium text-[var(--color-text)]">{e.label}</span>
                    <span className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {e.body}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
