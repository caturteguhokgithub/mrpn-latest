import {
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { SetStateAction } from "react";
import { ExsumIndicationStateValue } from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import { ProjectTargetAnggaranDto } from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import theme from "@/theme";
import { FormatCurrency } from "@/lib/utils/currency";

export default function FormProject({
  state,
  setState,
}: {
  state: ExsumIndicationStateValue;
  setState: (value: SetStateAction<ExsumIndicationStateValue>) => void;
}) {
  return (
    <>
      {state.non_rincian_output?.detail &&
        state.non_rincian_output?.detail.length > 0 && (
          <Grid item xs={12}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      Tahun
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      Target
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      Pembiayaan
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      Sumber Pembiayaan
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.non_rincian_output.detail.map((row, index) => (
                  <GetTableRow
                    key={index}
                    tahun={row.tahun}
                    state={state}
                    setState={setState}
                  />
                ))}
              </TableBody>
            </Table>
          </Grid>
        )}
    </>
  );
}

function GetTableRow({
  tahun,
  state,
  setState,
}: {
  tahun: number | string;
  state: ExsumIndicationStateValue;
  setState: (value: SetStateAction<ExsumIndicationStateValue>) => void;
}) {
  const data = state.non_rincian_output?.detail.find((x) => x.tahun == tahun);

  const handleStateChange = (
    value: string,
    type: keyof ProjectTargetAnggaranDto
  ) => {
    setState((prevState) => {
      if (!prevState.non_rincian_output) return prevState;

      const prev = structuredClone(prevState);
      const detailList = prev.non_rincian_output?.detail ?? [];
      const indexData = detailList.findIndex((x) => x.tahun == tahun);

      if (indexData !== -1) {
        const updated = { ...detailList[indexData] };

        if (type === "target") updated.target = value;
        if (type === "satuan") updated.satuan = value;
        if (type === "anggaranString") {
          updated.anggaranString = FormatCurrency(value);
          updated.anggaran = parseInt(value.replace(/[^,\d]/g, "")) || 0;
        }
        if (type === "sumber_anggaran") updated.sumber_anggaran = value;

        detailList[indexData] = updated;
      }

      if (prev.non_rincian_output != undefined) {
        prev.non_rincian_output.detail = detailList;
      }
      return prev;
    });
  };

  if (!data) return null;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{tahun}</TableCell>
      <TableCell>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              value={data.target}
              onChange={(e) => handleStateChange(e.target.value, "target")}
              variant="outlined"
              size="small"
              placeholder="Nilai"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              value={data.satuan}
              onChange={(e) => handleStateChange(e.target.value, "satuan")}
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Satuan"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <TextField
          value={data.anggaranString}
          onChange={(e) => handleStateChange(e.target.value, "anggaranString")}
          variant="outlined"
          size="small"
          placeholder="0"
          InputLabelProps={{ shrink: true }}
          sx={{ input: { textAlign: "right" }, px: 0 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ px: 0, marginLeft: 0 }}>
                .000,00
              </InputAdornment>
            ),
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={data.sumber_anggaran}
          onChange={(e) => handleStateChange(e.target.value, "sumber_anggaran")}
          variant="outlined"
          size="small"
          placeholder="Sumber Pembiayaan"
          InputLabelProps={{ shrink: true }}
        />
      </TableCell>
    </TableRow>
  );
}
