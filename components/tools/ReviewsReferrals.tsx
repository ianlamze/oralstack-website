"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Check,
  ExternalLink,
  RotateCcw,
  Send,
  Star,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";
import { initialStats, initialVisits } from "@/content/reviews-referrals/data";
import type {
  ReferralSourceType,
  ReviewStatus,
  ReviewVisit,
  TimelineKind,
} from "@/content/reviews-referrals/types";
import { track } from "@/lib/analytics";

type Filter = "all" | ReviewStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "awaiting", label: "Awaiting" },
  { id: "sent", label: "Sent" },
  { id: "opened", label: "Opened" },
  { id: "completed", label: "Completed" },
  { id: "no_response", label: "No response" },
];

const STATUS_LABEL: Record<ReviewStatus, string> = {
  awaiting: "Awaiting",
  sent: "Sent",
  opened: "Opened",
  completed: "Completed",
  no_response: "No response",
};

const SOURCE_ICON: Record<ReferralSourceType, typeof Star> = {
  google: Star,
  friend: Users,
  doctor: Stethoscope,
  walkin: UserPlus,
  insurance: ExternalLink,
  returning: RotateCcw,
};

const DEMO_VISIT_ID = "rv1"; // Mei Lin Tan · awaiting — best demo opener

export default function ReviewsReferrals() {
  const [visits, setVisits] = useState<ReviewVisit[]>(initialVisits);
  const [selectedId, setSelectedId] = useState<string>(DEMO_VISIT_ID);
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const sorted = useMemo(() => [...visits].sort((a, b) => b.sortKey - a.sortKey), [visits]);

  const filtered = useMemo(
    () => (filter === "all" ? sorted : sorted.filter((v) => v.reviewStatus === filter)),
    [sorted, filter],
  );

  const selected = useMemo(
    () => visits.find((v) => v.id === selectedId) ?? visits[0],
    [visits, selectedId],
  );

  const dynamicStats = useMemo(() => {
    const sentCount = visits.filter((v) => v.reviewStatus !== "awaiting").length;
    const completedCount = visits.filter((v) => v.reviewStatus === "completed").length;
    const ratings = visits
      .filter((v) => typeof v.reviewRating === "number")
      .map((v) => v.reviewRating ?? 0);
    const liveAvg =
      ratings.length > 0
        ? Math.round((ratings.reduce((s, n) => s + n, 0) / ratings.length) * 10) / 10
        : 0;
    return { sentCount, completedCount, liveAvg };
  }, [visits]);

  function selectVisit(id: string) {
    setSelectedId(id);
    track("reviews_visit_opened", { visit_id: id });
  }

  function sendRequest(id: string) {
    setVisits((prev) =>
      prev.map((v) => {
        if (v.id !== id) return v;
        if (v.reviewStatus !== "awaiting") return v;
        return {
          ...v,
          reviewStatus: "sent",
          timeline: [
            ...v.timeline,
            {
              time: "just now",
              label: "Thank-you message sent on WhatsApp",
              kind: "thank_you",
            },
            {
              time: "queued · 24h",
              label: "Review request scheduled · fires 24h after visit",
              kind: "review_request",
            },
          ],
        };
      }),
    );
    track("reviews_request_sent", { visit_id: id });
  }

  function reset() {
    setVisits(initialVisits);
    setSelectedId(DEMO_VISIT_ID);
    setFilter("all");
    track("reviews_reset");
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Reviews & referrals · post-visit loop</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--color-tide-deep)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-tide-deep)]"
            />
            Live demo
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          DFI Synergy · last 30 days
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5">
        <Stat label="Requests sent · 30d" value={`${initialStats.requestsSent30d}`} />
        <Stat
          label="Reviews landed · 30d"
          value={`${initialStats.reviewsLanded30d} / ${initialStats.requestsSent30d}`}
          sublabel={`${Math.round((initialStats.reviewsLanded30d / initialStats.requestsSent30d) * 100)}%`}
          tone="positive"
        />
        <Stat
          label="Average rating"
          value={`${initialStats.averageRating} ★`}
          sublabel={`${dynamicStats.completedCount} on screen · live ${dynamicStats.liveAvg}★`}
          tone="positive"
        />
        <Stat
          label="From referrals · 30d"
          value={`${initialStats.newPatientsFromReferrals30d}`}
          sublabel={`Top: ${initialStats.topReferrerName} · ${initialStats.topReferrerCount}`}
        />
      </ul>

      <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-1.5 mb-3">
        {FILTERS.map((f) => {
          const isActive = filter === f.id;
          const count =
            f.id === "all" ? visits.length : visits.filter((v) => v.reviewStatus === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                  : "border-[var(--color-border-strong)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
              }`}
            >
              {f.label}{" "}
              <span
                className={`tabular-nums ${
                  isActive ? "opacity-80" : "text-[var(--color-text-soft)]"
                }`}
              >
                · {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <ul className="divide-y divide-[var(--color-border)] bg-white max-h-[520px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {filtered.map((v) => {
              const isActive = v.id === selectedId;
              const SourceIcon = SOURCE_ICON[v.referralSource.type];
              return (
                <motion.li
                  key={v.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    type="button"
                    onClick={() => selectVisit(v.id)}
                    aria-pressed={isActive}
                    className={`w-full text-left px-4 py-3 grid gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-tide-deep)] ${
                      isActive
                        ? "bg-[var(--color-canvas-tinted)] border-l-2 border-l-[var(--color-ink)]"
                        : "border-l-2 border-l-transparent hover:bg-[var(--color-canvas-tinted)]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[13px] font-semibold text-[var(--color-text)] truncate">
                        {v.patientName}
                      </span>
                      <ReviewBadge status={v.reviewStatus} rating={v.reviewRating} />
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] text-[var(--color-text-muted)] truncate">
                        {v.procedure}
                      </span>
                      <span className="text-[10px] tabular-nums text-[var(--color-text-soft)] whitespace-nowrap">
                        {v.completedAt}
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--color-text-soft)] truncate inline-flex items-center gap-1">
                      <SourceIcon className="h-2.5 w-2.5 shrink-0" aria-hidden />
                      {v.referralSource.label}
                      {v.referralSource.referrerName && (
                        <span className="text-[var(--color-text-muted)]">
                          {" "}
                          · {v.referralSource.referrerName}
                        </span>
                      )}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-[11px] text-[var(--color-text-soft)]">
              No visits in this view.
            </li>
          )}
        </ul>

        <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 grid gap-4 content-start min-h-[440px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="grid gap-4 content-start"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
                  Visit · {selected.completedAt}
                </p>
                <p className="mt-1 text-[16px] font-semibold text-[var(--color-text)]">
                  {selected.patientName}
                </p>
                <p className="text-[12px] text-[var(--color-text-muted)]">{selected.procedure}</p>
              </div>

              <ReferralSourceCard visit={selected} />

              {selected.reviewStatus === "completed" && selected.reviewRating && (
                <ReviewCard rating={selected.reviewRating} text={selected.reviewText ?? ""} />
              )}

              <Timeline events={selected.timeline} />

              {selected.reviewStatus === "awaiting" && (
                <button
                  type="button"
                  onClick={() => sendRequest(selected.id)}
                  className="inline-flex items-center justify-center gap-1.5 self-start rounded-[var(--radius-md)] bg-[var(--color-ink)] px-3 py-2 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  <Send className="h-3 w-3" aria-hidden />
                  Send review request now
                </button>
              )}

              {selected.reviewStatus === "sent" && (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-tide-deep)]">
                  <Check className="h-3 w-3" aria-hidden /> Queued · WhatsApp template fires 24h
                  after visit.
                </p>
              )}

              {selected.reviewStatus === "no_response" && (
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  No response after 5 days · we won&apos;t nag. Counted in the funnel for honest
                  conversion math.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
          Visit ends → thank-you fires → review request 24h later → review lands → referrer
          credited.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Reset
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your last 30 days → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Built on the same WhatsApp Business + audit-log stack as patient communications · Google
          Maps integration default · referral chain visible per patient.
        </p>
      </div>
    </div>
  );
}

