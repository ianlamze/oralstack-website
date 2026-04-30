"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BadgeDollarSign,
  CalendarCheck,
  CalendarClock,
  Receipt,
  ClipboardList,
  ScanSearch,
  MessageCircle,
  BarChart3,
  Activity,
  Calculator,
  Clock,
  FileCheck,
  FileSignature,
  FlaskConical,
  LayoutGrid,
  MessageSquare,
  Package,
  ReceiptCent,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
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

type ToolItem = {
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
    slug: "online-bookings",
    label: "Online bookings",
    desc: "Patients book the slot the schedule actually has open.",
    Icon: CalendarCheck,
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
  {
    slug: "compliance",
    label: "Compliance & traceability",
    desc: "Sterilisation cycle to tray to patient — audit chain automatic.",
    Icon: ShieldCheck,
  },
];

const toolItems: ToolItem[] = [
  {
    slug: "online-booking",
    label: "Online booking",
    desc: "Patients pick the slot — chair availability live.",
    Icon: CalendarCheck,
  },
  {
    slug: "treatment-plan-builder",
    label: "Treatment plan builder",
    desc: "Click teeth, see the bill before treatment.",
    Icon: Stethoscope,
  },
  {
    slug: "plan-presentation",
    label: "Plan presentation & e-sign",
    desc: "Patient signs on the iPad — phases live, audited.",
    Icon: FileSignature,
  },
  {
    slug: "eligibility-estimate",
    label: "Eligibility & estimate",
    desc: "CHAS, insurance, MediSave — patient portion live.",
    Icon: ReceiptText,
  },
  {
    slug: "insurance-claims",
    label: "Insurance claims",
    desc: "MediSave, CHAS, IPP — auto-packaged and tracked.",
    Icon: FileCheck,
  },
  {
    slug: "perio-chart",
    label: "Periodontal chart",
    desc: "Click any site to record probing depth.",
    Icon: Activity,
  },
  {
    slug: "medical-alerts",
    label: "Patient medical alerts",
    desc: "Allergies, meds, conditions — surfaced where it matters.",
    Icon: ShieldAlert,
  },
  {
    slug: "lab-orders",
    label: "Lab order tracking",
    desc: "Crowns and bridges from sent to seated.",
    Icon: FlaskConical,
  },
  {
    slug: "sterilization",
    label: "Sterilisation traceability",
    desc: "Cycle to tray to patient — audit chain automatic.",
    Icon: ShieldCheck,
  },
  {
    slug: "patient-communications",
    label: "Patient communications",
    desc: "Templated WhatsApp replies, audit-logged on send.",
    Icon: MessageSquare,
  },
  {
    slug: "waitlist-auto-fill",
    label: "Waitlist auto-fill",
    desc: "Patient cancels — see the slot fill itself.",
    Icon: Users,
  },
  {
    slug: "daily-huddle",
    label: "Daily huddle",
    desc: "Owner's morning-coffee view at a glance.",
    Icon: LayoutGrid,
  },
  {
    slug: "inventory",
    label: "Inventory & consumables",
    desc: "Procedure deducts stock; reorder before par.",
    Icon: Package,
  },
  {
    slug: "end-of-day-reconciliation",
    label: "End-of-day reconciliation",
    desc: "Variance flagged, matched, synced to Xero.",
    Icon: ReceiptCent,
  },
  {
    slug: "management-report",
    label: "Management report",
    desc: "KPIs over time, AR aging, provider heatmap.",
    Icon: BarChart3,
  },
  {
    slug: "provider-productivity",
    label: "Provider productivity",
    desc: "Associate production, commission, recall credit.",
    Icon: BadgeDollarSign,
  },
  {
    slug: "reviews-referrals",
    label: "Reviews & referrals",
    desc: "Visit ends → review request fires → referrer credited.",
    Icon: Star,
  },
  {
    slug: "no-show-calculator",
    label: "No-show calculator",
    desc: "Model revenue your clinic loses today.",
    Icon: Calculator,
  },
  {
    slug: "day-in-the-life",
    label: "Day in the life",
    desc: "Walk through a typical clinic day.",
    Icon: Clock,
  },
];

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<"workflows" | "tools" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [workflowsExpanded, setWorkflowsExpanded] = useState(true);
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const workflowsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const toolsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const openMenuFor = (menu: "workflows" | "tools") => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(menu);
  };

  const scheduleCloseMenu = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const closeMenu = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawerOpen) {
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
      } else if (openMenu === "workflows") {
        closeMenu();
        workflowsTriggerRef.current?.focus();
      } else if (openMenu === "tools") {
        closeMenu();
        toolsTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, drawerOpen, closeMenu]);

  useEffect(() => {
    if (!drawerOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [drawerOpen]);

  const workflowsOpen = openMenu === "workflows";
  const toolsOpen = openMenu === "tools";

  return (
    <header className="relative">
      <Section className="pt-6 md:pt-8">
        <div className="flex items-center justify-between gap-4">
          <a href="/" aria-label="Oralstack home" className="inline-flex">
            <Wordmark size="md" />
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <button
              ref={workflowsTriggerRef}
              type="button"
              aria-expanded={workflowsOpen}
              aria-haspopup="menu"
              aria-controls="workflows-mega"
              onClick={() => (workflowsOpen ? closeMenu() : openMenuFor("workflows"))}
              onMouseEnter={() => openMenuFor("workflows")}
              onMouseLeave={scheduleCloseMenu}
              className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Workflows
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  workflowsOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            <a
              href="/journey"
              className="px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Journey
            </a>

            <div className="relative">
              <button
                ref={toolsTriggerRef}
                type="button"
                aria-expanded={toolsOpen}
                aria-haspopup="menu"
                aria-controls="tools-dropdown"
                onClick={() => (toolsOpen ? closeMenu() : openMenuFor("tools"))}
                onMouseEnter={() => openMenuFor("tools")}
                onMouseLeave={scheduleCloseMenu}
                className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Tools
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-150 ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    id="tools-dropdown"
                    role="menu"
                    aria-label="Tools"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => openMenuFor("tools")}
                    onMouseLeave={scheduleCloseMenu}
                    className="absolute top-full right-0 z-50 mt-3 w-[min(560px,calc(100vw-3rem))]"
                  >
                    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-2 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.18)]">
                      <ul className="grid sm:grid-cols-2">
                        {toolItems.map(({ slug, label, desc, Icon }) => (
                          <li key={slug}>
                            <a
                              href={`/tools/${slug}`}
                              onClick={closeMenu}
                              className="group flex gap-3 rounded-[var(--radius-md)] p-2.5 hover:bg-[var(--color-canvas-tinted)] transition-colors"
                            >
                              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-canvas)] text-[var(--color-tide-deep)] group-hover:border-[var(--color-tide)] transition-colors">
                                <Icon className="h-3.5 w-3.5" aria-hidden />
                              </span>
                              <span className="grid gap-0.5 min-w-0">
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
                      <div className="mt-1 border-t border-[var(--color-border)] px-2.5 pt-2.5 pb-1">
                        <a
                          href="/tools"
                          onClick={closeMenu}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-tide-deep)] hover:gap-2 transition-all"
                        >
                          See all tools <ArrowRight className="h-3 w-3" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
        {workflowsOpen && (
          <motion.div
            id="workflows-mega"
            role="region"
            aria-label="Workflows"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => openMenuFor("workflows")}
            onMouseLeave={scheduleCloseMenu}
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
                            onClick={closeMenu}
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
                        onClick={closeMenu}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        For solo →
                      </a>
                      <a
                        href="/for-multi-clinic"
                        onClick={closeMenu}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        For DSOs →
                      </a>
                      <a
                        href="/compare"
                        onClick={closeMenu}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        Compare →
                      </a>
                      <a
                        href="/articles"
                        onClick={closeMenu}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        Articles →
                      </a>
                      <a
                        href="/lead-magnets"
                        onClick={closeMenu}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        References →
                      </a>
                      <a
                        href="/faq"
                        onClick={closeMenu}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                      >
                        FAQ →
                      </a>
                    </div>
                  </div>

                  <a
                    href="/customers/dfi-synergy"
                    onClick={closeMenu}
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

                <button
                  type="button"
                  onClick={() => setToolsExpanded((v) => !v)}
                  aria-expanded={toolsExpanded}
                  aria-controls="drawer-tools"
                  className="flex w-full items-center justify-between rounded-[var(--radius-md)] px-3 py-3 text-base font-medium hover:bg-[var(--color-canvas-tinted)] transition-colors"
                >
                  Tools
                  <ChevronDown
                    className={`h-4 w-4 text-[var(--color-text-soft)] transition-transform duration-150 ${
                      toolsExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {toolsExpanded && (
                    <motion.ul
                      id="drawer-tools"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-2 grid gap-1 overflow-hidden"
                    >
                      {toolItems.map(({ slug, label, desc, Icon }) => (
                        <li key={slug}>
                          <a
                            href={`/tools/${slug}`}
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
                      <li>
                        <a
                          href="/tools"
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-2.5 text-xs font-medium text-[var(--color-tide-deep)]"
                        >
                          See all tools <ArrowRight className="h-3 w-3" aria-hidden />
                        </a>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>

                <DrawerLink href="/for-solo-clinics" onNavigate={() => setDrawerOpen(false)}>
                  For solo & small clinics
                </DrawerLink>
                <DrawerLink href="/for-multi-clinic" onNavigate={() => setDrawerOpen(false)}>
                  For multi-clinic & DSO
                </DrawerLink>
                <DrawerLink href="/journey" onNavigate={() => setDrawerOpen(false)}>
                  Patient journey
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
