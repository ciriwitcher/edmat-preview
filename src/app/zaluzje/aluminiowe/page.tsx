import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { aluminioweContent } from "@/lib/content/zaluzje-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(aluminioweContent, "/zaluzje");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(aluminioweContent, "/zaluzje")} />
      <ServiceLandingPage content={aluminioweContent} />
    </>
  );
}
