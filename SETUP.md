# 🚀 Quick Setup Guide - Árbol Familiar

## Prerequisites
- Node.js 18 or higher
- A Supabase account (free tier works great!)
- Git (optional)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to be provisioned (takes ~2 minutes)
3. Go to **Settings** → **API** in your Supabase dashboard
4. Copy your **Project URL** and **anon/public key**

## Step 3: Run the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase-schema.sql` from this project
4. Paste it into the SQL editor
5. Click **Run** to execute the schema

This will create:
- `profiles` table for user information
- `family_members` table for family data
- `relationships` table for family connections
- Row Level Security (RLS) policies for data protection
- Necessary indexes for performance

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🎉 You're Ready!

Your genealogic tree website is now running. You can:

- 👀 **View the demo** on the home page
- 🌳 **Explore the tree** at `/tree`
- 👥 **Manage members** at `/members`
- 🔐 **Test authentication** at `/auth/login` and `/auth/signup`

## 📝 Next Steps

### Enable Authentication (Optional but Recommended)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Configure your preferred authentication methods:
   - Email/Password (enabled by default)
   - Google OAuth
   - GitHub OAuth
   - etc.

3. For OAuth providers, you'll need to:
   - Create OAuth apps with the providers
   - Add the callback URLs from Supabase
   - Configure the credentials in Supabase

### Add Real Functionality

The current implementation has placeholder functions. To connect them:

1. **Update Authentication Pages**:
   - Edit `app/auth/login/page.tsx`
   - Edit `app/auth/signup/page.tsx`
   - Uncomment the Supabase auth calls

2. **Connect Family Member Management**:
   - Edit `app/members/page.tsx` to use the Supabase helpers
   - Edit `app/tree/page.tsx` to fetch real data

3. **Implement Member Form**:
   - The `MemberForm` component is ready
   - Just connect it to your member pages

## 🔧 Development Tips

### Generate TypeScript Types from Supabase

You can generate proper TypeScript types from your Supabase schema:

```bash
npx supabase gen types typescript --project-id your-project-ref > types/supabase-generated.ts
```

Then update `types/supabase.ts` to use the generated types.

### Hot Reload

Next.js automatically reloads when you save files. Just edit and watch the magic happen!

### Dark Mode

The site automatically detects system preferences. Test it by changing your system theme.

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

### Supabase Connection Issues
- Verify your environment variables are correct
- Make sure you don't have trailing slashes in SUPABASE_URL
- Check that your Supabase project is active

### Port Already in Use
```bash
# Kill the process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Need Help?

Open an issue on the repository or consult the documentation links above.

Happy tree building! 🌳✨

