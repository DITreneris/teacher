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
| `robots.txt` | `/robots.txt` | Explicit policy for citation bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, Bingbot, ClaudeBot, Applebot, ...) and training bots (GPTBot, CCBot, anthropic-ai, Bytespider, Diffbot, Amazonbot, cohere-ai); points to sitemap. Stance: allow all. Review quarterly. |
| `sitemap.xml` | `/sitemap.xml` | Lists `/`, `/privacy.html`, `/terms.html`; declares the Google image extension and references `og-image.png`. |
| `humans.txt` | `/humans.txt` | Human-readable site credits. |
| `llms.txt` | `/llms.txt` | Concise, machine-readable product brief for AI engines (operator, contact, pricing, audience, modes, limitations). |
| `.well-known/security.txt` | `/.well-known/security.txt` | RFC 9116 security contact. |
| `manifest.webmanifest` | `/manifest.webmanifest` | Web app manifest for browser / OS install hints. |
| `og-image.png` | `/og-image.png` | 1200 x 630 social preview. Served with `Cross-Origin-Resource-Policy: cross-origin` so Facebook / LinkedIn / X / Slack can embed it. |
| `apple-touch-icon.png` | `/apple-touch-icon.png` | 180 x 180 home-screen icon. |
| `404.html` | served by Vercel for unmatched routes | Branded 404 with `noindex, follow`. |
| Canonical | `<link rel="canonical">` on each HTML page | Always `https://promptanatomy.online/...`. |
| `meta robots` | `index, follow` on public pages | Indexable marketing + tool pages. |
| Structured data | JSON-LD in `<head>` | `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage` on `index.html`; `BreadcrumbList` on `privacy.html` and `terms.html`. |
| Security headers | `vercel.json` `/(.*)` block | HSTS (2 years, preload), COOP, CORP, CSP-Report-Only, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. |

**Important:** URLs use `.html` extensions (`privacy.html`, `terms.html`). `vercel.json` sets `cleanUrls: false` so canonical URLs, sitemap entries, and tests stay aligned.

**CSP rollout note:** the Content-Security-Policy header is currently `Content-Security-Policy-Report-Only`. After one week of clean reports in production, switch the header key to `Content-Security-Policy` to enforce it.

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
