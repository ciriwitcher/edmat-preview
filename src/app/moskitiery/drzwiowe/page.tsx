import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { drzwioweContent } from "@/lib/content/moskitiery-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(drzwioweContent, "/moskitiery");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(drzwioweContent, "/moskitiery")} />
      <ServiceLandingPage content={drzwioweContent} />
    </>
  );
}
