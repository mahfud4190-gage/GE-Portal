'use strict';

/* P40 planning read bridge.
   IMPORTANT: the production Firestore contract uses portalData / portalMetadata.
   This function is read-only and intentionally does not expose top-level guessed
   collections such as `initiatives` or `projectEvents`.
*/
const { bad, ok, bearer, firebase } = require('./_firebase');

const READ_ROLES = new Set([
  'Super Admin', 'Admin', 'Management', 'Head Office', 'GE Team', 'Branch Office',
  'External User', 'External', 'Collaborator'
]);

function active(actor) {
  return READ_ROLES.has(String(actor?.role || '').trim()) &&
    String(actor?.status || 'Active').trim().toLowerCase() === 'active';
}

function external(actor) {
  return ['external user', 'external', 'collaborator'].includes(
    String(actor?.role || '').trim().toLowerCase()
  );
}

function jsonSafe(value) {
  if (value == null) return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value?.toDate === 'function') {
    try { return value.toDate().toISOString(); } catch (_) {}
  }
  if (Array.isArray(value)) return value.map(jsonSafe);
  if (typeof value === 'object') {
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = jsonSafe(item);
    return out;
  }
  return value;
}

async function actorFromToken(event, db, auth) {
  const token = bearer(event);
  if (!token) throw Object.assign(new Error('Authentication required.'), { statusCode: 401, code: 'AUTH_REQUIRED' });
  let decoded;
  try {
    decoded = await auth.verifyIdToken(token, true);
  } catch (_) {
    throw Object.assign(new Error('Invalid or expired authentication token.'), { statusCode: 401, code: 'AUTH_INVALID' });
  }
  const snap = await db.collection('users').doc(decoded.uid).get();
  if (!snap.exists) throw Object.assign(new Error('User profile not found.'), { statusCode: 403, code: 'PROFILE_NOT_FOUND' });
  const actor = { id: decoded.uid, ...snap.data() };
  if (!active(actor)) throw Object.assign(new Error('Insufficient permission.'), { statusCode: 403, code: 'FORBIDDEN' });
  return actor;
}

async function readTree(ref, depth = 0, maxDepth = 4) {
  const snap = await ref.get();
  const node = { id: snap.id, data: jsonSafe(snap.data() || {}), children: {} };
  if (depth >= maxDepth) return node;
  const collections = await ref.listCollections();
  for (const col of collections) {
    const childSnap = await col.get();
    node.children[col.id] = [];
    for (const doc of childSnap.docs) {
      const childRef = col.doc(doc.id);
      node.children[col.id].push(await readTree(childRef, depth + 1, maxDepth));
    }
  }
  return node;
}

async function readPortalData(db) {
  const root = db.collection('portalData');
  const snap = await root.get();
  const groups = [];
  for (const doc of snap.docs) groups.push(await readTree(root.doc(doc.id)));
  return groups;
}

function pushUnique(out, row) {
  if (!row || typeof row !== 'object') return;
  const x = { ...(row.id != null ? { id: row.id } : {}), ...row };
  const key = String(x.id ?? x.initiativeId ?? x.eventId ?? JSON.stringify(x));
  if (!out.some(v => String(v.id ?? v.initiativeId ?? v.eventId ?? '') === key)) out.push(x);
}

function collectByNames(node, wanted, out) {
  if (!node || typeof node !== 'object') return;
  const names = new Set(wanted.map(x => String(x).toLowerCase()));
  const visit = (value, key = '') => {
    if (Array.isArray(value)) {
      if (names.has(String(key).toLowerCase())) value.forEach(v => pushUnique(out, jsonSafe(v)));
      value.forEach(v => visit(v, key));
      return;
    }
    if (!value || typeof value !== 'object') return;
    for (const [k, v] of Object.entries(value)) visit(v, k);
  };
  visit(node, node.id || '');
  for (const [collectionName, docs] of Object.entries(node.children || {})) {
    if (names.has(collectionName.toLowerCase())) {
      for (const doc of docs || []) pushUnique(out, { id: doc.id, ...(doc.data || {}) });
    }
    for (const doc of docs || []) collectByNames(doc, wanted, out);
  }
}

function collectNamedDocuments(groups, names) {
  const out = [];
  for (const group of groups) collectByNames(group, names, out);
  return out;
}

function filterExternal(rows, actor) {
  if (!external(actor)) return rows;
  return rows.filter(row => {
    const shared = Array.isArray(row.sharedWithUserIds) && row.sharedWithUserIds.map(String).includes(String(actor.id));
    const mentioned = Array.isArray(row.mentionedUserIds) && row.mentionedUserIds.map(String).includes(String(actor.id));
    const owner = String(row.ownerId || row.createdBy || row.picUserId || '') === String(actor.id);
    return shared || mentioned || owner;
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return bad(405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
  try {
    const { auth, db } = firebase();
    const actor = await actorFromToken(event, db, auth);
    const groups = await readPortalData(db);
    const initiatives = filterExternal(
      collectNamedDocuments(groups, ['initiatives', 'initiative']),
      actor
    );
    const projectEvents = filterExternal(
      collectNamedDocuments(groups, ['projectEvents', 'projectEvent', 'calendarEvents', 'calendarEvent', 'events']),
      actor
    );
    return ok({
      initiatives,
      projectEvents,
      portalData: groups,
      meta: { source: 'Firestore portalData', readOnly: true, actorRole: actor.role || '' }
    });
  } catch (e) {
    console.error('planning-data failed:', e.message);
    return bad(e.statusCode || 500, e.code || 'PLANNING_DATA_FAILED', e.statusCode ? e.message : 'Planning data request gagal.');
  }
};
