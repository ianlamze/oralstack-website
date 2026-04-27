import Button from "@/components/primitives/Button";
import MagneticButton from "@/components/primitives/MagneticButton";
import Section from "@/components/primitives/Section";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import { HeroStagger, HeroItem } from "@/components/sections/HeroStagger";

export default function Hero() {
  return (
    <Section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      {/* subtle backdrop glow */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute right-[-5%] top-[10%] w-[55%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklch, var(--color-tide), transparent 80%) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute left-[-15%] bottom-[-10%] w-[45%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklch, var(--color-ink), transparent 92%) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="grid gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-16 lg:gap-20 items-center">
        <HeroStagger>
          <HeroItem>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Built in Singapore for clinics across APAC
            </p>
          </HeroItem>
          <HeroItem>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
              Book, chart, bill, image, message.
              <span className="block text-[var(--color-text-muted)] font-normal mt-3">
                The operating system for modern dental clinics.
              </span>
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="mt-7 text-base md:text-lg text-[var(--color-text-muted)] max-w-[44ch] leading-relaxed">
              Built for the front desk first, with imaging, charting, and patient communication that
              work the way busy clinics actually run.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton href="/book-a-demo" variant="primary" withArrow>
                Book a demo
              </MagneticButton>
              <Button href="/workflows" variant="ghost">
                See the workflows
              </Button>
            </div>
          </HeroItem>
        </HeroStagger>
        <HeroStagger className="md:justify-self-end w-full">
          <HeroItem>
            <ScheduleMock />
          </HeroItem>
        </HeroStagger>
      </div>
    </Section>
  );
}
