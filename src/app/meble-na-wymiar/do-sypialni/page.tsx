import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { sypialniaContent } from "@/lib/content/furniture-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(sypialniaContent, "/meble-na-wymiar");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(sypialniaContent, "/meble-na-wymiar")} />
      <ServiceLandingPage content={sypialniaContent} />
    </>
  );
}
