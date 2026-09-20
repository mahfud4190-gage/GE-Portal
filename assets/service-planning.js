'use strict';
/* Service Planning page engine.
   Owns only the Planning Overview counters; shared shell/auth/data remain external authorities. */
(function(){
  function followUp(l){
    const ds=String(l?.documentStatus||'').trim().toLowerCase();
    const dn=String(l?.documentNumber||'').trim();
    const dt=String(l?.documentType||'').trim();
    const remarks=String(l?.remarks||'').toLowerCase();
    const expired=!!l?.endDate && new Date(l.endDate+'T23:59:59') < new Date();
    const invalidStatus=ds!=='valid';
    const missingDoc=!dn||dn==='-'||!dt||dt==='-';
    const flagged=['belum ada pks','sedang dalam proses','masih dalam proses','belum dilakukan perpanjangan','dokumen tidak valid','belum ada ba','draft pks','proses perpanjangan'].some(k=>remarks.includes(k));
    return expired||invalidStatus||missingDoc||flagged;
  }
  window.renderServicePlanningEdition1=function render(){
    if(!window.GEStore?.get)return;
    const data=window.GEStore.get();
    const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=String(v);};
    const planningMaster=(data.stationMaterials||[]).length+(data.boSpaces||[]).length+(data.airportSystems||[]).length;
    set('planningMaterialCount',(data.stationMaterials||[]).length);
    set('planningLoungeCount',(data.lounges||[]).length);
    set('planningSpaceCount',(data.boSpaces||[]).length);
    set('planningSystemCount',(data.airportSystems||[]).length);
    set('planningStandardCount',(data.skyPriority||[]).length+(data.touchpointStandards||[]).length);
    set('planningDocumentCount',(data.documents||[]).length);
    set('snapshotLounge',(data.lounges||[]).length);
    set('snapshotContractPending',(data.lounges||[]).filter(followUp).length);
    set('snapshotAirport',(data.airports||[]).length);
    set('snapshotPlanningMaster',planningMaster);
  }
})();
