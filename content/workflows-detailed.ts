import {
  capabilityAvailabilityLabels,
  productCapabilities,
  type CapabilityAvailability,
  type CapabilityFeature,
  type CapabilityVisual,
} from "@/content/product-capabilities";

export type WorkflowDetail = {
  slug: string;
  legacySlugs: readonly string[];
  eyebrow: string;
  title: string;
  body: string;
  availability: CapabilityAvailability;
  availabilityLabel: string;
  visual?: CapabilityVisual;
  features: readonly CapabilityFeature[];
  keepsTogether: string;
  boundary: string;
};

export const workflowsDetailed: WorkflowDetail[] = productCapabilities.map((capability) => ({
  slug: capability.slug,
  legacySlugs: capability.legacySlugs,
  eyebrow: capability.eyebrow,
  title: capability.title,
  body: capability.summary,
  availability: capability.availability,
  availabilityLabel: capabilityAvailabilityLabels[capability.availability],
  visual: capability.visual,
  features: capability.features,
  keepsTogether: capability.keepsTogether,
  boundary: capability.boundary,
}));
