---
status: ops
audience: both
updated: 2026-07-28
---

# Outreach changelog (school outreach bot)

**Purpose:** Operator work log for school outreach (sibling repo) — not Active product doctrine; not the Vercel product changelog.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows [Semantic Versioning](https://semver.org/).

**Scope:** This file tracks **only** the school outreach stack (sibling repo `..\cpb-school-outreach`, GitHub `DITreneris/outreach`): Railway deploy, Supabase Postgres, contact enrichment, campaign sending, and Resend marketing. Vercel product, PDF fulfillment, Stripe, marketing copy, design system, and infra entries stay in [CHANGELOG.md](CHANGELOG.md). Repo boundary: [AGENTS.md](AGENTS.md) § Two-repo boundary / routing.

### How to log

| Event | Where |
|-------|--------|
| Multi-batch live day | One row per wave in [Live send registry](#live-send-registry); optional Operator day if ≥3 waves same day ([2026-07-28](#operator-day--2026-07-28), [2026-07-27](#operator-day--2026-07-27), [2026-07-23](#operator-day--2026-07-23), [2026-07-22](#operator-day--2026-07-22), [2026-06-02](#operator-day--2026-06-02)) |
| Bounce ≥10% or incident | Bullet under operator day or `### Incident` in `[Unreleased]` |
| Tooling / import / registry | `### Added` / `Changed` under `[Unreleased]` until version cut |
| Pool milestone | Update [Pool snapshot](#pool-snapshot) in `[Unreleased]` only |
| Version cut | Move `[Unreleased]` → `## [0.x.y] - date` (~monthly or per sender domain) |

Do **not** add per-session `### Live —` blocks here — use the registry table and [`docs/archive/changelog_outreach_sessions_2026-05-06.md`](docs/archive/changelog_outreach_sessions_2026-05-06.md) for verbatim session history.

## Contents

- [Unreleased](#unreleased)
- [0.4.0](#040---2026-06-02)
- [0.3.0](#030---2026-05-31)
- [0.2.0](#020---2026-05-26)
- [0.1.0](#010---2026-05-22)
- [Reference — insights](#reference--mining--deliverability-insights)
- [Sender timeline](#live-sender-timeline-pilot_50)
- [Operator index](#operator-references)

**Live sender timeline (pilot_50):**

| Period | From domain |
|--------|-------------|
| TX50–TX50e | `news.promptanatomy.online` / mixed |
| TX50f–TX50g | `promptanatomy.help` |
| TX50j–TX50l | `hello@promptanatomy.ceo` |
| TX50m–TX50p, **VA11a, CA29a, MN50, OH50, MA50, MI50**, **XX50a** (OH/MA/MI) | `hello@promptanatomy.info` |
| **XX50b–d**, **OH50e/f**, **NJ50/b**, **MN50a**, **MA23**, **NY50–o / Wave 15** | **`hello@promptanatomy.cloud`** |
| **Wave 16+ geo** (NY50p / NJ50v / OH50z / TX50z onward) | **`hello@promptanatomy.blog`** |

Operator references:

- [memo_outreach.md](memo_outreach.md) — split-system summary, Resend split, UTM, first 500 contacts source order.
- [docs/outreach_experience_memo_2026-05-17.md](docs/outreach_experience_memo_2026-05-17.md) — contact-acquisition lessons, pivot strategy, send plan, agent guidance.
- Live batch metrics → [Live send registry](#live-send-registry) below; per-batch detail → `cpb-school-outreach/docs/pilot_*_results.md` / `sy2026_followup_f*_results.md`.
- Operator days: [2026-07-28](#operator-day--2026-07-28) (F38–F45) · [2026-07-27](#operator-day--2026-07-27) (F19–F37) · [2026-07-23](#operator-day--2026-07-23) (F13–F18) · [2026-07-22](#operator-day--2026-07-22) (W39 + F1–F12) · [2026-06-02](#operator-day--2026-06-02)
- Session archive (pre-refactor detail): [`docs/archive/changelog_outreach_sessions_2026-05-06.md`](docs/archive/changelog_outreach_sessions_2026-05-06.md)
- TX50 runbook: `..\cpb-school-outreach\docs\pilot_tx50_runbook.md`
- Geo runbooks: `..\cpb-school-outreach\docs\pilot_va11a_runbook.md`, `..\cpb-school-outreach\docs\pilot_ca29a_runbook.md`
- Sender gate (`.info`): `..\cpb-school-outreach\docs\promptanatomy_info_sender_gate.md`
- Sender gate (`.cloud`, Wave 8–15): `..\cpb-school-outreach\docs\promptanatomy_cloud_sender_gate.md`
- Sender gate (`.blog`, Wave 16+): `..\cpb-school-outreach\docs\promptanatomy_blog_sender_gate.md`
- Mining cycle runbook: `..\cpb-school-outreach\docs\mining_cycle_runbook.md`
- MN50/OH50/MA50/MI50/NJ50/**NY50** runbooks: `..\cpb-school-outreach\docs\pilot_mn50_runbook.md`, `pilot_oh50_runbook.md`, `pilot_ma50_runbook.md`, `pilot_mi50_runbook.md`, `pilot_nj50_runbook.md`, **`pilot_ny50_runbook.md`**

## [Unreleased]

### Current status

- Campaign `pilot_50`: **paused** / `dry_run=true`
- Follow-up **`sy2026_followup`**: **paused** / `dry_run=true` after **F1–F45** (**2250** sends; F38–F45 on **2026-07-28**)
- Sender: **`hello@promptanatomy.blog`**
- **Cool-down:** 48h from F45 pause (~**2026-07-28 12:38 UTC** → earliest live **~2026-07-30 12:38 UTC**)
- **Next:** W40 `ny50an`/`oh50ax` after cool-down; parallel GA Open Records → import → ga50 (separate day). Remnants all &lt;50
- Runbook: `..\cpb-school-outreach\docs\pilot_sy2026_followup_runbook.md` | Checklist: `..\cpb-school-outreach\docs\sy2026_resume_operator_checklist.md` | GA: `..\cpb-school-outreach\docs\pilot_ga50_runbook.md`

### Added

- **`sy2026_followup`** campaign tooling (outreach repo): `templates/sy2026_followup.html`, seed `20260722000001_sy2026_followup_campaign.sql`, `prepare_followup_batch.py`, `assert_followup_cohort.py`, `_run_followup_slug_live.ps1`, F1–F45 prep/live wrappers (A+B + NJ/TX hold lift).
- **W40 + GA first-touch tooling:** `run_ny50an_*` / `run_oh50ax_*` / `run_ga50_*`; `run_ga_import_and_activate.ps1`; `ValidateSet` includes **GA**; `docs/pilot_ga50_runbook.md` + `docs/ga_open_records_request.md` + `docs/w40_go_live.md`; `prepare_ga_principals` City-align fix + unit test; PS5 splat fix on `run_ga_import.ps1` / `run_oh_oeds_refresh.ps1`.
- Sender/API **`eligibility=prior_sent`** (default `ready` unchanged) so follow-up does not flip `sent` → `ready`.
- Railway **worker** `run_send.py`: exit 0 (skip) when send env incomplete (`SUPABASE_*`, `UNSUBSCRIBE_SIGNING_SECRET`, `PHYSICAL_ADDRESS`, Resend/from/`PUBLIC_BASE_URL`) instead of crash-looping.

### Changed

- Product [`privacy.html`](privacy.html): school outreach disclosure (separate Resend marketing sender; public-directory contacts; unsubscribe).
- [`docs/marketing_plan.md`](docs/marketing_plan.md) + [`memo_outreach.md`](memo_outreach.md): back-to-school resume + follow-up slug.
- **Geo import PS scripts:** `run_nj_homeroom_refresh.ps1`, `run_ny_sedref_import.ps1`, `run_oh_oeds_refresh.ps1` — splat `@(...)` for CLI args (fixes PowerShell 5.x `--flag` parse error on line continuations).
- **`apply_tx50_quarantine.py`:** promote selection contacts in **`pending`** (not only `ready`) so NY→NJ→OH multi-batch live in one session works after the first quarantine.
- **`_run_pilot_slug_prep.ps1`:** optional **`-MaxPerDomain`** (default `1`) for NJ pool shortfall batches.
- **Follow-up geo:** NY exhausted after F9; F11–F18 **OH**; Phase B MA→MI→MN; **F26–F45** NJ×2→TX×2 cadence (Homeroom before F26); NJ/TX ≥50 exhausted after F45.

### Live send registry

| Date | Session | Batches | Sender | T+0 sent | Bounce % | Cum. ids | Excl. dom. | Notes | Results |
|------|---------|---------|--------|---------:|---------:|---------:|-----------:|-------|---------|
| 2026-07-28 | F45 | **sy2026_followup F45** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | Final TX≥50; **2250** follow-up total; paused | [f45](../cpb-school-outreach/docs/sy2026_followup_f45_results.md) |
| 2026-07-28 | F44 | **sy2026_followup F44** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | NJ×2→TX×2 cadence; prior_sent; paused | [f44](../cpb-school-outreach/docs/sy2026_followup_f44_results.md) |
| 2026-07-28 | F43 | **sy2026_followup F43** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | Final NJ≥50; prior_sent; paused | [f43](../cpb-school-outreach/docs/sy2026_followup_f43_results.md) |
| 2026-07-28 | F42 | **sy2026_followup F42** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | F42–F45 final NJ/TX≥50 series; prior_sent; paused | [f42](../cpb-school-outreach/docs/sy2026_followup_f42_results.md) |
| 2026-07-28 | F41 | **sy2026_followup F41** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | Day mid; **2050** follow-up total; paused | [f41](../cpb-school-outreach/docs/sy2026_followup_f41_results.md) |
| 2026-07-28 | F40 | **sy2026_followup F40** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | NJ×2→TX×2 cadence; prior_sent; paused | [f40](../cpb-school-outreach/docs/sy2026_followup_f40_results.md) |
| 2026-07-28 | F39 | **sy2026_followup F39** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | 2026-07-28 NJ continue; prior_sent; paused | [f39](../cpb-school-outreach/docs/sy2026_followup_f39_results.md) |
| 2026-07-28 | F38 | **sy2026_followup F38** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | F38–F41 series start; prior_sent; paused | [f38](../cpb-school-outreach/docs/sy2026_followup_f38_results.md) |
| 2026-07-27 | F37 | **sy2026_followup F37** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | Hold lift continue; **1850** follow-up total; paused | [f37](../cpb-school-outreach/docs/sy2026_followup_f37_results.md) |
| 2026-07-27 | F36 | **sy2026_followup F36** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | NJ×2→TX×2 cadence; prior_sent; paused | [f36](../cpb-school-outreach/docs/sy2026_followup_f36_results.md) |
| 2026-07-27 | F35 | **sy2026_followup F35** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | Hold lift continue NJ; prior_sent; paused | [f35](../cpb-school-outreach/docs/sy2026_followup_f35_results.md) |
| 2026-07-27 | F34 | **sy2026_followup F34** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | F34–F37 series start; prior_sent; paused | [f34](../cpb-school-outreach/docs/sy2026_followup_f34_results.md) |
| 2026-07-27 | F33 | **sy2026_followup F33** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | Hold lift continue; **1650** follow-up total; paused | [f33](../cpb-school-outreach/docs/sy2026_followup_f33_results.md) |
| 2026-07-27 | F32 | **sy2026_followup F32** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | NJ×2→TX×2 cadence; prior_sent; paused | [f32](../cpb-school-outreach/docs/sy2026_followup_f32_results.md) |
| 2026-07-27 | F31 | **sy2026_followup F31** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | Hold lift continue NJ; prior_sent; paused | [f31](../cpb-school-outreach/docs/sy2026_followup_f31_results.md) |
| 2026-07-27 | F30 | **sy2026_followup F30** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | F30–F33 series start; prior_sent; paused | [f30](../cpb-school-outreach/docs/sy2026_followup_f30_results.md) |
| 2026-07-27 | F29 | **sy2026_followup F29** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | Hold lift; **1450** follow-up total; paused | [f29](../cpb-school-outreach/docs/sy2026_followup_f29_results.md) |
| 2026-07-27 | F28 | **sy2026_followup F28** (TX50) | `.blog` | 50 | T+0 clean | — | ~316 | First TX follow-up; prior_sent; paused | [f28](../cpb-school-outreach/docs/sy2026_followup_f28_results.md) |
| 2026-07-27 | F27 | **sy2026_followup F27** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | Hold lift NJ×2; prior_sent; paused | [f27](../cpb-school-outreach/docs/sy2026_followup_f27_results.md) |
| 2026-07-27 | F26 | **sy2026_followup F26** (NJ50) | `.blog` | 50 | T+0 clean | — | ~316 | Slug reused after MA skip; Homeroom refresh; paused | [f26](../cpb-school-outreach/docs/sy2026_followup_f26_results.md) |
| 2026-07-27 | F25 | **sy2026_followup F25** (MA50) | `.blog` | 50 | T+0 clean | — | ~316 | Phase B; **1250** follow-up total; paused | [f25](../cpb-school-outreach/docs/sy2026_followup_f25_results.md) |
| 2026-07-27 | F24 | **sy2026_followup F24** (MA50) | `.blog` | 50 | T+0 clean | — | ~316 | F24 repurposed MN→MA; prior_sent; paused | [f24](../cpb-school-outreach/docs/sy2026_followup_f24_results.md) |
| 2026-07-27 | F23 | **sy2026_followup F23** (MN50) | `.blog` | 50 | T+0 clean | — | ~316 | Only MN50; remnant ~24 skip | [f23](../cpb-school-outreach/docs/sy2026_followup_f23_results.md) |
| 2026-07-27 | F22 | **sy2026_followup F22** (MI50) | `.blog` | 50 | T+0 clean | — | ~316 | Phase B; **1100** follow-up total; paused | [f22](../cpb-school-outreach/docs/sy2026_followup_f22_results.md) |
| 2026-07-27 | F21 | **sy2026_followup F21** (MI50) | `.blog` | 50 | T+0 clean | — | ~316 | Phase B MI; prior_sent; paused | [f21](../cpb-school-outreach/docs/sy2026_followup_f21_results.md) |
| 2026-07-27 | F20 | **sy2026_followup F20** (MA50) | `.blog` | 50 | T+0 clean | — | ~316 | Phase B MA; prior_sent; paused | [f20](../cpb-school-outreach/docs/sy2026_followup_f20_results.md) |
| 2026-07-27 | F19 | **sy2026_followup F19** (MA50) | `.blog` | 50 | T+0 clean | — | ~316 | Phase B start post cool-down; MA probe; paused | [f19](../cpb-school-outreach/docs/sy2026_followup_f19_results.md) |
| 2026-07-23 | F18 | **sy2026_followup F18** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | Phase A end; **900** total; **48h cool-down** before F19 | [f18](../cpb-school-outreach/docs/sy2026_followup_f18_results.md) |
| 2026-07-23 | F17 | **sy2026_followup F17** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | Phase A OH drain; prior_sent; paused | [f17](../cpb-school-outreach/docs/sy2026_followup_f17_results.md) |
| 2026-07-23 | F16 | **sy2026_followup F16** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | Final of F13–F16; **800** follow-up total; paused | [f16](../cpb-school-outreach/docs/sy2026_followup_f16_results.md) |
| 2026-07-23 | F15 | **sy2026_followup F15** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | F13–F16 OH series; prior_sent; paused | [f15](../cpb-school-outreach/docs/sy2026_followup_f15_results.md) |
| 2026-07-23 | F14 | **sy2026_followup F14** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | F13–F16 OH series; prior_sent; paused | [f14](../cpb-school-outreach/docs/sy2026_followup_f14_results.md) |
| 2026-07-23 | F13 | **sy2026_followup F13** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | F13–F16 OH series; prior_sent; paused | [f13](../cpb-school-outreach/docs/sy2026_followup_f13_results.md) |
| 2026-07-22 | F12 | **sy2026_followup F12** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | Final of F9–F12; **600** follow-up total; paused | [f12](../cpb-school-outreach/docs/sy2026_followup_f12_results.md) |
| 2026-07-22 | F11 | **sy2026_followup F11** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | NY exhausted; OH substitute; paused | [f11](../cpb-school-outreach/docs/sy2026_followup_f11_results.md) |
| 2026-07-22 | F10 | **sy2026_followup F10** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | F9–F12 series; prior_sent; paused | [f10](../cpb-school-outreach/docs/sy2026_followup_f10_results.md) |
| 2026-07-22 | F9 | **sy2026_followup F9** (NY50) | `.blog` | 50 | T+0 clean | — | ~316 | F9–F12; NY pool ~78→28 after; paused | [f9](../cpb-school-outreach/docs/sy2026_followup_f9_results.md) |
| 2026-07-22 | F8 | **sy2026_followup F8** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | Final of F5–F8; **400** follow-up total; paused | [f8](../cpb-school-outreach/docs/sy2026_followup_f8_results.md) |
| 2026-07-22 | F7 | **sy2026_followup F7** (NY50) | `.blog` | 50 | T+0 clean | — | ~316 | F5–F8 series; prior_sent; paused | [f7](../cpb-school-outreach/docs/sy2026_followup_f7_results.md) |
| 2026-07-22 | F6 | **sy2026_followup F6** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | F5–F8 series; prior_sent; paused | [f6](../cpb-school-outreach/docs/sy2026_followup_f6_results.md) |
| 2026-07-22 | F5 | **sy2026_followup F5** (NY50) | `.blog` | 50 | T+0 clean | — | ~316 | F5–F8 series; prior_sent; paused | [f5](../cpb-school-outreach/docs/sy2026_followup_f5_results.md) |
| 2026-07-22 | F4 | **sy2026_followup F4** (OH50) | `.blog` | 50 | T+0 clean | — | ~316 | Final of first 4; paused | [f4](../cpb-school-outreach/docs/sy2026_followup_f4_results.md) |
| 2026-07-22 | F3 | **sy2026_followup F3** (NY50) | `.blog` | 50 | ~2% | — | ~316 | Follow-up; 1 opted_out; paused | [f3](../cpb-school-outreach/docs/sy2026_followup_f3_results.md) |
| 2026-07-22 | F2 | **sy2026_followup F2** (OH50) | `.blog` | 50 | ~0% T+0 | — | ~316 | Follow-up #2; prior_sent; paused | [f2](../cpb-school-outreach/docs/sy2026_followup_f2_results.md) |
| 2026-07-22 | F1 | **sy2026_followup F1** (NY50) | `.blog` | 50 | ~2% | — | ~316 | First follow-up email #2; prior_sent; campaign paused | [f1](../cpb-school-outreach/docs/sy2026_followup_f1_results.md) |
| 2026-07-22 | W39 | **NY50am** / **OH50aw** | `.blog` | 100 | NY 6% / OH 6% | ~8394 | ~316 | Post-cooldown rewarm; NJ/TX held; `sy2026_followup` F1 prepped | [ny50am](../cpb-school-outreach/docs/pilot_ny50am_results.md) / [oh50aw](../cpb-school-outreach/docs/pilot_oh50aw_results.md) |
| 2026-06-05 | W38 | NY50al / OH50av / **TX50c** | `.blog` | 140 | NY 2% / OH 4% / TX 6% | 8294 | 313 | **NJ50ar prep failed** (34 max); TX after geo gate | [ny50al](../cpb-school-outreach/docs/pilot_ny50al_results.md) / [nj50ar](../cpb-school-outreach/docs/pilot_nj50ar_results.md) / [oh50av](../cpb-school-outreach/docs/pilot_oh50av_results.md) / [tx50c](../cpb-school-outreach/docs/pilot_tx50c_results.md) |
| 2026-06-05 | W37 | NY50ak / NJ50aq / OH50au | `.blog` | 148 | NY/NJ 2% / OH 0% | 8154 | 307 | TX paused; NJ md1→**md10** (9 dom.); Homeroom refresh | [ny50ak](../cpb-school-outreach/docs/pilot_ny50ak_results.md) / [nj50aq](../cpb-school-outreach/docs/pilot_nj50aq_results.md) / [oh50au](../cpb-school-outreach/docs/pilot_oh50au_results.md) |
| 2026-06-05 | W36 | NY50aj / NJ50ap / OH50at / **TX50b** | `.blog` | 193 | NY 2% / NJ 0% / OH 0% / TX 4% | 8006 | 305 | NJ md1→**md5** (13 dom.); TX retry after W17 | [ny50aj](../cpb-school-outreach/docs/pilot_ny50aj_results.md) / [nj50ap](../cpb-school-outreach/docs/pilot_nj50ap_results.md) / [oh50at](../cpb-school-outreach/docs/pilot_oh50at_results.md) / [tx50b](../cpb-school-outreach/docs/pilot_tx50b_results.md) |
| 2026-06-05 | W35 | NY50ai / NJ50ao / OH50as | `.blog` | 145 | NY/NJ 4% / OH 2% | 7813 | 302 | TX paused; NJ md1→md2→**md3**; Homeroom refresh | [ny50ai](../cpb-school-outreach/docs/pilot_ny50ai_results.md) / [nj50ao](../cpb-school-outreach/docs/pilot_nj50ao_results.md) / [oh50as](../cpb-school-outreach/docs/pilot_oh50as_results.md) |
| 2026-06-04 | W34 | NY50ah / NJ50an / OH50ar | `.blog` | 148 | NY/NJ 2% | 7668 | 297 | TX paused; NJ md1→md2; OH 0% | [ny50ah](../cpb-school-outreach/docs/pilot_ny50ah_results.md) / [nj50an](../cpb-school-outreach/docs/pilot_nj50an_results.md) / [oh50ar](../cpb-school-outreach/docs/pilot_oh50ar_results.md) |
| 2026-06-03 | W33 | NY50ag / NJ50am / OH50aq | `.blog` | 145 | OH 6% / NJ 2% | 7520 | 295 | TX paused; NJ max-per-domain 2; Resend quota OH retry | [ny50ag](../cpb-school-outreach/docs/pilot_ny50ag_results.md) / [nj50am](../cpb-school-outreach/docs/pilot_nj50am_results.md) / [oh50aq](../cpb-school-outreach/docs/pilot_oh50aq_results.md) |
| 2026-06-03 | W32 | NY50af / NJ50al / OH50ap | `.blog` | 149 | OH 2% | 7375 | 291 | TX paused; NJ Homeroom refresh; NY/NJ 0% | [ny50af](../cpb-school-outreach/docs/pilot_ny50af_results.md) / [nj50al](../cpb-school-outreach/docs/pilot_nj50al_results.md) / [oh50ap](../cpb-school-outreach/docs/pilot_oh50ap_results.md) |
| 2026-06-03 | W31 | NY50ae / NJ50ak / OH50ao | `.blog` | 147 | NY/OH 2–4% | 7226 | 290 | TX paused; NJ Homeroom refresh; NJ 0% | [ny50ae](../cpb-school-outreach/docs/pilot_ny50ae_results.md) / [nj50ak](../cpb-school-outreach/docs/pilot_nj50ak_results.md) / [oh50ao](../cpb-school-outreach/docs/pilot_oh50ao_results.md) |
| 2026-06-03 | W30 | NY50ad / NJ50aj / OH50an | `.blog` | 147 | NJ/OH 2–4% | 7079 | 287 | TX paused; NY 0%; NJ prep ~554 | [ny50ad](../cpb-school-outreach/docs/pilot_ny50ad_results.md) / [nj50aj](../cpb-school-outreach/docs/pilot_nj50aj_results.md) / [oh50an](../cpb-school-outreach/docs/pilot_oh50an_results.md) |
| 2026-06-03 | W29 | NY50ac / NJ50ai / OH50am | `.blog` | 148 | OH 4% | 6932 | 284 | TX paused; NJ Homeroom re-import; NY/NJ 0% | [ny50ac](../cpb-school-outreach/docs/pilot_ny50ac_results.md) / [nj50ai](../cpb-school-outreach/docs/pilot_nj50ai_results.md) / [oh50am](../cpb-school-outreach/docs/pilot_oh50am_results.md) |
| 2026-06-03 | W28 | NY50ab / NJ50ah / OH50al | `.blog` | 145 | NJ/OH 4% | 6784 | 282 | TX paused; NY 0%; NJ prep **668** | [ny50ab](../cpb-school-outreach/docs/pilot_ny50ab_results.md) / [nj50ah](../cpb-school-outreach/docs/pilot_nj50ah_results.md) / [oh50al](../cpb-school-outreach/docs/pilot_oh50al_results.md) |
| 2026-06-02 | W27 | NY50aa / NJ50ag / OH50ak | `.blog` | 148 | NJ/OH 2% | 6639 | 277 | TX paused; NY 0%; NJ chunk resume | [ny50aa](../cpb-school-outreach/docs/pilot_ny50aa_results.md) / [nj50ag](../cpb-school-outreach/docs/pilot_nj50ag_results.md) / [oh50ak](../cpb-school-outreach/docs/pilot_oh50ak_results.md) |
| 2026-06-02 | W26 | NY50z / NJ50af / OH50aj | `.blog` | 145 | NJ 4% / OH 6% | 6491 | 275 | TX paused; NY 0% | [ny50z](../cpb-school-outreach/docs/pilot_ny50z_results.md) / [nj50af](../cpb-school-outreach/docs/pilot_nj50af_results.md) / [oh50aj](../cpb-school-outreach/docs/pilot_oh50aj_results.md) |
| 2026-06-02 | W25 | NY50y / NJ50ae / OH50ai | `.blog` | 146 | NY 4% | 6346 | 270 | TX paused; OH improved | [ny50y](../cpb-school-outreach/docs/pilot_ny50y_results.md) / [nj50ae](../cpb-school-outreach/docs/pilot_nj50ae_results.md) / [oh50ai](../cpb-school-outreach/docs/pilot_oh50ai_results.md) |
| 2026-06-02 | W24 | NY50x / NJ50ad / OH50ah | `.blog` | 144 | OH 8% | 6200 | 266 | TX paused | [ny50x](../cpb-school-outreach/docs/pilot_ny50x_results.md) / [nj50ad](../cpb-school-outreach/docs/pilot_nj50ad_results.md) / [oh50ah](../cpb-school-outreach/docs/pilot_oh50ah_results.md) |
| 2026-06-02 | W23 | NY50w / NJ50ac / OH50ag | `.blog` | 141 | OH 12% | 6056 | 260 | TX paused | [ny50w](../cpb-school-outreach/docs/pilot_ny50w_results.md) / [nj50ac](../cpb-school-outreach/docs/pilot_nj50ac_results.md) / [oh50ag](../cpb-school-outreach/docs/pilot_oh50ag_results.md) |
| 2026-06-02 | W22 | NY50v / NJ50ab / OH50af | `.blog` | 149 | 0–2% | 5915 | 251 | TX paused | [ny50v](../cpb-school-outreach/docs/pilot_ny50v_results.md) / [nj50ab](../cpb-school-outreach/docs/pilot_nj50ab_results.md) / [oh50af](../cpb-school-outreach/docs/pilot_oh50af_results.md) |
| 2026-06-02 | W21 | NY50u / NJ50aa / OH50ae | `.blog` | 149 | 0–2% | 5766 | 250 | TX paused | [ny50u](../cpb-school-outreach/docs/pilot_ny50u_results.md) / [nj50aa](../cpb-school-outreach/docs/pilot_nj50aa_results.md) / [oh50ae](../cpb-school-outreach/docs/pilot_oh50ae_results.md) |
| 2026-06-02 | W20 | NY50t / NJ50z / OH50ad | `.blog` | 147 | 0–4% | 5617 | 249 | TX paused; NJ50z exhausted a–z | [ny50t](../cpb-school-outreach/docs/pilot_ny50t_results.md) / [nj50z](../cpb-school-outreach/docs/pilot_nj50z_results.md) / [oh50ad](../cpb-school-outreach/docs/pilot_oh50ad_results.md) |
| 2026-06-02 | W19 | NY50s / NJ50y / OH50ac | `.blog` | 147 | 0–4% | 5470 | 246 | TX paused | [ny50s](../cpb-school-outreach/docs/pilot_ny50s_results.md) / [nj50y](../cpb-school-outreach/docs/pilot_nj50y_results.md) / [oh50ac](../cpb-school-outreach/docs/pilot_oh50ac_results.md) |
| 2026-06-01 | W18 | NY50r / NJ50x / OH50ab | `.blog` | 147 | 0–4% | 5323 | 240 | TX skipped | [ny50r](../cpb-school-outreach/docs/pilot_ny50r_results.md) / [nj50x](../cpb-school-outreach/docs/pilot_nj50x_results.md) / [oh50ab](../cpb-school-outreach/docs/pilot_oh50ab_results.md) |
| 2026-06-01 | W17 | NY50q / NJ50w / OH50aa / TX50a | `.blog` | 188 | TX 14% | 5176 | 240 | TX50a backward-fill; OH post-z slug | [ny50q](../cpb-school-outreach/docs/pilot_ny50q_results.md) / [nj50w](../cpb-school-outreach/docs/pilot_nj50w_results.md) / [oh50aa](../cpb-school-outreach/docs/pilot_oh50aa_results.md) / [tx50a](../cpb-school-outreach/docs/pilot_tx50a_results.md) |
| 2026-06-01 | W16 | NY50p / NJ50v / OH50z / TX50z | `.blog` | 194 | 0–2% | 4988 | 230 | First `.blog` + personal copy | [ny50p](../cpb-school-outreach/docs/pilot_ny50p_results.md) / [nj50v](../cpb-school-outreach/docs/pilot_nj50v_results.md) / [oh50z](../cpb-school-outreach/docs/pilot_oh50z_results.md) / [tx50z](../cpb-school-outreach/docs/pilot_tx50z_results.md) |
| 2026-06-01 | W15 | NY50o / NJ50u / OH50y / TX50y | `.cloud` | 190 | 0–10% | 4794 | 216 | NJ 10% | [ny50o](../cpb-school-outreach/docs/pilot_ny50o_results.md) / [nj50u](../cpb-school-outreach/docs/pilot_nj50u_results.md) / [oh50y](../cpb-school-outreach/docs/pilot_oh50y_results.md) / [tx50y](../cpb-school-outreach/docs/pilot_tx50y_results.md) |
| 2026-05-29 | W14 | NY50n / NJ50t / OH50x / TX50x | `.cloud` | 193 | 0–6% | 4604 | 215 | | [ny50n](../cpb-school-outreach/docs/pilot_ny50n_results.md) / [nj50t](../cpb-school-outreach/docs/pilot_nj50t_results.md) / [oh50x](../cpb-school-outreach/docs/pilot_oh50x_results.md) / [tx50x](../cpb-school-outreach/docs/pilot_tx50x_results.md) |
| 2026-05-29 | W13 | NY50m / NJ50s / OH50w / TX50w | `.cloud` | 193 | 0–4% | 4411 | 205 | | [ny50m](../cpb-school-outreach/docs/pilot_ny50m_results.md) / [nj50s](../cpb-school-outreach/docs/pilot_nj50s_results.md) / [oh50w](../cpb-school-outreach/docs/pilot_oh50w_results.md) / [tx50w](../cpb-school-outreach/docs/pilot_tx50w_results.md) |
| 2026-05-29 | W12 | NY50l / NJ50r / OH50v | `.cloud` | 144 | 0–4% | 4218 | 200 | geo-only | [ny50l](../cpb-school-outreach/docs/pilot_ny50l_results.md) / [nj50r](../cpb-school-outreach/docs/pilot_nj50r_results.md) / [oh50v](../cpb-school-outreach/docs/pilot_oh50v_results.md) |
| 2026-05-28 | W11 | NY50k / NJ50q / OH50u / TX50v | `.cloud` | 194 | 0–8% | 4074 | 193 | | [ny50k](../cpb-school-outreach/docs/pilot_ny50k_results.md) / [nj50q](../cpb-school-outreach/docs/pilot_nj50q_results.md) / [oh50u](../cpb-school-outreach/docs/pilot_oh50u_results.md) / [tx50v](../cpb-school-outreach/docs/pilot_tx50v_results.md) |
| 2026-05-28 | W10 | NY50j / NJ50p / OH50t / TX50u | `.cloud` | 193 | 0–6% | 3880 | 188 | | [ny50j](../cpb-school-outreach/docs/pilot_ny50j_results.md) / [nj50p](../cpb-school-outreach/docs/pilot_nj50p_results.md) / [oh50t](../cpb-school-outreach/docs/pilot_oh50t_results.md) / [tx50u](../cpb-school-outreach/docs/pilot_tx50u_results.md) |
| 2026-05-28 | W9 | NY50i / NJ50o / OH50s / TX50t | `.cloud` | 188 | 0–8% | 3687 | 178 | post–Wave 8 harness | [ny50i](../cpb-school-outreach/docs/pilot_ny50i_results.md) / [nj50o](../cpb-school-outreach/docs/pilot_nj50o_results.md) / [oh50s](../cpb-school-outreach/docs/pilot_oh50s_results.md) / [tx50t](../cpb-school-outreach/docs/pilot_tx50t_results.md) |
| 2026-05-28 | W8 | NY50h / NJ50n / OH50r / TX50s | `.cloud` | 192 | 0–6% | 3499 | 171 | new `pilot_50` copy | [ny50h](../cpb-school-outreach/docs/pilot_ny50h_results.md) / [nj50n](../cpb-school-outreach/docs/pilot_nj50n_results.md) / [oh50r](../cpb-school-outreach/docs/pilot_oh50r_results.md) / [tx50s](../cpb-school-outreach/docs/pilot_tx50s_results.md) |
| 2026-05-28 | W7 | NY50g / NJ50m / OH50q / TX50r | `.cloud` | 191 | 0–8% | 3307 | 164 | | [ny50g](../cpb-school-outreach/docs/pilot_ny50g_results.md) / [nj50m](../cpb-school-outreach/docs/pilot_nj50m_results.md) / [oh50q](../cpb-school-outreach/docs/pilot_oh50q_results.md) / [tx50r](../cpb-school-outreach/docs/pilot_tx50r_results.md) |
| 2026-05-28 | W6 | NY50f / NJ50l / OH50p / TX50q | `.cloud` | 195 | 0–4% | 3116 | 158 | NY/NJ second live pass fix | [ny50f](../cpb-school-outreach/docs/pilot_ny50f_results.md) / [nj50l](../cpb-school-outreach/docs/pilot_nj50l_results.md) / [oh50p](../cpb-school-outreach/docs/pilot_oh50p_results.md) / [tx50q](../cpb-school-outreach/docs/pilot_tx50q_results.md) |
| 2026-05-28 | W5 | NY50e / NJ50k / OH50o | `.cloud` | 145 | 0–4% | 2921 | 153 | | [ny50e](../cpb-school-outreach/docs/pilot_ny50e_results.md) / [nj50k](../cpb-school-outreach/docs/pilot_nj50k_results.md) / [oh50o](../cpb-school-outreach/docs/pilot_oh50o_results.md) |
| 2026-05-27 | W4 | NY50c–d / NJ50i–j / OH50m–n | `.cloud` | 292 | 0–4% | 2776 | 147 | 6 batches one session | [ny50c](../cpb-school-outreach/docs/pilot_ny50c_results.md) … |
| 2026-05-27 | W3 | NY50b / NJ50h / OH50l | `.cloud` | 146 | 0–2% | 2484 | 142 | | [ny50b](../cpb-school-outreach/docs/pilot_ny50b_results.md) / [nj50h](../cpb-school-outreach/docs/pilot_nj50h_results.md) / [oh50l](../cpb-school-outreach/docs/pilot_oh50l_results.md) |
| 2026-05-27 | W2 | NY50a / NJ50g / OH50k | `.cloud` | 147 | 0–4% | 2338 | 142 | | [ny50a](../cpb-school-outreach/docs/pilot_ny50a_results.md) / [nj50g](../cpb-school-outreach/docs/pilot_nj50g_results.md) / [oh50k](../cpb-school-outreach/docs/pilot_oh50k_results.md) |
| 2026-05-27 | W1 | NY50 / NJ50f / OH50j | `.cloud` | 145 | 0–6% | 2191 | 133 | first NY/NJ/OH `.cloud` | [ny50](../cpb-school-outreach/docs/pilot_ny50_results.md) / [nj50f](../cpb-school-outreach/docs/pilot_nj50f_results.md) / [oh50j](../cpb-school-outreach/docs/pilot_oh50j_results.md) |

Earlier TX / XX50 / VA / CA batches (pre-W1): see [0.1.0](#010---2026-05-22) geo pivot table and [archive](docs/archive/changelog_outreach_sessions_2026-05-06.md).

### Operator day — 2026-07-28

Continue NJ×2→TX×2: **F38–F45** on `sy2026_followup` / `prior_sent` / **`.blog`**.

| Session | Batches | T+0 sent (sum) | Notes |
|--------:|---------|---------------:|-------|
| **F38–F39** | NJ50 ×2 | **100** | Continue NJ |
| **F40–F41** | TX50 ×2 | **100** | Continue TX |
| **F42–F43** | NJ50 ×2 | **100** | Final NJ≥50 |
| **F44–F45** | TX50 ×2 | **100** | Final TX≥50 |

**Day totals:** **400** follow-up sends; cumulative **1850 → 2250**. All T+0 cohort asserts clean.

**Pools after F45:** NJ ~**21** / TX ~**24** (both skip &lt;50). Safe ≥50 follow-up geos exhausted — next needs new geo / import / cool-down.

### Operator day — 2026-07-27

Phase B + hold lift: **F19–F37** on `sy2026_followup` / `prior_sent` / **`.blog`**.

| Session | Batches | T+0 sent (sum) | Notes |
|--------:|---------|---------------:|-------|
| **F19–F20** | MA50 ×2 | **100** | First non-OH follow-up geo |
| **F21–F22** | MI50 ×2 | **100** | MI remnant ~32 after F22 |
| **F23** | MN50 | **50** | Only MN50; remnant ~24 skip |
| **F24–F25** | MA50 ×2 | **100** | F24 repurposed MN→MA; MA F26 prep failed |
| **F26–F27** | NJ50 ×2 | **100** | Hold lift after Homeroom refresh |
| **F28–F29** | TX50 ×2 | **100** | First TX follow-up waves |
| **F30–F31** | NJ50 ×2 | **100** | Continue NJ×2→TX×2 |
| **F32–F33** | TX50 ×2 | **100** | Continue TX |
| **F34–F35** | NJ50 ×2 | **100** | Continue NJ |
| **F36–F37** | TX50 ×2 | **100** | Continue TX |

**Day totals:** **950** follow-up sends; cumulative **900 → 1850**. All live T+0 cohort asserts clean.

**Pools after F37:** NJ ~**225** / TX ~**225**. Remnants MA/MI/MN/OH/NY all &lt;50.

### Operator day — 2026-07-23

Follow-up continuation + A+B Phase A:

| Session | Batches | T+0 sent (sum) | Notes |
|--------:|---------|---------------:|-------|
| **F13–F16** | OH50 ×4 | **200** | Morning OH series; cumulative **800** |
| **F17–F18** | OH50 ×2 | **100** | Phase A drain; cumulative **900**; start **48h cool-down** |

**Day totals:** **300** follow-up sends this day (plus earlier F1–F12 on 2026-07-22). Phase B (MA→MI→MN) blocked until **≥2026-07-25 ~03:21 UTC**.

**Pools after F18:** MA **245** / MI **132** / MN **74** prior_sent eligible. OH remnant ~**10**.

### Operator day — 2026-07-22

Post-cooldown resume: first-touch rewarm **W39**, then follow-up **F1–F12** on `sy2026_followup` / `prior_sent` / **`.blog`**.

| Session | Batches | T+0 sent (sum) | Notes |
|--------:|---------|---------------:|-------|
| **W39** | NY50am / OH50aw | **100** | ~6% bounce each; NJ/TX held |
| **F1–F4** | NY/OH/NY/OH | **200** | First follow-up waves; immediate bounce low |
| **F5–F8** | NY/OH/NY/OH | **200** | T+0 cohort asserts clean |
| **F9–F12** | NY + OH×3 | **200** | NY pool exhausted after F9 (~78→~28); F11 OH substitute |

**Day totals:** **100** first-touch + **600** follow-up = **700** T+0 sends that day. Cumulative follow-up end-of-day: **600**.

**Notable:** Railway worker crash-loop (missing env / `UNSUBSCRIBE_SIGNING_SECRET`) hardened to skip. Campaigns left **paused** / `dry_run=true` between waves.

### Operator day — 2026-06-02

Five geo live sessions (NY/NJ/OH only; **TX50b** deferred since W17 **TX50a 14%**). Sender **`hello@promptanatomy.blog`**; personal `pilot_50` copy throughout.

| Session | Batches | T+0 sent (sum) | Cumulative IDs (end) | Exclude domains (end) |
|--------:|---------|---------------:|---------------------:|----------------------:|
| **W19** | NY50s / NJ50y / OH50ac | **147** | **5470** | **246** |
| **W20** | NY50t / NJ50z / OH50ad | **147** | **5617** | **249** |
| **W21** | NY50u / NJ50aa / OH50ae | **149** | **5766** | **250** |
| **W22** | NY50v / NJ50ab / OH50af | **149** | **5915** | **251** |
| **W23** | NY50w / NJ50ac / OH50ag | **141** | **6056** | **260** |

**Day totals:** **733** T+0 sent across **15** batches; cumulative ids **5323 → 6056** (+733); exclude domains **243 → 260** (+17).

**NJ prep pool (after exclusions):** **1132** (W19) → **928** (W23) — declining ~50/wave; refresh official directory if next prep fails.

**Notable:** NJ50z exhausted a–z (W20); post-z slugs **nj50aa** onward (W21+). **OH50ag 12%** T+0 bounce (W23) — watch **OH50ah** next.

### Pool snapshot

| Metric | Value (2026-07-28, post geo refresh + cool-down prep) |
|--------|------------------------------|
| Principal `ready` NY / NJ / OH | **5115** / **2306** / **2975** |
| Cumulative first-touch geo+TX live ids (pilot_50) | **~8394** (post W39; W40 live gated to ≥2026-07-30 12:38 UTC) |
| Follow-up `sy2026_followup` sends | **2250** (F1–F45) |
| Follow-up NJ / TX prior_sent remaining | **~21** / **~24** (both skip &lt;50) |
| Follow-up MA / MI / MN prior_sent remaining | **~44** / **~32** / **~24** (all skip &lt;50) |
| Follow-up OH prior_sent remaining | **~10** (skip &lt;50) |
| GA principal ready | **0** (await ORR `ga_contacts_raw.csv`) |
| Exclude domains | **~316** |
| W40 selections prepped | `ny50an` / `oh50ax` (live after cool-down) |

| Metric | Value (2026-07-23, post F18 / Phase A) |
|--------|----------------------------------------|
| Follow-up `sy2026_followup` sends | **900** (F1–F18) |
| Follow-up MA / MI / MN prior_sent | **245** / **132** / **74** |
| Cool-down ends (earliest F19) | **2026-07-25 ~03:21 UTC** (honored) |

| Metric | Value (2026-06-05, post W38) |
|--------|------------------------------|
| Cumulative geo+TX live ids | **8294** |
| Exclude domains | **313** |
| Principal `ready` (post restore) | NY **3173** / NJ **2262** / OH **1173** / TX **8013** |

**W38 session:** **140** T+0 sent (NY **49** / OH **47** / TX **44**); **NJ50ar skipped** (prep max **34** at md50; **147** after exclusions). **0** complaints. NJ Homeroom re-import pre-wave (principal ready **2315**). **TX50c** after geo gate (NY **2%**, OH **4%**). New bounce domains: `mtvernoncsd.org`, `summitacademies.org`, `ulschools.com`, `clevelandisd.org`, `conroeisd.net`, `crowley.k12.tx.us`. OH prep **388**.

**W37 session:** **148** T+0 sent (NY **49** / NJ **49** / OH **50**); **0** complaints. NJ Homeroom re-import pre-wave (principal ready **2315**); NJ prep **`max-per-domain=1` failed (9)** → **`max-per-domain=2` failed (15)** → **`max-per-domain=3` failed (21)** → **`max-per-domain=4` failed (27)** → **`max-per-domain=5` failed (33)** → **`max-per-domain=6` failed (37)** → fallback **`max-per-domain=10`** (9 unique domains; **197** after exclusions). New bounce domains: `nycap.rr.com`, `trenton.k12.nj.us`. OH prep **438**.

**W36 session:** **193** T+0 sent (NY **48** / NJ **50** / OH **50** / TX **45**); **0** complaints. NJ Homeroom re-import (principal ready **2318**); NJ prep **`max-per-domain=1→5`** (13 unique domains). **TX50b retry** after geo gates — **4%** T+0 (vs TX50a **14%**). New bounce domains: `northernrivers.org`, `comstockisd.net`, `cooperbulldogs.net`. OH prep **488**.

**W35 session:** **145** T+0 sent (NY **48** / NJ **48** / OH **49**); **0** complaints. NJ Homeroom re-import pre-wave (principal ready **2320**); NJ prep **`max-per-domain=1` failed (22)** → **`max-per-domain=2` failed (39)** → **`max-per-domain=3`** (20 unique domains). New bounce domains: `msd.k12.ny.us`, `nhart.org`, `westorangeschools.org`, `woodstown.org`, `stjohnlogan.org`. OH prep **538**.

**W34 session:** **148** T+0 sent (NY **49** / NJ **49** / OH **50**); **0** complaints. NJ Homeroom re-import pre-wave; NJ prep **`max-per-domain=1` failed (29)** → **`max-per-domain=2`**. New bounce domains: `nasboces.org`, `wpschools.org`. OH **0%** T+0 (recovery from W33 6%). OH prep **588**.

**W33 session:** **145** T+0 sent (NY **49** / NJ **49** / OH **47**); **0** complaints. NJ Homeroom re-import ×2 (first import HTTP/2 reset). NJ prep **max-per-domain=2** after only **38** at `max-per-domain=1`. New bounce domains: `plainfield.k12.nj.us`, `reyn.org`, `nhaschools.com`, `shelbyk12.org`. OH live paused once on Resend daily quota. OH prep **643**.

**W32 session:** **149** T+0 sent (NY **50** / NJ **50** / OH **49**); **0** complaints. Pre-W32 NJ Homeroom re-import (principal ready **2284**). New bounce domain: `seovec.org`. NJ prep **454** after exclusions; post-W32 NJ eligible **~404**. OH prep **694**.

**W31 session:** **147** T+0 sent (NY **48** / NJ **50** / OH **49**); **0** complaints. Pre-W31 NJ Homeroom re-import (principal ready **2285**). New bounce domains: `malverneschools.org`, `marlboroschools.org`, `rollred.org`. NJ prep **~500**; post-W31 NJ eligible **454**. OH prep **747**.

Mining detail and historical pool steps: [0.2.0](#020---2026-05-26).

### Open actions

| P | Action | Why |
|---|--------|-----|
| **P0** | Honor **48h cool-down** until **~2026-07-30 12:38 UTC** (from F45 pause) | Reputation after Jul 27–28 burst |
| **P0** | After cool-down: live **W40** per [w40_go_live.md](../cpb-school-outreach/docs/w40_go_live.md) (selections prepped) | Refill first-touch; create new `prior_sent` |
| **P0** | Operator: **send** GA ORR email ([ga_open_records_request.md](../cpb-school-outreach/docs/ga_open_records_request.md)); save `ga_contacts_raw.csv` | DOE catalog timeout; no emails on disk |
| **P1** | When CSV ready: `.\scripts\run_ga_import_and_activate.ps1` → **ga50** day ≠ W40 | [pilot_ga50_runbook.md](../cpb-school-outreach/docs/pilot_ga50_runbook.md) |
| **P1** | Keep Railway **worker** disabled or env-parity with API | Avoid auto-send / crash loops |
| **P3** | `audit_pilot_bounce_domains.py` before each live wave | Global exclude list (~316 domains) |

---

## [0.4.0] - 2026-06-02

Wave 16–23 on **`hello@promptanatomy.blog`**; four-state geo preflight + `assert_batch_cohort.py`; **TX50a** live then **TX50b** deferred (**14%** T+0). See [Live send registry](#live-send-registry).

### Added

- Sender gate **`.blog`**: `promptanatomy_blog_sender_gate.md`, `verify_blog_from.ps1`, `run_geo_wave_preflight.ps1` (four-state).

### Changed

- **2026-06-01:** Pivot live sender to `hello@promptanatomy.blog` (Wave 16, NY50p+); revert `pilot_50` to personal template (California / I'm Tomas).
- Campaign remains **`paused`** / `dry_run=true` between waves.

---

## [0.3.0] - 2026-05-31

NY50 **W1–W15** on `.cloud` (then W16+ in 0.4.0); geo wave tooling; TX AskTED personnel pool refresh; ops hardening post–Wave 8.

### Added

- **`prep_meta` on `selection.json`**, **`assert_batch_cohort.py`**, chunk retries in `run_tx50f_send_chunks.ps1`, `-AssertPilot50Copy` on `verify_outreach_from.ps1`.
- **Strategic geo refresh:** `run_geo_official_refresh.ps1`, `_geo_main_repo.ps1`, MN REC_REQ refresh, GA import scaffold.
- **NY SEDREF import** (2026-05-27): `run_ny_sedref_import.ps1`, charter HS supplement — NY principal **~661** ready.
- **MA DESE** org catalog API + principal refresh tooling.

### Changed

- **`prepare_tx50_batch.py` / `state_ready_count.py`:** paginated state fetch (Supabase 1000-row cap fix).
- **`apply_tx50_quarantine.py`:** paginated `_fetch_state_school_ids` (OH quarantine fix).
- **TX email refresh (2026-05-28):** AskTED personnel [`Directory.csv`](Directory.csv) → `reconcile_tx_askted_directory.py`; TX principal **~7097** ready pre-MX. Full TX50 resume checklist: [`pilot_tx50_runbook.md`](../cpb-school-outreach/docs/pilot_tx50_runbook.md) (not duplicated here).

### Fixed

- Partial cohort live passes (NY50f/NJ50l second pass); OH50j quarantine race during slow `restore_pending_pool`.

---

## [0.2.0] - 2026-05-26

Mining v3/v4 official-first expansion; XX50 stagger on `.cloud`; NJ Homeroom; email sanitization gate.

### Mining v4 (2026-05-27)

| Import | Prep rows | contacts_ready | Principal pool (post) |
|--------|----------:|---------------:|----------------------:|
| OH OEDS all-grades | 2268 | **2174** | OH **761** |
| MA DESE Profiles refresh | 263 | **249** | MA **250** |
| NY SEDREF CEO CSV | 5165 | **5062** | NY **651** |
| NY charter HS supplement | 82 | **80** | NY **661** |

**Phase gate:** +2308 net principal delta — **PASS**. Total principal **~14,318**. VA gap-fill smoke **0%** — STOP bulk scrape.

Deliverables: `run_ny_sedref_import.ps1`, `MINING_OH_ALL_GRADES=1`, `docs/pilot_ny50_runbook.md`, snapshots `baseline_v4*.txt`.

### Mining v3 (2026-05-23)

Shift metric to **send-ready principal** (`principal` + `mx_ok` + official source). Baseline **~8503** principal ready. Tooling: `run_cycle_mining_v3.ps1`, `config/state_source_registry.json`, `probe_state_registry.py`, scrape STOP extended (OH, MA, PA).

### Pool history (consolidated)

| Milestone | `ready` total | `principal` ready |
|-----------|-------------:|------------------:|
| Mining v2 Phase 1 (TX personnel + MN supplement) | **10411** | **7575** |
| Phase 2 (+ FL private/district) | **12671** | **7635** |
| Post OH OEDS + MA Profiles (v3) | **~13539** | **~8503** |
| Post MI EEM | **~15987** | **~9334** |
| Mining v4 (2026-05-27) | — | **~14318** |

### Added

- **NJ Homeroom import (2026-05-24):** public school CSV path; sanitization + send gate scripts.
- **XX50 batch prep** complete; stagger live OH/NJ/MN/MA/MI on `.cloud` (see table below).
- **MI / MA / OH official imports (2026-05-23)** per [0.1.0](#010---2026-05-22).

**XX50 official geo (2026-05-25–26, `.cloud`):**

| Batch | State | T+0 sent / bounced | Bounce % | Notes |
|-------|-------|-------------------|----------|--------|
| OH50a–i, NJ50b–e, MN50a, MA23 | OH/NJ/MN/MA | stagger 50s | 2–4% | Official principals |
| MN50 / OH50 / MA50 / MI50 | MN/OH/MA/MI | 49–50 / 1–2 | **2–4%** | XX50 official geo complete |

**1034** cumulative ids before NY50 **W1** (2026-05-27).

### Changed

- `run_cycle_mining.ps1` v3/v4 flags; `prepare_oh_oeds_principals.py` all-grades + org-email fallback.

---

## [0.1.0] - 2026-05-22

TX50 pilot through TX50p; sender pivots `.help` → `.ceo` → `.info`; VA/CA scrape geo; mining v2 official-first.

### Geo pivot (TX depleted; official geo on `.info`)

| Batch | State | Mailed | T+0 sent / bounced | Bounce % | Notes |
|-------|-------|--------|-------------------|----------|--------|
| **VA11a** | VA | 11 | 8 / 3 | 27% | Scrape `other` |
| **CA29a** | CA | 23 | 18 / 5 | 22% | Scrape; generic inboxes |
| **MN50** | MN | 50 | 49 / 1 | **2%** | Official OrgView principals |
| **OH50** | OH | 50 | 48 / 2 | **4%** | Official OEDS principals |
| **MA50** | MA | 50 | 48 / 2 | **4%** | Official DESE Profiles principals |
| **MI50** | MI | 50 | 48 / 2 | **4%** | Official CEPI EEM principals |
| *(cumulative)* | TX50–p | 800 | — | — | Pool depleted |

### Added

- **Michigan CEPI EEM import (2026-05-23):** `prepare_mi_eem_principals.py` — **2448** `contacts_ready`, MI **831** principal.
- **IL ISBE + gated scrape (2026-05-23):** smoke **2%** → IL STOP.
- **MA DESE Profiles / OH OEDS wide-format (2026-05-23):** **262** / **605** HS principal `contacts_ready`.
- **Official-first mining v2 Phase 1–2 (2026-05-23):** TX personnel + MN supplement; FL private **2272** ready.
- **CAIS California independent schools (2026-05-22–23):** 98 schools, **47%** enrich hit, **0** principal — not send-ready.
- **Urban Institute CCD API** exploration; **Data mining cycle** tooling (`mining_inventory.py`, `run_cycle_mining.ps1`).
- **pilot_tx50** through **tx50p** live sends; **VA11a / CA29a**; geo batch tooling (`prepare_tx50_batch.py --state`, `apply_tx50_quarantine.py`).
- **Sender pivot `promptanatomy.info` (2026-05-22)** after `.ceo` ~13.88% domain bounce.
- **TX50l incident:** leaky quarantine → ~363 non-selection sends; hardened quarantine.
- Texas AskTED geocoded import; [docs/outreach_experience_memo_2026-05-17.md](docs/outreach_experience_memo_2026-05-17.md).
- **Oklahoma ICAP PDF (2026-05-18):** 75 contacts; **Wisconsin DPI** 506 schools (low scrape ROI).
- **pilot_tx50 (2026-05-18):** first 50 TX — **22%** bounce.

### Changed

- **`run_cycle_mining.ps1`:** MI EEM block; scrape **off by default** (`MINING_ENABLE_SCRAPE=1`); Phase 2 OH/FL imports.
- **`prepare_oh_oeds_principals.py`:** wide OEDS + person-level formats.
- **`enrich-contacts`:** `--domains-file` for CAIS.
- **`import_state_directory.py`:** infer `role_target=principal` from org names (MN REC_REQ).
- **Exclude domains file:** ~100 domains; global `audit_pilot_bounce_domains.py` before XX50 live.
- **`apply_tx50_quarantine.py` / `restore_pending_pool.py`:** batched park/restore at ~18k `ready` scale.
- Collection target **1000** ready; marketing sender docs `.help` → `.info`.

### Fixed

- **`run_phase3_scrape.ps1`:** `state_ready_count.py` join via `schools`.
- **`import_supabase.py`:** pandas `NaN` → `null` for CAIS import.
- **`apply_tx50_quarantine.py`:** batched global park; `daily_cap` + state guard from `selection.json`.
- **`_run_xx50_live.ps1`:** PowerShell Unicode dash fix.
- **`prepare_tx50_batch.py`:** `--max-per-domain N` when N>1.

---

## Reference — mining & deliverability insights

Canonical lessons (2026-05-23); full narrative in [archive](docs/archive/changelog_outreach_sessions_2026-05-06.md).

1. **Official state dirs >> scrape.** MN OrgView (+2170), TX AskTED personnel (2470 processed), **OH OEDS wide export (+605 principal)**, **MA DESE Profiles (+262 principal)**, **MI CEPI EEM (+831 principal, 2448 imported)** delivered net-new principal contacts without website scrape. Bulk smoke **0–8%** on OK/NY/PA/OH/IL remains below the 8% gate; **MA website scrape ~17%** — still prefer Profiles export.
2. **Catalog pages ≠ contact sources.** [NYSED school lists](https://data.nysed.gov/lists.php?type=school) and FL PK-12 publications = enrollment/report cards, no principal email. [MA Organization Search](https://profiles.doe.mass.edu/search/search.aspx?leftNavId=11238) — emails via **People Search → Principal → Export** (`showEmail=Y`). NY principal emails: [SEDREF COGNOS](https://p12.nysed.gov/irs/schoolDirectory/) #28/#30/#31.
3. **Federal CCD layer = catalog, not contacts.** [Urban Education Data Portal](https://educationdata.urban.org/documentation) directories have no email/website/superintendent — use for master list + joins only.
4. **Urban API ≠ raw NCES CSV.** Urban omits `WEBSITE`; raw NCES needed for scrape-first pools (VA via `prepare_va_nces_pool.py`).
5. **Geo scrape vs official.** VA11a **27%** and CA29a **22%** T+0 bounce vs **MN50/OH50 2–4%** on official principal dirs.
6. **Quarantine at scale.** `apply_tx50_quarantine` must **batch-park** all `ready` (~18k); single PostgREST update left thousands stray `ready` (OH50: 977 before fix).
7. **CAIS pipeline:** **47% hit, 0 principal** — not send-ready like TX/MN official.
8. **MN OrgView auto-download blocked** (Radware) — HTML export + `prepare_mn_org_supplement.py`.
9. **OH OEDS wide-format** (`20260523_report.csv`) vs person-level DataExtract — both in `prepare_oh_oeds_principals.py`.
10. **MA ASP.NET People Search** — use `search_export.aspx?showEmail=Y`.
11. **MI CEPI EEM.** MDE URLs 404; operator **EEM Data Report** (filter `LEA`) beats scrape; State-only exports wrong for K–12 mining.
