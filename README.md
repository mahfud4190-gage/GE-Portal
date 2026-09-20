# Ground Experience Portal — CLEAN DRAFT R2

Ini **bukan turunan runtime P40**. P40 hanya dipakai sebagai referensi fungsi/data. Tidak ada `e1-*.html`, legacy page, old theme, patch chain, override chain, atau redirect ke HTML lama.

## Arsitektur
- `index.html` — satu entry point.
- `assets/app.js` — shell + hash router SPA.
- `assets/modules.js` — page modules/functionality.
- `assets/api.js` — session + API client.
- `assets/ui.js` — modal, toast, CSV.
- `assets/app.css` — satu theme.
- `netlify/functions/*` — Firebase Auth + Firestore API baru.

## Dampak
Transisi page terjadi di dalam SPA (`#initiatives`, `#planning`, `#lounge`), sehingga browser tidak pernah merender old HTML/theme di antara page.

## Firebase
Menggunakan project Firebase yang sama dan collection names yang ditemukan dari P40. Netlify membutuhkan credential Firebase Admin yang sama seperti deployment sebelumnya.

## Status
Draft foundation untuk branch testing. Fungsi inti yang sudah dibuat: login email/username, dashboard Firebase counts, initiatives filter/search/add/edit/delete/export/import CSV+template, Lounge/Tenant CRUD/import/export, Planning Workspace direct navigation, user profile management, generic Firebase views, proper modal/backdrop/Esc/cancel.
