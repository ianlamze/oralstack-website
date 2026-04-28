"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { initialThreads, templates } from "@/content/patient-comms/data";
import type { Message, Thread } from "@/content/patient-comms/types";
import { track } from "@/lib/analytics";

const DEMO_THREAD_ID = "th1"; // Hafiz Yusof
const DEMO_TEMPLATE_ID = "offer_reschedule";

function fillTemplate(body: string, name: string, procedure: string, provider = "Dr Wong") {
  return body
    .replace(/{name}/g, name.split(" ")[0])
    .replace(/{procedure}/g, procedure.toLowerCase())
    .replace(/{provider}/g, provider)
    .replace(/{date}/g, "Wed 27 Apr")
    .replace(/{time}/g, "11:00");
}

export default function PatientCommunicationCenter() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>(DEMO_THREAD_ID);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [composeText, setComposeText] = useState("");
  const [postDemoNudge, setPostDemoNudge] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  const activeThread = threads.find((t) => t.id === activeThreadId);

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
    setPostDemoNudge(false);
  }

  function openThread(id: string) {
    markInteracted();
    setActiveThreadId(id);
    setPickerOpen(false);
    setComposeText("");
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, unread: false } : t)));
    track("patient_comm_thread_opened", { thread_id: id });
  }

  function pickTemplate(id: string) {
    markInteracted();
    if (!activeThread) return;
    const tmpl = templates.find((x) => x.id === id);
    if (!tmpl) return;
    const filled = fillTemplate(tmpl.body, activeThread.patientName, activeThread.procedure);
    setComposeText(filled);
    setPickerOpen(false);
    track("patient_comm_template_picked", { template_id: id, thread_id: activeThread.id });
  }

  function sendMessage() {
    markInteracted();
    if (!activeThread || !composeText.trim()) return;
    const msg: Message = {
      id: `m-${Date.now()}`,
      from: "clinic",
      body: composeText.trim(),
      time: "just now",
      fromTemplate: undefined,
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? { ...t, messages: [...t.messages, msg], lastTime: "just now" }
          : t,
      ),
    );
    setComposeText("");
    track("patient_comm_message_sent", { thread_id: activeThread.id });
  }

  // Scroll messages to bottom when the thread switches or a new message lands.
  // Deps act as change triggers — biome flags them as unused inside the body,
  // which is fine: we want the effect to re-run on those identity changes.
  const messageCount = activeThread?.messages.length ?? 0;
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger-only deps
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeThreadId, messageCount, reduceMotion]);

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;

    const openPicker = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setPickerOpen(true);
    }, 900);

    const pickTmpl = setTimeout(() => {
      if (hasInteractedRef.current) return;
      const thread = initialThreads.find((t) => t.id === DEMO_THREAD_ID);
      const tmpl = templates.find((t) => t.id === DEMO_TEMPLATE_ID);
      if (!thread || !tmpl) return;
      setComposeText(fillTemplate(tmpl.body, thread.patientName, thread.procedure));
      setPickerOpen(false);
    }, 900 + 1100);

    const send = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        const tmpl = templates.find((t) => t.id === DEMO_TEMPLATE_ID);
        const thread = initialThreads.find((t) => t.id === DEMO_THREAD_ID);
        if (!tmpl || !thread) return;
        const filled = fillTemplate(tmpl.body, thread.patientName, thread.procedure);
        const msg: Message = {
          id: `m-demo-${Date.now()}`,
          from: "clinic",
          body: filled,
          time: "just now",
          fromTemplate: tmpl.id,
        };
        setThreads((prev) =>
          prev.map((t) =>
            t.id === DEMO_THREAD_ID
              ? { ...t, messages: [...t.messages, msg], lastTime: "just now", unread: false }
              : t,
          ),
        );
        setComposeText("");
      },
      900 + 1100 + 1200,
    );

    const nudgeOn = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setPostDemoNudge(true);
      },
      900 + 1100 + 1200 + 800,
    );

    const nudgeOff = setTimeout(() => setPostDemoNudge(false), 900 + 1100 + 1200 + 800 + 3500);

    demoTimersRef.current = [openPicker, pickTmpl, send, nudgeOn, nudgeOff];
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting) return;
        if (hasDemoedRef.current || hasInteractedRef.current) return;
        hasDemoedRef.current = true;
        obs.disconnect();
        runDemo();
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduceMotion, runDemo]);

  useEffect(() => {
    return () => {
      for (const t of demoTimersRef.current) clearTimeout(t);
      demoTimersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Patient communications · WhatsApp</span>
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
          DFI Synergy · audit-logged
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        {/* Thread list */}
        <ul className="grid divide-y divide-[var(--color-border)] bg-[var(--color-canvas-tinted)] max-h-[520px] overflow-y-auto">
          {threads.map((t) => {
            const isActive = t.id === activeThreadId;
            const lastMsg = t.messages[t.messages.length - 1];
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => openThread(t.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left px-4 py-3 grid gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-tide-deep)] ${
                    isActive
                      ? "bg-white border-l-2 border-l-[var(--color-ink)]"
                      : "border-l-2 border-l-transparent hover:bg-white"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-[var(--color-text)] truncate">
                      {t.patientName}
                    </span>
                    <span className="text-[10px] tabular-nums text-[var(--color-text-soft)] whitespace-nowrap">
                      {t.lastTime}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] text-[var(--color-text-muted)] truncate">
                      {lastMsg.from === "clinic" ? "You: " : ""}
                      {lastMsg.body}
                    </span>
                    {t.unread && (
                      <span
                        role="status"
                        aria-label="Unread"
                        className="inline-block h-2 w-2 rounded-full bg-[var(--color-tide-deep)] shrink-0"
                      />
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--color-text-soft)]">{t.procedure}</p>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Conversation view */}
        <div className="grid grid-rows-[auto_minmax(0,1fr)_auto] bg-white min-h-[400px]">
          {activeThread && (
            <>
              <div className="px-3 sm:px-5 py-3 border-b border-[var(--color-border)] flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-[var(--color-text)]">
                    {activeThread.patientName}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
                    {activeThread.patientPhone} · {activeThread.procedure}
                  </p>
                </div>
                <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
                  Audit: every send logged
                </p>
              </div>

              <div className="px-3 sm:px-5 py-4 overflow-y-auto max-h-[340px] grid gap-3 content-start">
                {activeThread.messages.map((m) => (
                  <motion.div
                    key={m.id}
                    layout={!reduceMotion}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`max-w-[88%] sm:max-w-[78%] rounded-[var(--radius-md)] px-3 py-2 grid gap-0.5 ${
                      m.from === "clinic"
                        ? "justify-self-end bg-[color-mix(in_oklch,var(--color-tide-deep),white_82%)] border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]"
                        : "justify-self-start bg-[var(--color-canvas-tinted)] border border-[var(--color-border)]"
                    }`}
                  >
                    <p className="text-[12px] text-[var(--color-text)] leading-snug whitespace-pre-wrap">
                      {m.body}
                    </p>
                    <p className="text-[9px] text-[var(--color-text-soft)] tabular-nums flex items-center gap-1.5">
                      <span>{m.time}</span>
                      {m.fromTemplate && (
                        <span className="inline-flex items-center text-[8px] uppercase tracking-[0.08em] rounded-full border border-[var(--color-border)] bg-white px-1.5 py-0.5 text-[var(--color-text-soft)]">
                          ⟶ template
                        </span>
                      )}
                    </p>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-3 sm:px-5 py-3 border-t border-[var(--color-border)] grid gap-2 relative">
                <AnimatePresence initial={false}>
                  {pickerOpen && (
                    <motion.div
                      key="picker"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute bottom-full left-5 right-5 mb-2 rounded-md border border-[var(--color-border-strong)] bg-white shadow-[0_18px_60px_-24px_rgba(20,30,60,0.35)] p-2 z-10"
                    >
                      <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-semibold mb-1 px-1">
                        Templates · WhatsApp Business
                      </p>
                      <ul className="grid gap-0.5">
                        {templates.map((t) => (
                          <li key={t.id}>
                            <button
                              type="button"
                              onClick={() => pickTemplate(t.id)}
                              className="w-full text-left rounded px-2 py-1.5 text-[12px] hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)]"
                            >
                              <span className="font-medium text-[var(--color-text)]">
                                {t.label}
                              </span>
                              <span className="block text-[10px] text-[var(--color-text-soft)] truncate">
                                {fillTemplate(
                                  t.body,
                                  activeThread.patientName,
                                  activeThread.procedure,
                                )}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      markInteracted();
                      setPickerOpen((v) => !v);
                    }}
                    aria-pressed={pickerOpen}
                    aria-label="Insert template"
                    className={`grid place-items-center min-h-[36px] min-w-[36px] rounded-md border text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                      pickerOpen
                        ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
                        : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
                    }`}
                    title="Templates"
                  >
                    ⟶
                  </button>
                  <textarea
                    value={composeText}
                    onChange={(e) => {
                      markInteracted();
                      setComposeText(e.target.value);
                    }}
                    rows={2}
                    placeholder="Type a message or pick a template…"
                    className="flex-1 rounded-md border border-[var(--color-border-strong)] bg-white px-3 py-2 text-[12px] text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] resize-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!composeText.trim()}
                    className="grid place-items-center min-h-[36px] rounded-md bg-[var(--color-ink)] px-3 py-1.5 text-[11px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                  >
                    Send →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-[10px] tracking-[0.04em] mt-3 min-h-[14px]">
        <AnimatePresence mode="wait" initial={false}>
          {postDemoNudge ? (
            <motion.span
              key="nudge"
              initial={reduceMotion ? false : { opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-1 font-semibold text-[var(--color-tide-deep)]"
            >
              <span aria-hidden>↕</span>
              Now you try — open another thread or pick a different template
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[var(--color-text-soft)]"
            >
              5 templates · placeholders auto-fill from patient record · audit-logged on send
            </motion.span>
          )}
        </AnimatePresence>
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your own threads → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          WhatsApp Business API · templated for compliance · every send is audit-logged with
          template id, sender, and timestamp.
        </p>
      </div>
    </div>
  );
}
