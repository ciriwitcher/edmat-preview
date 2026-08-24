import type { ServicePageContent } from "@/lib/content/types";

const parent = { parentLabel: "Moskitiery", parentHref: "/moskitiery" };

const moskitieryProcess = [
  { title: "Pomiar i dobór typu", description: "Dobieramy typ moskitiery do rodzaju okna lub drzwi." },
  { title: "Wycena", description: "Cena zależy od typu moskitiery i wymiarów otworu." },
  { title: "Produkcja", description: "Realizacja zwykle w 1–3 tygodnie od zamówienia." },
  { title: "Montaż", description: "Montaż nieinwazyjny, bez ingerencji w ramę okna czy drzwi." },
];

const relatedMoskitiery = [
  { label: "Moskitiery okienne", href: "/moskitiery/okienne" },
  { label: "Moskitiery drzwiowe", href: "/moskitiery/drzwiowe" },
  { label: "Moskitiery ramkowe", href: "/moskitiery/ramkowe" },
  { label: "Moskitiery rolowane", href: "/moskitiery/rolowane" },
  { label: "Rolety", href: "/rolety" },
  { label: "Żaluzje", href: "/zaluzje" },
];

function related(exceptHref: string) {
  return relatedMoskitiery.filter((s) => s.href !== exceptHref);
}

const laczenieFaq = {
  question: "Czy warto łączyć moskitiery z roletami lub żaluzjami?",
  answer:
    "Tak — połączenie tych produktów pozwala zaoszczędzić i zwiększa praktyczną użyteczność obu rozwiązań, ponieważ mogą być montowane razem bez wzajemnych kolizji.",
};

export const okienneContent: ServicePageContent = {
  ...parent,
  slug: "okienne",
  title: "Moskitiery okienne",
  eyebrow: "Osłony okienne · Moskitiery",
  metaDescription: "Moskitiery okienne marki Anwis w Krośnie — montaż bez ingerencji w ramę okna, obrotowe zaczepy.",
  intro:
    "Moskitiery okienne dopasowywane są do dowolnego otworu okiennego przy pomocy obrotowych, nieinwazyjnych zaczepów — montaż nie wymaga wiercenia ani trwałej ingerencji w ramę okna.",
  heroPattern: "mesh",
  applications: ["Okna PVC i drewniane", "Mieszkania i domy jednorodzinne"],
  variants: [
    { title: "Rama aluminiowa", description: "Lekka i trwała konstrukcja, odporna na warunki atmosferyczne." },
    { title: "Zaczepy obrotowe", description: "Pozwalają zdjąć moskitierę na zimę bez śladów na ramie okna." },
  ],
  advantages: [
    { title: "Montaż bez ingerencji w ramę okna", description: "Nieinwazyjne, obrotowe zaczepy nie zostawiają trwałych śladów po zdjęciu." },
    { title: "Współpraca z roletami i żaluzjami", description: "Nie koliduje z innymi systemami osłon zamontowanymi na tym samym oknie." },
    { title: "Pełna ochrona przed owadami", description: "Skutecznie chroni przed komarami, pyłkami i kurzem bez ograniczania widoczności." },
  ],
  process: moskitieryProcess,
  faq: [laczenieFaq],
  relatedServices: related("/moskitiery/okienne"),
};

