import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import CalDemoEmbed from "@/components/forms/CalDemoEmbed";
import DemoRequestForm from "@/components/forms/DemoRequestForm";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "Request a 30-minute Oralstack demo for a guided standalone clinic setup, a move from another system, or an optional clinic connection.",
  alternates: { canonical: "/book-a-demo" },
};

const CAL_USER = process.env.NEXT_PUBLIC_CALCOM_USERNAME;
const CAL_EVENT = process.env.NEXT_PUBLIC_CALCOM_EVENT ?? "demo";

export default function BookDemoPage() {
  return (
    <main>
      <PageHeader eyebrow="Demo" title="Request a 30-minute walkthrough." />

      <Section className="pb-6 md:pb-10">
        <p className="max-w-[58ch] text-base text-[var(--color-text-muted)] leading-relaxed md:text-lg">
          See the current app on a representative Singapore clinic dataset. Tell us whether
          you&apos;re starting fresh, moving records, or keeping an existing system connected;
          we&apos;ll show the relevant clinic setup and record boundary clearly.
        </p>
      </Section>

      <Section className="pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14 lg:items-start">
          <div>
            {CAL_USER ? (
              <Suspense
                fallback={
                  <div className="min-h-[780px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white" />
                }
              >
                <CalDemoEmbed username={CAL_USER} event={CAL_EVENT} />
              </Suspense>
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
                Next step
              </p>
              <p className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
                Availability + fit check
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                We&apos;ll reply with available times and any setup questions needed to make the
                walkthrough useful.
              </p>
            </div>

            <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-6 grid gap-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                What clinics ask first
              </p>
              <ul className="grid gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                <li>
                  <span className="text-[var(--color-text)] font-medium">How you start:</span> a
                  guided standalone pilot is the default path. Moving records and optional
                  connections are reviewed before we propose a timeline.{" "}
                  <a
                    href="/switching"
                    className="text-[var(--color-tide-deep)] underline underline-offset-4"
                  >
                    Switching &amp; setup →
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
