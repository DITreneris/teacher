# Agentų taisyklės (Edu MVP)

Tikslas: vienareiksmis darbo modelis edukaciniam MVP.

## Rolės ir atsakomybės

- **Orchestrator** - valdo prioritetą, suformuoja užduoties aprašą ir priima galutinį rezultatą. US go-to-market prioritetai ir promotion vartai - [`docs/marketing_plan.md`](docs/marketing_plan.md).
- **Content** - atsako už copy, promptų semantiką ir mokytojo konteksto aiškumą. Produktinis copy - **en-US**; redaguoti [`config/sot.json`](config/sot.json) (`#commerce`, `#buyerFaq`, `#copy`) kur įmanoma. Marketing saugumas - [`docs/marketing_plan.md`](docs/marketing_plan.md) §4–5, §11.
- **UI/UX** - atsako už vartotojo srautą, mobile hierarchiją ir a11y.
- **Commerce / Ops** - Stripe Payment Links, success URL, webhook domenas (tas pats host kaip checkout redirect), Vercel Production env, fulfillment mapping, incident replay. Failai: [`DEPLOY.md`](DEPLOY.md), [`memo_pdf.md`](memo_pdf.md), [`config/sot.json`](config/sot.json), `api/stripe-webhook.js`, `api/_lib/fulfillment.js`, `api/fulfillment-health.js`. Verify etape - kartu su QA fulfillment keitimams.
- **QA** - vykdo kokybės vartus ir pateikia release rekomendaciją.

## Dviejų repo riba / routing

Šis repo yra **Vercel product + PDF fulfillment** repo. Jis valdo `promptanatomy.online`, statinį produktą, Stripe PDF checkout, Upstash Redis, Vercel Blob, transactional Resend ir `api/**` fulfillment kelius.

Outreach sistema yra atskiras sibling repo:

```text
..\cpb-school-outreach
```

Outreach repo valdo Railway deploy, Supabase Postgres, kontaktų enrichment, kampanijų siuntimą ir marketing Resend (`news.promptanatomy.online`). Jei užduotis susijusi su school outreach, scraperiais, Supabase kontaktais, campaign workeriais ar marketing email webhookais, agentas turi dirbti `..\cpb-school-outreach`, ne šiame Vercel repo.

Nedėti outreach logikos į `api/**`, Stripe fulfillment, Upstash, Vercel Blob, product env ar transactional email kelius. Sistemų atskyrimas dokumentuotas [`memo_outreach.md`](memo_outreach.md) ir [`docs/outreach_experience_memo_2026-05-17.md`](docs/outreach_experience_memo_2026-05-17.md).

## Stage-gate darbo seka

1. **Intake (Orchestrator)**  
   Sukuria trumpą užduoties aprašą: tikslas, apribojimai, priėmimo kriterijai, liečiami failai.
2. **Implement (Content + UI/UX + Commerce/Ops pagal sritį)**  
   Įgyvendina pakeitimus ir pateikia dokumentų delta sąrašą.
3. **Verify (QA + Commerce/Ops fulfillment atveju)**  
   Paleidžia testų vartus pagal pakeitimo tipą (lentelė žemiau).
4. **Release readiness (Orchestrator + QA)**  
   Užduotis uždaroma tik jei praeina kodas, dokumentacija ir testų vartai.

## Kokybės vartai

**CI tiesos šaltinis:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml) paleidžia `npm run test:mixed`. Lokaliai prieš PR - tas pats arba superset.

| Pakeitimo tipas | Privaloma | Rekomenduojama |
|-----------------|-----------|----------------|
| Bet koks kodas / aktyvūs docs | `npm test` | — |
| UX / flow / HTML interakcijos | `npm run test:smoke`, `npm run test:a11y` | — |
| Formos, generavimas, sesijos, kopijavimas | `npm run test:e2e` (core-flow) | — |
| `.pdf-*` CSS / mobile PDF layout | `npm run test:e2e` (įsk. mobile-pdf-commerce) | — |
| `api/**` fulfillment | `npm test` | `npm run check:fulfillment` |
| Tik `commerce` / marketing copy SOT | `npm test` (publish + copy safety) | `npm run test:smoke` |
| Prieš Production deploy | — | [DEPLOY.md](DEPLOY.md) + [todo.md](todo.md) P0 §1b–§2 |

**Cursor rules:** `.cursor/rules/cpb-core.mdc` (visada), `cpb-pdf-commerce.mdc`, `cpb-fulfillment.mdc`.

## Design system (DS 2.0.0)

- Kanoninis gidas: [`docs/STYLEGUIDE.md`](docs/STYLEGUIDE.md). Spalvos / tema: [`config/sot.json`](config/sot.json) + [`style.css`](style.css).
- Naujas `.pdf-*` ar `.ops-*` UI blokas **privalo** turėti `@media (max-width: 480px)` taisykles (overflow, touch 44px, dialog `dvh`) prieš merge.
- PDF commerce mobile regresija: `tests/e2e/mobile-pdf-commerce.spec.js` (320 / 375 px).

## Operator runbooks (ne INDEX)

Šie failai nėra aktyvūs `docs/INDEX.md` sąraše (docs-hygiene), bet yra operatorių / agentų runbook:

- [`memo_pdf.md`](memo_pdf.md) - fulfillment deployment memo (EN)
- [`memo_outreach.md`](memo_outreach.md) - outreach split-system memo (Vercel vs Railway, Resend split, UTM, first 500 contacts)
- [`changelog_outreach.md`](changelog_outreach.md) - separate changelog for school outreach work (sibling repo `..\cpb-school-outreach`); main [CHANGELOG.md](CHANGELOG.md) tracks only Vercel product / PDF / Stripe / marketing / DS
- [`todo.md`](todo.md) - release blockers ir ops checklist
- [`DEPLOY.md`](DEPLOY.md) - deploy žmonėms ir robotams

## Aktyvi dokumentacija

Kanoninis aktyvių dokumentų sąrašas laikomas tik `docs/INDEX.md`.

- Jei failas nėra pažymėtas aktyvus `docs/INDEX.md`, jis laikomas archyvu.
- Archyvo failai neatnaujinami, nebent jie aiškiai grąžinti į aktyvią zoną.
