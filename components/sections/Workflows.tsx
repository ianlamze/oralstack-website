import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";
import { workflowsSectionContent, type CapabilityVisual } from "@/content/product-capabilities";
import { workflows } from "@/content/workflows";

const visualByKey: Record<CapabilityVisual, React.ComponentType> = {
  schedule: ScheduleMock,
  odontogram: OdontogramMock,
  checkout: CheckoutMock,
  analytics: AnalyticsMock,
};

export default function Workflows() {
  return (
    <Section id="workflows" className="bg-[var(--color-surface-inset)] py-24 md:py-32">
      <AnimateInView>
        <div className="grid gap-3 max-w-[40ch]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {workflowsSectionContent.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {workflowsSectionContent.title}
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            {workflowsSectionContent.body}
          </p>
        </div>
      </AnimateInView>

      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {workflows.map((w, i) => {
          const Visual = w.visual ? visualByKey[w.visual] : undefined;
          return (
            <li key={w.slug}>
              <AnimateInView delay={Math.min(i * 0.06, 0.24)}>
                <a
                  href={`/workflows#${w.slug}`}
                  className="group block h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] border-t-[3px] border-t-[var(--color-ink)] bg-[var(--color-surface-raised)] p-7 shadow-[var(--shadow-1)] transition-[box-shadow,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-3)] md:p-8"
                >
                  <div className="grid gap-7">
                    <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-canvas-tinted)] p-5 md:p-6">
                      {Visual ? (
                        <div className="w-full max-w-full transition-transform duration-300 ease-out group-hover:scale-[1.02] [&>div]:max-w-full [&>div]:mx-auto">
                          <Visual />
                        </div>
                      ) : (
                        <div className="grid max-w-[36ch] gap-4">
                          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide-deep)]">
                            {w.availabilityLabel}
                          </p>
                          <p className="text-lg font-medium leading-relaxed text-[var(--color-ink)]">
                            {w.summary}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                          {w.eyebrow}
                        </p>
                        <p className="text-xs font-medium text-[var(--color-tide-deep)]">
                          {w.availabilityLabel}
                        </p>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-balance group-hover:text-[var(--color-tide-deep)] transition-colors duration-150">
                        {w.title}
                      </h3>
                      {Visual && (
                        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                          {w.summary}
                        </p>
                      )}
                      <p className="text-[15px] font-medium text-[var(--color-tide-deep)] mt-1">
                        {workflowsSectionContent.cardAction}{" "}
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </AnimateInView>
            </li>
          );
        })}
      </ul>

      <AnimateInView delay={0.2}>
        <p className="mt-14 text-sm">
          <a
            href="/workflows"
            className="text-[var(--color-tide-deep)] font-medium underline underline-offset-4"
          >
            {workflowsSectionContent.pageAction} →
          </a>
        </p>
      </AnimateInView>
    </Section>
  );
}
