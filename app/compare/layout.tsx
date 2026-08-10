import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside className="border-b border-[var(--color-line)] bg-[var(--color-canvas-tinted)] px-5 py-3 text-center text-xs leading-relaxed text-[var(--color-text-muted)]">
        <strong className="font-semibold text-[var(--color-text)]">Evaluation archive.</strong>{" "}
        Oralstack&apos;s product role and rollout model have changed since these notes were written.
        Confirm the{" "}
        <a
          href="/switching"
          className="font-semibold text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          current guided rollout
        </a>{" "}
        before using these older comparison notes.
      </aside>
      {children}
    </>
  );
}
