import type { ArticleCluster } from "@/content/articles/types";
import type { LeadMagnet } from "./types";
import { frontDeskDailyPlaybook } from "./front-desk-daily-playbook";
import { singaporeDentalInsuranceBillingChecklist } from "./singapore-dental-insurance-billing-checklist";
import { dentalImagingVendorQuestionPack } from "./dental-imaging-vendor-question-pack";
import { platoCloudMigrationRunbook } from "./plato-cloud-migration-runbook";
import { pdpaComplianceChecklistSingaporeDental } from "./pdpa-compliance-checklist-singapore-dental";

export const leadMagnets: LeadMagnet[] = [
  frontDeskDailyPlaybook,
  singaporeDentalInsuranceBillingChecklist,
  dentalImagingVendorQuestionPack,
  platoCloudMigrationRunbook,
  pdpaComplianceChecklistSingaporeDental,
];

const bySlug = new Map(leadMagnets.map((m) => [m.slug, m]));
const byCluster = new Map<ArticleCluster, LeadMagnet>(
  leadMagnets.map((m) => [m.cluster, m]),
);

export function getLeadMagnet(slug: string): LeadMagnet | undefined {
  return bySlug.get(slug);
}

export function getLeadMagnetForCluster(
  cluster: ArticleCluster,
): LeadMagnet | undefined {
  return byCluster.get(cluster);
}
