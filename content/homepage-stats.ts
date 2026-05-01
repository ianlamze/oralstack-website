// Stat band shown on the homepage after Workflows.
//
// Stat *values* are pulled from content/case-studies/dfi-synergy.ts (single
// source of truth — when DFI Synergy week-N numbers refresh in the case
// study, the homepage follows automatically). Labels and qualifiers are
// homepage-tailored: tighter wording, "DFI Synergy · …" prefix, and an
// order chosen for first-visit impact (3 days → 85% → 0 → 120+) rather
// than the case-study narrative order.
//
// The named destructuring below makes case-study reorderings visible on
// review: if the upstream order changes, the bindings here will read wrong
// against the values they're paired with.

import { dfiSynergy } from "@/content/case-studies/dfi-synergy";

type Stat = {
  value: string;
  label: string;
  qualifier?: string;
};

const [csTimeToLive, csNoneLost, csDragOps, csSameDayBilling] = dfiSynergy.stats;

export const homepageStats: Stat[] = [
  {
    value: csTimeToLive.value,
    label: "From kickoff to front desk live — schedule and billing in production.",
    qualifier: "DFI Synergy · Apr 2026",
  },
  {
    value: csSameDayBilling.value,
    label: "Same-day billing rate by week four, up from 60% pre-Oralstack.",
    qualifier: "DFI Synergy · pilot",
  },
  {
    value: csNoneLost.value,
    label: "Appointments lost in the cutover from the paper diary.",
    qualifier: "DFI Synergy · transition",
  },
  {
    value: csDragOps.value,
    label: "Drag-to-reschedule operations in week three alone.",
    qualifier: "DFI Synergy · week 3",
  },
];
