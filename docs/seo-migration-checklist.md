# SEO Migration Checklist — edmat.pl → nowa strona

Status wdrożenia poszczególnych elementów technicznego SEO przy migracji na nową stronę Next.js.

| # | Element | Status | Uwagi |
|---|---|---|---|
| 1 | Inventory URL | ✅ Zrobione | `docs/legacy-url-inventory.md` — pełna lista starych adresów i ich klasyfikacja. |
| 2 | Mapa przekierowań 301 | ✅ Zrobione | `docs/redirect-map.md` — wszystkie wartościowe adresy zachowują dokładnie ten sam pathname; jedyne "przekierowania" to automatyczna normalizacja trailing slash przez Next.js. |
| 3 | Unikalny `<title>` na każdej podstronie | ✅ Zrobione | Każda strona ma własny `export const metadata` lub `generateMetadata`, z szablonem `%s — EDMAT` w `layout.tsx`. |
| 4 | Unikalny meta description | ✅ Zrobione | Każda strona statyczna i dynamiczna (realizacje, aktualności, promocje) ma własny opis. |
| 5 | Canonical | ✅ Zrobione | `alternates.canonical` ustawiony na każdej podstronie, `metadataBase` wskazuje na `https://www.edmat.pl`. |
| 6 | Poprawny H1 na każdej stronie | ✅ Zrobione | Jeden H1 na stronę, zgodny z treścią (weryfikowane w komponentach sekcji). |
| 7 | Struktura H2/H3 | ✅ Zrobione | Sekcje serwisowe i strony kategorii korzystają z konsekwentnej hierarchii nagłówków. |
| 8 | Open Graph | ✅ Zrobione | `openGraph` w metadanych + dynamiczny `opengraph-image.tsx` (next/og). |
| 9 | Twitter metadata | ✅ Zrobione | `twitter.card = summary_large_image` w głównych metadanych. |
| 10 | `robots.txt` | ✅ Zrobione | `src/app/robots.ts` — blokuje `/admin`, wskazuje `sitemap.xml`; **blokuje całą stronę, gdy `NEXT_PUBLIC_SITE_ENV !== "production"`**, aby środowiska preview/dev nie były indeksowane. |
| 11 | `sitemap.xml` | ✅ Zrobione | `src/app/sitemap.ts` — generuje wpisy dla wszystkich stron statycznych oraz opublikowanych realizacji/aktualności/aktywnych promocji z Supabase. Nie zawiera `/admin`. |
| 12 | Organization / LocalBusiness schema | ✅ Zrobione | `HomeAndConstructionBusiness` JSON-LD w `layout.tsx` z adresem, telefonem, godzinami i obszarem działania. |
| 13 | WebSite schema | ✅ Zrobione | JSON-LD `WebSite` w `layout.tsx`. |
| 14 | Service schema | ✅ Zrobione | `serviceJsonLd()` w `src/lib/seo.tsx`, użyty na każdej z 22 podstron usługowych mebli/rolet/żaluzji/moskitier. |
| 15 | BreadcrumbList schema | ✅ Zrobione | Wbudowany w komponent `Breadcrumbs`, obecny na wszystkich podstronach głębszych niż poziom 1. |
| 16 | FAQPage schema | ✅ Zrobione | Tylko na `/najczestsze-pytania-faq`, zgodny z faktycznie widocznym na stronie FAQ (accordion). |
| 17 | Article schema (aktualności) | ✅ Zrobione | JSON-LD `Article` na `/aktualnosci/[slug]`. |
| 18 | Fałszywe Review schema | ✅ Nie zaimplementowano celowo | Zgodnie z zasadami projektu nie dodano żadnego ustrukturyzowanego znacznika opinii — dwie prawdziwe opinie na stronie są tylko tekstem, bez markupu `Review`/`AggregateRating`, ponieważ nie mamy wystarczającej, weryfikowalnej liczby ocen. |
| 19 | 404 | ✅ Zrobione | `src/app/not-found.tsx` — profesjonalna strona z linkami do głównych sekcji, `noindex`. |
| 20 | Broken links | ⚠️ Do weryfikacji po podłączeniu Supabase | Wszystkie linki wewnętrzne w kodzie wskazują na realne trasy; strony zależne od CMS (realizacje/aktualności/promocje) wymagają uruchomienia `supabase/seed.mjs` lub ręcznego dodania treści, aby nie było pustych list. |
| 21 | Trailing slash consistency | ✅ Zrobione | `trailingSlash: false` w `next.config.ts`, Next.js automatycznie normalizuje. |
| 22 | www / non-www | ⚠️ Do ustawienia na etapie DNS/Vercel | Kanoniczny host to `https://www.edmat.pl` (zgodnie z treścią starej strony) — należy skonfigurować przekierowanie `edmat.pl` → `www.edmat.pl` w Vercel/DNS. |
| 23 | HTTP → HTTPS | ✅ Automatyczne na Vercel | Vercel wymusza HTTPS dla domen z aktywnym certyfikatem SSL. |
| 24 | Image alt | ✅ Zrobione | Wszystkie `<Image>` mają opisowy `alt`; zdjęcia realizacji z CMS korzystają z pola `alt_text` uzupełnianego w `/admin`. |
| 25 | Internal linking | ✅ Zrobione | Podstrony usługowe linkują do usług powiązanych i realizacji w tej samej kategorii; realizacje linkują do właściwej usługi; brak stron osieroconych (`orphan pages`) — patrz sekcja "Internal linking" w AGENTS.md. |
| 26 | Breadcrumbs (UI) | ✅ Zrobione | Widoczne na wszystkich podstronach głębszych niż poziom 1. |
| 27 | Indexability | ✅ Zrobione | Brak `noindex` na stronach publicznych poza `/polityka-prywatnosci` (celowo) i `/admin/*` (wykluczone w `robots.ts` oraz niedostępne bez logowania). |
| 28 | Preview noindex | ✅ Zrobione | `robots.ts` blokuje indeksowanie całej strony, gdy `NEXT_PUBLIC_SITE_ENV` nie jest ustawione na `production` — Vercel Preview Deployments nie będą indeksowane. |
| 29 | Dynamic content indexability | ✅ Zrobione | Realizacje/aktualności/promocje renderowane po stronie serwera (SSG z `generateStaticParams` + ISR przy nowych wpisach), więc treść jest obecna w HTML dla crawlerów, nie tylko po stronie klienta. |

## Do zrobienia przed publikacją produkcyjną

1. Ustawić `NEXT_PUBLIC_SITE_ENV=production` wyłącznie w środowisku Production na Vercel.
2. Skonfigurować przekierowanie `edmat.pl` → `www.edmat.pl` (lub odwrotnie, jeśli klient zdecyduje inaczej) na poziomie DNS/Vercel.
3. Uruchomić `supabase/seed.mjs`, aby zaimportować archiwalne realizacje/aktualności/promocje (patrz ADMIN_SETUP.md).
4. Zgłosić `sitemap.xml` w Google Search Console i Bing Webmaster Tools.
5. Zweryfikować własność domeny w Google Search Console (najlepiej zachowując istniejącą weryfikację, jeśli klient ją posiada).
6. Sprawdzić w Google Search Console starej domeny, czy nie ma dodatkowych, niezaindeksowanych w tym audycie adresów (np. bardzo starych wpisów usuniętych z nawigacji, ale wciąż zaindeksowanych) — porównać z `docs/legacy-url-inventory.md`.
