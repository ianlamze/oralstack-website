type PullQuoteProps = {
  quote: string;
  attribution: string;
  /**
   * Visual scale.
   *  - "lg" (default): inline body-flow pull quote
   *  - "xl": hero pull quote on case studies
   *  - "display": editorial breakthrough quote — uses the display type scale,
   *    drops the rule, treats the quote as a typographic object. Reserved for
   *    one moment per page set.
   */
  size?: "lg" | "xl" | "display";
};

export default function PullQuote({ quote, attribution, size = "lg" }: PullQuoteProps) {
  if (size === "display") {
    return (
      <figure className="grid gap-6">
        <blockquote
          className="font-semibold tracking-[-0.02em] leading-[1.05] text-balance text-[var(--color-text)]"
          style={{ fontSize: "var(--text-display-sm)" }}
        >
          <span aria-hidden className="text-[var(--color-tide-deep)]">&ldquo;</span>
          {quote}
          <span aria-hidden className="text-[var(--color-tide-deep)]">&rdquo;</span>
        </blockquote>
        <figcaption className="text-sm text-[var(--color-text-soft)] uppercase tracking-[0.16em]">
          {attribution}
        </figcaption>
      </figure>
    );
  }

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
