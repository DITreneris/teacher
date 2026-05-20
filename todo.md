# TODO - Buyer confidence and fulfillment follow-ups

Living list of follow-ups after release **[1.1.2] - SEO/GEO, DS performance & fulfillment env truth** in [CHANGELOG.md](CHANGELOG.md).

Priorities use the same scale as the implementation plan: **P0** is completed release-critical verification, **P1** is same-release-window cleanup, **P2** is post-launch polish.

This file is intentionally not registered in [docs/INDEX.md](docs/INDEX.md) and not enforced by `tests/docs-hygiene.test.js`; it is operator scratch-space.

Promotion gates and the 30-day X calendar live in [docs/marketing_plan.md](docs/marketing_plan.md).

---

## P0 - Completed release verification

### 1. Configure each Stripe Payment Link (Dashboard only, no code change)

Without this, `success.html` never runs and the new post-purchase flow is dark.

For **both** Beginners ($4.99) and Advanced ($9.99) Payment Links, in the Stripe Dashboard:

- [x] **Set the success URL** under "After payment" -> "Don't show confirmation page" -> "Redirect customers to your website":
  ```
  https://promptanatomy.online/success.html?session_id={CHECKOUT_SESSION_ID}
  ```
  The literal `{CHECKOUT_SESSION_ID}` is the Stripe template variable and **must** stay un-substituted in the field.

- [x] **Enable customer email receipts** under Settings -> Customer emails -> Successful payments -> ON. The card copy in [index.html](index.html) and the Resend email body in [api/_lib/fulfillment.js](api/_lib/fulfillment.js) both promise "two emails" - this is the second one.

- [x] *(Optional)* Enable `invoice_creation` on each Payment Link if you also want a downloadable invoice PDF in addition to the receipt.

- [x] Paste the real Payment Link URLs into [config/sot.json](config/sot.json) `commerce.stripePaymentLinks`:
  - `commerce.stripePaymentLinks.beginners` -> `https://buy.stripe.com/eVq28r8e88Rf6pC4dGfjG04`
  - `commerce.stripePaymentLinks.advanced` -> `https://buy.stripe.com/28E8wPamgd7v15i11ufjG05`
- [x] Flip `commerce.allowPlaceholderCheckout` to `false` in [config/sot.json](config/sot.json). `tests/structure.test.js` now enforces live `https://buy.stripe.com/...` URLs. [index.html](index.html) intentionally keeps static `buy.stripe.com` `href` fallbacks for no-JS and pre-hydration checkout; `generator.js` `initCommerce()` re-hydrates them from SOT at runtime.

### 1b. Vercel fulfillment env (required for PDF email + success page download)

**Verified 2026-05-19:** Production env complete; live paid purchase + self-test; `success.html` download + Resend delivery working on `promptanatomy.online`.

If `success.html` shows **"We could not find this checkout session"** and no Resend email arrives, the webhook did not fulfill. In Vercel **Production** env, confirm:

- [x] `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` (same mode as Payment Links: live vs test)
- [x] `STRIPE_PRICE_BEGINNERS_PDF` + `STRIPE_PRICE_ADVANCED_PDF` match the Price IDs on each Payment Link
- [x] Each Payment Link has metadata `product` = `beginners` or `advanced`
- [x] `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
- [x] `RESEND_API_KEY` + `FULFILLMENT_FROM_EMAIL` (verified sender)
- [x] `DOWNLOAD_TOKEN_SECRET` + `PDF_BEGINNERS_SOURCE_URL` + `PDF_ADVANCED_SOURCE_URL`
- [x] `BLOB_READ_WRITE_TOKEN` + `SITE_URL=https://promptanatomy.online`
- [x] Live webhook **`https://promptanatomy.online/api/stripe-webhook`** subscribed to `checkout.session.completed` (not only `promptanatomy.app` — Payment Links redirect to `.online`, so fulfillment Redis must be on the same Vercel project as `.online`)

See [DEPLOY.md](DEPLOY.md) troubleshooting section if a real purchase already failed — replay the Stripe event to the **`.online`** endpoint after env is fixed.

**Known incident (2026-05-16):** webhook `prompt-anatomy-webhook` delivered `200` to `https://www.promptanatomy.app/api/stripe-webhook` while buyer landed on `promptanatomy.online/success.html` → session `cs_live_a1K4HVZR01TwNYzMV2IleCMwUbAmtzgIt4PyVeX0K21TdoLFYT1oEBW1M3`, email `tomas.staniulis76@gmail.com`, $4.99 Beginners. **Resolved:** `.online` webhook + operator replay; subsequent live purchases fulfill correctly.

### 2. Smoke-test end-to-end in Stripe test mode

**Verified 2026-05-19:** Live/test checkout → `success.html` → download button + Resend email; operator self-test paid.

After step 1, run the same checklist that lives in [DEPLOY.md](DEPLOY.md):

- [x] Open the live site, click "Download PDF for $4.99", complete a card test purchase (`4242 4242 4242 4242`).
- [x] Stripe redirects to `/success.html?session_id=cs_test_...`.
- [x] Within ~5 seconds, `success.html` shows a one-click "Download PDF" button + masked email + license/refund recap.
- [x] The Stripe receipt email arrives.
- [x] The Resend download email arrives, link works for at least one click.
- [x] Issue a Stripe test refund; verify the support/ops path. **Code follow-up:** automatic Stripe refund webhook revocation is not implemented yet; do not treat manual Redis cleanup as automated revocation.

