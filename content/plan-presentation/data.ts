import type { PlanContext, PlanConversion, PlanPhase } from "./types";

export const planContext: PlanContext = {
  patientName: "Demo patient 101",
  greeting: "Hi Demo patient 101, here's the plan we discussed.",
  presentedAt: "28 Apr 2026 · 11:30",
  presentedBy: "Provider A",
  insuranceLabel: "IPP · NTUC Plus + CHAS Blue",
};

export const initialPhases: PlanPhase[] = [
  {
    id: "phase-urgent",
    name: "What we should do soon",
    priority: "urgent",
    description: "Tooth 36 has a deep filling that's failing — best done this month.",
    acceptedByDefault: true,
    procedures: [
      {
        code: "EN302",
        label: "Root canal",
        toothLabel: "36",
        qty: 1,
        unitPriceSgd: 1280,
        insuranceSgd: 1100,
      },
      {
        code: "PR402",
        label: "Crown · PFM",
        toothLabel: "36",
        qty: 1,
        unitPriceSgd: 1450,
        insuranceSgd: 1280,
      },
    ],
  },
  {
    id: "phase-health",
    name: "Health-restoring",
    priority: "health",
    description: "Cleaning and a small filling on 24 — keeps things stable.",
    acceptedByDefault: true,
    procedures: [
      {
        code: "PR101",
        label: "Polish & scale",
        qty: 1,
        unitPriceSgd: 110,
        insuranceSgd: 42,
      },
      {
        code: "RE201",
        label: "Composite filling",
        toothLabel: "24",
        qty: 1,
        unitPriceSgd: 180,
        insuranceSgd: 0,
      },
    ],
  },
  {
    id: "phase-cosmetic",
    name: "When you're ready",
    priority: "cosmetic",
    description: "In-chair Zoom whitening — totally optional.",
    acceptedByDefault: false,
    procedures: [
      {
        code: "CO701",
        label: "Whitening · in-chair Zoom",
        qty: 1,
        unitPriceSgd: 580,
        insuranceSgd: 0,
      },
    ],
  },
];

export const conversion: PlanConversion = {
  presentedThisWeek: 12,
  acceptedToday: 0,
  acceptanceRate90d: 78,
};
