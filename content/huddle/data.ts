// Demo data for the daily huddle dashboard. All names + numbers are
// illustrative; calibrated to a 3-chair single-clinic day at Sample Dental Clinic.

export type ScheduleSlot = {
  time: string;
  chair: number; // 1, 2, 3
  filled: boolean;
  label?: string;
};

export const todaySchedule: ScheduleSlot[] = [
  { time: "09:00", chair: 1, filled: true, label: "Polish" },
  { time: "09:00", chair: 2, filled: true, label: "Recall" },
  { time: "09:00", chair: 3, filled: false },
  { time: "10:00", chair: 1, filled: true, label: "Crown" },
  { time: "10:00", chair: 2, filled: true, label: "Implant" },
  { time: "10:00", chair: 3, filled: true, label: "Hygiene" },
  { time: "11:00", chair: 1, filled: true, label: "Filling" },
  { time: "11:00", chair: 2, filled: true, label: "Polish" },
  { time: "11:00", chair: 3, filled: false },
  { time: "12:00", chair: 1, filled: true, label: "Recall" },
  { time: "12:00", chair: 2, filled: false },
  { time: "12:00", chair: 3, filled: true, label: "Polish" },
  { time: "13:00", chair: 1, filled: true, label: "RCT" },
  { time: "13:00", chair: 2, filled: true, label: "Crown" },
  { time: "13:00", chair: 3, filled: true, label: "Hygiene" },
  { time: "14:00", chair: 1, filled: true, label: "Recall" },
  { time: "14:00", chair: 2, filled: true, label: "Filling" },
  { time: "14:00", chair: 3, filled: true, label: "Polish" },
];

export const recallOpportunities = [
  { name: "Demo patient 101", overdueWeeks: 8, lastVisit: "20 Feb", procedure: "Hygiene" },
  { name: "Demo patient 102", overdueWeeks: 5, lastVisit: "1 Mar", procedure: "Polish & scale" },
  { name: "Demo patient 103", overdueWeeks: 6, lastVisit: "31 Oct", procedure: "Hygiene" },
];

export const arRedFlags = [
  { name: "Demo patient 107", invoice: "INV-0398", daysOutstanding: 47, amount: 850 },
  { name: "Demo patient 110", invoice: "INV-0412", daysOutstanding: 32, amount: 420 },
  { name: "Demo patient 109", invoice: "INV-0405", daysOutstanding: 31, amount: 280 },
];

export const productionToday = {
  current: 4250, // SGD
  goal: 5500,
  hygieneRecareRate: 0.78, // 78%
};
