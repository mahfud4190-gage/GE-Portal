/* P33-P37 — Presentation stabilization only.
   No business/data/auth workflow is changed. */
(function(){
  'use strict';

  const ROUTE = () => (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const PAGE_IDENTITY = {
    'index.html': ['dashboard','Ground Experience Dashboard','Central workspace untuk memantau service experience, airport, inisiatif, lounge, dokumen, dan informasi Ground Experience.'],
    'network-stations.html': ['airport-experience-network','Airport Experience Network','Network overview, station profile, responsible organization and operational coverage.'],
    'airport-experience-map.html': ['airport-experience-map','Airport Experience Map','Peta jaringan airport dan konteks experience per lokasi.'],
    'station-360.html': ['station-profile-360','Station Profile / 360','One station view: identity, organization, service location, capability, readiness, agreement and CX context.'],
    'customer-experience.html': ['customer-experience','Customer Experience','Measurement, insight, finding, dan publication untuk customer experience.'],
    'touchpoint.html': ['journey-touchpoint','Touch Point & Station Condition','Kondisi layanan per station/Branch Office, termasuk foto, status, dan keterangan terbaru.'],
    'standar.html': ['service-standard','Standar Layanan Garuda Indonesia','Framework People • Process • Premises untuk menjaga konsistensi service delivery.'],
    'readiness.html': ['readiness-compliance','Readiness & Compliance','Service standard, requirement, assessment, gap, dan evidence per station.'],
    'service-capability.html': ['service-capability','Service Capability','Touch Point, Service & Capability pada operational chain per station.'],
    'service-locations.html': ['service-locations','Service Location','Service location dan airport mapping.'],
    'inisiatif.html': ['initiative-management','Initiative','Management dan pengelolaan initiative Ground Experience.'],
    'improvement-intake.html': ['improvement-intake','Improvement Intake & Opportunity','Source intake, opportunity review, dan traceability.'],
    'initiative-conversion.html': ['initiative-conversion','Controlled Initiative Conversion & Traceability','Controlled conversion dari opportunity menjadi initiative.'],
    'initiative-traceability.html': ['initiative-traceability','Initiative Traceability, Milestone & Activity Integration','Traceability initiative, milestone, dan activity.'],
    'budget-cost.html': ['budget-cost','Budget & Financial','Budget envelope, cost object, allocation, actual cost, dan initiative financial trace.'],
    'management-outcome.html': ['management-outcome','Management, Outcome & Transformation','Management outcome dan transformation context.'],
    'service-planning.html': ['planning-overview','Planning Overview','Planning overview dan ringkasan Service Planning.'],
    'planning-workspace.html': ['planning-workspace','Planning Workspace','Satu workspace untuk konteks Lounge / Tenant, Branch Office, dan GASO.'],
    'lounge-list.html': ['lounge-tenant-planning','Lounge/Tenant Planning','Planning reference Lounge/Tenant seluruh Branch Office.'],
    'branch-office-planning.html': ['branch-office-planning','Branch Office Planning','Planning context untuk Branch Office dan station.'],
    'gaso-planning.html': ['gaso-planning','GASO Planning','GASO Master, Service Support, dan Planning Service.'],
    'planning-documents.html': ['planning-documents','Planning Documents','Repository dokumen terkait planning yang terunggah atau terhubung di portal.'],
    'station-material.html': ['station-material','Station Material','Station material, vendor, contract period, dan supporting document.'],
    'lounge-procurement.html': ['lounge-service-procurement','Lounge & Service Procurement','Procurement context untuk Lounge dan Service Planning.'],
    'airport-systems.html': ['airport-systems','Airport Systems','CUTE, CUPPS, terminal equipment, provider, dan availability.'],
    'bo-space.html': ['branch-office-space','Branch Office Space','Leased area, landlord, function, period, dan annual commitment.'],
    'agreement-service.html': ['agreement-document','Agreement & Document','Agreement, document, effective period, dan service availability.'],
    'data.html': ['data-management','Data Management','Master data airport dan personil sebagai referensi layanan dan initiative.'],
    'master-data.html': ['master-data','Master Data','Core reference untuk Network, Station, Journey, Touch Point, Service, dan Capability.'],
    'admin.html': ['account-access-management','Account & Access Management','Kelola user account, organizational role, access level, data scope, dan module permissions.'],
    'audit-log.html': ['audit-log','Audit Log','Jejak aktivitas dan audit trail portal.'],
    'profile.html': ['profile','Profile','Profile akun dan informasi akses.'],
    'change-password.html': ['change-password','Ganti Password','Perubahan password akun yang telah terautentikasi.'],
    'calendar.html': ['calendar-project-tracking','Calendar & Project Tracking','Calendar dan project tracking Ground Experience.'],
    'pre-journey.html': ['initiative-pre-journey','Pre-Journey','Kegiatan dan initiative pada konteks Pre-Journey.'],
    'pre-flight.html': ['initiative-pre-flight','Pre-Flight','Kegiatan dan initiative pada konteks Pre-Flight.'],
    'post-flight.html': ['initiative-post-flight','Post-Flight','Kegiatan dan initiative pada konteks Post-Flight.'],
    'post-journey.html': ['initiative-post-journey','Post-Journey','Kegiatan dan initiative pada konteks Post-Journey.'],
    'lounge-access.html': ['lounge-access','Lounge Access','Lounge Access dan eligibility workflow.'],
    'lounge-visitor.html': ['lounge-visitor','Lounge/Tenant Visitor','Lounge/Tenant visitor dan eligibility reference.'],
    'lounge-flights.html': ['lounge-flights','Daftar Penerbangan','Flight reference untuk Lounge workflow.'],
    'lounge-purchase.html': ['lounge-purchase','Pembelian Akses Lounge/Tenant','Pembelian akses Lounge/Tenant.'],
    'program-kerja.html': ['program-kerja','Program Kerja & Budget','Program kerja dan budget import.'],
    'cost-intelligence.html': ['cost-intelligence','Cost Intelligence','Cost intelligence dan financial trace.'],
    'map.html': ['airport-map','Peta Airport','Peta airport penerbangan.'],
    'layanan.html': ['service-experience','Service Experience','Service Experience portal reference.'],
    'berita.html': ['news-information','Berita & Informasi','Berita dan informasi Ground Experience.'],
    'kontak.html': ['contact','Hubungi Kami','Informasi kontak Ground Experience.']
  };

  const TABLE_ROUTES = new Set([
    'service-planning.html','lounge-list.html','branch-office-planning.html','gaso-planning.html','planning-documents.html',
    'admin.html','customer-experience.html','readiness.html','budget-cost.html','station-material.html','airport-systems.html',
    'bo-space.html','lounge-procurement.html','lounge-visitor.html','lounge-flights.html','lounge-purchase.html','data.html',
    'network-stations.html','agreement-service.html','initiative-traceability.html','initiative-conversion.html','improvement-intake.html',
    'calendar.html','touchpoint.html','service-capability.html','service-locations.html','master-data.html','audit-log.html'
  ]);

  const STATUS = {
    positive: new Set(['covered','valid','completed','available','active','on track','compliant','verified','published','ready','achieved','feasible','effective','paid','current','on time','exceed','meet','supports','departed','ok','meet','exceed']),
    warning: new Set(['follow-up','attention','partial','expiring soon','pending','pending verification','review','at risk','below','gap identified','not updated','under review','hold','on hold','upcoming','scheduled','delayed','partially achieved','review','below','partial / review']),
    critical: new Set(['expired','critical','overdue','not available','failed','fail','not compliant','not achieved','invalid','rejected','cancelled','not feasible','unable to verify','warn','tidak terdapat dokumen legalitas yang valid','terminated']),
    process: new Set(['in progress','on progress','submitted','processing','draft','proposed','planning','implementation','training','inspection','open','in_progress','processing','on progress']),
    neutral: new Set(['unknown','n/a','na','not configured','not assessed','not applicable','unavailable','no data','archived','superseded','legacy imported','not started','inactive','future'])
  };

  function semanticStatus(value){
    const v=String(value??'').trim().toLowerCase();
    for(const [kind,set] of Object.entries(STATUS)) if(set.has(v)) return kind;
    if(v==='resolved') return 'positive';
    return null;
  }

  function decorateStatusElement(el){
    if(!el || el.dataset.gxStatusDecorated==='1') return;
    const kind=semanticStatus(el.textContent);
    if(!kind) return;
    el.dataset.gxStatusDecorated='1';
    el.classList.add('gx-status-badge','gx-status-'+kind);
    el.setAttribute('data-status-semantic',kind);
  }

  function decorateStatusCells(table){
    const heads=[...(table.tHead?.rows?.[0]?.cells||[])].map(x=>String(x.textContent||'').trim().toLowerCase());
    [...table.tBodies].forEach(tb=>[...tb.rows].forEach(row=>row.cells.forEach((cell,i)=>{
      const h=heads[i]||'';
      if(/status|state|result|availability|publication|workflow|condition|severity|decision|pencapaian/i.test(h)){
        if(cell.children.length===1 && cell.firstElementChild.matches?.('span,.pill,.planning-status,[class*="status"]')) decorateStatusElement(cell.firstElementChild);
        else {
          const kind=semanticStatus(cell.textContent);
          if(kind){
            const text=cell.textContent.trim();
            cell.textContent='';
            const span=document.createElement('span');
            span.className='gx-status-badge gx-status-'+kind;
            span.dataset.statusSemantic=kind;
            span.textContent=text;
            cell.appendChild(span);
          }
        }
      }
    })));
  }

  function classifyTable(table){
    if(!TABLE_ROUTES.has(ROUTE())) return;
    table.dataset.gxTableStandard='1';
    table.classList.add('gx-table-standard');
    const heads=[...(table.tHead?.rows?.[0]?.cells||[])];
    heads.forEach((th,i)=>{
      const h=String(th.textContent||'').trim().toLowerCase();
      const cells=[...(table.tBodies?.[0]?.rows||[])].map(r=>r.cells[i]).filter(Boolean);
      let type='text';
      if(/action|kelola|manage|update|hapus|decision|trace|link/i.test(h)) type='action';
      else if(/status|state|result|availability|publication|workflow|condition|severity/i.test(h)) type='status';
      else if(/document|dokumen|lampiran|reference|referensi|file/i.test(h)) type='document';
      else if(/date|tanggal|waktu|mulai|berakhir|period|due|deadline|tahun/i.test(h)) type='date';
      else if(/price|harga|amount|cost|budget|nilai|currency/i.test(h)) type='currency';
      else if(/no\.?$|count|total|score|value|jumlah|gap|size|capacity/i.test(h)) type='number';
      th.classList.add('gx-col-'+type);
      if(type==='action') th.setAttribute('aria-label',(th.textContent.trim()||'Action')+' — kolom tindakan');
      cells.forEach(cell=>{
        cell.classList.add('gx-cell-'+type);
        if(type==='document' || cell.textContent.trim().length>55){
          const full=cell.textContent.trim();
          if(full) cell.title=full;
          cell.classList.add('gx-cell-long');
        }
      });
    });
    decorateStatusCells(table);
  }

  function enhanceTables(root=document){ if(root.matches?.('table'))classifyTable(root); root.querySelectorAll?.('table').forEach(classifyTable); }

  function applyStandaloneStatuses(root=document){
    const selector='.pill,.planning-status,[class*="status-active"],[class*="status-inactive"],[class*="flight-status"],[class*="due-badge"],[class*="severity"],[class*="ge-badge"]';
    if(root.matches?.(selector))decorateStatusElement(root);
    root.querySelectorAll?.(selector).forEach(decorateStatusElement);
  }

  function applyPageIdentity(){
    const route=ROUTE(), entry=PAGE_IDENTITY[route];
    if(!entry) return;
    const [pageId,defaultTitle,defaultDescription]=entry;
    document.body?.setAttribute('data-page-id',pageId);
    document.body?.setAttribute('data-page-title',defaultTitle);
    const cfg=readPageConfig(pageId,route);
    const title=cfg.title||defaultTitle, desc=cfg.description||defaultDescription;
    const titleEl=document.querySelector('.ge-page-head h1,.page-header h1,.hero h2,.tp-page-head h1,.head h1');
    const descEl=document.querySelector('.ge-page-head p,.page-header p,.hero p,.tp-page-head p,.head p');
    if(titleEl && titleEl.closest('#dashboardRoot')==null) titleEl.textContent=title;
    if(descEl && descEl.closest('#dashboardRoot')==null && desc) descEl.textContent=desc;
    document.title=title+' · Ground Experience Portal';
    document.body?.setAttribute('data-page-description',desc);
  }

  function readPageConfig(pageId,route){
    try{
      if(typeof pmCfgR2!=='function') return {};
      const cfg=pmCfgR2();
      // Prefer stable P35 pageId. Legacy route-key config is only a same-page fallback.
      return cfg?.pages?.[pageId] || cfg?.pages?.[route] || {};
    }catch(e){ return {}; }
  }

  function wirePlanningCards(){
    if(ROUTE()!=='service-planning.html') return;
    const map={
      snapshotLounge:['lounge-list.html','Lounge Provider','Semua Lounge/Tenant provider records.'],
      snapshotContractPending:['lounge-list.html?planningCard=contract-followup','Contract Follow-up','Hanya agreement/lounge record yang memenuhi predicate follow-up existing.'],
      snapshotAirport:['network-stations.html?planningCard=airport-bo','Airport / BO','Database Airport yang menjadi sumber angka snapshot.'],
      snapshotPlanningMaster:['service-planning.html#planning-master','Planning Master','Material + Space + System yang menjadi sumber angka snapshot.']
    };
    Object.entries(map).forEach(([id,[href,label,reason]])=>{
      const value=document.getElementById(id), card=value?.closest('.snapshot-kpi');
      if(!card || card.dataset.gxDrilldown==='1') return;
      card.dataset.gxDrilldown='1';
      card.classList.add('gx-drill-card');
      card.setAttribute('role','link');
      card.setAttribute('tabindex','0');
      card.setAttribute('aria-label',label+' — buka detail');
      card.title=reason;
      const go=()=>{ location.href=href; };
      card.addEventListener('click',e=>{ if(e.target.closest('a,button,input,select,textarea'))return; go(); });
      card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();go();} });
    });
  }

  function wireContractFollowupContext(){
    if(ROUTE()!=='lounge-list.html') return;
    const params=new URLSearchParams(location.search);
    if(params.get('planningCard')!=='contract-followup' || typeof window.loungeFiltered!=='function' || typeof window.geContractNeedsFollowup!=='function') return;
    if(window.loungeFiltered.__p36Wrapped) return;
    const base=window.loungeFiltered;
    const wrapped=function(){ return base().filter(window.geContractNeedsFollowup); };
    wrapped.__p36Wrapped=true;
    window.loungeFiltered=wrapped;
    const label=document.querySelector('.lounge-master-view-label-v237 span');
    if(label) label.textContent='Contract Follow-up • filter dari Planning Overview';
  }

  function init(){
    applyPageIdentity();
    enhanceTables();
    applyStandaloneStatuses();
    wirePlanningCards();
    wireContractFollowupContext();
    if(typeof MutationObserver==='function'){
      const main=document.querySelector('body.final-v257 > .shell > .main,.shell > .main,.main');
      if(main && main.dataset.gxP33Observer!=='1'){
        main.dataset.gxP33Observer='1';
        let queued=false;
        const observer=new MutationObserver(records=>{
          const added=records.flatMap(r=>[...r.addedNodes||[]].filter(n=>n.nodeType===1));
          const relevant=added.length || records.some(r=>r.type==='characterData');
          if(!relevant || queued)return;
          queued=true;
          (window.requestAnimationFrame||window.setTimeout)(()=>{
            queued=false;
            added.forEach(node=>{enhanceTables(node);applyStandaloneStatuses(node)});
          },0);
        });
        observer.observe(main,{childList:true,subtree:true,characterData:true});
      }
    }
  }

  window.GX_PAGE_IDENTITY_V35=PAGE_IDENTITY;
  window.GX_SEMANTIC_STATUS_V34=semanticStatus;
  window.GX_P33_P37_INIT=init;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,40));
  else setTimeout(init,40);
})();

