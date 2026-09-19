'use strict';
const fs=require('fs');
const path=require('path');
const root=process.cwd();
function assert(cond,msg){if(!cond)throw new Error(msg)}
const shell=fs.readFileSync(path.join(root,'assets','portal-shell.js'),'utf8');
const m=shell.match(/const finalUserPages=new Set\(\[(.*?)\]\);/s);
assert(m,'FINAL_USER_PAGES_SET_MISSING');
const pages=[...m[1].matchAll(/'([^']+)'/g)].map(x=>x[1]);
assert(pages.length>0,'FINAL_USER_PAGES_EMPTY');
const bad=[];
for(const file of pages){
 const p=path.join(root,file); assert(fs.existsSync(p),`FINAL_PAGE_MISSING ${file}`);
 const s=fs.readFileSync(p,'utf8');
 assert((s.match(/<header class="top">/g)||[]).length===1,`TOP_HOST_INVALID ${file}`);
 assert(s.includes('<header class="top"></header>'),`TOP_HOST_NOT_EMPTY ${file}`);
 assert((s.match(/<aside class="side">/g)||[]).length===1,`SIDE_HOST_INVALID ${file}`);
 assert(s.includes('<aside class="side"></aside>'),`SIDE_HOST_NOT_EMPTY ${file}`);
 assert(/<div class="shell"><aside class="side"><\/aside><main class="main(?:"|\s)/.test(s),`CANONICAL_SHELL_HOST_MISSING ${file}`);
 assert((s.match(/assets\/portal-shell\.js/g)||[]).length===1,`PORTAL_SHELL_SCRIPT_INVALID ${file}`);
 assert(s.includes('assets/portal.css'),`PORTAL_CSS_MISSING ${file}`);
 if(/<header class="top">\s+/.test(s)) bad.push(`${file}:legacy-top-content`);
 if(/<aside class="side">\s+/.test(s)) bad.push(`${file}:legacy-side-content`);
}
assert(bad.length===0,`LEGACY_SHELL_CONTENT ${bad.join(',')}`);
const planning=fs.readFileSync(path.join(root,'planning-workspace.html'),'utf8');
assert(planning.includes('<header class="top"></header>'),'PLANNING_REFERENCE_TOP_INVALID');
assert(planning.includes('<aside class="side"></aside>'),'PLANNING_REFERENCE_SIDE_INVALID');
console.log(`OK canonical HTML shell hosts checked: ${pages.length}`);
console.log('OK Planning Workspace canonical structure retained');
console.log('OK legacy static header/sidebar content removed from final user pages');
console.log('P40R7_PAGE_STRUCTURE_PASS');
