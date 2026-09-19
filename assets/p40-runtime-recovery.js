/* P40 Runtime Recovery — output authority repair only.
   Keeps the canonical portal-shell.js frozen and repairs its rendered output/lifecycle
   without changing authentication, roles, permissions, Firestore schema, P29 or P39. */
(function(){
  'use strict';
  const route=()=> (location.pathname.split('/').pop()||'index.html').toLowerCase();
  const protectedPage=()=>route()!=='login.html';
  function clearTransient(){
    if(!protectedPage())return;
    document.documentElement.classList.remove('r9-leaving');
    document.body?.classList.remove('r10-leaving');
    if(document.querySelector('body.final-v257 > .shell > .side')){
      document.documentElement.classList.remove('r9-boot');
      document.documentElement.classList.add('r9-ready');
    }
  }
  function repairNavigation(){
    const side=document.querySelector('body.final-v257 > .shell > .side');
    if(!side)return false;
    side.querySelectorAll('a.ge-nav-link').forEach(a=>{
      const label=(a.textContent||'').trim();
      if(label==='Airport Experience Network'){
        a.setAttribute('href','map.html');
        a.title='Airport Experience Network';
      }
    });
    const session=typeof window.gxGetSession==='function'?window.gxGetSession():null;
    if(!session)return true;
    const canCalendar=typeof window.gxHasPermission==='function'?window.gxHasPermission('initiatives'):String(session.role||'')==='Super Admin';
    if(canCalendar&&!side.querySelector('a.ge-nav-link[data-p40-calendar="1"]')){
      const section=[...side.querySelectorAll('.ge-nav-section')].find(x=>(x.textContent||'').trim()==='IMPROVEMENT & PLANNING');
      if(section){
        const link=document.createElement('a');
        link.className='ge-nav-link';
        link.dataset.p40Calendar='1';
        link.href='calendar.html';
        link.title='Calendar & Project Tracking';
        link.innerHTML='<span class="ni" aria-hidden="true"><svg viewBox="0 0 20 20"><rect x="3" y="4.5" width="14" height="12.5" rx="2"></rect><path d="M6 2.5v4M14 2.5v4M3 8h14M6 11h2M10 11h2M6 14h2M10 14h2"></path></svg></span><span>Calendar & Project Tracking</span>';
        section.insertAdjacentElement('afterend',link);
      }
    }
    side.querySelectorAll('a.ge-nav-link[href]').forEach(a=>a.classList.toggle('active',route()===(a.getAttribute('href')||'').split('?')[0].split('#')[0]));
    return true;
  }
  function start(){
    let n=0;
    const timer=setInterval(()=>{
      n++;
      clearTransient();
      repairNavigation();
      if(n>=80)clearInterval(timer);
    },50);
    setTimeout(()=>clearInterval(timer),4500);
  }
  document.addEventListener('click',()=>setTimeout(clearTransient,0),true);
  window.addEventListener('pageshow',start);
  window.addEventListener('pagehide',clearTransient);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
