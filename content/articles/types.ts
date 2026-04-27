import type { ComponentType } from "react";

export type ArticleCluster = "front-desk" | "billing" | "clinical" | "migration" | "compliance";

export const clusterLabels: Record<ArticleCluster, string> = {
  "front-desk": "Front desk",
  billing: "Billing & revenue",
  clinical: "Clinical workflows",
  migration: "Migration & operations",
  compliance: "Compliance & trust",
};

export const clusterDescriptions: Record<ArticleCluster, string> = {
  "front-desk":
    "Scheduling, recall, no-shows, and the workflows the front desk lives in every shift.",
  billing: "Discharge-flow billing, GST, insurance, A/R, and the moments money actually moves.",
  clinical:
    "Charting, case notes, imaging, tooth-led record-keeping, and what makes clinical work feel fast.",
  migration:
    "Moving from legacy PMS to cloud — no-fallback cutover, staff retraining, and data continuity.",
  compliance:
    "Singapore PDPA, audit logs, tenant isolation, and the trust foundations dental records need.",
};

export const clusterOrder: ArticleCluster[] = [
  "front-desk",
  "billing",
  "clinical",
  "migration",
  "compliance",
];

export type ArticleMetadata = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  cluster: ArticleCluster;
  tags: string[];
  readingMinutes: number;
};

export type Article = ArticleMetadata & {
  Body: ComponentType;
};
