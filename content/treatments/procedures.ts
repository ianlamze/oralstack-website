import type { Procedure } from "./types";

// Indicative Singapore-context dental procedures. Pricing ranges reflect
// typical 2026 GP-clinic averages — clinic-owner readers will calibrate
// from their own price list, so the goal is "feels right," not "exact."
//
// Insurance coverage is a single blended figure assuming CHAS Blue +
// average IPP. The output footnote on the demo discloses this.

export const procedures: Procedure[] = [
  // --- Preventive ---
  {
    code: "DCC301",
    name: "Polish & scale (basic)",
    category: "preventive",
    applicableTeeth: "all",
    basePriceLow: 80,
    basePriceHigh: 120,
    insuranceCoverage: 0.5,
    defaultPhase: 1,
  },
  {
    code: "DCC302",
    name: "Scaling & root planing",
    category: "preventive",
    applicableTeeth: "all",
    basePriceLow: 150,
    basePriceHigh: 250,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },
  {
    code: "DCC305",
    name: "Fluoride treatment",
    category: "preventive",
    applicableTeeth: "all",
    basePriceLow: 60,
    basePriceHigh: 100,
    insuranceCoverage: 0.3,
    defaultPhase: 1,
  },

  // --- Restorative ---
  {
    code: "DCC107",
    name: "Composite filling (1 surface)",
    category: "restorative",
    applicableTeeth: "all",
    basePriceLow: 120,
    basePriceHigh: 180,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },
  {
    code: "DCC108",
    name: "Composite filling (2 surface)",
    category: "restorative",
    applicableTeeth: "all",
    basePriceLow: 180,
    basePriceHigh: 280,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },
  {
    code: "DCC109",
    name: "Composite filling (3+ surface)",
    category: "restorative",
    applicableTeeth: "all",
    basePriceLow: 240,
    basePriceHigh: 380,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },

  // --- Endodontic ---
  {
    code: "DCC401",
    name: "Root canal therapy (anterior)",
    category: "endo",
    applicableTeeth: "anterior",
    basePriceLow: 700,
    basePriceHigh: 1200,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },
  {
    code: "DCC402",
    name: "Root canal therapy (premolar)",
    category: "endo",
    applicableTeeth: "premolar",
    basePriceLow: 900,
    basePriceHigh: 1500,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },
  {
    code: "DCC403",
    name: "Root canal therapy (molar)",
    category: "endo",
    applicableTeeth: "molar",
    basePriceLow: 1200,
    basePriceHigh: 2000,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },

  // --- Surgical ---
  {
    code: "DCC601",
    name: "Extraction (simple)",
    category: "surgical",
    applicableTeeth: "all",
    basePriceLow: 80,
    basePriceHigh: 200,
    insuranceCoverage: 0.3,
    defaultPhase: 1,
  },
  {
    code: "DCC602",
    name: "Extraction (surgical)",
    category: "surgical",
    applicableTeeth: "all",
    basePriceLow: 300,
    basePriceHigh: 800,
    insuranceCoverage: 0.4,
    defaultPhase: 1,
  },

  // --- Prosthetic ---
  {
    code: "DCC502",
    name: "Crown, ceramic",
    category: "prosthetic",
    applicableTeeth: "all",
    basePriceLow: 1300,
    basePriceHigh: 2200,
    insuranceCoverage: 0.3,
    defaultPhase: 2,
  },
];

export const procedureByCode: Record<string, Procedure> = Object.fromEntries(
  procedures.map((p) => [p.code, p]),
);

export const categoryLabel: Record<Procedure["category"], string> = {
  preventive: "Preventive",
  restorative: "Restorative",
  endo: "Endodontic",
  surgical: "Surgical",
  prosthetic: "Prosthetic",
};

export const phaseLabel: Record<1 | 2 | 3, string> = {
  1: "Phase 1 · critical",
  2: "Phase 2 · stabilisation",
  3: "Phase 3 · optional",
};
