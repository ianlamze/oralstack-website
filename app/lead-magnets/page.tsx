import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import { leadMagnets } from "@/content/lead-magnets";
import { clusterLabels } from "@/content/articles/types";

export const metadata: Metadata = {
  title: "Free dental clinic ops references",
  description:
    "Free reference checklists for Singapore dental clinic operations — front desk daily playbook, insurance billing, imaging vendor evaluation, Plato migration, PDPA compliance.",
  alternates: { canonical: "/lead-magnets" },
};

export default function LeadMagnetsIndexPage() {
  return (
    <main>
      <PageHeader
        eyebrow="References"
        title="Free dental clinic ops references."
      />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Reference-quality checklists and runbooks for the operational
          motions a Singapore dental clinic runs. Free to read, free to
          share. Each is designed to print, edit per clinic, and use
          as onboarding material.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ul className="grid gap-4 md:grid-cols-2 max-w-[920px]">
          {leadMagnets.map((m) => (
            <li key={m.slug}>
              <a
                href={`/lead-magnets/${m.slug}`}
                className="group block h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 hover:border-[var(--color-border-strong)] transition-colors"
              >
                <span className="inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] rounded-full px-2 py-0.5 bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                  {clusterLabels[m.cluster]}
                </span>
                <p className="mt-3 text-base font-semibold tracking-tight leading-snug text-balance group-hover:text-[var(--color-tide-deep)] transition-colors">
                  {m.title}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {m.description}
                </p>
                <p className="mt-3 text-xs text-[var(--color-text-soft)] tabular-nums">
                  {m.readingMinutes} min read
                </p>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
