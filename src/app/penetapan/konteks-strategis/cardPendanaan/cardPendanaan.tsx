import React, { Fragment } from "react";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import { FormatIDR } from "@/lib/utils/currency";
import { grey } from "@mui/material/colors";
import { Box, Stack, Typography } from "@mui/material";
import TablePendanaan from "./partials/table-pendanaan";

export default function CardPendanaan() {
  const isEmpty = false;

  return (
    <CardItem
      title="Indikator Sasaran Beserta Dukungan Anggaran dan Sumber Anggaran"
      addButton={
        <Stack direction="row" alignItems="center">
          <Box
            px={1.5}
            py={0.5}
            bgcolor={grey[800]}
            borderRadius={50}
            sx={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <Typography fontSize={14} color="white">
              Total Pendanaan
            </Typography>
          </Box>
          <Box
            px={1.5}
            py={0.5}
            bgcolor="white"
            borderRadius={50}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <Typography fontSize={14} fontWeight={600}>{`${FormatIDR(
              356000000000
            )} Juta`}</Typography>
          </Box>
        </Stack>
      }
    >
      {isEmpty ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <TablePendanaan />
      )}
    </CardItem>
  );
}
