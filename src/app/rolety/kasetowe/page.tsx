import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { kasetoweContent } from "@/lib/content/rolety-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(kasetoweContent, "/rolety");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(kasetoweContent, "/rolety")} />
      <ServiceLandingPage content={kasetoweContent} />
    </>
  );
}
