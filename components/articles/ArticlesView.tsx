import AnimateInView from "@/components/motion/AnimateInView";
import {
  type Article,
  type ArticleCluster,
  clusterDescriptions,
  clusterLabels,
  tagToSlug,
} from "@/content/articles/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export type ClusterWithArticles = {
  cluster: ArticleCluster;
  articles: Article[];
};

type Props = {
  /** Cluster sections to render. Empty clusters are skipped. */
  clustersWithArticles: ClusterWithArticles[];
  /** When rendered from /articles/tag/[slug], highlight the matching tag chip. */
  activeTagSlug?: string;
};

/**
 * Server-rendered cluster sections + cards. Used by the main /articles hub
 * (full clusters, all articles) and by /articles/tag/[slug] (clusters
 * filtered to a single tag). Tag chips link to /articles/tag/[slug] for
 * clean SEO-friendly URLs and per-tag landing pages.
 */
export default function ArticlesView({ clustersWithArticles, activeTagSlug }: Props) {
  return (
    <div className="grid gap-20 md:gap-24">
      {clustersWithArticles.map(({ cluster, articles: clusterArticles }) => {
        if (clusterArticles.length === 0) return null;
        const totalMin = clusterArticles.reduce((s, a) => s + a.readingMinutes, 0);
        return (
          <section key={cluster} id={cluster} className="scroll-mt-24 grid gap-8">
            <AnimateInView>
              <header className="grid gap-3 max-w-[58ch]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                  Topic · {clusterLabels[cluster]}
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {clusterLabels[cluster]}{" "}
                  <span className="text-base md:text-lg font-normal text-[var(--color-text-soft)] tabular-nums">
                    · {clusterArticles.length}{" "}
                    {clusterArticles.length === 1 ? "article" : "articles"} · ~{totalMin} min total
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
                        {a.canonical && (
                          <span className="inline-flex items-center font-semibold uppercase tracking-[0.16em] rounded-full px-2 py-0.5 bg-[color-mix(in_oklch,var(--color-tide),white_75%)] text-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_30%)]">
                            Start here
                          </span>
                        )}
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
                          const slug = tagToSlug(t);
                          const isActive = activeTagSlug === slug;
                          return (
                            <a
                              key={t}
                              href={`/articles/tag/${slug}/`}
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
  );
}
