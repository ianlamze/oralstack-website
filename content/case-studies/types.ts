export type CaseStudy = {
  slug: string;
  customerId: string;

  eyebrow: string;
  title: string;
  outcome: string;

  profile: {
    location: string;
    chairs?: number;
    providers?: number;
    specialty?: string;
    pilotStart: string;
    inProduction: string[];
    notYet?: string[];
  };

  pullQuoteHero: { quote: string; attribution: string };
  pullQuoteMid?: { quote: string; attribution: string };

  operatorNote?: {
    label: string;
    body: string;
  };

  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;

  stats: Array<{
    value: string;
    label: string;
    qualifier?: string;
  }>;

  /** How the headline outcomes were measured — surfaced as the last narrative block before the CTA. Procurement-grade case studies cite the data source, baseline, and measurement window so a buyer can verify the claim. */
  methodology?: string;

  disclaimer?: string;
};
