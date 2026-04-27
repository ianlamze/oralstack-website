"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Tone = "sea" | "violet" | "sunset";

type Appointment = {
  id: string;
  chair: 0 | 1 | 2;
  start: number;
  len: number;
  label: string;
  tone: Tone;
};

const initialAppointments: Appointment[] = [
  { id: "a1", chair: 0, start: 8, len: 2, label: "Recall · A. Tan", tone: "sea" },
  { id: "a2", chair: 1, start: 9, len: 3, label: "Implant review · Dr Lim", tone: "violet" },
  { id: "a3", chair: 2, start: 10, len: 2, label: "Hygiene · M. Devi", tone: "sea" },
  { id: "a4", chair: 0, start: 11, len: 3, label: "Crown prep · J. Ong", tone: "sunset" },
  { id: "a5", chair: 1, start: 13, len: 2, label: "New patient · K. Lee", tone: "sea" },
  { id: "a6", chair: 2, start: 14, len: 2, label: "Endo · Dr Pereira", tone: "violet" },
];

// Demo move chosen for visibility: diagonal (chair AND time change), lands in
// a clearly empty slot, no collisions. New patient · K. Lee: chair 1 / 13:00
// → chair 2 / 12:00 (slot 12-14 is free between Hygiene 10-12 and Endo 14-16).
const DEMO_APPT_ID = "a5";
const DEMO_TARGET = { chair: 2 as const, start: 12 };

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
const chairs = ["Chair 1", "Chair 2", "Chair 3"];

const toneStyles: Record<Tone, { bg: string; border: string }> = {
  sea: {
    bg: "color-mix(in oklch, var(--color-sea), white 70%)",
    border: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
  },
  violet: {
    bg: "color-mix(in oklch, var(--color-violet), white 82%)",
    border: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
  },
  sunset: {
    bg: "color-mix(in oklch, var(--color-sunset), white 70%)",
    border: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 30%)",
  },
};

function patientFromLabel(label: string) {
  const after = label.split("·")[1];
  return after ? after.trim() : label;
}

function hasCollision(
  appointments: Appointment[],
  movingId: string,
  chair: 0 | 1 | 2,
  start: number,
  len: number,
) {
  return appointments.some(
    (other) =>
      other.id !== movingId &&
      other.chair === chair &&
      !(other.start + other.len <= start || start + len <= other.start),
  );
}

function findDropTarget(clientX: number, clientY: number) {
  const els = document.elementsFromPoint(clientX, clientY);
  for (const el of els) {
    if (
      el instanceof HTMLElement &&
      el.dataset.chair !== undefined &&
      el.dataset.hour !== undefined
    ) {
      const chair = Number.parseInt(el.dataset.chair, 10);
      const hour = Number.parseInt(el.dataset.hour, 10);
      if (chair >= 0 && chair <= 2 && Number.isFinite(hour)) {
        return { chair: chair as 0 | 1 | 2, start: hour };
      }
    }
  }
  return null;
}

