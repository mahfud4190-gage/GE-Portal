'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const pages = [
  'standar.html','inisiatif.html','service-planning.html','calendar.html',
  'planning-documents.html','data.html','admin.html','berita.html','kontak.html',
  'lounge-list.html','branch-office-planning.html','gaso-planning.html'
];
const shared = [
  'assets/auth.js?v=2.57',
  'assets/data.js?v=2.57',
  'assets/portal-shell.js?v=10.20.1',
  'assets/portal.css?v=10.20.1'
];
const obsolete = [
  'shared-shell-p40.js','data-page-runtime-p40.js',
  'compatibility-v257.js','v254-project.js','v2544-modal-fix.js',
  'p40r8-','p40r9-','p40r10-','p40r11-','p40r12-',
  'r9-boot','r9-ready','r9-leaving'
];
const base = [
  'assets/auth.js?v=2.57',
  'assets/data.js?v=2.57',
  'assets/files.js?v=2.57',
  'assets/core-v257.js?v=2.57',
  'assets/relationships-v257.js?v=2.57',
  'assets/permission-v257.js?v=2.57',
  'assets/portal-shell.js?v=10.20.1'
];
const post = [
  'assets/overlay-v30.js?v=30.1',
  'assets/access-assistance-p32.js?v=32.1',
  'assets/p33-p37-presentation.js?v=37.1'
];
const graphs = Object.fromEntries([
  ['standar.html',[...base,'assets/app.js?v=2.57',...post]],
  ['inisiatif.html',[...base,'assets/app.js?v=2.57','assets/v2554-stability.js?v=2.57',...post]],
  ['service-planning.html',[
    'assets/auth.js?v=2.57','assets/data.js?v=2.57',
    'assets/core-v257.js?v=2.57','assets/relationships-v257.js?v=2.57',
    'assets/permission-v257.js?v=2.57','assets/portal-shell.js?v=10.20.1',
    'assets/service-planning.js?v=1.0.0',...post
  ]],
  ['calendar.html',[...base,'assets/app.js?v=2.57','assets/v2554-stability.js?v=2.57',...post]],
  ['planning-documents.html',[...base,'assets/app.js?v=2.57',...post]],
  ['data.html',[...base,'assets/app.js?v=2.57',...post]],
  ['admin.html',[...base,'assets/app.js?v=2.57','assets/user-access-p26.js?v=26.1','assets/page-identity-v28.js?v=28.1',...post]],
  ['berita.html',[...base,'assets/app.js?v=2.57',...post]],
  ['kontak.html',[...base,'assets/app.js?v=2.57',...post]],
  ['lounge-list.html',[...base,'assets/app.js?v=2.57','assets/lounge-planning-v29.js?v=29.1',...post]],
  ['branch-office-planning.html',[...base,'assets/app.js?v=2.57',...post]],
  ['gaso-planning.html',[...base,'assets/app.js?v=2.57',...post]]
]);
function assert(c,m){if(!c)throw new Error(m)}
function read(f){return fs.readFileSync(path.join(ROOT,f),'utf8')}
function exists(f){return fs.existsSync(path.join(ROOT,f))}
function refs(html){return [...html.matchAll(/<script\b[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(m=>m[1])}
function exactCase(name){const n=fs.readdirSync(ROOT);return n.includes(name)&&n.filter(x=>x.toLowerCase()===name.toLowerCase()).length===1}
function checkLocalRefs(page,html){for(const ref of [...html.matchAll(/<(?:script[^>]+src|link[^>]+href)=["']([^"']+)["']/gi)].map(m=>m[1])){const clean=ref.split('?')[0].split('#')[0];if(!clean||/^(https?:|data:|mailto:|javascript:|\/\/)/i.test(clean))continue;assert(exists(clean),`LOCAL_REFERENCE_MISSING ${page}: ${ref}`)}}
assert(exists('assets/portal-shell.js'),'PORTAL_SHELL_MISSING');
assert(exists('assets/service-planning.js'),'SERVICE_PLANNING_ENGINE_MISSING');
const shell=read('assets/portal-shell.js');
assert((shell.match(/function shell\(/g)||[]).length===1,'DUPLICATE_SHELL_AUTHORITY');
assert(shell.includes('function ensureShell'),'CANONICAL_SHELL_RUNTIME_MISSING');
for(const page of pages){
  assert(exists(page),`EDITION1_PAGE_MISSING ${page}`);
  assert(exactCase(page),`EDITION1_PAGE_CASE_MISMATCH ${page}`);
  const html=read(page), head=html.split('</head>')[0], actual=refs(head);
  assert(html.includes('<header class="top"></header>'),`TOP_HOST_MISSING ${page}`);
  assert(html.includes('<aside class="side"></aside>'),`SIDE_HOST_MISSING ${page}`);
  assert(html.includes('<main class="main">'),`MAIN_HOST_MISSING ${page}`);
  for(const ref of shared)assert(head.includes(ref),`REQUIRED_SHARED_RUNTIME_MISSING ${page}: ${ref}`);
  assert((head.match(/assets\/portal-shell\.js\?v=10\.20\.1/g)||[]).length===1,`DUPLICATE_PORTAL_SHELL ${page}`);
  for(const marker of obsolete)assert(!html.includes(marker),`OBSOLETE_RUNTIME_MARKER ${page}: ${marker}`);
  assert(!/<header[^>]*>[^]*GROUND EXPERIENCE GARUDA INDONESIA/i.test(html),`LEGACY_HEADER_PRESENT ${page}`);
  assert(!/<aside[^>]*>[^]*INTEGRATED EXPERIENCE/i.test(html),`LEGACY_SIDEBAR_PRESENT ${page}`);
  assert(JSON.stringify(actual)===JSON.stringify(graphs[page]),`RUNTIME_GRAPH_MISMATCH ${page}\nEXPECTED ${JSON.stringify(graphs[page])}\nACTUAL ${JSON.stringify(actual)}`);
  checkLocalRefs(page,html);
}
console.log(`P40_EDITION1_CANONICAL_RUNTIME_PASS (${pages.length} pages)`);
