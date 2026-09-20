/* P40 canonical Edition 1 page boot. One owner for page initialization. */
(function(){
'use strict';
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const call=(name,...args)=>{try{const fn=window[name];if(typeof fn==='function')return fn(...args);console.warn('[Edition1 boot] missing',name)}catch(e){console.error('[Edition1 boot]',name,e)}};
async function run(){
 try{if(window.GX_AUTH_READY)await window.GX_AUTH_READY}catch(e){console.warn('[Edition1 boot] auth readiness failed',e)}
 try{window.GERefreshData?.()}catch(_){}
 if(page==='standar.html'){
   call('geEnsureStandardContentV248'); call('geEnsureStandardModalV248'); call('geApplyStandardContentV248'); call('renderPersonnel'); call('renderPersonnelReadiness'); call('renderSkyPriority'); call('renderTouchpointStandards'); call('renderAnnouncementLibraryV246');
   const panel=new URLSearchParams(location.search).get('panel'); if(panel)call('showStandardPanel',panel,document.querySelector(`[data-standard-panel="${panel}"]`));
 } else if(page==='inisiatif.html'){
   call('geEnsureV252'); call('geUpgradeInitiativeModalV252'); call('renderInitiatives');
 } else if(page==='service-planning.html'){
   call('renderServicePlanningEdition1');
 } else if(page==='calendar.html'){
   call('geV251Ensure'); call('geV251RenderTouchpointPage'); call('geV251InitCalendar'); call('geV2532FixActiveNav'); call('geUpgradeCalendarModalV252'); call('geAddCalendarFiltersV252'); call('geUpgradeReminderV253'); call('geCalFixSidebarActiveV2533'); call('geCalBuildFiltersV2533'); call('geCalRenderV2533'); call('geCalRenderKPIV2534');
 } else if(page==='planning-documents.html'){call('renderPlanningDocuments');}
 else if(page==='data.html'){call('renderAirports');call('renderPersonnel');call('renderDocumentsAdmin');}
 else if(page==='admin.html'){call('renderAdminOverview');call('renderAdminInbox');call('renderAuditLogs');call('applyNewsRoleUI');call('renderUserAccounts');call('pmLoadPageR2');}
 else if(page==='berita.html'){call('renderArticles');call('renderAnnouncements');call('renderFaqs');call('renderAnnouncementLibraryV246');}
 else if(page==='kontak.html'){}
 else if(page==='lounge-list.html'){call('renderLounges');call('renderLoungeVisitors');call('renderLoungeCardsV237');call('gePopulateLoungeProviderFilterV243');call('renderLoungePriceSummaryV243');}
 else if(page==='branch-office-planning.html'){const panel=new URLSearchParams(location.search).get('panel')||'space';call('showBOPlanningPanel',panel);call('renderLoungeProcurement');call('renderBOSpaces');call('renderAirportSystems');}
 else if(page==='gaso-planning.html'){call('renderGasoAllV231');}
 else if(page==='station-material.html'){call('renderStationMaterials');}
 else if(page==='bo-space.html'){location.replace('branch-office-planning.html?panel=space');return}
 else if(page==='airport-systems.html'){location.replace('branch-office-planning.html?panel=systems');return}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
