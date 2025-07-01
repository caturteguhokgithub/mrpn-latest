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

export default function FormBuktiDukung({
  handleUnggahBuktiDukung,
}: {
  handleUnggahBuktiDukung: any;
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Nama File</Typography>
          <TextField
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Nama File"
            // value={nota?.tanggal}
            // onChange={(e) => {
            //   if (nota !== undefined) {
            //     const prev = { ...nota };
            //     prev.tanggal = e.target.value;
            //     setNota(prev);
            //   }
            // }}
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
                onChange={(event: any) => handleUnggahBuktiDukung(event)}
                multiple
              />
            </Button>
          </Box>
        </FormControl>
      </Grid>
    </Grid>
  );
}
