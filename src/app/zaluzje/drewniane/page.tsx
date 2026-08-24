import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { drewnianeContent } from "@/lib/content/zaluzje-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(drewnianeContent, "/zaluzje");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(drewnianeContent, "/zaluzje")} />
      <ServiceLandingPage content={drewnianeContent} />
    </>
  );
}
