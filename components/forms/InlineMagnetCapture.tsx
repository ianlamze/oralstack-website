"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  magnetSlug: string;
  magnetTitle: string;
  pitch: string;
  /** What the user gets in the email after capturing — short. */
  deliverable: string;
};

/**
 * Inline lead-magnet capture form. Drops into article bodies between the
 * content and the related-reading section. Posts to /api/lead-magnet which
 * emails the user a link to the magnet page.
 *
 * The magnet page itself is publicly accessible too — this form is friction
 * for email capture, not a content gate.
 */
export default function InlineMagnetCapture({
  magnetSlug,
  magnetTitle,
  pitch,
  deliverable,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = {
      email: String(formData.get("email") ?? ""),
      magnetSlug,
      magnetTitle,
      // honeypot
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/lead-magnet", {
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
      setMessage(
        "Couldn't reach the server. The reference is still readable at /lead-magnets.",
      );
    }
  }

  return (
    <aside className="not-prose my-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-8 grid gap-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 rounded-md bg-white border border-[var(--color-border)] p-2 text-[var(--color-tide-deep)]">
          <FileText className="size-4" aria-hidden />
        </div>
        <div className="grid gap-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Free download · {deliverable}
          </p>
          <p className="text-base md:text-lg font-semibold tracking-tight text-[var(--color-text)] leading-snug">
            {magnetTitle}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
            {pitch}
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4">
          <CheckCircle2
            className="size-5 text-[var(--color-tide-deep)] shrink-0 mt-0.5"
            aria-hidden
          />
          <div className="grid gap-1">
            <p className="text-sm font-semibold text-[var(--color-text)]">
              Check your email.
            </p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
          noValidate
        >
          <label className="flex-1 min-w-0">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@yourclinic.com"
              className="w-full min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus:outline-none focus:border-[var(--color-tide-deep)] focus:ring-1 focus:ring-[var(--color-tide-deep)]"
            />
          </label>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
          >
            <span>
              {status === "submitting" ? "Sending…" : "Email me the link"}
            </span>
            {status !== "submitting" && (
              <ArrowRight className="size-4" aria-hidden />
            )}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {message}
        </p>
      )}

      <p className="text-xs text-[var(--color-text-soft)]">
        We&apos;ll email you the link, no marketing list. Or read it
        directly at{" "}
        <a
          href={`/lead-magnets/${magnetSlug}`}
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          /lead-magnets/{magnetSlug}
        </a>
        .
      </p>
    </aside>
  );
}
