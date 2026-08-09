import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { carestream } from "@/content/comparisons/carestream";

export const metadata: Metadata = {
  title: carestream.metaTitle,
  description:
    "Archived comparison. Review Oralstack's current Plato-connected product scope and rollout boundaries before procurement.",
  alternates: { canonical: `/compare/${carestream.slug}` },
};

export default function Page() {
  return <ComparisonPage data={carestream} />;
}
