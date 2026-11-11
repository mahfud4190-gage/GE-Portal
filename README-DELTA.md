# GE Portal — Delta gabungan: Firebase Safety + CSS Cascade Refactor (konservatif)

**Baseline wajib:** `GE-Portal-Clean-Version.zip` (asli), bukan ZIP delta terdahulu.

## Apa yang berubah

- **Firebase Safety:** mempertahankan perlindungan dari paket ONE-DELTA: cache read-only, pencegahan DELETE otomatis dari GEStore.save, pemutusan write dari bridge hydration, endpoint DELETE diblokir.
- **CSS:** konsolidasi sumber visual pada `assets/portal.css`, 74 HTML menggunakan stylesheet kanonis, referensi stylesheet tidak ditemukan dibersihkan, dan **aturan yang pasti ditimpa pada selector/properti identik di top-level CSS dibuang**.
- `CSS-CASCADE-AUDIT.json` mencatat jumlah dan contoh penghapusan deklarasi secara terukur.

## Cara menerapkan (sekali saja)

1. Ambil baseline Clean Version asli. **Jangan gabung dengan ZIP delta lama.**
2. Ekstrak seluruh isi delta ini pada root repository, pertahankan folder, timpa file bernama sama.
3. Baca `DELETE_FILES.txt`; hapus file lama yang ditandai setelah inspeksi deploy preview.
4. Jalankan `node tests/firestore-safety-regression.cjs` dan uji preview terhadap Firebase **test/staging**, terutama akses, CREATE/UPDATE, GET, cache hit, dan penolakan DELETE.
5. Verifikasi desktop, tablet, mobile, modal, sidebar, dashboard, state hover dan semua halaman E1. Jangan promote sebelum visual regression dan build lulus.

## Batasan penting

- Pengurangan hanya dilakukan pada deklarasi yang terbukti ditimpa oleh deklarasi berikutnya dengan **selector/properti identik dan prioritas sebanding di top-level stylesheet**.
- `!important` yang masih ada **bukan berarti semuanya diperlukan**; penghapusan lintas selector, media/container, inline dan kondisi interaktif butuh pengukuran computed style dan pengujian browser komprehensif. Tidak diklaim tuntas.
- Patch keamanan belum terbukti end-to-end pada Firebase produksi dan tidak memulihkan record yang terhapus.
- DELETE sementara dinonaktifkan, termasuk operasi hapus sah.
- Jangan deploy langsung ke produksi; risiko API writer lainnya dan UI masih perlu pemeriksaan di lingkungan deploy.
- Tidak ada perubahan otomatis ke GitHub, Netlify, atau Firebase.
