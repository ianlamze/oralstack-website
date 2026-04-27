import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import { leadMagnets, getLeadMagnet } from "@/content/lead-magnets";
import { clusterLabels } from "@/content/articles/types";
import { siteMeta } from "@/content/site-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return leadMagnets.map((m) => ({ slug: m.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet) return { title: "Not found" };
  return {
    title: magnet.title,
    description: magnet.description,
    alternates: { canonical: `/lead-magnets/${magnet.slug}` },
    openGraph: {
      title: magnet.title,
      description: magnet.description,
      type: "article",
      publishedTime: magnet.publishedAt,
      modifiedTime: magnet.updatedAt ?? magnet.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: magnet.title,
      description: magnet.description,
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

export default async function LeadMagnetPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet) notFound();

  const { Body, title, description, publishedAt, updatedAt, cluster, readingMinutes } =
    magnet;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { "@type": "Organization", name: "Oralstack" },
    publisher: {
      "@type": "Organization",
      name: "Oralstack",
      logo: { "@type": "ImageObject", url: `${siteMeta.url}/icon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteMeta.url}/lead-magnets/${slug}`,
    },
  }).replace(/</g, "\\u003c");

  return (
    <main>
      <PageHeader
        eyebrow={`Reference · ${clusterLabels[cluster]}`}
        title={title}
      />

      <Section className="pb-8">
        <div className="max-w-[680px] flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--color-text-soft)] tabular-nums">
          <span>Last reviewed {formatDate(updatedAt ?? publishedAt)}</span>
          <span>·</span>
          <span>{readingMinutes} min read</span>
          <span>·</span>
          <span>Free reference</span>
        </div>
        <p className="mt-3 max-w-[680px] text-base text-[var(--color-text-muted)] leading-relaxed">
          {description}
        </p>
      </Section>

      <Section className="pb-20 md:pb-24">
        <article className="max-w-[680px] grid gap-7 text-[var(--color-text-muted)] leading-relaxed text-base md:text-lg [&_p]:text-base md:[&_p]:text-lg [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)] [&_h2]:mt-6 [&_h2]:mb-1 [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-[var(--color-text)] [&_h3]:mt-4 [&_h3]:mb-1 [&_strong]:text-[var(--color-text)] [&_strong]:font-semibold [&_ul]:grid [&_ul]:gap-2 [&_ul]:list-none [&_ul]:pl-0 [&_ol]:grid [&_ol]:gap-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:relative [&_ul_li]:pl-6 [&_ul_li]:before:content-[''] [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:top-[0.7em] [&_ul_li]:before:w-1.5 [&_ul_li]:before:h-1.5 [&_ul_li]:before:rounded-full [&_ul_li]:before:bg-[var(--color-tide-deep)]">
          <Body />
        </article>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center max-w-[820px]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-3">
              Try Oralstack
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              Want this in your clinic, not just on paper?
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              Oralstack&apos;s {clusterLabels[cluster].toLowerCase()} module is
              built around the motions in this reference. A 30-minute demo
              walks the relevant team through it on a sample dataset that
              mirrors a Singapore clinic.
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </main>
  );
}
