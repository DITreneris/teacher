# Archived outreach sessions (detail)

Archived **2026-06-02**; not updated. Canonical metrics: [changelog_outreach.md](../../changelog_outreach.md).

---

## Full file backup (pre-refactor 2026-06-02)

<details>
<summary>Complete changelog_outreach.md before consolidation (1524 lines)</summary>

# Outreach changelog (school outreach bot)

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning follows [Semantic Versioning](https://semver.org/).

**Scope:** This file tracks **only** the school outreach stack (sibling repo `..\cpb-school-outreach`, GitHub `DITreneris/outreach`): Railway deploy, Supabase Postgres, contact enrichment, campaign sending, and Resend marketing. Vercel product, PDF fulfillment, Stripe, marketing copy, design system, and infra entries stay in [CHANGELOG.md](CHANGELOG.md). Repo boundary: [AGENTS.md](AGENTS.md) "Dviejų repo riba / routing".

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
- TX50 runbook: `..\cpb-school-outreach\docs\pilot_tx50_runbook.md`
- Geo runbooks: `..\cpb-school-outreach\docs\pilot_va11a_runbook.md`, `..\cpb-school-outreach\docs\pilot_ca29a_runbook.md`
- Sender gate (`.info`): `..\cpb-school-outreach\docs\promptanatomy_info_sender_gate.md`
- Sender gate (`.cloud`, Wave 8–15): `..\cpb-school-outreach\docs\promptanatomy_cloud_sender_gate.md`
- Sender gate (`.blog`, Wave 16+): `..\cpb-school-outreach\docs\promptanatomy_blog_sender_gate.md`
- Mining cycle runbook: `..\cpb-school-outreach\docs\mining_cycle_runbook.md`
- MN50/OH50/MA50/MI50/NJ50/**NY50** runbooks: `..\cpb-school-outreach\docs\pilot_mn50_runbook.md`, `pilot_oh50_runbook.md`, `pilot_ma50_runbook.md`, `pilot_mi50_runbook.md`, `pilot_nj50_runbook.md`, **`pilot_ny50_runbook.md`**

## [Unreleased]

### Operator day — 2026-06-02 (W19–W23, `.blog`, **TX paused**)

Five geo live sessions same day (NY/NJ/OH only; **TX50b** still deferred since W17 TX50a **14%** bounce). Sender **`hello@promptanatomy.blog`**; personal `pilot_50` copy throughout.

| Session | Batches | T+0 sent (sum) | Cumulative IDs (end) | Exclude domains (end) |
|--------:|---------|---------------:|---------------------:|----------------------:|
| **W19** | NY50s / NJ50y / OH50ac | **147** | **5470** | **246** |
| **W20** | NY50t / NJ50z / OH50ad | **147** | **5617** | **249** |
| **W21** | NY50u / NJ50aa / OH50ae | **149** | **5766** | **250** |
| **W22** | NY50v / NJ50ab / OH50af | **149** | **5915** | **251** |
| **W23** | NY50w / NJ50ac / OH50ag | **141** | **6056** | **260** |

**Day totals:** **733** T+0 sent across **15** batches; cumulative ids **5323 → 6056** (+733); exclude domains **243 → 260** (+17).

**NJ prep pool (after exclusions):** **1132** (W19) → **928** (W23) — declining ~50/wave; refresh official directory if next prep fails.

**Notable:** NJ50z exhausted a–z (W20); post-z slugs **nj50aa** onward (W21+). OH50ag **12%** T+0 bounce (W23) — watch **OH50ah** next.

**End-of-day:** Campaign `pilot_50` **paused** / `dry_run=true`. Principal `ready` (W23 preflight): NY **3973** / NJ **1299** / OH **1973** / TX **8113**.

**Next prep/live:** **NY50x** / **NJ50ad** / **OH50ah** / **TX50b** (seeds `2026052891`–`2026052893`; **TX50b** reserved `2026052875`).

### Live — NY50w, NJ50ac, OH50ag (2026-06-02, twenty-third session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **251** exclude domains → **260** post-session; `unsendable_ready` **0**; principal `ready` NY **3973** / NJ **1299** / OH **1973** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50w** | 2026052888 | **3818** | **49** | **1** | **0** | **2%** |
| **NJ50ac** | 2026052889 | **928** | **48** | **2** | **0** | **4%** |
| **OH50ag** | 2026052890 | **1193** | **44** | **6** | **0** | **12%** |

**New bounce domains:** `hhh.k12.ny.us`, `rbrhs.org`, `rockboro.org`, `ketteringschools.org`, `mccombschool.org`, `madriverschools.org`, `montgomeryprep.org`, `mosaicclassical.org`, `mississinawa.org`.

**Cumulative geo+TX live ids:** **5915** + **141** = **6056**.

**Ops:** Three single live passes; venv restore between waves. NJ prep pool **928** after exclusions (down from **979** at W22); OH50ag **12%** T+0 — watch next OH wave.

**Scripts:** `run_{ny50w,nj50ac,oh50ag}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50w,nj50ac,oh50ag}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50x** / **NJ50ad** / **OH50ah** / **TX50b** (seeds `2026052891`–`2026052893`; **TX50b** reserved `2026052875`).

### Live — NY50v, NJ50ab, OH50af (2026-06-02, twenty-second session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **250** exclude domains → **251** post-session; `unsendable_ready` **0**; principal `ready` NY **4023** / NJ **1349** / OH **2023** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50v** | 2026052885 | **3868** | **50** | **0** | **0** | **0%** |
| **NJ50ab** | 2026052886 | **979** | **49** | **1** | **0** | **2%** |
| **OH50af** | 2026052887 | **1243** | **50** | **0** | **0** | **0%** |

**New bounce domains:** `pps-nj.us`.

**Cumulative geo+TX live ids:** **5766** + **149** = **5915**.

**Ops:** Three single live passes; venv restore between waves. NJ prep pool **979** after exclusions (down from **1029** at W21) — monitor.

**Scripts:** `run_{ny50v,nj50ab,oh50af}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50v,nj50ab,oh50af}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50w** / **NJ50ac** / **OH50ag** / **TX50b** (seeds `2026052888`–`2026052890`; **TX50b** reserved `2026052875`).

### Live — NY50u, NJ50aa, OH50ae (2026-06-02, twenty-first session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **249** exclude domains → **250** post-session; `unsendable_ready` **0**; principal `ready` NY **4073** / NJ **1399** / OH **2073** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50u** | 2026052882 | **3918** | **50** | **0** | **0** | **0%** |
| **NJ50aa** | 2026052883 | **1029** | **50** | **0** | **0** | **0%** |
| **OH50ae** | 2026052884 | **1294** | **49** | **1** | **0** | **2%** |

**New bounce domains:** `mansfieldschools.org`.

**Cumulative geo+TX live ids:** **5617** + **149** = **5766**.

**Ops:** Three single live passes; venv restore between waves. **NJ50aa** = first post-z NJ slug (after NJ50z).

**Scripts:** `run_{ny50u,nj50aa,oh50ae}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50u,nj50aa,oh50ae}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50v** / **NJ50ab** / **OH50af** / **TX50b** (seeds `2026052885`–`2026052887`; **TX50b** reserved `2026052875`).

### Live — NY50t, NJ50z, OH50ad (2026-06-02, twentieth session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **246** exclude domains → **249** post-session; `unsendable_ready` **0**; principal `ready` NY **4123** / NJ **1449** / OH **2123** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50t** | 2026052879 | **3968** | **50** | **0** | **0** | **0%** |
| **NJ50z** | 2026052880 | **1082** | **49** | **1** | **0** | **2%** |
| **OH50ad** | 2026052881 | **1345** | **48** | **2** | **0** | **4%** |

**New bounce domains:** `cliftonschools.net`, `lumpk.com`, `loraincsd.org`.

**Cumulative geo+TX live ids:** **5470** + **147** = **5617**.

**Ops:** Three single live passes; venv restore between waves. **NJ50z** = last single-letter NJ slug; next NJ batch **`nj50aa`**.

**Scripts:** `run_{ny50t,nj50z,oh50ad}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50t,nj50z,oh50ad}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50u** / **NJ50aa** / **OH50ae** / **TX50b** (seeds `2026052882`–`2026052884`; **TX50b** reserved `2026052875`).

### Live — NY50s, NJ50y, OH50ac (2026-06-02, nineteenth session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **243** exclude domains → **246** post-session; `unsendable_ready` **0**; principal `ready` NY **4173** / NJ **1499** / OH **2173** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50s** | 2026052876 | **4020** | **48** | **2** | **0** | **4%** |
| **NJ50y** | 2026052877 | **1132** | **50** | **0** | **0** | **0%** |
| **OH50ac** | 2026052878 | **1395** | **49** | **0** | **1** | **0%** |

**New bounce domains:** `cppasd.com`, `g.dunkirkcsd.org` (+1 async to **246** total exclude domains).

**Cumulative geo+TX live ids:** **5323** + **147** = **5470**.

**Ops:** Three single live passes; venv restore between waves.

**Scripts:** `run_{ny50s,nj50y,oh50ac}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50s,nj50y,oh50ac}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50t** / **NJ50z** / **OH50ad** / **TX50b** (seeds `2026052879`–`2026052881`; **TX50b** reserved `2026052875`).

### Live — NY50r, NJ50x, OH50ab (2026-06-01, eighteenth session, `.blog`, **TX skipped**)

**TX50b deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **240** exclude domains → **243** post-session; `unsendable_ready` **0**; principal `ready` NY **4223** / NJ **1549** / OH **2223** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50r** | 2026052872 | **4070** | **50** | **0** | **0** | **0%** |
| **NJ50x** | 2026052873 | **1188** | **49** | **1** | **0** | **2%** |
| **OH50ab** | 2026052874 | **1451** | **48** | **2** | **0** | **4%** |

**New bounce domains:** `eastorange.k12.nj.us`, `kentschools.net`, `laca.org`.

**Cumulative geo+TX live ids:** **5176** + **147** = **5323**.

**Ops:** Three single live passes; venv restore between waves.

**Scripts:** `run_{ny50r,nj50x,oh50ab}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50r,nj50x,oh50ab}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50s** / **NJ50y** / **OH50ac** / **TX50b** (seeds `2026052876`–`2026052878`; **TX50b** reserved `2026052875`).

### Live — NY50q, NJ50w, OH50aa, TX50a (2026-06-01, seventeenth session, `.blog`)

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **230** exclude domains → **240** post-session; `unsendable_ready` **0**; principal `ready` NY **4273** / NJ **1599** / OH **2273** / TX **8163**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50q** | 2026052868 | **4120** | **49** | **1** | **0** | **2%** |
| **NJ50w** | 2026052869 | **1241** | **49** | **1** | **0** | **2%** |
| **OH50aa** | 2026052870 | **1502** | **48** | **1** | **1** | **2%** |
| **TX50a** | 2026052871 | **5548** | **42** | **7** | **1** | **14%** |

**New bounce domains:** `fingerlakeschristianschool.com`, `longbranch.k12.nj.us`, `gallialocal.org`, `caddomillsisd.org`, `calcoisd.org`, `ccisd.com`, `chinaspringisd.net`, `chisddevils.com`, `comancheisd.net`, `clydeisd.org`.

**Cumulative geo+TX live ids:** **4988** + **188** = **5176**.

**Ops:** All four single live pass; venv restore between waves. **OH50aa** = first post-z slug (OH a–z exhausted). **TX50a** = backward-fill of missing `tx50a` slot.

**Scripts:** `run_{ny50q,nj50w,oh50aa,tx50a}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50q,nj50w,oh50aa,tx50a}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50r** / **NJ50x** / **OH50ab** / **TX50b** (seeds `2026052872`–`2026052875`).

### Live — NY50p, NJ50v, OH50z, TX50z (2026-06-01, sixteenth session, `.blog`)

**First geo wave on `hello@promptanatomy.blog`** with **personal `pilot_50` copy** (California / I'm Tomas). Deploy `1f400a7` + Railway rebuild; preflight self-test confirmed before live.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **225** exclude domains → **230** post-session; `unsendable_ready` **0**; principal `ready` NY **4323** / NJ **1649** / OH **2323** / TX **8213**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50p** | 2026052864 | **4170** | **48** | **1** | **1** | **2%** |
| **NJ50v** | 2026052865 | **1298** | **49** | **1** | **0** | **2%** |
| **OH50z** | 2026052866 | **1553** | **49** | **1** | **0** | **2%** |
| **TX50z** | 2026052867 | **5601** | **48** | **1** | **1** | **2%** |

**New bounce domains:** `cornwallschools.com`, `monroe.k12.nj.us`, `horizondayton.org`, `chapelhillisd.org`.

**Cumulative geo+TX live ids:** **4794** + **194** = **4988**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50p,nj50v,oh50z,tx50z}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50p,nj50v,oh50z,tx50z}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50r** / **NJ50x** / **OH50ab** / **TX50b** (seeds `2026052872`–`2026052875`).

### Sender — pivot to `promptanatomy.blog` (Wave 16+, 2026-06-01)

**Live on Wave 16** — see sixteenth session above.

### Copy — revert `pilot_50` to personal template (2026-06-01)

**Live on Wave 16** — see sixteenth session above.

### Live — NY50o, NJ50u, OH50y, TX50y (2026-06-01, fifteenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **216** exclude domains → **225** post-session; `unsendable_ready` **0**; principal `ready` NY **4373** / NJ **1699** / OH **2373** / TX **8263**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50o** | 2026052860 | **4220** | **48** | **2** | **0** | **4%** |
| **NJ50u** | 2026052861 | **1359** | **45** | **5** | **0** | **10%** |
| **OH50y** | 2026052862 | **1603** | **50** | **0** | **0** | **0%** |
| **TX50y** | 2026052863 | **5654** | **47** | **2** | **1** | **4%** |

**New bounce domains:** `cohoes.org`, `eastharlemscholars.org`, `kinnelon.org`, `irvington.k12.nj.us`, `bloomfield.k12.nj.us`, `manvillesd.org`, `millstone.k12.nj.us`, `brenhamk-12.net`, `cantonisd.com`.

**Cumulative geo+TX live ids:** **4604** + **190** = **4794**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50o,nj50u,oh50y,tx50y}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50o,nj50u,oh50y,tx50y}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see sixteenth session above).*

### Ops hardening — post–Wave 8 (2026-05-28)

**Repo:** `cpb-school-outreach` (`DITreneris/outreach`).

| Change | Script / file |
|--------|----------------|
| `prep_meta` on batch `selection.json` | [`prepare_tx50_batch.py`](../cpb-school-outreach/scripts/prepare_tx50_batch.py) |
| Cohort gate (50/50 terminal, 15% bounce stop) | [`assert_batch_cohort.py`](../cpb-school-outreach/scripts/assert_batch_cohort.py) wired in `_run_pilot_slug_live.ps1` |
| Chunk send retries (3×, 5s backoff) | [`run_tx50f_send_chunks.ps1`](../cpb-school-outreach/scripts/run_tx50f_send_chunks.ps1) |
| `pilot_50` copy assert on self-test | [`verify_outreach_from.ps1`](../cpb-school-outreach/scripts/verify_outreach_from.ps1) `-AssertPilot50Copy` via `verify_cloud_from.ps1` |
| Four-state preflight | [`run_geo_wave_preflight.ps1`](../cpb-school-outreach/scripts/run_geo_wave_preflight.ps1) |

### Live — NY50n, NJ50t, OH50x, TX50x (2026-05-29, fourteenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **209** exclude domains → **215** post-session; `unsendable_ready` **0**; principal `ready` NY **4423** / NJ **1749** / OH **2424** / TX **8313**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50n** | 2026052856 | **4270** | **49** | **0** | **1** | **0%** |
| **NJ50t** | 2026052857 | **1413** | **49** | **1** | **0** | **2%** |
| **OH50x** | 2026052858 | **1656** | **49** | **1** | **0** | **2%** |
| **TX50x** | 2026052859 | **5720** | **46** | **3** | **1** | **6%** |

**New bounce domains:** `jacksonsd.org`, `fpls.us`, `boerneisd.net`, `brookesmithisd.net`, `celinaisd.com`.

**Cumulative geo+TX live ids:** **4411** + **193** = **4604**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50n,nj50t,oh50x,tx50x}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50n,nj50t,oh50x,tx50x}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see fifteenth session above).*

### Live — NY50m, NJ50s, OH50w, TX50w (2026-05-29, thirteenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **205** exclude domains → **209** post-session; `unsendable_ready` **0**; principal `ready` NY **4473** / NJ **1799** / OH **2474** / TX **8363**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live. **TX50w** completes deferred send from Wave 12 geo-only session.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50m** | 2026052852 | **4323** | **48** | **1** | **1** | **2%** |
| **NJ50s** | 2026052853 | **1463** | **50** | **0** | **0** | **0%** |
| **OH50w** | 2026052854 | **1708** | **47** | **2** | **1** | **4%** |
| **TX50w** | 2026052855 | **5770** | **48** | **1** | **1** | **2%** |

**New bounce domains:** `clarenceschools.org`, `fairland.k12.oh.us`, `fortrecoveryschools.org`, `ccaisd.net`.

**Cumulative geo+TX live ids:** **4218** + **193** = **4411**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50m,nj50s,oh50w,tx50w}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50m,nj50s,oh50w,tx50w}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see fourteenth session above).*

### Live — NY50l, NJ50r, OH50v (2026-05-29, twelfth session, geo-only, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **200** exclude domains → **205** post-session; `unsendable_ready` **0**; principal `ready` NY **4523** / NJ **1849** / OH **2524** / TX **8363** (TX not sent — **TX50w deferred**, seed `2026052852`). Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50l** | 2026052849 | **4373** | **47** | **2** | **1** | **4%** |
| **NJ50r** | 2026052850 | **1513** | **49** | **1** | **0** | **2%** |
| **OH50v** | 2026052851 | **1768** | **48** | **2** | **0** | **4%** |

**New bounce domains:** `chowc.org`, `clearviewschool.org`, `hackettstown.org`, `cpsboe.k12.oh.us`, `empoweredaaedu.org`.

**Cumulative geo+TX live ids:** **4074** + **144** = **4218**.

**Ops:** All three single live pass; venv restore between waves.

**Scripts:** `run_{ny50l,nj50r,oh50v}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50l,nj50r,oh50v}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see thirteenth session above).*

### Live — NY50k, NJ50q, OH50u, TX50v (2026-05-28, eleventh session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **193** exclude domains → **199** post-session; `unsendable_ready` **0**; principal `ready` NY **4573** / NJ **1899** / OH **2574** / TX **8413**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50k** | 2026052845 | **4423** | **50** | **0** | **0** | **0%** |
| **NJ50q** | 2026052846 | **1564** | **49** | **1** | **0** | **2%** |
| **OH50u** | 2026052847 | **1818** | **49** | **1** | **0** | **2%** |
| **TX50v** | 2026052848 | **5825** | **46** | **4** | **0** | **8%** |

**New bounce domains:** `hcstonline.org`, `dmcschool.com`, `bisd-tx.org`, `argyleisd.com`, `basised.com`, `bridgeportisd.net`.

**Cumulative geo+TX live ids:** **3880** + **194** = **4074**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50k,nj50q,oh50u,tx50v}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50k,nj50q,oh50u,tx50v}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see twelfth session above).*

### Live — NY50j, NJ50p, OH50t, TX50u (2026-05-28, tenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **188** exclude domains → **193** post-session; `unsendable_ready` **0**; principal `ready` NY **4623** / NJ **1949** / OH **2624** / TX **8463**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (use `.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50j** | 2026052841 | **4473** | **50** | **0** | **0** | **0%** |
| **NJ50p** | 2026052842 | **1614** | **49** | **0** | **1** | **0%** |
| **OH50t** | 2026052843 | **1871** | **47** | **3** | **0** | **6%** |
| **TX50u** | 2026052844 | **5880** | **47** | **2** | **1** | **4%** |

**New bounce domains:** `copley-fairlawn.org`, `clsdraiders.org`, `delphoscityschools.org`, `bonhamisd.org`, `brisd.net`.

**Cumulative geo+TX live ids:** **3687** + **193** = **3880**.

**Ops:** **NJ50p** first live attempt skipped restore (system `python`); retry after `.venv` restore succeeded. NY/OH/TX single pass.

**Scripts:** `run_{ny50j,nj50p,oh50t,tx50u}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50j,nj50p,oh50t,tx50u}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see eleventh session above).*

### Live — NY50i, NJ50o, OH50s, TX50t (2026-05-28, ninth session, `.cloud`, post–Wave 8 harness)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **178** exclude domains → **188** post-session; `unsendable_ready` **0**; principal `ready` NY **4673** / NJ **1999** / OH **2674** / TX **8513**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves; **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50i** | 2026052837 | **4524** | **47** | **3** | **0** | **6%** |
| **NJ50o** | 2026052838 | **1664** | **49** | **0** | **1** | **0%** |
| **OH50s** | 2026052839 | **1937** | **47** | **3** | **0** | **6%** |
| **TX50t** | 2026052840 | **5934** | **45** | **4** | **1** | **8%** |

**New bounce domains:** `brewsterschools.org`, `bronxarts.net`, `brillacollegeprep.org`, `chca-oh.org`, `chuh.org`, `centerville.k12.oh.us`, `banqueteisd.net`, `annaisd.org`, `bigsandyisd.org`, `blumisd.net`.

**Cumulative geo+TX live ids:** **3499** + **188** = **3687**.

**Ops:** **NY50i** second live pass after first chunk `curl` line-continuation failure (0 sent); NJ/OH/TX single pass. Chunk script + `verify_outreach_from.ps1` + preflight ASCII fixes applied this session.

**Scripts:** `run_{ny50i,nj50o,oh50s,tx50t}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50i,nj50o,oh50s,tx50t}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see tenth session above).*

### Live — NY50h, NJ50n, OH50r, TX50s (2026-05-28, eighth session, `.cloud`, new `pilot_50` copy)

**First live cohort on updated template** ([`templates/pilot_50.html`](../cpb-school-outreach/templates/pilot_50.html)): no California opener; lesson/quiz/homework value line; **No student names on our site**. Deployed via outreach repo push `f592c27` + Railway rebuild; `verify_cloud_from` self-test HTML confirmed before live.

Sender: **`hello@promptanatomy.cloud`**. Preflight: **171** exclude domains → **178** post-session; `unsendable_ready` **0**; principal `ready` NY **4723** / NJ **2049** / OH **2724** / TX **8563**. Full `restore_pending_pool` between waves.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50h** | 2026052833 | **4575** | **48** | **1** | **1** | **2%** |
| **NJ50n** | 2026052834 | **1728** | **47** | **3** | **0** | **6%** |
| **OH50r** | 2026052835 | **1989** | **50** | **0** | **0** | **0%** |
| **TX50s** | 2026052836 | **5988** | **47** | **2** | **1** | **4%** |

**New bounce domains:** `bkwschools.org`, `brrsd.k12.nj.us`, `carteretschools.org`, `frsd.us`, `alvordisd.net`, `baycityisd.org`.

**Cumulative geo+TX live ids:** **3307** + **192** = **3499**.

**Ops:** **OH50r** needed **second live pass** after chunks 7–8 `curl` connection reset (48 sent + 2 ready → 50 sent). NJ/TX/NY single pass.

**Scripts:** `run_{ny50h,nj50n,oh50r,tx50s}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50h,nj50n,oh50r,tx50s}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see ninth session above).*

### Live — NY50g, NJ50m, OH50q, TX50r (2026-05-28, seventh session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: **164** exclude domains → **171** post-session; `verify_cloud_from` OK. Full `restore_pending_pool` between waves; **single live pass** per batch (10-chunk sender).

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50g** | 2026052829 | **4633** | **48** | **1** | **1** | **2%** |
| **NJ50m** | 2026052830 | **1778** | **50** | **0** | **0** | **0%** |
| **OH50q** | 2026052831 | **2039** | **48** | **2** | **0** | **4%** |
| **TX50r** | 2026052832 | **6047** | **45** | **4** | **1** | **8%** |

**New bounce domains:** `binghamtonschools.org`, `accelschools.com`, `cantoncollegeprep.org`, `acaedu.net`, `albany.esc14.net`, `alvinisd.net`, `axtellisd.net`.

**Cumulative geo+TX live ids:** **3116** + **191** = **3307**.

**Scripts:** `run_{ny50g,nj50m,oh50q,tx50r}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50g,nj50m,oh50q,tx50r}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see eighth session above).*

### Live — NY50f, NJ50l, OH50p, TX50q (2026-05-28, sixth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`** (all four batches, including first post–AskTED TX on `.cloud`). Preflight: **158** exclude domains → **163** post-session; `verify_cloud_from` OK. Full `restore_pending_pool` between waves.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50f** | 2026052825 | **4683** | **48** | **0** | **2** | **0%** |
| **NJ50l** | 2026052826 | **1829** | **50** | **0** | **0** | **0%** |
| **OH50p** | 2026052827 | **2090** | **50** | **0** | **0** | **0%** |
| **TX50q** | 2026052828 | **2520** | **47** | **2** | **1** | **4%** |

**TX50q bounce domains:** `avalonisd.net`, `awesomenet.net`.

**Cumulative geo+TX live ids:** **2921** + **195** = **3116**.

**Ops:** NY50f / NJ50l needed **second live pass** after first pass left partial cohort (legacy `run_tx50f_send_chunks.ps1` ran 12×5; capped to **10** chunks + break on `attempted=0` / `sent=0`). TX MX backfill via `reconcile_tx_askted_directory.py` (no `--skip-mx`) before prep.

**Scripts:** `run_{ny50f,nj50l,oh50p,tx50q}_{prep,live}.ps1`; `_run_pilot_slug_prep.ps1` extended for **TX**.

**Results:** `cpb-school-outreach/docs/pilot_{ny50f,nj50l,oh50p,tx50q}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`. Principal `ready` (post-restore): re-run `state_ready_count.py --principal`.

**Next prep/live:** *(completed — see seventh session above).*

### Strategic geo mining refresh tooling (2026-05-28)

**Weekly NY/NJ/OH:** `run_geo_official_refresh.ps1` — auto-copy operator CSVs from main repo → `run_ny_sedref_import.ps1` / `run_nj_homeroom_refresh.ps1` / `run_oh_oeds_refresh.ps1` (OH all-grades) → bounce audit + `geo_refresh_YYYYMMDD.txt` log. Helpers: `_geo_main_repo.ps1`.

**MN principal gap:** `prepare_mn_rec_req_principals.py` sets `Title=Principal` for REC_REQ; `run_mn_rec_req_refresh.ps1` imports `mn_org_heads_principals.csv`. Geo refresh sets `MINING_SKIP_MN_SUPPLEMENT=1`; full mining cycle can still import SAC/SITE_VER when flag unset.

**GA:** `run_ga_import.ps1` + `data/README.md` GA section; registry lists script (status `planned` until operator `ga_contacts_raw.csv`).

**Docs:** `data/OPERATOR_CATALOG_IGNORE.md`, mining runbook weekly section, [`memo_outreach.md`](memo_outreach.md) weekly pointer.

### TX email refresh — AskTED personnel `Directory.csv` (2026-05-28)

**Problem:** TX pool was built from geocoded `Schools_2024_to_2025.csv` (`admin1@…`, shared school inboxes). TX50–TX50p live sends saw **12–22%** batch bounce (domain clusters: `aldineisd.org`, `bryanisd.org`, `bisd.net`, …). Addresses/ZIP are **not** used for outreach.

**Source of truth now:** TEA AskTED **personnel** export → [`Directory.csv`](Directory.csv) → `cpb-school-outreach/data/state_directories/tx_askted_personnel_2026.csv` (principal name + campus email per row).

#### What was done (4 phases)

| Phase | Action | Result |
|-------|--------|--------|
| 1 — Audit | `tx_email_pool_audit.py` vs Directory + DB | Pre: **7235** TX `ready`, only **4165** in Directory; **4244** net-new personnel emails. Snapshots: `tx_email_audit_20260528.txt`, `tx_email_audit_post_20260528.txt` |
| 2 — Cleanup | `tx_email_pool_cleanup.py` surgical + aggressive `--apply` | **3851** old `ready` → `skipped` (bounce domains, generic inbox, email not in Directory) |
| 3 — Import | `reconcile_tx_askted_directory.py --skip-mx` (upsert, not skip-duplicates) | **8797** principals upserted; **4** invalid rows. First attempts failed (no `source_*` columns on prod + connection reset); fixed with legacy upsert + retries |
| 4 — Post-QA | Second surgical cleanup + `audit_unsendable` + bounce domain file refresh | **1700** bounce-domain rows skipped after import; **TX principal `ready`: 7097** |

**New tooling** (`cpb-school-outreach/scripts/`): `tx_email_pool_audit.py`, `tx_email_pool_cleanup.py`, `reconcile_tx_askted_directory.py`, `tx_pool_lib.py`. Importer columns: `organization number`, `full name`, `email address`, `role` in `import_state_directory.py`. Runbook: `data/README.md` § Texas email refresh.

**Left unchanged:** `bounced` / `sent` / `complained` / `opted_out` / `suppressions`; no `schools` street/ZIP updates. Prod Supabase still missing `source_dataset` / `source_school_id` migration — org-supersede inactive until `20260517000000_contact_source_metadata.sql` is applied.

**Import note:** Reconcile used `--skip-mx` (`verify_confidence=syntax_only`). Pool is AskTED-official but **not** yet `mx_ok` until batch prep or a follow-up MX pass.

#### Before the next TX50 batch (TX50q checklist)

Do **not** resume TX sends until all gates pass. Sender: **`hello@promptanatomy.info`** only (not `.ceo` / `news.`). Campaign stays **`paused`** / `dry_run=true` until quarantine verified.

1. **Refresh bounce exclude list** (global + TX history):

   ```powershell
   cd cpb-school-outreach
   .\.venv\Scripts\activate
   python scripts\audit_pilot_bounce_domains.py --tx-only
   python scripts\audit_pilot_bounce_domains.py
   ```

2. **Pool counts** (expect TX principal `ready` ≈ **7097** pre-`mx_ok` filter):

   ```powershell
   python scripts\state_ready_count.py --state TX --principal
   python scripts\tx_email_pool_audit.py --directory "..\06_DI_Operacine_sistema_mokytojui\Directory.csv"
   ```

3. **Sender gate** (Railway `OUTREACH_FROM_EMAIL`):

   ```powershell
   .\scripts\verify_info_from.ps1
   ```

4. **Prep selection** — principal-only, MX-verified, strict filters (do **not** use `--all-roles`; TX50p mixed roles had worse deliverability). Exclude **all** prior TX50a–p batch ids + refreshed domain file:

   ```powershell
   python scripts\prepare_tx50_batch.py --seed 20260528 --count 50 --state TX `
     --mx-ok-only --official-directory-only `
     --exclude-bounced-domains `
     --exclude-domains-file docs\pilot_tx50_exclude_domains.txt `
     --max-per-domain 1 `
     --output docs\pilot_tx50q_batch
   ```

   If count &lt; 50: relax `max-per-domain` per [`pilot_tx50_runbook.md`](../cpb-school-outreach/docs/pilot_tx50_runbook.md) (2 → 3 → 4 → 5 → 0), still **principal-only**.

5. **QA sample** before SQL quarantine:

   ```powershell
   python scripts\pilot_qa_sample.py --sample 50 --seed 20260528
   ```

6. **Quarantine** — run `docs/pilot_tx50q_batch/quarantine.sql`; confirm exactly **50** TX `ready`. Use `apply_tx50_quarantine.py` global park/restore pattern from TX50m+; **do not** run `restore_pending_pool` until send completes.

7. **Live send** only if Resend domain bounce &lt; **5%** and batch stop rules in runbook pass. Stop if batch bounce ≥ **15%** or complaints ≥ **1**.

**Current (2026-05-28):** **3116** cumulative geo+TX live ids (last live: **NY50f / NJ50l / OH50p / TX50q** — see session above). Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50g** / **NJ50m** / **OH50q** / **TX50r**. **MA50e** hold; **MN50b** deferred; **MI50c** hold.

### Live — NY50e, NJ50k, OH50o (2026-05-28, fifth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `audit_pilot_bounce_domains` → **153** exclude domains; `verify_cloud_from` OK; principal `ready` NY **4873** / NJ **2199** / OH **2874**. Full restore between waves; **wait for `restore_pending_pool` to finish** before each live.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50e** | 50 | **49** | **1** | **0** | **2%** | NY **4823** |
| **NJ50k** | 50 | **48** | **2** | **0** | **4%** | NJ **2149** |
| **OH50o** | 50 | **48** | **2** | **0** | **4%** | OH **2824** |

**New bounce domains (T+0):** `3villagecsd.org`, `boontonschools.org`, `bridgeton.k12.nj.us`, `ashlandcityschools.org`, `barbertonschools.org`.

**Cumulative geo live ids:** **2776** + **145** sent = **2921**.

**Results stubs:** `cpb-school-outreach/docs/pilot_{ny50e,nj50k,oh50o}_results.md`.

### Geo batch wave prep — NY50e, NJ50k, OH50o (2026-05-27)

Preflight: `audit_pilot_bounce_domains.py` → **153** exclude domains (incl. session-4 bounces); **0** unsendable ready; principal `ready` NY **4873** / NJ **2199** / OH **2874** (paginated `state_ready_count`).

**Prep fix:** `prepare_tx50_batch.py` + `state_ready_count.py` — paginated state school fetch (Supabase **1000**-row cap had under-counted OH/NY pools; mirrors session-4 quarantine fix).

| Batch | Script | Seed | Count | QA grades | Pool after exclusions |
|-------|--------|-----:|------:|-----------|----------------------:|
| **NY50e** | `run_ny50e_prep.ps1` | `2026052822` | **50** | 50 C (1 `domain_ok`) | **4740** |
| **NJ50k** | `run_nj50k_prep.ps1` | `2026052823` | **50** | 50 C (10 `domain_ok`) | **1887** |
| **OH50o** | `run_oh50o_prep.ps1` | `2026052824` | **50** | 50 C (3 `domain_ok`) | **2142** |

Outputs: `docs/pilot_{ny50e,nj50k,oh50o}_batch/selection.json` (+ quarantine/restore SQL). Prep auto-excluded **62** prior `pilot_*_batch/selection.json` files (**2898** prior ids).

**Scripts added:** `run_ny50e_{prep,live}.ps1`, `run_nj50k_{prep,live}.ps1`, `run_oh50o_{prep,live}.ps1`.

**Sent** in session 5 (2026-05-28).

### Live — NY50c, NJ50i, OH50m, NY50d, NJ50j, OH50n (2026-05-27, fourth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `audit_pilot_bounce_domains` → **147** exclude domains; `verify_cloud_from` OK; principal `ready` **20 322** global. Full restore between waves; **wait for `restore_pending_pool` to finish** before each live.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50c** | 50 | **48** | **1** | **1** | **2%** | NY **411** |
| **NJ50i** | 50 | **48** | **2** | **0** | **4%** | NJ **504** |
| **OH50m** | 50 | **49** | **0** | **1** | **0%** | OH **663** |
| **NY50d** | 50 | **49** | **1** | **0** | **2%** | NY **411** |
| **NJ50j** | 50 | **50** | **0** | **0** | **0%** | NJ **504** |
| **OH50n** | 50 | **48** | **2** | **0** | **4%** | OH **663** |

**New bounce domains (T+0):** `hauppauge.k12.ny.us`, `gloucestertownshipschools.org`, `rpsnj.us`, `islipufsd.org`, `daytonpublic.com`, `crestviewknights.com`.

**Cumulative geo live ids:** **2484** + **292** sent = **2776**.

**Ops fix:** `apply_tx50_quarantine.py` — paginated `_fetch_state_school_ids` (Supabase default **1000**-row cap broke OH50m first attempt with **3213** OH schools).

**Results stubs:** `cpb-school-outreach/docs/pilot_{ny50c,nj50i,oh50m,ny50d,nj50j,oh50n}_results.md`.

### Pool refresh + NJ50j / OH50n prep (2026-05-27)

**NJ Homeroom re-import:** operator `NJPubSchool.csv` → `run_nj_homeroom_refresh.ps1` (2459 prep rows). Principal `ready` **227 → 618**.

**OH OEDS re-import:** all-grades + **org-email fallback** when `PRINCIPAL EMAIL` missing (`prepare_oh_oeds_principals.py` patch; **2268 → 3098** prep rows). `run_oh_oeds_refresh.ps1`.

| Batch | Script | Seed | Count | QA | After exclusions |
|-------|--------|-----:|------:|:---|-----------------:|
| **NJ50j** | `run_nj50j_prep.ps1` | `2026052820` | **50** | 50 C (10 `domain_ok`) | **192** |
| **OH50n** | `run_oh50n_prep.ps1` | `2026052821` | **50** | pass | **97** |

Outputs: `docs/pilot_{nj50j,oh50n}_batch/selection.json`. **Sent** in session 4 (2026-05-27).

**Ops note:** `import-state-directory` upsert sets `outreach_status=ready` on existing emails — may temporarily inflate `ready` counts for previously `sent` contacts; batch prep still excludes prior `pilot_*_batch` ids.

### Geo batch wave prep — NY50d (2026-05-27)

| Batch | Script | Seed | Count | QA grades | Pool after exclusions |
|-------|--------|-----:|------:|-----------|----------------------:|
| **NY50d** | `run_ny50d_prep.ps1` | `2026052819` | **50** | 16 B / 34 C | **455** |

Output: `docs/pilot_ny50d_batch/selection.json`. **Scripts:** `run_ny50d_{prep,live}.ps1`. **Sent** in session 4 (2026-05-27).

### Geo batch wave prep — NY50c, NJ50i, OH50m (2026-05-27)

Preflight: `audit_pilot_bounce_domains.py` → **147** exclude domains (incl. session-3 bounces `falconerschools.org`, `rih.org`, `readingschools.org`); **0** unsendable ready; principal `ready` NY **511** / NJ **227** / OH **600**.

| Batch | Script | Seed | Count | QA grades | Pool after exclusions |
|-------|--------|-----:|------:|-----------|----------------------:|
| **NY50c** | `run_ny50c_prep.ps1` | `2026052816` | **50** | 21 B / 29 C | **505** |
| **NJ50i** | `run_nj50i_prep.ps1` | `2026052817` | **50** | 2 B / 48 C | **240** |
| **OH50m** | `run_oh50m_prep.ps1` | `2026052818` | **50** | 50 C (7 `domain_ok`) | **124** |

Outputs: `docs/pilot_{ny50c,nj50i,oh50m}_batch/selection.json` (+ quarantine/restore SQL). Prep auto-excluded **57** prior `pilot_*_batch/selection.json` files (**2599** prior ids through latest NJ50i prep re-check).

**Scripts added:** `run_ny50c_{prep,live}.ps1`, `run_nj50i_{prep,live}.ps1`, `run_oh50m_{prep,live}.ps1`.

**Operator notes:** OH50m leaves only **124** OH principals after exclusions — likely **last full OH50 wave** unless OEDS re-import. NJ after exclusions **240** (principal `ready` **227** in DB today — prep pool **284**). Recommended live stagger: full `restore_pending_pool.py` between waves; stop if T+0 bounce **≥15%** or complaints **≥1**.

**Not sent** → **sent** in session 4 (2026-05-27).

### Live — NY50b, NJ50h, OH50l (2026-05-27, third session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `verify_cloud_from` OK; full restore between waves before each live. **Wait for `restore_pending_pool` to finish** before the next wave.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50b** | 50 | **49** | **1** | **0** | **2%** | NY **511** |
| **NJ50h** | 50 | **48** | **1** | **1** | **2%** | NJ **227** |
| **OH50l** | 50 | **49** | **1** | **0** | **2%** | OH **600** |

**New bounce domains (T+0):** `falconerschools.org`, `rih.org`, `readingschools.org`.

**Cumulative geo live ids:** **2338** + **NY50b 49** + **NJ50h 48** + **OH50l 49** = **2484**.

**Results stubs:** `cpb-school-outreach/docs/pilot_ny50b_results.md`, `pilot_nj50h_results.md`, `pilot_oh50l_results.md`.

### Live — NY50a, NJ50g, OH50k (2026-05-27, second session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `verify_cloud_from` OK, **142** exclude domains (+NJ50f bounces), **0** unsendable ready. **Wait for `restore_pending_pool` to finish** before next wave.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50a** | 50 | **49** | **0** | **1** | **0%** | NY **561** |
| **NJ50g** | 50 | **48** | **2** | **0** | **4%** | NJ **277** |
| **OH50k** | 50 | **50** | **0** | **0** | **0%** | OH **650** |

**NJ50g bounce domains (new T+0):** `flboe.com`, `princetonk12.org`.

**Cumulative geo live ids:** **2191** + **NY50a 49** + **NJ50g 48** + **OH50k 50** = **2338**.

**Results stubs:** `pilot_ny50a_results.md`, `pilot_nj50g_results.md`, `pilot_oh50k_results.md`.

### Live — NY50, NJ50f, OH50j (2026-05-27, one session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `verify_cloud_from` OK, **133** exclude domains, **0** unsendable ready.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50** | 50 | **49** | **0** | **1** | **0%** | NY **611** |
| **NJ50f** | 50 | **46** | **3** | **1** | **6%** | NJ **327** |
| **OH50j** | 50 | **50** | **0** | **0** | **0%** | OH **700** |

**NJ50f bounce domains (new T+0):** `gtps.k12.nj.us`, `htsd.us`, `njsbjc.org`.

**OH50j operator note:** First live attempt started while NJ50f `restore_pending_pool` was still running (~132k rows) — quarantine only **5/50** selection `ready`; batch status showed all **50** still `ready` (no OH50j sends). **Re-run succeeded** (50/50 quarantine, **50 sent**). Review `send_log` ~07:08–07:16 UTC for any stray sends from the failed attempt before counting domain metrics.

**Cumulative geo live ids:** **2046** + **NY50 49** + **NJ50f 46** + **OH50j 50** = **2191** (opted_out/bounced still count as attempted selection ids).

**Results stubs:** `cpb-school-outreach/docs/pilot_ny50_results.md`, `pilot_nj50f_results.md`, `pilot_oh50j_results.md`.

**Prior next line:** Geo batch wave prep — NY50 / NJ50f / OH50j ready for `.cloud` live.
- Operator **Active Institutions + CEO Info** CSV (COGNOS; not #30/#31 OAM) → `ny_sedref_raw.csv`
- Prep **5165** public principals → import **5062** `contacts_ready` (102 skipped: private/no_mx/invalid)
- Charter **Dir Ops** HS supplement: **82** prep → **80** `contacts_ready` (2× `no_mx`); **0** email overlap with public CEO export
- NY pool: **661** principal `ready`, **722** all-role `ready` (+10 principal from charter vs public-only)
- Registry **NY** → `active`; `prepare_ny_sedref_principals.py` — CEO columns + `--supplement` / `--supplement-only`

**Next:** **MA50e** hold; **MN50b** deferred; **MI50c** hold.

### MA DESE org catalog + principal refresh (2026-05-27)

**Organization Search ([11238](https://profiles.doe.mass.edu/search/search.aspx?leftNavId=11238))** — official export API (not HTML scrape):

| Output | Rows | Email |
|--------|-----:|-------|
| `ma_profiles_orgs.csv` | **1809** | No |
| `ma_profiles_orgs_hs.csv` | **427** | No |

**People Search ([11239](https://profiles.doe.mass.edu/search/search.aspx?leftNavId=11239))** re-import: **263** prep → **251** `contacts_ready`; **252** principal `ready` in DB.

**Coverage analysis** (`scripts/analyze_ma_profiles_coverage.py` → `data/mining_snapshots/ma_coverage_2026-05-27.json`):

| Metric | Value |
|--------|------:|
| HS orgs missing principal email in export | **164** |
| Principal `ready` (DB) | **252** |
| After batch exclusions | **9** |
| **Batch-eligible** (`max-per-domain 1`) | **2** |
| MA50e prep saved | **2** (QA pass; hold live) |

Re-import confirms: **11238 does not add outreach contacts**; MA send queue depleted by ~196 prior live ids + 48 `pilot_*_batch` files, not missing DESE data.

### Geo batch wave — preflight + prep (2026-05-27)

**Preflight** (`audit_unsendable_contacts`, `audit_pilot_bounce_domains`, `state_ready_count --principal`):

| State | Principal `ready` | Batch prep | Count | Notes |
|-------|------------------:|------------|------:|-------|
| NY | **661** | **NY50** | **50** | Greenfield; seed `2026052750`; QA 39/50 A/B or domain_ok C |
| NJ | **378** | **NJ50f** | **50** | seed `2026052727`; 397 after exclusions |
| OH | **761** | **OH50j** | **50** | seed `2026052728`; 274 after exclusions |
| MA | **252** | **MA50e** | **2** | Re-import done; **2** batch-eligible — hold live |
| MN | **48** | — | — | **MN50b deferred** — REC_REQ refresh blocked (Radware captcha) |
| MI | **681** | — | — | **MI50c HOLD** — MI50a/b **10%** T+0 bounce; `audit_mi_pilot_gate.py` |

Global: **24 616** `ready`, **19 458** principal `ready`, **0** unsendable ready, **133** exclude domains.

**Scripts added:** `run_ny50_live.ps1`, `run_nj50f_{prep,live}.ps1`, `run_oh50j_{prep,live}.ps1`, `run_ma50e_{prep,live}.ps1`, `audit_mi_pilot_gate.py`, **`analyze_ma_profiles_coverage.py`**.

**Recommended stagger (`.cloud`, 2/day max):** NY50 → NJ50f → OH50j → MA50e (partial or re-import first). Between live waves: `restore_pending_pool.py`, pause campaign, log T+0 here.

**Prior next line:** `run_ny50_prep.ps1` → NY50 live on `.cloud` when approved; optional OH/NJ waves.

**Prior (post–mining v4, 2026-05-27):** Pool **~19,474** `ready`; **14,318** principal `ready` after OH all-grades + MA refresh. NY blocked on operator CSV — **unblocked** same day.

**Mining v4 completed:**
- OH OEDS **all-grades** pass: **2174** `contacts_ready` (OH principal **761** batch-eligible after live waves)
- MA DESE Profiles **re-import**: **249** `contacts_ready` (MA principal **250**)
- NY SEDREF: **imported** via CEO CSV + charter supplement (see below); COGNOS #30/#31 still valid alternate source
- GA: `probe_ga_directory.py`, `prepare_ga_principals.py` added; address CSV **catalog_only**
- VA gap-fill smoke 100: **0%** hit rate — **STOP** bulk scrape
- Send hygiene: `audit_pilot_bounce_domains.py` → **133** exclude domains; **0** unsendable ready

**Prior (post–NJ50e):** Post-stagger pool **17 167** `ready`. **MA pool drained** — restored via DESE re-import 2026-05-27.

### NY SEDREF import + charter HS supplement (2026-05-27)

| Source | Prep rows | contacts_ready | NY principal `ready` (post) |
|--------|----------:|---------------:|--------------------------:|
| Active Institutions CEO CSV (public principals) | 5165 | **5062** | **651** |
| Charter Dir Ops (HS-only supplement) | 82 | **80** | **661** |

**Operator path:** SEDREF COGNOS *Active Institutions … CEO Info* → `data/state_directories/ny_sedref_raw.csv`; optional charter → `ny_sedref_charter_raw.csv`. One command: `run_ny_sedref_import.ps1` (charter auto if raw present).

**Prep filters (charter):** HS via grade 9–12 / org / name; drop `vacant.edu`; dedupe; net-new vs public principal CSV; import title **Head of School** for `role_target=principal`.

| Deliverable | Path |
|-------------|------|
| CEO + charter prep | `scripts/prepare_ny_sedref_principals.py` (`--supplement`, `--supplement-only`) |
| Import wrapper | `scripts/run_ny_sedref_import.ps1` |
| Raw / supplement CSV | `data/state_directories/ny_sedref_{raw,charter_raw,principals,supplement}.csv` |
| NY50 runbook | `docs/pilot_ny50_runbook.md`, `run_ny50_prep.ps1` |

**Not imported (by design):** ~112 charter schools with no Dir Ops contact; elementary/middle-only charter; CMO-shared ops emails beyond first dedupe row.

**Operator blockers (remaining):** MN OrgView REC_REQ (HTML when captcha), GA principal email export.

### Mining v4 — official-first principal expansion (2026-05-27)

| Import | Prep rows | contacts_ready | Principal pool (post) |
|--------|----------:|---------------:|----------------------:|
| OH OEDS all-grades | 2268 | **2174** | OH **761** |
| MA DESE Profiles refresh | 263 | **249** | MA **250** |
| NY SEDREF CEO CSV | 5165 | **5062** | NY **651** |
| NY charter HS supplement | 82 | **80** | NY **661** |

**Phase gate:** +2308 net principal delta (target +100) — **PASS**.

| Deliverable | Path |
|-------------|------|
| NY import wrapper | `scripts/run_ny_sedref_import.ps1`, `download_ny_sedref.py`, `prepare_ny_sedref_principals.py` |
| OH all-grades | `oh_oeds_principals_all.csv`, `MINING_OH_ALL_GRADES=1` in `run_cycle_mining.ps1` |
| GA probe/prep | `probe_ga_directory.py`, `prepare_ga_principals.py` |
| GreatSchools normalize | `prepare_greatschools_principals.py`, `run_greatschools_smoke.ps1` |
| NY50 runbook | `docs/pilot_ny50_runbook.md`, `run_ny50_prep.ps1` |
| MN REC_REQ refresh | `run_mn_rec_req_refresh.ps1` (captcha → manual HTML) |
| Snapshots | `baseline_v4*.txt`, `after_v4_official*.txt`, `v3_decision.txt` |

**VA smoke:** 100 schools scraped, **0** added, hit_rate **0%** — confirms STOP list for VA bulk scrape.

**Operator blockers:** MN OrgView REC_REQ (HTML when captcha), GA principal email export.

### OH50i + NJ50e live on `.cloud` (2026-05-26)

Stagger: **OH50i** → restore (**17 217** `ready`) → **NJ50e** → restore (**17 167** `ready`).

| Batch | Seed | Sel. | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-----:|-----:|-------------------------------|----------|------------|---------|
| **OH50i** | 2026052625 | 50 | 50 / 0 / 0 | **0%** | 0 | [`pilot_oh50i_results.md`](../cpb-school-outreach/docs/pilot_oh50i_results.md) |
| **NJ50e** | 2026052626 | 50 | 49 / 1 / 0 | **2%** | 0 | [`pilot_nj50e_results.md`](../cpb-school-outreach/docs/pilot_nj50e_results.md) |

New bounce domain: `cwcboe.org` (NJ50e).

**Cumulative live ids:** **1946** + **100** = **2046**.

### OH50i + NJ50e prep (2026-05-26)

Tenth OH / fifth NJ wave after OH50h/NJ50d. Exclude file **132** domains; **43** batch files in exclude glob (OH50i prep used 42; NJ50e **1996** prior ids).

**Preflight:** `audit_unsendable_contacts.py --apply` → **0** applied; global **17 267** `ready`; OH **155**, NJ **428** principal `ready` (`state_ready_count.py`).

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50i** | [`pilot_oh50i_batch`](../cpb-school-outreach/docs/pilot_oh50i_batch/) | 2026052625 | 50 | PASS | 2/50 |
| **NJ50e** | [`pilot_nj50e_batch`](../cpb-school-outreach/docs/pilot_nj50e_batch/) | 2026052626 | 50 | PASS | 17/50 (1× B) |

**Scripts:** `_run_xx50i_prep.ps1`, `run_{oh50i,nj50e}_{prep,live}.ps1`. **Live:** complete — see above.

### OH50h + NJ50d live on `.cloud` (2026-05-26)

Stagger: **OH50h** → restore (**17 317** `ready`) → **NJ50d** → restore (**17 267** `ready`).

| Batch | Seed | Sel. | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-----:|-----:|-------------------------------|----------|------------|---------|
| **OH50h** | 2026052623 | 50 | 49 / 0 / 1 | **0%** | 0 | [`pilot_oh50h_results.md`](../cpb-school-outreach/docs/pilot_oh50h_results.md) |
| **NJ50d** | 2026052624 | 50 | 50 / 0 / 0 | **0%** | 0 | [`pilot_nj50d_results.md`](../cpb-school-outreach/docs/pilot_nj50d_results.md) |

No new bounce domains at T+0.

**Cumulative live ids:** **1846** + **100** = **1946**.

### OH50h + NJ50d prep (2026-05-26)

Ninth OH / fourth NJ wave after OH50g/NJ50c. Exclude file **132** domains (includes `haddonfield.k12.nj.us` from NJ50c); **41** batch files in exclude glob (OH50h prep used 40; NJ50d **1896** prior ids).

**Preflight:** `audit_unsendable_contacts.py --apply` → **0** applied; global **17 367** `ready`; OH **205**, NJ **478** principal `ready` (`state_ready_count.py`).

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50h** | [`pilot_oh50h_batch`](../cpb-school-outreach/docs/pilot_oh50h_batch/) | 2026052623 | 50 | PASS | 6/50 |
| **NJ50d** | [`pilot_nj50d_batch`](../cpb-school-outreach/docs/pilot_nj50d_batch/) | 2026052624 | 50 | PASS | 14/50 (1× B) |

**Scripts:** `_run_xx50h_prep.ps1`, `run_{oh50h,nj50d}_{prep,live}.ps1`; NJ prep via `_run_pilot_slug_prep.ps1`. Runbooks: OH50h / NJ50d sections. **Live:** complete — see above.

### OH50g + NJ50c live on `.cloud` (2026-05-26)

Stagger: **OH50g** → restore (**17 417** `ready`) → **NJ50c** → restore (**17 367** `ready`).

| Batch | Seed | Sel. | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-----:|-----:|-------------------------------|----------|------------|---------|
| **OH50g** | 2026052621 | 50 | 50 / 0 / 0 | **0%** | 0 | [`pilot_oh50g_results.md`](../cpb-school-outreach/docs/pilot_oh50g_results.md) |
| **NJ50c** | 2026052622 | 50 | 49 / 1 / 0 | **2%** | 0 | [`pilot_nj50c_results.md`](../cpb-school-outreach/docs/pilot_nj50c_results.md) |

New bounce domain: `haddonfield.k12.nj.us` (NJ50c).

**Cumulative live ids:** **1746** + **100** = **1846**.

### OH50g + NJ50c prep (2026-05-26)

Eighth OH / third NJ wave after OH50f/NJ50b. Exclude file **131** domains; **39** batch files in exclude glob (OH50g prep used 38; NJ50c **1796** prior ids).

**Preflight:** `audit_unsendable_contacts.py --apply` → **0** applied; global **17 467** `ready`; OH **255**, NJ **528** principal `ready` (`state_ready_count.py`).

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50g** | [`pilot_oh50g_batch`](../cpb-school-outreach/docs/pilot_oh50g_batch/) | 2026052621 | 50 | PASS | 6/50 |
| **NJ50c** | [`pilot_nj50c_batch`](../cpb-school-outreach/docs/pilot_nj50c_batch/) | 2026052622 | 50 | PASS | 15/50 (1× B) |

**Scripts:** `_run_xx50g_prep.ps1`, `run_{oh50g,nj50c}_{prep,live}.ps1`; NJ prep via `_run_pilot_slug_prep.ps1`. Runbooks: OH50g / NJ50c sections. **Live:** complete — see above.

### OH50f + NJ50b live on `.cloud` (2026-05-26)

Stagger: **OH50f** → restore → **NJ50b**.

| Batch | Seed | Sel. | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-----:|-----:|-------------------------------|----------|------------|---------|
| **OH50f** | 2026052611 | 50 | 49 / 1 / 0 | **2%** | 0 | [`pilot_oh50f_results.md`](../cpb-school-outreach/docs/pilot_oh50f_results.md) |
| **NJ50b** | 2026052612 | 50 | 48 / 2 / 0 | **4%** | 0 | [`pilot_nj50b_results.md`](../cpb-school-outreach/docs/pilot_nj50b_results.md) |

New bounce domains: `metrocatholic.net` (OH50f); `delanco.com`, `edgewaterparksd.org` (NJ50b).

**Cumulative live ids:** **1646** + **100** = **1746**.

### OH50f + NJ50b prep (2026-05-26)

Seventh OH / second NJ wave after stagger live. Exclude file **128** domains (includes `burlington-nj.net`, `bergen.org` from NJ50); **37** batch files in exclude glob.

**Preflight:** OH **305**, NJ **578** principal `ready`; global **17 567** `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50f** | [`pilot_oh50f_batch`](../cpb-school-outreach/docs/pilot_oh50f_batch/) | 2026052611 | 50 | PASS | 6/50 |
| **NJ50b** | [`pilot_nj50b_batch`](../cpb-school-outreach/docs/pilot_nj50b_batch/) | 2026052612 | 50 | PASS | 6/50 |

**Scripts:** `_run_xx50f_prep.ps1`, `run_{oh50f,nj50b}_{prep,live}.ps1`. **Live:** complete — see above.

### Stagger live — OH50e + NJ50 + MN50a + MA23 on `.cloud` (2026-05-26)

Full stagger complete on **`hello@promptanatomy.cloud`**.

| Batch | Seed | Sel. | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-----:|-----:|-------------------------------|----------|------------|---------|
| **OH50e** | 2026052601 | 50 | 49 / 0 / 1 | **0%** | 0 | [`pilot_oh50e_results.md`](../cpb-school-outreach/docs/pilot_oh50e_results.md) |
| **NJ50** | 2026052355 | 50 | 48 / 2 / 0 | **4%** | 0 | [`pilot_nj50_results.md`](../cpb-school-outreach/docs/pilot_nj50_results.md) |
| **MN50a** | 2026052561 | 16 | 16 / 0 / 0 | **0%** | 0 | [`pilot_mn50a_results.md`](../cpb-school-outreach/docs/pilot_mn50a_results.md) |
| **MA23** | 2026052593 | 7 | 7 / 0 / 0 | **0%** | 0 | [`pilot_ma23_results.md`](../cpb-school-outreach/docs/pilot_ma23_results.md) |

New bounce domains: `burlington-nj.net`, `bergen.org` (NJ50).

**Cumulative live ids:** **1523** + **123** = **1646**. Live scripts: `run_{oh50e,nj50,mn50a,ma23}_live.ps1` via `_run_xx50e_live` / `_run_pilot_slug_live`.

### Multi-batch prep — OH50e + NJ50 + MN50a + MA23 (2026-05-26)

Refreshed selections after XX50d; exclude file **125** domains; **36** `pilot_*_batch` files in exclude glob.

**Preflight** (`state_ready_count.py --principal`): OH **355**, MA **23**, MN **64**, NJ **628**; global **17 690** `ready`.

| Batch | Output | Seed | Count | QA | Notes |
|-------|--------|-----:|------:|:---:|-------|
| **OH50e** | [`pilot_oh50e_batch`](../cpb-school-outreach/docs/pilot_oh50e_batch/) | 2026052601 | **50** | PASS | `domain_ok` 10/50 |
| **NJ50** | [`pilot_nj50_batch`](../cpb-school-outreach/docs/pilot_nj50_batch/) | 2026052355 | **50** | PASS | refreshed; `domain_ok` 9/50; **live 2026-05-26** |
| **MN50a** | [`pilot_mn50a_batch`](../cpb-school-outreach/docs/pilot_mn50a_batch/) | 2026052561 | **16** | PASS | shortfall (was 34 at first prep); `domain_ok` 3/16 |
| **MA23** | [`pilot_ma23_batch`](../cpb-school-outreach/docs/pilot_ma23_batch/) | 2026052593 | **7** | PASS | shortfall (wanted 23; only **7** after exclusions) |

**Scripts:** [`_run_pilot_slug_prep.ps1`](../cpb-school-outreach/scripts/_run_pilot_slug_prep.ps1), `_run_xx50e_prep.ps1`, `run_{oh50e,ma23}_prep.ps1`, `run_{nj50,mn50a}_prep.ps1`; live scaffolds `_run_xx50e_live.ps1`, `_run_pilot_slug_live.ps1`.

**Live:** complete — see stagger live above (**1646** ids).

### XX50d fifth-wave live — OH50d + MA50d on `.cloud` (2026-05-25)

**XX50d stagger complete.** OH50d + MA50d on **`hello@promptanatomy.cloud`**. Stagger: OH50d → restore (**17 729** restored) → MA50d (**39** contacts, prep shortfall).

| Batch | Seed | Selection | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-----:|----------:|-------------------------------|----------|------------|---------|
| **OH50d** | 2026052591 | 50 | 49 / 1 / 0 | **2%** | 0 | [`pilot_oh50d_results.md`](../cpb-school-outreach/docs/pilot_oh50d_results.md) |
| **MA50d** | 2026052592 | **39** | 39 / 0 / 0 | **0%** | 0 | [`pilot_ma50d_results.md`](../cpb-school-outreach/docs/pilot_ma50d_results.md) |

| Bounced domain (add to exclude) | Batch |
|---------------------------------|-------|
| `jmk12.org` | OH50d |
| `elyriaschools.org` | OH50c |
| `npsk.org` | MA50c |

**Cumulative live ids:** **1434** + **89** = **1523** (50 OH + 39 MA selection ids). Campaign **paused** / `dry_run=true` after each batch.

**Post-MA50d pool:** `restore_pending_pool.py` → **17 690** `ready`.

### XX50d fifth-wave prep — OH50d + MA50d (2026-05-25)

**Prep only** — planned live sender **`.cloud`**. Exclude file **121** domains (includes `elyriaschools.org`, `npsk.org` from 50c); auto `--exclude-batch` on all prior `pilot_*_batch` selections (33 files).

**Preflight** (`audit_unsendable_contacts.py --apply`, `state_ready_count.py --principal`): global **17 779** `ready`; OH **405**, MA **62** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50d** | [`pilot_oh50d_batch`](../cpb-school-outreach/docs/pilot_oh50d_batch/) | 2026052591 | 50 | PASS | 13/50 |
| **MA50d** | [`pilot_ma50d_batch`](../cpb-school-outreach/docs/pilot_ma50d_batch/) | 2026052592 | **39** | PASS | 10/39 |

**MA50d shortfall:** `prepare_tx50_batch.py` needs **50** but only **39** MA principals remain after exclusions (75 principal `ready` in pool, 58 after domain/batch filters). Batch saved at **count 39** via `_run_xx50d_prep.ps1 -Count 39`; re-run DESE import or accept partial wave before live.

**Scripts:** [`_run_xx50d_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50d_prep.ps1), `run_{oh,ma}50d_prep.ps1`; live [`_run_xx50d_live.ps1`](../cpb-school-outreach/scripts/_run_xx50d_live.ps1), `run_{oh,ma}50d_live.ps1`. Runbook **50d** in `pilot_oh50_runbook.md`, `pilot_ma50_runbook.md`.

**Live:** complete same day — see XX50d live above (**1523** ids).

### XX50c fourth-wave live — OH50c + MA50c on `.cloud` (2026-05-25)

**OH50c + MA50c** only (no MI50c). Sender **`hello@promptanatomy.cloud`**. Stagger: OH50c → restore → MA50c.

| Batch | Seed | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-----:|-------------------------------|----------|------------|---------|
| **OH50c** | 2026052581 | 49 / 1 / 0 | **2%** | 0 | [`pilot_oh50c_results.md`](../cpb-school-outreach/docs/pilot_oh50c_results.md) |
| **MA50c** | 2026052582 | 49 / 1 / 0 | **2%** | 0 | [`pilot_ma50c_results.md`](../cpb-school-outreach/docs/pilot_ma50c_results.md) |

New bounce domains: `elyriaschools.org` (OH50c), `npsk.org` (MA50c). Both **2%** — below 15% gate.

**Cumulative live ids:** **1334** + **100** = **1434**. Campaign **paused** / `dry_run=true` after each batch.

**Post-MA50c pool:** restore **17 829** `ready` before MA50c park; re-run `restore_pending_pool.py` after metrics review.

### XX50c fourth-wave prep — OH50c + MA50c (2026-05-25)

**Prep only** before live same day. Planned sender **`.cloud`**. Exclude file **117** domains; auto `--exclude-batch` on all prior `pilot_*_batch` selections (31 files).

**Preflight** (`audit_unsendable_contacts.py --apply`, `state_ready_count.py --principal`): global **17 879** `ready`; OH **455**, MA **112** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50c** | [`pilot_oh50c_batch`](../cpb-school-outreach/docs/pilot_oh50c_batch/) | 2026052581 | 50 | PASS | 7/50 |
| **MA50c** | [`pilot_ma50c_batch`](../cpb-school-outreach/docs/pilot_ma50c_batch/) | 2026052582 | 50 | PASS | 11/50 |

**Scripts:** [`_run_xx50c_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50c_prep.ps1), `run_{oh,ma}50c_prep.ps1`; live [`_run_xx50c_live.ps1`](../cpb-school-outreach/scripts/_run_xx50c_live.ps1), `run_{oh,ma}50c_live.ps1`. Runbook **50c** in `pilot_oh50_runbook.md`, `pilot_ma50_runbook.md`.

### XX50 official geo live — MN50 + OH50 + MA50 + MI50 (2026-05-25)

**Official principal** geo sends on `hello@promptanatomy.info` after VA11a/CA29a scrape batches. All four stagger batches **&lt;15%** T+0 bounce; complaints **0**. **XX50 stagger complete.**

| Batch | Seed | T+0 sent / bounced | Bounce % | Complaints | Results |
|-------|-----:|-------------------|----------|------------|---------|
| **MN50** | 2026052351 | 49 / 1 | **2%** | 0 | [`pilot_mn50_results.md`](../cpb-school-outreach/docs/pilot_mn50_results.md) |
| **OH50** | 2026052352 | 48 / 2 | **4%** | 0 | [`pilot_oh50_results.md`](../cpb-school-outreach/docs/pilot_oh50_results.md) |
| **MA50** | 2026052353 | 48 / 2 | **4%** | 0 | [`pilot_ma50_results.md`](../cpb-school-outreach/docs/pilot_ma50_results.md) |
| **MI50** | 2026052354 | 48 / 2 | **4%** | 0 | [`pilot_mi50_results.md`](../cpb-school-outreach/docs/pilot_mi50_results.md) |

**Cumulative live ids:** TX 800 + VA 11 + CA 23 + MN 50 + OH 50 + MA 50 + MI 50 = **1034**. Campaign `pilot_50` **paused** / `dry_run=true` after each batch.

**Stagger progress:** Mon–Thu **complete** (MN / OH / MA / MI).

| Bounced domain (add to exclude) | Batch |
|---------------------------------|-------|
| `alschools.org` | MN50 |
| `aurora-schools.org`, `aacs.net` | OH50 |
| `bhrsd.org`, `bpsma.org` | MA50 |
| `alpenaschools.com`, `benzieschools.net` | MI50 |

**Tooling (required for XX50+):**

- [`apply_tx50_quarantine.py`](../cpb-school-outreach/scripts/apply_tx50_quarantine.py) — **batched park** (500 fetch / 50-id `pending`). Validated on MA50 + MI50.
- [`restore_pending_pool.py`](../cpb-school-outreach/scripts/restore_pending_pool.py) — batched restore; ~52 suppressed `pending` remain.
- [`_run_xx50_live.ps1`](../cpb-school-outreach/scripts/_run_xx50_live.ps1) — PowerShell parse fix.

**Post-MI50 pool:** ~**18 179** `ready`, ~**52** `pending` (suppressed). Exclude file **104** domains.

**Next:** `audit_pilot_bounce_domains.py` after MI50b; review `.cloud` MI **10%** (state-specific, not OH/MA); `restore_pending_pool.py`; hold `.info` / more MI volume; NJ50 / MN50a optional.

### MI50b live — XX50b complete on `.cloud` (2026-05-25)

**50** MI principals on `hello@promptanatomy.cloud` (seed **2026052573**). `run_mi50b_live.ps1`.

| Batch | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-------------------------------|----------|------------|---------|
| **MI50b** | 45 / 5 / 0 | **10%** | 0 | [`pilot_mi50b_results.md`](../cpb-school-outreach/docs/pilot_mi50b_results.md) |

New bounce domains: `charlottenet.org`, `bathschools.net`, `bangorschools.org`, `clioschools.org`, `davisonschools.org`. Same **10%** as MI50a on `.info` — likely MI list quality, not sender domain alone.

**Cumulative live ids:** **1284** + **50** = **1334**. **XX50b stagger complete** (OH/MA **0%**, MI **10%** on `.cloud`).

### MA50b live (2026-05-25)

**50** MA principals on `hello@promptanatomy.cloud` (seed **2026052572**). `run_ma50b_live.ps1`.

| Batch | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-------------------------------|----------|------------|---------|
| **MA50b** | 50 / 0 / 0 | **0%** | 0 | [`pilot_ma50b_results.md`](../cpb-school-outreach/docs/pilot_ma50b_results.md) |

Quarantine: **50** `ready` after batched park. API **50** sent (10×5). No new bounce domains.

**Cumulative live ids:** **1234** + **50** = **1284**. Campaign **paused** / `dry_run=true`.

### OH50b live — first `.cloud` batch (2026-05-25)

**50** OH principals on `hello@promptanatomy.cloud` (seed **2026052571**). `verify_cloud_from.ps1` OK; `run_oh50b_live.ps1`.

| Batch | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-------------------------------|----------|------------|---------|
| **OH50b** | 50 / 0 / 0 | **0%** | 0 | [`pilot_oh50b_results.md`](../cpb-school-outreach/docs/pilot_oh50b_results.md) |

Quarantine: **50** `ready` after batched park. API **50** sent (10×5). No new bounce domains.

**Cumulative live ids:** **1184** + **50** = **1234**. Campaign **paused** / `dry_run=true`.

### XX50b third-wave prep — OH50b + MA50b + MI50b (2026-05-25)

**Prep only** — planned live sender **`hello@promptanatomy.cloud`** ([`promptanatomy_cloud_sender_gate.md`](../cpb-school-outreach/docs/promptanatomy_cloud_sender_gate.md)). Same filters as 50a; exclude file **110** domains; auto `--exclude-batch` on all prior `pilot_*_batch` selections (27 files, ~1368+ ids per state).

**Preflight** (`state_ready_count.py --principal` after restore): OH **505**, MI **731**, MA **162** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50b** | [`pilot_oh50b_batch`](../cpb-school-outreach/docs/pilot_oh50b_batch/) | 2026052571 | 50 | PASS | 5/50 |
| **MI50b** | [`pilot_mi50b_batch`](../cpb-school-outreach/docs/pilot_mi50b_batch/) | 2026052573 | 50 | PASS | 31/50 |
| **MA50b** | [`pilot_ma50b_batch`](../cpb-school-outreach/docs/pilot_ma50b_batch/) | 2026052572 | 50 | PASS | 13/50 |

**Scripts:** [`_run_xx50b_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50b_prep.ps1), `run_{oh,mi,ma}50b_prep.ps1`; live scaffold [`_run_xx50b_live.ps1`](../cpb-school-outreach/scripts/_run_xx50b_live.ps1), `verify_cloud_from.ps1`, `run_{state}50b_live.ps1`.

**Live:** **OH50b + MA50b + MI50b** complete on `.cloud` (2026-05-25). Cumulative **1334** geo+TX live ids.

### MI50a live (2026-05-25)

Second-wave **50** MI principals on `hello@promptanatomy.info` (seed **2026052564**). Scripts: `run_mi50a_live.ps1` → [`_run_xx50a_live.ps1`](../cpb-school-outreach/scripts/_run_xx50a_live.ps1).

| Batch | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-------------------------------|----------|------------|---------|
| **MI50a** | 45 / 5 / 0 | **10%** | 0 | [`pilot_mi50a_results.md`](../cpb-school-outreach/docs/pilot_mi50a_results.md) |

Quarantine: batched park OK (**50** `ready` after quarantine). API **50** sent (10×5). New bounce domains: `bellevue-schools.com`, `bealcityschools.net`, `brandywinebobcats.org`, `brhschools.org`, `burroakcs.org`.

**Cumulative live ids:** **1134** + **50** = **1184**. Campaign `pilot_50` **paused** / `dry_run=true`. **XX50a** second-wave: OH/MA **0%**, MI **10%** — pause further `.info` volume until Resend domain review.

### MA50a live (2026-05-25)

Second-wave **50** MA principals on `hello@promptanatomy.info` (seed **2026052563**). Scripts: `run_ma50a_live.ps1` → [`_run_xx50a_live.ps1`](../cpb-school-outreach/scripts/_run_xx50a_live.ps1).

| Batch | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-------------------------------|----------|------------|---------|
| **MA50a** | 49 / 0 / 1 | **0%** | 0 | [`pilot_ma50a_results.md`](../cpb-school-outreach/docs/pilot_ma50a_results.md) |

Quarantine: batched park OK (**50** `ready` after quarantine). API **50** sent (10×5). Opted out: `jperella2@gloucesterschools.com` (no new bounce domains).

**Cumulative live ids:** **1084** + **50** = **1134**. Campaign `pilot_50` **paused** / `dry_run=true`.

### OH50a live (2026-05-25)

Second-wave **50** OH principals on `hello@promptanatomy.info` (seed **2026052562**). Scripts: [`_run_xx50a_live.ps1`](../cpb-school-outreach/scripts/_run_xx50a_live.ps1), `run_oh50a_live.ps1`.

| Batch | T+0 sent / bounced / opted_out | Bounce % | Complaints | Results |
|-------|-------------------------------|----------|------------|---------|
| **OH50a** | 49 / 0 / 1 | **0%** | 0 | [`pilot_oh50a_results.md`](../cpb-school-outreach/docs/pilot_oh50a_results.md) |

Quarantine: batched park OK (**50** `ready` after quarantine). API **50** sent (10×5). Opted out: `jason.caudill@bexley.us` (no new bounce domains).

**Cumulative live ids:** **1034** + **50** = **1084**. Campaign `pilot_50` **paused** / `dry_run=true`.

### XX50a second-wave prep — OH50a + MA50a + MI50a + MN50a (2026-05-25)

Same filters as XX50: official directory, `mx_ok`, `--max-per-domain 1`, global exclude file (**104** domains), auto `--exclude-batch` on all `docs/pilot_*_batch/selection.json`. **OH50a + MA50a + MI50a live complete** (see above); MN50a (34) prep only unless noted.

**Preflight** (`audit_unsendable_contacts.py --apply`: 0 applied; `state_ready_count.py --principal`): MN **64**, OH **555**, MA **212**, MI **781** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50a** | [`pilot_oh50a_batch`](../cpb-school-outreach/docs/pilot_oh50a_batch/) | 2026052562 | 50 | PASS | 5/50 |
| **MA50a** | [`pilot_ma50a_batch`](../cpb-school-outreach/docs/pilot_ma50a_batch/) | 2026052563 | 50 | PASS | 14/50 |
| **MI50a** | [`pilot_mi50a_batch`](../cpb-school-outreach/docs/pilot_mi50a_batch/) | 2026052564 | 50 | PASS | 26/50 |
| **MN50a** | [`pilot_mn50a_batch`](../cpb-school-outreach/docs/pilot_mn50a_batch/) | 2026052561 | **34** | PASS | 9/34 |

**MN50a shortfall:** `prepare_tx50_batch.py` needs **50** but only **34** MN principals remain after `max-per-domain 1` + domain exclusions (64 principal `ready` pre-pick). Batch saved at **count 34**; operator may re-run MN OrgView import or accept partial wave before live.

**Scripts (outreach repo):** [`_run_xx50a_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50a_prep.ps1), `run_{oh,ma,mi,mn}50a_prep.ps1`. Fixed PowerShell `--exclude-batch` glob (`selection.json` under `pilot_*_batch`; prior `-Filter pilot_*_batch\selection.json` matched 0 files). Same fix in [`_run_xx50_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50_prep.ps1).

**Live send:** [`_run_xx50a_live.ps1`](../cpb-school-outreach/scripts/_run_xx50a_live.ps1) + `run_{state}50a_live.ps1` — **OH50a**, **MA50a**, **MI50a** live 2026-05-25; MN wrapper when approved.

### NJ Homeroom public school import (2026-05-24)

- **Added** [`prepare_nj_homeroom_principals.py`](../cpb-school-outreach/scripts/prepare_nj_homeroom_principals.py) — normalizes operator `NJPubSchool.csv` (Homeroom6 export, cp1252, Excel `="..."` cells) to canonical principal CSV; `sanitize_email` gate, dedupe by email.
- **Imported** **2452** NJ public-school principals to Supabase (`email_source=official_state_directory:NJ`); 7 skipped (`no_mx`); prep 2525 → 2459 rows after sendable filter + dedupe.
- **NJ50 prep:** `docs/pilot_nj50_batch/selection.json` — seed **2026052355**, 50/50 principal, official directory, mx_ok, 50 unique domains; QA **PASS** (`--allow-c`, 50× grade C — `web=no_url` expected).
- **Added** `run_nj50_prep.ps1`, `run_nj50_live.ps1`, [`pilot_nj50_runbook.md`](../cpb-school-outreach/docs/pilot_nj50_runbook.md); `_run_xx50_prep.ps1` / `_run_xx50_live.ps1` ValidateSet includes **NJ**.
- **Updated** [`state_source_registry.json`](../cpb-school-outreach/config/state_source_registry.json) NJ `stop` → `active`; [`probe_nj_directory.py`](../cpb-school-outreach/scripts/probe_nj_directory.py) prefers local `nj_homeroom_raw.csv`; [`data/README.md`](../cpb-school-outreach/data/README.md) operator runbook.
- **Not imported:** `NJNonPubSchools.csv` (private schools, consumer email mix).

### Email sanitization and send gate (2026-05-24)

- **Added** [`email_sanitize.py`](../cpb-school-outreach/src/cpb_outreach/enrich/email_sanitize.py): `sanitize_email()`, `is_sendable_email()` — rejects URL-encoded local parts (`%20kingstreet@...`), hex-token locals (`0964d12c...@fcoe.org`), invalid local start; strict regex without `%`.
- **Integrated** sanitization at scrape import, state directory import, `normalize_email`, batch `filter_pool` (default `sendable_only`), `pilot_qa_selection` (hard FAIL on unsendable), and `sender.send_to_contact` pre-Resend gate.
- **Added** [`scripts/audit_unsendable_contacts.py`](../cpb-school-outreach/scripts/audit_unsendable_contacts.py) — report/apply `ready` → `skipped` for structurally invalid emails in Supabase.
- **Operator:** after deploy run `python scripts/audit_unsendable_contacts.py --apply` and `audit_pilot_bounce_domains.py` (global, no `--tx-only`) before next live batch.

### XX50 batch prep complete (2026-05-23)

Four official principal geo batches prepared on campaign **`pilot_50`**, sender **`hello@promptanatomy.info`**. **MN50 + OH50 live complete (2026-05-25).** **MA50 / MI50** prep ready; hold until prior batch T+0 + Resend `.info` gate.

| Batch | Selection | Seed | QA (`--allow-c`) | domain_ok C |
|-------|-----------|-----:|------------------|------------:|
| MN50 | `docs/pilot_mn50_batch/selection.json` | 2026052351 | 7 B / 43 C | 21/50 |
| OH50 | `docs/pilot_oh50_batch/selection.json` | 2026052352 | 50 C | 7/50 |
| MA50 | `docs/pilot_ma50_batch/selection.json` | 2026052353 | 50 C | 8/50 |
| MI50 | `docs/pilot_mi50_batch/selection.json` | 2026052354 | 9 B / 41 C | 26/50 |

Preflight (`data/mining_snapshots/xx50_preflight.txt`): MN **114**, OH **605**, MA **262**, MI **831** principal (`--principal`).

| Deliverable | Path |
|-------------|------|
| Shared prep | `scripts/_run_xx50_prep.ps1` (MN/OH/MA/MI) |
| Shared live | `scripts/_run_xx50_live.ps1` |
| Live wrappers | `run_mn50_live.ps1`, `run_oh50_live.ps1`, `run_ma50_live.ps1`, `run_mi50_live.ps1` |
| MI prep | `scripts/run_mi50_prep.ps1` |
| MI runbook | `docs/pilot_mi50_runbook.md` |

**QA note:** Strict A/B failed (most grade C — missing school `website_url` in DB). QA gate uses `--allow-c` (same as VA50a/CA29a). MN `--domain-aligned-only` pool too small (12); not used.

**Recommended live stagger** (after `.info` gate + T+0 bounce &lt;15%, complaints 0):

| Day | Batch | Emails | Status (2026-05-25) |
|-----|-------|-------:|---------------------|
| Mon | MN50 | 50 | **Done** (2% bounce) |
| Tue | OH50 | 50 | **Done** (4% bounce) |
| Wed | MA50 | 50 | **Done** (4% bounce) |
| Thu | MI50 | 50 | **Done** (4% bounce) |

Before each day: `verify_info_from.ps1` → `run_{state}50_live.ps1`. Use batched quarantine (see XX50 live section above).

### Michigan CEPI EEM import (2026-05-23)

Operator **EEM Data Report** CSV (full export, **6427** school rows) → `prepare_mi_eem_principals.py` → `import-state-directory`. Registry **stop → active**; no website scrape.

| Metric | Before | After |
|--------|-------:|------:|
| MI `ready` / `principal` | 11 / 0 | **842 / 831** |
| Prep rows (LEA, all grades) | — | **2462** (2814 LEA open-active; 128 deduped by email) |
| Smoke 50 | — | **50/50** `contacts_ready` |
| Full import | — | **2448** `contacts_ready` (14 skipped: 12 no_mx, 1 invalid, 1 private) |

| Deliverable | Path |
|-------------|------|
| Raw export | `data/state_directories/mi_eem_report_20260523.csv` |
| Prep | `scripts/prepare_mi_eem_principals.py` → `mi_eem_principals.csv` |
| Probe | `scripts/probe_mi_directory.py` → `probe_MI.json` (prefers local EEM over MDE HTTP 404) |
| Registry | `MI.status=active`, `scrape_allowed=false` |
| Snapshots | `mi_eem_baseline.txt`, `mi_eem_after_import.txt` |
| Tests | `tests/test_prepare_mi_eem_principals.py` |

**Scope:** Open-Active **LEA** (public) only, **all grades** (not HS-only). Lead admin email → title `Principal`.

**Lessons:**
- Broken [MDE data landing URLs](https://www.michigan.gov/mde/services/data) (404) ≠ no MI email — MICIP **EEM Data Report** has lead-admin emails.
- **Do not** use filtered EEM exports (e.g. 19-row **State-only** subset — corrections/DHS/deaf schools, 0 LEA rows). Require full ~6k-row export.

**Mining refresh:** `$env:MINING_REFRESH_MI=1; .\scripts\run_cycle_mining.ps1`. **MI50** prep complete 2026-05-23; live after MA50 (Thu stagger).

### IL ISBE Directory probe (2026-05-23)

Probed [ISBE Directory of Educational Entities](https://www.isbe.net/Pages/Data-Analysis-Directories.aspx) (`dir_ed_entities.xls`, tab `1 Public Dist & Sch`). **catalog_only** for contact mining: 3875 school rows, 778 HS, **0 emails** (administrator + phone + website + NCES only).

| Deliverable | Path |
|-------------|------|
| Download | `scripts/download_il_isbe_entities.py` |
| Probe | `scripts/probe_il_directory.py` → `probe_IL.json` |
| Prep / catalog | `scripts/prepare_il_isbe_principals.py`, `il_isbe_schools_catalog.csv` |
| Import | **Skipped** (no email column) |
| Registry | `IL.status=catalog_only`; scrape STOP extended |

**Lesson:** ISBE page lists "contact information" but nightly XLS is phone/website, not email — use for NCES/RCDTS join only. Wrong v3 probe was report-card URLs.

IL50 deferred (principal pool unchanged).

### IL website scrape smoke (2026-05-23)

Gated Option A: ISBE HS catalog → `il_hs_scrape_import.csv` (555 domains) → `import-schools` → opt-in smoke 50 (`MINING_IL_SCRAPE_PROBE=1`).

| Metric | Result |
|--------|--------|
| Smoke size | 50 |
| Ready added | **+1** |
| Hit rate | **2%** (gate **8%**) |
| Decision | **STOP** — IL stays on Phase 3 `$StopList`; `scrape_allowed=false` |
| Probe | `probe_IL_scrape_smoke.json` |

Scripts: `prepare_il_isbe_scrape_pool.py`, `run_il_scrape_smoke.ps1`, `apply_il_scrape_decision.py`. **No** Power BI / Public School Lookup scraper. IL50 remains deferred.

### Mining v3 — official-first principal tracks (2026-05-23)

Shift success metric from raw `ready` total to **send-ready principal** (`principal` + `mx_ok` + official source). Baseline snapshot: **8503** principal ready; MN **114**/OH **605**/MA **262**/NY **0** (state filter via `state_ready_count.py --principal`).

**Deliverables (cpb-school-outreach):**

| Item | Path |
|------|------|
| Baseline capture | `scripts/capture_v3_baseline.py` → `data/mining_snapshots/baseline_v3*.txt` |
| Principal inventory | `scripts/mining_principal_inventory.py` |
| State source registry | `config/state_source_registry.json` |
| Registry probes | `scripts/probe_state_registry.py`, `probe_ny_sedref.py`, `probe_il/nj/mi_directory.py` |
| NY SEDREF prep | `scripts/prepare_ny_sedref_principals.py` (operator CSV → HS filter) |
| v3 cycle | `scripts/run_cycle_mining_v3.ps1` (MA auto-refresh, OH/NY import flags fixed) |
| Send prep | `run_mn50/oh50/ma50_prep.ps1` + `docs/pilot_*50_runbook.md` (MI50 deferred, pool ~831) |
| Scrape STOP extended | `run_phase3_scrape.ps1` adds OH, MA, PA |

**Import rule (repeated):** never stack `--high-school-only` on `import-state-directory` when prep CSV already HS-filtered (OH, MA, NY).

**Next operator action:** **MA50 live** (Wed); NY SEDREF COGNOS #30/#31 → `ny_sedref_raw.csv` for NY track expansion.

### Pool snapshot (2026-05-23, post MI EEM import)

| Metric | Post OH+MA | Post MI EEM |
|--------|----------:|------------:|
| `ready` total | ~13539 | **~15987** (+2448 net MI import) |
| `principal` ready | ~8503 | **~9334** (+831 MI principal) |
| MI `ready` / `principal` | 11 / 0 | **842 / 831** |

**Send-ready geo tracks (principal + official source):** MN50 (288), OH50 (~605), MA50 (~262), **MI50** (~831, prep deferred). Hold FL live (60 principal vs 2199 `other`).

### MA DESE Profiles import (2026-05-23)

Official **People Search → Principal** export ([profiles.doe.mass.edu](https://profiles.doe.mass.edu/search/search.aspx?leftNavId=11239)), not Organization Search scrape (`leftNavId=11238` has no emails in results). Export URL: `search_export.aspx?functions=22&showEmail=Y` → **1808** principals statewide; HS name filter → **263** rows → **262** `contacts_ready` (1 invalid email).

| Metric | Before | After |
|--------|-------:|------:|
| MA `ready` / `principal` | 20 / 0 | **~282 / ~262** |
| Pool `ready` / `principal` | 13277 / 8241 | **~13539 / ~8503** |

Scripts: `download_ma_profiles_principals.py`, `prepare_ma_profiles_principals.py`, `probe_ma_profiles.py`. Log: `cpb-school-outreach/data/mining_snapshots/ma_profiles_import.log`.

**Import note:** do not pass `--high-school-only` to `import-state-directory` when prep already filtered HS — import gate rejects all rows.

### OH OEDS import (2026-05-23)

Operator wide-format export `20260523_report.csv` → `oh_oeds_raw.csv` → **751 HS principal rows** → **605** `contacts_ready` (13 private email skipped, MX ok).

| Metric | Before | After |
|--------|-------:|------:|
| OH `ready` / `principal` | 16 / 0 | **621 / 605** |
| Pool `ready` / `principal` | 12672 / 7636 | **13277 / 8241** |

Log: `cpb-school-outreach/data/mining_snapshots/phase3a_oh_oeds_import.log`

### Pool snapshot (2026-05-23, post OH + MA official imports)

| Metric | After Phase 3 | After OH + MA |
|--------|--------------:|--------------:|
| `ready` total | 12672 | **~13539** (+867) |
| `principal` ready | 7636 | **~8503** (+867) |
| OH `ready` / `principal` | 16 / 0 | **621 / 605** |
| MA `ready` / `principal` | 20 / 0 | **~282 / ~262** |
| MN `ready` / `principal` | 2681 / 288 | unchanged — **best send track** |

**Send-ready geo tracks (principal + official source):** MN50 (288), **OH50** (~605), **MA50** (~262). Hold FL live (60 principal vs 2199 `other`). Hold NY bulk scrape — use [NYSED SEDREF](https://p12.nysed.gov/irs/schoolDirectory/) principal email reports (#30/#31), not [data.nysed.gov school lists](https://data.nysed.gov/lists.php?type=school) (accountability catalog only).

### Pool snapshot (2026-05-23, post mining v2 Phase 3)

| Metric | After Phase 2 | After Phase 3 |
|--------|--------------:|--------------:|
| `ready` total | 12671 | **12672** (+1) |
| `principal` ready | 7635 | **7636** (+0) |
| PA `ready` / `principal` | 32 / 0 | **33 / 0** |
| OH `ready` / `principal` | 16 / 0 | 16 / 0 (OEDS blocked) |

**Phase 3A (official):** OH OEDS blocked — no `oh_oeds_raw.csv` ([DataExtract](https://oeds.education.ohio.gov/DataExtract) manual). MN LIBRARY/Counselor skipped (captcha). +0 principal → scrape path required.

**Phase 3B (PA smoke 50):** hit_rate **2%** (1 added) — below 8% gate. **Phase 3C limited scrape skipped.**

**Tooling:** `scripts/state_ready_count.py` + fixed `run_phase3_scrape.ps1` (state counts via `schools` join).

Snapshots: `baseline_v2_phase3.txt`, `after_phase3_v2.txt`, `phase3_decision_after_phase3.txt`, `phase3_smoke_results.json`.

### Pool snapshot (2026-05-23, post mining v2 Phase 2)

| Metric | After Phase 1 | After Phase 2 |
|--------|--------------:|--------------:|
| `ready` total | 10411 | **12671** (+2260) |
| `principal` ready | 7575 | **7635** (+60) |
| FL `ready` / `principal` | 14 / 0 | **2272 / 60** |
| OH `ready` / `principal` | 16 / 0 | 16 / 0 (OEDS pending) |

**Phase 3 scrape:** skipped for FL (official imports +2258 ready). OH scrape deferred until OEDS manual extract. See `cpb-school-outreach/data/mining_snapshots/phase3_decision_after_phase2.txt`.

### Pool snapshot (2026-05-23, post mining v2 Phase 1)

| Metric | Before v2 | After v2 Phase 1 |
|--------|----------:|-----------------:|
| `ready` total | 8246 | **10411** (+2165) |
| `ready_unsent` | — | **10411** |
| `principal` ready | ~7356 | **7575** (+219) |
| Ne-TX `ready` | ~946 | **3111** |
| MN `ready` / `principal` | 516 / 69 | **2681 / 288** |
| TX `ready` / `principal` | 7300 / 7287 | 7300 / 7287 |

**Imports (background jobs, exit 0):**

| Source | Rows | `contacts_ready` | Log |
|--------|-----:|-----------------:|-----|
| TX AskTED personnel (`--high-school-only`) | 2546 | **2470** | `data/mining_snapshots/phase1a_tx_personnel_import.log` |
| MN OrgView SAC + SITE_VER supplement | 2179 | **2170** | `data/mining_snapshots/phase1b_mn_supplement_import.log` |
| MN supplement smoke (`--limit 50 --skip-mx`) | 50 | **50** | — |

TX net `ready` unchanged — most personnel emails already in pool from prior geocoded AskTED import (upsert/dedupe). MN growth is the main v2 lever (+2165 net `ready`, +219 `principal`).

**Phase 3 scrape:** skipped — official imports exceeded +200 principal gate. See `cpb-school-outreach/data/mining_snapshots/phase3_skip_decision_v2.txt`. Snapshots: `baseline_v2.txt`, `after_phase1_v2.txt`.

### Insights (2026-05-23)

1. **Official state dirs >> scrape.** MN OrgView (+2170), TX AskTED personnel (2470 processed), **OH OEDS wide export (+605 principal)**, **MA DESE Profiles People Search (+262 principal)**, **MI CEPI EEM (+831 principal, 2448 imported)** delivered net-new principal contacts without website scrape. Bulk smoke **0–8%** on OK/NY/PA/OH/IL remains below the 8% gate; **MA website scrape ~17%** — still prefer Profiles export.
2. **Catalog pages ≠ contact sources.** [NYSED data.nysed.gov school lists](https://data.nysed.gov/lists.php?type=school) and FL PK-12 publications = enrollment/report cards, no principal email. [MA Organization Search](https://profiles.doe.mass.edu/search/search.aspx?leftNavId=11238) same — emails only via **People Search → Principal → Export** (`showEmail=Y`). NY principal emails: [SEDREF COGNOS reports](https://p12.nysed.gov/irs/schoolDirectory/) #28/#30/#31.
3. **Federal CCD layer = catalog, not contacts.** [Urban Education Data Portal](https://educationdata.urban.org/documentation) `schools/ccd/directory/2024` (~102k public schools) and `school-districts/ccd/directory/2024` (~19.6k LEAs) give name, address, phone, NCES/`leaid`, enrollment, FTE — **no email, no website, no superintendent name**. Good for master list + joins; email enrichment stays on state dirs + school/district sites.
4. **Urban API ≠ raw NCES CSV.** Urban harmonized directory omits `WEBSITE`; raw NCES `ccd_sch_*.csv` still needed for scrape-first pools (VA pattern via `prepare_va_nces_pool.py`).
5. **Geo scrape vs official.** VA11a **27%** and CA29a **22%** T+0 bounce (scrape `other`, generic inboxes). **MN50 2%** and **OH50 4%** on official principal dirs — prefer **MA50 / MI50** official tracks over repeat CA/VA scrape volume.
6. **Quarantine at scale.** `apply_tx50_quarantine` must **batch-park** all `ready` (~18k); one PostgREST `update … eq(ready)` leaves thousands of rows and can send outside selection (OH50: 977 stray `ready` before fix).
7. **CAIS pipeline validated private-school path.** Probe → scrape profiles → `--secondary-only` 98 rows → import → `--domains-file` enrich. First parser pass wrote **0 rows** (HTML `li > div.grid` vs `dt/dd`); fixed in second pass. **47% hit, 0 principal** — not send-ready like TX/MN official.
8. **MN OrgView auto-download blocked.** Radware captcha on CSV extract — use HTML export + [`prepare_mn_org_supplement.py`](../cpb-school-outreach/scripts/prepare_mn_org_supplement.py) (SAC, SITE_VER; exclude REC_REQ dupes).
9. **OH OEDS wide-format report.** Operator `20260523_report.csv` (org + `PRINCIPAL EMAIL` columns) differs from person-level DataExtract — `prepare_oh_oeds_principals.py` handles both after 2026-05-23 update.
10. **MA ASP.NET search.** People Search POST requires `__EVENTTARGET=ctl00$ContentPlaceHolder1$peopleOrgBtn`, not button-only submit; HTML results omit emails — use `search_export.aspx?showEmail=Y`.
11. **MI CEPI EEM.** MDE public data URLs 404; operator **EEM Data Report** (full ~6427 rows, filter `LEA`) beats scrape. Filtered **State-only** exports (19 rows, corrections/DHS) yield 0 LEA contacts — wrong file for K–12 mining.

### Next steps (recommended priority)

| P | Action | Why |
|---|--------|-----|
| **P1** | Review Resend `.info` after **200** official geo sends (MN/OH/MA/MI) | All batches 2–4% T+0; domain % before NJ50 or scale |
| **P2** | **NJ50 live** (optional) | 2452 NJ principals prep; not in Mon–Thu stagger |
| **P1** | Re-prep **MA50** only if quarantine reports *No ready contacts in selection* | Adds MN50/OH50 batch excludes |
| **P2** | **NY SEDREF** principal email CSV (#30 or #31) → prep + import | Official NY path; skip data.nysed.gov lists + 0% scrape |
| **P2** | **FL50 prep** (optional): **2272 FL ready** but mostly `other` — role audit before live send | Similar bounce risk to CAIS |
| **P2** | OH OEDS **non-HS** pass (`prepare_oh_oeds_principals.py` without `--high-school-only`) | ~1700 additional principal emails in raw export |
| **P2** | **`download_ccd_schools.py`**: Urban API schools + raw NCES website join on `ncessch` → `import-schools` CSV | Closes address-first workflow; optional expansion |
| **P3** | CA **CA29b** only after role/MX audit — 53 ready but mostly generic; expect bounce risk | Do not treat CAIS 47% hit as send-ready |
| **P3** | `audit_pilot_bounce_domains.py` before each XX50 live | Global run now **~100** domains (TX + VA + MN + OH) |
| **Defer** | Bulk state scrape (OK/NY/PA/OH/MA org search) | Smoke 0–8%; official exports outperform scrape |

### Added

- **Michigan CEPI EEM import (2026-05-23):** `prepare_mi_eem_principals.py`, updated `probe_mi_directory.py` — operator EEM CSV → **2448** `contacts_ready`, MI pool **842/831** principal. Registry `stop` → `active`. Tests: `test_prepare_mi_eem_principals.py`.
- **IL ISBE + gated website scrape (2026-05-23):** `prepare_il_isbe_scrape_pool.py`, `run_il_scrape_smoke.ps1`, `apply_il_scrape_decision.py` — official XLS catalog_only; smoke **2%** → IL stays STOP.
- **MA DESE Profiles official import (2026-05-23):** `download_ma_profiles_principals.py`, `prepare_ma_profiles_principals.py`, `probe_ma_profiles.py` — People Search Principal + `search_export.aspx?showEmail=Y`; **262** HS principal `contacts_ready`. Organization Search (`leftNavId=11238`) is catalog-only for mining.
- **OH OEDS wide-format import (2026-05-23):** operator `20260523_report.csv` → `prepare_oh_oeds_principals.py` (wide + person-level) → **605** HS principal `contacts_ready`.
- **Official-first mining v2 Phase 2 (2026-05-23):** FL private school directory (`download_fl_private_schools.py`, `prepare_fl_private_schools.py`) **2065** ready; FL district scholarship contacts (`prepare_fl_district_contacts.py`) **193** ready; FL pool **2272** / **60** principal. FL probe (`probe_fl_directories.py`) maps [school-choice hub](https://www.fldoe.org/schools/school-choice/directories.stml) + [PK-12 school publications](https://www.fldoe.org/accountability/data-sys/edu-info-accountability-services/pk-12-public-school-data-pubs-reports/school/index.stml) (catalog only). Snapshots: `baseline_v2_phase2.txt`, `after_phase2_v2.txt`.
- **Official-first mining v2 Phase 1 (2026-05-23):** TX personnel + MN OrgView supplement; pool **10411** ready / **7575** principal. See import table above.
- **CAIS California independent schools (2026-05-22–23):** [`prepare_cais_schools_csv.py`](../cpb-school-outreach/scripts/prepare_cais_schools_csv.py), [`probe_cais_schools.py`](../cpb-school-outreach/scripts/probe_cais_schools.py) — [caisca.org/schools](https://www.caisca.org/schools): ~236 profiles; association mailto only (`cais@caisca.org`); `--secondary-only` → **98** schools → `data/state_directories/cais_schools_import.csv`. **98/98 imported**; full enrich (`--domains-file`, worker `cais_full`): **46/98 ready (~47%)**; log `data/mining_snapshots/cais_full_enrich.log`.
- **Urban Institute CCD API exploration (2026-05-23):** live probes — `schools/ccd/directory/2024` (52 fields, ~102k US), `school-districts/ccd/directory/2024` (69 fields, ~19.6k US; MN **582** LEAs, **327** regular `agency_type=1` with schools). [`search_urban_schools.py`](../cpb-school-outreach/scripts/search_urban_schools.py) for client-side name/city search (API has no full-text filter). Bulk CSV: `educationdata.urban.org/csv/ccd/schools_ccd_directory.csv`.

- **Data mining cycle (2026-05-22–23, pre-v2):** MN MDE OrgView REC_REQ (`mn_org_heads.csv`, 471 rows → **509** MN ready, 69 principal); CAIS enrich (+46 CA ready); scrape smoke MN/OK/NY/PA/OH **0–8%** — bulk scrape aborted. Tooling: `mining_inventory.py`, `run_cycle_mining.ps1`, `prepare_tx_askted_personnel.py`, `download_mn_org_heads.py`, `parse_mn_org_heads_html.py`.

**Geo pivot (2026-05-22–25) — TX depleted; official geo on `.info`:**

| Batch | State | Mailed | T+0 sent / bounced | Bounce % | Notes |
|-------|-------|--------|-------------------|----------|--------|
| **VA11a** | VA | 11 | 8 / 3 | 27% | Scrape `other` |
| **CA29a** | CA | 23 | 18 / 5 | 22% | Scrape; generic inboxes |
| **MN50** | MN | 50 | 49 / 1 | **2%** | Official OrgView principals |
| **OH50** | OH | 50 | 48 / 2 | **4%** | Official OEDS principals |
| **MA50** | MA | 50 | 48 / 2 | **4%** | Official DESE Profiles principals |
| **MI50** | MI | 50 | 48 / 2 | **4%** | Official CEPI EEM principals |
| *(cumulative)* | TX50–p | 800 | — | — | Pool depleted |

**1034** total live ids. **XX50 stagger complete** — official geo **2–4%** T+0 across MN/OH/MA/MI.

- **pilot_ca29a live send (2026-05-22):** First **California** batch on `hello@promptanatomy.info`. Quarantine **23/23** CA-only, `daily_cap=23`. API **23** sent (5×5+3 chunks). Scripts: `run_ca29a_prep.ps1`, `run_ca29a_live.ps1`. Results: `cpb-school-outreach/docs/pilot_ca29a_results.md`.
- **pilot_va11a live send (2026-05-22):** First **Virginia** batch on `hello@promptanatomy.info`. NCES import **587** VA schools (`prepare_va_nces_pool.py`); scrape pool ~11 `ready`. Quarantine **11/11** VA-only. API **11** sent (5+5+1). Scripts: `run_va11a_*`. Results: `cpb-school-outreach/docs/pilot_va11a_results.md`.
- **Geo batch tooling:** `prepare_tx50_batch.py --state` (TX default, VA/CA); `apply_tx50_quarantine.py` — `daily_cap` and state guard from `selection.json` (`state`, `count`); `run_va11a_*`, `run_ca29a_*` (CA prep excludes TX50 + VA11a batch ids); `.k12.ca.us` district suffix on prepare.

- **pilot_tx50p live send (2026-05-22):** 50 TX on `hello@promptanatomy.info`; `--all-roles` (43 principal + 7 other). T+0: **50 sent / 0 bounced**, 0 complaints; chunks 8–11 Railway reset. Results: `docs/pilot_tx50p_results.md`; **800** cumulative TX ids; TX selectable pool largely depleted.
- **prepare_tx50_batch `--all-roles`:** include non-principal `role_target` in selection (TX50p+).
- **pilot_tx50o live send (2026-05-22):** 50 TX on `hello@promptanatomy.info`; 14 prior batches (700 ids); `max-per-domain 0`. T+0: **50 sent / 0 bounced**, 0 complaints. Results: `docs/pilot_tx50o_results.md`; **750** cumulative ids.
- **pilot_tx50n live send (2026-05-22):** 50 TX on `hello@promptanatomy.info`; 13 prior batches (650 ids). T+0: **50 sent / 0 bounced**, 0 complaints. Results: `docs/pilot_tx50n_results.md`.
- **pilot_tx50m live send (2026-05-22):** 50 TX on `hello@promptanatomy.info`; 12 prior batches (600 ids). T+0: **46 sent / 4 bounced (8%)**, 0 complaints. Scripts: `run_tx50m_*`, `verify_info_from.ps1`. Results: `docs/pilot_tx50m_results.md`.
- **Sender pivot `promptanatomy.info` (2026-05-22):** After `.ceo` domain bounce **~13.88%** (TX50l collateral + batch), TX50m+ and geo batches use `hello@promptanatomy.info`. Docs: `cpb-school-outreach/docs/promptanatomy_info_sender_gate.md`; scripts `verify_info_from.ps1`, `verify_outreach_from.ps1`.
- **pilot_tx50l live send (2026-05-22):** 50 TX on `hello@promptanatomy.ceo`; **Incident:** leaky quarantine → ~363 non-selection sends; hardened `apply_tx50_quarantine.py`. Selection cohort **47 sent / 3 bounced (6%)**. Results: `docs/pilot_tx50l_results.md`.
- **pilot_tx50k live send (2026-05-22):** 50 TX on `hello@promptanatomy.ceo`; T+0: **47 sent / 3 bounced (6%)**. Results: `docs/pilot_tx50k_results.md`.
- **pilot_tx50j live send (2026-05-22):** 50 TX on `hello@promptanatomy.ceo`; T+0: **47 sent / 3 bounced (6%)**. Results: `docs/pilot_tx50j_results.md`.
- **pilot_tx50i live send (2026-05-22):** Relaxed selection; T+0: **44 sent / 6 bounced (12%)**. Results: `docs/pilot_tx50i_results.md`.
- **pilot_tx50h live send (2026-05-22):** Relaxed selection; T+0: **42 sent / 8 bounced (16%)**. Results: `docs/pilot_tx50h_results.md`.
- **pilot_tx50g live send (2026-05-21):** Strict selection; T+0: **43 sent / 7 bounced (14%)**, sender `promptanatomy.help`. Results: `docs/pilot_tx50g_results.md`.
- **pilot_tx50f live send (2026-05-21):** Strict selection; T+0: **43 sent / 5 bounced / 2 opted_out (10%)**, sender `promptanatomy.help`. Results: `docs/pilot_tx50f_results.md`; `docs/pilot_tx50_resend_review_2026-05-21.md`.
- **pilot_tx50 Resend review (2026-05-21):** Domain **15.31%** bounce on 405 emails; **0** complaints.
- **pilot_tx50e–b live sends (2026-05-19–20):** TX batches; bounce 12–22%. Registry: `docs/pilot_tx50_exclude_domains.txt`.
- **Oklahoma OKCareerGuide ICAP PDF (2026-05-18):** 75 OK ICAP contacts; pool **8312** `ready`.
- **Wisconsin DPI HS import + scrape (2026-05-18):** 506 WI schools; scrape low ROI.
- **pilot_tx50 live send (2026-05-18):** First 50 TX; **11 bounced / 39 sent (22%)**. Results: `docs/pilot_tx50_results.md`.
- Texas AskTED geocoded import (`Schools_2024_to_2025.csv`).
- [docs/outreach_experience_memo_2026-05-17.md](docs/outreach_experience_memo_2026-05-17.md): outreach stack split, acquisition pivot.

### Changed

- **`run_cycle_mining.ps1`:** MI EEM prep + import block when `mi_eem_report*.csv` present; `$env:MINING_REFRESH_MI=1` for operator refresh.
- **`probe_mi_directory.py`:** prefers local `mi_eem_report*.csv` analysis over HTTP probe (MDE landing 404).
- **`config/state_source_registry.json`:** MI `active`; IL `catalog_only` + scrape smoke notes; `MI_MDE_DATA_LANDING` catalog entry.
- **`prepare_oh_oeds_principals.py`:** wide OEDS report format (`PRINCIPAL EMAIL`, `ORGANIZATION NAME`, `GRADE SPAN`) + Excel `="..."` cell cleanup; person-level DataExtract still supported.
- **`run_cycle_mining.ps1` Phase 2:** imports OH OEDS + FL private/district CSVs when present (CSV-present guards).
- **`run_cycle_mining.ps1` v2:** scrape **off by default**; set `MINING_ENABLE_SCRAPE=1` for smoke + limited scrape (`MINING_MAX_SCRAPE_SCHOOLS`, default **200**). Imports MN supplement CSV when present.
- **`download_mn_org_heads.py`:** `--contact-type` for multiple OrgView lists (captcha → use `prepare_mn_org_supplement.py` HTML path).
- **`docs/mining_cycle_runbook.md`:** rewritten for v2 gates, smoke table, STOP list.
- **`data/README.md`:** OH OEDS + FL district contacts + MN supplement procedures.
- **`enrich-contacts`:** new `--domains-file` (CSV `domain` column) — scrape only listed domains; required for CAIS so `--states CA --max-schools 98` does not consume non-CAIS pending (**1249** CA pending vs **98** CAIS).
- **`import_state_directory.py`:** infer `role_target=principal` from secondary-school org names when title is generic (MN REC_REQ rows).
- **Exclude domains file:** **~100** domains after TX + VA/CA + MN50 + OH50 (`alschools.org`, `aurora-schools.org`, `aacs.net`, etc.); run global `audit_pilot_bounce_domains.py` before each XX50 live (not `--tx-only`).
- **`apply_tx50_quarantine.py`:** batched global park (500 fetch / 50-id `pending` updates) — required for ~18k `ready` pool.
- **`restore_pending_pool.py`:** batched 50-id restore; exit loop when only suppressed `pending` remain.
- Collection target **1000** ready contacts; `scripts/run_cycle_1000.ps1`, `scripts/download_tx_askted.py`.
- Marketing sender docs: `promptanatomy.help` (TX50f–g), then `.info` for TX50m+ and geo ([`RESEND_MARKETING_SETUP.md`](../cpb-school-outreach/docs/RESEND_MARKETING_SETUP.md)).

### Fixed

- **`run_phase3_scrape.ps1`:** state ready counts via `scripts/state_ready_count.py` (join through `schools` — `contacts` has no `state` column).
- **`import_supabase.py`:** coerce empty CSV cells (`city`, `zip`, etc.) from pandas `NaN` to `null` before JSON insert (blocked CAIS import).
- **`apply_tx50_quarantine.py`:** batched global park → restore selection-only `ready`; `daily_cap` from selection `count`; state validation from selection `state` (TX/VA/CA/MN/OH/MA/MI/NJ).
- **`_run_xx50_live.ps1`:** PowerShell parse (Unicode dash / smart quotes → ASCII).
- **`restore_pending_pool.py`:** per-row restore caused HTTP/2 timeout; replaced with batched updates + suppressed-pending guard.
- **`prepare_tx50_batch.py` `_select_max_per_domain`:** honors `--max-per-domain N` when N>1.


</details>

---

## Extracted Live and prep sections

## Extracted Live and prep sections

Archived **2026-06-02**; not updated. Canonical rolling metrics: [changelog_outreach.md](../../changelog_outreach.md) live send registry. Per-batch detail: `cpb-school-outreach/docs/pilot_*_results.md`.

---

## Full backup (pre-refactor)

Below: all `### Live —` and prep sections removed from the main changelog.

### Live — NY50w, NJ50ac, OH50ag (2026-06-02, twenty-third session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **251** exclude domains → **260** post-session; `unsendable_ready` **0**; principal `ready` NY **3973** / NJ **1299** / OH **1973** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50w** | 2026052888 | **3818** | **49** | **1** | **0** | **2%** |
| **NJ50ac** | 2026052889 | **928** | **48** | **2** | **0** | **4%** |
| **OH50ag** | 2026052890 | **1193** | **44** | **6** | **0** | **12%** |

**New bounce domains:** `hhh.k12.ny.us`, `rbrhs.org`, `rockboro.org`, `ketteringschools.org`, `mccombschool.org`, `madriverschools.org`, `montgomeryprep.org`, `mosaicclassical.org`, `mississinawa.org`.

**Cumulative geo+TX live ids:** **5915** + **141** = **6056**.

**Ops:** Three single live passes; venv restore between waves. NJ prep pool **928** after exclusions (down from **979** at W22); OH50ag **12%** T+0 — watch next OH wave.

**Scripts:** `run_{ny50w,nj50ac,oh50ag}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50w,nj50ac,oh50ag}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50x** / **NJ50ad** / **OH50ah** / **TX50b** (seeds `2026052891`–`2026052893`; **TX50b** reserved `2026052875`).

### Live — NY50v, NJ50ab, OH50af (2026-06-02, twenty-second session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **250** exclude domains → **251** post-session; `unsendable_ready` **0**; principal `ready` NY **4023** / NJ **1349** / OH **2023** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50v** | 2026052885 | **3868** | **50** | **0** | **0** | **0%** |
| **NJ50ab** | 2026052886 | **979** | **49** | **1** | **0** | **2%** |
| **OH50af** | 2026052887 | **1243** | **50** | **0** | **0** | **0%** |

**New bounce domains:** `pps-nj.us`.

**Cumulative geo+TX live ids:** **5766** + **149** = **5915**.

**Ops:** Three single live passes; venv restore between waves. NJ prep pool **979** after exclusions (down from **1029** at W21) — monitor.

**Scripts:** `run_{ny50v,nj50ab,oh50af}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50v,nj50ab,oh50af}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50w** / **NJ50ac** / **OH50ag** / **TX50b** (seeds `2026052888`–`2026052890`; **TX50b** reserved `2026052875`).

### Live — NY50u, NJ50aa, OH50ae (2026-06-02, twenty-first session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **249** exclude domains → **250** post-session; `unsendable_ready` **0**; principal `ready` NY **4073** / NJ **1399** / OH **2073** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50u** | 2026052882 | **3918** | **50** | **0** | **0** | **0%** |
| **NJ50aa** | 2026052883 | **1029** | **50** | **0** | **0** | **0%** |
| **OH50ae** | 2026052884 | **1294** | **49** | **1** | **0** | **2%** |

**New bounce domains:** `mansfieldschools.org`.

**Cumulative geo+TX live ids:** **5617** + **149** = **5766**.

**Ops:** Three single live passes; venv restore between waves. **NJ50aa** = first post-z NJ slug (after NJ50z).

**Scripts:** `run_{ny50u,nj50aa,oh50ae}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50u,nj50aa,oh50ae}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50v** / **NJ50ab** / **OH50af** / **TX50b** (seeds `2026052885`–`2026052887`; **TX50b** reserved `2026052875`).

### Live — NY50t, NJ50z, OH50ad (2026-06-02, twentieth session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **246** exclude domains → **249** post-session; `unsendable_ready` **0**; principal `ready` NY **4123** / NJ **1449** / OH **2123** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50t** | 2026052879 | **3968** | **50** | **0** | **0** | **0%** |
| **NJ50z** | 2026052880 | **1082** | **49** | **1** | **0** | **2%** |
| **OH50ad** | 2026052881 | **1345** | **48** | **2** | **0** | **4%** |

**New bounce domains:** `cliftonschools.net`, `lumpk.com`, `loraincsd.org`.

**Cumulative geo+TX live ids:** **5470** + **147** = **5617**.

**Ops:** Three single live passes; venv restore between waves. **NJ50z** = last single-letter NJ slug; next NJ batch **`nj50aa`**.

**Scripts:** `run_{ny50t,nj50z,oh50ad}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50t,nj50z,oh50ad}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50u** / **NJ50aa** / **OH50ae** / **TX50b** (seeds `2026052882`–`2026052884`; **TX50b** reserved `2026052875`).

### Live — NY50s, NJ50y, OH50ac (2026-06-02, nineteenth session, `.blog`, **TX paused**)

**TX50b still deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **243** exclude domains → **246** post-session; `unsendable_ready` **0**; principal `ready` NY **4173** / NJ **1499** / OH **2173** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50s** | 2026052876 | **4020** | **48** | **2** | **0** | **4%** |
| **NJ50y** | 2026052877 | **1132** | **50** | **0** | **0** | **0%** |
| **OH50ac** | 2026052878 | **1395** | **49** | **0** | **1** | **0%** |

**New bounce domains:** `cppasd.com`, `g.dunkirkcsd.org` (+1 async to **246** total exclude domains).

**Cumulative geo+TX live ids:** **5323** + **147** = **5470**.

**Ops:** Three single live passes; venv restore between waves.

**Scripts:** `run_{ny50s,nj50y,oh50ac}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50s,nj50y,oh50ac}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50t** / **NJ50z** / **OH50ad** / **TX50b** (seeds `2026052879`–`2026052881`; **TX50b** reserved `2026052875`).

### Live — NY50r, NJ50x, OH50ab (2026-06-01, eighteenth session, `.blog`, **TX skipped**)

**TX50b deferred** — W17 TX50a T+0 bounce **14%**; no Texas send this session. Seed **`2026052875`** reserved for **TX50b** when resumed.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **240** exclude domains → **243** post-session; `unsendable_ready` **0**; principal `ready` NY **4223** / NJ **1549** / OH **2223** / TX **8113**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50r** | 2026052872 | **4070** | **50** | **0** | **0** | **0%** |
| **NJ50x** | 2026052873 | **1188** | **49** | **1** | **0** | **2%** |
| **OH50ab** | 2026052874 | **1451** | **48** | **2** | **0** | **4%** |

**New bounce domains:** `eastorange.k12.nj.us`, `kentschools.net`, `laca.org`.

**Cumulative geo+TX live ids:** **5176** + **147** = **5323**.

**Ops:** Three single live passes; venv restore between waves.

**Scripts:** `run_{ny50r,nj50x,oh50ab}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50r,nj50x,oh50ab}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50s** / **NJ50y** / **OH50ac** / **TX50b** (seeds `2026052876`–`2026052878`; **TX50b** reserved `2026052875`).

### Live — NY50q, NJ50w, OH50aa, TX50a (2026-06-01, seventeenth session, `.blog`)

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **230** exclude domains → **240** post-session; `unsendable_ready` **0**; principal `ready` NY **4273** / NJ **1599** / OH **2273** / TX **8163**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50q** | 2026052868 | **4120** | **49** | **1** | **0** | **2%** |
| **NJ50w** | 2026052869 | **1241** | **49** | **1** | **0** | **2%** |
| **OH50aa** | 2026052870 | **1502** | **48** | **1** | **1** | **2%** |
| **TX50a** | 2026052871 | **5548** | **42** | **7** | **1** | **14%** |

**New bounce domains:** `fingerlakeschristianschool.com`, `longbranch.k12.nj.us`, `gallialocal.org`, `caddomillsisd.org`, `calcoisd.org`, `ccisd.com`, `chinaspringisd.net`, `chisddevils.com`, `comancheisd.net`, `clydeisd.org`.

**Cumulative geo+TX live ids:** **4988** + **188** = **5176**.

**Ops:** All four single live pass; venv restore between waves. **OH50aa** = first post-z slug (OH a–z exhausted). **TX50a** = backward-fill of missing `tx50a` slot.

**Scripts:** `run_{ny50q,nj50w,oh50aa,tx50a}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50q,nj50w,oh50aa,tx50a}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50r** / **NJ50x** / **OH50ab** / **TX50b** (seeds `2026052872`–`2026052875`).

### Live — NY50p, NJ50v, OH50z, TX50z (2026-06-01, sixteenth session, `.blog`)

**First geo wave on `hello@promptanatomy.blog`** with **personal `pilot_50` copy** (California / I'm Tomas). Deploy `1f400a7` + Railway rebuild; preflight self-test confirmed before live.

Sender: **`hello@promptanatomy.blog`**. Preflight (`run_geo_wave_preflight.ps1`): **225** exclude domains → **230** post-session; `unsendable_ready` **0**; principal `ready` NY **4323** / NJ **1649** / OH **2323** / TX **8213**; `verify_blog_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50p** | 2026052864 | **4170** | **48** | **1** | **1** | **2%** |
| **NJ50v** | 2026052865 | **1298** | **49** | **1** | **0** | **2%** |
| **OH50z** | 2026052866 | **1553** | **49** | **1** | **0** | **2%** |
| **TX50z** | 2026052867 | **5601** | **48** | **1** | **1** | **2%** |

**New bounce domains:** `cornwallschools.com`, `monroe.k12.nj.us`, `horizondayton.org`, `chapelhillisd.org`.

**Cumulative geo+TX live ids:** **4794** + **194** = **4988**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50p,nj50v,oh50z,tx50z}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50p,nj50v,oh50z,tx50z}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** **NY50r** / **NJ50x** / **OH50ab** / **TX50b** (seeds `2026052872`–`2026052875`).

### Live — NY50o, NJ50u, OH50y, TX50y (2026-06-01, fifteenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **216** exclude domains → **225** post-session; `unsendable_ready` **0**; principal `ready` NY **4373** / NJ **1699** / OH **2373** / TX **8263**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50o** | 2026052860 | **4220** | **48** | **2** | **0** | **4%** |
| **NJ50u** | 2026052861 | **1359** | **45** | **5** | **0** | **10%** |
| **OH50y** | 2026052862 | **1603** | **50** | **0** | **0** | **0%** |
| **TX50y** | 2026052863 | **5654** | **47** | **2** | **1** | **4%** |

**New bounce domains:** `cohoes.org`, `eastharlemscholars.org`, `kinnelon.org`, `irvington.k12.nj.us`, `bloomfield.k12.nj.us`, `manvillesd.org`, `millstone.k12.nj.us`, `brenhamk-12.net`, `cantonisd.com`.

**Cumulative geo+TX live ids:** **4604** + **190** = **4794**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50o,nj50u,oh50y,tx50y}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50o,nj50u,oh50y,tx50y}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see sixteenth session above).*

### Live — NY50n, NJ50t, OH50x, TX50x (2026-05-29, fourteenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **209** exclude domains → **215** post-session; `unsendable_ready` **0**; principal `ready` NY **4423** / NJ **1749** / OH **2424** / TX **8313**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50n** | 2026052856 | **4270** | **49** | **0** | **1** | **0%** |
| **NJ50t** | 2026052857 | **1413** | **49** | **1** | **0** | **2%** |
| **OH50x** | 2026052858 | **1656** | **49** | **1** | **0** | **2%** |
| **TX50x** | 2026052859 | **5720** | **46** | **3** | **1** | **6%** |

**New bounce domains:** `jacksonsd.org`, `fpls.us`, `boerneisd.net`, `brookesmithisd.net`, `celinaisd.com`.

**Cumulative geo+TX live ids:** **4411** + **193** = **4604**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50n,nj50t,oh50x,tx50x}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50n,nj50t,oh50x,tx50x}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see fifteenth session above).*

