'use strict';
const fs=require('fs');
const path=require('path');
const assert=require('assert');
const root=path.resolve(__dirname,'..');
const pages=[
 'berita.html','bo-space.html','branch-office-planning.html','budget-cost.html','gaso-planning.html',
 'improvement-intake.html','layanan.html','map.html','network-stations.html','planning-documents.html',
 'planning-workspace.html','post-flight.html','post-journey.html','pre-flight.html','pre-journey.html',
 'program-kerja.html','readiness.html','service-planning.html','standar.html','station-360.html',
 'touchpoint.html','station-material.html','inisiatif.html','calendar.html'
];
for(const f of pages){
 const s=fs.readFileSync(path.join(root,f),'utf8');
 assert.strictEqual((s.match(/<header class="top">/g)||[]).length,1,`${f}: top host missing`);
 assert.strictEqual((s.match(/<aside class="side">/g)||[]).length,1,`${f}: side host missing`);
 assert(/<header class="top"><\/header>/.test(s),`${f}: top host is not empty`);
 assert(/<aside class="side"><\/aside>/.test(s),`${f}: side host is not empty`);
 assert((s.match(/assets\/portal-shell\.js/g)||[]).length===1,`${f}: portal-shell reference count`);
 assert(s.includes('<main class="main">'),`${f}: main host missing`);
}
const shell=fs.readFileSync(path.join(root,'assets/portal-shell.js'),'utf8');
assert(shell.includes("if(r==='super admin'||r==='superadmin')return 'superadmin';"),'POV resolver missing');
const frozen=['assets/auth.js','assets/firebase-client.js','assets/overlay-v30.js','assets/access-assistance-p32.js'];
for(const f of frozen) assert(fs.existsSync(path.join(root,f)),`protected file missing ${f}`);
console.log('P40_RUNTIME_RECOVERY_CONTRACT_PASS');
