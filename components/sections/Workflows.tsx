import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import ImagingMock from "@/components/visuals/ImagingMock";
import { workflows } from "@/content/workflows";

const visualBySlug: Record<string, React.ComponentType> = {
  "front-desk": ScheduleMock,
  billing: CheckoutMock,
  charting: OdontogramMock,
  imaging: ImagingMock,
};

export default function Workflows() {
  return (
    <Section id="workflows" className="py-24 md:py-32">
      <AnimateInView>
        <div className="grid gap-3 max-w-[40ch]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Workflows
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Designed around the jobs busy clinics actually run.
          </h2>
        </div>
      </AnimateInView>

      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {workflows.map((w, i) => {
          const Visual = visualBySlug[w.slug];
          return (
            <li key={w.slug}>
              <AnimateInView delay={Math.min(i * 0.06, 0.24)}>
                <a
                  href={`/workflows#${w.slug}`}
                  className="group block h-full rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-7 md:p-8 hover:border-[var(--color-border-strong)] hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)] transition-[box-shadow,border-color,transform] duration-200 ease-out hover:-translate-y-0.5"
                >
                  <div className="grid gap-7">
                    <div className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-5 md:p-6 flex items-center justify-center min-h-[300px] overflow-hidden">
                      <div className="w-full max-w-full transition-transform duration-300 ease-out group-hover:scale-[1.02] [&>div]:max-w-full [&>div]:mx-auto">
                        {Visual && <Visual />}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                        {w.eyebrow}
                      </p>
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-balance group-hover:text-[var(--color-tide-deep)] transition-colors duration-150">
                        {w.title}
                      </h3>
                      <p className="text-sm font-medium text-[var(--color-tide-deep)] mt-1">
                        See it in detail{" "}
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
            See every workflow including recall and operations →
          </a>
        </p>
      </AnimateInView>
    </Section>
  );
}
