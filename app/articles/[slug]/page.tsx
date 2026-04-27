import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import MagneticButton from "@/components/primitives/MagneticButton";
import ArticleStickyBar from "@/components/sections/ArticleStickyBar";
import InlineMagnetCapture from "@/components/forms/InlineMagnetCapture";
import MigrationEstimator from "@/components/sections/MigrationEstimator";
import { articles, getArticle, getRelatedArticles } from "@/content/articles";
import { clusterDefaultCTA, clusterLabels } from "@/content/articles/types";
import { getLeadMagnetForCluster } from "@/content/lead-magnets";
import { siteMeta } from "@/content/site-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "Article not found" };
  }
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { Body, title, description, publishedAt, updatedAt, author, cluster, readingMinutes } =
    article;
  const related = getRelatedArticles(slug, 2);
  const cta = article.cta ?? clusterDefaultCTA[cluster];
  const magnet = getLeadMagnetForCluster(cluster);

  const articleJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "Oralstack",
      logo: {
        "@type": "ImageObject",
        url: `${siteMeta.url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteMeta.url}/articles/${slug}`,
    },
  }).replace(/</g, "\\u003c");

  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Articles",
        item: `${siteMeta.url}/articles`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${siteMeta.url}/articles/${slug}`,
      },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <main>
      <PageHeader eyebrow={`Article · ${clusterLabels[cluster]}`} title={title} />

      <Section className="pb-8">
        <div className="max-w-[680px] flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--color-text-soft)] tabular-nums">
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          <span>·</span>
          <span>{readingMinutes} min read</span>
          <span>·</span>
          <span>{author}</span>
          {updatedAt && updatedAt !== publishedAt && (
            <>
              <span>·</span>
              <span>Updated {formatDate(updatedAt)}</span>
            </>
          )}
        </div>
      </Section>

      {slug === "plato-to-cloud-migration" && (
        <Section className="pb-12">
          <MigrationEstimator defaultSource="plato" />
        </Section>
      )}

      <Section className="pb-20 md:pb-24">
        <article className="max-w-[680px] grid gap-7 text-[var(--color-text-muted)] leading-relaxed text-base md:text-lg [&_p]:text-base md:[&_p]:text-lg [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)] [&_h2]:mt-6 [&_h2]:mb-1 [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-[var(--color-text)] [&_h3]:mt-4 [&_h3]:mb-1 [&_strong]:text-[var(--color-text)] [&_strong]:font-semibold [&_ul]:grid [&_ul]:gap-2 [&_ul]:list-none [&_ul]:pl-0 [&_ol]:grid [&_ol]:gap-2 [&_li]:relative [&_li]:pl-6 [&_ul_li]:before:content-[''] [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:top-[0.7em] [&_ul_li]:before:w-1.5 [&_ul_li]:before:h-1.5 [&_ul_li]:before:rounded-full [&_ul_li]:before:bg-[var(--color-tide-deep)]">
          <Body />
        </article>
      </Section>

      {magnet && (
        <Section className="pb-16 md:pb-20">
          <div className="max-w-[820px]">
            <InlineMagnetCapture
              magnetSlug={magnet.slug}
              magnetTitle={magnet.title}
              pitch={magnet.pitch}
              deliverable={magnet.deliverable}
            />
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="pb-20 md:pb-24">
          <AnimateInView>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-6">
              Related reading
            </p>
            <ul className="grid gap-4 md:grid-cols-2 max-w-[820px]">
              {related.map((r) => (
                <li key={r.slug}>
                  <a
                    href={`/articles/${r.slug}`}
                    className="card-hover group block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 h-full"
                  >
                    <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] rounded-full px-2 py-0.5 bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                      {clusterLabels[r.cluster]}
                    </span>
                    <p className="mt-3 text-base font-semibold tracking-tight leading-snug text-balance group-hover:text-[var(--color-tide-deep)] transition-colors">
                      {r.title}
                    </p>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {r.excerpt}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </AnimateInView>
        </Section>
      )}

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center max-w-[820px]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-3">
              {cta.eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              {cta.title}
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              {cta.body}
            </p>
            {cta.buttonHref !== "/book-a-demo" && (
              <p className="mt-4 text-sm">
                <a
                  href="/book-a-demo"
                  className="text-[var(--color-tide-deep)] font-medium hover:underline underline-offset-4"
                >
                  Or book a 30-minute demo →
                </a>
              </p>
            )}
          </div>
          <div className="md:justify-self-end">
            <MagneticButton href={cta.buttonHref} variant="primary" withArrow>
              {cta.buttonLabel}
            </MagneticButton>
          </div>
        </div>
      </Section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      <ArticleStickyBar articleTitle={title} />
    </main>
  );
}