/* P40 — Presentation runtime consolidation.
   Presentation/navigation only. Does not change Firebase data, auth, or business state.
   The shared shell is the single owner of navigation; this layer only removes
   conflicting legacy transitions and keeps the sidebar responsive. */
(function(){
  'use strict';
  const STYLE_ID='p40-presentation-runtime';
  const INTERNAL_NAV_SELECTOR='.ge-nav-link, .side a[href], .r8-nav-scroll a[href]';

  function installStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      html body.final-v257 .side{
        display:flex!important;
        flex-direction:column!important;
        min-height:0!important;
        overflow:hidden!important;
        overscroll-behavior:contain!important;
      }
      html body.final-v257 .r8-nav-scroll{
        display:block!important;
        flex:1 1 auto!important;
        min-height:0!important;
        height:auto!important;
        overflow-y:auto!important;
        overflow-x:hidden!important;
        overscroll-behavior:contain!important;
        -webkit-overflow-scrolling:touch!important;
        scrollbar-width:auto!important;
      }
      html body.final-v257 .ge-nav-link,
      html body.final-v257 .ge-nav-link:hover,
      html body.final-v257 .ge-nav-link:focus,
      html body.final-v257 .ge-nav-link.active{
        transform:none!important;
      }
      html body.final-v257 .ge-nav-link,
      html body.final-v257 .ge-nav-link:hover,
      html body.final-v257 .ge-nav-link:focus,
      html body.final-v257 .ge-nav-link.active{
        transition:none!important;
      }
      html body.final-v257 .ge-nav-link.active{
        box-shadow:none!important;
      }
      html body.final-v257 .ge-nav-link .ni,
      html body.final-v257 .ge-nav-link:hover .ni,
      html body.final-v257 .ge-nav-link:focus .ni{
        transform:none!important;
      }
      html body.final-v257.r10-leaving,
      html.r9-leaving body,
      html body.r10-leaving{opacity:1!important;transition:none!important;animation:none!important}
    `;
    (document.head||document.documentElement).appendChild(style);
  }

  function isInternalNav(a){
    if(!a || !a.matches(INTERNAL_NAV_SELECTOR)) return false;
    if(a.target && a.target!=='_self') return false;
    if(a.hasAttribute('download')) return false;
    const raw=(a.getAttribute('href')||'').trim();
    if(!raw || raw.startsWith('#') || /^(?:javascript:|mailto:|tel:|data:|blob:)/i.test(raw)) return false;
    let url; try{url=new URL(raw,location.href)}catch(_){return false}
    return url.origin===location.origin && !(url.pathname===location.pathname && url.search===location.search && url.hash);
  }

  function saveScroll(){
    try{
      const scroller=document.querySelector('.r8-nav-scroll,.side');
      if(scroller)sessionStorage.setItem('GE_P40_NAV_SCROLL',String(scroller.scrollTop||0));
    }catch(_){ }
  }

  function navigate(a){ saveScroll(); window.location.assign(a.href); }

  function installNavigationGuard(){
    if(window.__P40_NAV_GUARD__)return;
    window.__P40_NAV_GUARD__=true;
    window.addEventListener('click',e=>{
      if(e.button!==0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)return;
      const a=e.target?.closest?.(INTERNAL_NAV_SELECTOR);
      if(!isInternalNav(a))return;
      e.preventDefault();
      e.stopImmediatePropagation();
      navigate(a);
    },true);
    window.addEventListener('keydown',e=>{
      if(e.key!=='Enter'&&e.key!==' ')return;
      const a=e.target?.closest?.(INTERNAL_NAV_SELECTOR);
      if(!isInternalNav(a))return;
      e.preventDefault();
      e.stopImmediatePropagation();
      navigate(a);
    },true);
  }

  function installSidebar(){
    const side=document.querySelector('body.final-v257 .side');
    const scroller=side?.querySelector('.r8-nav-scroll')||side;
    if(!scroller || scroller.dataset.p40Ready==='1')return;
    scroller.dataset.p40Ready='1';
    scroller.addEventListener('wheel',e=>{
      if(scroller.scrollHeight<=scroller.clientHeight)return;
      const before=scroller.scrollTop;
      scroller.scrollTop+=e.deltaY;
      if(scroller.scrollTop!==before)e.preventDefault();
    },{passive:false});
    try{
      const saved=Number(sessionStorage.getItem('GE_P40_NAV_SCROLL'));
      if(Number.isFinite(saved)&&saved>0)requestAnimationFrame(()=>{scroller.scrollTop=saved});
    }catch(_){ }
  }

  function init(){
    installStyle();
    installNavigationGuard();
    installSidebar();
    setTimeout(installSidebar,200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
