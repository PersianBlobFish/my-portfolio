# Home Page Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the portfolio home page into the Swiss-editorial layout of the "Williams" template (numbered two-column sections, oversized statement type, hairline dividers, project index list) while keeping the nav bar, dark mode, signature animation, and existing project modals.

**Architecture:** One new layout primitive (`EditorialSection` in `components/ds.tsx`) renders the numbered label-left/content-right grid; the three home sections (`hero.tsx`, `project.tsx`, `about.tsx`) are rebuilt in place to compose it. `skill.tsx` retires (its data moves into `about.tsx`). `app/page.tsx` reorders sections to: hero → projects → about.

**Tech Stack:** Next.js 16 App Router, Tailwind v4 theme tokens, GSAP (existing signature + reveal animations), existing `FeatureModal`. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-05-home-editorial-redesign-design.md`

## Global Constraints

- Only theme tokens for color: `text-foreground`, `text-muted-foreground`, `border-border` — never hardcoded black/white (dark mode must work untouched).
- Labels: `text-xs uppercase tracking-widest text-muted-foreground`. Statement type: responsive `text-3xl`→`text-5xl` (or `text-2xl`→`text-4xl` for secondary statements), `font-medium tracking-tight`. Hairlines: `border-t border-border` (rows use `border-b`).
- Anchors `#home`, `#about`, `#skills`, `#projects` must all keep working (nav-bar.tsx links to them; do not edit nav-bar.tsx).
- Preserve `data-reveal` attributes on content blocks (GSAP reveal animation hooks).
- No new npm dependencies.
- Verification per task: `npx tsc --noEmit` and `npx eslint <touched files>` must pass before commit. This project has no unit-test framework; the type-check + lint + (final task) build + rendered-HTML check is the test cycle.
- All commit messages end with: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

---

### Task 1: `EditorialSection` primitive

**Files:**
- Modify: `components/ds.tsx` (append after the `Prose` component, end of file)

**Interfaces:**
- Produces: `EditorialSection({ number, label, id, className, children })` — exported React server-compatible component. `number: string` (e.g. `"1"`), `label: React.ReactNode` (may contain `<br />`), `id?: string`, `className?: string`, `children: React.ReactNode`. Tasks 2–4 import it as `import { EditorialSection } from "@/components/ds";`

- [ ] **Step 1: Append the component to `components/ds.tsx`**

```tsx
type EditorialSectionProps = {
  number: string;
  label: React.ReactNode;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

export const EditorialSection = ({
  number,
  label,
  id,
  className,
  children,
}: EditorialSectionProps) => (
  <section
    id={id}
    className={cn("border-t border-border py-10 md:py-16", className)}
  >
    <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
      <div className="flex flex-col gap-6">
        <p className="text-xs text-muted-foreground">{number}</p>
        <div className="text-xs uppercase leading-relaxed tracking-widest text-muted-foreground">
          {label}
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit && npx eslint components/ds.tsx`
Expected: no output (both pass).

- [ ] **Step 3: Commit**

```bash
git add components/ds.tsx
git commit -m "feat: add EditorialSection layout primitive"
```

---

### Task 2: Masthead + intro section (hero)

**Files:**
- Modify: `components/home-page/signature-draw.tsx` (root div: accept className)
- Modify: `components/home-page/hero.tsx` (full rewrite of component body)

**Interfaces:**
- Consumes: `EditorialSection` from Task 1.
- Produces: `SignatureDraw` gains optional prop `className?: string` merged onto its wrapper div (default sizing moves to the hero call site). `Hero` still default-exported, no props.

- [ ] **Step 1: Make `SignatureDraw` sizing configurable**

In `components/home-page/signature-draw.tsx`, add the `cn` import, a props type, and replace the wrapper div's fixed classes:

```tsx
import { cn } from "@/lib/utils";

type SignatureDrawProps = {
  className?: string;
};

const SignatureDraw = ({ className }: SignatureDrawProps) => {
```

and change the returned wrapper div to:

```tsx
    <div
      className={cn(
        "not-prose w-full max-w-5xl text-foreground",
        className ?? "mb-6 h-[52vh] md:mb-8 md:h-[64vh]",
      )}
    >
```

(All hooks/refs/JSX inside stay identical.)

- [ ] **Step 2: Rewrite `components/home-page/hero.tsx`**

Replace the entire file content with:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EditorialSection } from "@/components/ds";
import SignatureDraw from "@/components/home-page/signature-draw";

