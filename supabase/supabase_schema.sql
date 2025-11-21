-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Query History Table
create table if not exists query_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  query_text text not null,
  query_type text, -- 'text', 'image', etc.
  recommendation_json jsonb, -- Store the full JSON response from the LLM
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for query_history
alter table query_history enable row level security;

-- Drop existing policies to avoid conflicts
drop policy if exists "Users can view their own history" on query_history;
drop policy if exists "Users can insert their own history" on query_history;

create policy "Users can view their own history"
  on query_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own history"
  on query_history for insert
  with check (auth.uid() = user_id);

-- 2. User Settings / Preferences Table
create table if not exists user_preferences (
  user_id uuid references auth.users(id) on delete cascade primary key,
  theme text default 'dark',
  default_framework text default 'pytorch', -- 'pytorch', 'tensorflow', 'sklearn'
  email_notifications boolean default true,
  api_usage_limit int default 100,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for user_preferences
alter table user_preferences enable row level security;

-- Drop existing policies to avoid conflicts
drop policy if exists "Users can view their own preferences" on user_preferences;
drop policy if exists "Users can update their own preferences" on user_preferences;
drop policy if exists "Users can insert their own preferences" on user_preferences;

create policy "Users can view their own preferences"
  on user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on user_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert their own preferences"
  on user_preferences for insert
  with check (auth.uid() = user_id);

-- Trigger to create preferences on signup
create or replace function public.handle_new_user_preferences()
returns trigger as $$
begin
  insert into public.user_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing; -- Handle case where preferences already exist
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid duplication error (postgres doesn't support CREATE OR REPLACE TRIGGER)
drop trigger if exists on_auth_user_created_preferences on auth.users;

create trigger on_auth_user_created_preferences
  after insert on auth.users
  for each row execute procedure public.handle_new_user_preferences();