### Live — NY50m, NJ50s, OH50w, TX50w (2026-05-29, thirteenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **205** exclude domains → **209** post-session; `unsendable_ready` **0**; principal `ready` NY **4473** / NJ **1799** / OH **2474** / TX **8363**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live. **TX50w** completes deferred send from Wave 12 geo-only session.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50m** | 2026052852 | **4323** | **48** | **1** | **1** | **2%** |
| **NJ50s** | 2026052853 | **1463** | **50** | **0** | **0** | **0%** |
| **OH50w** | 2026052854 | **1708** | **47** | **2** | **1** | **4%** |
| **TX50w** | 2026052855 | **5770** | **48** | **1** | **1** | **2%** |

**New bounce domains:** `clarenceschools.org`, `fairland.k12.oh.us`, `fortrecoveryschools.org`, `ccaisd.net`.

**Cumulative geo+TX live ids:** **4218** + **193** = **4411**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50m,nj50s,oh50w,tx50w}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50m,nj50s,oh50w,tx50w}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see fourteenth session above).*

### Live — NY50l, NJ50r, OH50v (2026-05-29, twelfth session, geo-only, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **200** exclude domains → **205** post-session; `unsendable_ready` **0**; principal `ready` NY **4523** / NJ **1849** / OH **2524** / TX **8363** (TX not sent — **TX50w deferred**, seed `2026052852`). Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50l** | 2026052849 | **4373** | **47** | **2** | **1** | **4%** |
| **NJ50r** | 2026052850 | **1513** | **49** | **1** | **0** | **2%** |
| **OH50v** | 2026052851 | **1768** | **48** | **2** | **0** | **4%** |

