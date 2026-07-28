---
status: archive
audience: both
updated: 2026-07-28
---

# Archived: implied product roadmap (pre-2026-07-28)

**Snapshot:** Archived. Not Active — see [docs/INDEX.md](../INDEX.md).  
**Superseded by:** [docs/roadmap.md](../roadmap.md) (Active; horizon through 2027-01-01).

## Note

There was **no** prior `roadmap.md` in this repo. This file freezes the **implied** strategy as of **2026-07-28**, reconstructed from [todo.md](../../todo.md) and [docs/marketing_plan.md](../marketing_plan.md) §3 / §8.

Unlike the Active roadmap, this path did **not** explicitly mark PDF catalog expansion or a classroom workflow OS as non-go.

## Implied path (frozen)

1. **Ship (done)** — Live Stripe Payment Links, Production fulfillment, checkout → `success.html` → Resend download email verified **2026-05-19** on `promptanatomy.online`.
2. **Discover — Gate A (open)** — X account, pinned 30s lesson-mode demo, UTM on X links.
3. **Trust — Gate B (open)** — Permissioned testimonials, compare-strip honesty, counsel-approved footer entity line, `twitter:site` after handle exists; proof thresholds in marketing_plan §3.
4. **Prove / Scale** — Paid PDF promotion and paid X ads blocked until Gate B / Gate C.
5. **Parked eng** — Mobile Stripe E2E, CSP enforce, `light-dark()` migration, critical CSS, local PDF filename aliases, usage counter API, Stripe refund token revocation.

## Open items as of archive date (from todo.md)

### Discover — Gate A

- [ ] X account created, bio + link to `https://promptanatomy.online`
- [ ] Pinned post: 30s demo of lesson mode (no hype claims)
- [ ] UTM on all X links: `?utm_source=twitter&utm_medium=organic&utm_campaign=cpb`

### Trust — Gate B blockers

- [ ] Collect 3 permissioned testimonials → `config/sot.json#commerce.testimonials`
- [ ] Compare strip: keep qualified `often $100+` or cite a public source
- [ ] Footer: legal entity / operator line (counsel-approved copy)
- [ ] After X handle exists: `twitter:site` meta in `index.html`

### Parked eng (summary)

Manual mobile Stripe E2E; CSP Report-Only → enforce; `light-dark()` token migration; critical CSS if LCP still poor; local PDF filename aliases; usage counter deferred until ≥50 buyers; refund webhook revocation not implemented.

## Forward pointer

Active product + GTM ambition (discovery-led; catalog expansion and workflow OS non-go): **[docs/roadmap.md](../roadmap.md)**.  
Channel / compliance detail remains in **[docs/marketing_plan.md](../marketing_plan.md)**.  
Weekly now-board remains **[todo.md](../../todo.md)**.
