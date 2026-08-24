export type FaqGroup = {
  title: string;
  slug: string;
  items: { question: string; answer: string }[];
};

/**
 * Treść oparta na /najczestsze-pytania-faq z www.edmat.pl, przeredagowana dla
 * czytelności. Żadne pytanie ani odpowiedź nie zostały usunięte względem
 * oryginału — patrz docs/legacy-url-inventory.md.
 */
export const faqGroups: FaqGroup[] = [
  {
    title: "Meble na wymiar",
    slug: "meble-na-wymiar",
    items: [
      {
        question: "Jakie doświadczenie ma EDMAT w produkcji mebli na wymiar?",
        answer:
          "Zajmujemy się projektowaniem, produkcją i montażem mebli na wymiar od 1992 roku — realizujemy meble kuchenne, szafy i zabudowy dla klientów indywidualnych i firm z Krosna, Rzeszowa oraz całego Podkarpacia.",
      },
      {
        question: "Jaki obszar obejmują Państwa usługi?",
        answer:
          "Realizujemy zlecenia przede wszystkim w Krośnie, Rzeszowie i na terenie województwa podkarpackiego. W indywidualnych przypadkach jesteśmy w stanie zrealizować projekt również poza tym obszarem — prosimy o kontakt telefoniczny w celu ustalenia szczegółów.",
      },
      {
        question: "Ile kosztują meble kuchenne za metr bieżący?",
        answer:
          "Nie podajemy sztywnego cennika za metr, ponieważ ostateczna cena zależy od wybranych materiałów, systemów okuć, sprzętu AGD i dodatkowych rozwiązań. Najdokładniejszą wycenę otrzymają Państwo po bezpłatnym pomiarze i konsultacji w naszym salonie w Krośnie.",
      },
      {
        question: "Z jakich materiałów wykonują Państwo meble kuchenne?",
        answer:
          "Pracujemy m.in. na frontach lakierowanych MDF, laminatach, naturalnym fornirze, aluminium, szkle hartowanym (lacobel), a blaty wykonujemy także z kamienia i konglomeratu.",
      },
      {
        question: "Ile kosztuje i ile trwa przygotowanie projektu mebli?",
        answer:
          "Podstawowy projekt oraz wizualizacja 3D są bezpłatne, jeśli zdecydują się Państwo na realizację z EDMAT. Czas przygotowania podstawowego projektu zwykle nie przekracza 7 dni.",
      },
      {
        question: "Ile trwa produkcja i montaż mebli na wymiar?",
        answer:
          "Maksymalny czas realizacji to zwykle do 8 tygodni, jednak w większości przypadków mieści się on w przedziale 4–6 tygodni, licząc od zatwierdzenia projektu.",
      },
      {
        question: "Ile trwa montaż gotowych mebli kuchennych?",
        answer:
          "Montaż standardowej kuchni najczęściej zajmuje do 2 dni. Większe lub bardziej złożone projekty mogą wymagać 3–4 dni.",
      },
      {
        question: "Czy oferujecie Państwo także inne meble poza kuchennymi?",
        answer:
          "Tak — projektujemy i wykonujemy również meble do sypialni, pokoi dziecięcych, szafy na wymiar oraz meble łazienkowe i inne meble pokojowe, zgodnie z indywidualnymi potrzebami klienta.",
      },
      {
        question: "Gdzie mogę zobaczyć przykładowe realizacje?",
        answer:
          "Przykłady naszych realizacji można obejrzeć w siedzibie firmy w Krośnie przy ul. Powstańców Warszawskich 2 lub w galerii realizacji na tej stronie.",
      },
      {
        question: "Czy możecie wycenić projekt kuchni przygotowany przez innego projektanta?",
        answer:
          "Tak. Prosimy o kontakt telefoniczny lub wizytę w naszym biurze w Krośnie z gotowym projektem — przygotujemy szczegółową wycenę jego realizacji.",
      },
    ],
  },
  {
    title: "Osłony okienne",
    slug: "oslony-okienne",
    items: [
      {
        question: "Ile trwa realizacja rolet, żaluzji lub moskitier?",
        answer:
          "Przeciętny czas oczekiwania na wykonanie i montaż osłon okiennych wynosi od jednego do trzech tygodni. Montaż pojedynczej rolety lub żaluzji trwa zwykle około 15 minut.",
      },
      {
        question: "Ile kosztuje roleta na typowe okno?",
        answer:
          "Cena zależy od rodzaju rolety, materiału i wymiarów okna — nie stosujemy jednego cennika. Dokładną wycenę przygotowujemy indywidualnie po podaniu wymiarów lub po pomiarze na miejscu.",
      },
      {
        question: "Jaka gwarancja obowiązuje na rolety?",
        answer:
          "Na rolety zewnętrzne udzielamy 36-miesięcznej gwarancji. Gwarancja nie obejmuje uszkodzeń mechanicznych oraz wynikających z niewłaściwego użytkowania.",
      },
      {
        question: "Czy rolety zewnętrzne można zamontować na domu z ociepleniem i elewacją?",
        answer:
          "Tak, choć w takim przypadku widoczna będzie skrzynka i prowadnice rolety. Oferujemy różne kolory obudowy, aby możliwie dobrze dopasować ją do elewacji.",
      },
      {
        question: "Czy da się zamontować osłony na nietypowych oknach (owalne, skośne)?",
        answer:
          "Tak. Do okien owalnych i okrągłych stosujemy żaluzje pionowe lub zwijane zasłony materiałowe, a do okien skośnych — żaluzje plisowane lub pionowe, dobrane indywidualnie do kształtu okna.",
      },
      {
        question: "Czy montaż rolet/żaluzji uszkadza okna PCV lub ich gwarancję?",
        answer:
          "Prawidłowo wykonany montaż nie wpływa na funkcjonalność okna ani nie narusza jego gwarancji.",
      },
      {
        question: "Czy warto łączyć moskitiery z roletami lub żaluzjami?",
        answer:
          "Tak — połączenie tych produktów pozwala zaoszczędzić i zwiększa praktyczną użyteczność obu rozwiązań, ponieważ mogą być montowane razem bez wzajemnych kolizji.",
      },
    ],
  },
];

export const faqTeaserItems = [
  faqGroups[0].items[0],
  faqGroups[0].items[4],
  faqGroups[1].items[0],
  faqGroups[1].items[2],
];
