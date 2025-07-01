import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "@/app/components/icons/iconify";
import { VisuallyHiddenInput } from "@/app/utils/constant";
import { SetStateAction } from "react";
import { dtoReqBuktiDukungPengesahan } from "../pageModel";

export default function FormBuktiDukung({
  // handleUnggahBuktiDukung,
  reqBuktiDukungPengesahan,
  setReqBuktiDukungPengesahan
}: {
  // handleUnggahBuktiDukung: any;
  reqBuktiDukungPengesahan: dtoReqBuktiDukungPengesahan;
  setReqBuktiDukungPengesahan: (value: SetStateAction<dtoReqBuktiDukungPengesahan>) => void;
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Keterangan File</Typography>
          <TextField
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Keterangan File"
            // value={nota?.tanggal}
            onChange={(e) => {
              setReqBuktiDukungPengesahan((prev) => {
                return {
                  ...prev,
                  filename: e.target.value,
                };
              })
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Unggah Bukti Dukung</Typography>
          <Box>
            <Button
              size="small"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<Iconify name="mdi:upload" size={16} />}
              sx={{
                borderRadius: 50,
                textTransform: "capitalize",
              }}
            >
              Unggah
              <VisuallyHiddenInput
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    const reader = new FileReader();

                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const result = reader.result as string;
                      setReqBuktiDukungPengesahan((prev) => ({
                        ...prev,
                        file: result,
                      }));
                    };

                    reader.onerror = (error) => {
                      console.error("Error reading file:", error);
                    };
                  }
                }}
                // onChange={(event: any) => handleUnggahBuktiDukung(event)}
                multiple
              />
            </Button>
          </Box>
        </FormControl>
      </Grid>
    </Grid>
  );
}
