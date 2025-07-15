import React from "react";
import {
  Chip,
  Divider,
  FormControl,
  Grid,
  Grow,
  Icon,
  IconButton,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SelectCustomTheme from "@/components/select";
import { grey } from "@mui/material/colors";
import TextareaComponent from "@/components/textarea";
import { listLevelKemungkinan } from "@/utils/data";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import theme from "@/theme";

export default function FormDampak({ mode }: { mode?: string }) {
  const [value, setValue] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Paper sx={{ overflowX: "auto", minWidth: "100% !important" }}>
      <Table size="small">
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell rowSpan={2}>Level Kemungkinan</TableCell>
            <TableCell colSpan={5} align="center">
              Area Dampak Risiko
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Beban Keuangan Negara/Daerah</TableCell>
            <TableCell>Penurunan Reputasi</TableCell>
            <TableCell>
              Tuntutan Hukum (Sanksi Pidana, Perdata, dan/atau administratif)
            </TableCell>
            <TableCell>Lingkungan</TableCell>
            <TableCell>Capaian Kinerja</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Kemungkinan 1</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Beban Keuangan Negara/Daerah"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Penurunan Reputasi"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tuntutan Hukum"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Lingkungan"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Capaian Kinerja"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kemungkinan 2</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Beban Keuangan Negara/Daerah"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Penurunan Reputasi"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tuntutan Hukum"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Lingkungan"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Capaian Kinerja"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kemungkinan 3</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Beban Keuangan Negara/Daerah"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Penurunan Reputasi"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tuntutan Hukum"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Lingkungan"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Capaian Kinerja"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kemungkinan 4</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Beban Keuangan Negara/Daerah"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Penurunan Reputasi"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tuntutan Hukum"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Lingkungan"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Capaian Kinerja"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kemungkinan 5</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Beban Keuangan Negara/Daerah"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Penurunan Reputasi"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tuntutan Hukum"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Lingkungan"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Capaian Kinerja"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
