/**
 * Structural tests - Classroom Prompt Builder (index.html)
 * Verifies the page contains all required elements:
 * mode tabs, forms, output, sessions, library, rules, a11y.
 * Run: node tests/structure.test.js (or npm test)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, '..', 'index.html');
const PRIVACY_PATH = path.join(__dirname, '..', 'privacy.html');
const TERMS_PATH = path.join(__dirname, '..', 'terms.html');
const STYLE_PATH = path.join(__dirname, '..', 'style.css');
const SOT_PATH = path.join(__dirname, '..', 'config', 'sot.json');
const GENERATOR_PATH = path.join(__dirname, '..', 'generator.js');
const COPY_PATH = path.join(__dirname, '..', 'copy.js');
const WEBHOOK_PATH = path.join(__dirname, '..', 'api', 'stripe-webhook.js');
const DOWNLOAD_PATH = path.join(__dirname, '..', 'api', 'download.js');
const FULFILLMENT_PATH = path.join(__dirname, '..', 'api', '_lib', 'fulfillment.js');

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

function assert(condition, message) {
  if (!condition) {
    console.error(`\u274C ${message}`);
    return false;
  }
  console.log(`\u2705 ${message}`);
  return true;
}

function run() {
  let passed = 0;
  let failed = 0;

  const html = readFile(INDEX_PATH);
  if (!html) {
    console.error('\u274C index.html nerastas:', INDEX_PATH);
    process.exit(1);
  }

  // --- Operations center ---
  if (assert(html.includes('id="operationsCenter"'), 'Operations center section exists')) passed++;
  else failed++;

  // --- Mode tabs (5 modes) ---
  if (assert(html.includes('data-mode="LESSON"'), 'LESSON mode tab exists')) passed++;
  else failed++;
  if (assert(html.includes('data-mode="ASSESSMENT"'), 'ASSESSMENT mode tab exists')) passed++;
  else failed++;
  if (assert(html.includes('data-mode="TASKS"'), 'TASKS mode tab exists')) passed++;
  else failed++;
  if (assert(html.includes('data-mode="PRESENTATION"'), 'PRESENTATION mode tab exists')) passed++;
  else failed++;
  if (assert(html.includes('data-mode="STRATEGY"'), 'STRATEGY mode tab exists')) passed++;
  else failed++;

  // --- Mode forms ---
  if (assert(html.includes('id="form-lesson"'), 'LESSON form exists')) passed++;
  else failed++;
  if (assert(html.includes('id="form-assessment"'), 'ASSESSMENT form exists')) passed++;
  else failed++;
  if (assert(html.includes('id="form-tasks"'), 'TASKS form exists')) passed++;
  else failed++;
  if (assert(html.includes('id="form-presentation"'), 'PRESENTATION form exists')) passed++;
  else failed++;
  if (assert(html.includes('id="form-strategy"'), 'STRATEGY form exists')) passed++;
  else failed++;

  // --- Grade selector (1-12) ---
  if (assert(html.includes('id="classLevelSelect"'), 'Grade select exists')) passed++;
  else failed++;
  if (assert(html.includes('<option value="1">Grade 1</option>'), 'Grade 1 option exists')) passed++;
  else failed++;
  if (assert(html.includes('<option value="12">Grade 12</option>'), 'Grade 12 option exists')) passed++;
  else failed++;

  // --- Output ---
  if (assert(html.includes('id="opsOutput"'), 'Output section (opsOutput) exists')) passed++;
  else failed++;
  if (assert(html.includes('id="outputCharCount"'), 'Character counter (outputCharCount) exists')) passed++;
  else failed++;

  // --- Sessions panel ---
  if (assert(html.includes('id="sessionsPanel"'), 'Sessions panel exists')) passed++;
  else failed++;
  if (assert(html.includes('id="sessionSaveBtn"'), 'Session save button exists')) passed++;
  else failed++;
  if (assert(html.includes('id="sessionList"'), 'Session list exists')) passed++;
  else failed++;

  // --- Library ---
  if (assert(html.includes('id="library"'), 'Library section exists')) passed++;
  else failed++;
  if (assert(html.includes('id="libraryGrid"'), 'Library grid exists')) passed++;
  else failed++;

  // --- Paid PDF guides ---
  if (assert(html.includes('id="pdf-guides"'), 'Paid PDF guides section exists')) passed++;
  else failed++;
  if (assert(html.includes('Beginners &mdash; Prompt Anatomy') && html.includes('$4.99') && html.includes('was $9.99'), 'Beginners - Prompt Anatomy card and pricing exist')) passed++;
  else failed++;
  if (assert(html.includes('Advanced &mdash; Prompt Anatomy') && html.includes('$9.99') && html.includes('was $19.99'), 'Advanced - Prompt Anatomy card and pricing exist')) passed++;
  else failed++;
  if (assert(html.includes('data-product="beginners-pdf"') && html.includes('data-product="advanced-pdf"'), 'PDF Stripe CTA product markers exist')) passed++;
  else failed++;

  // --- Paid PDF guides: buyer confidence layer ---
  if (assert(html.includes('/assets/pdf-covers/beginners.png') && html.includes('width="734"') && html.includes('height="950"'), 'Beginners cover image is wired with explicit dimensions')) passed++;
  else failed++;
  if (assert(html.includes('/assets/pdf-covers/advanced.png'), 'Advanced cover image is wired')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-card-cover"') && /alt="Cover of [^"]+"/.test(html), 'Cover figures expose non-empty alt text')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-specs"') && html.includes('12 pages') && html.includes('24 pages'), 'Specs row lists length for both guides')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-license"') && html.includes('Classroom license') && html.includes('terms.html#paid-pdf-license'), 'Classroom license line links to terms anchor')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-refund"') && html.includes('14-day no-questions refund'), '14-day refund badge sits beside the CTA')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-trust"') && html.includes('Stripe checkout') && html.includes('Apple Pay') && html.includes('256-bit SSL'), 'Trust row lists Stripe, card brands, Apple Pay, and SSL')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-promise"') && html.includes('data-commerce-delivery-promise'), 'Delivery promise hook exists on both PDF cards')) passed++;
  else failed++;
  if (assert(html.includes('data-preview-trigger="beginners"') && html.includes('data-preview-trigger="advanced"'), 'Preview-3-pages buttons exist for both guides')) passed++;
  else failed++;
  if (assert(html.includes('id="pdfPreviewDialog"') && html.includes('aria-labelledby="pdfPreviewTitle"') && html.includes('id="pdfPreviewClose"'), 'Preview lightbox <dialog> with labelled title and close button is present')) passed++;
  else failed++;
  if (assert(html.includes('data-toc="beginners"') && html.includes('data-toc="advanced"') && html.includes('data-toc-list="beginners"'), 'Whats inside TOC accordion exists for both guides with data-toc-list hooks')) passed++;
  else failed++;
  if (assert(html.includes('id="pdf-guides-faq"') && html.includes('data-buyer-faq-list'), 'Buyer FAQ section + populate hook present')) passed++;
  else failed++;
  if (assert(html.includes('"@id": "https://promptanatomy.online/#buyer-faq"') && html.includes('"name": "Can I use this guide in more than one of my classrooms?"'), 'Buyer FAQ JSON-LD entry present with first question')) passed++;
  else failed++;
  if (assert(html.includes('id="lostLinkMailto"') && html.includes('mailto:info@promptanatomy.app?subject=Resend'), 'Lost-your-link footer mailto link present')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-testimonials"') && html.includes('data-commerce-testimonials'), 'Testimonials list + commerce hook present')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-compare-strip"') && html.includes('data-commerce-compare-strip') && html.includes('$4.99') && html.includes('$9.99'), 'Compare strip exposes commerce hooks and PDF guide prices')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-author-panel"') && html.includes('Published by Prompt Anatomy') && html.includes('promptanatomy.app'), 'Author panel block present')) passed++;
  else failed++;

  let sotPdfGuides = null;
  try { sotPdfGuides = JSON.parse(readFile(SOT_PATH) || '{}'); } catch (_e) { sotPdfGuides = null; }
  if (assert(
    sotPdfGuides &&
    sotPdfGuides.pdfGuides &&
    sotPdfGuides.pdfGuides.beginners &&
    Array.isArray(sotPdfGuides.pdfGuides.beginners.chapters) &&
    sotPdfGuides.pdfGuides.beginners.chapters.length >= 8 &&
    sotPdfGuides.pdfGuides.advanced &&
    Array.isArray(sotPdfGuides.pdfGuides.advanced.chapters) &&
    sotPdfGuides.pdfGuides.advanced.chapters.length >= 8,
    'config/sot.json#pdfGuides exposes chapter lists for both guides'
  )) passed++;
  else failed++;
  if (assert(
    sotPdfGuides &&
    Array.isArray(sotPdfGuides.buyerFaq) &&
    sotPdfGuides.buyerFaq.length === 5 &&
    sotPdfGuides.buyerFaq.every(function (item) { return item.id && item.q && item.a; }),
    'config/sot.json#buyerFaq has 5 well-formed buyer questions'
  )) passed++;
  else failed++;

  // --- Commerce + legal SOT schema (audit hardening) ---
  const commerce = sotPdfGuides && sotPdfGuides.commerce;
  if (assert(
    commerce &&
    typeof commerce === 'object' &&
    commerce.stripePaymentLinks &&
    typeof commerce.stripePaymentLinks.beginners === 'string' &&
    typeof commerce.stripePaymentLinks.advanced === 'string' &&
    typeof commerce.deliveryPromise === 'string' &&
    Array.isArray(commerce.testimonials) && commerce.testimonials.length >= 1 &&
    commerce.compareStrip && typeof commerce.compareStrip.pdValue === 'string',
    'config/sot.json#commerce has stripe links, deliveryPromise, testimonials, compareStrip'
  )) passed++;
  else failed++;

  if (assert(
    commerce &&
    typeof commerce.deliveryPromise === 'string' &&
    !/under 60 seconds/i.test(commerce.deliveryPromise),
    'commerce.deliveryPromise avoids the "under 60 seconds" overclaim'
  )) passed++;
  else failed++;

  if (assert(
    commerce &&
    commerce.compareStrip &&
    typeof commerce.compareStrip.pdValue === 'string' &&
    !/^\s*~\s*\$\d/.test(commerce.compareStrip.pdValue),
    'commerce.compareStrip.pdValue avoids the unsourced "~ $NN" exact-price comparison'
  )) passed++;
  else failed++;

  if (assert(
    sotPdfGuides &&
    sotPdfGuides.legal &&
    typeof sotPdfGuides.legal.operatorLine === 'string' &&
    sotPdfGuides.legal.operatorLine.length > 0,
    'config/sot.json#legal.operatorLine is set'
  )) passed++;
  else failed++;

  // Publish gate: when allowPlaceholderCheckout is false, Stripe links must be live
  if (commerce && commerce.allowPlaceholderCheckout === false) {
    const linkBeginners = commerce.stripePaymentLinks.beginners;
    const linkAdvanced = commerce.stripePaymentLinks.advanced;
    if (assert(
      !linkBeginners.includes('YOUR_') &&
      !linkAdvanced.includes('YOUR_') &&
      /^https:\/\/buy\.stripe\.com\//.test(linkBeginners) &&
      /^https:\/\/buy\.stripe\.com\//.test(linkAdvanced),
      'Publish gate: live buy.stripe.com URLs (no YOUR_ placeholders)'
    )) passed++;
    else failed++;
  } else {
    console.log('\u2139\ufe0f  Publish gate skipped: commerce.allowPlaceholderCheckout is true');
  }

  // index.html must not hardcode placeholder URLs (links live in SOT now)
  if (assert(!/YOUR_BEGINNERS_PDF_LINK|YOUR_ADVANCED_PDF_LINK/.test(html), 'index.html does not hardcode YOUR_*_PDF_LINK placeholders')) passed++;
  else failed++;

  // Footer hook for legal operator line
  if (assert(html.includes('data-legal-operator-line'), 'Footer exposes data-legal-operator-line hook')) passed++;
  else failed++;

  const beginnersCoverPath = path.join(__dirname, '..', 'assets', 'pdf-covers', 'beginners.png');
  if (assert(fs.existsSync(beginnersCoverPath), 'assets/pdf-covers/beginners.png exists')) passed++;
  else failed++;
  const advancedCoverPath = path.join(__dirname, '..', 'assets', 'pdf-covers', 'advanced.png');
  if (assert(fs.existsSync(advancedCoverPath), 'assets/pdf-covers/advanced.png exists')) passed++;
  else failed++;
  for (const productKey of ['beginners', 'advanced']) {
    for (const pageNum of [2, 3, 4]) {
      const samplePath = path.join(__dirname, '..', 'assets', 'pdf-covers', `${productKey}-p${pageNum}.png`);
      if (assert(fs.existsSync(samplePath), `assets/pdf-covers/${productKey}-p${pageNum}.png exists (sample preview)`)) passed++;
      else failed++;
    }
  }

  // --- Success page (post-purchase) ---
  const successHtml = readFile(path.join(__dirname, '..', 'success.html'));
  if (assert(successHtml && successHtml.includes('lang="en-US"') && successHtml.includes('noindex'), 'success.html exists, en-US, noindex')) passed++;
  else failed++;
  if (assert(successHtml && successHtml.includes('id="successState"') && successHtml.includes('aria-live="polite"'), 'success.html has live region for state updates')) passed++;
  else failed++;
  if (assert(successHtml && successHtml.includes('/api/download-link?session_id='), 'success.html polls /api/download-link')) passed++;
  else failed++;
  if (assert(successHtml && successHtml.includes('terms.html#paid-pdf-license') && successHtml.includes('14-day no-questions refund'), 'success.html repeats license + refund')) passed++;
  else failed++;
  if (assert(successHtml && successHtml.includes('cs_(?:test|live)_'), 'success.html validates Stripe session id format client-side')) passed++;
  else failed++;

  // --- /api/download-link endpoint ---
  const downloadLinkPath = path.join(__dirname, '..', 'api', 'download-link.js');
  const downloadLinkSrc = readFile(downloadLinkPath);
  if (assert(downloadLinkSrc && downloadLinkSrc.includes('getDownloadUrlBySessionId'), 'api/download-link.js wires getDownloadUrlBySessionId')) passed++;
  else failed++;
  if (assert(downloadLinkSrc && downloadLinkSrc.includes('STRIPE_SESSION_ID_PATTERN'), 'api/download-link.js validates session id format')) passed++;
  else failed++;
  if (assert(downloadLinkSrc && downloadLinkSrc.includes("'private, no-store'"), 'api/download-link.js sets Cache-Control: private, no-store')) passed++;
  else failed++;

  const fulfillmentHealthPath = path.join(__dirname, '..', 'api', 'fulfillment-health.js');
  const fulfillmentHealthSrc = readFile(fulfillmentHealthPath);
  if (assert(fulfillmentHealthSrc && fulfillmentHealthSrc.includes('checkFulfillmentHealth'), 'api/fulfillment-health.js exposes operator health check')) passed++;
  else failed++;

  // --- Rules ---
  if (assert(html.includes('id="rules"'), 'Rules section exists')) passed++;
  else failed++;
  if (assert(html.includes('id="rulesList"'), 'Rules list exists')) passed++;
  else failed++;

  // --- Copy button ---
  if (assert(html.includes('COPY PROMPT') || html.includes('Copy prompt'), 'Copy button exists')) passed++;
  else failed++;

  // --- Accessibility / semantics ---
  if (assert(html.includes('href="#main-content"') && html.includes('skip-link'), 'Skip link to main-content')) passed++;
  else failed++;
  if (assert(html.includes('id="main-content"') && html.includes('<main'), 'Main region (main-content)')) passed++;
  else failed++;
  if (assert(html.includes('id="toast"') && html.includes('role="status"'), 'Toast message present')) passed++;
  else failed++;
  if (assert(html.includes('privacy.html'), 'Link to privacy.html')) passed++;
  else failed++;
  if (assert(html.includes('terms.html'), 'Link to terms.html')) passed++;
  else failed++;
  if (assert(html.includes('lang="en-US"'), 'HTML lang="en-US" on index.html')) passed++;
  else failed++;

  // --- SEO basics ---
  if (assert(html.includes('<meta name="description"'), 'Meta description present')) passed++;
  else failed++;
  if (assert(html.includes('rel="canonical"'), 'Canonical link present')) passed++;
  else failed++;
  if (assert(html.includes('property="og:title"'), 'Open Graph title present')) passed++;
  else failed++;
  if (assert(html.includes('property="og:image:width"') && html.includes('property="og:image:height"'), 'Open Graph image dimensions present')) passed++;
  else failed++;
  if (assert(html.includes('name="robots"') && html.includes('index, follow'), 'Meta robots index, follow')) passed++;
  else failed++;
  if (assert(html.includes('rel="sitemap"'), 'Sitemap link in head')) passed++;
  else failed++;
  if (assert(html.includes('rel="manifest"'), 'Web app manifest link in head')) passed++;
  else failed++;
  if (assert(html.includes('rel="apple-touch-icon"'), 'Apple touch icon link in head')) passed++;
  else failed++;
  if (assert(html.includes('rel="mask-icon"'), 'Mask icon link in head')) passed++;
  else failed++;

  // --- Structured data (JSON-LD) ---
  if (assert(html.includes('<script type="application/ld+json">'), 'JSON-LD script tag present')) passed++;
  else failed++;
  if (assert(html.includes('"Organization"'), 'JSON-LD Organization entity')) passed++;
  else failed++;
  if (assert(html.includes('"SoftwareApplication"'), 'JSON-LD SoftwareApplication entity')) passed++;
  else failed++;
  if (assert(html.includes('"FAQPage"'), 'JSON-LD FAQPage entity')) passed++;
  else failed++;
  if (assert(html.includes('"WebSite"'), 'JSON-LD WebSite entity')) passed++;
  else failed++;
  if (assert(html.includes('"priceCurrency": "USD"'), 'JSON-LD offer in USD')) passed++;
  else failed++;
  if (assert(html.includes('Optional downloadable PDF guides are sold separately.'), 'FAQ clarifies optional paid PDFs')) passed++;
  else failed++;

  // --- Subresource Integrity ---
  if (assert(html.includes('integrity="sha384-') && html.includes('crossorigin="anonymous"'), 'Lucide CDN script uses SRI')) passed++;
  else failed++;

  const robotsTxt = readFile(path.join(__dirname, '..', 'robots.txt'));
  if (assert(robotsTxt && robotsTxt.includes('Sitemap: https://promptanatomy.online/sitemap.xml'), 'robots.txt sitemap URL')) passed++;
  else failed++;
  if (assert(robotsTxt && robotsTxt.includes('github.com/DITreneris/teacher'), 'robots.txt repo comment')) passed++;
  else failed++;
  if (assert(robotsTxt && robotsTxt.includes('OAI-SearchBot'), 'robots.txt declares OAI-SearchBot policy')) passed++;
  else failed++;
  if (assert(robotsTxt && robotsTxt.includes('PerplexityBot'), 'robots.txt declares PerplexityBot policy')) passed++;
  else failed++;
  if (assert(robotsTxt && robotsTxt.includes('GPTBot'), 'robots.txt declares GPTBot policy')) passed++;
  else failed++;
  if (assert(robotsTxt && robotsTxt.includes('Google-Extended'), 'robots.txt declares Google-Extended policy')) passed++;
  else failed++;
  if (assert(robotsTxt && robotsTxt.includes('ClaudeBot'), 'robots.txt declares ClaudeBot policy')) passed++;
  else failed++;

  const sitemapXml = readFile(path.join(__dirname, '..', 'sitemap.xml'));
  if (assert(sitemapXml && sitemapXml.includes('<lastmod>'), 'sitemap.xml has lastmod')) passed++;
  else failed++;
  if (assert(sitemapXml && sitemapXml.includes('xmlns:image='), 'sitemap.xml declares image namespace')) passed++;
  else failed++;
  if (assert(sitemapXml && sitemapXml.includes('og-image.png'), 'sitemap.xml references og-image.png')) passed++;
  else failed++;

  const humansTxt = readFile(path.join(__dirname, '..', 'humans.txt'));
  if (assert(humansTxt && humansTxt.length > 0, 'humans.txt exists')) passed++;
  else failed++;

  const llmsTxt = readFile(path.join(__dirname, '..', 'llms.txt'));
  if (assert(llmsTxt && llmsTxt.length > 0, 'llms.txt exists')) passed++;
  else failed++;
  if (assert(llmsTxt && llmsTxt.startsWith('# Classroom Prompt Builder'), 'llms.txt starts with product H1')) passed++;
  else failed++;
  if (assert(
    llmsTxt &&
    llmsTxt.includes('LESSON') &&
    llmsTxt.includes('ASSESSMENT') &&
    llmsTxt.includes('TASKS') &&
    llmsTxt.includes('PRESENTATION') &&
    llmsTxt.includes('STRATEGY'),
    'llms.txt lists all 5 modes'
  )) passed++;
  else failed++;

  const securityTxt = readFile(path.join(__dirname, '..', '.well-known', 'security.txt'));
  if (assert(securityTxt && securityTxt.includes('Contact:'), '.well-known/security.txt has Contact')) passed++;
  else failed++;
  if (assert(securityTxt && securityTxt.includes('Expires:'), '.well-known/security.txt has Expires')) passed++;
  else failed++;

  const manifest = readFile(path.join(__dirname, '..', 'manifest.webmanifest'));
  if (assert(manifest && manifest.includes('"name": "Classroom Prompt Builder"'), 'manifest.webmanifest exists with product name')) passed++;
  else failed++;

  const notFoundHtml = readFile(path.join(__dirname, '..', '404.html'));
  if (assert(notFoundHtml && notFoundHtml.includes('noindex'), '404.html has noindex meta')) passed++;
  else failed++;
  if (assert(notFoundHtml && notFoundHtml.includes('href="index.html"'), '404.html links back to index')) passed++;
  else failed++;

  const ogImage = path.join(__dirname, '..', 'og-image.png');
  if (assert(fs.existsSync(ogImage), 'og-image.png exists at repo root')) passed++;
  else failed++;

  const appleTouch = path.join(__dirname, '..', 'apple-touch-icon.png');
  if (assert(fs.existsSync(appleTouch), 'apple-touch-icon.png exists at repo root')) passed++;
  else failed++;

  const deployMd = readFile(path.join(__dirname, '..', 'DEPLOY.md'));
  if (assert(deployMd && deployMd.includes('DITreneris/teacher'), 'DEPLOY.md references teacher repo')) passed++;
  else failed++;

  // --- Legal pages: lang and JSON-LD ---
  const privacyHtml = readFile(PRIVACY_PATH);
  const termsHtml = readFile(TERMS_PATH);
  if (assert(privacyHtml && privacyHtml.includes('lang="en-US"'), 'privacy.html uses lang="en-US"')) passed++;
  else failed++;
  if (assert(termsHtml && termsHtml.includes('lang="en-US"'), 'terms.html uses lang="en-US"')) passed++;
  else failed++;
  if (assert(privacyHtml && privacyHtml.includes('"BreadcrumbList"'), 'privacy.html has BreadcrumbList JSON-LD')) passed++;
  else failed++;
  if (assert(termsHtml && termsHtml.includes('"BreadcrumbList"'), 'terms.html has BreadcrumbList JSON-LD')) passed++;
  else failed++;
  if (assert(privacyHtml && privacyHtml.includes('Stripe') && privacyHtml.includes('Resend'), 'privacy.html discloses purchase providers')) passed++;
  else failed++;
  if (assert(termsHtml && termsHtml.includes('Paid PDF guides') && termsHtml.includes('secure, time-limited download link'), 'terms.html covers paid PDF delivery')) passed++;
  else failed++;
  if (assert(termsHtml && termsHtml.includes('id="paid-pdf-license"') && termsHtml.includes('Classroom License'), 'terms.html has #paid-pdf-license anchor with Classroom License')) passed++;
  else failed++;
  if (assert(termsHtml && termsHtml.includes('14-day no-questions refund'), 'terms.html surfaces the 14-day refund clause')) passed++;
  else failed++;

  // --- ARIA ---
  if (assert(html.includes('role="tablist"'), 'Mode tabs have role="tablist"')) passed++;
  else failed++;
  if (assert(html.includes('role="tabpanel"'), 'Form panels have role="tabpanel"')) passed++;
  else failed++;
  if (assert(html.includes('id="classBadge"'), 'Class badge exists')) passed++;
  else failed++;
  if (assert(html.includes('aria-live="polite"'), 'Live region output')) passed++;
  else failed++;

  // --- Module files ---
  if (assert(html.includes('href="style.css"'), 'Link to style.css')) passed++;
  else failed++;
  if (assert(/src="generator\.js(?:\?[^"]*)?"/.test(html), 'Script src generator.js')) passed++;
  if (assert(fs.existsSync(path.join(__dirname, '..', 'analytics.js')), 'analytics.js exists')) passed++;
  if (assert(fs.existsSync(path.join(__dirname, '..', 'vendor', 'vercel-analytics.mjs')), 'vendor/vercel-analytics.mjs exists')) passed++;
  if (assert(/analytics\.js/.test(html), 'index.html loads Vercel Analytics module')) passed++;
  if (
    assert(
      /data-stripe-cta="beginners"[^>]*href="https:\/\/buy\.stripe\.com\//.test(html) ||
        /href="https:\/\/buy\.stripe\.com\/[^"]*"[^>]*data-stripe-cta="beginners"/.test(html),
      'Beginners PDF CTA has static buy.stripe.com href fallback'
    )
  ) passed++;
  if (
    assert(
      /data-stripe-cta="advanced"[^>]*href="https:\/\/buy\.stripe\.com\//.test(html) ||
        /href="https:\/\/buy\.stripe\.com\/[^"]*"[^>]*data-stripe-cta="advanced"/.test(html),
      'Advanced PDF CTA has static buy.stripe.com href fallback'
    )
  ) passed++;
  else failed++;
  if (assert(html.includes('src="copy.js"'), 'Script src copy.js')) passed++;
  else failed++;
  if (assert(html.includes('hiddenTextarea'), 'Fallback textarea for copying')) passed++;
  else failed++;

  // --- File existence ---
  const styleFile = readFile(STYLE_PATH);
  if (assert(styleFile !== null && styleFile.length > 0, 'style.css file exists')) passed++;
  else failed++;
  const sotFile = readFile(SOT_PATH);
  if (assert(sotFile !== null && sotFile.length > 0, 'config/sot.json file exists')) passed++;
  else failed++;
  const generatorFile = readFile(GENERATOR_PATH);
  if (assert(generatorFile !== null && generatorFile.length > 0, 'generator.js file exists')) passed++;
  else failed++;
  const copyFile = readFile(COPY_PATH);
  if (assert(copyFile !== null && copyFile.length > 0, 'copy.js file exists')) passed++;
  else failed++;
  const webhookFile = readFile(WEBHOOK_PATH);
  if (assert(webhookFile && webhookFile.includes('constructEvent'), 'Stripe webhook verifies signatures')) passed++;
  else failed++;
  if (assert(webhookFile && webhookFile.includes('assertFulfillmentConfigured'), 'Stripe webhook validates fulfillment env before processing')) passed++;
  else failed++;
  const downloadFile = readFile(DOWNLOAD_PATH);
  if (assert(downloadFile && downloadFile.includes('resolveDownload'), 'Download route validates tokens')) passed++;
  else failed++;
  const fulfillmentFile = readFile(FULFILLMENT_PATH);
  if (assert(fulfillmentFile && fulfillmentFile.includes('DOWNLOAD_TOKEN_SECRET') && fulfillmentFile.includes('timingSafeEqual'), 'Fulfillment helper signs download tokens')) passed++;
  else failed++;
  if (assert(fulfillmentFile && fulfillmentFile.includes('getDownloadUrlBySessionId') && fulfillmentFile.includes('IN_PAGE_DOWNLOAD_TOKEN_TTL_SECONDS') && fulfillmentFile.includes('maskEmail'), 'Fulfillment helper exposes in-page download URL helper + email masking')) passed++;
  if (assert(fulfillmentFile && fulfillmentFile.includes('getProductByAmountCents'), 'Fulfillment maps Payment Link amounts ($4.99 / $9.99) when price env vars mismatch')) passed++;
  else failed++;
  if (assert(fulfillmentFile && fulfillmentFile.includes('assertFulfillmentConfigured') && fulfillmentFile.includes('checkFulfillmentHealth'), 'Fulfillment helper validates env + health probe')) passed++;
  else failed++;
  if (assert(fulfillmentFile && fulfillmentFile.includes('BLOB_READ_WRITE_TOKEN') && /blob\\.vercel-storage\\.com/.test(fulfillmentFile), 'Fulfillment authenticates Vercel Blob private PDF fetches')) passed++;
  else failed++;

  // --- Legal pages exist ---
  const privacy = readFile(PRIVACY_PATH);
  if (assert(privacy !== null && privacy.length > 0, 'privacy.html exists')) passed++;
  else failed++;
  const terms = readFile(TERMS_PATH);
  if (assert(terms !== null && terms.length > 0, 'terms.html exists')) passed++;
  else failed++;

  // --- generator.js checks ---
  if (assert(generatorFile && generatorFile.includes('localStorage'), 'localStorage used (generator.js)')) passed++;
  else failed++;
  if (assert(generatorFile && generatorFile.includes('LIBRARY_PROMPTS'), 'LIBRARY_PROMPTS defined (generator.js)')) passed++;
  else failed++;
  if (assert(generatorFile && generatorFile.includes('activeClassLevel'), 'activeClassLevel used (generator.js)')) passed++;
  else failed++;
  if (assert(generatorFile && generatorFile.includes('MODES'), 'MODES defined (generator.js)')) passed++;
  else failed++;

  // --- CSS variables ---
  if (assert(styleFile && styleFile.includes('--primary: #0F2A44'), 'CSS variable --primary: #0F2A44')) passed++;
  else failed++;

  console.log('\n---');
  console.log(`Result: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
  console.log('All structural tests pass.\n');
}

run();
