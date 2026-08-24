# ADMIN_SETUP — konfiguracja Supabase i panelu /admin

Ten dokument prowadzi krok po kroku przez uruchomienie CMS-u (Supabase) i panelu
administracyjnego `/admin` dla strony EDMAT. Jest napisany z myślą o osobie bez
wcześniejszego doświadczenia z Supabase.

> **Status tego projektu:** na potrzeby podglądu/testów projekt Supabase (`edmat-website`,
> ref `cxtzuzchdneyikhdhlnc`, region Frankfurt) został już utworzony, migracje z
> `supabase/migrations/` zostały już zastosowane, a `.env.local` jest już uzupełniony
> (`NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Możesz więc pominąć
> kroki 1–3 poniżej i przejść od razu do kroku 4 (włączenie logowania) i 5 (utworzenie
> administratora). Przed przekazaniem projektu klientowi wykonaj krok 12 (transfer
> własności) — ten projekt Supabase jest obecnie w organizacji deweloperskiej, nie klienta.

## 1. Załóż projekt Supabase

1. Wejdź na [supabase.com](https://supabase.com) i załóż konto (najlepiej na adres e-mail, który docelowo ma być kontem klienta — patrz sekcja „Własność klienta” w README).
2. Kliknij **New project**.
3. Wybierz organizację, nazwę projektu (np. `edmat-website`), hasło do bazy danych (zapisz je w menedżerze haseł) oraz region możliwie blisko Polski (np. Frankfurt — `eu-central-1`).
4. Poczekaj, aż projekt się utworzy (1–2 minuty).

## 2. Uruchom migracje SQL

Migracje znajdują się w `supabase/migrations/` i tworzą całą strukturę bazy: tabele, RLS, funkcje, triggery oraz buckety Storage.

**Opcja A — SQL Editor w panelu Supabase (najprostsza):**

1. W panelu Supabase przejdź do **SQL Editor**.
2. Otwórz kolejno pliki z `supabase/migrations/` w tej kolejności:
   - `0001_init.sql`
   - `0002_storage.sql`
   - `0003_contact_submissions.sql`
3. Wklej zawartość każdego pliku do SQL Editor i kliknij **Run**. Rób to po kolei, jeden plik na raz.

**Opcja B — Supabase CLI (dla osób znających terminal):**

```bash
npx supabase login
npx supabase link --project-ref <project-ref-z-panelu-supabase>
npx supabase db push
```

## 3. Sprawdź Storage

Po uruchomieniu migracji w zakładce **Storage** powinny istnieć dwa buckety:

- `project-images` — zdjęcia realizacji,
- `site-images` — okładki aktualności i promocji.

Oba są publiczne do odczytu (public URL), a zapis/edycja/usuwanie wymaga zalogowanego administratora — to ustawiają migracje automatycznie, nie trzeba nic klikać ręcznie.

## 4. Włącz logowanie e-mail/hasło

1. W panelu Supabase: **Authentication → Providers → Email**.
2. Upewnij się, że logowanie e-mail/hasło jest włączone.
3. **Authentication → Settings**: możesz wyłączyć „Enable email confirmations”, jeśli chcesz od razu móc zalogować się nowo utworzonym kontem administratora bez potwierdzania e-maila (wygodne na start, można później włączyć ponownie).
4. Panel `/admin` nie ma publicznej rejestracji — konta administratorów tworzy się ręcznie (kolejny krok).

## 5. Utwórz konto administratora

1. **Authentication → Users → Add user → Create new user**.
2. Podaj e-mail i hasło właściciela firmy (lub swoje, na czas testów).
3. Zaznacz „Auto Confirm User”, aby nie czekać na e-mail potwierdzający.
4. Po utworzeniu użytkownika skopiuj jego **UUID** (widoczny na liście użytkowników).

## 6. Dodaj administratora do tabeli `admin_users`

Samo założenie konta w Supabase Auth **nie** daje dostępu do panelu — trzeba jawnie dodać UUID do tabeli `admin_users`.

W **SQL Editor** uruchom (podmieniając UUID na skopiowany w kroku 5):

```sql
insert into public.admin_users (user_id)
values ('WKLEJ-TUTAJ-UUID-UZYTKOWNIKA');
```

Możesz dodać w ten sposób więcej niż jednego administratora.

## 6b. (Opcjonalnie) Zaimportuj zdjęcia archiwalnych realizacji

Repozytorium zawiera prawdziwe zdjęcia 13 realizacji zmigrowanych ze starej strony (`supabase/seed-assets/realizacje/`) oraz gotowy skrypt, który wgra je do Supabase Storage i utworzy odpowiadające im wpisy w bazie (`projects`, `project_images`), a także 3 archiwalne aktualności i 2 archiwalne promocje.

1. Skopiuj `NEXT_PUBLIC_SUPABASE_URL` oraz **Service role key** (Project Settings → API — **nie** klucz `anon`) do `.env.local`.
2. Uruchom z katalogu głównego projektu:

```bash
npm run seed
```

Skrypt jest bezpieczny do wielokrotnego uruchomienia — pomija realizacje/wpisy, które już istnieją (po polu `slug`).

## 7. Zmienne środowiskowe lokalnie

1. Skopiuj `.env.example` do `.env.local`.
2. Uzupełnij `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API → Project URL / anon public key).
3. (Opcjonalnie) uzupełnij dane do wysyłki e-mail z formularza kontaktowego — patrz sekcja 9.
4. Uruchom stronę lokalnie:

