"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitting" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_DEMO_FORM_ENDPOINT;

const labelClass = "text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]";
const fieldClass =
  "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas)] px-3 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-tide-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tide-deep)]/30";

export default function DemoRequestForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const payload = {
      clinic: get("clinic"),
      name: get("name"),
      role: get("role"),
      email: get("email"),
      location: get("location"),
      chairs: get("chairs"),
      providers: get("providers"),
      currentPms: get("currentPms"),
      preferredTimes: get("preferredTimes"),
      notes: get("notes"),
    };

    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `Demo request — ${payload.clinic || "Oralstack"}`,
            ...payload,
          }),
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        setState("sent");
        form.reset();
        return;
      } catch {
        setState("error");
        return;
      }
    }

    const fields = [
      ["Clinic", payload.clinic],
      ["Your name", payload.name],
      ["Role", payload.role],
      ["Email", payload.email],
      ["Location", payload.location],
      ["Chairs", payload.chairs],
      ["Providers", payload.providers],
      ["Current PMS", payload.currentPms],
      ["Preferred times", payload.preferredTimes],
      ["Anything else", payload.notes],
    ];

    const body = fields
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}:\n${v}`)
      .join("\n\n");

    const subject = `Demo request — ${payload.clinic || "Oralstack"}`;
    const url = `mailto:hello@oralstack.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="grid gap-3 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-8 md:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Request received
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Thanks — we&apos;ll be in touch within one working day.
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
          {ENDPOINT
            ? "We've got your request. Reply will come from hello@oralstack.com — keep an eye on spam if you don't see it."
            : "Your email client should be opening with the request pre-filled. If nothing happened, email hello@oralstack.com directly."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-6 md:p-10"
    >
      <div className="grid gap-2">
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
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Clinic name" name="clinic" required placeholder="e.g. DFI Synergy" />
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
        <Field label="Chairs" name="chairs" type="number" min={1} required placeholder="3" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Providers" name="providers" type="number" min={1} placeholder="4" />
        <div className="grid gap-1.5">
          <label htmlFor="currentPms" className={labelClass}>
            Current PMS
          </label>
          <select id="currentPms" name="currentPms" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select…
            </option>
            <option>Plato</option>
            <option>Open Dental</option>
            <option>Dentrix</option>
            <option>Eaglesoft</option>
            <option>Carestream</option>
            <option>Other</option>
            <option>None / paper diary</option>
          </select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="preferredTimes" className={labelClass}>
          Preferred times{" "}
          <span className="normal-case tracking-normal text-[var(--color-text-soft)]">
            (optional)
          </span>
        </label>
        <textarea
          id="preferredTimes"
          name="preferredTimes"
          rows={2}
          placeholder="e.g. Wed afternoons SGT, or Fri 10:00–12:00"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="notes" className={labelClass}>
          Anything else{" "}
          <span className="normal-case tracking-normal text-[var(--color-text-soft)]">
            (optional)
          </span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Pain points, what you'd want to see first, current workflow notes…"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-[var(--color-border)] pt-5">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] disabled:opacity-60 transition-colors"
        >
          {state === "submitting" ? "Sending…" : "Send demo request →"}
        </button>
        <p className="text-xs text-[var(--color-text-soft)] tracking-[0.04em] max-w-[44ch]">
          {ENDPOINT
            ? "We reply within one working day from hello@oralstack.com."
            : "Submitting opens your email client with the request pre-filled. We reply within one working day."}
        </p>
      </div>
      {state === "error" && (
        <p className="text-xs text-[var(--color-sunset-deep)]">
          Something went wrong sending the form. Email hello@oralstack.com directly and we&apos;ll
          pick it up.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  min?: number;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
        {!required && (
          <span className="normal-case tracking-normal text-[var(--color-text-soft)]">
            {" "}
            (optional)
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        className={fieldClass}
      />
    </div>
  );
}
