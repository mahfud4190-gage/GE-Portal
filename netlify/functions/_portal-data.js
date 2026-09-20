'use strict';

/* Canonical Firestore business-data boundary.
 * Existing production layout shown in the Firestore console is:
 *   portalData/{domain}/records/{recordId}
 * Authentication/access profiles remain top-level in users/{uid}.
 */
const PORTAL_ROOT='portalData';
function records(db,collection){
  const root=db.collection(PORTAL_ROOT);
  if(typeof root.doc!=='function') return db.collection(String(collection));
  const doc=root.doc(String(collection));
  if(typeof doc.collection!=='function') return db.collection(String(collection));
  return doc.collection('records');
}
async function collection(db,collection){
  const name=String(collection);
  if(name==='users') return {ref:db.collection('users'),source:'users'};
  return {ref:records(db,name),source:`${PORTAL_ROOT}/${name}/records`};
}
async function getCollection(db,collection){
  const target=await collection(db,collection);
  const snap=await target.ref.get();
  return {...target,snap};
}
function collectionRef(db,collection){return collection==='users'?db.collection('users'):records(db,collection)}
function auditRef(db){return records(db,'auditLogs')}
function inboxRef(db){return records(db,'inbox')}
module.exports={PORTAL_ROOT,records,collection,getCollection,collectionRef,auditRef,inboxRef};
