import React, { Fragment } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TextareaComponent from "@/components/textarea";
import { dataTema } from "../../dataTema";
import ImageGalleryStakeholder from "../tab2Profile/partials/imageSearch";
import { IconFA } from "@/components/icons/icon-fa";
import { VisuallyHiddenInput } from "@/utils/constant";
import { grey } from "@mui/material/colors";

export default function FormFramework({
  mode,
  project,
}: {
  mode?: string;
  project?: string;
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>
            Unggah gambar penyusunan strategi
          </Typography>
          {mode === "add" || mode === "edit" ? (
            <Box>
              <Button
                size="small"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<IconFA name="upload" size={14} />}
                sx={{ borderRadius: 25, textTransform: "capitalize", px: 2 }}
              >
                Unggah gambar
                <VisuallyHiddenInput type="file" />
              </Button>
              <Typography
                variant="caption"
                component="div"
                mt={1}
                color={grey[600]}
              >
                Format gambar: <strong>.png / .jpg / .jpeg</strong>. Ukuran
                gambar <strong>max. 200kb</strong>
              </Typography>
            </Box>
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Keterangan</Typography>
          {mode === "add" ? (
            <TextareaComponent label="Keterangan" placeholder="Keterangan" />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Keterangan"
              placeholder="Keterangan"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
