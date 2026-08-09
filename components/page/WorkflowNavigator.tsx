"use client";

import { useEffect, useState } from "react";
import { productCapabilities } from "@/content/product-capabilities";

export default function WorkflowNavigator() {
  const [active, setActive] = useState(productCapabilities[0].slug);

  useEffect(() => {
    const sections = productCapabilities
      .map((workflow) => document.getElementById(workflow.slug))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      {
        rootMargin: "-22% 0px -62% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[65px] z-30 border-y border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-surface-raised)_94%,transparent)] shadow-[var(--shadow-1)] backdrop-blur-md">
      <nav
        aria-label="Workflow sections"
        className="mx-auto flex w-full max-w-[1200px] snap-x gap-1 overflow-x-auto px-6 py-2 md:px-10"
      >
        {productCapabilities.map((workflow, index) => {
          const isActive = active === workflow.slug;
          return (
            <a
              key={workflow.slug}
              href={`#${workflow.slug}`}
              aria-current={isActive ? "location" : undefined}
              className={`flex min-h-[44px] shrink-0 snap-start items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-[var(--color-ink)] text-[var(--color-canvas)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
              }`}
            >
              <span
                aria-hidden
                className={isActive ? "opacity-70" : "text-[var(--color-text-soft)]"}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{workflow.eyebrow}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
