import React, { useEffect } from "react";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import TableFund from "./tableFund";
import useCardFundVM from "@/app/executive-summary/partials/tab8Fund/cardFundVM";
import {Icon, Stack, useMediaQuery} from "@mui/material";
import AddButton from "@/components/buttonAdd";
import theme from "@/theme";
import {API_CONSTANT} from "@/lib/core/api/apiModel";

export default function CardFund({ project }: { project: string }) {
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { exsum, dataFund, dataTableFund, getDataFund } = useCardFundVM(project);

  useEffect(() => {
    if (exsum != undefined) getDataFund();
  }, [exsum]);

  return (
    <CardItem
      title={`Pendanaan & Investasi ${exsum.level}`}
      infoTooltip="Menampilkan informasi lengkap terkait dengan target dan alokasi tahunan, sumber pendanaan, instansi pelaksana, serta lokasi dari Proyek/RO kunci"
      contentNoPadding
    >
      {dataFund.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <>
          {project == "all" &&

              <Stack justifyContent={"end"} direction={"row"} padding={2}>
                  <AddButton
                      fullWidth={onlySmallScreen}
                      noMargin
                      filled
                      title="Download Excel"
                      startIcon={
                        <Icon
                          baseClassName="fas"
                          className={`fa-download`}
                          sx={{
                            fontSize: "12px !important",
                          }}
                        />
                      }
                      onclick={() => {
                          const uri = process.env.NEXT_PUBLIC_BASE_URL_API+"export/exsum/pendanaan";
                          const token = sessionStorage.getItem(API_CONSTANT.token)
                          const exsum_id = exsum.id
                          const params = "token="+token+"&exsum_id="+exsum_id

                          window.open( uri+"?"+params, '_blank')?.focus();
                      }}
                      sx={{ padding: "0 20px", height: 34 }}
                  />
              </Stack>

          }
          <TableFund project={project} data={dataTableFund} />
        </>
      )}
    </CardItem>
  );
}
