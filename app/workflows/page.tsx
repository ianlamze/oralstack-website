import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CaseNoteParseMock from "@/components/visuals/CaseNoteParseMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import ImagingMock from "@/components/visuals/ImagingMock";
import RecallMock from "@/components/visuals/RecallMock";
import MessagingMock from "@/components/visuals/MessagingMock";
import DicomViewerMock from "@/components/visuals/DicomViewerMock";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";
import OnlineBookingMock from "@/components/visuals/OnlineBookingMock";
import ComplianceMock from "@/components/visuals/ComplianceMock";
import { workflowsDetailed } from "@/content/workflows-detailed";
import { getArticle } from "@/content/articles";

export const metadata: Metadata = {
  title: "Workflows",
  description:
    "The eight workflows Oralstack is designed around — front desk scheduling, billing, charting, clinical imaging, online bookings, patient recall, operations analytics, and the compliance audit chain.",
  alternates: { canonical: "/workflows" },
};

type VisualEntry = { id: string; Component: React.ComponentType };

const visualsBySlug: Record<string, VisualEntry[]> = {
  "front-desk": [{ id: "schedule", Component: ScheduleMock }],
  billing: [{ id: "checkout", Component: CheckoutMock }],
  charting: [
    { id: "case-note-parse", Component: CaseNoteParseMock },
    { id: "odontogram", Component: OdontogramMock },
  ],
  imaging: [
    { id: "imaging-summary", Component: ImagingMock },
    { id: "dicom-viewer", Component: DicomViewerMock },
  ],
  "online-bookings": [{ id: "online-booking", Component: OnlineBookingMock }],
  recall: [
    { id: "recall-list", Component: RecallMock },
    { id: "messaging", Component: MessagingMock },
  ],
  operations: [{ id: "analytics", Component: AnalyticsMock }],
  compliance: [{ id: "compliance", Component: ComplianceMock }],
};

export default function WorkflowsPage() {
  return (
    <main>
      <PageHeader eyebrow="Workflows" title="Designed around the jobs busy clinics actually run." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Eight workflows that the front desk, clinical team, and clinic owner live in — every day,
          on every chair. None of them require a separate window, a separate login, or a separate
          desktop app.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ul className="grid gap-24 md:gap-32">
          {workflowsDetailed.map((w, i) => {
            const Visuals = visualsBySlug[w.slug] ?? [];
            const visualSide = i % 2 === 0 ? "right" : "left";
            const article = w.articleSlug ? getArticle(w.articleSlug) : undefined;
            return (
              <li key={w.slug} id={w.slug} className="scroll-mt-10">
                <AnimateInView>
                  <header className="grid gap-3 max-w-[42ch] mb-10 md:mb-12">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                      {String(i + 1).padStart(2, "0")} · {w.eyebrow}
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.1]">
                      {w.title}
                    </h2>
                  </header>

                  <div
                    className={`grid gap-10 lg:gap-16 items-start ${
                      visualSide === "right"
                        ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                        : "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
                    }`}
                  >
                    <div className={`grid gap-6 ${visualSide === "left" ? "lg:order-2" : ""}`}>
                      <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
                        {w.body}
                      </p>
                      <ul className="grid gap-3">
                        {w.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-3 text-base text-[var(--color-text-muted)] leading-relaxed"
                          >
                            <span
                              aria-hidden
                              className="mt-2.5 inline-block h-1 w-1 rounded-full bg-[var(--color-tide-deep)] shrink-0"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)] border-t border-[var(--color-border)] pt-4">
                        <span className="font-medium text-[var(--color-text-muted)]">
                          Replaces:
                        </span>{" "}
                        <span className="normal-case tracking-normal">{w.replaces}</span>
                      </p>
                      {article && (
                        <p className="text-sm">
                          <a
                            href={`/articles/${article.slug}`}
                            className="text-[var(--color-tide-deep)] font-medium underline underline-offset-4"
                          >
                            Read: {article.title.split(":")[0]} →
                          </a>
                        </p>
                      )}
                    </div>

                    {Visuals.length > 0 && (
                      <div
                        className={`${
                          visualSide === "left" ? "lg:order-1" : ""
                        } w-full grid gap-6 ${
                          visualSide === "right" ? "lg:justify-self-end" : "lg:justify-self-start"
                        }`}
                      >
                        {Visuals.map(({ id, Component }) => (
                          <Component key={id} />
                        ))}
                      </div>
                    )}
                  </div>
                </AnimateInView>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              See these workflows in your clinic.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[54ch] leading-relaxed">
              A 30-minute demo walks the front desk and a clinician through every workflow above, on
              a sample dataset that mirrors a typical Singapore clinic.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/book-a-demo"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Book a demo →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
