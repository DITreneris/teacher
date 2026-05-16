# TODO - Buyer confidence on paid PDF cards

Living list of follow-ups for the `[Unreleased] - Buyer confidence on paid PDF cards` release in [CHANGELOG.md](CHANGELOG.md).

Priorities use the same scale as the implementation plan: **P0** blocks the release, **P1** ships in the same release window if time allows, **P2** is post-launch polish.

This file is intentionally not registered in [docs/INDEX.md](docs/INDEX.md) and not enforced by `tests/docs-hygiene.test.js`; it is operator scratch-space.

Promotion gates and the 30-day X calendar live in [docs/marketing_plan.md](docs/marketing_plan.md).

---

## P0 - Release blockers

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
- [x] Flip `commerce.allowPlaceholderCheckout` to `false` in [config/sot.json](config/sot.json). `tests/structure.test.js` now enforces live `https://buy.stripe.com/...` URLs (publish gate green: 146 / 146). [index.html](index.html) does not hardcode the URLs - `generator.js` `initCommerce()` injects them at runtime.

### 2. Smoke-test end-to-end in Stripe test mode

After step 1, run the same checklist that lives in [DEPLOY.md](DEPLOY.md):

- [ ] Open the live site, click "Download PDF for $4.99", complete a card test purchase (`4242 4242 4242 4242`).
- [ ] Stripe redirects to `/success.html?session_id=cs_test_...`.
- [ ] Within ~5 seconds, `success.html` shows a one-click "Download PDF" button + masked email + license/refund recap.
- [ ] The Stripe receipt email arrives.
- [ ] The Resend download email arrives, link works for at least one click.
- [ ] Issue a Stripe test refund; verify the original signed download link is revoked on next click.

---

## P1 - Same release window if time allows

### 3. Replace pilot testimonials with real names

The three quotes in `index.html` under `.pdf-testimonials` are paraphrased from pilot feedback with names/schools withheld - explicitly disclosed in `.pdf-testimonials-note`. Swap in real attributable quotes when available.

- [ ] Collect 3 testimonials with permission to publish: first-name + last-initial, grade band, state, and a one-line outcome (before/after metric beats "great product").
- [ ] Update `index.html` `.pdf-testimonials` block.
- [ ] Remove or soften the `.pdf-testimonials-note` disclosure to match the new reality.

### 4. Replace the compare-strip placeholder number

The `~ $149` PD-workshop figure in `.pdf-compare-strip` is a market estimate, not a sourced number.

- [ ] Either cite a public source for the PD price next to the figure, or replace it with a number you can defend (your own PD pricing, a local district PD invoice, etc.).

### 5. Optional WebP variants for the covers

PNG works today (PNG is in `vercel.json`'s long-cache rule). Adding `<picture>` with `.webp` siblings shaves ~30-50% off the cover transfer size on supporting browsers.

- [ ] Generate `assets/pdf-covers/{beginners,advanced}.webp` (e.g. via `sharp` as a dev dependency or `cwebp` from the WebP CLI).
- [ ] Wrap each `<img>` in `<picture>` with a `<source type="image/webp">` sibling above the existing PNG.
- [ ] Repeat for the six watermarked sample pages if Stage 2 lightbox feels heavy on slow networks.

---

## P2 - Post-launch polish

### 6. Real usage counter

The pilot meta line currently says "Shaped with pilot feedback from US K-12 teachers across grade bands and content areas" because we deliberately did not fabricate a usage count.

- [ ] Add a Redis counter incremented inside `fulfillCheckoutSession` (already idempotent per session id) in [api/_lib/fulfillment.js](api/_lib/fulfillment.js).
- [ ] Expose it via a small `/api/usage-counter.js` endpoint that returns `{ buyers: N, states: M }`.
- [ ] Replace the static pilot meta line in `index.html` once N is genuinely interesting (>= 50 buyers feels safe).

### 7. CSP enforcement

`vercel.json` currently sends `Content-Security-Policy-Report-Only`. After one week of clean reports in production (already documented in [DEPLOY.md](DEPLOY.md)), promote the header key to `Content-Security-Policy` to enforce.

### 8. Reconcile PDF filenames

Local files under `api/_private/pdfs/` are named `Beginners_PromptAnatomy.app.pdf` and `Advanced_PromptAnatomy.app.pdf`, but [api/_lib/fulfillment.js](api/_lib/fulfillment.js) expects `beginners-guide.pdf` and `advanced-educators-guide.pdf` (production fetches via `PDF_*_SOURCE_URL` env vars, so production is fine; local-only fallback would break).

- [ ] Either rename the local files to match the env-var-driven names, or add a small alias map in `getProductPdf`.
- [ ] Add a 2-line note to [api/_private/pdfs/README.md](api/_private/pdfs/README.md).

---

## Done in this release

For reference, the buyer-confidence work that has already shipped against the plan is documented in [CHANGELOG.md](CHANGELOG.md) under `[Unreleased] - Buyer confidence on paid PDF cards`. The companion implementation plan is `c:\Users\tomas\.cursor\plans\buyer_confidence_pdf_cards_7b95a2ed.plan.md`.
