/* P40 canonical Edition 1 master-data bridge.
 * Reads authenticated Edition 1 masters through Netlify Functions without changing frozen P38 auth/Firebase clients.
 */
(function(){
'use strict';
const DATA_KEY='GE_V2_1_DATA';
async function currentUser(){
  try{return await window.GXFirebase?.currentUser?.()||null}catch(e){console.warn('[Edition1 bridge] auth state unavailable',e);return null}
}
async function request(path){
  const u=await currentUser();
  if(!u) return null;
  const s=window.GXFirebase?.state;
  const auth=s?.auth;
  if(!auth?.currentUser) return null;
  const token=await auth.currentUser.getIdToken();
  const r=await fetch(path,{headers:{Authorization:`Bearer ${token}`},cache:'no-store'});
  let payload=null;try{payload=await r.json()}catch(_){ }
  if(!r.ok) throw new Error(payload?.message||`Master API failed (${r.status})`);
  return payload;
}
function readStore(){try{return JSON.parse(localStorage.getItem(DATA_KEY)||'{}')}catch(_){return {}}}
function writeStore(d){try{localStorage.setItem(DATA_KEY,JSON.stringify(d))}catch(e){console.warn('[Edition1 bridge] local store write failed',e)}}
function stableId(value){const s=String(value||'');let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return Math.abs(h>>>0)||1}
function normalize(rows){return (Array.isArray(rows)?rows:[]).map(x=>{const firestoreId=String(x?.firestoreId||x?.id||'');const numeric=Number.isFinite(Number(x?.id))&&String(x?.id)!==''?Number(x.id):stableId(firestoreId);return {...x,id:numeric,firestoreId}})}
async function syncEdition1Masters(){
  const d=readStore();
  const result={initiatives:[],lounges:[]};
  try{const p=await request('/api/initiatives');if(p?.initiatives){result.initiatives=normalize(p.initiatives);d.initiatives=result.initiatives}}catch(e){console.warn('[Edition1 bridge] initiatives sync failed',e)}
  try{const p=await request('/api/lounges');if(p?.lounges){result.lounges=normalize(p.lounges);d.lounges=result.lounges}}catch(e){console.warn('[Edition1 bridge] lounges sync failed',e)}
  writeStore(d);
  return result;
}
window.GEEdition1MasterBridge={syncEdition1Masters};
})();
