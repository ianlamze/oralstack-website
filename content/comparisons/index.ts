import { plato } from "./plato";
import { openDental } from "./open-dental";
import { dentrix } from "./dentrix";
import { eaglesoft } from "./eaglesoft";
import { carestream } from "./carestream";
import type { Comparison } from "./types";

export const comparisons: Comparison[] = [plato, openDental, dentrix, eaglesoft, carestream];

const bySlug = new Map(comparisons.map((c) => [c.slug, c]));

export function getComparison(slug: string): Comparison | undefined {
  return bySlug.get(slug);
}

export type { Comparison } from "./types";
