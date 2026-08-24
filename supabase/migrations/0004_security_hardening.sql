-- EDMAT — utwardzenie bezpieczeństwa wg Supabase security advisor.
-- set_updated_at() miał zmienny search_path (ryzyko podmiany funkcji/obiektów
-- przez schemat kontrolowany przez atakującego) — ustawiamy go na sztywno.
--
-- Uwaga: is_admin() CELOWO pozostaje wykonywalna przez role anon i authenticated.
-- Jest używana wewnątrz warunków RLS z operatorem OR (np. "published = true or
-- is_admin()") na tabelach czytanych publicznie — Postgres nie gwarantuje
-- pominięcia drugiego operandu OR podczas ewaluacji RLS, więc odebranie
-- uprawnienia EXECUTE roli anon powoduje błąd "permission denied for function
-- is_admin" nawet dla zwykłych, publicznych zapytań. Funkcja jest bezpieczna do
-- wywołania przez anon — zwraca wyłącznie bool dla auth.uid() wywołującego
-- (dla anon zawsze NULL → false), nie ujawnia żadnych danych.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
