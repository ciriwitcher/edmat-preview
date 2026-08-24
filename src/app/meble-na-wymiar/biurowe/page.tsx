import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { biuroweContent } from "@/lib/content/furniture-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(biuroweContent, "/meble-na-wymiar");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(biuroweContent, "/meble-na-wymiar")} />
      <ServiceLandingPage content={biuroweContent} />
    </>
  );
}
