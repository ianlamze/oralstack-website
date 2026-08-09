"use client";

import { useLayoutEffect, useState, type ComponentType, type KeyboardEvent } from "react";
import QuickQuestionForm from "./QuickQuestionForm";
import MigrationAssessmentForm from "./MigrationAssessmentForm";
import PilotProposalForm from "./PilotProposalForm";

type Intent = "question" | "migration" | "pilot";

type TabDef = {
  id: Intent;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  bestFor: string;
  Form: ComponentType;
};

const TABS: TabDef[] = [
  {
    id: "question",
    label: "Quick question",
    eyebrow: "Quick question",
    title: "Ask us anything",
    body: "Pricing, integrations, security posture, what we don't do — short questions get short answers, fast.",
    bestFor: "Best for: pre-demo questions, evaluating fit, security & compliance enquiries.",
    Form: QuickQuestionForm,
  },
  {
    id: "migration",
    label: "Connection & rollout",
    eyebrow: "Connection & rollout",
    title: "Connect Plato or plan a reviewed rollout.",
    body: "Tell us your current clinic stack and the workflow you want to improve. We'll map connector readiness, record ownership, reviewed changes back to Plato, enabled modules, and anything outside today's product scope.",
    bestFor:
      "Best for: Plato-connected clinics, paper-led clinics, and small groups planning a rollout within the next 6 months.",
    Form: MigrationAssessmentForm,
  },
  {
    id: "pilot",
    label: "Pilot proposal",
    eyebrow: "Pilot proposal",
    title: "Tell us the clinic shape and first workflow.",
    body: "Whether you run one clinic or a group, share your current system, location count, and the workflow you want to improve first. We'll reply with a scoped pilot proposal and the setup questions that still need review.",
    bestFor:
      "Best for: single clinics, growing groups, DSO ops teams, and practice managers evaluating a configured pilot.",
    Form: PilotProposalForm,
  },
];

const TAB_IDS: readonly Intent[] = ["question", "migration", "pilot"];

function isIntent(s: string): s is Intent {
  return (TAB_IDS as readonly string[]).includes(s);
}

/**
 * Single-form-at-a-time tab UI for /contact. Replaces the previous stacked
 * vertical layout — picking one intent now hides the other two, removing the
 * scroll-past-everything friction.
 *
 * Initial intent is read from `?intent=` first, with the legacy
 * #question / #migration / #pilot hashes retained as aliases. Tab changes keep
 * the intent in the query string and the stable form anchor at #request.
 *
 * Accessibility: full WAI-ARIA tabs pattern — role=tablist/tab/tabpanel,
 * roving tabindex, arrow-key + Home/End navigation.
 */
export default function ContactTabs() {
  const [active, setActive] = useState<Intent>("question");

  useLayoutEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const requested = new URLSearchParams(window.location.search).get("intent");
    if (requested && isIntent(requested)) setActive(requested);
    else if (hash && isIntent(hash)) setActive(hash);
  }, []);

  function handleSelect(id: Intent) {
    setActive(id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("intent", id);
      url.hash = "request";
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, id: Intent) {
    const idx = TABS.findIndex((t) => t.id === id);
    let nextIdx = -1;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % TABS.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = TABS.length - 1;
    if (nextIdx === -1) return;
    e.preventDefault();
    const nextTab = TABS[nextIdx];
    handleSelect(nextTab.id);
    document.getElementById(`contact-tab-${nextTab.id}`)?.focus();
  }

  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0];
  const ActiveForm = activeTab.Form;

  return (
    <div className="grid gap-8">
      <div role="tablist" aria-label="Contact form types" className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              id={`contact-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`contact-panel-${t.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(t.id)}
              onKeyDown={(e) => handleKeyDown(e, t.id)}
              className={
                isActive
                  ? "inline-flex items-center min-h-[44px] rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-canvas)] transition-colors"
                  : "inline-flex items-center min-h-[44px] rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <section
        id={`contact-panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`contact-tab-${activeTab.id}`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: WAI-ARIA tabs pattern — the tabpanel must be focusable so keyboard users can Tab from the active tab into the panel content.
        tabIndex={0}
        className="grid gap-6 focus:outline-none"
      >
        <header className="grid gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {activeTab.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
            {activeTab.title}
          </h2>
          <p className="mt-1 text-[var(--color-text-muted)] max-w-[62ch] leading-relaxed">
            {activeTab.body}
          </p>
          <p className="text-xs text-[var(--color-text-soft)]">{activeTab.bestFor}</p>
        </header>
        <ActiveForm />
      </section>
    </div>
  );
}
