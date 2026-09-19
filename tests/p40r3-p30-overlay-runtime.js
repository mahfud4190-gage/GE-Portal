const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
let failed = false;
const ok = m => console.log('OK', m);
const fail = m => { failed = true; console.error('FAIL', m); };

const shell = read('assets/portal-shell.js');
const overlay = read('assets/overlay-v30.js');

// P40-R3: one sidebar/navigation lifecycle authority.
if (shell.includes('GE_R10_SHELL_STATE') || shell.includes('r10-leaving') || shell.includes('normalizeModalRoots') || shell.includes('/* app-shell.js */')) fail('Retired R10 app-shell/sidebar/overlay authority is still present');
else ok('R10 app-shell/sidebar/overlay duplicate authority retired');

if (!shell.includes("item('calendar.html','Calendar & Project Tracking','▦')")) fail('Calendar & Project Tracking is missing from shared navigation');
else ok('Calendar & Project Tracking is present in shared navigation');

// P30: overlay-v30 remains the single portal-wide overlay normalization authority.
if (!overlay.includes("const SELECTORS=['.modal-backdrop'")) fail('P30 selector registry missing');
else ok('P30 selector registry present');
if (!overlay.includes('if(el.parentElement!==document.body)document.body.appendChild(el)')) fail('P30 does not promote overlay roots to document.body');
else ok('P30 overlay roots promote to document.body');
if (!overlay.includes("document.body.style.overflow='hidden'")) fail('P30 scroll-lock authority missing');
else ok('P30 scroll-lock authority present');
if (!overlay.includes('focusMemory')) fail('P30 focus lifecycle missing');
else ok('P30 focus lifecycle present');

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html') && f !== 'login.html');
const modalPages = htmlFiles.filter(f => /modal-backdrop|tp-modal-backdrop|initiative-dialog|r9-portal-dialog|<dialog[^>]*open/i.test(read(f)));
for (const f of modalPages) {
  if (!read(f).includes('assets/overlay-v30.js')) fail(`${f}: modal page lacks P30 overlay authority`);
}
ok(`Modal pages checked: ${modalPages.length}`);

if (failed) process.exit(1);
console.log('P40R3_P30_OVERLAY_ROOT_CAUSE_CONTRACT_PASS');
