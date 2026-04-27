export type ComparisonRow = {
  capability: string;
  them: string;
  us: string;
};

export type ComparisonReason = {
  eyebrow: string;
  title: string;
  body: string;
};

export type ComparisonConcession = {
  title: string;
  intro: string;
  bullets: string[];
};

export type ComparisonCTA = {
  title: string;
  body: string;
  sideLink?: { label: string; href: string };
};

export type Comparison = {
  /** URL slug under /compare/. */
  slug: string;
  /** Display name of the competitor (used in table column header + row labels). */
  competitor: string;
  /** SEO title — shows as <title> + index card heading. */
  metaTitle: string;
  /** SEO description + reused for index card blurb spot. */
  metaDescription: string;
  /** Short tagline shown on the /compare index card. */
  indexOneLine: string;
  /** Longer description shown on the /compare index card body. */
  indexBlurb: string;
  /** Display title for the page header (typically `${metaTitle}.`). */
  pageTitle: string;
  /** Top paragraph after the PageHeader. */
  lede: string;
  rows: ComparisonRow[];
  reasons: ComparisonReason[];
  concession: ComparisonConcession;
  cta: ComparisonCTA;
};
