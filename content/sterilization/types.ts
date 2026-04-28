export type SporeStatus = "pass" | "pending" | "fail";

export type Tray = {
  id: string;
  name: string; // "Tray A · Restorative"
  /** If used after sterilisation, the patient/procedure that consumed it. */
  patientName?: string;
  procedure?: string;
  usedAt?: string; // "11:30"
};

export type AutoclaveLoad = {
  id: string;
  cycleId: string; // "042-A"
  startedAt: string; // "09:15"
  cycleType: string; // "Class B vacuum · 134°C"
  durationMin: number;
  pressureBar: number;
  sporeStatus: SporeStatus;
  trays: Tray[];
};
