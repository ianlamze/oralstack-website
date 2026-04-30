"use client";

// Legacy-reality counterpart — depicts the "where do new patients come from?"
// chaos most clinics live in. Pure CSS, brand tokens only. Used in the
// journey page as the "before" pane on the Discovery stage.
//
// Design intent: ad spend with no attribution, handwritten survey answers
// nobody types up, lost referrals after staff turnover.

const surveyAnswers = [
  { source: "Google?", note: "patient was vague" },
  { source: "Friend recommended", note: "didn't catch which friend" },
  { source: "Carousell ad", note: "or was it Facebook?" },
  { source: "Walked past", note: "—" },
];

const adSpend = [
  { channel: "Google Ads", spent: "S$480", attributed: "?" },
  { channel: "Facebook / IG", spent: "S$220", attributed: "?" },
  { channel: "Carousell promo", spent: "S$80", attributed: "?" },
];

export default function BeforeDiscoveryMock() {
  return (
    <div
      role="img"
      aria-label="Before-Oralstack discovery: a handwritten where-did-you-hear-about-us list with vague answers, an ad-spend table with no attribution back to first visits, and a footer showing 62 new patients with attribution unclear for 38 of them."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_30%)] p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Attribution · paper + sheet</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
            />
            Before Oralstack
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Apr · end of month
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-white p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          &ldquo;How did you hear about us?&rdquo; · handwritten log
        </p>
        <ul className="mt-2 grid divide-y divide-[var(--color-border)]">
          {surveyAnswers.map((s) => (
            <li
              key={s.source}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-2 text-[12px]"
            >
              <span className="text-[var(--color-text)] truncate">{s.source}</span>
              <span className="text-[10px] text-[var(--color-text-soft)] italic truncate">
                {s.note}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 pt-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-soft)] italic">
          Survey form on a clipboard · nobody types this into the system
        </p>
      </div>

      <div className="mt-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_92%)] p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Ad spend · this month
        </p>
        <ul className="mt-2 grid divide-y divide-[var(--color-border)]">
          {adSpend.map((a) => (
            <li
              key={a.channel}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-3 py-1.5 text-[12px]"
            >
              <span className="text-[var(--color-text)] truncate">{a.channel}</span>
              <span className="tabular-nums text-[var(--color-text-muted)]">{a.spent}</span>
              <span className="text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold tabular-nums">
                → {a.attributed}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>New patients this month</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">62</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Attribution unclear</span>
          <span className="tabular-nums">38 of 62</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Referrals lost in staff turnover (Q1)</span>
          <span className="tabular-nums">~14 patients</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] italic">
        Ad spend is a black box · referrals tracked on paper · no source-to-LTV link
      </p>
    </div>
  );
}
