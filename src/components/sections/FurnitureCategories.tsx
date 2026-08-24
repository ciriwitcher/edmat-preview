import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { staggerDelay } from "@/lib/stagger";
import catKuchnia from "@/assets/marketing/cat-kuchnia.jpg";
import catSzafy from "@/assets/marketing/cat-szafy.jpg";
import catSypialnia from "@/assets/marketing/cat-sypialnia.jpg";
import catBiuro from "@/assets/marketing/cat-biuro.jpg";
import catSalon from "@/assets/stock/salon.jpg";
import catLazienka from "@/assets/stock/lazienkowe.jpg";
import catPrzedpokoj from "@/assets/stock/przedpokoj.jpg";

type Category = {
  title: string;
  href: string;
  image: StaticImageData;
  isRealization: boolean;
};

const categories: Category[] = [
  { title: "Meble kuchenne", href: "/meble-na-wymiar/kuchenne", image: catKuchnia, isRealization: true },
  { title: "Szafy na wymiar", href: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy", image: catSzafy, isRealization: true },
  { title: "Meble do sypialni", href: "/meble-na-wymiar/do-sypialni", image: catSypialnia, isRealization: true },
  { title: "Meble biurowe", href: "/meble-na-wymiar/biurowe", image: catBiuro, isRealization: true },
  { title: "Meble do salonu", href: "/meble-na-wymiar/do-salonu", image: catSalon, isRealization: false },
  { title: "Meble łazienkowe", href: "/meble-na-wymiar/lazienkowe", image: catLazienka, isRealization: false },
  { title: "Meble do przedpokoju", href: "/meble-na-wymiar/do-przedpokoju", image: catPrzedpokoj, isRealization: false },
];

export function FurnitureCategories() {
  return (
    <section className="bg-paper-alt py-16 sm:py-24">
      <div className="container-edmat">
        <SectionHeading
          eyebrow="Meble na wymiar"
          title="Meble do każdego pomieszczenia"
          description="Każde wnętrze projektujemy indywidualnie — pod wymiary, sposób użytkowania i materiały, które już masz w domu."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.href} delay={staggerDelay(index)}>
              <Link
                href={category.href}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-line bg-ink"
              >
                <Image
                  src={category.image}
                  alt={category.isRealization ? `${category.title} na wymiar — realizacja EDMAT` : `${category.title} na wymiar`}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="relative z-10 p-4 font-display text-lg text-white sm:p-5 sm:text-xl">
                  {category.title}
                </span>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={staggerDelay(categories.length)}>
            <Link
              href="/meble-na-wymiar"
              className="group flex aspect-[4/5] flex-col justify-between border border-line bg-white p-4 transition-colors hover:border-accent sm:p-5"
            >
              <span className="text-sm text-ink-soft">Zobacz</span>
              <span className="inline-flex items-center gap-2 font-display text-lg text-ink group-hover:text-accent sm:text-xl">
                Cała oferta mebli
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
