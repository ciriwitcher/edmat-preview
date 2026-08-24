# Inventory URL – obecna strona edmat.pl

Data audytu: 2026-08-24
Źródła: https://www.edmat.pl, https://www.edmat.pl/mapa-witryny, przejście po podstronach.

Legenda kategorii:
- **usługowa** – strona opisująca konkretną usługę/produkt (ma wartość SEO, generuje zapytania)
- **kategoria** – strona nadrzędna grupująca podstrony usługowe
- **realizacja** – pojedyncza podstrona portfolio
- **aktualność** – wpis na blogu/aktualnościach
- **promocja** – strona promocji
- **informacyjna** – FAQ, o firmie
- **kontakt** – dane kontaktowe / formularz
- **inne** – mapa witryny, strona główna

| Stary URL | Etykieta w menu / treści | Kategoria | Status w nowej stronie |
|---|---|---|---|
| `/` | Strona główna | inne | Zachowany – nowy Home |
| `/o-firmie` | O firmie | informacyjna | Zachowany – ten sam URL |
| `/aktualnosci` | Aktualności | inne (lista) | Zachowany – ten sam URL |
| `/promocje` | Promocje | inne (lista) | Zachowany – ten sam URL |
| `/najczestsze-pytania-faq` | Najczęstsze pytania FAQ | informacyjna | Zachowany – ten sam URL |
| `/realizacje` | Realizacje | inne (lista) | Zachowany – ten sam URL |
| `/kontakt` | Kontakt | kontakt | Zachowany – ten sam URL |
| `/mapa-witryny` | Mapa witryny | inne | Zastąpiona przez `sitemap.xml` (XML) – patrz uwaga niżej |
| `/meble-na-wymiar/` | Meble na wymiar | kategoria | Zachowany – ten sam URL |
| `/meble-na-wymiar/projektowanie` | Projektowanie mebli | usługowa | Zachowany – ten sam URL |
| `/meble-na-wymiar/biurowe` | Meble biurowe | usługowa | Zachowany – ten sam URL |
| `/meble-na-wymiar/kuchenne` | Meble kuchenne | usługowa | Zachowany – ten sam URL |
| `/meble-na-wymiar/lazienkowe` | Meble łazienkowe | usługowa | Zachowany – ten sam URL |
| `/meble-na-wymiar/do-przedpokoju` | Meble do przedpokoju | usługowa | Zachowany – ten sam URL |
| `/meble-na-wymiar/do-salonu` | Meble do salonu | usługowa | Zachowany – ten sam URL |
| `/meble-na-wymiar/do-sypialni` | Meble do sypialni | usługowa | Zachowany – ten sam URL |
| `/meble-na-wymiar/szafy-wnekowe-do-zabudowy` | Szafy na wymiar / do zabudowy | usługowa | Zachowany – ten sam URL |
| `/moskitiery/` | Moskitiery | kategoria | Zachowany – ten sam URL |
| `/moskitiery/okienne` | Moskitiery okienne | usługowa | Zachowany – ten sam URL |
| `/moskitiery/drzwiowe` | Moskitiery drzwiowe | usługowa | Zachowany – ten sam URL |
| `/moskitiery/ramkowe` | Moskitiery ramkowe | usługowa | Zachowany – ten sam URL |
| `/moskitiery/rolowane` | Moskitiery rolowane | usługowa | Zachowany – ten sam URL |
| `/rolety/` | Rolety | kategoria | Zachowany – ten sam URL |
| `/rolety/zewnetrzne` | Rolety zewnętrzne | usługowa | Zachowany – ten sam URL |
| `/rolety/dzien-noc` | Rolety dzień / noc | usługowa | Zachowany – ten sam URL |
| `/rolety/rzymskie` | Rolety rzymskie | usługowa | Zachowany – ten sam URL |
| `/rolety/dachowe` | Rolety dachowe | usługowa | Zachowany – ten sam URL |
| `/rolety/kasetowe` | Rolety kasetowe | usługowa | Zachowany – ten sam URL |
| `/rolety/wolnowiszace` | Rolety wolnowiszące | usługowa | Zachowany – ten sam URL |
| `/zaluzje/` | Żaluzje | kategoria | Zachowany – ten sam URL |
| `/zaluzje/aluminiowe` | Żaluzje aluminiowe | usługowa | Zachowany – ten sam URL |
| `/zaluzje/drewniane` | Żaluzje drewniane | usługowa | Zachowany – ten sam URL |
| `/zaluzje/plisowane` | Żaluzje plisowane | usługowa | Zachowany – ten sam URL |
| `/zaluzje/pionowe` | Żaluzje pionowe | usługowa | Zachowany – ten sam URL |
| `/aktualnosci/kolejne-inwestycje-zakonczone` | Kolejne inwestycje zakończone | aktualność | Migrowany jako wpis archiwalny w CMS, ten sam slug |
| `/aktualnosci/edmat-na-portalach-spolecznosciowych` | Edmat na portalach społecznościowych | aktualność | Migrowany jako wpis archiwalny w CMS, ten sam slug |
| `/aktualnosci/otwarcie-strony-firmowej` | Otwarcie strony firmowej | aktualność | Migrowany jako wpis archiwalny w CMS, ten sam slug |
| `/promocje/aktualne-promocje` | Aktualne Promocje | promocja | **Nieaktualna treść (stara promocja z przeszłości)** – URL zachowany, ale strona nie prezentuje jej jako bieżącej; patrz redirect-map |
| `/promocje/10-procentowy-rabat-na-meble-kuchenne-tylko-do-konca-lutego-2015` | 10% rabat na meble kuchenne (luty 2015) | promocja | **Promocja historyczna (2015), dawno wygasła** – patrz redirect-map |
| `/realizacje/parawan-do-restauracji` | Parawan do restauracji | realizacja | Migrowana – ten sam slug, 3 zdjęcia oryginalne |
| `/realizacje/kuchnia-frezowane-uchwyty-zolto-zielona` | Kuchnia frezowane uchwyty żółto-zielona | realizacja | Migrowana – ten sam slug, 8 zdjęć oryginalnych |
| `/realizacje/lozko-komoda-i-szafa-do-sypialni` | Łóżko, komoda i szafa do sypialni | realizacja | Migrowana – ten sam slug, 6 zdjęć oryginalnych |
| `/realizacje/kuchnia-biala-z-fornirem` | Kuchnia biała z fornirem | realizacja | Migrowana – ten sam slug, 6 zdjęć oryginalnych |
| `/realizacje/kuchnia-biala-zabudowa-kaloryfera` | Kuchnia biała, zabudowa kaloryfera | realizacja | Migrowana – ten sam slug, 4 zdjęcia oryginalne |
| `/realizacje/kuchnia-ze-szklem-hartowanym-i-grafika` | Kuchnia ze szkłem hartowanym i grafiką | realizacja | Migrowana – ten sam slug, 2 zdjęcia oryginalne |
| `/realizacje/zabudowa-biura` | Zabudowa biura | realizacja | Migrowana – ten sam slug, 11 zdjęć oryginalnych |
| `/realizacje/szafa-przesuwna-z-grafika` | Szafa przesuwna z grafiką | realizacja | Migrowana – ten sam slug, 4 zdjęcia oryginalne |
| `/realizacje/szafa-przesuwna-ze-skosem` | Szafa przesuwna ze skosem | realizacja | Migrowana – ten sam slug, 4 zdjęcia oryginalne |
| `/realizacje/kuchnia-biala-dab-wyspa` | Kuchnia biała dąb z wyspą | realizacja | Migrowana – ten sam slug, 15 zdjęć oryginalnych |
| `/realizacje/meble-kuchenne-w-kolorze-bialym-z-limonka` | Meble kuchenne białe z limonką | realizacja | Migrowana – ten sam slug, 15 zdjęć oryginalnych |
| `/realizacje/kuchnia-w-kolorach-fino-biala` | Kuchnia w kolorach Fino-Biała | realizacja | Migrowana – ten sam slug, 5 zdjęć oryginalnych |
| `/realizacje/meble-kuchenne-w-krosnie` | Meble kuchenne w Krośnie | realizacja | Migrowana – ten sam slug, 4 zdjęcia oryginalne |

