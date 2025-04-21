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
import usePendanaanList from "./hooks/vm";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { useRKPContext } from "@/lib/core/hooks/useHooks";

export default function CardPendanaan({ project }: { project: string }) {
  const isEmpty = false;
  const { year, rpjmn } = useRKPContext((store) => store);
  const multiyear = GenerateRpjmnYear(rpjmn);
  // const { exsum, dataFund, dataTableFund, getDataFund } =
  //   useCardFundVM(project);

  function getFormattedGrandTotal(data: any[], multiyear: any[]): string {
    const total = data.reduce((acc, item) => {
      return acc + multiyear.reduce((sum, _, iY) => {
        return sum + Number(item[`anggaran_${iY}`] || 0);
      }, 0);
    }, 0);

    return (total / 1000).toFixed(2);
  }

  const { dataTableFund } = usePendanaanList();
  const totalPendanaan = getFormattedGrandTotal(dataTableFund, multiyear);

  // console.log(totalPendanaan);

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
                Number(totalPendanaan)
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
          // <TableFund project={project} data={dataTableFund} />
          <TableFund project={project} />
        )}
      </Fragment>
      {/* )} */}
    </CardItem>
  );
}
