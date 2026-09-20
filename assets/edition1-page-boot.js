/* P40 Edition 1 canonical page boot.
 * Firebase/Firestore is the only Edition 1 business-data source.
 * This boot owns shell replacement, auth readiness, Firestore hydration and page init.
 */
(function(){
'use strict';
const page=(location.pathname.split('/').pop()||'').toLowerCase();
const config={
 'e1-standar.html':{perm:'services',collections:['airports','personnel','touchpointStandards','skyPriority','announcements','standardContent']},
 'e1-inisiatif.html':{perm:'initiatives',collections:['initiatives','touchpoints','documents']},
 'e1-service-planning.html':{perm:'planning',collections:['stationMaterials','lounges','boSpaces','airportSystems','touchpointStandards','documents','serviceProcurement']},
 'e1-calendar.html':{perm:'initiatives',collections:['initiatives','projectEvents','touchpoints']},
 'e1-planning-documents.html':{perm:'planning',collections:['documents','initiatives']},
 'e1-data.html':{perm:'data',collections:['airports','personnel']},
 'e1-admin.html':{perm:'admin',collections:['users','inbox','auditLogs','portalManagerR2','airports','lounges']},
 'e1-berita.html':{perm:'news',collections:['articles','announcements','faqs','news','documents']},
 'e1-kontak.html':{perm:'contact',collections:['inbox']},
 'e1-lounge-list.html':{perm:'planning',collections:['lounges','loungeVisitors','serviceProcurement','documents']},
 'e1-branch-office-planning.html':{perm:'planning',collections:['lounges','boSpaces','serviceProcurement','airportSystems','stationMaterials','documents']},
 'e1-gaso-planning.html':{perm:'planning',collections:['gasoMaster','gasoServiceSupport','gasoPlanningService','airports','documents']}
};
const cfg=config[page]; if(!cfg)return;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function session(){return typeof window.gxGetSession==='function'?(gxGetSession()||{}):window.GX_CURRENT_USER||{}}
function initials(s){return String(s?.name||s?.username||s?.email||'GE').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'GE'}
function logicalPath(){return ({'e1-standar.html':'e1-standar.html','e1-inisiatif.html':'e1-inisiatif.html','e1-calendar.html':'e1-calendar.html','e1-service-planning.html':'e1-service-planning.html','e1-planning-documents.html':'e1-planning-documents.html','e1-data.html':'e1-data.html','e1-admin.html':'e1-admin.html','e1-berita.html':'e1-berita.html','e1-kontak.html':'e1-kontak.html','e1-lounge-list.html':'e1-lounge-list.html','e1-branch-office-planning.html':'e1-branch-office-planning.html','e1-gaso-planning.html':'e1-gaso-planning.html'})[page]||page}
const nav=[
 ['MAIN',[['index.html','Beranda','⌂']]],
 ['EXPERIENCE & INSIGHT',[['network-stations.html','Network & Station','✈'],['station-360.html','Station 360','⌾'],['airport-experience-map.html','Airport Experience Map','◎'],['readiness.html','Readiness','✓'],['customer-experience.html','Customer Experience','◉']]],
 ['IMPROVEMENT & PLANNING',[['e1-inisiatif.html','Initiative & Improvement','⚙'],['improvement-intake.html','Improvement Opportunity','✧'],['e1-calendar.html','Calendar & Project Tracking','▦'],['e1-service-planning.html','Planning Overview','≡'],['e1-lounge-list.html','Lounge / Tenant Planning','◫'],['e1-branch-office-planning.html','Branch Office Planning','⌾'],['e1-gaso-planning.html','GASO Planning','◈'],['e1-planning-documents.html','Planning Documents','▤']]],
 ['BUDGET & COST',[['budget-cost.html','Budget & Cost','▣'],['cost-intelligence.html','Cost Intelligence','◉']]],
 ['DATA & ADMINISTRATION',[['e1-data.html','Data Management','⬡'],['master-data.html','Master Data','◫'],['e1-admin.html','User & Access','♙']]],
 ['SUPPORT',[['e1-berita.html','Berita & Informasi','▣'],['e1-kontak.html','Contact Support','☎']]]
];
function isActive(href){return href===page}
function buildShell(){
 const top=document.querySelector('body>.top');const side=document.querySelector('body>.shell>.side');if(!top||!side)return;
 document.body.classList.add('e1-modern');
 const s=session();
 top.className='top e1-top';
 top.innerHTML=`<button id="e1MobileNav" class="e1-mobile" type="button" aria-label="Buka menu">☰</button><div class="e1-brand-logos"><img class="garuda" src="assets/garuda-horizontal-white.png" alt="Garuda Indonesia"><img class="danantara" src="assets/danantara-white-user.png" alt="Danantara Indonesia"></div><div class="e1-title"><strong>GROUND EXPERIENCE PORTAL</strong><span>Ground Experience • Service Experience Portal</span></div><div class="e1-session"><div class="period"><span>Period</span><select id="e1Period" aria-label="Period"><option>2026</option></select></div><div class="avatar">${initials(s)}</div><div class="who"><b id="sessionNameTop">${String(s.name||s.username||s.email||'User')}</b><span id="sessionRoleTop">${String([s.role,s.accessLevel].filter(Boolean).join(' • '))}</span></div><button class="logout" type="button" id="e1Logout">Keluar</button></div>`;
 side.innerHTML=nav.map(([title,items])=>`<div class="e1-nav-section">${title}</div>${items.map(([href,label,ico])=>`<a class="e1-nav-link${isActive(href)?' active':''}" href="${href}"><span class="ni">${ico}</span><span>${label}</span></a>`).join('')}<div class="e1-nav-divider"></div>`).join('');
 side.innerHTML+=`<div class="e1-nav-note">Sumber data bisnis Edition 1: Firebase / Firestore melalui authenticated Netlify Function.</div>`;
 document.getElementById('e1MobileNav')?.addEventListener('click',()=>side.classList.toggle('e1-open'));
 document.getElementById('e1Logout')?.addEventListener('click',()=>window.gxLogout?.());
 const year=new Date().getFullYear();const sel=document.getElementById('e1Period');if(sel)sel.value=String(year),sel.querySelector(`option[value="${year}"]`)||sel.insertAdjacentHTML('beforeend',`<option value="${year}">${year}</option>`);
}
function setSession(){const s=session();const n=document.getElementById('sessionNameTop'),r=document.getElementById('sessionRoleTop');if(n)n.textContent=s.name||s.username||s.email||'User';if(r)r.textContent=[s.role,s.accessLevel].filter(Boolean).join(' • ')}
function showStatus(message,error=false){let b=document.getElementById('e1DataStatus');if(!b){b=document.createElement('div');b.id='e1DataStatus';b.className='e1-data-status';document.querySelector('main.main')?.prepend(b)}b.textContent=message;b.dataset.error=error?'1':'0';b.style.display=message?'block':'none'}
async function ensureFirebase(){
 if(!window.GX_FIREBASE_CONFIG){await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='assets/firebase-config.js?v=e1-runtime';s.onload=resolve;s.onerror=()=>reject(new Error('Firebase config gagal dimuat.'));document.head.appendChild(s)})}
 if(!window.GXFirebase){await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='assets/firebase-client.js?v=e1-runtime';s.onload=resolve;s.onerror=()=>reject(new Error('Firebase client gagal dimuat.'));document.head.appendChild(s)})}
 if(!window.GXFirebase)throw new Error('Firebase runtime unavailable.');
 const state=await window.GXFirebase.init();
 if(!state?.ready)throw state?.error||new Error('Firebase runtime unavailable.');
 return state;
}
async function waitFirebase(){
 const state=await ensureFirebase();
 const u=await window.GXFirebase.currentUser();
 if(!u)throw new Error('Authentication required.');
 return {state,u};
}
function hasAccess(){if(cfg.perm==='admin')return window.gxHasUserManagementPermission?.()||session().role==='Super Admin';return window.gxHasPermission?.(cfg.perm)!==false}
function rerender(){
 if(page==='e1-standar.html'){const panel=new URLSearchParams(location.search).get('panel');const panelButton=panel?document.querySelector(`[data-standard-panel="${panel}"]`):null;if(panel&&window.showStandardPanel)window.showStandardPanel(panel,panelButton);window.renderTouchpointStandards?.();window.renderPersonnelReadiness?.();window.renderSkyPriority?.();window.geEnsureStandardModalV248?.();window.geApplyStandardContentV248?.();window.renderAnnouncementLibraryV246?.()}
 else if(page==='e1-inisiatif.html'){window.renderInitiatives?.();window.geApplyInitiativePresentationV224?.()}
 else if(page==='e1-service-planning.html'){window.geRenderPlanningPage?.();window.renderStationMaterials?.()}
 else if(page==='e1-calendar.html'){window.geV251Ensure?.();window.geV251RenderTouchpointPage?.();window.geV251InitCalendar?.();window.geUpgradeCalendarModalV252?.();window.geAddCalendarFiltersV252?.();window.geUpgradeReminderV253?.();window.geCalBuildFiltersV2533?.();window.geCalRenderV2533?.();window.geCalRenderKPIV2534?.()}
 else if(page==='e1-planning-documents.html'){window.renderPlanningDocuments?.()}
 else if(page==='e1-data.html'){window.renderAirports?.();window.renderPersonnel?.();window.renderDocumentsAdmin?.()}
 else if(page==='e1-admin.html'){window.renderAdminOverview?.();window.renderAdminInbox?.();window.renderAuditLogs?.();window.p26RenderUsers?.();window.pmLoadPageR2?.()}
 else if(page==='e1-berita.html'){window.renderArticles?.();window.renderAnnouncements?.();window.renderFaqs?.();window.renderAnnouncementLibraryV246?.()}
 else if(page==='e1-lounge-list.html'){window.renderLounges?.();window.renderLoungeVisitors?.();window.renderLoungePriceSummaryV243?.();window.renderLoungeCardsV237?.()}
 else if(page==='e1-branch-office-planning.html'){window.geRenderPlanningPage?.();window.renderAirportSystems?.();window.renderLoungeProcurement?.();window.renderBOSpaces?.()}
 else if(page==='e1-gaso-planning.html'){window.renderGasoAllV231?.()}
}
async function boot(){
 try{
  buildShell();
  showStatus('Menghubungkan ke Firebase / Firestore…');
  await window.GEStore.waitAuth();
  await waitFirebase();
  setSession();
  if(!hasAccess()){const target=typeof gxDefaultPage==='function'?gxDefaultPage():'index.html';if(target!==page)location.replace(target);return}
  showStatus('Mengambil data dari Firebase / Firestore…');
  await window.GEStore.hydrate(cfg.collections);
  rerender();
  showStatus('Terhubung ke Firebase / Firestore');
  setTimeout(()=>showStatus(''),900);
 }catch(e){console.error('[Edition1 boot]',e);showStatus('Gagal terhubung ke Firebase / Firestore: '+(e.message||e),true)}
}
document.addEventListener('DOMContentLoaded',()=>boot(),{once:true});
window.addEventListener('gx-data-save-error',e=>showStatus('Perubahan gagal disimpan ke Firebase / Firestore: '+(e.detail?.message||'Unknown error'),true));
})();
