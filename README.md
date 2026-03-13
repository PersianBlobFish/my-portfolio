This is a Next.js portfolio that now reads featured projects from Supabase.

## Supabase setup

Add these variables to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-or-publishable-key
```

Create a `projects` table with these columns:

```sql
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  project_url text,
  display_order integer default 0
);
```

The homepage queries this table in `app/page.tsx` through `lib/supabase/queries.ts`. If the table is empty or unavailable, the UI falls back to placeholder cards.

## Getting started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit `app/page.tsx` and the homepage components to customize the content around the Supabase-backed data.
