-- Extended Schema for ModelForge User Management

-- ====================================
-- User Profile Table
-- ====================================
-- Store additional user information beyond auth.users
create table public.profiles (
  id uuid references auth.users(id) primary key,
  email text,
  full_name text,
  avatar_url text,
  company text,
  role text, -- e.g., 'Data Scientist', 'ML Engineer', 'Student'
  bio text,
  subscription_tier text default 'free', -- 'free', 'pro', 'enterprise'
  credits_remaining integer default 100, -- For usage limits
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatically create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ====================================
-- Saved Models (Favorites)
-- ====================================
create table public.saved_models (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  model_id uuid references public.models(id) on delete cascade not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, model_id) -- Prevent duplicate saves
);

alter table public.saved_models enable row level security;

create policy "Users can view their saved models"
  on public.saved_models for select
  using (auth.uid() = user_id);

create policy "Users can save models"
  on public.saved_models for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their saved models"
  on public.saved_models for delete
  using (auth.uid() = user_id);

-- ====================================
-- Query History (Enhanced)
-- ====================================
create table public.query_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  query_text text,
  query_type text, -- 'natural_language' or 'structured'
  inferred_data_type text, -- 'image', 'text', 'tabular', 'audio'
  inferred_task_type text, -- 'classification', 'regression', etc.
  recommended_models jsonb, -- Array of model IDs with scores
  execution_time_ms integer,
  hf_inference_success boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.query_history enable row level security;

create policy "Users can view their own query history"
  on public.query_history for select
  using (auth.uid() = user_id);

create policy "Users can insert query history"
  on public.query_history for insert
  with check (auth.uid() = user_id);

-- ====================================
-- User Preferences
-- ====================================
create table public.user_preferences (
  user_id uuid references auth.users(id) on delete cascade primary key,
  preferred_frameworks text[] default ARRAY['pytorch'], -- ['pytorch', 'tensorflow', 'sklearn']
  preferred_deployment text default 'cloud', -- 'cloud', 'edge', 'mobile'
  notifications_enabled boolean default true,
  theme text default 'dark', -- 'dark', 'light'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_preferences enable row level security;

create policy "Users can view their own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert their own preferences"
  on public.user_preferences for insert
  with check (auth.uid() = user_id);

-- ====================================
-- Model Feedback
-- ====================================
-- Allow users to rate/review recommended models
create table public.model_feedback (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  model_id uuid references public.models(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5),
  feedback_text text,
  was_helpful boolean,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.model_feedback enable row level security;

create policy "Users can view all feedback"
  on public.model_feedback for select
  using (true);

create policy "Users can submit feedback"
  on public.model_feedback for insert
  with check (auth.uid() = user_id);

-- ====================================
-- Usage Analytics
-- ====================================
create table public.usage_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  event_type text not null, -- 'query', 'save_model', 'export_code', etc.
  event_metadata jsonb,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.usage_stats enable row level security;

create policy "Users can insert their own usage stats"
  on public.usage_stats for insert
  with check (auth.uid() = user_id);

-- Only admins can view all stats (you'd need to implement admin role check)
create policy "Users can view their own usage stats"
  on public.usage_stats for select
  using (auth.uid() = user_id);

-- ====================================
-- Indexes for Performance
-- ====================================
create index idx_profiles_email on public.profiles(email);
create index idx_saved_models_user on public.saved_models(user_id);
create index idx_query_history_user on public.query_history(user_id);
create index idx_query_history_created on public.query_history(created_at desc);
create index idx_model_feedback_model on public.model_feedback(model_id);
create index idx_usage_stats_user_time on public.usage_stats(user_id, timestamp desc);

-- ====================================
-- Helper Views
-- ====================================
-- View for user dashboard stats
create or replace view user_dashboard_stats as
select 
  p.id as user_id,
  p.full_name,
  p.subscription_tier,
  p.credits_remaining,
  count(distinct qh.id) as total_queries,
  count(distinct sm.id) as saved_models_count,
  count(distinct mf.id) as feedback_given_count
from profiles p
left join query_history qh on p.id = qh.user_id
left join saved_models sm on p.id = sm.user_id
left join model_feedback mf on p.id = mf.user_id
group by p.id, p.full_name, p.subscription_tier, p.credits_remaining;

-- ====================================
-- Sample Data for Testing
-- ====================================
-- Note: This will only work after you have created a user through the signup flow
-- Uncomment and replace 'YOUR_USER_ID' with actual user ID after signup

-- insert into public.user_preferences (user_id, preferred_frameworks)
-- values ('YOUR_USER_ID', ARRAY['pytorch', 'tensorflow']);
