export const referenceImpact = [
  {
    area: "Keuangan Negara",
    levels: [
      // {
      //   name: "Fraud",
      //   details: [
      //     "x ≤ 10 juta",
      //     "Rp.10 juta < x < Rp.100 juta",
      //     "Rp.100 juta < x ≤ Rp.1 M",
      //     "Rp.1 M < x ≤ Rp.10 M",
      //     "x > Rp.10 M",
      //   ],
      // },
      {
        name: "Penerimaan atau pembiayaan",
        details: [
          "x ≤ 0,1% (nol koma satu persen) dari penerimaan atau pembiayaan yang dikelola UPR LS",
          "0,1% (nol koma satu persen) < x ≤ 0,5% (nol koma lima persen) dari penerimaan atau pembiayaan yang dikelola UPR LS",
          "0,5% (nol koma lima persen) < x < 1% (satu persen) dari penerimaan atau pembiayaan yang dikelola UPR LS",
          "1% (satu persen) < x < 2% (dua persen) dari penerimaan atau pembiayaan yang dikelola UPR LS",
          "x > 2% (dua persen) dari penerimaan atau pembiayaan yang dikelola UPR LS",
        ],
      },
    ],
  },
  {
    area: "Reputasi",
    levels: [
      {
        name: "Tingkat kepercayaan stakeholder",
        details: [
          "Sangat baik atau x > 8 (delapan) dari skala 10 (sepuluh)",
          "Baik atau 7 (tujuh) < x ≤ 8 (delapan) dari skala 10 (sepuluh)",
          "Sedang atau 6 (enam) < x < 7 (tujuh) dari skala 10 (sepuluh)",
          "Rendah atau 4 (empat) < x ≤ 6 (enam) dari skala 10 (sepuluh)",
          "Sangat rendah atau x < 4 (empat) dari skala 10 (sepuluh)",
        ],
      },
      {
        name: "Jumlah keluhan atau prosentase berita negatif dari total berita tentang Obyek MRPN LS",
        details: [
          "Jumlah keluhan x ≤ 10 (sepuluh)",
          "Persentase pemberitaan negatif 10% (sepuluh persen) < x ≤ 20% (dua puluh persen)",
          "Persentase pemberitaan negatif 20% (dua puluh persen) < x < 30% (tiga puluh persen)",
          "Persentase pemberitaan negatif 30% (tiga puluh persen) < x ≤ 40% (empat puluh persen)",
          "Persentase pemberitaan negatif x > 40% (empat puluh persen)",
        ],
      },
      {
        name: "Tingkat kepuasan pengguna layanan/wisatawan/investor",
        details: [
          "Nilai kepuasan 4,5 (empat koma lima) < x ≤ 5 (lima), skala 5",
          "Nilai kepuasan 4 (empat) < x ≤ 4,5 (empat koma lima), skala 5 (lima)",
          "Nilai kepuasan 3,5 (tiga koma lima) < x ≤ 4 (empat), skala 5 (lima)",
          "Nilai kepuasan 3 (tiga) < x < 3,5 (tiga koma lima), skala 5 (lima)",
          "Nilai kepuasan x < 3 (tiga), skala 5 (lima)",
        ],
      },
    ],
  },
  {
    area: "Layanan Publik",
    levels: [
      {
        name: "Persentase gangguan",
        details: [
          "5% (lima persen) dari standar operasional layanan",
          "5% (lima persen) < x ≤ 15% (lima belas persen) dari standar operasional layanan",
          "15% (lima belas persen) < x < 35% (tiga puluh lima persen) dari standar operasional layanan",
          "35% (tiga puluh lima persen) < x ≤ 50% (lima puluh persen) dari standar operasional layanan",
          "x > 50% (lima puluh persen) dari standar operasional layanan",
        ],
      },
    ],
  },
  {
    area: "Capaian Kinerja",
    levels: [
      {
        name: "Deviasi keluaran",
        details: [
          "x < 1% (satu persen)",
          "1% (satu persen) < x ≤ 5% (lima persen)",
          "5% (lima persen) < x < 10% (sepuluh persen)",
          "10% (sepuluh persen) < x < 20% (dua puluh persen)",
          "x > 20% (dua puluh persen)",
        ],
      },
      {
        name: "Over budget",
        details: [
          "x < 1% (satu) persen)",
          "1% < x ≤ 5% (lima persen)",
          "5% (lima persen) < x < 10%",
          "10% (sepuluh persen) < x < 20% (dua puluh persen)",
          "x > 20% (dua puluh persen)",
        ],
      },
      {
        name: "Keterlambatan penyelesaian",
        details: [
          "x < 5% (lima persen)",
          "5% (lima persen)< x ≤ 10% (sepuluh persen)",
          "10% (sepuluh persen) < x < 15% (lima belas persen)",
          "15% lima belas persen) < x < 25% (dua puluh lima persen)",
          "x > 25% (dua puluh lima persen)",
        ],
      },
    ],
  },
];
