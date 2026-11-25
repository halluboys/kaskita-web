const slides = [
  ['beranda', 'Posisi kas,\nlangsung terbaca.', 'Ringkasan keuangan tampil jelas di Beranda: pemasukan tercatat, uang kas nyata, piutang pemberi kerja, piutang anggota, dan pinjaman belum kembali.', 'Setiap kartu langsung membuka rincian menunya.', 'Tampilan Beranda KasKita 1.4.3'],
  ['kas-pemasukan', 'Semua pemasukan,\ndalam satu daftar.', 'Upah macul, pembayaran denda, dan pemasukan lain tampil rapi di menu Kas dengan kartu berwarna serta saringan Semua, Upah, Denda, dan Lainnya.', 'Ketuk baris mana saja untuk melihat rincian transaksinya.', 'Daftar pemasukan gabungan di menu Kas KasKita'],
  ['pinjaman', 'Pinjaman tercatat,\nbukan pengeluaran.', 'Catat pinjaman dari dana kas tertentu tanpa mengacaukan angka pengeluaran. Cicilan otomatis mengembalikan uang ke dana asalnya.', 'Pinjaman belum lunas terbawa rapi ke buku berikutnya.', 'Form catat pinjaman di KasKita'],
  ['piutang', 'Tiga jenis piutang,\ntidak tercampur.', 'Pisahkan tagihan upah borongan, denda anggota, dan pinjaman belum kembali agar pengurus tahu persis mana uang di tangan dan mana yang masih di luar.', 'Status pembayaran piutang bisa dipantau dan dilunasi per catatan.', 'Daftar piutang upah, denda, dan pinjaman di KasKita'],
  ['laporan-pdf', 'Laporan per buku.\nSiap dibagikan.', 'Posisi akhir, hitungan uang kas, sisa buku sebelumnya, pembagian dana dengan persentase, dan rincian transaksi tersusun rapi dalam PDF.', 'Simpan file, lalu bagikan langsung lewat Android.', 'Contoh laporan PDF per buku dari KasKita'],
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
