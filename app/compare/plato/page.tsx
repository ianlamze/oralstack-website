import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { plato } from "@/content/comparisons/plato";

export const metadata: Metadata = {
  title: plato.metaTitle,
  description: plato.metaDescription,
  alternates: { canonical: `/compare/${plato.slug}` },
};

export default function Page() {
  return <ComparisonPage data={plato} />;
}
