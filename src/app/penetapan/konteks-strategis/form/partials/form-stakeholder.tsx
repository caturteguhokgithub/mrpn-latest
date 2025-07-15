import React, { Fragment } from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import TextareaComponent from "@/components/textarea";
import { dataTema } from "@/app/executive-summary/dataTema";
import ImageGalleryStakeholder from "./imageSearch";

export default function FormStakeholder({
  mode,
  project,
}: {
  mode?: string;
  project?: string;
}) {
  return (
    <Grid container spacing={2}>
      {dataTema.map((itemStakeholder, index) => (
        <Fragment key={index}>
          {project === itemStakeholder.temaId && (
            <>
              {itemStakeholder.stakeholder?.map((detailStakeholder, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ minWidth: "0 !important", p: 2, height: "100%" }}
                  >
                    <Stack direction="column">
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        lineHeight={1.3}
                        sx={{ minHeight: 54 }}
                      >
                        {detailStakeholder.label}
                      </Typography>
                      <ImageGalleryStakeholder />
                      <Typography gutterBottom>
                        {/* <strong>{detailStakeholder.tag}</strong> */}
                        Keterangan
                      </Typography>
                      <TextareaComponent
                        label={`Deskripsi ${detailStakeholder.label}`}
                        placeholder={`Deskripsi ${detailStakeholder.label}`}
                      />
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </>
          )}
        </Fragment>
      ))}
    </Grid>
  );
}
