import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { rolowaneContent } from "@/lib/content/moskitiery-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(rolowaneContent, "/moskitiery");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(rolowaneContent, "/moskitiery")} />
      <ServiceLandingPage content={rolowaneContent} />
    </>
  );
}
