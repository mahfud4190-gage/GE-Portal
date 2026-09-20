const fs=require('fs');
const path=require('path');
const pages=['standar.html','inisiatif.html','service-planning.html','calendar.html','planning-documents.html','data.html','admin.html','berita.html','kontak.html','lounge-list.html','branch-office-planning.html','gaso-planning.html'];
const root=path.resolve(__dirname,'..');
const bad=['app.js','compatibility-v257.js','v254-project.js','v2544-modal-fix.js','v2554-stability.js','shared-shell-p40.js','data-page-runtime-p40.js'];
for(const p of pages){const f=path.join(root,p);if(!fs.existsSync(f))throw new Error('missing '+p);const s=fs.readFileSync(f,'utf8');if(!/<header class="top"><\/header>/.test(s)||!/<aside class="side"><\/aside>/.test(s)||!/<main class="main">/.test(s))throw new Error('shell contract '+p);if(/r9-boot/.test(s))throw new Error('legacy r9 boot '+p);for(const x of bad)if(new RegExp('assets/'+x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).test(s))throw new Error('legacy runtime '+x+' '+p);}
const boot=fs.readFileSync(path.join(root,'assets/edition1-page-boot.js'),'utf8');if(!/service-planning/.test(boot))throw new Error('page boot missing');
const br=fs.readFileSync(path.join(root,'assets/edition1-business-runtime.js'),'utf8');if(/^window\.addEventListener\(/m.test(br)||/^document\.addEventListener\(/m.test(br))throw new Error('business runtime still has top-level event boot');
console.log('P40_EDITION1_CANONICAL_RUNTIME_PASS');
