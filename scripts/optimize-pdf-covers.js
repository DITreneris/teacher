/**
 * Generate WebP siblings for assets/pdf-covers/*.png so PDF cards can use
 * <picture> with a smaller payload on supporting browsers (P1.2).
 *
 * The PNGs remain the canonical source (DS 2.0; tests expect them). The
 * WebP output is treated as a build artifact; rerun whenever the PNGs change.
 *
 * Run: npm run optimize:covers
 */
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const COVERS_DIR = path.join(__dirname, '..', 'assets', 'pdf-covers');
const WEBP_QUALITY = 82;

async function optimizeOne(pngName) {
  const pngPath = path.join(COVERS_DIR, pngName);
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const beforeBytes = fs.statSync(pngPath).size;
  await sharp(pngPath).webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpPath);
  const afterBytes = fs.statSync(webpPath).size;
  const savedPct = ((beforeBytes - afterBytes) / beforeBytes) * 100;
  console.log(
    `${pngName} -> ${path.basename(webpPath)}: ${beforeBytes} -> ${afterBytes} bytes (-${savedPct.toFixed(1)}%)`
  );
}

async function main() {
  if (!fs.existsSync(COVERS_DIR)) {
    console.error(`Covers dir not found: ${COVERS_DIR}`);
    process.exit(1);
  }
  const pngs = fs
    .readdirSync(COVERS_DIR)
    .filter(function (name) {
      return /\.png$/i.test(name);
    })
    .sort();
  if (pngs.length === 0) {
    console.log('No PNG covers to optimize.');
    return;
  }
  for (const png of pngs) {
    await optimizeOne(png);
  }
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
