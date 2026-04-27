import type { Metadata } from "next";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/workflows", label: "Workflows" },
  { href: "/customers", label: "Customers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/changelog", label: "Changelog" },
];

export default function NotFound() {
  return (
    <main>
      <Section className="pt-20 pb-32 md:pt-28 md:pb-48">
        <div className="max-w-[560px] grid gap-7">
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M16 4.5 C20.6 4.5 23.5 7 23.5 11.2 L23.5 14.2 C23.5 16.1 22 17.2 19.8 17.2 L12.2 17.2 C10 17.2 8.5 16.1 8.5 14.2 L8.5 11.2 C8.5 7 11.4 4.5 16 4.5 Z"
              fill="var(--color-ink)"
            />
            <path
              d="M11.4 17.6 L11.4 22.5 C11.4 25.2 12.6 26.6 14.2 26.2 C15 26 15.2 24.4 15.2 22.4 L15.2 17.6 Z"
              fill="var(--color-tide)"
            />
            <path
              d="M16.8 17.6 L16.8 25.4 C16.8 27.7 18.6 28.4 20.4 27.6 C22.4 26.7 22.4 23.4 21.7 19.6 L21.4 17.6 Z"
              fill="var(--color-ink)"
            />
          </svg>

          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            404 · Page not found
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            We couldn&apos;t find that page.
          </h1>

          <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
            The link might be old, or the page may have moved. Try one of the pages below — or email{" "}
            <a
              href="mailto:hello@oralstack.com"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              hello@oralstack.com
            </a>{" "}
            and we&apos;ll point you in the right direction.
          </p>

          <ul className="grid gap-2 mt-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex items-center gap-2 text-base font-medium text-[var(--color-text)] hover:text-[var(--color-tide-deep)] transition-colors"
                >
                  <span>{l.label}</span>
                  <span aria-hidden="true" className="text-[var(--color-text-soft)]">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}
