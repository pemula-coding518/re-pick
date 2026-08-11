-- ============================================================================
-- Repick — Supabase setup (table, RLS, storage bucket + policies)
-- Jalankan sekali di: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================================

-- 1) Products table ----------------------------------------------------------
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  price       text,                                   -- contoh: 'Rp 150.000'
  status      text not null default 'SOLD OUT'
              check (status in ('SOLD OUT', 'AVAILABLE')),
  image_front text not null,                          -- Public URL foto depan
  image_back  text,                                   -- Public URL foto belakang (nullable)
  description text,
  category    text,                                   -- hoodies | tracktops | windbreakers (opsional)
  created_at  timestamptz not null default now()
);

-- 2) Row Level Security ------------------------------------------------------
-- Publik hanya boleh MEMBACA katalog; hanya user yang login (authenticated,
-- mis. akun admin yang dibuat di Authentication → Users) boleh menulis.
alter table public.products enable row level security;

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (true);

drop policy if exists "products_admin_insert" on public.products;
create policy "products_admin_insert" on public.products
  for insert to authenticated with check (true);

drop policy if exists "products_admin_update" on public.products;
create policy "products_admin_update" on public.products
  for update to authenticated using (true) with check (true);

drop policy if exists "products_admin_delete" on public.products;
create policy "products_admin_delete" on public.products
  for delete to authenticated using (true);

-- 3) Public storage bucket 'jacket-images' -----------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'jacket-images',
  'jacket-images',
  true,
  5242880, -- 5 MB per foto
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do nothing;

-- 4) Storage policies: publik boleh lihat, authenticated boleh tulis ----------
drop policy if exists "jacket_images_public_read" on storage.objects;
create policy "jacket_images_public_read" on storage.objects
  for select using (bucket_id = 'jacket-images');

drop policy if exists "jacket_images_admin_insert" on storage.objects;
create policy "jacket_images_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'jacket-images');

drop policy if exists "jacket_images_admin_update" on storage.objects;
create policy "jacket_images_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'jacket-images');

drop policy if exists "jacket_images_admin_delete" on storage.objects;
create policy "jacket_images_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'jacket-images');

-- Setelah ini:
--   1. Buat akun admin di Authentication → Users → Add user (email + password).
--   2. Buka https://<domain>/admin, login, lalu kelola katalog lewat panel.
