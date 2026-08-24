import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { projektowanieContent } from "@/lib/content/furniture-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(projektowanieContent, "/meble-na-wymiar");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(projektowanieContent, "/meble-na-wymiar")} />
      <ServiceLandingPage content={projektowanieContent} />
    </>
  );
}
