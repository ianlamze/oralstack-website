"use client";

import FormShell, { Field, Select, TextArea } from "./FormShell";
import { PMS_OPTIONS, WORKFLOW_OPTIONS } from "./contact-options";

export default function PilotProposalForm({
  defaultWorkflowGoal,
}: {
  defaultWorkflowGoal?: string;
}) {
  return (
    <FormShell intent="pilot" submitLabel="Request a pilot proposal">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Clinic / group name" name="clinicName" required autoComplete="organization" />
        <Field
          label="Number of locations"
          name="numLocations"
          type="number"
          required
          min={1}
          placeholder="e.g. 1"
        />
        <Select label="Current clinic system" name="currentPms" required options={PMS_OPTIONS} />
        <Select
          label="What should improve first?"
          name="workflowGoal"
          required
          options={WORKFLOW_OPTIONS}
          defaultValue={defaultWorkflowGoal}
        />
        <Field
          label="Chairs across all locations"
          name="numChairsTotal"
          type="number"
          min={1}
          placeholder="e.g. 4"
        />
        <Field label="Target start date" name="startDate" type="text" placeholder="e.g. Q3 2026" />
      </div>
      <TextArea
        label="What does success look like for the pilot? (optional)"
        name="message"
        placeholder="E.g. make reception handoffs visible, improve checkout follow-up, or give managers one clinic view."
        rows={3}
      />
    </FormShell>
  );
}
