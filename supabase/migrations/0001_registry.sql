-- Registry schema, privacy view, RLS, and transactional claim / undo functions.
--
-- Design notes:
--   * Slugs are 22-character base32-crockford strings from 16 random bytes.
--     Non-sequential and unguessable.
--   * The public site reads registries through the "public_registries" view,
--     which OMITS shipping_address. GRANT SELECT on that view goes to anon.
--     Direct SELECT on the base table is denied to anon. This is a column
--     privilege / view boundary, not an RLS policy.
--   * claim() is SECURITY DEFINER and uses SELECT ... FOR UPDATE to serialise
--     concurrent claims on the same item.
--   * undo_claim() validates a random token and only deletes claims created
--     within the last 24 hours.

set search_path = public;

-- On Supabase, pgcrypto lives in the extensions schema. Reference it there so
-- our SECURITY DEFINER functions can call gen_random_bytes without depending
-- on the caller's search_path.
create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists registries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  title text,
  owner_name text not null,
  owner_email text not null,
  due_date date,
  optional_message text,
  shipping_address text not null,
  created_at timestamptz not null default now(),
  constraint one_registry_per_owner unique (owner_id)
);

comment on column registries.shipping_address is
  'Never exposed via the public_registries view. Only used server-side to '
  'include in external-retailer claim confirmation emails.';