**New bounce domains:** `chowc.org`, `clearviewschool.org`, `hackettstown.org`, `cpsboe.k12.oh.us`, `empoweredaaedu.org`.

**Cumulative geo+TX live ids:** **4074** + **144** = **4218**.

**Ops:** All three single live pass; venv restore between waves.

**Scripts:** `run_{ny50l,nj50r,oh50v}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50l,nj50r,oh50v}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see thirteenth session above).*

### Live — NY50k, NJ50q, OH50u, TX50v (2026-05-28, eleventh session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **193** exclude domains → **199** post-session; `unsendable_ready` **0**; principal `ready` NY **4573** / NJ **1899** / OH **2574** / TX **8413**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (`.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50k** | 2026052845 | **4423** | **50** | **0** | **0** | **0%** |
| **NJ50q** | 2026052846 | **1564** | **49** | **1** | **0** | **2%** |
| **OH50u** | 2026052847 | **1818** | **49** | **1** | **0** | **2%** |
| **TX50v** | 2026052848 | **5825** | **46** | **4** | **0** | **8%** |

**New bounce domains:** `hcstonline.org`, `dmcschool.com`, `bisd-tx.org`, `argyleisd.com`, `basised.com`, `bridgeportisd.net`.

**Cumulative geo+TX live ids:** **3880** + **194** = **4074**.

