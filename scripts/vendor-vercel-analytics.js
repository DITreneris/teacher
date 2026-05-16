'use strict';

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', '@vercel', 'analytics', 'dist', 'index.mjs');
const destDir = path.join(__dirname, '..', 'vendor');
const dest = path.join(destDir, 'vercel-analytics.mjs');

if (!fs.existsSync(src)) {
  console.error('Missing @vercel/analytics. Run: npm install');
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('Copied @vercel/analytics → vendor/vercel-analytics.mjs');
