type PullQuoteProps = {
  quote: string;
  attribution: string;
  size?: "lg" | "xl";
};

export default function PullQuote({ quote, attribution, size = "lg" }: PullQuoteProps) {
  const fontSize =
    size === "xl" ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl lg:text-[1.65rem]";
  return (
    <figure className="border-l-2 border-[var(--color-accent-deep)] pl-6 md:pl-8">
      <blockquote
        className={`${fontSize} font-medium tracking-tight text-[var(--color-text)] leading-[1.25] text-balance`}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm text-[var(--color-text-soft)] uppercase tracking-[0.16em]">
        {attribution}
      </figcaption>
    </figure>
  );
}
