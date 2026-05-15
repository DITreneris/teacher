# Classroom Prompt Builder

A free, single-page AI prompt builder for K-12 teachers. Pick a mode, fill in a few fields, and copy a ready-made prompt for ChatGPT, Claude, or Gemini.

| | |
|---|---|
| **Repository** | [github.com/DITreneris/teacher](https://github.com/DITreneris/teacher) |
| **Production** | [promptanatomy.online](https://promptanatomy.online/) |
| **Parent brand** | [promptanatomy.app](https://www.promptanatomy.app/) |
| **Status** | US MVP |

## Quick start

```bash
npx serve . -l 3000
```

Open [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

## Documentation

- [`docs/INDEX.md`](docs/INDEX.md) — doc navigation
- [`DEPLOY.md`](DEPLOY.md) — **human + robot deployment reference** (Vercel, DNS, SEO files)
- [`CHANGELOG.md`](CHANGELOG.md) — release notes

## Deployment (summary)

**Hosting:** Vercel, static root, no build command.  
**Config:** [`vercel.json`](vercel.json)  
**SEO for crawlers:** [`robots.txt`](robots.txt), [`sitemap.xml`](sitemap.xml), [`humans.txt`](humans.txt)

Full checklist → **[DEPLOY.md](DEPLOY.md)**

```bash
git remote add origin https://github.com/DITreneris/teacher.git
git push -u origin main
```

## Quality gates

```bash
npm ci
npm test
npm run test:smoke
npm run test:e2e
npm run test:a11y
```
