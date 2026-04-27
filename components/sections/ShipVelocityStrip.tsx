import Section from "@/components/primitives/Section";
import { changelog } from "@/content/changelog";

function daysBetween(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function relativeAge(iso: string, today: Date) {
  const d = daysBetween(new Date(iso), today);
  if (d <= 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)} week${Math.floor(d / 7) === 1 ? "" : "s"} ago`;
  return `${Math.floor(d / 30)} month${Math.floor(d / 30) === 1 ? "" : "s"} ago`;
}

// Reference date: latest changelog entry. Keeps the strip stable as the
// repo evolves (we don't want a stale "0 ships this week" the moment the
// app outlives the seeded changelog).
function getReferenceDate(): Date {
  const latest = changelog[0]?.date;
  return latest ? new Date(latest) : new Date();
}

export default function ShipVelocityStrip() {
  const today = getReferenceDate();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  const lastMonth = new Date(today);
  lastMonth.setDate(today.getDate() - 30);

  const inLastWeek = changelog.filter((e) => new Date(e.date) >= lastWeek).length;
  const inLastMonth = changelog.filter((e) => new Date(e.date) >= lastMonth).length;
  const latest = changelog.slice(0, 2);

  return (
    <Section className="py-12 md:py-14 border-b border-[var(--color-border)]">
      <div className="grid gap-6 md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:gap-12 md:items-center">
        <div className="grid gap-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Ship velocity
          </p>
          <p className="text-3xl md:text-4xl font-semibold tracking-tight tabular-nums text-[var(--color-text)] leading-none">
            {inLastMonth}{" "}
            <span className="text-[var(--color-text-muted)] text-base md:text-lg font-normal align-middle">
              ships in 30 days
            </span>
          </p>
          <p className="text-[11px] text-[var(--color-text-soft)] tracking-[0.04em] mt-1">
            {inLastWeek} this week · last shipped{" "}
            {latest[0] ? relativeAge(latest[0].date, new Date()) : "—"}
          </p>
        </div>

        <ul className="grid gap-2 md:gap-3 md:max-w-[600px] md:justify-self-end">
          {latest.map((e) => (
            <li
              key={`${e.date}-${e.title}`}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-3 text-[12px] leading-snug"
            >
              <span className="text-[10px] tabular-nums text-[var(--color-text-soft)] tracking-[0.04em] uppercase">
                {formatDateShort(e.date)}
              </span>
              <span className="text-[var(--color-text)] truncate">{e.title}</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] rounded-full border border-[var(--color-border)] px-2 py-0.5 hidden sm:inline-block">
                {e.type}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 text-[11px] text-[var(--color-text-soft)] tracking-[0.04em]">
        <span>Continuous deployment · every clinic on one version</span>
        <a
          href="/changelog"
          className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2 whitespace-nowrap"
        >
          See the full changelog →
        </a>
      </div>
    </Section>
  );
}
