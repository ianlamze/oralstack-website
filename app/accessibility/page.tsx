import type { Metadata } from "next";
import { Accessibility, ArrowRight } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Oralstack's accessibility statement, conformance target, the browsers and assistive technologies we test against, and how to report an issue.",
  alternates: { canonical: "/accessibility" },
};

const browsersTested = [
  "Chrome 124+ (macOS, Windows, Android)",
  "Safari 17+ (macOS, iOS)",
  "Firefox 120+ (macOS, Windows)",
  "Edge 124+ (Windows)",
];

const atTested = [
  "VoiceOver (macOS, iOS) — primary screen reader against the marketing site",
  "NVDA (Windows) — secondary screen reader against the marketing site",
  "Keyboard-only navigation across every interactive surface",
  "200% text-only zoom on every standard breakpoint (sm, md, lg)",
  "OS-level reduced-motion preference — every animated demo respects it",
];

const knownGaps = [
  "A third-party accessibility audit, JAWS testing, and Dragon voice-control testing have not yet been completed.",
  "Dense product tables and clinical visuals need continued screen-reader and reflow testing beyond the marketing pages.",
  "Some staged product demonstrations use time-based state changes; their accessible status announcements remain under review.",
];

export default function AccessibilityPage() {
  return (
    <main>
      <PageHeader eyebrow="Trust" title="Accessibility statement." />

      <Section className="pb-10">
        <p className="max-w-[68ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack handles dental records and is used at the chair by clinical and front-desk staff
          with a wide range of needs and assistive technologies. We treat accessibility as part of
          how the product is built — not a checkbox at the end. This page describes our conformance
          target, what we currently test, what we know is incomplete, and how to flag an issue.
          Reviewed quarterly; last reviewed 9 August 2026.
        </p>
      </Section>

      <Section className="pb-12">
        <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 max-w-[920px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-7 md:p-10 items-start">
          <span
            aria-hidden
            className="inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-tide-deep)]"
          >
            <Accessibility className="size-6" />
          </span>
          <div className="grid gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Conformance target
            </p>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              WCAG 2.2 Level AA across the marketing site and product UI.
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[68ch]">
              Oralstack targets WCAG 2.2 AA across the marketing site and product UI. Keyboard,
              reduced-motion, contrast, and responsive checks are part of release review. A
              third-party conformance audit has not yet been completed, so this is a target rather
              than a certification.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pb-12">
        <div className="grid gap-10 md:gap-14 max-w-[920px] md:grid-cols-2">
          <div className="grid gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Browsers tested
            </p>
            <ul className="grid gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {browsersTested.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-1 w-1 rounded-full bg-[var(--color-tide-deep)] shrink-0"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Assistive technologies + checks
            </p>
            <ul className="grid gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {atTested.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-1 w-1 rounded-full bg-[var(--color-tide-deep)] shrink-0"
                  />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="pb-12">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-8 max-w-[920px] grid gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Known gaps and roadmap
          </p>
          <ul className="grid gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
            {knownGaps.map((g) => (
              <li key={g} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-1 w-1 rounded-full bg-[oklch(0.78_0.13_75)] shrink-0"
                />
                <span>{g}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em] mt-2">
            Honest list — we publish what we know is incomplete rather than claim full conformance.
          </p>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-8 py-10 md:px-12 md:py-14 grid gap-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center max-w-[920px]">
          <span
            aria-hidden
            className="inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]"
          >
            <Accessibility className="size-6" />
          </span>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Report an accessibility issue
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
              We acknowledge accessibility reports within two working days and confirm a fix or
              mitigation timeline within seven. Send the route, the assistive tech you were using,
              and what didn&apos;t work to{" "}
              <a
                href="mailto:accessibility@oralstack.com"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                accessibility@oralstack.com
              </a>
              .
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:accessibility@oralstack.com"
              className="inline-flex items-center gap-1 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              accessibility@oralstack.com <ArrowRight className="size-3" aria-hidden />
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
