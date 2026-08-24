import type { ServicePageContent } from "@/lib/content/types";
import imgAluminiowe from "@/assets/stock/zaluzje-aluminiowe.jpg";
import imgDrewniane from "@/assets/stock/zaluzje-drewniane.jpg";
import imgPlisowane from "@/assets/stock/zaluzje-plisowane.jpg";
import imgPionowe from "@/assets/stock/zaluzje-pionowe.jpg";

const parent = { parentLabel: "Żaluzje", parentHref: "/zaluzje" };

const zaluzjeProcess = [
  { title: "Pomiar i dobór typu", description: "Dobieramy rodzaj żaluzji i szerokość lameli do typu okna." },
  { title: "Wycena", description: "Cena zależy od materiału, szerokości lameli i wymiarów okna." },
  { title: "Produkcja", description: "Realizacja zwykle w 1–3 tygodnie od zamówienia." },
  { title: "Montaż", description: "Montaż pojedynczej żaluzji trwa zwykle około 15 minut." },
];

const relatedZaluzje = [
  { label: "Żaluzje aluminiowe", href: "/zaluzje/aluminiowe" },
  { label: "Żaluzje drewniane", href: "/zaluzje/drewniane" },
  { label: "Żaluzje plisowane", href: "/zaluzje/plisowane" },
  { label: "Żaluzje pionowe", href: "/zaluzje/pionowe" },
  { label: "Rolety", href: "/rolety" },
  { label: "Moskitiery", href: "/moskitiery" },
];

function related(exceptHref: string) {
  return relatedZaluzje.filter((s) => s.href !== exceptHref);
}

const nietypoweFaq = {
  question: "Czy da się zamontować żaluzje na nietypowych oknach (owalne, skośne)?",
  answer:
    "Do okien owalnych i okrągłych stosujemy żaluzje pionowe lub zwijane zasłony materiałowe, a do okien skośnych — żaluzje plisowane lub pionowe, dobrane indywidualnie do kształtu okna.",
};

export const aluminioweContent: ServicePageContent = {
  ...parent,
  slug: "aluminiowe",
  title: "Żaluzje aluminiowe",
  heroImage: imgAluminiowe,
  heroImageAlt: "Żaluzje aluminiowe w oknie z widocznymi lamelami",
  eyebrow: "Osłony okienne · Żaluzje",
  metaDescription: "Żaluzje aluminiowe marki Anwis w Krośnie — lamele 16, 25 i 50 mm, prosta konstrukcja i długa żywotność.",
  intro:
    "Żaluzje aluminiowe łączą prostotę konstrukcji z długą żywotnością — skutecznie odbijają promienie słoneczne i dobrze sprawdzają się w mniejszych pomieszczeniach.",
  heroPattern: "slats-horizontal",
  applications: ["Kuchnie i łazienki", "Biura", "Mniejsze okna i pomieszczenia"],
  variants: [
    { title: "Lamele 16 mm", description: "Najdelikatniejsza, subtelna konstrukcja lameli." },
    { title: "Lamele 25 mm", description: "Uniwersalna, najczęściej wybierana szerokość." },
    { title: "Lamele 50 mm", description: "Wyraźniejsza struktura, sprawdza się w większych oknach." },
  ],
  advantages: [
    { title: "Odbijanie promieni słonecznych", description: "Aluminiowa powierzchnia lameli skutecznie odbija światło i ciepło." },
    { title: "Długa żywotność", description: "Odporność na wilgoć i łatwość czyszczenia sprawdzają się w kuchni i łazience." },
    { title: "Prosta konstrukcja", description: "Niezawodny mechanizm regulacji kąta nachylenia lameli i podnoszenia żaluzji." },
  ],
  process: zaluzjeProcess,
  faq: [nietypoweFaq],
  relatedServices: related("/zaluzje/aluminiowe"),
};

