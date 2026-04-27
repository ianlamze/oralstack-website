import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import { changelog, type ChangelogEntry } from "@/content/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Public log of meaningful changes shipped to Oralstack — features, fixes, architecture, and pilot milestones.",
  alternates: { canonical: "/changelog" },
};

const typeStyles: Record<ChangelogEntry["type"], string> = {
  Feature:
    "bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]",
  Fix: "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]",
  Architecture:
    "bg-[color-mix(in_oklch,var(--color-violet),white_85%)] text-[color-mix(in_oklch,var(--color-violet),var(--color-ink)_45%)]",
  Pilot:
    "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]",
  Branch: "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
  Compliance:
    "bg-[color-mix(in_oklch,var(--color-violet),white_85%)] text-[color-mix(in_oklch,var(--color-violet),var(--color-ink)_45%)]",
  Sweep: "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ChangelogPage() {
  return (
    <main>
      <PageHeader eyebrow="Changelog" title="What's shipping in Oralstack." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Public log of meaningful changes — features, fixes, architecture shifts, and pilot
          milestones. Latest first.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ul className="grid gap-10 max-w-[820px] border-l border-[var(--color-border)] pl-6 md:pl-8">
          {changelog.map((entry, i) => (
            <li key={`${entry.date}-${i}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[31px] md:-left-[39px] top-2 inline-block h-2 w-2 rounded-full bg-[var(--color-accent-deep)]"
              />
              <div className="grid gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <time
                    dateTime={entry.date}
                    className="text-[var(--color-text-muted)] tabular-nums tracking-[0.04em]"
                  >
                    {formatDate(entry.date)}
                  </time>
                  <span
                    className={`inline-flex items-center font-medium uppercase tracking-[0.14em] rounded-full px-2.5 py-0.5 text-[10px] ${typeStyles[entry.type]}`}
                  >
                    {entry.type}
                  </span>
                </div>
                <h2 className="text-xl font-semibold tracking-tight">{entry.title}</h2>
                <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
                  {entry.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