```bash
npm install
npm run dev
```

5. Wejdź na `http://localhost:3000/admin/login` i zaloguj się kontem utworzonym w kroku 5.

## 8. Zmienne środowiskowe na Vercel

1. W projekcie na [vercel.com](https://vercel.com): **Settings → Environment Variables**.
2. Dodaj te same zmienne co w `.env.local` (bez `SUPABASE_SERVICE_ROLE_KEY` — ten klucz jest potrzebny tylko do jednorazowego uruchomienia `supabase/seed.mjs` lokalnie, nie na produkcji).
3. Dla `NEXT_PUBLIC_SITE_ENV` ustaw `production` **tylko** dla domeny produkcyjnej (Production environment) — pozostaw puste dla Preview Deployments, aby uniknąć indeksowania podglądów przez Google.

## 9. (Opcjonalnie) Wysyłka e-maili z formularza kontaktowego

Formularz kontaktowy zawsze zapisuje zgłoszenie w tabeli `contact_submissions` (widoczne w `/admin/zapytania`), niezależnie od tego, czy wysyłka e-mail jest skonfigurowana. Aby dodatkowo otrzymywać powiadomienia e-mail:

1. Załóż konto na [resend.com](https://resend.com) (ma darmowy plan).
2. Wygeneruj klucz API i wstaw go jako `RESEND_API_KEY`.
3. Ustaw `CONTACT_EMAIL_TO` na adres, na który mają przychodzić zgłoszenia (np. `biuro@edmat.pl`).
4. Na produkcji zweryfikuj własną domenę w Resend i ustaw `CONTACT_EMAIL_FROM` na adres w tej domenie — bez tego e-maile wychodzą z domyślnego, testowego adresu Resend.

## 10. Deployment na Vercel

1. Wypchnij repozytorium na GitHub (patrz README.md).
2. W [vercel.com](https://vercel.com) → **Add New → Project** → wybierz repozytorium.
3. Framework Preset: Next.js (wykrywany automatycznie).
4. Dodaj zmienne środowiskowe (krok 8) przed pierwszym deploymentem.
5. Kliknij **Deploy**.
6. Po wdrożeniu podepnij docelową domenę (`www.edmat.pl`) w **Settings → Domains**.

## 11. Logowanie do /admin na produkcji

Po wdrożeniu panel jest dostępny pod `https://www.edmat.pl/admin/login` (lub adresem tymczasowym Vercel przed podpięciem domeny). Loguje się tymi samymi danymi, które utworzono w kroku 5.

## 12. Przekazanie infrastruktury klientowi

Docelowo żadna część infrastruktury nie powinna zależeć od prywatnego konta dewelopera:

- **Supabase**: w **Project Settings → General** można zmienić właściciela organizacji lub od razu założyć projekt na koncie e-mail klienta (patrz krok 1).
- **GitHub**: przenieś repozytorium do organizacji/konta klienta (**Settings → Transfer ownership** w GitHub) lub od razu twórz je na koncie klienta.
- **Vercel**: podepnij projekt Vercel pod konto/organizację klienta, ewentualnie zaproś klienta jako właściciela projektu.
- **Domena**: `www.edmat.pl` powinna docelowo wskazywać (DNS) na deployment Vercel klienta.

Po przekazaniu klient korzysta z `/admin` samodzielnie — dodawanie realizacji, zdjęć, aktualności i promocji nie wymaga GitHuba ani wiedzy programistycznej.
