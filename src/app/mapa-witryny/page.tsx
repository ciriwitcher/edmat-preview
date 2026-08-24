import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getPublishedProjects, getPublishedPosts, getActivePromotions, getArchivedPromotions } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Mapa witryny",
  description: "Pełna lista podstron serwisu EDMAT.",
  alternates: { canonical: "/mapa-witryny" },
};

const sections: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Firma",
    links: [
      { label: "Strona główna", href: "/" },
      { label: "O firmie", href: "/o-firmie" },
      { label: "Aktualności", href: "/aktualnosci" },
      { label: "Promocje", href: "/promocje" },
      { label: "Najczęstsze pytania (FAQ)", href: "/najczestsze-pytania-faq" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Meble na wymiar",
    links: [
      { label: "Meble na wymiar", href: "/meble-na-wymiar" },
      { label: "Projektowanie mebli", href: "/meble-na-wymiar/projektowanie" },
      { label: "Meble biurowe", href: "/meble-na-wymiar/biurowe" },
      { label: "Meble kuchenne", href: "/meble-na-wymiar/kuchenne" },
      { label: "Meble łazienkowe", href: "/meble-na-wymiar/lazienkowe" },
      { label: "Meble do przedpokoju", href: "/meble-na-wymiar/do-przedpokoju" },
      { label: "Meble do salonu", href: "/meble-na-wymiar/do-salonu" },
      { label: "Meble do sypialni", href: "/meble-na-wymiar/do-sypialni" },
      { label: "Szafy na wymiar / do zabudowy", href: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy" },
    ],
  },
  {
    title: "Moskitiery",
    links: [
      { label: "Moskitiery", href: "/moskitiery" },
      { label: "Moskitiery okienne", href: "/moskitiery/okienne" },
      { label: "Moskitiery drzwiowe", href: "/moskitiery/drzwiowe" },
      { label: "Moskitiery ramkowe", href: "/moskitiery/ramkowe" },
      { label: "Moskitiery rolowane", href: "/moskitiery/rolowane" },
    ],
  },
  {
    title: "Rolety",
    links: [
      { label: "Rolety", href: "/rolety" },
      { label: "Rolety zewnętrzne", href: "/rolety/zewnetrzne" },
      { label: "Rolety dzień / noc", href: "/rolety/dzien-noc" },
      { label: "Rolety rzymskie", href: "/rolety/rzymskie" },
      { label: "Rolety dachowe", href: "/rolety/dachowe" },
      { label: "Rolety kasetowe", href: "/rolety/kasetowe" },
      { label: "Rolety wolnowiszące", href: "/rolety/wolnowiszace" },
    ],
  },
  {
    title: "Żaluzje",
    links: [
      { label: "Żaluzje", href: "/zaluzje" },
      { label: "Żaluzje aluminiowe", href: "/zaluzje/aluminiowe" },
      { label: "Żaluzje drewniane", href: "/zaluzje/drewniane" },
      { label: "Żaluzje plisowane", href: "/zaluzje/plisowane" },
      { label: "Żaluzje pionowe", href: "/zaluzje/pionowe" },
    ],
  },
];

export default async function MapaWitrynyPage() {
  const [projects, posts, activePromotions, archivedPromotions] = await Promise.all([
    getPublishedProjects(),
    getPublishedPosts(),
    getActivePromotions(),
    getArchivedPromotions(),
  ]);

  const dynamicSections = [
    {
      title: "Realizacje",
      links: [
        { label: "Wszystkie realizacje", href: "/realizacje" },
        ...projects.map((project) => ({ label: project.title, href: `/realizacje/${project.slug}` })),
      ],
    },
    {
      title: "Aktualności",
      links: [
        { label: "Wszystkie aktualności", href: "/aktualnosci" },
        ...posts.map((post) => ({ label: post.title, href: `/aktualnosci/${post.slug}` })),
      ],
    },
    {
      title: "Promocje",
      links: [
        { label: "Wszystkie promocje", href: "/promocje" },
        ...activePromotions.map((promo) => ({ label: promo.title, href: `/promocje/${promo.slug}` })),
        ...archivedPromotions.map((promo) => ({ label: `${promo.title} (archiwalna)`, href: `/promocje/${promo.slug}` })),
      ],
    },
  ];

  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Mapa witryny" }]} />
        </div>
      </div>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-edmat">
          <h1 className="text-balance text-4xl sm:text-5xl">Mapa witryny</h1>
          <p className="mt-4 max-w-2xl text-ink-soft">Pełna lista podstron serwisu EDMAT.</p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[...sections, ...dynamicSections].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-ink-soft hover:text-accent">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
