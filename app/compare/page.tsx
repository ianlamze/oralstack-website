import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import CompareBuilder from "@/components/sections/CompareBuilder";
import { comparisons } from "@/content/comparisons";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "How Oralstack compares to other dental practice management systems — Plato, Open Dental, Dentrix, Eaglesoft, and Carestream.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <main>
      <PageHeader eyebrow="Compare" title="How we stack up." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Honest, side-by-side comparisons against the practice management systems clinics evaluate
          alongside Oralstack. Each page covers the features that differ, three reasons we built
          differently, and where the other vendor is the right call.
        </p>
      </Section>

      <Section className="pb-16 md:pb-20">
        <div className="grid gap-3 mb-6 max-w-[760px]">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Compare builder
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Pick what matters. We&apos;ll build the table.
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed max-w-[60ch]">
            Tick the capabilities you care about and the vendors you&apos;re weighing. The table
            below renders only what you asked for — short cells, lifted from each full comparison.
          </p>
        </div>
        <CompareBuilder />
      </Section>

      <Section className="pb-24 md:pb-32">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-4">
          Or read the full comparison
        </p>
        <ul className="grid gap-4 md:gap-5">
          {comparisons.map((c) => (
            <li key={c.slug}>
              <a
                href={`/compare/${c.slug}`}
                className="card-hover group block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-8"
              >
                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-baseline md:gap-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                      {c.metaTitle}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {c.indexOneLine}
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {c.indexBlurb}
                  </p>
                </div>
                <p className="mt-5 text-xs font-medium text-[var(--color-tide-deep)] group-hover:underline underline-offset-4">
                  Read the comparison →
                </p>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
