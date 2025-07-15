import React from "react";
import { Button, Collapse, DialogActions, Stack } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import AddButton from "@/components/buttonAdd";
import FormIndication from "./partials/form";
import Matriks from "@/app/penetapan/kriteria/partials/tab4Matriks/matriks";
import FormRisk from "./partials/formRisk";
import RiskContent from "@/app/penetapan/selera-risiko/partials/risk";

export default function CardRisk({ project }: { project: string }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [openMatriks, setOpenMatriks] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const toggleOpenMatriks = () => {
    setOpenMatriks(true);
  };
  const closeMatriks = () => {
    setOpenMatriks(false);
  };

  const isEmpty = false;

  return (
    <>
      <Stack gap={1}>
        <CardItem
          title="Selera Risiko"
          setting
          settingEditOnclick={handleModalOpen}
        >
          {isEmpty || project === "4" ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <>
              <RiskContent handleSaveButton={toggleOpenMatriks} />
              <Collapse in={openMatriks}>
                <Matriks levelId={2} />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={closeMatriks}
                  sx={{ borderRadius: 20, px: 3, mt: 3 }}
                >
                  Close Matriks
                </Button>
              </Collapse>
            </>
          )}
        </CardItem>
      </Stack>
      <DialogComponent
        width={480}
        dialogOpen={modalOpen}
        dialogClose={handleModalClose}
        title="Ubah Indikasi Risiko Objek MRPN 5 Tahunan"
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
        <FormRisk mode="add" project={project} />
      </DialogComponent>
    </>
  );
}
