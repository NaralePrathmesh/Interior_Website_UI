# Aangan Studio — Next.js website

The interior design website and admin panel, rebuilt with **Next.js 14 (App Router)**, **React 18**, **Framer Motion** and **GSAP**, in the **Walnut & Linen theme with a light/dark switch**.

The design, content and features match the HTML version. Data is still stored in the visitor's browser, ready for the backend in the next step.

## Run it

You need Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

**Deploy:** push this folder to GitHub and import it on [vercel.com](https://vercel.com). Vercel detects Next.js automatically. Optionally set `NEXT_PUBLIC_SITE_URL` (e.g. `https://aanganstudio.in`) so the sitemap and social previews use your domain.

**Admin panel:** `/admin`, password `demo1234` (demo only). The role picker on the login screen shows what Super Admin, Content Manager and Lead Manager can each see.

## Project structure

```
app/
  layout.jsx          fonts, SEO metadata, theme script, providers
  template.jsx        page transition (Framer Motion curtain) + GSAP page effects
  globals.css         all styles — black & white tokens for light and dark
  page.jsx            home
  about/ services/ projects/ gallery/ packages/ designs/
  testimonials/ contact/ privacy/ terms/ admin/
  sitemap.js robots.js not-found.jsx
components/
  Header.jsx          navbar, dropdown menus, mobile drawer, theme switch
  Footer.jsx          footer, WhatsApp button, mobile call bar
  Overlays.jsx        modal, photo lightbox, toasts (Framer Motion)
  blocks.jsx          cards, project modal, banner, estimator, FAQ, lead form
  fx.jsx              GSAP effects, cursor, scroll progress, motion helpers
  ui/                 shadcn-style UI folder
    primitives.jsx    icons, photos, floor-plan drawing, split headings
  pages/              one component per page
  admin/              admin panel + content schema
lib/
  data.js             PHOTOS list and starting content
  store.jsx           data store (localStorage today, API later)
  theme.jsx           light/dark switch
  utils.js            formatting helpers
public/assets/images  put the client's own photos here
```

## Animations

| Library | Used for |
| --- | --- |
| **GSAP + ScrollTrigger** | hero timeline, word-by-word headings, parallax photos, scroll reveals, image clip reveals, number counters, process line drawing, speed-reactive marquee, magnetic buttons, 3D card tilt, custom cursor, mobile menu stagger, admin panel entrance |
| **Framer Motion** | page transition curtain, spring lift on cards, press feedback on buttons and chips, modal / lightbox / toast springs, FAQ answers, review slider, estimator price change, pipeline bars, scroll progress bar |

Visitors who turn on "reduce motion" on their device get no animations.

## components/ui

Components copied from 21st.dev or shadcn go in `components/ui/`, where their import paths (`@/components/ui/...`) expect them. The project supports TypeScript (`tsconfig.json`), so such components can stay `.tsx`. Tailwind is not installed on purpose, because its base reset would restyle the whole site.

## Theme

**Walnut & Linen** (light) and **Walnut Night** (dark):
- **Light (default):** off-white backgrounds, a deep walnut header, charcoal text and walnut buttons, with brushed-brass details (menu underline, highlighted heading words, star ratings).
- **Dark:** near-black walnut surfaces with brass buttons and highlights.

Visitors switch with the sun/moon button in the navbar (also in the admin panel). The site always opens in the light, off-white theme; a visitor's dark-mode choice is remembered. All colours are tokens at the top of `app/globals.css`.

## Photos

Every photo comes from the `PHOTOS` list in `lib/data.js`. They are currently free-to-use Unsplash photos. Before launch, put the client's own project photos in `public/assets/images/` and replace each link, e.g.

```js
hero: '/assets/images/hero-interior.jpg',
```

Photos can also be changed from the admin panel (upload a file or paste a link).

## Backend (next step)

All reads and writes go through `lib/store.jsx`:

- `db` — the current data (projects, services, packages, gallery, designs, testimonials, team, enquiries, users, notifications, settings)
- `update(fn)` — changes it
- `reset()` — restores demo data

To connect a backend, replace the `localStorage` load/save in `store.jsx` with API calls. The pages and admin panel don't need to change. The data shapes in `lib/data.js` map directly to the tables in the requirements document (projects, services, packages, gallery, three_d_designs, testimonials, enquiries + enquiry_notes, team_members, admins, website_settings).