function ReferralSourceCard({ visit }: { visit: ReviewVisit }) {
  const SourceIcon = SOURCE_ICON[visit.referralSource.type];
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3 grid gap-1.5">
      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
        Referral source
      </p>
      <div className="flex items-baseline gap-2">
        <span className="grid place-items-center h-6 w-6 rounded-[var(--radius-sm)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)] shrink-0">
          <SourceIcon className="h-3 w-3" aria-hidden />
        </span>
        <div className="grid gap-0.5 min-w-0">
          <p className="text-[12px] font-semibold text-[var(--color-text)]">
            {visit.referralSource.label}
          </p>
          {visit.referralSource.referrerName && (
            <p className="text-[11px] text-[var(--color-text-muted)] truncate">
              Credited to {visit.referralSource.referrerName} · referral chain visible in their
              chart
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ rating, text }: { rating: number; text: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)] p-3 grid gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <Stars rating={rating} />
        <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[var(--color-tide-deep)]">
          Posted on Google
        </p>
      </div>
      {text && (
        <p className="text-[12px] text-[var(--color-text)] leading-snug italic">
          &ldquo;{text}&rdquo;
        </p>
      )}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex items-center gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden
          className={`h-3.5 w-3.5 ${
            n <= rating
              ? "fill-[var(--color-tide-deep)] text-[var(--color-tide-deep)]"
              : "text-[var(--color-border-strong)]"
          }`}
        />
      ))}
    </span>
  );
}

