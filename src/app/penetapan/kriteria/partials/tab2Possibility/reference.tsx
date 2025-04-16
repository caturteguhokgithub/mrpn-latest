function createData(
  id: number,
  level: string,
  persentase: string,
  jumlah: string,
  lfe: string
) {
  return { id, level, persentase, jumlah, lfe };
}

export const referencePossibility = [
  createData(
    1,
    "Hampir tidak terjadi (1)",
    "x ≤ 10% (sepuluh persen)",
    // "P ≤ 10%",
    "<2 (dua) kali dalam 1 (satu) tahun atau ≤1 (satu) kejadian dalam 5 (lima) tahun terakhir",
    "≤1 (satu) kejadian dalam 5 (lima) tahun terakhir"
    // "< 2 kali dalam 12 bulan terakhir",
    // "≤ 1 kejadian dalam lebih dari 5 tahun terakhir"
  ),
  createData(
    2,
    "Jarang terjadi (2)",
    "10% (sepuluh persen) < x ≤ 25% (dua puluh lima persen)",
    // "10% <p ≤ 25%",
    "2 (dua) s.d 5 (lima) kali dalam 1 (satu) tahun",
    "2 (dua) kejadian dalam 5 (lima) tahun terakhir"
    // "2 kali s.d 5 kali dalam 12 bulan terakhir",
    // "Minimal 1 kejadian dalam 4 tahun terakhir"
  ),
  createData(
    3,
    "Kadang terjadi (3)",
    "25% (dua puluh lima persen) < x ≤ 50% (lima puluh persen)",
    // "25% < p ≤ 50%",
    "6 (enam) s.d 9 (sembilan) kali dalam 1 (satu) tahun",
    "3 (tiga) kejadian dalam 5 (lima) tahun terakhir"
    // "6 kali s.d 9 kali dalam 12 bulan terkahir",
    // "Minimal 1 kejadian dalam 3 tahun terakhir"
  ),
  createData(
    4,
    "Sering terjadi (4)",
    "50% (lima puluh persen) < x ≤ 75% (tujuh puluh lima persen)",
    // "50% < p ≤ 75%",
    "10 (sepuluh) s.d. 12 (dua belas) kali dalam 1 (satu) tahun",
    "4 (empat) kejadian dalam 5 (lima) tahun terakhir"
    // "10 kali s.d 12 kali dalam 12 bulan terakhir",
    // "Minimal 1 kejadian dalam 2 tahun terakhir"
  ),
  createData(
    5,
    "Hampir pasti terjadi (5)",
    "x > 75% (tujuh puluh lima persen)",
    // "P > 75%",
    ">12 (dua belas) kali dalam 1 (satu) tahun",
    "5 (lima) kejadian dalam 5 (lima) tahun terakhir"
    // "> 12 kali dalam 12 bulan terakhir",
    // "Minimal 1 kejadian dalam 1 tahun terakhir"
  ),
];
