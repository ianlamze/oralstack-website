import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { plato } from "@/content/comparisons/plato";

export const metadata: Metadata = {
  title: plato.metaTitle,
  description:
    "Archived comparison. Review Oralstack's current Plato-connected product scope and rollout boundaries before procurement.",
  alternates: { canonical: `/compare/${plato.slug}` },
};

export default function Page() {
  return <ComparisonPage data={plato} />;
}