const TIMELINE_ICON: Record<TimelineKind, string> = {
  visit: "●",
  thank_you: "→",
  review_request: "→",
  review_opened: "○",
  review_submitted: "★",
};

function Timeline({ events }: { events: ReviewVisit["timeline"] }) {
  return (
    <ol className="grid gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
      <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[var(--color-text-soft)] mb-1">
        Loop timeline
      </p>
      {events.map((e, i) => {
        const isLast = i === events.length - 1;
        const isCompleted = e.kind === "review_submitted";
        return (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: timeline order is stable
            key={`${e.kind}-${i}`}
            className="grid grid-cols-[14px_1fr] gap-2 items-baseline"
          >
            <span
              aria-hidden
              className={`inline-flex items-center justify-center h-3 w-3 rounded-full text-[8px] mt-0.5 ${
                isCompleted
                  ? "bg-[var(--color-tide-deep)] text-[var(--color-canvas)]"
                  : isLast
                    ? "bg-[var(--color-ink)] text-[var(--color-canvas)]"
                    : "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]"
              }`}
            >
              {TIMELINE_ICON[e.kind]}
            </span>
            <div className="grid gap-0.5">
              <p className="text-[11px] text-[var(--color-text)] leading-snug">{e.label}</p>
              <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">{e.time}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ReviewBadge({ status, rating }: { status: ReviewStatus; rating?: number }) {
  if (status === "completed" && rating) {
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold tabular-nums text-[var(--color-tide-deep)] whitespace-nowrap">
        <Star
          className="h-2.5 w-2.5 fill-[var(--color-tide-deep)] text-[var(--color-tide-deep)]"
          aria-hidden
        />
        {rating}.0
      </span>
    );
  }
  const tone =
    status === "awaiting"
      ? {
          bg: "bg-[oklch(0.95_0.06_75)]",
          fg: "text-[oklch(0.45_0.13_75)]",
          border: "border-[oklch(0.78_0.13_75/0.5)]",
        }
      : status === "no_response"
        ? {
            bg: "bg-[var(--color-canvas-tinted)]",
            fg: "text-[var(--color-text-soft)]",
            border: "border-[var(--color-border)]",
          }
        : {
            bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
            fg: "text-[var(--color-tide-deep)]",
            border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
          };
  return (
    <span
      className={`inline-flex items-center text-[9px] uppercase tracking-[0.08em] rounded-full border px-1.5 py-0.5 whitespace-nowrap ${tone.bg} ${tone.fg} ${tone.border}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function Stat({
  label,
  value,
  sublabel,
  tone,
}: {
  label: string;
  value: string;
  sublabel?: string;
  tone?: "positive";
}) {
  return (
    <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 grid gap-1">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
        {label}
      </p>
      <p
        className={`text-[16px] font-semibold tabular-nums ${
          tone === "positive" ? "text-[var(--color-tide-deep)]" : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </p>
      {sublabel && (
        <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">{sublabel}</p>
      )}
    </li>
  );
}
