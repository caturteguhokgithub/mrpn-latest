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
    "P ≤ 10%",
    "< 2 kali dalam 12 bulan terakhir",
    "≤ 1 kejadian dalam lebih dari 5 tahun terakhir"
  ),
  createData(
    2,
    "Jarang terjadi (2)",
    "10% <p ≤ 25%",
    "2 kali s.d 5 kali dalam 12 bulan terakhir",
    "Minimal 1 kejadian dalam 4 tahun terakhir"
  ),
  createData(
    3,
    "Kadang terjadi (3)",
    "25% < p ≤ 50%",
    "6 kali s.d 9 kali dalam 12 bulan terkahir",
    "Minimal 1 kejadian dalam 3 tahun terakhir"
  ),
  createData(
    4,
    "Sering terjadi (4)",
    "50% < p ≤ 75%",
    "10 kali s.d 12 kali dalam 12 bulan terakhir",
    "Minimal 1 kejadian dalam 2 tahun terakhir"
  ),
  createData(
    5,
    "Hampir pasti terjadi (5)",
    "P > 75%",
    "> 12 kali dalam 12 bulan terakhir",
    "Minimal 1 kejadian dalam 1 tahun terakhir"
  ),
];
