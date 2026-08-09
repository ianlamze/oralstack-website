"use client";

import FormShell, { Field, Select, TextArea } from "./FormShell";

const PMS_OPTIONS = [
  { value: "Plato", label: "Plato" },
  { value: "Open Dental", label: "Open Dental" },
  { value: "Dentrix", label: "Dentrix" },
  { value: "Eaglesoft", label: "Eaglesoft" },
  { value: "Practice-Web", label: "Practice-Web" },
  { value: "Other", label: "Other / not sure" },
];

const TIMELINE_OPTIONS = [
  { value: "this-month", label: "This month" },
  { value: "1-3-months", label: "Next 1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "later", label: "Later / exploring" },
];

const WORKFLOW_OPTIONS = [
  { value: "run-the-day", label: "Reception, schedule, or daily flow" },
  { value: "patient-care", label: "Patient folder or chairside care" },
  { value: "checkout-money", label: "Checkout, billing, or reconciliation" },
  { value: "clinic-operations", label: "Inventory, staff, or clinic operations" },
  { value: "insights", label: "Insights or multi-clinic oversight" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function MigrationAssessmentForm() {
  return (
    <FormShell intent="migration" submitLabel="Request connection assessment">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Clinic name" name="clinicName" required autoComplete="organization" />
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
        placeholder="E.g. multi-location, custom integrations, data export concerns."
        rows={3}
      />
    </FormShell>
  );
}