**Ops:** All four single live pass; venv restore between waves.

**Scripts:** `run_{ny50k,nj50q,oh50u,tx50v}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50k,nj50q,oh50u,tx50v}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see twelfth session above).*

### Live — NY50j, NJ50p, OH50t, TX50u (2026-05-28, tenth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **188** exclude domains → **193** post-session; `unsendable_ready` **0**; principal `ready` NY **4623** / NJ **1949** / OH **2624** / TX **8463**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves (use `.venv\Scripts\python.exe`); **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50j** | 2026052841 | **4473** | **50** | **0** | **0** | **0%** |
| **NJ50p** | 2026052842 | **1614** | **49** | **0** | **1** | **0%** |
| **OH50t** | 2026052843 | **1871** | **47** | **3** | **0** | **6%** |
| **TX50u** | 2026052844 | **5880** | **47** | **2** | **1** | **4%** |

**New bounce domains:** `copley-fairlawn.org`, `clsdraiders.org`, `delphoscityschools.org`, `bonhamisd.org`, `brisd.net`.

**Cumulative geo+TX live ids:** **3687** + **193** = **3880**.

**Ops:** **NJ50p** first live attempt skipped restore (system `python`); retry after `.venv` restore succeeded. NY/OH/TX single pass.

**Scripts:** `run_{ny50j,nj50p,oh50t,tx50u}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50j,nj50p,oh50t,tx50u}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see eleventh session above).*

