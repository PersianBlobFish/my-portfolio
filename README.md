This is a Next.js portfolio that now reads featured projects from Supabase.

## Supabase setup

Add these variables to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-or-publishable-key
PROJECT_CARD_1_TITLE=Your first project title
PROJECT_CARD_1_DESCRIPTION=Your first project description
PROJECT_CARD_2_TITLE=Your second project title
PROJECT_CARD_2_DESCRIPTION=Your second project description
PROJECT_CARD_3_TITLE=Your third project title
PROJECT_CARD_3_DESCRIPTION=Your third project description
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

The homepage queries this table in `app/page.tsx` through `lib/supabase/queries.ts`.

Project card text can be managed independently from Supabase through the `PROJECT_CARD_*` environment variables. Supabase still provides the image and project link. If an env value is left empty, the app falls back to the Supabase `title` and `description` fields. If the table is empty or unavailable, the UI falls back to placeholder cards.

## Getting started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit `app/page.tsx` and the homepage components to customize the content around the Supabase-backed data.
