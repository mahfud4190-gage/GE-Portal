#!/usr/bin/env node
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root,p), 'utf8');
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const shell = read('assets/portal-shell.js');
const css = read('assets/portal.css');
const initiative = read('inisiatif.html');
if (shell.includes('/* app-shell.js */')) throw new Error('P40R_APP_SHELL_LAYER_STILL_PRESENT');
if (shell.includes('/* R10.13: canonical R10.3 Journey filter')) throw new Error('P40R_INITIATIVE_R10_13_OVERRIDE_STILL_PRESENT');
if (shell.includes('GE_R10_SHELL_STATE')) throw new Error('P40R_R10_SHELL_STATE_LAYER_STILL_PRESENT');
if (shell.includes("document.body.classList.add('r10-leaving')")) throw new Error('P40R_R10_LEAVING_LAYER_STILL_PRESENT');
if (!initiative.includes('initiativeModalV224')) throw new Error('P40R_INITIATIVE_V224_WORKFLOW_MISSING');
if (!initiative.includes('id="initRows"')) throw new Error('P40R_INITIATIVE_RENDER_HOST_MISSING');
if (initiative.includes('<header class="top"></header>')) throw new Error('P40R_INITIATIVE_WAS_CONSOLIDATED_AGAIN');
if (!css.includes('overflow-y:auto!important;overflow-x:hidden!important')) throw new Error('P40R_SIDEBAR_NATIVE_SCROLL_MISSING');
const activeRule = 'html body.final-v257.final-shell-r5 .ge-nav-link.active{background:var(--p19-blue)!important;color:#fff!important;box-shadow:none!important';
if (!css.includes(activeRule)) throw new Error('P40R_ACTIVE_NAV_LINE_NOT_REMOVED');
const protectedHashes = {
  'assets/auth.js': '2624398450a3385a487559b0d93fa81633130b94abbc95b0c1cd7ddd0d75b49c',
  'assets/firebase-client.js': '433fc3f068d3d55d1b64dcf126101306d8acd147e39ef888d1c2a5fa35cdcb89',
  'assets/overlay-v30.js': 'f14886d3a7b0ec10880159fb99c9a252cf3db20130af5ce5a86e67968dc29d4c',
  'assets/access-assistance-p32.js': '9081faf058324a1a417c5ddbd6be74ca62e784ba1a5534764afdacff0fbedfd1',
  'firestore.rules': 'cfacd60f63284009780291530b8aced754c7fc269b19527c1261c6faabecccef'
};
for (const [file, expected] of Object.entries(protectedHashes)) {
  const actual = sha(file); if (actual !== expected) throw new Error(`P40R_PROTECTED_HASH_MISMATCH ${file} ${actual}`);
}
console.log('P40R_P29_PRESENTATION_RECOVERY_CONTRACT_PASS');
