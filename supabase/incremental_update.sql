-- Incremental Update: Run this in your Supabase SQL Editor
-- This script safely adds missing tables and columns without breaking existing ones.

-- 1. Query History (For the History Page)
create table if not exists public.query_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  query_text text,
  query_type text,
  inferred_data_type text,
  inferred_task_type text,
  recommended_models jsonb,
  execution_time_ms integer,
  hf_inference_success boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for query_history
alter table public.query_history enable row level security;

-- Safely create policies for query_history
do $$
begin
    if not exists (select 1 from pg_policies where tablename = 'query_history' and policyname = 'Users can view their own query history') then
        create policy "Users can view their own query history" on public.query_history for select using (auth.uid() = user_id);
    end if;
    if not exists (select 1 from pg_policies where tablename = 'query_history' and policyname = 'Users can insert query history') then
        create policy "Users can insert query history" on public.query_history for insert with check (auth.uid() = user_id);
    end if;
end $$;

-- 2. User Preferences (For the Settings Page)
create table if not exists public.user_preferences (
  user_id uuid references auth.users(id) on delete cascade primary key,
  preferred_frameworks text[] default ARRAY['pytorch'],
  preferred_deployment text default 'cloud',
  notifications_enabled boolean default true,
  theme text default 'dark',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for user_preferences
alter table public.user_preferences enable row level security;

-- Safely create policies for user_preferences
do $$
begin
    if not exists (select 1 from pg_policies where tablename = 'user_preferences' and policyname = 'Users can view their own preferences') then
        create policy "Users can view their own preferences" on public.user_preferences for select using (auth.uid() = user_id);
    end if;
    if not exists (select 1 from pg_policies where tablename = 'user_preferences' and policyname = 'Users can update their own preferences') then
        create policy "Users can update their own preferences" on public.user_preferences for update using (auth.uid() = user_id);
    end if;
    if not exists (select 1 from pg_policies where tablename = 'user_preferences' and policyname = 'Users can insert their own preferences') then
        create policy "Users can insert their own preferences" on public.user_preferences for insert with check (auth.uid() = user_id);
    end if;
end $$;

-- 3. Saved Models (For "Save to History" / Favorites)
create table if not exists public.saved_models (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  model_id uuid references public.models(id) on delete cascade not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, model_id)
);

-- Enable RLS for saved_models
alter table public.saved_models enable row level security;

-- Safely create policies for saved_models
do $$
begin
    if not exists (select 1 from pg_policies where tablename = 'saved_models' and policyname = 'Users can view their saved models') then
        create policy "Users can view their saved models" on public.saved_models for select using (auth.uid() = user_id);
    end if;
    if not exists (select 1 from pg_policies where tablename = 'saved_models' and policyname = 'Users can save models') then
        create policy "Users can save models" on public.saved_models for insert with check (auth.uid() = user_id);
    end if;
    if not exists (select 1 from pg_policies where tablename = 'saved_models' and policyname = 'Users can delete their saved models') then
        create policy "Users can delete their saved models" on public.saved_models for delete using (auth.uid() = user_id);
    end if;
end $$;

-- 4. Indexes (Safely create if not exists)
create index if not exists idx_query_history_user on public.query_history(user_id);
create index if not exists idx_query_history_created on public.query_history(created_at desc);
