import type { Appointment, Candidate } from "./types";

// 3 chairs · 9:00–15:00. The cancellation target sits squarely in the middle
// of the day so the visual change is unmissable when the demo fires.
export const initialAppointments: Appointment[] = [
  {
    id: "a1",
    chair: 0,
    start: 9,
    len: 1,
    patientName: "Demo patient 108",
    procedure: "Polish & scale",
    tone: "sea",
  },
  {
    id: "a2",
    chair: 1,
    start: 10,
    len: 2,
    patientName: "Demo patient 111",
    procedure: "Crown prep",
    tone: "sunset",
  },
  {
    id: "a3",
    chair: 2,
    start: 11,
    len: 1,
    patientName: "Demo patient 102",
    procedure: "Hygiene",
    tone: "sea",
    isCancelTarget: true,
  },
  {
    id: "a4",
    chair: 0,
    start: 13,
    len: 2,
    patientName: "Demo patient 107",
    procedure: "Implant review",
    tone: "violet",
  },
  {
    id: "a5",
    chair: 1,
    start: 14,
    len: 1,
    patientName: "Provider C",
    procedure: "Recall",
    tone: "sea",
  },
];

// Ranked candidates for the cancelled Hygiene slot. Scoring blends procedure
// match, slot-length fit, distance, and recall-age — kept transparent in the
// reasons array so the visitor can see the logic.
export const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Demo patient 101",
    waitingDays: 18,
    procedureWanted: "Hygiene",
    matchScore: 0.97,
    distanceKm: 0.5,
    hygieneOverdueWeeks: 8,
    reasons: ["Procedure match", "Slot length", "0.5km away", "8 weeks overdue"],
  },
  {
    id: "c2",
    name: "Demo patient 109",
    waitingDays: 12,
    procedureWanted: "Hygiene",
    matchScore: 0.84,
    distanceKm: 2.1,
    hygieneOverdueWeeks: 4,
    reasons: ["Procedure match", "Slot length", "2km away"],
  },
  {
    id: "c3",
    name: "Demo patient 110",
    waitingDays: 6,
    procedureWanted: "Polish & scale",
    matchScore: 0.71,
    distanceKm: 4.8,
    hygieneOverdueWeeks: 2,
    reasons: ["Slot length", "5km away", "Adjacent procedure"],
  },
];
