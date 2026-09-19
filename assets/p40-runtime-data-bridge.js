/* P40 Runtime Data Bridge — read-only Firestore initiative hydration.
   Uses the authenticated server endpoint and feeds the existing page-owned
   GE_V2_1_DATA compatibility store. No auth/session bypass and no schema migration. */
(function(){
  'use strict';
  const ROUTE=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const TARGETS=new Set(['index.html','inisiatif.html','calendar.html']);
  if(!TARGETS.has(ROUTE))return;
  let started=false;
  const wait=(fn,tries=100)=>{
    if(started)return;
    const ready=typeof window.gxGetSession==='function' && window.gxGetSession() && window.GXFirebase?.currentUser;
    if(ready){started=true;fn();return;}
    if(tries>0)setTimeout(()=>wait(fn,tries-1),100);
  };
  async function hydrate(){
    try{
      const user=await window.GXFirebase.currentUser();
      if(!user)return;
      const token=await user.getIdToken();
      const res=await fetch('/api/initiatives',{method:'GET',headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
      let payload=null;try{payload=await res.json()}catch(_){payload=null}
      if(!res.ok||!Array.isArray(payload?.initiatives))return;
      const rows=payload.initiatives;
      if(window.GEStore?.get&&window.GEStore?.save){
        const d=window.GEStore.get();
        d.initiatives=rows;
        window.GEStore.save(d);
        if(window.data&&typeof window.data==='object')window.data.initiatives=rows;
      }
      // Existing page engines remain the renderer authority.
      if(ROUTE==='inisiatif.html'){
        if(typeof window.renderInitiatives==='function')window.renderInitiatives();
        else if(typeof window.r9RenderAllInitiatives==='function')window.r9RenderAllInitiatives();
      }
      if(ROUTE==='calendar.html'){
        if(typeof window.geV2532RenderCalendar==='function')window.geV2532RenderCalendar();
        else if(typeof window.geV251RenderCalendar==='function')window.geV251RenderCalendar();
      }
      if(ROUTE==='index.html'&&typeof window.GEDashboard?.render==='function')window.GEDashboard.render();
      document.dispatchEvent(new CustomEvent('gx-firestore-initiatives-ready',{detail:{count:rows.length}}));
    }catch(e){
      console.warn('P40 initiative hydration unavailable; existing page data preserved.',e);
    }
  }
  wait(hydrate);
})();
