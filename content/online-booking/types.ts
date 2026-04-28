export type BookingReason = {
  id: string;
  label: string;
  durationMin: number;
  fromPriceLabel: string;
  description: string;
};

export type TimeSlot = {
  time: string; // "09:00"
  available: boolean;
};

export type BookingDay = {
  date: string; // ISO YYYY-MM-DD
  weekday: string; // "Tue"
  dayLabel: string; // "Today" / "Tomorrow" / "29 Apr"
  slots: TimeSlot[];
};

export type ReturningPatient = {
  phone: string;
  name: string;
  lastVisit: string;
};
