# cv-2026 — Portfolio of Meharaj Sami Siam

A clean, single-page personal portfolio (Applied AI Engineer). Pure static HTML/CSS/JS —
**no build step, no dependencies** — so it hosts free anywhere. Fixed sidebar (identity +
socials + résumé) and a tabbed main panel, fully monochrome (Inter).

## Pages
- `index.html` — Single page with sidebar + tabbed sections (Experience, Projects, Skills,
  Education, Contact). Tabs are hash-linkable, e.g. `index.html#projects`.
- `dorpon.html` — Dorpon case study (linked from the Projects tab)
- `style.css` — shared styles · `script.js` — tab switching, collapsible cards, footer year

## Résumé
The nav "Resume" button and Contact "Download résumé" link point to `cv.pdf` — the only résumé
file that is published. The CV **source** (`cv.html`, `cv.md`, `cv.docx`, generator script) lives
locally in `cv/`, which is **git-ignored** so it is never pushed — keep your own backup of it.

To regenerate `cv.pdf` after editing `cv/cv.html` (headless Edge/Chrome):
```bash
msedge --headless=new --no-pdf-header-footer --print-to-pdf="cv.pdf" "file:///E:/cv-2026/cv/cv.html"
```
Or just open `cv/cv.html`, Ctrl+P → "Save as PDF", and save it as `cv.pdf` in this folder.

## Preview locally
Just open `index.html` in a browser. (Or run a tiny server: `python -m http.server`
then visit http://localhost:8000.)

## Deploy — pick one (both free)

### Option A — GitHub Pages (nice `github.io` URL, recommended)
1. Create a **public** repo named exactly **`Meharaj002.github.io`** on GitHub.
2. Push these files to its `main` branch:
   ```bash
   cd "E:/cv-2026"
   git init -b main
   git add .
   git commit -m "Portfolio"
   git remote add origin https://github.com/Meharaj002/Meharaj002.github.io.git
   git push -u origin main
   ```
3. GitHub → repo **Settings → Pages** → Source: `main` / root → Save.
4. Live in ~1 min at **https://meharaj002.github.io**.

### Option B — Netlify (drag-and-drop, no git)
1. Go to app.netlify.com → **Add new site → Deploy manually**.
2. Drag this whole `cv-2026` folder onto the page.
3. Instant live URL; rename the site in *Site configuration → Change site name*.

## Customize
- Colors/fonts: top of `style.css` (`:root` variables).
- Text/links: edit the HTML directly (each page has its own nav copy — update all if you
  change menu items).
- A custom domain (e.g. `meharajsami.com`) can be added in GitHub Pages or Netlify settings.
