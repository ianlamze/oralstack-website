import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site-meta";
import { customers } from "@/content/customers";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMeta.url;
  const lastModified = new Date("2026-08-10T00:00:00+08:00");

  const caseStudyUrls: MetadataRoute.Sitemap = customers
    .filter((c) => c.caseStudySlug)
    .map((c) => ({
      url: `${base}/customers/${c.caseStudySlug}/`,
      lastModified,
      priority: 0.7,
    }));

  return [
    { url: `${base}/`, lastModified, priority: 1.0 },
    { url: `${base}/workflows/`, lastModified, priority: 0.9 },
    { url: `${base}/switching/`, lastModified, priority: 0.9 },
    { url: `${base}/customers/`, lastModified, priority: 0.8 },
    ...caseStudyUrls,
    { url: `${base}/integrations/`, lastModified, priority: 0.7 },
    { url: `${base}/pricing/`, lastModified, priority: 0.7 },
    { url: `${base}/about/`, lastModified, priority: 0.7 },
    { url: `${base}/faq/`, lastModified, priority: 0.7 },
    { url: `${base}/for-solo-clinics/`, lastModified, priority: 0.8 },
    { url: `${base}/for-multi-clinic/`, lastModified, priority: 0.8 },
    { url: `${base}/book-a-demo/`, lastModified, priority: 0.9 },
    { url: `${base}/contact/`, lastModified, priority: 0.9 },
    { url: `${base}/changelog/`, lastModified, priority: 0.6 },
    { url: `${base}/security/`, lastModified, priority: 0.7 },
    { url: `${base}/status/`, lastModified, priority: 0.6 },
    { url: `${base}/accessibility/`, lastModified, priority: 0.5 },
    { url: `${base}/privacy/`, lastModified, priority: 0.3 },
    { url: `${base}/terms/`, lastModified, priority: 0.3 },
  ];
}
