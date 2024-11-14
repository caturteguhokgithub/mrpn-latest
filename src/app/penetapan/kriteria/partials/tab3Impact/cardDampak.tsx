import React from "react";
import { Button, DialogActions } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import TableDampak from "./table-kriteria-dampak";
import FormDampak from "./form-dampak";
import { AddCircle } from "@mui/icons-material";
// import TableDampak from "@/app/penetapan/konteks-strategis/form/partials/table-kriteria-dampak";

export default function CardDampak() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const handleModalOpenAdd = () => {
    setModalOpenAdd(true);
  };

  const handleModalClose = () => {
    setModalOpenAdd(false);
  };

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
      <CardItem
        title="Kriteria Dampak"
        addButton={
          <Button
            variant="contained"
            size="small"
            startIcon={<AddCircle />}
            sx={{ lineHeight: 1, py: 1, borderRadius: 24 }}
            onClick={handleModalOpenAdd}
          >
            Tambah Kriteria Dampak
          </Button>
        }
      >
        <TableDampak mode="view" />
      </CardItem>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="add" />
      </DialogComponent>
    </>
  );
}
