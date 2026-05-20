#!/usr/bin/env node
/**
 * update-sitemap-lastmod.js
 *
 * Reads file mtimes for index.html, privacy.html, and terms.html and
 * synchronises the matching <lastmod>YYYY-MM-DD</lastmod> entries in
 * sitemap.xml plus the SoftwareApplication "dateModified" in index.html
 * (homepage entry only). Run before deploy:
 *
 *     npm run sitemap:update
 *
 * Idempotent. Safe to re-run; a no-op when mtimes match the values in
 * sitemap.xml.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX_HTML = path.join(ROOT, 'index.html');
const PRIVACY_HTML = path.join(ROOT, 'privacy.html');
const TERMS_HTML = path.join(ROOT, 'terms.html');
const SITEMAP_XML = path.join(ROOT, 'sitemap.xml');

function isoDate(filePath) {
  const stat = fs.statSync(filePath);
  return stat.mtime.toISOString().slice(0, 10);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeIfChanged(filePath, original, next) {
  if (original === next) {
    return false;
  }
  fs.writeFileSync(filePath, next, 'utf8');
  return true;
}

function updateSitemap(homeDate, privacyDate, termsDate) {
  const original = readFile(SITEMAP_XML);
  let next = original;

  next = next.replace(
    /(<loc>https:\/\/promptanatomy\.online\/<\/loc>\s*<lastmod>)\d{4}-\d{2}-\d{2}(<\/lastmod>)/,
    `$1${homeDate}$2`
  );
  next = next.replace(
    /(<loc>https:\/\/promptanatomy\.online\/privacy\.html<\/loc>\s*<lastmod>)\d{4}-\d{2}-\d{2}(<\/lastmod>)/,
    `$1${privacyDate}$2`
  );
  next = next.replace(
    /(<loc>https:\/\/promptanatomy\.online\/terms\.html<\/loc>\s*<lastmod>)\d{4}-\d{2}-\d{2}(<\/lastmod>)/,
    `$1${termsDate}$2`
  );

  return writeIfChanged(SITEMAP_XML, original, next);
}

function updateHomepageJsonLd(homeDate) {
  const original = readFile(INDEX_HTML);
  const pattern = /("datePublished":\s*"\d{4}-\d{2}-\d{2}",\s*"dateModified":\s*")\d{4}-\d{2}-\d{2}(")/;

  if (!pattern.test(original)) {
    console.warn(
      '[sitemap:update] WARNING: SoftwareApplication "datePublished"/"dateModified" pair not found in index.html; skipping JSON-LD bump.'
    );
    return false;
  }

  const next = original.replace(pattern, `$1${homeDate}$2`);
  return writeIfChanged(INDEX_HTML, original, next);
}

function main() {
  const homeDate = isoDate(INDEX_HTML);
  const privacyDate = isoDate(PRIVACY_HTML);
  const termsDate = isoDate(TERMS_HTML);

  const sitemapChanged = updateSitemap(homeDate, privacyDate, termsDate);
  const indexChanged = updateHomepageJsonLd(homeDate);

  console.log('[sitemap:update] mtime:');
  console.log(`  / → ${homeDate}`);
  console.log(`  /privacy.html → ${privacyDate}`);
  console.log(`  /terms.html → ${termsDate}`);
  console.log(
    `[sitemap:update] sitemap.xml ${sitemapChanged ? 'updated' : 'unchanged'}; index.html ${indexChanged ? 'updated' : 'unchanged'}.`
  );
}

main();
