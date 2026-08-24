import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { dachoweContent } from "@/lib/content/rolety-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(dachoweContent, "/rolety");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(dachoweContent, "/rolety")} />
      <ServiceLandingPage content={dachoweContent} />
    </>
  );
}
