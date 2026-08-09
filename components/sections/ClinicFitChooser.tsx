import { ArrowRight, Building2, Network } from "lucide-react";

const clinicFits = [
  {
    href: "/for-solo-clinics",
    eyebrow: "One clinic",
    title: "Keep one clinic day visible from arrival to close.",
    description:
      "For teams sharing reception, chairside care, checkout, and operations around one connected clinic record.",
    action: "Explore the one-clinic path",
    Icon: Building2,
  },
  {
    href: "/for-multi-clinic",
    eyebrow: "Clinic group",
    title: "Give authorized managers a consistent view across locations.",
    description:
      "For organizations that need clinic-scoped access, group rollups, and a clear route into each connected clinic.",
    action: "Explore the clinic-group path",
    Icon: Network,
  },
] as const;

export default function ClinicFitChooser() {
  return (
    <section
      id="clinic-fit"
      data-testid="clinic-fit-chooser"
      aria-labelledby="clinic-fit-heading"
      className="max-w-[920px]"
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Choose your clinic shape
          </p>
          <h2
            id="clinic-fit-heading"
            className="mt-3 max-w-[24ch] text-2xl font-semibold tracking-tight md:text-3xl"
          >
            Start with the operating view you need.
          </h2>
        </div>
        <p className="max-w-[46ch] text-sm leading-relaxed text-[var(--color-text-muted)] md:justify-self-end">
          Both paths use the same reviewed product boundary. The difference is who needs to see the
          day and how clinic access is scoped.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {clinicFits.map(({ href, eyebrow, title, description, action, Icon }) => (
          <a
            key={href}
            href={href}
            data-testid="clinic-fit-choice"
            className="group grid min-h-[170px] gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 shadow-[var(--shadow-1)] transition-[border-color,background-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[var(--color-tide)] hover:bg-[var(--color-canvas-tinted)] hover:shadow-[var(--shadow-2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)] md:min-h-[190px] md:gap-5 md:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)]">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {eyebrow}
              </span>
            </div>
            <div>
              <h3 className="max-w-[28ch] text-xl font-semibold tracking-tight text-[var(--color-ink)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {description}
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-tide-deep)]">
              {action}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
