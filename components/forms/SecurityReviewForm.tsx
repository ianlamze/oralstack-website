"use client";

import FormShell, { Field, Select, TextArea } from "./FormShell";
import { SECURITY_REQUEST_OPTIONS } from "./contact-options";

const REVIEW_TIMELINE_OPTIONS = [
  { value: "this-week", label: "This week" },
  { value: "1-2-weeks", label: "Next 1–2 weeks" },
  { value: "this-month", label: "This month" },
  { value: "exploring", label: "No deadline / exploring" },
];

export default function SecurityReviewForm({
  defaultRequestType,
}: {
  defaultRequestType?: string;
}) {
  return (
    <FormShell
      intent="security"
      submitLabel="Request security review"
      fallbackEmail="security@oralstack.com"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
        <Field
          label="Organization / clinic"
          name="clinicName"
          required
          autoComplete="organization"
        />
        <Field label="Your role / team" name="role" required autoComplete="organization-title" />
        <Select
          label="What do you need?"
          name="requestType"
          required
          options={SECURITY_REQUEST_OPTIONS}
          defaultValue={defaultRequestType}
        />
        <Select
          label="Review timeline"
          name="timeline"
          required
          options={REVIEW_TIMELINE_OPTIONS}
        />
      </div>
      <TextArea
        label="Scope or format notes (optional)"
        name="message"
        placeholder="E.g. questionnaire format, procurement stage, or the clinics in scope. Do not include vulnerabilities, credentials, or patient data."
        rows={3}
      />
    </FormShell>
  );
}
