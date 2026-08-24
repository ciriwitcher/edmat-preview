-- EDMAT — drobna optymalizacja RLS wg Supabase performance advisor.
-- auth.uid() wywoływane bezpośrednio w polityce RLS jest przeliczane dla
-- każdego wiersza; opakowanie w (select auth.uid()) pozwala Postgresowi
-- policzyć je raz na zapytanie (tzw. InitPlan). Dotyczy to zarówno polityki
-- "admin_users: self read", jak i funkcji is_admin() używanej w pozostałych
-- politykach.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

drop policy if exists "admin_users: self read" on public.admin_users;
create policy "admin_users: self read"
  on public.admin_users for select
  using ((select auth.uid()) = user_id);
