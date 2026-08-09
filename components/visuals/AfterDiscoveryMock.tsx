"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// "After Oralstack" counterpart to BeforeDiscoveryMock — depicts the
// reviews + referral capture that actually exists today (NOT the LTV-by-
// source attribution which is a high-priority gap in journey.ts).
// Honesty matters here.

type Review = {
  patient: string;
  stars: number;
  excerpt: string;
  status: "responded" | "queued";
};

const reviews: Review[] = [
  {
    patient: "Demo patient 101",
    stars: 5,
    excerpt: "Calm chairside manner, painless extraction.",
    status: "responded",
  },
  {
    patient: "Demo patient 102",
    stars: 5,
    excerpt: "Same-day filling, clear explanation of cost upfront.",
    status: "queued",
  },
  {
    patient: "Demo patient 103",
    stars: 4,
    excerpt: "Quick scaling visit, friendly desk.",
    status: "queued",
  },
];

type Referral = { patient: string; source: string; capturedAt: string };

const referrals: Referral[] = [
  {
    patient: "Demo patient 104 · DEMO-1042",
    source: "Friend · Demo patient 102",
    capturedAt: "Intake form",
  },
  { patient: "Demo patient 105 · DEMO-1112", source: "Google search", capturedAt: "Intake form" },
  {
    patient: "Demo patient 106 · DEMO-1098",
    source: "Carousell ad",
    capturedAt: "Intake form",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span role="img" aria-label={`${count} of 5 stars`} className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={`text-[10px] leading-none ${
            i < count ? "text-[var(--color-tide-deep)]" : "text-[var(--color-text-soft)]"
          }`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function AfterDiscoveryMock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        hasDemoedRef.current = true;
        observer.disconnect();
        setTimeout(() => setShown(true), 500);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="After-Oralstack discovery: a reviews dashboard showing a 4.7 average across 12 reviews this month with a response queue, plus a referral-capture log of three patients with their source recorded at intake."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Reviews &amp; referrals</span>
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
          Last 30 days
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-center">
        <div className="grid gap-1 justify-items-start">
          <span className="text-2xl font-semibold tabular-nums text-[var(--color-text)]">4.7</span>
          <Stars count={5} />
          <span className="text-[10px] text-[var(--color-text-soft)]">12 reviews</span>
        </div>
        <div className="grid gap-1 text-[11px] text-[var(--color-text-muted)]">
          <span>
            Google synced ·{" "}
            <span className="font-medium text-[var(--color-text)]">2 awaiting reply</span>
          </span>
          <span>Templates ready · one-click respond</span>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Recent reviews
        </p>
        <ul className="grid gap-1.5">
          {reviews.map((r, i) => (
            <motion.li
              key={r.patient}
              initial={{ opacity: 0, y: 3 }}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.22, delay: shown ? i * 0.07 : 0 }}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-2.5 py-2"
            >
              <div className="grid gap-0.5 min-w-0">
                <span className="flex items-center gap-2">
                  <Stars count={r.stars} />
                  <span className="text-[12px] font-medium text-[var(--color-text)] truncate">
                    {r.patient}
                  </span>
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] italic truncate">
                  &ldquo;{r.excerpt}&rdquo;
                </span>
              </div>
              <span
                className={`inline-flex items-center text-[10px] font-medium uppercase tracking-[0.1em] rounded-full border px-1.5 py-0.5 whitespace-nowrap ${
                  r.status === "responded"
                    ? "border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_28%)] bg-[color-mix(in_oklch,var(--color-sea),white_72%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]"
                    : "border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]"
                }`}
              >
                {r.status}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-2 border-t border-[var(--color-border)] pt-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Referrals captured at intake
        </p>
        <ul className="grid gap-1.5">
          {referrals.map((r, i) => (
            <motion.li
              key={r.patient}
              initial={{ opacity: 0, y: 3 }}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.22, delay: shown ? 0.2 + i * 0.07 : 0 }}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-2.5 py-2"
            >
              <div className="grid gap-0.5 min-w-0">
                <span className="text-[12px] font-medium text-[var(--color-text)] truncate">
                  {r.patient}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] truncate">
                  Source: {r.source}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] whitespace-nowrap">
                {r.capturedAt}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3">
        Source captured at intake · Google reviews synced · referral templates audit-logged
      </p>
    </div>
  );
}
