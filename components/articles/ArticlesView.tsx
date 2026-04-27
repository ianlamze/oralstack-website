"use client";

import { useEffect, useState } from "react";
import AnimateInView from "@/components/sections/AnimateInView";
import { getArticlesByCluster } from "@/content/articles";
import {
  type ArticleCluster,
  clusterDescriptions,
  clusterLabels,
  clusterOrder,
} from "@/content/articles/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function tagSlug(tag: string) {
  return tag.toLowerCase().trim();
}

type FilteredCluster = {
  cluster: ArticleCluster;
  articles: ReturnType<typeof getArticlesByCluster>;
};

/**
 * Reading the active tag filter via window.location + popstate (rather than
 * Next's useSearchParams) so the page stays compatible with static export.
 * Server-side renders with no filter (full list visible in HTML for SEO);
 * client hydrates, reads URL, and re-renders with filter if present.
 */
function useTagFilter() {
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("tag");
      setTag(t ? tagSlug(t) : null);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  return tag;
}

export default function ArticlesView() {
  const tagFilter = useTagFilter();

  const filteredByCluster: FilteredCluster[] = clusterOrder.map((cluster) => {
    let arts = getArticlesByCluster(cluster);
    if (tagFilter) {
      arts = arts.filter((a) => a.tags.some((t) => tagSlug(t) === tagFilter));
    }
    return { cluster, articles: arts };
  });

  const totalFiltered = filteredByCluster.reduce((sum, c) => sum + c.articles.length, 0);

  return (
    <div className="grid gap-12">
      {tagFilter && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-5 py-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-[var(--color-text-muted)]">Filtered by tag:</span>
            <span className="inline-flex items-center font-medium uppercase tracking-[0.16em] rounded-full px-2.5 py-1 bg-[color-mix(in_oklch,var(--color-tide),white_75%)] text-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_30%)] text-xs">
              {tagFilter}
            </span>
            <span className="text-[var(--color-text-soft)] tabular-nums">
              {totalFiltered} {totalFiltered === 1 ? "article" : "articles"}
            </span>
          </div>
          <a
            href="/articles"
            className="text-sm font-medium text-[var(--color-tide-deep)] hover:underline"
          >
            Clear filter ✕
          </a>
        </div>
      )}

      {tagFilter && totalFiltered === 0 && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-8 text-center">
          <p className="text-[var(--color-text-muted)]">
            No articles tagged{" "}
            <span className="font-medium text-[var(--color-text)]">{tagFilter}</span>.{" "}
            <a href="/articles" className="text-[var(--color-tide-deep)] hover:underline">
              Clear filter
            </a>
          </p>
        </div>
      )}

      <div className="grid gap-20 md:gap-24">
        {filteredByCluster.map(({ cluster, articles: clusterArticles }) => {
          if (clusterArticles.length === 0) return null;
          const totalMin = clusterArticles.reduce((s, a) => s + a.readingMinutes, 0);
          return (
            <section key={cluster} id={cluster} className="scroll-mt-10 grid gap-8">
              <AnimateInView>
                <header className="grid gap-3 max-w-[58ch]">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                    Topic · {clusterLabels[cluster]}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {clusterLabels[cluster]}{" "}
                    <span className="text-base md:text-lg font-normal text-[var(--color-text-soft)] tabular-nums">
                      · {clusterArticles.length}{" "}
                      {clusterArticles.length === 1 ? "article" : "articles"} · ~{totalMin} min
                      total
                    </span>
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
                      <article className="card-hover group relative rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 md:p-7">
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
                        <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight leading-snug text-balance">
                          <a
                            href={`/articles/${a.slug}`}
                            className="text-[var(--color-text)] before:absolute before:inset-0 before:content-[''] before:rounded-[var(--radius-lg)] hover:text-[var(--color-tide-deep)] transition-colors duration-150"
                          >
                            {a.title}
                          </a>
                        </h3>
                        <p className="mt-2 text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed max-w-[64ch]">
                          {a.excerpt}
                        </p>
                        <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                          {a.tags.map((t) => {
                            const slug = tagSlug(t);
                            const isActive = tagFilter === slug;
                            return (
                              <a
                                key={t}
                                href={`/articles?tag=${encodeURIComponent(slug)}`}
                                className={`text-[11px] tracking-[0.02em] rounded-md border px-2 py-0.5 transition-colors ${
                                  isActive
                                    ? "border-[var(--color-tide)] bg-[color-mix(in_oklch,var(--color-tide),white_82%)] text-[var(--color-tide-deep)]"
                                    : "border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-soft)] hover:border-[var(--color-tide)] hover:text-[var(--color-tide-deep)]"
                                }`}
                              >
                                {t}
                              </a>
                            );
                          })}
                        </div>
                      </article>
                    </AnimateInView>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
