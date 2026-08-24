# EDMAT — nowa strona internetowa

Nowoczesny, premium serwis firmowy dla EDMAT (meble na wymiar oraz osłony okienne, Krosno), zbudowany jako
zamiennik dla dotychczasowej strony [www.edmat.pl](https://www.edmat.pl). Projekt zachowuje pełen zakres treści
i podstron obecnego serwisu, dodając nowoczesny design, własny CMS i lepsze SEO techniczne.

## Stack technologiczny

- **Next.js 16** (App Router, Turbopack, TypeScript)
- **Tailwind CSS v4**
- **Supabase** (Postgres + Auth + Storage) jako CMS dla realizacji, aktualności i promocji
- **Resend** (opcjonalnie) do wysyłki formularza kontaktowego
- Hosting docelowy: **Vercel**

## Struktura projektu

```
src/
  app/                    — trasy Next.js App Router (strony publiczne + /admin)
  components/
    layout/                — Header (mega-menu), Footer, sticky mobile CTA
    sections/               — sekcje strony głównej i stron usługowych
    ui/                     — komponenty wielokrotnego użytku (przyciski, karty, accordion…)
    forms/                  — formularz kontaktowy
    admin/                  — formularze i komponenty panelu /admin
  lib/
    content/                — treść stron usługowych (meble, rolety, żaluzje, moskitiery) i FAQ
    supabase/               — klienci Supabase (server/browser), typy bazy, storage helpers
    actions/                — Server Actions (formularz kontaktowy, logowanie, CRUD w /admin)
    site-config.ts           — pojedyncze źródło prawdy dla danych firmy (telefon, adres, godziny…)
    queries.ts                — odczyt danych z Supabase dla stron publicznych
supabase/
  migrations/              — schemat SQL (tabele, RLS, storage, triggery)
  seed-assets/               — prawdziwe zdjęcia 13 archiwalnych realizacji + logo
  seed.mjs                   — skrypt importujący dane archiwalne do Supabase
docs/
  legacy-url-inventory.md    — audyt wszystkich adresów starej strony
  redirect-map.md             — mapa zachowania/przekierowań adresów
  content-verification-needed.md — sprzeczności i braki w treściach źródłowych
  seo-migration-checklist.md  — status wdrożenia elementów technicznego SEO
```

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env.local   # uzupełnij zmienne — patrz ADMIN_SETUP.md
npm run dev
```

Strona działa (treści statyczne, strony usługowe, FAQ itd.) nawet **bez** skonfigurowanego Supabase — sekcje
zależne od CMS (realizacje, aktualności, promocje, panel `/admin`) pokazują wtedy pusty, informacyjny stan
zamiast błędu.

Pełna konfiguracja Supabase i panelu administracyjnego: **[ADMIN_SETUP.md](./ADMIN_SETUP.md)**.

## Skrypty

```bash
npm run dev      # serwer deweloperski (Turbopack)
npm run build    # build produkcyjny
npm run start    # uruchomienie builda produkcyjnego
npm run lint     # ESLint
```

## CMS — co jest zarządzane przez kod, a co przez /admin

| Treść | Zarządzanie |
|---|---|
| Strona główna, strony usługowe (meble, rolety, żaluzje, moskitiery), FAQ, O firmie, Kontakt | Kod (`src/lib/content/*`, `src/app/**/page.tsx`) — zmiana wymaga edycji kodu i wdrożenia |
| Realizacje (portfolio) | Panel `/admin` — właściciel dodaje, edytuje, publikuje/ukrywa, usuwa, zarządza zdjęciami |
| Aktualności | Panel `/admin` |
| Promocje | Panel `/admin` |
| Zapytania z formularza kontaktowego | Podgląd w `/admin/zapytania` |

Ten podział jest celowy — właściciel firmy samodzielnie zarządza treścią, która zmienia się często (realizacje,
aktualności, promocje), natomiast stałe strony usługowe pozostają kontrolowane przez kod, aby zachować spójny
design i nie dopuścić do przypadkowego zepsucia struktury strony.

## Dokumentacja migracji SEO

- [`docs/legacy-url-inventory.md`](./docs/legacy-url-inventory.md) — inwentaryzacja wszystkich adresów starej strony
- [`docs/redirect-map.md`](./docs/redirect-map.md) — jak każdy stary adres jest obsłużony w nowej strukturze
- [`docs/content-verification-needed.md`](./docs/content-verification-needed.md) — informacje wymagające potwierdzenia przez klienta
- [`docs/seo-migration-checklist.md`](./docs/seo-migration-checklist.md) — checklist wdrożenia SEO technicznego

## Własność klienta

Projekt jest przygotowany do przekazania klientowi — repozytorium GitHub, projekt Supabase i projekt Vercel mogą
zostać przeniesione na konta klienta bez zależności od prywatnego konta dewelopera. Szczegóły: sekcja „Przekazanie
infrastruktury klientowi” w [ADMIN_SETUP.md](./ADMIN_SETUP.md).
