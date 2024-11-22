import React from "react";
import {
  alpha,
  Box,
  Chip,
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
import {useAuthContext, useRKPContext} from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import ActionColumn from "@/app/components/actions/action";
import { Task } from "gantt-task-react";
import { ExsumCriticalData } from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import dayjs from "dayjs";

export default function TableCritical({
  handleEdit,
  handleDelete,
  data,
}: {
  handleEdit?: any;
  handleDelete?: any;
  data: ExsumCriticalData[];
}) {

  const {year} = useRKPContext(store => store)

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
        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <TableRow>
            <TableCell>
              <Typography variant="body2" fontWeight={600}>
                RO/Project Kunci
              </Typography>
            </TableCell>
            {year > 0 && (
              <TableCell>
                <Typography variant="body2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
            )}
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
              {year > 0 && (
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
              )}
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {item.ro?.kementrian.value}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {item.ro?.sumber_anggaran}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {year == 0 ? dayjs(item.start_date).format("YYYY") : dayjs(item.start_date).format("DD MMM YYYY")}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography variant="body2">
                  {year == 0 ? dayjs(item.end_date).format("YYYY") : dayjs(item.end_date).format("DD MMM YYYY")}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                <ActionColumn
                  editClick={() => handleEdit(index)}
                  deleteClick={() => handleDelete(index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
