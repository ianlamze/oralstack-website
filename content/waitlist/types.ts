export type AppointmentStatus = "booked" | "cancelled" | "filled";

export type Appointment = {
  id: string;
  chair: 0 | 1 | 2;
  start: number;
  len: number;
  patientName: string;
  procedure: string;
  tone: "sea" | "violet" | "sunset";
  /** True for the slot the demo cancels. Only one in the dataset. */
  isCancelTarget?: boolean;
};

export type Candidate = {
  id: string;
  name: string;
  /** Days they've been waiting on the list. */
  waitingDays: number;
  /** Procedure they're on the waitlist for — used for the match label. */
  procedureWanted: string;
  /** 0..1 match score against the cancelled slot. */
  matchScore: number;
  /** Up to 4 short tags showing why they ranked here. */
  reasons: string[];
  distanceKm?: number;
  /** Overdue weeks for hygiene-driven candidates; surfaces an extra tag. */
  hygieneOverdueWeeks?: number;
};
