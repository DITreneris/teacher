# Deployment — Classroom Prompt Builder

**Canonical repository:** [github.com/DITreneris/teacher](https://github.com/DITreneris/teacher)  
**Production URL:** [promptanatomy.online](https://promptanatomy.online/)  
**Hosting:** Vercel (static, no build step)  
**Parent brand:** [promptanatomy.app](https://www.promptanatomy.app/)

---

## For humans — first-time setup

### 1. Push code to GitHub

```bash
git remote add origin https://github.com/DITreneris/teacher.git
# if origin already exists:
#   git remote set-url origin https://github.com/DITreneris/teacher.git
git push -u origin main
```

### 2. Connect Vercel

| Setting | Value |
|---------|--------|
| Import from | `DITreneris/teacher` |
| Framework Preset | **Other** |
| Root Directory | `./` |
| Build Command | *(leave empty)* |
| Output Directory | *(leave empty — files live at repo root)* |
| Install Command | *(leave empty)* |

### 3. Enable analytics

Vercel project → **Analytics** → Enable.

### 4. Add custom domain

Vercel project → **Domains** → Add `promptanatomy.online` (and optionally `www.promptanatomy.online`).

Configure DNS at your registrar (example — use values Vercel shows in the dashboard):

| Type | Name | Value |
|------|------|--------|
| A | `@` | Vercel IP (shown in Vercel UI) |
| CNAME | `www` | `cname.vercel-dns.com` |

### 5. Verify after deploy

- [ ] https://promptanatomy.online/ loads the app
- [ ] https://promptanatomy.online/privacy.html loads
- [ ] https://promptanatomy.online/terms.html loads
- [ ] https://promptanatomy.online/robots.txt is reachable
- [ ] https://promptanatomy.online/sitemap.xml is reachable
- [ ] Copy prompt → toast “Prompt copied.”
- [ ] Submit sitemap in [Google Search Console](https://search.google.com/search-console)

---

## For robots and search engines

| File | URL | Purpose |
|------|-----|---------|
| `robots.txt` | `/robots.txt` | Allow all crawlers; points to sitemap |
| `sitemap.xml` | `/sitemap.xml` | Lists `/`, `/privacy.html`, `/terms.html` |
| `humans.txt` | `/humans.txt` | Optional human-readable site credits |
| Canonical | `<link rel="canonical">` on each HTML page | Always `https://promptanatomy.online/...` |
| `meta robots` | `index, follow` on public pages | Indexable marketing + tool pages |

**Important:** URLs use `.html` extensions (`privacy.html`, `terms.html`). `vercel.json` sets `cleanUrls: false` so canonical URLs, sitemap entries, and tests stay aligned.

---

## Configuration files

| File | Role |
|------|------|
| [`vercel.json`](vercel.json) | Security headers, cache rules |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Runs `npm run test:mixed` on push/PR |

No environment variables are required for MVP.

---

## Quality gates before push

```bash
npm ci
npm test
npm run test:smoke
npm run test:e2e
npm run test:a11y
```

---

## What is NOT deployed

- `docs/archive/` — historical docs only
- `node_modules/`, `test-results/` — dev dependencies
- `.cursor/`, `.vercel/` — local tooling

Vercel serves static files from the repository root automatically.
