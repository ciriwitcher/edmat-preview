import type { Metadata } from "next";
import type { ServicePageContent } from "@/lib/content/types";
import { siteConfig } from "@/lib/site-config";

export function buildServiceMetadata(content: ServicePageContent, pathPrefix: string): Metadata {
  const canonical = `${pathPrefix}/${content.slug}`;
  return {
    title: content.title,
    description: content.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: canonical,
      type: "website",
    },
  };
}

export function serviceJsonLd(content: ServicePageContent, pathPrefix: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.title,
    description: content.metaDescription,
    url: `${siteConfig.url}${pathPrefix}/${content.slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.contact.phoneHref.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        postalCode: siteConfig.address.postalCode,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
    },
    areaServed: [siteConfig.serviceArea.primary, ...siteConfig.serviceArea.secondary],
  };
}

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