export const drewnianeContent: ServicePageContent = {
  ...parent,
  slug: "drewniane",
  title: "Żaluzje drewniane",
  heroImage: imgDrewniane,
  heroImageAlt: "Żaluzje drewniane zbliżenie na lamele",
  eyebrow: "Osłony okienne · Żaluzje",
  metaDescription: "Żaluzje drewniane marki Anwis w Krośnie — egzotyczne drewno Abachi i lipa, lamele 25 i 50 mm.",
  intro:
    "Żaluzje drewniane wykonane są z egzotycznego drewna (bazswood lub abachi) i nadają wnętrzu wyjątkowy, ciepły charakter — sprawdzają się zarówno w domach jednorodzinnych, jak i nowoczesnych biurach.",
  heroPattern: "slats-horizontal",
  applications: ["Domy jednorodzinne", "Nowoczesne biura", "Wnętrza z drewnianymi elementami wykończenia"],
  variants: [
    { title: "Lamele 25 mm", description: "Delikatniejsza struktura, dobrze komponuje się z mniejszymi oknami." },
    { title: "Lamele 50 mm", description: "Wyraźna, ciepła faktura drewna widoczna w większym formacie." },
  ],
  advantages: [
    { title: "Naturalny, ciepły charakter", description: "Drewno nadaje wnętrzu wyjątkową, niepowtarzalną atmosferę." },
    { title: "Wysoka jakość wykończenia", description: "Egzotyczne gatunki drewna dobrane pod kątem trwałości i estetyki." },
  ],
  process: zaluzjeProcess,
  faq: [nietypoweFaq],
  relatedServices: related("/zaluzje/drewniane"),
};

export const plisowaneContent: ServicePageContent = {
  ...parent,
  slug: "plisowane",
  title: "Żaluzje plisowane",
  heroImage: imgPlisowane,
  heroImageAlt: "Żaluzje plisowane na oknie w minimalistycznym wnętrzu",
  eyebrow: "Osłony okienne · Żaluzje",
  metaDescription: "Żaluzje plisowane marki Anwis w Krośnie — do okien nietypowych, skośnych i trudno dostępnych.",
  intro:
    "Żaluzje plisowane to jedno z najciekawszych rozwiązań wśród przesłon wewnętrznych — można je montować w oknach o nietypowych kształtach oraz w miejscach, gdzie klasyczne żaluzje się nie sprawdzają.",
  heroPattern: "pleated",
  applications: ["Okna skośne (poddasza)", "Okna trójkątne i trapezowe", "Okna dachowe i mansardowe"],
  variants: [
    { title: "Montaż stały", description: "Plisa zamontowana w stałej pozycji, dopasowana do kształtu okna." },
    { title: "Montaż z prowadnicami", description: "Umożliwia przesuwanie plisy wzdłuż prowadnic bocznych." },
  ],
  advantages: [
    { title: "Dopasowanie do nietypowych kształtów", description: "Sprawdza się w oknach trójkątnych, trapezowych i skośnych, gdzie inne osłony nie pasują." },
    { title: "Kompaktowa konstrukcja", description: "Materiał składa się w harmonijkę, zajmując niewiele miejsca po złożeniu." },
  ],
  process: zaluzjeProcess,
  faq: [nietypoweFaq],
  relatedServices: related("/zaluzje/plisowane"),
};

export const pionoweContent: ServicePageContent = {
  ...parent,
  slug: "pionowe",
  title: "Żaluzje pionowe",
  heroImage: imgPionowe,
  heroImageAlt: "Żaluzje pionowe na dużym przeszkleniu budynku",
  eyebrow: "Osłony okienne · Żaluzje",
  metaDescription: "Żaluzje pionowe (verticale) marki Anwis w Krośnie — do dużych przeszkleń i powierzchni podziału pomieszczeń.",
  intro:
    "Żaluzje pionowe (verticale) przeznaczone są przede wszystkim do dużych powierzchni przeszklonych oraz jako element podziału pomieszczeń, łącząc walory estetyczne z elastyczną regulacją światła.",
  heroPattern: "slats-vertical",
  applications: ["Duże przeszklenia i witryny", "Okna owalne i okrągłe", "Podział przestrzeni biurowej"],
  variants: [
    { title: "Lamele tekstylne", description: "Miękka faktura materiału, szeroka gama kolorów i wzorów." },
    { title: "Lamele PVC", description: "Odporne na wilgoć, łatwe w czyszczeniu." },
  ],
  advantages: [
    { title: "Sprawdzają się przy dużych przeszkleniach", description: "Skuteczna regulacja światła na szerokich powierzchniach okiennych." },
    { title: "Rozwiązanie do okien owalnych i okrągłych", description: "Jedna z niewielu osłon, którą można dopasować do nietypowego kształtu okna." },
  ],
  process: zaluzjeProcess,
  faq: [nietypoweFaq],
  relatedServices: related("/zaluzje/pionowe"),
};

export const zaluzjeSubServices: ServicePageContent[] = [
  aluminioweContent,
  drewnianeContent,
  plisowaneContent,
  pionoweContent,
];
