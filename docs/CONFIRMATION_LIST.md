# Confirmation List

Hanya item yang arah bisnisnya belum boleh ditebak yang akan masuk ke file ini.

Untuk Clean Draft R2 belum ada keputusan bisnis baru yang dipaksakan. Mapping berikut masih perlu dikonfirmasi saat modulnya dimigrasikan:

1. User Management — `Tambah User`: apakah wajib sekaligus membuat Firebase Authentication account, atau boleh membuat portal profile dahulu? Rekomendasi teknis: satu transaksi workflow yang membuat Auth + profile dan rollback bila salah satu gagal.
2. Initiative — `Mention`: apakah mention selalu membuat Inbox item + notification, atau hanya Inbox untuk external account?
3. Initiative — `Timeline & Update`: apakah update progress dan milestone menjadi satu collection `projectEvents` atau embedded di initiative? P40 menunjukkan keduanya pernah digunakan; perlu satu canonical model.
4. Lounge/Tenant — apakah `Snack Box` disimpan pada collection `lounges` dengan `type=Snack Box`, atau collection tersendiri? Clean Draft sementara menggunakan `lounges.type` agar tidak menambah collection tanpa konfirmasi.
