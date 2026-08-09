"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  ClipboardList,
  BarChart3,
  Receipt,
  ShieldCheck,
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

type ProductArea = {
  href: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
};

const productAreas: ProductArea[] = [
  {
    href: "/workflows#run-the-day",
    label: "Run the day",
    desc: "Command, appointments, inbox, requests and daily huddle.",
    Icon: CalendarClock,
  },
  {
    href: "/workflows#patient-care",
    label: "Patient care",
    desc: "Patient folders, charting, treatment plans and perio.",
    Icon: Stethoscope,
  },
  {
    href: "/workflows#checkout-money",
    label: "Checkout & money",
    desc: "Reviewed checkout, receipts, billing tasks and receivables.",
    Icon: Receipt,
  },
  {
    href: "/workflows#patient-access",
    label: "Patient access",
    desc: "Intake, portal, find-a-time requests and secure messaging.",
    Icon: Users,
  },
  {
    href: "/workflows#clinic-operations",
    label: "Clinic operations",
    desc: "Inventory, estimated usage, lab, suppliers and staff ops.",
    Icon: ClipboardList,
  },
  {
    href: "/workflows#insights",
    label: "Insights",
    desc: "Clinic KPIs, reports and read-only provider performance.",
    Icon: BarChart3,
  },
  {
    href: "/workflows#organization-security",
    label: "Organization & security",
    desc: "People, roles, settings, sync health and audit history.",
    Icon: ShieldCheck,
  },
];

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<"product" | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productExpanded, setProductExpanded] = useState(true);
  const closeTimer = useRef<number | null>(null);
  const productTriggerRef = useRef<HTMLButtonElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);

  const openProductMenu = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu("product");
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

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || drawerOpen) return;
      if (openMenu === "product") {
        closeMenu();
        productTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, drawerOpen, closeMenu]);

  useEffect(() => {
    if (!drawerOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => drawerCloseRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab") return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !drawer.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !drawer.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [drawerOpen, closeDrawer]);

  const productOpen = openMenu === "product";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-1)]">
      <Section className="py-2.5">
        <div className="flex items-center justify-between gap-4">
          <a href="/" aria-label="Oralstack home" className="inline-flex">
            <Wordmark size="md" />
          </a>

          <nav className="hidden lg:flex items-center gap-1 text-sm">
            <button
              ref={productTriggerRef}
              type="button"
              aria-expanded={productOpen}
              aria-controls="product-mega"
              onClick={openProductMenu}
              onMouseEnter={openProductMenu}
              onMouseLeave={scheduleCloseMenu}
              className="inline-flex min-h-[44px] items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            >
              Product
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  productOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            <a
              href="/customers"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-3 py-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            >
              Customers
            </a>
            <a
              href="/integrations"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-3 py-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            >
              Integrations
            </a>
            <a
              href="/security"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-3 py-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            >
              Security
            </a>
            <a
              href="/pricing"
              className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] px-3 py-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            >
              Pricing
            </a>
            <a
              href="/book-a-demo"
              className="ml-2 inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2 text-[var(--color-canvas)] shadow-[var(--shadow-1)] transition-colors hover:bg-[var(--color-tide-deep)]"
            >
              Request a 30-min walkthrough
            </a>
          </nav>

          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-md)] p-2 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)] lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </Section>

      <AnimatePresence>
        {productOpen && (
          <motion.div
            id="product-mega"
            role="region"
            aria-label="Product"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={openProductMenu}
            onMouseLeave={scheduleCloseMenu}
            className="absolute inset-x-0 top-full z-50 hidden px-6 pt-3 md:px-10 lg:block"
          >
            <div className="mx-auto w-full max-w-[1100px]">
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-elevated)]">
                <div className="grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                  <div className="p-6 md:p-7">
                    <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                      Clinic workspace
                    </p>
                    <ul className="grid gap-1 sm:grid-cols-2">
                      {productAreas.map(({ href, label, desc, Icon }) => (
                        <li key={label}>
                          <a
                            href={href}
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

                    <div className="mt-5 grid gap-3 border-t border-[var(--color-border)] pt-4 text-xs">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <span className="font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                          Clinic fit
                        </span>
                        <a
                          href="/for-solo-clinics"
                          onClick={closeMenu}
                          className="font-medium text-[var(--color-tide-deep)] transition-colors hover:text-[var(--color-text)]"
                        >
                          For one clinic →
                        </a>
                        <a
                          href="/for-multi-clinic"
                          onClick={closeMenu}
                          className="font-medium text-[var(--color-tide-deep)] transition-colors hover:text-[var(--color-text)]"
                        >
                          For clinic groups →
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <a
                          href="/customers"
                          onClick={closeMenu}
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                          Customers →
                        </a>
                        <a
                          href="/integrations"
                          onClick={closeMenu}
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                          Integrations →
                        </a>
                        <a
                          href="/security"
                          onClick={closeMenu}
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                          Security →
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
                  </div>

                  <a
                    href="/integrations"
                    onClick={closeMenu}
                    className="group relative grid content-between gap-6 border-t border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 transition-colors hover:bg-[var(--color-surface-hover)] md:border-l md:border-t-0 md:p-7"
                  >
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                        Connection model
                      </p>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--color-text)]">
                        One clinic workspace. Plato stays the system of record.
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                        Oralstack mirrors clinic data, surfaces the next action, and returns
                        approved work through reviewed writebacks.
                      </p>
                    </div>

                    <div className="grid gap-2 text-xs text-[var(--color-text-muted)]">
                      {[
                        "Clinic data mirrored",
                        "Writeback state stays visible",
                        "Sync health and audit history visible",
                      ].map((point) => (
                        <span key={point} className="flex items-center gap-2">
                          <ShieldCheck
                            className="h-3.5 w-3.5 text-[var(--color-tide-deep)]"
                            aria-hidden
                          />
                          {point}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-tide-deep)] transition-all group-hover:gap-2">
                      See how Oralstack connects <ArrowRight className="h-3 w-3" aria-hidden />
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
              onClick={closeDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--color-ink-deep)_44%,transparent)] lg:hidden"
            />
            <motion.div
              ref={drawerRef}
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[88vw] max-w-[380px] flex-col bg-[var(--color-surface-raised)] shadow-[var(--shadow-elevated)] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 pb-3 pt-5">
                <Wordmark size="sm" />
                <button
                  ref={drawerCloseRef}
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-md)] p-2 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-canvas-tinted)]"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <div className="mb-3 border-b border-[var(--color-border)] pb-3">
                  <p className="px-3 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                    Choose by clinic shape
                  </p>
                  <DrawerLink href="/for-solo-clinics" onNavigate={closeDrawer}>
                    For one clinic
                  </DrawerLink>
                  <DrawerLink href="/for-multi-clinic" onNavigate={closeDrawer}>
                    For clinic groups
                  </DrawerLink>
                </div>
                <button
                  type="button"
                  onClick={() => setProductExpanded((v) => !v)}
                  aria-expanded={productExpanded}
                  aria-controls="drawer-product"
                  className="flex w-full items-center justify-between rounded-[var(--radius-md)] px-3 py-3 text-base font-medium hover:bg-[var(--color-canvas-tinted)] transition-colors"
                >
                  Product
                  <ChevronDown
                    className={`h-4 w-4 text-[var(--color-text-soft)] transition-transform duration-150 ${
                      productExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {productExpanded && (
                    <motion.ul
                      id="drawer-product"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-2 grid gap-1 overflow-hidden"
                    >
                      {productAreas.map(({ href, label, desc, Icon }) => (
                        <li key={label}>
                          <a
                            href={href}
                            onClick={closeDrawer}
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
                <DrawerLink href="/customers" onNavigate={closeDrawer}>
                  Customers
                </DrawerLink>
                <DrawerLink href="/integrations" onNavigate={closeDrawer}>
                  Integrations
                </DrawerLink>
                <DrawerLink href="/security" onNavigate={closeDrawer}>
                  Security
                </DrawerLink>
                <DrawerLink href="/pricing" onNavigate={closeDrawer}>
                  Pricing
                </DrawerLink>
                <DrawerLink href="/faq" onNavigate={closeDrawer}>
                  FAQ
                </DrawerLink>
                <DrawerLink href="/about" onNavigate={closeDrawer}>
                  About
                </DrawerLink>
                <DrawerLink href="/changelog" onNavigate={closeDrawer}>
                  Changelog
                </DrawerLink>
              </nav>

              <div className="border-t border-[var(--color-border)] p-4">
                <a
                  href="/book-a-demo"
                  onClick={closeDrawer}
                  className="flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-3 font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
                >
                  Request a 30-min walkthrough
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
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
      className="flex min-h-[44px] items-center rounded-[var(--radius-md)] px-3 py-2.5 text-base text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
    >
      {children}
    </a>
  );
}
