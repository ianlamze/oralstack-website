import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import MobileWorkflowCatalog from "@/components/page/MobileWorkflowCatalog";
import WorkflowNavigator from "@/components/page/WorkflowNavigator";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import {
  capabilityAvailabilityLabels,
  workflowsPageContent,
  type CapabilityVisual,
} from "@/content/product-capabilities";
import { workflowsDetailed } from "@/content/workflows-detailed";

export const metadata: Metadata = {
  title: workflowsPageContent.metadata.title,
  description: workflowsPageContent.metadata.description,
  alternates: { canonical: "/workflows" },
};

const visualByKey: Record<CapabilityVisual, React.ComponentType> = {
  schedule: ScheduleMock,
  odontogram: OdontogramMock,
  checkout: CheckoutMock,
  analytics: AnalyticsMock,
};

export default function WorkflowsPage() {
  return (
    <main>
      <PageHeader eyebrow={workflowsPageContent.eyebrow} title={workflowsPageContent.title} />

      <Section className="pb-16 md:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
          <p className="max-w-[58ch] text-lg leading-relaxed text-[var(--color-text-muted)]">
            {workflowsPageContent.intro}
          </p>
          <aside className="rounded-[var(--radius-xl)] border border-[var(--color-border)] border-l-2 border-l-[var(--color-tide-deep)] bg-[var(--color-surface-inset)] p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
              {workflowsPageContent.platoBoundary.eyebrow}
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">
              {workflowsPageContent.platoBoundary.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {workflowsPageContent.platoBoundary.body}
            </p>
          </aside>
        </div>
      </Section>

      <MobileWorkflowCatalog />

      <div className="hidden xl:block" data-testid="desktop-workflow-catalog">
        <WorkflowNavigator />

        <Section className="pb-24 pt-16 md:pb-32 md:pt-20">
          <ol className="grid gap-24 md:gap-32">
            {workflowsDetailed.map((workflow, index) => {
              const Visual = workflow.visual ? visualByKey[workflow.visual] : undefined;
              const visualSide = index % 2 === 0 ? "right" : "left";

              return (
                <li key={workflow.slug} id={`desktop-${workflow.slug}`} className="scroll-mt-36">
                  <AnimateInView>
                    <header className="mb-10 grid max-w-[54ch] gap-3 md:mb-12">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                          {String(index + 1).padStart(2, "0")} · {workflow.eyebrow}
                        </p>
                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-inset)] px-3 py-1 text-xs font-medium text-[var(--color-tide-deep)]">
                          {workflow.availabilityLabel}
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold leading-[1.1] tracking-tight md:text-3xl lg:text-4xl">
                        {workflow.title}
                      </h2>
                      <a
                        href={`/book-a-demo?focus=${workflow.slug}`}
                        className="mt-2 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-2.5 text-sm font-medium text-[var(--color-tide-deep)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2"
                      >
                        Walk through this area
                        <ArrowRight className="size-4" aria-hidden />
                      </a>
                    </header>

                    <div
                      className={
                        Visual
                          ? `grid items-start gap-10 lg:gap-16 ${
                              visualSide === "right"
                                ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                                : "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
                            }`
                          : "grid items-start gap-10"
                      }
                    >
                      <div
                        className={`grid gap-6 ${
                          Visual && visualSide === "left" ? "lg:order-2" : ""
                        }`}
                      >
                        <p className="max-w-[62ch] text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                          {workflow.body}
                        </p>

                        <ul className="grid gap-3 md:grid-cols-3">
                          {workflow.features.map((feature) => (
                            <li
                              key={feature.title}
                              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5"
                            >
                              <p className="text-xs font-medium text-[var(--color-tide-deep)]">
                                {capabilityAvailabilityLabels[feature.availability]}
                              </p>
                              <h3 className="mt-2 text-base font-semibold tracking-tight">
                                {feature.title}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                                {feature.description}
                              </p>
                            </li>
                          ))}
                        </ul>

                        <dl className="grid gap-4 border-t border-[var(--color-border)] pt-5 text-sm leading-relaxed md:grid-cols-2">
                          <div>
                            <dt className="font-medium text-[var(--color-ink)]">
                              {workflowsPageContent.keepsTogetherLabel}
                            </dt>
                            <dd className="mt-1 text-[var(--color-text-muted)]">
                              {workflow.keepsTogether}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-[var(--color-ink)]">
                              {workflowsPageContent.boundaryLabel}
                            </dt>
                            <dd className="mt-1 text-[var(--color-text-muted)]">
                              {workflow.boundary}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {Visual && (
                        <div
                          className={`w-full ${visualSide === "left" ? "lg:order-1" : ""} ${
                            visualSide === "right" ? "lg:justify-self-end" : "lg:justify-self-start"
                          }`}
                        >
                          <Visual />
                        </div>
                      )}
                    </div>
                  </AnimateInView>
                </li>
              );
            })}
          </ol>
        </Section>
      </div>

      <Section className="pb-16 md:pb-20">
        <AnimateInView>
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-inset)] p-8 md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              {workflowsPageContent.rolloutPolicy.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              {workflowsPageContent.rolloutPolicy.title}
            </h2>
            <p className="mt-4 max-w-[66ch] leading-relaxed text-[var(--color-text-muted)]">
              {workflowsPageContent.rolloutPolicy.body}
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {workflowsPageContent.rolloutPolicy.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-tide-deep)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateInView>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl font-semibold tracking-tight md:text-3xl">
              {workflowsPageContent.cta.title}
            </h2>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-[var(--color-text-muted)]">
              {workflowsPageContent.cta.body}
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href={workflowsPageContent.cta.href}
              className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2"
            >
              {workflowsPageContent.cta.label} →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