### Live — NY50i, NJ50o, OH50s, TX50t (2026-05-28, ninth session, `.cloud`, post–Wave 8 harness)

Sender: **`hello@promptanatomy.cloud`**. Preflight (`run_geo_wave_preflight.ps1`): **178** exclude domains → **188** post-session; `unsendable_ready` **0**; principal `ready` NY **4673** / NJ **1999** / OH **2674** / TX **8513**; `verify_cloud_from` + copy assert OK. Full `restore_pending_pool` between waves; **`assert_batch_cohort.py`** after each live.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50i** | 2026052837 | **4524** | **47** | **3** | **0** | **6%** |
| **NJ50o** | 2026052838 | **1664** | **49** | **0** | **1** | **0%** |
| **OH50s** | 2026052839 | **1937** | **47** | **3** | **0** | **6%** |
| **TX50t** | 2026052840 | **5934** | **45** | **4** | **1** | **8%** |

**New bounce domains:** `brewsterschools.org`, `bronxarts.net`, `brillacollegeprep.org`, `chca-oh.org`, `chuh.org`, `centerville.k12.oh.us`, `banqueteisd.net`, `annaisd.org`, `bigsandyisd.org`, `blumisd.net`.

**Cumulative geo+TX live ids:** **3499** + **188** = **3687**.

