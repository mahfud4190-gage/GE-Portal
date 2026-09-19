'use strict';

const { bad, ok, bearer, firebase, safeProfile } = require('./_firebase');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') return bad(405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
  try {
    const token = bearer(event);
    if (!token) return bad(401, 'AUTH_REQUIRED', 'Authentication required.');
    const { auth, db } = firebase();
    const decoded = await auth.verifyIdToken(token, true);
    const profileSnap = await db.collection('users').doc(decoded.uid).get();
    if (!profileSnap.exists) return bad(403, 'PROFILE_NOT_FOUND', 'User profile tidak ditemukan.');
    const profile = safeProfile({ id: profileSnap.id, ...profileSnap.data() });
    if (String(profile.status || 'Active').trim().toLowerCase() === 'inactive') return bad(403, 'ACCOUNT_INACTIVE', 'Akun tidak aktif.');

    const snap = await db.collection('initiatives').get();
    let initiatives = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Preserve the existing external-user sharing contract. Internal authorized
    // roles retain the existing broad initiative workspace behavior.
    const role = String(profile.role || '');
    if (['External User', 'External', 'Collaborator'].includes(role)) {
      const uid = String(decoded.uid);
      initiatives = initiatives.filter(x => {
        const shared = Array.isArray(x.sharedWithUserIds) && x.sharedWithUserIds.map(String).includes(uid);
        const mentioned = Array.isArray(x.mentionedUserIds) && x.mentionedUserIds.map(String).includes(uid);
        return shared || mentioned;
      });
    } else if (role === 'Branch Office' && Array.isArray(profile.airports) && profile.airports.length) {
      const allowed = new Set(profile.airports.map(x => String(x).trim().toUpperCase()).filter(Boolean));
      initiatives = initiatives.filter(x => {
        const airport = String(x.airport || x.station || '').trim().toUpperCase();
        return !airport || allowed.has(airport);
      });
    }

    return ok({ initiatives, meta: { source: 'Firestore', collection: 'initiatives' } });
  } catch (e) {
    const status = Number(e?.code) === 7 ? 403 : 500;
    if (status === 403) return bad(403, 'FORBIDDEN', 'Initiative data tidak dapat diakses oleh akun ini.');
    return bad(500, 'INITIATIVES_UNAVAILABLE', 'Initiative data belum dapat dimuat dari Firestore.');
  }
};
