import type {
  ConditionCode,
  ConditionStatus,
  ParserConfidence,
  PatientChart,
  Surface,
  ToothCondition,
} from "./types";

export const CHARTING_PARSER_VERSION = "phase4-v5";

export interface ChartNoteInput {
  id: string;
  content: string;
  timestamp?: string;
  author?: string;
}

export interface ParsedChartCommand {
  tooth: number;
  surfaces: Surface[];
  condition: ConditionCode;
  wholeTooth: boolean;
  sourceText: string;
  status: ConditionStatus;
  confidence: ParserConfidence;
  section: ChartSection;
}

export interface BuiltChartCondition {
  tooth: number;
  condition: ToothCondition;
}

type ChartSection =
  | "general"
  | "charting"
  | "treatment"
  | "plan"
  | "discussion"
  | "ohi"
  | "rx"
  | "follow_up"
  | "admin";

const TOOTH_PATTERN = "(1[1-8]|2[1-8]|3[1-8]|4[1-8])";

const CONDITION_MATCHERS: Array<{
  condition: ConditionCode;
  wholeTooth: boolean;
  pattern: RegExp;
}> = [
  {
    condition: "missing",
    wholeTooth: true,
    pattern: /\b(missing|not present|absent|congenitally missing|agenesis)\b/i,
  },
  {
    condition: "extraction_planned",
    wholeTooth: true,
    pattern:
      /\b(for exo|planned exo|planned extraction|for extraction|to extract|adv(?:ise|ised)? extraction|adv(?:ise|ised)? exo|extraction suggested|poor prognosis.*(?:extract|exo)|questionable prognosis.*(?:extract|exo)|hopeless prognosis.*(?:extract|exo|extraction))\b/i,
  },
  {
    condition: "extracted",
    wholeTooth: true,
    pattern:
      /\b(extract(?:ed|ion)?|exo\b|ext\b|xap\b|xn\b|exodontia|removed|removal|surgically removed|take out|taken out|wisdom tooth surgery)\b/i,
  },
  {
    condition: "impacted",
    wholeTooth: true,
    pattern: /\b(impacted|impaction|embedded)\b/i,
  },
  {
    condition: "unerupted",
    wholeTooth: true,
    pattern: /\b(unerupted|not yet erupted)\b/i,
  },
  {
    condition: "partially_erupted",
    wholeTooth: true,
    pattern: /\b(partially erupted|partially-erupted|partial eruption|semi-erupted)\b/i,
  },
  {
    condition: "root_canal",
    wholeTooth: true,
    pattern:
      /\b(root canal(?: treatment| therapy)?|rct\b|endo\b|obturation|endodontic(?: treatment)?|endodontically treated)\b/i,
  },
  {
    condition: "post_core",
    wholeTooth: true,
    pattern:
      /\b(post\s*&\s*core|post core|post and core|post-core|fiber post|fibre post|post crown|core build(?:-?up)?)\b|\+p\/c\b/i,
  },
  {
    condition: "apicoectomy",
    wholeTooth: true,
    pattern: /\b(apicoectomy|apicectomy|apico\b|root end surgery)\b/i,
  },
  {
    condition: "crown",
    wholeTooth: true,
    pattern:
      /\b(crowns?|crowning|crowned|pfm crowns?|permanent crowns?|temp crowns?|temporary crowns?|fmc\b|full(?:\s+coverage)? crown|stainless steel crown|ssc\b|zirconia crown|metal ceramic crown)\b/i,
  },
  {
    condition: "implant",
    wholeTooth: true,
    pattern:
      /\b(implant(?:ation|ed)?|immediate implantation|implant surgery|implanted|implant fixture|fixture)\b/i,
  },
  {
    condition: "retained_root",
    wholeTooth: true,
    pattern: /\b(retained root|root stumps?|residual root|root remnant)\b/i,
  },
  {
    condition: "bridge_pontic",
    wholeTooth: true,
    pattern: /\b(bridge pontic|pontic)\b/i,
  },
  {
    condition: "bridge_abutment",
    wholeTooth: true,
    pattern: /\b(bridge abutment|abutment|retainer)\b/i,
  },
  {
    condition: "denture_tooth",
    wholeTooth: true,
    pattern:
      /\b(denture tooth|denture|partial denture|complete denture|rpd\b|c\/d\b|cd\b|flipper|acrylic tooth|prosthetic tooth|artificial tooth)\b/i,
  },
  {
    condition: "periodontal_treatment",
    wholeTooth: true,
    pattern:
      /\b(perio(?:dontal)? treatment|perio tx|perio therapy|srp\b|s\/rp\b|root planing|scaling and root planing|deep cleaning|periocline|subgingival debridement)\b/i,
  },
  {
    condition: "splint",
    wholeTooth: true,
    pattern: /\b(splint(?:ed|ing)?|wire splint|bonded splint|fiber splint|fibre splint)\b/i,
  },
  {
    condition: "abscess",
    wholeTooth: true,
    pattern:
      /\b(abscess|chronic apical abscess|apical abscess|parulis|sinus tract|draining sinus|pus exudate|pus)\b/i,
  },
  {
    condition: "mobility",
    wholeTooth: true,
    pattern: /\b(mobility|mobile tooth|mobile|loose tooth|grade\s*[123]\s+mobility)\b/i,
  },
  {
    condition: "recession",
    wholeTooth: false,
    pattern: /\b(recession|gingival recession)\b/i,
  },
  {
    condition: "furcation",
    wholeTooth: false,
    pattern: /\b(furcation|furcal|bifurcation)\b/i,
  },
  {
    condition: "fracture",
    wholeTooth: false,
    pattern:
      /\b(fracture|fractured|broken tooth|crack ?lines?|craze ?lines?|cracked tooth|cracked cusp|crack|chip|chipped)\b/i,
  },
  {
    condition: "caries",
    wholeTooth: false,
    pattern:
      /\b(caries|carious|carious lesion|root caries|recurrent caries|secondary caries|primary caries|decay|dental decay|cavity|deep cavity)\b/i,
  },
  {
    condition: "non_carious_lesion",
    wholeTooth: false,
    pattern:
      /\b(ncc?l|non-?carious lesion|non-?carious cervical lesion|abfraction|abrasion|erosion|attrition|tooth wear|wear facet|cervical lesion)\b/i,
  },
  {
    condition: "filling_amalgam",
    wholeTooth: false,
    pattern:
      /\b(amalgam|amal\b|amalg\b|amalgam restoration|metallic filling|metal filling|silver filling)\b/i,
  },
  {
    condition: "filling_composite",
    wholeTooth: false,
    pattern:
      /\b(fill(?:ing|ed)?|filling, simple|filling, complex|composite(?: filling)?|tooth coloured(?: filling| restoration)?|tooth colored(?: filling| restoration)?|restoration|restored|glass ionomer|gic\b|fuji(?:\s*ii|\s*ix)?|cf\b|cap\b|tc\b|tcr\b)\b/i,
  },
  {
    condition: "inlay",
    wholeTooth: false,
    pattern: /\b(inlay|ceramic inlay|porcelain inlay|indirect inlay)\b/i,
  },
  {
    condition: "onlay",
    wholeTooth: false,
    pattern: /\b(onlay|overlay|ceramic onlay|porcelain onlay|indirect onlay)\b/i,
  },
  {
    condition: "veneer",
    wholeTooth: false,
    pattern: /\b(veneer|laminate veneer|porcelain veneer)\b/i,
  },
  {
    condition: "sealant",
    wholeTooth: false,
    pattern: /\b(sealant|fissure sealant|fissure enamel sealant)\b/i,
  },
  {
    condition: "watch",
    wholeTooth: false,
    pattern: /\b(watch|monitor|to monitor|kiv|observe)\b/i,
  },
];

