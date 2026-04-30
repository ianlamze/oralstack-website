import type { ReactNode } from "react";

export type BeforeAfterSplitProps = {
  before: ReactNode;
  after: ReactNode;
  /** Optional label override for the "before" header. */
  beforeLabel?: string;
  /** Optional label override for the "after" header. */
  afterLabel?: string;
};

export default function BeforeAfterSplit({
  before,
  after,
  beforeLabel = "Without Oralstack",
  afterLabel = "With Oralstack",
}: BeforeAfterSplitProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-start">
      <div className="grid gap-3 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
          {beforeLabel}
        </p>
        <div className="min-w-0">{before}</div>
      </div>
      <div className="grid gap-3 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-tide-deep)] font-semibold">
          {afterLabel}
        </p>
        <div className="min-w-0">{after}</div>
      </div>
    </div>
  );
}
