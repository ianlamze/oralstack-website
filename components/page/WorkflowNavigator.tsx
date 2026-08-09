"use client";

import { useEffect, useState } from "react";
import { productCapabilities } from "@/content/product-capabilities";

export default function WorkflowNavigator() {
  const [active, setActive] = useState(productCapabilities[0].slug);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const hashWorkflow = productCapabilities.find(
      (workflow) => workflow.slug === hash || workflow.legacySlugs.includes(hash),
    );

    if (hashWorkflow) {
      setActive(hashWorkflow.slug);
      window.requestAnimationFrame(() => {
        document.getElementById(`desktop-${hashWorkflow.slug}`)?.scrollIntoView({ block: "start" });
      });
    }

    const sections = productCapabilities
      .map((workflow) => document.getElementById(`desktop-${workflow.slug}`))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const slug = visible?.target.id.replace(/^desktop-/, "");
        if (slug) setActive(slug);
      },
      {
        rootMargin: "-22% 0px -62% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function selectWorkflow(slug: string) {
    const section = document.getElementById(`desktop-${slug}`);
    if (!section) return;

    setActive(slug);
    window.history.replaceState(null, "", `#${slug}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="sticky top-[65px] z-30 border-y border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-surface-raised)_94%,transparent)] shadow-[var(--shadow-1)] backdrop-blur-md">
      <nav
        aria-label="Workflow sections"
        className="mx-auto flex w-full max-w-[1200px] gap-1 px-10 py-2"
      >
        {productCapabilities.map((workflow, index) => {
          const isActive = active === workflow.slug;
          return (
            <a
              key={workflow.slug}
              href={`#${workflow.slug}`}
              onClick={(event) => {
                event.preventDefault();
                selectWorkflow(workflow.slug);
              }}
              aria-current={isActive ? "location" : undefined}
              className={`flex min-h-[44px] shrink-0 items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tide-deep)] focus-visible:ring-offset-2 ${
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
