import React from "react";
import {
  Button,
  DialogActions,
  Grow,
  Icon,
  IconButton,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { AddCircle } from "@mui/icons-material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import DialogComponent from "@/components/dialog";
import SelectCustomTheme from "@/components/select";
import { listEntitasUtama } from "@/utils/data";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import TableProfilRoKunci from "./table-profil-ro-kunci";
import FormProfilRoProject from "./form-profil-ro-project";
import CardItem from "@/components/cardTabItem";

export default function TableRincianOutput({ mode }: { mode?: string }) {
  const [modalOpenProfilRoKunci, setModalOpenProfilRoKunci] =
    React.useState(false);
  const [modalOpenProfilRoKunciProject, setModalOpenProfilRoKunciProject] =
    React.useState(false);
  const [projectMain, setProjectMain] = React.useState("");
  const [projectSupport, setProjectSupport] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChangeProjectMain = (event: SelectChangeEvent) => {
    setProjectMain(event.target.value);
  };
  const handleChangeProjectSupport = (event: SelectChangeEvent) => {
    setProjectSupport(event.target.value);
  };

  const handleModalOpenProfilRoKunci = () => {
    setModalOpenProfilRoKunci(true);
  };
  const handleModalOpenProfilRoKunciProject = () => {
    setModalOpenProfilRoKunciProject(true);
  };

  const handleModalClose = () => {
    setModalOpenProfilRoKunci(false);
    setModalOpenProfilRoKunciProject(false);
  };

  function createData(
    id: number,
    format: string,
    entitasUtama: string,
    entitasKontributor: string,
    nomenklatur: string,
    target: string,
    anggaran: string,
    sumber: string
  ) {
    return {
      id,
      format,
      entitasUtama,
      entitasKontributor,
      nomenklatur,
      target,
      anggaran,
      sumber,
    };
  }

  const rows = [
    createData(
      1,
      "-",
      "Kemkes",
      "-",
      "Suplementasi gizi mikro pada balita",
      "-",
      "-",
      "-"
    ),
    createData(
      1,
      "-",
      "Kemkes",
      "-",
      "Tata laksana balita gizi buruk",
      "-",
      "-",
      "-"
    ),
    createData(
      1,
      "-",
      "Kemkes",
      "-",
      "Penanggulangan kurang energi kronik (KEK) pada ibu hamil",
      "-",
      "-",
      "-"
    ),
    createData(
      1,
      "-",
      "Kemkes",
      "-",
      "Keluarga 1000 HPK mendapatkan pendampingan",
      "-",
      "-",
      "-"
    ),
    createData(
      1,
      "-",
      "PUPR",
      "-",
      "Infrakstruktur air minum berbasis Masyarakat",
      "-",
      "-",
      "-"
    ),
  ];

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  return (
    <>
      <CardItem title="Profil Intervensi Kunci">
        {/* <Stack
     mb={2}
     direction="row"
     justifyContent="space-between"
     alignItems="center"
    >
     <FieldLabelInfo
      titleSection
      title="Profil Intervensi Kunci"
      information="Profil Intervensi Kunci"
     />
     {mode === "add" || mode === "edit" ? (
      <Stack direction="row" gap={1}>
       <Button
        variant="outlined"
        size="small"
        startIcon={<AddCircle />}
        sx={{ lineHeight: 1, py: 1, borderRadius: 24 }}
        onClick={handleModalOpenProfilRoKunciProject}
       >
        Tambah Project
       </Button>
       <Button
        variant="outlined"
        size="small"
        startIcon={<AddCircle />}
        sx={{ lineHeight: 1, py: 1, borderRadius: 24 }}
        onClick={handleModalOpenProfilRoKunci}
       >
        Tambah Profil RO
       </Button>
      </Stack>
     ) : null}
    </Stack> */}
        <Paper sx={{ overflowX: "auto" }} elevation={0} variant="outlined">
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                {/* <TableCell></TableCell> */}
                <TableCell>Format Kode</TableCell>
                <TableCell>Entitas Utama</TableCell>
                <TableCell>Entitas Kontributor</TableCell>
                <TableCell>Nomenklatur RO/Project</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Anggaran</TableCell>
                <TableCell>Sumber Anggaran</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mode === "add" ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <EmptyState
                      icon={<IconEmptyData />}
                      title="Data Kosong"
                      description="Silahkan isi konten tabel ini"
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell sx={{ textAlign: "center" }}>
            <Tooltip title="Delete" placement="top">
             <IconButton
              aria-label="delete"
              color="error"
              disabled={mode === "view"}
             >
              <Icon
               baseClassName="fas"
               className={`fa-trash-alt`}
               sx={{
                fontSize: "14px",
               }}
              />
             </IconButton>
            </Tooltip>
           </TableCell> */}
                      <TableCell>{row.format}</TableCell>
                      <TableCell>{row.entitasUtama}</TableCell>
                      <TableCell>{row.entitasKontributor}</TableCell>
                      <TableCell>{row.nomenklatur}</TableCell>
                      <TableCell>{row.target}</TableCell>
                      <TableCell>{row.anggaran}</TableCell>
                      <TableCell>{row.sumber}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </Paper>
      </CardItem>
      <DialogComponent
        width={1000}
        dialogOpen={modalOpenProfilRoKunciProject}
        dialogClose={handleModalClose}
        title="Tambah Nomenklatur RO/Project"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={handleModalClose}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormProfilRoProject mode="add" />
      </DialogComponent>
      <DialogComponent
        tableMode
        width={1000}
        dialogOpen={modalOpenProfilRoKunci}
        dialogClose={handleModalClose}
        title="Tambah Profil RO Kunci"
        headerAction={
          <Stack
            direction="row"
            gap={1}
            sx={{
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                width: "100%",
              },
            }}
          >
            <SelectCustomTheme
              rounded
              small
              anchorRight
              value={projectMain}
              onChange={handleChangeProjectMain}
              sx={{
                ".MuiSelect-select": {
                  minHeight: 0,
                },
              }}
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
            <SelectCustomTheme
              rounded
              small
              anchorRight
              value={projectSupport}
              onChange={handleChangeProjectSupport}
              sx={{
                ".MuiSelect-select": {
                  minHeight: 0,
                },
              }}
            >
              <MenuItem value="" disabled>
                <Typography fontSize={14} fontStyle="italic">
                  Pilih Entitas Pendukung
                </Typography>
              </MenuItem>
              <MenuItem value="1" defaultChecked>
                Kementerian Pertanian
              </MenuItem>
              <MenuItem value="2">BPOM</MenuItem>
              <MenuItem value="3">Simas</MenuItem>
            </SelectCustomTheme>
          </Stack>
        }
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={handleModalClose}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <TableProfilRoKunci />
      </DialogComponent>
    </>
  );
}
