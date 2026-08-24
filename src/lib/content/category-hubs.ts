import type { PatternVariant } from "@/lib/content/types";

export type CategoryHubItem = {
  title: string;
  description: string;
  href: string;
  pattern?: PatternVariant;
};

export type CategoryHubContent = {
  slug: string;
  title: string;
  eyebrow: string;
  metaDescription: string;
  intro: string;
  items: CategoryHubItem[];
  faq: { question: string; answer: string }[];
  showFeaturedProjects?: boolean;
};

export const mebleNaWymiarHub: CategoryHubContent = {
  slug: "meble-na-wymiar",
  title: "Meble na wymiar",
  eyebrow: "Oferta",
  metaDescription:
    "Meble na wymiar w Krośnie — kuchnie, szafy, sypialnie, łazienki, salony, przedpokoje i biura. Projekt 3D, produkcja i montaż w jednej firmie.",
  intro:
    "Projektujemy i wykonujemy meble do każdego pomieszczenia — od pomiaru i projektu komputerowego po produkcję i montaż na miejscu. Poniżej znajdą Państwo pełną ofertę mebli na wymiar.",
  items: [
    { title: "Meble kuchenne", description: "Zabudowa AGD, blaty kamienne i laminowane, szkło hartowane z nadrukiem.", href: "/meble-na-wymiar/kuchenne" },
    { title: "Szafy na wymiar", description: "Drzwi przesuwne, uchylne i harmonijkowe, do wnęk i skosów.", href: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy" },
    { title: "Meble do salonu", description: "Zabudowy pod TV, regały i szafki RTV na wymiar.", href: "/meble-na-wymiar/do-salonu" },
    { title: "Meble do sypialni", description: "Łóżka, komody i szafy w spójnej kolorystyce.", href: "/meble-na-wymiar/do-sypialni" },
    { title: "Meble łazienkowe", description: "Szafki podumywalkowe i wiszące odporne na wilgoć.", href: "/meble-na-wymiar/lazienkowe" },
    { title: "Meble do przedpokoju", description: "Zabudowy dopasowane do wąskich i nietypowych korytarzy.", href: "/meble-na-wymiar/do-przedpokoju" },
    { title: "Meble biurowe", description: "Biurka, szafy i stanowiska obsługi klienta.", href: "/meble-na-wymiar/biurowe" },
    { title: "Projektowanie mebli", description: "Bezpłatny pomiar, projekt komputerowy i wizualizacja 3D.", href: "/meble-na-wymiar/projektowanie" },
  ],
  faq: [
    {
      question: "Ile kosztują meble na wymiar?",
      answer:
        "Cena zależy od materiałów, wymiarów i wybranych rozwiązań — nie stosujemy jednego cennika. Dokładną wycenę przygotowujemy po bezpłatnym pomiarze.",
    },
    {
      question: "Ile trwa realizacja mebli na wymiar?",
      answer: "Zwykle 4–6 tygodni od zatwierdzenia projektu, maksymalnie do 8 tygodni.",
    },
    {
      question: "Jaki obszar obejmują Państwa usługi?",
      answer: "Realizujemy zlecenia głównie w Krośnie, Rzeszowie i na terenie województwa podkarpackiego.",
    },
  ],
  showFeaturedProjects: true,
};

export const roletyHub: CategoryHubContent = {
  slug: "rolety",
  title: "Rolety",
  eyebrow: "Osłony okienne",
  metaDescription: "Rolety na wymiar marki Anwis w Krośnie — zewnętrzne, dzień/noc, rzymskie, dachowe, kasetowe i wolnowiszące.",
  intro:
    "Rolety to eleganckie i praktyczne osłony okienne, wykonane z wysokiej jakości materiałów marki Anwis — skutecznie chronią przed nasłonecznieniem i są łatwe w codziennym użytkowaniu.",
  items: [
    { title: "Rolety zewnętrzne", description: "Ochrona przed słońcem, ciepłem i włamaniem. Gwarancja 36 miesięcy.", href: "/rolety/zewnetrzne", pattern: "roller" },
    { title: "Rolety dzień / noc", description: "Naprzemienne pasy materiału regulujące dopływ światła.", href: "/rolety/dzien-noc", pattern: "roller" },
    { title: "Rolety rzymskie", description: "Naturalny bambus, różne kolory i sploty.", href: "/rolety/rzymskie", pattern: "roller" },
    { title: "Rolety dachowe", description: "Do okien połaciowych, mechanizm samoblokujący.", href: "/rolety/dachowe", pattern: "roller" },
    { title: "Rolety kasetowe", description: "Boczne prowadnice ograniczające przenikanie światła.", href: "/rolety/kasetowe", pattern: "roller" },
    { title: "Rolety wolnowiszące", description: "Montaż na oknie, ścianie lub suficie.", href: "/rolety/wolnowiszace", pattern: "roller" },
  ],
  faq: [
    {
      question: "Ile trwa realizacja rolet?",
      answer: "Przeciętny czas oczekiwania wynosi od jednego do trzech tygodni, a montaż pojedynczej rolety zajmuje zwykle około 15 minut.",
    },
    {
      question: "Jaka gwarancja obowiązuje na rolety?",
      answer: "Na rolety zewnętrzne udzielamy 36-miesięcznej gwarancji, z wyłączeniem uszkodzeń mechanicznych i niewłaściwego użytkowania.",
    },
  ],
};

export const zaluzjeHub: CategoryHubContent = {
  slug: "zaluzje",
  title: "Żaluzje",
  eyebrow: "Osłony okienne",
  metaDescription: "Żaluzje na wymiar marki Anwis w Krośnie — aluminiowe, drewniane, plisowane i pionowe.",
  intro:
    "Żaluzje to uniwersalne osłony okienne pozwalające płynnie regulować kąt padania światła i zachować prywatność — dostępne w wersji aluminiowej, drewnianej, plisowanej i pionowej.",
  items: [
    { title: "Żaluzje aluminiowe", description: "Lamele 16, 25 i 50 mm — prosta konstrukcja, długa żywotność.", href: "/zaluzje/aluminiowe", pattern: "slats-horizontal" },
    { title: "Żaluzje drewniane", description: "Egzotyczne drewno, ciepły charakter wnętrza.", href: "/zaluzje/drewniane", pattern: "slats-horizontal" },
    { title: "Żaluzje plisowane", description: "Do okien nietypowych, skośnych i trudno dostępnych.", href: "/zaluzje/plisowane", pattern: "pleated" },
    { title: "Żaluzje pionowe", description: "Do dużych przeszkleń i podziału pomieszczeń.", href: "/zaluzje/pionowe", pattern: "slats-vertical" },
  ],
  faq: [
    {
      question: "Czy da się zamontować żaluzje na nietypowych oknach?",
      answer:
        "Tak. Do okien owalnych i okrągłych stosujemy żaluzje pionowe, a do okien skośnych — żaluzje plisowane lub pionowe, dobrane indywidualnie do kształtu okna.",
    },
  ],
};

export const moskitieryHub: CategoryHubContent = {
  slug: "moskitiery",
  title: "Moskitiery",
  eyebrow: "Osłony okienne",
  metaDescription: "Moskitiery na wymiar marki Anwis w Krośnie — okienne, drzwiowe, ramkowe i rolowane.",
  intro:
    "Moskitiery to ekologiczny i w pełni skuteczny sposób ochrony przed owadami, pyłkami i kurzem — montowane bez ingerencji w ramę okna czy drzwi, nie ograniczają widoczności.",
  items: [
    { title: "Moskitiery okienne", description: "Do dowolnego otworu okiennego, montaż na obrotowych zaczepach.", href: "/moskitiery/okienne", pattern: "mesh" },
    { title: "Moskitiery drzwiowe", description: "Do drzwi balkonowych i tarasowych, z samodomykaczem.", href: "/moskitiery/drzwiowe", pattern: "mesh" },
    { title: "Moskitiery ramkowe", description: "Uszczelka zewnętrzna dodatkowo domykająca krawędzie.", href: "/moskitiery/ramkowe", pattern: "mesh" },
    { title: "Moskitiery rolowane", description: "Wersja pozioma i pionowa z mechanizmem sprężynowym.", href: "/moskitiery/rolowane", pattern: "mesh" },
  ],
  faq: [
    {
      question: "Czy moskitiera uszkadza ramę okna?",
      answer: "Nie — stosujemy nieinwazyjne, obrotowe zaczepy, które nie zostawiają trwałych śladów na ramie okna.",
    },
    {
      question: "Czy warto łączyć moskitiery z roletami lub żaluzjami?",
      answer: "Tak, oba rozwiązania można montować razem bez wzajemnych kolizji, co zwiększa ich praktyczną użyteczność.",
    },
  ],
};
