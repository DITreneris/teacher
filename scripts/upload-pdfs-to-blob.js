'use strict';

/**
 * Upload paid PDFs to Vercel Blob (private) and print env lines for Vercel / .env.
 *
 * Prerequisites:
 *   1. Vercel project → Storage → Blob store → link to promptanatomy.online
 *   2. BLOB_READ_WRITE_TOKEN in .env (or: vercel env pull)
 *   3. PDF files in api/_private/pdfs/ (run: node scripts/export-pdfs.js)
 *
 * Usage: node scripts/upload-pdfs-to-blob.js
 */

const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const ROOT = path.resolve(__dirname, '..');
const PDF_DIR = path.join(ROOT, 'api', '_private', 'pdfs');

const UPLOADS = [
  {
    envKey: 'PDF_BEGINNERS_SOURCE_URL',
    blobPath: 'paid-pdfs/beginners-guide.pdf',
    candidates: ['beginners-guide.pdf', 'Beginners_PromptAnatomy.app.pdf']
  },
  {
    envKey: 'PDF_ADVANCED_SOURCE_URL',
    blobPath: 'paid-pdfs/advanced-educators-guide.pdf',
    candidates: ['advanced-educators-guide.pdf', 'Advanced_PromptAnatomy.app.pdf']
  }
];

function loadDotEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(function (line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) return;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  });
}

function resolvePdfFile(candidates) {
  for (var i = 0; i < candidates.length; i += 1) {
    const full = path.join(PDF_DIR, candidates[i]);
    if (fs.existsSync(full)) return full;
  }
  return null;
}

async function main() {
  loadDotEnv();

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('Missing BLOB_READ_WRITE_TOKEN.');
    console.error('Vercel → Storage → Blob → Connect to project → copy token, or run: vercel env pull');
    process.exit(1);
  }

  console.log('Uploading to Vercel Blob (private)...\n');

  const envLines = [];

  for (var u = 0; u < UPLOADS.length; u += 1) {
    const spec = UPLOADS[u];
    const filePath = resolvePdfFile(spec.candidates);
    if (!filePath) {
      console.error('Missing PDF for ' + spec.envKey + '. Expected one of: ' + spec.candidates.join(', '));
      console.error('Run: node scripts/export-pdfs.js');
      process.exit(1);
    }

    const body = fs.readFileSync(filePath);
    const blob = await put(spec.blobPath, body, {
      access: 'private',
      contentType: 'application/pdf',
      token: token,
      addRandomSuffix: false,
      allowOverwrite: true
    });

    console.log(spec.envKey + '=' + blob.url);
    envLines.push(spec.envKey + '=' + blob.url);
  }

  console.log('\nAlso set in Vercel Production (same values):');
  console.log('BLOB_READ_WRITE_TOKEN=(your blob token — required for server to fetch private PDFs)\n');
  envLines.forEach(function (line) { console.log(line); });

  const envPath = path.join(ROOT, '.env');
  if (fs.existsSync(envPath)) {
    let text = fs.readFileSync(envPath, 'utf8');
    envLines.forEach(function (line) {
      const key = line.split('=')[0];
      const re = new RegExp('^' + key + '=.*$', 'm');
      if (re.test(text)) {
        text = text.replace(re, line);
      } else {
        text = text.trimEnd() + '\n' + line + '\n';
      }
    });
    if (!/^BLOB_READ_WRITE_TOKEN=/m.test(text)) {
      text = text.trimEnd() + '\nBLOB_READ_WRITE_TOKEN=' + token + '\n';
    }
    fs.writeFileSync(envPath, text, 'utf8');
    console.log('\nUpdated .env with PDF URLs (and BLOB_READ_WRITE_TOKEN if missing).');
  }
}

main().catch(function (err) {
  console.error(err.message || err);
  process.exit(1);
});
