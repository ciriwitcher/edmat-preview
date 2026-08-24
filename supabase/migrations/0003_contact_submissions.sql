-- EDMAT — zgłoszenia z formularza kontaktowego.
-- Formularz zawsze zapisuje zgłoszenie tutaj (trwały zapis, niezależny od tego,
-- czy wysyłka e-mail przez Resend jest skonfigurowana), tak aby żadne zapytanie
-- klienta nie zostało utracone. Administrator przegląda zgłoszenia w /admin.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_method text not null, -- e-mail lub telefon podany przez klienta
  interest text not null,       -- rodzaj zainteresowania (meble / osłony okienne / inne)
  message text not null,
  email_delivered boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- Każdy (także niezalogowany odwiedzający) może wysłać formularz.
drop policy if exists "contact_submissions: public insert" on public.contact_submissions;
create policy "contact_submissions: public insert"
  on public.contact_submissions for insert
  with check (true);

-- Tylko administrator może przeglądać i usuwać zgłoszenia.
drop policy if exists "contact_submissions: admin read" on public.contact_submissions;
create policy "contact_submissions: admin read"
  on public.contact_submissions for select
  using (public.is_admin());

drop policy if exists "contact_submissions: admin delete" on public.contact_submissions;
create policy "contact_submissions: admin delete"
  on public.contact_submissions for delete
  using (public.is_admin());
