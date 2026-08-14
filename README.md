# Aadhya Fresh Fruits — Hub Console (Admin Panel)

Production-structured React + TypeScript + Vite app. Dark "Dispatch Console" theme.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## Architecture

```
src/
  app/
    router.tsx        the only file you touch to add a new page/route
    Sidebar.tsx        nav — reads from a single NAV array
    Topbar.tsx
  layouts/
    AppLayout.tsx      shell wrapping every routed page (Sidebar + Topbar + <Outlet/>)
  features/            one folder per business domain — self-contained
    dashboard/  orders/  inventory/  pricing/  routes/  retailers/  reports/
  components/ui/       design-system primitives shared by every feature
    Card.tsx  StatCard.tsx  Badge.tsx  DataTable.tsx  PageHeader.tsx  Chip.tsx  SearchInput.tsx
  data/
    mockData.ts        ALL mock data lives here — feature pages import from this file only
  lib/
    api.ts             fetch wrapper stub — fill this in once FastAPI exists
    utils.ts           formatINR, classNames
  types/
    index.ts           shared domain types (Grade, OrderStatus, OrderRecord, ...)
  styles/
    globals.css        Tailwind + CSS variable tokens
```

**Why this shape:** every feature page only talks to `@/data/mockData` and
`@/components/ui/*`. Wiring to the real backend means editing two things —
`src/lib/api.ts` (add real fetch functions) and each feature page's import
line (swap `@/data/mockData` for `@/lib/api`). Nothing else needs to change.

Adding a new page: create `src/features/<name>/<Name>Page.tsx`, add one line
to `src/app/router.tsx`, add one entry to `NAV` in `src/app/Sidebar.tsx`.

## Design tokens

CSS variables in `src/styles/globals.css`, mapped to Tailwind utilities in
`tailwind.config.js` (`bg-accent`, `text-teal`, `border-line`, etc.):

- `--accent` (#F2C230, signal yellow) — primary actions, Export grade, active nav
- `--teal` (#35C4B0) — positive/on-track states, Grade A
- `--steel` (#6C8CA6) — Grade B, neutral secondary data
- `--danger` (#FF6B4A) — low stock, overdue, alerts
- `--success` (#6FCF7A) — delivered/complete states

Fonts: **Manrope** (headings), **Inter** (body), **Roboto Mono** (all numbers —
tabular figures so prices/quantities/IDs align in columns).

## Wiring to the backend

`src/lib/api.ts` has the shape ready — a `fetch` wrapper reading
`VITE_API_BASE_URL` from a `.env` file:

```ts
getOrders: () => request<OrderRecord[]>("/orders"),
updateOrderStatus: (id: string, status: OrderStatus) =>
  request(`/orders/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
```

Then swap `import { ORDERS } from "@/data/mockData"` for a call to
`api.getOrders()` in each feature page (or bring in React Query at that
point — the mock data's shape already matches what these endpoints return).

## Customization (app name, theming, product language)

Everything here is runtime-configurable from the **Settings** page (bottom of
the sidebar) — nothing requires editing code or rebuilding:

- **App name / tagline** — text fields, saved on blur, drives the sidebar and
  browser tab title. Source of truth: `src/context/BrandContext.tsx`.
- **Dark / light mode** — `src/context/ThemeContext.tsx`. All non-brand colors
  (backgrounds, text, borders) swap via the `[data-theme]` CSS selector in
  `src/styles/globals.css` — nothing in component code references mode directly.
- **Brand color** — six presets (indigo/blue/violet/teal/rose/amber), each with
  a dark and light variant tuned for contrast. Add a new option by adding one
  entry to `ACCENT_PRESETS` in `ThemeContext.tsx` — no other file changes.
- **Product language (English/Marathi)** — `src/context/LanguageContext.tsx`.
  Independent from the interface language; controls which language SKU names
  render in on Inventory and Pricing. Product records carry both:
  `{ sku: { en: "...", mr: "..." } }` — exactly the shape the backend should
  return. `localize(text, language)` in `src/lib/utils.ts` picks the right one.

### No inline colors in component code

Every component reads color exclusively through Tailwind utility classes
(`text-accent`, `bg-surface`, `border-line`, ...), which resolve to the CSS
variables in `globals.css`. There are exactly two intentional exceptions,
both unavoidable:

1. **Charts** (`RouteVolumeChart.tsx`, `RevenueTrendChart.tsx`,
   `GradeMixChart.tsx`) — Recharts renders SVG, and SVG fill/stroke
   attributes need real color values, not class names. These use
   `"var(--accent)"` style strings rather than hex, so they still resolve
   through the same CSS variables and update live with theme/accent changes —
   there's no hardcoded hex duplicated per chart.
2. **The accent swatches in Settings** — a color picker's whole purpose is to
   display literal colors so you can choose one; that's content, not styling.

Everywhere else — every badge, card, table, nav item — color comes from a
Tailwind class, full stop.
