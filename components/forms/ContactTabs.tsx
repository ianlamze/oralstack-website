"use client";

import { useEffect, useState, type ComponentType, type KeyboardEvent } from "react";
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
    title: "Moving from Plato, Open Dental, or another PMS?",
    body: "Tell us your current clinic stack and rollout goal. We'll map the Plato connection, reviewed writebacks, enabled modules, and any work that sits outside today's product scope.",
    bestFor: "Best for: solo or small-group clinics planning a cutover within the next 6 months.",
    Form: MigrationAssessmentForm,
  },
  {
    id: "pilot",
    label: "Pilot proposal",
    eyebrow: "Pilot proposal",
    title: "Group of clinics? Tell us the shape",
    body: "Multi-location groups have different needs — ops standardisation, owner-level analytics, staged rollouts. Send us the basics and we'll come back with a pilot proposal sized to your group.",
    bestFor: "Best for: 2+ locations, DSO ops teams, group operations managers.",
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
 * Initial tab is read from the URL hash (#question / #migration / #pilot) so
 * deep-links from articles or other pages still land on the right form.
 * Hash updates via history.replaceState (no scroll jump) when the tab changes.
 *
 * Accessibility: full WAI-ARIA tabs pattern — role=tablist/tab/tabpanel,
 * roving tabindex, arrow-key + Home/End navigation.
 */
export default function ContactTabs() {
  const [active, setActive] = useState<Intent>("question");

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && isIntent(hash)) {
      setActive(hash);
    }
  }, []);

  function handleSelect(id: Intent) {
    setActive(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
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
                  ? "inline-flex items-center min-h-[40px] rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-canvas)] transition-colors"
                  : "inline-flex items-center min-h-[40px] rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
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
