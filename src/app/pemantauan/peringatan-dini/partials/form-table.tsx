import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Grow,
  MenuItem,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import SelectCustomTheme from "@/components/select";
import { grey } from "@mui/material/colors";
import { listPeristiwaRisiko } from "../setting";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import TextareaComponent from "@/components/textarea";

export default function FormTable({ mode }: { mode?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [prDropdown, setPrDropdown] = React.useState("");
  const [handle, setHandle] = React.useState<string | null>("left");

  const handleHandle = (
    event: React.MouseEvent<HTMLElement>,
    newHandle: string | null
  ) => {
    setHandle(newHandle);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleChangePr = (event: SelectChangeEvent) => {
    setPrDropdown(event.target.value);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Peristiwa Risiko" />
            {mode === "add" || mode === "edit" ? (
              <SelectCustomTheme
                defaultStyle
                small
                anchorRight
                value={prDropdown}
                onChange={handleChangePr}
              >
                <MenuItem value="" disabled>
                  <Typography
                    fontSize={14}
                    fontStyle="italic"
                    color={grey[600]}
                    fontWeight={600}
                  >
                    Pilih peristiwa risiko
                  </Typography>
                </MenuItem>
                {listPeristiwaRisiko.map((prLabel) => (
                  <MenuItem key={prLabel.id} value={prLabel.value}>
                    {prLabel.label.length >= 35 ? (
                      <Tooltip
                        title={prLabel.label}
                        followCursor
                        TransitionComponent={Grow}
                      >
                        <Typography
                          aria-owns={open ? "mouse-over-popover" : undefined}
                          aria-haspopup="true"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                          sx={{ fontSize: 14 }}
                        >
                          {prLabel.label.substring(0, 35) + "..."}
                        </Typography>
                      </Tooltip>
                    ) : (
                      prLabel.label
                    )}
                  </MenuItem>
                ))}
              </SelectCustomTheme>
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Konteks Strategis" />
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Konteks Strategis"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : mode === "edit" ? (
              <TextField
                variant="outlined"
                size="small"
                value="-"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Nilai Risiko"
              titleField
              information={
                <>
                  Angka numerik yang mencerminkan tingkat risiko yang diperoleh
                  dari hasil pengukuran atas faktor risiko dengan formula
                  tertentu dan metode yang konsisten. Pada umumnya, semakin
                  tinggi nilai risiko dimaknai sebagai semakin tinggi tingkat
                  risiko. Nilai risiko perlu mudah diinterpretasikan dan
                  actionable yaitu disertai dengan kebijakan mengenai tindakan
                  apa yang perlu dilakukan ketika risiko mencapai batas nilai
                  tertentu (<em>score-based policies</em>)
                </>
              }
            />
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Nilai Risiko"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : mode === "edit" ? (
              <TextField
                variant="outlined"
                size="small"
                value="-"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Pengendalian"
              titleField
              information="Kebijakan atau tindakan atau serangkaian tindakan yang direncanakan dan diimplementasikan
dengan tujuan untuk mengubah karakteristik risiko, baik melalui pengurangan kemungkinan
kejadian risiko, pengurangan dampak negatif risiko, atau kombinasi dari keduanya yang mencakup
penerapan proses, kebijakan, strategi, teknologi, atau praktek yang dirancang untuk
mengidentifikasi, menilai, dan mengurangi risiko pembangunan nasional"
            />
            {mode === "add" || mode === "edit" ? (
              <RadioGroup row>
                <FormControlLabel value="ada" control={<Radio />} label="Ada" />
                <FormControlLabel
                  value="tidak"
                  control={<Radio />}
                  label="Tidak"
                />
              </RadioGroup>
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Tindak Lanjut" />
            {mode === "add" || mode === "edit" ? (
              <ToggleButtonGroup
                value={handle}
                exclusive
                onChange={handleHandle}
              >
                <ToggleButton value="belum">Belum</ToggleButton>
                <ToggleButton value="proses">Proses</ToggleButton>
                <ToggleButton value="sudah">Sudah</ToggleButton>
              </ToggleButtonGroup>
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Keterangan" />
            {mode === "add" ? (
              <TextareaComponent
                label="Tuliskan keterangan"
                placeholder="Tuliskan keterangan"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Tuliskan keterangan"
                placeholder="Tuliskan keterangan"
                value="-"
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
