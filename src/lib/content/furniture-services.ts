import type { ServicePageContent } from "@/lib/content/types";
import catKuchnia from "@/assets/marketing/cat-kuchnia.jpg";
import catSzafy from "@/assets/marketing/cat-szafy.jpg";
import catSypialnia from "@/assets/marketing/cat-sypialnia.jpg";
import catBiuro from "@/assets/marketing/cat-biuro.jpg";
import stockLazienka from "@/assets/stock/lazienkowe.jpg";
import stockPrzedpokoj from "@/assets/stock/przedpokoj.jpg";
import stockSalon from "@/assets/stock/salon.jpg";
import stockProjektowanie from "@/assets/stock/projektowanie.jpg";

const parent = { parentLabel: "Meble na wymiar", parentHref: "/meble-na-wymiar" };

const materialyMeble = [
  "Laminat (krajowi i zagraniczni producenci)",
  "MDF lakierowany",
  "MDF foliowany",
  "Fornir naturalny",
  "Szkło hartowane (lacobel / lacomat)",
  "Aluminium",
  "Blaty kamienne i konglomeratowe",
];

const relatedMeble = [
  { label: "Meble kuchenne", href: "/meble-na-wymiar/kuchenne" },
  { label: "Szafy na wymiar", href: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy" },
  { label: "Meble do sypialni", href: "/meble-na-wymiar/do-sypialni" },
  { label: "Meble do salonu", href: "/meble-na-wymiar/do-salonu" },
  { label: "Meble łazienkowe", href: "/meble-na-wymiar/lazienkowe" },
  { label: "Meble do przedpokoju", href: "/meble-na-wymiar/do-przedpokoju" },
  { label: "Meble biurowe", href: "/meble-na-wymiar/biurowe" },
  { label: "Projektowanie mebli", href: "/meble-na-wymiar/projektowanie" },
];

function related(exceptHref: string) {
  return relatedMeble.filter((s) => s.href !== exceptHref);
}

export const kuchenneContent: ServicePageContent = {
  ...parent,
  slug: "kuchenne",
  title: "Meble kuchenne na wymiar",
  eyebrow: "Meble na wymiar",
  metaDescription:
    "Meble kuchenne na wymiar w Krośnie — projekt 3D, zabudowa AGD, blaty kamienne i laminowane, szkło hartowane z nadrukiem. Bezpłatny pomiar i wycena.",
  intro:
    "Kuchnia to miejsce, w którym spędza się najwięcej czasu w domu — projektujemy ją tak, by była funkcjonalna, wygodna w codziennym użytkowaniu i dopasowana do dostępnej przestrzeni co do centymetra.",
  heroImage: catKuchnia,
  heroImageAlt: "Kuchnia na wymiar zrealizowana przez EDMAT",
  applications: [
    "Kuchnie w mieszkaniach i domach jednorodzinnych",
    "Aneksy kuchenne otwarte na salon",
    "Zabudowa kuchni z wyspą lub półwyspem",
    "Zabudowa AGD (lodówka, piekarnik, mikrofalówka, płyta, okap)",
  ],
  variants: [
    { title: "Kuchnia liniowa", description: "Klasyczny układ wzdłuż jednej ściany, sprawdzający się w mniejszych pomieszczeniach." },
    { title: "Kuchnia w kształcie L", description: "Wykorzystuje narożnik pomieszczenia, zachowując wygodny trójkąt roboczy." },
    { title: "Kuchnia z wyspą lub półwyspem", description: "Dodatkowy blat roboczy lub miejsce do siedzenia w centralnej części pomieszczenia." },
    { title: "Panele ze szkła hartowanego", description: "Fronty i panele przyblatowe z lacobelu, także z nadrukiem według wybranego wzoru." },
    { title: "Oświetlenie funkcjonalne i dekoracyjne", description: "Podświetlenie blatu roboczego oraz szafek górnych i dolnych." },
    { title: "Zabudowa kaloryfera", description: "Ażurowy front maskujący grzejnik bez ograniczania jego działania." },
  ],
  advantages: [
    { title: "Zabudowa AGD w jednej linii", description: "Sprzęty wbudowane we fronty ograniczają gromadzenie się kurzu i ujednolicają wygląd kuchni." },
    { title: "Pełne wykorzystanie przestrzeni", description: "Meble projektowane pod rzeczywisty pomiar, bez marnowania miejsca w narożnikach i wnękach." },
    { title: "Szeroki wybór materiałów", description: "Od laminatów po fornir naturalny, szkło hartowane i blaty kamienne — dobrane do budżetu i stylu wnętrza." },
    { title: "Bezpłatny pomiar i projekt wstępny", description: "Podstawowy projekt i wizualizacja 3D nie generują kosztów, jeśli zdecydują się Państwo na realizację." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Ile kosztują meble kuchenne na wymiar?",
      answer:
        "Cena zależy od materiałów, systemów okuć, wybranego AGD i dodatkowych rozwiązań (np. oświetlenia czy szkła z nadrukiem). Najdokładniejszą wycenę przygotowujemy po bezpłatnym pomiarze i konsultacji.",
    },
    {
      question: "Ile trwa realizacja kuchni na wymiar?",
      answer: "Zwykle 4–6 tygodni od zatwierdzenia projektu, maksymalnie do 8 tygodni. Sam montaż standardowej kuchni trwa najczęściej do 2 dni.",
    },
    {
      question: "Czy mogę przynieść własny projekt kuchni?",
      answer: "Tak — wycenimy realizację projektu przygotowanego przez innego projektanta. Prosimy o kontakt telefoniczny lub wizytę w naszym biurze w Krośnie.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/kuchenne"),
  relatedProjectsCategory: "kuchnie",
};

export const szafyContent: ServicePageContent = {
  ...parent,
  slug: "szafy-wnekowe-do-zabudowy",
  title: "Szafy na wymiar i do zabudowy",
  eyebrow: "Meble na wymiar",
  metaDescription:
    "Szafy na wymiar do zabudowy i wnęk w Krośnie — drzwi przesuwne, uchylne i harmonijkowe, dowolna kolorystyka. Bezpłatny pomiar i projekt.",
  intro:
    "Niewielkie mieszkania oraz ciasne wnęki i garderoby skłaniają do inwestycji w praktyczne rozwiązania — szafa na wymiar pozwala w pełni wykorzystać dostępną przestrzeń i optycznie powiększyć pomieszczenie.",
  heroImage: catSzafy,
  heroImageAlt: "Szafa przesuwna na wymiar z nadrukiem graficznym, realizacja EDMAT",
  applications: [
    "Zabudowa wnęk i skosów poddasza",
    "Garderoby i szafy wolnostojące",
    "Szafy do przedpokoju, sypialni i pokoi dziecięcych",
    "Zabudowa pod schodami i w innych nietypowych przestrzeniach",
  ],
  variants: [
    { title: "Drzwi przesuwne", description: "Z progiem lub bez progu — oszczędzają miejsce potrzebne na otwarcie skrzydła." },
    { title: "Drzwi uchylne", description: "Klasyczne rozwiązanie, sprawdza się przy odpowiedniej przestrzeni przed szafą." },
    { title: "Drzwi składane (harmonijkowe)", description: "Bez progu, dobre rozwiązanie do węższych wnęk." },
    { title: "Fronty ze skosem", description: "Szafy dopasowane do skosu poddasza, z dopasowanym systemem prowadnic." },
    { title: "Fronty z nadrukiem", description: "Grafika na szkle lub płycie — indywidualny wygląd frontu szafy." },
  ],
  advantages: [
    { title: "Pełne wykorzystanie wnęki", description: "Meble mierzone i projektowane pod konkretne, często nietypowe wymiary pomieszczenia." },
    { title: "Wieloletnia gwarancja na system prowadnic", description: "Stosowane przez nas systemy okuć do drzwi przesuwnych objęte są gwarancją producenta (np. 5 lat)." },
    { title: "Dowolna kolorystyka i wypełnienie frontów", description: "Płyta, lacobel czy nadruk graficzny — dopasowane do stylu wnętrza." },
    { title: "Optyczne powiększenie pomieszczenia", description: "Frontowe lustra lub jasne kolory dodatkowo optycznie powiększają przestrzeń." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Czy szafa może mieć skośne drzwi dopasowane do poddasza?",
      answer: "Tak, projektujemy szafy z drzwiami przesuwnymi dopasowanymi do skosu dachu i innych nietypowych kształtów pomieszczenia.",
    },
    {
      question: "Jaka jest gwarancja na system drzwi przesuwnych?",
      answer: "Stosowane przez nas systemy prowadnic objęte są wieloletnią gwarancją producenta — szczegóły ustalamy przy konkretnym zamówieniu.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/szafy-wnekowe-do-zabudowy"),
  relatedProjectsCategory: "szafy",
};

export const sypialniaContent: ServicePageContent = {
  ...parent,
  slug: "do-sypialni",
  title: "Meble do sypialni na wymiar",
  eyebrow: "Meble na wymiar",
  metaDescription: "Meble do sypialni na wymiar w Krośnie — łóżka, komody i szafy dopasowane kolorystycznie do wnętrza.",
  intro:
    "Projektujemy komplety mebli do sypialni — łóżka, komody i szafy — dopasowane wymiarowo i kolorystycznie do pozostałych elementów wnętrza.",
  heroImage: catSypialnia,
  heroImageAlt: "Meble do sypialni na wymiar, realizacja EDMAT",
  applications: ["Sypialnie w mieszkaniach i domach", "Pokoje gościnne", "Komplety łóżko + komody + szafa"],
  variants: [
    { title: "Łóżko na wymiar", description: "Wymiary i wysokość dopasowane indywidualnie, z opcją półek i szuflad w zagłówku." },
    { title: "Komody z półkami otwartymi", description: "Łączą pojemne szuflady z otwartymi półkami na drobiazgi i dekoracje." },
    { title: "Szafa do sypialni", description: "Wolnostojąca lub wnękowa, z drzwiami przesuwnymi lub uchylnymi." },
  ],
  advantages: [
    { title: "Spójna kolorystyka kompletu", description: "Łóżko, komody i szafa wykonane z tych samych materiałów i w jednym odcieniu." },
    { title: "Dopasowanie do wymiarów pokoju", description: "Meble projektowane pod realny metraż, bez kompromisów typowych dla mebli gotowych." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Czy mogę zamówić tylko wybrane elementy, np. samą szafę?",
      answer: "Tak, każdy element — łóżko, komodę czy szafę — można zamówić osobno lub jako spójny komplet.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/do-sypialni"),
  relatedProjectsCategory: "sypialnie",
};

export const biuroweContent: ServicePageContent = {
  ...parent,
  slug: "biurowe",
  title: "Meble biurowe na wymiar",
  eyebrow: "Meble na wymiar",
  metaDescription: "Meble biurowe na wymiar w Krośnie — zabudowa biur, stanowisk obsługi klienta, biurek i szaf.",
  intro:
    "Projektujemy i wykonujemy meble do przestrzeni biurowych — od pojedynczych biurek i szaf, po pełną zabudowę recepcji i stanowisk obsługi klienta.",
  heroImage: catBiuro,
  heroImageAlt: "Zabudowa biura na wymiar, realizacja EDMAT",
  applications: [
    "Stanowiska obsługi klienta i recepcje",
    "Biurka i szafy do biur",
    "Zabudowy z przeszkleniami oddzielające strefy pracy",
  ],
  variants: [
    { title: "Lada recepcyjna / stanowisko obsługi", description: "Zabudowa z blatem, przeszkleniem i strefą dla klienta oraz pracownika." },
    { title: "Biurka na wymiar", description: "Dopasowane wymiarami i systemem przelotek kablowych do charakteru pracy." },
    { title: "Szafy biurowe", description: "Zamykane i otwarte, do przechowywania dokumentów i materiałów biurowych." },
  ],
  advantages: [
    { title: "Zabudowa dopasowana do metrażu biura", description: "Meble projektowane pod konkretną powierzchnię, z wykorzystaniem każdego zakamarka." },
    { title: "Trwałe materiały do intensywnej eksploatacji", description: "Płyty i okleiny odporne na częste użytkowanie typowe dla przestrzeni biurowej." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Czy wykonujecie Państwo zabudowę całego biura, nie tylko pojedynczych mebli?",
      answer: "Tak, projektujemy i montujemy kompleksową zabudowę biur, w tym stanowisk obsługi klienta z przeszkleniami.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/biurowe"),
  relatedProjectsCategory: "biura",
};

export const lazienkoweContent: ServicePageContent = {
  ...parent,
  slug: "lazienkowe",
  title: "Meble łazienkowe na wymiar",
  eyebrow: "Meble na wymiar",
  metaDescription: "Meble łazienkowe na wymiar w Krośnie — szafki podumywalkowe i wiszące dopasowane do wymiarów łazienki.",
  intro:
    "Meble łazienkowe projektujemy pod konkretny metraż i układ instalacji — tak, aby maksymalnie wykorzystać dostępną przestrzeń, często ograniczoną w tego typu pomieszczeniach.",
  heroImage: stockLazienka,
  heroImageAlt: "Meble łazienkowe na wymiar w nowoczesnej łazience",
  applications: ["Szafki podumywalkowe", "Szafki wiszące i słupki łazienkowe", "Zabudowa pralki i suszarki"],
  variants: [
    { title: "Szafka podumywalkowa", description: "Dopasowana do wybranej umywalki i syfonu, z szufladami lub drzwiami." },
    { title: "Szafki wiszące", description: "Optycznie odciążają pomieszczenie i ułatwiają utrzymanie czystości podłogi." },
  ],
  advantages: [
    { title: "Materiały odporne na wilgoć", description: "Dobór płyt i okleinowania odpowiednich do warunków panujących w łazience." },
    { title: "Dopasowanie do armatury", description: "Meble projektowane z uwzględnieniem umywalki, syfonu i innych elementów instalacji." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Czy meble łazienkowe są odporne na wilgoć?",
      answer: "Dobieramy materiały i okleiny przeznaczone do pomieszczeń o podwyższonej wilgotności — dobór omawiamy indywidualnie przy wycenie.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/lazienkowe"),
  relatedProjectsCategory: "lazienki",
};

export const przedpokojContent: ServicePageContent = {
  ...parent,
  slug: "do-przedpokoju",
  title: "Meble do przedpokoju na wymiar",
  eyebrow: "Meble na wymiar",
  metaDescription: "Meble do przedpokoju na wymiar w Krośnie — szafy, wieszaki i zabudowy dopasowane do wąskich korytarzy.",
  intro:
    "Przedpokój to zwykle najtrudniejsze wymiarowo pomieszczenie w mieszkaniu — projektujemy meble, które wykorzystują każdy dostępny centymetr, nie ograniczając komunikacji.",
  heroImage: stockPrzedpokoj,
  heroImageAlt: "Meble do przedpokoju na wymiar w nowoczesnym korytarzu",
  applications: ["Szafy wnękowe w wąskich korytarzach", "Zabudowa z miejscem na obuwie i odzież wierzchnią", "Wieszaki i półki na wymiar"],
  variants: [
    { title: "Szafa przesuwna", description: "Drzwi przesuwne nie wymagają przestrzeni na otwarcie skrzydła — sprawdzają się w wąskich korytarzach." },
    { title: "Zabudowa z otwartymi półkami", description: "Łączy zamykane schowki z łatwo dostępnym miejscem na obuwie." },
  ],
  advantages: [
    { title: "Dopasowanie do nietypowych wymiarów", description: "Przedpokoje często mają nieregularne kształty — projekt uwzględnia to od pierwszego pomiaru." },
    { title: "Oszczędność miejsca", description: "Systemy drzwi przesuwnych i harmonijkowych nie ograniczają szerokości korytarza." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Mój przedpokój jest bardzo wąski — czy da się w nim zmieścić szafę?",
      answer: "Tak, w wąskich korytarzach sprawdzają się drzwi przesuwne, które nie wymagają dodatkowej przestrzeni na otwarcie skrzydła.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/do-przedpokoju"),
  relatedProjectsCategory: "przedpokoje",
};

export const salonContent: ServicePageContent = {
  ...parent,
  slug: "do-salonu",
  title: "Meble do salonu na wymiar",
  eyebrow: "Meble na wymiar",
  metaDescription: "Meble do salonu na wymiar w Krośnie — zabudowy pod telewizor, regały i szafki RTV dopasowane do wnętrza.",
  intro:
    "Meble do salonu — zabudowy pod telewizor, regały i szafki RTV — projektujemy pod wymiary ściany i sposób organizacji przestrzeni dziennej.",
  heroImage: stockSalon,
  heroImageAlt: "Meble do salonu na wymiar w nowoczesnym wnętrzu",
  applications: ["Zabudowy pod telewizor", "Regały na wymiar", "Szafki RTV i witryny"],
  variants: [
    { title: "Zabudowa ścienna pod TV", description: "Łączy szafki, otwarte półki i miejsce na sprzęt RTV w jednej kompozycji." },
    { title: "Regał na wymiar", description: "Dopasowany wysokością i szerokością do konkretnej ściany lub wnęki." },
  ],
  advantages: [
    { title: "Ukryte okablowanie", description: "Systemy przelotek kablowych pozwalają schować przewody od sprzętu RTV." },
    { title: "Spójna kompozycja ściany", description: "Meble projektowane jako całość, dopasowana do pozostałych elementów salonu." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Czy można ukryć okablowanie od telewizora i sprzętu RTV?",
      answer: "Tak, w projekcie uwzględniamy przelotki kablowe i otwory montażowe pozwalające ukryć przewody.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/do-salonu"),
  relatedProjectsCategory: "salony",
};

export const projektowanieContent: ServicePageContent = {
  ...parent,
  slug: "projektowanie",
  title: "Projektowanie mebli na wymiar",
  eyebrow: "Meble na wymiar",
  metaDescription: "Projektowanie mebli na wymiar w Krośnie — bezpłatny pomiar, projekt komputerowy i wizualizacja 3D.",
  intro:
    "Projektowanie wnętrz to punkt wyjścia każdej realizacji EDMAT. Mierzymy pomieszczenie razem z Państwem, a następnie wspólnie ustalamy układ mebli w programie komputerowym, tak aby ostateczny efekt spełniał oczekiwania jeszcze przed rozpoczęciem produkcji.",
  heroImage: stockProjektowanie,
  heroImageAlt: "Projektowanie mebli na wymiar — praca nad projektem technicznym",
  applications: [
    "Projekt kuchni, szaf i zabudów na wymiar",
    "Wizualizacja 3D przed rozpoczęciem produkcji",
    "Dobór materiałów, kolorystyki i okuć",
  ],
  variants: [
    { title: "Pomiar na miejscu", description: "Bezpłatny pomiar pomieszczenia wykonywany przez naszego pracownika." },
    { title: "Projekt komputerowy", description: "Układ mebli przygotowany w programie komputerowym, z uwzględnieniem instalacji i AGD." },
    { title: "Wizualizacja 3D", description: "Poglądowa wizualizacja pozwalająca ocenić efekt przed złożeniem zamówienia." },
  ],
  advantages: [
    { title: "Bezpłatny projekt wstępny", description: "Podstawowy projekt i wizualizacja 3D są bezpłatne, jeśli zdecydują się Państwo na realizację." },
    { title: "Udział klienta w procesie projektowania", description: "Projekt można korygować na bieżąco, zanim trafi do produkcji." },
    { title: "Czas przygotowania do 7 dni", description: "Podstawowy projekt przygotowujemy zwykle w ciągu tygodnia od pomiaru." },
  ],
  materials: materialyMeble,
  faq: [
    {
      question: "Czy projekt i wizualizacja są płatne?",
      answer: "Podstawowy projekt oraz wizualizacja 3D są bezpłatne, jeśli zdecydują się Państwo na realizację mebli z EDMAT.",
    },
    {
      question: "Ile czasu zajmuje przygotowanie projektu?",
      answer: "Czas przygotowania podstawowego projektu zwykle nie przekracza 7 dni od pomiaru.",
    },
  ],
  relatedServices: related("/meble-na-wymiar/projektowanie"),
};

export const furnitureServices: ServicePageContent[] = [
  kuchenneContent,
  szafyContent,
  sypialniaContent,
  biuroweContent,
  lazienkoweContent,
  przedpokojContent,
  salonContent,
  projektowanieContent,
];
