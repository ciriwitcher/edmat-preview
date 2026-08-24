import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { szafyContent } from "@/lib/content/furniture-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(szafyContent, "/meble-na-wymiar");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(szafyContent, "/meble-na-wymiar")} />
      <ServiceLandingPage content={szafyContent} />
    </>
  );
}
