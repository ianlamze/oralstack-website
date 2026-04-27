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

export type ArticleCTA = {
  /** Small uppercase label above the heading. */
  eyebrow: string;
  /** Heading shown in the CTA block. */
  title: string;
  /** Supporting copy under the heading. Keep to ~30 words. */
  body: string;
  /** Visible button label. */
  buttonLabel: string;
  /** Internal href the button points at. */
  buttonHref: string;
};

/**
 * Default CTA per cluster. Each article inherits its cluster's default unless
 * it overrides via the `cta` field. Keeps the renderer one-line and means a new
 * article gets a sensible CTA for free.
 */
export const clusterDefaultCTA: Record<ArticleCluster, ArticleCTA> = {
  "front-desk": {
    eyebrow: "See it in production",
    title: "Front-desk workflows in Oralstack",
    body: "Drag-to-reschedule, recall surfacing, WhatsApp confirmations — on one screen, timezone-correct. A 30-minute demo walks the front desk through every motion they run on a normal Tuesday.",
    buttonLabel: "See the front-desk workflow",
    buttonHref: "/workflows#front-desk",
  },
  billing: {
    eyebrow: "See it in production",
    title: "Same-flow billing in Oralstack",
    body: "Treatment lines auto-populate from the chart. Insurance and patient portion stay structurally separate. The bill is ready before the patient stands up.",
    buttonLabel: "See the billing workflow",
    buttonHref: "/workflows#billing",
  },
  clinical: {
    eyebrow: "See it in production",
    title: "Tooth-led charting and imaging",
    body: "FDI numbering native, surfaces tied to case notes, DICOM viewer in the chart, sensor bridge for chairside capture. The chart is the source of truth — billing and imaging hang off it.",
    buttonLabel: "See the charting workflow",
    buttonHref: "/workflows#charting",
  },
  migration: {
    eyebrow: "Migration support",
    title: "Moving from Plato or Open Dental?",
    body: "We've done this before — patient list, treatment history, billing ledger, recall queue, all preserved. A 30-minute demo includes a migration walk-through specific to your current PMS.",
    buttonLabel: "Book a migration walk-through",
    buttonHref: "/book-a-demo",
  },
  compliance: {
    eyebrow: "Compliance & trust",
    title: "How Oralstack handles audit and PDPA",
    body: "Append-only audit log, role-based access, tenant isolation, MOH-aligned retention windows. The trust foundations regulators and dental groups actually look at.",
    buttonLabel: "See the trust posture",
    buttonHref: "/security",
  },
};

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
  /**
   * Marks this article as the canonical "start here" entry for its cluster.
   * Canonical articles are pinned to the top of cluster lists regardless of
   * publish date, with a "Start here" badge. At most one per cluster — if
   * multiple are flagged the first is used.
   */
  canonical?: boolean;
  /** Optional override of the cluster-default CTA. */
  cta?: ArticleCTA;
};

/**
 * Slug-ify a tag for use in URLs (e.g. "audit log" → "audit-log").
 * Used for /articles/tag/[tag] routing.
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Article = ArticleMetadata & {
  Body: ComponentType;
};
