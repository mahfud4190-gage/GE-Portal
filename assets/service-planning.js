/* Service Planning page-owned renderer. */
(function(){
'use strict';
window.renderServicePlanningEdition1=function(){
 const d=window.GEStore?.get?window.GEStore.get():{};
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=String(v??0)};
 const planningMaster=(d.stationMaterials||[]).length+(d.boSpaces||[]).length+(d.airportSystems||[]).length;
 set('planningMaterialCount',(d.stationMaterials||[]).length);set('planningLoungeCount',(d.lounges||[]).length);set('planningSpaceCount',(d.boSpaces||[]).length);set('planningSystemCount',(d.airportSystems||[]).length);set('planningStandardCount',(d.skyPriority||[]).length+(d.touchpointStandards||[]).length);set('planningDocumentCount',(d.documents||[]).length);set('snapshotLounge',(d.lounges||[]).length);set('snapshotContractPending',(d.lounges||[]).filter(x=>{const s=String(x.documentStatus||'').toLowerCase();return s.includes('tidak')||s.includes('pending')||s.includes('proses')}).length);set('snapshotAirport',(d.airports||[]).length);set('snapshotPlanningMaster',planningMaster);
};
})();
