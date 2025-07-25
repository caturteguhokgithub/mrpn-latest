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

// export const FormatIndonesianCurrency = (
//   value: string | number | undefined | null
// ): string => {
//   if (value === undefined || value === null || value === "") return "";

//   // Convert to number safely
//   let num =
//     typeof value === "number"
//       ? value
//       : parseFloat(value.replace(/\./g, "").replace(",", "."));

//   if (isNaN(num)) return "";

//   // Format number to Indonesian format with 2 decimals
//   return num.toLocaleString("id-ID", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// };

export const FormatIndonesianCurrency = (
  value: string | number | undefined | null
): string => {
  if (value === undefined || value === null || value === "") return "";

  // Konversi ke string
  let numStr = typeof value === "number" ? value.toString() : value;

  // Hapus semua pemisah ribuan yang mungkin sudah ada
  numStr = numStr.replace(/\./g, "");

  // Ganti koma dengan titik untuk standar desimal
  numStr = numStr.replace(/,/g, ".");

  // Validasi format angka
  if (!/^\d*\.?\d*$/.test(numStr)) return "";

  // Pisahkan bagian desimal
  const parts = numStr.split(".");
  let wholePart = parts[0];
  let decimalPart = parts.length > 1 ? "," + parts[1].slice(0, 2) : "";

  // Tambahkan pemisah ribuan
  wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return wholePart + decimalPart;
};

// Format for display (1.234,56)
export const formatDisplay = (value: string): string => {
  if (!value) return "";

  // Convert to display format
  let [whole, decimal] = value.replace(/\./g, "").split(".");

  // Add thousand separators
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Handle decimal part
  const decimalPart = decimal ? `,${decimal.slice(0, 2)}` : "";

  return whole + decimalPart;
};

// Parse from display format to database format (1234.56)
export const parseInput = (displayValue: string): string => {
  // Remove all dots (thousand separators)
  let value = displayValue.replace(/\./g, "");

  // Replace comma with dot for decimal
  value = value.replace(/,/g, ".");

  // Remove any non-numeric characters except dot
  value = value.replace(/[^\d.]/g, "");

  // Handle multiple dots
  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }

  // Limit to 2 decimal places
  if (value.includes(".")) {
    const [whole, decimal] = value.split(".");
    value = whole + "." + decimal.slice(0, 2);
  }

  return value || "";
};

export const formatNumberID = (input: number | string): string => {
  let number: number;

  if (typeof input === "string") {
    // Handle Indonesian-style input like "1.201,55" or "Rp 1.201,55"
    const cleaned = input
      .replace(/[^\d.,-]/g, "") // Remove everything except digits, dots, commas, minus
      .replace(/\./g, "") // Remove thousand separators (dots)
      .replace(",", "."); // Convert decimal comma to dot

    number = parseFloat(cleaned);
  } else {
    number = input;
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
// export const formatNumber = (number: number | string): string => {
//   if (typeof number === "string") {
//     number = parseFloat(number.replace(/[^0-9.-]/g, ""));
//   }
//   return new Intl.NumberFormat("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(number);
// };
