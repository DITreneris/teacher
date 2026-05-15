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
  if (assert(html.includes('src="generator.js"'), 'Script src generator.js')) passed++;
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