const Hero = () => {
  return (
    <div id="home">
      <div className="pt-6 md:pt-10" data-reveal>
        <SignatureDraw className="mb-8 h-[26vh] md:mb-12 md:h-[32vh]" />
      </div>
      <EditorialSection
        number="1"
        label={
          <>
            Nguyen Pham Tran
            <br />
            Computer Science Student
          </>
        }
      >
        <div className="flex flex-col gap-6" data-reveal>
          <h1 className="text-3xl font-medium tracking-tight text-balance md:text-5xl">
            Simple solutions. Thoughtfully built.
          </h1>
          <p className="text-lg font-light leading-snug text-muted-foreground md:text-xl">
            Building AI-powered applications, scalable systems, and
            intelligent workflows.
          </p>
          <Link
            href="/#about"
            className="group not-prose mt-4 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            [About]
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </EditorialSection>
    </div>
  );
};

export default Hero;
```

Notes: the old `Section`/`Container`/`Balancer`/`Button`/`Camera` imports and the hidden lorem-ipsum button block are gone. The `id="home"` anchor is preserved on the wrapper.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npx eslint components/home-page/hero.tsx components/home-page/signature-draw.tsx`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/home-page/hero.tsx components/home-page/signature-draw.tsx
git commit -m "feat: editorial masthead and intro section"
```

---

### Task 3: Project index section

**Files:**
- Modify: `components/home-page/project.tsx` (add `category` to modal copy; replace carousel JSX with index rows)

**Interfaces:**
- Consumes: `EditorialSection` from Task 1; existing `FeatureModal`, `getProjectModalConfig`, `PortfolioProject`.
- Produces: nothing consumed by later tasks. Section keeps `id="projects"`.

- [ ] **Step 1: Add `category` to the modal copy type and entries**

In `components/home-page/project.tsx`, extend the type:

```tsx
type ProjectModalCopy = {
  title: string;
  description: string;
  body: string;
  category: string;
  chromeStoreHref?: string;
};
```

Add to each entry in `projectModalCopyByKeyword`: `category: "Robotics"` (vex entry), `category: "Data Analysis"` (openbci entry), `category: "Chrome Extension"` (wow entry). In `getProjectModalCopy`, the no-match fallback object gains `category: "Project"`.

- [ ] **Step 2: Replace the carousel with index rows**

Replace the `Project` component (and remove now-unused imports: `Image`, `Card`, `CardContent`, `Button`, all `Carousel*` imports, `cn` if unused). The component no longer needs `useState`/`useEffect`/`React` state for the carousel API — remove that too. Keep `"use client"`.

```tsx
const Project = ({ projects }: ProjectProps) => {
  return (
    <EditorialSection number="2" label="Selected work" id="projects">
      <div className="not-prose flex flex-col" data-reveal>
        {projects.map((project, index) => {
          const copy = getProjectModalCopy(project);

          return (
            <FeatureModal
              key={project.id}
              config={getProjectModalConfig(project)}
              trigger={
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-4 border-b border-border py-6 text-left"
                  data-reveal
                >
                  <h3 className="text-2xl font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground md:text-4xl">
                    {project.title}
                  </h3>
                  <span className="flex shrink-0 items-center gap-4">
                    <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:inline">
                      {copy.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {String(projects.length - index).padStart(2, "0")}
                    </span>
                    <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </span>
                </button>
              }
            />
          );
        })}
      </div>
    </EditorialSection>
  );
};
```

Add imports: `import { ArrowRight } from "lucide-react";` and `import { EditorialSection } from "@/components/ds";`. Remove `Section, Container` from the ds import if no longer used.

Note: the modal image still renders inside `FeatureModal` via `getProjectModalConfig` — `Image` and `isSignedSupabaseImage` stay only if `getProjectModalConfig` still uses them (it does; leave that function untouched).

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npx eslint components/home-page/project.tsx`
Expected: no output. If eslint flags unused imports, delete them.

- [ ] **Step 4: Commit**

```bash
git add components/home-page/project.tsx
git commit -m "feat: replace project carousel with editorial index rows"
```

---

### Task 4: About + skills merged section; retire skill.tsx; reorder page

**Files:**
- Modify: `components/home-page/about.tsx` (full rewrite)
- Delete: `components/home-page/skill.tsx`
- Modify: `app/page.tsx` (imports + section order)

**Interfaces:**
- Consumes: `EditorialSection` from Task 1.
- Produces: `About` still default-exported, no props. Anchors `#about` and `#skills` both live in this component.

- [ ] **Step 1: Rewrite `components/home-page/about.tsx`**

Replace the entire file content with (skill items copied verbatim from current `skill.tsx` defaults):

```tsx
import { EditorialSection } from "@/components/ds";

const skillCategories = [
  {
    category: "AI Engineering",
    items: [
      "LLM Application Development",
      "AI Workflow Automation",
      "AI Agent Development",
      "Prompt Engineering",
      "Retrieval-Augmented Generation (RAG)",
      "Model Evaluation & Prompt Optimization",
    ],
  },
  {
    category: "System Design & Backend",
    items: [
      "Scalable System Design",
      "REST API Development",
      "Database Design (SQL)",
      "Asynchronous Programming",
      "Authentication & Integrations",
    ],
  },
];

const About = () => {
  return (
    <>
      <div id="about" data-nav-offset="24" />
      <EditorialSection
        number="3"
        label={
          <>
            About
            <br />
            Skills
          </>
        }
      >
        <div className="flex flex-col gap-10">
          <h2
            className="!my-0 text-2xl font-medium leading-snug tracking-tight text-balance md:text-4xl"
            data-reveal
          >
            I’m a Computer Science student focused on solving real-world
            problems through technology. I build practical, well-designed
            solutions with strong attention to detail.
          </h2>
          <p
            className="font-light leading-relaxed text-muted-foreground"
            data-reveal
          >
            Always learning, I aim to grow as a developer and create
            meaningful impact — with knowledge in the categories below.
          </p>
          <div id="skills" className="not-prose flex flex-col gap-10">
            {skillCategories.map((group) => (
              <div key={group.category} data-reveal>
                <h3 className="border-b border-border pb-3 text-xl font-semibold md:text-2xl">
                  {group.category}
                </h3>
                <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>
    </>
  );
};

export default About;
```

- [ ] **Step 2: Delete `components/home-page/skill.tsx`**

```bash
git rm components/home-page/skill.tsx
```

- [ ] **Step 3: Reorder `app/page.tsx`**

Replace the file content with:

```tsx
import { Main, Section, Container } from "@/components/ds";
import About from "@/components/home-page/about";
import Hero from "@/components/home-page/hero";
import Project from "@/components/home-page/project";
import { getPortfolioProjects } from "@/lib/supabase/queries";

export default async function Page() {
  const projects = await getPortfolioProjects();

  return (
    <Main>
      <Section>
        <Container>
          <Hero />
          <Project projects={projects} />
          <About />
        </Container>
      </Section>
    </Main>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npx eslint components/home-page/about.tsx app/page.tsx`
Expected: no output. Also run `grep -rn "home-page/skill" app components` — expected: no matches (no dangling imports).

- [ ] **Step 5: Commit**

```bash
git add components/home-page/about.tsx app/page.tsx
git commit -m "feat: merge about and skills into editorial section, template order"
```

(The `git rm` from Step 2 is already staged and lands in this commit.)

---

### Task 5: Footer restyle + full verification

**Files:**
- Modify: `components/footer.tsx` (restyle; fix copyright name)

**Interfaces:**
- Consumes: nothing new. Same LinkedIn/GitHub links.

- [ ] **Step 1: Rewrite `components/footer.tsx`**

Replace the file content with:

```tsx
import Link from 'next/link'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const links = [
    {
        title: <FaLinkedin className="w-5 h-5" />,
        href: 'https://www.linkedin.com/in/nguyen-pham-tran-10a653386/',
    },
    {
        title: <FaGithub className="w-5 h-5" />,
        href: 'https://github.com/PersianBlobFish',
    }
]

export default function Footer() {
    return (
        <footer className="border-t border-border py-10">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
                <div className="flex gap-5">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground transition-colors duration-150 hover:text-foreground">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Nguyen Pham Tran — © 2026
                </p>
            </div>
        </footer>
    )
}
```

- [ ] **Step 2: Type-check, lint, production build**

Run: `npx tsc --noEmit && npx eslint components/footer.tsx && npx next build`
Expected: build succeeds listing routes `/`, `/auth/callback`, `/dashboard`, `/login`, `/signup`.

- [ ] **Step 3: Rendered-HTML verification**

Start the dev server (`npx next dev -p 3460`, background), wait for Ready, then:

```bash
curl -s http://127.0.0.1:3460/ -o /tmp/home.html
grep -c 'aria-label="Signature"' /tmp/home.html   # expected: 1 (masthead present)
grep -o 'id="projects"' /tmp/home.html            # expected: id="projects"
grep -o 'id="about"' /tmp/home.html               # expected: id="about"
grep -o 'id="skills"' /tmp/home.html              # expected: id="skills"
grep -o 'Selected work' /tmp/home.html            # expected: Selected work
grep -o 'AI Engineering' /tmp/home.html           # expected: AI Engineering
grep -c 'border-b border-border' /tmp/home.html   # expected: >= 3 (project rows)
```

All greps must hit. Then kill the dev server. Sections must appear in source order: signature/hero → projects → about.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: editorial footer restyle"
```
