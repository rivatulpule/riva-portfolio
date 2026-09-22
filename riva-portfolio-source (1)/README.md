# Riva Tulpule — Portfolio Website

An editorial-style personal portfolio built with [Astro](https://astro.build) and Tailwind CSS. Case studies and Decode editions live as Markdown files, so you can add new ones without touching any layout code.

---

## 1. Preview it locally

You'll need [Node.js](https://nodejs.org) 18+ installed (Astro 7 requires a recent Node version).

```bash
npm install       # one-time setup, installs all dependencies
npm run dev       # starts a local preview server
```

Then open **http://localhost:4321** in your browser. The page live-reloads as you edit files.

To check that the production build works before publishing:

```bash
npm run build     # builds the static site into /dist
npm run preview   # serves that build locally so you can double-check it
```

---

## 2. Project structure

```
riva-portfolio/
├── src/
│   ├── content/
│   │   ├── work/            ← one .md file per case study
│   │   └── decode/          ← one .md file per Decode edition
│   ├── content.config.ts    ← defines the fields each .md file can have
│   ├── layouts/              ← page templates (don't need to touch these often)
│   ├── components/           ← reusable pieces (nav, cards, buttons, placeholders)
│   ├── pages/                 ← one file per route (About, Work, Decode, Leadership, Contact)
│   └── styles/global.css      ← color palette + fonts
├── public/
│   ├── images/                ← real photos and project visuals go here
│   └── resume/                ← your resume PDF goes here
└── astro.config.mjs
```

---

## 3. Replacing placeholders with your real content

### Photos & images
Every spot needing a real photo currently shows a dashed-border box labeled "Image needed: ...". To replace one:

1. Save your image file into `public/images/work/`, `public/images/decode/`, or `public/images/leadership/` (whichever fits).
2. Open the relevant `.md` file (for a project or Decode edition) or `.astro` page (for Home, About, Leadership).
3. For a project/Decode `.md` file, update the frontmatter at the top:
   ```yaml
   coverImage: "/images/work/jenan-market-visit.jpg"
   coverImageAlt: "Shelf comparison photo from the Carrefour Ibn Battuta market visit"
   ```
   As soon as `coverImage` no longer contains the word "placeholder," the real photo will automatically replace the placeholder box.
4. For a placeholder inside the Home, About, or Leadership pages (like the headshot), open that `.astro` file, find the `<Placeholder label="..." />` component, and replace it with:
   ```html
   <img src="/images/site/headshot.jpg" alt="Riva Tulpule" class="w-full rounded-lg object-cover" />
   ```

### Resume
Save your resume PDF as `public/resume/riva-tulpule-resume.pdf` — the Resume button in the navigation already links to that exact path, so it will start working automatically once the file exists.

### Text content
- **Home, About, Leadership, Contact**: edit the text directly inside `src/pages/index.astro`, `about.astro`, `leadership.astro`, `contact.astro`.
- **Case studies**: edit the Markdown body of the matching file in `src/content/work/`.
- **Decode editions**: edit the Markdown body of the matching file in `src/content/decode/`, and paste in your original LinkedIn article text to replace the placeholder note.

Anything wrapped in an "Editable note" callout or written in `[brackets]` is intentionally unfinished — search the project for the word `EditableNote` or `TODO` to find every one of these in one pass.

---

## 4. Adding a new case study or Decode edition

**New Work project:**
1. Duplicate any file in `src/content/work/` (e.g. copy `red-bull.md`) and rename it, e.g. `new-project.md`.
2. Update its frontmatter (title, subtitle, category, projectType, summary, order, coverImage, coverImageAlt).
3. Replace the body with your case study content, using the same `## Heading` structure as the existing files.
4. It will automatically appear on `/work` and get its own page at `/work/new-project` — no other code changes needed.

**New Decode edition:**
1. Duplicate any file in `src/content/decode/` and rename it, e.g. `005-your-topic.md`.
2. Update the frontmatter: increase `number` by one, set the title/topic/summary/date/LinkedIn link.
3. Paste your article text into the body.
4. It will automatically appear at the top of `/decode` and get its own page — no other code changes needed.

---

## 5. Publishing the site

The easiest free option is **Netlify** or **Vercel**, both of which auto-detect Astro.

### Option A — GitHub + Netlify (recommended)
1. Create a new repository on [GitHub](https://github.com) and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [app.netlify.com](https://app.netlify.com), click **Add new site → Import an existing project**, and connect your GitHub repo.
3. Netlify will detect Astro automatically (build command `astro build`, publish directory `dist`). Click **Deploy**.
4. Every time you push a change to GitHub, the live site updates automatically.

### Option B — Vercel
Same idea: push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). Vercel also auto-detects Astro.

### Option C — Drag-and-drop (no GitHub required)
1. Run `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag in the generated `dist/` folder.
3. Netlify gives you a live URL immediately. (You'll need to re-run this manually each time you make changes, so Option A is better long-term.)

---

## 6. Connecting a custom domain later

Once you own a domain (e.g. from Namecheap, Google Domains, GoDaddy):

1. In Netlify or Vercel, go to your site's **Domain settings** and click **Add a custom domain**.
2. Enter your domain and follow the on-screen instructions — you'll be given DNS records (usually a CNAME or A record) to add.
3. Log into your domain registrar, go to DNS settings, and add the records exactly as shown.
4. DNS changes can take a few minutes to 48 hours to fully propagate. Netlify/Vercel will auto-issue a free HTTPS certificate once it's verified.
5. Update `site:` in `astro.config.mjs` to your new domain (used for SEO tags and the sitemap).

---

## 7. A note on integrity

This site is written to clearly separate professional client work, academic/independent concepts, and proposed-but-unimplemented strategy. When adding new content, keep that same discipline: don't state a recommendation was implemented or produced results unless you have evidence, and keep fabricated data, quotes, or client endorsements out entirely.
