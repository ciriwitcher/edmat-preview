import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/sections/ServiceLandingPage";
import { przedpokojContent } from "@/lib/content/furniture-services";
import { buildServiceMetadata, serviceJsonLd, JsonLdScript } from "@/lib/seo";

export const metadata: Metadata = buildServiceMetadata(przedpokojContent, "/meble-na-wymiar");

export default function Page() {
  return (
    <>
      <JsonLdScript data={serviceJsonLd(przedpokojContent, "/meble-na-wymiar")} />
      <ServiceLandingPage content={przedpokojContent} />
    </>
  );
}
