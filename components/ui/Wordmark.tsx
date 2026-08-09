import Image from "next/image";

type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  tone?: "default" | "inverse";
};

const sizes: Record<
  NonNullable<WordmarkProps["size"]>,
  { icon: number; text: string; gap: string }
> = {
  sm: { icon: 28, text: "text-sm", gap: "gap-2" },
  md: { icon: 36, text: "text-base", gap: "gap-2.5" },
  lg: { icon: 44, text: "text-2xl", gap: "gap-3" },
};

export default function Wordmark({ size = "md", className = "", tone = "default" }: WordmarkProps) {
  const s = sizes[size];
  return (
    <span
      className={`inline-flex items-center ${s.gap} ${className}`}
      role="img"
      aria-label="Oralstack"
    >
      <Image
        src="/oralstack-mark.svg"
        width={s.icon}
        height={s.icon}
        alt=""
        className="shrink-0 rounded-[var(--radius-sm)]"
      />
      <span className={`font-semibold tracking-[-0.02em] ${s.text}`}>
        <span
          className={
            tone === "inverse"
              ? "text-[var(--color-sidebar-foreground)]"
              : "text-[var(--color-ink)]"
          }
        >
          Oral
        </span>
        <span className="text-[var(--color-tide)]">stack</span>
      </span>
    </span>
  );
}
