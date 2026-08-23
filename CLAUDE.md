# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"GAPING" — a personal portfolio/gap-year site for Alicia Menor (React + Vite + TypeScript + Tailwind + shadcn/ui). Static SPA, no backend. Deployed on Vercel; every push to `main` on GitHub triggers an automatic redeploy.

## Commands

```bash
npm i           # install deps
npm run dev     # start Vite dev server on port 8080
npm run build   # production build
npm run build:dev  # build in development mode (useful for debugging the bundle)
npm run lint    # eslint .
npm run preview # preview a production build
```

There is no test suite configured.

## Architecture

- **Entry/routing**: `src/App.tsx` defines all routes. `Home` is imported eagerly; every other page (`GoToMarket`, `Projects`, `WhoIAm`, `Contacto`, `BadgeDetail`, `ExperienceDetail`, `NotFound`) is `React.lazy`-loaded to keep Home's LCP fast — preserve that split when adding routes/pages. Live routes: `/`, `/proyecto`, `/go-to-market`, `/aboutme`, `/contact`, `/experiencias/:id`, `/insignias/:id`. `/projects` and `/who-i-am` are old paths that permanently redirect (see `vercel.json`) to `/proyecto` and `/aboutme`.
- **Path alias**: `@/*` → `src/*` (configured in `vite.config.ts`, `tsconfig.json`, and `components.json`).
- **Content model — the real "CMS" of this app is** `src/data/badges.ts` and `src/data/experiences.ts`:
  - `experiences.ts` holds the `Experience[]` array (each tagged with an `eje`: `impact` | `horizons` | `growth`) and the `ejes` metadata object (name/objective/actions/learnings per axis).
  - `badges.ts` holds the `Badge[]` array.
  - Badges and experiences cross-reference each other by id (`badge.experiences: string[]` ↔ `experience.badges: string[]`), which is what powers the bidirectional navigation between `/insignias/:id` (`BadgeDetail`) and `/experiencias/:id` (`ExperienceDetail`).
  - To add a new experience or badge, edit these files (plus drop the image in `src/assets/experiences/` and import it at the top of `experiences.ts`) rather than introducing a new data layer.
- **Design tokens**: HSL CSS custom properties defined in `src/index.css` under `:root`, consumed through Tailwind via `hsl(var(--x))` (standard shadcn pattern). The brand is a teal mono system (`--brand`, `--brand-deep`, `--brand-soft`); each "eje" has its own color pair (`impact`/`horizons`/`growth`, `*-light` variants) defined both in `src/index.css` and mirrored in `tailwind.config.ts` under `theme.extend.colors`.
- **UI primitives**: `src/components/ui/` is shadcn/ui-generated (per `components.json`, style `default`, baseColor `slate`). Prefer composing from these over hand-rolling new primitives.
- **`GapingLogo.tsx`**: bespoke animated header logo that cycles the three ejes under the letters I/N/G, using `useLayoutEffect` to measure letter positions via `getBoundingClientRect` and Framer Motion to animate the underline word. Its clamp/measurement logic is deliberate (tuned for mobile-overflow safety) — change it carefully and re-check narrow viewports.
- **Animation**: Framer Motion drives page transitions (`AnimatePresence` in `App.tsx`, keyed by pathname) plus scroll/stagger reveals via `src/components/FadeInView.tsx` and `src/components/StaggerGrid.tsx`.
- **Reduced-motion / touch caveats (learned the hard way)**:
  - iOS Safari reports `prefers-reduced-motion: reduce` whenever Low Power Mode is on, regardless of the user's actual accessibility setting. Don't gate small, non-jarring animations (opacity/color crossfades, carousel auto-advance) behind that media query — it silently freezes them for a large chunk of real iPhone users. Reserve reduced-motion gating for genuinely large motion (parallax, big transforms).
  - iOS Safari applies `:hover`/`:active` styles on tap and can leave them "stuck". Any hover-only affordance (Tailwind `hover:`/`group-hover:`, or React `onMouseEnter`/`onMouseLeave` used for more than click) should be gated behind the `useCanHover()` hook (`src/hooks/useCanHover.ts`, checks `(hover: hover) and (pointer: fine)`) so it's inert on touch devices.
  - `loading="lazy"` on an `<img>` that sits inside (or is) an element carrying a Framer Motion transform (`initial`/`animate`/`whileHover` with rotate/scale/translate) can fail to ever load on iOS Safari — its lazy-load intersection calculation is unreliable under a transformed ancestor. Chromium doesn't reproduce this. Prefer eager loading for images in animated/transformed containers.
  - `backdrop-filter: blur` animated concurrently with opacity/transform on a `position: fixed` overlay is a known iOS Safari compositing bug (flashes unblurred content through). Avoid animating blur; use a plain darker overlay instead if a dimmed backdrop needs to animate in.
- **Mobile-safety conventions**: responsive type scales per breakpoint, `overflow-x-hidden`/`overflow-x: clip` safety nets, `min-w-0` + `break-words` on flex/grid items, no negative overhang on timeline markers below `sm`. Follow the same patterns for new responsive UI rather than reintroducing fixed-width/`whitespace-nowrap` elements that can overflow on narrow viewports.
- **`vercel.json`**: declares the old-path redirects mentioned above, plus a `/(.*) -> /index.html` rewrite. That rewrite is load-bearing — without it, any direct navigation or refresh on a non-root route 404s at the platform level before React ever mounts (Vercel's zero-config SPA fallback stops applying once a custom `vercel.json` exists, unless you re-declare it explicitly).
