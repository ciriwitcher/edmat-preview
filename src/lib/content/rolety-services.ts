import type { ServicePageContent } from "@/lib/content/types";

const parent = { parentLabel: "Rolety", parentHref: "/rolety" };

const roletyProcess = [
  { title: "Pomiar i dobór typu", description: "Ustalamy rodzaj rolety odpowiedni do typu okna i sposobu montażu." },
  { title: "Wycena", description: "Cena zależy od materiału, mechanizmu i wymiarów okna." },
  { title: "Produkcja", description: "Realizacja zwykle w 1–3 tygodnie od zamówienia." },
  { title: "Montaż", description: "Montaż pojedynczej rolety trwa zwykle około 15 minut." },
];

const relatedRolety = [
  { label: "Rolety zewnętrzne", href: "/rolety/zewnetrzne" },
  { label: "Rolety dzień / noc", href: "/rolety/dzien-noc" },
  { label: "Rolety rzymskie", href: "/rolety/rzymskie" },
  { label: "Rolety dachowe", href: "/rolety/dachowe" },
  { label: "Rolety kasetowe", href: "/rolety/kasetowe" },
  { label: "Rolety wolnowiszące", href: "/rolety/wolnowiszace" },
  { label: "Żaluzje", href: "/zaluzje" },
  { label: "Moskitiery", href: "/moskitiery" },
];

function related(exceptHref: string) {
  return relatedRolety.filter((s) => s.href !== exceptHref);
}

const gwarancjaFaq = {
  question: "Jaka gwarancja obowiązuje na rolety?",
  answer:
    "Na rolety zewnętrzne udzielamy 36-miesięcznej gwarancji. Nie obejmuje ona uszkodzeń mechanicznych oraz wynikających z niewłaściwego użytkowania.",
};

const cenaFaq = {
  question: "Ile kosztuje roleta na typowe okno?",
  answer:
    "Cena zależy od rodzaju rolety, materiału i wymiarów okna — nie stosujemy jednego cennika. Dokładną wycenę przygotowujemy indywidualnie po podaniu wymiarów lub po pomiarze na miejscu.",
};

export const zewnetrzneContent: ServicePageContent = {
  ...parent,
  slug: "zewnetrzne",
  title: "Rolety zewnętrzne",
  eyebrow: "Osłony okienne · Rolety",
  metaDescription: "Rolety zewnętrzne marki Anwis w Krośnie — ochrona przed słońcem, ciepłem i włamaniem. Gwarancja 36 miesięcy.",
  intro:
    "Rolety zewnętrzne montowane są na elewacji budynku i chronią wnętrze przed nasłonecznieniem, nadmiernym ciepłem oraz — dzięki solidnej konstrukcji — dodatkowo utrudniają włamanie i ograniczają straty ciepła zimą.",
  heroPattern: "roller",
  applications: ["Domy jednorodzinne", "Mieszkania na parterze i wyższych kondygnacjach", "Okna narażone na mocne nasłonecznienie"],
  variants: [
    { title: "Skrzynka podtynkowa", description: "Wbudowana w elewację, niewidoczna po zamontowaniu." },
    { title: "Skrzynka natynkowa", description: "Montowana na istniejącej elewacji, dostępna w kilku kolorach obudowy." },
    { title: "Napęd elektryczny lub korbowy", description: "Wybór mechanizmu podnoszenia dopasowany do preferencji i budżetu." },
  ],
  advantages: [
    { title: "Ochrona przed nasłonecznieniem i ciepłem", description: "Ogranicza nagrzewanie się pomieszczeń latem, zmniejszając potrzebę klimatyzacji." },
    { title: "Dodatkowa bariera przed włamaniem", description: "Solidna konstrukcja utrudnia dostęp do okna od zewnątrz." },
    { title: "Ograniczenie strat ciepła zimą", description: "Zamknięta roleta stanowi dodatkową izolację okna w chłodne dni." },
    { title: "36-miesięczna gwarancja", description: "Gwarancja producenta nie obejmuje uszkodzeń mechanicznych i niewłaściwego użytkowania." },
  ],
  process: roletyProcess,
  faq: [
    gwarancjaFaq,
    cenaFaq,
    {
      question: "Czy rolety zewnętrzne można zamontować na domu z ociepleniem i elewacją?",
      answer:
        "Tak, choć w takim przypadku widoczna będzie skrzynka i prowadnice rolety. Oferujemy różne kolory obudowy, aby możliwie dobrze dopasować ją do elewacji.",
    },
    {
      question: "Czy montaż uszkadza okna PCV lub ich gwarancję?",
      answer: "Prawidłowo wykonany montaż nie wpływa na funkcjonalność okna ani nie narusza jego gwarancji.",
    },
  ],
  relatedServices: related("/rolety/zewnetrzne"),
};

