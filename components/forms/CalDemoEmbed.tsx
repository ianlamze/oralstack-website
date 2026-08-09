"use client";

import { useSearchParams } from "next/navigation";
import {
  getRequestSourceId,
  getWorkflowOptionValue,
  REQUEST_SOURCES,
  WORKFLOW_OPTIONS,
} from "@/components/forms/contact-options";

type Props = {
  username: string;
  event: string;
};

export default function CalDemoEmbed({ username, event }: Props) {
  const searchParams = useSearchParams();
  const source = getRequestSourceId(searchParams.get("source"));
  const requestedFocus = searchParams.get("focus");
  const focus =
    getWorkflowOptionValue(requestedFocus) ??
    (requestedFocus === "general" ? "general" : undefined) ??
    (source === "dfi-synergy" ? "run-the-day" : "general");
  const focusLabel =
    focus === "general"
      ? "A general clinic walkthrough"
      : WORKFLOW_OPTIONS.find((option) => option.value === focus)?.label;

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

  return (
    <div className="grid gap-4">
      {(source || focus !== "general") && (
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
          {source && (
            <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
              {REQUEST_SOURCES[source].context}
            </p>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white">
        <iframe
          title="Book a demo"
          src={bookingUrl.toString()}
          className="block w-full"
          style={{ height: "780px", border: "0" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
