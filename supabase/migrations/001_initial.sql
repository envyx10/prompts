-- =============================================================
-- Promptly — Initial Schema
-- Run this in your Supabase project: SQL Editor → New Query
-- =============================================================

-- ---------------------------------------------------------------
-- 1. PROFILES
-- Mirrors auth.users with public columns.
-- Created automatically via trigger on signup.
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  provider    text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- Auto-create a profile row when a user signs up via OAuth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, provider)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_app_meta_data->>'provider'
  )
  on conflict (id) do update set
    email      = excluded.email,
    full_name  = excluded.full_name,
    avatar_url = excluded.avatar_url,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------
-- 2. PROMPTS
-- Public prompts browsable by anyone.
-- ---------------------------------------------------------------
create table if not exists public.prompts (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  content     text        not null,
  description text        not null default '',
  category    text        not null,
  language    text        not null check (language in ('es', 'en', 'both')),
  tags        text[]      not null default '{}',
  author_id   uuid        references public.profiles (id) on delete set null,
  is_public   boolean     not null default true,
  use_count   integer     not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Index for filtered browsing (category + language are the most common filters)
create index if not exists prompts_category_idx  on public.prompts (category);
create index if not exists prompts_language_idx  on public.prompts (language);
create index if not exists prompts_is_public_idx on public.prompts (is_public);

-- Full-text search index over title + description
create index if not exists prompts_fts_idx
  on public.prompts
  using gin (to_tsvector('simple', title || ' ' || description));

-- ---------------------------------------------------------------
-- 3. USER LIBRARY
-- Mapping of user ↔ saved prompt (many-to-many).
-- ---------------------------------------------------------------
create table if not exists public.user_library (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  prompt_id  uuid not null references public.prompts (id) on delete cascade,
  created_at timestamptz not null default now(),

  unique (user_id, prompt_id)   -- no duplicate saves
);

create index if not exists user_library_user_idx on public.user_library (user_id);

-- ---------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- ---------------------------------------------------------------

-- profiles ---
alter table public.profiles enable row level security;

-- Users can read any profile (needed for public prompt attribution)
create policy "profiles: public read"
  on public.profiles for select
  using (true);

-- Users can only update their own profile
create policy "profiles: owner update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- prompts ---
alter table public.prompts enable row level security;

-- Anyone can read public prompts
create policy "prompts: public read"
  on public.prompts for select
  using (is_public = true);

-- Authenticated users can read their own private prompts
create policy "prompts: owner read private"
  on public.prompts for select
  using (auth.uid() = author_id);

-- Authenticated users can create prompts
create policy "prompts: authenticated insert"
  on public.prompts for insert
  to authenticated
  with check (auth.uid() = author_id);

-- Authors can update and delete their own prompts
create policy "prompts: owner update"
  on public.prompts for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "prompts: owner delete"
  on public.prompts for delete
  using (auth.uid() = author_id);

-- user_library ---
alter table public.user_library enable row level security;

-- Users can only see their own library entries
create policy "library: owner select"
  on public.user_library for select
  using (auth.uid() = user_id);

-- Users can only insert into their own library
create policy "library: owner insert"
  on public.user_library for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can only delete their own library entries
create policy "library: owner delete"
  on public.user_library for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------
-- 5. HELPER FUNCTION
-- Increment use_count safely without exposing update policy to all
-- ---------------------------------------------------------------
create or replace function public.increment_prompt_use(prompt_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.prompts
  set use_count = use_count + 1
  where id = prompt_id and is_public = true;
end;
$$;
