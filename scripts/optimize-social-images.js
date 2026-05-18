/**
 * Optimize og-image.png and apple-touch-icon.png for social / OS previews.
 *
 * Note on og-image.png: the canonical source of truth is
 * `scripts/generate-og-image.js` (Satori + sharp, hydrated from
 * `config/sot.json`). Run `npm run generate:og` first - this script is a
 * size-budget safety net that only re-encodes if the file exceeds the
 * 300 KB limit. It does NOT resize, so it preserves the 1200x630 output
 * from the generator. Use `npm run build:social` to run both in order.
 *
 * Run: npm run optimize:social
 */
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OG_MAX_BYTES = 300 * 1024;
const APPLE_SIZE = 180;
const APPLE_MAX_BYTES = 50 * 1024;

async function optimizeOg() {
  const filePath = path.join(ROOT, 'og-image.png');
  const before = fs.statSync(filePath).size;
  if (before <= OG_MAX_BYTES) {
    console.log(`og-image.png: ${before} bytes (skip, already <= ${OG_MAX_BYTES})`);
    return;
  }

  const fallback = await sharp(filePath)
    .png({ compressionLevel: 9, colors: 64, effort: 10 })
    .toBuffer();
  fs.writeFileSync(filePath, fallback);
  console.log(`og-image.png: ${before} -> ${fallback.length} bytes (palette 64 fallback)`);
  if (fallback.length > OG_MAX_BYTES) {
    console.warn(`Warning: og-image.png still ${fallback.length} bytes (target <= ${OG_MAX_BYTES})`);
  }
}

async function optimizeAppleTouch() {
  const filePath = path.join(ROOT, 'apple-touch-icon.png');
  const before = fs.statSync(filePath).size;
  if (before <= APPLE_MAX_BYTES) {
    console.log(`apple-touch-icon.png: ${before} bytes (skip, already <= ${APPLE_MAX_BYTES})`);
    return;
  }

  const buffer = await sharp(filePath)
    .resize(APPLE_SIZE, APPLE_SIZE, { fit: 'cover' })
    .png({ compressionLevel: 9, palette: true, effort: 10 })
    .toBuffer();

  fs.writeFileSync(filePath, buffer);
  console.log(`apple-touch-icon.png: ${before} -> ${buffer.length} bytes`);
}

async function main() {
  await optimizeOg();
  await optimizeAppleTouch();
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
