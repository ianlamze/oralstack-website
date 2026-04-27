import type { ComponentType } from "react";
import type { ArticleCluster } from "@/content/articles/types";

export type LeadMagnetMetadata = {
  slug: string;
  cluster: ArticleCluster;
  /** Title shown on the magnet page itself. */
  title: string;
  /** Used for the open-graph description and inline-form blurb fallback. */
  description: string;
  /** Short pitch shown inside the inline capture form on articles. ~25 words. */
  pitch: string;
  /** What the user receives in the email after capturing. ~10 words. */
  deliverable: string;
  /** Estimated reading minutes for the magnet itself. */
  readingMinutes: number;
  /** Date authored — for "Last reviewed" stamp. */
  publishedAt: string;
  updatedAt?: string;
};

export type LeadMagnet = LeadMagnetMetadata & {
  Body: ComponentType;
};
