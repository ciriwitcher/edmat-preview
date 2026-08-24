import type { Metadata } from "next";
import { CategoryHubPage } from "@/components/sections/CategoryHubPage";
import { zaluzjeHub } from "@/lib/content/category-hubs";

export const metadata: Metadata = {
  title: zaluzjeHub.title,
  description: zaluzjeHub.metaDescription,
  alternates: { canonical: "/zaluzje" },
};

export default function Page() {
  return <CategoryHubPage content={zaluzjeHub} />;
}
