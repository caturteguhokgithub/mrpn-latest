import { FormControl, Grid, TextField } from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import TextareaComponent from "@/components/textarea";

export default function FormNomenklatur() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Nomenklatur Non-RO/Project" />
          <TextareaComponent
            label="Nomenklatur Non-RO/Project"
            placeholder="Nomenklatur Non-RO/Project"
            row={2}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Format Kode" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Format Kode"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Tagging ProP" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Tagging ProP"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Penanggungjawab" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Penanggungjawab"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Lokasi" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Lokasi"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
