"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// "After Oralstack" pane for the Pre-visit stage. Shows the WhatsApp
// templated reminder + intake link, the form-completion ticks, and the
// pre-resolved eligibility tier.

const messages = [
  {
    from: "clinic" as const,
    body: "Hi Devi, you have a visit tomorrow at 09:30. Tap to fill your intake (2 min) → oralstack.com/i/dk-1054",
    time: "Mon 18:02",
  },
  {
    from: "patient" as const,
    body: "Done thanks!",
    time: "Mon 18:14",
  },
  {
    from: "clinic" as const,
    body: "Got it · CHAS Blue rate confirmed for tomorrow.",
    time: "Mon 18:14",
  },
];

const intakeChecks = [
  { label: "Medical history", state: "✓" },
  { label: "Allergies (NKDA)", state: "✓" },
  { label: "PDPA consent", state: "✓" },
  { label: "Insurance / CHAS", state: "✓" },
];

export default function AfterPreVisitMock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hasDemoedRef = useRef(false);
  const [shown, setShown] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        hasDemoedRef.current = true;
        observer.disconnect();
        setTimeout(() => setShown(true), 500);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="After-Oralstack pre-visit: a templated WhatsApp thread sending an intake link the patient completes on their phone, a checklist showing medical history, allergies, PDPA consent and insurance verified, plus a footer showing 11 of 12 patients form-complete and 4 minutes of admin per patient."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Pre-visit · WhatsApp + intake</span>
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
          Devi Krishnan · #1054
        </span>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sea),white_94%)] p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          WhatsApp Business · audit-logged
        </p>
        <ul className="mt-2 grid gap-2">
          {messages.map((m, i) => (
            <motion.li
              key={`${m.time}-${i}`}
              initial={reduceMotion ? false : { opacity: 0, y: 3 }}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.22, delay: shown ? i * 0.1 : 0 }}
              className={`flex ${m.from === "clinic" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-[var(--radius-md)] px-3 py-2 text-[12px] leading-snug ${
                  m.from === "clinic"
                    ? "bg-white border border-[var(--color-border)] text-[var(--color-text)]"
                    : "bg-[var(--color-tide-deep)] text-[var(--color-canvas)]"
                }`}
              >
                <span>{m.body}</span>
                <span
                  className={`block mt-1 text-[9px] ${
                    m.from === "clinic"
                      ? "text-[var(--color-text-soft)]"
                      : "text-[color-mix(in_oklch,var(--color-canvas),var(--color-ink)_45%)]"
                  }`}
                >
                  {m.time} · {m.from === "clinic" ? "templated" : "delivered ✓✓"}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Intake checklist · written to chart on submit
        </p>
        <ul className="grid sm:grid-cols-2 gap-1.5">
          {intakeChecks.map((c, i) => (
            <motion.li
              key={c.label}
              initial={reduceMotion ? false : { opacity: 0, y: 3 }}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ duration: 0.22, delay: shown ? 0.4 + i * 0.05 : 0 }}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-2.5 py-2"
            >
              <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[color-mix(in_oklch,var(--color-sea),white_72%)] text-[10px] font-bold text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]">
                {c.state}
              </span>
              <span className="text-[12px] text-[var(--color-text)] truncate">{c.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-[var(--radius-sm)] border border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_28%)] bg-[color-mix(in_oklch,var(--color-sea),white_78%)] px-3 py-2">
        <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]">
          Eligibility resolved
        </span>
        <span className="text-[12px] text-[var(--color-text)] font-medium">CHAS Blue</span>
        <span className="text-[10px] text-[var(--color-text-muted)] ml-auto">
          ID-checked · 12-mo plan
        </span>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3">
        11 of 12 form-complete · ~4 min admin per patient · arrival → chair under 5 min
      </p>
    </div>
  );
}