**Ops:** **NY50i** second live pass after first chunk `curl` line-continuation failure (0 sent); NJ/OH/TX single pass. Chunk script + `verify_outreach_from.ps1` + preflight ASCII fixes applied this session.

**Scripts:** `run_{ny50i,nj50o,oh50s,tx50t}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50i,nj50o,oh50s,tx50t}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see tenth session above).*

### Live — NY50h, NJ50n, OH50r, TX50s (2026-05-28, eighth session, `.cloud`, new `pilot_50` copy)

**First live cohort on updated template** ([`templates/pilot_50.html`](../cpb-school-outreach/templates/pilot_50.html)): no California opener; lesson/quiz/homework value line; **No student names on our site**. Deployed via outreach repo push `f592c27` + Railway rebuild; `verify_cloud_from` self-test HTML confirmed before live.

Sender: **`hello@promptanatomy.cloud`**. Preflight: **171** exclude domains → **178** post-session; `unsendable_ready` **0**; principal `ready` NY **4723** / NJ **2049** / OH **2724** / TX **8563**. Full `restore_pending_pool` between waves.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50h** | 2026052833 | **4575** | **48** | **1** | **1** | **2%** |
| **NJ50n** | 2026052834 | **1728** | **47** | **3** | **0** | **6%** |
| **OH50r** | 2026052835 | **1989** | **50** | **0** | **0** | **0%** |
| **TX50s** | 2026052836 | **5988** | **47** | **2** | **1** | **4%** |

**New bounce domains:** `bkwschools.org`, `brrsd.k12.nj.us`, `carteretschools.org`, `frsd.us`, `alvordisd.net`, `baycityisd.org`.

**Cumulative geo+TX live ids:** **3307** + **192** = **3499**.

**Ops:** **OH50r** needed **second live pass** after chunks 7–8 `curl` connection reset (48 sent + 2 ready → 50 sent). NJ/TX/NY single pass.

**Scripts:** `run_{ny50h,nj50n,oh50r,tx50s}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50h,nj50n,oh50r,tx50s}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see ninth session above).*

