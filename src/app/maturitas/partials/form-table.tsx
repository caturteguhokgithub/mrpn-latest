import React from "react";
import {
  Chip,
  Divider,
  FormControl,
  Grid,
  Grow,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SelectCustomTheme from "@/components/select";
import { grey } from "@mui/material/colors";
import TextareaComponent from "@/components/textarea";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { listMaturity } from "../setting";

export default function FormTable({ mode }: { mode?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [valueMaturity, setValueMaturity] = React.useState("");

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleChangeMaturity = (event: SelectChangeEvent) => {
    setValueMaturity(event.target.value);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Peristiwa Risiko"
              information="Peristiwa Risiko"
            />
            <Typography fontWeight={600}>Peristiwa risiko 1</Typography>
          </FormControl>
        </Grid>
        <Grid item lg={12}>
          <Divider>
            <Chip label="Nilai Risiko" size="small" />
          </Divider>
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Sebelum" information="Sebelum" />
            <Typography fontWeight={600}>1</Typography>
          </FormControl>
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Sesudah" information="Sesudah" />
            <Typography fontWeight={600}>3</Typography>
          </FormControl>
        </Grid>
        <Grid item lg={12}>
          <Divider>
            <Chip label="Maturitas" size="small" />
          </Divider>
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Nilai" information="Nilai" />
            {mode === "add" || mode === "edit" ? (
              <SelectCustomTheme
                defaultStyle
                small
                anchorRight
                value={valueMaturity}
                onChange={handleChangeMaturity}
              >
                <MenuItem value="" disabled>
                  <Typography
                    fontSize={14}
                    fontStyle="italic"
                    color={grey[600]}
                    fontWeight={600}
                  >
                    Pilih nilai
                  </Typography>
                </MenuItem>
                {listMaturity.map((itemLabel) => (
                  <MenuItem key={itemLabel.id} value={itemLabel.value}>
                    {itemLabel.label.length >= 35 ? (
                      <Tooltip
                        title={itemLabel.label}
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
                          {itemLabel.label.substring(0, 35) + "..."}
                        </Typography>
                      </Tooltip>
                    ) : (
                      itemLabel.label
                    )}
                  </MenuItem>
                ))}
              </SelectCustomTheme>
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Deskripsi" information="Deskripsi" />
            {mode === "add" || mode === "edit" ? (
              <Stack height="40px" direction="row" alignItems="center">
                {valueMaturity === "1" ? (
                  <Typography fontWeight={600}>
                    {listMaturity[0].desc}
                  </Typography>
                ) : valueMaturity === "2" ? (
                  <Typography fontWeight={600}>
                    {listMaturity[1].desc}
                  </Typography>
                ) : valueMaturity === "3" ? (
                  <Typography fontWeight={600}>
                    {listMaturity[2].desc}
                  </Typography>
                ) : valueMaturity === "4" ? (
                  <Typography fontWeight={600}>
                    {listMaturity[3].desc}
                  </Typography>
                ) : valueMaturity === "5" ? (
                  <Typography fontWeight={600}>
                    {listMaturity[4].desc}
                  </Typography>
                ) : (
                  "-"
                )}
              </Stack>
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Saran/Masukan" information="Saran/Masukan" />
            {mode === "add" || mode === "edit" ? (
              <TextareaComponent
                label="Saran/Masukan"
                placeholder="Saran/Masukan"
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
