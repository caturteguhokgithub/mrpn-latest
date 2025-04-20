import React, { Fragment } from "react";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import { FormatIDR } from "@/lib/utils/currency";
import { grey } from "@mui/material/colors";
import { Box, Stack, Typography } from "@mui/material";
import TablePendanaan from "./partials/table-pendanaan";
import { isDeveloping } from "@/app/components/layouts/layout";
import EmptyDevelopingState from "@/app/components/empty/developing";
import TableFund from "./partials/tableFund";
import useCardFundVM from "@/app/executive-summary/partials/tab8Fund/cardFundVM";

export default function CardPendanaan({ project }: { project: string }) {
  const isEmpty = false;
  const { exsum, dataFund, dataTableFund, getDataFund } =
    useCardFundVM(project);

  return (
    <CardItem
      title="Indikator Sasaran Beserta Dukungan Anggaran dan Sumber Anggaran"
      addButton={
        isDeveloping ? (
          ""
        ) : (
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
                0
              )} Juta`}</Typography>
            </Box>
          </Stack>
        )
      }
    >
      {/* {isDeveloping ? (
        <EmptyDevelopingState />
      ) : ( */}
      <Fragment>
        {isEmpty ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <TableFund project={project} data={dataTableFund} />
        )}
      </Fragment>
      {/* )} */}
    </CardItem>
  );
}
