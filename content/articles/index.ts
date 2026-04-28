import { platoToCloudMigration } from "./plato-to-cloud-migration";
import { reducingNoShowRates } from "./reducing-no-show-rates";
import { sameDayBillingDental } from "./same-day-billing-dental";
import { dicomInChartVsSeparateViewer } from "./dicom-in-chart-vs-separate-viewer";
import { toothLedVsFormLedCharting } from "./tooth-led-vs-form-led-charting";
import { whatsappBusinessDentalClinicSingapore } from "./whatsapp-business-dental-clinic-singapore";
import { singaporePdpaDentalClinics } from "./singapore-pdpa-dental-clinics";
import { gstSingaporeDentalBilling } from "./gst-singapore-dental-billing";
import { dragToRescheduleDentalSchedule } from "./drag-to-reschedule-dental-schedule";
import { insuranceVsPatientPortionSingapore } from "./insurance-vs-patient-portion-singapore";
import { dentalAuditLogs } from "./dental-audit-logs";
import { dentalSensorBridgeIntegration } from "./dental-sensor-bridge-integration";
import { choosingDentalPmsApac2026 } from "./choosing-dental-pms-apac-2026";
import { openDentalToManagedPmsMigration } from "./open-dental-to-managed-pms-migration";
import { tenantIsolationDentalSaas } from "./tenant-isolation-dental-saas";
import { caseNoteParser } from "./case-note-parser";
import type { Article, ArticleCluster } from "./types";

export const articles: Article[] = [
  platoToCloudMigration,
  reducingNoShowRates,
  sameDayBillingDental,
  dicomInChartVsSeparateViewer,
  toothLedVsFormLedCharting,
  whatsappBusinessDentalClinicSingapore,
  singaporePdpaDentalClinics,
  gstSingaporeDentalBilling,
  dragToRescheduleDentalSchedule,
  insuranceVsPatientPortionSingapore,
  dentalAuditLogs,
  dentalSensorBridgeIntegration,
  choosingDentalPmsApac2026,
  openDentalToManagedPmsMigration,
  tenantIsolationDentalSaas,
  caseNoteParser,
];

const bySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return bySlug.get(slug);
}

export function getArticlesByCluster(cluster: ArticleCluster): Article[] {
  return articles
    .filter((a) => a.cluster === cluster)
    .sort((a, b) => {
      // Canonical "start here" pins to top.
      if (a.canonical && !b.canonical) return -1;
      if (!a.canonical && b.canonical) return 1;
      // Otherwise newest first.
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}

export function getArticlesByTagSlug(slug: string): Article[] {
  return articles
    .filter((a) =>
      a.tags.some(
        (t) =>
          t
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") === slug,
      ),
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getAllTagSlugs(): { slug: string; original: string; count: number }[] {
  const map = new Map<string, { original: string; count: number }>();
  for (const a of articles) {
    for (const t of a.tags) {
      const slug = t
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const existing = map.get(slug);
      if (existing) {
        existing.count++;
      } else {
        map.set(slug, { original: t, count: 1 });
      }
    }
  }
  return Array.from(map.entries())
    .map(([slug, { original, count }]) => ({ slug, original, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRecentArticles(limit = 5): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = bySlug.get(slug);
  if (!current) return [];
  const sameCluster = articles.filter((a) => a.slug !== slug && a.cluster === current.cluster);
  if (sameCluster.length >= limit) return sameCluster.slice(0, limit);
  const others = articles.filter((a) => a.slug !== slug && a.cluster !== current.cluster);
  return [...sameCluster, ...others].slice(0, limit);
}
