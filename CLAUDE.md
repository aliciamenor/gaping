# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"GAPING" — a personal portfolio/gap-year site for Alicia Menor (React + Vite + TypeScript + Tailwind + shadcn/ui). Built and maintained via [Lovable](https://lovable.dev): pushes to `main` sync back into the Lovable editor, so keep commits clean and avoid force-pushes/history rewrites that could desync it.

## Commands

```bash
npm i           # install deps (bun.lock is also present — Lovable uses bun, but npm works too; don't mix package managers in one change)
npm run dev     # start Vite dev server on port 8080
npm run build   # production build
npm run build:dev  # build in development mode (used by Lovable preview)
npm run lint    # eslint .
npm run preview # preview a production build
```

There is no test suite configured.

## Architecture

- **Entry/routing**: `src/App.tsx` defines all routes. `Home` is imported eagerly; every other page (`GoToMarket`, `Projects`, `WhoIAm`, `Contacto`, `BadgeDetail`, `ExperienceDetail`, `NotFound`) is `React.lazy`-loaded to keep Home's LCP fast — preserve that split when adding routes/pages.
- **Path alias**: `@/*` → `src/*` (configured in `vite.config.ts`, `tsconfig.json`, and `components.json`).
- **Content model — the real "CMS" of this app is** `src/data/badges.ts` and `src/data/experiences.ts`:
  - `experiences.ts` holds the `Experience[]` array (each tagged with an `eje`: `impact` | `horizons` | `growth`) and the `ejes` metadata object (name/objective/actions/learnings per axis).
  - `badges.ts` holds the `Badge[]` array.
  - Badges and experiences cross-reference each other by id (`badge.experiences: string[]` ↔ `experience.badges: string[]`), which is what powers the bidirectional navigation between `/insignias/:id` (`BadgeDetail`) and `/experiencias/:id` (`ExperienceDetail`).
  - To add a new experience or badge, edit these files (plus drop the image in `src/assets/experiences/` and import it at the top of `experiences.ts`) rather than introducing a new data layer.
- **Design tokens**: HSL CSS custom properties defined in `src/index.css` under `:root`, consumed through Tailwind via `hsl(var(--x))` (standard shadcn pattern). The brand is a teal mono system (`--brand`, `--brand-deep`, `--brand-soft`); each "eje" has its own color pair (`impact`/`horizons`/`growth`, `*-light` variants) defined both in `src/index.css` and mirrored in `tailwind.config.ts` under `theme.extend.colors`.
- **UI primitives**: `src/components/ui/` is shadcn/ui-generated (per `components.json`, style `default`, baseColor `slate`). Prefer composing from these over hand-rolling new primitives.
- **`GapingLogo.tsx`**: bespoke animated header logo that cycles the three ejes under the letters I/N/G, using `useLayoutEffect` to measure letter positions via `getBoundingClientRect` and Framer Motion to animate the underline word. It's been through a dedicated mobile-overflow tuning pass (see `.lovable/plan.md`) — its clamp/measurement logic is deliberate, so change it carefully and re-check narrow viewports.
- **Animation**: Framer Motion drives page transitions (`AnimatePresence` in `App.tsx`, keyed by pathname) plus scroll/stagger reveals via `src/components/FadeInView.tsx` and `src/components/StaggerGrid.tsx`.
- **Mobile-safety conventions**: `.lovable/plan.md` documents a full mobile-overflow remediation pass (responsive type scales per breakpoint, `overflow-x-hidden`/`overflow-x: clip` safety nets, `min-w-0` + `break-words` on flex/grid items, no negative overhang on timeline markers below `sm`). Follow the same patterns for new responsive UI rather than reintroducing fixed-width/`whitespace-nowrap` elements that can overflow on narrow viewports.
- **README note**: `README.md` embeds the *original* Lovable prompt used to scaffold the project (nav structure "Home/About/Los 3 Ejes/Insignias/Experiencias", green/orange/purple palette). The app has since diverged from that brief — actual routes are `/`, `/go-to-market`, `/projects`, `/who-i-am`, `/contact`, and the palette is the teal system in `src/index.css`. Trust the code over the README's original prompt.
