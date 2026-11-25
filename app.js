const slides = [
  ['rekap', 'Setiap dana,\njelas sisanya.', 'Lihat saldo lama, dana masuk, dana keluar, dan sisa saldo dalam satu rekap. Lebih mudah menjelaskan posisi kas kepada anggota.', 'Rekap dana juga tercantum dalam laporan PDF organisasi.', 'Rekap saldo dana di KasKita'],
  ['saldo-dana', 'Saldo awal,\nsesuai dana asal.', 'Punya catatan kas sebelum memakai aplikasi? Masukkan saldo lama satu per satu ke dana yang tepat, tanpa menghitungnya sebagai alokasi pemasukan baru.', 'Mulai memakai KasKita tanpa kehilangan konteks pembukuan lama.', 'Form saldo lama per dana di KasKita'],
  ['saldo-persen', 'Bagi saldo lama,\ntanpa hitung ulang.', 'Masukkan total saldo dari luar aplikasi, lalu bagikan sesuai persentase dana yang sudah ditentukan saat membuka buku.', 'Pilih cara yang paling sesuai dengan catatan organisasi Anda.', 'Pembagian saldo lama sesuai persentase di KasKita'],
  ['riwayat', 'Ada koreksi?\nJejaknya tetap ada.', 'Perubahan saldo lama tercatat dalam riwayat. Pengurus bisa menelusuri koreksi yang sudah dilakukan, bukan hanya melihat angka akhirnya.', 'Catatan yang tertata membantu pertanggungjawaban pengurus.', 'Riwayat koreksi saldo lama di KasKita'],
  ['laporan-pdf', 'Siap dibaca.\nSiap dibagikan.', 'Ringkasan keuangan, rekap saldo dana, piutang, pekerjaan, kehadiran, dan pengeluaran disusun menjadi laporan PDF organisasi.', 'Simpan file, lalu bagikan melalui menu berbagi Android.', 'Contoh laporan PDF organisasi dari KasKita'],
];
const galleryImage = document.querySelector('#gallery-img');
const zoom = document.querySelector('#zoom');
const dialog = document.querySelector('#image-dialog');
document.querySelectorAll('[data-slide]').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.slide);
    const [file, title, description, caption, alt] = slides[index];
    document.querySelectorAll('[data-slide]').forEach(tab => { const selected = tab === button; tab.classList.toggle('selected', selected); tab.setAttribute('aria-pressed', String(selected)); });
    galleryImage.src = `./images/${file}.webp`;
    galleryImage.alt = alt;
    document.querySelector('#slide-title').textContent = title;
    document.querySelector('#slide-number').textContent = `0${index + 1} / 05`;
    document.querySelector('#slide-description').textContent = description;
    document.querySelector('#slide-caption').textContent = caption;
    zoom.setAttribute('aria-label', `Perbesar: ${alt}`);
  });
});
zoom.addEventListener('click', () => { const img = dialog.querySelector('img'); img.src = galleryImage.src; img.alt = galleryImage.alt; dialog.showModal(); });
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
document.querySelector('#copy-hash').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(document.querySelector('.checksum code').textContent); document.querySelector('#copy-status').textContent = 'Checksum disalin.'; }
  catch { document.querySelector('#copy-status').textContent = 'Pilih dan salin kode di atas secara manual.'; }
});
fetch('./release.json').then(response => response.json()).then(release => {
  document.querySelectorAll('[data-size]').forEach(element => { element.textContent = `${(release.bytes / 1048576).toLocaleString('id-ID', { maximumFractionDigits: 1 })} MB`; });
}).catch(() => {});
