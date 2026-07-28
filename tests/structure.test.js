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

/** Read PNG width/height from IHDR (sync, no sharp in hot path). */
function readPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length < 24 || buf.toString('ascii', 1, 4) !== 'PNG') {
    return null;
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function extractFaqJsonLd(html) {
  const match = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  if (!match) return null;
  try {
    const data = JSON.parse(match[1]);
    const graph = data['@graph'];
    if (!Array.isArray(graph)) return null;
    return graph.find(function (node) {
      return node['@id'] === 'https://promptanatomy.online/#faq';
    });
  } catch (_e) {
    return null;
  }
}

function offerHasMerchantFields(offer) {
  return !!(
    offer &&
    offer.shippingDetails &&
    offer.shippingDetails['@type'] === 'OfferShippingDetails' &&
    offer.hasMerchantReturnPolicy &&
    offer.hasMerchantReturnPolicy['@type'] === 'MerchantReturnPolicy' &&
    offer.hasMerchantReturnPolicy.merchantReturnDays === 14
  );
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
  if (assert(html.includes('/assets/pdf-covers/beginners.webp') && html.includes('/assets/pdf-covers/advanced.webp'), 'PDF cards offer WebP source siblings via <picture>')) passed++;
  else failed++;
  if (assert(/<source type="image\/webp" srcset="\/assets\/pdf-covers\/beginners\.webp">[\s\S]*?fetchpriority="high"/.test(html), 'Beginners cover uses <picture> with fetchpriority="high" on the LCP image')) passed++;
  else failed++;
  const webpFiles = [
    'beginners.webp',
    'advanced.webp',
    'beginners-p2.webp',
    'beginners-p3.webp',
    'beginners-p4.webp',
    'advanced-p2.webp',
    'advanced-p3.webp',
    'advanced-p4.webp'
  ];
  const webpPresent = webpFiles.every(function (name) {
    return fs.existsSync(path.join(__dirname, '..', 'assets', 'pdf-covers', name));
  });
  if (assert(webpPresent, 'assets/pdf-covers/ has WebP siblings for covers and sample pages')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-card-cover"') && /alt="Cover of [^"]+"/.test(html), 'Cover figures expose non-empty alt text')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-specs"') && html.includes('12 pages') && html.includes('24 pages'), 'Specs row lists length for both guides')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-license"') && html.includes('Classroom license') && html.includes('terms.html#paid-pdf-license'), 'Classroom license line links to terms anchor')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-refund"') && html.includes('14-day no-questions refund'), '14-day refund badge present in shared PDF assurance strip')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guide-trust"') && html.includes('Stripe checkout') && html.includes('Apple Pay') && html.includes('256-bit SSL'), 'Trust row lists Stripe, card brands, Apple Pay, and SSL')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-guides-assurance"') && html.includes('class="pdf-guide-promise"') && html.includes('data-commerce-delivery-promise'), 'Shared PDF assurance strip with delivery promise hook exists')) passed++;
  else failed++;
  if (assert(html.includes('data-preview-trigger="beginners"') && html.includes('data-preview-trigger="advanced"'), 'Preview-3-pages buttons exist for both guides')) passed++;
  else failed++;
  if (assert(html.includes('id="pdfPreviewDialog"') && html.includes('aria-labelledby="pdfPreviewTitle"') && html.includes('id="pdfPreviewClose"'), 'Preview lightbox <dialog> with labelled title and close button is present')) passed++;
  else failed++;
  if (assert(html.includes('data-toc="beginners"') && html.includes('data-toc="advanced"') && html.includes('data-toc-list="beginners"'), 'Whats inside TOC accordion exists for both guides with data-toc-list hooks')) passed++;
  else failed++;
  if (assert(html.includes('id="product-faq"') && html.includes('data-product-faq-list') && html.includes('id="product-faq-free"'), 'Product FAQ section with static no-JS answers present')) passed++;
  else failed++;
  if (assert(html.includes('id="pdf-guides-faq"') && html.includes('data-buyer-faq-list') && html.includes('id="buyer-faq-multi-classroom"'), 'Buyer FAQ section + static no-JS answers + populate hook present')) passed++;
  else failed++;
  if (assert(html.includes('"@id": "https://promptanatomy.online/#faq"') && html.includes('"name": "Is Classroom Prompt Builder free?"'), 'FAQ JSON-LD entry present with product question')) passed++;
  else failed++;

  let faqPageCount = 0;
  let faqHasPageName = false;
  try {
    const faqMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    if (faqMatch) {
      const faqData = JSON.parse(faqMatch[1]);
      const faqGraph = Array.isArray(faqData['@graph']) ? faqData['@graph'] : [];
      faqPageCount = faqGraph.filter(function (node) { return node && node['@type'] === 'FAQPage'; }).length;
      const faqPage = faqGraph.find(function (node) {
        return node && node['@type'] === 'FAQPage' && node['@id'] === 'https://promptanatomy.online/#faq';
      });
      faqHasPageName = !!(faqPage && faqPage.name === 'FAQ');
    }
  } catch (_e) {
    faqPageCount = 0;
    faqHasPageName = false;
  }
  if (assert(faqPageCount === 1, 'Exactly one FAQPage entity in JSON-LD @graph')) passed++;
  else failed++;
  if (assert(faqHasPageName, 'FAQPage JSON-LD includes page-level name FAQ')) passed++;
  else failed++;

  let faqJsonLdSync = false;
  try {
    const sotForFaq = JSON.parse(readFile(SOT_PATH));
    const faqNode = extractFaqJsonLd(html);
    const sotProductFaq = Array.isArray(sotForFaq.productFaq) ? sotForFaq.productFaq : [];
    const sotBuyerFaq = Array.isArray(sotForFaq.buyerFaq) ? sotForFaq.buyerFaq : [];
    const expectedFaq = sotProductFaq.concat(sotBuyerFaq);
    if (faqNode && Array.isArray(faqNode.mainEntity)) {
      faqJsonLdSync =
        faqNode.mainEntity.length === expectedFaq.length &&
        expectedFaq.every(function (item, index) {
          const entity = faqNode.mainEntity[index];
          return (
            entity &&
            entity.name === item.q &&
            entity.acceptedAnswer &&
            entity.acceptedAnswer.text === item.a
          );
        });
    }
  } catch (_e) {
    faqJsonLdSync = false;
  }
  if (assert(faqJsonLdSync, 'FAQ JSON-LD matches config/sot.json#productFaq + #buyerFaq')) passed++;
  else failed++;
  if (assert(html.includes('id="lostLinkMailto"') && html.includes('mailto:info@promptanatomy.app?subject=Resend'), 'Lost-your-link footer mailto link present')) passed++;
  else failed++;
  if (assert(html.includes('class="pdf-testimonials"') && html.includes('data-commerce-testimonials') && html.includes('class="pdf-testimonial"'), 'Testimonials list + commerce hook + static no-JS quote present')) passed++;
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
    Array.isArray(sotPdfGuides.productFaq) &&
    sotPdfGuides.productFaq.length === 4 &&
    sotPdfGuides.productFaq.every(function (item) { return item.id && item.q && item.a; }),
    'config/sot.json#productFaq has 4 well-formed product questions'
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

  // --- Legal business address (CAN-SPAM / SEO / crawlers) ---
  const legalAddress = sotPdfGuides && sotPdfGuides.legal && sotPdfGuides.legal.address;
  if (assert(
    legalAddress &&
    typeof legalAddress === 'object' &&
    typeof legalAddress.street1 === 'string' && legalAddress.street1.length > 0 &&
    typeof legalAddress.locality === 'string' && legalAddress.locality.length > 0 &&
    typeof legalAddress.region === 'string' && legalAddress.region.length > 0 &&
    typeof legalAddress.postalCode === 'string' && legalAddress.postalCode.length > 0 &&
    typeof legalAddress.country === 'string' && legalAddress.country.length > 0,
    'config/sot.json#legal.address has street1/locality/region/postalCode/country'
  )) passed++;
  else failed++;

  // Footer renders a semantic <address> with crawler-friendly microdata + statically baked values
  if (assert(
    /<address[^>]*class="footer-address"[^>]*data-legal-address[^>]*itemtype="https:\/\/schema\.org\/PostalAddress"[\s\S]*?<\/address>/i.test(html),
    'Footer has semantic <address class="footer-address"> with schema.org PostalAddress microdata'
  )) passed++;
  else failed++;

  if (assert(
    html.includes('1311 Park St, Unit #654') &&
    html.includes('Alameda') &&
    html.includes('CA') &&
    html.includes('94501'),
    'Footer address is statically rendered (Alameda, CA 94501) for robots and crawlers'
  )) passed++;
  else failed++;

  // Organization JSON-LD must include the same PostalAddress so search crawlers pick it up
  if (assert(
    /"@type":\s*"Organization"[\s\S]*?"address":\s*\{[\s\S]*?"@type":\s*"PostalAddress"[\s\S]*?"streetAddress":\s*"1311 Park St, Unit #654"[\s\S]*?"addressLocality":\s*"Alameda"[\s\S]*?"addressRegion":\s*"CA"[\s\S]*?"postalCode":\s*"94501"[\s\S]*?"addressCountry":\s*"US"/.test(html),
    'Organization JSON-LD includes PostalAddress (1311 Park St, Unit #654, Alameda, CA 94501, US)'
  )) passed++;
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

  if (assert(html.includes('class="hero-content"'), 'hero-content wrapper present in index.html')) passed++;
  else failed++;
  const heroTail = html.slice(html.indexOf('id="heroCtaMeta"'));
  const closeTag = '</' + 'div>';
  const firstClose = heroTail.indexOf(closeTag);
  const secondClose = heroTail.indexOf(closeTag, firstClose + 1);
  const cardIdx = heroTail.indexOf('class="hero-prompt-card"');
  if (assert(secondClose > firstClose && cardIdx > secondClose, 'hero-prompt-card is outside hero-content')) passed++;
  else failed++;
  if (assert(html.includes('hero-prompt-card__chrome'), 'hero-prompt-card chrome bar present')) passed++;
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
  if (assert(html.includes('property="og:image:type"') && html.includes('content="image/png"'), 'Open Graph image type present')) passed++;
  else failed++;
  if (assert(html.includes('"screenshot": "https://promptanatomy.online/og-image.png"'), 'JSON-LD SoftwareApplication screenshot')) passed++;
  else failed++;
  if (assert(html.includes('"countriesSupported": "US"'), 'JSON-LD SoftwareApplication countriesSupported US')) passed++;
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
  if (assert(html.includes('Optional paid PDF guides are available separately.'), 'SoftwareApplication JSON-LD clarifies optional paid PDFs')) passed++;
  else failed++;

  // --- Product JSON-LD (paid PDFs, SOT-driven) ---
  if (assert(html.includes('id="product-jsonld"'), 'Product JSON-LD script tag (#product-jsonld) present')) passed++;
  else failed++;
  let productJsonLdHasBoth = false;
  let productJsonLdHasMerchantFields = false;
  try {
    const match = html.match(/<script type="application\/ld\+json" id="product-jsonld">\s*([\s\S]*?)\s*<\/script>/);
    if (match) {
      const data = JSON.parse(match[1]);
      const graph = Array.isArray(data['@graph']) ? data['@graph'] : [];
      const beginners = graph.find((n) => n && n['@type'] === 'Product' && /Beginners/.test(n.name || ''));
      const advanced = graph.find((n) => n && n['@type'] === 'Product' && /Advanced/.test(n.name || ''));
      productJsonLdHasBoth = !!(
        beginners && beginners.offers && beginners.offers.price === '4.99' && beginners.offers.priceCurrency === 'USD' &&
        advanced && advanced.offers && advanced.offers.price === '9.99' && advanced.offers.priceCurrency === 'USD'
      );
      productJsonLdHasMerchantFields = !!(
        beginners && beginners.description &&
        advanced && advanced.description &&
        offerHasMerchantFields(beginners.offers) &&
        offerHasMerchantFields(advanced.offers)
      );
    }
  } catch (_e) {
    productJsonLdHasBoth = false;
    productJsonLdHasMerchantFields = false;
  }
  if (assert(productJsonLdHasBoth, 'Product JSON-LD lists Beginners ($4.99) and Advanced ($9.99) Offers in USD')) passed++;
  else failed++;
  if (assert(productJsonLdHasMerchantFields, 'Product JSON-LD includes description, shippingDetails, and hasMerchantReturnPolicy')) passed++;
  else failed++;

  let productSotSync = false;
  try {
    const sotForProducts = JSON.parse(readFile(SOT_PATH));
    const products = sotForProducts.commerce && sotForProducts.commerce.products;
    productSotSync = !!(
      products &&
      products.beginners && products.beginners.price === '4.99' && products.beginners.currency === 'USD' && products.beginners.description &&
      products.advanced && products.advanced.price === '9.99' && products.advanced.currency === 'USD' && products.advanced.description
    );
  } catch (_e) {
    productSotSync = false;
  }
  if (assert(productSotSync, 'config/sot.json#commerce.products exposes both guides with USD prices')) passed++;
  else failed++;

  // --- Self-hosted fonts (no Google Fonts CDN in shipped HTML) ---
  if (assert(!html.includes('fonts.googleapis.com') && !html.includes('fonts.gstatic.com'), 'index.html does not load Google Fonts CDN')) passed++;
  else failed++;
  if (assert(
    html.includes('/assets/fonts/Inter-Regular.woff2')
      && html.includes('/assets/fonts/Inter-Medium.woff2')
      && html.includes('/assets/fonts/Inter-Bold.woff2'),
    'index.html preloads self-hosted Inter Regular + Medium + Bold'
  )) passed++;
  else failed++;
  const fontFiles = [
    'Inter-Regular.woff2',
    'Inter-Medium.woff2',
    'Inter-SemiBold.woff2',
    'Inter-Bold.woff2',
    'Inter-ExtraBold.woff2',
    'JetBrainsMono-Medium.woff2',
    'JetBrainsMono-SemiBold.woff2'
  ];
  const fontsPresent = fontFiles.every(function (name) {
    return fs.existsSync(path.join(__dirname, '..', 'assets', 'fonts', name));
  });
  if (assert(fontsPresent, 'assets/fonts/ has the full self-hosted WOFF2 set (Inter 400-800, JetBrains Mono 500/600)')) passed++;
  else failed++;
  const styleFileForFonts = readFile(STYLE_PATH);
  if (assert(styleFileForFonts && /@font-face[^}]+font-family:\s*'Inter'/.test(styleFileForFonts), 'style.css declares @font-face for Inter')) passed++;
  else failed++;

  // --- Icon sprite (no Lucide CDN) ---
  if (assert(!html.includes('unpkg.com/lucide') && !html.includes('lucide.min.js'), 'index.html does not load Lucide from unpkg')) passed++;
  else failed++;
  if (assert(html.includes('src="icons.js"') && html.includes('/assets/icons.svg#icon-'), 'icons.js + SVG sprite use() hooks present')) passed++;
  else failed++;
  if (assert(fs.existsSync(path.join(__dirname, '..', 'assets', 'icons.svg')), 'assets/icons.svg sprite file exists')) passed++;
  else failed++;
  const vercelJsonForCsp = readFile(path.join(__dirname, '..', 'vercel.json'));
  if (assert(vercelJsonForCsp && !vercelJsonForCsp.includes('https://unpkg.com'), 'vercel.json CSP drops unpkg.com')) passed++;
  else failed++;

  const robotsTxt = readFile(path.join(__dirname, '..', 'robots.txt'));
  if (assert(robotsTxt && robotsTxt.includes('Sitemap: https://promptanatomy.online/sitemap.xml'), 'robots.txt sitemap URL')) passed++;
  else failed++;
  if (assert(robotsTxt && robotsTxt.includes('Disallow: /docs/'), 'robots.txt disallows /docs/ authoring paths')) passed++;
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
  const OG_MAX_BYTES = 300 * 1024;
  if (assert(fs.statSync(ogImage).size <= OG_MAX_BYTES, 'og-image.png is at most 300 KB')) passed++;
  else failed++;
  const ogDims = readPngDimensions(ogImage);
  if (assert(ogDims && ogDims.width === 1200 && ogDims.height === 630, 'og-image.png is 1200x630')) passed++;
  else failed++;

  const ogGen = path.join(__dirname, '..', 'scripts', 'generate-og-image.js');
  if (assert(fs.existsSync(ogGen), 'scripts/generate-og-image.js exists (Satori-driven OG generator)')) passed++;
  else failed++;
  const interBold = path.join(__dirname, '..', 'assets', 'fonts', 'Inter-Bold.woff');
  const interMedium = path.join(__dirname, '..', 'assets', 'fonts', 'Inter-Medium.woff');
  if (assert(fs.existsSync(interBold) && fs.existsSync(interMedium), 'Inter font buffers (Bold + Medium WOFF) present for OG generator')) passed++;
  else failed++;
  const ofl = path.join(__dirname, '..', 'assets', 'fonts', 'OFL.txt');
  if (assert(fs.existsSync(ofl), 'assets/fonts/OFL.txt SIL Open Font License present')) passed++;
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

  // Legal pages must also surface the business postal address (CAN-SPAM / consumer info)
  if (assert(
    privacyHtml &&
    privacyHtml.includes('1311 Park St, Unit #654') &&
    privacyHtml.includes('Alameda') &&
    privacyHtml.includes('94501') &&
    /<address[^>]*class="legal-address"/i.test(privacyHtml),
    'privacy.html Contact section includes business address (1311 Park St, Unit #654, Alameda, CA 94501)'
  )) passed++;
  else failed++;

  if (assert(
    termsHtml &&
    termsHtml.includes('1311 Park St, Unit #654') &&
    termsHtml.includes('Alameda') &&
    termsHtml.includes('94501') &&
    /<address[^>]*class="legal-address"/i.test(termsHtml),
    'terms.html Contact section includes business address (1311 Park St, Unit #654, Alameda, CA 94501)'
  )) passed++;
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
  if (assert(/href="style\.css(?:\?[^"]*)?"/.test(html), 'Link to style.css')) passed++;
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

  // --- Mobile PDF commerce CSS guards (regression) ---
  if (
    assert(
      styleFile &&
        /@media\s*\(max-width:\s*480px\)/.test(styleFile) &&
        /\.pdf-compare-strip-row[\s\S]*flex-direction:\s*column/.test(styleFile) &&
        /\.pdf-preview-dialog-pages[\s\S]*scroll-snap-type:\s*x mandatory/.test(styleFile) &&
        /\.pdf-guides-grid\s*\{\s*order:\s*2/.test(styleFile),
      'style.css has mobile rules for PDF compare strip, preview dialog, and cards-first order'
    )
  ) passed++;
  else failed++;

  // --- SEO / GEO / AI crawler additions (2026-05-20) ---

  // D1. llms-full.txt: existence + non-trivial size + 5 modes literally + buyer FAQ
  const llmsFullTxt = readFile(path.join(__dirname, '..', 'llms-full.txt'));
  if (assert(llmsFullTxt && llmsFullTxt.length > 4096, 'llms-full.txt exists and is non-trivial (> 4 KB)')) passed++;
  else failed++;
  if (
    assert(
      llmsFullTxt &&
        /LESSON[\s\S]+ASSESSMENT[\s\S]+TASKS[\s\S]+PRESENTATION[\s\S]+STRATEGY/.test(llmsFullTxt),
      'llms-full.txt covers all 5 modes literally'
    )
  ) passed++;
  else failed++;
  if (
    assert(
      llmsFullTxt && /BUYER FAQ/i.test(llmsFullTxt) && /Privacy Policy Summary/i.test(llmsFullTxt),
      'llms-full.txt includes Buyer FAQ + Privacy Policy summary sections'
    )
  ) passed++;
  else failed++;

  // D2. SoftwareApplication JSON-LD freshness signals
  if (
    assert(
      /"datePublished":\s*"\d{4}-\d{2}-\d{2}"/.test(html) &&
        /"dateModified":\s*"\d{4}-\d{2}-\d{2}"/.test(html),
      'index.html SoftwareApplication JSON-LD has datePublished + dateModified'
    )
  ) passed++;
  else failed++;

  // D3. hreflang on indexable HTML pages (en-us + x-default)
  for (const [pageLabel, pageHtml] of [
    ['index.html', html],
    ['privacy.html', readFile(PRIVACY_PATH)],
    ['terms.html', readFile(TERMS_PATH)]
  ]) {
    if (
      assert(
        pageHtml &&
          /<link\s+rel="alternate"\s+hreflang="en-us"/i.test(pageHtml) &&
          /<link\s+rel="alternate"\s+hreflang="x-default"/i.test(pageHtml),
        `${pageLabel} declares hreflang en-us + x-default`
      )
    ) passed++;
    else failed++;
  }

  // D4. vercel.json X-Robots-Tag headers
  let vercelJson = null;
  try {
    vercelJson = JSON.parse(readFile(path.join(__dirname, '..', 'vercel.json')));
  } catch (_e) {
    vercelJson = null;
  }
  const vercelHeaders = (vercelJson && vercelJson.headers) || [];
  function findHeaderBlock(source) {
    return vercelHeaders.find(function (h) { return h && h.source === source; });
  }
  function blockHasHeader(block, key, valueRegex) {
    if (!block || !Array.isArray(block.headers)) return false;
    return block.headers.some(function (h) {
      return h && h.key === key && (valueRegex ? valueRegex.test(h.value) : true);
    });
  }
  const apiBlock = findHeaderBlock('/api/(.*)');
  if (
    assert(
      blockHasHeader(apiBlock, 'X-Robots-Tag', /noindex/i),
      'vercel.json /api/(.*) sets X-Robots-Tag: noindex, nofollow'
    )
  ) passed++;
  else failed++;
  const docsBlock = findHeaderBlock('/docs/(.*)');
  if (
    assert(
      blockHasHeader(docsBlock, 'X-Robots-Tag', /noindex/i),
      'vercel.json /docs/(.*) sets X-Robots-Tag: noindex, nofollow'
    )
  ) passed++;
  else failed++;
  const ogBlock = findHeaderBlock('/og-image.png');
  if (
    assert(
      blockHasHeader(ogBlock, 'X-Robots-Tag', /^all$/i),
      'vercel.json /og-image.png sets X-Robots-Tag: all (explicit indexing allow)'
    )
  ) passed++;
  else failed++;
  const llmsFullBlock = findHeaderBlock('/llms-full.txt');
  if (
    assert(
      blockHasHeader(llmsFullBlock, 'Content-Type', /text\/plain/i),
      'vercel.json serves /llms-full.txt as text/plain; charset=utf-8'
    )
  ) passed++;
  else failed++;

  // D5. WebPage JSON-LD on legal pages
  function hasWebPageEntity(pageHtml, urlPath) {
    if (!pageHtml) return false;
    const match = pageHtml.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    if (!match) return false;
    try {
      const data = JSON.parse(match[1]);
      const graph = Array.isArray(data['@graph']) ? data['@graph'] : [];
      return graph.some(function (node) {
        return (
          node &&
          node['@type'] === 'WebPage' &&
          node.url === `https://promptanatomy.online${urlPath}` &&
          node.isPartOf &&
          node.isPartOf['@id'] === 'https://promptanatomy.online/#website' &&
          /^\d{4}-\d{2}-\d{2}$/.test(node.dateModified || '')
        );
      });
    } catch (_e) {
      return false;
    }
  }
  const privacyHtmlForJsonLd = readFile(PRIVACY_PATH);
  const termsHtmlForJsonLd = readFile(TERMS_PATH);
  if (
    assert(
      hasWebPageEntity(privacyHtmlForJsonLd, '/privacy.html'),
      'privacy.html JSON-LD @graph has WebPage entity with isPartOf #website + dateModified'
    )
  ) passed++;
  else failed++;
  if (
    assert(
      hasWebPageEntity(termsHtmlForJsonLd, '/terms.html'),
      'terms.html JSON-LD @graph has WebPage entity with isPartOf #website + dateModified'
    )
  ) passed++;
  else failed++;

  // D6. HowTo + Person founder + audience.geographicArea on home
  if (
    assert(
      /"@type":\s*"HowTo"/.test(html) && /"@type":\s*"HowToStep"/.test(html),
      'index.html @graph has HowTo entity with HowToStep children'
    )
  ) passed++;
  else failed++;
  if (
    assert(
      /"founder":\s*\{[\s\S]*?"@type":\s*"Person"[\s\S]*?"name":\s*"Tomas Staniulis"/.test(html),
      'index.html Organization has Person founder (E-E-A-T)'
    )
  ) passed++;
  else failed++;
  if (
    assert(
      /"geographicArea":\s*\{[\s\S]*?"name":\s*"United States"\s*\}/.test(html) &&
        /"availableLanguage":\s*"en-US"/.test(html),
      'SoftwareApplication audience.geographicArea + Organization availableLanguage signal US targeting'
    )
  ) passed++;
  else failed++;

  // D7. robots.txt: 2026 bot policy (auditability) + social unfurlers
  if (
    assert(
      robotsTxt &&
        /^User-agent:\s*GoogleOther\s*$/m.test(robotsTxt) &&
        /^User-agent:\s*DuckAssistBot\s*$/m.test(robotsTxt) &&
        /^User-agent:\s*Claude-User\s*$/m.test(robotsTxt) &&
        /^User-agent:\s*Mistral-AI\s*$/m.test(robotsTxt),
      'robots.txt enumerates 2026 AI bots (GoogleOther, DuckAssistBot, Claude-User, Mistral-AI)'
    )
  ) passed++;
  else failed++;
  if (
    assert(
      robotsTxt &&
        /^User-agent:\s*Twitterbot\s*$/m.test(robotsTxt) &&
        /^User-agent:\s*facebookexternalhit\s*$/m.test(robotsTxt) &&
        /^User-agent:\s*LinkedInBot\s*$/m.test(robotsTxt),
      'robots.txt enumerates social link unfurlers (Twitterbot, facebookexternalhit, LinkedInBot)'
    )
  ) passed++;
  else failed++;

  // D8. scripts/update-sitemap-lastmod.js + npm script
  const sitemapScript = readFile(path.join(__dirname, '..', 'scripts', 'update-sitemap-lastmod.js'));
  if (
    assert(
      sitemapScript && sitemapScript.includes('updateSitemap') && sitemapScript.includes('updateHomepageJsonLd'),
      'scripts/update-sitemap-lastmod.js exists and bumps sitemap + JSON-LD dateModified'
    )
  ) passed++;
  else failed++;
  let pkgJson = null;
  try {
    pkgJson = JSON.parse(readFile(path.join(__dirname, '..', 'package.json')));
  } catch (_e) {
    pkgJson = null;
  }
  if (
    assert(
      pkgJson && pkgJson.scripts && pkgJson.scripts['sitemap:update'] === 'node scripts/update-sitemap-lastmod.js',
      'package.json exposes "sitemap:update" script'
    )
  ) passed++;
  else failed++;

  // D9. llms.txt link bullet spec (llmstxt.org format)
  if (
    assert(
      llmsTxt && /-\s*\[Home\]\(https:\/\/promptanatomy\.online\/\)/.test(llmsTxt) &&
        /-\s*\[Full content\]\(https:\/\/promptanatomy\.online\/llms-full\.txt\)/.test(llmsTxt),
      'llms.txt uses llmstxt.org Markdown link bullets and references /llms-full.txt'
    )
  ) passed++;
  else failed++;

  // --- SOT theme.light matches canonical CSS tokens ---
  let sotThemeSync = false;
  try {
    const sotJson = JSON.parse(sotFile);
    const light = sotJson.theme && sotJson.theme.light;
    const expected = {
      '--primary': '#0F2A44',
      '--accent-gold': '#F5C518',
      '--surface-0': '#F4F7FB',
      '--surface-1': '#FFFFFF',
      '--border': '#E6ECF2',
      '--text': '#1C2B3A'
    };
    sotThemeSync =
      light &&
      Object.keys(expected).every(function (key) {
        return String(light[key]).toLowerCase() === expected[key].toLowerCase();
      }) &&
      sotJson.colors &&
      sotJson.colors.deepBlue === '#0F2A44' &&
      sotJson.colors.primaryYellow === '#F5C518' &&
      sotJson.colors.textSecondary === '#6B7A8C' &&
      styleFile.includes('--text-light: #6B7A8C');
  } catch (_e) {
    sotThemeSync = false;
  }
  if (assert(sotThemeSync, 'config/sot.json#theme.light aligns with style.css brand tokens')) passed++;
  else failed++;

  console.log('\n---');
  console.log(`Result: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
  console.log('All structural tests pass.\n');
}

run();