export const drzwioweContent: ServicePageContent = {
  ...parent,
  slug: "drzwiowe",
  title: "Moskitiery drzwiowe",
  eyebrow: "Osłony okienne · Moskitiery",
  metaDescription: "Moskitiery drzwiowe marki Anwis w Krośnie — do drzwi balkonowych i tarasowych, konstrukcja aluminiowa.",
  intro:
    "Moskitiery drzwiowe projektowane są z myślą o dużych otworach — drzwiach balkonowych i tarasowych — zapewniając ochronę przed owadami bez ograniczania swobodnego przejścia.",
  heroPattern: "mesh",
  applications: ["Drzwi balkonowe", "Drzwi tarasowe", "Wejścia do domów jednorodzinnych"],
  variants: [
    { title: "Skrzydło zawiasowe", description: "Otwierane jak typowe drzwi, z samodomykaczem." },
    { title: "Wersja wzmocniona do dużych otworów", description: "Solidniejsza rama aluminiowa dla szerszych przejść." },
  ],
  advantages: [
    { title: "Swobodne przejście", description: "Konstrukcja nie ogranicza codziennego korzystania z drzwi balkonowych czy tarasowych." },
    { title: "Trwała rama aluminiowa", description: "Odporna na warunki atmosferyczne i częste użytkowanie." },
  ],
  process: moskitieryProcess,
  faq: [laczenieFaq],
  relatedServices: related("/moskitiery/drzwiowe"),
};

export const ramkoweContent: ServicePageContent = {
  ...parent,
  slug: "ramkowe",
  title: "Moskitiery ramkowe",
  eyebrow: "Osłony okienne · Moskitiery",
  metaDescription: "Moskitiery ramkowe marki Anwis w Krośnie — mocowanie do ramy okna lub drzwi, uszczelka zewnętrzna.",
  intro:
    "Moskitiery ramkowe montowane są bezpośrednio do ramy okna lub drzwi za pomocą obrotowych zaczepów, a specjalna uszczelka zewnętrzna dodatkowo domyka szczeliny wzdłuż krawędzi.",
  heroPattern: "mesh",
  applications: ["Okna i drzwi balkonowe", "Miejsca wymagające szczelnego domknięcia krawędzi"],
  variants: [
    { title: "Z uszczelką zewnętrzną", description: "Dodatkowo ogranicza szczeliny między moskitierą a ramą okna." },
    { title: "Rama w kolorze stolarki", description: "Dopasowanie koloru ramy do okna lub drzwi." },
  ],
  advantages: [
    { title: "Szczelne domknięcie krawędzi", description: "Uszczelka zewnętrzna ogranicza możliwość przedostania się owadów przy krawędziach." },
    { title: "Nieinwazyjny montaż", description: "Obrotowe zaczepy pozwalają zdjąć moskitierę bez trwałych śladów na ramie." },
  ],
  process: moskitieryProcess,
  faq: [laczenieFaq],
  relatedServices: related("/moskitiery/ramkowe"),
};

export const rolowaneContent: ServicePageContent = {
  ...parent,
  slug: "rolowane",
  title: "Moskitiery rolowane",
  eyebrow: "Osłony okienne · Moskitiery",
  metaDescription: "Moskitiery rolowane marki Anwis w Krośnie — wersja pozioma i pionowa z mechanizmem sprężynowym.",
  intro:
    "Moskitiery rolowane dostępne są w wersji poziomej i pionowej, z mechanizmem sprężynowym pozwalającym płynnie zwijać siatkę, gdy ochrona przed owadami nie jest akurat potrzebna.",
  heroPattern: "mesh",
  applications: ["Okna i drzwi balkonowe", "Miejsca, gdzie moskitiera ma być używana tylko okazjonalnie"],
  variants: [
    { title: "Wersja pozioma", description: "Siatka rozwijana w poziomie, np. w drzwiach balkonowych." },
    { title: "Wersja pionowa", description: "Siatka zwijana w pionie, np. w oknach." },
  ],
  advantages: [
    { title: "Mechanizm sprężynowy", description: "Płynne zwijanie i rozwijanie siatki bez dodatkowego wysiłku." },
    { title: "Estetyczny wygląd w spoczynku", description: "Zwinięta siatka jest praktycznie niewidoczna, gdy nie jest używana." },
  ],
  process: moskitieryProcess,
  faq: [laczenieFaq],
  relatedServices: related("/moskitiery/rolowane"),
};

export const moskitierySubServices: ServicePageContent[] = [
  okienneContent,
  drzwioweContent,
  ramkoweContent,
  rolowaneContent,
];
