import Image from "next/image";
import { CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";
import Button from "@/components/primitives/Button";
import MagneticButton from "@/components/primitives/MagneticButton";
import Section from "@/components/primitives/Section";
import { HeroItem, HeroStagger } from "@/components/motion/HeroStagger";

const proofPoints = [
  "Plato stays the system of record",
  "Sync health and writeback status stay visible",
  "Tenant-isolated and Singapore-region hosted",
];

export default function Hero() {
  return (
    <Section className="pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
        <HeroStagger>
          <HeroItem>
            <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface-raised)] px-3 text-[11px] font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-tide-deep)] shadow-[var(--shadow-1)]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[var(--color-canvas-tinted)]">
                <CalendarDays className="size-3" aria-hidden />
              </span>
              Built in Singapore · Connected to Plato
            </p>
          </HeroItem>

          <HeroItem>
            <h1 className="mt-6 max-w-[13ch] text-[length:var(--text-display)] leading-[0.94] text-[var(--color-ink)]">
              Run the clinic day from one calm workspace.
            </h1>
            <p className="mt-5 max-w-[34ch] text-xl font-medium leading-snug tracking-tight text-[var(--color-tide-deep)] md:text-2xl">
              Schedule, receive, chart and check out—without replacing Plato.
            </p>
          </HeroItem>

          <HeroItem>
            <p className="mt-6 max-w-[47ch] text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              Oralstack gives the front desk and clinical team one operational view of patient
              requests, chair work, checkout and the reviewed writebacks waiting to return to Plato.
            </p>
          </HeroItem>

          <HeroItem>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="/book-a-demo" variant="primary" withArrow>
                Book a 30-min walkthrough
              </MagneticButton>
              <Button href="/workflows" variant="ghost">
                Explore the clinic workspace
              </Button>
            </div>
          </HeroItem>

          <HeroItem>
            <ul className="mt-8 grid gap-2 text-sm text-[var(--color-text-muted)] sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2
                    className="size-4 shrink-0 text-[var(--color-success)]"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </HeroItem>
        </HeroStagger>

        <HeroStagger className="w-full lg:justify-self-end">
          <HeroItem>
            <figure className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface-raised)] p-2 shadow-[var(--shadow-hero)] md:p-3">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] px-2 pb-2 md:px-3 md:pb-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Image
                    src="/oralstack-mark.svg"
                    width={34}
                    height={34}
                    alt=""
                    className="size-[34px] shrink-0 rounded-[var(--radius-sm)]"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
                      Oralstack clinic workspace
                    </p>
                    <p className="truncate text-xs text-[var(--color-text-soft)]">
                      Appointments · Plato-connected clinic view
                    </p>
                  </div>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] bg-[var(--color-success-bg)] px-2.5 py-1 text-xs font-medium text-[var(--color-success)] sm:inline-flex">
                  <ShieldCheck className="size-3.5" aria-hidden />
                  Anonymised product UI
                </span>
              </div>

              <div className="mt-2 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-canvas)] md:mt-3">
                <Image
                  src="/oralstack-app-schedule-anonymised.webp"
                  alt="Anonymised Oralstack appointment workspace using synthetic clinic, provider, patient, and appointment data"
                  width={1672}
                  height={941}
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full"
                />
              </div>

              <figcaption className="flex flex-col gap-1 px-2 pb-1 pt-3 sm:flex-row sm:items-center sm:justify-between md:px-3">
                <span className="text-sm font-semibold text-[var(--color-ink)]">
                  The current Oralstack interface, anonymised
                </span>
                <span className="text-xs text-[var(--color-text-soft)]">
                  Synthetic clinic, provider and patient data
                </span>
              </figcaption>
            </figure>
          </HeroItem>
        </HeroStagger>
      </div>
    </Section>
  );
}
