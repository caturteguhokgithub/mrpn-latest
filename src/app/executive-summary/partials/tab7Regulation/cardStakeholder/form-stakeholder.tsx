import React from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { InfoTooltip } from "@/components/InfoTooltip";
import { AutocompleteSelectMultiple } from "@/components/autocomplete";
import { listProvinsi } from "@/utils/provinsi";

type Option = (typeof listProvinsi)[number];

export default function FormStakeholder({
  title,
  listStakeholder,
  selectedStakeholder,
  setSelectedStakeholder,
}: {
  title: string;
  listStakeholder: MiscMasterListStakeholderRes[];
  selectedStakeholder: MiscMasterListStakeholderRes[];
  setSelectedStakeholder: (item: number[]) => void;
}) {

  const isSingleSelect = (title === "Kementerian Koordinator" || title === "Entitas Sektor Utama") ? true : false;

  return (
    <Grid item xs={12}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ minWidth: "0 !important", p: 2, height: "100%" }}
      >
        <Stack direction="column">
          <Stack direction="row" alignItems="center" gap={0.5} mb={1}>
            <Typography variant="h6" component="div" lineHeight={1.3}>
              {title}
            </Typography>
            {title !== "Kementerian Koordinator" && (
              <InfoTooltip
                titleSection
                title={
                  title === "Entitas Sektor Utama"
                    ? "Kementerian negara atau lembaga yang mempunyai tanggung jawab utama dalam mengelola risiko pada program, kegiatan, proyek, prioritas pembangunan, dan/atau jenis risiko tertentu yang bersifat lintas sektor"
                    : title === "Entitas Pendukung"
                      ? "Entitas MRPN Pendukung adalah K/L/P/BU/BL yang turut mendukung pelaksanaan Objek MRPN Lintas Sektor termasuk yang menjadi penanggung jawab atas suatu perlakuan risiko"
                      : null
                }
              />
            )}
          </Stack>
          <Stack>
            <AutocompleteSelectMultiple
              key={selectedStakeholder.length}
              value={selectedStakeholder}
              options={listStakeholder}
              getOptionLabel={(opt) => opt.value}
              handleChange={(newVal: MiscMasterListStakeholderRes[]) => {

                let finalSelection = newVal;

                // jika Kementerian Koordinator, batasi hanya 1 item
                if (isSingleSelect && newVal.length > 1) {
                  finalSelection = [newVal[newVal.length - 1]];
                }

                const selectedIds = finalSelection.map((item) => item.id);
                setSelectedStakeholder(selectedIds);

                // const selectedIds: number[] = newVal.reduce<number[]>(
                //   (acc, b) => {
                //     return [...acc, b.id];
                //   },
                //   []
                // );
                // setSelectedStakeholder(selectedIds);
              }}
              placeHolder={"Pilih K/L"}
              labelSelectAll={"Pilih semua K/L"}
            />
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
}
