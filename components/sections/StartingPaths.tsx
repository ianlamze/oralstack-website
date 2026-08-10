import { ArrowRight } from "lucide-react";
import Section from "@/components/primitives/Section";

const paths = [
  {
    step: "01",
    title: "Set up a new clinic",
    body: "Configure the clinic, team, schedule, patient record, and checkout path in Oralstack through guided setup.",
    href: "/switching/#start-new",
    cta: "See the new-clinic path",
  },
  {
    step: "02",
    title: "Move the records you need",
    body: "Start from paper, spreadsheets, or another practice system with a reviewed source inventory and validation plan.",
    href: "/switching/#move-records",
    cta: "See the move path",
  },
  {
    step: "03",
    title: "Keep an optional connection",
    body: "Use a supported existing-system connection where it fits, with record ownership and change status kept explicit.",
    href: "/switching/#keep-connection",
    cta: "See the connection path",
  },
] as const;

export default function StartingPaths() {
  return (
    <Section
      data-testid="starting-paths"
      aria-labelledby="starting-paths-heading"
      className="border-y border-[var(--color-border)] bg-[var(--color-canvas-tinted)] py-14 md:py-18"
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
            Choose how you start
          </p>
          <h2
            id="starting-paths-heading"
            className="mt-3 max-w-[24ch] text-2xl font-semibold tracking-tight md:text-3xl"
          >
            Start Oralstack without another PMS.
          </h2>
        </div>
        <p className="max-w-[58ch] text-sm leading-relaxed text-[var(--color-text-muted)] md:justify-self-end">
          Start a clinic in Oralstack, move forward from your current records, or keep an optional
          connection. Every route begins with the clinic workflow and a documented ownership plan.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {paths.map((path) => (
          <a
            key={path.step}
            href={path.href}
            className="group flex min-h-[220px] flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 transition-colors hover:border-[var(--color-border-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] md:p-7"
          >
            <span className="text-sm tabular-nums text-[var(--color-text-muted)]">{path.step}</span>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--color-text)]">
              {path.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {path.body}
            </p>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-[var(--color-tide-deep)]">
              {path.cta}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
