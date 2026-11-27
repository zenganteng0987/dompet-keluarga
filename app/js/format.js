// Format angka dan tanggal ke bahasa Indonesia.
export function rupiah(amount) {
  return "Rp" + Number(amount).toLocaleString("id-ID");
}

export function rupiahShort(amount) {
  if (amount >= 1000000) {
    const jt = amount / 1000000;
    return "Rp" + (Number.isInteger(jt) ? jt : jt.toFixed(1).replace(".", ",")) + " jt";
  }
  if (amount >= 1000) return "Rp" + Math.round(amount / 1000) + " rb";
  return rupiah(amount);
}

export function percent(part, whole) {
  if (!whole) return 0;
  return Math.round((part / whole) * 100);
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export function tanggal(iso) {
  const parts = iso.split("-");
  const day = Number(parts[2]);
  const month = MONTHS[Number(parts[1]) - 1];
  return day + " " + month + " 2026";
}
