import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site-meta";
import { customers } from "@/content/customers";
import { articles } from "@/content/articles";
import { leadMagnets } from "@/content/lead-magnets";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMeta.url;
  const now = new Date();

  const caseStudyUrls: MetadataRoute.Sitemap = customers
    .filter((c) => c.caseStudySlug)
    .map((c) => ({
      url: `${base}/customers/${c.caseStudySlug}/`,
      lastModified: now,
      priority: 0.7,
    }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/articles/${a.slug}/`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    priority: 0.7,
  }));

  const leadMagnetUrls: MetadataRoute.Sitemap = leadMagnets.map((m) => ({
    url: `${base}/lead-magnets/${m.slug}/`,
    lastModified: new Date(m.updatedAt ?? m.publishedAt),
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/workflows/`, lastModified: now, priority: 0.9 },
    { url: `${base}/articles/`, lastModified: now, priority: 0.8 },
    ...articleUrls,
    { url: `${base}/lead-magnets/`, lastModified: now, priority: 0.7 },
    ...leadMagnetUrls,
    { url: `${base}/customers/`, lastModified: now, priority: 0.8 },
    ...caseStudyUrls,
    { url: `${base}/integrations/`, lastModified: now, priority: 0.7 },
    { url: `${base}/pricing/`, lastModified: now, priority: 0.7 },
    { url: `${base}/about/`, lastModified: now, priority: 0.7 },
    { url: `${base}/faq/`, lastModified: now, priority: 0.7 },
    { url: `${base}/for-solo-clinics/`, lastModified: now, priority: 0.8 },
    { url: `${base}/for-multi-clinic/`, lastModified: now, priority: 0.8 },
    { url: `${base}/tools/`, lastModified: now, priority: 0.8 },
    { url: `${base}/tools/migration-readiness/`, lastModified: now, priority: 0.8 },
    { url: `${base}/tools/no-show-calculator/`, lastModified: now, priority: 0.8 },
    { url: `${base}/tools/compare-pms/`, lastModified: now, priority: 0.7 },
    { url: `${base}/tools/day-in-the-life/`, lastModified: now, priority: 0.7 },
    { url: `${base}/compare/`, lastModified: now, priority: 0.7 },
    { url: `${base}/compare/plato/`, lastModified: now, priority: 0.8 },
    { url: `${base}/compare/open-dental/`, lastModified: now, priority: 0.8 },
    { url: `${base}/compare/dentrix/`, lastModified: now, priority: 0.8 },
    { url: `${base}/compare/eaglesoft/`, lastModified: now, priority: 0.8 },
    { url: `${base}/compare/carestream/`, lastModified: now, priority: 0.8 },
    { url: `${base}/book-a-demo/`, lastModified: now, priority: 0.9 },
    { url: `${base}/contact/`, lastModified: now, priority: 0.9 },
    { url: `${base}/changelog/`, lastModified: now, priority: 0.6 },
    { url: `${base}/security/`, lastModified: now, priority: 0.5 },
    { url: `${base}/privacy/`, lastModified: now, priority: 0.3 },
    { url: `${base}/terms/`, lastModified: now, priority: 0.3 },
  ];
}
