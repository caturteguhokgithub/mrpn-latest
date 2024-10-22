import React, { useEffect } from "react";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import useCardSasaranUPRVM from "@/app/penetapan/konteks-strategis/cardSasaranKinerjaUPR/vm";
import { InfoTooltip } from "@/app/components/InfoTooltip";

export default function CardSasaranKinerjaUPR() {
  const { objectState, getData, data } = useCardSasaranUPRVM();

  useEffect(() => {
    if (objectState !== undefined) {
      getData();
    }
  }, [objectState]);

  return (
    <>
      <CardItem
        title="Sasaran, Indikator, dan Target Kinerja UPR Lintas Sektor"
        infoTooltip={
          <>
            <strong>Unit Pemilik Risiko (UPR) Lintas Sektor</strong>
            <p>
              Entitas MRPN yang secara bersama-sama sebagai pemilik risiko
              lintas sektor yang ditetapkan oleh Komite MRPN untuk
              menyelenggarakan tugas sesuai dengan ketentuan peraturan
              perundang-undangan
            </p>
          </>
        }
      >
        {data.length == 0 ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table size="small">
              <TableHead
                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              >
                <TableRow>
                  <TableCell>Peran</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      Entitas MRPN
                      <InfoTooltip
                        title="Kementerian negara, lembaga, pemerintah daerah, pemerintah desa, badan usaha, dan badan
lainnya"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>Sasaran</TableCell>
                  <TableCell>Indikator</TableCell>
                  <TableCell>Target</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) =>
                  row.entitas.map((subItem, subIndex) => (
                    <TableRow key={`${rowIndex}-${subIndex}`}>
                      {subIndex === 0 && (
                        <TableCell
                          rowSpan={row.entitas.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {row.peran}
                        </TableCell>
                      )}

                      <TableCell sx={{ verticalAlign: "top" }}>
                        {subItem}
                      </TableCell>

                      {subIndex === 0 && (
                        <TableCell
                          rowSpan={row.entitas.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {row.sasaran}
                        </TableCell>
                      )}
                      {subIndex === 0 && (
                        <TableCell
                          rowSpan={row.entitas.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {row.indikator}
                        </TableCell>
                      )}
                      {subIndex === 0 && (
                        <TableCell
                          rowSpan={row.entitas.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {row.target}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardItem>
    </>
  );
}
