import AnimateInView from "@/components/motion/AnimateInView";
import type { ComparisonRow } from "@/content/comparisons/types";

type ComparisonTableProps = {
  competitor: string;
  rows: ComparisonRow[];
};

export default function ComparisonTable({ competitor, rows }: ComparisonTableProps) {
  return (
    <AnimateInView>
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]">
        <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] md:gap-6 px-6 py-4 bg-[var(--color-canvas-tinted)] border-b border-[var(--color-border)]">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Capability
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            {competitor}
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
            Oralstack
          </p>
        </div>

        <ul className="divide-y divide-[var(--color-border)]">
          {rows.map(({ capability, them, us, source }) => (
            <li
              key={capability}
              className="grid gap-3 px-6 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] md:gap-6"
            >
              <p className="text-sm font-semibold text-[var(--color-text)]">{capability}</p>
              <div className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] md:hidden">
                  {competitor}
                </span>
                <p>{them}</p>
                {source && <SourceLine source={source} />}
              </div>
              <div className="text-sm leading-relaxed text-[var(--color-text)] md:rounded-[var(--radius-md)] md:bg-[var(--color-canvas-tinted)] md:px-4 md:py-3 md:-my-1">
                <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-tide-deep)] md:hidden">
                  Oralstack
                </span>
                {us}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AnimateInView>
  );
}

function SourceLine({ source }: { source: string }) {
  const isUrl = /^https?:\/\//i.test(source);
  return (
    <p className="mt-1.5 text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
      Source:{" "}
      {isUrl ? (
        <a
          href={source}
          className="underline underline-offset-2 hover:text-[var(--color-text-muted)] break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {source.replace(/^https?:\/\//i, "").replace(/\/$/, "")}
        </a>
      ) : (
        <span>{source}</span>
      )}
    </p>
  );
}
