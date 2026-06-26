# cv-2026 — Portfolio of Meharaj Sami Siam

A clean, multi-page personal portfolio (Applied AI Engineer). Pure static HTML/CSS/JS —
**no build step, no dependencies** — so it hosts free anywhere.

## Pages
- `index.html` — Home (hero, what I do, featured project, CTA)
- `about.html` — Bio, experience timeline, skills, education
- `projects.html` — Project grid
- `dorpon.html` — Dorpon case study (linked from Projects)
- `contact.html` — Contact methods
- `style.css` — shared styles · `script.js` — nav toggle + scroll reveal

## Résumé
The nav "Resume" button and Contact "Download résumé" link point to `cv.pdf` (already in this
folder). The CV source lives in [`cv/`](cv/): `cv.html` (formatted, ATS-friendly), `cv.md`, and
`cv.docx`. This project is self-contained — it no longer depends on any other folder.

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
