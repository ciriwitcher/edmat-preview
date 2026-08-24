import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { plisowaneContent } from "@/lib/content/zaluzje-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(plisowaneContent, "/zaluzje");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(plisowaneContent, "/zaluzje")} />
      <ServiceLandingPage content={plisowaneContent} />
    </>
  );
}
