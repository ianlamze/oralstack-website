import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside className="border-b border-[var(--color-line)] bg-[var(--color-canvas-tinted)] px-5 py-3 text-center text-xs leading-relaxed text-[var(--color-text-muted)]">
        <strong className="font-semibold text-[var(--color-text)]">
          Product guide + prototype library.
        </strong>{" "}
        The index below reflects current product scope. Individual interactive widgets demonstrate
        workflow ideas and are not proof that a capability is enabled in production. See the{" "}
        <a
          href="/workflows"
          className="font-semibold text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          current product scope
        </a>
        .
      </aside>
      {children}
    </>
  );
}
