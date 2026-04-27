import CountUp from "@/components/ui/CountUp";

type Stat = {
  value: string;
  label: string;
  qualifier?: string;
};

type StatGridProps = {
  stats: Stat[];
};

export default function StatGrid({ stats }: StatGridProps) {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--color-border)] pt-10">
      {stats.map((s) => (
        <li key={s.label} className="grid gap-2">
          <p className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)] tabular-nums">
            <CountUp value={s.value} />
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[28ch]">
            {s.label}
          </p>
          {s.qualifier && (
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)] mt-1">
              {s.qualifier}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
