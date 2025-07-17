import React, { SetStateAction } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import TextareaComponent, { TextareaStyled } from "@/components/textarea";
import { doReqSeleraApprovalDto } from "@/app/penetapan/kriteria/partials/tab4Selera/hooks/model";

export default function FormReject({
  mode,
  state,
  setState,
}: {
  mode?: string
  state?: doReqSeleraApprovalDto;
  setState?: (value: SetStateAction<doReqSeleraApprovalDto>) => void;
}) {
  const handleChange = (e: string) => {
    if (setState) {
      setState((prevState) => ({
        ...prevState,
        message: e,
      }));

      console.log(state);

    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            {mode === "add" ? (
              <TextareaStyled
                aria-label="Tuliskan Alasan Reject"
                placeholder="Tuliskan Alasan Reject"
                minRows={3}
                value={state?.message}
                onChange={(e) => handleChange(e.target.value)}
              />
            ) : mode === "edit" ? (
              <TextareaStyled
                aria-label="Tuliskan Alasan Reject"
                placeholder="Tuliskan Alasan Reject"
                minRows={3}
                value={state?.message}
                onChange={(e) => handleChange(e.target.value)}
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
