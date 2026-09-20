import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const root=process.cwd(), dist=join(root,'dist');
rmSync(dist,{recursive:true,force:true}); mkdirSync(dist,{recursive:true});
const manifest=JSON.parse(readFileSync(join(root,'src/pages.json'),'utf8'));
const layouts={legacy:readFileSync(join(root,'src/layouts/portal-shell-legacy.html'),'utf8'),edition1:readFileSync(join(root,'src/layouts/portal-shell-edition1.html'),'utf8')};
for(const [file,m] of Object.entries(manifest)){
 const main=readFileSync(join(root,'src/pages',file.replace(/\.html$/,'.main.html')),'utf8');
 const out=layouts[m.shellType].replace('{{HTML_ATTRS}}',m.htmlAttrs||'').replace('{{HEAD}}',m.head||'').replace('{{BODY_ATTRS}}',m.bodyAttrs||'').replace('{{MAIN_TAG}}',m.mainTag||'<main class="main">').replace('{{MAIN}}',main);
 writeFileSync(join(dist,file),out);
}
for(const f of readdirSync(join(root,'src/standalone'))) cpSync(join(root,'src/standalone',f),join(dist,f));
for(const dir of ['assets','templates']) cpSync(join(root,dir),join(dist,dir),{recursive:true});
for(const f of ['INSTALL.txt','firebase-schema.md']){try{cpSync(join(root,f),join(dist,f));}catch{}}
console.log(`SITE_BUILD_PASS: ${Object.keys(manifest).length} templated + ${readdirSync(join(root,'src/standalone')).length} standalone`);
