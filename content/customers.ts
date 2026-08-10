import { dfiSynergy } from "@/content/case-studies/dfi-synergy";

export type CustomerStatus = "historical-pilot";

export type Customer = {
  id: string;
  name: string;
  location: string;
  status: CustomerStatus;
  specialty?: string;
  size?: string;
  pilotStart?: string;
  blurb: string;
  caseStudySlug?: string;
  pilotScope: string[];
  notIncluded: string[];
  quote: {
    text: string;
    attribution: string;
  };
  evidence: Array<{
    value: string;
    label: string;
    qualifier?: string;
  }>;
  evidenceNote: string;
};

export const customers: Customer[] = [
  {
    id: "dfi-synergy",
    name: "DFI Synergy",
    location: dfiSynergy.profile.location,
    status: "historical-pilot",
    specialty: dfiSynergy.profile.specialty,
    size: `${dfiSynergy.profile.chairs} chairs · ${dfiSynergy.profile.providers} providers`,
    pilotStart: dfiSynergy.profile.pilotStart,
    blurb: dfiSynergy.outcome,
    caseStudySlug: dfiSynergy.slug,
    pilotScope: dfiSynergy.profile.inProduction,
    notIncluded: dfiSynergy.profile.notYet ?? [],
    quote: {
      text: dfiSynergy.pullQuoteMid?.quote ?? dfiSynergy.pullQuoteHero.quote,
      attribution: dfiSynergy.pullQuoteMid?.attribution ?? dfiSynergy.pullQuoteHero.attribution,
    },
    evidence: dfiSynergy.stats,
    evidenceNote:
      "Historical results from DFI Synergy's named April 2026 Plato-connected workflow pilot. The full case study documents the definitions, baseline, measurement window, and underlying event sources. These results describe that clinic and configured scope; they do not evidence standalone adoption or a general performance promise.",
  },
];
