import type { Metadata } from "next";
import Section from "@/components/primitives/Section";
import CaseStudyHero from "@/components/page/CaseStudyHero";
import PullQuote from "@/components/ui/PullQuote";
import StatGrid from "@/components/ui/StatGrid";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
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
        <aside className="mb-10 grid max-w-[820px] gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 md:p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
            Deployment shown
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            This April 2026 evidence comes from a Plato-connected workflow pilot. It shows the
            front-desk and checkout scope described below; it does not show a standalone
            clinic-system cutover.
          </p>
        </aside>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 items-start">
          <div className="max-w-[560px]">
            <PullQuote
              size="xl"
              quote={study.pullQuoteHero.quote}
              attribution={study.pullQuoteHero.attribution}
            />
            <div
              data-testid="case-study-early-actions"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a
                href="/contact/?intent=pilot&source=dfi-synergy#request"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
              >
                Request a scoped pilot proposal →
              </a>
              <a
                href="/book-a-demo/?focus=run-the-day&source=dfi-synergy"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
              >
                See the front-desk workflow
              </a>
            </div>
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
              {s.paragraphs.map((p) => (
                <p key={p} className="text-base md:text-lg">
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
              {s.paragraphs.map((p) => (
                <p key={p} className="text-base md:text-lg">
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
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          Illustrations, labelled by scope
        </p>
        <ul className="grid gap-6 md:grid-cols-2">
          <li className="grid min-h-[280px] content-start gap-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-5 md:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              Reviewed checkout · included in this pilot
            </p>
            <div className="w-full max-w-[440px] self-center justify-self-center">
              <CheckoutMock />
            </div>
          </li>
          <li className="grid min-h-[280px] content-start gap-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-5 md:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              Odontogram · product illustration, outside this pilot
            </p>
            <div className="w-full max-w-[440px] self-center justify-self-center">
              <OdontogramMock />
            </div>
          </li>
        </ul>
      </Section>

      <Section className="pb-20 md:pb-24">
        <article className="max-w-[680px] grid gap-12 text-[var(--color-text-muted)] leading-relaxed [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)]">
          {study.sections.slice(3).map((s) => (
            <div key={s.heading} className="grid gap-5">
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="text-base md:text-lg">
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
            What changed in the first month.
          </h2>
        </div>
        <StatGrid stats={study.stats} />
      </Section>

      {study.methodology && (
        <Section className="pb-20 md:pb-24">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-7 md:p-8 max-w-[820px] grid gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              How the numbers were measured
            </p>
            <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
              {study.methodology}
            </p>
            <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em] mt-1">
              Buyers reviewing this case study are welcome to ask for the underlying queries —{" "}
              <a
                href="/contact/?intent=question&source=dfi-synergy#request"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                ask about the methodology
              </a>
              .
            </p>
          </div>
        </Section>
      )}

      <Section className="pb-20 md:pb-24">
        <div className="max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-6">
            Related reading
          </p>
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              {
                href: "/security",
                key: "security",
                cluster: "Operations & trust",
                title: "Security and audit posture",
                excerpt: "How tenant boundaries, access records, and reviewed actions are handled.",
              },
              {
                href: "/workflows#checkout-money",
                key: "checkout-money",
                cluster: "Billing & revenue",
                title: "Checkout and money workflows",
                excerpt: "See the current reviewed checkout, payer-estimate, and receipt boundary.",
              },
            ].map((r) => (
              <li key={r.key}>
                <a
                  href={r.href}
                  className="group block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 hover:border-[var(--color-border-strong)] transition-colors h-full"
                >
                  <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] rounded-full px-2 py-0.5 bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                    {r.cluster}
                  </span>
                  <p className="mt-3 text-base font-semibold tracking-tight leading-snug group-hover:text-[var(--color-tide-deep)] transition-colors">
                    {r.title}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {r.excerpt}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Your next step
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight max-w-[26ch]">
              See whether this workflow fits your clinic.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              DFI Synergy&apos;s results reflect one named April 2026 pilot. Share your clinic shape
              and preferred start mode for a scoped proposal, or request a walkthrough of the
              Plato-connected run-the-day path used in this evidence.
            </p>
          </div>
          <div className="md:justify-self-end flex flex-col gap-3">
            <a
              href="/contact/?intent=pilot&source=dfi-synergy#request"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Request a scoped pilot proposal →
            </a>
            <a
              href="/book-a-demo/?focus=run-the-day&source=dfi-synergy"
              className="inline-flex items-center justify-center min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-white transition-colors"
            >
              Request a workflow walkthrough
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