## Uwaga dot. `/mapa-witryny`

Stara strona posiadała HTML-ową „mapę witryny” (`/mapa-witryny`) jako czytelną dla użytkownika listę linków. Nowy serwis:
- zachowuje `/mapa-witryny` jako prostą, użyteczną dla człowieka stronę HTML z linkami do wszystkich sekcji (dobra praktyka UX/SEO, niski koszt utrzymania tego adresu),
- dodatkowo generuje właściwy, zgodny ze standardem `sitemap.xml` dla wyszukiwarek (`/sitemap.xml`), którego stara strona nie posiadała w tej formie.

## Podsumowanie liczby podstron

- Strony stałe (kod): 8
- Kategorie mebli + osłon okiennych: 3 (meble-na-wymiar, moskitiery, rolety, zaluzje – 4 strony kategorii)
- Podstrony usługowe mebli: 8
- Podstrony usługowe osłon okiennych: 15
- Aktualności: 3 (dane startowe w CMS)
- Promocje: 2 (dane startowe w CMS, obie nieaktywne/historyczne)
- Realizacje: 13 (dane startowe w CMS, wszystkie z oryginalnymi zdjęciami – 87 zdjęć łącznie)

**Żaden z powyższych adresów nie zostaje usunięty ani zastąpiony 404.** Wszystkie zachowują dokładnie ten sam pathname w nowej architekturze Next.js App Router.
