"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect } from "react";
import { Box, FormControl, Paper, Stack, Typography } from "@mui/material";
import MRTPerlakuanComplete from "../perlakuan/partials/mrt-complete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import useRiskOverviewVM from "@/app/profil-risiko/overview/pageVM";
import HeaderTable from "./partials/headerTable";

export default function PageOverviewView() {
  const { year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  const { dataRiskOverview, getRiskOverviewData } = useRiskOverviewVM();

  useEffect(() => {
    if (objectState !== undefined) getRiskOverviewData();
  }, [objectState]);

  return (
    <ContentPage
      title={`Overview Risiko ${
        year == 0 ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end : "Tahun " + year
      }`}
      withCard={objectState === undefined}
      chooseObject={
        year == 0 ? (
          ""
        ) : (
          <FormControl size="small" sx={{ width: "20vw" }}>
            <AutocompleteSelectSingle
              rounded
              value={objectState}
              options={objects}
              getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
              handleChange={(val: MasterListObjectRes) => setObjectState(val)}
              placeHolder={"Pilih KP"}
            />
          </FormControl>
        )
      }
    >
      <Stack gap={1}>
        {objectState === undefined ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title={year == 0 ? "Tidak ada data yang ditampilkan" : "Pilih KP"}
            description={
              year == 0
                ? "Silahkan pilih RKP terlebih dulu"
                : "Silahkan pilih KP terlebih dulu"
            }
          />
        ) : (
          <>
            <Paper elevation={2} sx={{ borderRadius: "1.25rem", p: 0, m: 1 }}>
              <HeaderTable asTable viewOnly data={dataRiskOverview?.object} />
            </Paper>

            <Box className="table-sticky-horizontal">
              <MRTPerlakuanComplete
                dataTable={dataRiskOverview?.overviews}
                viewOnly
                renderCaption={
                  <Typography fontWeight={600} fontSize={17} px={1}>
                    Perlakuan Risiko
                  </Typography>
                }
              />
            </Box>
          </>
        )}
      </Stack>
    </ContentPage>
  );
}