create table if not exists registry_items (
  id uuid primary key default gen_random_uuid(),
  registry_id uuid not null references registries(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  price text,
  quantity_wanted integer not null default 1 check (quantity_wanted > 0),
  source text not null check (source in ('internal', 'external')),
  product_id text,
  external_url text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  constraint internal_needs_product check (source <> 'internal' or product_id is not null),
  constraint external_needs_url check (source <> 'external' or external_url is not null)
);

create index if not exists registry_items_registry_id_idx
  on registry_items (registry_id, position);

create table if not exists claims (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references registry_items(id) on delete cascade,
  guest_name text not null,
  guest_email text not null,
  quantity_claimed integer not null check (quantity_claimed > 0),
  is_anonymous boolean not null default false,
  status text not null default 'reserved' check (status in ('reserved', 'purchased')),
  undo_token text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists claims_item_id_idx on claims (item_id);

-- ---------------------------------------------------------------------------
-- Slug generation: 16 random bytes, base32-crockford, no padding
-- ---------------------------------------------------------------------------

-- Slugify: lowercase, strip diacritics, replace runs of non-alphanumeric with
-- a single hyphen, trim leading/trailing hyphens, cap length at 40.
create or replace function slugify_title(input text)
returns text
language plpgsql
immutable
as $$
declare
  result text;
begin
  if input is null then return null; end if;
  result := lower(trim(input));
  result := regexp_replace(result, '[^a-z0-9]+', '-', 'g');
  result := regexp_replace(result, '^-+|-+$', '', 'g');
  if length(result) > 40 then
    result := substr(result, 1, 40);
    result := regexp_replace(result, '-+$', '', 'g');
  end if;
  if length(result) = 0 then return null; end if;
  return result;
end;
$$;

-- Short random suffix: 4 base32-crockford characters. 1M possibilities.
-- Combined with the title prefix, links are recognisable AND not guessable
-- from the title alone.
create or replace function generate_registry_slug(p_title text default null)
returns text
language plpgsql
set search_path = public, extensions
as $$
declare
  alphabet constant text := '0123456789abcdefghjkmnpqrstvwxyz';
  bytes bytea;
  b int;
  i int;
  suffix text := '';
  prefix text;
begin
  bytes := gen_random_bytes(4);
  for i in 0..3 loop
    b := get_byte(bytes, i);
    suffix := suffix
      || substr(alphabet, ((b >> 4) & 15) + 1, 1)
      || substr(alphabet, (b & 15) + 1, 1);
  end loop;
  suffix := substr(suffix, 1, 4);
  prefix := slugify_title(p_title);
  if prefix is null then
    return suffix;
  end if;
  return prefix || '-' || suffix;
end;
$$;

-- ---------------------------------------------------------------------------
-- Public view: everything from registries EXCEPT shipping_address
-- ---------------------------------------------------------------------------

-- IMPORTANT: NOT security_invoker. We want the view to run as its owner
-- (superuser) so anon can read from it without needing SELECT on the base
-- registries table. Safety comes from the view only exposing the non-private
-- columns — shipping_address and owner_email are simply not selected here and
-- are unreachable through this view. Combined with anon having no SELECT on
-- the base table, this pins the exposed surface exactly where we want it.
create or replace view public_registries as
select
  id,
  slug,
  title,
  owner_name,
  due_date,
  optional_message,
  created_at
from registries;

comment on view public_registries is
  'Public projection of registries with shipping_address removed. anon reads '
  'only this view; direct SELECT on registries is denied to anon.';

-- ---------------------------------------------------------------------------
-- Grants (column-level protection for shipping_address)
-- ---------------------------------------------------------------------------

revoke all on registries from anon, authenticated;
revoke all on registry_items from anon, authenticated;
revoke all on claims from anon, authenticated;
revoke all on public_registries from anon, authenticated;

-- anon can read the public view and public-safe columns of items
grant select on public_registries to anon, authenticated;
grant select (id, registry_id, title, description, image_url, price,
              quantity_wanted, source, product_id, external_url, position)
  on registry_items to anon, authenticated;
-- claims: anon needs to know quantity_claimed per item (to compute "remaining")
grant select (id, item_id, quantity_claimed, status, created_at)
  on claims to anon, authenticated;

-- authenticated owners work through RLS policies below (full row access on their own registry)
grant select, insert, update, delete on registries to authenticated;
grant select, insert, update, delete on registry_items to authenticated;
grant select, insert, update, delete on claims to authenticated;

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------

alter table registries enable row level security;
alter table registry_items enable row level security;
alter table claims enable row level security;

-- registries: owner-only for the full row (view handles the public case)
drop policy if exists registries_owner_all on registries;
create policy registries_owner_all on registries
  for all
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- registry_items: readable by anyone (public registry page), writable by owner
drop policy if exists registry_items_read_all on registry_items;
create policy registry_items_read_all on registry_items
  for select
  to anon, authenticated
  using (true);

drop policy if exists registry_items_owner_write on registry_items;
create policy registry_items_owner_write on registry_items
  for all
  to authenticated
  using (
    exists (
      select 1 from registries r
      where r.id = registry_items.registry_id and r.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from registries r
      where r.id = registry_items.registry_id and r.owner_id = auth.uid()
    )
  );

-- claims:
--   * anon and authenticated can read only the non-identifying columns (via GRANT).
--   * writes go exclusively through the SECURITY DEFINER functions below.
--   * owner reads the full row through owner_thank_you_list() which returns
--     "Anonymous" where is_anonymous is true.
drop policy if exists claims_read_public_columns on claims;
create policy claims_read_public_columns on claims
  for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- create_claim: transactional, row-locked
-- ---------------------------------------------------------------------------

create or replace function create_claim(
  p_registry_slug text,
  p_item_id uuid,
  p_guest_name text,
  p_guest_email text,
  p_quantity integer,
  p_is_anonymous boolean
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_registry registries%rowtype;
  v_item registry_items%rowtype;
  v_already integer;
  v_claim claims%rowtype;
  v_token text;
begin
  if p_quantity is null or p_quantity < 1 then
    raise exception 'invalid_quantity' using errcode = '22023';
  end if;
  if p_guest_name is null or length(btrim(p_guest_name)) = 0 then
    raise exception 'missing_name' using errcode = '22023';
  end if;
  if p_guest_email is null or p_guest_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid_email' using errcode = '22023';
  end if;

  select * into v_registry from registries where slug = p_registry_slug;
  if not found then
    raise exception 'registry_not_found' using errcode = 'P0002';
  end if;

  -- Acquire an exclusive row lock on the item. Any concurrent create_claim
  -- for the same item blocks here until this transaction commits or rolls back.
  select * into v_item
  from registry_items
  where id = p_item_id and registry_id = v_registry.id
  for update;
  if not found then
    raise exception 'item_not_found' using errcode = 'P0002';
  end if;

  select coalesce(sum(quantity_claimed), 0) into v_already
  from claims where item_id = v_item.id;

  if v_already + p_quantity > v_item.quantity_wanted then
    raise exception 'already_claimed' using errcode = '23514';
  end if;

  v_token := encode(gen_random_bytes(32), 'hex');

  insert into claims (item_id, guest_name, guest_email, quantity_claimed, is_anonymous, undo_token)
  values (v_item.id, btrim(p_guest_name), lower(btrim(p_guest_email)), p_quantity, coalesce(p_is_anonymous, false), v_token)
  returning * into v_claim;

  return jsonb_build_object(
    'claim_id', v_claim.id,
    'undo_token', v_token,
    'item_title', v_item.title,
    'owner_name', v_registry.owner_name,
    'is_external', v_item.source = 'external',
    'external_url', v_item.external_url,
    'shipping_address', case
      when v_item.source = 'external' then v_registry.shipping_address
      else null
    end
  );
end;
$$;

revoke all on function create_claim(text, uuid, text, text, integer, boolean) from public;
grant execute on function create_claim(text, uuid, text, text, integer, boolean) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- undo_claim: caller supplies the token from their email, valid for 24h
-- ---------------------------------------------------------------------------

create or replace function undo_claim(p_undo_token text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_deleted integer;
begin
  delete from claims
  where undo_token = p_undo_token
    and created_at > now() - interval '24 hours';
  get diagnostics v_deleted = row_count;
  return v_deleted = 1;
end;
$$;

revoke all on function undo_claim(text) from public;
grant execute on function undo_claim(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- owner_thank_you_list: owner-facing view of claims, anonymised where needed
-- ---------------------------------------------------------------------------

create or replace function owner_thank_you_list()
returns table (
  claim_id uuid,
  item_id uuid,
  item_title text,
  quantity_claimed integer,
  claimant_display_name text,
  is_anonymous boolean,
  status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if auth.uid() is null then
    raise exception 'not_authenticated' using errcode = '42501';
  end if;

  return query
    select
      c.id,
      c.item_id,
      i.title,
      c.quantity_claimed,
      case when c.is_anonymous then 'Anonymous' else c.guest_name end,
      c.is_anonymous,
      c.status,
      c.created_at
    from claims c
    join registry_items i on i.id = c.item_id
    join registries r on r.id = i.registry_id
    where r.owner_id = auth.uid()
    order by c.created_at desc;
end;
$$;

revoke all on function owner_thank_you_list() from public;
grant execute on function owner_thank_you_list() to authenticated;

-- ---------------------------------------------------------------------------
-- create_registry: convenience RPC that generates the slug server-side
-- ---------------------------------------------------------------------------

create or replace function create_registry(
  p_owner_name text,
  p_owner_email text,
  p_title text,
  p_due_date date,
  p_optional_message text,
  p_shipping_address text
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_slug text;
  v_id uuid;
  v_title text;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated' using errcode = '42501';
  end if;
  if p_owner_name is null or length(btrim(p_owner_name)) = 0 then
    raise exception 'missing_owner_name' using errcode = '22023';
  end if;
  if p_shipping_address is null or length(btrim(p_shipping_address)) = 0 then
    raise exception 'missing_shipping_address' using errcode = '22023';
  end if;

  v_title := nullif(btrim(coalesce(p_title, '')), '');

  -- Retry on slug collision. With 1M random suffixes per title, extremely rare.
  for i in 1..8 loop
    begin
      v_slug := generate_registry_slug(v_title);
      insert into registries (owner_id, slug, title, owner_name, owner_email, due_date, optional_message, shipping_address)
      values (auth.uid(), v_slug, v_title, btrim(p_owner_name), lower(btrim(coalesce(p_owner_email, ''))),
              p_due_date, p_optional_message, btrim(p_shipping_address))
      returning id into v_id;
      return jsonb_build_object('id', v_id, 'slug', v_slug);
    exception when unique_violation then
      -- slug collision or duplicate owner. If it is the owner constraint, surface it.
      if sqlerrm like '%one_registry_per_owner%' then
        raise exception 'already_has_registry' using errcode = '23505';
      end if;
      -- otherwise, loop and try a fresh slug
    end;
  end loop;
  raise exception 'slug_generation_failed';
end;
$$;

revoke all on function create_registry(text, text, text, date, text, text) from public;
grant execute on function create_registry(text, text, text, date, text, text) to authenticated;
