import type { AutoclaveLoad } from "./types";

// Three loads run today. Cycle 043-A is pending its spore-test reading —
// the demo lets the operator mark it pass or fail; on fail, every patient
// whose tray came from this load is flagged for recall on WhatsApp.

export const initialLoads: AutoclaveLoad[] = [
  {
    id: "lo1",
    cycleId: "042-A",
    startedAt: "09:15",
    cycleType: "Class B vacuum · 134°C",
    durationMin: 18,
    pressureBar: 3.0,
    sporeStatus: "pass",
    trays: [
      {
        id: "lo1-t1",
        name: "Tray A · Restorative",
        patientName: "Hafiz Yusof",
        procedure: "Composite filling · 36",
        usedAt: "09:30",
      },
      {
        id: "lo1-t2",
        name: "Tray B · Hygiene",
        patientName: "Mei Lin Tan",
        procedure: "Polish & scale",
        usedAt: "10:30",
      },
      {
        id: "lo1-t3",
        name: "Tray C · Endo",
        patientName: "Lim Wei Jian",
        procedure: "RCT · 36 access",
        usedAt: "11:30",
      },
      {
        id: "lo1-t4",
        name: "Tray D · Surgical",
      },
    ],
  },
  {
    id: "lo2",
    cycleId: "043-A",
    startedAt: "11:30",
    cycleType: "Class B vacuum · 134°C",
    durationMin: 18,
    pressureBar: 3.0,
    sporeStatus: "pending",
    trays: [
      {
        id: "lo2-t1",
        name: "Tray A · Restorative",
        patientName: "Pavithra R",
        procedure: "Composite filling · 24",
        usedAt: "13:00",
      },
      {
        id: "lo2-t2",
        name: "Tray B · Hygiene",
        patientName: "Daniel Ong",
        procedure: "Polish & scale",
        usedAt: "14:00",
      },
      {
        id: "lo2-t3",
        name: "Tray C · Endo",
        patientName: "Tan Boon Hwee",
        procedure: "RCT · 24 obturation",
        usedAt: "15:00",
      },
      {
        id: "lo2-t4",
        name: "Tray D · Surgical",
        patientName: "Tay Wen Hui",
        procedure: "Surgical extraction · 38",
        usedAt: "16:00",
      },
    ],
  },
  {
    id: "lo3",
    cycleId: "044-N",
    startedAt: "14:00",
    cycleType: "Type N gravity · 121°C",
    durationMin: 30,
    pressureBar: 1.2,
    sporeStatus: "pass",
    trays: [
      { id: "lo3-t1", name: "Tray E · Mirrors & probes" },
      { id: "lo3-t2", name: "Tray F · Forceps" },
      { id: "lo3-t3", name: "Tray G · Burs assembly" },
    ],
  },
];
