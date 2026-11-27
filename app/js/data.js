// Data keluarga Rahma & Budi, Bandung — November 2026.
// Semua angka di sini adalah satu-satunya sumber kebenaran untuk situs ini:
// anggaran, realisasi, transaksi, tagihan, dan pemasukan harus saling cocok.
export const FAMILY = {
  name: "Keluarga Rahma & Budi",
  city: "Bandung",
  month: "November 2026",
  monthShort: "Nov 2026",
};

export const INCOME = [
  { id: "gaji", label: "Gaji Budi", amount: 9500000, date: "2026-11-01", note: "Gajian bulanan" },
  { id: "usaha1", label: "Usaha Rahma — kue kering", amount: 1500000, date: "2026-11-10", note: "Pesanan minggu ke-2" },
  { id: "usaha2", label: "Usaha Rahma — kue kering", amount: 1500000, date: "2026-11-24", note: "Pesanan minggu ke-4" },
];

export const TOTAL_INCOME = 12500000;

// Anggaran November 2026 — total tepat Rp12.500.000.
export const BUDGETS = [
  { id: "harian", label: "Belanja Harian", budget: 3200000, spent: 2875000, color: "#0e7a5f" },
  { id: "transport", label: "Transport", budget: 1200000, spent: 1040000, color: "#2a9d8f" },
  { id: "tagihan", label: "Tagihan & Utilitas", budget: 1850000, spent: 1850000, color: "#457b9d" },
  { id: "pendidikan", label: "Pendidikan Anak", budget: 1500000, spent: 1500000, color: "#6a4c93" },
  { id: "kesehatan", label: "Kesehatan", budget: 600000, spent: 320000, color: "#e07a5f" },
  { id: "hiburan", label: "Hiburan & Makan di Luar", budget: 800000, spent: 640000, color: "#e9c46a" },
  { id: "tabungan", label: "Tabungan", budget: 2000000, spent: 2000000, color: "#1d7a3d" },
  { id: "darurat", label: "Dana Darurat", budget: 500000, spent: 500000, color: "#8d6e63" },
  { id: "lain", label: "Lain-lain", budget: 850000, spent: 410000, color: "#78909c" },
];

export const TOTAL_SPENT = 11135000;
export const TOTAL_LEFT = 1365000;

// Transaksi 1–26 Nov 2026. Jumlah per kategori sama persis dengan realisasi di BUDGETS.
export const TRANSACTIONS = [
  { date: "2026-11-01", label: "SPP sekolah anak", category: "pendidikan", amount: 1500000 },
  { date: "2026-11-01", label: "Pasar tradisional — belanja mingguan", category: "harian", amount: 420000 },
  { date: "2026-11-01", label: "Setoran tabungan awal bulan", category: "tabungan", amount: 1000000 },
  { date: "2026-11-01", label: "Setoran dana darurat", category: "darurat", amount: 500000 },
  { date: "2026-11-02", label: "Bensin motor", category: "transport", amount: 250000 },
  { date: "2026-11-02", label: "Iuran RT", category: "tagihan", amount: 50000 },
  { date: "2026-11-03", label: "Internet rumah", category: "tagihan", amount: 350000 },
  { date: "2026-11-04", label: "Supermarket — belanja mingguan", category: "harian", amount: 380000 },
  { date: "2026-11-05", label: "Listrik PLN", category: "tagihan", amount: 425000 },
  { date: "2026-11-05", label: "Langganan streaming keluarga", category: "hiburan", amount: 100000 },
  { date: "2026-11-06", label: "Apotek — obat & vitamin", category: "kesehatan", amount: 140000 },
  { date: "2026-11-07", label: "Pasar — belanja mingguan", category: "harian", amount: 350000 },
  { date: "2026-11-07", label: "Air PDAM", category: "tagihan", amount: 185000 },
  { date: "2026-11-08", label: "Makan di luar — warung sunda", category: "hiburan", amount: 210000 },
  { date: "2026-11-09", label: "Bensin motor", category: "transport", amount: 220000 },
  { date: "2026-11-10", label: "Supermarket — belanja mingguan", category: "harian", amount: 410000 },
  { date: "2026-11-10", label: "BPJS Kesehatan", category: "tagihan", amount: 350000 },
  { date: "2026-11-11", label: "Perlengkapan rumah — sapu & ember", category: "lain", amount: 150000 },
  { date: "2026-11-12", label: "Tol & parkir", category: "transport", amount: 90000 },
  { date: "2026-11-13", label: "Pasar — belanja mingguan", category: "harian", amount: 360000 },
  { date: "2026-11-14", label: "Bioskop keluarga", category: "hiburan", amount: 150000 },
  { date: "2026-11-15", label: "Ojek online", category: "transport", amount: 180000 },
  { date: "2026-11-15", label: "Gas LPG & air galon", category: "tagihan", amount: 240000 },
  { date: "2026-11-16", label: "Setoran tabungan tengah bulan", category: "tabungan", amount: 1000000 },
  { date: "2026-11-17", label: "Supermarket — belanja mingguan", category: "harian", amount: 320000 },
  { date: "2026-11-18", label: "Pulsa & paket data keluarga", category: "tagihan", amount: 250000 },
  { date: "2026-11-19", label: "Dokter gigi anak", category: "kesehatan", amount: 180000 },
  { date: "2026-11-20", label: "Bensin motor", category: "transport", amount: 200000 },
  { date: "2026-11-21", label: "Pasar — belanja mingguan", category: "harian", amount: 335000 },
  { date: "2026-11-22", label: "Makan di luar — ayam goreng", category: "hiburan", amount: 180000 },
  { date: "2026-11-23", label: "Servis motor ringan", category: "transport", amount: 100000 },
  { date: "2026-11-24", label: "Hadiah ulang tahun tetangga", category: "lain", amount: 260000 },
  { date: "2026-11-25", label: "Supermarket — belanja mingguan", category: "harian", amount: 300000 },
];

export const BILLS = [
  { id: "internet", label: "Internet rumah", amount: 350000, due: "2026-11-03", paid: true },
  { id: "rt", label: "Iuran RT", amount: 50000, due: "2026-11-02", paid: true },
  { id: "listrik", label: "Listrik PLN", amount: 425000, due: "2026-11-05", paid: true },
  { id: "air", label: "Air PDAM", amount: 185000, due: "2026-11-07", paid: true },
  { id: "bpjs", label: "BPJS Kesehatan", amount: 350000, due: "2026-11-10", paid: true },
  { id: "gas", label: "Gas LPG & air galon", amount: 240000, due: "2026-11-15", paid: true },
  { id: "pulsa", label: "Pulsa & paket data keluarga", amount: 250000, due: "2026-11-18", paid: true },
  { id: "spp", label: "SPP sekolah anak", amount: 1500000, due: "2026-11-01", paid: true },
  { id: "air-des", label: "Air PDAM — Desember", amount: 190000, due: "2026-12-07", paid: false },
  { id: "listrik-des", label: "Listrik PLN — Desember", amount: 430000, due: "2026-12-05", paid: false },
];

export function categoryLabel(id) {
  const found = BUDGETS.find((b) => b.id === id);
  return found ? found.label : id;
}

export function categoryColor(id) {
  const found = BUDGETS.find((b) => b.id === id);
  return found ? found.color : "#78909c";
}

export function totalSpentOf(list) {
  return list.reduce((sum, t) => sum + t.amount, 0);
}
