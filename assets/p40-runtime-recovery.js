/* P40 Runtime Recovery — FINAL PRESENTATION AUTHORITY v40.3
   Presentation/runtime recovery only. No Firebase writes, no auth bypass, no role fabrication. */
(function(){
  'use strict';
  const route=()=> (location.pathname.split('/').pop()||'index.html').toLowerCase();
  const protectedPage=()=>route()!=='login.html';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pov=s=>{const r=String(s?.role||'').trim().toLowerCase().replace(/[\s_-]+/g,' ');if(r==='super admin'||r==='superadmin')return'superadmin';if(r==='management')return'management';if(['ge team','ground experience team','head office','headoffice','staff'].includes(r))return'ge-team';if(['branch office','branchoffice','bo'].includes(r))return'branch';return'unresolved'};
  const icon=x=>({home:'⌂',cx:'◎',network:'✈',station:'⌾',initiative:'⚙',opportunity:'✧',planning:'≡',workspace:'◇',document:'▤',calendar:'▦',budget:'▣',readiness:'✓',data:'⬡',user:'♙',history:'◷',support:'☎',standard:'≡'}[x]||'≡');
  const item=(href,label,key)=>`<a class="ge-nav-link ${route()===href?'active':''}" href="${href}" title="${esc(label)}"><span class="ni" aria-hidden="true">${icon(key)}</span><span>${esc(label)}</span></a>`;
  const group=(title,items)=>`<div class="ge-nav-section">${esc(title)}</div>${items.join('')}`;
  function navFor(s){
    const p=pov(s);
    const planning=[item('service-planning.html','Planning Overview','planning'),item('planning-workspace.html','Planning Workspace','workspace'),item('planning-documents.html','Planning Documents','document')];
    const support=group('SUPPORT',[item('berita.html','Berita & Informasi','document'),item('kontak.html','Contact Support','support')]);
    if(p==='branch')return [item('index.html','Branch Office Dashboard','home'),group('MY STATION',[item('station-360.html','Station Profile / 360','station'),item('readiness.html','Readiness Assessment','readiness'),item('service-capability.html','Capability & Standards','station'),item('standar.html','Service Standard','standard')]),group('EXPERIENCE & INSIGHT',[item('customer-experience.html','Customer Experience','cx'),item('map.html','Airport Experience Network','network')]),group('TASKS & ACTIONS',[item('improvement-intake.html','Improvement Opportunity','opportunity'),item('inisiatif.html','Initiative & Improvement','initiative'),item('calendar.html','Calendar & Project Tracking','calendar')]),group('IMPROVEMENT & PLANNING',planning),support].join('');
    if(p==='ge-team')return [item('index.html','GE Team Dashboard','home'),group('EXPERIENCE & INSIGHT',[item('customer-experience.html','Customer Experience','cx'),item('map.html','Airport Experience Network','network'),item('station-360.html','Station Profile / 360','station')]),group('READINESS & STANDARDS',[item('readiness.html','Readiness Assessment','readiness'),item('service-capability.html','Capability & Standards','station'),item('standar.html','Service Standard','standard')]),group('IMPROVEMENT & PLANNING',[item('improvement-intake.html','Improvement Opportunity','opportunity'),item('inisiatif.html','Initiative & Improvement','initiative'),item('calendar.html','Calendar & Project Tracking','calendar'),...planning]),group('DATA',[item('data.html','Data Management','data')]),support].join('');
    if(p==='management')return [item('index.html','Management Dashboard','home'),group('EXPERIENCE & INSIGHT',[item('customer-experience.html','Customer Experience','cx'),item('map.html','Airport Experience Network','network')]),group('IMPROVEMENT & PLANNING',[item('inisiatif.html','Initiative & Improvement','initiative'),item('calendar.html','Calendar & Project Tracking','calendar'),...planning]),support].join('');
    if(p==='superadmin')return [item('index.html','Super Admin / System Dashboard','home'),group('EXPERIENCE & INSIGHT',[item('customer-experience.html','Customer Experience','cx'),item('map.html','Airport Experience Network','network'),item('station-360.html','Station Profile / 360','station')]),group('READINESS & STANDARDS',[item('readiness.html','Readiness Assessment','readiness'),item('service-capability.html','Capability & Standards','station'),item('standar.html','Service Standard','standard')]),group('IMPROVEMENT & PLANNING',[item('improvement-intake.html','Improvement Opportunity','opportunity'),item('inisiatif.html','Initiative & Improvement','initiative'),item('calendar.html','Calendar & Project Tracking','calendar'),...planning]),group('DATA & ADMINISTRATION',[item('data.html','Data Management','data'),item('master-data.html','Master Data','data'),item('admin.html','User & Access','user'),item('portal-management.html','Portal Management','initiative'),item('audit-log.html','Audit Log','history')]),support].join('');
    return group('SUPPORT',[item('index.html','Dashboard','home'),item('berita.html','Berita & Informasi','document'),item('kontak.html','Contact Support','support')]);
  }
  function context(s){const p=pov(s);return({superadmin:'Super Admin / System Dashboard','ge-team':'Ground Experience Team / Head Office Dashboard',management:'Management Dashboard',branch:'Branch Office Dashboard',unresolved:'Portal'})[p]||'Portal'}
  function buildShell(){
    if(!protectedPage())return false;
    const top=document.querySelector('body > .top'), shell=document.querySelector('body > .shell'), side=shell?.querySelector(':scope > .side'), main=shell?.querySelector(':scope > .main');
    if(!top||!shell||!side||!main)return false;
    const s=typeof window.gxGetSession==='function'?(window.gxGetSession()||{}):{};
    document.body.classList.add('final-v257','final-shell-r5');
    const initials=String(s.name||s.username||'GE').split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'GE';
    const role=pov(s), roleLabel=role==='branch'?(s.unit||'Branch Office'):role==='ge-team'?'Ground Experience Team':(s.role||'User');
    top.innerHTML=`<button id="mobileNavTriggerV233" class="mobile-nav-trigger-v233 ge-iconbtn" type="button" aria-label="Menu">☰</button><div class="ge-brand-logos"><img class="garuda" src="assets/garuda-horizontal-white.png" alt="Garuda Indonesia"><img class="danantara" src="assets/danantara-white-user.png" alt="Danantara Indonesia"></div><div class="ge-title"><strong>GROUND EXPERIENCE PORTAL</strong><span>${esc(context(s))}</span></div><div class="ge-session"><label class="filter"><span>Period</span><select id="gePeriodSelect" aria-label="Period"><option>2026</option></select></label><button class="ge-top-action ge-notify" id="geNotifyBtn" type="button" aria-label="Notifications">●</button><a class="ge-top-action ge-help" href="kontak.html" aria-label="Help">?</a><button class="ge-user-menu" id="geUserMenuBtn" type="button"><span class="avatar">${esc(initials)}</span><span class="who"><b>${esc(s.name||s.username||'User')}</b><span>${esc(roleLabel)}</span></span></button></div>`;
    side.innerHTML=navFor(s);
    if(typeof window.gxApplyNavigation==='function')try{window.gxApplyNavigation()}catch(_){ }
    side.querySelectorAll('a.ge-nav-link').forEach(a=>a.classList.toggle('active',route()===(a.getAttribute('href')||'').split('?')[0].split('#')[0]));
    document.documentElement.classList.remove('r9-boot','r9-leaving');document.documentElement.classList.add('r9-ready');document.body.classList.remove('r10-leaving');
    document.getElementById('mobileNavTriggerV233')?.addEventListener('click',()=>document.body.classList.toggle('nav-open'));
    return true;
  }
  function fallbackInitiativeRenderer(){
    if(route()!=='inisiatif.html'||typeof window.renderInitiatives==='function')return;
    window.renderInitiatives=function(){const box=document.getElementById('initRows');if(!box)return;const rows=(window.GEStore?.get?.()?.initiatives||window.data?.initiatives||[]);box.innerHTML=rows.length?rows.map((x,i)=>`<article class="initiative-card-final"><div class="ic-head"><div><div class="ic-no">${String(i+1).padStart(2,'0')}</div></div><div><span class="ic-pill">${esc(x.achievement||'Data')}</span><div class="ic-title">${esc(x.name||'Untitled Initiative')}</div></div></div><div class="ic-meta"><div><small>PIC</small><b>${esc(x.pic||'-')}</b></div><div><small>Due Date</small><b>${esc(x.dueDate||'-')}</b></div><div><small>Touch Point</small><b>${esc(x.tp||'-')}</b></div><div><small>Station</small><b>${esc(x.airport||'ALL')}</b></div><div><small>Target</small><b>${Number(x.plan||0)}%</b></div><div><small>Realisasi</small><b>${Number(x.real||0)}%</b></div></div></article>`).join(''):'<div class="ge-card" style="padding:20px">Belum ada inisiatif pada data yang dapat diakses.</div>'};
    window.renderInitiatives();
  }
  function clearTransient(){if(!protectedPage())return;document.documentElement.classList.remove('r9-leaving');document.body?.classList.remove('r10-leaving')}
  function start(){
    let tries=0;
    const run=()=>{
      tries++;
      clearTransient();
      const s=typeof window.gxGetSession==='function'?(window.gxGetSession()||{}):{};
      if(typeof window.shell==='function'){
        try{window.shell()}catch(e){console.warn('[P40] canonical shell retry failed',e)}
        const side=document.querySelector('body > .shell > .side');
        if(side){
          side.innerHTML=navFor(s);
          if(typeof window.gxApplyNavigation==='function')try{window.gxApplyNavigation()}catch(_){ }
          side.querySelectorAll('a.ge-nav-link').forEach(a=>a.classList.toggle('active',route()===(a.getAttribute('href')||'').split('?')[0].split('#')[0]));
        }
      }else{
        buildShell();
      }
      document.documentElement.classList.remove('r9-boot','r9-leaving');
      document.documentElement.classList.add('r9-ready');
      document.body.classList.remove('r10-leaving');
      fallbackInitiativeRenderer();
      if(tries<40)setTimeout(run,250);
    };
    run();
  }
  document.addEventListener('click',()=>setTimeout(clearTransient,0),true);
  window.addEventListener('pageshow',start);window.addEventListener('pagehide',clearTransient);
  // Let the canonical shell finish its DOMContentLoaded bootstrap first, then
  // re-apply the final navigation/presentation authority and keep retrying while
  // Firebase authentication resolves.
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(start,50),{once:true});else setTimeout(start,50);
})();
