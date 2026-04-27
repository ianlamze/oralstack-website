import type { Metadata } from "next";
import Section from "@/components/primitives/Section";
import CaseStudyHero from "@/components/sections/CaseStudyHero";
import PullQuote from "@/components/sections/PullQuote";
import StatGrid from "@/components/sections/StatGrid";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import RecallMock from "@/components/visuals/RecallMock";
import { dfiSynergy } from "@/content/case-studies/dfi-synergy";

export const metadata: Metadata = {
  title: dfiSynergy.title,
  description: dfiSynergy.outcome,
  alternates: { canonical: "/customers/dfi-synergy" },
};

export default function DfiSynergyCaseStudy() {
  const study = dfiSynergy;

  return (
    <main>
      <CaseStudyHero study={study} />

      <Section className="pb-16 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 items-start">
          <div className="max-w-[560px]">
            <PullQuote
              size="xl"
              quote={study.pullQuoteHero.quote}
              attribution={study.pullQuoteHero.attribution}
            />
          </div>
          <div className="lg:justify-self-end w-full">
            <ScheduleMock />
          </div>
        </div>
      </Section>

      <Section className="pb-20 md:pb-24">
        <article className="max-w-[680px] grid gap-12 text-[var(--color-text-muted)] leading-relaxed [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)]">
          {study.sections.slice(0, 2).map((s) => (
            <div key={s.heading} className="grid gap-5">
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="grid gap-3 mt-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-base md:text-lg">
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-1 w-1 rounded-full bg-[var(--color-accent-deep)] shrink-0"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>
      </Section>

      {study.pullQuoteMid && (
        <Section className="pb-20 md:pb-24">
          <div className="max-w-[760px]">
            <PullQuote
              quote={study.pullQuoteMid.quote}
              attribution={study.pullQuoteMid.attribution}
            />
          </div>
        </Section>
      )}

      <Section className="pb-20 md:pb-24">
        <article className="max-w-[680px] grid gap-12 text-[var(--color-text-muted)] leading-relaxed [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)]">
          {study.sections.slice(2, 3).map((s) => (
            <div key={s.heading} className="grid gap-5">
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="grid gap-3 mt-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-base md:text-lg">
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-1 w-1 rounded-full bg-[var(--color-accent-deep)] shrink-0"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>
      </Section>

      <Section className="pb-20 md:pb-24">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-8">
          What&apos;s running today, visualised
        </p>
        <ul className="grid gap-6 md:grid-cols-3">
          <li className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-5 md:p-6 flex items-center justify-center min-h-[280px]">
            <div className="w-full max-w-[440px]">
              <CheckoutMock />
            </div>
          </li>
          <li className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-5 md:p-6 flex items-center justify-center min-h-[280px]">
            <div className="w-full max-w-[440px]">
              <OdontogramMock />
            </div>
          </li>
          <li className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-5 md:p-6 flex items-center justify-center min-h-[280px]">
            <div className="w-full max-w-[440px]">
              <RecallMock />
            </div>
          </li>
        </ul>
      </Section>

      <Section className="pb-20 md:pb-24">
        <article className="max-w-[680px] grid gap-12 text-[var(--color-text-muted)] leading-relaxed [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)]">
          {study.sections.slice(3).map((s) => (
            <div key={s.heading} className="grid gap-5">
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="grid gap-3 mt-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-base md:text-lg">
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-1 w-1 rounded-full bg-[var(--color-accent-deep)] shrink-0"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>
      </Section>

      <Section className="pb-20 md:pb-24">
        <div className="grid gap-6 mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            By the numbers
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[36ch]">
            What changed in the first three weeks.
          </h2>
        </div>
        <StatGrid stats={study.stats} />
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Pilot programme
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight max-w-[26ch]">
              Want to see Oralstack in your clinic?
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              We&apos;re onboarding a small group of clinics across Singapore
              and APAC each quarter. If you&apos;re considering a switch from
              Plato, Open Dental, or a paper-led workflow, we&apos;d like to
              hear how your front desk runs.
            </p>
          </div>
          <div className="md:justify-self-end flex flex-col gap-3">
            <a
              href="/book-a-demo"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Book a demo →
            </a>
            <a
              href="/customers"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              All customers
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
