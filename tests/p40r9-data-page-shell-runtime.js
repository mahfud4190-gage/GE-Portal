const fs=require('fs');
function assert(c,m){if(!c)throw new Error(m)}
const pages=['standar.html','inisiatif.html','service-planning.html','calendar.html','planning-documents.html','data.html','admin.html','berita.html','kontak.html','lounge-list.html','branch-office-planning.html','gaso-planning.html'];
for(const f of pages){const s=fs.readFileSync(f,'utf8');assert(/<header class="top"><\/header>/.test(s),`CANONICAL_TOP_HOST ${f}`);assert(/<aside class="side"><\/aside>/.test(s),`CANONICAL_SIDE_HOST ${f}`);assert(s.includes('assets/shared-shell-p40.js'),`SHARED_SHELL_BOOTSTRAP ${f}`);assert(!/<header class="top">[\s\S]*GROUND EXPERIENCE GARUDA INDONESIA/.test(s),`LEGACY_HEADER ${f}`);assert(!/<footer class="footer">/.test(s),`LEGACY_FOOTER ${f}`)}
const sh=fs.readFileSync('assets/shared-shell-p40.js','utf8');
assert(sh.includes('window.__GE_CANONICAL_SHELL_RENDERED=true'),'SHELL_RENDER_FLAG');assert(sh.includes('window.setTimeout(boot,1500)'),'SHELL_RETRY_1500');assert(sh.includes('refs.top.innerHTML'),'SHELL_TOP_RENDER');assert(sh.includes('refs.side.innerHTML=navFor(s)'),'SHELL_SIDE_RENDER');assert(sh.includes('calendar.html'),'CALENDAR_NAV');
const ps=fs.readFileSync('assets/portal-shell.js','utf8');assert(ps.includes('if(window.__GE_CANONICAL_SHELL_RENDERED)return;'),'FALLBACK_GUARD');
console.log(`OK data-page canonical shell bootstrap checked: ${pages.length}`);console.log('OK fallback portal-shell renderer is disabled after canonical boot');console.log('P40R9_DATA_PAGE_SHELL_RUNTIME_PASS');
