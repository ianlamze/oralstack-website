import type { Customer } from "@/content/customers";

const statusLabels: Record<Customer["status"], string> = {
  "historical-pilot": "Historical pilot",
};

const statusStyles: Record<Customer["status"], string> = {
  "historical-pilot":
    "border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
};

type CustomerCardProps = {
  customer: Customer;
};

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-1)]">
      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="grid content-start gap-6 p-7 md:p-10 lg:p-12">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Named pilot evidence · {customer.pilotStart}
            </p>
            <span
              className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusStyles[customer.status]}`}
            >
              {statusLabels[customer.status]}
            </span>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--color-tide-deep)]">{customer.location}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)] md:text-4xl">
              {customer.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              {customer.blurb}
            </p>
            {(customer.size || customer.specialty) && (
              <p className="mt-4 text-xs tracking-[0.04em] text-[var(--color-text-soft)]">
                {[customer.specialty, customer.size].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

          <dl className="grid gap-4 border-y border-[var(--color-border)] py-5 text-sm">
            <div className="grid gap-1">
              <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                Pilot scope
              </dt>
              <dd className="leading-relaxed text-[var(--color-text)]">
                {customer.pilotScope.join(" · ")}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                Not included in this evidence
              </dt>
              <dd className="leading-relaxed text-[var(--color-text-muted)]">
                {customer.notIncluded.join(" · ")}
              </dd>
            </div>
          </dl>

          <blockquote className="border-l-2 border-[var(--color-tide)] pl-5">
            <p className="text-lg font-medium leading-relaxed tracking-tight text-[var(--color-text)] md:text-xl">
              “{customer.quote.text}”
            </p>
            <footer className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
              {customer.quote.attribution}
            </footer>
          </blockquote>

          {customer.caseStudySlug && (
            <a
              href={`/customers/${customer.caseStudySlug}`}
              className="inline-flex min-h-[44px] items-center justify-self-start text-sm font-medium text-[var(--color-tide-deep)] underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors hover:text-[var(--color-text)]"
            >
              Read the case study and methodology →
            </a>
          )}
        </div>

        <div className="grid content-start gap-7 border-t border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              What changed in the first month
            </p>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-[var(--color-text-muted)]">
              Results from the named front-desk pilot, shown with their original measurement
              windows.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {customer.evidence.map((item) => (
              <li
                key={`${item.value}-${item.label}`}
                className="grid content-start gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5"
              >
                <p className="text-3xl font-semibold tabular-nums tracking-tight text-[var(--color-ink)] md:text-4xl">
                  {item.value}
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {item.label}
                </p>
                {item.qualifier && (
                  <p className="mt-auto pt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-soft)]">
                    {item.qualifier}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
              Evidence boundary
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {customer.evidenceNote}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="/contact/?intent=pilot&source=dfi-synergy#request"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
            >
              Request a pilot proposal →
            </a>
            <a
              href="/book-a-demo/?focus=run-the-day&source=dfi-synergy"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              See the front-desk workflow
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
