// Render semua halaman DompetKeluarga dan semua kontrol interaktifnya.
import {
  FAMILY, INCOME, TOTAL_INCOME, BUDGETS, TOTAL_SPENT, TOTAL_LEFT,
  TRANSACTIONS, BILLS, categoryLabel, categoryColor, totalSpentOf,
} from "./data.js";
import { rupiah, rupiahShort, percent, tanggal } from "./format.js";
import { barChart, donutChart, incomeExpenseChart } from "./charts.js";
import { startRouter, routeLabel } from "./router.js";

const app = document.getElementById("app");
const state = {
  added: [],
  filter: "semua",
  dashboardVariant: "A",
};

function spentOf(b) {
  return b.spent + state.added.filter((t) => t.category === b.id).reduce((s, t) => s + t.amount, 0);
}

function allTransactions() {
  return [...TRANSACTIONS, ...state.added].sort((a, b) => (a.date < b.date ? 1 : -1));
}

function totalSpentNow() {
  return TOTAL_SPENT + state.added.reduce((s, t) => s + t.amount, 0);
}

function summaryCards() {
  const spent = totalSpentNow();
  const left = TOTAL_INCOME - spent;
  return `<section class="cards" aria-label="Ringkasan">
    <article class="card card-income"><span>Pemasukan</span><strong>${rupiah(TOTAL_INCOME)}</strong><small>Gaji Budi Rp9.500.000 + usaha Rahma Rp3.000.000</small></article>
    <article class="card card-spent"><span>Terpakai s.d. 26 Nov</span><strong>${rupiah(spent)}</strong><small>${percent(spent, TOTAL_INCOME)}% dari pemasukan</small></article>
    <article class="card card-left"><span>Sisa bulan ini</span><strong>${rupiah(left)}</strong><small>Dari anggaran Rp12.500.000</small></article>
    <article class="card card-bills"><span>Tagihan November</span><strong>${BILLS.filter((b) => b.paid).length} dari ${BILLS.length} lunas</strong><small>Total tagihan Rp${(3350000).toLocaleString("id-ID")}</small></article>
  </section>`;
}

function progressRow(b) {
  const spent = spentOf(b);
  const pct = percent(spent, b.budget);
  const over = spent > b.budget;
  return `<div class="prog-row">
    <div class="prog-head"><span>${b.label}</span><span>${rupiah(spent)} / ${rupiah(b.budget)}</span></div>
    <div class="prog-track"><div class="prog-fill ${over ? "over" : ""}" style="width:${Math.min(100, pct)}%;background:${b.color}"></div></div>
    <small>${pct}% terpakai · sisa ${rupiah(Math.max(0, b.budget - spent))}</small>
  </div>`;
}

function renderDashboard() {
  const recent = allTransactions().slice(0, 6);
  const rows = recent.map((t) => `<li><span>${tanggal(t.date)}</span><span>${t.label}</span><span class="tag" style="background:${categoryColor(t.category)}22;color:${categoryColor(t.category)}">${categoryLabel(t.category)}</span><strong>−${rupiah(t.amount)}</strong></li>`).join("");
  let middle = "";
  if (state.dashboardVariant === "A") {
    middle = `<section class="panel"><h2>Pengeluaran per kategori</h2>
      <p class="hint">Batang hijau = terpakai, garis = batas anggaran.</p>
      ${barChart(BUDGETS.map((b) => ({ label: b.label, value: spentOf(b), limit: b.budget, color: b.color })))}
    </section>
    <section class="panel"><h2>Transaksi terakhir</h2><ul class="tx-list">${rows}</ul>
      <p><a class="btn" href="#/transaksi">Lihat semua transaksi →</a></p></section>`;
  } else {
    const slices = BUDGETS.filter((b) => b.id !== "tabungan" && b.id !== "darurat")
      .map((b) => ({ label: b.label, value: spentOf(b), color: b.color }));
    middle = `<section class="panel"><h2>Ke mana uang pergi</h2>
      ${donutChart(slices)}</section>
    <section class="panel"><h2>Progres anggaran</h2>
      ${BUDGETS.map(progressRow).join("")}
      <p><a class="btn" href="#/anggaran">Lihat detail anggaran →</a></p></section>`;
  }
  app.innerHTML = `
    <header class="page-head"><h1>Selamat pagi, Rahma &amp; Budi</h1>
    <p>Dompet keluarga ${FAMILY.month} — ${FAMILY.city}. Pemasukan bulan ini Rp12.500.000, terpakai ${rupiah(totalSpentNow())}, sisa ${rupiah(TOTAL_INCOME - totalSpentNow())}.</p></header>
    ${summaryCards()}
    <div class="grid-2">${middle}</div>
    <section class="panel tip"><h2>Catatan keluarga</h2>
    <p>Tagihan &amp; Utilitas sudah lunas penuh (Rp1.850.000) dan SPP anak Rp1.500.000 sudah dibayar. Sisa Rp1.365.000 cukup untuk belanja harian sampai akhir bulan — jaga belanja harian di bawah Rp325.000.</p></section>`;
}

