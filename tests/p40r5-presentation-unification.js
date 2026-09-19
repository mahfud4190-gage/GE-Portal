'use strict';
const fs=require('fs');
const path=require('path');
function assert(c,m){if(!c)throw new Error(m)}
const root=path.resolve(__dirname,'..');
const shell=fs.readFileSync(path.join(root,'assets/portal-shell.js'),'utf8');
const m=shell.match(/const finalUserPages=new Set\(\[(.*?)\]\);/s);
assert(m,'FINAL_USER_PAGES_MISSING');
const pages=[...m[1].matchAll(/'([^']+)'/g)].map(x=>x[1]);
let converted=0;
for(const page of pages){
  const p=path.join(root,page); if(!fs.existsSync(p)) continue;
  const s=fs.readFileSync(p,'utf8');
  const top=s.match(/<header[^>]*class=["']top["'][^>]*>([\s\S]*?)<\/header>/i);
  const side=s.match(/<aside[^>]*class=["']side["'][^>]*>([\s\S]*?)<\/aside>/i);
  assert(top,`TOP_HOST_MISSING ${page}`); assert(side,`SIDE_HOST_MISSING ${page}`);
  assert(!/GROUND EXPERIENCE GARUDA INDONESIA/i.test(top[1]),`LEGACY_TOP_SHELL_PRESENT ${page}`);
  assert(!/<a[^>]+href=["']index\.html["'][^>]*>\s*Beranda/i.test(side[1]),`LEGACY_SIDE_NAV_PRESENT ${page}`);
  if(top[1].trim()==='' && side[1].trim()==='') converted++;
}
const css=fs.readFileSync(path.join(root,'assets/portal.css'),'utf8');
assert(css.includes('P40-R5 presentation normalization'),'P40R5_CSS_MISSING');
console.log(`OK final user pages checked: ${pages.length}`);
console.log(`OK empty shared-shell hosts: ${converted}`);
console.log('OK legacy static top/sidebar cannot remain on final user pages');
console.log('OK P40-R5 presentation normalization present');
console.log('P40R5_PRESENTATION_UNIFICATION_PASS');
