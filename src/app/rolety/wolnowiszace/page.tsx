import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { wolnowiszaceContent } from "@/lib/content/rolety-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(wolnowiszaceContent, "/rolety");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(wolnowiszaceContent, "/rolety")} />
      <ServiceLandingPage content={wolnowiszaceContent} />
    </>
  );
}
