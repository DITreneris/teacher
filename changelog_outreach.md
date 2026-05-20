# Outreach changelog (school outreach bot)

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows [Semantic Versioning](https://semver.org/).

**Scope:** This file tracks **only** the school outreach stack (sibling repo `..\cpb-school-outreach`, GitHub `DITreneris/outreach`): Railway deploy, Supabase Postgres, contact enrichment, campaign sending, and Resend marketing on `news.promptanatomy.online`. Vercel product, PDF fulfillment, Stripe, marketing copy, design system, and infra entries stay in [CHANGELOG.md](CHANGELOG.md). Repo boundary rule: [AGENTS.md](AGENTS.md) "Dviejų repo riba / routing".

Operator references:

- [memo_outreach.md](memo_outreach.md) - split-system summary, Resend split, UTM, first 500 contacts source order.
- [docs/outreach_experience_memo_2026-05-17.md](docs/outreach_experience_memo_2026-05-17.md) - end-to-end experience memo, contact-acquisition lessons, pivot strategy, send plan, agent guidance.

## [Unreleased]

### Added
- **pilot_tx50e live send (2026-05-20):** 50 TX on `pilot_50`, seed `2026052014`, 15-domain exclude + 200 prior ids; send completed via chunked `limit=5` after Railway reset on `limit=50`; **11 bounced / 38 sent / 1 opted_out** (22%). Results: `docs/pilot_tx50e_results.md`; campaign paused.

### Added
- **pilot_tx50d live send (2026-05-19):** 50 TX principals on `pilot_50`, seed `2026051915`, 12-domain exclude + 150 prior ids; API `sent=50`; webhook **8 bounced / 42 sent** (16%, Bryan/Brazosport clusters). **Pause recommended.** Results: outreach `docs/pilot_tx50d_results.md`; pool restored (`ready` ~8162).

### Added
- **pilot_tx50c live send (2026-05-19):** 50 TX principals on `pilot_50` with bounce-domain audit (9 at prep → **12** after Resend/DB sync incl. `bisd.net`, `braination.net`), batch-1+2 id exclude, seed `20260520`; API `sent=50`; webhook **6 bounced / 44 sent** (12%). Registry: `docs/pilot_tx50_bounced_addresses.md`, `docs/pilot_tx50_exclude_domains.txt`. Pool restored (`ready` ~8212).

### Added
- **pilot_tx50b live send (2026-05-19):** 50 TX principals on `pilot_50` with `--exclude-domains aldineisd.org` and batch-1 id exclude; API `sent=50`; early webhook **8 bounced / 42 sent** (16%, down from 22% Aldine-heavy TX50). Results: `docs/pilot_tx50b_results.md`; `prepare_tx50_batch.py` gains `--exclude-domains` / `--exclude-batch`.

### Added
- **Oklahoma OKCareerGuide ICAP PDF (2026-05-18):** `scripts/prepare_ok_icap_from_pdf.py` (pdfplumber extract); 75 ICAP coordinator contacts imported via `import-state-directory --state OK`; `ready` pool **8312** (+75). No live send.

### Added
- **Wisconsin DPI HS import + scrape (2026-05-18):** `scripts/prepare_wi_schools_csv.py`; 506 WI high schools with websites via `import-schools`; scrape smoke/full aborted early (~170 schools, ~7 new `ready` WI) — low ROI vs TX directory; documented in outreach `data/README.md`.

### Added
- **pilot_tx50 live send (2026-05-18):** 50 TX principals on `pilot_50` after quarantine; API `sent=50`, `send_log` 50×`sent`; pool restored via `restore.sql` / `apply_tx50_quarantine` companion restore. Results: outreach repo `docs/pilot_tx50_results.md`.

### Added
- Texas AskTED geocoded import (`Schools_2024_to_2025.csv`): `USER_*` column aliases, `--geocode-status`, `--high-school-only` on `import-state-directory`; production import raised `ready` pool to ~2400 contacts.

### Changed
- Collection target raised from 500 to **1000** ready contacts; outreach repo adds `scripts/run_cycle_1000.ps1` and `scripts/download_tx_askted.py` for operator cycle (official TX/CA imports when CSVs are on disk, then scrape fallback).

### Added
- [docs/outreach_experience_memo_2026-05-17.md](docs/outreach_experience_memo_2026-05-17.md): operator/agent memo documenting the school outreach bot experience, current contact-acquisition status, low hit-rate lessons, strategy pivot toward official state directories (NCES scraping demoted to fallback), and the explicit rule that outreach runs as a separate Railway/Supabase/Resend stack outside the Vercel `promptanatomy.online` fulfillment deployment. Adds the 2026-05-17 pilot readiness milestone: Resend marketing domain `news.promptanatomy.online` verified, US business address in Alameda, CA used for CAN-SPAM, Variant C copy (`Quick look for {{state}} schools - 30 seconds`), one-click unsubscribe write-back to `suppressions`, operator self-test PASS on SPF/DKIM/DMARC, campaign held at `dry_run = true` until pilot_20 plan executes in the outreach repo.