export const dzienNocContent: ServicePageContent = {
  ...parent,
  slug: "dzien-noc",
  title: "Rolety dzień / noc",
  eyebrow: "Osłony okienne · Rolety",
  metaDescription: "Rolety dzień/noc marki Anwis w Krośnie — naprzemienne pasy materiału regulujące dopływ światła.",
  intro:
    "Rolety dzień/noc to nowoczesne osłony łączące funkcje rolety, żaluzji i zasłony — naprzemienne pasy materiału pozwalają płynnie regulować ilość wpuszczanego światła, od pełnego zaciemnienia po delikatne rozproszenie.",
  heroPattern: "roller",
  applications: ["Salony i sypialnie", "Pomieszczenia biurowe", "Okna wymagające regulacji światła w ciągu dnia"],
  variants: [
    { title: "Wersja z pasami przezroczystymi i pełnymi", description: "Naprzemienne pasy pozwalają na płynne przejście od zasłonięcia do pełnego doświetlenia." },
    { title: "Montaż w ramie okna lub na ścianie", description: "Możliwość dopasowania do konstrukcji okna lub montażu nad wnęką okienną." },
  ],
  advantages: [
    { title: "Płynna regulacja światła", description: "Przesuwanie pasów materiału reguluje stopień doświetlenia bez pełnego zaciemnienia." },
    { title: "Estetyczna alternatywa dla zasłon", description: "Nowoczesny wygląd, łatwy w utrzymaniu czystości." },
  ],
  process: roletyProcess,
  faq: [cenaFaq, gwarancjaFaq],
  relatedServices: related("/rolety/dzien-noc"),
};

export const rzymskieContent: ServicePageContent = {
  ...parent,
  slug: "rzymskie",
  title: "Rolety rzymskie",
  eyebrow: "Osłony okienne · Rolety",
  metaDescription: "Rolety rzymskie z naturalnego bambusa marki Anwis w Krośnie — różne kolory i sploty.",
  intro:
    "Rolety rzymskie wykonane są z naturalnego bambusa w różnych kolorach i splotach — rozpraszają światło dzienne, jednocześnie ograniczając nasłonecznienie wnętrza, i wnoszą do pomieszczenia naturalny, ciepły charakter.",
  heroPattern: "roller",
  applications: ["Salony i jadalnie w stylu naturalnym", "Kuchnie", "Wnętrza z drewnianymi elementami wykończenia"],
  variants: [
    { title: "Splot gęsty", description: "Mocniej ogranicza dopływ światła i zapewnia większą prywatność." },
    { title: "Splot ażurowy", description: "Delikatnie rozprasza światło, zachowując naturalny charakter materiału." },
  ],
  advantages: [
    { title: "Naturalny materiał", description: "Bambus wnosi do wnętrza ciepły, naturalny charakter." },
    { title: "Rozpraszanie światła", description: "Ogranicza nasłonecznienie, nie zaciemniając pomieszczenia całkowicie." },
  ],
  process: roletyProcess,
  faq: [cenaFaq],
  relatedServices: related("/rolety/rzymskie"),
};

