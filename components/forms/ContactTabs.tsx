"use client";

import {
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import QuickQuestionForm from "./QuickQuestionForm";
import MigrationAssessmentForm from "./MigrationAssessmentForm";
import PilotProposalForm from "./PilotProposalForm";
import SecurityReviewForm from "./SecurityReviewForm";
import {
  getRequestSourceId,
  getSecurityRequestOptionValue,
  getWorkflowOptionValue,
  REQUEST_SOURCES,
  type RequestSourceId,
} from "./contact-options";

type Intent = "question" | "migration" | "pilot" | "security";

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
  {
    id: "security",
    label: "Security review",
    eyebrow: "Security review",
    title: "Request the evidence your review needs.",
    body: "Choose the document, questionnaire, controls walkthrough, or deployment check. We'll reply with the current evidence boundary, planned gaps, and the next procurement step.",
    bestFor:
      "Best for: clinic owners, IT and security reviewers, legal teams, procurement, and group operators.",
    Form: SecurityReviewForm,
  },
];

const TAB_IDS: readonly Intent[] = ["question", "migration", "pilot", "security"];

function isIntent(s: string): s is Intent {
  return (TAB_IDS as readonly string[]).includes(s);
}

/**
 * Single-visible-form tab UI for /contact. Each tab-panel shell stays mounted
 * so its ARIA relationship remains valid; forms stay mounted after first use
 * so switching intent does not discard a draft.
 *
 * Initial intent is read from `?intent=` first, with the legacy
 * #question / #migration / #pilot / #security hashes retained as aliases. Tab changes keep
 * the intent in the query string and the stable form anchor at #request.
 *
 * Accessibility: full WAI-ARIA tabs pattern — role=tablist/tab/tabpanel,
 * roving tabindex, arrow-key + Home/End navigation.
 */
export default function ContactTabs() {
  const [active, setActive] = useState<Intent>("question");
  const [mountedTabs, setMountedTabs] = useState<ReadonlySet<Intent>>(
    () => new Set<Intent>(["question"]),
  );
  const [requestSource, setRequestSource] = useState<RequestSourceId | null>(null);
  const [defaultWorkflowGoal, setDefaultWorkflowGoal] = useState<string | undefined>();
  const [defaultSecurityRequest, setDefaultSecurityRequest] = useState<string | undefined>();

  const syncFromLocation = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace(/^#/, "");
    const requested = params.get("intent");
    const source = getRequestSourceId(params.get("source"));
    const requestedWorkflow = getWorkflowOptionValue(params.get("focus"));
    const requestedSecurityReview = getSecurityRequestOptionValue(params.get("request"));
    setRequestSource(source);
    setDefaultWorkflowGoal(
      requestedWorkflow ?? (source === "dfi-synergy" ? "run-the-day" : undefined),
    );
    setDefaultSecurityRequest(requestedSecurityReview);
    const initialTab =
      requested && isIntent(requested) ? requested : hash && isIntent(hash) ? hash : "question";
    setActive(initialTab);
    setMountedTabs((current) => {
      if (current.has(initialTab)) return current;
      return new Set([...current, initialTab]);
    });
  }, []);

  useLayoutEffect(() => {
    syncFromLocation();
  }, [syncFromLocation]);

  useEffect(() => {
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [syncFromLocation]);

  function handleSelect(id: Intent) {
    if (id === active) return;
    setActive(id);
    setMountedTabs((current) => {
      if (current.has(id)) return current;
      return new Set([...current, id]);
    });
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("intent", id);
      url.hash = "request";
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
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

  return (
    <div className="grid gap-8">
      <div
        role="tablist"
        aria-label="Contact form types"
        className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
      >
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
                  ? "inline-flex w-full items-center justify-center min-h-[44px] rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-canvas)] transition-colors sm:w-auto"
                  : "inline-flex w-full items-center justify-center min-h-[44px] rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors sm:w-auto"
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const TabForm = tab.Form;

        return (
          <section
            key={tab.id}
            id={`contact-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`contact-tab-${tab.id}`}
            hidden={!isActive}
            tabIndex={isActive ? 0 : -1}
            onFocus={(event) => {
              if (event.target !== event.currentTarget) return;
              const panel = event.currentTarget;
              window.requestAnimationFrame(() => panel.scrollIntoView({ block: "start" }));
            }}
            className={
              isActive
                ? "scroll-mt-28 grid gap-6 rounded-[var(--radius-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tide-deep)] focus:ring-offset-4"
                : "hidden"
            }
          >
            <header className="grid gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {tab.eyebrow}
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
                {tab.title}
              </h2>
              <p className="mt-1 text-[var(--color-text-muted)] max-w-[62ch] leading-relaxed">
                {tab.body}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">{tab.bestFor}</p>
            </header>
            {requestSource && isActive && (
              <aside
                data-testid="request-context"
                className="grid gap-1 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
                  Continuing from {REQUEST_SOURCES[requestSource].label}
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {REQUEST_SOURCES[requestSource].context}
                </p>
              </aside>
            )}
            {mountedTabs.has(tab.id) &&
              (tab.id === "pilot" ? (
                <PilotProposalForm defaultWorkflowGoal={defaultWorkflowGoal} />
              ) : tab.id === "security" ? (
                <SecurityReviewForm defaultRequestType={defaultSecurityRequest} />
              ) : (
                <TabForm />
              ))}
          </section>
        );
      })}
    </div>
  );
}
