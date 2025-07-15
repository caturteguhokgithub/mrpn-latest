import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "@/components/icons/iconify";
import { VisuallyHiddenInput } from "@/utils/constant";
import { SetStateAction } from "react";
import { dtoReqBuktiDukungPengesahan } from "../pageModel";
import usePenetapanObjectVM from "../pageVM";

export default function FormBuktiDukung({
  // handleUnggahBuktiDukung,
  reqBuktiDukungPengesahan,
  setReqBuktiDukungPengesahan,
}: {
  // handleUnggahBuktiDukung: any;
  reqBuktiDukungPengesahan: dtoReqBuktiDukungPengesahan;
  setReqBuktiDukungPengesahan: (
    value: SetStateAction<dtoReqBuktiDukungPengesahan>
  ) => void;
}) {
  const { uploadedFileName, setUploadedFileName } = usePenetapanObjectVM();
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
            value={reqBuktiDukungPengesahan.filename || ""}
            onChange={(e) => {
              setReqBuktiDukungPengesahan((prev) => {
                return {
                  ...prev,
                  filename: e.target.value,
                };
              });
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Unggah Bukti Dukung</Typography>
          <Stack direction="row" gap={2} alignContent="center">
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
                    setUploadedFileName(file.name);
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
                      setUploadedFileName(null); // Clear file name on error
                    };
                  } else {
                    setUploadedFileName(null); // Clear file name if no file is selected
                  }
                }}
                // onChange={(event: any) => handleUnggahBuktiDukung(event)}
                // multiple
              />
            </Button>
            <Stack alignItems="center" justifyContent="center">
              <Typography fontSize={14} color="text.secondary" lineHeight={1}>
                {uploadedFileName || "Belum ada data"}
              </Typography>
            </Stack>
          </Stack>
        </FormControl>
      </Grid>
    </Grid>
  );
}
