# Vercel Deployment Steps

## 1. Deploy your app first
```bash
# Push to GitHub and deploy
vercel --prod
```

## 2. Add Vercel Postgres from Dashboard
1. Go to your project in Vercel Dashboard
2. Click on the **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Choose a name and region
6. Click **Create**

## 3. Connect database to your project
- Vercel will automatically add all the environment variables to your project
- No manual configuration needed!

## 4. Test your database
After deployment, your API routes will automatically:
- Create the table if it doesn't exist
- Start accepting requests immediately

## 5. Optional: Use Vercel CLI for local development
```bash
# Pull environment variables to local
vercel env pull .env.local

# Now you can develop locally with the same database
npm run dev
```

## Key Advantages of Vercel Postgres:
- ✅ **Zero configuration** - environment variables auto-added
- ✅ **Connection pooling** built-in
- ✅ **Edge-optimized** for fast global access
- ✅ **Automatic backups**
- ✅ **Scales with your app**
- ✅ **Free tier** available (60 hours of compute time)

## Development vs Production:
- **Local development**: Use SQLite version for speed
- **Production**: Switch to Vercel Postgres for deployment
- The API code stays exactly the same!