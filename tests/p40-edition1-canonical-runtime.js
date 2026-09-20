'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const pages = [
  'standar.html',
  'inisiatif.html',
  'service-planning.html',
  'calendar.html',
  'planning-documents.html',
  'data.html',
  'admin.html',
  'berita.html',
  'kontak.html',
  'lounge-list.html',
  'branch-office-planning.html',
  'gaso-planning.html'
];
const required = [
  'assets/auth.js?v=2.57',
  'assets/data.js?v=2.57',
  'assets/portal-shell.js?v=10.20.1',
  'assets/portal.css?v=10.20.1'
];
const obsolete = [
  'shared-shell-p40.js',
  'data-page-runtime-p40.js',
  'p40r8-',
  'p40r9-',
  'p40r10-',
  'p40r11-',
  'p40r12-',
  'r9-boot',
  'r9-ready',
  'r9-leaving'
];
function assert(c,m){ if(!c) throw new Error(m); }
function read(file){ return fs.readFileSync(path.join(ROOT,file),'utf8'); }
function exists(file){ return fs.existsSync(path.join(ROOT,file)); }
function exactTrackedCase(name){
  const entries = fs.readdirSync(ROOT, {withFileTypes:true}).map(x=>x.name);
  return entries.filter(x=>x.toLowerCase()===name.toLowerCase()).length === 1 && entries.includes(name);
}
function checkLocalRefs(page, html){
  const refs = [];
  for (const m of html.matchAll(/<(?:script[^>]+src|link[^>]+href)=["']([^"']+)["']/gi)) refs.push(m[1]);
  for (const ref of refs) {
    const clean = ref.split('?')[0].split('#')[0];
    if (!clean || /^(https?:|data:|mailto:|javascript:|\/\/)/i.test(clean)) continue;
    assert(exists(clean), `LOCAL_REFERENCE_MISSING ${page}: ${ref}`);
  }
}

assert(exists('assets/portal-shell.js'), 'PORTAL_SHELL_MISSING');
const shell = read('assets/portal-shell.js');
assert((shell.match(/function shell\(/g)||[]).length===1, 'DUPLICATE_SHELL_AUTHORITY');
assert(shell.includes('function ensureShell'), 'CANONICAL_SHELL_RUNTIME_MISSING');

for (const page of pages) {
  assert(exists(page), `EDITION1_PAGE_MISSING ${page}`);
  assert(exactTrackedCase(page), `EDITION1_PAGE_CASE_MISMATCH ${page}`);
  const html = read(page);
  const head = html.split('</head>')[0];
  assert(html.includes('<header class="top"></header>'), `TOP_HOST_MISSING ${page}`);
  assert(html.includes('<aside class="side"></aside>'), `SIDE_HOST_MISSING ${page}`);
  assert(html.includes('<main class="main">'), `MAIN_HOST_MISSING ${page}`);
  for (const ref of required) assert(head.includes(ref), `REQUIRED_RUNTIME_MISSING ${page}: ${ref}`);
  assert((html.match(/assets\/portal-shell\.js\?v=10\.20\.1/g)||[]).length===1, `DUPLICATE_PORTAL_SHELL ${page}`);
  for (const marker of obsolete) assert(!html.includes(marker), `OBSOLETE_RUNTIME_MARKER ${page}: ${marker}`);
  assert(!/<header[^>]*>[^]*GROUND EXPERIENCE GARUDA INDONESIA/i.test(html), `LEGACY_HEADER_PRESENT ${page}`);
  assert(!/<footer[^>]*class=["']footer["']/i.test(html), `LEGACY_FOOTER_PRESENT ${page}`);
  checkLocalRefs(page, html);
}

console.log(`P40_EDITION1_CANONICAL_RUNTIME_PASS (${pages.length} pages)`);
