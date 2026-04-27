"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  Receipt,
  ClipboardList,
  ScanSearch,
  MessageCircle,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/primitives/Section";
import Wordmark from "@/components/ui/Wordmark";

type WorkflowItem = {
  slug: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
};

const workflowItems: WorkflowItem[] = [
  {
    slug: "front-desk",
    label: "Front desk",
    desc: "Drag-to-reschedule, recall, and inline patient registration.",
    Icon: CalendarClock,
  },
  {
    slug: "billing",
    label: "Billing & discharge",
    desc: "Treatment lines auto-populated; bill ready at discharge.",
    Icon: Receipt,
  },
  {
    slug: "charting",
    label: "Charting & case notes",
    desc: "Tooth-led charting; surface-specific case notes.",
    Icon: ClipboardList,
  },
  {
    slug: "imaging",
    label: "Clinical imaging",
    desc: "DICOM viewer in the chart; sensor-bridge capture.",
    Icon: ScanSearch,
  },
  {
    slug: "recall",
    label: "Recall & messaging",
    desc: "Outreach that fires three weeks before due.",
    Icon: MessageCircle,
  },
  {
    slug: "operations",
    label: "Operations & analytics",
    desc: "Chair utilisation, revenue, recall coverage.",
    Icon: BarChart3,
  },
];

