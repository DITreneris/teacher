/**
 * Compress og-image.png and apple-touch-icon.png for social / OS previews.
 * Run: npm run optimize:social
 */
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OG_MAX_BYTES = 300 * 1024;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const APPLE_SIZE = 180;
const APPLE_MAX_BYTES = 50 * 1024;

async function optimizeOg() {
  const filePath = path.join(ROOT, 'og-image.png');
  const before = fs.statSync(filePath).size;
  const meta = await sharp(filePath).metadata();

  let pipeline = sharp(filePath);
  if (meta.width !== OG_WIDTH || meta.height !== OG_HEIGHT) {
    pipeline = pipeline.resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover' });
  }

  const buffer = await pipeline
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
    .toBuffer();

  if (buffer.length > OG_MAX_BYTES) {
    const fallback = await sharp(filePath)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover' })
      .png({ compressionLevel: 9, colors: 64, effort: 10 })
      .toBuffer();
    fs.writeFileSync(filePath, fallback);
    console.log(`og-image.png: ${before} -> ${fallback.length} bytes (palette 64)`);
    if (fallback.length > OG_MAX_BYTES) {
      console.warn(`Warning: og-image.png still ${fallback.length} bytes (target <= ${OG_MAX_BYTES})`);
    }
    return;
  }

  fs.writeFileSync(filePath, buffer);
  console.log(`og-image.png: ${before} -> ${buffer.length} bytes`);
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
