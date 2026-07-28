'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ACTIVE_DOCS = [
  'README.md',
  path.join('docs', 'INDEX.md'),
  'AGENTS.md'
];

const FORBIDDEN_PATTERNS = [
  /github\.com\/DITreneris\/spinoff01/i,
  /github\.com\/DITreneris\/mokytojas/i,
  /DI Pamok/i,
  /Spin-off Nr\. ?6/i
];

const REQUIRED_INDEX_LINKS = [
  '../README.md',
  'INDEX.md',
  '../AGENTS.md'
];

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function fail(message) {
  console.error(`\u274C ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`\u2705 ${message}`);
}

function extractMarkdownLinks(content) {
  const links = [];
  const regex = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1].trim());
  }
  return links;
}

function isExternalLink(link) {
  return /^(?:https?:\/\/|mailto:|#)/i.test(link);
}

function stripHashAndQuery(link) {
  return link.split('#')[0].split('?')[0];
}

function extractSection(content, heading) {
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `## ${heading}`);
  if (start === -1) return null;
  const body = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^## /.test(lines[i])) break;
    body.push(lines[i]);
  }
  return body.join('\n');
}

function parseFrontmatter(content) {
  const match = content.match(FRONTMATTER_RE);
  if (!match) return null;
  const meta = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (m) meta[m[1]] = m[2].trim();
  });
  return meta;
}

function resolveIndexLink(link) {
  const cleaned = stripHashAndQuery(link);
  if (!cleaned || isExternalLink(cleaned)) return null;
  return path.resolve(path.join(ROOT, 'docs'), cleaned);
}

function isMarkdownPath(absolutePath) {
  return /\.md$/i.test(absolutePath);
}

function validateActiveDocsExist() {
  ACTIVE_DOCS.forEach((doc) => {
    const absolute = path.join(ROOT, doc);
    if (!fs.existsSync(absolute)) {
      fail(`Aktyvus dokumentas nerastas: ${doc}`);
      return;
    }
    pass(`Aktyvus dokumentas egzistuoja: ${doc}`);
  });
}

function validateForbiddenPatterns() {
  ACTIVE_DOCS.forEach((doc) => {
    const absolute = path.join(ROOT, doc);
    const content = read(absolute);
    FORBIDDEN_PATTERNS.forEach((pattern) => {
      if (pattern.test(content)) {
        fail(`Rastas draudziamas pattern '${pattern}' faile: ${doc}`);
      }
    });
  });
  if (!process.exitCode) pass('Draudziamu pattern aktyviuose docs nerasta');
}

function validateActiveDocLinks() {
  ACTIVE_DOCS.forEach((doc) => {
    const absolute = path.join(ROOT, doc);
    const content = read(absolute);
    const links = extractMarkdownLinks(content);
    links.forEach((link) => {
      if (isExternalLink(link)) return;
      const resolved = path.resolve(path.dirname(absolute), stripHashAndQuery(link));
      if (!fs.existsSync(resolved)) {
        fail(`Broken link faile ${doc}: ${link}`);
      }
    });
  });
  if (!process.exitCode) pass('Aktyviu docs markdown nuorodos validzios');
}

function validateIndexLeanContract() {
  const indexPath = path.join(ROOT, 'docs', 'INDEX.md');
  const content = read(indexPath);

  REQUIRED_INDEX_LINKS.forEach((requiredLink) => {
    if (!content.includes(`(${requiredLink})`)) {
      fail(`INDEX.md neturi privalomos aktyvios nuorodos: ${requiredLink}`);
    }
  });

  const disallowedAnywhere = [
    'MOBILE_UX_IMPROVEMENT_PLAN.md',
    'USER_JOURNEY_ANALYSIS.md',
    '.cursorrules',
    '.github/PULL_REQUEST_TEMPLATE.md'
  ];

  disallowedAnywhere.forEach((item) => {
    if (content.includes(item)) {
      fail(`INDEX.md turi perteklinę aktyvią nuorodą ar likutį: ${item}`);
    }
  });

  const operatorSection = extractSection(content, 'Operator runbooks (navigation only — not active docs for hygiene)');
  if (!operatorSection) {
    fail('INDEX.md neturi Operator runbooks sekcijos');
  } else if (!/\(\.\.\/todo\.md\)/.test(operatorSection)) {
    fail('INDEX.md Operator sekcija turi tureti nuoroda (../todo.md)');
  } else {
    pass('INDEX.md Operator turi todo.md');
  }

  const activeLean = extractSection(content, 'Active documents (lean)') || '';
  const activeGtm = extractSection(content, 'Active go-to-market') || '';
  if (/todo\.md/.test(activeLean) || /todo\.md/.test(activeGtm)) {
    fail('todo.md neturi buti Active lean / Active GTM sekcijose (tik Operator)');
  } else {
    pass('todo.md nera Active lean / GTM');
  }

  if (!process.exitCode) pass('INDEX.md lean kontraktas validus');
}

