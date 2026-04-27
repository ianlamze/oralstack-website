import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import { articles, getArticlesByCluster, getRecentArticles } from "@/content/articles";
import { clusterDescriptions, clusterLabels, clusterOrder } from "@/content/articles/types";

export const metadata: Metadata = {
  title: "Articles & guides",
  description:
    "Field guides for dental clinic operators — front desk, billing, charting, imaging, recall, migration, and Singapore compliance.",
  alternates: { canonical: "/articles" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ArticlesPage() {
  const recent = getRecentArticles(1)[0];

  return (
    <main>
      <PageHeader eyebrow="Articles & guides" title="Field guides for dental clinic operators." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Specific, opinionated, dental-grounded. Written by operators for operators — front desk,
          owners, multi-location managers. Organised by topic, not date.
        </p>
        <p className="mt-3 text-sm text-[var(--color-text-soft)]">
          {articles.length} articles · {clusterOrder.length} topic clusters
        </p>
      </Section>

      {recent && (
        <Section className="pb-16">
          <AnimateInView>
            <a
              href={`/articles/${recent.slug}`}
              className="group block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-7 md:p-10 hover:border-[var(--color-border-strong)] hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)] transition-[box-shadow,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 max-w-[860px]"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center font-medium uppercase tracking-[0.16em] rounded-full px-2.5 py-1 bg-[color-mix(in_oklch,var(--color-tide),white_75%)] text-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_30%)]">
                  Latest
                </span>
                <span className="inline-flex items-center font-medium uppercase tracking-[0.16em] rounded-full px-2.5 py-1 bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                  {clusterLabels[recent.cluster]}
                </span>
                <time
                  dateTime={recent.publishedAt}
                  className="text-[var(--color-text-soft)] tabular-nums"
                >
                  {formatDate(recent.publishedAt)}
                </time>
                <span className="text-[var(--color-text-soft)]">·</span>
                <span className="text-[var(--color-text-soft)]">
                  {recent.readingMinutes} min read
                </span>
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.1] group-hover:text-[var(--color-tide-deep)] transition-colors duration-150 text-balance">
                {recent.title}
              </h2>
              <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed max-w-[64ch]">
                {recent.excerpt}
              </p>
              <p className="mt-5 text-sm font-medium text-[var(--color-tide-deep)]">
                Read article{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </p>
            </a>
          </AnimateInView>
        </Section>
      )}

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-20 md:gap-24">
          {clusterOrder.map((cluster) => {
            const clusterArticles = getArticlesByCluster(cluster);
            if (clusterArticles.length === 0) return null;
            return (
              <section key={cluster} id={cluster} className="scroll-mt-10 grid gap-8">
                <AnimateInView>
                  <header className="grid gap-3 max-w-[58ch]">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                      Topic · {clusterLabels[cluster]}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {clusterLabels[cluster]}
                    </h2>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {clusterDescriptions[cluster]}
                    </p>
                  </header>
                </AnimateInView>

                <ul className="grid gap-4 md:gap-5">
                  {clusterArticles.map((a, i) => (
                    <li key={a.slug}>
                      <AnimateInView delay={Math.min(i * 0.04, 0.16)}>
                        <a
                          href={`/articles/${a.slug}`}
                          className="group block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 md:p-7 hover:border-[var(--color-border-strong)] hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_40px_-30px_rgba(20,30,60,0.18)] transition-[box-shadow,border-color,transform] duration-200 ease-out hover:-translate-y-0.5"
                        >
                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <time
                              dateTime={a.publishedAt}
                              className="text-[var(--color-text-soft)] tabular-nums"
                            >
                              {formatDate(a.publishedAt)}
                            </time>
                            <span className="text-[var(--color-text-soft)]">·</span>
                            <span className="text-[var(--color-text-soft)]">
                              {a.readingMinutes} min read
                            </span>
                          </div>
                          <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight leading-snug text-balance group-hover:text-[var(--color-tide-deep)] transition-colors duration-150">
                            {a.title}
                          </h3>
                          <p className="mt-2 text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed max-w-[64ch]">
                            {a.excerpt}
                          </p>
                        </a>
                      </AnimateInView>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
