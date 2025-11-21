-- STEP-BY-STEP MIGRATION for saved_models table
-- Run each step ONE AT A TIME and check for errors

-- ============================================
-- STEP 1: Drop old constraints
-- ============================================
ALTER TABLE public.saved_models DROP CONSTRAINT IF EXISTS saved_models_model_id_fkey;
ALTER TABLE public.saved_models DROP CONSTRAINT IF EXISTS saved_models_user_id_model_id_key;

-- ============================================
-- STEP 2: Add new columns (nullable first)
-- ============================================
ALTER TABLE public.saved_models ADD COLUMN IF NOT EXISTS model_name text;
ALTER TABLE public.saved_models ADD COLUMN IF NOT EXISTS model_data jsonb;

-- ============================================
-- STEP 3: Drop old model_id column
-- ============================================
ALTER TABLE public.saved_models DROP COLUMN IF EXISTS model_id;

-- ============================================
-- STEP 4: Now make columns NOT NULL (safe because they're new)
-- ============================================
-- Only run this if you're starting fresh or have migrated data
-- ALTER TABLE public.saved_models ALTER COLUMN model_name SET NOT NULL;
-- ALTER TABLE public.saved_models ALTER COLUMN model_data SET NOT NULL;

-- ============================================
-- STEP 5: Add unique constraint
-- ============================================
ALTER TABLE public.saved_models ADD CONSTRAINT saved_models_user_id_model_name_key UNIQUE (user_id, model_name);

-- ============================================
-- STEP 6: Create indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_saved_models_user ON public.saved_models(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_models_name ON public.saved_models(user_id, model_name);

-- ============================================
-- SUCCESS! Now you can run the rest of safe_migration.sql
-- starting from Step 2 (Create missing tables)
-- ============================================
