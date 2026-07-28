#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

/** Symbol id → lucide-static filename (without .svg). */
const ICON_SOURCES = {
  command: 'command',
  moon: 'moon',
  sun: 'sun',
  'graduation-cap': 'graduation-cap',
  'book-open': 'book-open',
  'clipboard-check': 'clipboard-check',
  'pencil-ruler': 'pencil-ruler',
  presentation: 'presentation',
  brain: 'brain',
  copy: 'copy',
  'arrow-right': 'arrow-right',
  history: 'history',
  save: 'save',
  'trash-2': 'trash-2',
  sparkles: 'sparkles',
  users: 'users',
  'file-text': 'file-text',
  list: 'list',
  'chevron-down': 'chevron-down',
  eye: 'eye',
  'shield-check': 'shield-check',
  'credit-card': 'credit-card',
  apple: 'apple',
  lock: 'lock',
  'badge-check': 'badge-check',
  zap: 'zap',
  'external-link': 'external-link',
  layers: 'layers',
  'life-buoy': 'life-buoy',
  x: 'x',
  check: 'check',
  // Lucide renamed these; keep CPB symbol ids stable for SOT / runtime.
  'alert-circle': 'circle-alert',
  'rotate-ccw': 'rotate-ccw',
  'file-input': 'file-input',
  'refresh-ccw': 'refresh-ccw',
  'check-circle': 'circle-check'
};

const iconsDir = path.join(__dirname, '..', 'node_modules', 'lucide-static', 'icons');
const outPath = path.join(__dirname, '..', 'assets', 'icons.svg');

const symbols = Object.keys(ICON_SOURCES).map((name) => {
  const file = path.join(iconsDir, `${ICON_SOURCES[name]}.svg`);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing lucide-static icon: ${ICON_SOURCES[name]} (for ${name})`);
  }
  const svg = fs.readFileSync(file, 'utf8');
  const inner = svg
    .replace(/^[\s\S]*?<svg[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '')
    .trim();
  return [
    `  <symbol id="icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`,
    `    ${inner.replace(/\n/g, '\n    ')}`,
    '  </symbol>'
  ].join('\n');
});

const out = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<!-- Lucide icons (MIT). Subset for Classroom Prompt Builder. Rebuild: node scripts/build-icon-sprite.js -->',
  '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">',
  symbols.join('\n'),
  '</svg>',
  ''
].join('\n');

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);
console.log(
  `Wrote ${Object.keys(ICON_SOURCES).length} icons to ${path.relative(process.cwd(), outPath)} (${Buffer.byteLength(out)} bytes)`
);
