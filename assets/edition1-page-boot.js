/* P40 Edition 1 — page-owned boot. Shared runtime contains definitions only; this file owns initialization. */
(function(){
  'use strict';
  const call=(name,...args)=>{try{const fn=window[name];if(typeof fn==='function')return fn(...args)}catch(e){console.error('[Edition1 boot]',name,e)}};
  const ready=fn=>{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn()};
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  ready(()=>{
    if(page==='standar.html'){
      call('geEnsureStandardContentV248'); call('geEnsureStandardModalV248'); call('geApplyStandardContentV248');
      call('renderPersonnel'); call('renderPersonnelReadiness'); call('renderSkyPriority'); call('renderTouchpointStandards'); call('renderAnnouncementLibraryV246');
    } else if(page==='inisiatif.html'){
      call('geEnsureV252'); call('geUpgradeInitiativeModalV252'); call('renderInitiatives');
    } else if(page==='service-planning.html'){
      call('renderServicePlanningEdition1');
    } else if(page==='calendar.html'){
      call('geV251Ensure'); call('geV2532FixActiveNav'); call('geUpgradeCalendarModalV252'); call('geAddCalendarFiltersV252'); call('geUpgradeReminderV253');
      call('geCalFixSidebarActiveV2533'); call('geCalBuildFiltersV2533'); call('geCalRenderV2533'); call('geCalRenderKPIV2534');
      call('geUpgradeCalendarModalV252');
    } else if(page==='planning-documents.html'){
      call('renderPlanningDocuments');
    } else if(page==='data.html'){
      call('renderAirports'); call('renderPersonnel'); call('renderDocumentsAdmin');
    } else if(page==='admin.html'){
      call('renderAdminOverview'); call('renderAdminInbox'); call('renderAuditLogs'); call('applyNewsRoleUI'); call('renderUserAccounts');
      call('pmLoadPageR2');
    } else if(page==='berita.html'){
      call('renderArticles'); call('renderAnnouncements'); call('renderFaqs'); call('renderAnnouncementLibraryV246');
    } else if(page==='kontak.html'){
      /* Forms are inline-owned; no global renderer is needed. */
    } else if(page==='lounge-list.html'){
      call('renderLounges'); call('renderLoungeVisitors'); call('renderLoungeCardsV237'); call('gePopulateLoungeProviderFilterV243'); call('renderLoungePriceSummaryV243');
    } else if(page==='branch-office-planning.html'){
      call('renderLoungeProcurement'); call('renderBOSpaces'); call('renderAirportSystems');
    } else if(page==='gaso-planning.html'){
      call('renderGasoAllV231');
    }
  });
})();
