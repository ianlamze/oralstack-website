"use client";

import FormShell, { Field, Select, TextArea } from "./FormShell";
import { PMS_OPTIONS, START_MODE_OPTIONS, WORKFLOW_OPTIONS } from "./contact-options";

const TIMELINE_OPTIONS = [
  { value: "this-month", label: "This month" },
  { value: "1-3-months", label: "Next 1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "later", label: "Later / exploring" },
];

export default function MigrationAssessmentForm({
  defaultStartMode,
}: {
  defaultStartMode?: string;
}) {
  return (
    <FormShell intent="migration" submitLabel="Request a setup assessment">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Clinic name" name="clinicName" required autoComplete="organization" />
        <Select
          label="How would you like to start?"
          name="startMode"
          required
          options={START_MODE_OPTIONS}
          defaultValue={defaultStartMode}
        />
        <Select label="Current clinic system" name="currentPms" required options={PMS_OPTIONS} />
        <Select
          label="What should improve first?"
          name="workflowGoal"
          required
          options={WORKFLOW_OPTIONS}
        />
        <Field label="# chairs" name="numChairs" type="number" placeholder="e.g. 4" />
        <Select label="Rollout timeline" name="timeline" options={TIMELINE_OPTIONS} />
      </div>
      <TextArea
        label="Anything specific we should know? (optional)"
        name="message"
        placeholder="E.g. records to move, multi-location setup, optional connections, or data export concerns."
        rows={3}
      />
    </FormShell>
  );
}
