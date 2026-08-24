import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { rzymskieContent } from "@/lib/content/rolety-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(rzymskieContent, "/rolety");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(rzymskieContent, "/rolety")} />
      <ServiceLandingPage content={rzymskieContent} />
    </>
  );
}
