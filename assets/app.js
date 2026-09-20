(function(){'use strict';
const E1={
 'standar.html':['services',['airports','personnel','touchpointStandards','skyPriority','announcements','standardContent']],
 'inisiatif.html':['initiatives',['initiatives','touchpoints','documents']],
 'service-planning.html':['planning',['stationMaterials','lounges','boSpaces','airportSystems','touchpointStandards','documents','serviceProcurement']],
 'calendar.html':['initiatives',['initiatives','projectEvents','touchpoints']],
 'planning-documents.html':['planning',['documents','initiatives']],
 'data.html':['data',['airports','personnel']],
 'admin.html':['admin',['users','inbox','auditLogs','portalManagerR2','airports','lounges']],
 'berita.html':['news',['articles','announcements','faqs','news','documents']],
 'kontak.html':['contact',['inbox']],
 'lounge-list.html':['planning',['lounges','loungeVisitors','serviceProcurement','documents']],
 'branch-office-planning.html':['planning',['lounges','boSpaces','serviceProcurement','airportSystems','stationMaterials','documents']],
 'gaso-planning.html':['planning',['gasoMaster','gasoServiceSupport','gasoPlanningService','airports','documents']]
};
const GENERAL={
 'index.html':['airports','initiatives','touchpoints','documents','lounges','loungeVisitors','stationMaterials','airportSystems','news','personnel','skyPriority'],
 'planning-workspace.html':['lounges','boSpaces','serviceProcurement','airportSystems','stationMaterials','documents'],
 'customer-experience.html':['touchpoints','airports'], 'network-stations.html':['airports'], 'station-360.html':['airports','touchpoints','personnel'],
 'readiness.html':['airports','personnel'], 'service-capability.html':['airports','touchpointStandards'], 'master-data.html':['airports','touchpoints','personnel'],
 'audit-log.html':['auditLogs'], 'portal-management.html':['portalManagerR2'], 'improvement-intake.html':['initiatives','touchpoints'], 'budget-cost.html':['initiatives'], 'cost-intelligence.html':['initiatives']
};
function routeFromLocation(){let r=(location.hash||'').replace(/^#\/?/,'').split('?')[0];return (r&&window.GE_PAGES[r])?r:'index.html'}
function setRoute(r,push=true){if(!window.GE_PAGES[r])r='index.html';window.GE_ROUTE=r;if(push&&location.hash!=='#/'+r)history.pushState(null,'','#/'+r);renderRoute(r)}
function intercept(){document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const raw=(a.getAttribute('href')||'').split('?')[0].split('#')[0];if(window.GE_PAGES[raw]){e.preventDefault();setRoute(raw)}})}
function rerender(r){
 if(r==='inisiatif.html'){window.renderInitiatives?.();window.geApplyInitiativePresentationV224?.()}
 else if(r==='standar.html'){window.renderTouchpointStandards?.();window.renderPersonnelReadiness?.();window.renderSkyPriority?.();window.geEnsureStandardModalV248?.();window.geApplyStandardContentV248?.();window.renderAnnouncementLibraryV246?.()}
 else if(r==='service-planning.html'||r==='planning-workspace.html'){window.geRenderPlanningPage?.();window.renderStationMaterials?.()}
 else if(r==='calendar.html'){window.geV251Ensure?.();window.geV251RenderTouchpointPage?.();window.geV251InitCalendar?.();window.geCalRenderV2533?.();window.geCalRenderKPIV2534?.()}
 else if(r==='planning-documents.html'){window.renderPlanningDocuments?.()}
 else if(r==='data.html'){window.renderAirports?.();window.renderPersonnel?.();window.renderDocumentsAdmin?.()}
 else if(r==='admin.html'){window.renderAdminOverview?.();window.renderAdminInbox?.();window.renderAuditLogs?.();window.p26RenderUsers?.();window.pmLoadPageR2?.()}
 else if(r==='berita.html'){window.renderArticles?.();window.renderAnnouncements?.();window.renderFaqs?.();window.renderAnnouncementLibraryV246?.()}
 else if(r==='lounge-list.html'){window.renderLounges?.();window.renderLoungeVisitors?.();window.renderLoungePriceSummaryV243?.();window.renderLoungeCardsV237?.()}
 else if(r==='branch-office-planning.html'){window.geRenderPlanningPage?.();window.renderAirportSystems?.();window.renderLoungeProcurement?.();window.renderBOSpaces?.()}
 else if(r==='gaso-planning.html'){window.renderGasoAllV231?.()}
}
async function hydrate(r){const cols=E1[r]?.[1]||GENERAL[r]||[];if(!cols.length)return;await window.GEStore.hydrate(cols)}
async function renderRoute(r){document.body.classList.add('route-loading');try{const p=window.GE_PAGES[r];document.title=(p?.title||'Ground Experience')+' — Ground Experience Portal';const main=document.querySelector('main.main');if(!main)return;main.innerHTML=p?.html||'<section class="hero"><h2>Page unavailable</h2></section>';await hydrate(r);window.GE_ROUTE=r;window.dispatchEvent(new CustomEvent('ge-route-ready',{detail:{route:r}}));rerender(r);window.scrollTo({top:0,behavior:'auto'});document.querySelectorAll('.side a[href]').forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').split('?')[0]===r));}catch(e){console.error(e);const main=document.querySelector('main.main');if(main)main.insertAdjacentHTML('afterbegin','<div class="e1-data-status" data-error="1">'+String(e.message||e)+'</div>')}finally{document.body.classList.remove('route-loading')}}
async function start(){
 await window.GXFirebase.init();const u=await window.GXFirebase.currentUser();if(!u){location.replace('login.html');return}
 try{await window.gxSyncFirebaseSession()}catch(e){const c=window.gxGetSession?.();if(!c){location.replace('login.html');return}}
 window.GE_ROUTE=routeFromLocation();
 // shell() is initialized by shell.js DOM ready; force after session if exposed only via init timing.
 await renderRoute(window.GE_ROUTE); intercept(); window.addEventListener('hashchange',()=>{const r=routeFromLocation();if(r!==window.GE_ROUTE){window.GE_ROUTE=r;renderRoute(r)}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();