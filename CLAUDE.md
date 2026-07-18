# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (HMR)
npm run build    # production build → dist/
npm run preview  # serve the built dist/ on :4173
```

There is **no test runner and no linter** configured — don't look for them. `npm run build` is the only automated correctness gate (it catches syntax/import errors across all JSX).

Deploy: the GitHub repo (`LuyzaTA/philosphere`) is connected to Vercel, so **pushing to `master` auto-deploys to production** (project `philosphere`). No manual `vercel deploy` is needed; verify with `vercel ls philosphere`.

### Verifying changes

The app is a 3D/canvas visual app, so most regressions are visual and invisible to a build. `puppeteer-core` is a devDependency for driving a **system-installed** browser (no bundled Chromium download):

```js
// launch with executablePath, e.g.
// 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
// args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']
```

Two gotchas when scripting the UI: the landing screen's "Enter" button only renders **~5s after load** (a `phase` timer in `DailyThought.jsx`), and WebGL needs the swiftshader flags above in headless.

To sanity-check data referential integrity after editing the dataset (`"type": "module"` is set, so the ESM data file imports directly):

```bash
node -e 'import("./src/data/index.js").then(({philosophers,ideas,eras})=>console.log(philosophers.length,ideas.length,eras.length))'
```

## Architecture

Single-page React 18 + Vite app. **No router, no backend, no database, no state library.** View switching is a `useState` string in `App.jsx` (`landing | globe | timeline | ideas | compare`), with `PhilosopherPanel` as a cross-cutting overlay. All content is hardcoded JS object literals.

### `src/data/index.js` is the single source of truth

Everything — the globe, timeline, idea graph, and comparison view — is projected from four exported arrays: `philosophers`, `ideas`, `eras`, `dailyQuestions`, plus `getPhilosopherById` / `getIdeaById` / `getEraById` / `getInfluenceConnections`.

The dataset is **cross-referential by string id**, and the links are maintained by hand. When adding or editing an entry, all of these must stay consistent:

- `philosopher.era` must match an `eras[].id`, and `philosopher.ideas[]` must match `ideas[].id`s.
- `ideas[].philosophers[]` ↔ `philosopher.ideas[]` is a **bidirectional** link; update both or the idea graph and the panel disagree.
- `eras[].philosophers[]` is a **curated display list, not auto-derived** from `philosopher.era`. The Timeline renders only what's in this array, so a philosopher can have `era: 'medieval'` and still not appear on the medieval card. Keep both in sync deliberately.
- `influences[]` / `influencedBy[]` should be reciprocal. **Dangling ids fail silently** — `getInfluenceConnections()` skips targets it can't resolve, so a typo just makes an arc quietly disappear. (Two pre-existing dangling refs exist: `descartes→leibniz`, `husserl→merleau-ponty`.)
- `dailyQuestions` (EN) and `dailyQuestionsPT` are matched **by array index**; adding to one requires adding to the other at the same position.

### i18n: two separate layers (en / pt)

- **UI chrome strings** — `src/i18n/translations.js`, a flat `{ en: {...}, pt: {...} }` dict keyed by string id, read via the `useT()` hook.
- **Content strings** — `src/i18n/data_pt.js`. English lives inline in the data objects; Portuguese is a parallel overlay keyed by the same ids (`philosophersPT`, `ideasPT`, `erasPT`, `dailyQuestionsPT`), read via the field-level accessors `tPhilosopher(p, field, lang)`, `tIdea`, `tEra`, `tDailyQuestion`.

Only specific fields are translated: philosophers → `quote`/`concept`; ideas → `name`/`description`/`centralQuestion`; eras → `name`/`paradigmShift`/`description`/`keyIdea`. Everything else (names, dates, locations) renders untranslated by design.

Language state lives in `LanguageProvider` (`src/i18n/index.jsx`) via `useLang()`. **Adding a third language is not just a new file**: the `t*` accessors hardcode a `lang !== 'pt'` check and must be generalized first.

### Styling and responsiveness

Styling is **inline style objects plus CSS custom properties** in `src/index.css` — there is no CSS framework and essentially no media queries. Responsive behavior is therefore done in JS: `src/useIsMobile.js` (`useIsMobile(breakpoint = 768)`) drives conditional inline styles. Follow that pattern rather than introducing CSS files or a framework.

### View-specific notes

**`Globe.jsx`** (react-three-fiber + drei). Node positions are *derived* from `philosopher.location.lat/lng` via `latLngToVec3` — there are no stored 3D coordinates, so adding a philosopher makes them appear automatically. Country borders are fetched at runtime from a **remote GeoJSON URL** and flattened into one `lineSegments` buffer.

Radius layering matters: globe surface `r=1`, borders `r=1.015`, philosopher nodes `r=1.025`. The globe material is transparent but *still writes depth*, so anything drawn too close to `r=1` z-fights and visually drops out as the globe rotates. Don't reduce that separation.

**`Timeline.jsx`** sorts eras chronologically at render (`orderedEras`, by `range[0]`) — the `eras` array order in the data file is not the display order, so new eras don't need to be inserted in position. Navigation supports wheel-to-horizontal, click-drag panning (5px threshold so card clicks still register), and a draggable scrubber.

**`IdeaExplorer.jsx`** is a hand-rolled 2D-canvas force simulation (repulsion + edge springs + center gravity), not a library. Node radius scales with `idea.philosophers.length` — capped and multiplied by a canvas-width factor so it doesn't overflow small screens. If you grow the dataset a lot, re-check node sizing here.

**`Compare.jsx`** buckets thinkers into West/East columns using **hardcoded `tradition` string arrays**. Any tradition not listed in those arrays is invisible in that view — this previously hid Latin American and Russian thinkers entirely. A third "Global South & Decolonial" column now catches everything outside the binary via a negative filter, but if you add a new `tradition` value, check these filters and the `TraditionBadge` color map.
