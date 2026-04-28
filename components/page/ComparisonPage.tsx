import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import Reason from "@/components/ui/Reason";
import Bullet from "@/components/ui/Bullet";
import ComparisonTable from "@/components/page/ComparisonTable";
import MigrationEstimator from "@/components/tools/MigrationEstimator";
import type { Comparison } from "@/content/comparisons/types";

const ESTIMATOR_SOURCES = ["plato", "dentrix", "open-dental", "carestream", "eaglesoft"] as const;
type EstimatorSource = (typeof ESTIMATOR_SOURCES)[number];

function isEstimatorSource(slug: string): slug is EstimatorSource {
  return (ESTIMATOR_SOURCES as readonly string[]).includes(slug);
}

type ComparisonPageProps = {
  data: Comparison;
};

export default function ComparisonPage({ data }: ComparisonPageProps) {
  return (
    <main>
      <PageHeader eyebrow="Compare" title={data.pageTitle} />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          {data.lede}
        </p>
        {data.lastReviewed && (
          <p className="mt-4 text-[11px] tracking-[0.06em] uppercase text-[var(--color-text-soft)]">
            Last reviewed {data.lastReviewed} · sourced rows linked inline
          </p>
        )}
      </Section>

      <Section className="pb-16">
        <MigrationEstimator defaultSource={isEstimatorSource(data.slug) ? data.slug : "plato"} />
      </Section>

      <Section className="pb-16">
        <ComparisonTable competitor={data.competitor} rows={data.rows} />
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          {data.reasons.map((r) => (
            <Reason key={r.title} eyebrow={r.eyebrow} title={r.title} body={r.body} />
          ))}
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {data.concession.title}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[32ch]">
            {data.concession.intro}
          </h2>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            {data.concession.bullets.map((b) => (
              <Bullet key={b}>{b}</Bullet>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl md:text-3xl font-semibold tracking-tight">
              {data.cta.title}
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              {data.cta.body}
              {data.cta.sideLink && (
                <>
                  {" "}
                  <a
                    href={data.cta.sideLink.href}
                    className="text-[var(--color-tide-deep)] underline underline-offset-4"
                  >
                    {data.cta.sideLink.label}
                  </a>
                </>
              )}
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/book-a-demo"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Book a demo →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
