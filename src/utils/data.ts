export const listKemungkinan = [
 { id: "1", value: "1", label: "Kemungkinan 1" },
 { id: "2", value: "2", label: "Kemungkinan 2" },
 { id: "3", value: "3", label: "Kemungkinan 3" },
 { id: "4", value: "4", label: "Kemungkinan 4" },
 { id: "5", value: "5", label: "Kemungkinan 5" },
];

export const listDampak = [
 { id: "1", value: "1", label: "Dampak 1" },
 { id: "2", value: "2", label: "Dampak 2" },
 { id: "3", value: "3", label: "Dampak 3" },
 { id: "4", value: "4", label: "Dampak 4" },
 { id: "5", value: "5", label: "Dampak 5" },
];

export const listTriwulan = [
 "Triwulan 1 (Jan - Mar)",
 "Triwulan 2 (Apr - Mei)",
 "Triwulan 3 (Jul - Sep)",
 "Triwulan 4 (Okt - Des)",
 "Tahun 2025",
 "Tahun 2026",
 "Tahun 2027",
 "Tahun 2028",
 "Tahun 2029",
];

export const listRiskCategory = [
 "Risiko Lingkungan",
 "Risiko Sosial",
 "Risiko Geopolitik",
 "Risiko Ekonomi",
 "Risiko Teknologi",
 "Risiko Tata Kelola",
 "Risiko Reputasi",
];

export const listFundSource = [
 { id: 1, source: "APBN" },
 { id: 2, source: "APBD" },
 { id: 3, source: "Hibah" },
 { id: 4, source: "Penerimaan Pembiayaan" },
 { id: 5, source: "BUMN" },
 { id: 6, source: "Swasta" },
];

export const listPeraturan = [
 { id: 1, source: "Peraturan Presiden Nomor 79 Tahun 2019" },
 { id: 2, source: "Peraturan Presiden Nomor 106 Tahun 2022" },
 { id: 3, source: "Peraturan Presiden Nomor 109 Tahun 2020" },
 { id: 4, source: "Peraturan Presiden Nomor 22 Tahun 2024" },
 { id: 5, source: "Peraturan Presiden Nomor 37 Tahun 2024" },
 { id: 6, source: "Peraturan Presiden Nomor 60 Tahun 2024" },
 { id: 7, source: "Peraturan Presiden Nomor 36 Tahun 2024" },
 { id: 8, source: "Peraturan Presiden Nomor 30 Tahun 2024" },
 { id: 9, source: "Peraturan Presiden Nomor 19 Tahun 2024" },
 { id: 10, source: "Peraturan Presiden Nomor 49 Tahun 2024" },
 { id: 11, source: "Peraturan Presiden Nomor 88 Tahun 2024" },
 { id: 12, source: "Peraturan Presiden Nomor 29 Tahun 2024" },
 { id: 13, source: "Peraturan Presiden Nomor 1 Tahun 2022" },
 { id: 14, source: "Peraturan Presiden Nomor 2 Tahun 2022" },
 { id: 15, source: "Peraturan Presiden Nomor 111 Tahun 2022" },
 { id: 16, source: "Peraturan Presiden Nomor 4 Tahun 2022" },
];

export const listKldBadanUsaha = [
 { id: 1, source: "Kementerian ESDM" },
 { id: 2, source: "Kementerian BUMN" },
 { id: 3, source: "Kementerian Perhubungan" },
 { id: 4, source: "Pertamina" },
 { id: 5, source: "PLN" },
 { id: 6, source: "KAI" },
 { id: 6, source: "Angkasa Pura" },
 { id: 6, source: "PT Angkutan Sungai, Danau dan Penyebrangan (ASDP)" },
 { id: 6, source: "PT Pelabuhan Indonesia (Pelindo)" },
];

export const listEntitasUtama = [
 "Kementerian Kesehatan",
 "Kementerian PUPR",
 "Kementerian Perindustrian",
];

export const listEntitasPendukung = ["Kementerian Pertanian", "BPOM", "Simas"];

export const listTahun = ["2025", "2026", "2027", "2028", "2029"];

