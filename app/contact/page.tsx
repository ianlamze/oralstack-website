import type { Metadata } from "next";
import { MessageCircle, Mail, Calendar, ArrowRight } from "lucide-react";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import QuickQuestionForm from "@/components/forms/QuickQuestionForm";
import MigrationAssessmentForm from "@/components/forms/MigrationAssessmentForm";
import PilotProposalForm from "@/components/forms/PilotProposalForm";
import { contactChannels, whatsappLink, mailtoLink } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Oralstack — quick questions, migration assessments for clinics on legacy PMS, pilot proposals for multi-location groups, or a 30-minute demo.",
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
    title: "Book a 30-minute demo",
    body: "Front desk and clinical workflows on a sample dataset that mirrors a typical Singapore clinic.",
    href: "/book-a-demo",
    cta: "Book a demo",
  },
];

const formSections: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  Form: () => React.ReactNode;
  bestFor: string;
}[] = [
  {
    id: "question",
    eyebrow: "Quick question",
    title: "Ask us anything",
    body: "Pricing, integrations, security posture, what we don't do — short questions get short answers, fast.",
    Form: QuickQuestionForm,
    bestFor: "Best for: pre-demo questions, evaluating fit, security & compliance enquiries.",
  },
  {
    id: "migration",
    eyebrow: "Migration assessment",
    title: "Moving from Plato, Open Dental, or another PMS?",
    body: "Tell us your current stack and timeline. We'll come back with a migration plan specific to your PMS — what we can preserve, what needs cleaning, and an honest timeline.",
    Form: MigrationAssessmentForm,
    bestFor: "Best for: solo or small-group clinics planning a cutover within the next 6 months.",
  },
  {
    id: "pilot",
    eyebrow: "Pilot proposal",
    title: "Group of clinics? Tell us the shape",
    body: "Multi-location groups have different needs — ops standardisation, owner-level analytics, staged rollouts. Send us the basics and we'll come back with a pilot proposal sized to your group.",
    Form: PilotProposalForm,
    bestFor: "Best for: 2+ locations, DSO ops teams, group operations managers.",
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

      {/* In-page jump nav for the three forms */}
      <Section className="pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)] mb-4">
          Or send us a structured request
        </p>
        <ul className="flex flex-wrap gap-2">
          {formSections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex items-center min-h-[40px] rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
              >
                {s.eyebrow}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Form sections */}
      <Section className="pb-24 md:pb-32">
        <div className="grid gap-16 md:gap-24 max-w-[820px]">
          {formSections.map((s) => {
            const Form = s.Form;
            return (
              <section key={s.id} id={s.id} className="scroll-mt-12 grid gap-6">
                <header className="grid gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                    {s.eyebrow}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-[var(--color-text-muted)] max-w-[62ch] leading-relaxed">
                    {s.body}
                  </p>
                  <p className="text-xs text-[var(--color-text-soft)]">{s.bestFor}</p>
                </header>
                <Form />
              </section>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
