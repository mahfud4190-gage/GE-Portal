# Audit P40 → Clean Rebuild Decision

## Fakta P40 referensi
- 234 files total.
- 74 root HTML pages.
- 73 direct asset files.
- 17 Netlify function files.
- `edition1-business-runtime.js` ~623 KB; `app.js` ~562 KB; `portal.css` ~446 KB.
- Terdapat dua keluarga UI (legacy + Edition1), plus patch/compatibility scripts. Ini menjelaskan old-theme flash dan tingginya maintenance per HTML.

## Keputusan rebuild
1. Tidak mempertahankan 74 HTML.
2. Tidak mempertahankan `e1-*` HTML sebagai canonical pages.
3. Tidak menggunakan legacy redirect sebagai compatibility layer.
4. Satu `index.html`, satu shell, satu theme, satu router.
5. P40 hanya menjadi function/data reference.
6. Firebase collections tetap dipakai agar data existing tidak perlu dipindahkan.
7. Modal dibuat sebagai fixed viewport overlay dengan backdrop click, Escape, Cancel dan Submit state.
8. CSV template dibuat dinamis; tidak perlu file template per page.

## Function map yang dipertahankan sebagai target
- Initiative: journey filter, search, touchpoint/status filtering target, add/edit/delete, target/realisasi/PIC/remark, timeline/milestone target, CSV export, CSV import + template.
- Planning Workspace: direct modules; Lounge/Tenant tidak boleh membuka legacy page.
- Lounge/Tenant: master type Lounge/Tenant/Snack Box, station/status/PIC, CRUD, CSV import/export.
- User Management: profile/role/access/scope/status; Auth account creation/reset masih target tahap berikutnya.
- Firebase: users, initiatives, lounges, loungeVisitors, documents, airports, projectEvents, dan collection P40 lain tetap menjadi data source.

## Yang belum dianggap selesai
Clean Draft R2 adalah fondasi baru, bukan klaim seluruh 2.184 interaction P40 sudah dimigrasikan. Setiap fungsi yang belum dipindahkan harus ditambahkan sebagai module/function baru, bukan dengan menghidupkan HTML/JS lama.
