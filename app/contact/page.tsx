import type { Metadata } from "next";
import { ArrowRight, Calendar, Mail, MessageCircle } from "lucide-react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import ContactTabs from "@/components/forms/ContactTabs";
import { contactChannels, mailtoLink, whatsappLink } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Oralstack — quick questions, Plato connection and rollout assessments, pilot proposals, or a 30-minute product walkthrough.",
  alternates: { canonical: "/contact" },
};

const quickTouchCards: {
  icon: typeof MessageCircle;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  external?: boolean;
}[] = [
  {
    icon: MessageCircle,
    eyebrow: "Fastest",
    title: "WhatsApp us",
    body: `Singapore-hours messaging. We typically reply within an hour during the working day. ${contactChannels.whatsappDisplay}`,
    href: whatsappLink(),
    cta: "Open WhatsApp",
    external: true,
  },
  {
    icon: Mail,
    eyebrow: "Async",
    title: "Email",
    body: `Write us at ${contactChannels.email}. We reply within one working day.`,
    href: mailtoLink(),
    cta: "Compose email",
  },
  {
    icon: Calendar,
    eyebrow: "Live walkthrough",
    title: "Request a 30-minute walkthrough",
    body: "Front desk and clinical workflows on a sample dataset that mirrors a typical Singapore clinic.",
    href: "/book-a-demo",
    cta: "Request a walkthrough",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader eyebrow="Contact" title="Talk to a Singapore dental ops engineer." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          We&apos;re a small team — your message reaches a real engineer, not a shared inbox. Pick
          the channel that fits the question.
        </p>
      </Section>

      {/* Quick-touch cards */}
      <Section className="pb-16 md:pb-20">
        <ul className="grid gap-4 md:grid-cols-3">
          {quickTouchCards.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.title}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group block h-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 hover:border-[var(--color-border-strong)] transition-colors"
                >
                  <div className="flex items-center gap-2 text-[var(--color-tide-deep)]">
                    <Icon className="size-4" aria-hidden />
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
                      {c.eyebrow}
                    </span>
                  </div>
                  <p className="mt-3 text-base font-semibold tracking-tight text-[var(--color-text)]">
                    {c.title}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {c.body}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-tide-deep)] group-hover:underline underline-offset-4">
                    {c.cta}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Tabbed forms — replaces the previous stacked-vertical layout */}
      <Section className="pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-4">
          Or send us a structured request
        </p>
      </Section>

      <Section id="request" className="scroll-mt-28 pb-24 md:pb-32">
        <div className="max-w-[820px]">
          <ContactTabs />
        </div>
      </Section>
    </main>
  );
}
