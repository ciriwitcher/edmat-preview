# Mapa przekierowań (301) – edmat.pl → nowa strona

## Zasada ogólna

Audyt (`legacy-url-inventory.md`) wykazał, że **każdy wartościowy adres obecnej strony edmat.pl ma swój dokładny odpowiednik w nowej architekturze** – ten sam `pathname`. Dzięki temu **nie jest wymagana żadna przekierowywana zmiana ścieżki** dla żadnej z podstron usługowych, kategorii, realizacji, aktualności ani promocji.

Poniżej wymienione są jedyne miejsca, w których zachowanie różni się od „URL 1:1”, wraz z uzasadnieniem.

## 1. Normalizacja trailing slash

Stara strona (Joomla) używała `/meble-na-wymiar/`, `/moskitiery/`, `/rolety/`, `/zaluzje/` ze slashem końcowym dla stron kategorii, a bez slasha dla podstron. Next.js App Router w tym projekcie skonfigurowany jest z `trailingSlash: false`, więc adresy kategorii są dostępne bez ukośnika końcowego (`/meble-na-wymiar`, `/moskitiery`, `/rolety`, `/zaluzje`).

| Stary URL | Nowy URL | Typ |
|---|---|---|
| `/meble-na-wymiar/` | `/meble-na-wymiar` | 301 (automatyczna normalizacja Next.js) |
| `/moskitiery/` | `/moskitiery` | 301 (automatyczna normalizacja Next.js) |
| `/rolety/` | `/rolety` | 301 (automatyczna normalizacja Next.js) |
| `/zaluzje/` | `/zaluzje` | 301 (automatyczna normalizacja Next.js) |

Next.js domyślnie przekierowuje `/sciezka/` → `/sciezka` gdy `trailingSlash: false`, więc nie trzeba definiować tych reguł ręcznie w `next.config.ts` – zachowanie jest wbudowane.

## 2. `/mapa-witryny`

Zachowana jako czytelna dla człowieka strona HTML (patrz `legacy-url-inventory.md`). Brak przekierowania – ten sam URL, nowa treść.

## 3. Promocje historyczne

| URL | Decyzja |
|---|---|
| `/promocje/aktualne-promocje` | **Brak przekierowania.** Adres zachowany jako wpis w CMS z `active = true`, ale z datą `valid_until` w przeszłości — dzięki temu strona jest nadal publicznie dostępna (RLS pozwala odczytać rekordy `active = true`), lecz interfejs wyraźnie oznacza ją jako zakończoną i nie pokazuje jej na liście „aktualnych" promocji (filtrowanej dodatkowo po dacie). CTA kieruje do aktualnej oferty / kontaktu. Usunięcie tego URL groziłoby utratą istniejącego linkowania i możliwym 404 dla zaindeksowanych zapytań. |
| `/promocje/10-procentowy-rabat-na-meble-kuchenne-tylko-do-konca-lutego-2015` | **Brak przekierowania**, ta sama logika: URL zachowany, wpis ma `active = true` i `valid_until = 2015-02-28`, więc automatycznie znika z listy aktualnych promocji i wyświetla się jako archiwalny, z jasno wskazaną datą wygaśnięcia. |

## 4. Adresy nieistniejące w nowej strukturze

Nie zidentyfikowano żadnych stron w audycie `legacy-url-inventory.md`, które byłyby świadomie usuwane. Jeżeli w przyszłości właściciel zdecyduje się usunąć konkretną realizację/wpis w CMS, należy wtedy:
1. rozważyć ustawienie `published = false` zamiast twardego usunięcia (strona zwróci wtedy kontrolowane 404, a nie błąd bazy),
2. w przypadku realnej potrzeby trwałego usunięcia wartościowego adresu – dodać regułę przekierowania 301 do najbliższej tematycznie strony w `next.config.ts` (`redirects()`), a wpis odnotować w tym pliku.

## 5. www / non-www i HTTP → HTTPS

Docelowy kanoniczny host: `https://www.edmat.pl`. Konfiguracja DNS/Vercel powinna wymuszać:
- przekierowanie `http://` → `https://` (Vercel robi to automatycznie dla domen z aktywnym SSL),
- przekierowanie `edmat.pl` → `www.edmat.pl` (lub odwrotnie – do ustalenia z klientem które z nich jest obecnie kanoniczne w Google Search Console; obecna strona używa `www.edmat.pl` w treści, więc przyjęto `www` jako kanoniczne).

Patrz `docs/seo-migration-checklist.md` w sekcji „www/non-www, HTTP→HTTPS”.

## Podsumowanie

- Liczba adresów wymagających przekierowania 301 „URL → inny URL”: **0**
- Liczba adresów z automatyczną normalizacją trailing slash: **4**
- Liczba adresów zachowanych, ale z inną prezentacją treści (promocje archiwalne): **2**
