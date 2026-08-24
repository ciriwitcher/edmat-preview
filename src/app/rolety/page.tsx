import type { Metadata } from "next";
import { CategoryHubPage } from "@/components/sections/CategoryHubPage";
import { roletyHub } from "@/lib/content/category-hubs";

export const metadata: Metadata = {
  title: roletyHub.title,
  description: roletyHub.metaDescription,
  alternates: { canonical: "/rolety" },
};

export default function Page() {
  return <CategoryHubPage content={roletyHub} />;
}
