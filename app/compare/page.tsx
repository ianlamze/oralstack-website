import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "How Oralstack compares to other dental practice management systems — Plato, Open Dental, Dentrix, Eaglesoft, and Carestream.",
  alternates: { canonical: "/compare" },
};

type Comparison = {
  slug: string;
  name: string;
  oneLine: string;
  blurb: string;
};

const comparisons: Comparison[] = [
  {
    slug: "plato",
    name: "Oralstack vs Plato",
    oneLine: "Cloud-native vs on-prem Windows desktop, for Singapore practices.",
    blurb:
      "Plato is the dominant Singapore PMS — reliable, familiar, two decades old. The comparison covers schedule UX, billing, imaging, and the three-week migration path.",
  },
  {
    slug: "open-dental",
    name: "Oralstack vs Open Dental",
    oneLine: "Managed APAC SaaS vs free-license self-hosted.",
    blurb:
      "Open Dental is mature, free to license, and US-rooted. The comparison covers self-hosted vs managed, APAC compliance, US-insurance fit, and customisability.",
  },
  {
    slug: "dentrix",
    name: "Oralstack vs Dentrix",
    oneLine: "APAC-first SaaS vs US-rooted Henry Schein PMS.",
    blurb:
      "Dentrix is category-defining for US dental practices. The comparison covers US-payer rails, multi-location pricing, deployment models, and APAC fit.",
  },
  {
    slug: "eaglesoft",
    name: "Oralstack vs Eaglesoft",
    oneLine: "Direct-to-clinic vs Patterson rep-mediated PMS.",
    blurb:
      "Eaglesoft is Patterson Dental's PMS. The comparison covers sales motion, sensor-vendor neutrality, on-prem vs region-hosted, and APAC presence.",
  },
  {
    slug: "carestream",
    name: "Oralstack vs Carestream Dental",
    oneLine: "Sensor-neutral PMS vs imaging-hardware-led PMS.",
    blurb:
      "Carestream Dental ships imaging hardware plus PMS (SoftDent, OrthoTrac). The comparison covers sensor lock-in, hosting, and the PMS-first vs hardware-first product shape.",
  },
];

export default function ComparePage() {
  return (
    <main>
      <PageHeader eyebrow="Compare" title="How we stack up." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Honest, side-by-side comparisons against the practice management
          systems clinics evaluate alongside Oralstack. Each page covers the
          features that differ, three reasons we built differently, and where
          the other vendor is the right call.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ul className="grid gap-4 md:gap-5">
          {comparisons.map(({ slug, name, oneLine, blurb }) => (
            <li key={slug}>
              <a
                href={`/compare/${slug}`}
                className="group block rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6 md:p-8 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
              >
                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-baseline md:gap-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                      {name}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {oneLine}
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {blurb}
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
