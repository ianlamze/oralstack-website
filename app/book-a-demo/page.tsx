import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import DemoRequestForm from "@/components/forms/DemoRequestForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 30-minute oralstack demo covering the current Plato-connected workflows for a dental clinic.",
  alternates: { canonical: "/book-a-demo" },
};

const CAL_USER = process.env.NEXT_PUBLIC_CALCOM_USERNAME;
const CAL_EVENT = process.env.NEXT_PUBLIC_CALCOM_EVENT ?? "demo";

export default function BookDemoPage() {
  return (
    <main>
      <PageHeader eyebrow="Demo" title="Book a 30-minute walkthrough." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          We&apos;ll follow the front desk, clinician, and clinic manager through the current app on
          a representative Singapore clinic dataset. The walkthrough covers Plato-connected
          reception, patient care, checkout, patient access, clinic operations, and insights, with
          setup-dependent paths called out clearly.
        </p>
      </Section>

      <Section className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14 lg:items-start">
          <div>
            {CAL_USER ? (
              <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white">
                <iframe
                  title="Book a demo"
                  src={`https://cal.com/${CAL_USER}/${CAL_EVENT}?theme=light`}
                  className="block w-full"
                  style={{ height: "780px", border: "0" }}
                  loading="lazy"
                />
              </div>
            ) : (
              <DemoRequestForm />
            )}
          </div>

          <aside className="grid gap-5">
            <div className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Length
              </p>
              <p className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
                30 minutes
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Tight walkthrough of the workflows your clinic will use most.
              </p>
            </div>
            <div className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Format
              </p>
              <p className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
                Live, screen-shared
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                A real engineer on the call — not a sales rep.
              </p>
            </div>
            <div className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Outcome
              </p>
              <p className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
                A pilot proposal
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Within two working days of the demo, sized to your clinic.
              </p>
            </div>

            <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-6 grid gap-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                What clinics ask first
              </p>
              <ul className="grid gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                <li>
                  <span className="text-[var(--color-text)] font-medium">Plato boundary:</span> we
                  review connector readiness, clinic setup, and any data-handover scope before
                  proposing a timeline.{" "}
                  <a
                    href="/workflows"
                    className="text-[var(--color-tide-deep)] underline underline-offset-4"
                  >
                    Current workflows →
                  </a>
                </li>
                <li>
                  <span className="text-[var(--color-text)] font-medium">Hosting:</span> Singapore
                  region, tenant-isolated, audit-logged.{" "}
                  <a
                    href="/security"
                    className="text-[var(--color-tide-deep)] underline underline-offset-4"
                  >
                    Security →
                  </a>
                </li>
                <li>
                  <span className="text-[var(--color-text)] font-medium">Pilot:</span> flat
                  $200/clinic/month, no per-seat charges.{" "}
                  <a
                    href="/pricing"
                    className="text-[var(--color-tide-deep)] underline underline-offset-4"
                  >
                    Pricing →
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
