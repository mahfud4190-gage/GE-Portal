# Ground Experience Portal — R3 Functional Clean

Fokus R3 hanya satu: mempertahankan fungsi/data/design product P40 sambil menghapus jalur runtime lama yang saling menimpa.

## Firestore contract yang dipakai
- User profile: `users/{uid}`
- Business data: `portalData/{group}/records/{recordId}`
- Metadata: `portalMetadata/...` (disiapkan untuk modul metadata berikutnya)

R3 TIDAK membaca business collection dari root Firestore. Ini disesuaikan dengan database aktual dan rules yang diberikan.

## Runtime
- Satu `index.html`
- Satu router/shell, tidak berpindah ke HTML lama
- Tidak ada legacy theme fallback
- Modal global fixed/centered
- Module pages membaca group Firestore yang sesuai

## Deploy
Gunakan branch testing. Netlify Functions membutuhkan Firebase service account environment variables yang sama dengan deployment sebelumnya.
