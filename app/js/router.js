// Router hash sederhana: #/ , #/anggaran, #/transaksi, #/tagihan, #/laporan.
export const ROUTES = ["", "anggaran", "transaksi", "tagihan", "laporan"];

export function currentRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#\/?/, "").split("?")[0].split("/")[0];
  return ROUTES.includes(path) ? path : "";
}

export function routeLabel(route) {
  return {
    "": "Beranda",
    anggaran: "Anggaran",
    transaksi: "Transaksi",
    tagihan: "Tagihan",
    laporan: "Laporan",
  }[route] || "Beranda";
}

export function startRouter(onRoute) {
  window.addEventListener("hashchange", () => onRoute(currentRoute()));
  onRoute(currentRoute());
}
