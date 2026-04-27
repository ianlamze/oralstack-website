import Section from "@/components/primitives/Section";
import AnimatedMark from "@/components/ui/AnimatedMark";
import BrandMotif from "@/components/visuals/BrandMotif";

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
        isDisplay ? "relative pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden" : "pt-16 md:pt-24 pb-8"
      }
    >
      {isDisplay && (
        <div
          aria-hidden
          className="absolute inset-x-0 -top-20 -z-10 pointer-events-none opacity-[0.55]"
        >
          <BrandMotif tone="tide" intensity={0.3} aspect="wide" className="w-full h-[420px]" />
        </div>
      )}
      <div className={isDisplay ? "max-w-[1100px]" : "max-w-[820px]"}>
        {showMark && <AnimatedMark size={32} className="mb-7" />}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          {eyebrow}
        </p>
        <h1
          className={
            isDisplay
              ? "mt-5 font-semibold tracking-[-0.02em] leading-[0.96] text-balance text-[var(--color-text)]"
              : "mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance"
          }
          style={isDisplay ? { fontSize: "var(--text-display)" } : undefined}
        >
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-4 text-sm text-[var(--color-text-soft)]">Last updated: {lastUpdated}</p>
        )}
      </div>
    </Section>
  );
}
