/* Edition 1 page boot: authenticate first, hydrate real Firestore data, then render.
 * No business data is seeded locally. */
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
  function session(){return typeof window.gxGetSession==='function'?(gxGetSession()||{}):window.GX_CURRENT_USER||{}}
  function hasAccess(){if(cfg.perm==='admin')return window.gxHasUserManagementPermission?.()||session().role==='Super Admin';return window.gxHasPermission?.(cfg.perm)!==false}
  function setSession(){const s=session();const n=document.getElementById('sessionName'),r=document.getElementById('sessionRole');if(n)n.textContent=s.name||s.username||s.email||'';if(r)r.textContent=[s.role,s.accessLevel].filter(Boolean).join(' • ')}
  function showStatus(message,error=false){let b=document.getElementById('e1DataStatus');if(!b){b=document.createElement('div');b.id='e1DataStatus';b.className='e1-data-status';document.querySelector('main.main')?.prepend(b)}b.textContent=message;b.dataset.error=error?'1':'0'}
  function rerender(){
    try{
      if(page==='e1-standar.html'){
        const panel=new URLSearchParams(location.search).get('panel'); const panelButton=panel?document.querySelector(`[data-standard-panel="${panel}"]`):null; if(panel&&window.showStandardPanel)window.showStandardPanel(panel,panelButton); window.renderTouchpointStandards?.(); window.renderPersonnelReadiness?.(); window.renderSkyPriority?.(); if(window.data?.standardContent && Object.keys(window.data.standardContent).length){ window.geEnsureStandardModalV248?.(); window.geApplyStandardContentV248?.(); window.renderAnnouncementLibraryV246?.(); } else { const box=document.getElementById('announcementLibraryV246'); if(box)box.innerHTML='<div class="planning-empty">Belum ada Announcement Reference pada Firestore.</div>'; }
      } else if(page==='e1-inisiatif.html'){
        window.renderInitiatives?.(); window.geApplyInitiativePresentationV224?.();
      } else if(page==='e1-service-planning.html'){
        window.geRenderPlanningPage?.();
      } else if(page==='e1-calendar.html'){
        window.geV251Ensure?.(); window.geCalEnsureProjectFieldsV2535?.(); window.geCalBuildFiltersV2533?.(); window.geCalRenderV2533?.(); window.geCalRenderKPIV2534?.();
      } else if(page==='e1-planning-documents.html'){
        window.renderPlanningDocuments?.();
      } else if(page==='e1-data.html'){
        window.renderAirports?.(); window.renderPersonnel?.(); window.renderPersonnelReadiness?.();
      } else if(page==='e1-admin.html'){
        window.renderAdminOverview?.(); window.renderAdminInbox?.(); window.renderAuditLogs?.(); window.p26RenderUsers?.(); window.pmLoadPageR2?.();
      } else if(page==='e1-berita.html'){
        window.renderArticles?.(); window.renderAnnouncements?.(); window.renderFaqs?.();
      } else if(page==='e1-kontak.html'){
        // Contact and guestbook submit through the same authenticated Inbox workflow.
      } else if(page==='e1-lounge-list.html'){
        window.renderLounges?.(); window.renderLoungeVisitors?.(); window.renderLoungePriceSummaryV243?.(); window.renderLoungeCardsV237?.();
      } else if(page==='e1-branch-office-planning.html'){
        window.geRenderPlanningPage?.(); window.renderAirportSystems?.(); window.renderLoungeProcurement?.(); window.renderBOSpaces?.();
      } else if(page==='e1-gaso-planning.html'){
        window.renderGasoAllV231?.();
      }
    }catch(e){console.error('[Edition1 render]',e);showStatus('Data berhasil dimuat, tetapi render halaman gagal: '+e.message,true)}
  }
  async function boot(){
    try{
      await window.GEStore.waitAuth(); setSession();
      if(!hasAccess()){const target=typeof gxDefaultPage==='function'?gxDefaultPage():'index.html'; if(target!==page)location.replace(target); return;}
      showStatus('Mengambil data dari Firebase / Firestore…');
      await window.GEStore.hydrate(cfg.collections);
      rerender();
      showStatus('Terhubung ke Firestore • '+new Date().toLocaleTimeString('id-ID'));
    }catch(e){console.error('[Edition1 boot]',e);showStatus('Gagal mengambil data Firestore: '+(e.message||e),true)}
  }
  document.addEventListener('DOMContentLoaded',()=>boot());
  window.addEventListener('gx-data-save-error',e=>showStatus('Perubahan gagal disimpan ke Firestore: '+(e.detail?.message||'Unknown error'),true));
  document.getElementById('e1MobileNav')?.addEventListener('click',()=>document.body.classList.toggle('e1-mobile-nav-open'));
})();
