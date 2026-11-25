# Situs unduh KasKita

Landing page publik berbahasa Indonesia untuk KasKita: fitur lengkap, lima screenshot asli versi 1.4.3, galeri dengan zoom, panduan pemasangan, FAQ, dan unduhan APK asli. Disajikan di [https://kaskita.haluboy.org](https://kaskita.haluboy.org) lewat Cloudflare Workers (Static Assets). Kode aplikasi Android tetap privat.

## Menjalankan lokal

Gunakan Node.js 20+ dan Python 3.

```sh
npm test
npm run build
npm run dev
```

Buka `http://localhost:8788`.

## APK

APK berada di [GitHub Releases](https://github.com/halluboys/kaskita-web/releases/tag/v1.4.3), bukan di riwayat Git. GitHub menormalkan spasi nama aset menjadi titik (`KasKita.1.4.3.apk`); isi berkas sama persis dengan `KasKita 1.4.3.apk` yang ditandatangani.

`release.json` adalah sumber versi, URL unduh, ukuran, persyaratan Android, dan SHA-256. Kedua tombol unduh dan checksum dibuat dari metadata yang sama. Untuk memeriksa berkas APK lokal:

```sh
npm run verify-apk -- "/path/to/KasKita 1.4.3.apk"
```

Situs tidak membangun ulang atau menandatangani APK dan tidak menyimpan data pembukuan pengguna. Font Plus Jakarta Sans disertakan sesuai lisensi OFL di `public/fonts/OFL.txt`.

## Publikasi ke Cloudflare Workers

Konfigurasi ada di `wrangler.jsonc` dengan static assets (`./dist`) dan custom domain `kaskita.haluboy.org` (Cloudflare otomatis menyiapkan DNS dan sertifikat HTTPS pada zona `haluboy.org`).

```sh
CLOUDFLARE_ACCOUNT_ID=... CLOUDFLARE_API_TOKEN=... npm run deploy
```

Perlu izin token: **Workers Scripts: Edit** (akun) dan **Zone: Read** + **Workers Routes: Edit** (zona `haluboy.org`).
