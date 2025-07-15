import React from "react";
import {
  FormControl,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import TextareaComponent from "@/components/textarea";
import { listPeristiwaRisiko } from "../setting";
import FieldLabelInfo from "@/components/fieldLabelInfo";

type Option = (typeof listPeristiwaRisiko)[number];

export default function FormTable({
  mode,
  handleModalOpenAddPeristiwa,
}: {
  mode?: string;
  handleModalOpenAddPeristiwa?: () => void;
}) {
  const [konteks, setKonteks] = React.useState("");
  const [project, setProject] = React.useState("");
  const [columns, setColumns] = React.useState<Option[]>([]);
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  const handleChangeKonteks = (event: SelectChangeEvent) => {
    setKonteks(event.target.value);
  };

  function createData(
    id: number,
    indikator: string,
    nilai: string,
    satuan: string,
    anggaran: string,
    objek: string
  ) {
    return { id, indikator, nilai, satuan, anggaran, objek };
  }

  const rows = [
    createData(
      1,
      "Proyeksi timbulan sampah rumah tangga dan sampah sejenis sampah rumah tangga",
      "70,6",
      "juta ton",
      "-",
      "-"
    ),
    createData(
      2,
      "Target pengurangan sampah rumah tangga dan sampah sejenis sampah rumah tangga",
      "19,7",
      "juta ton",
      "-",
      "-"
    ),
    createData(
      3,
      "Target penanganan sampah rumah tangga dan sampah sejenis sampah rumah tangga",
      "50,1",
      "juta ton",
      "-",
      "-"
    ),
  ];

  const handleToggleSelectAll = () => {
    setSelectAll((prev) => {
      if (!prev) setColumns([...listPeristiwaRisiko]);
      else setColumns([]);
      return !prev;
    });
  };

  return (
    <Stack gap={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Mengumpulkan Tepat Waktu"
              information="Mengumpulkan Tepat Waktu"
            />
            {mode === "add" ? (
              <TextareaComponent
                label="Mengumpulkan Tepat Waktu"
                placeholder="Mengumpulkan Tepat Waktu"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Mengumpulkan Tepat Waktu"
                placeholder="Mengumpulkan Tepat Waktu"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Mengumpulkan Tidak Tepat Waktu"
              information="Mengumpulkan Tidak Tepat Waktu"
            />
            {mode === "add" ? (
              <TextareaComponent
                label="Mengumpulkan Tidak Tepat Waktu"
                placeholder="Mengumpulkan Tidak Tepat Waktu"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Mengumpulkan Tidak Tepat Waktu"
                placeholder="Mengumpulkan Tidak Tepat Waktu"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Tidak Mengumpulkan"
              information="Tidak Mengumpulkan"
            />
            {mode === "add" ? (
              <TextareaComponent
                label="Tidak Mengumpulkan"
                placeholder="Tidak Mengumpulkan"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Tidak Mengumpulkan"
                placeholder="Tidak Mengumpulkan"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Total UPR" information="Total UPR" />
            {mode === "add" ? (
              <TextareaComponent label="Total UPR" placeholder="Total UPR" />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Total UPR"
                placeholder="Total UPR"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
}
