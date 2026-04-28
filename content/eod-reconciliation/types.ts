export type PaymentMode = "PayNow" | "Card" | "Cash" | "Bank";

export type Transaction = {
  id: string;
  time: string; // HH:MM
  mode: PaymentMode;
  amount: number;
  patientName: string;
  /** Linked invoice number; null = unmatched (the demo's mismatch). */
  invoice: string | null;
};

export type ModeSummary = {
  mode: PaymentMode;
  collected: number;
  expected: number;
  count: number;
};
