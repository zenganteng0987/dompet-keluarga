// Grafik SVG buatan sendiri — tanpa library. Batang dan donat saja.
import { rupiahShort } from "./format.js";

// Grafik batang horizontal: label, nilai, dan batas anggaran.
export function barChart(rows) {
  const max = Math.max(...rows.map((r) => Math.max(r.value, r.limit || 0)), 1);
  const bars = rows.map((r) => {
    const w = Math.max(2, Math.round((r.value / max) * 100));
    const lw = r.limit ? Math.max(2, Math.round((r.limit / max) * 100)) : 0;
    return `<div class="bar-row">
      <div class="bar-label">${r.label}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${w}%;background:${r.color}"></div>
        ${r.limit ? `<div class="bar-limit" style="left:${lw}%"></div>` : ""}
      </div>
      <div class="bar-value">${rupiahShort(r.value)}</div>
    </div>`;
  }).join("");
  return `<div class="chart-bars" role="img" aria-label="Grafik batang pengeluaran per kategori">${bars}</div>`;
}

// Donat SVG: pangsa pengeluaran per kategori (di luar tabungan & dana darurat).
export function donutChart(slices) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const r = 70;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = slices.map((s) => {
    const frac = s.value / total;
    const len = frac * circ;
    const el = `<circle cx="100" cy="100" r="${r}" fill="none" stroke="${s.color}"
      stroke-width="34" stroke-dasharray="${len.toFixed(1)} ${(circ - len).toFixed(1)}"
      stroke-dashoffset="${(-offset).toFixed(1)}" />`;
    offset += len;
    return el;
  }).join("");
  const legend = slices.map((s) => `<li><span class="dot" style="background:${s.color}"></span>${s.label} — ${rupiahShort(s.value)}</li>`).join("");
  return `<div class="donut-wrap">
    <svg viewBox="0 0 200 200" class="donut" role="img" aria-label="Donat pangsa pengeluaran">
      <circle cx="100" cy="100" r="${r}" fill="none" stroke="#e8f0ec" stroke-width="34" />
      ${arcs}
      <text x="100" y="96" text-anchor="middle" class="donut-center-num">${rupiahShort(total)}</text>
      <text x="100" y="118" text-anchor="middle" class="donut-center-label">belanja</text>
    </svg>
    <ul class="legend">${legend}</ul>
  </div>`;
}

// Grafik batang pemasukan vs pengeluaran (dua batang vertikal sederhana).
export function incomeExpenseChart(income, spent) {
  const max = Math.max(income, spent, 1);
  const hi = Math.round((income / max) * 180);
  const hs = Math.round((spent / max) * 180);
  return `<div class="ie-chart" role="img" aria-label="Pemasukan vs pengeluaran">
    <div class="ie-col"><div class="ie-bar" style="height:${hi}px;background:#0e7a5f"></div><strong>${rupiahShort(income)}</strong><span>Pemasukan</span></div>
    <div class="ie-col"><div class="ie-bar" style="height:${hs}px;background:#e07a5f"></div><strong>${rupiahShort(spent)}</strong><span>Pengeluaran</span></div>
  </div>`;
}
