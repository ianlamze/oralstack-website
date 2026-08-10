import { ArrowRight, Quote } from "lucide-react";
import AnimateInView from "@/components/motion/AnimateInView";
import Section from "@/components/primitives/Section";
import { dfiSynergy } from "@/content/case-studies/dfi-synergy";

const [timeToPilot, noneLost, dragOperations, sameDayBilling] = dfiSynergy.stats;
const pullQuote = dfiSynergy.pullQuoteMid ?? dfiSynergy.pullQuoteHero;

const featuredMetrics = [
  {
    value: timeToPilot.value,
    label: "From kickoff to the front-desk pilot",
    detail: "Appointments, reception and reviewed checkout.",
  },
  {
    value: sameDayBilling.value,
    label: "Same-day billing by week four",
    detail: "Up from a 60% pre-pilot baseline.",
  },
];

const supportingMetrics = [
  {
    value: noneLost.value,
    label: "appointments lost in the paper-diary transition",
  },
  {
    value: dragOperations.value,
    label: "drag-to-reschedule operations in pilot week three",
  },
];

export default function CustomerEvidence() {
  return (
    <Section
      id="customer-evidence"
      aria-labelledby="customer-evidence-heading"
      className="border-y border-[var(--color-border)] bg-[var(--color-canvas-tinted)] py-14 md:py-16"
    >
      <AnimateInView>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.7fr)] md:items-end">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Historical connected-pilot evidence · April 2026
            </p>
            <h2
              id="customer-evidence-heading"
              className="mt-3 max-w-[24ch] text-2xl font-semibold tracking-tight md:text-3xl"
            >
              What changed in four weeks at DFI Synergy.
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--color-text-muted)] md:justify-self-end">
            A three-chair Singapore clinic piloted appointments, reception and reviewed checkout
            while preserving its Plato connection. These results do not evidence standalone adoption
            or a general performance promise.
          </p>
        </div>
      </AnimateInView>

      <AnimateInView delay={0.06}>
        <div className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-tide)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-2)]">
          <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="flex flex-col justify-between border-b border-[var(--color-border)] p-7 md:p-9 lg:border-b-0 lg:border-r">
              <blockquote>
                <Quote className="size-6 text-[var(--color-tide)]" aria-hidden />
                <p className="mt-5 text-lg font-medium leading-relaxed tracking-tight text-[var(--color-ink)] md:text-2xl">
                  “{pullQuote.quote}”
                </p>
                <footer className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                  {pullQuote.attribution}
                </footer>
              </blockquote>

              <a
                href="/customers/dfi-synergy"
                className="mt-8 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
              >
                Read the pilot and measurement notes
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>

            <div>
              <dl className="grid grid-cols-2">
                {featuredMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`flex flex-col p-5 md:p-9 ${index === 0 ? "border-r" : ""} border-[var(--color-border)]`}
                  >
                    <dt className="order-2 mt-5 text-base font-semibold text-[var(--color-text)]">
                      {metric.label}
                    </dt>
                    <dd className="order-1 font-serif text-5xl leading-none tracking-tight text-[var(--color-ink)] md:text-6xl">
                      {metric.value}
                    </dd>
                    <dd className="order-3 mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {metric.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <dl
                data-testid="supporting-metrics"
                className="grid grid-cols-1 border-t border-[var(--color-border)] sm:grid-cols-2"
              >
                {supportingMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    data-testid="supporting-metric"
                    className={`grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-3 p-5 md:gap-4 md:px-9 ${index === 0 ? "border-b sm:border-b-0 sm:border-r" : ""} border-[var(--color-border)]`}
                  >
                    <dt className="col-start-2 row-start-1 min-w-0 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {metric.label}
                    </dt>
                    <dd className="col-start-1 row-start-1 shrink-0 text-2xl font-semibold tabular-nums text-[var(--color-ink)]">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </AnimateInView>
    </Section>
  );
}
