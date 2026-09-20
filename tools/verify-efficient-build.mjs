import { existsSync, readdirSync, readFileSync } from 'node:fs';
const required=['dist/index.html','dist/login.html','dist/assets/portal.css','dist/assets/app.js'];
for(const f of required) if(!existsSync(f)) throw new Error(`Missing build output: ${f}`);
const html=readdirSync('dist').filter(x=>x.endsWith('.html'));
if(html.length<70) throw new Error(`Expected >=70 HTML routes, got ${html.length}`);
for(const f of html){ const s=readFileSync(`dist/${f}`,'utf8'); if(!/<html\b/i.test(s)||!/<\/html>/i.test(s)) throw new Error(`Invalid HTML route: ${f}`); }
console.log(`EFFICIENT_BUILD_VERIFY_PASS: ${html.length} routes`);
