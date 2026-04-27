import Section from "@/components/primitives/Section";
import Wordmark from "@/components/sections/Wordmark";

export default function Nav() {
  return (
    <header>
      <Section className="pt-6 md:pt-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" aria-label="Oralstack home" className="inline-flex">
            <Wordmark size="md" />
          </a>
          <nav className="flex items-center gap-5 sm:gap-7 text-sm">
            <a
              href="/workflows"
              className="hidden md:inline-flex text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Workflows
            </a>
            <a
              href="/customers"
              className="hidden sm:inline-flex text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Customers
            </a>
            <a
              href="/pricing"
              className="hidden sm:inline-flex text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Pricing
            </a>
            <a
              href="/book-a-demo"
              className="inline-flex items-center min-h-[40px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2 text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Book a demo
            </a>
          </nav>
        </div>
      </Section>
    </header>
  );
}