function renderAnggaran() {
  const rows = BUDGETS.map((b) => {
    const spent = spentOf(b);
    const pct = percent(spent, b.budget);
    return `<tr><td><span class="dot" style="background:${b.color}"></span>${b.label}</td>
      <td>${rupiah(b.budget)}</td><td>${rupiah(spent)}</td>
      <td>${rupiah(b.budget - spent)}</td><td>${pct}%</td></tr>`;
  }).join("");
  app.innerHTML = `
    <header class="page-head"><h1>Anggaran ${FAMILY.month}</h1>
    <p>Total anggaran Rp12.500.000 — sama dengan pemasukan bulan ini. Terpakai ${rupiah(totalSpentNow())} dari Rp12.500.000, sisa ${rupiah(TOTAL_INCOME - totalSpentNow())}.</p></header>
    ${summaryCards()}
    <section class="panel"><h2>Rincian per kategori</h2>
    <div class="table-wrap"><table><thead><tr><th>Kategori</th><th>Anggaran</th><th>Terpakai</th><th>Sisa</th><th>%</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr><td>Total</td><td>${rupiah(12500000)}</td><td>${rupiah(totalSpentNow())}</td><td>${rupiah(TOTAL_INCOME - totalSpentNow())}</td><td>${percent(totalSpentNow(), 12500000)}%</td></tr></tfoot></table></div></section>
    <section class="panel"><h2>Progres tiap kategori</h2>${BUDGETS.map(progressRow).join("")}</section>`;
}

function txRow(t) {
  return `<li><span>${tanggal(t.date)}</span><span>${t.label}</span>
    <span class="tag" style="background:${categoryColor(t.category)}22;color:${categoryColor(t.category)}">${categoryLabel(t.category)}</span>
    <strong>−${rupiah(t.amount)}</strong></li>`;
}

function renderTransaksi() {
  const list = allTransactions().filter((t) => state.filter === "semua" || t.category === state.filter);
  const total = totalSpentOf(list);
  const options = [`<option value="semua">Semua kategori</option>`, ...BUDGETS.map((b) => `<option value="${b.id}" ${state.filter === b.id ? "selected" : ""}>${b.label}</option>`)].join("");
  app.innerHTML = `
    <header class="page-head"><h1>Transaksi 1–26 November 2026</h1>
    <p>${TRANSACTIONS.length + state.added.length} transaksi tercatat. Total yang tampil: <strong>${rupiah(total)}</strong>. Jumlah per kategori tidak pernah melebihi realisasi kategori itu.</p></header>
    <section class="panel"><h2>Tambah transaksi</h2>
      <form id="tx-form" class="form">
        <label>Tanggal <input type="date" name="date" value="2026-11-26" min="2026-11-01" max="2026-11-26" required></label>
        <label>Keterangan <input type="text" name="label" placeholder="cth. Pasar — belanja mingguan" required></label>
        <label>Kategori <select name="category">${BUDGETS.map((b) => `<option value="${b.id}">${b.label}</option>`).join("")}</select></label>
        <label>Jumlah (Rp) <input type="number" name="amount" min="1000" step="1000" placeholder="150000" required></label>
        <button class="btn btn-primary" type="submit">Simpan transaksi</button>
      </form>
      <p class="hint">Transaksi baru langsung muncul di daftar dan memperbarui total di semua halaman.</p>
    </section>
    <section class="panel"><h2>Daftar transaksi</h2>
      <label class="filter">Filter kategori <select id="tx-filter">${options}</select></label>
      <ul class="tx-list">${list.map(txRow).join("") || "<li>Tidak ada transaksi pada kategori ini.</li>"}</ul>
    </section>`;
  document.getElementById("tx-filter").addEventListener("change", (e) => {
    state.filter = e.target.value;
    renderTransaksi();
  });
  document.getElementById("tx-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.added.push({
      date: fd.get("date"),
      label: String(fd.get("label")).trim(),
      category: fd.get("category"),
      amount: Number(fd.get("amount")),
    });
    renderTransaksi();
  });
}

