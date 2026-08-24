import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { ramkoweContent } from "@/lib/content/moskitiery-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(ramkoweContent, "/moskitiery");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(ramkoweContent, "/moskitiery")} />
      <ServiceLandingPage content={ramkoweContent} />
    </>
  );
}
