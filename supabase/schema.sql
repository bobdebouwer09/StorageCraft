create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    display_name text not null check (char_length(btrim(display_name)) between 1 and 32),
    username text,
    created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists username text;
alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format
    check (username is null or (
        char_length(username) between 3 and 20
        and username = lower(username)
        and username ~ '^[a-z0-9_]+$'
    ));
create unique index if not exists profiles_username_unique_idx
    on public.profiles (username) where username is not null;

create table if not exists public.storages (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users (id) on delete cascade,
    name text not null check (char_length(btrim(name)) between 1 and 80),
    is_public boolean not null default false,
    data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists storages_owner_id_idx on public.storages (owner_id);
create index if not exists storages_public_created_at_idx
    on public.storages (created_at desc) where is_public = true;

create or replace function public.set_storage_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists set_storage_updated_at on public.storages;
create trigger set_storage_updated_at
before update on public.storages
for each row execute function public.set_storage_updated_at();

alter table public.profiles enable row level security;
alter table public.storages enable row level security;

drop policy if exists "Authenticated users can view profiles" on public.profiles;
create policy "Authenticated users can view profiles"
on public.profiles for select
to authenticated
using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Owners and public storages are visible" on public.storages;
create policy "Owners and public storages are visible"
on public.storages for select
to authenticated
using ((select auth.uid()) = owner_id or is_public = true);

drop policy if exists "Users can create their own storages" on public.storages;
create policy "Users can create their own storages"
on public.storages for insert
to authenticated
with check ((select auth.uid()) = owner_id);

drop policy if exists "Users can update their own storages" on public.storages;
create policy "Users can update their own storages"
on public.storages for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

drop policy if exists "Users can delete their own storages" on public.storages;
create policy "Users can delete their own storages"
on public.storages for delete
to authenticated
using ((select auth.uid()) = owner_id);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.storages to authenticated;
grant usage on schema public to authenticated;