export const dachoweContent: ServicePageContent = {
  ...parent,
  slug: "dachowe",
  title: "Rolety dachowe",
  eyebrow: "Osłony okienne · Rolety",
  metaDescription: "Rolety dachowe marki Anwis w Krośnie — do okien dachowych drewnianych i PVC, mechanizm samoblokujący.",
  intro:
    "Rolety dachowe przeznaczone są do okien połaciowych — zarówno drewnianych, jak i PVC — i wyposażone są w mechanizm samoblokujący, pozwalający ustawić roletę w dowolnej, dogodnej pozycji.",
  heroPattern: "roller",
  applications: ["Poddasza użytkowe", "Okna połaciowe w domach jednorodzinnych"],
  variants: [
    { title: "Do okien drewnianych", description: "System montażowy dopasowany do ram okien dachowych z drewna." },
    { title: "Do okien PVC", description: "System montażowy dopasowany do ram okien dachowych z PVC." },
  ],
  advantages: [
    { title: "Mechanizm samoblokujący", description: "Pozwala zatrzymać roletę w dowolnej pozycji bez dodatkowych sznurków czy łańcuszków." },
    { title: "Dopasowanie do konkretnego modelu okna", description: "System montażowy dobierany pod markę i model okna dachowego." },
  ],
  process: roletyProcess,
  faq: [cenaFaq],
  relatedServices: related("/rolety/dachowe"),
};

export const kasetoweContent: ServicePageContent = {
  ...parent,
  slug: "kasetowe",
  title: "Rolety kasetowe",
  eyebrow: "Osłony okienne · Rolety",
  metaDescription: "Rolety kasetowe marki Anwis w Krośnie — prowadnice boczne i kaseta ograniczające przenikanie światła.",
  intro:
    "Rolety kasetowe wyposażone są w boczne prowadnice oraz kasetę osłaniającą zwinięty materiał, co ogranicza przenikanie światła po bokach i zapewnia płynne, ciche działanie mechanizmu.",
  heroPattern: "roller",
  applications: ["Okna, w których zależy na ograniczeniu światła bocznego", "Sypialnie i pokoje dziecięce"],
  variants: [
    { title: "Kaseta w kolorze ramy okna", description: "Dyskretne wykończenie dopasowane do stolarki okiennej." },
    { title: "Prowadnice boczne", description: "Ograniczają przenikanie światła wzdłuż krawędzi rolety." },
  ],
  advantages: [
    { title: "Ograniczenie światła bocznego", description: "Prowadnice boczne szczelniej domykają roletę niż rozwiązania bez kasety." },
    { title: "Estetyczna, zwarta konstrukcja", description: "Kaseta osłania zwinięty materiał, nadając całości uporządkowany wygląd." },
  ],
  process: roletyProcess,
  faq: [cenaFaq],
  relatedServices: related("/rolety/kasetowe"),
};

export const wolnowiszaceContent: ServicePageContent = {
  ...parent,
  slug: "wolnowiszace",
  title: "Rolety wolnowiszące",
  eyebrow: "Osłony okienne · Rolety",
  metaDescription: "Rolety wolnowiszące marki Anwis w Krośnie — montaż na oknie, ścianie lub suficie, mechanizm łańcuszkowy lub elektryczny.",
  intro:
    "Rolety wolnowiszące to uniwersalne rozwiązanie, które można zamontować na oknie, ścianie lub suficie — sprawdzają się tam, gdzie inne typy rolet nie pasują konstrukcyjnie do okna.",
  heroPattern: "roller",
  applications: ["Nietypowe okna i przeszklenia", "Montaż sufitowy nad dużymi przeszkleniami", "Drzwi balkonowe i tarasowe"],
  variants: [
    { title: "Mechanizm łańcuszkowy", description: "Ręczna regulacja za pomocą łańcuszka bocznego." },
    { title: "Mechanizm elektryczny", description: "Sterowanie elektryczne, wygodne przy większych i cięższych roletach." },
  ],
  advantages: [
    { title: "Uniwersalny montaż", description: "Możliwość montażu na oknie, ścianie lub suficie — bez ingerencji w konstrukcję okna." },
    { title: "Sprawdza się przy dużych przeszkleniach", description: "Dobre rozwiązanie tam, gdzie klasyczna roleta kasetowa się nie sprawdzi." },
  ],
  process: roletyProcess,
  faq: [cenaFaq],
  relatedServices: related("/rolety/wolnowiszace"),
};

export const roletySubServices: ServicePageContent[] = [
  zewnetrzneContent,
  dzienNocContent,
  rzymskieContent,
  dachoweContent,
  kasetoweContent,
  wolnowiszaceContent,
];
