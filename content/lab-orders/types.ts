export type LabStage = "sent" | "at-lab" | "ready" | "seated";

export type LabOrder = {
  id: string;
  patientName: string;
  toothLabel: string; // e.g. "36 · PFM crown"
  labName: string;
  sentDate: string; // "26 Apr"
  expectedReady: string; // "Mon 4 May"
  seatAppt: string; // "Wed 30 Apr · 14:00 · Dr Wong"
  stage: LabStage;
  slipped?: boolean;
  /** Suggested new seat date if slipped; shown when user clicks reschedule. */
  suggestedReschedule?: string;
};

export type StageMeta = {
  id: LabStage;
  label: string;
  hint: string;
};
