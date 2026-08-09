import type { Period, Provider } from "./types";

export const periods: Period[] = [
  { id: "wtd", label: "Week to date", daysLabel: "7 days", scale: 0.25 },
  { id: "mtd", label: "Month to date", daysLabel: "28 days", scale: 1.0 },
  { id: "qtd", label: "Quarter to date", daysLabel: "84 days", scale: 3.1 },
];

// Numbers calibrated to a 3-chair Singapore clinic doing roughly SGD 52k
// production a month — Sample Dental Clinic's actual band. Owner takes draws (no
// commission), associate is 40% of collection on her cases, hygienists
// are hourly plus a 15% bonus on recall conversions.

export const initialProviders: Provider[] = [
  {
    id: "pr1",
    name: "Provider A",
    role: "owner",
    ruleDescription: "Owner · draws against profit · no commission line.",
    productionSgd: 25400,
    collectionSgd: 24100,
    commissionSgd: 0,
    hours: 145,
    procedureMix: [
      { category: "Restorative", productionSgd: 9800 },
      { category: "Endo", productionSgd: 7600 },
      { category: "Crown & bridge", productionSgd: 4800 },
      { category: "Surgical", productionSgd: 3200 },
    ],
  },
  {
    id: "pr2",
    name: "Provider B",
    role: "associate",
    ruleDescription: "Associate · 40% of collection on her cases · paid monthly.",
    productionSgd: 18200,
    collectionSgd: 17100,
    commissionSgd: 6840,
    hours: 132,
    procedureMix: [
      { category: "Restorative", productionSgd: 7200 },
      { category: "Crown & bridge", productionSgd: 6400 },
      { category: "Endo", productionSgd: 4600 },
    ],
  },
  {
    id: "pr3",
    name: "Provider C",
    role: "hygienist",
    ruleDescription:
      "Hygienist · SGD 35/hour base · 15% credit on procedures booked from her recall reminders.",
    productionSgd: 4800,
    collectionSgd: 4600,
    commissionSgd: 4700,
    hours: 100,
    procedureMix: [
      { category: "Hygiene", productionSgd: 4400 },
      { category: "Perio", productionSgd: 400 },
    ],
    recallCredits: [
      { patientName: "Demo patient 101", procedure: "Composite filling · 36", productionSgd: 280 },
      { patientName: "Demo patient 103", procedure: "RCT · 36", productionSgd: 1280 },
      { patientName: "Demo patient 107", procedure: "Veneer · 11", productionSgd: 1450 },
      { patientName: "Demo patient 105", procedure: "Polish & scale", productionSgd: 110 },
    ],
  },
  {
    id: "pr4",
    name: "Provider D",
    role: "hygienist",
    ruleDescription:
      "Hygienist · SGD 35/hour base · 15% credit on procedures booked from his recall reminders.",
    productionSgd: 3600,
    collectionSgd: 3400,
    commissionSgd: 3690,
    hours: 80,
    procedureMix: [
      { category: "Hygiene", productionSgd: 3300 },
      { category: "Perio", productionSgd: 300 },
    ],
    recallCredits: [
      { patientName: "Demo patient 102", procedure: "Polish & scale", productionSgd: 110 },
      { patientName: "Demo patient 104", procedure: "Crown · 24", productionSgd: 1450 },
      {
        patientName: "Demo patient 106",
        procedure: "Surgical extraction · 47",
        productionSgd: 800,
      },
    ],
  },
];
