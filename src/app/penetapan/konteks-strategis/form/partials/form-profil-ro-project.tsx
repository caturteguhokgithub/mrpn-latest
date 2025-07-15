import React from "react";
import {
  FormControl,
  Grid,
  Grow,
  MenuItem,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import TextareaComponent from "@/components/textarea";
import SelectCustomTheme from "@/components/select";
import { listEntitasUtama } from "@/utils/data";
import FieldLabelInfo from "@/components/fieldLabelInfo";

export default function FormProfilRoProject({ mode }: { mode?: string }) {
  const [project, setProject] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Format Kode" information="Format Kode" />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Format Kode"
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
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Entitas Utama" information="Entitas Utama" />
          {mode === "add" || mode === "edit" ? (
            <SelectCustomTheme
              defaultStyle
              small
              value={project}
              onChange={handleChangeProject}
            >
              <MenuItem value="" disabled>
                <Typography fontSize={14} fontStyle="italic">
                  Pilih Entitas Utama
                </Typography>
              </MenuItem>
              {listEntitasUtama.map((euLabel, index) => (
                <MenuItem key={index} value={euLabel}>
                  {euLabel.length >= 35 ? (
                    <Tooltip
                      title={euLabel}
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
                        {euLabel.substring(0, 35) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    euLabel
                  )}
                </MenuItem>
              ))}
            </SelectCustomTheme>
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Entitas Kontributor"
            information="Entitas Kontributor"
          />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Entitas Kontributor"
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
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Nomenklatur RO/Project"
            information="Nomenklatur RO/Project"
          />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Nomenklatur RO/Project"
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
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Target" information="Target" />
          {mode === "add" ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Nilai"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Satuan"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          ) : mode === "edit" ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value="2000"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value="Orang"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Anggaran" information="Anggaran" />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Anggaran"
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
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Sumber Anggaran"
            information="Sumber Anggaran"
          />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Sumber Anggaran"
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
    </Grid>
  );
}
