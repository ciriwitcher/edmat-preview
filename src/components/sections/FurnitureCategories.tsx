import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import catKuchnia from "@/assets/marketing/cat-kuchnia.jpg";
import catSzafy from "@/assets/marketing/cat-szafy.jpg";
import catSypialnia from "@/assets/marketing/cat-sypialnia.jpg";

type Category = {
  title: string;
  href: string;
  image?: StaticImageData;
};

const categories: Category[] = [
  { title: "Meble kuchenne", href: "/meble-na-wymiar/kuchenne", image: catKuchnia },
  { title: "Szafy na wymiar", href: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy", image: catSzafy },
  { title: "Meble do sypialni", href: "/meble-na-wymiar/do-sypialni", image: catSypialnia },
  { title: "Meble do salonu", href: "/meble-na-wymiar/do-salonu" },
  { title: "Meble łazienkowe", href: "/meble-na-wymiar/lazienkowe" },
  { title: "Meble do przedpokoju", href: "/meble-na-wymiar/do-przedpokoju" },
  { title: "Meble biurowe", href: "/meble-na-wymiar/biurowe" },
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
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden border border-line bg-ink"
            >
              {category.image ? (
                <>
                  <Image
                    src={category.image}
                    alt={`${category.title} na wymiar — realizacja EDMAT`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#2a2622_0%,#201d1a_60%)]" />
              )}
              <span className="relative z-10 p-4 font-display text-lg text-white sm:p-5 sm:text-xl">
                {category.title}
              </span>
            </Link>
          ))}

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
        </div>
      </div>
    </section>
  );
}
