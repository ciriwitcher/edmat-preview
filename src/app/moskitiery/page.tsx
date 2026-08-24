import type { Metadata } from "next";
import { CategoryHubPage } from "@/components/sections/CategoryHubPage";
import { moskitieryHub } from "@/lib/content/category-hubs";

export const metadata: Metadata = {
  title: moskitieryHub.title,
  description: moskitieryHub.metaDescription,
  alternates: { canonical: "/moskitiery" },
};

export default function Page() {
  return <CategoryHubPage content={moskitieryHub} />;
}
