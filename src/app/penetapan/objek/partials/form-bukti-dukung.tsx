import {
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "@/components/icons/iconify";
import { MAX_FILE_SIZE_2MB, VisuallyHiddenInput } from "@/utils/constant";
import { SetStateAction } from "react";
import { dtoReqBuktiDukungPengesahan } from "../pageModel";
import { useToast } from "@/lib/core/context/toastContext";
import { useGlobalModalContext } from "@/lib/core/hooks/useHooks";

export default function FormBuktiDukung({
  // handleUnggahBuktiDukung,
  reqBuktiDukungPengesahan,
  setReqBuktiDukungPengesahan,
  uploadedFileName,
  setUploadedFileName,
}: {
  // handleUnggahBuktiDukung: any;
  reqBuktiDukungPengesahan: dtoReqBuktiDukungPengesahan;
  setReqBuktiDukungPengesahan: (
    value: SetStateAction<dtoReqBuktiDukungPengesahan>
  ) => void;
  uploadedFileName: any;
  setUploadedFileName: (value: SetStateAction<string | null>) => void;
}) {
  // const { uploadedFileName, setUploadedFileName } = usePenetapanObjectVM();
  console.log({ uploadedFileName });
  const { showToast } = useToast();

  const errorModalContext = useGlobalModalContext();

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
                  const files = e.target.files?.[0];

                  if (files) {
                    if (files.size > MAX_FILE_SIZE_2MB) {
                      errorModalContext.showModal("ERROR_MODAL", {
                        code: 400,
                        message: (
                          <Typography>
                            Gagal unggah gambar, ukuran file maksimal{" "}
                            <strong>2MB</strong>
                          </Typography>
                        ),
                      });

                      // showToast(
                      //   "Gagal unggah gambar, ukuran file maksimal 2 MB",
                      //   "error"
                      // );
                      e.target.value = "";
                      setUploadedFileName(null);
                      return;
                    }

                    setUploadedFileName(files.name);
                    const reader = new FileReader();

                    reader.readAsDataURL(files);
                    reader.onload = () => {
                      const result = reader.result as string;
                      setReqBuktiDukungPengesahan((prev) => ({
                        ...prev,
                        file: result,
                      }));
                    };

                    reader.onerror = (error) => {
                      console.error("Error reading file:", error);
                      e.target.value = "";
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
                {uploadedFileName ?? "Belum ada data"}
              </Typography>
            </Stack>
          </Stack>
        </FormControl>
      </Grid>
    </Grid>
  );
}
