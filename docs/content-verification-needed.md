# Informacje wymagające weryfikacji przez klienta (EDMAT)

Ten dokument zawiera wszystkie sprzeczności, niepewności i braki wykryte podczas audytu treści na www.edmat.pl. Zgodnie z zasadą projektu „nie wymyślaj informacji”, żadna z poniższych kwestii nie została rozstrzygnięta samodzielnie tam, gdzie źródła są sprzeczne — przyjęto najbardziej ostrożną, potwierdzoną wersję i oznaczono ją poniżej.

## 1. Rok założenia firmy / lata doświadczenia — SPRZECZNOŚĆ

Źródła podają trzy różne informacje o „stażu” firmy:
- Strona główna oraz `/o-firmie`: firma działa **„od 1992 roku”**.
- `/najczestsze-pytania-faq`: „od ponad 15 lat przygotowujemy projekty…”.
- `/meble-na-wymiar/projektowanie`: „20 lat doświadczenia”.

**Decyzja przyjęta w nowej stronie:** użyto wyłącznie „od 1992 roku” jako głównego, potwierdzonego niezależnie na dwóch stronach faktu. Sformułowanie „ponad 30 lat doświadczenia” zostało użyte tylko tam, gdzie wynika to z prostego obliczenia (2026 − 1992 = 34 lata) — nie jest to nowa, wymyślona liczba, lecz przeliczenie potwierdzonej daty założenia. Zwroty „15 lat” i „20 lat” zostały pominięte jako nieaktualne artefakty starych aktualizacji treści.

**Do potwierdzenia przez klienta:** czy rok 1992 jest właściwym rokiem założenia/rozpoczęcia działalności (a nie np. rokiem założenia wcześniejszej formy działalności)? Jeśli klient wskaże inny rok, wymaga to jednej zmiany w danych firmy (`lib/site-config.ts`).

## 2. Dane rejestrowe firmy — BRAK

Na żadnej ze zbadanych stron nie znaleziono:
- pełnej nazwy prawnej firmy (czy to jednoosobowa działalność gospodarcza, spółka itd.),
- numeru NIP,
- numeru REGON.

**Nowa strona nie prezentuje tych danych jako faktu.** Stopka i strona Kontakt nie zawierają wymyślonych numerów. Jeżeli klient planuje przyjmować płatności/faktury przez stronę lub chce pełnej zgodności z wymogami e-commerce, poproś o te dane do uzupełnienia w `lib/site-config.ts` i w stopce.

## 3. Numery telefonu — DWA RÓŻNE KONTAKTY

- Telefon stacjonarny/biuro: **(13) 432 66 49** (widoczny na stronie głównej, w stopce, w `/o-firmie`).
- Telefon komórkowy do konkretnej osoby: **504 214 132**, przypisany na stronie Kontakt do „Edward Barański”.

**Decyzja przyjęta:** oba numery zostały zachowane — numer stacjonarny jako główny numer firmowy (nagłówek, stopka, CTA), numer komórkowy jako dodatkowy kontakt bezpośredni na stronie Kontakt, tak jak na starej stronie.

**Do potwierdzenia przez klienta:** czy oba numery są nadal aktywne i czy Edward Barański nadal jest właściwą osobą kontaktową do wskazania z imienia i nazwiska na publicznej stronie (dane osobowe pracownika/właściciela na stronie WWW wymagają jego zgody).

## 4. Godziny otwarcia — JEDNO ŹRÓDŁO, NIEZWERYFIKOWANE NA BIEŻĄCO

Strona Kontakt podaje: „Pn.-Pt. od 9 do 17”. Brak informacji o sobotach, dniach wolnych od pracy czy sezonowych zmianach godzin.

**Do potwierdzenia przez klienta:** czy godziny są nadal aktualne (stara strona mogła nie być aktualizowana od lat). Nowa strona prezentuje te godziny, ale klient powinien potwierdzić je przed publikacją — błędne godziny otwarcia bezpośrednio szkodzą zaufaniu klientów.

