import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { dentrix } from "@/content/comparisons/dentrix";

export const metadata: Metadata = {
  title: dentrix.metaTitle,
  description:
    "Archived comparison. Review Oralstack's current Plato-connected product scope and rollout boundaries before procurement.",
  alternates: { canonical: `/compare/${dentrix.slug}` },
};

export default function Page() {
  return <ComparisonPage data={dentrix} />;
}