function validateIndexAllowlistAndFrontmatter() {
  const indexPath = path.join(ROOT, 'docs', 'INDEX.md');
  const content = read(indexPath);

  const activeLean = extractSection(content, 'Active documents (lean)');
  const activeGtm = extractSection(content, 'Active go-to-market');
  const operator = extractSection(content, 'Operator runbooks (navigation only — not active docs for hygiene)');

  if (!activeLean || !activeGtm || !operator) {
    fail('INDEX.md truksta Active lean, Active GTM arba Operator sekcijos');
    return;
  }

  const activeBody = `${activeLean}\n${activeGtm}`;
  if (/design-system-audit_2026-05|design-system-audit_2026-07/.test(activeBody)) {
    fail('INDEX Active sekcijose neturi likti design-system-audit_2026-05/07 (archyvas)');
  } else {
    pass('INDEX Active be DS audit snapshot');
  }

  const activeLinks = extractMarkdownLinks(activeBody);
  let activeMdOk = true;
  activeLinks.forEach((link) => {
    const absolute = resolveIndexLink(link);
    if (!absolute) return;
    if (!fs.existsSync(absolute)) {
      fail(`Broken Active link INDEX.md: ${link}`);
      activeMdOk = false;
      return;
    }
    if (!isMarkdownPath(absolute)) return;
    const meta = parseFrontmatter(read(absolute));
    if (!meta || meta.status !== 'active') {
      fail(`Active markdown turi tureti status: active — ${path.relative(ROOT, absolute)}`);
      activeMdOk = false;
    }
  });
  if (activeMdOk) pass('Active markdown frontmatter status: active');

  const operatorLinks = extractMarkdownLinks(operator);
  let operatorOk = true;
  operatorLinks.forEach((link) => {
    const absolute = resolveIndexLink(link);
    if (!absolute) return;
    if (!fs.existsSync(absolute)) {
      fail(`Broken Operator link INDEX.md: ${link}`);
      operatorOk = false;
      return;
    }
    if (!isMarkdownPath(absolute)) return;
    const meta = parseFrontmatter(read(absolute));
    if (!meta || (meta.status !== 'ops' && meta.status !== 'scratch')) {
      fail(`Operator markdown turi tureti status: ops|scratch — ${path.relative(ROOT, absolute)}`);
      operatorOk = false;
    }
    if (meta && meta.status === 'active') {
      fail(`Operator markdown negali tureti status: active — ${path.relative(ROOT, absolute)}`);
      operatorOk = false;
    }
  });
  if (operatorOk) pass('Operator markdown frontmatter status: ops|scratch');

  const sectionBodies = [activeLean, activeGtm, operator];
  let sectionLinksOk = true;
  sectionBodies.forEach((body) => {
    extractMarkdownLinks(body).forEach((link) => {
      const absolute = resolveIndexLink(link);
      if (!absolute) return;
      if (!fs.existsSync(absolute)) {
        fail(`Broken INDEX section link: ${link}`);
        sectionLinksOk = false;
      }
    });
  });
  if (sectionLinksOk) pass('Active + Operator INDEX nuorodos egzistuoja');
}

function validateAgentVersionDrift() {
  const pkg = JSON.parse(read(path.join(ROOT, 'package.json')));
  const version = pkg.version;
  if (!version) {
    fail('package.json neturi version');
    return;
  }

  const corePath = path.join(ROOT, '.cursor', 'rules', 'cpb-core.mdc');
  const styleguidePath = path.join(ROOT, 'docs', 'STYLEGUIDE.md');
  const agentsPath = path.join(ROOT, 'AGENTS.md');
  const commercePath = path.join(ROOT, '.cursor', 'rules', 'cpb-pdf-commerce.mdc');
  const goldPath = path.join(ROOT, 'gold_legacy_standard.md');
  const indexPath = path.join(ROOT, 'docs', 'INDEX.md');

  const core = read(corePath);
  const styleguide = read(styleguidePath);
  const agents = read(agentsPath);
  const commerce = read(commercePath);
  const gold = read(goldPath);
  const index = read(indexPath);

  if (!core.includes(`v${version}`)) {
    fail(`cpb-core.mdc title turi tureti produkto versija v${version}`);
  } else {
    pass(`cpb-core.mdc atitinka package.json v${version}`);
  }

  if (!styleguide.includes(`product release ${version}`)) {
    fail(`STYLEGUIDE.md header turi tureti "product release ${version}"`);
  } else {
    pass(`STYLEGUIDE.md atitinka package.json ${version}`);
  }

  if (!agents.includes('DS 2.1.0')) {
    fail('AGENTS.md turi tureti DS 2.1.0');
  } else if (agents.includes('DS 2.0.0')) {
    fail('AGENTS.md vis dar turi stale DS 2.0.0');
  } else {
    pass('AGENTS.md DS 2.1.0');
  }

  if (!commerce.includes('DS 2.1.0')) {
    fail('cpb-pdf-commerce.mdc turi tureti DS 2.1.0');
  } else if (commerce.includes('DS 2.0.0')) {
    fail('cpb-pdf-commerce.mdc vis dar turi stale DS 2.0.0');
  } else {
    pass('cpb-pdf-commerce.mdc DS 2.1.0');
  }

  if (/Lucide CDN can later/i.test(gold)) {
    fail('gold_legacy_standard.md vis dar mini "Lucide CDN can later" (sprite jau shipped)');
  } else {
    pass('gold_legacy_standard.md be stale Lucide CDN follow-up');
  }

  if (!index.includes('visual-pdf-commerce') && !index.includes('icons.js')) {
    fail('INDEX.md Code navigation turi tureti visual-pdf-commerce arba icons.js');
  } else {
    pass('INDEX.md Code navigation turi visual/icons nuorodas');
  }

  if (!core.includes('AGENTS.md') || !/quality.?gate/i.test(core)) {
    fail('cpb-core.mdc turi rodyti i AGENTS.md quality gates');
  } else {
    pass('cpb-core.mdc rodo i AGENTS quality gates');
  }
}

function run() {
  console.log('Docs hygiene check pradetas...\n');
  validateActiveDocsExist();
  validateForbiddenPatterns();
  validateActiveDocLinks();
  validateIndexLeanContract();
  validateIndexAllowlistAndFrontmatter();
  validateAgentVersionDrift();

  if (process.exitCode) {
    console.error('\nDocs hygiene check nepraejo.');
    process.exit(process.exitCode);
  }

  console.log('\nDocs hygiene check praejo.');
}

run();
