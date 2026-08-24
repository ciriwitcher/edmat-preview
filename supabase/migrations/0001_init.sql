-- EDMAT — schemat początkowy CMS (realizacje, aktualności, promocje, administratorzy)
-- Uruchamiany raz na nowym projekcie Supabase. Bezpieczny do wielokrotnego uruchomienia
-- dzięki "if not exists" / "or replace" tam, gdzie to możliwe.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- admin_users — jawna lista administratorów panelu /admin
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

comment on table public.admin_users is
  'Jawna lista uuid użytkowników auth.users uprawnionych do panelu /admin. Wiersze dodaje developer/właściciel ręcznie w SQL Editor — brak samodzielnej rejestracji.';

-- Funkcja pomocnicza używana w politykach RLS innych tabel.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;

drop policy if exists "admin_users: self read" on public.admin_users;
create policy "admin_users: self read"
  on public.admin_users for select
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- projects — realizacje (portfolio)
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  category text not null check (
    category in ('kuchnie', 'szafy', 'sypialnie', 'salony', 'lazienki', 'przedpokoje', 'biura', 'inne')
  ),
  location text,
  cover_image_path text,
  published boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists projects_published_idx on public.projects (published, sort_order);
create index if not exists projects_category_idx on public.projects (category);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "projects: public read published" on public.projects;
create policy "projects: public read published"
  on public.projects for select
  using (published = true or public.is_admin());

drop policy if exists "projects: admin insert" on public.projects;
create policy "projects: admin insert"
  on public.projects for insert
  with check (public.is_admin());

drop policy if exists "projects: admin update" on public.projects;
create policy "projects: admin update"
  on public.projects for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "projects: admin delete" on public.projects;
create policy "projects: admin delete"
  on public.projects for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- project_images — zdjęcia realizacji (1:N)
-- ---------------------------------------------------------------------------
create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_images_project_id_idx on public.project_images (project_id, sort_order);

alter table public.project_images enable row level security;

drop policy if exists "project_images: public read for published projects" on public.project_images;
create policy "project_images: public read for published projects"
  on public.project_images for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.projects p
      where p.id = project_images.project_id and p.published = true
    )
  );

drop policy if exists "project_images: admin insert" on public.project_images;
create policy "project_images: admin insert"
  on public.project_images for insert
  with check (public.is_admin());

drop policy if exists "project_images: admin update" on public.project_images;
create policy "project_images: admin update"
  on public.project_images for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "project_images: admin delete" on public.project_images;
create policy "project_images: admin delete"
  on public.project_images for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- posts — aktualności
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  cover_image_path text,
  published boolean not null default false,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "posts: public read published" on public.posts;
create policy "posts: public read published"
  on public.posts for select
  using (published = true or public.is_admin());

drop policy if exists "posts: admin insert" on public.posts;
create policy "posts: admin insert"
  on public.posts for insert
  with check (public.is_admin());

drop policy if exists "posts: admin update" on public.posts;
create policy "posts: admin update"
  on public.posts for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "posts: admin delete" on public.posts;
create policy "posts: admin delete"
  on public.posts for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- promotions — promocje
-- ---------------------------------------------------------------------------
create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  cover_image_path text,
  active boolean not null default false,
  valid_from date,
  valid_until date,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists promotions_active_idx on public.promotions (active, valid_until);

drop trigger if exists set_promotions_updated_at on public.promotions;
create trigger set_promotions_updated_at
  before update on public.promotions
  for each row execute function public.set_updated_at();

alter table public.promotions enable row level security;

drop policy if exists "promotions: public read active" on public.promotions;
create policy "promotions: public read active"
  on public.promotions for select
  using (active = true or public.is_admin());

drop policy if exists "promotions: admin insert" on public.promotions;
create policy "promotions: admin insert"
  on public.promotions for insert
  with check (public.is_admin());

drop policy if exists "promotions: admin update" on public.promotions;
create policy "promotions: admin update"
  on public.promotions for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "promotions: admin delete" on public.promotions;
create policy "promotions: admin delete"
  on public.promotions for delete
  using (public.is_admin());