const CONTEXTUAL_CONDITIONS = new Set<ConditionCode>(["furcation", "recession", "mobility"]);
const COMPACT_TOOTH_MARKERS = new Set(["c"]);

function isDeferredExtractionLine(line: string): boolean {
  return /\b(appt(?:ointment)?\s+to|request(?:ed)?|for time being|to hold|hold for time being|require(?:s|d)?|indicated for|tx plan|treatment plan|next visit|nv)\b/i.test(
    line,
  );
}

function isOrthodonticHardwareLine(line: string): boolean {
  return /\b(close coil|close chain|power chain|ligature|elastic|archwire|bracket|ortho)\b/i.test(
    line,
  );
}

function isProstheticAdjustmentLine(line: string): boolean {
  return /\b(acrylic on flange|flange of|cleaned f\/-|u-shaped acrylic|full palatal coverage)\b/i.test(
    line,
  );
}

function isNerveVitalityLine(line: string): boolean {
  return /\b(tooth\s*#?\s*(1[1-8]|2[1-8]|3[1-8]|4[1-8])\s+nv|ept\b|no sensation)\b/i.test(line);
}

function isPolishingOnlyLine(line: string): boolean {
  return /\bcr\b.*\bpolished\b/i.test(line);
}

function isLegacyDentalChartAuthor(author?: string): boolean {
  return (author ?? "").trim().toLowerCase() === "dental chart";
}

function isCariesRemovalContext(line: string): boolean {
  return /\b(caries removal|removal of caries|excavation of caries|during caries removal)\b/i.test(
    line,
  );
}

function isBareToothReferenceLine(line: string): boolean {
  const stripped = line
    .replace(new RegExp(`#?${TOOTH_PATTERN}\\s*\\([mdboilp,\\s]+\\)`, "gi"), " ")
    .replace(new RegExp(`#?${TOOTH_PATTERN}`, "gi"), " ")
    .replace(/\b(and|to)\b/gi, " ")
    .replace(/[\s,*:#;()/-]+/g, " ")
    .trim();
  return stripped.length === 0;
}

function normalizeSurfaceToken(token: string): Surface | null {
  const value = token.toUpperCase();
  if (value === "P") return "L";
  if (value === "I") return "O";
  if (value === "M" || value === "D" || value === "O" || value === "B" || value === "L") {
    return value;
  }
  return null;
}

function parseSurfaceList(raw?: string): Surface[] {
  if (!raw) return [];
  const seen = new Set<Surface>();
  for (const char of raw.replace(/[^A-Za-z]/g, "")) {
    const surface = normalizeSurfaceToken(char);
    if (surface) seen.add(surface);
  }
  return [...seen];
}

function parseSurfaceWords(raw: string): Surface[] {
  const surfaces = new Set<Surface>();
  if (/\bmes(?:ial)?\b/i.test(raw)) surfaces.add("M");
  if (/\bdist(?:al)?\b/i.test(raw)) surfaces.add("D");
  if (/\bocc?(?:lusal)?\b/i.test(raw) || /\binc(?:isal)?\b/i.test(raw)) surfaces.add("O");
  if (/\bbu(?:ccal)?\b/i.test(raw) || /\blab(?:ial)?\b/i.test(raw)) surfaces.add("B");
  if (/\b(?:ling(?:ual)?|pal(?:atal|atally)?|p)\b/i.test(raw)) surfaces.add("L");
  if (/\bmesial\b/i.test(raw)) surfaces.add("M");
  if (/\bdistal\b/i.test(raw)) surfaces.add("D");
  if (/\bocclusal\b/i.test(raw)) surfaces.add("O");
  if (/\bbuccal\b/i.test(raw)) surfaces.add("B");
  if (/\b(labial|lingual|palatal|palatally)\b/i.test(raw)) surfaces.add("L");
  return [...surfaces];
}

function splitChartSegments(content: string): string[] {
  return content
    .split("\n")
    .flatMap((line) => line.split(/[.;]+/))
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function classifySection(line: string, current: ChartSection): ChartSection {
  const normalized = line.trim();
  if (
    /^(perio(?:dontal)?(?: & periimplant)? charting|full periodontal charting|charting|hs charting)\b[:;]?/i.test(
      normalized,
    )
  ) {
    return "charting";
  }
  if (/^(tx|treatment|perio tx|periodontal treatment)\b[:;]?/i.test(normalized)) return "treatment";
  if (/^(plan|treatment plan)\b[:;]?/i.test(normalized)) return "plan";
  if (/^(discussed|discussion)\b[:;]?/i.test(normalized)) return "discussion";
  if (/^(ohi)\b[:;]?/i.test(normalized)) return "ohi";
  if (/^(rx|dispense instructions)\b[:;]?/i.test(normalized)) return "rx";
  if (/^(see|review|next visit|recall|nv)\b[:;]?/i.test(normalized)) return "follow_up";
  if (
    /^(notes|consultation|prevention|investigation|radiograph|local anaesthesia|anaesthesia|mh|io|eo)\b[:;]?/i.test(
      normalized,
    )
  ) {
    return "admin";
  }
  return current;
}

function isSectionHeader(line: string): boolean {
  const normalized = line.trim();
  return /^(perio(?:dontal)?(?: & periimplant)? charting|full periodontal charting|charting|tx|treatment|plan|discussed|discussion|ohi|rx|dispense instructions|see|review|next visit|recall|notes|consultation|prevention|investigation|radiograph|local anaesthesia|anaesthesia|mh|io|eo)\b[:;]?$/i.test(
    normalized,
  );
}

function isNegatedOrNonChartableLine(
  line: string,
  section: ChartSection,
  inferredConditions: Array<{ condition: ConditionCode; wholeTooth: boolean }>,
  toothMentions: Array<{ tooth: number; surfaces: Surface[] }>,
): boolean {
  const normalized = line.trim();
  if (!normalized) return true;
  if (section === "rx" || section === "ohi" || section === "discussion" || section === "admin") {
    return true;
  }
  if (isOrthodonticHardwareLine(normalized) || isProstheticAdjustmentLine(normalized)) return true;
  if (isNerveVitalityLine(normalized) || isPolishingOnlyLine(normalized)) return true;
  if (
    section === "follow_up" &&
    !/\b(for exo|planned exo|planned extraction|for extraction|to extract|adv(?:ise|ised)? extraction|adv(?:ise|ised)? exo)\b/i.test(
      normalized,
    )
  ) {
    return true;
  }
  if (/\bcaries controlled\b/i.test(normalized)) return true;
  if (/\b(no complaints?|healed well|wnl|nad|nil)\b/i.test(normalized)) return true;
  if (
    /\b(stable|status quo|improved)\b/i.test(normalized) &&
    inferredConditions.length === 0 &&
    toothMentions.length === 0
  ) {
    return true;
  }
  if (
    /\b(discussed|advised usage|given|reassured|observe technique|waterflosser|idb|etb|tb|mouthwash|salt water)\b/i.test(
      normalized,
    ) &&
    !/\b#?(1[1-8]|2[1-8]|3[1-8]|4[1-8])\b/i.test(normalized)
  ) {
    return true;
  }
  return false;
}

export function expandToothRange(start: number, end: number): number[] {
  const startQuadrant = Math.floor(start / 10);
  const endQuadrant = Math.floor(end / 10);

  if (startQuadrant === endQuadrant) {
    const step = end >= start ? 1 : -1;
    const length = Math.abs(end - start) + 1;
    return Array.from({ length }, (_, index) => start + index * step);
  }

  const arch = archForQuadrant(startQuadrant);
  if (arch !== null && arch === archForQuadrant(endQuadrant)) {
    const [leftQuadrant, rightQuadrant] = arch === "upper" ? [1, 2] : [4, 3];

    const startSide = startQuadrant === leftQuadrant ? "left" : "right";
    const endSide = endQuadrant === leftQuadrant ? "left" : "right";

    if (startSide === endSide) return [start, end];

    const leftTooth = startSide === "left" ? start : end;
    const rightTooth = startSide === "right" ? start : end;

    const leftSweep: number[] = [];
    const leftStart = leftTooth % 10;
    for (let n = leftStart; n >= 1; n -= 1) leftSweep.push(leftQuadrant * 10 + n);
    const rightSweep: number[] = [];
    const rightEnd = rightTooth % 10;
    for (let n = 1; n <= rightEnd; n += 1) rightSweep.push(rightQuadrant * 10 + n);
    const sequence = [...leftSweep, ...rightSweep];

    return startSide === "left" ? sequence : sequence.reverse();
  }

  return [start, end];
}

function archForQuadrant(quadrant: number): "upper" | "lower" | null {
  if (quadrant === 1 || quadrant === 2) return "upper";
  if (quadrant === 3 || quadrant === 4) return "lower";
  return null;
}

function extractToothMentions(line: string): Array<{ tooth: number; surfaces: Surface[] }> {
  const matches = new Map<string, { tooth: number; surfaces: Surface[] }>();
  const fallbackSurfaces = parseSurfaceWords(line);

  const rangePattern = new RegExp(`#?${TOOTH_PATTERN}\\s*-\\s*#?${TOOTH_PATTERN}`, "gi");
  for (const match of line.matchAll(rangePattern)) {
    const start = Number(match[1]);
    const end = Number(match[2]);
    for (const tooth of expandToothRange(start, end)) {
      const key = `${tooth}:`;
      if (!matches.has(key)) matches.set(key, { tooth, surfaces: [] });
    }
  }

  const patterns = [
    new RegExp(`#?${TOOTH_PATTERN}\\s*\\(([mdboilp,\\s]+)\\)`, "gi"),
    new RegExp(`#?${TOOTH_PATTERN}\\s+([mdboilpc]{1,5})\\b`, "gi"),
    new RegExp(`#?${TOOTH_PATTERN}([a-z]{1,6})\\b`, "gi"),
    new RegExp(`#?${TOOTH_PATTERN}(?=\\s+(?:and|&)\\s+#?${TOOTH_PATTERN})`, "gi"),
    new RegExp(`tooth\\s*#?\\s*${TOOTH_PATTERN}\\b`, "gi"),
    new RegExp(
      `(?:^|[\\s,:;()])#?${TOOTH_PATTERN}(?!\\s*(?:years?\\b|year\\b|cart\\b|hr\\b|hrs\\b|min\\b|mins\\b|day\\b|days\\b|week\\b|weeks\\b|month\\b|months\\b|review\\b))(?=$|[\\s,;:()])`,
      "gi",
    ),
  ];

  for (const pattern of patterns) {
    for (const match of line.matchAll(pattern)) {
      const tooth = Number(match[1]);
      const rawSuffix = String(match[2] ?? "")
        .trim()
        .toLowerCase();
      const parsedSurfaces = parseSurfaceList(rawSuffix);
      const isCompactMarker = rawSuffix ? COMPACT_TOOTH_MARKERS.has(rawSuffix) : false;
      if (
        rawSuffix &&
        parsedSurfaces.length === 0 &&
        !isCompactMarker &&
        fallbackSurfaces.length === 0
      ) {
        continue;
      }
      const surfaces =
        parsedSurfaces.length > 0 ? parsedSurfaces : isCompactMarker ? [] : fallbackSurfaces;
      const key = `${tooth}:${surfaces.join("")}`;
      if (
        surfaces.length === 0 &&
        [...matches.keys()].some(
          (existingKey) => existingKey.startsWith(`${tooth}:`) && existingKey !== key,
        )
      ) {
        continue;
      }
      if (!matches.has(key)) matches.set(key, { tooth, surfaces });
    }
  }

  return [...matches.values()];
}

function inferConditions(line: string): Array<{ condition: ConditionCode; wholeTooth: boolean }> {
  const matches: Array<{ condition: ConditionCode; wholeTooth: boolean }> = [];

  for (const matcher of CONDITION_MATCHERS) {
    if (matcher.pattern.test(line)) {
      if (matcher.condition === "mobility" && /\b(not mobile|no mobility)\b/i.test(line)) continue;
      if (matcher.condition === "caries" && /\b(no|nil)\s+(recurrent\s+)?caries\b/i.test(line))
        continue;
      if (matcher.condition === "caries" && /\bnon-?carious\b/i.test(line)) continue;
      if (matcher.condition === "caries" && /\babrasion cavit(?:y|ies)\b/i.test(line)) continue;
      if (matcher.condition === "crown" && /\broot stumps?\b/i.test(line)) continue;
      if (matcher.condition === "extracted" && isDeferredExtractionLine(line)) {
        matches.push({ condition: "extraction_planned", wholeTooth: true });
        continue;
      }
      if (matcher.condition === "extracted" && isCariesRemovalContext(line)) continue;
      matches.push({ condition: matcher.condition, wholeTooth: matcher.wholeTooth });
    }
  }

  if (matches.some((entry) => entry.condition === "filling_amalgam")) {
    return matches.filter((entry) => entry.condition !== "filling_composite");
  }

  return matches;
}

function normalizeConditionsForContext(
  line: string,
  section: ChartSection,
  inferredConditions: Array<{ condition: ConditionCode; wholeTooth: boolean }>,
): Array<{ condition: ConditionCode; wholeTooth: boolean }> {
  if (inferredConditions.length === 0) return inferredConditions;

  return inferredConditions.map((entry) => {
    if (
      entry.condition === "extracted" &&
      (section === "plan" ||
        section === "follow_up" ||
        /\b(plan(?:ned)?|for exo|planned extraction|planned exo|for extraction|to extract|review|kiv|monitor|observe|adv(?:ise|ised)? extraction|adv(?:ise|ised)? exo)\b/i.test(
          line,
        ))
    ) {
      return { condition: "extraction_planned", wholeTooth: true };
    }
    return entry;
  });
}

function extractExplicitCommands(
  line: string,
  section: ChartSection,
  minimumConfidence: ParserConfidence,
): ParsedChartCommand[] {
  const explicit: ParsedChartCommand[] = [];
  const normalizedLine = line.trim();

  const bridgeRolePattern = new RegExp(`#?${TOOTH_PATTERN}\\s+(pontic|abutment|retainer)\\b`, "gi");
  for (const match of normalizedLine.matchAll(bridgeRolePattern)) {
    const tooth = Number(match[1]);
    const role = String(match[2] ?? "").toLowerCase();
    const condition: ConditionCode = role === "pontic" ? "bridge_pontic" : "bridge_abutment";
    const confidence = getLineConfidence(normalizedLine, section, condition, []);
    if (!meetsMinimumConfidence(confidence, minimumConfidence)) continue;
    explicit.push({
      tooth,
      surfaces: [],
      condition,
      wholeTooth: true,
      sourceText: normalizedLine,
      status: getLineStatus(normalizedLine, section, condition),
      confidence,
      section,
    });
  }

  const bridgeSpanPattern = new RegExp(
    `\\b(?:bridge|fpd|fixed\\s+partial\\s+denture|fixed\\s+dental\\s+prosthesis)\\b[^\\n#]*#?${TOOTH_PATTERN}\\s*-\\s*#?${TOOTH_PATTERN}`,
    "gi",
  );
  for (const match of normalizedLine.matchAll(bridgeSpanPattern)) {
    const start = Number(match[1]);
    const end = Number(match[2]);
    const span = expandToothRange(start, end);
    const first = span[0];
    const last = span[span.length - 1];
    if (span.length < 2 || first === undefined || last === undefined) continue;

    const endpoints = new Set<number>([first, last]);
    for (const tooth of span) {
      const condition: ConditionCode = endpoints.has(tooth) ? "bridge_abutment" : "bridge_pontic";
      const confidence = getLineConfidence(normalizedLine, section, condition, []);
      if (!meetsMinimumConfidence(confidence, minimumConfidence)) continue;
      explicit.push({
        tooth,
        surfaces: [],
        condition,
        wholeTooth: true,
        sourceText: normalizedLine,
        status: getLineStatus(normalizedLine, section, condition),
        confidence,
        section,
      });
    }
  }

  const seen = new Set<string>();
  return explicit.filter((entry) => {
    const key = `${entry.tooth}:${entry.condition}:${entry.sourceText}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getLineStatus(
  line: string,
  section: ChartSection,
  condition: ConditionCode,
): ConditionStatus {
  const normalized = line.trim();
  if (
    condition === "extraction_planned" ||
    section === "follow_up" ||
    section === "plan" ||
    /\b(plan(?:ned)?|for exo|for extraction|to extract|review|kiv|monitor|observe|guarded prognosis|poor prognosis|questionable prognosis)\b/i.test(
      normalized,
    )
  ) {
    return "planned";
  }
  return "completed";
}

function getLineConfidence(
  line: string,
  section: ChartSection,
  condition: ConditionCode,
  surfaces: Surface[],
): ParserConfidence {
  const normalized = line.trim();
  const explicitTooth = /#?(1[1-8]|2[1-8]|3[1-8]|4[1-8])/.test(normalized);
  const hasSurface = surfaces.length > 0 || /\(([a-z,\s]+)\)/i.test(normalized);

  if (
    section === "charting" &&
    explicitTooth &&
    (hasSurface ||
      /\b(crack|fracture|caries|ncc?l|abscess|pus|furcation|recession|mobility|crown|rct|implant|pontic|abutment)\b/i.test(
        normalized,
      ))
  ) {
    return "high";
  }

  if (
    section === "treatment" &&
    explicitTooth &&
    /\b(caries|fracture|crown|implant|rct|post core|post-core|retained root|abscess|pus)\b/i.test(
      normalized,
    )
  ) {
    return "medium";
  }

  if (
    condition === "watch" ||
    /\b(check|review|monitor|observe|guarded prognosis|poor prognosis|questionable prognosis)\b/i.test(
      normalized,
    )
  ) {
    if (condition === "watch" && explicitTooth && /\bwatch\b/i.test(normalized)) return "medium";
    return "low";
  }

  if (section === "plan") return "medium";

  return explicitTooth ? "medium" : "low";
}

function meetsMinimumConfidence(confidence: ParserConfidence, minimum: ParserConfidence): boolean {
  const order: Record<ParserConfidence, number> = { low: 0, medium: 1, high: 2 };
  return order[confidence] >= order[minimum];
}

function noteDate(timestamp?: string): string {
  if (!timestamp) return new Date().toISOString().slice(0, 10);
  return timestamp.slice(0, 10);
}

function stableDigest(value: string): string {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function buildConditionId(
  noteId: string,
  tooth: number,
  condition: ConditionCode,
  surfaces: Surface[],
  date: string,
  sourceText: string,
): string {
  const digest = stableDigest(
    `${noteId}:${tooth}:${condition}:${surfaces.join("")}:${date}:${sourceText}`,
  );
  return `note-${digest}`;
}

export function hasEquivalentCondition(
  existing: ToothCondition[],
  candidate: ToothCondition,
): boolean {
  const candidateSurfaces = [...(candidate.surfaces ?? [])].sort().join("");
  return existing.some((entry) => {
    const entrySurfaces = [...(entry.surfaces ?? [])].sort().join("");
    return (
      entry.condition === candidate.condition &&
      entry.status === candidate.status &&
      entry.date === candidate.date &&
      entrySurfaces === candidateSurfaces
    );
  });
}

export function parseChartText(content: string): ParsedChartCommand[] {
  return parseChartTextWithOptions(content);
}

export function parseChartTextWithOptions(
  content: string,
  options?: { minimumConfidence?: ParserConfidence },
): ParsedChartCommand[] {
  const parsed: ParsedChartCommand[] = [];
  const lines = splitChartSegments(content);
  let pendingConditions: Array<{ condition: ConditionCode; wholeTooth: boolean }> = [];
  let currentSection: ChartSection = "general";
  const minimumConfidence = options?.minimumConfidence ?? "medium";

  for (const line of lines) {
    currentSection = classifySection(line, currentSection);
    if (isSectionHeader(line)) {
      pendingConditions = [];
      continue;
    }

    const explicitCommands = extractExplicitCommands(line, currentSection, minimumConfidence);
    if (explicitCommands.length > 0) {
      parsed.push(...explicitCommands);
      pendingConditions = [];
      continue;
    }

    const toothMentions = extractToothMentions(line);
    const inferredConditions = normalizeConditionsForContext(
      line,
      currentSection,
      inferConditions(line),
    );

    if (isNegatedOrNonChartableLine(line, currentSection, inferredConditions, toothMentions)) {
      pendingConditions = [];
      continue;
    }

    if (inferredConditions.length > 0 && toothMentions.length === 0) {
      pendingConditions = inferredConditions.filter((entry) =>
        CONTEXTUAL_CONDITIONS.has(entry.condition),
      );
      continue;
    }

    const activeConditions =
      inferredConditions.length > 0
        ? inferredConditions
        : toothMentions.length > 0 && isBareToothReferenceLine(line)
          ? pendingConditions
          : [];

    if (activeConditions.length === 0 || toothMentions.length === 0) {
      if (inferredConditions.length > 0) pendingConditions = inferredConditions;
      continue;
    }

    for (const mention of toothMentions) {
      for (const inferred of activeConditions) {
        const status = getLineStatus(line, currentSection, inferred.condition);
        const confidence = getLineConfidence(
          line,
          currentSection,
          inferred.condition,
          inferred.wholeTooth ? [] : mention.surfaces,
        );
        if (!meetsMinimumConfidence(confidence, minimumConfidence)) continue;

        parsed.push({
          tooth: mention.tooth,
          surfaces: inferred.wholeTooth ? [] : mention.surfaces,
          condition: inferred.condition,
          wholeTooth: inferred.wholeTooth,
          sourceText: line,
          status,
          confidence,
          section: currentSection,
        });
      }
    }

    pendingConditions = inferredConditions.length > 0 ? inferredConditions : [];
  }

  const seen = new Set<string>();
  return parsed.filter((entry) => {
    const key = `${entry.tooth}:${entry.condition}:${entry.surfaces.join("")}:${entry.sourceText}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildChartConditionsFromText(params: {
  content: string;
  noteId: string;
  date?: string;
  author?: string;
  status?: ConditionStatus;
  minimumConfidence?: ParserConfidence;
}): BuiltChartCondition[] {
  if (isLegacyDentalChartAuthor(params.author)) return [];

  const date = params.date ?? noteDate();
  const status = params.status ?? "completed";

  return parseChartTextWithOptions(params.content, {
    minimumConfidence: params.minimumConfidence,
  }).map((command) => ({
    tooth: command.tooth,
    condition: {
      id: buildConditionId(
        params.noteId,
        command.tooth,
        command.condition,
        command.surfaces,
        date,
        command.sourceText,
      ),
      condition: command.condition,
      surfaces: command.wholeTooth ? undefined : command.surfaces,
      date,
      doctor: params.author,
      notes: command.sourceText,
      status:
        params.status && params.status !== "completed"
          ? params.status
          : command.status === "planned" || command.condition === "extraction_planned"
            ? "planned"
            : status,
      parser_confidence: command.confidence,
      parser_section: command.section,
    },
  }));
}

export function syncChartWithNotes(
  chart: PatientChart,
  notes: ChartNoteInput[],
): { chart: PatientChart; changed: boolean } {
  let changed = false;
  const nextTeeth: PatientChart["teeth"] = { ...chart.teeth };

  for (const note of notes) {
    const inferredConditions = buildChartConditionsFromText({
      content: note.content,
      noteId: note.id,
      date: noteDate(note.timestamp),
      author: note.author,
      status: "completed",
    });

    for (const entry of inferredConditions) {
      const tooth = entry.tooth;
      const condition = entry.condition;
      const existing = nextTeeth[tooth] ?? [];
      if (hasEquivalentCondition(existing, condition)) continue;
      nextTeeth[tooth] = [...existing, condition];
      changed = true;
    }
  }

  if (!changed) return { chart, changed };

  return {
    changed,
    chart: {
      ...chart,
      updated_at: new Date().toISOString().replace("T", " ").substring(0, 19),
      teeth: nextTeeth,
    },
  };
}
