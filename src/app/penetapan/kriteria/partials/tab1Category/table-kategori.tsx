import React, { Fragment } from "react";
import {
  alpha,
  Button,
  DialogActions,
  Icon,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { AddCircle } from "@mui/icons-material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import DialogComponent from "@/app/components/dialog";
import FormKemungkinan from "../tab2Possibility/form-kemungkinan";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { bgColorTh } from "@/app/utils/color";

export default function TableKategori({ mode }: { mode?: string }) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const handleModalOpenAdd = () => {
    setModalOpenAdd(true);
  };

  const handleModalClose = () => {
    setModalOpenAdd(false);
  };

  const rows = [
    {
      category: "Ekonomi",
      sub: ["Prospek Ekonomi", "Variabel Ekonomi", "Krisis Pasar"],
      uraian:
        "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts.",
    },
    {
      category: "Geopolitik",
      sub: ["Korupsi", "Pergantian Pemerintahan", "Konflik Global"],
      uraian:
        "Risiko kondisi politik dan kriminalitas di masyarakat, perubahan ideologi, perubahan kepemimpinan dan peraturan, konflik yang bermuatan politik di dalam atau di antara negara b mengancam operasi dan prospek bisnis. Contoh: Korupsi, politik golongan kanan/kiri, konflik antar negara.",
    },
    {
      category: "Teknologi",
      sub: ["Disrupsi Teknologi", "Siber", "Infrastruktur Kritis"],
      uraian:
        "Risiko adanya serangan siber yang ditargetkan, keruntuhan infrastruktur penting, kecelakaan industri langsung dan tidak langsung, dan ketidakmampuan untuk mengikuti kemaju teknologi. Contoh: kecerdasan buatan, internet of things, listrik, air, telekomunikasi, sistem satelit",
    },
    {
      category: "Lingkungan",
      sub: [
        "Perubahan Iklim",
        "Degradasi Lingkungan",
        "Keterbatasan Sumber Daya",
      ],
      uraian:
        "Risiko yang terkait dengan kejadian bencana alam akut, perubahan iklim, dan interaksi manusia dengan dan eksploitasi lingkungan. Contoh: kekeringan, gelombang panas, cuaca ekstrim, limbah & polusi, hilangnya keanekaragaman hayati, runtuhnya ekosistem, deforestasi.",
    },
    {
      category: "Sosial",
      sub: ["Penyakit Menular", "Tren Sosioekonomi", "Sustainable Living"],
      uraian:
        "Risiko yang berkaitan dengan tren sosial ekonomi dalam masyarakat, termasuk preferensi yang berkembang, norma-norma sosial, dan demografi, serta prevalensi penyakit dan perkembangan kesehatan masyarakat. Contoh: ketidakseimbangan gender, ketimpangan kekayaan, belanja yang berkelanjutan, wabah yang tidak diketahui, penyakit yang data dicegah.",
    },
    {
      category: "Tata Kelola",
      sub: ["Ketidakpatuhan", "Manajemen Kinerja", "Kinerja Strategis"],
      uraian:
        "Risiko ancaman dari kepatuhan terhadap peraturan yang ada dan yang akan datang, serta keputusan manajemen strategis dan taktis. Contoh: perkembangan regulasi, korupsi internal & fraud, kegagalan manajemen, salah kelola eksekutif",
    },

    {
      category: "Reputasi",
      sub: ["Reputasi"],
      uraian:
        "Risiko akibat menurunnya tingkat kepercayaan pemangku kepentingan (stakeholder) yang bersumber dari persepsi negatif terhadap kebijakan dan/atau kegiatan. Contoh: Pemberitaan negatif oleh media dan organisasi kemasyarakatan",
    },
  ];

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        sx={{
          maxHeight: "calc(100vh - 430px)",
          "&::-webkit-scrollbar": {
            width: "6px",
            cursor: "pointer",
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width={150} sx={{ bgcolor: bgColorTh }}>
                Kategori Risiko
              </TableCell>
              <TableCell width={250} sx={{ bgcolor: bgColorTh }}>
                Sub Kategori Risiko
              </TableCell>
              <TableCell sx={{ bgcolor: bgColorTh }}>Uraian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mode === "add" ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <EmptyState
                    icon={<IconEmptyData />}
                    title="Data Kosong"
                    description="Silahkan isi konten tabel ini"
                  />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {rows.map((row, rowIndex) =>
                  row.sub.map((subItem, subIndex) => (
                    <TableRow key={`${rowIndex}-${subIndex}`}>
                      {subIndex === 0 && (
                        <TableCell rowSpan={row.sub.length}>
                          {row.category}
                        </TableCell>
                      )}
                      <TableCell>{subItem}</TableCell>
                      {subIndex === 0 && (
                        <TableCell rowSpan={row.sub.length}>
                          {row.uraian}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogComponent
        width={800}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Kemungkinan"
        dialogFooter={dialogActionFooter}
      >
        {/* <FormKemungkinan mode="add" /> */}
      </DialogComponent>
    </Fragment>
  );
}
