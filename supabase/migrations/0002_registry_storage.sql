-- Storage bucket for registry item images uploaded by owners.
--
-- Layout: files live at `{auth.uid()}/{random uuid}.{ext}` so each owner has
-- their own path prefix that RLS can key off.

insert into storage.buckets (id, name, public)
values ('registry-images', 'registry-images', true)
on conflict (id) do nothing;

-- Anyone can read the images (they are shown on public registry pages).
drop policy if exists "registry_images_public_read" on storage.objects;
create policy "registry_images_public_read" on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'registry-images');

-- Only the authenticated owner can INSERT into a path that begins with their uid.
drop policy if exists "registry_images_owner_upload" on storage.objects;
create policy "registry_images_owner_upload" on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'registry-images'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Only the owner can DELETE their own uploads.
drop policy if exists "registry_images_owner_delete" on storage.objects;
create policy "registry_images_owner_delete" on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'registry-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
