"use client";

import { useLayoutEffect, useState } from "react";
import FormShell, { Field, Select, TextArea } from "@/components/forms/FormShell";
import {
  getRequestSourceId,
  REQUEST_SOURCES,
  type RequestSourceId,
} from "@/components/forms/contact-options";
import { productCapabilities } from "@/content/product-capabilities";

const PMS_OPTIONS = [
  { value: "Plato", label: "Plato" },
  { value: "Open Dental", label: "Open Dental" },
  { value: "Dentrix", label: "Dentrix" },
  { value: "Eaglesoft", label: "Eaglesoft" },
  { value: "Carestream", label: "Carestream" },
  { value: "Other", label: "Other" },
  { value: "None / paper diary", label: "None / paper diary" },
];

const FOCUS_OPTIONS = [
  { value: "general", label: "A general clinic walkthrough" },
  ...productCapabilities.map((workflow) => ({
    value: workflow.slug,
    label: workflow.eyebrow,
  })),
];

const VALID_FOCUS = new Set(FOCUS_OPTIONS.map((option) => option.value));

export default function DemoRequestForm() {
  const [focus, setFocus] = useState("general");
  const [source, setSource] = useState<RequestSourceId | null>(null);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSource = getRequestSourceId(params.get("source"));
    const requestedFocus = params.get("focus");
    setSource(requestedSource);
    if (requestedFocus && VALID_FOCUS.has(requestedFocus)) setFocus(requestedFocus);
    else if (requestedSource === "dfi-synergy") setFocus("run-the-day");
  }, []);

  const focusLabel = FOCUS_OPTIONS.find((option) => option.value === focus)?.label;

  return (
    <div className="grid gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-5 md:p-8">
      <FormShell intent="demo" submitLabel="Send demo request">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4">
          {source && (
            <div
              data-testid="request-context"
              className="mb-3 grid gap-1 border-b border-[var(--color-border)] pb-3"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
                Continuing from {REQUEST_SOURCES[source].label}
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                {REQUEST_SOURCES[source].context}
              </p>
            </div>
          )}
          <Select
            label="Start the walkthrough with"
            name="focus"
            options={FOCUS_OPTIONS}
            value={focus}
            onChange={(event) => setFocus(event.currentTarget.value)}
          />
          <p
            className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]"
            aria-live="polite"
          >
            {focus === "general"
              ? "We'll follow the clinic day from reception to close."
              : `${focusLabel} will be the first workflow shown.`}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Clinic name"
            name="clinicName"
            required
            placeholder="e.g. DFI Synergy"
            autoComplete="organization"
          />
          <Field label="Location" name="location" required placeholder="City, country" />
          <Field
            label="Your name"
            name="name"
            required
            placeholder="First and last"
            autoComplete="name"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            placeholder="you@clinic.com"
            autoComplete="email"
          />
        </div>

        <details className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
          <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-tide-deep)] [&::-webkit-details-marker]:hidden">
            Add clinic setup details
            <span className="text-xs font-normal text-[var(--color-text-soft)]">Optional</span>
          </summary>
          <div className="grid gap-4 border-t border-[var(--color-border)] p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Your role (optional)"
                name="role"
                placeholder="Owner, practice manager, front desk lead…"
              />
              <Field
                label="# chairs (optional)"
                name="numChairs"
                type="number"
                min={1}
                placeholder="3"
              />
              <Field
                label="# providers (optional)"
                name="providers"
                type="number"
                min={1}
                placeholder="4"
              />
              <Select label="Current PMS (optional)" name="currentPms" options={PMS_OPTIONS} />
            </div>
            <TextArea
              label="Preferred times (optional)"
              name="preferredTimes"
              rows={2}
              placeholder="e.g. Wed afternoons SGT, or Fri 10:00–12:00"
            />
            <TextArea
              label="Anything else (optional)"
              name="message"
              rows={3}
              placeholder="Pain points, what you'd want to see first, current workflow notes…"
            />
          </div>
        </details>
      </FormShell>
    </div>
  );
}
