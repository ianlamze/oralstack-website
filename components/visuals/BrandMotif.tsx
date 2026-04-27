/**
 * BrandMotif — Oralstack's recurring graphic device.
 *
 * Three layered, slightly-offset arcs. Reads simultaneously as
 *   - dental arch (the brand domain)
 *   - sound wave / signal pulse (cloud / SaaS / always-on)
 *   - a "stack" — literally the brand name
 *
 * Used as: section dividers, OG-image background, /about hero accent,
 * footer flourish, page transition anchor. Always horizontal; the arcs
 * suggest a horizon / continuum.
 *
 * Tunable via the `tone` prop:
 *   tide   — default; teal arcs on canvas (cool, clinical)
 *   ink    — navy on canvas (premium, restrained)
 *   warm   — sunset on canvas (the human/customer-story moment)
 *   ghost  — outlines only, no fills (section divider mode)
 *
 * The `intensity` prop controls opacity falloff between arcs.
 */
type Tone = "tide" | "ink" | "warm" | "ghost";

type Props = {
  tone?: Tone;
  intensity?: number;
  className?: string;
  /** Aspect ratio width/height. Default 6:1 — wide horizontal banner. */
  aspect?: "wide" | "square" | "tall";
};

const tonePalette: Record<Tone, { fill: string; stroke: string }> = {
  tide: {
    fill: "var(--color-tide)",
    stroke: "var(--color-tide-deep)",
  },
  ink: {
    fill: "var(--color-ink)",
    stroke: "var(--color-ink-deep)",
  },
  warm: {
    fill: "var(--color-warmth)",
    stroke: "var(--color-sunset-deep)",
  },
  ghost: {
    fill: "transparent",
    stroke: "var(--color-line-strong)",
  },
};

const aspectViewBox: Record<NonNullable<Props["aspect"]>, string> = {
  wide: "0 0 1200 200",
  square: "0 0 600 600",
  tall: "0 0 600 900",
};

export default function BrandMotif({
  tone = "tide",
  intensity = 0.5,
  className = "",
  aspect = "wide",
}: Props) {
  const palette = tonePalette[tone];
  const isGhost = tone === "ghost";

  // Arc parameters — three concentric arches, progressively wider, each
  // slightly raised to suggest layering. The "wide" viewBox tunes them
  // to span horizontally; other aspects scale them via preserveAspectRatio.
  const center = aspect === "wide" ? 600 : aspect === "square" ? 300 : 300;
  const baseY = aspect === "wide" ? 200 : aspect === "square" ? 600 : 900;

  // Three arcs at different scales. r1 is the innermost.
  const arcs = [
    { r: aspect === "wide" ? 320 : 180, opacity: intensity },
    { r: aspect === "wide" ? 480 : 280, opacity: intensity * 0.55 },
    { r: aspect === "wide" ? 640 : 380, opacity: intensity * 0.28 },
  ];

  return (
    <svg
      className={className}
      viewBox={aspectViewBox[aspect]}
      preserveAspectRatio={aspect === "wide" ? "xMidYMax slice" : "xMidYMid meet"}
      role="presentation"
      aria-hidden="true"
    >
      {arcs.map((a, i) => (
        <path
          key={i}
          d={`M ${center - a.r} ${baseY} A ${a.r} ${a.r} 0 0 1 ${center + a.r} ${baseY}`}
          fill={isGhost ? "none" : palette.fill}
          stroke={isGhost ? palette.stroke : "none"}
          strokeWidth={isGhost ? 1.25 : 0}
          opacity={a.opacity}
        />
      ))}
    </svg>
  );
}