### Live — NY50g, NJ50m, OH50q, TX50r (2026-05-28, seventh session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: **164** exclude domains → **171** post-session; `verify_cloud_from` OK. Full `restore_pending_pool` between waves; **single live pass** per batch (10-chunk sender).

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50g** | 2026052829 | **4633** | **48** | **1** | **1** | **2%** |
| **NJ50m** | 2026052830 | **1778** | **50** | **0** | **0** | **0%** |
| **OH50q** | 2026052831 | **2039** | **48** | **2** | **0** | **4%** |
| **TX50r** | 2026052832 | **6047** | **45** | **4** | **1** | **8%** |

**New bounce domains:** `binghamtonschools.org`, `accelschools.com`, `cantoncollegeprep.org`, `acaedu.net`, `albany.esc14.net`, `alvinisd.net`, `axtellisd.net`.

**Cumulative geo+TX live ids:** **3116** + **191** = **3307**.

**Scripts:** `run_{ny50g,nj50m,oh50q,tx50r}_{prep,live}.ps1`.

**Results:** `cpb-school-outreach/docs/pilot_{ny50g,nj50m,oh50q,tx50r}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`.

**Next prep/live:** *(completed — see eighth session above).*

### Live — NY50f, NJ50l, OH50p, TX50q (2026-05-28, sixth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`** (all four batches, including first post–AskTED TX on `.cloud`). Preflight: **158** exclude domains → **163** post-session; `verify_cloud_from` OK. Full `restore_pending_pool` between waves.

| Batch | Seed | Prep after excl. | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % |
|-------|-----:|-----------------:|---------:|------------:|--------------:|-------------:|
| **NY50f** | 2026052825 | **4683** | **48** | **0** | **2** | **0%** |
| **NJ50l** | 2026052826 | **1829** | **50** | **0** | **0** | **0%** |
| **OH50p** | 2026052827 | **2090** | **50** | **0** | **0** | **0%** |
| **TX50q** | 2026052828 | **2520** | **47** | **2** | **1** | **4%** |

**TX50q bounce domains:** `avalonisd.net`, `awesomenet.net`.

**Cumulative geo+TX live ids:** **2921** + **195** = **3116**.

**Ops:** NY50f / NJ50l needed **second live pass** after first pass left partial cohort (legacy `run_tx50f_send_chunks.ps1` ran 12×5; capped to **10** chunks + break on `attempted=0` / `sent=0`). TX MX backfill via `reconcile_tx_askted_directory.py` (no `--skip-mx`) before prep.

**Scripts:** `run_{ny50f,nj50l,oh50p,tx50q}_{prep,live}.ps1`; `_run_pilot_slug_prep.ps1` extended for **TX**.

**Results:** `cpb-school-outreach/docs/pilot_{ny50f,nj50l,oh50p,tx50q}_results.md`.

**Current:** Campaign `pilot_50` **paused** / `dry_run=true`. Principal `ready` (post-restore): re-run `state_ready_count.py --principal`.

**Next prep/live:** *(completed — see seventh session above).*

### Live — NY50e, NJ50k, OH50o (2026-05-28, fifth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `audit_pilot_bounce_domains` → **153** exclude domains; `verify_cloud_from` OK; principal `ready` NY **4873** / NJ **2199** / OH **2874**. Full restore between waves; **wait for `restore_pending_pool` to finish** before each live.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50e** | 50 | **49** | **1** | **0** | **2%** | NY **4823** |
| **NJ50k** | 50 | **48** | **2** | **0** | **4%** | NJ **2149** |
| **OH50o** | 50 | **48** | **2** | **0** | **4%** | OH **2824** |

**New bounce domains (T+0):** `3villagecsd.org`, `boontonschools.org`, `bridgeton.k12.nj.us`, `ashlandcityschools.org`, `barbertonschools.org`.

**Cumulative geo live ids:** **2776** + **145** sent = **2921**.

**Results stubs:** `cpb-school-outreach/docs/pilot_{ny50e,nj50k,oh50o}_results.md`.

### Geo batch wave prep — NY50e, NJ50k, OH50o (2026-05-27)

Preflight: `audit_pilot_bounce_domains.py` → **153** exclude domains (incl. session-4 bounces); **0** unsendable ready; principal `ready` NY **4873** / NJ **2199** / OH **2874** (paginated `state_ready_count`).

**Prep fix:** `prepare_tx50_batch.py` + `state_ready_count.py` — paginated state school fetch (Supabase **1000**-row cap had under-counted OH/NY pools; mirrors session-4 quarantine fix).

| Batch | Script | Seed | Count | QA grades | Pool after exclusions |
|-------|--------|-----:|------:|-----------|----------------------:|
| **NY50e** | `run_ny50e_prep.ps1` | `2026052822` | **50** | 50 C (1 `domain_ok`) | **4740** |
| **NJ50k** | `run_nj50k_prep.ps1` | `2026052823` | **50** | 50 C (10 `domain_ok`) | **1887** |
| **OH50o** | `run_oh50o_prep.ps1` | `2026052824` | **50** | 50 C (3 `domain_ok`) | **2142** |

Outputs: `docs/pilot_{ny50e,nj50k,oh50o}_batch/selection.json` (+ quarantine/restore SQL). Prep auto-excluded **62** prior `pilot_*_batch/selection.json` files (**2898** prior ids).

**Scripts added:** `run_ny50e_{prep,live}.ps1`, `run_nj50k_{prep,live}.ps1`, `run_oh50o_{prep,live}.ps1`.

**Sent** in session 5 (2026-05-28).

### Live — NY50c, NJ50i, OH50m, NY50d, NJ50j, OH50n (2026-05-27, fourth session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `audit_pilot_bounce_domains` → **147** exclude domains; `verify_cloud_from` OK; principal `ready` **20 322** global. Full restore between waves; **wait for `restore_pending_pool` to finish** before each live.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50c** | 50 | **48** | **1** | **1** | **2%** | NY **411** |
| **NJ50i** | 50 | **48** | **2** | **0** | **4%** | NJ **504** |
| **OH50m** | 50 | **49** | **0** | **1** | **0%** | OH **663** |
| **NY50d** | 50 | **49** | **1** | **0** | **2%** | NY **411** |
| **NJ50j** | 50 | **50** | **0** | **0** | **0%** | NJ **504** |
| **OH50n** | 50 | **48** | **2** | **0** | **4%** | OH **663** |

**New bounce domains (T+0):** `hauppauge.k12.ny.us`, `gloucestertownshipschools.org`, `rpsnj.us`, `islipufsd.org`, `daytonpublic.com`, `crestviewknights.com`.

**Cumulative geo live ids:** **2484** + **292** sent = **2776**.

**Ops fix:** `apply_tx50_quarantine.py` — paginated `_fetch_state_school_ids` (Supabase default **1000**-row cap broke OH50m first attempt with **3213** OH schools).

**Results stubs:** `cpb-school-outreach/docs/pilot_{ny50c,nj50i,oh50m,ny50d,nj50j,oh50n}_results.md`.

### Pool refresh + NJ50j / OH50n prep (2026-05-27)

**NJ Homeroom re-import:** operator `NJPubSchool.csv` → `run_nj_homeroom_refresh.ps1` (2459 prep rows). Principal `ready` **227 → 618**.

**OH OEDS re-import:** all-grades + **org-email fallback** when `PRINCIPAL EMAIL` missing (`prepare_oh_oeds_principals.py` patch; **2268 → 3098** prep rows). `run_oh_oeds_refresh.ps1`.

| Batch | Script | Seed | Count | QA | After exclusions |
|-------|--------|-----:|------:|:---|-----------------:|
| **NJ50j** | `run_nj50j_prep.ps1` | `2026052820` | **50** | 50 C (10 `domain_ok`) | **192** |
| **OH50n** | `run_oh50n_prep.ps1` | `2026052821` | **50** | pass | **97** |

Outputs: `docs/pilot_{nj50j,oh50n}_batch/selection.json`. **Sent** in session 4 (2026-05-27).

**Ops note:** `import-state-directory` upsert sets `outreach_status=ready` on existing emails — may temporarily inflate `ready` counts for previously `sent` contacts; batch prep still excludes prior `pilot_*_batch` ids.

### Geo batch wave prep — NY50d (2026-05-27)

| Batch | Script | Seed | Count | QA grades | Pool after exclusions |
|-------|--------|-----:|------:|-----------|----------------------:|
| **NY50d** | `run_ny50d_prep.ps1` | `2026052819` | **50** | 16 B / 34 C | **455** |

Output: `docs/pilot_ny50d_batch/selection.json`. **Scripts:** `run_ny50d_{prep,live}.ps1`. **Sent** in session 4 (2026-05-27).

### Geo batch wave prep — NY50c, NJ50i, OH50m (2026-05-27)

Preflight: `audit_pilot_bounce_domains.py` → **147** exclude domains (incl. session-3 bounces `falconerschools.org`, `rih.org`, `readingschools.org`); **0** unsendable ready; principal `ready` NY **511** / NJ **227** / OH **600**.

| Batch | Script | Seed | Count | QA grades | Pool after exclusions |
|-------|--------|-----:|------:|-----------|----------------------:|
| **NY50c** | `run_ny50c_prep.ps1` | `2026052816` | **50** | 21 B / 29 C | **505** |
| **NJ50i** | `run_nj50i_prep.ps1` | `2026052817` | **50** | 2 B / 48 C | **240** |
| **OH50m** | `run_oh50m_prep.ps1` | `2026052818` | **50** | 50 C (7 `domain_ok`) | **124** |

Outputs: `docs/pilot_{ny50c,nj50i,oh50m}_batch/selection.json` (+ quarantine/restore SQL). Prep auto-excluded **57** prior `pilot_*_batch/selection.json` files (**2599** prior ids through latest NJ50i prep re-check).

**Scripts added:** `run_ny50c_{prep,live}.ps1`, `run_nj50i_{prep,live}.ps1`, `run_oh50m_{prep,live}.ps1`.

**Operator notes:** OH50m leaves only **124** OH principals after exclusions — likely **last full OH50 wave** unless OEDS re-import. NJ after exclusions **240** (principal `ready` **227** in DB today — prep pool **284**). Recommended live stagger: full `restore_pending_pool.py` between waves; stop if T+0 bounce **≥15%** or complaints **≥1**.

**Not sent** → **sent** in session 4 (2026-05-27).

### Live — NY50b, NJ50h, OH50l (2026-05-27, third session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `verify_cloud_from` OK; full restore between waves before each live. **Wait for `restore_pending_pool` to finish** before the next wave.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50b** | 50 | **49** | **1** | **0** | **2%** | NY **511** |
| **NJ50h** | 50 | **48** | **1** | **1** | **2%** | NJ **227** |
| **OH50l** | 50 | **49** | **1** | **0** | **2%** | OH **600** |

**New bounce domains (T+0):** `falconerschools.org`, `rih.org`, `readingschools.org`.

**Cumulative geo live ids:** **2338** + **NY50b 49** + **NJ50h 48** + **OH50l 49** = **2484**.

**Results stubs:** `cpb-school-outreach/docs/pilot_ny50b_results.md`, `pilot_nj50h_results.md`, `pilot_oh50l_results.md`.

### Live — NY50a, NJ50g, OH50k (2026-05-27, second session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `verify_cloud_from` OK, **142** exclude domains (+NJ50f bounces), **0** unsendable ready. **Wait for `restore_pending_pool` to finish** before next wave.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50a** | 50 | **49** | **0** | **1** | **0%** | NY **561** |
| **NJ50g** | 50 | **48** | **2** | **0** | **4%** | NJ **277** |
| **OH50k** | 50 | **50** | **0** | **0** | **0%** | OH **650** |

