import React, { Fragment } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";

export default function TableRerefence() {
  const rows = [
    // {
    //   category: "Keuangan",
    //   uraianCategory: [
    //     "Risiko yang muncul akibat gangguan yang timbul dari perubahan dalam kondisi ekonomi, pasar keuangan, dan dinamika perdagangan global yang dapat memengaruhi kestabilan anggaran, keberlanjutan proyek, kegiatan, program, atau prioritas pembangunan dan pencapaian sasaran Pembangunan Nasional.",
    //     "Kategori risiko keuangan terdiri dari risiko finansial terkait prospek ekonomi, variabel ekonomi makro, krisis pasar, dan lingkungan perdagangan.",
    //   ],
    //   sub: [
    //     {
    //       subName: "Prospek Ekonomi",
    //       detailSub: [
    //         "Kondisi makroekonomi dapat secara signifikan memengaruhi perencanaan, pelaksanaan, dan pencapaian sasaran kegiatan, proyek, dan/atau prioritas Pembangunan Nasional.",
    //         "Risiko ini mencakup potensi perubahan atau gangguan terhadap prospek ekonomi yang dapat melemahkan stabilitas keuangan, menurunkan daya beli masyarakat, atau menimbulkan tantangan baru bagi pemerintah dalam mengelola sumber daya pembangunan.",
    //       ],
    //     },
    //     {
    //       subName: "Variabel Ekonomi Makro",
    //       detailSub: [
    //         "Risiko yang muncul dari ketidakpastian terhadap pertumbuhan ekonomi nasional atau global. Ketidakpastian ini dapat memengaruhi penerimaan negara, kemampuan belanja pemerintah, dan efektivitas program pembangunan.",
    //         "Volatilitas dalam variabel ekonomi utama, seperti suku bunga, nilai tukar, harga komoditas, dan inflasi, menciptakan ketidakpastian yang dapat mengganggu rantai nilai ekonomi, stabilitas pasar keuangan, dan kelancaran pelaksanaan Pembangunan Nasional. Risiko ini berpotensi meningkatkan biaya, mengurangi daya beli masyarakat, dan melemahkan daya saing ekonomi nasional.",
    //       ],
    //     },
    //     {
    //       subName: "Krisis Pasar",
    //       detailSub: [
    //         "Risiko yang timbul dari gangguan pada pasar keuangan, seperti krisis likuiditas, volatilitas harga aset, atau penurunan kepercayaan investor, yang dapat menghambat akses pemerintah pada sumber pembiayaan.",
    //         "Kegagalan atau runtuhnya pasar keuangan yang menyebarkan kerugian signifikan ke seluruh sistem ekonomi, yang berdampak pada likuiditas, stabilitas keuangan, dan kepercayaan publik. Krisis pasar disebabkan oleh ketidakseimbangan struktural, kegagalan tata kelola, atau perilaku spekulatif yang menyebabkan kerugian besar pada skala sistemis.",
    //       ],
    //     },
    //     {
    //       subName: "Lingkungan Perdagangan",
    //       detailSub: [
    //         "Risiko yang disebabkan oleh perubahan dalam dinamika perdagangan internasional, seperti kebijakan dagang proteksionis, atau sanksi ekonomi, yang dapat memengaruhi stabilitas neraca perdagangan dan daya saing nasional.",
    //         "Perubahan kebijakan investasi: revisi Undang-Undang Minerba yang membatasi ekspor bahan mentah mineral dan mewajibkan pengolahan dalam negeri, memengaruhi investasi asing di sektor pertambangan.",
    //       ],
    //     },
    //   ],
    // },
    // {
    //   category: "Ekonomi",
    //   sub: ["Prospek Ekonomi", "Variabel Ekonomi", "Krisis Pasar"],
    //   uraian:
    //     "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts.",
    // },
    {
      category: "Ekonomi",
      uraianCategory: [
        "Risiko yang muncul akibat gangguan yang timbul dari perubahan dalam kondisi ekonomi, pasar keuangan, dan dinamika perdagangan global yang dapat memengaruhi kestabilan anggaran, keberlanjutan proyek, kegiatan, program, atau Prioritas Pembangunan dan pencapaian sasaran Pembangunan Nasional.",
        "Kategori risiko keuangan terdiri dari risiko finansial terkait prospek ekonomi, variabel ekonomi makro, krisis pasar, dan lingkungan perdagangan.",
      ],
      sub: [
        {
          subName: "Prospek Ekonomi",
          detailSub: [],
        },
        {
          subName: "Variabel Ekonomi Makro",
          detailSub: [],
        },
        {
          subName: "Krisis Pasar",
          detailSub: [],
        },
        {
          subName: "Lingkungan Perdagangan",
          detailSub: [],
        },
      ],
    },
    {
      category: "Geopolitik",
      // sub: ["Korupsi", "Pergantian Pemerintahan", "Konflik Global"],
      // uraian:
      //   "Risiko kondisi politik dan kriminalitas di masyarakat, perubahan ideologi, perubahan kepemimpinan dan peraturan, konflik yang bermuatan politik di dalam atau di antara negara b mengancam operasi dan prospek bisnis. Contoh: Korupsi, politik golongan kanan/kiri, konflik antar negara.",
      uraianCategory: [
        "Ancaman yang muncul dari memburuknya situasi politik, kriminal, atau sosial dalam masyarakat, perubahan ideologi, kepemimpinan, dan regulasi, serta konflik yang bermuatan politik baik di dalam maupun antarnegara. Risiko ini berpotensi mengganggu program, kegiatan, proyek, dan/atau prioritas pembangunan, serta memengaruhi prospek ekonomi.",
        "Kategori risiko geopolitik terdiri dari risiko geopolitik terkait konflik antarnegara, kekerasan politik, dan lingkungan bisnis.",
      ],
      sub: [
        {
          subName: "Konflik Antar Negara",
          detailSub: [
            "Ketegangan diplomatik atau konflik militer yang dapat mengganggu rantai pasokan global dan hubungan perdagangan.",
            "Contoh: Sengketa di Laut Natuna Utara: Ketegangan dengan Tiongkok terkait klaim wilayah di Zona Ekonomi Eksklusif (ZEE) Indonesia yang dapat mengganggu aktivitas perikanan dan eksplorasi energi.",
          ],
        },
        {
          subName: "Kekerasan Politik",
          detailSub: [
            "Tindak kekerasan terkait agenda politik, seperti demonstrasi besar-besaran, kudeta, atau terorisme yang dapat mengganggu stabilitas.",
            "Contoh: Tindakan separatis berupa ancaman kekerasan oleh kelompok separatis di Papua yang dapat mengganggu pelaksanaan proyek infrastruktur strategis di wilayah tersebut.",
          ],
        },
        {
          subName: "Lingkungan Bisnis",
          detailSub: [
            "Perubahan regulasi, pajak, atau kebijakan yang menciptakan ketidakpastian bagi investasi asing dan kegiatan bisnis domestik.",
            "Contoh: Revisi Undang-Undang Minerba yang membatasi ekspor bahan mentah mineral dan mewajibkan pengolahan dalam negeri, memengaruhi investasi asing di sektor pertambangan.",
          ],
        },
      ],
    },
    {
      category: "Lingkungan",
      // sub: [
      //   "Perubahan Iklim",
      //   "Degradasi Lingkungan",
      //   "Keterbatasan Sumber Daya",
      // ],
      // uraian:
      //   "Risiko yang terkait dengan kejadian bencana alam akut, perubahan iklim, dan interaksi manusia dengan dan eksploitasi lingkungan. Contoh: kekeringan, gelombang panas, cuaca ekstrim, limbah & polusi, hilangnya keanekaragaman hayati, runtuhnya ekosistem, deforestasi.",
      uraianCategory: [
        "Ancaman yang muncul dari bahaya alam yang akut, dampak perubahan iklim jangka panjang, interaksi manusia dengan lingkungan, serta eksploitasi sumber daya alam yang tidak berkelanjutan. Risiko ini memiliki potensi untuk mengganggu ekosistem, kehidupan manusia, infrastruktur, serta stabilitas sosial dan ekonomi.",
        "Kategori risiko lingkungan terdiri dari risiko lingkungan terkait bencana alam, cuaca ekstrem, perubahan iklim, kekurangan SDA, dan degradasi lingkungan.",
      ],
      sub: [
        {
          subName: "Bencana Alam",
          detailSub: [
            "Bencana yang disebabkan oleh proses geologis, seperti gempa bumi, letusan gunung berapi, dan tsunami, yang dapat menimbulkan kerugian besar pada manusia dan aset.",
            "Contoh: Gempa bumi di Sulawesi Tengah (Palu) yang disertai tsunami pada 2018.",
          ],
        },
        {
          subName: "Cuaca Ekstrem",
          detailSub: [
            "Peristiwa cuaca yang tidak biasa atau intens, seperti badai, banjir, dan gelombang panas, yang dapat merusak infrastruktur dan kehidupan manusia.",
            "Contoh: Gelombang panas di Nusa Tenggara Timur (NTT) yang menyebabkan kekeringan dan gagal panen.",
          ],
        },
        {
          subName: "Perubaan Iklim",
          detailSub: [
            "Dampak perubahan iklim jangka panjang, termasuk kenaikan permukaan laut, perubahan pola curah hujan, dan pemanasan global, yang memegaruhi keberlanjutan pembangunan.",
            "Contoh: Kenaikan permukaan laut yang menyebabkan tenggelamnya pulau-pulau kecil di Kepulauan Seribu.",
          ],
        },
        {
          subName: "Kekurangan Sumber Daya Alam",
          detailSub: [
            "Risiko kekurangan sumber daya seperti air bersih, energi, dan mineral akibat eksploitasi berlebih dan ketidakseimbangan distribusi.",
            "Contoh: Krisis bahan baku industri akibat berkurangnya cadangan mineral seperti nikel di Sulawesi.",
          ],
        },
        {
          subName: "Degradasi Lingkungan",
          detailSub: [
            "Penurunan kualitas lingkungan akibat deforestasi, pencemaran, atau perusakan habitat yang dapat memengaruhi ekosistem dan kesehatan manusia.",
            "Contoh: Deforestasi di Kalimantan dan Sumatera akibat pembukaan lahan untuk perkebunan kelapa sawit.",
          ],
        },
      ],
    },
    {
      category: "Sosial",
      // sub: ["Penyakit Menular", "Tren Sosioekonomi", "Sustainable Living"],
      // uraian:
      //   "Risiko yang berkaitan dengan tren sosial ekonomi dalam masyarakat, termasuk preferensi yang berkembang, norma-norma sosial, dan demografi, serta prevalensi penyakit dan perkembangan kesehatan masyarakat. Contoh: ketidakseimbangan gender, ketimpangan kekayaan, belanja yang berkelanjutan, wabah yang tidak diketahui, penyakit yang data dicegah.",
      uraianCategory: [
        "Risiko yang muncul dari dinamika sosial-ekonomi dalam masyarakat, termasuk perubahan preferensi, norma sosial, komposisi demografi, kesehatan publik, dan persepsi kolektif terhadap institusi, organisasi, atau kebijakan. Risiko ini dapat mengganggu stabilitas sosial, produktivitas tenaga kerja, keberlanjutan program pembangunan, serta kepercayaan publik terhadap proyek atau kebijakan pemerintah dan sektor swasta.",
        "Kategori risiko sosial terdiri dari risiko sosial terkait human capital, tren sosioekonomi, tren kesehatan, penyakit menular, dan persepsi brand.",
      ],
      sub: [
        {
          subName: "Human Capital",
          detailSub: [
            "Ketersediaan dan kualitas tenaga kerja, termasuk akses terhadap pendidikan, keterampilan, dan pelatihan yang memengaruhi produktivitas.",
            "Contoh: Kekurangan tenaga kerja terampil di sektor teknologi tinggi",
          ],
        },
        {
          subName: "Tren Sosioekonomi",
          detailSub: [
            "Perubahan dalam struktur ekonomi, perilaku konsumen, dan norma sosial yang dapat memengaruhi keseimbangan sosial dan ekonomi.",
            "Contoh: Migrasi besar-besaran dari desa ke kota yang menciptakan tekanan pada infrastruktur perkotaan.",
          ],
        },
        {
          subName: "Tren Kesehatan",
          detailSub: [
            "Perubahan dalam pola kesehatan masyarakat yang memengaruhi kapasitas produktif dan stabilitas sosial.",
            "Contoh: Krisis kesehatan mental: Peningkatan depresi dan stres di kalangan pekerja akibat tekanan ekonomi dan sosial.",
          ],
        },
        {
          subName: "Penyakit Menular",
          detailSub: [
            "Penyebaran penyakit menular yang memengaruhi kesehatan masyarakat secara luas dan dapat mengganggu aktivitas ekonomi serta sosial.",
          ],
        },
        {
          subName: "Persepsi Brand",
          detailSub: [
            "Persepsi masyarakat terhadap reputasi dan kredibilitas suatu institusi, organisasi, atau proyek.",
          ],
        },
      ],
    },
    {
      category: "Teknologi",
      // sub: ["Disrupsi Teknologi", "Siber", "Infrastruktur Kritis"],
      // uraian:
      //   "Risiko adanya serangan siber yang ditargetkan, keruntuhan infrastruktur penting, kecelakaan industri langsung dan tidak langsung, dan ketidakmampuan untuk mengikuti kemaju teknologi. Contoh: kecerdasan buatan, internet of things, listrik, air, telekomunikasi, sistem satelit",

      uraianCategory: [
        "Potensi gangguan, kerugian, atau dampak negatif yang timbul dari penggunaan teknologi, perubahan teknologi, atau kegagalan teknologi dalam mendukung proses bisnis, infrastruktur, dan kegiatan pembangunan. Risiko ini dapat mencakup ancaman eksternal seperti serangan siber, keruntuhan infrastruktur kritis, kegagalan sistem, kecelakaan industri, serta tantangan dalam mengadopsi atau mengikuti kemajuan teknologi yang cepat.",
        "Kategori risiko teknologi terdiri dari risiko teknologi terkait teknologi disruptif, siber, ancaman siber, infrastruktur kritikal, dan insiden industri.",
      ],
      sub: [
        {
          subName: "Teknologi Disruptif",
          detailSub: [
            "Teknologi baru yang mengubah struktur pasar atau cara kerja tradisional, yang dapat menciptakan peluang maupun ancaman bagi sektor tertentu.",
          ],
        },
        {
          subName: "Siber",
          detailSub: [
            "Risiko siber mengacu pada potensi ancaman yang dapat mengakibatkan gangguan operasional, kehilangan data, kerugian finansial, atau kerusakan reputasi akibat serangan terhadap infrastruktur digital organisasi. Subkategori risiko siber mencakup berbagai jenis ancaman yang dapat memengaruhi keamanan dan integritas sistem informasi.",
          ],
        },
        {
          subName: "Infrastruktur Kritikal",
          detailSub: [
            "Kegagalan atau keruntuhan pada sistem teknologi yang mendukung layanan dasar seperti energi, transportasi, komunikasi, atau layanan publik.",
          ],
        },
      ],
    },
    {
      category: "Tata Kelola",
      // sub: ["Ketidakpatuhan", "Manajemen Kinerja", "Kinerja Strategis"],
      // uraian:
      //   "Risiko ancaman dari kepatuhan terhadap peraturan yang ada dan yang akan datang, serta keputusan manajemen strategis dan taktis. Contoh: perkembangan regulasi, korupsi internal & fraud, kegagalan manajemen, salah kelola eksekutif",

      uraianCategory: [
        "Ancaman terhadap efektivitas tata kelola organisasi dalam memastikan kepatuhan terhadap peraturan, pengambilan keputusan strategis dan operasional, serta pengelolaan sumber daya untuk mencapai tujuan jangka panjang. Risiko ini mencakup ketidakpatuhan terhadap regulasi yang berlaku, kegagalan manajemen dalam menjalankan kebijakan, hingga ketidaksesuaian strategi dengan kebutuhan lingkungan eksternal. Dalam konteks sektor publik, pengelolaan risiko tata kelola bertujuan untuk menjaga ekuntabilitas, transparansi, dan efisiensi dalam pelaksanaan tugas pemerintahan.",
        "Kategori risiko tata kelola terdiri dari risiko tata kelola terkait ketidakpatuhan, litigasi, kinerja strategis, kinerja manajemen, defisiensi model bisnis, dan layanan publik.",
      ],
      sub: [
        {
          subName: "Regulasi",
          detailSub: [
            "Risiko yang timbul dari ketidakpatuhan terhadap peraturan, undang-undang, atau standar yang berlaku. Tumpang tindih regulasi, kekosongan regulasi.",
          ],
        },
        {
          subName: "Hukum",
          detailSub: [
            "Risiko yang muncul dari gugatan hukum atau tuntutan yang dapat berdampak pada reputasi dan keuangan organisasi.",
          ],
        },
        {
          subName: "Kinerja Strategis",
          detailSub: [
            "Risiko yang terkait dengan ketidaksesuaian antara strategi organisasi dan perubahan lingkungan eksternal. Risiko yang timbul dari kelemahan dalam model bisnis organisasi yang tidak sesuai dengan kebutuhan dan tantangan saat ini.",
          ],
        },
        // {
        //   subName: "Operasional",
        //   detailSub: [
        //     "Risiko yang terkait dengan efektivitas keputusan operasional yang dibuat oleh manajemen organisasi.",
        //   ],
        // },
        {
          subName: "Layanan Publik",
          detailSub: [
            "Risiko yang terkait dengan kualitas, keamanan, atau keberlanjutan produk dan layanan yang diberikan oleh organisasi.",
          ],
        },
        {
          subName: "Fraud",
          detailSub: [],
        },
        {
          subName: "Kelembagaan",
          detailSub: ["Tumpang tindih tugas, pokok, dan fungsi organisasi."],
        },
      ],
    },
    // {
    //   category: "Korupsi",
    //    uraianCategory: [
    //     "Korupsi atau penipuan internal yang menyebabkan pelanggaran terhadap peraturan utama. Contoh: korupsi internal & fraud.",
    //   ],
    //   sub: [
    //     {
    //       subName: "-",
    //       detailSub: ["-"],
    //     },
    //   ],
    // },
    {
      category: "Operasional",
      uraianCategory: [],
      sub: [
        {
          subName: "",
          detailSub: [],
        },
      ],
    },
  ];

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        sx={{
          maxHeight: "calc(100vh - 200px)",
          "&::-webkit-scrollbar": {
            width: "6px",
            cursor: "pointer",
          },
          "tbody, thead": {
            "td, th": {
              borderRight: `1px solid ${grey[300]} !important`,
              "&:last-of-type": {
                borderRight: `1px solid ${grey[300]} !important`,
              },
            },
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width={150} sx={{ bgcolor: bgColorTh }}>
                Kategori Risiko
              </TableCell>
              <TableCell sx={{ bgcolor: bgColorTh }}>
                Uraian Kategori Risiko
              </TableCell>
              <TableCell width={250} sx={{ bgcolor: bgColorTh }}>
                Subkategori Risiko
              </TableCell>
              {/* <TableCell sx={{ bgcolor: bgColorTh }}>Uraian</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) =>
              row.sub.map((subItem: any, subIndex) => (
                <TableRow
                  key={`${rowIndex}-${subIndex}`}
                  sx={{
                    backgroundColor:
                      rowIndex % 2 === 0 ? grey[100] : "transparent",
                  }}
                >
                  {subIndex === 0 && (
                    <Fragment>
                      <TableCell
                        rowSpan={row.sub.length}
                        sx={{ verticalAlign: "top" }}
                      >
                        {row.category}
                      </TableCell>
                      <TableCell
                        rowSpan={row.sub.length}
                        sx={{ verticalAlign: "top" }}
                      >
                        <Box
                          component="ul"
                          sx={{
                            ml: row.uraianCategory.length > 1 ? 2 : 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          {row.uraianCategory?.map((itemUraian, index) => (
                            <Fragment key={index}>
                              {row.uraianCategory.length > 1 ? (
                                <li>{itemUraian}</li>
                              ) : (
                                itemUraian
                              )}
                            </Fragment>
                          ))}
                        </Box>
                      </TableCell>
                    </Fragment>
                  )}
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {subItem.subName}
                  </TableCell>
                  {/* <TableCell>
                    <Box
                      component="ul"
                      sx={{
                        ml: subItem.detailSub?.length > 1 ? 2 : 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      {subItem.detailSub?.map(
                        (detail: any, detailIndex: any) => (
                          <Fragment key={detailIndex}>
                            {subItem.detailSub.length > 1 ? (
                              <li>{detail}</li>
                            ) : (
                              detail
                            )}
                          </Fragment>
                        )
                      )}
                    </Box>
                  </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
