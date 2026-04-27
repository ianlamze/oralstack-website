"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Database, Clock, Layers } from "lucide-react";
import { Field } from "@/components/forms/FormShell";

type Pms = "plato" | "open-dental" | "dentrix" | "eaglesoft" | "practice-web" | "other";
type Timeline = "this-month" | "1-3-months" | "3-6-months" | "later";

type State = {
  pms: Pms | null;
  chairs: number;
  providers: number;
  locations: number;
  yearsHistory: number;
  hasImaging: boolean;
  hasRecall: boolean;
  hasCustom: boolean;
  timeline: Timeline | null;
};

const PMS_OPTIONS: { value: Pms; label: string; tag: string; baseWeeks: [number, number] }[] = [
  { value: "plato", label: "Plato", tag: "On-prem · Singapore", baseWeeks: [3, 4] },
  { value: "open-dental", label: "Open Dental", tag: "Open SQL schema", baseWeeks: [3, 4] },
  { value: "dentrix", label: "Dentrix", tag: "Henry Schein", baseWeeks: [4, 6] },
  { value: "eaglesoft", label: "Eaglesoft", tag: "Patterson", baseWeeks: [4, 6] },
  { value: "practice-web", label: "Practice-Web", tag: "Cloud / hybrid", baseWeeks: [3, 5] },
  { value: "other", label: "Other / not sure", tag: "We'll figure it out", baseWeeks: [4, 8] },
];

const TIMELINE_OPTIONS: { value: Timeline; label: string }[] = [
  { value: "this-month", label: "This month" },
  { value: "1-3-months", label: "Next 1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "later", label: "Later / exploring" },
];

const STEP_TITLES = [
  "Which PMS are you on today?",
  "Tell us about your clinic.",
  "What data needs to come across?",
  "When would you want to switch?",
];

function estimate(s: State): { lo: number; hi: number; band: "fast" | "standard" | "complex" } {
  const pms = PMS_OPTIONS.find((p) => p.value === s.pms);
  if (!pms) return { lo: 3, hi: 6, band: "standard" };
  let [lo, hi] = pms.baseWeeks;
  if (s.chairs >= 8) {
    lo += 1;
    hi += 2;
  } else if (s.chairs >= 5) {
    hi += 1;
  }
  if (s.locations >= 2) {
    lo += 1;
    hi += 1;
  }
  if (s.yearsHistory >= 10) hi += 1;
  if (s.hasCustom) hi += 1;
  const band = hi - lo <= 2 && lo <= 3 ? "fast" : hi >= 8 ? "complex" : "standard";
  return { lo, hi, band };
}

export default function MigrationReadinessWizard() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [s, setS] = useState<State>({
    pms: null,
    chairs: 3,
    providers: 2,
    locations: 1,
    yearsHistory: 5,
    hasImaging: true,
    hasRecall: true,
    hasCustom: false,
    timeline: null,
  });

  const totalSteps = STEP_TITLES.length;
  const isResult = step === totalSteps;
  const stepValid =
    (step === 0 && s.pms !== null) ||
    step === 1 ||
    step === 2 ||
    (step === 3 && s.timeline !== null) ||
    isResult;

  function next() {
    if (step < totalSteps) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function handleLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) {
      setSubmitted("success");
      return;
    }
    const pmsLabel = PMS_OPTIONS.find((p) => p.value === s.pms)?.label ?? "Other";
    const est = estimate(s);
    const payload = {
      intent: "migration",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      clinicName: String(data.get("clinicName") ?? ""),
      currentPms: pmsLabel,
      numChairs: String(s.chairs),
      timeline: s.timeline ?? "",
      message:
        `Migration readiness: ${s.locations} location(s), ${s.providers} providers, ${s.yearsHistory} years of history. ` +
        `Imaging: ${s.hasImaging ? "yes" : "no"}. Recall list: ${s.hasRecall ? "yes" : "no"}. Custom integrations: ${s.hasCustom ? "yes" : "no"}. ` +
        `Estimate: ${est.lo}–${est.hi} weeks (${est.band}).`,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; message: string };
      if (json.ok) {
        setSubmitted("success");
      } else {
        setSubmitted("error");
        setErrorMsg(json.message);
      }
    } catch {
      setSubmitted("error");
      setErrorMsg("Couldn't reach the server. Please email hello@oralstack.com directly.");
    }
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-10">
      <Progress current={step} total={totalSteps} />

      {!isResult && (
        <h2 className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
          {STEP_TITLES[step]}
        </h2>
      )}

      <div className="mt-7 min-h-[260px]">
        {step === 0 && <StepPms value={s.pms} onChange={(pms) => setS({ ...s, pms })} />}
        {step === 1 && <StepProfile s={s} onChange={(patch) => setS({ ...s, ...patch })} />}
        {step === 2 && <StepData s={s} onChange={(patch) => setS({ ...s, ...patch })} />}
        {step === 3 && (
          <StepTimeline value={s.timeline} onChange={(timeline) => setS({ ...s, timeline })} />
        )}
        {isResult && (
          <StepResult
            state={s}
            onSubmit={handleLeadSubmit}
            status={submitted}
            errorMsg={errorMsg}
          />
        )}
      </div>

      {!isResult && (
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!stepValid}
            className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{step === totalSteps - 1 ? "See estimate" : "Continue"}</span>
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

function Progress({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round(((current + (current === total ? 1 : 0)) / total) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
        <span>
          Step {Math.min(current + 1, total)} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[var(--color-canvas-tinted)]">
        <div
          className="h-full rounded-full bg-[var(--color-tide-deep)] transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StepPms({ value, onChange }: { value: Pms | null; onChange: (v: Pms) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PMS_OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`group flex items-start gap-3 rounded-[var(--radius-md)] border p-4 text-left transition-all ${
              selected
                ? "border-[var(--color-tide-deep)] bg-[color-mix(in_oklch,var(--color-tide),white_92%)] shadow-[0_4px_14px_-6px_rgba(20,30,60,0.18)]"
                : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-text-soft)]"
            }`}
            aria-pressed={selected}
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
                selected
                  ? "border-[var(--color-tide-deep)] bg-[var(--color-tide-deep)] text-white"
                  : "border-[var(--color-border-strong)]"
              }`}
              aria-hidden
            >
              {selected && <Check className="size-3" />}
            </span>
            <span className="grid gap-0.5">
              <span className="text-sm font-semibold text-[var(--color-text)]">{opt.label}</span>
              <span className="text-xs text-[var(--color-text-muted)]">{opt.tag}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepProfile({ s, onChange }: { s: State; onChange: (patch: Partial<State>) => void }) {
  return (
    <div className="grid gap-7 max-w-[520px]">
      <Slider
        label="Chairs"
        min={1}
        max={20}
        value={s.chairs}
        onChange={(chairs) => onChange({ chairs })}
      />
      <Slider
        label="Providers (dentists + hygienists)"
        min={1}
        max={30}
        value={s.providers}
        onChange={(providers) => onChange({ providers })}
      />
      <Slider
        label="Locations"
        min={1}
        max={10}
        value={s.locations}
        onChange={(locations) => onChange({ locations })}
      />
    </div>
  );
}

