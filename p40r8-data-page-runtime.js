'use strict';
const fs=require('fs');
const path=require('path');
const {execFileSync}=require('child_process');
const ROOT=path.resolve(__dirname,'..');
const pages=['standar.html','inisiatif.html','service-planning.html','calendar.html','planning-documents.html','data.html','admin.html','berita.html','kontak.html','lounge-list.html','branch-office-planning.html','gaso-planning.html'];
function assert(c,m){if(!c)throw new Error(m)}
function diagnostics(){
 console.error(`R8_DIAGNOSTIC_CWD ${process.cwd()}`);
 console.error(`R8_DIAGNOSTIC_ROOT ${ROOT}`);
 let names=[]; try{names=fs.readdirSync(ROOT).filter(x=>/standar/i.test(x));}catch(e){console.error(`R8_DIAGNOSTIC_READDIR_ERROR ${e.message}`)}
 console.error(`R8_DIAGNOSTIC_CASE_VARIANTS ${JSON.stringify(names)}`);
 try{const tracked=execFileSync('git',['ls-files','--stage','--','*standar*'],{cwd:ROOT,encoding:'utf8'});console.error(`R8_DIAGNOSTIC_GIT_FILES ${JSON.stringify(tracked.trim().split(/\r?\n/).filter(Boolean))}`)}catch(e){console.error(`R8_DIAGNOSTIC_GIT_FILES_ERROR ${e.message}`)}
}
for(const f of pages){
 const abs=path.join(ROOT,f);
 if(!fs.existsSync(abs)){diagnostics();throw new Error(`R8_RUNTIME_MISSING ${f} (resolved=${abs})`)}
 const s=fs.readFileSync(abs,'utf8');
 assert(s.includes('assets/portal-shell.js?v=10.20.1'),`R8_RUNTIME_MISSING_CANONICAL_SHELL ${f}`);
 assert(s.includes('assets/data.js?v=2.57'),`R8_RUNTIME_MISSING_DATA_RUNTIME ${f}`);
}
console.log(`P40R8_DATA_PAGE_RUNTIME_PASS (${pages.length} pages)`);
