"use client";

import FormShell, { Field, TextArea } from "./FormShell";

export default function QuickQuestionForm() {
  return (
    <FormShell intent="question" submitLabel="Send question">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <TextArea
        label="What's your question?"
        name="message"
        required
        placeholder="Pricing, integrations, security, anything else."
      />
    </FormShell>
  );
}
