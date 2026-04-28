"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { days, reasons, returningPatient } from "@/content/online-booking/data";
import type { BookingReason, TimeSlot } from "@/content/online-booking/types";
import { track } from "@/lib/analytics";

type Step = 1 | 2 | 3 | 4;

type PatientForm = {
  phone: string;
  name: string;
  email: string;
};

const initialForm: PatientForm = { phone: "", name: "", email: "" };

function isReturningPhone(phone: string) {
  return phone.replace(/\s+/g, "") === returningPatient.phone.replace(/\s+/g, "");
}

export default function OnlineBooking() {
  const [step, setStep] = useState<Step>(1);
  const [reasonId, setReasonId] = useState<string | null>(null);
  const [dayDate, setDayDate] = useState<string>(days[1].date); // default Tomorrow
  const [slotTime, setSlotTime] = useState<string | null>(null);
  const [form, setForm] = useState<PatientForm>(initialForm);
  const reduceMotion = useReducedMotion();

  const reason = useMemo<BookingReason | null>(
    () => reasons.find((r) => r.id === reasonId) ?? null,
    [reasonId],
  );
  const day = useMemo(() => days.find((d) => d.date === dayDate) ?? days[1], [dayDate]);
  const recognised = isReturningPhone(form.phone);

  function pickReason(id: string) {
    setReasonId(id);
    setStep(2);
    track("booking_reason_picked", { reason_id: id });
  }

  function pickSlot(slot: TimeSlot) {
    if (!slot.available) return;
    setSlotTime(slot.time);
    setStep(3);
    track("booking_slot_picked", { date: dayDate, time: slot.time });
  }

  function updatePhone(value: string) {
    setForm((f) => {
      if (isReturningPhone(value) && !f.name) {
        track("booking_phone_lookup", { matched: true });
        return { ...f, phone: value, name: returningPatient.name };
      }
      return { ...f, phone: value };
    });
  }

  function submitDetails() {
    if (!form.phone.trim() || !form.name.trim()) return;
    setStep(4);
    track("booking_completed", {
      reason_id: reasonId ?? "",
      date: dayDate,
      time: slotTime ?? "",
      returning: recognised,
    });
  }

  function reset() {
    setStep(1);
    setReasonId(null);
    setSlotTime(null);
    setForm(initialForm);
    setDayDate(days[1].date);
    track("booking_reset");
  }

  const detailsValid = form.phone.trim().length >= 8 && form.name.trim().length >= 2;

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Booking widget · embeds on your site</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--color-tide-deep)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-tide-deep)]"
            />
            Live demo
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          DFI Synergy · /book
        </span>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <Stepper step={step} />

        <div className="p-5 sm:p-6 md:p-7 bg-white min-h-[420px]">
          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <h3 className="text-base font-semibold text-[var(--color-text)]">
                  What brings you in?
                </h3>
                <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                  Pick one — you can add details at the chair.
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {reasons.map((r) => (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => pickReason(r.id)}
                        className="w-full text-left rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-4 py-3 hover:border-[var(--color-ink)] hover:bg-[var(--color-canvas-tinted)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[13px] font-semibold text-[var(--color-text)]">
                            {r.label}
                          </span>
                          <span className="text-[10px] tabular-nums text-[var(--color-text-soft)] whitespace-nowrap">
                            {r.durationMin} min
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-[var(--color-text-muted)] leading-snug">
                          {r.description}
                        </p>
                        <p className="mt-2 text-[10px] tracking-[0.04em] text-[var(--color-tide-deep)]">
                          {r.fromPriceLabel}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {step === 2 && reason && (
              <motion.div
                key="step2"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold text-[var(--color-text)]">Pick a time</h3>
                  <span className="text-[11px] text-[var(--color-text-soft)]">
                    {reason.label} · {reason.durationMin} min
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                  Live availability — chair calendar updates as other patients book.
                </p>

                <div
                  role="tablist"
                  aria-label="Day"
                  className="mt-5 flex gap-1.5 overflow-x-auto pb-1"
                >
                  {days.map((d) => {
                    const isActive = d.date === dayDate;
                    const openCount = d.slots.filter((s) => s.available).length;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setDayDate(d.date)}
                        className={`grid gap-0.5 rounded-[var(--radius-md)] border px-3 py-2 min-w-[68px] text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                          isActive
                            ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                            : "border-[var(--color-border-strong)] bg-white text-[var(--color-text)] hover:border-[var(--color-ink)]"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-[0.08em] opacity-80">
                          {d.weekday}
                        </span>
                        <span className="text-[12px] font-semibold">{d.dayLabel}</span>
                        <span
                          className={`text-[9px] tabular-nums ${
                            isActive ? "opacity-80" : "text-[var(--color-text-soft)]"
                          }`}
                        >
                          {openCount} open
                        </span>
                      </button>
                    );
                  })}
                </div>

                <ul className="mt-5 grid gap-2 grid-cols-2 sm:grid-cols-3">
                  {day.slots.map((s) => (
                    <li key={s.time}>
                      <button
                        type="button"
                        onClick={() => pickSlot(s)}
                        disabled={!s.available}
                        aria-label={
                          s.available
                            ? `Book ${s.time} on ${day.dayLabel}`
                            : `${s.time} on ${day.dayLabel} — booked`
                        }
                        className={`w-full rounded-[var(--radius-md)] border px-3 py-2.5 text-[13px] tabular-nums font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                          s.available
                            ? "border-[var(--color-border-strong)] bg-white text-[var(--color-text)] hover:border-[var(--color-ink)] hover:bg-[var(--color-canvas-tinted)]"
                            : "border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-soft)] cursor-not-allowed line-through decoration-[1px]"
                        }`}
                      >
                        {s.time}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    ← Back
                  </button>
                  <p className="text-[10px] text-[var(--color-text-soft)] text-right">
                    Booked slots can&apos;t be picked — chair calendar is live.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && reason && slotTime && (
              <motion.div
                key="step3"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <h3 className="text-base font-semibold text-[var(--color-text)]">Your details</h3>
                <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                  Phone first — if you&apos;ve been here before, we&apos;ll recognise you. Try{" "}
                  <button
                    type="button"
                    onClick={() => updatePhone(returningPatient.phone)}
                    className="underline decoration-[var(--color-text-soft)] underline-offset-2 hover:text-[var(--color-tide-deep)] hover:decoration-[var(--color-tide-deep)]"
                  >
                    {returningPatient.phone}
                  </button>
                  .
                </p>

                <div className="mt-5 grid gap-3 max-w-[420px]">
                  <Field label="Mobile number" htmlFor="ob-phone">
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--color-text-soft)]"
                        aria-hidden
                      />
                      <input
                        id="ob-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => updatePhone(e.target.value)}
                        placeholder="+65 9123 4567"
                        className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white pl-9 pr-3 py-2 text-[13px] text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                      />
                    </div>
                  </Field>

                  <AnimatePresence initial={false}>
                    {recognised && (
                      <motion.div
                        key="recognised"
                        initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-3 py-2"
                      >
                        <p className="text-[11px] text-[var(--color-text-muted)]">
                          <span className="font-semibold text-[var(--color-text)]">
                            Welcome back, {returningPatient.name.split(" ")[0]}.
                          </span>{" "}
                          Last visit: {returningPatient.lastVisit}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Field label="Name" htmlFor="ob-name">
                    <input
                      id="ob-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3 py-2 text-[13px] text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                    />
                  </Field>

                  <Field label="Email (optional)" htmlFor="ob-email">
                    <input
                      id="ob-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3 py-2 text-[13px] text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                    />
                  </Field>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={submitDetails}
                    disabled={!detailsValid}
                    className="inline-flex items-center min-h-[36px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                  >
                    Confirm booking →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && reason && slotTime && (
              <motion.div
                key="step4"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-[color-mix(in_oklch,var(--color-tide-deep),white_82%)] text-[var(--color-tide-deep)]">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold text-[var(--color-text)]">
                    You&apos;re booked.
                  </h3>
                </div>

                <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4 grid gap-2 max-w-[440px]">
                  <SummaryRow label="Visit" value={reason.label} />
                  <SummaryRow
                    label="When"
                    value={`${day.weekday} ${day.dayLabel} · ${slotTime} · ${reason.durationMin} min`}
                  />
                  <SummaryRow label="Patient" value={form.name} />
                  <SummaryRow label="Phone" value={form.phone} />
                  {form.email && <SummaryRow label="Email" value={form.email} />}
                  <SummaryRow label="Clinic" value="DFI Synergy · 12 Tras St, S079025" />
                </div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.12 }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)] px-3 py-1.5 text-[11px] text-[var(--color-tide-deep)]"
                >
                  <MessageCircle className="h-3 w-3" aria-hidden />
                  Confirmation sent on WhatsApp · arrives in seconds
                </motion.div>

                <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden /> Try another booking
                  </button>
                  <p className="text-[10px] text-[var(--color-text-soft)] text-right max-w-[28ch]">
                    No double-booking — chair calendar locked the moment you confirmed.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-[10px] tracking-[0.04em] mt-3 text-[var(--color-text-soft)]">
        Embeds with one script tag · WhatsApp Business confirmations · returning-patient lookup by
        phone · no double-bookings
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your clinic site → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          The widget reads availability from the same chair calendar your front desk works from —
          one source, no fallback diary.
        </p>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const labels = ["Visit", "Time", "You", "Done"] as const;
  return (
    <ol className="flex items-stretch border-b border-[var(--color-border)] bg-[var(--color-canvas-tinted)]">
      {labels.map((label, i) => {
        const n = (i + 1) as Step;
        const state = n < step ? "done" : n === step ? "active" : "upcoming";
        return (
          <li
            key={label}
            aria-current={state === "active" ? "step" : undefined}
            className={`flex-1 px-3 py-2.5 grid gap-0.5 text-center border-r last:border-r-0 border-[var(--color-border)] ${
              state === "active" ? "bg-white" : ""
            }`}
          >
            <span
              className={`text-[9px] uppercase tracking-[0.14em] ${
                state === "done"
                  ? "text-[var(--color-tide-deep)]"
                  : state === "active"
                    ? "text-[var(--color-text)] font-semibold"
                    : "text-[var(--color-text-soft)]"
              }`}
            >
              Step {n}
            </span>
            <span
              className={`text-[11px] font-medium ${
                state === "done"
                  ? "text-[var(--color-tide-deep)]"
                  : state === "active"
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-soft)]"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-soft)] font-semibold">
        {label}
      </span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3 items-baseline">
      <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
        {label}
      </span>
      <span className="text-[12px] text-[var(--color-text)] leading-snug">{value}</span>
    </div>
  );
}
