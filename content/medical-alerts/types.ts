export type Severity = "info" | "warn" | "block";

export type Allergy = {
  agent: string; // "Penicillin"
  reaction: string; // "Anaphylaxis (2018)"
  severity: Severity;
};

export type Medication = {
  name: string;
  reason?: string;
  notes?: string;
};

export type Condition = {
  name: string;
  detail?: string;
};

export type Alert = {
  severity: Severity;
  title: string;
  detail: string;
  reason: string;
};

export type PatientProfile = {
  id: string;
  name: string;
  age: number;
  bookedProcedure: string;
  bookedAt: string;
  allergies: Allergy[];
  medications: Medication[];
  conditions: Condition[];
  alerts: Alert[];
  /** Worst-case severity across all alerts; drives the patient's row badge. */
  riskLevel: Severity;
  acknowledged?: boolean;
};
