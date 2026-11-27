# DompetKeluarga — Situs Anggaran Rumah Tangga

[![Make the best household budget site](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/zenganteng0987/dompet-keluarga/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/zenganteng0987/dompet-keluarga/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

DompetKeluarga adalah situs anggaran rumah tangga untuk keluarga Rahma & Budi di Bandung. Pemasukan Rp12.500.000 per bulan (gaji Budi Rp9.500.000 + usaha kue Rahma Rp3.000.000), dibagi ke 9 kategori anggaran November 2026. Sampai 26 November, terpakai Rp11.135.000 dan tersisa Rp1.365.000.

Lima halaman lewat hash-route: **Beranda** (ringkasan + grafik + transaksi terakhir), **Anggaran** (rincian dan progres 9 kategori), **Transaksi** (33 transaksi 1–26 Nov, tambah transaksi + filter kategori), **Tagihan** (10 tagihan dengan status lunas/belum yang bisa diubah), dan **Laporan** (pemasukan vs pengeluaran + kesimpulan bulan ini).

Situs statis tanpa build step dan tanpa request network: buka `app/index.html` lewat server statis apa pun. Semua angka koheren di semua halaman — jumlah transaksi per kategori sama dengan realisasi kategori itu.
