import React from "react";
import { Button, DialogActions } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import TableKategori from "./table-kategori";
import FormKategori from "./form-kategori";
import AddButton from "@/app/components/buttonAdd";

export default function CardKategori() {
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
        title="Kategori Risiko"
        infoTooltip={
          <>
            Pengelompokan risiko misalnya berdasarkan sumber risiko (melalui
            metode <em>Risk Breakdown Structure</em>), area yang terkena dampak
            (melalui metode <em>Work Breakdown Structure</em>), atau kategori
            lainnya. Kategorisasi risiko pada umumnya dilakukan untuk membantu
            proses analisis dan evaluasi risiko serta membantu proses perumusan
            strategi penanganannya
          </>
        }
        addButton={
          <AddButton
            title={"Tambah Kategori"}
            filled
            small
            onclick={handleModalOpenAdd}
          />
        }
      >
        <TableKategori mode="view" />
      </CardItem>
      <DialogComponent
        width={800}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kategori Risiko"
        dialogFooter={dialogActionFooter}
      >
        <FormKategori mode="add" />
      </DialogComponent>
    </>
  );
}
