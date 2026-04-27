type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes: Record<
  NonNullable<WordmarkProps["size"]>,
  { icon: number; text: string; gap: string }
> = {
  sm: { icon: 18, text: "text-sm", gap: "gap-2" },
  md: { icon: 24, text: "text-base", gap: "gap-2.5" },
  lg: { icon: 36, text: "text-2xl", gap: "gap-3" },
};

function ToothMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {/* Crown — navy */}
      <path
        d="M16 4.5 C20.6 4.5 23.5 7 23.5 11.2 L23.5 14.2 C23.5 16.1 22 17.2 19.8 17.2 L12.2 17.2 C10 17.2 8.5 16.1 8.5 14.2 L8.5 11.2 C8.5 7 11.4 4.5 16 4.5 Z"
        fill="var(--color-ink)"
      />
      {/* Left root — teal, smaller */}
      <path
        d="M11.4 17.6 L11.4 22.5 C11.4 25.2 12.6 26.6 14.2 26.2 C15 26 15.2 24.4 15.2 22.4 L15.2 17.6 Z"
        fill="var(--color-tide)"
      />
      {/* Right root — navy, larger */}
      <path
        d="M16.8 17.6 L16.8 25.4 C16.8 27.7 18.6 28.4 20.4 27.6 C22.4 26.7 22.4 23.4 21.7 19.6 L21.4 17.6 Z"
        fill="var(--color-ink)"
      />
    </svg>
  );
}

export default function Wordmark({ size = "md", className = "" }: WordmarkProps) {
  const s = sizes[size];
  return (
    <span
      className={`inline-flex items-center ${s.gap} ${className}`}
      aria-label="Oralstack"
    >
      <ToothMark size={s.icon} />
      <span className={`font-semibold tracking-tight ${s.text}`}>
        <span style={{ color: "var(--color-ink)" }}>Oral</span>
        <span style={{ color: "var(--color-tide)" }}>stack</span>
      </span>
    </span>
  );
}
