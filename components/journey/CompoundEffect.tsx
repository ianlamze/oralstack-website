import { journeyStages } from "@/content/journey";

// Compound-effect summary — surfaces all 7 anchor metrics from journey.ts
// in one place so the evaluator can see the journey as a stack rather
// than seven isolated stage cards.
//
// Honesty: numbers come straight from journey.ts (each metric carries a
// sourceNote). The synthesis paragraph deliberately avoids inventing a
// composite revenue figure — clinic-specific volume and ticket size
// determine the multiplier.

export default function CompoundEffect() {
  return (
    <div className="grid gap-8 lg:gap-10">
      <div className="grid gap-3 max-w-[58ch]">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          How the seven stages compound
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-[34px] font-semibold tracking-tight leading-[1.15]">
          Each stage&apos;s improvement multiplies into the next.
        </h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          A booking that lands first-call shapes a pre-visit that&apos;s already form-complete,
          which shapes an arrival that&apos;s chair-ready in minutes, which protects the chair time
          that drives same-day billing. The math doesn&apos;t live in any single stage — it lives in
          the chain.
        </p>
      </div>

      <ol className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-6">
        {journeyStages.map((stage) => (
          <li
            key={stage.id}
            className="grid gap-3 sm:grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1.6fr)] sm:items-baseline px-3 py-3 sm:py-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[10px] tabular-nums tracking-[0.14em] text-[var(--color-text-soft)]">
                {String(stage.index).padStart(2, "0")}
              </span>
              <a
                href={`/journey#${stage.id}`}
                className="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-tide-deep)] transition-colors"
              >
                {stage.name}
              </a>
            </div>
            <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-soft)] sm:text-[11px]">
              {stage.anchorMetric.label}
            </span>
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-baseline gap-2 sm:gap-3 text-sm">
              <span className="text-[var(--color-text-muted)] tabular-nums">
                {stage.anchorMetric.industryBaseline}
              </span>
              <span aria-hidden className="text-[var(--color-text-soft)]">
                →
              </span>
              <span className="text-[var(--color-text)] tabular-nums font-medium">
                {stage.anchorMetric.oralstackTarget}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-6 py-7 sm:px-8 sm:py-9 grid gap-3 max-w-[78ch]">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-tide-deep)] font-semibold">
          What we&apos;ll quote, what we won&apos;t
        </p>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          The strongest individually defensible delta is same-day-bill rate — DFI Synergy moved from
          60% to 85%+ in the four-week pilot, and the math on that alone is real money for a 3-chair
          clinic. The other deltas amplify it (faster booking → fewer empty slots, tighter recall →
          more revisits, shorter chair-cycle → more visits per chair-day) — but the compound number
          depends on your visit volume and ticket size, not on a generic benchmark. We&apos;d rather
          instrument it on your clinic than promise a multiple.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a
            href="/book-a-demo?stage=full-journey"
            className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
          >
            <span>See the whole journey on your clinic</span>
            <span aria-hidden>→</span>
          </a>
          <a
            href="/customers/dfi-synergy"
            className="text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:text-[var(--color-text)] transition-colors"
          >
            Read the DFI Synergy pilot →
          </a>
        </div>
      </div>
    </div>
  );
}
