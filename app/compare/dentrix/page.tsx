import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { dentrix } from "@/content/comparisons/dentrix";

export const metadata: Metadata = {
  title: dentrix.metaTitle,
  description: dentrix.metaDescription,
  alternates: { canonical: `/compare/${dentrix.slug}` },
};

export default function Page() {
  return <ComparisonPage data={dentrix} />;
}
