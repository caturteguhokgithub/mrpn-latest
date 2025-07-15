import React from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Grow,
  MenuItem,
  Paper,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { listTagProP } from "@/app/executive-summary/data";
import TextareaComponent from "@/components/textarea";

type OptionProP = (typeof listTagProP)[number];

export default function FormRisk({
  mode,
  project,
}: {
  mode?: string;
  project?: string;
}) {
  const [value, setValue] = React.useState("");
  const [valueSelect, setValueSelect] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [columnsProP, setColumnsProp] = React.useState<OptionProP[]>([]);
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setValueSelect(event.target.value);
  };

  const handleToggleSelectAllProP = () => {
    setSelectAll((prev) => {
      if (!prev) setColumnsProp([...listTagProP]);
      else setColumnsProp([]);
      return !prev;
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Pernyataan Selera Risiko"
            information="Pernyataan Selera Risiko"
          />
          {mode === "add" ? (
            <TextareaComponent
              label="Tuliskan pernyataan selera risiko"
              placeholder="Tuliskan pernyataan selera risiko"
            />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Tuliskan pernyataan selera risiko"
              placeholder="Tuliskan pernyataan selera risiko"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
