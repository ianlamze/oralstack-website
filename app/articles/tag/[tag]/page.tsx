import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import ArticlesView, { type ClusterWithArticles } from "@/components/articles/ArticlesView";
import { articles, getAllTagSlugs, getArticlesByTagSlug } from "@/content/articles";
import { clusterLabels, clusterOrder } from "@/content/articles/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTagSlugs().map(({ slug }) => ({ tag: slug }));
}

type Params = { tag: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  const found = getAllTagSlugs().find((t) => t.slug === tag);
  if (!found) {
    return { title: "Tag not found" };
  }
  return {
    title: `${found.original} — Articles tagged ${found.original}`,
    description: `${found.count} ${found.count === 1 ? "field guide" : "field guides"} for dental clinic operators tagged "${found.original}". Specific, opinionated, dental-grounded.`,
    alternates: { canonical: `/articles/tag/${tag}` },
  };
}

export default async function ArticleTagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const found = getAllTagSlugs().find((t) => t.slug === tag);
  if (!found) notFound();

  const matching = getArticlesByTagSlug(tag);

  // Group filtered articles back into clusters so the page keeps the
  // same structural feel as the main /articles hub.
  const clustersWithArticles: ClusterWithArticles[] = clusterOrder.map((cluster) => ({
    cluster,
    articles: matching.filter((a) => a.cluster === cluster),
  }));

  // Cluster nav with FILTERED counts so the user can see at a glance
  // which clusters have matching articles for this tag.
  const clusterStats = clustersWithArticles
    .filter((c) => c.articles.length > 0)
    .map((c) => ({ cluster: c.cluster, count: c.articles.length }));

  const totalMin = matching.reduce((s, a) => s + a.readingMinutes, 0);

  return (
    <main>
      <PageHeader
        eyebrow={`Tag · ${found.original}`}
        title={`Articles tagged "${found.original}".`}
      />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          {found.count} {found.count === 1 ? "article" : "articles"} across {clusterStats.length}{" "}
          {clusterStats.length === 1 ? "topic cluster" : "topic clusters"} · ~{totalMin} min total
          reading
        </p>
        <p className="mt-3 text-sm">
          <a href="/articles" className="text-[var(--color-tide-deep)] font-medium hover:underline">
            ← All articles & topics
          </a>
        </p>
      </Section>

      {clusterStats.length > 1 && (
        <Section className="sticky top-0 z-20 backdrop-blur-md bg-[color-mix(in_oklch,var(--color-canvas),transparent_15%)] border-b border-[var(--color-border)] py-3">
          <nav aria-label="Clusters with matching articles">
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
      )}

      <Section className="pt-10 pb-24 md:pb-32">
        <ArticlesView clustersWithArticles={clustersWithArticles} activeTagSlug={tag} />
      </Section>
    </main>
  );
}

// Used by the route generator to know which tag slugs are valid.
export const _articlesUsedAtBuildTime = articles.length;
