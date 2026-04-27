"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Section from "@/components/primitives/Section";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";
import DicomViewerMock from "@/components/visuals/DicomViewerMock";
import MessagingMock from "@/components/visuals/MessagingMock";
import RecallMock from "@/components/visuals/RecallMock";
import { showcaseSlides } from "@/content/showcase";

const mockBySlug: Record<string, React.ComponentType> = {
  recall: RecallMock,
  messaging: MessagingMock,
  imaging: DicomViewerMock,
  analytics: AnalyticsMock,
};

function StackedFallback() {
  return (
    <div className="grid gap-16">
      {showcaseSlides.map((s) => {
        const Mock = mockBySlug[s.id];
        return (
          <div key={s.id} className="grid gap-6">
            <div className="grid gap-2 max-w-[60ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                {s.eyebrow}
              </p>
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--color-text-muted)]">{s.body}</p>
            </div>
            <div className="rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-5 flex items-center justify-center min-h-[320px] overflow-hidden">
              {Mock && <Mock />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ProductShowcase() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(
      showcaseSlides.length - 1,
      Math.max(0, Math.floor(p * showcaseSlides.length)),
    );
    if (i !== active) setActive(i);
  });

  const slide = showcaseSlides[active];
  const ActiveMock = mockBySlug[slide.id];

  return (
    <section className="relative bg-[var(--color-canvas)]">
      <Section className="pt-20 md:pt-24 pb-8 md:pb-12">
        <div className="grid gap-3 max-w-[40ch]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            A closer look
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            The surfaces beyond the front desk.
          </h2>
        </div>
      </Section>

      {/* Mobile / reduced-motion fallback — plain stacked list, no scroll-jack. */}
      <Section className={`pb-20 ${reduceMotion ? "" : "md:hidden"}`}>
        <StackedFallback />
      </Section>

      {/* Desktop scroll-synced sticky panel. */}
      {reduceMotion ? null : (
        <div
          ref={containerRef}
          className="hidden md:block relative"
          style={{ height: `${showcaseSlides.length * 100}vh` }}
        >
          <div className="sticky top-0 h-screen flex items-center">
            <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                {/* Left rail — step list + active slide copy. */}
                <div className="grid gap-8">
                  <ol className="grid gap-2">
                    {showcaseSlides.map((s, i) => {
                      const isActive = i === active;
                      return (
                        <li
                          key={s.id}
                          aria-current={isActive ? "true" : undefined}
                          className="flex items-center gap-3 text-[12px] uppercase tracking-[0.16em]"
                        >
                          <span
                            className={`tabular-nums w-6 transition-colors duration-200 ${
                              isActive
                                ? "text-[var(--color-tide-deep)] font-semibold"
                                : "text-[var(--color-text-soft)]"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <span
                            aria-hidden
                            className={`h-px transition-all duration-300 ${
                              isActive
                                ? "w-10 bg-[var(--color-tide-deep)]"
                                : "w-6 bg-[var(--color-border)]"
                            }`}
                          />
                          <span
                            className={`transition-colors duration-200 ${
                              isActive
                                ? "text-[var(--color-text)] font-semibold"
                                : "text-[var(--color-text-soft)]"
                            }`}
                          >
                            {s.eyebrow}
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="grid gap-3 max-w-[44ch]"
                    >
                      <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-balance">
                        {slide.title}
                      </h3>
                      <p className="text-[15px] lg:text-base leading-relaxed text-[var(--color-text-muted)]">
                        {slide.body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right — active mock, crossfaded. */}
                <div className="relative min-h-[460px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, scale: 0.985, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.99, y: -8 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full flex items-center justify-center"
                    >
                      {ActiveMock && <ActiveMock />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
