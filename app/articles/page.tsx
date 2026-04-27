import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";
import ArticlesView, { type ClusterWithArticles } from "@/components/articles/ArticlesView";
import { articles, getArticlesByCluster, getRecentArticles } from "@/content/articles";
import { clusterLabels, clusterOrder } from "@/content/articles/types";

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

  // Cluster stats for the jump-nav row at the top.
  const clusterStats = clusterOrder.map((cluster) => {
    const arts = getArticlesByCluster(cluster);
    const totalMin = arts.reduce((sum, a) => sum + a.readingMinutes, 0);
    return { cluster, count: arts.length, totalMin };
  });

  const clustersWithArticles: ClusterWithArticles[] = clusterOrder.map((cluster) => ({
    cluster,
    articles: getArticlesByCluster(cluster),
  }));

  return (
    <main>
      <PageHeader eyebrow="Articles & guides" title="Field guides for dental clinic operators." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Specific, opinionated, dental-grounded. Written by operators for operators — front desk,
          owners, multi-location managers. Organised by topic, not date.
        </p>
        <p className="mt-3 text-sm text-[var(--color-text-soft)]">
          {articles.length} articles · {clusterOrder.length} topic clusters
        </p>
      </Section>

      {/* Sticky cluster jump-nav — anchored to id={cluster} targets, stays
          visible while scrolling deep into the page so cross-cluster
          navigation is one click from anywhere. */}
      <Section className="sticky top-0 z-20 backdrop-blur-md bg-[color-mix(in_oklch,var(--color-canvas),transparent_15%)] border-b border-[var(--color-border)] py-3">
        <nav aria-label="Article topic clusters">
          <ul className="flex flex-wrap gap-2">
            {clusterStats.map(({ cluster, count }) => (
              <li key={cluster}>
                <a
                  href={`#${cluster}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-muted)] hover:border-[var(--color-tide)] hover:text-[var(--color-tide-deep)] transition-colors"
                >
                  <span>{clusterLabels[cluster]}</span>
                  <span className="text-[var(--color-text-soft)] tabular-nums">· {count}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      {recent && (
        <Section className="pt-10 pb-16">
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
        <ArticlesView clustersWithArticles={clustersWithArticles} />
      </Section>
    </main>
  );
}
