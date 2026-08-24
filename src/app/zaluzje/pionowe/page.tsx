import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { pionoweContent } from "@/lib/content/zaluzje-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(pionoweContent, "/zaluzje");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(pionoweContent, "/zaluzje")} />
      <ServiceLandingPage content={pionoweContent} />
    </>
  );
}
