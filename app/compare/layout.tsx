import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside className="border-b border-[var(--color-line)] bg-[var(--color-canvas-tinted)] px-5 py-3 text-center text-xs leading-relaxed text-[var(--color-text-muted)]">
        <strong className="font-semibold text-[var(--color-text)]">Evaluation archive.</strong>{" "}
        Oralstack currently extends Plato through reviewed workflows; it is not marketed as a
        standalone replacement. Confirm the{" "}
        <a
          href="/workflows"
          className="font-semibold text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          current product boundary
        </a>{" "}
        before using these older comparison notes.
      </aside>
      {children}
    </>
  );
}
