const slides = [
  ['beranda', 'Posisi kas,\nlangsung terbaca.', 'Ringkasan keuangan tersusun rapi dalam grid 2 kolom di Beranda: pemasukan tercatat, uang kas nyata, piutang pemberi kerja, denda anggota, pinjaman belum kembali, dan total pengeluaran.', 'Setiap kartu berwarna tegas dan langsung membuka rincian menunya.', 'Tampilan Beranda KasKita 1.4.6', 711, 1500],
  ['kas-uang-masuk', 'Menu Kas lebih ringkas,\ntiga tab utama.', 'Menu Kas kini terbagi jelas menjadi Uang masuk, Uang keluar, dan Belum masuk. Semua pemasukan (upah, denda, lainnya) tampil rapi dengan saringan cepat.', 'Ketuk baris mana saja untuk melihat rincian transaksinya.', 'Tab Uang masuk di menu Kas KasKita 1.4.6', 711, 1500],
  ['kas-belum-masuk', 'Semua yang belum masuk,\ndalam satu tempat.', 'Tab Belum masuk memisahkan Denda anggota, Upah belum dibayar pemberi kerja, dan Pinjaman belum kembali agar tidak tercampur dengan uang kas nyata.', 'Ketuk tiap kategori untuk melihat rincian dan mencatat pelunasan.', 'Tab Belum masuk di menu Kas KasKita 1.4.6', 711, 1500],
  ['rincian-anggota', 'Rincian anggota &\ntagih denda cepat.', 'Pantau hari kerja, denda dibayar, dan sisa denda tiap anggota. Tersedia tombol Tagih denda, Unduh PDF, dan Bagikan ke WhatsApp dalam satu layar.', 'Tab Pekerjaan, Kehadiran, Denda, dan Bayar tersusun rapi per anggota.', 'Rincian anggota dan tombol Tagih denda di KasKita 1.4.6', 711, 1500],
  ['laporan-pdf', 'Laporan per buku.\nSiap dibagikan.', 'Posisi akhir, hitungan uang kas, sisa buku sebelumnya, pembagian dana dengan persentase, dan daftar denda anggota tersusun rapi dalam PDF.', 'Simpan file PDF, lalu bagikan langsung lewat Android.', 'Laporan PDF ringkasan keuangan per buku dari KasKita 1.4.6', 1061, 1500],
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
