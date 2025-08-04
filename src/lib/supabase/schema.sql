-- Drop existing policies and table if they exist (for clean setup)
DROP POLICY IF EXISTS "Allow anonymous access to invitations" ON invitations;
DROP POLICY IF EXISTS "public can read invitations" ON invitations;
DROP POLICY IF EXISTS "authenticated can manage invitations" ON invitations;
DROP TABLE IF EXISTS invitations;

-- Create the invitations table
CREATE TABLE invitations (
  id TEXT PRIMARY KEY,
  link TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  user_name TEXT,
  login_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data with more invitations
INSERT INTO invitations (id, link, status, user_name, login_email, created_at)
VALUES
  ('inv_sample1', 'https://your-app.vercel.app/invite/inv_sample1', 'open', NULL, 'ws1@groupon.com', '2024-01-15T00:00:00Z'),
  ('inv_sample2', 'https://your-app.vercel.app/invite/inv_sample2', 'open', NULL, 'ws2@groupon.com', '2024-01-16T00:00:00Z'),
  ('inv_sample3', 'https://your-app.vercel.app/invite/inv_sample3', 'open', NULL, 'ws3@groupon.com', '2024-01-17T00:00:00Z'),
  ('inv_sample4', 'https://your-app.vercel.app/invite/inv_sample4', 'open', NULL, 'ws4@groupon.com', '2024-01-18T00:00:00Z'),
  ('inv_sample5', 'https://your-app.vercel.app/invite/inv_sample5', 'open', NULL, 'ws5@groupon.com', '2024-01-19T00:00:00Z'),
  ('inv_sample6', 'https://your-app.vercel.app/invite/inv_sample6', 'open', NULL, 'ws6@groupon.com', '2024-01-20T00:00:00Z'),
  ('inv_sample7', 'https://your-app.vercel.app/invite/inv_sample7', 'open', NULL, 'ws7@groupon.com', '2024-01-21T00:00:00Z'),
  ('inv_sample8', 'https://your-app.vercel.app/invite/inv_sample8', 'open', NULL, 'ws8@groupon.com', '2024-01-22T00:00:00Z');

-- Enable Row Level Security
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policy for all operations
CREATE POLICY "invitations_policy" ON invitations
  FOR ALL 
  TO public, anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Grant explicit permissions to anon role
GRANT ALL ON invitations TO anon;
GRANT ALL ON invitations TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;