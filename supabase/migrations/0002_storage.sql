-- EDMAT — Supabase Storage: buckety i polityki dostępu
-- project-images  -> zdjęcia realizacji (projects / project_images)
-- site-images     -> okładki aktualności i promocji (posts / promotions)
-- Oba buckety są publiczne do ODCZYTU (public URL), zapis/edycja/usuwanie tylko dla admina.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Odczyt publiczny (dodatkowo do publicznego URL, przydatne dla listowania w kliencie).
drop policy if exists "project-images: public read" on storage.objects;
create policy "project-images: public read"
  on storage.objects for select
  using (bucket_id = 'project-images');

drop policy if exists "site-images: public read" on storage.objects;
create policy "site-images: public read"
  on storage.objects for select
  using (bucket_id = 'site-images');

-- Zapis/edycja/usuwanie wyłącznie dla zalogowanego administratora (admin_users).
drop policy if exists "project-images: admin insert" on storage.objects;
create policy "project-images: admin insert"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "project-images: admin update" on storage.objects;
create policy "project-images: admin update"
  on storage.objects for update
  using (bucket_id = 'project-images' and public.is_admin())
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "project-images: admin delete" on storage.objects;
create policy "project-images: admin delete"
  on storage.objects for delete
  using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "site-images: admin insert" on storage.objects;
create policy "site-images: admin insert"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "site-images: admin update" on storage.objects;
create policy "site-images: admin update"
  on storage.objects for update
  using (bucket_id = 'site-images' and public.is_admin())
  with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "site-images: admin delete" on storage.objects;
create policy "site-images: admin delete"
  on storage.objects for delete
  using (bucket_id = 'site-images' and public.is_admin());