export const listLevelKemungkinan = [
 "1 - Sangat rendah",
 "2 - Rendah",
 "3 - Sedang",
 "4 - Tinggi",
 "5 - Sangat Tinggi",
];

export interface OptionKebijakan {
 id: string;
 value: string;
 label: string;
 list?: string[];
}

export const listKebijakan: OptionKebijakan[] = [
 //  { id: "1", value: "1", label: "Janpres" },
 //  { id: "2", value: "2", label: "SDGs" },
 //  { id: "3", value: "3", label: "Dekon" },
 //  { id: "4", value: "4", label: "DAK" },
 //  { id: "5", value: "5", label: "PEN" },
 //  { id: "6", value: "6", label: "RPJPN" },
 //  { id: "7", value: "7", label: "RPJMN" },
 //  { id: "8", value: "8", label: "RKP" },
 //  { id: "9", value: "9", label: "Major Project" },
 //  {
 //   id: "10",
 //   value: "10",
 //   label: "Astacita",
 //   list: [
 //    "Memperkokoh ideologi Pancasila, demokrasi, dan hak asasi manusia (HAM).",
 //    "Memantapkan sistem pertahanan keamanan negara dan mendorong kemandirian bangsa melalui swasembada pangan, energi, air, ekonomi kreatif, ekonomi hijau, dan ekonomi biru.",
 //    "Melanjutkan pengembangan infrastruktur dan meningkatkan lapangan kerja yang berkualitas, mendorong kewirausahaan, mengembangkan industri kreatif serta mengembangkan agromaritim industri di sentra produksi melalui peran aktif koperasi.",
 //    "Memperkuat pembangunan sumber daya manusia (SDM), sains, teknologi, pendidikan, kesehatan, prestasi olahraga, kesetaraan gender, serta penguatan peran perempuan, pemuda (generasi milenial dan generasi Z), dan penyandang disabilitas.",
 //    "Melanjutkan hilirisasi dan mengembangkan industri berbasis sumber daya alam untuk meningkatkan nilai tambah di dalam negeri.",
 //    "Membangun dari desa dan dari bawah untuk pemerataan ekonomi dan pemberantasan kemiskinan.",
 //    "Memperkuat reformasi politik, hukum, dan birokrasi, serta memperkuat pencegahan dan pemberantasan korupsi, narkoba, judi, dan penyelundupan.",
 //    "Memperkuat penyelarasan kehidupan yang harmonis dengan lingkungan, alam dan budaya, serta peningkatan toleransi antarumat beragama untuk mencapai masyarakat yang adil dan makmur.",
 //   ],
 //  },
 //  { id: "11", value: "11", label: "Renstra" },
 //  { id: "12", value: "12", label: "RKPD" },

 {
  id: "17",
  value: "17",
  label: "17 Program Prioritas",
  list: [
   "Mencapai swasembada pangan, energi dan air",
   "Penyempurnaan sistem penerimaan negara  ",
   "Reformasi politik, hukum dan birokrasi",
   "Pencegahan dan pemberantasan korupsi",
   "Pemberantasan kemiskinan",
   "Pencegahan dan pemberantasan narkoba",
   "Menjamin tersedianya pelayanan kesehatan bagi seluruh rakyat Indonesia: Peningkatan BPJS kesehatan dan penyediaan obat untuk rakyat",
   "Penguatan pendidikan, sains dan teknologi, serta digitalisasi",
   "Penguatan pertahanan dan keamanan negara dan pemeliharaan hubungan internasional yang kondusif",
   "Penguatan kesetaraan gender dan perlindungan hak perempuan, anak, serta penyandang disabilitas",
   "Menjamin pelestarian lingkungan hidup",
   "Menjamin ketersediaan pupuk, benih, dan pestisida langsung ke petani",
   "Menjamin pembangunan hunian berkualitas terjangkau bersanitasi baik untuk masyarakat perdesaan/ perkotaan dan rakyat yang membutuhkan",
   "Melanjutkan pemerataan ekonomi dan penguatan UMKM melalui program kredit usaha dan pembangunan Ibu Kota Nusantara (IKN) serta kota-kota  inovatif-karakteristik-mandiri lainnya",
   "Melanjutkan hilirisasi dan industrialisasi berbasiskan sumber daya alam (SDA), termasuk sumber daya maritim untuk membuka lapangan kerja yang seluasluasnya dalam mewujudkan keadilan ekonomi",
   "Memastikan kerukunan antar umat beragama, kebebasan beribadah, dan perawatan rumah ibadah",
   "Pelestarian seni budaya, peningkatan ekonomi kreatif, dan peningkatan prestasi olahraga",
  ],
 },
 {
  id: "13",
  value: "13",
  label: "8 Quick Wins",
  list: [
   "Memberi makan siang dan susu gratis di sekolah dan pesantren, serta bantuan gizi untuk anak balita dan ibu hamil",
   "Menyelenggarakan pemeriksaan kesehatan gratis, menuntaskan kasus TBC, dan membangun Rumah Sakit lengkap berkualitas di kabupaten",
   "Mencetak dan meningkatkan produktivitas lahan pertanian dengan lumbung pangan desa, daerah, dan nasional",
   "Membangun sekolah-sekolah unggul terintegrasi di setiap kabupaten, dan memperbaiki sekolah-sekolah yang perlu renovasi",
   "Melanjutkan dan menambahkan program kartu-kartu kesejahteraan sosial serta kartu usaha untuk menghilangkan kemiskinan absolut",
   "Menaikkan gaji ASN (terutama guru, dosen, tenaga kesehatan, dan penyuluh), TNI/POLRI, dan pejabat negara",
   "Melanjutkan pembangunan infrastruktur desa, Bantuan Langsung Tunai (BLT), dan menyediakan rumah murah bersanitasi baik untuk yang membutuhkan, terutama generasi milenial, generasi Z, dan masyarakat berpenghasilan rendah (MBR)",
   "Mendirikan Badan Penerimaan negara dan meningkatkan rasio penerimaan negara terhadap produk domestik bruto (PDB) ke 23%",
  ],
 },
 {
  id: "14",
  value: "14",
  label: "20 Game Changer",
  list: [
   "Percepatan wajib belajar 13 tahun (1 tahun pra-sekolah dan 12 tahun pendidikan dasar dan pendidikan menengah);",
   "Peningkatan partisipasi pendidikan tinggi dan lulusan STEAM berkualitas termasuk pemanfaatan dana abadi pendidikan;",
   "Restrukturisasi kewenangan pengelolaan tenaga pendidikan dan kesehatan seperti guru, tenaga medis, dan tenaga kesehatan;",
   "Investasi pelayanan kesehatan primer, penuntasan stunting, dan eliminasi penyakit menular dan penyakit tropis terabaikan (terutama: tuberkulosis dan kusta);",
   "Penuntasan kemiskinan dengan satu sistem Regsosek dan perlindungan sosial adaptif terintegrasi.",
   "Peningkatan anggaran IPTEKIN nasional menuju komersialisasi oleh industri;",
   "Industrialisasi: hilirisasi industri berbasis SDA unggulan, industri padat karya terampil, padat teknologi dan inov serta berorientasi ekspor;",
   "Percepatan transisi energi berkeadilan menuju pemanfaatan energi baru dan terbarukan secara berkelanjutan didukung jaringan listrik terintegrasi serta transportasi hijau;",
   "Superplatform untuk percepatan transformasi digital dan produksi talenta digital;",
   "Integrasi infrastruktur konektivitas dengan kawasan pertumbuhan ekonomi;",
   "Pembangunan Ibu Kota Nusantara (IKN).",
   "Pembentukan lembaga tunggal pengelola regulasi, transformasi manajemen ASN (terutama sistem penggajian tunggal dan pensiun), serta pemberantasan korupsi;",
   "Penguatan integritas partai politik.",
   "Transformasi sistem penuntutan menuju single prosecution system dan transformasi lembaga kejaksaan sebagai Advocaat General;",
   "Transformasi industri pertahanan menuju kemandirian melalui skema inovatif untuk adopsi teknologi dan penguatan value chain industri nasional;",
   "Reformasi perencanaan dan fiskal: perencanaan dan pengendalian pembangunan berbasis risiko; penerapan aturan fiskal adaptif; reformasi APBN; serta transformasi kelembagaan perencanaan dan fiskal;",
   "Reformasi subsidi terutama energi terbarukan dan pupuk tepat sasaran.",
   "Penguatan karakter dan jati diri bangsa;",
   "Reformasi pengelolaan sampah terintegrasi dari hulu ke hilir;",
   "Ketahanan energi dan air serta kemandirian pangan dengan pendekatan terpadu FEW Nexus (food, energy, water)",
  ],
 },
 {
  id: "15",
  value: "15",
  label: "45 Indikator RPJPN",
  list: [
   "Usia Harapan Hidup (UHH) (Tahun)",
   "Kesehatan Ibu dan Anak",
   "Insidensi Tuberkulosis (per 100.000 penduduk)",
   "Cakupan kepesertaan jaminan kesehatan nasional (%)",
   "Hasil Pembelajaran",
   "Angka Partisipasi Kasar (APK) Pendidikan Tinggi (%)",
   "Presentase pekerja lulusan pendidikan menengah dan tinggi yang bekerja di bidang keahlian menengah dan tinggi (%)",
   "Tingkat Kemiskinan (%)",
   "Cakupan kepesertaan Jaminan Sosial Ketenagakerjaan (%)",
   "Presentase penyandang disabilitas bekerja di sektor formal (%)",
   "Rasio PDB industri pengolahan",
   "Pengembangan pariwisata",
   "Proporsi PDB Ekonomi Kreatif",
   "Produktivitas UMKM, Koperasi, BUMN",
   "Tingkat Pengangguran Terbuka",
   "Tingkat Partisipasi Angkatan Kerja Perempuan",
   "Tingkat Penguasaan IPTEK",
   "Tingkat Penerapan Ekonomi Hijau",
   "Indeks Daya Saing Digital di Tingkat Global (Peringkat)",
   "Biaya Logistik (% PDB)",
   "Pembentukan Modal Tetap Bruto (% PDB)",
   "Ekspor Barang dan Jasa (%)",
   "Proporsi kontribusi PDRB wilayah metropolitan terhadap nasional (%); Rumah tangga dengan akses hunian layak, terjangkau, dan berkelanjutan (%)",
   "Indeks Materi Hukum",
   "Indeks Sistem Pemerintahan Berbasis Elektronik",
   "Indeks Pelayanan Publik",
   "Anti Korupsi",
   "Indeks Pembangunan Hukum",
   "Proporsi Penduduk yang Merasa Aman Berjalan Sendirian di Area Tempat Tinggalnya (%)",
   "Indeks Demokrasi Indonesia",
   "Rasio pajak terhadap PDB",
   "Tingkat inflasi",
   "Pendalaman/Intermediasi Sektor Keuangan",
   "Inklusi Keuangan (%)",
   "Asia Power CardIndikasiSasaran (Diplomatic Influence)",
   "Asia Power CardIndikasiSasaran (Military Capability)",
   "Indeks Pembangunan Kebudayaan (IPK)",
   "Indeks Kerukunan Umat Beragama (IKUB)",
   "Indeks Pembangunan Kualitas Keluarga",
   "Indeks Ketimpangan Gender (IKG)",
   "Indeks Pengelolaan Keanekaragaman Hayati",
   "Kualitas Lingkungan Hidup",
   "Ketahanan Energi, Air, dan Pangan",
   "Proporsi Kerugian Ekonomi Langsung Akibat Bencana Relatif terhadap PDB",
   "Persentase penurunan emisi GRK",
  ],
 },
];

export const listUser = [
 { id: "1", user: "Kementerian PPN/Bappenas" },
 { id: "2", user: "Kementerian/Lembaga" },
 { id: "3", user: "Pemerintah Daerah" },
 { id: "4", user: "Badan Usaha Milik Negara" },
 { id: "5", user: "Badan Usaha Milik Swasta (Lainnya)" },
];
