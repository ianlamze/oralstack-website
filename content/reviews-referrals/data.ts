import type { LoopStats, ReviewVisit } from "./types";

// Six recent visits across the lifecycle. Mei Lin Tan just finished — the
// review request hasn't fired yet, demo lets the operator send it. Hafiz
// Yusof shows the full happy-path including a friend referral chain.

export const initialVisits: ReviewVisit[] = [
  {
    id: "rv1",
    patientName: "Mei Lin Tan",
    procedure: "Polish & scale",
    completedAt: "Today · 11:30",
    sortKey: 6,
    reviewStatus: "awaiting",
    referralSource: { type: "google", label: "Google Maps" },
    timeline: [{ time: "11:30", label: "Visit completed · Dr Wong", kind: "visit" }],
  },
  {
    id: "rv2",
    patientName: "Hafiz Yusof",
    procedure: "Composite filling · 36",
    completedAt: "Yesterday · 09:30",
    sortKey: 5,
    reviewStatus: "completed",
    reviewRating: 5,
    reviewText:
      "Dr Wong took the time to explain everything. Painless, quick, fair price. The WhatsApp confirmation was a nice touch.",
    referralSource: {
      type: "friend",
      label: "Friend referral",
      referrerName: "Lim Wei Jian",
    },
    timeline: [
      { time: "Yesterday · 09:30", label: "Visit completed · Dr Wong", kind: "visit" },
      { time: "Yesterday · 09:35", label: "Thank-you message sent on WhatsApp", kind: "thank_you" },
      {
        time: "Today · 09:30",
        label: "Review request sent · 24h after visit",
        kind: "review_request",
      },
      { time: "Today · 10:14", label: "Patient opened the request", kind: "review_opened" },
      {
        time: "Today · 10:21",
        label: "Review submitted · 5★ on Google",
        kind: "review_submitted",
      },
    ],
  },
  {
    id: "rv3",
    patientName: "K. Lee",
    procedure: "Veneer · 11",
    completedAt: "3 days ago · 14:00",
    sortKey: 4,
    reviewStatus: "completed",
    reviewRating: 4,
    reviewText: "Result is great. Front desk was efficient. The chair is a bit tight.",
    referralSource: {
      type: "doctor",
      label: "Doctor referral",
      referrerName: "Dr Tan · Singapore General Hospital",
    },
    timeline: [
      { time: "3 days ago · 14:00", label: "Visit completed · Dr Wong", kind: "visit" },
      {
        time: "3 days ago · 14:05",
        label: "Thank-you message sent on WhatsApp",
        kind: "thank_you",
      },
      {
        time: "2 days ago · 14:00",
        label: "Review request sent · 24h after visit",
        kind: "review_request",
      },
      { time: "2 days ago · 16:45", label: "Patient opened the request", kind: "review_opened" },
      {
        time: "2 days ago · 16:51",
        label: "Review submitted · 4★ on Google",
        kind: "review_submitted",
      },
    ],
  },
  {
    id: "rv4",
    patientName: "Pavithra R",
    procedure: "Polish & scale",
    completedAt: "4 days ago · 10:30",
    sortKey: 3,
    reviewStatus: "opened",
    referralSource: {
      type: "friend",
      label: "Friend referral",
      referrerName: "K. Lee",
    },
    timeline: [
      { time: "4 days ago · 10:30", label: "Visit completed · Dr Lim", kind: "visit" },
      {
        time: "4 days ago · 10:35",
        label: "Thank-you message sent on WhatsApp",
        kind: "thank_you",
      },
      {
        time: "3 days ago · 10:30",
        label: "Review request sent · 24h after visit",
        kind: "review_request",
      },
      { time: "2 days ago · 18:00", label: "Patient opened the request", kind: "review_opened" },
    ],
  },
  {
    id: "rv5",
    patientName: "Lim Wei Jian",
    procedure: "RCT · 36 obturation",
    completedAt: "5 days ago · 15:00",
    sortKey: 2,
    reviewStatus: "no_response",
    referralSource: { type: "returning", label: "Returning patient" },
    timeline: [
      { time: "5 days ago · 15:00", label: "Visit completed · Dr Wong", kind: "visit" },
      {
        time: "5 days ago · 15:08",
        label: "Thank-you message sent on WhatsApp",
        kind: "thank_you",
      },
      {
        time: "4 days ago · 15:00",
        label: "Review request sent · 24h after visit",
        kind: "review_request",
      },
    ],
  },
  {
    id: "rv6",
    patientName: "Daniel Ong",
    procedure: "Surgical extraction · 47",
    completedAt: "1 week ago · 11:00",
    sortKey: 1,
    reviewStatus: "completed",
    reviewRating: 5,
    reviewText: "Difficult extraction handled gently. Highly recommend.",
    referralSource: { type: "insurance", label: "IPP directory · NTUC Plus" },
    timeline: [
      { time: "1 week ago · 11:00", label: "Visit completed · Dr Wong", kind: "visit" },
      {
        time: "1 week ago · 11:08",
        label: "Thank-you message sent on WhatsApp",
        kind: "thank_you",
      },
      {
        time: "6 days ago · 11:00",
        label: "Review request sent · 24h after visit",
        kind: "review_request",
      },
      { time: "6 days ago · 19:32", label: "Patient opened the request", kind: "review_opened" },
      {
        time: "6 days ago · 19:38",
        label: "Review submitted · 5★ on Google",
        kind: "review_submitted",
      },
    ],
  },
];

export const initialStats: LoopStats = {
  requestsSent30d: 42,
  reviewsLanded30d: 28,
  averageRating: 4.9,
  newPatientsFromReferrals30d: 12,
  topReferrerName: "Hafiz Yusof",
  topReferrerCount: 3,
};
