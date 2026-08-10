"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, ExternalLink, ShieldCheck } from "lucide-react";
import DemoRequestForm from "@/components/forms/DemoRequestForm";
import {
  getRequestSourceId,
  getStartModeOptionValue,
  getWorkflowOptionValue,
  REQUEST_SOURCES,
  START_MODE_OPTIONS,
  WORKFLOW_OPTIONS,
} from "@/components/forms/contact-options";

type Props = {
  username: string;
  event: string;
};

export default function CalDemoEmbed({ username, event }: Props) {
  const [mode, setMode] = useState<"choice" | "scheduler" | "request">("choice");
  const loadedModeRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const source = getRequestSourceId(searchParams.get("source"));
  const startMode = getStartModeOptionValue(searchParams.get("start"));
  const requestedFocus = searchParams.get("focus");
  const focus =
    getWorkflowOptionValue(requestedFocus) ??
    (requestedFocus === "general" ? "general" : undefined) ??
    (source === "dfi-synergy" ? "run-the-day" : "general");
  const focusLabel =
    focus === "general"
      ? "A general clinic walkthrough"
      : WORKFLOW_OPTIONS.find((option) => option.value === focus)?.label;
  const startModeLabel = START_MODE_OPTIONS.find((option) => option.value === startMode)?.label;

  const bookingUrl = new URL(
    `https://cal.com/${encodeURIComponent(username)}/${encodeURIComponent(event)}`,
  );
  bookingUrl.searchParams.set("theme", "light");
  bookingUrl.searchParams.set("utm_source", "oralstack-website");
  bookingUrl.searchParams.set("utm_medium", "website");
  bookingUrl.searchParams.set("utm_campaign", "demo-request");
  bookingUrl.searchParams.set("utm_content", source ?? focus);
  bookingUrl.searchParams.set("metadata[requestSource]", source ?? "direct");
  bookingUrl.searchParams.set("metadata[workflowFocus]", focus);
  if (startMode) bookingUrl.searchParams.set("metadata[startMode]", startMode);

  useEffect(() => {
    if (mode === "choice") return;
    const frame = window.requestAnimationFrame(() => loadedModeRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [mode]);

  if (mode === "request") {
    return (
      <section
        ref={loadedModeRef}
        data-testid="cal-first-party-form"
        tabIndex={-1}
        aria-label="Oralstack demo request form"
        className="grid gap-3 rounded-[var(--radius-xl)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tide-deep)] focus:ring-offset-4"
      >
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
          First-party request form
        </p>
        <DemoRequestForm />
      </section>
    );
  }

  return (
    <div className="grid gap-4">
      {(source || startMode || focus !== "general") && (
        <div
          data-testid="request-context"
          className="grid gap-1 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4"
        >
          {source && (
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
              Continuing from {REQUEST_SOURCES[source].label}
            </p>
          )}
          <p className="text-sm font-medium text-[var(--color-text)]">
            Start with {focusLabel?.toLowerCase()}.
          </p>
          {startModeLabel && (
            <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
              Clinic starting point: {startModeLabel}.
            </p>
          )}
          {source && (
            <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
              {REQUEST_SOURCES[source].context}
            </p>
          )}
        </div>
      )}

      {mode === "choice" ? (
        <section
          data-testid="cal-scheduler-gate"
          aria-labelledby="scheduler-choice-title"
          className="grid gap-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-8"
        >
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-[var(--color-tide-deep)]">
              <CalendarDays className="size-4" aria-hidden />
              <p className="text-[10px] font-medium uppercase tracking-[0.16em]">
                Scheduling choice
              </p>
            </div>
            <h2
              id="scheduler-choice-title"
              className="text-2xl font-semibold tracking-tight text-[var(--color-text)]"
            >
              Choose how to request a time.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              Open the third-party Cal.com scheduler for live availability, or use Oralstack&apos;s
              first-party request form and we&apos;ll reply by email.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => setMode("scheduler")}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] transition-colors hover:bg-[var(--color-tide-deep)]"
            >
              Open Cal.com scheduler
              <ExternalLink className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setMode("request")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
            >
              Use Oralstack request form
            </button>
          </div>

          <div className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
            <ShieldCheck
              className="mt-0.5 size-4 shrink-0 text-[var(--color-tide-deep)]"
              aria-hidden
            />
            <p>
              Cal.com is not loaded until you open it. It receives the request source, clinic
              starting point, and workflow focus as booking context. Do not enter patient or
              clinical data.{" "}
              <a
                href="/privacy#scheduling"
                className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Scheduling privacy details
              </a>
              .
            </p>
          </div>
        </section>
      ) : (
        <div className="grid gap-3">
          <div
            ref={loadedModeRef}
            tabIndex={-1}
            role="status"
            className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-tide-deep)] focus:ring-offset-4"
          >
            <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
              Cal.com is now loaded. Keep patient and clinical data out of booking fields.
            </p>
            <button
              type="button"
              onClick={() => setMode("request")}
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-4 py-2 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-canvas)]"
            >
              Use request form instead
            </button>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white">
            <iframe
              title="Cal.com demo scheduler"
              src={bookingUrl.toString()}
              className="block w-full"
              style={{ height: "780px", border: "0" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
