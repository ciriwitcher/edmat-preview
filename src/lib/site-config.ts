/**
 * Pojedyncze źródło prawdy dla danych firmy EDMAT.
 *
 * Wszystkie wartości pochodzą z audytu www.edmat.pl (sierpień 2026) i oficjalnych
 * podstron (O firmie, Kontakt, FAQ). Sprzeczności i braki są udokumentowane w
 * docs/content-verification-needed.md — NIE dodawaj tu żadnej wartości, która nie
 * jest potwierdzona w tym dokumencie lub bezpośrednio przez klienta.
 */

export const siteConfig = {
  name: "EDMAT",
  legalNameKnown: false, // pełna nazwa prawna nie została potwierdzona – patrz content-verification-needed.md
  tagline: "Meble na wymiar",
  foundedYear: 1992,
  url: "https://www.edmat.pl",

  description:
    "EDMAT – meble na wymiar oraz osłony okienne (rolety, żaluzje, moskitiery) w Krośnie. Projekt, produkcja i montaż od 1992 roku.",

  contact: {
    phone: "13 432 66 49",
    phoneHref: "tel:+48134326649",
    phoneMobile: "504 214 132",
    phoneMobileHref: "tel:+48504214132",
    phoneMobileContact: "Edward Barański",
    email: "biuro@edmat.pl",
    emailHref: "mailto:biuro@edmat.pl",
  },

  address: {
    street: "ul. Powstańców Warszawskich 2",
    postalCode: "38-400",
    city: "Krosno",
    region: "woj. podkarpackie",
    country: "PL",
    mapsQuery: "EDMAT, ul. Powstańców Warszawskich 2, 38-400 Krosno",
  },

  hours: [
    { days: "Poniedziałek – piątek", hours: "9:00 – 17:00" },
    { days: "Sobota – niedziela", hours: "nieczynne" },
  ],

  serviceArea: {
    primary: "Krosno",
    secondary: ["Rzeszów", "województwo podkarpackie"],
    note: "Realizacje głównie na terenie Krosna, Rzeszowa i województwa podkarpackiego.",
  },

  social: {
    facebook: "https://www.facebook.com/edmatkrosno",
  },

  geo: {
    // Przybliżone współrzędne centrum Krosna przy podanym adresie – do weryfikacji
    // dokładnego pinu przez klienta w Google Moja Firma.
    latitude: 49.6886,
    longitude: 21.7681,
  },
} as const;

export const navigationConfig = {
  main: [
    {
      label: "Meble na wymiar",
      href: "/meble-na-wymiar",
      megaMenu: {
        intro: {
          label: "Wszystkie meble na wymiar",
          href: "/meble-na-wymiar",
          description: "Projekt, produkcja i montaż mebli dopasowanych do wnętrza.",
        },
        columns: [
          {
            title: "Pomieszczenia",
            links: [
              { label: "Meble kuchenne", href: "/meble-na-wymiar/kuchenne" },
              { label: "Szafy na wymiar", href: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy" },
              { label: "Meble do salonu", href: "/meble-na-wymiar/do-salonu" },
              { label: "Meble do sypialni", href: "/meble-na-wymiar/do-sypialni" },
            ],
          },
          {
            title: "Więcej zastosowań",
            links: [
              { label: "Meble łazienkowe", href: "/meble-na-wymiar/lazienkowe" },
              { label: "Meble do przedpokoju", href: "/meble-na-wymiar/do-przedpokoju" },
              { label: "Meble biurowe", href: "/meble-na-wymiar/biurowe" },
              { label: "Projektowanie mebli", href: "/meble-na-wymiar/projektowanie" },
            ],
          },
        ],
      },
    },
    {
      label: "Osłony okienne",
      href: "/rolety",
      megaMenu: {
        intro: {
          label: "Wszystkie osłony okienne",
          href: "/rolety",
          description: "Rolety, żaluzje i moskitiery marki Anwis, dobrane do okna.",
        },
        columns: [
          {
            title: "Rolety",
            links: [
              { label: "Wszystkie rolety", href: "/rolety" },
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
              { label: "Wszystkie żaluzje", href: "/zaluzje" },
              { label: "Żaluzje aluminiowe", href: "/zaluzje/aluminiowe" },
              { label: "Żaluzje drewniane", href: "/zaluzje/drewniane" },
              { label: "Żaluzje plisowane", href: "/zaluzje/plisowane" },
              { label: "Żaluzje pionowe", href: "/zaluzje/pionowe" },
            ],
          },
          {
            title: "Moskitiery",
            links: [
              { label: "Wszystkie moskitiery", href: "/moskitiery" },
              { label: "Moskitiery okienne", href: "/moskitiery/okienne" },
              { label: "Moskitiery drzwiowe", href: "/moskitiery/drzwiowe" },
              { label: "Moskitiery ramkowe", href: "/moskitiery/ramkowe" },
              { label: "Moskitiery rolowane", href: "/moskitiery/rolowane" },
            ],
          },
        ],
      },
    },
    { label: "Realizacje", href: "/realizacje" },
    { label: "O firmie", href: "/o-firmie" },
    { label: "FAQ", href: "/najczestsze-pytania-faq" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  footerCompany: [
    { label: "O firmie", href: "/o-firmie" },
    { label: "Aktualności", href: "/aktualnosci" },
    { label: "Promocje", href: "/promocje" },
    { label: "FAQ", href: "/najczestsze-pytania-faq" },
    { label: "Realizacje", href: "/realizacje" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Mapa witryny", href: "/mapa-witryny" },
  ],
} as const;