---

## P1 - Same release window if time allows

### 3. Replace pilot testimonials with real names

The three quotes in `config/sot.json#commerce.testimonials` are paraphrased from pilot feedback with names/schools withheld - explicitly disclosed by `commerce.testimonialsNote`. Swap in real attributable quotes when available.

- [ ] Collect 3 testimonials with permission to publish: first-name + last-initial, grade band, state, and a one-line outcome (before/after metric beats "great product").
- [ ] Update `config/sot.json#commerce.testimonials`.
- [ ] Remove or soften `config/sot.json#commerce.testimonialsNote` to match the new reality.

### 4. Source or preserve the compare-strip PD comparison

The old `~ $149` PD-workshop figure has been removed. `config/sot.json#commerce.compareStrip.pdValue` now uses the qualified `often $100+` copy plus a source-note field.

- [ ] Either keep the qualified `often $100+` wording, or cite a public source before using any exact-dollar PD comparison.

### 5. WebP variants for the covers - done in v1.1.2

Shipped in v1.1.2 via `scripts/optimize-pdf-covers.js`, `npm run optimize:covers`, and `<picture>` sources in [index.html](index.html).

- [x] Generate `assets/pdf-covers/{beginners,advanced}.webp`.
- [x] Wrap each cover `<img>` in `<picture>` with a `<source type="image/webp">` sibling above the existing PNG.
- [x] Generate WebP siblings for the six watermarked sample pages.

---

## P2 - Post-launch polish

### 5b. Manual mobile Stripe E2E (operator)

After deploy of v1.1.2, run [todo.md](todo.md) P0 §2 on a real phone (Safari iOS + Chrome Android): tap PDF CTA, complete test card, confirm `success.html` download + email.

### 6. Real usage counter

The pilot meta line currently says "Shaped with pilot feedback from US K-12 teachers across grade bands and content areas" because we deliberately did not fabricate a usage count.

- [ ] Add a Redis counter incremented inside `fulfillCheckoutSession` (already idempotent per session id) in [api/_lib/fulfillment.js](api/_lib/fulfillment.js).
- [ ] Expose it via a small `/api/usage-counter.js` endpoint that returns `{ buyers: N, states: M }`.
- [ ] Replace the static pilot meta line in `index.html` once N is genuinely interesting (>= 50 buyers feels safe).

### 7. CSP enforcement

`vercel.json` currently sends `Content-Security-Policy-Report-Only`. After one week of clean reports in production (already documented in [DEPLOY.md](DEPLOY.md)), promote the header key to `Content-Security-Policy` to enforce.

- [ ] Hold the enforcement flip for **at least one week** after the v1.1.2 deploy (P1.1 removed `fonts.googleapis.com` / `fonts.gstatic.com` from `style-src` / `font-src`; allow the new policy to bake in Report-Only first).
- [ ] At flip time, also verify `script-src` no longer needs `https://unpkg.com` if P3 (`Lucide` sprite) has shipped; if not, keep it.

### 9. P3 design-system follow-ups

Tracked here so the partial P3 work shipped in v1.1.2 lands cleanly in v1.2.x. See [`.cursor/plans/ds_p0-p3_micro-improvements_b250ea79.plan.md`](.cursor/plans/ds_p0-p3_micro-improvements_b250ea79.plan.md) for the full scope.

- [ ] **P3.1 finish** — extend the `light-dark()` declarations to the remaining tokens (`--primary`, `--accent-gold`, hover derivatives, `--shadow-*`), then shrink `[data-theme="dark"]` to component-specific overrides only. Requires before/after Playwright screenshots at 320/768/1280 px and dark-mode `mobile-pdf-commerce` runs.
- [ ] **P3.2 Lucide sprite** — replace the unpkg UMD bundle with an inline SVG sprite (`icons.svg` or in-page `<svg style="display:none">`). Inventory: the ~30 static `data-lucide=...` icons in `index.html` plus dynamic icons from `config/sot.json#libraryPrompts[].icon` and `#rules[].icon`, plus `sun`/`moon`/`alert-circle` set by `generator.js`. Use an allowlist when mapping SOT icon strings to `<use href="#icon-...">`. Remove all `lucide.createIcons()` calls in `generator.js` and `copy.js`. After ship: drop `https://unpkg.com` from `script-src` in `vercel.json`.
- [ ] **P3.3 critical CSS** — only worth it if Lighthouse LCP is still poor after the P1 font + WebP work (re-measure before scheduling).

### 8. Reconcile PDF filenames

Local files under `api/_private/pdfs/` are named `Beginners_PromptAnatomy.app.pdf` and `Advanced_PromptAnatomy.app.pdf`, but [api/_lib/fulfillment.js](api/_lib/fulfillment.js) expects `beginners-guide.pdf` and `advanced-educators-guide.pdf` (production fetches via `PDF_*_SOURCE_URL` env vars, so production is fine; local-only fallback would break).

- [ ] Either rename the local files to match the env-var-driven names, or add a small alias map in `getProductPdf`.
- [ ] Add a 2-line note to [api/_private/pdfs/README.md](api/_private/pdfs/README.md).

---

## Done in this release

For reference, shipped buyer-confidence work is documented in [CHANGELOG.md](CHANGELOG.md) under **[1.1.1] - Buyer confidence, mobile PDF UX & design system 2.0**. Agent/Cursor rules: `.cursor/rules/*.mdc` + [AGENTS.md](AGENTS.md) (synced through v1.1.2).
