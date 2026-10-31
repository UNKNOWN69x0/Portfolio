# Suraj Lohia | Portfolio

Personal portfolio of Suraj Lohia, Cybersecurity Engineer, built as a single page with a racing HUD theme: start-light intro, timing tower for projects, tyre strategy for skills, race calendar timeline and a pit radio contact form.

Built with React, Vite, Tailwind CSS and Framer Motion. The racing visuals are original SVG and CSS, with no official F1 marks.

## Run it

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

To check the production build locally:

```bash
npm run build
npm run preview
```

The preview runs at http://localhost:4173.

## Edit the content

All site copy lives in one file: [`src/data/content.js`](src/data/content.js).

- `profile`: name, title, tagline, location, email, GitHub, LinkedIn, resume path.
- `about`, `projects`, `skillCompounds`, `skillCategories`, `education`, `experience`: section content.
- `timeline`: the race calendar. Each round points at an entry through `ref`, so the expanded details stay in sync.
- `sections`: section ids, nav labels and headings.

Any field left as an empty string or empty array is not rendered, so you can leave out a link or a key result without touching a component. A project's `link` shows a "View project" button in its drawer once it is filled in.

The page title, meta description and share text are in [`index.html`](index.html).

### Files in `public/`

| File | Purpose |
| --- | --- |
| `Suraj_Lohia_Resume.pdf` | Resume behind every download button. To replace it, keep the same name or update `resumeUrl`. Check for anything you do not want public first: this file is served to everyone. |
| `og-image.png` | 1200x630 share image. Editable source: [`design/og-image.svg`](design/og-image.svg). |
| `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png` | Site icons. |

`robots.txt` and `sitemap.xml` are generated during the build, so edit `VITE_SITE_URL` rather than adding them to `public/`.

## Environment variables

Copy `.env.example` to `.env.local` for local builds. `.env` and `.env.local` are git-ignored.

| Variable | Used for | If empty |
| --- | --- | --- |
| `VITE_FORMSPREE_ID` | Sends the contact form through [Formspree](https://formspree.io). Use the ID after `/f/` in your form URL. | The form opens the visitor's email app with the message filled in. |
| `VITE_SITE_URL` | Full site URL, such as `https://example.com`. Sets the canonical tag, `og:url`, absolute share image URLs, `robots.txt` and `sitemap.xml`. | No canonical tag or `og:url`, a relative share image path, and a placeholder domain in `robots.txt` and `sitemap.xml`. |

These are read at build time. After changing one on Vercel, redeploy.

## Deploy to Vercel

1. Import the GitHub repository at [vercel.com/new](https://vercel.com/new). Vercel detects Vite.
2. Keep the defaults: build command `npm run build`, output directory `dist`.
3. Under Environment Variables, add `VITE_FORMSPREE_ID` and `VITE_SITE_URL`. If you do not know the final domain yet, deploy once, then add `VITE_SITE_URL` and redeploy.
4. Deploy. Every push to `main` deploys again.

No `vercel.json` is needed: this is a single page with no client-side routes.

## Project layout

```text
src/
  data/content.js     all editable content
  components/         one folder per section, plus layout/ and ui/
  hooks/              active section, media query, modal focus
  index.css           shared classes and animations
design/og-image.svg   source for the share image
vite.config.js        SEO plugin: canonical, JSON-LD, robots.txt, sitemap.xml
```

## Accessibility and motion

The site supports full keyboard use, and `prefers-reduced-motion` removes the intro, wipe, cursor and looping animations. Entrance, scroll and looping animations use transform and opacity only.
