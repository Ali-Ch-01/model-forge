-- Safe Schema Setup for Existing Database
-- Use this if you already have tables created

-- ====================================
-- Step 1: Update saved_models table structure
-- ====================================
DO $$
BEGIN
    -- Drop old foreign key if exists
    ALTER TABLE public.saved_models DROP CONSTRAINT IF EXISTS saved_models_model_id_fkey;
    ALTER TABLE public.saved_models DROP CONSTRAINT IF EXISTS saved_models_user_id_model_id_key;
    
    -- Add new columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'saved_models' AND column_name = 'model_name') THEN
        ALTER TABLE public.saved_models ADD COLUMN model_name text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'saved_models' AND column_name = 'model_data') THEN
        ALTER TABLE public.saved_models ADD COLUMN model_data jsonb;
    END IF;
    
    -- Drop old model_id column if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'saved_models' AND column_name = 'model_id') THEN
        ALTER TABLE public.saved_models DROP COLUMN model_id;
    END IF;
    
    -- Set NOT NULL constraints (after migration)
    ALTER TABLE public.saved_models ALTER COLUMN model_name SET NOT NULL;
    ALTER TABLE public.saved_models ALTER COLUMN model_data SET NOT NULL;
    
    -- Add unique constraint
    ALTER TABLE public.saved_models ADD CONSTRAINT saved_models_user_id_model_name_key UNIQUE (user_id, model_name);
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Migration already applied or error: %', SQLERRM;
END $$;

-- ====================================
-- Step 2: Create missing tables (only if they don't exist)
-- ====================================

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  company text,
  role text,
  bio text,
  subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  credits_remaining integer DEFAULT 100,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Model feedback table
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

-- Usage stats table
CREATE TABLE IF NOT EXISTS public.usage_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  event_metadata jsonb,
  timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================
-- Step 3: Enable RLS and create policies
-- ====================================

-- Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Saved models RLS (update policies)
ALTER TABLE public.saved_models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their saved models" ON public.saved_models;
CREATE POLICY "Users can view their saved models" ON public.saved_models FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can save models" ON public.saved_models;
CREATE POLICY "Users can save models" ON public.saved_models FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their saved models" ON public.saved_models;
CREATE POLICY "Users can update their saved models" ON public.saved_models FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their saved models" ON public.saved_models;
CREATE POLICY "Users can delete their saved models" ON public.saved_models FOR DELETE USING (auth.uid() = user_id);

-- Model feedback RLS
ALTER TABLE public.model_feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view all feedback" ON public.model_feedback;
CREATE POLICY "Users can view all feedback" ON public.model_feedback FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can submit feedback" ON public.model_feedback;
CREATE POLICY "Users can submit feedback" ON public.model_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update their own feedback" ON public.model_feedback;
CREATE POLICY "Users can update their own feedback" ON public.model_feedback FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete their own feedback" ON public.model_feedback;
CREATE POLICY "Users can delete their own feedback" ON public.model_feedback FOR DELETE USING (auth.uid() = user_id);

-- Usage stats RLS
ALTER TABLE public.usage_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert their own usage stats" ON public.usage_stats;
CREATE POLICY "Users can insert their own usage stats" ON public.usage_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can view their own usage stats" ON public.usage_stats;
CREATE POLICY "Users can view their own usage stats" ON public.usage_stats FOR SELECT USING (auth.uid() = user_id);

-- ====================================
-- Step 4: Create triggers
-- ====================================

-- Profile auto-creation
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

-- Preferences auto-creation
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
-- Step 5: Create indexes
-- ====================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_saved_models_user ON public.saved_models(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_models_name ON public.saved_models(user_id, model_name);
CREATE INDEX IF NOT EXISTS idx_model_feedback_model ON public.model_feedback(model_name);
CREATE INDEX IF NOT EXISTS idx_model_feedback_user ON public.model_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_stats_user_time ON public.usage_stats(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_usage_stats_type ON public.usage_stats(event_type);

-- ====================================
-- Step 6: Create view
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
