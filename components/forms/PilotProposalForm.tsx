"use client";

import FormShell, { Field, TextArea } from "./FormShell";

export default function PilotProposalForm() {
  return (
    <FormShell intent="pilot" submitLabel="Request pilot proposal">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Clinic / group name" name="clinicName" required autoComplete="organization" />
        <Field
          label="# locations"
          name="numLocations"
          type="number"
          required
          placeholder="e.g. 3"
        />
        <Field label="# chairs total" name="numChairsTotal" type="number" placeholder="e.g. 12" />
        <Field label="Target start date" name="startDate" type="text" placeholder="e.g. Q3 2026" />
      </div>
      <TextArea
        label="What does success look like for the pilot? (optional)"
        name="message"
        placeholder="E.g. eliminate Plato, unify three locations, get owner-level analytics."
        rows={3}
      />
    </FormShell>
  );
}