function StepData({ s, onChange }: { s: State; onChange: (patch: Partial<State>) => void }) {
  return (
    <div className="grid gap-6 max-w-[520px]">
      <Slider
        label="Years of patient history to migrate"
        min={1}
        max={25}
        value={s.yearsHistory}
        onChange={(yearsHistory) => onChange({ yearsHistory })}
        suffix={s.yearsHistory === 25 ? "+ years" : " years"}
      />
      <fieldset className="grid gap-2.5">
        <legend className="text-sm font-medium text-[var(--color-text)] mb-1">Also moving:</legend>
        <Toggle
          label="Imaging library (DICOM, intra-oral, panoramics)"
          checked={s.hasImaging}
          onChange={(hasImaging) => onChange({ hasImaging })}
        />
        <Toggle
          label="Active recall list"
          checked={s.hasRecall}
          onChange={(hasRecall) => onChange({ hasRecall })}
        />
        <Toggle
          label="Custom integrations (insurance, PHM, lab, etc.)"
          checked={s.hasCustom}
          onChange={(hasCustom) => onChange({ hasCustom })}
        />
      </fieldset>
    </div>
  );
}

function StepTimeline({
  value,
  onChange,
}: {
  value: Timeline | null;
  onChange: (v: Timeline) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TIMELINE_OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center justify-between rounded-[var(--radius-md)] border px-4 py-4 text-left transition-all ${
              selected
                ? "border-[var(--color-tide-deep)] bg-[color-mix(in_oklch,var(--color-tide),white_92%)]"
                : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-text-soft)]"
            }`}
            aria-pressed={selected}
          >
            <span className="text-sm font-medium">{opt.label}</span>
            {selected && <Check className="size-4 text-[var(--color-tide-deep)]" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}

function StepResult({
  state,
  onSubmit,
  status,
  errorMsg,
}: {
  state: State;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  status: "idle" | "submitting" | "success" | "error";
  errorMsg: string;
}) {
  const est = estimate(state);
  const pmsLabel = PMS_OPTIONS.find((p) => p.value === state.pms)?.label ?? "your PMS";
  const bandCopy =
    est.band === "fast"
      ? "Straightforward."
      : est.band === "complex"
        ? "Bigger lift, fully supported."
        : "Standard migration path.";

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
          Estimate · {bandCopy}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-[24ch]">
          Most clinics like yours move from {pmsLabel} in{" "}
          <span className="text-[var(--color-tide-deep)] tabular-nums">
            {est.lo}–{est.hi}
          </span>{" "}
          weeks.
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] max-w-[60ch]">
          Includes data extraction, validation, parallel running on a sample week, and the live
          cutover. Three months of hands-on onboarding is included in the pilot price.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <ResultCard
          icon={Database}
          label="Data scope"
          value={`${state.yearsHistory}${state.yearsHistory === 25 ? "+" : ""} years`}
          sub={
            [
              state.hasImaging && "imaging library",
              state.hasRecall && "recall list",
              state.hasCustom && "custom integrations",
            ]
              .filter(Boolean)
              .join(" · ") || "patient + chart data"
          }
        />
        <ResultCard
          icon={Layers}
          label="Footprint"
          value={`${state.chairs} ${state.chairs === 1 ? "chair" : "chairs"}`}
          sub={`${state.providers} providers · ${state.locations} ${state.locations === 1 ? "location" : "locations"}`}
        />
        <ResultCard
          icon={Clock}
          label="Cutover window"
          value={
            est.band === "fast"
              ? "Single weekend"
              : est.band === "complex"
                ? "Phased per location"
                : "Long weekend"
          }
          sub="Zero lost appointments per pilot SLA"
        />
      </div>

      {status === "success" ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 grid gap-3">
          <div className="flex items-center gap-2 text-[var(--color-tide-deep)]">
            <CheckCircle2 className="size-5" aria-hidden />
            <p className="font-semibold tracking-tight">Sent.</p>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            We&apos;ll come back within one working day with a sample data-mapping plan tailored to
            your {pmsLabel} setup.
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-7"
          noValidate
        >
          <p className="text-sm font-medium text-[var(--color-text)]">
            Send the full migration plan to your inbox.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Your name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <div className="md:col-span-2">
              <Field label="Clinic name" name="clinicName" required autoComplete="organization" />
            </div>
          </div>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors disabled:opacity-60"
            >
              <span>{status === "submitting" ? "Sending…" : "Send my migration plan"}</span>
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <a
              href="/book-a-demo"
              className="text-sm text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              or book a demo
            </a>
          </div>
          {status === "error" && (
            <p className="text-sm text-red-700" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

function ResultCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Database;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-4">
      <div className="flex items-center gap-2 text-[var(--color-text-soft)]">
        <Icon className="size-3.5" aria-hidden />
        <p className="text-[10px] font-medium uppercase tracking-[0.14em]">{label}</p>
      </div>
      <p className="mt-2 text-lg font-semibold tracking-tight text-[var(--color-text)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">{sub}</p>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  value,
  onChange,
  suffix = "",
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-baseline justify-between text-sm font-medium text-[var(--color-text)]">
        <span>{label}</span>
        <span className="tabular-nums text-[var(--color-tide-deep)]">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-tide-deep)]"
      />
      <span className="flex justify-between text-[10px] tabular-nums text-[var(--color-text-soft)]">
        <span>{min}</span>
        <span>
          {max}
          {suffix.includes("+") ? "+" : ""}
        </span>
      </span>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-[var(--radius-md)] border px-3.5 py-3 cursor-pointer transition-colors ${
        checked
          ? "border-[var(--color-tide-deep)] bg-[color-mix(in_oklch,var(--color-tide),white_92%)]"
          : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-text-soft)]"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border ${
          checked
            ? "border-[var(--color-tide-deep)] bg-[var(--color-tide-deep)] text-white"
            : "border-[var(--color-border-strong)]"
        }`}
        aria-hidden
      >
        {checked && <Check className="size-3" />}
      </span>
      <span className="text-sm text-[var(--color-text)]">{label}</span>
    </label>
  );
}
