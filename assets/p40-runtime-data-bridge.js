/* P40 Runtime Data Bridge — read-only hydration from the production portalData contract. */
(function(){
  'use strict';
  const route=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(!['index.html','inisiatif.html','calendar.html'].includes(route))return;
  let done=false,attempts=0;
  const hydrate=async()=>{
    if(done||!window.GXFirebase?.currentUser)return;
    try{
      const user=await window.GXFirebase.currentUser();
      if(!user){if(++attempts<40)setTimeout(hydrate,250);return}
      const token=await user.getIdToken();
      const response=await fetch('/api/planning-data',{method:'GET',headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
      let payload=null;try{payload=await response.json()}catch(_){payload=null}
      if(!response.ok||!Array.isArray(payload?.initiatives))throw new Error(payload?.message||`Planning data failed (${response.status})`);
      const rows=payload.initiatives;
      const projectEvents=Array.isArray(payload.projectEvents)?payload.projectEvents:[];
      done=true;
      if(window.GEStore?.get&&window.GEStore?.save){
        const d=window.GEStore.get();
        d.initiatives=rows;
        if(projectEvents.length){
          const existing=Array.isArray(d.events)?d.events:[];
          const byId=new Map(existing.map(x=>[String(x.id),x]));
          projectEvents.forEach(x=>byId.set(`firebase-project-${x.id}`,{...x,id:`firebase-project-${x.id}`,pic:x.pic||x.picName||'',touchpoint:x.touchpoint||x.tp||'',source:'Firebase Project Event'}));
          d.events=[...byId.values()];
        }
        window.GEStore.save(d)
      }
      if(window.data&&typeof window.data==='object'){
        window.data.initiatives=rows;
        if(projectEvents.length){
          const existing=Array.isArray(window.data.events)?window.data.events:[];
          const byId=new Map(existing.map(x=>[String(x.id),x]));
          projectEvents.forEach(x=>byId.set(`firebase-project-${x.id}`,{...x,id:`firebase-project-${x.id}`,pic:x.pic||x.picName||'',touchpoint:x.touchpoint||x.tp||'',source:'Firebase Project Event'}));
          window.data.events=[...byId.values()];
        }
      }
      if(route==='inisiatif.html')window.renderInitiatives?.();
      if(route==='calendar.html'){
        if(typeof window.geCalRenderV2533==='function')window.geCalRenderV2533();
        else if(typeof window.geV2532RenderCalendar==='function')window.geV2532RenderCalendar();
        else if(typeof window.geV251RenderCalendar==='function')window.geV251RenderCalendar();
      }
    }catch(e){
      console.warn('[P40] Firebase portalData hydration unavailable',e);
      if(++attempts<40)setTimeout(hydrate,250);
    }
  };
  const wait=()=>{if(done)return;if(window.GXFirebase?.currentUser)hydrate();else if(++attempts<40)setTimeout(wait,250)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(wait,100),{once:true});else setTimeout(wait,100);
})();