export default function ScheduleMock() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [toast, setToast] = useState<{ kind: "ok" | "blocked"; text: string } | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [demoActive, setDemoActive] = useState(false);
  const [postDemoNudge, setPostDemoNudge] = useState(false);
  const [isTouchOnly, setIsTouchOnly] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  // Detect touch-only devices so the post-demo pulse fires only where the
  // hover-lift affordance is unavailable. Mirrors `@media (hover: none)`.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none)");
    setIsTouchOnly(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouchOnly(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function showToast(kind: "ok" | "blocked", text: string) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ kind, text });
    toastTimerRef.current = setTimeout(() => setToast(null), 2400);
  }

  function commitMove(a: Appointment, target: { chair: 0 | 1 | 2; start: number }) {
    const lastStart = hours[hours.length - 1];
    if (target.start + a.len > lastStart + 1) {
      showToast("blocked", "Doesn't fit before close — pick an earlier slot.");
      return;
    }
    if (hasCollision(appointments, a.id, target.chair, target.start, a.len)) {
      showToast("blocked", "Slot taken — try another time.");
      return;
    }
    setAppointments((prev) =>
      prev.map((x) => (x.id === a.id ? { ...x, chair: target.chair, start: target.start } : x)),
    );
    showToast(
      "ok",
      `Confirmation sent → ${patientFromLabel(a.label)} · Chair ${target.chair + 1}, ${String(target.start).padStart(2, "0")}:00`,
    );
  }

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
  }

  function handleDragEnd(a: Appointment, info: { point: { x: number; y: number } }) {
    setDraggingId(null);
    const target = findDropTarget(info.point.x, info.point.y);
    if (!target) return;
    if (target.chair === a.chair && target.start === a.start) return;
    commitMove(a, target);
  }

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;
    setDemoActive(true);

    const original = initialAppointments.find((a) => a.id === DEMO_APPT_ID);
    if (!original) {
      setDemoActive(false);
      return;
    }

    const moveOut = setTimeout(() => {
      if (hasInteractedRef.current) {
        setDemoActive(false);
        return;
      }
      setAppointments((prev) =>
        prev.map((x) =>
          x.id === DEMO_APPT_ID ? { ...x, chair: DEMO_TARGET.chair, start: DEMO_TARGET.start } : x,
        ),
      );
    }, 700);

    const moveBack = setTimeout(() => {
      if (hasInteractedRef.current) {
        setDemoActive(false);
        return;
      }
      setAppointments((prev) =>
        prev.map((x) =>
          x.id === DEMO_APPT_ID ? { ...x, chair: original.chair, start: original.start } : x,
        ),
      );
    }, 700 + 1100);

    const finish = setTimeout(
      () => {
        setDemoActive(false);
        // Skip the post-demo nudge if the user already engaged — they're
        // past the affordance question.
        if (!hasInteractedRef.current) setPostDemoNudge(true);
      },
      700 + 1100 + 600,
    );

    // Clear the "Now you try" hint after 3s.
    const nudgeEnd = setTimeout(
      () => {
        setPostDemoNudge(false);
      },
      700 + 1100 + 600 + 3000,
    );

    demoTimersRef.current = [moveOut, moveBack, finish, nudgeEnd];
  }, []);

  // Auto-demo: when the schedule scrolls into view for the first time, briefly
  // move one appointment to a free slot and back. Visible motion → "things move
  // here" without copy. Skipped under prefers-reduced-motion or if the user
  // already interacted (drag/hover/focus) before the demo had a chance to fire.
  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasDemoedRef.current || hasInteractedRef.current) return;
        hasDemoedRef.current = true;
        observer.disconnect();
        runDemo();
      },
      { threshold: 0.55 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [reduceMotion, runDemo]);

  // Cleanup any pending demo timers on unmount.
  useEffect(() => {
    return () => {
      for (const t of demoTimersRef.current) clearTimeout(t);
      demoTimersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[560px] mx-auto md:mx-0 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Schedule · Mon 27 Apr</span>
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
          DFI Synergy · Singapore
        </span>
      </div>

      <div className="mt-4 sm:mt-5 grid gap-x-1.5 sm:gap-x-2 grid-cols-[34px_repeat(3,minmax(0,1fr))] sm:grid-cols-[40px_repeat(3,minmax(0,1fr))] md:grid-cols-[44px_repeat(3,minmax(0,1fr))] grid-rows-[auto_repeat(9,32px)] sm:grid-rows-[auto_repeat(9,36px)] md:grid-rows-[auto_repeat(9,38px)] relative">
        <div />
        {chairs.map((c) => (
          <div
            key={c}
            className="text-[10px] sm:text-[11px] font-medium text-[var(--color-text-muted)] pb-2 text-center"
          >
            {c}
          </div>
        ))}

        {hours.map((h, i) => (
          <div
            key={`hour-${h}`}
            className="text-[9px] sm:text-[10px] text-[var(--color-text-soft)] tabular-nums pt-1"
            style={{ gridColumn: 1, gridRow: i + 2 }}
          >
            {String(h).padStart(2, "0")}:00
          </div>
        ))}

        {[0, 1, 2].flatMap((c) =>
          hours.map((h, i) => (
            <div
              key={`grid-${c}-${i}`}
              className="border-t"
              style={{
                gridColumn: c + 2,
                gridRow: i + 2,
                borderColor: "color-mix(in oklch, var(--color-line), white 30%)",
              }}
              data-chair={c}
              data-hour={h}
            />
          )),
        )}

        {appointments.map((a) => {
          const t = toneStyles[a.tone];
          const isDragging = draggingId === a.id;
          const dragEnabled = !demoActive;
          const shouldPulse =
            postDemoNudge && isTouchOnly && a.id === DEMO_APPT_ID && !reduceMotion;
          return (
            <motion.button
              key={a.id}
              type="button"
              layout={!reduceMotion}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { layout: { type: "spring", stiffness: 480, damping: 36 } }
              }
              animate={
                shouldPulse
                  ? {
                      scale: [1, 1.05, 1, 1.05, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(20,30,60,0)",
                        "0 8px 22px -8px rgba(20,30,60,0.28)",
                        "0 0 0 0 rgba(20,30,60,0)",
                        "0 8px 22px -8px rgba(20,30,60,0.28)",
                        "0 0 0 0 rgba(20,30,60,0)",
                      ],
                      transition: { duration: 1.6, ease: "easeInOut" },
                    }
                  : undefined
              }
              drag={dragEnabled}
              dragSnapToOrigin
              dragMomentum={false}
              dragElastic={0.18}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.03,
                      y: -1,
                      boxShadow: "0 8px 18px -8px rgba(20,30,60,0.22)",
                      zIndex: 10,
                    }
              }
              whileDrag={{
                scale: 1.04,
                cursor: "grabbing",
                zIndex: 30,
                boxShadow: "0 14px 30px -10px rgba(20,30,60,0.30)",
              }}
              onPointerEnter={markInteracted}
              onFocus={markInteracted}
              onDragStart={() => {
                markInteracted();
                setPostDemoNudge(false);
                setDraggingId(a.id);
              }}
              onDragEnd={(_, info) => handleDragEnd(a, info)}
              aria-label={`${a.label}, Chair ${a.chair + 1}, ${String(a.start).padStart(2, "0")}:00 to ${String(a.start + a.len).padStart(2, "0")}:00. Drag to reschedule.`}
              className="rounded-md border px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium leading-tight text-[var(--color-ink)] m-0.5 overflow-hidden cursor-grab text-left touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
              style={{
                gridColumn: a.chair + 2,
                gridRow: `${a.start - 8 + 2} / span ${a.len}`,
                backgroundColor: t.bg,
                borderColor: t.border,
                opacity: isDragging ? 0.92 : 1,
              }}
            >
              <div className="text-[9px] sm:text-[10px] tabular-nums text-[var(--color-text-muted)] pointer-events-none">
                {String(a.start).padStart(2, "0")}:00
              </div>
              <div className="truncate sm:whitespace-normal pointer-events-none">{a.label}</div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-5 flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--color-text-soft)] gap-3 min-h-[20px]">
        <span aria-live="polite" className="grid">
          <AnimatePresence mode="wait" initial={false}>
            {toast ? (
              <motion.span
                key={toast.text}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className={
                  toast.kind === "ok"
                    ? "font-medium text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]"
                    : "font-medium text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
                }
              >
                {toast.text}
              </motion.span>
            ) : postDemoNudge ? (
              <motion.span
                key="nudge"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-1 font-semibold text-[var(--color-tide-deep)]"
              >
                <span aria-hidden>↕</span>
                Now you try →
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-wrap items-center gap-x-1.5"
              >
                <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-tide-deep)]">
                  <span aria-hidden>↕</span>
                  Drag any appointment
                </span>
                <span className="text-[var(--color-text-soft)]">
                  — confirmation sends instantly
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="font-medium text-[var(--color-text-muted)] whitespace-nowrap">
          View day →
        </span>
      </div>
    </div>
  );
}
