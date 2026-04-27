"use client";

import FormShell, { Field, Select, TextArea } from "@/components/forms/FormShell";

const PMS_OPTIONS = [
  { value: "Plato", label: "Plato" },
  { value: "Open Dental", label: "Open Dental" },
  { value: "Dentrix", label: "Dentrix" },
  { value: "Eaglesoft", label: "Eaglesoft" },
  { value: "Carestream", label: "Carestream" },
  { value: "Other", label: "Other" },
  { value: "None / paper diary", label: "None / paper diary" },
];

export default function DemoRequestForm() {
  return (
    <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-6 md:p-10">
      <header className="grid gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Request a demo
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Tell us about your clinic.
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
          We&apos;ll reply within one working day with two or three time slots, and run the demo
          against a sample dataset that matches your size.
        </p>
      </header>
      <FormShell intent="demo" submitLabel="Send demo request">
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
            label="Your role"
            name="role"
            required
            placeholder="Owner, practice manager, front desk lead…"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            placeholder="you@clinic.com"
            autoComplete="email"
          />
          <Field label="# chairs" name="numChairs" type="number" required min={1} placeholder="3" />
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
      </FormShell>
    </div>
  );
}
