import type { LabOrder, StageMeta } from "./types";

export const stages: StageMeta[] = [
  { id: "sent", label: "Sent to lab", hint: "Awaiting lab receipt." },
  { id: "at-lab", label: "At the lab", hint: "In production." },
  { id: "ready", label: "Ready to seat", hint: "Back from lab; seat appt scheduled." },
  { id: "seated", label: "Seated", hint: "Done." },
];

// Six lab orders across the four stages. K. Lee is the slip case — lab
// confirmed delay yesterday, original seat appt now at risk. Clicking the
// card surfaces the auto-reschedule suggestion.

export const initialOrders: LabOrder[] = [
  {
    id: "lo1",
    patientName: "Hafiz Yusof",
    toothLabel: "36 · PFM crown",
    labName: "Asia Dental Lab",
    sentDate: "26 Apr",
    expectedReady: "Mon 4 May",
    seatAppt: "Tue 5 May · 14:30 · Dr Wong",
    stage: "sent",
  },
  {
    id: "lo2",
    patientName: "Mei Lin Tan",
    toothLabel: "24 · zirconia crown",
    labName: "Asia Dental Lab",
    sentDate: "23 Apr",
    expectedReady: "Wed 30 Apr",
    seatAppt: "Thu 1 May · 10:00 · Dr Lim",
    stage: "at-lab",
  },
  {
    id: "lo3",
    patientName: "K. Lee",
    toothLabel: "11 · porcelain veneer",
    labName: "Imperial Lab SG",
    sentDate: "21 Apr",
    expectedReady: "Mon 4 May",
    seatAppt: "Tue 28 Apr · 15:00 · Dr Wong",
    stage: "at-lab",
    slipped: true,
    suggestedReschedule: "Mon 4 May · 15:30 · Dr Wong",
  },
  {
    id: "lo4",
    patientName: "Lim Wei Jian",
    toothLabel: "36 · endo crown",
    labName: "Asia Dental Lab",
    sentDate: "18 Apr",
    expectedReady: "Mon 27 Apr",
    seatAppt: "Wed 30 Apr · 11:00 · Dr Wong",
    stage: "ready",
  },
  {
    id: "lo5",
    patientName: "Pavithra R",
    toothLabel: "12–22 · 4-unit bridge",
    labName: "Imperial Lab SG",
    sentDate: "15 Apr",
    expectedReady: "Fri 25 Apr",
    seatAppt: "Thu 1 May · 09:30 · Dr Lim",
    stage: "ready",
  },
  {
    id: "lo6",
    patientName: "Daniel Ong",
    toothLabel: "36 · PFM crown",
    labName: "Asia Dental Lab",
    sentDate: "8 Apr",
    expectedReady: "Mon 20 Apr",
    seatAppt: "Wed 22 Apr · 14:00 · Dr Wong",
    stage: "seated",
  },
];
