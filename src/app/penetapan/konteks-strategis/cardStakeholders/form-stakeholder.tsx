import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import {AutocompleteSelectMultiple} from "@/components/autocomplete";

export default function FormStakeholder({
  noTitle,
  title,
  listStakeholder,
  selectedStakeholder,
  setSelectedStakeholder,
  description,
  setDescription,
}: {
  noTitle?: boolean;
  title: string;
  listStakeholder: MiscMasterListStakeholderRes[];
  selectedStakeholder: MiscMasterListStakeholderRes[];
  setSelectedStakeholder: (item: number[]) => void;
  description?: string;
  setDescription?: (item: string) => void;
}) {

  return (
    <Grid item xs={12} md={12}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ minWidth: "0 !important", p: 2, height: "100%" }}
      >
        <Stack direction="column">
          {noTitle ? null : (
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              lineHeight={1.3}
              sx={{ minHeight: 54 }}
            >
              {title}
            </Typography>
          )}

          <Stack>
            <AutocompleteSelectMultiple
              value={selectedStakeholder}
              options={listStakeholder}
              getOptionLabel={opt => opt.value}
              handleChange={(newVal:MiscMasterListStakeholderRes[]) => {
                const selectedIds:number[] = newVal.reduce<number[]>(
                  (acc,b) => {
                    return [...acc, b.id]
                  }, []
                )
                setSelectedStakeholder(selectedIds)
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
