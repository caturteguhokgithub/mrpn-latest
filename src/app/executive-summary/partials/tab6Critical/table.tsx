import React from "react";
import {
  alpha,
  Box,
  Button,
  Chip,
  DialogActions,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { grey, red } from "@mui/material/colors";
import { ExsumIndicationResDto } from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import ActionColumn from "@/components/actions/action";
import { Task } from "gantt-task-react";
import { ExsumCriticalData } from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import dayjs from "dayjs";
import DialogComponent from "@/components/dialog";
import TableDetail from "./gantt-critical/table";
import { bgColorTh } from "@/utils/color";

export default function TableCritical({
  handleEdit,
  handleDelete,
  data,
}: {
  handleEdit?: any;
  handleDelete?: any;
  data: ExsumCriticalData[];
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { year } = useRKPContext((store) => store);

  return (
    <>
      <Table
        sx={{
          minWidth: 650,
          "th, td": {
            p: {
              fontSize: "14px !important",
            },
          },
        }}
        size="small"
      >
        <TableHead
          sx={{
            bgcolor: bgColorTh,
            th: {
              py: 1.5,
            },
          }}
        >
          <TableRow>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                RO/Project Kunci
              </Typography>
            </TableCell>
            {/* {year > 0 && (
              <TableCell>
                <Typography variant="body2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
            )} */}
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                Penanggungjawab
              </Typography>
            </TableCell>
            <TableCell width={180}>
              <Typography variant="body2" fontWeight={600}>
                Sumber Anggaran
              </Typography>
            </TableCell>
            <TableCell width={160}>
              <Typography variant="body2" fontWeight={600}>
                Waktu Mulai
              </Typography>
            </TableCell>
            <TableCell width={160}>
              <Typography variant="body2" fontWeight={600}>
                Waktu Selesai
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">{item.ro?.value}</Typography>
              </TableCell>
              {/* {year > 0 && (
                <TableCell sx={{ verticalAlign: "top" }}>
                  <Chip
                    label={item.keterangan_kegiatan}
                    size="small"
                    sx={{
                      bgcolor:
                        item.keterangan_kegiatan === "Finish to Start"
                          ? red[700]
                          : theme.palette.primary.main,
                      color: "white",
                    }}
                  />
                </TableCell>
              )} */}
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {item.ro?.kementrian?.value ?? "-"}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {item.ro?.sumber_anggaran || "-"}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {year == 0
                    ? dayjs(item.start_date).format("YYYY")
                    : dayjs(item.start_date).format("DD MMM YYYY")}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {year == 0
                    ? dayjs(item.end_date).format("YYYY")
                    : dayjs(item.end_date).format("DD MMM YYYY")}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <ActionColumn
                  // viewClick={year > 0 ? () => setModalOpen(true) : undefined}
                  editClick={() => handleEdit(index)}
                  deleteClick={() => handleDelete(index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogComponent
        width={"50%"}
        dialogOpen={modalOpen}
        dialogClose={() => setModalOpen(false)}
        title="Detail RO/Project Kunci Tahun 2025"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Keluar
            </Button>
          </DialogActions>
        }
      >
        <TableDetail />
      </DialogComponent>
    </>
  );
}
