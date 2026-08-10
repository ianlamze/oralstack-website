import Image from "next/image";
import Section from "@/components/primitives/Section";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  showMark?: boolean;
  /**
   * Visual scale of the H1.
   *  - "default" (default): the standard text-4xl→6xl rhythm — used everywhere
   *    secondary content, legal pages, and dense inner pages live.
   *  - "display": the editorial display scale — reserved for one or two
   *    breakthrough moments per page set (about, customers, hero verticals).
   *    Pulls in the BrandMotif as a subtle backdrop accent.
   */
  variant?: "default" | "display";
};

export default function PageHeader({
  eyebrow,
  title,
  lastUpdated,
  showMark = true,
  variant = "default",
}: PageHeaderProps) {
  const isDisplay = variant === "display";
  return (
    <Section
      className={
        isDisplay ? "relative overflow-hidden pb-12 pt-16 md:pb-16 md:pt-24" : "pb-8 pt-16 md:pt-24"
      }
    >
      <div className={isDisplay ? "max-w-[1100px]" : "max-w-[820px]"}>
        {showMark && (
          <Image
            src="/oralstack-mark.svg"
            alt=""
            width={40}
            height={40}
            className="mb-7 rounded-[var(--radius-sm)] shadow-[var(--shadow-1)]"
          />
        )}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          {eyebrow}
        </p>
        <h1
          className={
            isDisplay
              ? "mt-5 text-balance text-[length:var(--text-display)] leading-[0.96] text-[var(--color-text)]"
              : "mt-4 text-balance text-4xl leading-[1.02] text-[var(--color-text)] md:text-5xl lg:text-6xl"
          }
        >
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </Section>
  );
}
