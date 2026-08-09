"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  intent: "question" | "migration" | "pilot" | "demo";
  /** Visible button label. */
  submitLabel?: string;
  children: ReactNode;
};

/**
 * Wraps a contact form with submission state, posts to /api/contact, shows
 * inline success/error UI. The honeypot field and intent are added automatically.
 */
export default function FormShell({ intent, submitLabel = "Send", children }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    setStatus("submitting");
    setMessage("");

    const formData = new FormData(formEl);
    const data: Record<string, string> = { intent };
    formData.forEach((v, k) => {
      if (typeof v === "string") data[k] = v;
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; message: string };
      if (json.ok) {
        setStatus("success");
        setMessage(json.message);
        formEl.reset();
      } else {
        setStatus("error");
        setMessage(json.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Please email hello@oralstack.com directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 grid gap-3">
        <div className="flex items-center gap-2 text-[var(--color-tide-deep)]">
          <CheckCircle2 className="size-5" aria-hidden />
          <p className="font-semibold tracking-tight">Got it.</p>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {children}

      {/* Honeypot — bots fill, humans never see */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex items-center gap-3 mt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{status === "submitting" ? "Sending…" : submitLabel}</span>
          {status !== "submitting" && <ArrowRight className="size-4" aria-hidden />}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-700" role="alert">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

const fieldBase =
  "w-full min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus:outline-none focus:border-[var(--color-tide-deep)] focus:ring-1 focus:ring-[var(--color-tide-deep)]";

export function Field({
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
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-[var(--color-text)]">
        {label}
        {required && <span className="text-[var(--color-text-soft)]"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        className={fieldBase}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  required = false,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-[var(--color-text)]">
        {label}
        {required && <span className="text-[var(--color-text-soft)]"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={`${fieldBase} min-h-[120px] py-2.5 leading-relaxed`}
      />
    </label>
  );
}

export function Select({
  label,
  name,
  required = false,
  options,
  defaultValue = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-[var(--color-text)]">
        {label}
        {required && <span className="text-[var(--color-text-soft)]"> *</span>}
      </span>
      <select name={name} required={required} defaultValue={defaultValue} className={fieldBase}>
        <option value="" disabled>
          Pick one
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
