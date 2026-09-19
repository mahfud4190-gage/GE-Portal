/* P40-R8 — Data-page runtime stabilizer.
 *
 * Purpose: keep Firebase/session readiness separate from the legacy page renderers.
 * The data pages still own their existing datasource/query/CRUD logic; this layer
 * only re-runs the page renderer after the authenticated session is settled and
 * provides a deterministic ready marker. It never writes Firebase data.
 */
(function(){
  'use strict';
  const PAGE=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const PAGES=new Set([
    'standar.html','inisiatif.html','service-planning.html','calendar.html',
    'planning-documents.html','data.html','admin.html','berita.html','kontak.html',
    'lounge-list.html','branch-office-planning.html','gaso-planning.html'
  ]);
  if(!PAGES.has(PAGE))return;

  const runners={
    'standar.html':['renderTouchpointStandards','renderPersonnelReadiness','renderAnnouncementLibraryV246'],
    'inisiatif.html':['renderInitiatives','refreshInitiativeFilters'],
    'service-planning.html':['geRenderPlanningPage','renderPlanningDocuments'],
    'calendar.html':['geCalRenderV2533','geCalRenderKPIV2534','geV254RenderWorkspace'],
    'planning-documents.html':['renderPlanningDocuments','renderDocumentsHome'],
    'data.html':['renderPersonnel','renderPersonnelReadiness','renderAirports','renderDocumentsAdmin'],
    'admin.html':['renderUserAccounts'],
    'berita.html':['renderAnnouncements','renderFaqs'],
    'kontak.html':[],
    'lounge-list.html':['renderLounges','renderLoungeCardsV237','renderLoungePriceSummaryV243'],
    'branch-office-planning.html':['renderLoungeProcurement','renderBOSpaces','renderAirportSystems','renderStationMaterials'],
    'gaso-planning.html':['renderGasoAllV231']
  };

  function runOne(name){
    try{
      const fn=window[name];
      if(typeof fn!=='function')return;
      fn();
    }catch(e){
      console.warn('[P40-R8] page renderer deferred/failed',PAGE,name,e);
    }
  }
  function render(){
    (runners[PAGE]||[]).forEach(runOne);
    document.documentElement.classList.add('ge-data-page-ready');
    document.body?.setAttribute('data-ge-data-page-ready','true');
  }
  async function settle(){
    try{
      if(typeof window.gxLoadFirebaseRuntime==='function'){
        const loaded=await window.gxLoadFirebaseRuntime();
        if(loaded&&window.GXFirebase?.currentProfile){
          try{
            const profile=await window.GXFirebase.currentProfile();
            if(profile&&typeof window.gxSetSession==='function')window.gxSetSession({...profile,uid:profile.uid||profile.id||''});
          }catch(e){console.warn('[P40-R8] Firebase profile settle skipped',e)}
        }
      }
    }catch(e){console.warn('[P40-R8] Firebase runtime settle skipped',e)}
    render();
  }
  function schedule(){
    render();
    window.setTimeout(render,120);
    window.setTimeout(render,500);
    window.setTimeout(settle,0);
    window.setTimeout(settle,800);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});
  else schedule();
})();
