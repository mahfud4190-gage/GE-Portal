'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const ROOT=path.join(__dirname,'..');
const code=fs.readFileSync(path.join(ROOT,'assets/store.js'),'utf8');
const calls=[];const cache=new Map();
const sessionStorage={getItem:k=>cache.get(k)||null,setItem:(k,v)=>cache.set(k,v),removeItem:k=>cache.delete(k),key:i=>Array.from(cache.keys())[i],get length(){return cache.size}};
const user={uid:'tester',getIdToken:async()=> 'dummy'};
let readValue=[{id:'A',name:'Original'},{id:'B',name:'Keep'}];
let missingCollection=false;
const window={GX_FIREBASE_CONFIG:{projectId:'ground-experience-portal'},GXFirebase:{currentUser:async()=>user},dispatchEvent:()=>{},addEventListener:()=>{}};
const sandbox={window,console,sessionStorage,CustomEvent:class{},setTimeout,Date,fetch:async(url,opt)=>{
  if(!opt?.method || opt.method==='GET'){
    calls.push({type:'GET',url});
    return {ok:true,status:200,json:async()=>({collections:missingCollection?{}:{airports:readValue}})};
  }
  const body=JSON.parse(opt.body);calls.push({type:'POST',body});
  return {ok:true,status:200,json:async()=>({result:{id:body.id}})};
}};
vm.runInNewContext(code,sandbox);
(async()=>{
  await window.GEStore.hydrate(['airports']);
  assert.equal(calls.filter(x=>x.type==='GET').length,1);
  // Simulate a dangerous empty cache/UI state: no mass DELETE permitted.
  window.GEStore.get().airports=[];
  window.GEStore.save(window.GEStore.get());
  await window.GEStore.flush();
  assert.equal(calls.filter(x=>x.type==='POST').length,0,'Empty array must not DELETE');
  // Fresh GET: cache should avoid repeated network reads during 120s TTL.
  await window.GEStore.hydrate(['airports']);
  assert.equal(calls.filter(x=>x.type==='GET').length,1);
  const d=window.GEStore.get();d.airports[0].name='Updated';window.GEStore.save(d);await window.GEStore.flush();
  assert.equal(calls.filter(x=>x.type==='POST'&&x.body.action==='UPDATE').length,1);
  assert.equal(calls.some(x=>x.type==='POST'&&x.body.action==='DELETE'),false);
  // Server invalid responses must fail rather than masquerading as empty datasets.
  window.GEStore.clearReadCache();missingCollection=true;
  await assert.rejects(window.GEStore.hydrate(['airports']),/Invalid data response/);
  const server1=fs.readFileSync(path.join(ROOT,'netlify/functions/edition1-data.js'),'utf8');
  const server2=fs.readFileSync(path.join(ROOT,'netlify/functions/portal-api.js'),'utf8');
  const storage=fs.readFileSync(path.join(ROOT,'netlify/functions/edition1-file.js'),'utf8');
  assert.match(server1,/DELETE_DISABLED/);assert.doesNotMatch(server1,/await ref\.delete\(/);
  assert.match(server2,/DELETE_DISABLED/);assert.doesNotMatch(server2,/await ref\.delete\(/);
  assert.match(storage,/DELETE_DISABLED/);assert.doesNotMatch(storage,/\.delete\(\{ignoreNotFound/);
  console.log('PASS Firestore safety regression: no DELETE on empty state; GET cache; UPDATE; invalid payload; DELETE blocked on server');
})().catch(e=>{console.error(e);process.exitCode=1});
