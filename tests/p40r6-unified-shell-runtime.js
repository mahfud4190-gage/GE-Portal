const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'..');
const shell=fs.readFileSync(path.join(root,'assets/portal-shell.js'),'utf8');
function assert(c,m){if(!c)throw new Error(m)}
assert(shell.includes("const path=()=>{const raw="),'EXTENSIONLESS_PATH_NORMALIZATION_MISSING');
assert(shell.includes("return raw.includes('.')?raw:(raw||'index')+'.html'"),'EXTENSIONLESS_PATH_NORMALIZATION_INVALID');
const m=shell.match(/const finalUserPages=new Set\(\[(.*?)\]\);/s);assert(m,'FINAL_USER_PAGES_MISSING');
const pages=[...m[1].matchAll(/'([^']+\.html)'/g)].map(x=>x[1]);
let checked=0;
for(const rel of pages){const p=path.join(root,rel);if(!fs.existsSync(p))continue;const s=fs.readFileSync(p,'utf8');assert(/<header class="top">\s*<\/header>/.test(s),`LEGACY_TOP_PRESENT ${rel}`);assert(s.includes('<div class="shell"><aside class="side"></aside><main class="main'),`LEGACY_SIDE_PRESENT ${rel}`);assert(/assets\/portal-shell\.js(?:\?[^"']*)?/.test(s),`PORTAL_SHELL_MISSING ${rel}`);checked++}
assert(checked===pages.length,`FINAL_PAGE_COUNT_MISMATCH ${checked}/${pages.length}`);
console.log(`OK extensionless path normalized`);console.log(`OK unified empty shell hosts checked: ${checked}`);console.log('P40R6_UNIFIED_SHELL_RUNTIME_PASS');