**NJ50g bounce domains (new T+0):** `flboe.com`, `princetonk12.org`.

**Cumulative geo live ids:** **2191** + **NY50a 49** + **NJ50g 48** + **OH50k 50** = **2338**.

**Results stubs:** `pilot_ny50a_results.md`, `pilot_nj50g_results.md`, `pilot_oh50k_results.md`.

### Live — NY50, NJ50f, OH50j (2026-05-27, one session, `.cloud`)

Sender: **`hello@promptanatomy.cloud`**. Preflight: `verify_cloud_from` OK, **133** exclude domains, **0** unsendable ready.

| Batch | Selection | T+0 sent | T+0 bounced | T+0 opted_out | T+0 bounce % | Post-restore principal `ready` |
|-------|----------:|---------:|------------:|--------------:|-------------:|-------------------------------:|
| **NY50** | 50 | **49** | **0** | **1** | **0%** | NY **611** |
| **NJ50f** | 50 | **46** | **3** | **1** | **6%** | NJ **327** |
| **OH50j** | 50 | **50** | **0** | **0** | **0%** | OH **700** |

**NJ50f bounce domains (new T+0):** `gtps.k12.nj.us`, `htsd.us`, `njsbjc.org`.

**OH50j operator note:** First live attempt started while NJ50f `restore_pending_pool` was still running (~132k rows) — quarantine only **5/50** selection `ready`; batch status showed all **50** still `ready` (no OH50j sends). **Re-run succeeded** (50/50 quarantine, **50 sent**). Review `send_log` ~07:08–07:16 UTC for any stray sends from the failed attempt before counting domain metrics.

**Cumulative geo live ids:** **2046** + **NY50 49** + **NJ50f 46** + **OH50j 50** = **2191** (opted_out/bounced still count as attempted selection ids).

**Results stubs:** `cpb-school-outreach/docs/pilot_ny50_results.md`, `pilot_nj50f_results.md`, `pilot_oh50j_results.md`.

**Prior next line:** Geo batch wave prep — NY50 / NJ50f / OH50j ready for `.cloud` live.
- Operator **Active Institutions + CEO Info** CSV (COGNOS; not #30/#31 OAM) → `ny_sedref_raw.csv`
- Prep **5165** public principals → import **5062** `contacts_ready` (102 skipped: private/no_mx/invalid)
- Charter **Dir Ops** HS supplement: **82** prep → **80** `contacts_ready` (2× `no_mx`); **0** email overlap with public CEO export
- NY pool: **661** principal `ready`, **722** all-role `ready` (+10 principal from charter vs public-only)
- Registry **NY** → `active`; `prepare_ny_sedref_principals.py` — CEO columns + `--supplement` / `--supplement-only`

**Next:** **MA50e** hold; **MN50b** deferred; **MI50c** hold.

### Geo batch wave — preflight + prep (2026-05-27)

**Preflight** (`audit_unsendable_contacts`, `audit_pilot_bounce_domains`, `state_ready_count --principal`):

| State | Principal `ready` | Batch prep | Count | Notes |
|-------|------------------:|------------|------:|-------|
| NY | **661** | **NY50** | **50** | Greenfield; seed `2026052750`; QA 39/50 A/B or domain_ok C |
| NJ | **378** | **NJ50f** | **50** | seed `2026052727`; 397 after exclusions |
| OH | **761** | **OH50j** | **50** | seed `2026052728`; 274 after exclusions |
| MA | **252** | **MA50e** | **2** | Re-import done; **2** batch-eligible — hold live |
| MN | **48** | — | — | **MN50b deferred** — REC_REQ refresh blocked (Radware captcha) |
| MI | **681** | — | — | **MI50c HOLD** — MI50a/b **10%** T+0 bounce; `audit_mi_pilot_gate.py` |

Global: **24 616** `ready`, **19 458** principal `ready`, **0** unsendable ready, **133** exclude domains.

**Scripts added:** `run_ny50_live.ps1`, `run_nj50f_{prep,live}.ps1`, `run_oh50j_{prep,live}.ps1`, `run_ma50e_{prep,live}.ps1`, `audit_mi_pilot_gate.py`, **`analyze_ma_profiles_coverage.py`**.

**Recommended stagger (`.cloud`, 2/day max):** NY50 → NJ50f → OH50j → MA50e (partial or re-import first). Between live waves: `restore_pending_pool.py`, pause campaign, log T+0 here.

**Prior next line:** `run_ny50_prep.ps1` → NY50 live on `.cloud` when approved; optional OH/NJ waves.

**Prior (post–mining v4, 2026-05-27):** Pool **~19,474** `ready`; **14,318** principal `ready` after OH all-grades + MA refresh. NY blocked on operator CSV — **unblocked** same day.

**Mining v4 completed:**
- OH OEDS **all-grades** pass: **2174** `contacts_ready` (OH principal **761** batch-eligible after live waves)
- MA DESE Profiles **re-import**: **249** `contacts_ready` (MA principal **250**)
- NY SEDREF: **imported** via CEO CSV + charter supplement (see below); COGNOS #30/#31 still valid alternate source
- GA: `probe_ga_directory.py`, `prepare_ga_principals.py` added; address CSV **catalog_only**
- VA gap-fill smoke 100: **0%** hit rate — **STOP** bulk scrape
- Send hygiene: `audit_pilot_bounce_domains.py` → **133** exclude domains; **0** unsendable ready

**Prior (post–NJ50e):** Post-stagger pool **17 167** `ready`. **MA pool drained** — restored via DESE re-import 2026-05-27.

### OH50i + NJ50e prep (2026-05-26)

Tenth OH / fifth NJ wave after OH50h/NJ50d. Exclude file **132** domains; **43** batch files in exclude glob (OH50i prep used 42; NJ50e **1996** prior ids).

**Preflight:** `audit_unsendable_contacts.py --apply` → **0** applied; global **17 267** `ready`; OH **155**, NJ **428** principal `ready` (`state_ready_count.py`).

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50i** | [`pilot_oh50i_batch`](../cpb-school-outreach/docs/pilot_oh50i_batch/) | 2026052625 | 50 | PASS | 2/50 |
| **NJ50e** | [`pilot_nj50e_batch`](../cpb-school-outreach/docs/pilot_nj50e_batch/) | 2026052626 | 50 | PASS | 17/50 (1× B) |

**Scripts:** `_run_xx50i_prep.ps1`, `run_{oh50i,nj50e}_{prep,live}.ps1`. **Live:** complete — see above.

### OH50h + NJ50d prep (2026-05-26)

Ninth OH / fourth NJ wave after OH50g/NJ50c. Exclude file **132** domains (includes `haddonfield.k12.nj.us` from NJ50c); **41** batch files in exclude glob (OH50h prep used 40; NJ50d **1896** prior ids).

**Preflight:** `audit_unsendable_contacts.py --apply` → **0** applied; global **17 367** `ready`; OH **205**, NJ **478** principal `ready` (`state_ready_count.py`).

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50h** | [`pilot_oh50h_batch`](../cpb-school-outreach/docs/pilot_oh50h_batch/) | 2026052623 | 50 | PASS | 6/50 |
| **NJ50d** | [`pilot_nj50d_batch`](../cpb-school-outreach/docs/pilot_nj50d_batch/) | 2026052624 | 50 | PASS | 14/50 (1× B) |

**Scripts:** `_run_xx50h_prep.ps1`, `run_{oh50h,nj50d}_{prep,live}.ps1`; NJ prep via `_run_pilot_slug_prep.ps1`. Runbooks: OH50h / NJ50d sections. **Live:** complete — see above.

### OH50g + NJ50c prep (2026-05-26)

Eighth OH / third NJ wave after OH50f/NJ50b. Exclude file **131** domains; **39** batch files in exclude glob (OH50g prep used 38; NJ50c **1796** prior ids).

**Preflight:** `audit_unsendable_contacts.py --apply` → **0** applied; global **17 467** `ready`; OH **255**, NJ **528** principal `ready` (`state_ready_count.py`).

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50g** | [`pilot_oh50g_batch`](../cpb-school-outreach/docs/pilot_oh50g_batch/) | 2026052621 | 50 | PASS | 6/50 |
| **NJ50c** | [`pilot_nj50c_batch`](../cpb-school-outreach/docs/pilot_nj50c_batch/) | 2026052622 | 50 | PASS | 15/50 (1× B) |

**Scripts:** `_run_xx50g_prep.ps1`, `run_{oh50g,nj50c}_{prep,live}.ps1`; NJ prep via `_run_pilot_slug_prep.ps1`. Runbooks: OH50g / NJ50c sections. **Live:** complete — see above.

### OH50f + NJ50b prep (2026-05-26)

Seventh OH / second NJ wave after stagger live. Exclude file **128** domains (includes `burlington-nj.net`, `bergen.org` from NJ50); **37** batch files in exclude glob.

**Preflight:** OH **305**, NJ **578** principal `ready`; global **17 567** `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` |
|-------|--------|-----:|------:|:---:|------------:|
| **OH50f** | [`pilot_oh50f_batch`](../cpb-school-outreach/docs/pilot_oh50f_batch/) | 2026052611 | 50 | PASS | 6/50 |
| **NJ50b** | [`pilot_nj50b_batch`](../cpb-school-outreach/docs/pilot_nj50b_batch/) | 2026052612 | 50 | PASS | 6/50 |

**Scripts:** `_run_xx50f_prep.ps1`, `run_{oh50f,nj50b}_{prep,live}.ps1`. **Live:** complete — see above.

### Multi-batch prep — OH50e + NJ50 + MN50a + MA23 (2026-05-26)

Refreshed selections after XX50d; exclude file **125** domains; **36** `pilot_*_batch` files in exclude glob.

**Preflight** (`state_ready_count.py --principal`): OH **355**, MA **23**, MN **64**, NJ **628**; global **17 690** `ready`.

| Batch | Output | Seed | Count | QA | Notes |
|-------|--------|-----:|------:|:---:|-------|
| **OH50e** | [`pilot_oh50e_batch`](../cpb-school-outreach/docs/pilot_oh50e_batch/) | 2026052601 | **50** | PASS | `domain_ok` 10/50 |
| **NJ50** | [`pilot_nj50_batch`](../cpb-school-outreach/docs/pilot_nj50_batch/) | 2026052355 | **50** | PASS | refreshed; `domain_ok` 9/50; **live 2026-05-26** |
| **MN50a** | [`pilot_mn50a_batch`](../cpb-school-outreach/docs/pilot_mn50a_batch/) | 2026052561 | **16** | PASS | shortfall (was 34 at first prep); `domain_ok` 3/16 |
| **MA23** | [`pilot_ma23_batch`](../cpb-school-outreach/docs/pilot_ma23_batch/) | 2026052593 | **7** | PASS | shortfall (wanted 23; only **7** after exclusions) |

**Scripts:** [`_run_pilot_slug_prep.ps1`](../cpb-school-outreach/scripts/_run_pilot_slug_prep.ps1), `_run_xx50e_prep.ps1`, `run_{oh50e,ma23}_prep.ps1`, `run_{nj50,mn50a}_prep.ps1`; live scaffolds `_run_xx50e_live.ps1`, `_run_pilot_slug_live.ps1`.

**Live:** complete — see stagger live above (**1646** ids).

### XX50d fifth-wave prep — OH50d + MA50d (2026-05-25)

**Prep only** — planned live sender **`.cloud`**. Exclude file **121** domains (includes `elyriaschools.org`, `npsk.org` from 50c); auto `--exclude-batch` on all prior `pilot_*_batch` selections (33 files).

**Preflight** (`audit_unsendable_contacts.py --apply`, `state_ready_count.py --principal`): global **17 779** `ready`; OH **405**, MA **62** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50d** | [`pilot_oh50d_batch`](../cpb-school-outreach/docs/pilot_oh50d_batch/) | 2026052591 | 50 | PASS | 13/50 |
| **MA50d** | [`pilot_ma50d_batch`](../cpb-school-outreach/docs/pilot_ma50d_batch/) | 2026052592 | **39** | PASS | 10/39 |

**MA50d shortfall:** `prepare_tx50_batch.py` needs **50** but only **39** MA principals remain after exclusions (75 principal `ready` in pool, 58 after domain/batch filters). Batch saved at **count 39** via `_run_xx50d_prep.ps1 -Count 39`; re-run DESE import or accept partial wave before live.

**Scripts:** [`_run_xx50d_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50d_prep.ps1), `run_{oh,ma}50d_prep.ps1`; live [`_run_xx50d_live.ps1`](../cpb-school-outreach/scripts/_run_xx50d_live.ps1), `run_{oh,ma}50d_live.ps1`. Runbook **50d** in `pilot_oh50_runbook.md`, `pilot_ma50_runbook.md`.

**Live:** complete same day — see XX50d live above (**1523** ids).

### XX50c fourth-wave prep — OH50c + MA50c (2026-05-25)

**Prep only** before live same day. Planned sender **`.cloud`**. Exclude file **117** domains; auto `--exclude-batch` on all prior `pilot_*_batch` selections (31 files).

**Preflight** (`audit_unsendable_contacts.py --apply`, `state_ready_count.py --principal`): global **17 879** `ready`; OH **455**, MA **112** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50c** | [`pilot_oh50c_batch`](../cpb-school-outreach/docs/pilot_oh50c_batch/) | 2026052581 | 50 | PASS | 7/50 |
| **MA50c** | [`pilot_ma50c_batch`](../cpb-school-outreach/docs/pilot_ma50c_batch/) | 2026052582 | 50 | PASS | 11/50 |

**Scripts:** [`_run_xx50c_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50c_prep.ps1), `run_{oh,ma}50c_prep.ps1`; live [`_run_xx50c_live.ps1`](../cpb-school-outreach/scripts/_run_xx50c_live.ps1), `run_{oh,ma}50c_live.ps1`. Runbook **50c** in `pilot_oh50_runbook.md`, `pilot_ma50_runbook.md`.

### XX50b third-wave prep — OH50b + MA50b + MI50b (2026-05-25)

**Prep only** — planned live sender **`hello@promptanatomy.cloud`** ([`promptanatomy_cloud_sender_gate.md`](../cpb-school-outreach/docs/promptanatomy_cloud_sender_gate.md)). Same filters as 50a; exclude file **110** domains; auto `--exclude-batch` on all prior `pilot_*_batch` selections (27 files, ~1368+ ids per state).

**Preflight** (`state_ready_count.py --principal` after restore): OH **505**, MI **731**, MA **162** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50b** | [`pilot_oh50b_batch`](../cpb-school-outreach/docs/pilot_oh50b_batch/) | 2026052571 | 50 | PASS | 5/50 |
| **MI50b** | [`pilot_mi50b_batch`](../cpb-school-outreach/docs/pilot_mi50b_batch/) | 2026052573 | 50 | PASS | 31/50 |
| **MA50b** | [`pilot_ma50b_batch`](../cpb-school-outreach/docs/pilot_ma50b_batch/) | 2026052572 | 50 | PASS | 13/50 |

**Scripts:** [`_run_xx50b_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50b_prep.ps1), `run_{oh,mi,ma}50b_prep.ps1`; live scaffold [`_run_xx50b_live.ps1`](../cpb-school-outreach/scripts/_run_xx50b_live.ps1), `verify_cloud_from.ps1`, `run_{state}50b_live.ps1`.

**Live:** **OH50b + MA50b + MI50b** complete on `.cloud` (2026-05-25). Cumulative **1334** geo+TX live ids.

### XX50a second-wave prep — OH50a + MA50a + MI50a + MN50a (2026-05-25)

Same filters as XX50: official directory, `mx_ok`, `--max-per-domain 1`, global exclude file (**104** domains), auto `--exclude-batch` on all `docs/pilot_*_batch/selection.json`. **OH50a + MA50a + MI50a live complete** (see above); MN50a (34) prep only unless noted.

**Preflight** (`audit_unsendable_contacts.py --apply`: 0 applied; `state_ready_count.py --principal`): MN **64**, OH **555**, MA **212**, MI **781** principal `ready`.

| Batch | Output | Seed | Count | QA | `domain_ok` (QA `--allow-c`) |
|-------|--------|-----:|------:|:---:|-----------------------------:|
| **OH50a** | [`pilot_oh50a_batch`](../cpb-school-outreach/docs/pilot_oh50a_batch/) | 2026052562 | 50 | PASS | 5/50 |
| **MA50a** | [`pilot_ma50a_batch`](../cpb-school-outreach/docs/pilot_ma50a_batch/) | 2026052563 | 50 | PASS | 14/50 |
| **MI50a** | [`pilot_mi50a_batch`](../cpb-school-outreach/docs/pilot_mi50a_batch/) | 2026052564 | 50 | PASS | 26/50 |
| **MN50a** | [`pilot_mn50a_batch`](../cpb-school-outreach/docs/pilot_mn50a_batch/) | 2026052561 | **34** | PASS | 9/34 |

**MN50a shortfall:** `prepare_tx50_batch.py` needs **50** but only **34** MN principals remain after `max-per-domain 1` + domain exclusions (64 principal `ready` pre-pick). Batch saved at **count 34**; operator may re-run MN OrgView import or accept partial wave before live.

**Scripts (outreach repo):** [`_run_xx50a_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50a_prep.ps1), `run_{oh,ma,mi,mn}50a_prep.ps1`. Fixed PowerShell `--exclude-batch` glob (`selection.json` under `pilot_*_batch`; prior `-Filter pilot_*_batch\selection.json` matched 0 files). Same fix in [`_run_xx50_prep.ps1`](../cpb-school-outreach/scripts/_run_xx50_prep.ps1).

**Live send:** [`_run_xx50a_live.ps1`](../cpb-school-outreach/scripts/_run_xx50a_live.ps1) + `run_{state}50a_live.ps1` — **OH50a**, **MA50a**, **MI50a** live 2026-05-25; MN wrapper when approved.

### XX50 batch prep complete (2026-05-23)

Four official principal geo batches prepared on campaign **`pilot_50`**, sender **`hello@promptanatomy.info`**. **MN50 + OH50 live complete (2026-05-25).** **MA50 / MI50** prep ready; hold until prior batch T+0 + Resend `.info` gate.

| Batch | Selection | Seed | QA (`--allow-c`) | domain_ok C |
|-------|-----------|-----:|------------------|------------:|
| MN50 | `docs/pilot_mn50_batch/selection.json` | 2026052351 | 7 B / 43 C | 21/50 |
| OH50 | `docs/pilot_oh50_batch/selection.json` | 2026052352 | 50 C | 7/50 |
| MA50 | `docs/pilot_ma50_batch/selection.json` | 2026052353 | 50 C | 8/50 |
| MI50 | `docs/pilot_mi50_batch/selection.json` | 2026052354 | 9 B / 41 C | 26/50 |

Preflight (`data/mining_snapshots/xx50_preflight.txt`): MN **114**, OH **605**, MA **262**, MI **831** principal (`--principal`).

| Deliverable | Path |
|-------------|------|
| Shared prep | `scripts/_run_xx50_prep.ps1` (MN/OH/MA/MI) |
| Shared live | `scripts/_run_xx50_live.ps1` |
| Live wrappers | `run_mn50_live.ps1`, `run_oh50_live.ps1`, `run_ma50_live.ps1`, `run_mi50_live.ps1` |
| MI prep | `scripts/run_mi50_prep.ps1` |
| MI runbook | `docs/pilot_mi50_runbook.md` |

**QA note:** Strict A/B failed (most grade C — missing school `website_url` in DB). QA gate uses `--allow-c` (same as VA50a/CA29a). MN `--domain-aligned-only` pool too small (12); not used.

**Recommended live stagger** (after `.info` gate + T+0 bounce &lt;15%, complaints 0):

| Day | Batch | Emails | Status (2026-05-25) |
|-----|-------|-------:|---------------------|
| Mon | MN50 | 50 | **Done** (2% bounce) |
| Tue | OH50 | 50 | **Done** (4% bounce) |
| Wed | MA50 | 50 | **Done** (4% bounce) |
| Thu | MI50 | 50 | **Done** (4% bounce) |

Before each day: `verify_info_from.ps1` → `run_{state}50_live.ps1`. Use batched quarantine (see XX50 live section above).

