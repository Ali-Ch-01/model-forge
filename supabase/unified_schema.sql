-- Unified ModelForge Database Schema
-- Consolidated from schema.sql, extended-schema.sql, and supabase_schema.sql
-- Last Updated: 2025-11-22

-- ====================================
-- Extensions
-- ====================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- User Profile Table
-- ====================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  company text,
  role text, -- e.g., 'Data Scientist', 'ML Engineer', 'Student'
  bio text,
  subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  credits_remaining integer DEFAULT 100,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ====================================
-- Query History Table
-- ====================================
CREATE TABLE IF NOT EXISTS public.query_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  query_text text,
  query_type text, -- 'natural_language' or 'structured'
  inferred_data_type text, -- 'image', 'text', 'tabular', 'audio'
  inferred_task_type text, -- 'classification', 'regression', etc.
  recommended_models jsonb, -- Array of model recommendations
  execution_time_ms integer,
  hf_inference_success boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.query_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own query history" ON public.query_history;
CREATE POLICY "Users can view their own query history"
  ON public.query_history FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert query history" ON public.query_history;
CREATE POLICY "Users can insert query history"
  ON public.query_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own query history" ON public.query_history;
CREATE POLICY "Users can delete their own query history"
  ON public.query_history FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- User Preferences Table
-- ====================================
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  preferred_frameworks text[] DEFAULT ARRAY['pytorch'],
  preferred_deployment text DEFAULT 'cloud' CHECK (preferred_deployment IN ('cloud', 'edge', 'mobile')),
  notifications_enabled boolean DEFAULT true,
  theme text DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own preferences" ON public.user_preferences;
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own preferences" ON public.user_preferences;
CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own preferences" ON public.user_preferences;
CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Auto-create preferences on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_preferences()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
  VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_preferences ON auth.users;
CREATE TRIGGER on_auth_user_created_preferences
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_preferences();

-- ====================================
-- Saved Models Table
-- ====================================
CREATE TABLE IF NOT EXISTS public.saved_models (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  model_name text NOT NULL,
  model_data jsonb NOT NULL, -- Store full ModelRecommendation object
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, model_name)
);

ALTER TABLE public.saved_models ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their saved models" ON public.saved_models;
CREATE POLICY "Users can view their saved models"
  ON public.saved_models FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can save models" ON public.saved_models;
CREATE POLICY "Users can save models"
  ON public.saved_models FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their saved models" ON public.saved_models;
CREATE POLICY "Users can update their saved models"
  ON public.saved_models FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their saved models" ON public.saved_models;
CREATE POLICY "Users can delete their saved models"
  ON public.saved_models FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- Model Feedback Table
-- ====================================
CREATE TABLE IF NOT EXISTS public.model_feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  model_name text NOT NULL,
  query_id uuid REFERENCES public.query_history(id) ON DELETE SET NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback_text text,
  was_helpful boolean,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.model_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view all feedback" ON public.model_feedback;
CREATE POLICY "Users can view all feedback"
  ON public.model_feedback FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can submit feedback" ON public.model_feedback;
CREATE POLICY "Users can submit feedback"
  ON public.model_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own feedback" ON public.model_feedback;
CREATE POLICY "Users can update their own feedback"
  ON public.model_feedback FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own feedback" ON public.model_feedback;
CREATE POLICY "Users can delete their own feedback"
  ON public.model_feedback FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- Usage Stats Table
-- ====================================
CREATE TABLE IF NOT EXISTS public.usage_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  event_metadata jsonb,
  timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.usage_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own usage stats" ON public.usage_stats;
CREATE POLICY "Users can insert their own usage stats"
  ON public.usage_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own usage stats" ON public.usage_stats;
CREATE POLICY "Users can view their own usage stats"
  ON public.usage_stats FOR SELECT
  USING (auth.uid() = user_id);

-- ====================================
-- Indexes for Performance
-- ====================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_saved_models_user ON public.saved_models(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_models_name ON public.saved_models(user_id, model_name);
CREATE INDEX IF NOT EXISTS idx_query_history_user ON public.query_history(user_id);
CREATE INDEX IF NOT EXISTS idx_query_history_created ON public.query_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_model_feedback_model ON public.model_feedback(model_name);
CREATE INDEX IF NOT EXISTS idx_model_feedback_user ON public.model_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_time ON public.usage_stats(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_usage_stats_type ON public.usage_stats(event_type);

-- ====================================
-- Helper Views
-- ====================================
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT 
  p.id as user_id,
  p.full_name,
  p.subscription_tier,
  p.credits_remaining,
  COUNT(DISTINCT qh.id) as total_queries,
  COUNT(DISTINCT sm.id) as saved_models_count,
  COUNT(DISTINCT mf.id) as feedback_given_count
FROM profiles p
LEFT JOIN query_history qh ON p.id = qh.user_id
LEFT JOIN saved_models sm ON p.id = sm.user_id
LEFT JOIN model_feedback mf ON p.id = mf.user_id
GROUP BY p.id, p.full_name, p.subscription_tier, p.credits_remaining;
