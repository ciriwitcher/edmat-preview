import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { zewnetrzneContent } from "@/lib/content/rolety-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(zewnetrzneContent, "/rolety");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(zewnetrzneContent, "/rolety")} />
      <ServiceLandingPage content={zewnetrzneContent} />
    </>
  );
}
