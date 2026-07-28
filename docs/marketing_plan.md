# US market & X/Twitter marketing plan

**Product:** [Classroom Prompt Builder](https://promptanatomy.online/) · **Brand:** Prompt Anatomy  
**Last updated:** July 28, 2026  
**Status:** Partially ready — live Stripe checkout + fulfillment verified (2026-05-19); free-tool X promotion unblocked on ops (Gate A remaining: handle + pin + UTM); paid ads after Gate B proof. School email outreach is a parallel sibling-repo channel, not a product launch blocker.

This plan is the canonical go-to-market reference for US promotion. It is tied to release blockers in [todo.md](../todo.md) (operator scratch, not indexed) and deployment steps in [DEPLOY.md](../DEPLOY.md). Legal pages: [privacy.html](../privacy.html), [terms.html](../terms.html).

> **Not legal advice.** Flag uncertain compliance items for professional review before scaled paid spend.

---

## 1. What we sell

| Layer | Offer | Price |
|-------|--------|-------|
| **Free wedge** | No-account web prompt builder for US K–12 teachers (5 modes, grades 1–12, localStorage only, **no AI API**) | $0 |
| **Paid upsell** | Beginners PDF (12 pp) / Advanced PDF (24 pp), Classroom License, Stripe + email delivery | $4.99 / $9.99 |
| **Parent brand** | [promptanatomy.app](https://www.promptanatomy.app/) — interactive prompt training | — |
| **Community** | [Telegram](https://t.me/prompt_anatomy) (secondary to X for US teacher discovery) | — |

**Primary ICP:** US K–12 classroom teachers, plus instructional coaches / PD leads (Advanced guide).  
**Not the ICP:** generic founders, consultants, or “AI power users” without a teacher use case — the site and funnel are built for educators.

---

## 2. Executive verdict

| Question | Answer |
|----------|--------|
| Ready for US promotion? | **Partially** |
| Biggest blocker | X account + demo content ([todo.md](../todo.md) Gate A); permissioned testimonials (Gate B) |
| Promote free tool on X now? | **Yes** (ops E2E done — [todo.md](../todo.md) P0 §1b–§2 verified 2026-05-19) |
| Run paid X ads for PDFs? | **No** until Gate B (organic sales or analytics proof + permissioned testimonial) |
| Highest-ROI next move | Gate A X (handle + pinned 30s lesson-mode demo + UTM), then Gate B proof / permissioned testimonials ([todo.md](../todo.md) P1) |

### Readiness scores (1–10)

| Area | Score | Note |
|------|-------|------|
| Positioning clarity | 8 | Teacher ICP clear in hero and schema |
| US buyer relevance (teachers) | 9 | |
| Trust signals | 7 | Live checkout; pilot quotes still anonymous |
| Pricing / checkout | 8 | Live `buy.stripe.com` in SOT; one live sale verified (Stage 6c) |
| Proof | 5 | Honest pilot disclosure; needs attributable quotes |
| Free CTA / conversion logic | 8 | |
| Paid CTA / conversion logic | 8 | Live links + fulfillment E2E verified |
| X profile readiness | 2 | No verified handle / `twitter:site` yet |

---

## 3. Promotion gates (check before spend)

### Gate A — Free organic X (minimum)

- [x] [todo.md](../todo.md) P0 §1: live Stripe URLs in [`config/sot.json`](../config/sot.json) `commerce.stripePaymentLinks` and `commerce.allowPlaceholderCheckout: false` (CHANGELOG Stage 5; publish gate in `npm test`)
- [x] [todo.md](../todo.md) P0 §2: purchase + fulfillment path verified (2026-05-19; live + test)
- [ ] X account created, bio + link to `https://promptanatomy.online`
- [ ] Pinned post: 30s demo of lesson mode (no hype claims)
- [ ] UTM on all X links: `?utm_source=twitter&utm_medium=organic&utm_campaign=cpb`

### Gate B — Paid PDF promotion

- [ ] Gate A complete
- [x] Mobile PDF storefront audited and hardened (DS 2.0.0 — [`docs/design-system-audit_2026-05.md`](design-system-audit_2026-05.md), `tests/e2e/mobile-pdf-commerce.spec.js`, 320 / 375 px)
- [ ] 3+ organic PDF sales OR 50+ weekly free-tool sessions (Vercel Analytics)
- [ ] At least 1 permissioned testimonial with name (see [todo.md](../todo.md) P1)
- [ ] Compare strip PD figure fully sourced ([todo.md](../todo.md) P1; SOT already uses audit-safe `often $100+`, not `~ $149`)
- [ ] Footer: legal entity / operator line added (counsel-approved copy)
- [ ] `twitter:site` meta in `index.html` once handle is verified

### Gate C — Paid X ads

- [ ] Gate B complete
- [ ] Refund rate &lt; 15% on first 20 PDF sales
- [ ] No systematic fulfillment failures (webhook, email, `success.html`)
- [ ] Ad creative avoids unsubstantiated time-savings (“4 hours → 1 hour”)
- [ ] Counsel review if adding Meta/Google pixels (CPRA / cookie consent)

---

## 4. Compliance quick reference

| Item | Status | Class |
|------|--------|-------|
| Privacy Policy | ✅ `privacy.html` | Required |
| Terms + AI disclaimer + license + refund | ✅ `terms.html` | Required |
| Cookie banner | Not required today (no cookies; Vercel Analytics cookieless per privacy §7) | Required if ad pixels added |
| Contact | ✅ `info@promptanatomy.app` | Required |
| Legal entity on site | ⚠️ Postal address is live; counsel-approved entity name still pending | Required before paid ads |
| Testimonials in ads | ⚠️ Anonymous / paraphrased | Substantiate or exclude from paid creative |
| X ad policy (digital goods + education) | Test with small budget | Required before scale |

---

## 5. Messaging rules

**Lead with:** no account, no student PII on our servers, teacher verifies AI output, works with ChatGPT / Claude / Gemini.

**Avoid in ads and pins:**

- Unsourced exact-dollar PD comparison until cited (current SOT uses qualitative `often $100+` in [`config/sot.json`](../config/sot.json) `commerce.compareStrip.pdValue`)
- Anonymous quotes presented as endorsements
- “Replace lesson planning” / guaranteed time savings
- “Instant” / “under 60 seconds” delivery if webhook latency is observed in testing

**Safer swaps:**

| Weak | Safer |
|------|--------|
| “4 hours → under 1 hour” | “Tightened my Sunday planning routine” |
| “~ $149 workshop” | “Often more than a single PD seat” (or cite a source) |
| “Under 60 seconds” | “Usually within a minute; check spam; we resend anytime” |

---

## 6. Channel strategy

### Primary: X/Twitter organic

**Profile:** Teacher-focused bio; link to free builder; pin demo video.  
**Cadence:** 4–5 posts/week during pilot month; reply in #EdTech / teacher threads (value first, link second).  
**Funnel:** Post → profile → `promptanatomy.online` → use builder → (optional) scroll to `#pdf-guides`.

### Secondary: X paid (after Gate C)

- Start $10–20/day; one objective per campaign (free tool **or** $4.99 PDF, not both).
- Creative: screen recording + “no student data” + 14-day refund on PDF ads only.

### SEO / GEO / AI visibility

- Maintain `llms.txt`, `sitemap.xml`, FAQ JSON-LD on [index.html](../index.html).
- No code change required for baseline; content wins = teacher-specific examples in posts and future blog/snippets.

### Retargeting

- **Not yet.** Adding pixels triggers cookie/consent obligations. Revisit after Gate B with legal review.

### LinkedIn

- Secondary for **instructional coaches** and district PD; repurpose X threads as document posts after X organic proof.

### School email outreach (parallel channel — sibling repo)

Cold B2B email to US K–12 principals is **not** part of this product’s launch or Vercel fulfillment criteria. Ops live only in sibling repo `cpb-school-outreach` (Railway / Supabase / marketing Resend).

| Item | Detail |
|------|--------|
| Stack | Sibling `cpb-school-outreach` — do not add to `api/**` |
| Product UTM pattern | `?utm_source=email&utm_medium=outreach&utm_campaign=<slug>` |
| Messaging rules | Same §5 teacher-safe rules; free tool lead; Advertisement + postal + unsubscribe |
| Ops pointers | [memo_outreach.md](../memo_outreach.md) (operator); live registry in [changelog_outreach.md](../changelog_outreach.md) |

---

## 7. Content playbook (X)

### Top angles (organic)

1. Free builder — no student data leaves the site until you paste into an AI tool  
2. 60s lesson-mode demo (topic → copy prompt)  
3. 7-point verification checklist (from Beginners PDF)  
4. Assessment mode: quiz + answer key structure  
5. Sunday planning — one mode per day (thread)  
6. Coach / PD: Advanced guide as half-day spine  
7. FERPA-minded “what not to put in prompts”  
8. Preview 3 watermarked pages (transparency)  
9. `$4.99` vs subscription edtech — one-time, 14-day refund  
10. Responsible AI — link [terms.html §3](../terms.html)

### Top ad hooks (after Gate C)

1. Free prompt builder for US teachers — no account  
2. Lesson, quiz, homework prompts in one tab  
3. ChatGPT, Claude, Gemini — you stay in control  
4. No student data collected on our site  
5. 12-page guide — $4.99, 14-day refund  
6. Preview 3 pages before you buy  
7. Grades 1–12  
8. Coaches: 24-page PD playbook — $9.99  
9. Stripe checkout · email delivery  
10. Verify AI output before students see it  

### CTAs (rotate)

- Build a lesson prompt free →  
- Try it — no signup →  
- Preview the $4.99 guide (3 pages) →  
- Download PDF — $4.99, 14-day refund →  

---

## 8. Thirty-day execution calendar

### Week 1 — Compliance & trust (ops)

| Day | Action |
|-----|--------|
| 1–2 | ✅ Stripe Payment Links + SOT publish gate complete; static `index.html` Stripe fallbacks present |
| 3 | ✅ Live/test purchase and fulfillment path verified per [DEPLOY.md](../DEPLOY.md) / [todo.md](../todo.md) P0 |
| 4 | Footer legal/operator line review (counsel-approved entity name still pending) |
| 5 | Keep qualified compare-strip copy (`often $100+`) unless a sourced exact figure is added; tighten testimonial copy for ads |
| 6–7 | Create X profile, bio, UTM link, pin demo post |

**Exit criteria:** 1 successful live purchase; 0 broken PDF CTAs. Completed for ops E2E on 2026-05-19; continue with X profile/demo work.

### Week 2 — Positioning & CTA test

| Day | Action |
|-----|--------|
| 8–10 | Bio link A/B: `#operationsCenter` vs `#pdf-guides` (UTM differs) |
| 11–12 | 3 organic posts (lesson, assessment, checklist) |
| 13–14 | Collect 1–2 permissioned quotes ([todo.md](../todo.md) P1) |

**Metrics:** Bio CTR 2–5%; session length ≥ 45s on site.

### Week 3 — Organic X

| Daily | 1 post: demo, tip, or checklist screenshot |
| Engage | 10+ meaningful replies/week in teacher threads |

**Metrics:** Profile visits/post; ≥1 PDF sale from organic if Gate B met.

### Week 4 — Paid readiness

| Prereq | Gate B |
| Test | $10–20/day promoted post → free tool OR Beginners PDF |
| Review | Refunds, fulfillment tickets, ad rejection reasons |

### Back-to-school email (parallel — not a product Gate)

Wave schedule, cool-downs, and live-send registry live in the sibling outreach repo and [changelog_outreach.md](../changelog_outreach.md). They do **not** gate X organic, PDF promo, or Vercel deploy.

### Stop / go (scale paid)

| Signal | Go | Stop |
|--------|-----|------|
| Checkout completion | ≥ 2% of paid LP clicks | &lt; 0.5% |
| Refund rate (14d) | &lt; 10% | &gt; 20% |
| CAC vs price | CAC &lt; $4.99 (Beginners) | CAC ≥ price |
| Fulfillment | 100% emails &lt; 2 min | Any pattern of failure |
| Organic PDF | ≥1 sale/week without ads | 0 sales after ~2k LP visits |

**Scale paid only after:** 20 PDF units, &lt;15% refunds, zero public fulfillment failures.

---

## 9. Risk register (summary)

| Risk | Severity | Fix |
|------|----------|-----|
| Stripe URL drift across SOT / HTML fallback / JS defaults | Medium | `npm test` publish gate + `rg "buy.stripe.com"` after any Payment Link rotation |
| Webhook / email failure | High | Same-domain webhook, `/api/fulfillment-health`, `npm run check:fulfillment`, E2E test + monitor |
| FTC-style testimonial claims | Medium | Named permission or remove from ads |
| Unsourced exact-dollar PD comparison | Medium | Keep `often $100+` or source any exact figure |
| Wrong audience (non-teachers) | High | Keep X copy teacher-specific |
| AI hype backlash | Medium | Verification + no-PII messaging |
| Retargeting without consent | Medium | Defer pixels until counsel |

---

## 10. Related project docs

| Doc | Role |
|-----|------|
| [todo.md](../todo.md) | P0/P1 release blockers (Stripe, testimonials, compare strip) |
| [DEPLOY.md](../DEPLOY.md) | Stripe webhook, success URL, env vars, post-deploy checklist |
| [CHANGELOG.md](../CHANGELOG.md) | Shipped buyer-confidence features |
| [llms.txt](../llms.txt) | Machine-readable product brief for AI/search |
| [AGENTS.md](../AGENTS.md) | Stage-gate roles; Orchestrator owns promotion priority |
| [memo_pdf.md](../memo_pdf.md) | Fulfillment ops runbook (operator) |
| [memo_outreach.md](../memo_outreach.md) | Sibling outreach split-system pointer (operator; not a product launch blocker) |
| [changelog_outreach.md](../changelog_outreach.md) | Sibling outreach live-send registry (operator; not a product launch blocker) |

---

## 11. Document maintenance

- Update **Last updated** when gates, scores, or channel tactics change.
- After X handle is live: note handle in §6 and track meta tag task in [CHANGELOG.md](../CHANGELOG.md).
- When release gates or fulfillment env requirements change, update [todo.md](../todo.md), [DEPLOY.md](../DEPLOY.md), and `.cursor/rules/cpb-fulfillment.mdc` together.
- Commerce / social-proof copy lives in [`config/sot.json`](../config/sot.json) under `commerce` (Stripe links, pricing, compare strip, delivery promise, testimonials). Edit there - `generator.js` `initCommerce()` hydrates [`index.html`](../index.html) at runtime; the publish gate in `tests/structure.test.js` enforces no `YOUR_` placeholder when `allowPlaceholderCheckout: false`.
