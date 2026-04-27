import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site-meta";
import { customers } from "@/content/customers";

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

  return [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/workflows/`, lastModified: now, priority: 0.9 },
    { url: `${base}/customers/`, lastModified: now, priority: 0.8 },
    ...caseStudyUrls,
    { url: `${base}/integrations/`, lastModified: now, priority: 0.7 },
    { url: `${base}/pricing/`, lastModified: now, priority: 0.7 },
    { url: `${base}/book-a-demo/`, lastModified: now, priority: 0.9 },
    { url: `${base}/changelog/`, lastModified: now, priority: 0.6 },
    { url: `${base}/security/`, lastModified: now, priority: 0.5 },
    { url: `${base}/privacy/`, lastModified: now, priority: 0.3 },
    { url: `${base}/terms/`, lastModified: now, priority: 0.3 },
  ];
}
