export type InventoryStatus = "ok" | "low" | "below_par" | "ordered";

export type InventoryItem = {
  id: string;
  name: string;
  category: string; // "Restorative", "Anesthesia", "PPE", "Disposables"
  unit: string; // "syringe", "carpule", "box", "tip"
  parMin: number;
  parTarget: number;
  stock: number;
  vendor: string;
  unitCostSgd: number;
  reorderQty: number;
  status: InventoryStatus;
  /** Stock used per day for the last 7 days (oldest → newest). */
  weeklyUsage: number[];
  /** Populated when status === "ordered". */
  reorderEta?: string;
};

export type DeductionLog = {
  id: string;
  time: string;
  patientName: string;
  procedure: string;
  itemsDeducted: { name: string; qty: number; unit: string }[];
};
