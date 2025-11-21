-- Critical Fix: Add DELETE policy for query_history
-- This fixes the bug where users cannot delete their history items

-- Enable RLS if not already enabled
ALTER TABLE query_history ENABLE ROW LEVEL SECURITY;

-- Drop existing delete policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Users can delete their own query history" ON query_history;

-- Create DELETE policy
CREATE POLICY "Users can delete their own query history"
ON query_history
FOR DELETE
USING (auth.uid() = user_id);

-- Verify policies (informational query, comment out if running as migration)
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies 
-- WHERE tablename = 'query_history';
