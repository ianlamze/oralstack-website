import type { BookingDay, BookingReason, ReturningPatient } from "./types";

export const reasons: BookingReason[] = [
  {
    id: "hygiene",
    label: "Cleaning & polish",
    durationMin: 45,
    fromPriceLabel: "From SGD 110",
    description: "Six-month recall hygiene with the hygienist.",
  },
  {
    id: "checkup",
    label: "New patient checkup",
    durationMin: 30,
    fromPriceLabel: "From SGD 80",
    description: "First visit — exam, plan, billing transparent.",
  },
  {
    id: "whitening",
    label: "Whitening consult",
    durationMin: 30,
    fromPriceLabel: "From SGD 60",
    description: "Cosmetic conversation — Zoom or take-home options.",
  },
  {
    id: "tooth-pain",
    label: "Tooth pain",
    durationMin: 30,
    fromPriceLabel: "From SGD 80",
    description: "Same-week consult, triaged at the chair.",
  },
];

// Seven days of mock availability. Mirrors what a real chair calendar
// looks like: most days half-booked, a couple of slots tight.
export const days: BookingDay[] = [
  {
    date: "2026-04-28",
    weekday: "Tue",
    dayLabel: "Today",
    slots: [
      { time: "09:00", available: false },
      { time: "10:00", available: false },
      { time: "11:30", available: true },
      { time: "14:00", available: false },
      { time: "15:30", available: true },
      { time: "17:00", available: false },
    ],
  },
  {
    date: "2026-04-29",
    weekday: "Wed",
    dayLabel: "Tomorrow",
    slots: [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:30", available: false },
      { time: "14:00", available: true },
      { time: "15:30", available: true },
      { time: "17:00", available: false },
    ],
  },
  {
    date: "2026-04-30",
    weekday: "Thu",
    dayLabel: "30 Apr",
    slots: [
      { time: "09:00", available: false },
      { time: "10:00", available: true },
      { time: "11:30", available: true },
      { time: "14:00", available: false },
      { time: "15:30", available: false },
      { time: "17:00", available: true },
    ],
  },
  {
    date: "2026-05-01",
    weekday: "Fri",
    dayLabel: "1 May",
    slots: [
      { time: "09:00", available: true },
      { time: "10:00", available: false },
      { time: "11:30", available: false },
      { time: "14:00", available: true },
      { time: "15:30", available: true },
      { time: "17:00", available: true },
    ],
  },
  {
    date: "2026-05-02",
    weekday: "Sat",
    dayLabel: "2 May",
    slots: [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:30", available: true },
      { time: "14:00", available: false },
      { time: "15:30", available: false },
      { time: "17:00", available: false },
    ],
  },
  {
    date: "2026-05-04",
    weekday: "Mon",
    dayLabel: "4 May",
    slots: [
      { time: "09:00", available: false },
      { time: "10:00", available: true },
      { time: "11:30", available: true },
      { time: "14:00", available: true },
      { time: "15:30", available: false },
      { time: "17:00", available: true },
    ],
  },
  {
    date: "2026-05-05",
    weekday: "Tue",
    dayLabel: "5 May",
    slots: [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:30", available: true },
      { time: "14:00", available: false },
      { time: "15:30", available: true },
      { time: "17:00", available: true },
    ],
  },
];

// Mock returning patient — typing this phone number into step 3 triggers
// a "welcome back" lookup that pre-fills name and shows last visit.
export const returningPatient: ReturningPatient = {
  phone: "9123 4567",
  name: "Hafiz Yusof",
  lastVisit: "Hygiene · 28 Oct 2025",
};
