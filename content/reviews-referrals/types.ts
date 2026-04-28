export type ReviewStatus = "awaiting" | "sent" | "opened" | "completed" | "no_response";

export type ReferralSourceType =
  | "google"
  | "friend"
  | "doctor"
  | "walkin"
  | "insurance"
  | "returning";

export type ReferralSource = {
  type: ReferralSourceType;
  label: string;
  /** For "friend" or "doctor": the referrer's name (clickable in product). */
  referrerName?: string;
};

export type TimelineKind =
  | "visit"
  | "thank_you"
  | "review_request"
  | "review_opened"
  | "review_submitted";

export type TimelineEvent = {
  time: string;
  label: string;
  kind: TimelineKind;
};

export type ReviewVisit = {
  id: string;
  patientName: string;
  procedure: string;
  completedAt: string; // "Today 11:30"
  /** ISO-ish marker used purely for stable ordering. */
  sortKey: number;
  reviewStatus: ReviewStatus;
  reviewRating?: number; // 1–5
  reviewText?: string;
  referralSource: ReferralSource;
  timeline: TimelineEvent[];
};

export type LoopStats = {
  requestsSent30d: number;
  reviewsLanded30d: number;
  averageRating: number;
  newPatientsFromReferrals30d: number;
  topReferrerName: string;
  topReferrerCount: number;
};
