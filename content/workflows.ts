import {
  capabilityAvailabilityLabels,
  productCapabilities,
  type CapabilityAvailability,
  type CapabilityVisual,
} from "@/content/product-capabilities";

export type Workflow = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  availability: CapabilityAvailability;
  availabilityLabel: string;
  visual?: CapabilityVisual;
};

export const workflows: Workflow[] = productCapabilities.map((capability) => ({
  slug: capability.slug,
  eyebrow: capability.eyebrow,
  title: capability.title,
  summary: capability.summary,
  availability: capability.availability,
  availabilityLabel: capabilityAvailabilityLabels[capability.availability],
  visual: capability.visual,
}));
