export const FormatIDR = (value: number) => {
  if (value == undefined || value == 0) {
    return "Rp 0";
  }

  return new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const FormatCurrency = (angka: string) => {
  const number_string = angka.replace(/[^,\d]/g, "").toString();
  const split = number_string.split(",");
  const mod = split[0].length % 3;
  let rupiah = split[0].substring(0, mod);
  const ribuan = split[0].substring(mod).match(/\d{3}/gi);

  if (ribuan) {
    const separator = mod ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

// export const FormatCurrencyID = (angka: number | string) => {
//   const num =
//     typeof angka === "string"
//       ? parseFloat(angka.replace(/[^0-9,-]/g, "").replace(",", "."))
//       : angka;

//   const number_string = num.toFixed(0).toString();
//   const split = number_string.split(".");
//   const mod = split[0].length % 3;
//   let rupiah = split[0].substring(0, mod);
//   const ribuan = split[0].substring(mod).match(/\d{3}/g);

//   if (ribuan) {
//     const separator = mod ? "." : "";
//     rupiah += separator + ribuan.join(".");
//   }

//   rupiah = split[1] ? rupiah + "," + split[1] : rupiah;
//   return rupiah;
// };

export const FormatCurrencyID = (value: number): string => {
  const absoluteValue = Math.abs(Math.floor(value));
  const formatted = absoluteValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return value < 0 ? `-${formatted}` : formatted;
};