export default function Nav() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [workflowsExpanded, setWorkflowsExpanded] = useState(true);
  const closeTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const openMega = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120);
  };

  const closeMega = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawerOpen) {
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
      } else if (megaOpen) {
        closeMega();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen, drawerOpen, closeMega]);

  useEffect(() => {
    if (!drawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [drawerOpen]);

  return (
    <header className="relative">
      <Section className="pt-6 md:pt-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" aria-label="Oralstack home" className="inline-flex">
            <Wordmark size="md" />
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={megaOpen}
              aria-haspopup="menu"
              aria-controls="workflows-mega"
              onClick={() => (megaOpen ? closeMega() : openMega())}
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
              className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Workflows
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  megaOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <a
              href="/customers"
              className="px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Customers
            </a>
            <a
              href="/pricing"
              className="px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Pricing
            </a>
            <a
              href="/book-a-demo"
              className="ml-2 inline-flex items-center min-h-[40px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2 text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Book a 30-min walkthrough
            </a>
          </nav>

          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            className="md:hidden inline-flex items-center justify-center rounded-[var(--radius-md)] p-2 text-[var(--color-ink)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </Section>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id="workflows-mega"
            role="region"
            aria-label="Workflows"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
            className="absolute inset-x-0 top-full z-50 hidden md:block px-6 md:px-10 pt-3"
          >
            <div className="mx-auto w-full max-w-[1100px]">
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas)] shadow-[0_24px_48px_-24px_rgba(15,23,42,0.18)]">
                <div className="grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                  <div className="p-6 md:p-7">
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                      Workflows
                    </p>
                    <ul className="grid gap-1 sm:grid-cols-2">
                      {workflowItems.map(({ slug, label, desc, Icon }) => (
                        <li key={slug}>
                          <a
                            href={`/workflows#${slug}`}
                            onClick={closeMega}
                            className="group flex gap-3 rounded-[var(--radius-md)] p-3 hover:bg-[var(--color-canvas-tinted)] transition-colors"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-tide-deep)] group-hover:border-[var(--color-tide)] transition-colors">
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="grid gap-0.5">
                              <span className="text-sm font-medium text-[var(--color-text)]">
                                {label}
                              </span>
                              <span className="text-xs text-[var(--color-text-muted)] leading-snug">
                                {desc}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-border)] pt-4 text-xs">
                      <a
                        href="/for-solo-clinics"
                        onClick={closeMega}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        For solo →
                      </a>
                      <a
                        href="/for-multi-clinic"
                        onClick={closeMega}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        For DSOs →
                      </a>
                      <a
                        href="/compare"
                        onClick={closeMega}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        Compare →
                      </a>
                      <a
                        href="/tools"
                        onClick={closeMega}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        Tools →
                      </a>
                      <a
                        href="/articles"
                        onClick={closeMega}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        Articles →
                      </a>
                      <a
                        href="/lead-magnets"
                        onClick={closeMega}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        References →
                      </a>
                      <a
                        href="/faq"
                        onClick={closeMega}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        FAQ →
                      </a>
                    </div>
                  </div>

                  <a
                    href="/customers/dfi-synergy"
                    onClick={closeMega}
                    className="group relative grid content-between gap-6 border-t border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-7 md:border-l md:border-t-0 hover:bg-[oklch(0.95_0.005_240)] transition-colors"
                  >
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                        Featured · customer story
                      </p>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--color-text)]">
                        DFI Synergy moved their front desk in three days.
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                        Three chairs, four providers, no fallback diary. Same-day billing rate from
                        60% → 85%.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Stat value="3 wks" label="To live" />
                      <Stat value="0" label="Lost appts" />
                      <Stat value="85%" label="Same-day" />
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-tide-deep)] transition-all group-hover:gap-2">
                      Read case study <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              key="backdrop"
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-0 z-40 bg-[oklch(0.20_0.05_250/0.4)]"
            />
            <motion.div
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed inset-y-0 right-0 z-50 flex w-[88vw] max-w-[380px] flex-col bg-[var(--color-canvas)] shadow-[-12px_0_36px_-12px_rgba(15,23,42,0.18)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 pb-3 pt-5">
                <Wordmark size="sm" />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] p-2 text-[var(--color-ink)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <button
                  type="button"
                  onClick={() => setWorkflowsExpanded((v) => !v)}
                  aria-expanded={workflowsExpanded}
                  aria-controls="drawer-workflows"
                  className="flex w-full items-center justify-between rounded-[var(--radius-md)] px-3 py-3 text-base font-medium hover:bg-[var(--color-canvas-tinted)] transition-colors"
                >
                  Workflows
                  <ChevronDown
                    className={`h-4 w-4 text-[var(--color-text-soft)] transition-transform duration-150 ${
                      workflowsExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {workflowsExpanded && (
                    <motion.ul
                      id="drawer-workflows"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-2 grid gap-1 overflow-hidden"
                    >
                      {workflowItems.map(({ slug, label, desc, Icon }) => (
                        <li key={slug}>
                          <a
                            href={`/workflows#${slug}`}
                            onClick={() => setDrawerOpen(false)}
                            className="flex gap-3 rounded-[var(--radius-md)] px-3 py-2.5 hover:bg-[var(--color-canvas-tinted)] transition-colors"
                          >
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-tide-deep)]">
                              <Icon className="h-3.5 w-3.5" aria-hidden />
                            </span>
                            <span className="grid gap-0.5">
                              <span className="text-sm font-medium text-[var(--color-text)]">
                                {label}
                              </span>
                              <span className="text-xs leading-snug text-[var(--color-text-muted)]">
                                {desc}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                <DrawerLink href="/for-solo-clinics" onNavigate={() => setDrawerOpen(false)}>
                  For solo & small clinics
                </DrawerLink>
                <DrawerLink href="/for-multi-clinic" onNavigate={() => setDrawerOpen(false)}>
                  For multi-clinic & DSO
                </DrawerLink>
                <DrawerLink href="/customers" onNavigate={() => setDrawerOpen(false)}>
                  Customers
                </DrawerLink>
                <DrawerLink href="/pricing" onNavigate={() => setDrawerOpen(false)}>
                  Pricing
                </DrawerLink>
                <DrawerLink href="/compare" onNavigate={() => setDrawerOpen(false)}>
                  Compare
                </DrawerLink>
                <DrawerLink href="/tools" onNavigate={() => setDrawerOpen(false)}>
                  Tools
                </DrawerLink>
                <DrawerLink href="/articles" onNavigate={() => setDrawerOpen(false)}>
                  Articles
                </DrawerLink>
                <DrawerLink href="/lead-magnets" onNavigate={() => setDrawerOpen(false)}>
                  References
                </DrawerLink>
                <DrawerLink href="/faq" onNavigate={() => setDrawerOpen(false)}>
                  FAQ
                </DrawerLink>
                <DrawerLink href="/integrations" onNavigate={() => setDrawerOpen(false)}>
                  Integrations
                </DrawerLink>
                <DrawerLink href="/about" onNavigate={() => setDrawerOpen(false)}>
                  About
                </DrawerLink>
                <DrawerLink href="/security" onNavigate={() => setDrawerOpen(false)}>
                  Security
                </DrawerLink>
                <DrawerLink href="/changelog" onNavigate={() => setDrawerOpen(false)}>
                  Changelog
                </DrawerLink>
              </nav>

              <div className="border-t border-[var(--color-border)] p-4">
                <a
                  href="/book-a-demo"
                  onClick={() => setDrawerOpen(false)}
                  className="flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-3 font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
                >
                  Book a 30-min walkthrough
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-2 text-center">
      <div className="text-sm font-semibold text-[var(--color-text)]">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)]">
        {label}
      </div>
    </div>
  );
}

function DrawerLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="block rounded-[var(--radius-md)] px-3 py-3 text-base text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
    >
      {children}
    </a>
  );
}