## 5. Adres e-mail

`biuro@edmat.pl` — wskazany na stronie Kontakt jako tekst zabezpieczony przed botami (JavaScript). Nie znaleziono żadnego innego adresu e-mail na stronie. Przyjęto ten adres jako jedyny, potwierdzony kontakt mailowy.

## 6. Obszar działania

- `/o-firmie`: siedziba w Krośnie, klienci głównie z woj. podkarpackiego, „czasami” z małopolskiego.
- Strona główna: wymienia wprost Rzeszów i Krosno oraz „cały region podkarpacki”.
- Wiele tytułów podstron (meta title) zawiera frazę „Krosno Rzeszów”, co sugeruje intencjonalne pozycjonowanie na oba miasta.

**Decyzja przyjęta:** Krosno jako siedziba/lokalizacja główna, Rzeszów i województwo podkarpackie jako główny obszar działania w treściach i lokalnym SEO, bez sztucznego mnożenia nazw innych miejscowości, których strona nie wymienia.

## 7. Social media

- Facebook: `facebook.com/edmatkrosno` — podany przez klienta, użyty jako jedyny zweryfikowany link social media w stopce. Zawartość strony (posty, aktualność, dokładne dane profilu) nie była w pełni dostępna do automatycznego odczytu przy audycie (strona wymaga przeglądarki z JS) — **zalecana ręczna weryfikacja przez klienta**, czy profil jest aktywny i czy dane (godziny, adres, telefon) w opisie profilu są zgodne z nowa stroną.
- Stara strona linkowała też do Twittera i Google+. **Google+ nie istnieje od 2019 roku** — link pominięty w nowej stronie jako martwy. Link do Twittera/X pominięty, ponieważ nie udało się potwierdzić aktywnego, oficjalnego konta — jeśli klient posiada aktywne konto X/Twitter lub Instagram, prosimy o link do dodania w stopce.

## 8. Gwarancje — potwierdzone, ale częściowe

- Rolety zewnętrzne: „gwarancja 36 miesięczna” (wyłączając uszkodzenia mechaniczne i niewłaściwe użytkowanie) — źródło: FAQ.
- System szafy przesuwnej: „5-letnia gwarancja” — źródło: opis realizacji „Szafa przesuwna ze skosem”, dotyczy konkretnego systemu okuć, niekoniecznie całej oferty mebli.

**Nowa strona nie uogólnia tych gwarancji na całą ofertę** — są prezentowane w kontekście, w którym występowały (rolety zewnętrzne / konkretny system szaf), a nie jako ogólna „gwarancja EDMAT”.

## 9. Ceny

Strona FAQ jednoznacznie odmawia podania cen za m² mebli kuchennych, tłumacząc to zmiennością materiałów i wyposażenia, i odsyła do showroomu. **Nowa strona nie prezentuje żadnego cennika ani „od X zł”** — zachowano tę samą politykę (wycena indywidualna po pomiarze/konsultacji).

## 10. Realizacje — brak potwierdzonych lokalizacji poza Krosnem

Tylko jedna realizacja ma nazwę sugerującą lokalizację („Meble kuchenne w Krośnie”). Pozostałe 12 realizacji nie ma podanej lokalizacji na stronie źródłowej. **W CMS pole `location` pozostawiono puste (NULL) dla tych realizacji** zamiast zgadywać miejscowość — zgodnie z zasadą projektu pole lokalizacji jest opcjonalne.

## 11. Zdjęcie/zdjęcia z widocznym znakiem aparatu

