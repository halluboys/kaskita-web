# Situs unduh KasKita

Landing page publik berbahasa Indonesia untuk KasKita: fitur lengkap, lima screenshot asli versi 1.4.0, galeri dengan zoom, panduan pemasangan, FAQ, dan unduhan APK asli. Kode aplikasi Android tetap privat.

## Menjalankan lokal

Gunakan Node.js 20+ dan Python 3. Tidak ada dependensi npm atau kunci hosting.

```sh
npm test
npm run build
npm run dev
```

Buka `http://localhost:8788`. Semua aset dan metadata memakai URL relatif sehingga situs bekerja di jalur proyek GitHub Pages maupun di domain sendiri.

## APK

APK berada di [GitHub Releases](https://github.com/halluboys/kaskita-web/releases/tag/v1.4.0), bukan di riwayat Git. GitHub menormalkan spasi nama aset menjadi titik (`KasKita.1.4.0.apk`); isi berkas sama persis dengan `KasKita 1.4.0.apk` yang diberikan Bume.

`release.json` adalah sumber versi, URL unduh, ukuran, persyaratan Android, dan SHA-256. Kedua tombol unduh dan checksum dibuat dari metadata yang sama. Untuk memeriksa berkas APK lokal:

```sh
npm run verify-apk -- "/path/to/KasKita 1.4.0.apk"
```

Situs tidak membangun ulang atau menandatangani APK dan tidak menyimpan data pembukuan pengguna. Font Plus Jakarta Sans disertakan sesuai lisensi OFL di `public/fonts/OFL.txt`.

## Publikasi GitHub Pages

Hasil build `dist/` diterbitkan pada branch `gh-pages` (root), terpisah dari sumber. Build tidak membutuhkan APK karena unduhan langsung melalui GitHub Releases. Jangan menaruh APK atau kunci penandatanganan di Git.

Pemilik repo perlu membuka [Settings → Pages](https://github.com/halluboys/kaskita-web/settings/pages), memilih **Deploy from a branch → gh-pages → /(root) → Save**. Integrasi Devin dapat push tetapi tidak mengaktifkan Pages (API mengembalikan HTTP 403).

URL bawaan setelah Pages aktif: `https://halluboys.github.io/kaskita-web/`. Ini bukan klaim situs sudah aktif: pastikan deployment Pages berhasil sebelum membagikannya sebagai situs publik.

Untuk menerbitkan pembaruan dari checkout terpisah branch `gh-pages`:

```sh
npm test
npm run build
git worktree add ../kaskita-pages gh-pages
cp -R dist/. ../kaskita-pages/
git -C ../kaskita-pages add index.html app.js style.css 404.html robots.txt sitemap.xml release.json .nojekyll images fonts
git -C ../kaskita-pages commit -m "Publish updated KasKita website"
git -C ../kaskita-pages push origin gh-pages
```

Jika worktree sudah ada, gunakan direktori itu; jangan buat ulang atau force push. Pengaturan domain membuat file `CNAME` di branch publikasi; pertahankan file itu saat memperbarui situs.

## Domain kaskita.haluboy.org

Sesudah URL bawaan berfungsi, atur **Custom domain → kaskita.haluboy.org → Save** di Settings → Pages terlebih dahulu. Lalu buat DNS berikut di zona `haluboy.org`:

| Kolom | Nilai |
| --- | --- |
| Type | CNAME |
| Name | kaskita |
| Target | halluboys.github.io |
| Proxy | Off / DNS only (awan abu-abu) |
| TTL | Auto |

Target tidak memakai protokol, path, nama repo, atau wildcard. Hapus record A/AAAA/CNAME yang bertabrakan untuk nama `kaskita`. Setelah sertifikat GitHub tersedia, aktifkan **Enforce HTTPS**. URL bawaan GitHub Pages akan mengarah ke domain khusus setelah domain dipasang.

Referensi: [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
