# Home Page Editorial Redesign — Design Spec

**Date:** 2026-07-05
**Reference:** https://preview.studio.site/templates/14BqN41WrP/ ("Williams" Swiss-editorial portfolio template)
**Scope:** Home page (`app/page.tsx` and its section components) plus footer restyle. Login, signup, and dashboard are out of scope.

## Goals

Adopt the reference template's editorial layout system — numbered two-column sections, oversized statement typography, hairline dividers, uppercase micro-labels — while keeping three current elements: the nav bar, dark mode, and the GSAP signature animation. Approach: rebuild section internals in place (existing component files keep their names and data flow).

## Decisions (from brainstorming)

- **Fidelity:** hybrid — template's layout system, our kept elements.
- **Keep:** nav bar, dark mode (next-themes), signature draw animation.
- **Drop:** project carousel (embla) on the home page, about-section placeholder image, hidden hero buttons.
- **Project rows open the existing `FeatureModal`** (story, image, Chrome Web Store action, keyword-matched copy) — no new pages.
- **Section order follows the template:** intro statement → project index → about + skills.

## Page structure (`app/page.tsx`)

```
NavBar (unchanged)
1. Masthead + intro statement   ← hero.tsx (reworked)
2. Project index                 ← project.tsx (reworked)
3. About + skills                ← about.tsx (absorbs skill.tsx content; skill.tsx retires)
Footer (restyled)
```

## Shared primitive: `EditorialSection`

New component in `components/ds.tsx` (follows the existing design-system pattern there).

- Props: `number` (string, e.g. "1"), `label` (string, may contain a line break), `id?`, `className?`, `children`.
- Renders: hairline top border (`border-t border-border`); left column with section number and tiny uppercase label; right column (~2/3 width on `md+`, stacked below `md`) containing `children`.
- All three sections compose it so spacing and type rhythm are uniform.
- `data-reveal` hooks continue to be placed on children by the section components, unchanged.

## Section 1 — Masthead + intro (`components/home-page/hero.tsx`)

- Signature animation becomes the masthead (the template's giant wordmark role): large, left-aligned at the top; container height reduced from 52–64vh to ~30vh so section 1 content is visible above the fold. `SignatureDraw` component itself is unchanged except sizing classes passed from the hero.
- Below it, `EditorialSection` number **1**, label "Nguyen Pham Tran / Computer Science Student".
- Right column: statement headline "Simple solutions. Thoughtfully built." at statement scale; supporting line "Building AI-powered applications, scalable systems, and intelligent workflows." as muted text; `[ABOUT]` arrow link that anchors to `#about` (section 3).
- The hidden lorem-ipsum button block is deleted. `react-wrap-balancer` usage may be kept or dropped per implementation convenience.

## Section 2 — Project index (`components/home-page/project.tsx`)

- `EditorialSection` number **2**, label "Selected work".
- Carousel replaced by full-width rows, one per project, newest-style descending numbering (`03`, `02`, `01`, zero-padded, derived from position).
- Row anatomy: project title (large, left) · uppercase category label · index number · arrow icon (right) · hairline divider between rows.
- Category label source: matched modal copy's `description` (existing keyword matching); fallback label "PROJECT" when no copy matches.
- Click opens the existing `FeatureModal` with unchanged config (`getProjectModalConfig`). Trigger is the whole row (keyboard-accessible button/row semantics).
- Hover: arrow nudges, title transitions muted → full contrast.
- `embla-carousel-react` imports removed from this component (the package may remain installed if used elsewhere; `components/ui/carousel.tsx` is untouched).

## Section 3 — About + skills (`components/home-page/about.tsx`)

- `EditorialSection` number **3**, label "About / Skills", with `id="about"` anchor preserved (including the existing `data-nav-offset` element so nav scrolling still works).
- Right column: about paragraph set at statement scale (template's "Junior Product Designer" block treatment), then skills rendered as the template does: **AI Engineering** and **System Design & Backend** as bold headings, each followed by its items in a clean two-column list (single column on mobile).
- Skill data moves from `skill.tsx` into this component (or a small shared data module). `skill.tsx` and its import in `page.tsx` are removed.
- The placeholder portrait image block is deleted.

## Footer (`components/footer.tsx`)

- Same links (LinkedIn, GitHub) and structure; restyled with hairline top border, uppercase micro-labels, site name.
- Copyright placeholder "© 2026 Jesus" becomes the real name: "© 2026 Nguyen Pham Tran".

## Styling rules (all sections)

- Only theme tokens: `text-foreground`, `text-muted-foreground`, `border-border`, etc. No hardcoded black/white — dark mode must work with zero extra effort.
- Labels: `text-xs uppercase tracking-widest text-muted-foreground`.
- Statement type: `text-3xl` → `text-5xl` responsive, `font-medium tracking-tight`.
- Hairlines: `border-t border-border`.
- No new dependencies. GSAP/Lenis reveal behavior (`data-reveal`) untouched.

## Error handling / edge cases

- Fallback projects (Supabase currently unreachable) render identically to DB-sourced projects; the index is source-agnostic.
- Zero projects cannot occur (fallbacks guarantee 3).
- Projects without matched modal copy get generic copy and the "PROJECT" category label.

## Testing / verification

- `npx tsc --noEmit`, ESLint on touched files, `npx next build`.
- Dev-server render check after each section lands (HTML-level verification; visual check if browser access is available).
- Verify: nav anchor links still scroll correctly; modals open from rows; dark mode renders correctly; mobile stacking of the two-column grid.
