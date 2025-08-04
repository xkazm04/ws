# Supabase + Vercel Setup Guide for Invitations

## Step 1: Create Supabase Database Table

1. **Deploy your Next.js app to Vercel first** (can be empty)
2. **Add Supabase integration** from Vercel Dashboard → Storage → Create Database → Supabase
3. **Click "Open in Supabase"** button from your Vercel project
4. **Go to SQL Editor** in your Supabase dashboard
5. **Run this SQL** to create your invitations table:

```sql
-- Create the invitations table
CREATE TABLE invitations (
  id TEXT PRIMARY KEY,
  link TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  user_name TEXT,
  login_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO invitations (id, link, status, user_name, login_email, created_at)
VALUES
  ('inv_sample1', 'https://your-app.vercel.app/invite/inv_sample1', 'open', NULL, 'ws1@groupon.com', '2024-01-15T00:00:00Z'),
  ('inv_sample2', 'https://your-app.vercel.app/invite/inv_sample2', 'accepted', 'John Doe', 'john@example.com', '2024-01-16T00:00:00Z'),
  ('inv_sample3', 'https://your-app.vercel.app/invite/inv_sample3', 'pending', NULL, 'jane@example.com', '2024-01-17T00:00:00Z');

-- Enable Row Level Security
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (adjust as needed for your security requirements)
CREATE POLICY "public can read invitations"
ON public.invitations
FOR SELECT TO anon
USING (true);

-- Create policy for authenticated users to insert/update (optional)
CREATE POLICY "authenticated can manage invitations"
ON public.invitations
FOR ALL TO authenticated
USING (true);
```

## Step 2: Create Next.js App (if you haven't already)

If starting fresh, use the Supabase template:
```bash
npx create-next-app@latest -e with-supabase your-invitation-app
cd your-invitation-app
```

## Step 3: Connect to Vercel Project

```bash
# Link your local project to Vercel
vercel link

# Pull environment variables from Vercel (includes Supabase config)
vercel env pull .env.local
```

## Step 4: Environment Variables

After running `vercel env pull`, your `.env.local` should contain:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 5: Install Dependencies (if needed)

```bash
npm install @supabase/supabase-js
```