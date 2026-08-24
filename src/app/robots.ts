import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
