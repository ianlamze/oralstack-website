"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import {
  capabilityAvailabilityLabels,
  productCapabilities,
  workflowsPageContent,
  type CapabilityVisual,
} from "@/content/product-capabilities";

const visualByKey: Record<CapabilityVisual, React.ComponentType> = {
  schedule: ScheduleMock,
  odontogram: OdontogramMock,
  checkout: CheckoutMock,
  analytics: AnalyticsMock,
};

const compactWorkflowLabels: Record<string, string> = {
  "run-the-day": "Run the day",
  "patient-care": "Patient care",
  "checkout-money": "Checkout",
  "patient-access": "Patient access",
  "clinic-operations": "Clinic ops",
  insights: "Insights",
  "organization-security": "Org & security",
};

function workflowFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  return productCapabilities.find(
    (workflow) => workflow.slug === hash || workflow.legacySlugs.includes(hash),
  );
}

export default function MobileWorkflowCatalog() {
  const [active, setActive] = useState(productCapabilities[0].slug);
  const activeIndex = Math.max(
    0,
    productCapabilities.findIndex((workflow) => workflow.slug === active),
  );

  useEffect(() => {
    const openHashWorkflow = () => {
      const workflow = workflowFromHash();
      if (!workflow) return;

      setActive(workflow.slug);
      window.requestAnimationFrame(() => {
        document.getElementById(workflow.slug)?.scrollIntoView({ block: "start" });
      });
    };

    openHashWorkflow();
    window.addEventListener("hashchange", openHashWorkflow);
    window.addEventListener("popstate", openHashWorkflow);
    return () => {
      window.removeEventListener("hashchange", openHashWorkflow);
      window.removeEventListener("popstate", openHashWorkflow);
    };
  }, []);

  function selectWorkflow(slug: string, behavior: ScrollBehavior = "smooth") {
    const section = document.getElementById(slug);
    if (!section) return;

    setActive(slug);
    window.history.pushState(null, "", `#${slug}`);
    window.requestAnimationFrame(() => {
      section.scrollIntoView({ behavior, block: "start" });
    });
  }

  const previous = activeIndex > 0 ? productCapabilities[activeIndex - 1] : undefined;
  const next =
    activeIndex < productCapabilities.length - 1 ? productCapabilities[activeIndex + 1] : undefined;

  return (
    <div className="xl:hidden" data-testid="mobile-workflow-catalog">
      <div className="sticky top-[65px] z-30 border-y border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-surface-raised)_96%,transparent)] shadow-[var(--shadow-1)] backdrop-blur-md">
        <nav
          aria-label="Workflow sections"
          className="mx-auto flex w-full max-w-[1200px] items-center gap-2 px-4 py-2 md:px-10"
        >
          <button
            type="button"
            onClick={() => previous && selectWorkflow(previous.slug)}
            disabled={!previous}
            aria-label="Previous workflow"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-tide-deep)] transition-colors hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="relative min-w-0 flex-1">
            <label htmlFor="workflow-section-select" className="sr-only">
              Choose a workflow section
            </label>
            <select
              id="workflow-section-select"
              data-testid="workflow-section-select"
              value={active}
              onChange={(event) => selectWorkflow(event.target.value)}
              className="min-h-[44px] w-full appearance-none rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] py-2 pl-3 pr-10 text-sm font-semibold text-[var(--color-text)] shadow-[var(--shadow-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2"
            >
              {productCapabilities.map((workflow, index) => (
                <option key={workflow.slug} value={workflow.slug}>
                  {String(index + 1).padStart(2, "0")}/{productCapabilities.length} ·{" "}
                  {compactWorkflowLabels[workflow.slug] ?? workflow.eyebrow}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-tide-deep)]"
            />
          </div>

          <button
            type="button"
            onClick={() => next && selectWorkflow(next.slug)}
            disabled={!next}
            aria-label="Next workflow"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-tide-deep)] transition-colors hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </nav>
      </div>

      <section
        className="px-4 pb-20 pt-10 md:px-10 md:pb-24 md:pt-12"
        aria-labelledby="mobile-workflow-index-title"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-6 grid gap-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Mobile workflow index
            </p>
            <h2 id="mobile-workflow-index-title" className="text-xl font-semibold tracking-tight">
              Open one area at a time.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              All seven current workflows stay one tap away while the detail you are reviewing
              remains in view.
            </p>
          </div>

          <ol className="grid gap-3">
            {productCapabilities.map((workflow, index) => {
              const isActive = active === workflow.slug;
              const Visual = workflow.visual ? visualByKey[workflow.visual] : undefined;
              const panelId = `mobile-workflow-panel-${workflow.slug}`;
              const buttonId = `mobile-workflow-button-${workflow.slug}`;

              return (
                <li
                  key={workflow.slug}
                  id={workflow.slug}
                  className={`scroll-mt-36 overflow-hidden rounded-[var(--radius-xl)] border bg-[var(--color-surface-raised)] transition-[border-color,box-shadow] ${
                    isActive
                      ? "border-[var(--color-tide)] shadow-[var(--shadow-2)]"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  {workflow.legacySlugs.map((legacySlug) => (
                    <span key={legacySlug} id={legacySlug} aria-hidden />
                  ))}
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => selectWorkflow(workflow.slug)}
                      className="flex min-h-[72px] w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-tide-deep)]"
                    >
                      <span className="text-[10px] font-semibold tabular-nums text-[var(--color-text-soft)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-snug text-[var(--color-text)]">
                          {workflow.eyebrow}
                        </span>
                        <span className="mt-1 block text-[11px] font-medium text-[var(--color-tide-deep)]">
                          {capabilityAvailabilityLabels[workflow.availability]}
                        </span>
                      </span>
                      <ChevronDown
                        aria-hidden
                        className={`size-4 shrink-0 text-[var(--color-tide-deep)] transition-transform ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  {isActive && (
                    <section
                      id={panelId}
                      aria-labelledby={buttonId}
                      className="border-t border-[var(--color-border)] px-4 pb-6 pt-5"
                    >
                      <h4 className="text-2xl font-semibold leading-[1.12] tracking-tight">
                        {workflow.title}
                      </h4>
                      <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
                        {workflow.summary}
                      </p>
                      <a
                        href={`/book-a-demo?focus=${workflow.slug}`}
                        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 py-2.5 text-sm font-medium text-[var(--color-tide-deep)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2"
                      >
                        Walk through this area
                        <ArrowRight className="size-4" aria-hidden />
                      </a>

                      <ul className="mt-6 grid gap-3">
                        {workflow.features.map((feature) => (
                          <li
                            key={feature.title}
                            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-4"
                          >
                            <p className="text-[11px] font-medium text-[var(--color-tide-deep)]">
                              {capabilityAvailabilityLabels[feature.availability]}
                            </p>
                            <h5 className="mt-1.5 text-sm font-semibold tracking-tight">
                              {feature.title}
                            </h5>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                              {feature.description}
                            </p>
                          </li>
                        ))}
                      </ul>

                      <dl className="mt-6 grid gap-4 border-t border-[var(--color-border)] pt-5 text-sm leading-relaxed">
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

                      {Visual && (
                        <div className="mt-7 w-full overflow-hidden rounded-[var(--radius-lg)]">
                          <Visual />
                        </div>
                      )}
                    </section>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
