import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPublishedProjectSlugs, getAllPublishedPostSlugs, getAllActivePromotionSlugs } from "@/lib/queries";

const staticRoutes = [
  "",
  "/o-firmie",
  "/aktualnosci",
  "/promocje",
  "/najczestsze-pytania-faq",
  "/kontakt",
  "/mapa-witryny",
  "/realizacje",
  "/meble-na-wymiar",
  "/meble-na-wymiar/projektowanie",
  "/meble-na-wymiar/biurowe",
  "/meble-na-wymiar/kuchenne",
  "/meble-na-wymiar/lazienkowe",
  "/meble-na-wymiar/do-przedpokoju",
  "/meble-na-wymiar/do-salonu",
  "/meble-na-wymiar/do-sypialni",
  "/meble-na-wymiar/szafy-wnekowe-do-zabudowy",
  "/moskitiery",
  "/moskitiery/okienne",
  "/moskitiery/drzwiowe",
  "/moskitiery/ramkowe",
  "/moskitiery/rolowane",
  "/rolety",
  "/rolety/zewnetrzne",
  "/rolety/dzien-noc",
  "/rolety/rzymskie",
  "/rolety/dachowe",
  "/rolety/kasetowe",
  "/rolety/wolnowiszace",
  "/zaluzje",
  "/zaluzje/aluminiowe",
  "/zaluzje/drewniane",
  "/zaluzje/plisowane",
  "/zaluzje/pionowe",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, postSlugs, promotionSlugs] = await Promise.all([
    getAllPublishedProjectSlugs(),
    getAllPublishedPostSlugs(),
    getAllActivePromotionSlugs(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${siteConfig.url}/realizacje/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${siteConfig.url}/aktualnosci/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  const promotionEntries: MetadataRoute.Sitemap = promotionSlugs.map((slug) => ({
    url: `${siteConfig.url}/promocje/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...projectEntries, ...postEntries, ...promotionEntries];
}
