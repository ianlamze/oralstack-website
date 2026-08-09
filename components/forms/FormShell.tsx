"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getRequestSourceId } from "./contact-options";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  intent: "question" | "migration" | "pilot" | "security" | "demo";
  /** Visible button label. */
  submitLabel?: string;
  fallbackEmail?: string;
  children: ReactNode;
};

/**
 * Wraps a contact form with submission state, posts to /api/contact, shows
 * inline success/error UI. The honeypot field and intent are added automatically.
 */
export default function FormShell({
  intent,
  submitLabel = "Send",
  fallbackEmail = "hello@oralstack.com",
  children,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    const target =
      status === "success" ? successRef.current : status === "error" ? errorRef.current : null;
    if (!target) return;

    const frame = window.requestAnimationFrame(() => target.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    if (submittingRef.current) return;

    submittingRef.current = true;
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(formEl);
    const data: Record<string, string> = { intent };
    formData.forEach((v, k) => {
      if (typeof v === "string") data[k] = v;
    });
    const sourcePage = getRequestSourceId(
      new URLSearchParams(window.location.search).get("source"),
    );
    if (sourcePage) data.sourcePage = sourcePage;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseText = await res.text();
      let json: { ok?: boolean; message?: string } | null = null;
      try {
        json = JSON.parse(responseText) as { ok?: boolean; message?: string };
      } catch {
        // A proxy or upstream may return non-JSON. The fallback below stays actionable.
      }

      if (res.ok && json?.ok === true) {
        submittingRef.current = false;
        setStatus("success");
        setMessage(json.message ?? "Request received. We'll reply by email with the next step.");
        formEl.reset();
      } else {
        submittingRef.current = false;
        setStatus("error");
        setMessage(json?.message ?? "Online delivery is temporarily unavailable.");
      }
    } catch {
      submittingRef.current = false;
      setStatus("error");
      setMessage("We couldn't reach the request service.");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 grid gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-tide-deep)] focus:ring-offset-4"
      >
        <div className="flex items-center gap-2 text-[var(--color-tide-deep)]">
          <CheckCircle2 className="size-5" aria-hidden />
          <p className="font-semibold tracking-tight">Request received.</p>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={status === "submitting"} className="grid gap-4">
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

      {status === "error" && (
        <div
          ref={errorRef}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="grid gap-2 rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-4 text-sm text-red-900 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-4"
        >
          <p className="font-semibold">We couldn&apos;t send your request.</p>
          <p>{message}</p>
          <a
            href={`mailto:${fallbackEmail}`}
            className="w-fit font-medium underline underline-offset-4"
          >
            Email {fallbackEmail} instead
          </a>
        </div>
      )}

      <div
        data-testid="request-privacy-notice"
        className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4 text-xs leading-relaxed text-[var(--color-text-muted)]"
      >
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--color-tide-deep)]" aria-hidden />
        <p>
          <span className="font-semibold text-[var(--color-text)]">Clinic details only.</span> Do
          not include patient names, identifiers, health information, clinical records, passwords,
          or security findings. We send this request through Cloudflare and Resend so the Oralstack
          team can reply.{" "}
          <a
            href="/privacy#contact-requests"
            className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            How requests are handled
          </a>
          .
        </p>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{status === "submitting" ? "Sending…" : submitLabel}</span>
          {status !== "submitting" && <ArrowRight className="size-4" aria-hidden />}
        </button>
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
  value,
  onChange,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-[var(--color-text)]">
        {label}
        {required && <span className="text-[var(--color-text-soft)]"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue={value === undefined ? defaultValue : undefined}
        value={value}
        onChange={onChange}
        className={fieldBase}
      >
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
