import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { okienneContent } from "@/lib/content/moskitiery-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(okienneContent, "/moskitiery");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(okienneContent, "/moskitiery")} />
      <ServiceLandingPage content={okienneContent} />
    </>
  );
}
