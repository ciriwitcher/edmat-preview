import type { Metadata } from "next";
import { CategoryHubPage } from "@/components/sections/CategoryHubPage";
import { mebleNaWymiarHub } from "@/lib/content/category-hubs";

export const metadata: Metadata = {
  title: mebleNaWymiarHub.title,
  description: mebleNaWymiarHub.metaDescription,
  alternates: { canonical: "/meble-na-wymiar" },
};

export default function Page() {
  return <CategoryHubPage content={mebleNaWymiarHub} />;
}