Część oryginalnych zdjęć realizacji zawiera nałożony przez telefon napis w rogu (np. „SHOT ON MI 9T AI TRIPLE CAMERA”). Zdjęcia pozostały autentyczne i nie zostały zastąpione, zgodnie z priorytetem „prawdziwe zdjęcia ważniejsze niż estetyka znaku aparatu”. Rekomendacja: klient może dostarczyć zdjęcia bez nakładek aparatu przy okazji kolejnych sesji fotograficznych, a administrator może je podmienić samodzielnie przez panel `/admin`.

## 12. Opinie klientów — ZNALEZIONO DWIE PRAWDZIWE, ARCHIWALNE

W treści starych wpisów „Aktualności” (nie w dedykowanej sekcji opinii) znaleziono dwa prawdziwe cytaty klientów, przypisane z imienia i miejscowości:

- Marek i Joanna z Jedlicza (wpis „Kolejne inwestycje zakończone”, meble kuchenne),
- Józef z Krosna (wpis „Otwarcie strony firmowej”, rolety zewnętrzne i moskitiery).

**Decyzja przyjęta:** oba cytaty zostały wykorzystane na nowej stronie (sekcja opinii na stronie głównej / O firmie), z tą samą atrybucją (imię + miejscowość, bez nazwiska — tak jak w oryginale). Wpisy te pochodzą z bardzo starych aktualności (najprawdopodobniej ok. 2013–2014 roku, jeden wpis odwołuje się do daty „12 września 2013”), dlatego **nowa strona nie prezentuje ich jako świeżych/aktualnych opinii** — nie dodano żadnej nowej daty ani sugestii aktualności, opisano je neutralnie jako opinie z archiwum firmy. Nie wymyślono żadnych dodatkowych opinii ponad te dwie potwierdzone.

**Do potwierdzenia przez klienta:** czy można nadal publicznie prezentować te opinie (dane osobowe, nawet szczątkowe, wymagają zgody), oraz czy klient posiada nowsze, chętnie udostępnione opinie (np. z Google Moja Firma) do dodania w ich miejsce lub obok nich.

## 13. Daty publikacji archiwalnych aktualności — PRZYBLIŻONE

Trzy migrowane wpisy aktualności („Otwarcie strony firmowej”, „EDMAT na portalach społecznościowych”, „Kolejne inwestycje zakończone”) nie miały na starej stronie w pełni jednoznacznej daty publikacji w treści dostępnej do odczytu. W `supabase/seed.mjs` przyjęto rozsądnie przybliżone daty na podstawie kontekstu (np. artykuł o zakończonych inwestycjach wspomina wprost „wrzesień i październik 2014”, więc przyjęto publikację na początku listopada 2014; artykuł o otwarciu strony i o social media to najwcześniejsze wpisy, przyjęto rok 2013). **Te daty nie są prezentowane jako pewne fakty gdzie indziej niż daty publikacji archiwalnych wpisów** — jeśli klient posiada dokładniejsze daty, należy je zaktualizować w panelu `/admin`.

## 14. Dodatkowa galeria zdjęć znaleziona po pierwszym audycie

Po pierwszym wdrożeniu odkryto, że stare strony kategorii mebli (`/meble-na-wymiar/kuchenne`, `/szafy-wnekowe-do-zabudowy`, `/do-sypialni`) osadzały dodatkową galerię zdjęć pod `/images/galeria/...`, odrębną od komponentu „Realizacje" (K2) zindeksowanego w mapie witryny. Z tego źródła domigrowano:

