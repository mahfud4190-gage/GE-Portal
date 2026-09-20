'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const pages=['standar.html','inisiatif.html','service-planning.html','calendar.html','planning-documents.html','data.html','admin.html','berita.html','kontak.html','lounge-list.html','branch-office-planning.html','gaso-planning.html'];
function read(f){return fs.readFileSync(path.join(ROOT,f),'utf8')}
function assert(c,m){if(!c)throw new Error(m)}
for(const p of pages){
 const s=read(p),head=s.split('</head>')[0];
 const shell='assets/portal-shell.js?v=10.20.1',shellIdx=head.indexOf(shell);
 assert(shellIdx>=0,`PORTAL_SHELL_NOT_IN_HEAD ${p}`);
 assert(head.includes(shell+'" defer'),`PORTAL_SHELL_NOT_DEFERRED ${p}`);
 assert(shellIdx>head.indexOf('assets/auth.js?v=2.57'),`SHELL_BEFORE_AUTH ${p}`);
 assert(shellIdx>head.indexOf('assets/data.js?v=2.57'),`SHELL_BEFORE_DATA ${p}`);
 assert(head.indexOf('document.documentElement.classList.add("r9-boot")')<shellIdx,`R9_BOOT_AFTER_SHELL ${p}`);
 assert(head.indexOf('assets/portal.css?v=10.20.1')<shellIdx,`PORTAL_CSS_AFTER_SHELL ${p}`);
 const shellTag=head.indexOf('<script src="assets/portal-shell.js?v=10.20.1" defer></script>');
 const laterDeferred=Array.from(head.matchAll(/<script[^>]+defer[^>]*src="([^"]+)"[^>]*><\/script>/g)).filter(m=>m[1]!==shell);
 for(const m of laterDeferred) assert(shellTag<m.index,`DEFERRED_RUNTIME_BEFORE_SHELL ${p}: ${m[1]}`);
 assert(s.split(shell).length===2,`DUPLICATE_PORTAL_SHELL ${p}`);
 assert(s.includes('<header class="top"></header>'),`TOP_HOST ${p}`);
 assert(s.includes('<aside class="side"></aside>'),`SIDE_HOST ${p}`);
 assert(s.includes('<main class="main">'),`MAIN_HOST ${p}`);
}
console.log(`P40R12_EDITION1_SHELL_BOOTSTRAP_ORDER_PASS (${pages.length} pages)`);
