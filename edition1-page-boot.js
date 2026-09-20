/* Edition 1 page boot — Firebase/Firestore only. No local business-data fallback. */
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
  function hasAccess(){if(cfg.perm==='admin')return window.gxHasUserManagementPermission?.()||session().role==='Super Admin';return window.gxHasPermission?.(cfg.perm)!==false}
  function setSession(){const s=session();const n=document.getElementById('sessionName'),r=document.getElementById('sessionRole');if(n)n.textContent=s.name||s.username||s.email||'';if(r)r.textContent=[s.role,s.accessLevel].filter(Boolean).join(' • ')}
  function showStatus(message,error=false){let b=document.getElementById('e1DataStatus');if(!b){b=document.createElement('div');b.id='e1DataStatus';b.className='e1-data-status';document.querySelector('main.main')?.prepend(b)}b.textContent=message;b.dataset.error=error?'1':'0';b.style.display=message?'block':'none'}
  async function waitFirebase(){
    // auth.js owns the canonical loader. Call it explicitly so page boot never
    // races Firebase runtime creation, even when scripts are cached or deferred.
    if(!window.GXFirebase && typeof window.gxLoadFirebaseRuntime==='function'){
      const loaded=await window.gxLoadFirebaseRuntime();
      if(!loaded && !window.GXFirebase) throw new Error('Firebase runtime unavailable.');
    }
    const deadline=Date.now()+15000;
    while(!window.GXFirebase && Date.now()<deadline) await sleep(50);
    if(!window.GXFirebase) throw new Error('Firebase runtime unavailable.');
    const u=await window.GXFirebase.currentUser();
    if(!u) throw new Error('Authentication required.');
    const sessionDeadline=Date.now()+10000;
    while(Date.now()<sessionDeadline){
      const s=session();
      if(s.uid && String(s.uid)===String(u.uid)) return u;
      await sleep(100);
    }
    return u;
  }
  function rerender(){
    try{
      if(page==='e1-standar.html'){const panel=new URLSearchParams(location.search).get('panel');const panelButton=panel?document.querySelector(`[data-standard-panel="${panel}"]`):null;if(panel&&window.showStandardPanel)window.showStandardPanel(panel,panelButton);window.renderTouchpointStandards?.();window.renderPersonnelReadiness?.();window.renderSkyPriority?.();window.geEnsureStandardModalV248?.();window.geApplyStandardContentV248?.();window.renderAnnouncementLibraryV246?.();}
      else if(page==='e1-inisiatif.html'){window.renderInitiatives?.();window.geApplyInitiativePresentationV224?.();}
      else if(page==='e1-service-planning.html'){window.geRenderPlanningPage?.();}
      else if(page==='e1-calendar.html'){window.geV251Ensure?.();window.geCalEnsureProjectFieldsV2535?.();window.geCalBuildFiltersV2533?.();window.geCalRenderV2533?.();window.geCalRenderKPIV2534?.();}
      else if(page==='e1-planning-documents.html'){window.renderPlanningDocuments?.();}
      else if(page==='e1-data.html'){window.renderAirports?.();window.renderPersonnel?.();window.renderPersonnelReadiness?.();}
      else if(page==='e1-admin.html'){window.renderAdminOverview?.();window.renderAdminInbox?.();window.renderAuditLogs?.();window.p26RenderUsers?.();window.pmLoadPageR2?.();}
      else if(page==='e1-berita.html'){window.renderArticles?.();window.renderAnnouncements?.();window.renderFaqs?.();}
      else if(page==='e1-lounge-list.html'){window.renderLounges?.();window.renderLoungeVisitors?.();window.renderLoungePriceSummaryV243?.();window.renderLoungeCardsV237?.();}
      else if(page==='e1-branch-office-planning.html'){window.geRenderPlanningPage?.();window.renderAirportSystems?.();window.renderLoungeProcurement?.();window.renderBOSpaces?.();}
      else if(page==='e1-gaso-planning.html'){window.renderGasoAllV231?.();}
    }catch(e){console.error('[Edition1 render]',e);showStatus('Render halaman gagal: '+e.message,true)}
  }
  async function boot(){
    try{
      showStatus('Menghubungkan ke Firebase / Firestore…');
      await window.GEStore.waitAuth();
      await waitFirebase();
      setSession();
      if(!hasAccess()){const target=typeof gxDefaultPage==='function'?gxDefaultPage():'index.html';if(target!==page)location.replace(target);return;}
      showStatus('Mengambil data dari Firebase / Firestore…');
      await window.GEStore.hydrate(cfg.collections);
      rerender();
      showStatus('Terhubung ke Firebase / Firestore');
    }catch(e){console.error('[Edition1 boot]',e);showStatus('Gagal terhubung ke Firebase / Firestore: '+(e.message||e),true)}
  }
  function initNav(){
    document.getElementById('e1MobileNav')?.addEventListener('click',()=>document.querySelector('.e1-top + .shell > .side')?.classList.toggle('e1-mobile-open'));
    document.querySelectorAll('.service-toggle,.initiative-toggle,.planning-toggle').forEach(el=>el.addEventListener('click',()=>el.parentElement.classList.toggle('collapsed')));
  }
  document.addEventListener('DOMContentLoaded',()=>{initNav();boot()});
  window.addEventListener('gx-data-save-error',e=>showStatus('Perubahan gagal disimpan ke Firebase / Firestore: '+(e.detail?.message||'Unknown error'),true));
})();
