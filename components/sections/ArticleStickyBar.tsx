"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mail, X } from "lucide-react";
import { whatsappLink, mailtoLink } from "@/content/contact";

const STORAGE_KEY = "oralstack:articleStickyBar:dismissed";

/**
 * Sticky bottom bar shown on article detail pages. Two channels — WhatsApp and
 * email — both pre-filled with the article context. Dismissable for the
 * remainder of the session (sessionStorage).
 *
 * Renders nothing until hydration to avoid the flash of an undismissed bar
 * for users who already dismissed it.
 */
export default function ArticleStickyBar({
  articleTitle,
}: {
  articleTitle: string;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // sessionStorage may be unavailable (private mode) — show the bar.
    }
  }, []);

  if (!hydrated || dismissed) return null;

  const waMessage = `Hi, I just read "${articleTitle}" on oralstack.com — could you tell me more?`;
  const emailSubject = `Re: ${articleTitle}`;

  function handleDismiss() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-[820px] px-4 pb-4">
        <div className="pointer-events-auto rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white/95 backdrop-blur-md shadow-lg p-3 flex items-center gap-2 sm:gap-3">
          <p className="hidden sm:block text-sm text-[var(--color-text-muted)] flex-1 min-w-0">
            Talk to a Singapore dental ops engineer:
          </p>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[40px] rounded-[var(--radius-md)] bg-[#25D366] px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="size-4" aria-hidden />
            <span>WhatsApp</span>
          </a>
          <a
            href={mailtoLink(emailSubject)}
            className="inline-flex items-center gap-1.5 min-h-[40px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
          >
            <Mail className="size-4" aria-hidden />
            <span className="hidden xs:inline">Email</span>
            <span className="xs:hidden">Mail</span>
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss this bar"
            className="ml-1 rounded p-1.5 text-[var(--color-text-soft)] hover:text-[var(--color-text)] hover:bg-[var(--color-canvas-tinted)] transition-colors shrink-0"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
