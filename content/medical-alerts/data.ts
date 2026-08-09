import type { PatientProfile } from "./types";

// Five patients across the severity spectrum. Demo patient 101 opens the demo —
// penicillin allergy + amoxicillin pre-med = blocked, must acknowledge a
// substitution before booking proceeds. Demo patient 104 shows the warfarin
// case (warn). Demo patient 106 shows a benign info-level alert.

export const initialPatients: PatientProfile[] = [
  {
    id: "ma1",
    name: "Demo patient 101",
    age: 29,
    bookedProcedure: "Surgical extraction · 38",
    bookedAt: "Tomorrow · 14:00 · Provider A",
    allergies: [
      {
        agent: "Penicillin",
        reaction: "Anaphylaxis (2018)",
        severity: "block",
      },
    ],
    medications: [],
    conditions: [],
    alerts: [
      {
        severity: "block",
        title: "Penicillin allergy · pre-med contraindicated",
        detail:
          "Standard amoxicillin pre-med is contraindicated. Substitute clindamycin 600 mg, 1 hour pre-op. Confirm no clindamycin sensitivity at chair-side.",
        reason: "Patient allergy + planned surgical extraction",
      },
    ],
    riskLevel: "block",
  },
  {
    id: "ma2",
    name: "Demo patient 104",
    age: 62,
    bookedProcedure: "Surgical extraction · 47",
    bookedAt: "Thu 1 May · 09:00 · Provider A",
    allergies: [],
    medications: [
      {
        name: "Warfarin 5 mg daily",
        reason: "Atrial fibrillation",
        notes: "Last INR (5 Apr): 2.4 · target 2.0–3.0",
      },
      { name: "Metformin 500 mg BD", reason: "Type 2 diabetes" },
    ],
    conditions: [
      {
        name: "Atrial fibrillation",
        detail: "Cardiologist: External specialist A · specialist centre",
      },
      { name: "Type 2 diabetes", detail: "HbA1c 7.2% (Mar)" },
    ],
    alerts: [
      {
        severity: "warn",
        title: "On warfarin · confirm INR <3.5 pre-op",
        detail:
          "Last INR is 6 weeks old. Order an INR within 24 hours of the procedure; postpone if >3.5.",
        reason: "Anticoagulant + surgical extraction",
      },
      {
        severity: "info",
        title: "Coordinate with cardiologist on warfarin hold",
        detail:
          "External specialist A (specialist centre) typically advises continuing warfarin through routine extractions; confirm before chair.",
        reason: "Anticoagulation management",
      },
    ],
    riskLevel: "warn",
  },
  {
    id: "ma3",
    name: "Demo patient 105",
    age: 54,
    bookedProcedure: "Implant placement · 36",
    bookedAt: "Mon 4 May · 10:00 · Provider B",
    allergies: [],
    medications: [
      {
        name: "Alendronate 70 mg weekly",
        reason: "Osteoporosis",
        notes: "On therapy 4 years",
      },
    ],
    conditions: [{ name: "Osteoporosis", detail: "DEXA T-score −2.7 (2022)" }],
    alerts: [
      {
        severity: "warn",
        title: "Bisphosphonate >3 years · MRONJ risk",
        detail:
          "Risk of medication-related osteonecrosis of the jaw. Counsel patient, document consent. Consider drug holiday with prescribing doctor.",
        reason: "Long-term oral bisphosphonate + bone-invasive procedure",
      },
    ],
    riskLevel: "warn",
  },
  {
    id: "ma4",
    name: "Demo patient 106",
    age: 38,
    bookedProcedure: "Composite filling · 26",
    bookedAt: "Today · 15:00 · Provider B",
    allergies: [
      {
        agent: "Latex",
        reaction: "Contact dermatitis (mild)",
        severity: "info",
      },
    ],
    medications: [],
    conditions: [],
    alerts: [
      {
        severity: "info",
        title: "Latex allergy · use nitrile",
        detail:
          "Use nitrile gloves and a non-latex rubber dam. Standard dental composite materials are compatible.",
        reason: "Patient-reported latex sensitivity",
      },
    ],
    riskLevel: "info",
  },
  {
    id: "ma5",
    name: "Demo patient 102",
    age: 34,
    bookedProcedure: "Polish & scale",
    bookedAt: "Today · 11:30 · Provider C",
    allergies: [],
    medications: [{ name: "Prenatal multivitamin" }],
    conditions: [{ name: "Pregnant", detail: "T2 · 22 weeks" }],
    alerts: [
      {
        severity: "info",
        title: "Pregnancy T2 · safe window for routine work",
        detail:
          "Second trimester is the safest window for routine hygiene. Avoid elective radiographs; if imaging is essential, use lead apron + thyroid collar.",
        reason: "Pregnancy + dental visit",
      },
    ],
    riskLevel: "info",
  },
];