function renderTagihan() {
  const paid = BILLS.filter((b) => b.paid);
  const unpaid = BILLS.filter((b) => !b.paid);
  const paidSum = totalSpentOf(paid);
  const unpaidSum = totalSpentOf(unpaid);
  const rows = BILLS.map((b) => `<tr><td>${b.label}</td><td>${rupiah(b.amount)}</td>
    <td>${tanggal(b.due)}</td>
    <td><span class="status ${b.paid ? "paid" : "unpaid"}">${b.paid ? "Lunas" : "Belum lunas"}</span></td>
    <td><button class="btn btn-small" data-bill="${b.id}">${b.paid ? "Tandai belum lunas" : "Tandai lunas"}</button></td></tr>`).join("");
  app.innerHTML = `
    <header class="page-head"><h1>Tagihan</h1>
    <p>${paid.length} dari ${BILLS.length} tagihan lunas. Total lunas ${rupiah(paidSum)}, masih menunggu ${rupiah(unpaidSum)}.</p></header>
    ${summaryCards()}
    <section class="panel"><h2>Semua tagihan</h2>
    <p class="hint">Tagihan November (Rp3.350.000) sudah lunas semua: Tagihan &amp; Utilitas Rp1.850.000 + SPP Rp1.500.000. Dua tagihan Desember menunggu giliran.</p>
    <div class="table-wrap"><table><thead><tr><th>Tagihan</th><th>Jumlah</th><th>Jatuh tempo</th><th>Status</th><th>Ubah</th></tr></thead>
    <tbody>${rows}</tbody></table></div></section>`;
  app.querySelectorAll("[data-bill]").forEach((btn) => btn.addEventListener("click", () => {
    const bill = BILLS.find((b) => b.id === btn.getAttribute("data-bill"));
    bill.paid = !bill.paid;
    renderTagihan();
  }));
}

function renderLaporan() {
  const spent = totalSpentNow();
  const rows = BUDGETS.map((b) => ({ label: b.label, value: spentOf(b), limit: b.budget, color: b.color }));
  app.innerHTML = `
    <header class="page-head"><h1>Laporan ${FAMILY.month}</h1>
    <p>Ringkasan bulan ini untuk ${FAMILY.name} — pemasukan Rp12.500.000, pengeluaran Rp${spent.toLocaleString("id-ID")}, sisa Rp${(TOTAL_INCOME - spent).toLocaleString("id-ID")}.</p></header>
    ${summaryCards()}
    <div class="grid-2">
      <section class="panel"><h2>Pemasukan vs pengeluaran</h2>
        ${incomeExpenseChart(TOTAL_INCOME, spent)}
        <p class="hint">Pemasukan: gaji Budi Rp9.500.000 + usaha Rahma Rp3.000.000. Pengeluaran tercatat Rp${spent.toLocaleString("id-ID")} (89% dari pemasukan).</p></section>
      <section class="panel"><h2>Pemasukan bulan ini</h2>
        <ul class="tx-list">${INCOME.map((i) => `<li><span>${tanggal(i.date)}</span><span>${i.label} — ${i.note}</span><strong>+${rupiah(i.amount)}</strong></li>`).join("")}</ul>
        <p><strong>Total pemasukan: ${rupiah(TOTAL_INCOME)}</strong></p></section>
    </div>
    <section class="panel"><h2>Pengeluaran per kategori</h2>${barChart(rows)}</section>
    <section class="panel"><h2>Progres tiap kategori</h2>${BUDGETS.map(progressRow).join("")}</section>
    <section class="panel tip"><h2>Kesimpulan</h2>
    <p>Keluarga menghabiskan ${percent(spent, TOTAL_INCOME)}% pemasukan dan menabung Rp2.000.000 plus dana darurat Rp500.000. Kategori paling hemat: Kesehatan (Rp320.000 dari Rp600.000) dan Lain-lain (Rp410.000 dari Rp850.000). Belanja harian masih punya sisa Rp325.000 sampai 30 November.</p></section>`;
}

function render(route) {
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + route);
  });
  document.getElementById("page-title").textContent = "DompetKeluarga — " + routeLabel(route);
  if (route === "anggaran") renderAnggaran();
  else if (route === "transaksi") renderTransaksi();
  else if (route === "tagihan") renderTagihan();
  else if (route === "laporan") renderLaporan();
  else renderDashboard();
  window.scrollTo(0, 0);
}

startRouter(render);
