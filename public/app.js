const slides = [
  ['beranda', 'Posisi kas,\nlangsung terbaca.', 'Ringkasan keuangan tersusun rapi dalam grid 2 kolom di Beranda: pemasukan tercatat, uang kas nyata, piutang pemberi kerja, denda anggota, pinjaman belum kembali, dan total pengeluaran.', 'Setiap kartu berwarna tegas dan langsung membuka rincian menunya.', 'Tampilan Beranda KasKita 1.4.4', 705, 1500],
  ['kas-pemasukan', 'Semua pemasukan,\ndalam satu daftar.', 'Upah macul, pembayaran denda, dan pemasukan lain tampil rapi di menu Kas (tersedia tema terang dan gelap) dengan warna tegas serta saringan Semua, Upah, Denda, dan Lainnya.', 'Ketuk baris mana saja untuk melihat rincian transaksinya.', 'Daftar pemasukan gabungan di menu Kas KasKita (tema gelap)', 711, 1500],
  ['denda-anggota', 'Denda anggota,\njelas rinciannya.', 'Setiap catatan denda menampilkan hitungan per hari hadir beserta total denda, jumlah yang sudah dibayar, dan sisa yang belum masuk kas.', 'Status pembayaran denda, upah, dan pinjaman dipantau terpisah.', 'Daftar denda anggota di KasKita 1.4.4', 705, 1500],
  ['laporan-pdf', 'Ringkasan PDF,\nmudah dipahami.', 'Posisi akhir, hitungan uang kas, sisa buku sebelumnya, piutang bawaan, dan pemasukan periode tersusun dalam satu laporan per buku.', 'Simpan file PDF, lalu bagikan langsung lewat Android.', 'Laporan PDF ringkasan keuangan per buku dari KasKita 1.4.4', 1061, 1500],
  ['laporan-pdf-dana', 'Pembagian dana &\ndenda lengkap.', 'Tabel pembagian dana lengkap dengan persentase, saldo akhir per dana, serta daftar denda anggota dan piutang siap dipertanggungjawabkan.', 'Semua angka terpisah jelas antara uang kas nyata dan piutang.', 'Laporan PDF pembagian dana dan denda anggota dari KasKita 1.4.4', 1061, 1500],
];
const galleryImage = document.querySelector('#gallery-img');
const zoom = document.querySelector('#zoom');
const dialog = document.querySelector('#image-dialog');
document.querySelectorAll('[data-slide]').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.slide);
    const [file, title, description, caption, alt, width, height] = slides[index];
    document.querySelectorAll('[data-slide]').forEach(tab => { const selected = tab === button; tab.classList.toggle('selected', selected); tab.setAttribute('aria-pressed', String(selected)); });
    galleryImage.src = `./images/${file}.webp`;
    galleryImage.width = width;
    galleryImage.height = height;
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
