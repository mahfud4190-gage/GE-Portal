'use strict';
const fs=require('fs');
function assert(cond,msg){if(!cond)throw new Error(msg)}
const pages=['standar.html','inisiatif.html','service-planning.html','calendar.html','planning-documents.html','data.html','admin.html','berita.html','kontak.html','lounge-list.html','branch-office-planning.html','gaso-planning.html'];
for(const f of pages){
 const s=fs.readFileSync(f,'utf8');
 assert(/<header class="top"><\/header>/.test(s),`CANONICAL_TOP_HOST ${f}`);
 assert(/<aside class="side"><\/aside>/.test(s),`CANONICAL_SIDE_HOST ${f}`);
 assert(s.includes('assets/portal-shell.js?v=10.20.1'),`CANONICAL_PORTAL_SHELL ${f}`);
 assert(!s.includes('assets/shared-shell-p40.js'),`DUPLICATE_SHARED_SHELL ${f}`);
 assert(!s.includes('assets/data-page-runtime-p40.js'),`DUPLICATE_DATA_RUNTIME ${f}`);
 assert(!/<header class="top">[\s\S]*GROUND EXPERIENCE GARUDA INDONESIA/.test(s),`LEGACY_HEADER ${f}`);
}
const ws=fs.readFileSync('planning-workspace.html','utf8');
const canonicalScripts=['assets/overlay-v30.js','assets/access-assistance-p32.js','assets/portal-shell.js','assets/p33-p37-presentation.js'];
for(const x of canonicalScripts)assert(ws.includes(x),`WORKSPACE_REFERENCE ${x}`);
const ps=fs.readFileSync('assets/portal-shell.js','utf8');
assert(ps.includes('if(window.__GE_CANONICAL_SHELL_RENDERED)return;'),'SHELL_SINGLE_AUTHORITY_GUARD');
assert(!ps.includes('r10-leaving'),'R10_LEAVING_RETIRED');
console.log(`OK canonical data-page runtime follows Planning Workspace shell authority`);
console.log(`OK affected pages checked: ${pages.length}`);
console.log('P40R10_DATA_PAGE_CANONICAL_RUNTIME_PASS');
