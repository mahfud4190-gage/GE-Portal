const fs=require('fs');
const path=require('path');
const root=process.cwd();
function assert(cond,msg){if(!cond)throw new Error(msg)}
const pages=[
 'standar.html','inisiatif.html','service-planning.html','calendar.html','planning-documents.html','data.html',
 'admin.html','berita.html','kontak.html','lounge-list.html','branch-office-planning.html','gaso-planning.html'
];
const runtime=fs.readFileSync(path.join(root,'assets/data-page-runtime-p40.js'),'utf8');
assert(runtime.includes("ge-data-page-ready"),'R8_READY_MARKER_MISSING');
assert(runtime.includes('gxLoadFirebaseRuntime'),'R8_FIREBASE_SESSION_SETTLE_MISSING');
assert(runtime.includes('gxSetSession'),'R8_SESSION_REHYDRATE_MISSING');
assert(!runtime.includes('firestore().collection('),'R8_RUNTIME_MUST_NOT_DIRECTLY_WRITE_FIRESTORE');
for(const file of pages){
 const s=fs.readFileSync(path.join(root,file),'utf8');
 assert(s.includes('assets/data-page-runtime-p40.js?v=40.8'),`R8_RUNTIME_MISSING ${file}`);
 assert(s.includes('assets/portal-shell.js?v=10.5'),'R8_SHARED_SHELL_MISSING '+file);
 assert(s.includes('assets/portal.css?v=10.20.1'),'R8_PORTAL_CSS_VERSION_MISSING '+file);
}
console.log(`OK P40-R8 data pages checked: ${pages.length}`);
console.log('OK Firebase/session settle is separated from existing page renderers');
console.log('OK R8 runtime does not directly write Firestore');
console.log('P40R8_DATA_PAGE_RUNTIME_PASS');