- 2 nowe, wcześniej pominięte realizacje kuchni („Kuchnia w jasnym brązie z nadrukiem trawy", „Kuchnia w kolorze ecru z oświetleniem LED"),
- 1 nową realizację szafy wnękowej („Szafa wnękowa kremowa z czarnym szkłem"),
- 12 dodatkowych zdjęć do istniejącej realizacji „Zabudowa biura" (ten sam projekt, inne ujęcia — użyto ich do wyboru lepszej okładki).

Katalogi `/images/galeria/meble_do_salonu/`, `/images/galeria/meble_lazienkowe/` zwracają 403 (folder istnieje), ale żadna aktualnie renderowana strona do nich nie linkuje, więc nie udało się ustalić nazw plików — te dwie kategorie (oraz „meble do przedpokoju") nadal nie mają autentycznych zdjęć EDMAT. Jeżeli klient ma dostęp do panelu starej strony (Joomla) lub do oryginalnych plików, warto poprosić o ręczne przesłanie zdjęć tych realizacji przez `/admin`.

## 15. Zdjęcia ilustracyjne (stockowe) na stronach produktowych osłon okiennych i 3 kategoriach mebli

Dla podstron produktowych rolet, żaluzji i moskitier (wszystkie 14 podstron + 3 strony kategorii) oraz dla trzech kategorii mebli bez własnych zdjęć klienta („Meble do salonu", „Meble łazienkowe", „Meble do przedpokoju") nie istnieją żadne autentyczne zdjęcia EDMAT — ani w oficjalnym serwisie, ani w dodatkowej galerii opisanej w punkcie 14. Właściciel projektu potwierdził (2026-08-24), że w tej sytuacji dopuszczalne jest użycie dobrze dobranych zdjęć ilustracyjnych spoza materiałów klienta.

Użyto darmowych, licencjonowanych do użytku komercyjnego zdjęć z Pexels.com (bez wymogu podania autora), dobranych tak, aby wiarygodnie przedstawiały dany typ produktu (np. żaluzje aluminiowe, roleta zewnętrzna, moskitiera okienna) lub charakter pomieszczenia (salon, łazienka, przedpokój). Zgodnie z zasadami projektu:

- **Żadne z tych zdjęć nie jest i nie będzie prezentowane jako realizacja EDMAT** — teksty alternatywne (`alt`) opisują wyłącznie typ produktu/pomieszczenia, nigdy nie sugerują, że to konkretna instalacja czy projekt klienta.
- Sekcja realizacji (`/realizacje`) oraz wszystkie zdjęcia w galeriach realizacji nadal pochodzą **wyłącznie** z autentycznych materiałów EDMAT — ta zasada nie została naruszona.
- Pliki źródłowe: `src/assets/stock/*.jpg`.

**Do rozważenia przez klienta:** jeśli EDMAT posiada własne zdjęcia produktowe rolet/żaluzji/moskitier (np. od dostawcy Anwis, z materiałów marketingowych) lub zdjęcia realizacji mebli do salonu/łazienki/przedpokoju, warto podmienić te zdjęcia ilustracyjne na prawdziwe poprzez edycję plików w `src/assets/stock/` (strony produktowe są kontrolowane przez kod, nie przez `/admin`).

## Podsumowanie działań

| # | Kwestia | Status w nowej stronie |
|---|---|---|
| 1 | Rok założenia | Użyto „od 1992”, wymaga potwierdzenia |
| 2 | NIP/REGON/nazwa prawna | Pominięte — brak danych |
| 3 | Telefony | Oba zachowane, wymaga potwierdzenia aktualności |
| 4 | Godziny otwarcia | Zachowane z FAQ/Kontaktu, wymaga potwierdzenia |
| 5 | E-mail | biuro@edmat.pl, potwierdzone jednym źródłem |
| 6 | Obszar działania | Krosno + Rzeszów + Podkarpackie |
| 7 | Social media | Tylko Facebook, reszta pominięta jako nieaktualna |
| 8 | Gwarancje | Zachowane tylko w oryginalnym kontekście |
| 9 | Cennik | Brak — indywidualna wycena |
| 10 | Lokalizacje realizacji | Puste tam, gdzie nieznane |
| 11 | Znaki wodne aparatu na zdjęciach | Zaakceptowane, do wymiany przez klienta w przyszłości |
| 12 | Opinie klientów | 2 prawdziwe, archiwalne cytaty użyte bez fałszywej daty, wymaga potwierdzenia zgody |
