import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { openDental } from "@/content/comparisons/open-dental";

export const metadata: Metadata = {
  title: openDental.metaTitle,
  description:
    "Archived comparison. Review Oralstack's current Plato-connected product scope and rollout boundaries before procurement.",
  alternates: { canonical: `/compare/${openDental.slug}` },
};

export default function Page() {
  return <ComparisonPage data={openDental} />;
}
