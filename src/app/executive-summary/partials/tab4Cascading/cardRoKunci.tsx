import React from "react";
import {
 Typography,
 Stack,
 Button,
 DialogActions,
 MenuItem,
 SelectChangeEvent,
 Grow,
 Tooltip,
} from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import AddButton from "@/app/components/buttonAdd";
import SelectCustomTheme from "@/app/components/select";
import TableProfilIntervensi from "./table-profil-intervensi";
import TableProfilRoKunci from "./table-profil-ro-kunci";
import { listEntitasPendukung, listEntitasUtama } from "@/app/utils/data";
import FormProfilRoProject from "./form-profil-ro-project";

export default function CardRoKunci({ project }: { project: string }) {
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

 const isEmpty = false;

 return (
  <CardItem
   title="Profil Intervensi Kunci"
   addButton={
    <>
     <AddButton
      filled
      small
      title="Tambah Project"
      onclick={handleModalOpenProfilRoKunciProject}
     />
     <AddButton
      filled
      small
      title="Tambah Profil RO"
      onclick={handleModalOpenProfilRoKunci}
     />
    </>
   }
  >
   {isEmpty || project === "4" ? (
    <EmptyState
     dense
     icon={<IconEmptyData width={100} />}
     title="Data Kosong"
     description="Silahkan isi konten halaman ini"
    />
   ) : (
    <TableProfilIntervensi project={project} />
   )}
   <DialogComponent
    tableMode
    width={1000}
    dialogOpen={modalOpenProfilRoKunci}
    dialogClose={handleModalClose}
    title="Tambah Profil RO Kunci"
    // headerAction={
    //  <Stack direction="row" gap={1}>
    //   <SelectCustomTheme
    //    rounded
    //    small
    //    anchorRight
    //    value={projectMain}
    //    onChange={handleChangeProjectMain}
    //    sx={{
    //     ".MuiSelect-select": {
    //      minHeight: 0,
    //     },
    //    }}
    //   >
    //    <MenuItem value="" disabled>
    //     <Typography fontSize={14} fontStyle="italic">
    //      Pilih Entitas Utama
    //     </Typography>
    //    </MenuItem>
    //    {listEntitasUtama.map((euLabel, index) => (
    //     <MenuItem key={index} value={euLabel}>
    //      {euLabel.length >= 35 ? (
    //       <Tooltip title={euLabel} followCursor TransitionComponent={Grow}>
    //        <Typography
    //         aria-owns={open ? "mouse-over-popover" : undefined}
    //         aria-haspopup="true"
    //         onMouseEnter={handlePopoverOpen}
    //         onMouseLeave={handlePopoverClose}
    //         sx={{ fontSize: 14 }}
    //        >
    //         {euLabel.substring(0, 35) + "..."}
    //        </Typography>
    //       </Tooltip>
    //      ) : (
    //       euLabel
    //      )}
    //     </MenuItem>
    //    ))}
    //   </SelectCustomTheme>
    //   <SelectCustomTheme
    //    rounded
    //    small
    //    anchorRight
    //    value={projectSupport}
    //    onChange={handleChangeProjectSupport}
    //    sx={{
    //     ".MuiSelect-select": {
    //      minHeight: 0,
    //     },
    //    }}
    //   >
    //    <MenuItem value="" disabled>
    //     <Typography fontSize={14} fontStyle="italic">
    //      Pilih Entitas Pendukung
    //     </Typography>
    //    </MenuItem>
    //    {listEntitasPendukung.map((epLabel, index) => (
    //     <MenuItem key={index} value={epLabel}>
    //      {epLabel.length >= 35 ? (
    //       <Tooltip title={epLabel} followCursor TransitionComponent={Grow}>
    //        <Typography
    //         aria-owns={open ? "mouse-over-popover" : undefined}
    //         aria-haspopup="true"
    //         onMouseEnter={handlePopoverOpen}
    //         onMouseLeave={handlePopoverClose}
    //         sx={{ fontSize: 14 }}
    //        >
    //         {epLabel.substring(0, 35) + "..."}
    //        </Typography>
    //       </Tooltip>
    //      ) : (
    //       epLabel
    //      )}
    //     </MenuItem>
    //    ))}
    //   </SelectCustomTheme>
    //  </Stack>
    // }
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
  </CardItem>
 );
}
