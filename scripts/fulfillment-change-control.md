---
status: ops
audience: both
updated: 2026-07-28
---

# Fulfillment change control

**Purpose:** Operator gate for edits to production fulfillment paths while school outreach runs in a sibling repo. Not Active product doctrine.

While the school outreach bot is in active development, treat these paths as **production-critical**:

- `api/_lib/fulfillment.js`
- `api/stripe-webhook.js`
- `api/download.js`
- `api/download-link.js`
- `api/fulfillment-health.js`
- `success.html`

**Allowed without outreach review:** buyer-facing bug fixes, env/docs, replaying Stripe webhooks after env fix.

**Not allowed in fulfillment paths:** Supabase client, school contact lists, cold-email send, shared marketing Resend templates.

Outreach lives only in [cpb-school-outreach](../cpb-school-outreach). See [memo_outreach.md](../memo_outreach.md).
